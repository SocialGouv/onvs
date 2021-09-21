import { yupResolver } from "@hookform/resolvers"
import React from "react"
import * as yup from "yup"

import { InputError, Title2 } from "@/components/lib"
import FormComponent from "@/components/wizard/FormComponent"
import { useDeclarationForm } from "@/hooks/useDeclarationContext"
import { useScrollTop } from "@/hooks/useScrollTop"

const schema = yup.object({
  declarantContactAgreement: yup
    .string()
    .nullable()
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
  const { onSubmit, handleSubmit, errors, setValue, watch, register } =
    useDeclarationForm({
      defaultValuesFromState: (state) => ({
        declarantContactAgreement:
          state?.steps?.precision?.declarantContactAgreement,
        declarantEmail: state?.steps?.precision?.declarantEmail,
        declarantExternalId: state?.steps?.precision?.declarantExternalId,
        declarantNames: state?.steps?.precision?.declarantNames,
        declarantTel: state?.steps?.precision?.declarantTel,
        description: state?.steps?.precision?.description,
      }),

      resolver: yupResolver(schema),
    })

  const declarantContactAgreement = watch("declarantContactAgreement")

  React.useEffect(() => {
    if (declarantContactAgreement === "false") {
      setValue("declarantEmail", "")
      setValue("declarantExternalId", "")
      setValue("declarantNames", "")
      setValue("declarantTel", "")
    }
  }, [declarantContactAgreement, setValue])

  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
      title="Pourriez-vous apporter quelques précisions ?"
    >
      <Title2 className="mt-8 mb-4">
        {"Description plus détaillée de l'événement"}
      </Title2>

      <div className="border p-2 rounded bg-blue-100 align-middle">
        <i>
          Ne faites figurer aucun <u>nom de personne</u> ni de{" "}
          <u>dates de naissance</u> dans la description des faits. Vous pouvez
          formuler ainsi : «&nbsp;M. ou Mme, le patient ou la patiente, le
          fils/la fille du patient, etc. a fait ceci&nbsp;».
        </i>
      </div>

      <textarea
        className={`w-full mt-8 form-textarea rounded ${
          errors?.description?.message ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Description de l’événement en ajoutant, si besoin, votre ressenti et le contexte."
        name="description"
        ref={register}
        style={{ height: "300px" }}
      />

      <Title2 className="mt-10">{"Quelles sont vos coordonnées ?"}</Title2>

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
              J’accepte de transmettre mes coordonnées à l’ONVS et à l’ordre
              dont je dépends. Cela permettra à un référent violence de me
              contacter et de m’accompagner si j’ai besoin d’écoute, de conseils
              ou d’aide juridique.
            </span>
          </label>
        </div>

        {declarantContactAgreement === "true" && (
          <>
            <div className="flex mt-6 ml-10 space-x-6">
              <div className="flex-1">
                <label
                  className={`block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase ${
                    errors?.declarantNames && "text-red-500"
                  }`}
                  htmlFor="Prénom & nom"
                >
                  Prénom & Nom
                </label>
                <input
                  type="text"
                  id="declarantNames"
                  name="declarantNames"
                  placeholder="Ex: Marie-Odile Graguet"
                  ref={register}
                  className={`w-full form-input ${
                    errors?.declarantNames && "border-red-600"
                  }`}
                  aria-invalid={!!errors?.declarantNames?.message}
                />

                <InputError error={errors?.declarantNames?.message} />
              </div>
              <div className="flex-1">
                <label
                  className={`block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase ${
                    errors?.declarantExternalId && "text-red-500"
                  }`}
                  htmlFor="declarantExternalId"
                >
                  Numéro RPPS ou ADELI
                </label>
                <input
                  type="tel"
                  id="declarantExternalId"
                  name="declarantExternalId"
                  placeholder="Numéro à 9 ou 11 chiffres"
                  ref={register}
                  className={`w-full form-input ${
                    errors?.declarantExternalId && "border-red-600"
                  }`}
                  aria-invalid={!!errors?.declarantExternalId?.message}
                />
                <InputError error={errors?.declarantExternalId?.message} />
              </div>
            </div>

            <div className="flex mt-8 ml-10 space-x-6">
              <div className="flex-1">
                <label
                  className={`block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase ${
                    errors?.declarantEmail && "text-red-500"
                  }`}
                  htmlFor="declarantEmail"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="declarantEmail"
                  name="declarantEmail"
                  placeholder="adresse@mail.com"
                  ref={register}
                  className={`w-full form-input ${
                    errors?.declarantEmail && "border-red-600"
                  }`}
                  aria-invalid={!!errors?.declarantEmail?.message}
                />
                <InputError error={errors?.declarantEmail?.message} />
              </div>
              <div className="flex-1">
                <label
                  className={`block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase ${
                    errors?.declarantTel && "text-red-500"
                  }`}
                  htmlFor="declarantTel"
                >
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="declarantTel"
                  name="declarantTel"
                  placeholder="Ex: 0605040302"
                  ref={register}
                  className={`w-full form-input ${
                    errors?.declarantTel && "border-red-600"
                  }`}
                  aria-invalid={!!errors?.declarantTel?.message}
                />
                <InputError error={errors?.declarantTel?.message} />
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
              seront transmises de façon anonyme à l’ONVS et l’ordre dont je
              dépends.
            </span>
          </label>
        </div>
      </div>
    </FormComponent>
  )
}

export default Step5Page
