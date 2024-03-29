import Cors from "micro-cors"
import { pipe } from "lodash/fp"

import { EtsApiSchema } from "@/models/ets"
import {
  AuthenticationError,
  AuthorizationError,
  BadRequestError,
  InexistingResourceError,
} from "@/utils/errors"
import { checkAllowedMethods, handleApiError } from "@/utils/api"
import { deleteEts, findEts, updateEts } from "@/services/ets"
import withSession from "@/lib/session"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const { id } = req.query

  const user = req.session.get("user")
  if (!user?.isLoggedIn) {
    throw new AuthenticationError()
  }

  if (user.role !== "Administrateur") {
    throw new AuthorizationError()
  }

  switch (req.method) {
    case "PUT": {
      const { ets } = req.body
      const parsedEts = EtsApiSchema.parse(ets)

      if (id !== ets.id) {
        throw new BadRequestError("Bad inputs")
      }

      const existingEts = await findEts(id)

      if (!existingEts) {
        throw new InexistingResourceError(
          `There is no ETS for the corresponding n° FINESS ${parsedEts.finesset}.`,
        )
      }

      const updatedEts = updateEts({
        id,
        ets: parsedEts,
      })

      return res.status(200).json({ data: updatedEts })
    }
    case "GET": {
      if (!id) {
        throw new BadRequestError("Bad inputs")
      }

      const ets = await findEts(id)

      if (!ets) {
        throw new InexistingResourceError(`There is no ETS for the id ${id}.`)
      }

      return res.status(200).json({ data: ets })
    }
    case "DELETE": {
      const user = req.session.get("user")

      if (!user?.isLoggedIn) {
        throw new AuthenticationError()
      }

      // TODO: empêcher de supprimer logiquement un ETS si des gestionnaire d'ets existent pour cet ets ?
      await deleteEts(id)

      return res.status(200).json({})
    }
  }
}

const allowMethods = ["DELETE", "PUT", "GET"]

export default pipe(
  withSession,
  Cors({
    allowMethods,
  }),
  checkAllowedMethods({ allowMethods }),
  handleApiError,
)(handler)
