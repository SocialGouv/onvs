import React from "react"
import { Control, Controller, FieldError } from "react-hook-form"
import AsyncSelect from "react-select/async"

import fetcher from "@/utils/fetcher"
import { SelectType } from "@/utils/select"

const composeUrl = (query) => {
  const searchParams = new URLSearchParams()
  searchParams.set("search", query)

  return "/api/ets?" + searchParams.toString()
}

export async function loadEtsList(search: string): Promise<Array<SelectType>> {
  const etsList = await fetcher(composeUrl(search))

  const options = etsList?.data?.map((ets) => ({
    label: `${ets.rs} (${ets.finesset})`,
    value: ets.id,
  }))

  return options
}

export default function EtsSelect({
  name,
  disabled = false,
  control,
  errors,
}: {
  name: string
  disabled?: boolean
  control: Control
  errors: Record<string, unknown>
}): JSX.Element {
  return (
    <>
      <Controller
        as={AsyncSelect}
        control={control}
        name={name}
        inputId={name}
        aria-label={name}
        loadOptions={(search) => loadEtsList(search)}
        isClearable={true}
        placeholder="Tapez le nom d'un établissement"
        noOptionsMessage={() => "Aucun résultat"}
        loadingMessage={() => "Chargement..."}
        isDisabled={disabled}
        aria-invalid={Boolean((errors["scope"] as FieldError)?.["ets"])}
      />
    </>
  )
}
