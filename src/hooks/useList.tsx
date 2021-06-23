import { AlertMessageType } from "@/components/Alert"
import fetcher from "@/utils/fetcher"
import { NextRouter } from "next/router"
import useSWR, { SWRResponse } from "swr"

// NB: the API must accept 3 variables.
// - pageIndex for the number of the page
// - pageSize for the size of one page
// - search to search by a main token

// Interface for the return type by the API.
type PaginatedData<T> = {
  data: T[]
  pageIndex: number
  totalCount: number
  totalPages: number
  pageSize: number
}

type Props = {
  url: string
  pageIndex: number
  pageSize?: number
  search?: string
  router: NextRouter
}

type ReturnType<T> = {
  error: Error | undefined
  isLoading: boolean
  goToNextPage: () => void
  goToPreviousPage: () => void
  message: AlertMessageType
  list: T[] | undefined
  totalCount: number
  totalPages: number
  firstElement: number
  lastElement: number
}

export function useList<T>({
  url,
  pageIndex,
  pageSize = 50,
  search,
  router,
}: Props): ReturnType<T> {
  const params = { pageIndex, pageSize, search }

  const urlParams = new URLSearchParams()

  for (const param in params) {
    if (params[param] || params[param] === 0) {
      urlParams.set(param, params[param])
    }
  }

  console.log("urlParams", urlParams.toString())

  const { data, error }: SWRResponse<PaginatedData<T>, Error> = useSWR(
    url + "?" + urlParams.toString(),
    fetcher,
  )

  const isLoading = !error && !data

  const basePath = router.asPath.split("?")[0]

  // Synchronize the pageIndex if the page index returned by the server is different.
  if (data && data.pageIndex !== pageIndex) {
    console.log("désynchro serveur client", data.pageIndex)
    urlParams.set("pageIndex", String(data.pageIndex))

    // Need a refetch with the newly value for pageIndex.
    router.replace(basePath + "?" + urlParams.toString())
  }

  const goToNextPage = () => {
    const params = new URLSearchParams(urlParams.toString())
    params.set("pageIndex", String(pageIndex + 1))

    router.replace(basePath + "?" + params.toString())
  }
  const goToPreviousPage = () => {
    const params = new URLSearchParams(urlParams.toString())
    params.set("pageIndex", pageIndex > 0 ? String(pageIndex - 1) : "0")

    router.replace(basePath + "?" + params.toString())
  }

  const message: AlertMessageType = error && {
    text: "Erreur de récupération des données",
    kind: "error",
  }

  const list = data?.data
  const totalCount = data?.totalCount || 0
  // const pageSize = data?.pageSize || 50
  const totalPages = data?.totalPages || 0

  const firstElement = pageIndex * pageSize + 1
  const lastElement = firstElement + (list?.length || 0) - 1

  return {
    error,
    isLoading,
    goToNextPage,
    goToPreviousPage,
    message,
    list,
    totalCount,
    totalPages,
    firstElement,
    lastElement,
  }
}
