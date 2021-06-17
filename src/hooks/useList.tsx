import { AlertMessageType } from "@/components/Alert"
import fetcher from "@/utils/fetcher"
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
  search: string
  setPageIndex: (number) => void
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
  search,
  setPageIndex,
}: Props): ReturnType<T> {
  const key = !search
    ? `${url}?pageIndex=${pageIndex}`
    : `${url}?pageIndex=${pageIndex}&search=${search}`

  const goToNextPage = () => setPageIndex(pageIndex + 1)
  const goToPreviousPage = () =>
    pageIndex > 0 ? setPageIndex(pageIndex - 1) : 0

  const { data, error }: SWRResponse<PaginatedData<T>, Error> = useSWR(
    key,
    fetcher,
  )

  const isLoading = !error && !data

  // Synchronize the pageIndex if the page index returned by the server is different.
  if (data?.pageIndex !== pageIndex && data?.pageIndex)
    setPageIndex(data?.pageIndex)

  const message: AlertMessageType = error && {
    text: "Erreur de récupération des données",
    kind: "error",
  }

  const list = data?.data
  const totalCount = data?.totalCount || 0
  const pageSize = data?.pageSize || 50
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
