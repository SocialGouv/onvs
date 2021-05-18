import { renameKeys, revertObject } from "../utils/object";

const configValidate = {
  abortEarly: false,
  strict: false,
};

const validate =
  (schema, entityName = "") =>
  async (model) => {
    try {
      const value = await schema.validate(model, configValidate);
      return value;
    } catch (error) {
      console.error(error);
      console.error("Modèle JS : ", model);
      throw new Error(
        `Données invalides ${entityName ? ` (${entityName} modèle)` : ""}`
      );
    }
  };

const cast = (schema, mapping, entityName) => async (model) => {
  const res = await validate(schema, entityName)(model);
  return renameKeys(res, mapping);
};

/**
 * Builder of helpers to validate, cast between JS model objects and db objects.
 *
 * @param mappingJStoDB object with corresponding names between JS objects model and db columns.
 * @param schemaJS validation schema for JS model objects
 * @param schemaDB validation schema for db objects
 * @param entityName name of the entity
 *
 * @returns object with helpers
 */
export const build = ({ mappingJStoDB, schemaJS, schemaDB, entityName }) => {
  const mappingDBToJS = revertObject(mappingJStoDB);

  return {
    castDBToJS: cast(schemaDB, mappingDBToJS, entityName),
    castJSToDB: cast(schemaJS, mappingJStoDB, entityName),
    validateJS: validate(schemaJS, entityName),
  };
};
