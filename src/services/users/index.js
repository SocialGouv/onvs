import { castDBToJS } from "@/models/users"
import { compareWithHash } from "@/utils/bcrypt"

import knex from "../../knex/knex"

export const findWithCredentials = async ({ email, password }) => {
  if (!email) {
    throw new Error("Bad request")
  }

  const [user] = await knex("users")
    .whereNull("deleted_at")
    .where("email", email)

  if (!(await compareWithHash(password, user?.password))) {
    throw new Error("Error in authentication")
  }

  return user ? castDBToJS(user) : null
}