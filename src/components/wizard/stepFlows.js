import * as hospital from "@/components/wizard/flows/ets";
import * as liberal from "@/components/wizard/flows/liberal";

export const startDeclarationUrl = "/declaration";
export const startFlowUrl = "/declaration/etape/1";

export const firstStepUrl = (flow) =>
  flow ? `${startFlowUrl}/${flow}` : startFlowUrl;

// The last step of all flows is supposed to be the confirmation page.
// A step with no label, will not be present in the "breadcrumb"'s flow (see Stepper component).

// flow for most liberal jobs (default flow)
const liberalOrderedSteps = [
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
];
const indusryPharmarcistOrderedSteps = [
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
];

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
];

// matching for specific flows
const flows = {
  ets: {
    declarationType: "ets",
    steps: hostpitalOrderedSteps,
  },
  liberal: {
    declarationType: "liberal",
    steps: liberalOrderedSteps,
  },
  // pharmacien: {
  //   declarationType: "pharmacien",
  //   steps: indusryPharmarcistOrderedSteps,
  // },
  "pharmacien/industrie": {
    declarationType: "pharmacien/industrie",
    steps: indusryPharmarcistOrderedSteps,
  },
  //   "Pharmacien/Officine": dispensaryPharmacist,
};

const defaultFlow = flows.liberal;

export const getFlowWithCriteria = ({ job, jobPrecision }) => {
  // for the start of all liberal flows, start with the liberal generic flow.
  // The flow may change later if user choose a job which has its own flow.
  if (!job) return defaultFlow;

  // Search if a flow job/precision exists, if not search with just job.
  // const jobAndPrecision = jobPrecision ? job + "/" + jobPrecision : job
  const jobAndPrecision = buildDeclarationType({
    job: job?.toLowerCase(),
    jobPrecision: jobPrecision?.toLowerCase(),
  });

  return flows[jobAndPrecision] || flows[job] || defaultFlow;
};

export const getFlow = (declarationType) => {
  if (!declarationType) return defaultFlow;

  return flows[declarationType] || defaultFlow;
};

export const getComponentForStep = ({ step, declarationType }) => {
  const component = getFlow(declarationType).steps?.[step - 1]?.component;

  if (!component) {
    throw new Error(`No step ${step - 1} for ${declarationType} flow.`);
  }

  return component;
};

export const buildDeclarationType = ({ job, jobPrecision }) =>
  `${job}${jobPrecision ? `/${jobPrecision}` : ""}`;
