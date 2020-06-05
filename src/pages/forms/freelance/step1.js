import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useStateMachine } from "little-state-machine"
import update from "lib/pages/form"
import { Layout } from "components/Layout"
import { PrimaryButtton, OutlineButton } from "components/lib"
import { Stepper, Title1, Title2 } from "components/Stepper"

const Step1Page = () => {
  const router = useRouter()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      location: "Vincennes",
    },
  })
  const { action } = useStateMachine(update)

  const onSubmit = (data) => {
    console.log({ data })
    action(data)

    router.push("/step2")
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper />

        <Title1>Où la violence a-t-elle eu lieu ?</Title1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Title2 className="mt-8">
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
              />
            </div>

            <div className="flex-1">
              <label
                className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
                htmlFor="periodDay"
              >
                Créneau horaire
              </label>
              <input
                className="w-full form-input"
                type="text"
                id="periodDay"
                name="periodDay"
              />
            </div>

            <div className="flex-1">
              <label
                className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
                htmlFor="town"
              >
                Ville
              </label>
              <input className="form-input" type="text" id="town" name="town" />
            </div>
          </div>

          <Title2 className="mt-8">Dans quel lieu précisément ?</Title2>

          <div className="mt-4">
            <b>Intérieur</b>
            <div className="block mt-3">
              <div className="mt-2 space-y-2">
                <div>
                  <input
                    type="radio"
                    className="form-radio"
                    name="location"
                    value="Cabinet individuel"
                    id="1"
                    checked
                  />
                  <label
                    htmlFor="Cabinet individuel"
                    className="inline-flex items-center"
                  >
                    <span className="ml-2">Cabinet individuel</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="form-radio"
                    name="location"
                    value="Cabinet collectif"
                    id="2"
                  />
                  <label htmlFor="2" className="inline-flex items-center">
                    <span className="ml-2">Cabinet collectif</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="form-radio"
                    name="location"
                    value="Officine"
                    id="3"
                  />
                  <label htmlFor="3" className="inline-flex items-center">
                    <span className="ml-2">Officine</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <b>Extérieur</b>
            <div className="block mt-3">
              <div className="mt-2 space-y-2">
                <div>
                  <input
                    type="radio"
                    className="form-radio"
                    name="location"
                    value="En face/à proximité du cabinet ou de l’officine"
                    id="4"
                    checked
                  />
                  <label htmlFor="4" className="inline-flex items-center">
                    <span className="ml-2">
                      En face/à proximité du cabinet ou de l’officine
                    </span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="form-radio"
                    name="location"
                    value="Au domicile du patient"
                    id="5"
                  />
                  <label htmlFor="5" className="inline-flex items-center">
                    <span className="ml-2">Au domicile du patient</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="form-radio"
                    name="location"
                    value="Sur le trajet entre le cabinet et le domicile du patient"
                    id="6"
                  />
                  <label htmlFor="6" className="inline-flex items-center">
                    <span className="ml-2">
                      Sur le trajet entre le cabinet et le domicile du patient
                    </span>
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    className="form-radio"
                    name="location"
                    value="Sur le trajet entre votre domicile et votre lieu de travail"
                    id="7"
                  />
                  <label htmlFor="7" className="inline-flex items-center">
                    <span className="ml-2">
                      Sur le trajet entre votre domicile et votre lieu de
                      travail
                    </span>
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    className="form-radio"
                    name="location"
                    value="Autre"
                    id="8"
                  />
                  <label htmlFor="8" className="inline-flex items-center">
                    <span className="ml-2">{"Autre : "}</span>
                  </label>
                  <div className="inline-block py-2 border-b border-b-2 border-blue-400">
                    <input
                      className="px-2 mr-3 leading-tight bg-transparent border-none focus:outline-none"
                      type="text"
                      id="otherLocation"
                      name="otherLocation"
                      placeholder="Ajouter un lieu"
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

          {/* <input name="date" type="date" ref={register} />
          <input name="location" ref={register} />
          <button type="submit">Suivant</button> */}
        </form>
      </div>
    </Layout>
  )
}

export default Step1Page
