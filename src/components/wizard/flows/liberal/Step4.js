import { yupResolver } from "@hookform/resolvers"
import PropTypes from "prop-types"
import React from "react"
import { Controller, useFieldArray, useWatch } from "react-hook-form"
import Select from "react-select"
import * as yup from "yup"

import {
  Counter,
  InputError,
  Option,
  Options,
  OutlineButton,
  PrimaryButton,
  RadioInput,
  Title1,
  Title2,
} from "@/components/lib"
import FormComponent from "@/components/wizard/FormComponent"
import { useDeclarationForm } from "@/hooks/useDeclarationContext"
import { useScrollTop } from "@/hooks/useScrollTop"

const isHealthType = (type) =>
  ["Étudiant en santé", "Professionnel de santé"].includes(type)

const pursuitOptions = ["Non", "Main courante", "Plainte"]

const ouiNonOptions = ["Oui", "Non"]

const schema = yup.object({
  authors: yup
    .array(
      yup.object({
        age: yup.object().nullable().required("L'âge est à renseigner"),
        discernmentTroubles: yup
          .array(yup.string())
          .when(
            "discernmentTroublesIsPresent",
            (discernmentTroublesIsPresent, schema) => {
              return discernmentTroublesIsPresent === "Oui"
                ? schema
                    .required("Veuillez cocher une case")
                    .min(1, "Veuillez cocher une case")
                : schema.transform(() => [])
            },
          ),
        discernmentTroublesIsPresent: yup
          .mixed()
          .oneOf(ouiNonOptions, "L'altération du discernement est à renseigner")
          .required("L'altération du discernement est à renseigner"),
        gender: yup
          .object()
          .nullable()
          .required("Le champ sexe est à renseigner"),
        healthJob: yup
          .object()
          .nullable()
          .when("type", (type, schema) => {
            return isHealthType(type?.value)
              ? schema.required("La profession de santé est à renseigner")
              : schema
          }),
        type: yup.object().nullable().required("Le type est à renseigner"),
      }),
    )
    .min(1, "Au moins un auteur est à renseigner")
    .required("Au moins un auteur est à renseigner"),
  pursuit: yup
    .mixed()
    .oneOf(pursuitOptions, "Les suites judiciaires sont à renseigner")
    .required("Les suites judiciaires sont à renseigner"),
  pursuitBy: yup.array(yup.string()).when("pursuit", (pursuit, schema) => {
    return pursuit === "Plainte"
      ? schema.required("Préciser qui a déposé la plainte")
      : schema
  }),
  // pursuitPrecision: yup.string().when("pursuit", (pursuit, schema) => {
  //   return pursuit === "Autre"
  //     ? schema
  //         .required("Le champ Autre suites judiciaires doit être précisé")
  //         .min(1, "Le champ Autre suites judiciaires doit être précisé")
  //     : yup.string().transform(() => "")
  // }),
  thirdParty: yup
    .array(yup.string())
    .when("thirdPartyIsPresent", (thirdPartyIsPresent, schema) => {
      return thirdPartyIsPresent === "Oui"
        ? schema
            .required("Au moins un tiers est à renseigner")
            .min(1, "Au moins un tiers est à renseigner")
        : schema.transform(() => [])
    }),
  thirdPartyIsPresent: yup
    .mixed()
    .oneOf(ouiNonOptions, "Veuillez préciser si un tiers est intervenu")
    .required("Veuillez préciser si un tiers est intervenu"),
  thirdPartyPrecision: yup.string().when("thirdParty", (thirdParty, schema) => {
    return thirdParty?.includes("Autre")
      ? schema
          .required("Le champ Autre tiers doit être précisé")
          .min(1, "Le champ Autre tiers doit être précisé")
          .max(
            255,
            ({ max }) =>
              `Le champ Autre tiers ne doit pas dépasser ${max} caractères`,
          )
      : schema.transform(() => "")
  }),

  victims: yup
    .array(
      yup.object({
        age: yup.object().nullable().required("L'âge est à renseigner"),
        gender: yup
          .object()
          .nullable()
          .required("Le champ sexe est à renseigner"),
        healthJob: yup
          .object()
          .nullable()
          .when("type", (type, schema) => {
            return isHealthType(type?.value)
              ? schema.required("La profession de santé est à renseigner")
              : schema
          }),
        type: yup.object().nullable().required("Le type est à renseigner"),
      }),
    )
    .min(1, "Au moins une victime est à renseigner")
    .required("Au moins un auteur est à renseigner"),
})

