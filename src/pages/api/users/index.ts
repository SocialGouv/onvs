import Cors from "micro-cors"
import prisma from "@/prisma/db"

import { OnvsError } from "@/utils/errors"
import { UserApiSchema, UserApiType } from "@/models/users"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"

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
