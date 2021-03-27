import React from "react"
import { Controller } from "react-hook-form"
import Select from "react-select"
import * as yup from "yup"

import { InputError, Title1 } from "@/components/lib"

import { selectConfig } from "../../../config"

const jobsOptions = [
  "Assistant dentaire",
  "Assistant de service social",
  "Audioprothésiste",
  "Chiropracteur",
  "Chirurgien-dentiste",
  "Diététicien",
  "Epithésiste",
  "Ergothérapeute",
  "Infirmier",
  "Manipulateur en radiologie",
  "Masseur-kinésithérapeute",
  "Médecin",
  "Oculariste",
  "Opticien-lunetier",
  "Orthopédiste-orthésiste",
  "Orthophoniste",
  "Orthoprothésiste",
  "Orthoptiste",
  "Ostéopathe",
  "Pédicure-podologue",
  "Pharmacien",
  "Physicien médical",
  "Podo-orthésiste",
  "Psychologue",
  "Psychomotricien",
  "Psychothérapeute",
  "Sage-femme",
  "Technicien de laboratoire",
].map((label) => ({ label, value: label }))

const jobsPrecisionOptions = {
  Pharmacien: ["Officine", "Industrie"].map((label) => ({
    label,
    value: label,
  })),
}

export const title = "Quelle est votre profession ?"

export const schema = yup.object().shape({
  job: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable(true) // to consider null as an object and let required validate and displays the appropriate message
    .required("La profession est à renseigner"),
})

export const buildDefaultValues = (state) => ({
  declarationType: "libéral",
  job: state?.form?.job || null,
})

export const Component = ({ control, errors, watch }) => {
  const job = watch("job")

  console.log({ job })

  return (
    <>
      <Title1>Dans le step 0 générique</Title1>

      <div className="max-w-sm m-auto mt-8">
        <label
          className={`block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase ${
            errors?.job && "text-red-500"
          }`}
          htmlFor="job"
        >
          Profession
        </label>

        <Controller
          as={Select}
          options={jobsOptions}
          name="job"
          id="job"
          instanceId="job"
          aria-label="job"
          isClearable="true"
          control={control}
          styles={selectConfig}
          placeholder="Tapez les premières lettres"
          aria-invalid={!!errors?.job?.message}
        />

        <InputError error={errors?.job?.message} />
      </div>

      {jobsPrecisionOptions[job?.label] && (
        <div className="max-w-sm m-auto mt-8">
          <label
            className={`block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase ${
              errors?.job && "text-red-500"
            }`}
            htmlFor="job"
          >
            Précision sur la profession
          </label>

          <Controller
            as={Select}
            options={jobsPrecisionOptions[job?.label]}
            name="jobPrecision"
            id="jobPrecision"
            instanceId="jobPrecision"
            aria-label="jobPrecision"
            isClearable="true"
            control={control}
            styles={selectConfig}
            placeholder="Tapez les premières lettres"
            aria-invalid={!!errors?.jobPrecision?.message}
          />

          <InputError error={errors?.jobPrecision?.message} />
        </div>
      )}

      <div className="mt-12 text-center">
        <p>
          Cette information nous permettra de vous proposer des réponses
          adaptées à votre métier, et, si vous donnez vos informations de
          contact en fin de formulaire, de transmettre vos coordonnées à votre
          ordre.
        </p>

        <p className="mt-8">
          <i>Temps estimé : 4 minutes</i>
        </p>
      </div>
    </>
  )
}
