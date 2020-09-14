import { castJSToDB } from "@/models/declarations"

import knex from "../../knex/knex"

export const create = async (declaration) => {
  const declarationDB = await castJSToDB(declaration)
  const [id] = await knex("declarations").insert(declarationDB, "id")

  return id
}
