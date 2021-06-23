import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { format } from "date-fns"

import { Declaration } from "@prisma/client"
import Alert from "@/components/Alert"
import Pagination from "@/components/Pagination"
import PrivateLayout from "@/components/PrivateLayout"
import Table from "@/components/Table"
import { BadgeType } from "@/components/BadgeType"
import { useList } from "@/hooks/useList"
import { FORMAT_DATE } from "@/utils/constants"
import { upperCaseFirstLetters } from "@/utils/string"

function composeContactAgreementLabel(data) {
  return data === "true" ? (
    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
      Oui
    </span>
  ) : data === "false" ? (
    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
      Non
    </span>
  ) : (
    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-purple-800 bg-purple-100 rounded-full">
      N/A
    </span>
  )
}

function DeclarationAdministration() {
  const router = useRouter()
  const [pageIndex, setPageIndex] = React.useState(0)

  const paginatedData = useList<Declaration>({
    url: "/api/declarations",
    pageIndex,
    router,
  })

  const { isLoading, message, list } = paginatedData

  return (
    <PrivateLayout title="Déclarations" leftComponent={null}>
      <Alert message={message} />

      {isLoading ? (
        "Chargement..."
      ) : (
        <Table
          headers={[
            "Date du signalement",
            "Type",
            "Métier",
            "Ville",
            "Description",
            "À contacter",
            "",
          ].map((header) => (
            <th
              key={header}
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-800 uppercase"
            >
              {header}
            </th>
          ))}
          rows={list?.map((declaration) => (
            <tr
              key={declaration.id}
              onClick={() => router.push(`/declaration/${declaration.id}`)}
              className="cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {declaration?.date
                    ? format(new Date(declaration.date), FORMAT_DATE)
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
              <td className="px-6 py-4 text-sm text-gray-800">
                <span className="line-clamp-4">
                  {composeContactAgreementLabel(
                    declaration.declarant_contact_agreement,
                  )}
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <Link href={`/declaration/${declaration.id}`}>
                  <a className="text-blue-600 hover:text-blue-900">Fiche</a>
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
