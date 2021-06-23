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
  normalizeSingleValueExpectedQuery,
  refreshPageWithFilters,
  extractPaginationVariables,
} from "@/hooks/useList"
import { upperCaseFirstLetters } from "@/utils/string"

/** Page component */
function EtsAdministrationPage() {
  const router = useRouter()
  console.log("query", router?.query)
  const initialSearch = normalizeSingleValueExpectedQuery(router?.query?.search)
  const [search, setSearch] = React.useState(initialSearch)
  const [debouncedSearch] = useDebounce(search, 400)

  // Mon problème est que router?.query est vide au démarrage (limitation de Next).
  // Donc debouncedSearch, lance ce useEffect avec une option qui a la propriété search à "".
  // Le refreshPageWithFilters récupère donc les pageSize et pageIndex via l'URL mais pas le search.
  // Comment différencier le cas où le search est vide car Next ne l'a pas encore envoyé de la chaîne vide, cas possible quand l'utilisateur réinitialise son filtre?

  React.useEffect(() => {
    refreshPageWithFilters(router, { search: debouncedSearch })
  }, [debouncedSearch])

  const { pageIndex, pageSize } = extractPaginationVariables(router.query)
  console.log("search", search)
  console.log("initial", router?.query?.search)
  console.log("debouncedSearch", debouncedSearch)
  console.log("pageIndex", pageIndex)
  console.log("pageSize", pageSize)

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
      title="Liste des établissements"
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
      <input
        type="text"
        name="search"
        id="search"
        className="block w-full mb-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Rechercher par FINESS ou raison sociale"
        autoComplete="off"
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
