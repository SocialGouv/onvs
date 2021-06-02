// NB: react-table hooks build key so we can disable the jsx-key rule for this file.
/* eslint-disable react/jsx-key */

import React from "react"
import { useTable } from "react-table"

import PrivateLayout from "@/components/PrivateLayout"

import { upperCaseFirstLetters } from "@/utils/string"

import { OutlineButton } from "@/components/lib"
import { Declaration } from "@prisma/client"
import useSWR, { SWRResponse } from "swr"
import fetcher from "@/utils/fetcher"

import { format } from "date-fns"

import { FORMAT_DATE } from "@/utils/constants"
import Alert from "@/components/Alert"
import { useRouter } from "next/router"

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

  const { data: declarations, error }: SWRResponse<Declaration[], Error> =
    useSWR("/api/declarations", fetcher)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: declarations || [] })

  if (!declarations?.length) return "Chargement..."

  return (
    <PrivateLayout
      title="Déclarations"
      leftComponent={null}
      rightComponent={
        <OutlineButton
          tabIndex="0"
          onClick={() => console.log("création de déclaration")}
        >
          +&nbsp;Ajouter
        </OutlineButton>
      }
    >
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
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  )
}

export default DeclarationAdministration as React.ReactNode
