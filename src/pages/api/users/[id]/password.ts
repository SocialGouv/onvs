import Cors from "micro-cors"
import { z } from "zod"
import { pipe } from "lodash/fp"

import prisma from "@/prisma/db"
import {
  AuthenticationError,
  AuthorizationError,
  OnvsError,
} from "@/utils/errors"
import { hashPassword } from "@/utils/bcrypt"
import { checkAllowedMethods, handleApiError } from "@/utils/api"
import withSession from "@/lib/session"

const bodySchema = z.object({
  id: z.string().uuid().optional(),
  password: z.string().optional(),
})

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
  }
}

const allowMethods = ["PUT"]

export default pipe(
  withSession,
  Cors({
    allowMethods,
  }),
  checkAllowedMethods({ allowMethods }),
  handleApiError,
)(handler)