const ageOptions = ["- de 18 ans", "+ de 18 ans"].map((curr) => ({
  label: curr,
  value: curr,
}))

const genderOptions = ["Masculin", "Féminin"].map((curr) => ({
  label: curr,
  value: curr,
}))

const victimTypeOptions = [
  "Accompagnant/Visiteur/Famille",
  "Agent de sécurité-sûreté",
  "Détenu",
  "Établissement",
  "Étudiant en santé",
  "Patient/Résident",
  "Personnel administratif et technique",
  "Professionnel de santé",
  "Prestataire extérieur",
].map((curr) => ({ label: curr, value: curr }))

const authorProfileOptions = [
  "Accompagnant/Visiteur/Famille",
  "Agent de sécurité-sûreté",
  "Détenu",
  "Étudiant en santé",
  "Inconnu",
  "Patient/Résident",
  "Personnel administratif et technique",
  "Professionnel de santé",
  "Prestataire extérieur",
].map((curr) => ({ label: curr, value: curr }))

const healthJobOptions = [
  "Aide-soignant",
  "Ambulancier",
  "Assistant dentaire",
  "Audioprothésiste",
  "Auxiliaire de puériculture",
  "Chiropracteur",
  "Chirurgien-dentiste",
  "Diététicien",
  "Ergothérapeute",
  "Infirmier",
  "Manipulateur d'électroradiologie médicale",
  "Masseur-kinésithérapeute",
  "Médecin",
  "Opticien-lunetier",
  "Orthophoniste",
  "Orthoptiste",
  "Ostéopathe",
  "Pédicure-podologue",
  "Pharmacien",
  "Préparateur en pharmacie et en pharmacie hospitalière",
  "Prothésiste et orthésiste",
  "Psychologue",
  "Psychomotricien",
  "Psychothérapeute",
  "Sage-femme",
  "Technicien de laboratoire médical",
].map((curr) => ({ label: curr, value: curr }))

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
const suffix = (number, isFeminine = false) => {
  if (number === 1) {
    return isFeminine ? "ère" : "er"
  }
  if (number === 2) {
    return isFeminine ? "nde" : "nd"
  }
  return "ème"
}

const Victims = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "victims",
  })

  return (
    <div className="mt-2">
      <div>
        {fields.map((victim, index) => (
          <Victim
            key={victim?.id}
            data={victim}
            control={control}
            number={index}
            remove={() => remove(index)}
            errors={errors}
          />
        ))}
      </div>
      <div className="mt-10 text-center">
        <OutlineButton
          tabIndex="0"
          onClick={() => {
            append({ type: null })
          }}
        >
          +&nbsp;Ajouter une victime
        </OutlineButton>
      </div>
    </div>
  )
}

Victims.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object,
}

