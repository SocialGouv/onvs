import { API_URL } from "@/utils/config"
import fetcher from "@/utils/fetcher"
import { flatObject } from "@/utils/object"

const DECLARATION_ENDPOINT = "declarations"

// Note: this function returns a Promise, as expected, even await is not required by return syntax.
export const createDeclaration = async ({ declaration, keys }) => {
  const data = flatObject(declaration?.steps, keys)
  // Reminder : the id is generated client side, to prevent multiple submits
  data.id = declaration.id
  data.declarationType = declaration.declarationType

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
