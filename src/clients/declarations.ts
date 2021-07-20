import { DeclarationModel } from "@/models/declarations"
import { API_URL } from "@/utils/config"
import fetcher from "@/utils/fetcher"
import { flatObject } from "@/utils/object"

const DECLARATION_ENDPOINT = "declarations"

// Extract town and postal code in the field. For example : "Nantes (44000)".
function extractTownAndPostalCode(town) {
  // Regex magic ✨
  // There is 2 captured groups : 1/ everthing before a parenthesis, 2/ everything between the '(' and the ')'.
  const groups = town?.match(/([^(]+)\(([^)]+)\)/)

  if (groups?.[2]) {
    return { town: groups[1]?.trim(), postalCode: groups[2]?.trim() }
  }
  return { town }
}

// Note: this function returns a Promise, as expected, even await is not required by return syntax.
export const createDeclaration = async ({
  declaration,
  keys,
}: {
  declaration: any
  keys: Array<any>
}): Promise<string> => {
  const data = flatObject(declaration?.steps, keys)
  const { town, postalCode } = extractTownAndPostalCode(data?.town?.label)

  // console.log("declaration", declaration)
  // console.log("data", data)

  // Reminder : the id is generated client side, to prevent multiple submits.
  data.id = declaration.id
  data.declarationType = declaration.declarationType
  data.town = town
  data.postalCode = postalCode

  data.hour = data.hour.label

  if (declaration?.steps?.job) {
    // job is outside the ordered steps by flow. Refactor the wizard forms to better manage job info transfer
    data.job = declaration.steps.job.job.label
  }

  // LOCATION ---------------------------------------------------------------

  if (data.declarationType === "ets") {
    // Filling the legacy columns (renamed in _deprecated to distinguish them).
    if (data.locationMain?.label) {
      data.locationMain_deprecated = data.locationMain.label
    }

    if (data.locationSecondary?.label) {
      data.locationSecondary_deprecated = data.locationSecondary.label
    }

    // Filling the new column.
    data.location = {
      "Dans quel service ?": data.locationMain?.label,
      "Dans quel lieu précisément ?": data.locationSecondary?.label,
    }

    // We need to remove these fields since they are renamed in _deprecated.
    delete data.locationMain
    delete data.locationSecondary
  } else {
    // Should be the liberal flow.
    data.location_deprecated = data.location
    data.otherLocation_deprecated = data.otherLocation

    // Fill the new column.
    data.location = {
      "Dans quel lieu précisément ?": data.otherLocation
        ? ["Autre", data.otherLocation]
        : data.location,
    }

    // We need to remove the newly deprecated fied as zod expect not to see it.
    delete data.otherLocation
  }

  // DECLARANT_CONTACT_AGREEMENT ---------------------------------------------------------------
  // Filling the legacy column for user agreement (renamed in _deprecated).
  data.declarantContactAgreement_deprecated = data.declarantContactAgreement
  // Filling the new column for user agreement (which is of boolean type and can be null)
  data.declarantContactAgreement =
    data.declarantContactAgreement_deprecated === "true"
      ? true
      : data.declarantContactAgreement_deprecated === "false"
      ? false
      : null

  // TODO: the victims and authors shouldn't be with the { label, value } shape in db.
  // Do a migration to reshape the data in db (prod) and make the following to adapt the client.

  // let victims = data.victims

  // if (victims?.length) {
  //   victims = victims.map((victim) => {
  //     return {
  //       ...victim,
  //       type: victim.type.label,
  //       gender: victim.gender.label,
  //       age: victim.age.label,
  //     }
  //   })

  //   data.victims = victims
  // }

  // let authors = data.authors

  // if (authors?.length) {
  //   authors = authors.map((author) => {
  //     return {
  //       ...author,
  //       type: author.type.label,
  //       gender: author.gender.label,
  //       age: author.age.label,
  //     }
  //   })

  //   data.authors = authors
  // }

  // console.log("dans clients", data)

  return fetcher(`${API_URL}/${DECLARATION_ENDPOINT}`, {
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
}
export const findDeclaration = async (
  id: string,
): Promise<DeclarationModel> => {
  return fetcher(`${API_URL}/${DECLARATION_ENDPOINT}/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
}
