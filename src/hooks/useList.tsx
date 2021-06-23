import { AlertMessageType } from "@/components/Alert"
import fetcher from "@/utils/fetcher"
import { NextRouter } from "next/router"
import useSWR, { SWRResponse } from "swr"
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination"
import { ParsedUrlQuery } from "querystring"

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
  apiUrl: string
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

// Update the URL bar & refreshing the page with the new filters.
// This has the advantage to have the back button to be working in CSR.
// In SSR though, the filter can't be returned, since router.query is returned in a second time. May be there is a solution for that?
export function refreshPageWithFilters(
  router: NextRouter,
  options: Record<string, string>,
): void {
  const path = router.asPath
  const [pathName, searchParams] = path.split("?")
  const newSearchParams = buildSearchParams(searchParams, options)

  console.log({ newSearchParams: newSearchParams.toString() })
  router.replace(pathName + "?" + newSearchParams.toString())
}

export function buildSearchParams(
  searchParams: string,
  options: Record<string, string | undefined>,
): URLSearchParams {
  const newSearchParams = new URLSearchParams(searchParams)

  for (const param in options) {
    if (options[param] !== undefined) {
      newSearchParams.set(param, options[param]!)
    }
  }

  return newSearchParams
}

// Extract and normalize pageIndex and pageSize.
export function extractPaginationVariables(query: ParsedUrlQuery): {
  pageIndex: number
  pageSize: number
} {
  const { pageIndex: pageIndexQuery, pageSize: pageSizeInQuery } = query

  return {
    pageIndex: Number(pageIndexQuery) || 0,
    pageSize: Number(pageSizeInQuery) || DEFAULT_PAGE_SIZE,
  }
}

// A variable returned by router.query may be an array of string, a string or undefined. We assume & ensure to always have a simple string or undefined.
export const normalizeSingleValueExpectedQuery = (
  query?: string[] | string,
): string => (Array.isArray(query) ? query[0] : query || "")

/** Hook */
export function useList<T>({
  apiUrl,
  pageIndex,
  pageSize = 50,
  search,
  router,
}: Props): ReturnType<T> {
  // We need to retrieve the params from URL bar, since search is not in the useList at first (because of debounce).
  const currentSearchParams = router.asPath.split("?")?.[1] || ""

  const urlParams = buildSearchParams(currentSearchParams, {
    pageIndex: String(pageIndex),
    pageSize: String(pageSize),
    search,
  })

  const { data, error }: SWRResponse<PaginatedData<T>, Error> = useSWR(
    apiUrl + "?" + urlParams.toString(),
    fetcher,
  )

  const isLoading = !error && !data

  const [pathName] = router.asPath.split("?")

  // Synchronize the pageIndex if the page index returned by the server is different.
  if (data && data.pageIndex !== pageIndex) {
    console.error("désynchro serveur client", data.pageIndex)
    urlParams.set("pageIndex", String(data.pageIndex))

    // Need a refetch with the newly value for pageIndex.
    router.replace(pathName + "?" + urlParams.toString())
  }

  const goToNextPage = () => {
    const params = new URLSearchParams(urlParams.toString())
    params.set("pageIndex", String(pageIndex + 1))
    router.replace(pathName + "?" + params.toString())
  }
  const goToPreviousPage = () => {
    const params = new URLSearchParams(urlParams.toString())
    params.set("pageIndex", pageIndex > 0 ? String(pageIndex - 1) : "0")
    router.replace(pathName + "?" + params.toString())
  }

  const message: AlertMessageType = error && {
    text: "Erreur de récupération des données",
    kind: "error",
  }

  const list = data?.data
  const totalCount = data?.totalCount || 0
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
