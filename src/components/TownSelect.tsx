import React from "react"
import { Control, Controller } from "react-hook-form"
import AsyncSelect from "react-select/async"

import fetcher from "@/utils/fetcher"
import { buildSelectOptions } from "@/utils/select"

const BAN_URL = "https://api-adresse.data.gouv.fr/search/?"

const composeBanUrl = (query) => {
  const searchParams = new URLSearchParams(`type=municipality&autocomplete=1`)

  searchParams.set("q", query)

  return BAN_URL + searchParams.toString()
}

const fetchCity = async (query) => {
  return fetcher(composeBanUrl(query))
}

export default function TownSelect({
  name,
  disabled,
  value,
  onChange,
  control,
}: {
  name: string
  dispatch: () => void
  disabled: boolean
  value: string
  onChange: () => void
  control: Control
}): JSX.Element {
  const loadCities = async (search) => {
    const cities = await fetchCity(search)

    const options = cities?.features.map(
      (feature) =>
        `${feature.properties.city} (${feature.properties.postcode})`,
    )

    return buildSelectOptions(options)
  }

  return (
    <>
      <Controller
        as={AsyncSelect}
        control={control}
        name={name}
        loadOptions={(search) => loadCities(search)}
        isClearable={true}
        placeholder="Tapez le nom d'une ville"
        noOptionsMessage={() => "Aucun résultat"}
        loadingMessage={() => "Chargement..."}
        onChange={onChange}
        isDisabled={disabled}
        value={value}
      />
    </>
  )
}
