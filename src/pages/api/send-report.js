import dotenv from "dotenv"
import Cors from "micro-cors"

import { sendReportEmailTask } from "../../scheduler/report-email"

dotenv.config()

const METHODS = ["POST", "OPTIONS"]
const token = process.env.MAIL_WEBHOOK_TOKEN

const parseTokenFromHeader = (authorizationHeader) =>
  authorizationHeader.split(/\s+/)[1]

const getTokenFromHeaders = (headers) =>
  headers.authorization ? parseTokenFromHeader(headers.authorization) : null

const handler = async (req, res) => {
  if (!token) {
    return res.status(500).json({
      message: "No token provided in configuration file",
    })
  }

  const requestToken = getTokenFromHeaders(req.headers)

  if (token !== requestToken) {
    return res.status(403).json({
      message: "Wrong token provided",
    })
  }

  if (!METHODS.includes(req.method)) {
    return res.status(405).end()
  }

  await sendReportEmailTask()

  res.status(204).end()
}

const cors = Cors({
  allowMethods: ["POST", "OPTIONS"],
})

export default cors(handler)
