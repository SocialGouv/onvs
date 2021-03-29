import Step0 from "@/components/WizardForm/Step0"
import Step1 from "@/components/WizardForm/Step1"
import Step2 from "@/components/WizardForm/Step2"
import Step3 from "@/components/WizardForm/Step3"
import Step4 from "@/components/WizardForm/Step4"
import Step5 from "@/components/WizardForm/Step5"
import Step5Hospital from "@/components/WizardForm/Step5Hospital"
import Step6 from "@/components/WizardForm/Step6"

export const startFlowUrl = "/declaration/etape/0"

export const firstStepUrl = (flow) =>
  flow ? `${startFlowUrl}/${flow}` : startFlowUrl

// The last step of all flows is supposed to be the confirmation page.
// A step with no label, will not be present in the "breadcrumb"'s flow (see Stepper component).

// default flow (for most liberal jobs)
const defaultOrderedSteps = [
  { component: Step0, name: "job" },
  { component: Step1, label: "Date et Lieu", name: "dateLocation" },
  { component: Step2, label: "Faits", name: "facts" },
  { component: Step3, label: "Motifs", name: "reasons" },
  { component: Step4, label: "Victimes et Auteurs", name: "victimsAuthors" },
  { component: Step5, label: "Précisions", name: "precision" },
  { component: Step6, name: "confirmation" },
]

// flow for ETS
const hostpitalOrderedSteps = [
  { component: Step1, label: "Date et Lieu", name: "dateLocation" },
  { component: Step2, label: "Faits", name: "facts" },
  { component: Step3, label: "Motifs", name: "reasons" },
  { component: Step4, label: "Victimes et Auteurs", name: "victimsAuthors" },
  { component: Step5Hospital, label: "Précisions", name: "precision" },
  { component: Step6, name: "confirmation" },
]

// matching for specific flows
const flows = {
  ets: hostpitalOrderedSteps,
  //   "Pharmacien/Industrie": indusryPharmarcist,
  //   "Pharmacien/Officine": dispensaryPharmacist,
}

export const getComponentForStep = ({ step, job }) =>
  flows[job]?.[step]?.component || defaultOrderedSteps[step].component

export const getOrderedSteps = ({ job }) => flows[job] || defaultOrderedSteps
