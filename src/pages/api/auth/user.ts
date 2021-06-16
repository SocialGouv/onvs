import Cors from "micro-cors"
import withSession from "@/lib/session"
import { handleNotAllowedMethods, handleErrors } from "@/utils/api"

const handler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET": {
        const user = req.session.get("user")

        if (user) {
          // in a real world application you might read the user id from the session and then do a database request
          // to get more information on the user if needed
          return res.json({
            isLoggedIn: true,
            ...user,
          })
        } else {
          return res.json({
            isLoggedIn: false,
          })
        }
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
  allowMethods: ["OPTIONS", "GET"],
})

export default withSession(cors(handler))
