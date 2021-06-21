import { API_URL } from "@/utils/config"
import fetcher from "@/utils/fetcher"

import { EtsModel, PartialEtsModel } from "@/models/ets"

const ETS_ENDPOINT = "ets"

export const createEts = async (params: {
  ets: EtsModel
}): Promise<{ data: EtsModel }> => {
  return fetcher(`${API_URL}/${ETS_ENDPOINT}`, {
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
}

export const updateEts = async ({
  ets,
}: {
  ets: PartialEtsModel
}): Promise<{ data: EtsModel }> => {
  if (!ets?.id) throw new Error("Un id est nécessaire")

  return fetcher(`${API_URL}/${ETS_ENDPOINT}/${ets?.id}`, {
    body: JSON.stringify({ ets }),
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  })
}

export const deleteEts = async (id: string): Promise<void> => {
  return fetcher(`${API_URL}/${ETS_ENDPOINT}/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  })
}