const Victim = ({ data, control, number = 0, remove, errors }) => {
  const type = useWatch({
    control,
    name: `victims[${number}].type`,
  })

  return (
    <div className="px-10 py-6 my-5 bg-gray-100 rounded-md shadow-md">
      <Title2 className="mb-4">
        {number + 1 + suffix(number + 1, true)} victime
        {number > 0 && (
          <div className="inline-block float-right text-sm">
            <OutlineButton color="red" onClick={remove} tabIndex="0">
              <span className="align-middle">Effacer&nbsp;X</span>
            </OutlineButton>
          </div>
        )}{" "}
      </Title2>

      <b>Profil</b>
      <div className="flex space-x-6">
        <div className="flex-1">
          <label
            className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
            htmlFor={`victims[${number}].type`}
          >
            &nbsp;
          </label>

          <div className="">
            <Controller
              as={Select}
              control={control}
              name={`victims[${number}].type`}
              id={`victims[${number}].type`}
              instanceId={`victims[${number}].type`}
              options={victimTypeOptions}
              placeholder="Choisir..."
              isClearable={true}
              styles={customStyles}
              defaultValue={type || null}
              noOptionsMessage={() => "Aucun élément"}
              aria-invalid={!!errors?.victims?.[number]?.type?.message}
            />

            <InputError error={errors?.victims?.[number]?.type?.message} />
          </div>
        </div>
        <div className="flex-1">
          <label
            className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
            htmlFor={`victims[${number}].gender`}
          >
            de sexe
          </label>
          <Controller
            as={Select}
            control={control}
            name={`victims[${number}].gender`}
            id={`victims[${number}].gender`}
            instanceId={`victims[${number}].gender`}
            options={genderOptions}
            placeholder="Choisir..."
            isClearable={true}
            styles={customStyles}
            defaultValue={data?.gender || null}
            noOptionsMessage={() => "Aucun élément"}
            aria-invalid={!!errors?.victims?.[number]?.gender?.message}
          />

          <InputError error={errors?.victims?.[number]?.gender?.message} />
        </div>

        <div className="flex-1">
          <label
            className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
            htmlFor={`victims[${number}].age`}
          >
            et âgé de
          </label>
          <Controller
            as={Select}
            control={control}
            name={`victims[${number}].age`}
            id={`victims[${number}].age`}
            instanceId={`victims[${number}].age`}
            options={ageOptions}
            placeholder="Choisir..."
            isClearable={true}
            styles={customStyles}
            defaultValue={data?.age || null}
            noOptionsMessage={() => "Aucun élément"}
            aria-invalid={!!errors?.victims?.[number]?.age?.message}
          />

          <InputError error={errors?.victims?.[number]?.age?.message} />
        </div>
      </div>

      {isHealthType(type?.value) && (
        <div className="flex mt-6">
          <div className="flex items-center flex-1 text-center">
            <label
              className="justify-center flex-1 text-xs font-medium text-gray-700 uppercase"
              htmlFor={`victims[${number}].type`}
            >
              dont la profession est&nbsp;
            </label>
          </div>
          <div className="flex-1">
            <div className="">
              <Controller
                as={Select}
                control={control}
                name={`victims[${number}].healthJob`}
                id={`victims[${number}].healthJob`}
                instanceId={`victims[${number}].healthJob`}
                options={healthJobOptions}
                placeholder="Choisir..."
                isClearable={true}
                styles={customStyles}
                defaultValue={data?.type || null}
                noOptionsMessage={() => "Aucun élément"}
                aria-invalid={!!errors?.victims?.[number]?.healthJob?.message}
              />

              <InputError
                error={errors?.victims?.[number]?.healthJob?.message}
              />
            </div>
          </div>
        </div>
      )}
      <div className="mt-8">
        <b>Conséquences d’éventuelles blessures physiques et/ou psychiques</b>
        <div className="flex items-center justify-around mt-8">
          <div className="text-center">
            <Controller
              as={Counter}
              control={control}
              name={`victims[${number}].sickLeaveDays`}
              defaultValue={data?.sickLeaveDays || 0}
            />
            {" jours d'arrêt de travail"}
          </div>
          <div className="text-center">
            <Controller
              as={Counter}
              control={control}
              name={`victims[${number}].hospitalizationDays`}
              defaultValue={data?.hospitalizationDays || 0}
            />
            {" jours d'hospitalisation"}
          </div>
          <div className="text-center">
            <Controller
              as={Counter}
              control={control}
              name={`victims[${number}].ITTDays`}
              defaultValue={data?.ITTDays || 0}
            />
            {" jours d'ITT"}
          </div>
        </div>
      </div>
    </div>
  )
}

