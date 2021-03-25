import { createStore } from "little-state-machine"
import { v4 as uuid } from "uuid"

function buildEmptyState() {
  return {
    currentStep: "",
    id: uuid(),
    steps: {
      dateLocation: {},
      facts: {},
      job: {},
      motives: {},
      precision: {},
    },
    type: "",
  }
}

createStore(buildEmptyState(), {
  name: "WIZARD_FORM",
})

const getIndexStepFn = (orderedSteps) => (step) =>
  orderedSteps.map((step) => step.name).indexOf(step)

function buildState({ state, step, newStep, data }) {
  return {
    ...state,
    currentStep: newStep,
    steps: {
      ...state.steps,
      [step]: {
        ...data,
      },
    },
  }
}

export const formReducer = (orderedSteps) => (state, payload) => {
  console.log({ payload })
  const { step, data, event } = payload

  const currentStep = state?.currentStep || orderedSteps?.[0]?.name

  const getIndexStep = getIndexStepFn(orderedSteps)

  switch (event.name) {
    case "RESET":
      return { ...buildEmptyState() }
    case "PREVIOUS": {
      const newStep =
        orderedSteps[Math.max(0, getIndexStep(currentStep) - 1)].name
      return buildState({ data, newStep, state, step })
    }
    case "SUBMIT": {
      const newStep =
        orderedSteps[
          Math.min(orderedSteps.length, getIndexStep(currentStep) + 1)
        ].name
      return buildState({ data, newStep, state, step })
    }
    case "GOTO": {
      const newStep = orderedSteps[getIndexStep(event.step)]
      return buildState({ data, newStep, state, step })
    }
  }
}
