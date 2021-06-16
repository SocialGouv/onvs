import Cors from "micro-cors"
import prisma from "@/prisma/db"

import { ZodError } from "zod"
import {
  BadRequestError,
  InexistingResourceError,
  OnvsError,
} from "@/utils/errors"
import { EtsApiSchema } from "@/models/ets"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const { id } = req.query

  try {
    switch (req.method) {
      case "PUT": {
        const ets = req.body
        const parsedEts = EtsApiSchema.parse(ets)

        if (id !== ets.id) {
          throw new BadRequestError("Bad inputs")
        }

        const existingEts = await prisma.ets.findUnique({
          where: {
            id,
          },
        })

        if (!existingEts) {
          throw new InexistingResourceError(
            `There is no ETS for the corresponding n° FINESS ${parsedEts.finesset}.`,
          )
        }

        const updatedEts = await prisma.ets.update({
          where: {
            id,
          },
          data: parsedEts,
        })

        return res.status(200).json({ ets: updatedEts })
      }
      case "DELETE": {
        // TODO: empêcher de supprimer logiquement un ETS si des gestionnaire d'ets existent pour cet ets ?
        await prisma.ets.update({
          where: {
            id,
          },
          data: { deletedAt: new Date() },
        })

        return res.status(200).json({})
      }
      default:
        if (req.method !== "OPTIONS") return res.status(405).end()
    }
  } catch (error) {
    console.error("API error", error)
    let message = "API error"

    if (error?.statusCode) {
      res.status(error?.statusCode).json({ message: error.message })
    } else if (error instanceof ZodError) {
      const paths = error?.issues.map((issue) => issue.path)
      message = `Error on field(s) : ${paths.length ? paths.join(",") : ""}`
    } else if (error instanceof OnvsError) {
      message = error.message
    }
    res.status(500).json({ message })
  }
}

const cors = Cors({
  allowMethods: ["DELETE", "PUT", "OPTIONS"],
})

export default cors(handler)
