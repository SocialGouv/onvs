import Cors from "micro-cors"

import { create } from "@/services/declarations"
import withSession from "@/lib/session"

import prisma from "@/prisma/db"
import { buildMetaPagination } from "@/utils/pagination"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"
import { AuthenticationError, DuplicateError } from "@/utils/errors"
import { UserLoggedModel } from "@/models/users"
import { jobsByOrders } from "@/utils/options"

const UNIQUE_VIOLATION_PG = "23505"

// TODO : je chercher à afficher uniquement les déclarations auxquelles on a droit, en fonction du rôle.
// User a un type qui est différent suivant les rôles (le scope n'est pas de la même forme). Je me demande s'il ne fautdait pas faire des
// interfaces différentes pour au moins éviter d'avoir des any, à défaut de pouvoir modifier le User model de prisma.

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

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  try {
    const user = req.session.get("user")

    if (!user?.isLoggedIn) {
      throw new AuthenticationError()
    }

    switch (req.method) {
      case "GET": {
        const whereClause = buildWhereClause(user)

        const totalCount = await prisma.declaration.count({
          where: whereClause,
        })

        const { pageIndex, pageSize, totalPages, prismaPaginationQueryParams } =
          await buildMetaPagination({ totalCount, ...req.query })

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
        const id = await create(req.body)

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
