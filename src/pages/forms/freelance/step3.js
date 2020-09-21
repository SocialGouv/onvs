import { useStateMachine } from "little-state-machine"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import { useToasts } from "react-toast-notifications"

import { Layout } from "@/components/Layout"
import {
  Option,
  Options,
  OutlineButton,
  PrimaryButtton,
  Title1,
} from "@/components/lib"
import { Stepper } from "@/components/Stepper"
import Info from "@/components/svg/info"
import { useScrollTop } from "@/hooks/useScrollTop"
import { update } from "@/lib/pages/form"
import { hasData } from "@/utils/misc"

import { toastConfig } from "../../../config"

const Step3Page = () => {
  useScrollTop()
  const router = useRouter()
  const { addToast } = useToasts()

  const { action, state } = useStateMachine(update)

  const { handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      rCausePatients: state?.form?.rCausePatients,
      rCauseProfessionals: state?.form?.rCauseProfessionals,
      rDeficientCommunications: state?.form?.rDeficientCommunications,
      rDiscords: state?.form?.rDiscords,
      rFalsifications: state?.form?.rFalsifications,
      rLifeRules: state?.form?.rLifeRules,
      rNotApparent: state?.form?.rNotApparent,
      rOthers: state?.form?.rOthers,
    },
  })

  const watchReasonNotApparent = watch("rNotApparent")

  React.useEffect(() => {
    if (watchReasonNotApparent === "Pas de motif apparent") {
      setValue("rCausePatients", [])
      setValue("rCauseProfessionals", [])
      setValue("rDeficientCommunications", [])
      setValue("rDiscords", [])
      setValue("rFalsifications", [])
      setValue("rLifeRules", [])
      setValue("rOthers", [])
    }
  }, [watchReasonNotApparent, setValue])

  const onSubmit = (data) => {
    if (!hasData(data)) {
      addToast(
        <div className="text-lg">
          {
            'Vous devez renseigner un motif ou bien cocher la case "Pas de motif apparent"'
          }
        </div>,
        toastConfig.error,
      )

      return
    }

    action(data)

    router.push("/forms/freelance/step4")
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper step={3} />
        <Title1 className="mt-4">
          Quel(s) étai(en)t le(s) motif(s) apparent(s) de la violence ?
        </Title1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-10/12 m-auto space-y-12 text-gray-900"
        >
          <div className="mt-12">
            <b>
              Refus ou contestation par le patient, le résident ou
              l’accompagnant/la famille
            </b>

            <Options
              name="rCausePatients"
              disabled={!!watchReasonNotApparent}
              register={register}
              color="text-indigo-600"
            >
              <Option value="Du RDV donné (délai, horaire)" />
              <Option value="D’accepter le diagnostic, la décision thérapeutique/médicale/de sortie, etc." />
              <Option value="D’accepter les soins" />
              <Option value="D’accepter les soins de toilette" />
              <Option value="De paiement" />
              <Option value="De participer à une activité extérieure" />
            </Options>
          </div>

          <div className="mt-4">
            <b>Refus par le professionnel de santé</b>

            <Options
              name="rCauseProfessionals"
              disabled={!!watchReasonNotApparent}
              register={register}
              color="text-green-500"
            >
              <Option value="De prescription, de délivrance, de modification : d’une ordonnance, d’un arrêt de travail, d’hospitalisation" />
              <Option value="De donner des informations médicales à une tierce personne non référent médical" />
              <Option value="De soins" />
              <Option value="De donner un RDV (délai, horaire)" />
              <Option
                value="De vente pour non-conformité des droits"
                info="Pièce justificative manquante, falsifiée, périmée (carte vitale, ordonnance, etc.)  - à valider avec pharmaciens"
              />
              <Option value="De vente pour d’autres raisons (hors stupéfiants)" />
            </Options>
          </div>

          <div className="mt-4">
            <b>Incompatibilité d’humeur et mésentente</b>

            <Options
              name="rDiscords"
              disabled={!!watchReasonNotApparent}
              register={register}
              color="text-pink-600"
            >
              <Option value="Entre le professionnel/collaborateur et le patient/résident/accompagnant/famille" />
              <Option value="Entre les professionnels" />
              <Option value="Entre les patients/résidents/accompagnants" />
              <Option value="Autres (bandes, clans, squatteurs…)" />
            </Options>
          </div>

          <div className="mt-4">
            <b>Non-respect des règles de vie</b>

            <Options
              name="rLifeRules"
              disabled={!!watchReasonNotApparent}
              register={register}
              color="text-red-600"
            >
              <Option value="Retard du patient" />
              <Option value="Temps d’attente jugé excessif par le patient/résident/accompagnant/famille" />
              <Option value="Ordre de passage entre patients" />
              <Option
                value="Non-respect des conditions de séjour"
                info="règlement intérieur - droits et devoirs des patients, des accompagnants dans un établissement"
              />
              <Option value="Frustation/contrariété (pas de sortie, pas de cigarettes, pas de nourriture supplémentaire, etc.)" />
            </Options>
          </div>

          <div className="mt-4">
            <b>
              Falsification ou non-conformité de documents médicaux et/ou
              administratifs
            </b>

            <Options
              name="rFalsifications"
              disabled={!!watchReasonNotApparent}
              register={register}
              color="text-orange-600"
            >
              <Option value="Document médical (ordonnance)" />
              <Option value="Document administratif (CNI, carte Vitale non mise à jour, etc.)" />
            </Options>
          </div>

          <div className="mt-4">
            <b>Communication défaillante</b>

            <Options
              name="rDeficientCommunications"
              disabled={!!watchReasonNotApparent}
              register={register}
              color="text-teal-600"
            >
              <Option value="Remarques de la part du professionnel/collaborateur" />
              <Option value="Défaut d’information ou information incomplète du professionnel" />
              <Option value="Reproche d’une communication non adaptée (termes trop techniques, difficultés de compréhension de la langue)" />
            </Options>
          </div>

          <div className="mt-4">
            <b>Motifs divers</b>

            <Options
              name="rOthers"
              disabled={!!watchReasonNotApparent}
              register={register}
              color="text-purple-600"
            >
              <Option
                value="Atteinte au principe de laïcité"
                info="À ne pas confondre avec la radicalisation (Voir item suivant). L’atteinte à la laïcité est le non-respect des devoirs de neutralité, de dignité, de réserve, d’exécuter ses fonctions. Ex. :  ne pas vouloir serrer la main d’une personne du sexe opposé, ne pas vouloir soigner une personne du sexe opposé, refuser d’être dans la salle d’attente avec une personne d’un autre sexe, ne pas vouloir se faire soigner ou qu’un tiers refuse qu’un membre de sa famille soit soigné par un soignant du sexe opposé, installer un coin prière dans une partie de l’établissement, etc. Dans le privé on peut retrouver ces attitudes également : Ex. : ne pas retirer son voile sur le fauteuil du dentiste, etc."
              />
              <Option
                value="Radicalisation"
                info=" À ne pas confondre avec l’atteinte au principe de laïcité. «La radicalisation est un processus par lequel un individu ou un groupe adopte des velléités de violence, directement liées à une idéologie extrémiste à contenu politique, social ou religieux qui conteste l’ordre établi sur le plan politique, social ou culturel. » Les trois critères cumulatifs de la radicalisation violente sont donc : => Un processus marqué par des ruptures comportementales ; => L’adhésion à une idéologie extrémiste ; => L’adoption de la violence (risque de passage à l’acte, soutien, apologie."
              />
              <Option value="Caisse (vol de caisse, rendu de monnaie, etc.)" />
              <Option value="Réaction face à la douleur du soin" />
              <Option value="Patient sous stupéfiants" />
              <Option value="Autre" />
            </Options>
          </div>

          <div className="mt-4">
            <b />
            <div className="block mt-3">
              <div className="mt-2 space-y-2">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-check"
                      name="rNotApparent"
                      value="Pas de motif apparent"
                      ref={register}
                    />
                    <span className="mx-2">Pas de motif apparent</span>
                    <Info
                      title="Ex :
- Dans le cadre d’un fait constaté de dégradation de la porte d’entrée de la boutique ou du cabinet, de l’officine, de son véhicule ou encore le vol d’un objet mobilier que vous constatez sans connaître l’auteur ou sans raison apparente.
- Une personne dans un état second (TPN, alcoolisée, droguée, encore sous l’effet de l’anesthésie) qui sera virulente sans raison apparente."
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-full my-16 space-x-4">
            <Link href="/forms/freelance/step2">
              <a>
                <OutlineButton type="button">Précédent</OutlineButton>
              </a>
            </Link>
            <PrimaryButtton>Suivant</PrimaryButtton>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Step3Page
