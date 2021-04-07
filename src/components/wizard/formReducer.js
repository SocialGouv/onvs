import { v4 as uuid } from "uuid"

function buildEmptyState() {
  return {
    // We set a new uuid for each reset to prevent multiple submits of the same declaration
    id: uuid(),
    step: 0,
    steps: {},
  }
}

const buildStateFn = (flow) => ({ state, step, data }) => {
  const { steps, declarationType } = flow
  return {
    ...state,
    declarationType: state.declarationType || declarationType, // keep the original declarationType to help debug problem
    step,
    steps: {
      ...state.steps,
      [steps[step].name]: {
        ...data,
      },
    },
  }
}

export const formReducer = (flow) => (state, payload) => {
  const { step, data, event } = payload

  const buildState = buildStateFn(flow)

  switch (event.name) {
    case "RESET":
      return { ...buildEmptyState() }
    case "SUBMIT": {
      return buildState({ data, state, step })
    }
    case "GOTO": {
      const step = event.step
      return buildState({ data, state, step })
    }
  }
}
