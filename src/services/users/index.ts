import { castDBToJS } from "@/models/users"
import { compareWithHash } from "@/utils/bcrypt"

import knex from "../../knex/knex"

import { UserModel } from "@/models/users"

export const findWithCredentials = async ({
  email,
  password,
}): Promise<UserModel | null> => {
  if (!email) {
    throw new Error("Bad request")
  }

  const [user] = await knex("users")
    .whereNull("deleted_at")
    .where("email", email)

  if (!(await compareWithHash(password, user?.password))) {
    throw new Error("Error in authentication")
  }

  // We ensure to not return the password.
  delete user.password

  return user ? castDBToJS(user) : null
}
