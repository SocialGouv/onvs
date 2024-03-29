import Cors from "micro-cors"
import withSession from "@/lib/session"
import { findWithCredentials } from "@/services/users"
import { checkAllowedMethods, handleApiError } from "@/utils/api"
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
