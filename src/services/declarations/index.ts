import { validate as uuidValidate } from "uuid"

import prisma from "@/prisma/db"
import {
  DeclarationModel,
  DeclarationType,
  schemaEts,
  schemaLiberal,
} from "@/models/declarations"

export const create = async (
  declaration: DeclarationModel,
): Promise<string | undefined> => {
  // console.log("declaration dans API", declaration)

  switch (declaration?.declarationType) {
    case DeclarationType.Liberal: {
      schemaLiberal.parse(declaration)
      break
    }
    case DeclarationType.Ets: {
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

  const newDeclaration = await prisma.declaration.create({
    data: declaration,
  })

  return newDeclaration?.id
}

export const find = async ({
  id,
}: {
  id: string
}): Promise<DeclarationModel | null> => {
  if (!id || !uuidValidate(id)) {
    throw new Error("Bad request")
  }

  const declaration = await prisma.declaration.findUnique({
    where: {
      id,
    },
  })

  return declaration
}
