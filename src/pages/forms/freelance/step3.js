import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useStateMachine } from "little-state-machine"
import update from "lib/pages/form"
import { Layout } from "components/Layout"
import { PrimaryButtton, OutlineButton, Options } from "components/lib"
import { Stepper, Title1 } from "components/Stepper"
import { useScrollTop } from "hooks/scrollTop"

const Step3Page = () => {
  useScrollTop()
  const router = useRouter()
  const { action, state } = useStateMachine(update)

  const { handleSubmit, register } = useForm({
    defaultValues: {
      reasonCausePatient: state?.form?.reasonCausePatient,
      reasonCauseProfessional: state?.form?.reasonCauseProfessional,
      reasonDiscord: state?.form?.reasonDiscord,
      reasonLifeRules: state?.form?.reasonLifeRules,
      reasonFalsification: state?.form?.reasonFalsification,
      reasonDeficientCommunication: state?.form?.reasonDeficientCommunication,
      reasonOthers: state?.form?.reasonOthers,
      reasonNotApparent: state?.form?.reasonNotApparent,
    },
  })

  const onSubmit = (data) => {
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
              values={[
                "Du RDV donné (délai, horaire)",
                "D’accepter le diagnostic, la décision thérapeutique/médicale/de sortie, etc.",
                "D’accepter les soins",
                "D’accepter les soins de toilette",
                "De paiement",
                "De participer à une activité extérieure",
              ]}
              register={register}
              color="text-indigo-600"
            />
          </div>

          <div className="mt-4">
            <b>Refus par le professionnel de santé</b>

            <Options
              name="reasonCauseProfessional"
              values={[
                "De prescription, de délivrance, de modification : d’une ordonnance, d’un arrêt de travail, d’hospitalisation",
                "De donner des informations médicales à une tierce personne non référent médical",
                "De soins",
                "De donner un RDV (délai, horaire)",
                "De vente pour non-conformité des droits",
                "De vente pour d’autres raisons (hors stupéfiants)",
              ]}
              register={register}
              color="text-green-500"
            />
          </div>

          <div className="mt-4">
            <b>Incompatibilité d’humeur et mésentente</b>

            <Options
              name="reasonDiscord"
              values={[
                "Entre le professionnel/collaborateur et le patient/résident/accompagnant/famille",
                "Entre les professionnels",
                "Entre les patients/résidents/accompagnants",
                "Autres (bandes, clans, squatteurs…)",
              ]}
              register={register}
              color="text-pink-600"
            />
          </div>

          <div className="mt-4">
            <b>Non-respect des règles de vie</b>

            <Options
              name="reasonLifeRules"
              values={[
                "Retard du patient",
                "Temps d’attente jugé excessif par le patient/résident/accompagnant/famille",
                "Ordre de passage entre patients",
                "Non-respect des conditions de séjour",
                "Frustation/contrariété (pas de sortie, pas de cigarettes, pas de nourriture supplémentaire, etc.)",
              ]}
              register={register}
              color="text-red-600"
            />
          </div>

          <div className="mt-4">
            <b>
              Falsification ou non-conformité de documents médicaux et/ou
              administratifs
            </b>

            <Options
              name="reasonFalsification"
              values={[
                "Document médical (ordonnance)",
                "Document administratif (CNI, carte Vitale non mise à jour, etc.)",
              ]}
              register={register}
              color="text-orange-600"
            />
          </div>

          <div className="mt-4">
            <b>Communication défaillante</b>

            <Options
              name="reasonDeficientCommunication"
              values={[
                "Remarques de la part du professionnel/collaborateur",
                "Défaut d’information ou information incomplète du professionnel",
                "Reproche d’une communication non adaptée (termes trop techniques, difficultés de compréhension de la langue)",
              ]}
              register={register}
              color="text-teal-600"
            />
          </div>

          <div className="mt-4">
            <b>Motifs divers</b>

            <Options
              name="reasonOthers"
              values={[
                "Atteinte au principe de laïcité",
                "Radicalisation",
                "Caisse (vol de caisse, rendu de monnaie, etc.)",
                "Réaction face à la douleur du soin",
                "Patient sous stupéfiants",
                "Autre",
              ]}
              register={register}
              color="text-purple-600"
            />
          </div>

          <div className="mt-4">
            <b></b>
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
                <OutlineButton>Précédent</OutlineButton>
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
