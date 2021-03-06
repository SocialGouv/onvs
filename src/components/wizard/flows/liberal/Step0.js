import { yupResolver } from "@hookform/resolvers"
import React from "react"
import { Controller } from "react-hook-form"
import Select from "react-select"
import * as yup from "yup"

import { InputError } from "@/components/lib"
import FormComponent from "@/components/wizard/FormComponent"
import { useDeclarationForm } from "@/hooks/useDeclarationContext"
import { useScrollTop } from "@/hooks/useScrollTop"

import { selectConfig } from "../../../../config"
import { jobsOptions } from "@/utils/options"

const schema = yup.object().shape({
  job: yup
    .object()
    .shape({
      label: yup.string().required("La profession est à renseigner"),
      value: yup.string().required("La profession est à renseigner"),
    })
    .nullable(true) // to consider null as an object and let required validate and displays the appropriate message
    .required("La profession est à renseigner"),
})

const Step0 = () => {
  useScrollTop()
  const { onInit, handleSubmit, errors, control } = useDeclarationForm({
    defaultValuesFromState: (state) => ({
      job: state?.steps?.job?.job || null,
    }),
    resolver: yupResolver(schema),
  })

  return (
    <FormComponent
      onSubmit={handleSubmit(onInit)}
      title="Quelle est votre profession ?"
    >
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
          inputId="job"
          aria-label="job" // aria-label is important for the component to be found by Jest! (inputId, id, instanceId don't work)
          isClearable="true"
          control={control}
          styles={selectConfig}
          placeholder="Tapez les premières lettres"
          aria-invalid={!!errors?.job?.message}
        />

        <InputError error={errors?.job?.message} />
      </div>

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
    </FormComponent>
  )
}

export default Step0
