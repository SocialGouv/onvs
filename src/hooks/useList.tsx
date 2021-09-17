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
  search?: string // TODO : make filters more generic
  router: NextRouter
  options?: any
}

type ReturnType<T> = {
  error: Error | undefined
  isLoading: boolean
  urlNextPage: string
  urlPreviousPage: string
  message: AlertMessageType
  list: T[] | undefined
  totalCount: number
  totalPages: number
  firstElement: number
  lastElement: number
}

/**
 * Extract the pathname and the search params from the asPath of the router instance.
 *
 * This is necessary, because Next doesn't return a full router.query at first for static page.
 * So, in order to use the URL infos in a static page, you need to base you on this lower level mechanism.
 *
 * @param router
 * @returns
 */
export const extractPathAndSearchParams = (
  router: NextRouter,
): { pathName: string; searchParams: URLSearchParams } => {
  const [pathName, searchParams] = router.asPath.split("?")
  return {
    pathName,
    searchParams: new URLSearchParams(searchParams),
  }
}

// Update the URL bar & refreshing the page with the new filters.
// This has the advantage to have the back button to be working in CSR.
// In SSR though, the filter can't be returned, since router.query is returned in a second time. May be there is a solution for that?
export function refreshPageWithFilters(
  router: NextRouter,
  options: Record<string, string>,
): void {
  const { pathName, searchParams } = extractPathAndSearchParams(router)
  const newSearchParams = addInSearchParams(searchParams, options)
  router.replace(pathName + "?" + newSearchParams.toString())
}

export function addInSearchParams(
  searchParams: URLSearchParams | null,
  options: Record<string, string | undefined>,
): URLSearchParams {
  if (!searchParams) {
    searchParams = new URLSearchParams()
  }
  for (const param in options) {
    if (options[param] !== undefined) {
      searchParams.set(param, options[param]!)
    }
  }

  return searchParams
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

/** Hook */
export function useList<T>({
  apiUrl,
  pageIndex,
  pageSize = 50,
  search,
  router,
  options,
}: Props): ReturnType<T> {
  // We need to retrieve the params from URL bar
  const { pathName } = extractPathAndSearchParams(router)

  const searchParams = addInSearchParams(null, {
    pageIndex: String(pageIndex),
    pageSize: String(pageSize),
    search,
    ...options,
  })

  const {
    data,
    error,
  }: SWRResponse<PaginatedData<T>, Error> = useSWR(
    apiUrl + "?" + searchParams.toString(),
    fetcher,
  )

  const isLoading = !error && !data

  // Synchronize the pageIndex if the page index returned by the server is different.
  if (data && data.pageIndex !== pageIndex) {
    console.error("désynchro serveur client", data.pageIndex)
    searchParams.set("pageIndex", String(data.pageIndex))

    // Need a refetch with the new value for pageIndex.
    router.replace(pathName + "?" + searchParams.toString())
  }

  let params = new URLSearchParams(searchParams.toString())
  params.set("pageIndex", String(pageIndex + 1))
  const urlNextPage = pathName + "?" + params.toString()

  params = new URLSearchParams(searchParams.toString())
  params.set("pageIndex", pageIndex > 0 ? String(pageIndex - 1) : "0")
  const urlPreviousPage = pathName + "?" + params.toString()

  const message: AlertMessageType = error && {
    text: "Erreur de récupération des données",
    kind: "error",
  }

  const list = data?.data
  const totalCount = data?.totalCount || 0
  const totalPages = data?.totalPages || 0

  const firstElement = totalCount === 0 ? 0 : pageIndex * pageSize + 1
  const lastElement =
    totalCount === 0 ? 0 : firstElement + (list?.length || 0) - 1

  return {
    error,
    isLoading,
    urlNextPage,
    urlPreviousPage,
    message,
    list,
    totalCount,
    totalPages,
    firstElement,
    lastElement,
  }
}
