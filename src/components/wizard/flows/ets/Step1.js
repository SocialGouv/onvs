import { yupResolver } from "@hookform/resolvers"
import { formatISO, isFuture, parseISO } from "date-fns"
import React, { useEffect } from "react"
import { Controller } from "react-hook-form"
import Select from "react-select"
import * as yup from "yup"

import { InputError, Title2 } from "@/components/lib"
import { hoursOptions } from "@/components/wizard/flows/liberal/Step1"
import FormComponent from "@/components/wizard/FormComponent"
import { useDeclarationForm } from "@/hooks/useDeclarationContext"
import { useScrollTop } from "@/hooks/useScrollTop"
import { buildSelectOptions } from "@/utils/select"

import { selectConfig } from "../../../../config"

const locationMainOptions = buildSelectOptions([
  "Accueil Mère/enfant",
  "Addictologie",
  "Cancérologie",
  "Chirurgie",
  "CMP",
  "Dialyse",
  "Établissement pénitentiaire (autre que UHSI et UHSA)",
  "Gériatrie court séjour",
  "Gynécologie-obstétrique-maternité",
  "Hôpital de jour",
  "Imagerie médicale",
  "Laboratoire",
  "Médecine",
  "Morgue",
  "PASS",
  "Pédiatrie-néonatologie",
  "PUI",
  "Réanimation",
  "Rééducation",
  "SAU",
  "SMUR",
  "Soins palliatifs",
  "UHCD/UHTCD",
  "UMJ",
  "USIP",
  "USLD",
  "USMP",
  "Autre",
])

const locationSecondaryOptions = buildSelectOptions([
  "Accueil, standard (de l’Ets ou d’un service de l’Ets)",
  "Atelier thérapeutique",
  "Bloc opératoire",
  "Bureau du personnel (médical ou non)",
  "Cafétéria/commerce",
  "Chambre du patient/résident",
  "Chambre sécurisée (détenu ou gardé à vue)",
  "Chambre d’isolement",
  "Domicile patient (intérieur)",
  "Domicile patient (extérieur : rue, parking, hall d’immeuble, ascenseur, escalier, palier)",
  "Dans l’enceinte : s/sol, jardin, parking,  zone de circulation dont ascenseur, escalier, couloir, toilettes",
  "À l’extérieur (voie publique, commerces)",
  "Espace d’apaisement",
  "Espace fumeurs",
  "Locaux des services de sécurité",
  "Magasin/entrepôt/local/services techniques",
  "Salle à manger",
  "Salle d’attente",
  "Salle de détente (patients/résidents : tv, jeux, etc.)",
  "Salle de pause du personnel",
  "Salle de réveil",
  "Trésorerie",
  "Unité de soins (box, bureau de consultation, salle de soins)",
  "Véhicule (dans le cadre d’un transport de patients/résidents)",
  "Vestiaire",
  "Autre",
])

const schema = yup.object().shape({
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
  locationMain: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable(true)
    .required("Le service est à renseigner"),
  locationSecondary: yup
    .object()
    .shape({
      label: yup.string(),
      value: yup.string(),
    })
    .nullable(true)
    .required("Le lieu précis est à renseigner"),
  town: yup.string().required("La ville est à renseigner"),
})

const Step1 = () => {
  useScrollTop()
  const {
    onSubmit,
    handleSubmit,
    errors,
    control,
    setValue,
    watch,
    register,
  } = useDeclarationForm({
    defaultValuesFromState: (state) => ({
      date:
        state?.steps?.dateLocation?.date ||
        formatISO(new Date(), { representation: "date" }),
      hour: state?.steps?.dateLocation?.hour || null,
      locationMain: state?.steps?.dateLocation?.locationMain || null,
      locationSecondary: state?.steps?.dateLocation?.locationSecondary || null,
      town: state?.steps?.dateLocation?.town,
    }),

    resolver: yupResolver(schema),
  })

  const location = watch("location")

  useEffect(() => {
    // Clean otherLocation when location has changed and is not equal to Autre
    if (location !== "Autre") {
      setValue("otherLocation", "")
    }
  }, [setValue, location])

  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
      title="Où la violence a-t-elle eu lieu ?"
    >
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

      <Title2 className="mt-12">Dans quel service ?</Title2>

      <div className="mt-4">
        <label
          className={`block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase ${
            errors?.locationMain && "text-red-500"
          }`}
          htmlFor="locationMain"
        >
          Lieu principal
        </label>

        <Controller
          as={Select}
          options={locationMainOptions}
          name="locationMain"
          control={control}
          styles={selectConfig}
          isClearable={true}
          placeholder="Choisir..."
        />
      </div>

      <Title2 className="mt-12">Dans quel lieu précisément ?</Title2>

      <div className="mt-4 mb-16">
        <label
          className={`block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase ${
            errors?.locationSecondary && "text-red-500"
          }`}
          htmlFor="locationSecondary"
        >
          Lieu secondaire
        </label>

        <Controller
          as={Select}
          options={locationSecondaryOptions}
          name="locationSecondary"
          control={control}
          styles={selectConfig}
          isClearable={true}
          placeholder="Choisir..."
        />
      </div>
    </FormComponent>
  )
}

export default Step1
