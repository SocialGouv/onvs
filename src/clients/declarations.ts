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

  // For declarationType == hospital
  if (data.locationMain?.label) {
    data.locationMain = data.locationMain.label
  }

  if (data.locationSecondary?.label) {
    data.locationSecondary = data.locationSecondary.label
  }

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
