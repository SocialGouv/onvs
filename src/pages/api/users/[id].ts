import Cors from "micro-cors"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const { id } = req.query

  try {
    switch (req.method) {
      case "DELETE": {
        await prisma.user.delete({
          where: {
            id,
          },
        })

        return res.status(200).json({})
      }
      default:
        if (req.method !== "OPTIONS") return res.status(405).end()
    }
  } catch (error) {
    console.error("Erreur API", error)
    let message = "Erreur API"

    res.status(500).json({ message })
  }
}

const cors = Cors({
  allowMethods: ["DELETE", "OPTIONS"],
})

export default cors(handler)
