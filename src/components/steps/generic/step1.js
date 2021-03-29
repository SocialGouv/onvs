// Date et lieu
import { formatISO, isFuture, parseISO } from "date-fns"
import React, { useEffect } from "react"
import { Controller } from "react-hook-form"
import Select from "react-select"
import * as yup from "yup"

import { InputError, RadioInput, Title2 } from "@/components/lib"

import { selectConfig } from "../../../config"

const hoursOptions = [
  "Matin (7h-12h)",
  "Après-midi (12h-19h)",
  "Soirée (19h-00h)",
  "Nuit (00h-7h)",
].map((label) => ({ label, value: label }))

export const title = "Où la violence a-t-elle eu lieu ?"

export const schema = yup.object().shape({
  date: yup
    .string()
    .required("La date est à renseigner")
    .test(
      "past or present ISO date representation",
      "La date ne peut pas être future",
      function (value) {
        const date = parseISO(value)
        if (date === "Invalid Date") return false
        return !isFuture(date)
      },
    ),
  hour: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable(true) // to consider null as an object and let required validate and displays the appropriate message
    .required("Les heures sont à renseigner"),
  location: yup.string().required("Le lieu est à renseigner"),
  otherLocation: yup.string().when("location", {
    is: "Autre",
    then: yup
      .string()
      .required('Le champ "Autre lieu" doit être précisé')
      .max(
        255,
        ({ max }) =>
          `Le champ "Autre lieu" ne doit pas dépasser ${max} caractères`,
      ),
  }),
  town: yup.string().required("La ville est à renseigner"),
})

export const buildDefaultValues = (state) => ({
  date: state?.form?.date || formatISO(new Date(), { representation: "date" }),
  hour: state?.form?.hour
    ? { label: state.form.hour.label, value: state.form.hour.value }
    : hoursOptions?.[0],
  location: state?.form?.location,
  otherLocation: state?.form?.otherLocation,
  town: state?.form?.town,
})

export const Component = ({ control, errors, setValue, register, watch }) => {
  const location = watch("location")

  useEffect(() => {
    // Clean otherLocation when location has changed and is not equal to Autre
    if (location !== "Autre") {
      setValue("otherLocation", "")
    }
  }, [setValue, location])

  return (
    <>
      <Title2>DANS LE FORMULAIRE GENERIQUE</Title2>

      <Title2 className="mt-12 mb-8">
        {"Quand et dans quelle ville l'événement s’est-il déroulé ?"}
      </Title2>

      <div className="flex mt-4 space-x-6">
        <div className="flex-1">
          <label
            className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="w-full form-input"
            type="date"
            id="date"
            name="date"
            ref={register}
            aria-invalid={!!errors?.date?.message}
          />

          <InputError error={errors?.date?.message} />
        </div>

        <div className="flex-1">
          <label
            className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
            htmlFor="periodDay"
          >
            Horaire
          </label>

          <Controller
            as={Select}
            options={hoursOptions}
            name="hour"
            control={control}
            styles={selectConfig}
          />
        </div>

        <div className="flex-1">
          <label
            className={`block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase ${
              errors?.town && "text-red-500"
            }`}
            htmlFor="town"
          >
            Ville
          </label>
          <input
            className={`form-input ${errors?.town && "border-red-600"}`}
            type="text"
            id="town"
            name="town"
            placeholder="Tapez les premières lettres"
            ref={register}
            aria-invalid={!!errors?.town?.message}
          />

          <InputError error={errors?.town?.message} />
        </div>
      </div>

      <Title2 className="mt-12">Dans quel lieu précisément ?</Title2>

      <div className="mt-4">
        <b>Intérieur</b>
        <div className="block mt-3">
          <div className="mt-2 space-y-2">
            <RadioInput
              name="location"
              value="Cabinet individuel"
              register={register}
              defaultChecked
            />
            <RadioInput
              name="location"
              value="Cabinet collectif"
              register={register}
            />
            <RadioInput name="location" value="Officine" register={register} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <b>Extérieur</b>
        <div className="block mt-3">
          <div className="mt-2 space-y-2">
            <RadioInput
              name="location"
              value="En face/à proximité du cabinet ou de l’officine"
              register={register}
            />
            <RadioInput
              name="location"
              value="Au domicile du patient"
              register={register}
            />
            <RadioInput
              name="location"
              value="Sur le trajet entre le cabinet et le domicile du patient"
              register={register}
            />
            <RadioInput
              name="location"
              value="Sur le trajet entre votre domicile et votre lieu de travail"
              register={register}
            />

            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="location"
                  value="Autre"
                  ref={register}
                />
                <span className="ml-2">{"Autre : "}</span>
              </label>
              <div
                className={`inline-block py-2 border-b-2  ${
                  errors?.otherLocation?.message
                    ? "border-red-500"
                    : "border-blue-400"
                }`}
              >
                <input
                  className={`px-2 mr-3 leading-tight bg-transparent border-none focus:outline-none`}
                  type="text"
                  id="otherLocation"
                  name="otherLocation"
                  placeholder="Ajouter un lieu"
                  onChange={() => setValue("location", "Autre")}
                  ref={register}
                  aria-invalid={
                    errors?.otherLocation?.message ? "true" : "false"
                  }
                />
              </div>
            </div>

            <InputError error={errors?.otherLocation?.message} />
          </div>
        </div>
      </div>
    </>
  )
}