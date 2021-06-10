import Alert, { AlertMessageType } from "@/components/Alert"
import Pagination from "@/components/Pagination"
import PrivateLayout from "@/components/PrivateLayout"
import Table from "@/components/Table"
import { FORMAT_DATE } from "@/utils/constants"
import fetcher from "@/utils/fetcher"
import { upperCaseFirstLetters } from "@/utils/string"
import { Declaration } from "@prisma/client"
import { format } from "date-fns"
import Link from "next/link"
import React from "react"
import useSWR, { SWRResponse } from "swr"
import { BadgeType } from "@/components/BadgeType"

function DeclarationAdministration() {
  const [pageIndex, setPageIndex] = React.useState(0)

  const goToNextPage = () => setPageIndex(pageIndex + 1)
  const goToPreviousPage = () =>
    pageIndex > 0 ? setPageIndex(pageIndex - 1) : 0

  type PaginatedDeclarations = {
    declarations: Declaration[]
    pageIndex: number
    totalCount: number
    totalPages: number
    pageSize: number
  }

  const { data, error }: SWRResponse<PaginatedDeclarations, Error> = useSWR(
    `/api/declarations?pageIndex=${pageIndex}`,
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

  const declarations = data?.declarations
  const totalCount = data?.totalCount || 0
  const pageSize = data?.pageSize || 50
  const totalPages = data?.totalPages || 0

  const firstElement = pageIndex * pageSize + 1
  const lastElement = firstElement + (declarations?.length || 0) - 1

  return (
    <PrivateLayout title="Déclarations" leftComponent={null}>
      <Alert message={message} />

      {isLoading ? (
        "Chargement..."
      ) : (
        <Table
          headers={["Date", "Type", "Métier", "Ville", "Description", ""].map(
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
          rows={declarations?.map((declaration) => (
            <tr key={declaration.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {declaration?.createdAt
                    ? format(new Date(declaration.createdAt), FORMAT_DATE)
                    : "N/A"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-800">
                  {declaration.declarationType && (
                    <BadgeType type={declaration.declarationType} />
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {declaration.job}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {upperCaseFirstLetters(declaration.town)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <span className="line-clamp-4">{declaration.description}</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <Link href={`/declaration/${declaration.id}`}>
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

export default DeclarationAdministration as React.ReactNode
