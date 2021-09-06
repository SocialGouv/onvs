import Cors from "micro-cors"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { pipe } from "lodash/fp"

import { createDeclaration, searchDeclarations } from "@/services/declarations"
import withSession from "@/lib/session"
import { checkAllowedMethods, handleApiError } from "@/utils/api"
import {
  AuthenticationError,
  AuthorizationError,
  DuplicateError,
} from "@/utils/errors"
import { getEditorFromToken } from "@/services/editors"

const handler = async (
  req: NextApiRequest & { session: any },
  res: NextApiResponse,
) => {
  res.setHeader("Content-Type", "application/json")

  switch (req.method) {
    case "GET": {
      const user = req.session.get("user")

      if (!user?.isLoggedIn) {
        throw new AuthenticationError()
      }

      const { declarations, pageIndex, totalCount, pageSize, totalPages } =
        await searchDeclarations({ user, ...req.query })

      return res.status(200).json({
        data: declarations,
        pageIndex,
        totalCount,
        pageSize,
        totalPages,
      })
    }

    case "POST": {
      const bearerError = new AuthorizationError(
        "A header 'Authorization: Bearer <editor-id>' must be present.",
      )

      const invalidTokenError = new AuthorizationError(
        "The provided token is not valid.",
      )

      if (
        !req.headers.authorization ||
        !/Bearer/.test(req.headers.authorization)
      )
        throw bearerError

      const token = req.headers.authorization.replace("Bearer", "").trim()

      if (!token) throw bearerError

      const schemaGuid = z.string().uuid()

      if (!schemaGuid.safeParse(token)?.success) {
        throw invalidTokenError
      }

      const editor = await getEditorFromToken(token)

      if (!editor) throw invalidTokenError

      try {
        const id = await createDeclaration(req.body, editor)
        return res.status(200).json({ id })
      } catch (error) {
        console.error("Error Prisma ", error.message)
        if (error?.code === "P2002")
          throw new DuplicateError("A declaration with this id already exists.")
        else throw error
      }
    }
  }
}

const allowMethods = ["GET", "POST"]

export default pipe(
  withSession,
  Cors({
    allowMethods,
  }),
  checkAllowedMethods({ allowMethods }),
  handleApiError,
)(handler)
