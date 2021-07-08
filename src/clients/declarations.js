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
export const createDeclaration = async ({ declaration, keys }) => {
  let data = flatObject(declaration?.steps, keys)
  const { town, postalCode } = extractTownAndPostalCode(data?.town?.value)

  // Reminder : the id is generated client side, to prevent multiple submits.
  data.id = declaration.id
  data.declarationType = declaration.declarationType
  data.town = town
  data.postalCode = postalCode

  if (declaration?.steps?.job) {
    // TODO: see how to better manage job info transfer
    data.job = declaration.steps.job.job
  }

  return fetcher(`${API_URL}/${DECLARATION_ENDPOINT}`, {
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
}
export const findDeclaration = async (id) => {
  return fetcher(`${API_URL}/${DECLARATION_ENDPOINT}/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
}
