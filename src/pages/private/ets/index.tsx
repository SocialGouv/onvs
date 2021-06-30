import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useDebounce } from "use-debounce"

import { Ets } from "@prisma/client"
import Alert from "@/components/Alert"
import Pagination from "@/components/Pagination"
import PrivateLayout from "@/components/PrivateLayout"
import Table from "@/components/Table"
import OutlineButton from "@/components/OutlineButton"
import {
  useList,
  refreshPageWithFilters,
  extractPaginationVariables,
  extractPathAndSearchParams,
} from "@/hooks/useList"
import { upperCaseFirstLetters } from "@/utils/string"
import { InputSearch } from "@/components/Form"

function EtsAdministrationPage() {
  const router = useRouter()
  // We need to get "search" from the URL bar to populate the state.
  const { searchParams } = extractPathAndSearchParams(router)
  const [search, setSearch] = React.useState(searchParams?.get("search") || "")
  const [debouncedSearch] = useDebounce(search, 400)

  React.useEffect(() => {
    refreshPageWithFilters(router, { search: debouncedSearch })
  }, [debouncedSearch])

  const { pageIndex, pageSize } = extractPaginationVariables(router.query)

  const paginatedData = useList<Ets>({
    apiUrl: "/api/ets",
    pageIndex,
    pageSize,
    search: debouncedSearch,
    router,
  })

  const { message, list } = paginatedData

  return (
    <PrivateLayout
      title="Établissements"
      leftComponent={null}
      rightComponent={
        <OutlineButton
          tabIndex={0}
          onClick={() => router.push("./ets/creation")}
        >
          +&nbsp;Ajouter
        </OutlineButton>
      }
    >
      <Alert message={message} />

      <InputSearch
        id="search"
        placeholder="Rechercher par FINESS ou raison sociale"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {
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
            <tr
              key={ets.id}
              onClick={() => router.push(`/private/ets/${ets.id}/edition`)}
              className="cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-800">{ets.finesset}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {ets.rs}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {upperCaseFirstLetters(ets.town)}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <Link href={`/private/ets/${ets.id}/edition`}>
                  <a className="text-blue-600 hover:text-blue-900">Voir</a>
                </Link>
              </td>
            </tr>
          ))}
        />
      }

      <Pagination pageIndex={pageIndex} {...paginatedData} />
    </PrivateLayout>
  )
}

export default EtsAdministrationPage as React.ReactNode
