import fetcher from "@/utils/fetcher"

const API_URL = "http://localhost:3030/api/"
const DECLARATION_ENDPOINT = "declarations"

// Note: this function returns a Promise, as expected, even await is not required by return syntax.
export const createDeclaration = async (declaration) =>
  fetcher(API_URL + DECLARATION_ENDPOINT, {
    body: JSON.stringify(declaration?.form),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
