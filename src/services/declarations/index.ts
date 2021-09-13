import { validate as uuidValidate } from "uuid"

import prisma from "@/prisma/db"
import {
  DeclarationModel,
  DeclarationModelWithEditor,
  DeclarationType,
  schemaEts,
  schemaLiberal,
} from "@/models/declarations"
import { EditorModel } from "@/models/editor"
import { UserLoggedModel } from "@/models/users"
import { jobsByOrders } from "@/utils/options"
import { findEts } from "@/services/ets"
import { buildMetaPagination } from "@/utils/pagination"
import { parseISO } from "date-fns"

export const createDeclaration = async (
  declaration: DeclarationModel & { date: string },
  editor: EditorModel,
): Promise<string | undefined> => {
  switch (declaration?.declarationType) {
    case DeclarationType.Liberal: {
      schemaLiberal.parse(declaration)
      break
    }
    case DeclarationType.Ets: {
      declaration.editorId = editor.id
      await schemaEts.parseAsync(declaration)
      break
    }
    default: {
      throw new Error(
        `The declarationType (${
          declaration?.declarationType || "null"
        })} is not expected.`,
      )
    }
  }

  // The Timezone offset has to be added to not be overrided by API server TZ configuration.
  // In other words, w/o that, the date with an API server in France will be the day before the day in input 😕.
  const date = parseISO(declaration.date + "T00:00:00.000Z")

  const newDeclaration = await prisma.declaration.create({
    data: { ...declaration, date },
  })

  return newDeclaration?.id
}

export const findDeclaration = async (
  id: string,
): Promise<DeclarationModelWithEditor | null> => {
  if (!id || !uuidValidate(id)) {
    throw new Error("Bad request")
  }

  const declaration = await prisma.declaration.findUnique({
    where: {
      id,
    },
    include: {
      editor: true,
    },
  })

  return declaration
}

async function buildWhereClause(user: UserLoggedModel) {
  switch (user.role) {
    case "Gestionnaire d'ordre": {
      if (!user?.scope?.order) throw new Error("This is not supposed to happen")
      return {
        job: {
          in: jobsByOrders[user.scope.order],
        },
      }
    }
    case "Gestionnaire établissement": {
      if (!user?.scope?.ets) throw new Error("This is not supposed to happen")

      const ets = await findEts(user?.scope?.ets)

      return {
        finesset: {
          in: ets?.finesset,
        },
      }
    }
  }
}

export async function searchDeclarations({
  user,
  pageIndex: initialPageIndex,
  pageSize: initialPageSize,
}: {
  user: UserLoggedModel
  pageIndex?: number
  pageSize?: number
}): Promise<{
  declarations: DeclarationModel[]
  pageIndex: number
  totalCount: number
  pageSize: number
  totalPages: number
}> {
  const whereClause = await buildWhereClause(user)

  const totalCount = await prisma.declaration.count({
    where: whereClause,
  })

  const { pageIndex, pageSize, totalPages, prismaPaginationQueryParams } =
    await buildMetaPagination({
      totalCount,
      pageIndex: initialPageIndex,
      pageSize: initialPageSize,
    })

  const declarations = await prisma.declaration.findMany({
    orderBy: [{ createdAt: "desc" }],
    ...prismaPaginationQueryParams,
    where: whereClause,
  })

  return { declarations, pageIndex, totalCount, pageSize, totalPages }
}
