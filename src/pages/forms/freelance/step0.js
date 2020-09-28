import { yupResolver } from "@hookform/resolvers"
import { useStateMachine } from "little-state-machine"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"
import * as yup from "yup"

import { Layout } from "@/components/Layout"
import {
  InputError,
  OutlineButton,
  PrimaryButtton,
  Title1,
} from "@/components/lib"
import { Stepper } from "@/components/Stepper"
import { useEffectToast } from "@/hooks/useEffectToast"
import { useScrollTop } from "@/hooks/useScrollTop"
import { update } from "@/lib/pages/form"

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

const schema = yup.object().shape({
  job: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable(true) // to consider null as an object and let required validate and displays the appropriate message
    .required("La profession est à renseigner"),
})

const Step0Page = () => {
  useScrollTop()
  const router = useRouter()
  const { action, state } = useStateMachine(update)

  const { control, errors, handleSubmit } = useForm({
    defaultValues: {
      declarationType: "libéral",
      job: state?.form?.job || null,
    },
    resolver: yupResolver(schema),
  })

  useEffectToast(errors)

  const onSubmit = (data) => {
    action(data)

    router.push("/forms/freelance/step1")
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper />

        <Title1 className="mt-4">Quelle est votre profession ?</Title1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-10/12 m-auto text-gray-900"
        >
          <div className="max-w-sm m-auto mt-8">
            <label
              className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
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
              aria-invalid={!!errors.job?.message}
            />

            <InputError error={errors?.job?.message} />
          </div>

          <div className="mt-12 text-center">
            <p>
              Cette information nous permettra de vous proposer des réponses
              adaptées à votre métier, et, si vous donnez vos informations de
              contact en fin de formulaire, de transmettre vos coordonnées à
              votre ordre.
            </p>

            <p className="mt-8">
              <i>Temps estimé: 4 minutes</i>
            </p>
          </div>

          <div className="flex justify-center w-full my-8 space-x-4">
            <Link href="/index">
              <a>
                <OutlineButton type="button">Retour</OutlineButton>
              </a>
            </Link>
            <PrimaryButtton>Commencer</PrimaryButtton>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Step0Page
