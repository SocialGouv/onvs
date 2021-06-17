import Alert from "@/components/Alert"
import Pagination from "@/components/Pagination"
import PrivateLayout from "@/components/PrivateLayout"
import Table from "@/components/Table"
import { useList } from "@/hooks/useList"
import { upperCaseFirstLetters } from "@/utils/string"
import { Ets } from "@prisma/client"
import Link from "next/link"
import React from "react"

function EtsAdministration() {
  const [pageIndex, setPageIndex] = React.useState(0)
  const [search, setSearch] = React.useState("")

  const paginatedData = useList<Ets>({
    url: "/api/ets",
    pageIndex,
    search,
    setPageIndex,
  })

  const { isLoading, message, list } = paginatedData

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
          rows={list?.map((ets) => (
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
      <Pagination pageIndex={pageIndex} {...paginatedData} />
    </PrivateLayout>
  )
}

export default EtsAdministration as React.ReactNode
