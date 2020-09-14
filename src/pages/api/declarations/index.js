import Cors from "micro-cors"

import { create } from "@/services/declarations"

const UNIQUE_VIOLATION_PG = "23505"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  try {
    switch (req.method) {
      case "GET": {
        return res.status(200).json({ message: "Work in progress" })
      }
      case "POST": {
        const id = await create(req.body)

        return res.status(200).json({ id })
      }
      default:
        if (req.method !== "OPTIONS") return res.status(405)
    }
  } catch (error) {
    if (error?.code === UNIQUE_VIOLATION_PG) res.status(409).json({ error })
    else res.status(500).json({ error })
  }
}

const cors = Cors({
  allowMethods: ["GET", "OPTIONS", "POST"],
})

export default cors(handler)
