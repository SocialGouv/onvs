import Cors from "micro-cors"
import { z } from "zod"

import { OnvsError } from "@/utils/errors"
import { hashPassword } from "@/utils/bcrypt"
import prisma from "@/prisma/db"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"

const bodySchema = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional(),
})

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const { id } = req.query

  try {
    switch (req.method) {
      case "PUT": {
        const { password }: { password: string } = req?.body
        bodySchema.parse({ password, id })

        const user = await prisma.user.findFirst({
          where: {
            id,
          },
        })

        if (!user) {
          throw new OnvsError(`Aucun utilisateur n'existe avec l'id ${id}`)
        }

        await prisma.user.update({
          where: {
            id,
          },
          data: {
            password: await hashPassword(password),
          },
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
  allowMethods: ["PUT", "OPTIONS"],
})

export default cors(handler)
