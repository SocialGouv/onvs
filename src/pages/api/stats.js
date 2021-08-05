import { format } from "date-fns"
import Cors from "micro-cors"

import { FORMAT_DATE } from "@/utils/constants"

import packageJson from "../../../package.json"
import knex from "../../knex/knex"
import { pipe } from "lodash/fp"
import { checkAllowedMethods, handleApiError } from "@/utils/api"

const { version } = packageJson

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  switch (req.method) {
    case "GET": {
      const [date] = await knex.select(knex.raw("now()"))

      const [globalCount] = await knex("declarations").count()

      const [freelanceCount] = await knex("declarations")
        .where("declaration_type", "liberal")
        .count()

      const [freelanceCount31Days] = await knex("declarations")
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
  }
}
const allowMethods = ["GET"]

export default pipe(
  Cors({
    allowMethods,
  }),
  checkAllowedMethods({ allowMethods }),
  handleApiError,
)(handler)
