import Alert from "@/components/Alert"
import Pagination from "@/components/Pagination"
import PrivateLayout from "@/components/PrivateLayout"
import Table from "@/components/Table"
import { FORMAT_DATE } from "@/utils/constants"
import { upperCaseFirstLetters } from "@/utils/string"
import { Declaration } from "@prisma/client"
import { format } from "date-fns"
import Link from "next/link"
import React from "react"
import { BadgeType } from "@/components/BadgeType"
import { useList } from "@/hooks/useList"

function DeclarationAdministration() {
  const [pageIndex, setPageIndex] = React.useState(0)
  const [search, setSearch] = React.useState("")

  const paginatedData = useList<Declaration>({
    url: "/api/declarations",
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
          rows={list?.map((declaration) => (
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
      <Pagination pageIndex={pageIndex} {...paginatedData} />
    </PrivateLayout>
  )
}

export default DeclarationAdministration as React.ReactNode
