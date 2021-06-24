import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { User } from "@prisma/client"
import PrivateLayout from "@/components/PrivateLayout"
import { OutlineButton } from "@/components/lib"
import Table from "@/components/Table"
import Pagination from "@/components/Pagination"
import { InputSearch } from "@/components/Form"
import Alert from "@/components/Alert"
import {
  extractPaginationVariables,
  extractPathAndSearchParams,
  refreshPageWithFilters,
  useList,
} from "@/hooks/useList"
import { useDebounce } from "use-debounce"

const UsersListPage = (): JSX.Element => {
  const router = useRouter()
  // We need to get "search" from the URL bar to populate the state.
  const { searchParams } = extractPathAndSearchParams(router)
  const [search, setSearch] = React.useState(searchParams?.get("search") || "")
  const [debouncedSearch] = useDebounce(search, 400)

  React.useEffect(() => {
    refreshPageWithFilters(router, { search: debouncedSearch })
  }, [debouncedSearch])

  const { pageIndex, pageSize } = extractPaginationVariables(router.query)

  const paginatedData = useList<User>({
    apiUrl: "/api/users",
    pageIndex,
    pageSize,
    search: debouncedSearch,
    router,
  })

  const { message, list } = paginatedData

  return (
    <PrivateLayout
      title="Utilisateurs"
      leftComponent={null}
      rightComponent={
        <OutlineButton
          tabIndex={0}
          onClick={() => router.push("./users/creation")}
        >
          +&nbsp;Ajouter
        </OutlineButton>
      }
    >
      <Alert message={message} />
      <InputSearch
        id="search"
        placeholder="Rechercher par nom ou par courriel"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Table
        headers={["Nom", "Email", "Rôle"].map((header) => (
          <th
            key={header}
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            {header}
          </th>
        ))}
        rows={list?.map((person) => (
          <tr
            key={person.email}
            onClick={() => router.push(`/private/users/${person.id}/edition`)}
            className="cursor-pointer"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{person.firstName}</div>
              <div className="text-sm text-gray-500">{person.lastName}</div>
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap">
              {person.email}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap">
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                {person.role}
              </span>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <Link href={`/private/users/${person.id}/edition`}>
                <a className="text-blue-600 hover:text-blue-900">Voir</a>
              </Link>
            </td>
          </tr>
        ))}
      />
      <Pagination pageIndex={pageIndex} {...paginatedData} />
    </PrivateLayout>
  )
}

export default UsersListPage as React.ReactNode
