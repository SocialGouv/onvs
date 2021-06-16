import Cors from "micro-cors"
import prisma from "@/prisma/db"

import { BadRequestError, InexistingResourceError } from "@/utils/errors"
import { EtsApiSchema } from "@/models/ets"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"

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
      default: {
        handleNotAllowedMethods(req, res)
      }
    }
  } catch (error) {
    handleErrors(error, res)
  }
}

const cors = Cors({
  allowMethods: ["DELETE", "PUT", "OPTIONS"],
})

export default cors(handler)
