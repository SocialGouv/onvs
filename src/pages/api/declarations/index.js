import Cors from "micro-cors"

import { create } from "@/services/declarations"

import prisma from "@/prisma/db"
import { buildMetaPagination } from "@/utils/pagination"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"
import { DuplicateError } from "@/utils/errors"

const UNIQUE_VIOLATION_PG = "23505"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  try {
    switch (req.method) {
      case "GET": {
        const totalCount = await prisma.declaration.count()

        const { pageIndex, pageSize, totalPages, prismaQueryParams } =
          await buildMetaPagination({ totalCount, ...req.query })

        const declarations = await prisma.declaration.findMany({
          orderBy: [{ createdAt: "desc" }],
          ...prismaQueryParams,
        })

        return res
          .status(200)
          .json({ declarations, pageIndex, totalCount, pageSize, totalPages })
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
      error.statusCode = 409
    }

    handleErrors(error, res)
  }
}

const cors = Cors({
  allowMethods: ["GET", "OPTIONS", "POST"],
})

export default cors(handler)
