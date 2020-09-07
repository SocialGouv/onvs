import { yupResolver } from "@hookform/resolvers"
import { useStateMachine } from "little-state-machine"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { Layout } from "@/components/Layout"
import {
  Group,
  Groups,
  Option,
  Options,
  OutlineButton,
  PrimaryButtton,
  Title1,
  Title2,
} from "@/components/lib"
import { Stepper } from "@/components/Stepper"
import { useEffectToast } from "@/hooks/useEffectToast"
import { useScrollTop } from "@/hooks/useScrollTop"
import update from "@/lib/pages/form"

const schema = yup.object({
  factTypes: yup
    .array(yup.string())
    .min(1, "Aucun type de fait n'a été coché."),
  factgDeterioration: yup.array(yup.string()).default(() => []),
  factgGroups: yup.array(yup.string()).default(() => []),
  factgOthers: yup.array(yup.string()).default(() => []),
  factgOthersPrecision: yup
    .string()
    .when("factgOthers", (factgOthers, schema) => {
      return factgOthers.includes("Autre")
        ? schema.required("Le champ Autre atteinte aux biens doit être précisé")
        : schema.nullable(true)
    }),
  factgStealWithBreakin: yup.array(yup.string()).default(() => []),
  factgStealWithoutBreakin: yup.array(yup.string()).default(() => []),
  factpDiscrimination: yup.array(yup.string()).default(() => []),
  factpGroups: yup.array(yup.string()).default(() => []),
  factpHarassment: yup.array(yup.string()).default(() => []),
  factpNoRespect: yup.array(yup.string()).default(() => []),
  factpOthers: yup.array(yup.string()).default(() => []),
  factpOthersPrecision: yup
    .string()
    .when("factpOthers", (factpOthers, schema) => {
      return factpOthers.includes("Autre")
        ? schema
            .required("Le champ Autre atteinte aux personnes doit être précisé")
            .min(5, 'Le champ "Autre" doit être précisé')
        : yup.string().nullable(true)
    }),
  factpPhysicalViolence: yup.array(yup.string()).default(() => []),
  factpPsychologicalViolence: yup.array(yup.string()).default(() => []),
  factpSexualViolence: yup.array(yup.string()).default(() => []),
  factpSpokenViolence: yup.array(yup.string()).default(() => []),
})

