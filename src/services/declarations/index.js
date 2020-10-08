import { validate as uuidValidate } from "uuid"

import { castDBToJS, castJSToDB } from "@/models/declarations"

import knex from "../../knex/knex"

export const create = async (declaration) => {
  const declarationDB = await castJSToDB(declaration)
  const [id] = await knex("declarations").insert(declarationDB, "id")

  return id
}

export const find = async ({ id }) => {
  if (!id || !uuidValidate(id)) {
    throw new Error("Bad request")
  }

  const [declaration] = await knex("declarations")
    .whereNull("declarations.deleted_at")
    .where("declarations.id", id)

  return declaration ? castDBToJS(declaration) : null
}
