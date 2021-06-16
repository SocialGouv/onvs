import Cors from "micro-cors"
import { z, ZodError } from "zod"

import { OnvsError } from "@/utils/errors"
import { hashPassword } from "@/utils/bcrypt"
import prisma from "@/prisma/db"

const dataSchema = z.object({
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
        dataSchema.parse({ password, id })

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

      default:
        if (req.method !== "OPTIONS") return res.status(405).end()
    }
  } catch (error) {
    console.error("Erreur API", error)
    let message = "Erreur API"

    if (error instanceof ZodError) {
      const paths = error?.issues.map((issue) => issue.path)
      message = `Il y a des erreurs sur le(s) champ(s) : ${
        paths.length ? paths.join(",") : ""
      }`
    } else if (error instanceof OnvsError) {
      message = error.message
    }
    res.status(500).json({ message })
  }
}

const cors = Cors({
  allowMethods: ["PUT", "OPTIONS"],
})

export default cors(handler)
