import Cors from "micro-cors"
import prisma from "@/prisma/db"
import { Prisma } from "@prisma/client"

import { OnvsError } from "@/utils/errors"
import { EtsApiSchema, EtsApiType } from "@/models/ets"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"
import { buildMetaPagination } from "@/utils/pagination"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  try {
    switch (req.method) {
      case "POST": {
        const ets: EtsApiType = req?.body
        const parsedEts = EtsApiSchema.parse(ets)

        const otherEts = await prisma.ets.findFirst({
          where: {
            finesset: parsedEts.finesset,
          },
        })

        if (otherEts) {
          throw new OnvsError(
            `An ETS with the FINESS n° ${otherEts.finesset} is already existing.`,
          )
        }

        const createdEts = await prisma.ets.create({ data: parsedEts })

        return res.status(200).json({ data: createdEts })
      }
      case "GET": {
        const { search } = req.query

        const searchPrismaQuery = search
          ? {
              OR: [
                {
                  rs: {
                    contains: search,
                    mode: "insensitive" as Prisma.QueryMode,
                  },
                },
                {
                  finesset: {
                    contains: search,
                    mode: "insensitive" as Prisma.QueryMode,
                  },
                },
              ],
            }
          : {}

        const totalCount = await prisma.ets.count({
          where: {
            ...searchPrismaQuery,
          },
        })

        const { pageIndex, pageSize, totalPages, prismaQueryParams } =
          await buildMetaPagination({ totalCount, ...req.query })

        const etsList = await prisma.ets.findMany({
          where: {
            ...searchPrismaQuery,
          },
          orderBy: {
            finesset: "asc",
          },
          ...prismaQueryParams,
        })

        return res
          .status(200)
          .json({ data: etsList, pageIndex, totalCount, pageSize, totalPages })
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
  allowMethods: ["GET", "OPTIONS"],
})

export default cors(handler)
