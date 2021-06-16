import Cors from "micro-cors"
import prisma from "@/prisma/db"

import { OnvsError } from "@/utils/errors"
import { EtsApiSchema, EtsApiType } from "@/models/ets"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"

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
            deletedAt: null,
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
        const etsList = await prisma.ets.findMany({
          where: {
            deletedAt: null,
          },
          orderBy: {
            finesset: "asc",
          },
        })

        console.log({ etsList })

        return res.status(200).json({ data: etsList })
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
