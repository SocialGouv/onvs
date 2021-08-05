import Cors from "micro-cors"
import withSession from "@/lib/session"
import { handleNotAllowedMethods, handleApiError } from "@/utils/api"
import { pipe } from "lodash/fp"

const handler = async (req, res) => {
  switch (req.method) {
    case "POST": {
      req.session.destroy()
      return res.json({ isLoggedIn: false })
    }
    default: {
      handleNotAllowedMethods(req, res)
    }
  }
}

const cors = Cors({
  allowMethods: ["OPTIONS", "POST"],
})

export default pipe(withSession, cors, handleApiError)(handler)
