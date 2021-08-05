import Cors from "micro-cors"
import withSession from "@/lib/session"
import { findWithCredentials } from "@/services/users"
import { handleNotAllowedMethods, handleApiError } from "@/utils/api"
import { pipe } from "lodash/fp"

const handler = async (req, res) => {
  const { email, password } = await req.body
  res.setHeader("Content-Type", "application/json")

  switch (req.method) {
    case "POST": {
      const user = {
        ...(await findWithCredentials({ email, password })),
        isLoggedIn: true,
      }

      req.session.set("user", user)
      await req.session.save()
      return res.status(200).json(user)
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
