import Cors from "micro-cors"
import { pipe } from "lodash/fp"

import prisma from "@/prisma/db"
import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  OnvsError,
} from "@/utils/errors"
import { UserApiType, UserApiSchema } from "@/models/users"
import { checkAllowedMethods, handleApiError } from "@/utils/api"
import withSession from "@/lib/session"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const user = req.session.get("user")
  if (!user?.isLoggedIn) {
    throw new AuthenticationError()
  }

  if (user.role !== "Administrateur") {
    throw new AuthorizationError()
  }

  const { id } = req.query

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

      if (id !== user.id) {
        throw new BadRequestError("Bad inputs")
      }

      const otherUser = await prisma.user.findFirst({
        where: {
          email: parsedUser?.email,
          id: {
            not: id,
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
  }
}

const allowMethods = ["DELETE", "PATCH"]

export default pipe(
  withSession,
  Cors({
    allowMethods,
  }),
  checkAllowedMethods({ allowMethods }),
  handleApiError,
)(handler)
