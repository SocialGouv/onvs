import Cors from "micro-cors"
import { ZodError } from "zod"

import { OnvsError } from "@/utils/errors"
import prisma from "@/prisma/db"
import { UserApiType, UserApiSchema } from "@/models/users"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const { id } = req.query

  try {
    switch (req.method) {
      case "DELETE": {
        await prisma.user.delete({
          where: {
            id,
          },
        })

        return res.status(200).json({})
      }
      case "PATCH": {
        const { user }: { user: UserApiType } = req?.body
        const parsedUser = UserApiSchema.parse(user)

        const otherUser = await prisma.user.findFirst({
          where: {
            email: parsedUser?.email,
            id: {
              not: parsedUser.id,
            },
          },
        })

        if (otherUser) {
          throw new OnvsError("Un utilisateur avec ce courriel existe déjà.")
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: parsedUser?.id,
          },
          data: parsedUser,
        })

        return res.status(200).json({ user: updatedUser })
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
  allowMethods: ["DELETE", "PATCH", "OPTIONS"],
})

export default cors(handler)
