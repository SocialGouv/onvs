import { format } from "date-fns"
import Cors from "micro-cors"

import { FORMAT_DATE } from "@/utils/constants"

import packageJson from "../../../package.json"
import knex from "../../knex/knex"

const { version } = packageJson

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  try {
    switch (req.method) {
      case "GET": {
        const [date] = await knex.select(knex.raw("now()"))

        const [globalCount] = await knex("declarations")
          .whereNull("deleted_at")
          .count()

        const [freelanceCount] = await knex("declarations")
          .whereNull("deleted_at")
          .where("declaration_type", "liberal")
          .count()

        const [freelanceCount31Days] = await knex("declarations")
          .whereNull("deleted_at")
          .where("declaration_type", "liberal")
          .whereRaw("created_at > now() - interval '31 days'")
          .count()

        const result = {
          buildVersion: version,
          currentDate: format(date.now, FORMAT_DATE),
          nbDeclarations: parseInt(globalCount?.count || 0, 10),
          nbFreelanceDeclarations: parseInt(freelanceCount?.count || 0, 10),
          nbFreelanceDeclarations31Days: parseInt(
            freelanceCount31Days?.count || 0,
            10,
          ),
        }

        return res.status(200).json(result)
      }
      default:
        if (req.method !== "OPTIONS") return res.status(405).end()
    }
  } catch (error) {
    console.error("ERreur API", error)
    res.status(500).json({ error })
  }
}

const cors = Cors({
  allowMethods: ["GET", "OPTIONS"],
})

export default cors(handler)
