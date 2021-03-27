import { v4 as uuid } from "uuid"

function buildEmptyState() {
  return {
    // We set a new uuid for each reset to prevent multiple submits of the same declaration
    id: uuid(),
    step: 0,
    steps: {},

    type: "",
  }
}

const buildStateFn = (orderedSteps) => ({ state, step, data }) => {
  return {
    ...state,
    step,
    steps: {
      ...state.steps,
      [orderedSteps[step].name]: {
        ...data,
      },
    },
  }
}

export const formReducer = (orderedSteps) => (state, payload) => {
  const { step, data, event } = payload

  const buildState = buildStateFn(orderedSteps)

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
