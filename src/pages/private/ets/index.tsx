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
import { useList } from "@/hooks/useList"
import { upperCaseFirstLetters } from "@/utils/string"

import { DEFAULT_PAGE_SIZE } from "@/utils/pagination"

function EtsAdministration() {
  const router = useRouter()
  // const [pageIndex, setPageIndex] = React.useState(0)

  const initialSearch = Array.isArray(router?.query?.search)
    ? router.query.search[0]
    : router.query.search || ""

  const [search, setSearch] = React.useState(initialSearch)
  const [debouncedSearch] = useDebounce(search, 400)

  // Je veux gérer l'affichage de la page et des données associées, à partir des params de l'url : pageIndex, pageSize, search.
  // Mon idée est de faire une pagination qui modifie l'url du navigateur, ce qui présente plusieurs avantages :
  // - avoir une url partageable
  // - pouvoir faire un router.replace, qui permet quand on est sur la page de détail et qu'on fait back, de revenir sur le filtre qu'on a fait précédemment

  console.log("pageIndex", router?.query?.pageIndex)

  React.useEffect(() => {
    console.log("dans le useEffect debounce")
    const path = router.asPath

    const [basePath, ...searchParams] = path.split("?")

    const urlParams = new URLSearchParams(searchParams.join("&"))

    urlParams.set("search", debouncedSearch)

    router.replace(basePath + "?" + urlParams.toString())
  }, [debouncedSearch])

  const { pageIndex: pageIndexQuery, pageSize: pageSizeInQuery } = router.query

  const pageIndex = Number(pageIndexQuery) || 0
  const pageSize = Number(pageSizeInQuery) || DEFAULT_PAGE_SIZE

  const paginatedData = useList<Ets>({
    url: "/api/ets",
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

export default EtsAdministration as React.ReactNode
