import Cors from "micro-cors"
import withSession from "@/lib/session"
import { findWithCredentials } from "@/services/users"
import { handleNotAllowedMethods, handleErrors } from "@/utils/api"

const handler = async (req, res) => {
  const { email, password } = await req.body
  res.setHeader("Content-Type", "application/json")

  try {
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
  } catch (error) {
    handleErrors(error, res)
  }
}

const cors = Cors({
  allowMethods: ["OPTIONS", "POST"],
})

export default withSession(cors(handler))
