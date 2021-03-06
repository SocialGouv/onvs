import Cors from "micro-cors"
import withSession from "@/lib/session"
import { handleNotAllowedMethods, handleErrors } from "@/utils/api"

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST": {
        req.session.destroy()
        return res.json({ isLoggedIn: false })
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
