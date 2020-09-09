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
  fgDeteriorations: yup.array(yup.string()).default(() => []),
  fgGroups: yup.array(yup.string()).default(() => []),
  fgOthers: yup.array(yup.string()).default(() => []),
  fgOthersPrecision: yup.string().when("fgOthers", (fgOthers, schema) => {
    return fgOthers.includes("Autre")
      ? schema.required("Le champ Autre atteinte aux biens doit être précisé")
      : schema.nullable(true)
  }),
  fgStealWithBreakins: yup.array(yup.string()).default(() => []),
  fgStealWithoutBreakins: yup.array(yup.string()).default(() => []),
  fpDiscriminations: yup.array(yup.string()).default(() => []),
  fpGroups: yup.array(yup.string()).default(() => []),
  fpHarassments: yup.array(yup.string()).default(() => []),
  fpNoRespects: yup.array(yup.string()).default(() => []),
  fpOthers: yup.array(yup.string()).default(() => []),
  fpOthersPrecision: yup.string().when("fpOthers", (fpOthers, schema) => {
    return fpOthers.includes("Autre")
      ? schema
          .required("Le champ Autre atteinte aux personnes doit être précisé")
          .min(5, 'Le champ "Autre" doit être précisé')
      : yup.string().nullable(true)
  }),
  fpPhysicalViolences: yup.array(yup.string()).default(() => []),
  fpPsychologicalViolences: yup.array(yup.string()).default(() => []),
  fpSexualViolences: yup.array(yup.string()).default(() => []),
  fpSpokenViolences: yup.array(yup.string()).default(() => []),
})

