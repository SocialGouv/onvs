import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { format } from "date-fns"
import { saveAs } from "file-saver"
import debounce from "debounce-promise"

import { Declaration } from "@prisma/client"
import Alert, { AlertMessageType } from "@/components/Alert"
import Pagination from "@/components/Pagination"
import PrivateLayout from "@/components/PrivateLayout"
import Table from "@/components/Table"
import { BadgeType } from "@/components/BadgeType"
import { extractPaginationVariables, useList } from "@/hooks/useList"
import { EXPORT_LIMIT, FORMAT_DATE } from "@/utils/constants"
import { upperCaseFirstLetters } from "@/utils/string"
import { API_URL } from "@/utils/config"
import OutlineButton from "@/components/OutlineButton"
import { Input } from "@/components/lib"
import { toastConfig } from "@/config"
import { useToasts } from "react-toast-notifications"

function composeContactAgreementLabel(data) {
  return data === true ? (
    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
      Oui
    </span>
  ) : data === false ? (
    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
      Non
    </span>
  ) : (
    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-purple-800 bg-purple-100 rounded-full">
      N/A
    </span>
  )
}

function getFilters(formRef: React.MutableRefObject<null>) {
  const data = new FormData(formRef.current as unknown as HTMLFormElement)

  return Object.fromEntries(data)
}

function buildSearchParams(formRef: React.MutableRefObject<null>) {
  const { startDate, endDate } = getFilters(formRef)

  const params = new URLSearchParams()
  params.set("startDate", startDate?.toString())
  params.set("endDate", endDate?.toString())
  return params
}

function DeclarationAdministration() {
  const router = useRouter()
  const [errorExport, setErrorExport] = React.useState<AlertMessageType>()
  const [filtersOpened, setFiltersOpened] = React.useState(false)
  const { addToast } = useToasts()

  const formRef = React.useRef(null)

  const { pageIndex, pageSize } = extractPaginationVariables(router.query)
  const { startDate, endDate } = router.query

  const paginatedData = useList<Declaration>({
    apiUrl: "/api/declarations",
    pageIndex,
    pageSize,
    router,
    options: { startDate, endDate },
  })

  const { isLoading, message, list, totalCount } = paginatedData

  function handleSubmit() {
    setErrorExport(undefined)

    const params = buildSearchParams(formRef)

    router.replace("/private/declarations?" + params.toString())
  }

  const handleSubmitDebounced = debounce(handleSubmit, 400)

  /**
   * Je veux mettre des filtres.
   * Mais quand je ferme le volet, les inputs perdent leurs valeurs. (parce que le form n'est plus dans le dom je pense).
   * Or, les data sont toujours dans l'URL et l'appel de l'API est incohérent.
   *
   * Ça me paraît compliqué de gérer ça par l'URL.
   * Options :
   * - ne pas mettre à jour l'URL
   * - utiliser RHF (cf Medlé)
   *
   * Voir aussi si le toast fonctionne bien si le nombre de résultat est trop grand pour l'export.
   */

  return (
    <PrivateLayout
      title="Déclarations"
      leftComponent={null}
      rightComponent={
        <OutlineButton
          tabIndex={0}
          onClick={() => {
            const params = buildSearchParams(formRef)
            if (totalCount > EXPORT_LIMIT) {
              addToast(
                <div className="text-lg">
                  {`Le nombre d'éléments dépasse ${EXPORT_LIMIT} 😅. Veuillez filtrer votre recherche, svp.`}
                </div>,
                toastConfig.error,
              )

              return
            }

            saveAs(`${API_URL}/declarations/export?${params.toString()}`)
          }}
          disabled={!totalCount}
        >
          Exporter
        </OutlineButton>
      }
    >
      <Alert message={errorExport || message} />

      <OutlineButton
        onClick={() => {
          setFiltersOpened((filtersOpened) => !filtersOpened)
        }}
      >
        Filtres
      </OutlineButton>

      {}
      {filtersOpened && (
        <form
          ref={formRef}
          className="flex justify-center bg-blue-50 p-4 rounded-md"
          noValidate
          id="my-form"
        >
          <div>
            <label htmlFor="startDate">Date de début</label>

            <Input
              name="startDate"
              type="date"
              onChange={handleSubmitDebounced}
            />
          </div>
          <div className="ml-16">
            <label htmlFor="endDate">Date de fin</label>

            <Input
              name="endDate"
              type="date"
              onChange={handleSubmitDebounced}
            />
          </div>
        </form>
      )}
      {isLoading ? (
        "Chargement..."
      ) : (
        <div className="mt-4">
          <Table
            headers={[
              "Date de déclaration",
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
                      ? format(
                          new Date(declaration.createdAt as Date),
                          FORMAT_DATE,
                        )
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
                  <span className="line-clamp-4">
                    {declaration.description}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  <span className="line-clamp-4">
                    {composeContactAgreementLabel(
                      declaration.declarantContactAgreement,
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
        </div>
      )}
      <Pagination pageIndex={pageIndex} {...paginatedData} />
    </PrivateLayout>
  )
}

export default DeclarationAdministration as React.ReactNode
