import * as yup from "yup"

import * as common from "./common"

// Mapping keys from JS model to DB model
const mappingJStoDB = {
  createdAt: "created_at",
  email: "email",
  id: "id",
  password: "password",
  role: "role",
  scope: "scope",
}

const schemaJS = yup.object({
  createdAt: yup.string(),
  email: yup.string(),
  id: yup.string(),
  password: yup.string(),
  role: yup.string(),
  scope: yup.string(),
})

const schemaDB = yup.object({})

export const { castJSToDB, castDBToJS, validateJS } = common.build({
  entityName: "users",
  mappingJStoDB,
  schemaDB,
  schemaJS,
})

export type Roles =
  | "Gestionnaire géographique"
  | "Gestionnaire établissement"
  | "Gestionnaire multi-établissements"
  | "Administrateur"

export interface UserModel {
  id: string
  last_name: string
  first_name: string
  email: string
  role: Roles
  scope: string
  isLoggedIn: boolean
}