const Step2Page = () => {
  useScrollTop()
  const router = useRouter()
  const { action, state } = useStateMachine(update)
  const { errors, handleSubmit, register, setError, watch } = useForm({
    defaultValues: {
      factTypes: state?.form?.factTypes,
      fgDeteriorations: state?.form?.fgDeteriorations,
      fgGroups: state?.form?.fgGroups,
      fgOthers: state?.form?.fgOthers,
      fgOthersPrecision: state?.form?.fgOthersPrecision,
      fgStealWithBreakins: state?.form?.fgStealWithBreakins,
      fgStealWithoutBreakins: state?.form?.fgStealWithoutBreakins,
      fpDiscriminations: state?.form?.fpDiscriminations,
      fpGroups: state?.form?.fpGroups,
      fpHarassments: state?.form?.fpHarassments,
      fpNoRespects: state?.form?.fpNoRespects,
      fpOthers: state?.form?.fpOthers,
      fpOthersPrecision: state?.form?.fpOthersPrecision,
      fpPhysicalViolences: state?.form?.fpPhysicalViolences,
      fpPsychologicalViolences: state?.form?.fpPsychologicalViolences,
      fpSexualViolences: state?.form?.fpSexualViolences,
      fpSpokenViolences: state?.form?.fpSpokenViolences,
    },
    resolver: yupResolver(schema),
  })

  useEffectToast(errors)

  const factTypes = watch("factTypes")
  const fpGroups = watch("fpGroups")
  const fgGroups = watch("fgGroups")

  const onSubmit = (data) => {
    if (data?.factTypes?.includes("Atteinte aux personnes")) {
      const hasClicked =
        data?.fpDiscriminations.length ||
        data?.fpHarassments.length ||
        data?.fpNoRespects.length ||
        data?.fpOthers.length ||
        data?.fpPhysicalViolences.length ||
        data?.fpPsychologicalViolences.length ||
        data?.fpSexualViolences.length ||
        data?.fpSpokenViolences.length

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
        data?.fgDeteriorations.length ||
        data?.fgOthers.length ||
        data?.fgStealWithBreakins.length ||
        data?.fgStealWithoutBreakins.length

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

              <Groups name="fpGroups" register={register}>
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

              <Groups name="fgGroups" register={register}>
                <Group value="Dégradation" color="text-indigo-600" />
                <Group value="Vol sans effraction" color="text-green-500" />
                <Group value="Vol avec effraction" color="text-pink-600" />
                <Group value="Autres faits" color="text-yellow-600" />
              </Groups>
            </>
          )}
          {factTypes?.includes("Atteinte aux personnes") && !!fpGroups?.length && (
            <>
              <Title2 className="mt-12 mb-8">
                {"Veuillez préciser les faits de l'atteinte aux personnes :"}
              </Title2>
              {fpGroups.includes("La victime a subi une violence verbale") && (
                <>
                  <b>La victime a subi une violence verbale</b>

                  <Options
                    name="fpSpokenViolences"
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
              {fpGroups.includes("La victime a subi une violence physique") && (
                <>
                  <b>La victime a subi une violence physique</b>

                  <Options
                    name="fpPhysicalViolences"
                    color="text-green-500"
                    register={register}
                  >
                    <Option value="Maltraitance volontaire ou par négligence sans but d’obtenir un acte ou une abstention de la personne" />
                    {/* <Option value="Violence involontaire" /> */}
                    <Option value="Violence volontaire sans arme" />
                    <Option value="Violence volontaire avec arme (par nature ou par destination)" />
                  </Options>
                </>
              )}

              {fpGroups.includes("La victime a subi une violence sexuelle") && (
                <>
                  <b>La victime a subi une violence sexuelle</b>

                  <Options
                    name="fpSexualViolences"
                    color="text-pink-600"
                    register={register}
                  >
                    <Option value="Exhibition sexuelle" />
                    <Option value="Agression sexuelle autre que le viol" />
                    <Option value="Viol" />
                  </Options>
                </>
              )}

              {fpGroups.includes(
                "La victime a subi une violence psychologique",
              ) && (
                <>
                  <b>La victime a subi une violence psychologique</b>

                  <Options
                    name="fpPsychologicalViolences"
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

              {fpGroups.includes("La victime a été discriminée") && (
                <>
                  <b>La victime a été discriminée</b>

                  <Options
                    name="fpDiscriminations"
                    color="text-orange-600"
                    register={register}
                  >
                    <Option value="Refus d'un bien ou d'un service en raison de critères discriminatoires" />
                    {/* Hack to make the field fpDiscriminations an array (like the other fields), not a boolean */}
                    <Option value="N/A" hidden />
                  </Options>
                </>
              )}
              {fpGroups.includes("La victime a été harcelée") && (
                <>
                  <b>La victime a été harcelée</b>

                  <Options
                    name="fpHarassments"
                    color="text-teal-600"
                    register={register}
                  >
                    <Option value="Harcèlement moral" />
                    <Option value="Harcèlement sexuel" />
                  </Options>
                </>
              )}

              {fpGroups.includes(
                "Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique",
              ) && (
                <>
                  <b>
                    Les auteurs n’ont pas respecté les règles du lieu / ont eu
                    un comportement incivique
                  </b>

                  <Options
                    name="fpNoRespects"
                    color="text-purple-600"
                    register={register}
                  >
                    <Option value="Nuisance, chahut, fugue" />
                    <Option value="Consommation ou détention sur place d’alcool et/ou de produits stupéfiants pour son propre usage sexuel" />
                  </Options>
                </>
              )}
              {fpGroups.includes("Autres faits") && (
                <>
                  <b>Autres faits</b>

                  <Options
                    name="fpOthers"
                    color="text-yellow-600"
                    register={register}
                  >
                    <Option value="Atteinte à la vie privée et/ou au droit à l’image" />
                    <Option value="Atteinte au respect dû aux morts" />
                    <Option value="Autre" precision={"fpOthersPrecision"} />
                  </Options>
                </>
              )}
            </>
          )}
          {factTypes?.includes("Atteinte aux biens") && !!fgGroups?.length && (
            <>
              <Title2 className="mt-12 mb-8">
                {"Veuillez préciser les faits de l'atteinte aux biens :"}
              </Title2>

              {fgGroups.includes("Dégradation") && (
                <>
                  <b>Dégradation</b>

                  <Options
                    name="fgDeteriorations"
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

              {fgGroups.includes("Vol sans effraction") && (
                <>
                  <b>Vol sans effraction</b>

                  <Options
                    name="fgStealWithoutBreakins"
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

              {fgGroups.includes("Vol avec effraction") && (
                <>
                  <b>Vol avec effraction</b>

                  <Options
                    name="fgStealWithBreakins"
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

              {fgGroups.includes("Autres faits") && (
                <>
                  <b>Autres faits</b>

                  <Options
                    name="fgOthers"
                    color="text-yellow-600"
                    register={register}
                  >
                    <Option value="Port d’arme ou détention d’arme" />
                    <Option value="Escroquerie" />
                    <Option value="Trafic de stupéfiants, ou autre trafic, dans l’établissement" />
                    <Option
                      value="Autre"
                      precision={"fgOthersPrecision"}
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
