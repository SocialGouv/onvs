import { v4 as uuid } from "uuid"

import { logDebug } from "@/utils/logger"

function buildEmptyState() {
  return {
    // We set a new uuid for each reset to prevent multiple submits of the same declaration
    id: uuid(),
    step: 0,
    steps: {},
  }
}

const buildState = ({ state, step, data, stepName }) => {
  return {
    ...state,
    step,
    steps: {
      ...state.steps,
      [stepName]: {
        ...data,
      },
    },
  }
}

export const formReducer = (state, payload) => {
  const { step, data, event, declarationType, stepName, finesset } = payload

  logDebug({ payload })

  switch (event.name) {
    case "RESET":
      return { ...buildEmptyState() }
    case "INIT": {
      return {
        ...buildEmptyState(),
        ...buildState({ data, state, step, stepName }),
        declarationType,
        ...(finesset && { finesset }),
      }
    }
    case "SUBMIT": {
      return {
        ...buildState({ data, state, step, stepName }),
        ...(finesset && { finesset }),
      }
    }
    case "GOTO": {
      const step = event.step
      return buildState({ data, state, step })
    }
  }
}

export function reset({ action }) {
  action({ event: { name: "RESET" } })
}

export function initEtsForm({ action, finesset }) {
  const payload = {
    declarationType: "ets",
    finesset,
    event: { name: "INIT" },
    step: 0,
  }
  action(payload)
}
