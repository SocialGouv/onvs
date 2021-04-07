import * as hospital from "@/components/wizard/flows/hospital"
import * as liberal from "@/components/wizard/flows/liberal"

export const startFlowUrl = "/declaration/etape/0"

export const firstStepUrl = (flow) =>
  flow ? `${startFlowUrl}/${flow}` : startFlowUrl

// The last step of all flows is supposed to be the confirmation page.
// A step with no label, will not be present in the "breadcrumb"'s flow (see Stepper component).

// flow for most liberal jobs (default flow)
const liberalOrderedSteps = [
  { component: liberal.Step0, name: "job" },
  { component: liberal.Step1, label: "Date et Lieu", name: "dateLocation" },
  { component: liberal.Step2, label: "Faits", name: "facts" },
  { component: liberal.Step3, label: "Motifs", name: "reasons" },
  {
    component: liberal.Step4,
    label: "Victimes et Auteurs",
    name: "victimsAuthors",
  },
  { component: liberal.Step5, label: "Précisions", name: "precision" },
  { component: liberal.Step6, name: "confirmation" },
]

// flow for hospital
const hostpitalOrderedSteps = [
  {
    component: hospital.Step1,
    label: "Date et Lieu",
    name: "dateLocation",
  },
  { component: liberal.Step2, label: "Faits", name: "facts" },
  { component: liberal.Step3, label: "Motifs", name: "reasons" },
  {
    component: liberal.Step4,
    label: "Victimes et Auteurs",
    name: "victimsAuthors",
  },
  { component: hospital.Step5, label: "Précisions", name: "precision" },
  { component: liberal.Step6, name: "confirmation" },
]

// matching for specific flows
const flows = {
  ets: { declarationType: "hospital", steps: hostpitalOrderedSteps },
  liberal: { declarationType: "liberal", steps: liberalOrderedSteps },
  //   "Pharmacien/Industrie": indusryPharmarcist,
  //   "Pharmacien/Officine": dispensaryPharmacist,
}

// TODO: rechercher avec job/joPrecision. Si on ne trouve pas, on recherche avec job. Si toujours pas, throw Error
export const getFlow = ({ job = "liberal" }) => {
  const flow = flows[job]

  if (!flow) {
    throw new Error(`No ${job} flow found.`)
  }

  return flow
}

export const getComponentForStep = ({ step, job }) => {
  const component = getFlow({ job }).steps[step]?.component

  if (!component) {
    throw new Error(`No step ${step} for ${job} flow.`)
  }

  return component
}
