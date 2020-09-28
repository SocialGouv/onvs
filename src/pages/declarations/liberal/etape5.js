import { yupResolver } from "@hookform/resolvers"
import { useStateMachine } from "little-state-machine"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { Layout } from "@/components/Layout"
import { OutlineButton, PrimaryButtton, Title1, Title2 } from "@/components/lib"
import { Stepper } from "@/components/Stepper"
import { useEffectToast } from "@/hooks/useEffectToast"
import { useScrollTop } from "@/hooks/useScrollTop"
import { update } from "@/lib/pages/form"

const schema = yup.object({
  declarantContactAgreement: yup
    .string()
    .required(
      "L'accord (ou non) sur l'envoi des coordonnées est à renseigner.",
    ),
  declarantEmail: yup.string().when("declarantContactAgreement", {
    is: "true",
    otherwise: (schema) => schema.transform(() => ""),
    then: (schema) =>
      schema
        .required("L'e-mail est à renseigner")
        .email("L'e-mail est mal formé"),
  }),
  declarantExternalId: yup.string().when("declarantContactAgreement", {
    is: "true",
    otherwise: (schema) => schema.transform(() => ""),
    then: (schema) =>
      schema
        .required("Le n° RPPS/Adeli est à renseigner")
        .matches(
          /^[0-9]{9}$|^[0-9]{11}$/g,
          "Le n° RPPS/Adeli est à 9 ou 11 chiffres",
        ),
  }),
  declarantNames: yup.string().when("declarantContactAgreement", {
    is: "true",
    otherwise: (schema) => schema.transform(() => ""),
    then: (schema) => schema.required("Le nom est à renseigner"),
  }),
  declarantTel: yup.string().when("declarantContactAgreement", {
    is: "true",
    otherwise: (schema) => schema.transform(() => ""),
    then: (schema) =>
      schema
        .required("Le téléphone est à renseigner")
        .matches(/[0-9]{10}/g, "Le numéro de téléphone est mal formé"),
  }),
  description: yup.string().required("La description doit être renseignée"),
})

const Step5Page = () => {
  useScrollTop()
  const router = useRouter()
  const { action, state } = useStateMachine(update)
  const { errors, handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      declarantContactAgreement: state?.form?.declarantContactAgreement,
      declarantEmail: state?.form?.declarantEmail,
      declarantExternalId: state?.form?.declarantExternalId,
      declarantNames: state?.form?.declarantNames,
      declarantTel: state?.form?.declarantTel,
      description: state?.form?.description,
    },
    resolver: yupResolver(schema),
  })

  useEffectToast(errors)

  const declarantContactAgreement = watch("declarantContactAgreement")

  React.useEffect(() => {
    if (declarantContactAgreement === "false") {
      setValue("declarantEmail", "")
      setValue("declarantExternalId", "")
      setValue("declarantNames", "")
      setValue("declarantTel", "")
    }
  }, [declarantContactAgreement, setValue])

  const onSubmit = (data) => {
    action(data)
    router.push("/declarations/liberal/confirmation")
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
              placeholder="Description de l’événement en ajoutant, si besoin, votre ressenti et le contexte."
              name="description"
              ref={register}
            />

            <Title2 className="mt-10">
              {"Quelles sont vos coordonnées ?"}
            </Title2>

            <div className="mt-10">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="w-5 h-5 form-radio"
                    name="declarantContactAgreement"
                    value="true"
                    ref={register}
                  />
                  <span className="ml-5">
                    J’accepte de transmettre mes coordonnées à l’ONVS et à
                    l’ordre dont je dépends. Cela permettra à un référent
                    violence de me contacter et de m’accompagner si j’ai besoin
                    d’écoute, de conseils ou d’aide juridique.
                  </span>
                </label>
              </div>

              {declarantContactAgreement === "true" && (
                <>
                  <div className="flex mt-6 ml-10 space-x-6">
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
                        placeholder="Ex: Marie-Odile Graguet"
                        ref={register}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
                        htmlFor="declarantExternalId"
                      >
                        Numéro RPPS ou ADELI
                      </label>
                      <input
                        className="w-full form-input"
                        type="tel"
                        id="declarantExternalId"
                        name="declarantExternalId"
                        placeholder="Numéro à 9 ou 11 chiffres"
                        ref={register}
                      />
                    </div>
                  </div>

                  <div className="flex mt-8 ml-10 space-x-6">
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
                </>
              )}

              <div className="mt-8">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="w-5 h-5 form-radio"
                    name="declarantContactAgreement"
                    value="false"
                    ref={register}
                  />
                  <span className="ml-5">
                    Je ne souhaite pas transmettre mes coordonnées. Mes réponses
                    seront transmises de façon anonyme à l’ONVS et l’ordre dont
                    je dépends.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-center w-full my-16 space-x-4">
              <Link href="/declarations/liberal/etape4">
                <a>
                  <OutlineButton type="button">Précédent</OutlineButton>
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
