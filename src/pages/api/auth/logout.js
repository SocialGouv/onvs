import Cors from "micro-cors"
import withSession from "@/lib/session"
import { checkAllowedMethods, handleApiError } from "@/utils/api"
import { pipe } from "lodash/fp"

const handler = async (req, res) => {
  switch (req.method) {
    case "POST": {
      req.session.destroy()
      return res.json({ isLoggedIn: false })
    }
  }
}

const allowMethods = ["POST"]

export default pipe(
  withSession,
  Cors({
    allowMethods,
  }),
  checkAllowedMethods({ allowMethods }),
  handleApiError,
)(handler)
