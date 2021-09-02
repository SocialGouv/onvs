import Cors from "micro-cors"

import { findDeclaration } from "@/services/declarations"
import { isEmpty } from "@/utils/object"
import { handleApiError, checkAllowedMethods } from "@/utils/api"
import { pipe } from "lodash/fp"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  switch (req.method) {
    case "GET": {
      const { id } = req.query
      const act = await findDeclaration(id)

      if (!act || isEmpty(act)) {
        res
          .status(404)
          .json({ error: "Server error : the declaration doesn't exist." })
        return
      }

      return res.status(200).json(act)
    }
  }
}

const allowMethods = ["GET"]

export default pipe(
  Cors({
    allowMethods,
  }),
  checkAllowedMethods({ allowMethods }),
  handleApiError,
)(handler)
