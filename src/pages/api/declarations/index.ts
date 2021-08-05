import Cors from "micro-cors"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { pipe } from "lodash/fp"

import prisma from "@/prisma/db"
import { create } from "@/services/declarations"
import withSession from "@/lib/session"
import { UserLoggedModel } from "@/models/users"
import { buildMetaPagination } from "@/utils/pagination"
import { handleApiError, handleNotAllowedMethods } from "@/utils/api"
import {
  AuthenticationError,
  AuthorizationError,
  DuplicateError,
} from "@/utils/errors"
import { jobsByOrders } from "@/utils/options"
import { getEditorFromToken } from "@/services/editors"

// TODO : filtrer les déclarations pour les autres rôles
function buildWhereClause(user: UserLoggedModel) {
  if (user.role === "Gestionnaire d'ordre") {
    if (!(user?.scope as any)?.order)
      throw new Error("This is not supposed to happen")
    return {
      job: {
        in: jobsByOrders[(user.scope as any)?.order],
      },
    }
  }
}

const handler = async (
  req: NextApiRequest & { session: any },
  res: NextApiResponse,
) => {
  res.setHeader("Content-Type", "application/json")

  switch (req.method) {
    case "GET": {
      const user = req.session.get("user")

      if (!user?.isLoggedIn) {
        throw new AuthenticationError()
      }
      const whereClause = buildWhereClause(user)

      const totalCount = await prisma.declaration.count({
        where: whereClause,
      })

      const { pageIndex, pageSize, totalPages, prismaPaginationQueryParams } =
        await buildMetaPagination({
          totalCount,
          ...req.query,
        })

      const declarations = await prisma.declaration.findMany({
        orderBy: [{ createdAt: "desc" }],
        ...prismaPaginationQueryParams,
        where: whereClause,
      })

      return res.status(200).json({
        data: declarations,
        pageIndex,
        totalCount,
        pageSize,
        totalPages,
      })
    }

    case "POST": {
      const bearerError = new AuthorizationError(
        "A header 'Authorization: Bearer <editor-id>' must be present.",
      )

      const invalidTokenError = new AuthorizationError(
        "The provided token is not valid.",
      )

      if (
        !req.headers.authorization ||
        !/Bearer/.test(req.headers.authorization)
      )
        throw bearerError

      const token = req.headers.authorization.replace("Bearer", "").trim()

      if (!token) throw bearerError

      const schemaGuid = z.string().uuid()

      if (!schemaGuid.safeParse(token)?.success) {
        throw invalidTokenError
      }

      const editor = await getEditorFromToken(token)

      if (!editor) throw invalidTokenError

      try {
        const id = await create(req.body, editor)
        return res.status(200).json({ id })
      } catch (error) {
        console.error("Error Prisma ", error.message)
        if (error?.code === "P2002")
          throw new DuplicateError("A declaration with this id already exists.")
        else throw error
      }
    }
    default: {
      handleNotAllowedMethods(req, res)
    }
  }
}

const cors = Cors({
  allowMethods: ["GET", "OPTIONS", "POST"],
})

export default pipe(withSession, cors, handleApiError)(handler)
