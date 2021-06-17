import Cors from "micro-cors"

import { OnvsError } from "@/utils/errors"
import prisma from "@/prisma/db"
import { UserApiType, UserApiSchema } from "@/models/users"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"

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

      default: {
        handleNotAllowedMethods(req, res)
      }
    }
  } catch (error) {
    handleErrors(error, res)
  }
}

const cors = Cors({
  allowMethods: ["DELETE", "PATCH", "OPTIONS"],
})

export default cors(handler)
