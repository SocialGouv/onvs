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

type PartialUser = {
  [Property in keyof User]+?: User[Property]
}

export const updateUser = async ({ user }: { user: PartialUser }) => {
  if (!user?.id) throw new Error("Un id est nécessaire")

  return fetcher(`${API_URL}/${USER_ENDPOINT}/${user?.id}`, {
    body: JSON.stringify({ user }),
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  })
}

export const changePasswordUser = async ({
  id,
  password,
}: {
  id: string
  password: string
}) => {
  if (!id) throw new Error("Un id est nécessaire")

  return fetcher(`${API_URL}/${USER_ENDPOINT}/${id}/password`, {
    body: JSON.stringify({ password }),
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  })
}

export const deleteUser = async (id: string) => {
  return fetcher(`${API_URL}/${USER_ENDPOINT}/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  })
}
