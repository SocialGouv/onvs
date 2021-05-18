import { validate as uuidValidate } from "uuid";

import { getHelpers } from "@/models/index";

import knex from "../../knex/knex";

export const create = async (declaration) => {
  const type = declaration?.declarationType;

  if (!type) {
    throw new Error("The declarationType must be present");
  }

  const { castJSToDB } = getHelpers(type);

  const declarationDB = await castJSToDB(declaration);
  const [id] = await knex("declarations").insert(declarationDB, "id");

  return id;
};

export const find = async ({ id }) => {
  if (!id || !uuidValidate(id)) {
    throw new Error("Bad request");
  }
  const [declaration] = await knex("declarations")
    .whereNull("declarations.deleted_at")
    .where("declarations.id", id);

  const type = declaration?.declaration_type;
  const { castDBToJS } = getHelpers(type);

  return declaration ? castDBToJS(declaration) : null;
};
