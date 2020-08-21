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
import { useScrollTop } from "@/hooks/useScrollTop"
import update from "@/lib/pages/form"
import { hasData } from "@/utils/misc"

import { toastConfig } from "../../../config"

const Step3Page = () => {
  useScrollTop()
  const router = useRouter()
  const { addToast } = useToasts()

  const { action, state } = useStateMachine(update)

  const { handleSubmit, register, setValue, watch } = useForm({
    defaultValues: {
      reasonCausePatient: state?.form?.reasonCausePatient,
      reasonCauseProfessional: state?.form?.reasonCauseProfessional,
      reasonDeficientCommunication: state?.form?.reasonDeficientCommunication,
      reasonDiscord: state?.form?.reasonDiscord,
      reasonFalsification: state?.form?.reasonFalsification,
      reasonLifeRules: state?.form?.reasonLifeRules,
      reasonNotApparent: state?.form?.reasonNotApparent,
      reasonOthers: state?.form?.reasonOthers,
    },
  })

  const watchReasonNotApparent = watch("reasonNotApparent")

  React.useEffect(() => {
    if (watchReasonNotApparent === "Pas de motif apparent") {
      setValue("reasonCausePatient", [])
      setValue("reasonCauseProfessional", [])
      setValue("reasonDeficientCommunication", [])
      setValue("reasonDiscord", [])
      setValue("reasonFalsification", [])
      setValue("reasonLifeRules", [])
      setValue("reasonOthers", [])
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
              name="reasonCausePatient"
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
              name="reasonCauseProfessional"
              disabled={!!watchReasonNotApparent}
              register={register}
              color="text-green-500"
            >
              <Option value="De prescription, de délivrance, de modification : d’une ordonnance, d’un arrêt de travail, d’hospitalisation" />
              <Option value="De donner des informations médicales à une tierce personne non référent médical" />
              <Option value="De soins" />
              <Option value="De donner un RDV (délai, horaire)" />
              <Option value="De vente pour non-conformité des droits" />
              <Option value="De vente pour d’autres raisons (hors stupéfiants)" />
            </Options>
          </div>

          <div className="mt-4">
            <b>Incompatibilité d’humeur et mésentente</b>

            <Options
              name="reasonDiscord"
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
              name="reasonLifeRules"
              disabled={!!watchReasonNotApparent}
              register={register}
              color="text-red-600"
            >
              <Option value="Retard du patient" />
              <Option value="Temps d’attente jugé excessif par le patient/résident/accompagnant/famille" />
              <Option value="Ordre de passage entre patients" />
              <Option value="Non-respect des conditions de séjour" />
              <Option value="Frustation/contrariété (pas de sortie, pas de cigarettes, pas de nourriture supplémentaire, etc.)" />
            </Options>
          </div>

          <div className="mt-4">
            <b>
              Falsification ou non-conformité de documents médicaux et/ou
              administratifs
            </b>

            <Options
              name="reasonFalsification"
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
              name="reasonDeficientCommunication"
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
              name="reasonOthers"
              disabled={!!watchReasonNotApparent}
              register={register}
              color="text-purple-600"
            >
              <Option value="Atteinte au principe de laïcité" />
              <Option value="Radicalisation" />
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
                      name="reasonNotApparent"
                      value="Pas de motif apparent"
                      ref={register}
                    />
                    <span className="ml-2">Pas de motif apparent</span>
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
