type ReturnType = {
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  prismaQueryParams: { skip: number; take: number }
}

const DEFAULT_PAGE_SIZE = 50

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

  pageIndex = Math.min(pageIndex, totalPages)

  const prismaQueryParams = {
    skip: pageIndex > 0 ? pageIndex * pageSize : 0,
    take: pageSize,
  }

  return {
    pageIndex,
    pageSize,
    totalCount,
    totalPages,
    prismaQueryParams,
  }
}
