import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useStateMachine } from "little-state-machine"
import update from "lib/pages/form"
import { Layout } from "components/Layout"
import { PrimaryButtton, OutlineButton, Groups, Options } from "components/lib"
import { Stepper, Title1, Title2 } from "components/Stepper"

const Step2Page = () => {
  const router = useRouter()
  const { action, state } = useStateMachine(update)
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      factType: state?.form?.factType,
      factpGroups: state?.form?.factpGroups,
      factgGroups: state?.form?.factgGroups,
      factpSpokenViolence: state?.form?.factpSpokenViolence,
      factpPhysicalViolence: state?.form?.factpPhysicalViolence,
      factpSexualViolence: state?.form?.factpSexualViolence,
      factpPsychologicalViolence: state?.form?.factpPsychologicalViolence,
      factpDiscrimination: state?.form?.factpDiscrimination,
      factpHarassment: state?.form?.factpHarassment,
      factpNoRespect: state?.form?.factpNoRespect,
      factpOthers: state?.form?.factpOthers,
      factgDeterioration: state?.form?.factgDeterioration,
      factgStealWithoutBreakin: state?.form?.factgStealWithoutBreakin,
      factgStealWithBreakin: state?.form?.factgStealWithBreakin,
      factgOthers: state?.form?.factgOthers,
    },
  })

  const factType = watch("factType")
  const factpGroups = watch("factpGroups")
  const factgGroups = watch("factgGroups")

  const onSubmit = (data) => {
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
                    type="radio"
                    className="form-radio"
                    name="factType"
                    value="Atteinte aux personnes"
                    ref={register}
                  />
                  <span className="ml-2">Atteinte aux personnes</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="factType"
                    value="Atteinte aux biens"
                    ref={register}
                  />
                  <span className="ml-2">Atteinte aux biens</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="factType"
                    value="Les deux"
                    ref={register}
                  />
                  <span className="ml-2">Les deux</span>
                </label>
              </div>
            </div>
          </div>
          {(factType === "Atteinte aux personnes" ||
            factType === "Les deux") && (
            <>
              <Title2 className="mt-12 mb-8">
                Veuillez préciser l’atteinte aux personnes :
              </Title2>

              <Groups
                name="factpGroups"
                values={[
                  {
                    label: "La victime a subi une violence verbale",
                    color: "text-indigo-600",
                  },
                  {
                    label: "La victime a subi une violence physique",
                    color: "text-green-500",
                  },
                  {
                    label: "La victime a subi une violence sexuelle",
                    color: "text-pink-600",
                  },
                  {
                    label: "La victime a subi une violence psychologique",
                    color: "text-red-600",
                  },
                  {
                    label: "La victime a été discriminée",
                    color: "text-orange-600",
                  },
                  {
                    label: "La victime a été harcelée",
                    color: "text-teal-600",
                  },
                  {
                    label:
                      "Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique",
                    color: "text-purple-600",
                  },
                  {
                    label: "Autres atteintes aux personnes",
                    color: "  ",
                  },
                ]}
                register={register}
              />
            </>
          )}
          {(factType === "Atteinte aux biens" || factType === "Les deux") && (
            <>
              <Title2 className="mt-12 mb-8">
                Veuillez préciser l’atteinte aux biens :
              </Title2>

              <Groups
                name="factgGroups"
                values={[
                  {
                    label: "Dégradation",
                    color: "text-indigo-600",
                  },
                  {
                    label: "Vol sans effraction",
                    color: "text-green-500",
                  },
                  {
                    label: "Vol avec effraction",
                    color: "text-pink-600",
                  },
                  {
                    label: "Autres atteintes aux biens",
                    color: "text-yellow-600",
                  },
                ]}
                register={register}
              />
            </>
          )}
          {!!factpGroups?.length && (
            <>
              <Title2 className="mt-12 mb-8">
                Veuillez préciser les faits :
              </Title2>
              {factpGroups.includes(
                "La victime a subi une violence verbale",
              ) && (
                <>
                  <b>La victime a subi une violence verbale</b>

                  <Options
                    name="factpSpokenViolence"
                    values={[
                      "Injure et provocation",
                      "Outrage",
                      "Propos discriminatoire se rapportant à la race, l’ethnie, la nation, le pays, la religion, le sexe",
                      "Menace de mort et d’atteinte à l’intégrité physique",
                      "Menace grave d’atteinte aux biens",
                    ]}
                    register={register}
                    color="text-indigo-600"
                  />
                </>
              )}
              {factpGroups.includes(
                "La victime a subi une violence physique",
              ) && (
                <>
                  <b>La victime a subi une violence physique</b>

                  <Options
                    name="factpPhysicalViolence"
                    values={[
                      "Maltraitance volontaire ou par négligence sans but d’obtenir un acte ou une abstention de la personne",
                      "Violence involontaire",
                      "Violence volontaire sans arme",
                      "Violence volontaire avec arme (par nature ou par destination)",
                    ]}
                    register={register}
                    color="text-green-500"
                  />
                </>
              )}
              {factpGroups.includes(
                "La victime a subi une violence sexuelle",
              ) && (
                <>
                  <b>La victime a subi une violence sexuelle</b>

                  <Options
                    name="factpSexualViolence"
                    values={[
                      "Exhibition sexuelle",
                      "Agression sexuelle autre que le viol",
                      "Viol",
                    ]}
                    register={register}
                    color="text-pink-600"
                  />
                </>
              )}
              {factpGroups.includes(
                "La victime a subi une violence psychologique",
              ) && (
                <>
                  <b>La victime a subi une violence psychologique</b>

                  <Options
                    name="factpPsychologicalViolence"
                    values={[
                      "Abus de faiblesse ou état d’ignorance",
                      "Constat d’un suicide ou d’une tentative",
                      "Menace avec arme (par nature ou par destination)",
                      "Enlèvement, séquestration",
                      "Tentative de meurtre",
                    ]}
                    register={register}
                    color="text-red-600"
                  />
                </>
              )}
              {factpGroups.includes("La victime a été discriminée") && (
                <>
                  <b>La victime a été discriminée</b>

                  <Options
                    name="factpDiscrimination"
                    values={[
                      "Refus d'un bien ou d'un service en raison de critères discriminatoires",
                    ]}
                    register={register}
                    color="text-orange-600"
                  />
                </>
              )}
              {factpGroups.includes("La victime a été harcelée") && (
                <>
                  <b>La victime a été harcelée</b>

                  <Options
                    name="factpHarassment"
                    values={["Harcèlement moral", "Harcèlement sexuel"]}
                    register={register}
                    color="text-teal-600"
                  />
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
                    values={[
                      "Nuisance, chahut, fugue",
                      "Consommation ou détention sur place d’alcool et/ou de produits stupéfiants pour son propre usage",
                    ]}
                    register={register}
                    color="text-purple-600"
                  />
                </>
              )}
              {factpGroups.includes("Autres atteintes aux personnes") && (
                <>
                  <b>Autres atteintes aux personnes</b>

                  <Options
                    name="factpOthers"
                    values={[
                      "Atteinte à la vie privée et/ou au droit à l’image",
                      "Atteinte au respect dû aux morts",
                      "Autres",
                    ]}
                    register={register}
                    color="text-yellow-600"
                  />
                </>
              )}
            </>
          )}
          {!!factgGroups?.length && (
            <>
              <Title2 className="mt-12 mb-8">
                Veuillez préciser les faits :
              </Title2>

              {factgGroups.includes("Dégradation") && (
                <>
                  <b>Dégradation</b>

                  <Options
                    name="factgDeterioration"
                    values={[
                      "Dégradation et destruction autres que par incendie",
                      "Dégradation par incendie volontaire",
                      "Tags, graffitis, autres salissures",
                      "Squat et occupation",
                      "Matériel de grande valeur (médical ou non)",
                    ]}
                    register={register}
                    color="text-indigo-600"
                  />
                </>
              )}
              {factgGroups.includes("Vol sans effraction") && (
                <>
                  <b>Vol sans effraction</b>

                  <Options
                    name="factgStealWithoutBreakin"
                    values={[
                      "Objets professionnels ou personnels des personnels de santé",
                      "Matériel de grande valeur (médical ou non)",
                      "Effets personnels d’un patient, d’un accompagnant, d’une autre personne",
                      "Informations",
                      "Vol à main armée",
                    ]}
                    register={register}
                    color="text-green-600"
                  />
                </>
              )}
              {factgGroups.includes("Vol avec effraction") && (
                <>
                  <b>Vol avec effraction</b>

                  <Options
                    name="factgStealWithBreakin"
                    values={[
                      "Objets professionnels des personnels de santé",
                      "Matériel de grande valeur (médical ou non)",
                      "Effets personnels d’un patient, d’un accompagnant, d’une autre personne",
                      "Informations",
                      "Vol à main armée",
                    ]}
                    register={register}
                    color="text-pink-600"
                  />
                </>
              )}
              {factgGroups.includes("Autres atteintes aux biens") && (
                <>
                  <b>Autres atteintes aux biens</b>

                  <Options
                    name="factgOthers"
                    values={[
                      "Port d’arme ou détention d’arme",
                      "Escroquerie",
                      "Trafic de stupéfiants, ou autre trafic, dans l’établissement",
                      "Autre",
                    ]}
                    register={register}
                    color="text-yellow-600"
                  />
                </>
              )}
            </>
          )}

          {(!!factpGroups?.length || !!factgGroups?.length) && (
            <div className="flex justify-center w-full my-16 space-x-4">
              <Link href="/forms/freelance/step1">
                <a>
                  <OutlineButton>Précédent</OutlineButton>
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
