import Cors from "micro-cors"
import { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/prisma/db"
import { create } from "@/services/declarations"
import withSession from "@/lib/session"
import { UserLoggedModel } from "@/models/users"
import { buildMetaPagination } from "@/utils/pagination"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"
import {
  AuthenticationError,
  AuthorizationError,
  DuplicateError,
} from "@/utils/errors"
import { jobsByOrders } from "@/utils/options"
import { getEditorFromToken } from "@/services/editors"

const UNIQUE_VIOLATION_PG = "23505"

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

  try {
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
        if (
          !req.headers.authorization ||
          !/Bearer/.test(req.headers.authorization)
        )
          throw new AuthorizationError(
            "Un entête 'Authorization: Bearer <editor-id>' doit être présent.",
          )

        const token = req.headers.authorization.replace("Bearer", "").trim()

        const editor = await getEditorFromToken(token)

        if (!editor)
          throw new AuthorizationError(
            "Le token fourni n'est pas valide pour utiliser l'API.",
          )

        const id = await create(req.body, editor)

        return res.status(200).json({ id })
      }
      default: {
        handleNotAllowedMethods(req, res)
      }
    }
  } catch (error) {
    if (error?.code === UNIQUE_VIOLATION_PG) {
      // eslint-disable-next-line no-ex-assign
      error = new DuplicateError(error.message)
    }

    handleErrors(error, res)
  }
}

const cors = Cors({
  allowMethods: ["GET", "OPTIONS", "POST"],
})

export default withSession(cors(handler))
