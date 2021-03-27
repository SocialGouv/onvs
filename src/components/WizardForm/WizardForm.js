import { useStateMachine } from "little-state-machine"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import React from "react"

import { DeclarationPageContext } from "@/hooks/useDeclarationContext"
import { getComponentForStep, getOrderedSteps } from "@/utils/stepFlows"

import { formReducer } from "./formReducer"

export function WizardForm({ step, job, jobPrecision }) {
  const router = useRouter()
  const orderedSteps = getOrderedSteps({ job, jobPrecision })
  const { action, state } = useStateMachine(formReducer(orderedSteps))

  const DynamicComponent = getComponentForStep({ job, jobPrecision, step })

  const suffixUrl = `/${job}${jobPrecision ? `/${jobPrecision}` : ""}`

  function onSubmit(data) {
    const payload = {
      data,
      event: { name: "SUBMIT" },
      step,
    }
    action(payload)

    router.push(`/declaration/etape/${step + 1}${suffixUrl}`)
  }

  function goPrevious() {
    if (step === 0) {
      reset()
      return
    }
    router.push(`/declaration/etape/${Math.max(0, step - 1)}${suffixUrl}`)
  }

  function reset() {
    action({ event: { name: "RESET" } })
    router.push(`/`)
  }

  return (
    <>
      <DeclarationPageContext.Provider
        value={{ goPrevious, onSubmit, orderedSteps, state, step }}
      >
        <DynamicComponent key={step} />
      </DeclarationPageContext.Provider>
    </>
  )
}

WizardForm.propTypes = {
  job: PropTypes.string.isRequired,
  jobPrecision: PropTypes.string,
  step: PropTypes.number.isRequired,
}
