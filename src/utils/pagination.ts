type ReturnType = {
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  prismaPaginationQueryParams: { skip: number; take: number }
}

export const DEFAULT_PAGE_SIZE = 50

/**
 * Compute all useful variables for pagination.
 */
export async function buildMetaPagination({
  pageIndex,
  pageSize,
  totalCount,
}: {
  pageIndex: number
  pageSize: number
  totalCount: number
}): Promise<ReturnType> {
  pageIndex = Number(pageIndex) || 0
  pageSize = Number(pageSize) || DEFAULT_PAGE_SIZE

  const totalPages = Math.max(0, Math.ceil(totalCount / pageSize))

  pageIndex = Math.min(pageIndex, totalPages > 0 ? totalPages - 1 : 0)

  const prismaPaginationQueryParams = {
    skip: pageIndex > 0 ? pageIndex * pageSize : 0,
    take: pageSize,
  }

  return {
    pageIndex,
    pageSize,
    totalCount,
    totalPages,
    prismaPaginationQueryParams,
  }
}
