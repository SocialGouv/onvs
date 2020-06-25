import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useStateMachine } from "little-state-machine"
import { format } from "date-fns"

import update from "lib/pages/form"
import { Layout } from "components/Layout"
import { PrimaryButtton, OutlineButton } from "components/lib"
import { Stepper, Title1, Title2 } from "components/Stepper"
import Select from "react-select"
import { useScrollTop } from "hooks/scrollTop"

const hoursOptions = [
  { value: "Matin (7h-12h)", label: "Matin (7h-12h)" },
  { value: "Après-midi (12h-19h)", label: "Après-midi (12h-19h)" },
  { value: "Soirée (19h-00h)", label: "Soirée (19h-00h)" },
  { value: "Nuit (00h-7h)", label: "Nuit (00h-7h)" },
]

const Step1Page = () => {
  useScrollTop()
  const router = useRouter()
  const { action, state } = useStateMachine(update)

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      date: state?.form?.date || format(new Date(), "yyyy-MM-dd"),
      town: state?.form?.town,
      location: state?.form?.location,
      otherLocation: state?.form?.otherLocation,
    },
  })

  const [hour, setHour] = useState(
    state?.form?.hour && {
      value: state?.form?.hour,
      label: state?.form?.hour,
    },
  )

  useEffect(() => {
    // Extra field in form to store the value of selects
    register({ name: "hour" })
  }, [register])

  const onSubmit = (data) => {
    action(data)

    router.push("/forms/freelance/step2")
  }

  const customStyles = {
    container: (styles) => ({
      ...styles,
      flexGrow: 1,
    }),
    menu: (styles) => ({
      ...styles,
      textAlign: "left",
    }),
  }

  const onHoursChange = (selectedOption) => {
    // Needs to sync specifically the value to the react-select as well
    setHour(selectedOption)

    // Needs transformation between format of react-select to expected format for API call
    setValue("hour", selectedOption?.value ?? null)
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
            </div>

            <div className="flex-1">
              <label
                className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
                htmlFor="periodDay"
              >
                Créneau horaire
              </label>
              <Select
                options={hoursOptions}
                placeholder="Choisir..."
                value={hour}
                onChange={onHoursChange}
                isClearable={true}
                styles={customStyles}
              />
            </div>

            <div className="flex-1">
              <label
                className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
                htmlFor="town"
              >
                Ville
              </label>
              <input
                className="form-input"
                type="text"
                id="town"
                name="town"
                placeholder="Tapez les premières lettres"
                ref={register}
              />
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
                  <div className="inline-block py-2 border-b border-b-2 border-blue-400">
                    <input
                      className="px-2 mr-3 leading-tight bg-transparent border-none focus:outline-none"
                      type="text"
                      id="otherLocation"
                      name="otherLocation"
                      placeholder="Ajouter un lieu"
                      ref={register}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full my-16 space-x-4">
            <Link href="/index">
              <a>
                <OutlineButton>Précédent</OutlineButton>
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
