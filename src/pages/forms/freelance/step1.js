import { yupResolver } from "@hookform/resolvers"
import { Layout } from "components/Layout"
import { OutlineButton, PrimaryButtton, Title1, Title2 } from "components/lib"
import { Stepper } from "components/Stepper"
import { formatISO } from "date-fns"
import { useEffectToast } from "hooks/useEffectToast"
import { useScrollTop } from "hooks/useScrollTop"
import update from "lib/pages/form"
import { useStateMachine } from "little-state-machine"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"
import { now } from "utils/date"
import * as yup from "yup"

import { selectConfig } from "../../../config"

const hoursOptions = [
  "Matin (7h-12h)",
  "Après-midi (12h-19h)",
  "Soirée (19h-00h)",
  "Nuit (00h-7h)",
].map((label) => ({ label, value: label }))

const schema = yup.object().shape({
  date: yup
    .date()
    .required("La date est à renseigner.")
    .max(now(), "La date ne peut pas être future."),
  hour: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable(true) // to consider null as an object and let required validate and displays the appropriate message
    .required("Les heures sont à renseigner."),
  location: yup.string().required("Le lieu est à renseigner."),
  otherLocation: yup.string().when("location", {
    is: "Autre",
    then: yup.string().required('Le champ "Autre lieu" doit être précisé.'),
  }),
  town: yup.string().required("La ville est à renseigner."),
})

const Step1Page = () => {
  useScrollTop()
  const router = useRouter()
  const { action, state } = useStateMachine(update)

  const { control, errors, handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      date:
        state?.form?.date || formatISO(new Date(), { representation: "date" }),
      hour: state?.form?.hour
        ? { label: state.form.hour.label, value: state.form.hour.value }
        : hoursOptions?.[0],
      location: state?.form?.location,
      otherLocation: state?.form?.otherLocation,
      town: state?.form?.town,
    },
    resolver: yupResolver(schema),
  })

  const location = watch("location")

  useEffect(() => {
    // Clean otherLocation when location changed and is equals to Autre
    if (location !== "Autre") {
      setValue("otherLocation", "")
    }
  }, [setValue, location])

  useEffectToast(errors)

  const onSubmit = (data) => {
    action(data)

    router.push("/forms/freelance/step2")
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper />

        <Title1 className="mt-4">Où la violence a-t-elle eu lieu ?</Title1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-10/12 m-auto text-gray-900"
        >
          <Title2 className="mt-12 mb-8">
            Quand et dans quelle ville l’incident s’est-il déroulé ?
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
              />
              <span className="text-red-500">{errors.date?.message}</span>
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
              <span className="text-red-500">{errors.hour?.message}</span>
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
              />
              <span className="text-red-500">{errors.town?.message}</span>
            </div>
          </div>

          <Title2 className="mt-12">Dans quel lieu précisément ?</Title2>

          <div className="mt-4">
            <b>Intérieur</b>
            <div className="block mt-3">
              <div className="mt-2 space-y-2">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="location"
                      value="Cabinet individuel"
                      ref={register}
                      defaultChecked
                    />
                    <span className="ml-2">Cabinet individuel</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="location"
                      value="Cabinet collectif"
                      ref={register}
                    />
                    <span className="ml-2">Cabinet collectif</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="location"
                      value="Officine"
                      ref={register}
                    />
                    <span className="ml-2">Officine</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <b>Extérieur</b>
            <div className="block mt-3">
              <div className="mt-2 space-y-2">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="location"
                      value="En face/à proximité du cabinet ou de l’officine"
                      ref={register}
                    />
                    <span className="ml-2">
                      En face/à proximité du cabinet ou de l’officine
                    </span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="location"
                      value="Au domicile du patient"
                      ref={register}
                    />
                    <span className="ml-2">Au domicile du patient</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="location"
                      value="Sur le trajet entre le cabinet et le domicile du patient"
                      ref={register}
                    />
                    <span className="ml-2">
                      Sur le trajet entre le cabinet et le domicile du patient
                    </span>
                  </label>
                </div>

                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="location"
                      value="Sur le trajet entre votre domicile et votre lieu de travail"
                      ref={register}
                    />
                    <span className="ml-2">
                      Sur le trajet entre votre domicile et votre lieu de
                      travail
                    </span>
                  </label>
                </div>

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
                      errors.otherLocation?.message
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
                    />
                  </div>
                </div>
                <span className="text-red-500">
                  {errors.otherLocation?.message}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full my-16 space-x-4">
            <Link href="/index">
              <a>
                <OutlineButton type="button">Précédent</OutlineButton>
              </a>
            </Link>
            <PrimaryButtton>Suivant</PrimaryButtton>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Step1Page
