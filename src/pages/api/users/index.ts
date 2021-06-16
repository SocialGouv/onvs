import Cors from "micro-cors"
import prisma from "@/prisma/db"

import { ZodError } from "zod"
import { OnvsError } from "@/utils/errors"
import { UserApiSchema, UserApiType } from "@/models/users"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const { user }: { user: UserApiType } = req?.body

  try {
    const parsedUser = UserApiSchema.parse(user)

    switch (req.method) {
      case "POST": {
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
  allowMethods: ["GET", "OPTIONS"],
})

export default cors(handler)
