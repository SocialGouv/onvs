import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { saveAs } from "file-saver"
import { format, isFuture, parseISO } from "date-fns"
import * as yup from "yup"

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
import { toastConfig } from "@/config"
import { useToasts } from "react-toast-notifications"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import { InputText } from "@/components/Form"

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

function buildSearchParams({ startDate, endDate }) {
  const params = new URLSearchParams()
  if (startDate) params.set("startDate", startDate.toString())
  if (endDate) params.set("endDate", endDate.toString())
  return params
}

const formSchema = yup.object({
  startDate: yup
    .string()
    .test("est-future", "La date ne peut pas être future.", function (value) {
      if (!value) return true
      const date = parseISO(value)
      return !isFuture(date)
    }),
  endDate: yup
    .string()
    .test("est-future", "La date ne peut pas être future.", function (value) {
      if (!value) return true
      const date = parseISO(value)
      return !isFuture(date)
    }),
})

export type FormType = yup.TypeOf<typeof formSchema>

function normalizeInput(input) {
  return Array.isArray(input) ? input[0] : input
}

function DeclarationAdministration() {
  const router = useRouter()
  const [errorExport, setErrorExport] = React.useState<AlertMessageType>()
  const { addToast } = useToasts()
  const { pageIndex, pageSize } = extractPaginationVariables(router.query)
  const { startDate, endDate } = router.query

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(formSchema),
  })

  React.useEffect(() => {
    // Since router.query is not accessible in SSR, we need to wait for router to be ready.
    if (!router.isReady) return

    // Now, the dates are accessible in the query.
    reset({
      startDate: normalizeInput(startDate),
      endDate: normalizeInput(endDate),
    })
  }, [router.isReady])

  const paginatedData = useList<Declaration>({
    apiUrl: "/api/declarations",
    pageIndex,
    pageSize,
    router,
    options: { startDate, endDate },
  })

  const { isLoading, message, list, totalCount } = paginatedData

  function onSubmit(data: FormType) {
    setErrorExport(undefined)

    const params = buildSearchParams(data)

    router.replace("/private/declarations?" + params.toString())
  }

  return (
    <PrivateLayout
      title="Déclarations"
      leftComponent={null}
      rightComponent={
        <OutlineButton
          tabIndex={0}
          onClick={() => {
            const params = buildSearchParams({ startDate, endDate })
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center bg-blue-50 p-4 rounded-md"
        noValidate
        id="my-form"
      >
        <div>
          <InputText
            label="Date de début"
            name="startDate"
            type="date"
            register={register}
            errors={errors}
            aria-invalid={!!errors?.startDate?.message}
            onChange={() => {
              handleSubmit(onSubmit)()
            }}
          />
        </div>
        <div className="ml-16">
          <InputText
            label="Date de fin"
            name="endDate"
            type="date"
            register={register}
            errors={errors}
            aria-invalid={!!errors?.endDate?.message}
            onChange={handleSubmit(onSubmit)}
          />
        </div>
      </form>

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
