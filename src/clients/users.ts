import { API_URL } from "@/utils/config"
import fetcher from "@/utils/fetcher"

import { UserModel, PartialUserModel } from "@/models/users"

const USER_ENDPOINT = "users"

export const createUser = async (params: {
  user: UserModel
}): Promise<{ data: UserModel }> => {
  return fetcher(`${API_URL}/${USER_ENDPOINT}`, {
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
}

export const updateUser = async ({
  user,
}: {
  user: PartialUserModel
}): Promise<{ data: UserModel }> => {
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
}): Promise<void> => {
  if (!id) throw new Error("Un id est nécessaire")

  return fetcher(`${API_URL}/${USER_ENDPOINT}/${id}/password`, {
    body: JSON.stringify({ password }),
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  })
}

export const deleteUser = async (id: string): Promise<void> => {
  return fetcher(`${API_URL}/${USER_ENDPOINT}/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  })
}
