// import { revertObject } from "../utils/object"

const configValidate = {
  abortEarly: false,
  strict: false,
}

const validate = (schema, entityName = "") => async (model) => {
  try {
    const value = await schema.validate(model, configValidate)
    return value
  } catch (error) {
    console.error(error)
    throw new Error(
      `Données invalides ${entityName ? ` (${entityName} modèle)` : ""}`,
    )
  }
}

const castJSToDB = (schema, mappingJStoDB, entityName) => async (model) =>
  validate(schema, entityName)(model)
// const castDBToJS = (mappingDBtoJS) => async (model) => validate(model)

export const build = ({ mappingJStoDB, schemaJSToDB, entityName }) => {
  // const innerTransform = transform(mappingJStoDB)
  // const mappingDBToJS = revertObject(mappingJStoDB)

  return {
    // castDBToJS: castDBToJS(schemaDBToJS, mappingDBToJS, entityName),
    castJSToDB: castJSToDB(schemaJSToDB, mappingJStoDB, entityName),
    validateJS: validate(schemaJSToDB, entityName),
  }
}
