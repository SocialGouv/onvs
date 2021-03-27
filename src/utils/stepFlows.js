import Step0 from "@/components/WizardForm/Step0"
import Step1 from "@/components/WizardForm/Step1"
import Step2 from "@/components/WizardForm/Step2"
import Step3 from "@/components/WizardForm/Step3"
import Step4 from "@/components/WizardForm/Step4"
import Step5 from "@/components/WizardForm/Step5"
import Step6 from "@/components/WizardForm/Step6"

const genericOrderedSteps = [
  { component: Step0, name: "job" },
  { component: Step1, name: "dateLocation" },
  { component: Step2, name: "facts" },
  { component: Step3, name: "reasons" },
  { component: Step4, name: "victimsAuthors" },
  { component: Step5, name: "precision" },
  { component: Step6, name: "confirmation" },
]

//orderedSteps.filter((elt) => elt.name === step).map((elt) => elt.component)[0]
//TODO : make it dynamic with job and jobPrecision
export const getComponentForStep = ({ step }) =>
  genericOrderedSteps[step].component

// const formsByJob = {
//   "Pharmacien/Industrie": indusryPharmarcist,
//   "Pharmacien/Officine": dispensaryPharmacist,

//   default: generic,
// }

//TODO : make it dynamic with job and jobPrecision
export function getOrderedSteps() {
  //TODO faire l'aiguillage sur les formulaires spécifiques

  return genericOrderedSteps
}
