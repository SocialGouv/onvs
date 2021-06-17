import Alert, { AlertMessageType } from "@/components/Alert"
import Pagination from "@/components/Pagination"
import PrivateLayout from "@/components/PrivateLayout"
import Table from "@/components/Table"
import fetcher from "@/utils/fetcher"
import { upperCaseFirstLetters } from "@/utils/string"
import { Ets } from "@prisma/client"
import Link from "next/link"
import React from "react"
import useSWR, { SWRResponse } from "swr"

type PaginatedDeclarations = {
  data: Ets[]
  pageIndex: number
  totalCount: number
  totalPages: number
  pageSize: number
}

function EtsAdministration() {
  const [pageIndex, setPageIndex] = React.useState(0)
  const [search, setSearch] = React.useState("")

  const key = !search
    ? `/api/ets?pageIndex=${pageIndex}`
    : `/api/ets?pageIndex=${pageIndex}&search=${search}`

  const goToNextPage = () => setPageIndex(pageIndex + 1)
  const goToPreviousPage = () =>
    pageIndex > 0 ? setPageIndex(pageIndex - 1) : 0

  const { data, error }: SWRResponse<PaginatedDeclarations, Error> = useSWR(
    key,
    fetcher,
  )

  const isLoading = !error && !data

  // Synchronize the pageIndex if the page index returned by the server is different.
  if (data?.pageIndex !== pageIndex && data?.pageIndex)
    setPageIndex(data?.pageIndex)

  const message: AlertMessageType = error && {
    text: "Erreur de récupération des déclarations",
    kind: "error",
  }

  const etsList = data?.data
  const totalCount = data?.totalCount || 0
  const pageSize = data?.pageSize || 50
  const totalPages = data?.totalPages || 0

  const firstElement = pageIndex * pageSize + 1
  const lastElement = firstElement + (etsList?.length || 0) - 1

  return (
    <PrivateLayout title="Déclarations" leftComponent={null}>
      <Alert message={message} />

      {isLoading ? (
        "Chargement..."
      ) : (
        <Table
          headers={["N° FINESS", "Raison sociale", "Ville", ""].map(
            (header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-800 uppercase"
              >
                {header}
              </th>
            ),
          )}
          rows={etsList?.map((ets) => (
            <tr key={ets.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-800">
                  {/* {ets.finesset && <BadgeType type={ets.finesset} />} */}
                  {ets.finesset}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {ets.rs}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {upperCaseFirstLetters(ets.town)}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <Link href={`/ets/${ets.id}`}>
                  <a className="text-blue-600 hover:text-blue-900">Voir</a>
                </Link>
              </td>
            </tr>
          ))}
        />
      )}
      <Pagination
        firstElement={firstElement}
        lastElement={lastElement}
        totalCount={totalCount}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        pageIndex={pageIndex}
        totalPages={totalPages}
      />
    </PrivateLayout>
  )
}

export default EtsAdministration as React.ReactNode