Victim.propTypes = {
  control: PropTypes.object,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object,
  number: PropTypes.number,
  remove: PropTypes.func,
}

const Authors = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "authors",
  })

  return (
    <div className="mt-2">
      <div>
        {fields.map((author, index) => (
          <Author
            key={author?.id}
            data={author}
            control={control}
            number={index}
            remove={() => remove(index)}
            register={register}
            errors={errors}
          />
        ))}
      </div>
      <div className="mt-10 text-center">
        <OutlineButton
          tabIndex="0"
          onClick={() => {
            append({})
          }}
        >
          +&nbsp;Ajouter un auteur
        </OutlineButton>
      </div>
    </div>
  )
}

Authors.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object,
  register: PropTypes.func.isRequired,
}

const Author = ({ data, control, number = 0, remove, register, errors }) => {
  const type = useWatch({
    control,
    name: `authors[${number}].type`,
  })

  const discernmentTroublesIsPresent = useWatch({
    control,
    name: `authors[${number}].discernmentTroublesIsPresent`,
  })

  return (
    <div className="px-10 py-6 my-5 bg-gray-100 rounded-md shadow-md">
      <Title2 className="mb-4">
        {number + 1 + suffix(number + 1)} auteur
        {number > 0 && (
          <div className="inline-block float-right text-sm">
            <OutlineButton color="red" onClick={remove} tabIndex="0">
              <span className="align-middle">Effacer&nbsp;X</span>
            </OutlineButton>
          </div>
        )}
      </Title2>

      <b>Profil</b>

      <div className="flex space-x-6">
        <div className="flex-1">
          <label
            className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
            htmlFor={`authors[${number}].type`}
          >
            &nbsp;
          </label>

          <Controller
            as={Select}
            control={control}
            name={`authors[${number}].type`}
            id={`authors[${number}].type`}
            instanceId={`authors[${number}].type`}
            options={authorProfileOptions}
            placeholder="Choisir..."
            isClearable={true}
            styles={customStyles}
            defaultValue={data?.type || null}
            noOptionsMessage={() => "Aucun élément"}
            aria-invalid={!!errors?.authors?.[number]?.type?.message}
          />

          <InputError error={errors?.authors?.[number]?.type?.message} />
        </div>
        <div className="flex-1">
          <label
            className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
            htmlFor={`authors[${number}].gender`}
          >
            de sexe
          </label>
          <Controller
            as={Select}
            control={control}
            name={`authors[${number}].gender`}
            id={`authors[${number}].gender`}
            instanceId={`authors[${number}].gender`}
            options={genderOptions}
            placeholder="Choisir..."
            isClearable={true}
            styles={customStyles}
            defaultValue={data?.gender || null}
            noOptionsMessage={() => "Aucun élément"}
            aria-invalid={!!errors?.authors?.[number]?.gender?.message}
          />

          <InputError error={errors?.authors?.[number]?.gender?.message} />
        </div>

        <div className="flex-1">
          <label
            className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
            htmlFor={`authors[${number}].age`}
          >
            et âgé de
          </label>
          <Controller
            as={Select}
            control={control}
            name={`authors[${number}].age`}
            id={`authors[${number}].age`}
            instanceId={`authors[${number}].age`}
            options={ageOptions}
            placeholder="Choisir..."
            isClearable={true}
            styles={customStyles}
            defaultValue={data?.age || null}
            noOptionsMessage={() => "Aucun élément"}
            aria-invalid={!!errors?.authors?.[number]?.age?.message}
          />

          <InputError error={errors?.authors?.[number]?.age?.message} />
        </div>
      </div>

      {isHealthType(type?.value) && (
        <div className="flex mt-6">
          <div className="flex items-center flex-1 text-center">
            <label
              className="justify-center flex-1 text-xs font-medium text-gray-700 uppercase"
              htmlFor={`authors[${number}].type`}
            >
              dont la profession est&nbsp;
            </label>
          </div>
          <div className="flex-1">
            <div className="">
              <Controller
                as={Select}
                control={control}
                name={`authors[${number}].healthJob`}
                id={`authors[${number}].healthJob`}
                instanceId={`authors[${number}].healthJob`}
                options={healthJobOptions}
                placeholder="Choisir..."
                isClearable={true}
                styles={customStyles}
                defaultValue={data?.type || null}
                noOptionsMessage={() => "Aucun élément"}
                aria-invalid={!!errors?.authors?.[number]?.healthJob?.message}
              />

              <InputError
                error={errors?.authors?.[number]?.healthJob?.message}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <div className="flex">
          <b className="mr-8">Altération du discernement</b>

          <div className="inline-flex flex-row items-end space-x-8">
            <RadioInput
              name={`authors[${number}].discernmentTroublesIsPresent`}
              value="Oui"
              register={register()}
              defaultChecked={data?.discernmentTroublesIsPresent === "Oui"}
            />
            <RadioInput
              name={`authors[${number}].discernmentTroublesIsPresent`}
              value="Non"
              register={register()}
              defaultChecked={data?.discernmentTroublesIsPresent === "Non"}
            />
          </div>
        </div>

        <InputError
          error={
            errors?.authors?.[number]?.discernmentTroublesIsPresent?.message
          }
        />

        {discernmentTroublesIsPresent === "Oui" && (
          <>
            <i className="text-gray-600">Plusieurs choix possibles</i>

            <Options
              name={`authors[${number}].discernmentTroubles`}
              register={register()}
              allChecked={data?.discernmentTroubles}
            >
              <Option value="Trouble psychique ou neuropsychique (TPN)" />
              <Option value="Prise d’alcool" />
              <Option value="Prise de produits stupéfiants" />
              <Option value="Prise de médicaments" />
              <Option value="Effet de l’anesthésie" />
            </Options>

            <InputError
              error={errors?.authors?.[number]?.discernmentTroubles?.message}
            />
          </>
        )}
      </div>
    </div>
  )
}

Author.propTypes = {
  control: PropTypes.object,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object,
  number: PropTypes.number,
  register: PropTypes.func,
  remove: PropTypes.func,
}

const Step4Page = () => {
  useScrollTop()
  const {
    onSubmit: originalOnSubmit,
    handleSubmit,
    errors,
    control,
    setValue,
    state,
    watch,
    register,
  } = useDeclarationForm({
    defaultValuesFromState: (state) => ({
      authors: state?.steps?.victimsAuthors?.authors || [{}],
      pursuit: state?.steps?.victimsAuthors?.pursuit,
      pursuitBy: state?.steps?.victimsAuthors?.pursuitBy || [],
      pursuitPrecision: state?.steps?.victimsAuthors?.pursuitPrecision,
      thirdParty: state?.steps?.victimsAuthors?.thirdParty,
      thirdPartyIsPresent: state?.steps?.victimsAuthors?.thirdPartyIsPresent,
      thirdPartyPrecision: state?.steps?.victimsAuthors?.thirdPartyPrecision,
      victims: state?.steps?.victimsAuthors?.victims || [{}],
    }),
    resolver: yupResolver(schema),
  })

  const [phase, setPhase] = React.useState(1)

  const watchPursuit = watch("pursuit")
  const watchThirdParty = watch("thirdParty")
  const watchThirdPartyIsPresent = watch("thirdPartyIsPresent")

  React.useEffect(() => {
    // Si le champ pursuit est rempli, c'est qu'on n'affiche pas la page pour la 1ère fois, i.e. tout doit être déplié
    if (state?.form?.pursuit) setPhase(3)
  }, [state?.form?.pursuit, setPhase])

  React.useEffect(() => {
    // Clean precision when pursuit has changed and is not equal to Autre
    if (watchPursuit !== "Autre") {
      setValue("pursuitPrecision", "")
    }
  }, [setValue, watchPursuit])

  React.useEffect(() => {
    // Clean precision when thirdParty has changed and is not equal to Autre
    if (watchThirdParty?.length && !watchThirdParty?.includes("Autre")) {
      setValue("thirdPartyPrecision", "")
    }
  }, [setValue, watchThirdParty])

  const ensureOtherThirdPartyIsChecked = () => {
    const thirdParty = watchThirdParty?.length ? watchThirdParty : []
    if (!watchThirdParty?.includes("Autre"))
      setValue("thirdParty", [...thirdParty, "Autre"])
  }

  const onSubmit = (data) => {
    // We can't do it in yup validation (with transform) because this part of the form is not present so it is not carry on by react hook form...
    if (data?.pursuit !== "Plainte") data.pursuitBy = []
    if (data?.thirdPartyIsPresent === "Non") data.thirdParty = []

    originalOnSubmit(data)
  }

  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
      title={
        <span>
          Qui a été <b>victime</b> ?
        </span>
      }
    >
      <>
        <Victims control={control} errors={errors} />
        <Title2 className="mt-12">Y’a-t-il eu des suites judiciaires ?</Title2>
        <div className="mt-4">
          <div className="block mt-3">
            <div className="mt-2 space-y-2">
              {pursuitOptions.map((pursuit) => (
                <RadioInput
                  key={pursuit}
                  name="pursuit"
                  value={pursuit}
                  register={register}
                />
              ))}

              <InputError error={errors?.pursuit?.message} />
            </div>

            {watchPursuit === "Plainte" && (
              <div>
                <Title2 className="mt-12">Par...</Title2>

                <Options name="pursuitBy" register={register}>
                  <Option value="La (les) victime(s)" />
                  <Option value="L'établissement" />
                  <Option value="L'ordre" />
                </Options>

                <InputError error={errors?.pursuitBy?.message} />
              </div>
            )}
          </div>
        </div>
      </>
      {phase === 1 && (
        <div className="flex justify-center w-full my-16 space-x-4">
          <PrimaryButton onClick={() => setPhase(2)}>Suivant</PrimaryButton>
        </div>
      )}
      {phase >= 2 && (
        <>
          <Title1 className="mt-16">
            Qui a été <b>auteur</b> de la violence ?
          </Title1>
          <Authors control={control} register={register} errors={errors} />
          {phase === 2 && (
            <div className="flex justify-center w-full my-16 space-x-4">
              <PrimaryButton onClick={() => setPhase(3)}>Suivant</PrimaryButton>
            </div>
          )}
        </>
      )}

      {phase === 3 && (
        <>
          <Title1 className="mt-16">
            {"D'autres personnes ont-elles été impliquées ?"}
          </Title1>
          <Title2 className="flex mt-8 mb-2">
            <span className="mr-8">Intervention de tiers</span>
            <div className="inline-flex flex-row items-end space-x-8">
              <RadioInput
                name="thirdPartyIsPresent"
                value="Oui"
                register={register}
              />
              <RadioInput
                name="thirdPartyIsPresent"
                value="Non"
                register={register}
              />
            </div>
          </Title2>

          <InputError error={errors?.thirdPartyIsPresent?.message} />

          {watchThirdPartyIsPresent === "Oui" && (
            <>
              <i className="text-gray-600">Plusieurs choix possibles</i>

              <Options name="thirdParty" register={register}>
                <Option value="Personnel hospitalier" />
                <Option value="Service de sécurité-sûreté" />
                <Option value="Forces de l'ordre (police et gendarmerie nationales, police municipale)" />
                <Option value="Sapeurs-pompiers" />
                <Option
                  value="Autre"
                  precision={"thirdPartyPrecision"}
                  onChangePrecision={ensureOtherThirdPartyIsChecked}
                  error={errors?.thirdPartyPrecision?.message}
                />
              </Options>
              <InputError error={errors?.thirdParty?.message} />
            </>
          )}
        </>
      )}
    </FormComponent>
  )
}

export default Step4Page
