import Cors from "micro-cors"
import { Prisma } from "@prisma/client"

import prisma from "@/prisma/db"
import { OnvsError } from "@/utils/errors"
import { EtsApiSchema, EtsApiType } from "@/models/ets"
import { checkAllowedMethods, handleApiError } from "@/utils/api"
import { buildMetaPagination } from "@/utils/pagination"
import { pipe } from "lodash/fp"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  switch (req.method) {
    case "POST": {
      const { ets }: { ets: EtsApiType } = req?.body
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

      const { pageIndex, pageSize, totalPages, prismaPaginationQueryParams } =
        await buildMetaPagination({ totalCount, ...req.query })

      const etsList = await prisma.ets.findMany({
        where: {
          ...searchPrismaQuery,
        },
        orderBy: {
          finesset: "asc",
        },
        ...prismaPaginationQueryParams,
      })

      return res
        .status(200)
        .json({ data: etsList, pageIndex, totalCount, pageSize, totalPages })
    }
  }
}

const allowMethods = ["GET", "POST"]

export default pipe(
  Cors({
    allowMethods,
  }),
  checkAllowedMethods({ allowMethods }),
  handleApiError,
)(handler)
