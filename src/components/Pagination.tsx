export default function Pagination({
  firstElement,
  lastElement,
  totalCount,
  goToPreviousPage,
  goToNextPage,
  pageIndex,
  totalPages,
}: {
  firstElement: number
  lastElement: number
  totalCount: number
  goToPreviousPage: () => void
  goToNextPage: () => void
  pageIndex: number
  totalPages: number
}): JSX.Element {
  const canGoToPreviousPage = pageIndex > 0
  const canGoToNextPage = pageIndex < totalPages - 1

  return (
    <nav
      className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Éléments <span className="font-medium">{firstElement}</span> à{" "}
          <span className="font-medium">{lastElement}</span> des{" "}
          <span className="font-medium">{totalCount}</span> résultats
        </p>
      </div>
      <div className="flex justify-between flex-1 sm:justify-end">
        <button
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          onClick={goToPreviousPage}
          disabled={!canGoToPreviousPage}
        >
          Précédent
        </button>
        <button
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          onClick={goToNextPage}
          disabled={!canGoToNextPage}
        >
          Suivant
        </button>
      </div>
    </nav>
  )
}
