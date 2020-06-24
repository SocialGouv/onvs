import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useStateMachine } from "little-state-machine"
import update from "lib/pages/form"
import { Layout } from "components/Layout"
import { PrimaryButtton, OutlineButton } from "components/lib"
import { Stepper, Title1, Title2 } from "components/Stepper"
import { useScrollTop } from "hooks/scrollTop"

const Step5Page = () => {
  const router = useRouter()
  const { action } = useStateMachine(update)
  const { handleSubmit, register } = useForm({})
  // const [victimsSize, setVictimsSize] = useState(1)
  useScrollTop()

  const onSubmit = (data) => {
    console.log({ data })
    action(data)

    router.push("/forms/freelance/confirmation")
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper step={5} />

        <Title1 className="mt-4">
          Pourriez-vous apporter quelques précisions ?
        </Title1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-10/12 m-auto text-gray-900"
        >
          <>
            <Title2 className="mt-8 mb-4">
              {"Description plus détaillée de l'incident"}
            </Title2>

            <i>
              Ne faites figurer aucun nom de personne dans la description des
              faits. Vous pouvez formuler ainsi : «&nbsp;M. ou Mme, le patient
              ou la patiente, le fils/la fille du patient, etc. a fait
              ceci&nbsp;».
            </i>

            <textarea
              className="w-full h-24 mt-8 form-textarea"
              placeholder="Description de l’événement en ajoutant, si besoin, votre ressenti et le contexte"
              name="description"
              ref={register}
            />

            <Title2 className="mt-16 mb-4">
              {"Quelles sont vos coordonnées ?"}
            </Title2>

            <div className="flex mt-4 space-x-6">
              <div className="flex-1">
                <label
                  className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
                  htmlFor="Prénom & nom"
                >
                  Prénom & Nom
                </label>
                <input
                  className="w-full form-input"
                  type="text"
                  id="declarantNames"
                  name="declarantNames"
                  placeholder="Marie-Odile Graguet"
                  ref={register}
                />
              </div>
              <div className="flex-1">
                <label
                  className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
                  htmlFor="declarantId"
                >
                  Numéro RPPS ou ADELI
                </label>
                <input
                  className="w-full form-input"
                  type="tel"
                  id="declarantId"
                  name="declarantId"
                  placeholder="Numéro à 9 ou 11 chiffres"
                  ref={register}
                />
              </div>
            </div>

            <div className="flex mt-8 space-x-6">
              <div className="flex-1">
                <label
                  className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
                  htmlFor="declarantEmail"
                >
                  E-mail
                </label>
                <input
                  className="w-full form-input"
                  type="email"
                  id="declarantEmail"
                  name="declarantEmail"
                  placeholder="adresse@mail.com"
                  ref={register}
                />
              </div>
              <div className="flex-1">
                <label
                  className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
                  htmlFor="declarantTel"
                >
                  Numéro de téléphone
                </label>
                <input
                  className="w-full form-input"
                  type="tel"
                  id="declarantTel"
                  name="declarantTel"
                  placeholder="Ex: 0605040302"
                  ref={register}
                />
              </div>
            </div>

            <div className="mt-16">
              <div className="block mt-3">
                <div className="mt-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="w-5 h-5 form-radio"
                        name="declarantContactAgreement"
                        value="true"
                        ref={register}
                      />
                      <span className="ml-4">
                        J’accepte de transmettre mes coordonnées à l’ONVS et à
                        l’ordre dont je dépends. Cela permettra à un référent
                        violence de me contacter et de m’accompagner si j’ai
                        besoin d’écoute, de conseils ou d’aide juridique.
                      </span>
                    </label>
                  </div>
                  <div className="mt-8">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="w-5 h-5 form-radio"
                        name="declarantContactAgreement"
                        value="false"
                        ref={register}
                      />
                      <span className="ml-4">
                        Je ne souhaite pas transmettre mes coordonnées. Mes
                        réponses seront transmises de façon anonyme à l’ONVS et
                        l’ordre dont je dépends.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center w-full my-16 space-x-4">
              <Link href="/forms/freelance/step4">
                <a>
                  <OutlineButton>Précédent</OutlineButton>
                </a>
              </Link>
              <PrimaryButtton>Envoyer la déclaration</PrimaryButtton>
            </div>
          </>
        </form>
      </div>
    </Layout>
  )
}

export default Step5Page
