import Cors from "micro-cors"

import { find } from "@/services/declarations"
import { isEmpty } from "@/utils/object"
import { handleApiError, checkAllowedMethods } from "@/utils/api"
import { pipe } from "lodash/fp"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  switch (req.method) {
    case "GET": {
      const act = await find(req.query)

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
