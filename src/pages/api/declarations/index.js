import Cors from "micro-cors"

import { create } from "@/services/declarations"

import prisma from "@/prisma/db"

const UNIQUE_VIOLATION_PG = "23505"

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  try {
    switch (req.method) {
      case "GET": {
        let { pageIndex, pageSize } = req.query

        pageIndex = Number(pageIndex) || 0
        pageSize = Number(pageSize) || 50

        const totalCount = await prisma.declaration.count()
        const totalPages = Math.max(0, Math.ceil(totalCount / pageSize) - 1)

        pageIndex = Math.min(pageIndex, totalPages)

        const declarations = await prisma.declaration.findMany({
          orderBy: [{ createdAt: "desc" }],
          skip: pageIndex > 0 ? pageIndex * pageSize : 0,
          take: pageSize,
        })

        if (!declarations?.length) {
          return res
            .status(404)
            .json({ message: "Server error: no declaration found." })
        }

        return res
          .status(200)
          .json({ declarations, pageIndex, totalCount, pageSize, totalPages })
      }

      case "POST": {
        const id = await create(req.body)

        return res.status(200).json({ id })
      }
      default:
        if (req.method !== "OPTIONS") return res.status(405)
    }
  } catch (error) {
    console.error("Erreur API", error)
    if (error?.code === UNIQUE_VIOLATION_PG) res.status(409).json({ error })
    else if (error.message === "Bad request") res.status(400).end()
    else res.status(500).json({ error })
  }
}

const cors = Cors({
  allowMethods: ["GET", "OPTIONS", "POST"],
})

export default cors(handler)
