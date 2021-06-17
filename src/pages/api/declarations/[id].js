import Cors from "micro-cors"

import { find } from "@/services/declarations"
import { isEmpty } from "@/utils/object"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"
import { DuplicateError } from "@/utils/errors"

const UNIQUE_VIOLATION_PG = "23505"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  try {
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
      default: {
        handleNotAllowedMethods(req, res)
      }
    }
  } catch (error) {
    if (error?.code === UNIQUE_VIOLATION_PG) {
      // eslint-disable-next-line no-ex-assign
      error = new DuplicateError(error.message)
    }

    handleErrors(error, res)
  }
}

const cors = Cors({
  allowMethods: ["GET", "OPTIONS"],
})

export default cors(handler)
