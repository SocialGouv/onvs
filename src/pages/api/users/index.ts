import Cors from "micro-cors"
import prisma from "@/prisma/db"

import { OnvsError } from "@/utils/errors"
import { UserApiSchema, UserApiType } from "@/models/users"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"
import { Prisma } from ".prisma/client"
import { buildMetaPagination } from "@/utils/pagination"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  try {
    switch (req.method) {
      case "POST": {
        const { user }: { user: UserApiType } = req?.body
        const parsedUser = UserApiSchema.parse(user)

        const otherUser = await prisma.user.findFirst({
          where: {
            email: parsedUser?.email,
            deletedAt: null,
          },
        })

        if (otherUser) {
          throw new OnvsError("Un utilisateur avec ce courriel existe déjà.")
        }

        const createdUser = await prisma.user.create({ data: parsedUser })

        return res.status(200).json({ user: createdUser })
      }
      case "GET": {
        const { search } = req.query

        const searchPrismaQuery = search
          ? {
              OR: [
                {
                  email: {
                    contains: search,
                    mode: "insensitive" as Prisma.QueryMode,
                  },
                },
                {
                  lastName: {
                    contains: search,
                    mode: "insensitive" as Prisma.QueryMode,
                  },
                },
              ],
            }
          : {}

        const totalCount = await prisma.user.count({
          where: {
            ...searchPrismaQuery,
          },
        })

        const { pageIndex, pageSize, totalPages, prismaPaginationQueryParams } =
          await buildMetaPagination({ totalCount, ...req.query })

        const userList = await prisma.user.findMany({
          where: {
            ...searchPrismaQuery,
          },
          orderBy: {
            email: "asc",
          },
          ...prismaPaginationQueryParams,
        })

        return res
          .status(200)
          .json({ data: userList, pageIndex, totalCount, pageSize, totalPages })
      }
      default: {
        handleNotAllowedMethods(req, res)
      }
    }
  } catch (error) {
    handleErrors(error, res)
  }
}

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"],
})

export default cors(handler)
