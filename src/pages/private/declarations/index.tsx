// NB: react-table hooks build key so we can disable the jsx-key rule for this file.
/* eslint-disable react/jsx-key */

import Alert from "@/components/Alert"
import { OutlineButton } from "@/components/lib"
import Pagination from "@/components/Pagination"
import PrivateLayout from "@/components/PrivateLayout"
import { FORMAT_DATE } from "@/utils/constants"
import fetcher from "@/utils/fetcher"
import { upperCaseFirstLetters } from "@/utils/string"
import { Declaration } from "@prisma/client"
import { format } from "date-fns"
import { useRouter } from "next/router"
import React from "react"
import { useTable } from "react-table"
import useSWR, { SWRResponse } from "swr"

function BadgeType({ type }) {
  switch (type) {
    case "ets": {
      return (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-blue-100 rounded-full">
          Établissement
        </span>
      )
    }
    case "liberal": {
      return (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          Libéral
        </span>
      )
    }
  }
}

function DeclarationAdministration() {
  const router = useRouter()

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        Cell: ({ value }) => format(new Date(value), FORMAT_DATE),
        accessor: "createdAt",
      },
      {
        Header: "Type",
        accessor: "declarationType",
        Cell: ({ value }) => BadgeType({ type: value }),
      },
      {
        Header: "Métier",
        accessor: "job",
      },
      {
        Header: "Ville",
        accessor: "town",
        Cell: ({ value }) => upperCaseFirstLetters(value),
      },
      {
        Header: "Description",
        // eslint-disable-next-line react/display-name
        Cell: ({ value }) => <span className="line-clamp-4">{value}</span>,
        accessor: "description",
      },
      {
        id: "Voir",
        // eslint-disable-next-line react/display-name
        accessor: (row) => (
          <OutlineButton onClick={() => router.push(`/declaration/${row.id}`)}>
            Voir
          </OutlineButton>
        ),
      },
    ],
    [],
  )

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

  const declarations = data?.declarations
  const totalCount = data?.totalCount || 0
  const pageSize = data?.pageSize
  const totalPages = data?.totalPages || 0

  const firstElement = pageIndex * pageSize! + 1
  const lastElement = firstElement + declarations?.length! - 1

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: declarations?.length ? declarations : [] })

  // synchronize if the page index SSR is different
  if (data?.pageIndex !== pageIndex && data?.pageIndex)
    setPageIndex(data?.pageIndex)

  if (!declarations?.length) return "Chargement..."
  return (
    <PrivateLayout title="Déclarations" leftComponent={null}>
      {error && <Alert title="Erreur de récupération des déclarations" />}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody
                  className="bg-white divide-y divide-gray-200"
                  {...getTableBodyProps()}
                >
                  {rows.map((row) => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="px-6 py-4 ">
                              {cell.render("Cell")}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <Pagination
                firstElement={firstElement}
                lastElement={lastElement}
                totalCount={totalCount}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
                pageIndex={pageIndex}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  )
}

export default DeclarationAdministration as React.ReactNode