const Step2Page = () => {
  useScrollTop()
  const router = useRouter()
  const { action, state } = useStateMachine(update)
  const { errors, handleSubmit, register, setError, watch } = useForm({
    defaultValues: {
      factTypes: state?.form?.factTypes,
      factgDeterioration: state?.form?.factgDeterioration,
      factgGroups: state?.form?.factgGroups,
      factgOthers: state?.form?.factgOthers,
      factgOthersPrecision: state?.form?.factgOthersPrecision,
      factgStealWithBreakin: state?.form?.factgStealWithBreakin,
      factgStealWithoutBreakin: state?.form?.factgStealWithoutBreakin,
      factpDiscrimination: state?.form?.factpDiscrimination,
      factpGroups: state?.form?.factpGroups,
      factpHarassment: state?.form?.factpHarassment,
      factpNoRespect: state?.form?.factpNoRespect,
      factpOthers: state?.form?.factpOthers,
      factpOthersPrecision: state?.form?.factpOthersPrecision,
      factpPhysicalViolence: state?.form?.factpPhysicalViolence,
      factpPsychologicalViolence: state?.form?.factpPsychologicalViolence,
      factpSexualViolence: state?.form?.factpSexualViolence,
      factpSpokenViolence: state?.form?.factpSpokenViolence,
    },
    resolver: yupResolver(schema),
  })

  useEffectToast(errors)

  const factTypes = watch("factTypes")
  const factpGroups = watch("factpGroups")
  const factgGroups = watch("factgGroups")

  const onSubmit = (data) => {
    if (data?.factTypes?.includes("Atteinte aux personnes")) {
      const hasClicked =
        data?.factpDiscrimination.length ||
        data?.factpHarassment.length ||
        data?.factpNoRespect.length ||
        data?.factpOthers.length ||
        data?.factpPhysicalViolence.length ||
        data?.factpPsychologicalViolence.length ||
        data?.factpSexualViolence.length ||
        data?.factpSpokenViolence.length

      if (!hasClicked) {
        setError("global", {
          message: "Il faut au moins renseigner une atteinte aux personnes.",
          type: "manual",
        })
        return
      }
    }
    if (data?.factTypes?.includes("Atteinte aux biens")) {
      const hasClicked =
        data?.factgDeterioration.length ||
        data?.factgOthers.length ||
        data?.factgStealWithBreakin.length ||
        data?.factgStealWithoutBreakin.length

      if (!hasClicked) {
        setError("global", {
          message: "Il faut au moins renseigner une atteinte aux biens.",
          type: "manual",
        })

        return
      }
    }

    action(data)

    router.push("/forms/freelance/step3")
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper step={2} />

        <Title1 className="mt-4">{"Que s'est il passé ?"}</Title1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-10/12 m-auto text-gray-900"
        >
          <Title2 className="mt-12 mb-8">
            De quel(s) type(s) d’atteinte s’agit-il ?
          </Title2>
          <div className="mt-4">
            <div className="mt-2 space-y-2">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    name="factTypes"
                    value="Atteinte aux personnes"
                    ref={register}
                  />
                  <span className="ml-2">Atteinte aux personnes</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    name="factTypes"
                    value="Atteinte aux biens"
                    ref={register}
                  />
                  <span className="ml-2">Atteinte aux biens</span>
                </label>
              </div>
            </div>
          </div>
          {factTypes?.includes("Atteinte aux personnes") && (
            <>
              <Title2 className="mt-12 mb-8">
                Veuillez préciser l’atteinte aux personnes :
              </Title2>

              <Groups name="factpGroups" register={register}>
                <Group
                  value="La victime a subi une violence verbale"
                  color="text-indigo-600"
                />
                <Group
                  value="La victime a subi une violence physique"
                  color="text-green-500"
                />
                <Group
                  value="La victime a subi une violence sexuelle"
                  color="text-pink-600"
                />
                <Group
                  value="La victime a subi une violence psychologique"
                  color="text-red-600"
                />
                <Group
                  value="La victime a été discriminée"
                  color="text-orange-600"
                />
                <Group
                  value="La victime a été harcelée"
                  color="text-teal-600"
                />
                <Group
                  value="Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique"
                  color="text-purple-600"
                />
                <Group value="Autres faits" color="text-yellow-600" />
              </Groups>
            </>
          )}
          {factTypes?.includes("Atteinte aux biens") && (
            <>
              <Title2 className="mt-12 mb-8">
                Veuillez préciser l’atteinte aux biens :
              </Title2>

              <Groups name="factgGroups" register={register}>
                <Group value="Dégradation" color="text-indigo-600" />
                <Group value="Vol sans effraction" color="text-green-500" />
                <Group value="Vol avec effraction" color="text-pink-600" />
                <Group value="Autres faits" color="text-yellow-600" />
              </Groups>
            </>
          )}
          {factTypes?.includes("Atteinte aux personnes") &&
            !!factpGroups?.length && (
              <>
                <Title2 className="mt-12 mb-8">
                  {"Veuillez préciser les faits de l'atteinte aux personnes :"}
                </Title2>
                {factpGroups.includes(
                  "La victime a subi une violence verbale",
                ) && (
                  <>
                    <b>La victime a subi une violence verbale</b>

                    <Options
                      name="factpSpokenViolence"
                      color="text-indigo-600"
                      register={register}
                    >
                      <Option value="Injure et provocation" />
                      <Option value="Outrage" />
                      <Option value="Propos discriminatoire se rapportant à la race, l’ethnie, la nation, le pays, la religion, le sexe" />
                      <Option value="Menace de mort et d’atteinte à l’intégrité physique" />
                      <Option value="Menace grave d’atteinte aux biens" />
                    </Options>
                  </>
                )}
                {factpGroups.includes(
                  "La victime a subi une violence physique",
                ) && (
                  <>
                    <b>La victime a subi une violence physique</b>

                    <Options
                      name="factpPhysicalViolence"
                      color="text-green-500"
                      register={register}
                    >
                      <Option value="Maltraitance volontaire ou par négligence sans but d’obtenir un acte ou une abstention de la personne" />
                      <Option value="Violence involontaire" />
                      <Option value="Violence volontaire sans arme" />
                      <Option value="Violence volontaire avec arme (par nature ou par destination)" />
                    </Options>
                  </>
                )}

                {factpGroups.includes(
                  "La victime a subi une violence sexuelle",
                ) && (
                  <>
                    <b>La victime a subi une violence sexuelle</b>

                    <Options
                      name="factpSexualViolence"
                      color="text-pink-600"
                      register={register}
                    >
                      <Option value="Exhibition sexuelle" />
                      <Option value="Agression sexuelle autre que le viol" />
                      <Option value="Viol" />
                    </Options>
                  </>
                )}

                {factpGroups.includes(
                  "La victime a subi une violence psychologique",
                ) && (
                  <>
                    <b>La victime a subi une violence psychologique</b>

                    <Options
                      name="factpPsychologicalViolence"
                      color="text-red-600"
                      register={register}
                    >
                      <Option value="Abus de faiblesse ou état d’ignorance" />
                      <Option value="Constat d’un suicide ou d’une tentative" />
                      <Option value="Menace avec arme (par nature ou par destination)" />
                      <Option value="Enlèvement, séquestration" />
                      <Option value="Tentative de meurtre" />
                    </Options>
                  </>
                )}

                {factpGroups.includes("La victime a été discriminée") && (
                  <>
                    <b>La victime a été discriminée</b>

                    <Options
                      name="factpDiscrimination"
                      color="text-orange-600"
                      register={register}
                    >
                      <Option value="Refus d'un bien ou d'un service en raison de critères discriminatoires" />
                      {/* Hack to make the field factpDiscrimination an array (like the other fields), not a boolean */}
                      <Option value="N/A" hidden />
                    </Options>
                  </>
                )}
                {factpGroups.includes("La victime a été harcelée") && (
                  <>
                    <b>La victime a été harcelée</b>

                    <Options
                      name="factpHarassment"
                      color="text-teal-600"
                      register={register}
                    >
                      <Option value="Harcèlement moral" />
                      <Option value="Harcèlement sexuel" />
                    </Options>
                  </>
                )}

                {factpGroups.includes(
                  "Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique",
                ) && (
                  <>
                    <b>
                      Les auteurs n’ont pas respecté les règles du lieu / ont eu
                      un comportement incivique
                    </b>

                    <Options
                      name="factpNoRespect"
                      color="text-purple-600"
                      register={register}
                    >
                      <Option value="Nuisance, chahut, fugue" />
                      <Option value="Consommation ou détention sur place d’alcool et/ou de produits stupéfiants pour son propre usage sexuel" />
                    </Options>
                  </>
                )}
                {factpGroups.includes("Autres faits") && (
                  <>
                    <b>Autres faits</b>

                    <Options
                      name="factpOthers"
                      color="text-yellow-600"
                      register={register}
                    >
                      <Option value="Atteinte à la vie privée et/ou au droit à l’image" />
                      <Option value="Atteinte au respect dû aux morts" />
                      <Option
                        value="Autre"
                        precision={"factpOthersPrecision"}
                      />
                    </Options>
                  </>
                )}
              </>
            )}
          {factTypes?.includes("Atteinte aux biens") && !!factgGroups?.length && (
            <>
              <Title2 className="mt-12 mb-8">
                {"Veuillez préciser les faits de l'atteinte aux biens :"}
              </Title2>

              {factgGroups.includes("Dégradation") && (
                <>
                  <b>Dégradation</b>

                  <Options
                    name="factgDeterioration"
                    color="text-indigo-600"
                    register={register}
                  >
                    <Option value="Dégradation et destruction autres que par incendie" />
                    <Option value="Dégradation par incendie volontaire" />
                    <Option value="Tags, graffitis, autres salissures" />
                    <Option value="Squat et occupation" />
                    <Option value="Matériel de grande valeur (médical ou non)" />
                  </Options>
                </>
              )}

              {factgGroups.includes("Vol sans effraction") && (
                <>
                  <b>Vol sans effraction</b>

                  <Options
                    name="factgStealWithoutBreakin"
                    color="text-green-600"
                    register={register}
                  >
                    <Option value="Objets professionnels ou personnels des personnels de santé" />
                    <Option value="Matériel de grande valeur (médical ou non)" />
                    <Option value="Effets personnels d’un patient, d’un accompagnant, d’une autre personne" />
                    <Option value="Informations" />
                    <Option value="Vol à main armée" />
                  </Options>
                </>
              )}

              {factgGroups.includes("Vol avec effraction") && (
                <>
                  <b>Vol avec effraction</b>

                  <Options
                    name="factgStealWithBreakin"
                    color="text-pink-600"
                    register={register}
                  >
                    <Option value="Objets professionnels des personnels de santé" />
                    <Option value="Matériel de grande valeur (médical ou non)" />
                    <Option value="Effets personnels d’un patient, d’un accompagnant, d’une autre personne" />
                    <Option value="Informations" />
                    <Option value="Vol à main armée" />
                  </Options>
                </>
              )}

              {factgGroups.includes("Autres faits") && (
                <>
                  <b>Autres faits</b>

                  <Options
                    name="factgOthers"
                    color="text-yellow-600"
                    register={register}
                  >
                    <Option value="Port d’arme ou détention d’arme" />
                    <Option value="Escroquerie" />
                    <Option value="Trafic de stupéfiants, ou autre trafic, dans l’établissement" />
                    <Option
                      value="Autre"
                      precision={"factgOthersPrecision"}
                      placeholder="Renseigner le fait"
                    />
                  </Options>
                </>
              )}
            </>
          )}
          {!!factTypes?.length && (
            <div className="flex justify-center w-full my-16 space-x-4">
              <Link href="/forms/freelance/step1">
                <a>
                  <OutlineButton type="button">Précédent</OutlineButton>
                </a>
              </Link>
              <PrimaryButtton>Suivant</PrimaryButtton>
            </div>
          )}
        </form>
      </div>
    </Layout>
  )
}

export default Step2Page
