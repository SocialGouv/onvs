import { API_URL } from "@/utils/config"
import fetcher from "@/utils/fetcher"

import { User } from "@prisma/client"

const USER_ENDPOINT = "users"

// Note: this function returns a Promise, as expected, even await is not required by return syntax.
export const createUser = async (params: { user: User }) => {
  return fetcher(`${API_URL}/${USER_ENDPOINT}`, {
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
}
