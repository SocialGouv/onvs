import { yupResolver } from "@hookform/resolvers"
import { StateMachineProvider, useStateMachine } from "little-state-machine"
import PropTypes from "prop-types"
import React from "react"
import { useForm } from "react-hook-form"

import {
  DeclarationPageContext,
  useDeclarationForm,
} from "@/hooks/useDeclarationContext"
import { useEffectToast } from "@/hooks/useEffectToast"

import { OutlineButton, PrimaryButtton } from "../lib"
import { formReducer } from "./state-machine"

const orderedSteps = [
  { component: Step0, name: "job" },
  { component: Step1, name: "dateLocation" },
  { component: Step0, name: "facts" },
  { component: Step0, name: "motives" },
  { component: Step0, name: "precision" },
  { component: Step0, name: "confirmation" },
]

function NavigationButtons({ goPrevious, onSubmit }) {
  return (
    <div className="flex justify-center w-full my-8 space-x-4">
      <OutlineButton type="button" onClick={goPrevious}>
        Retour
      </OutlineButton>
      <PrimaryButtton onClick={onSubmit}>Suivant</PrimaryButtton>
    </div>
  )
}

NavigationButtons.propTypes = {
  goPrevious: PropTypes.func,
  onSubmit: PropTypes.func,
}

function Step0() {
  // profession
  const { state, onSubmit, step, goPrevious } = useDeclarationForm()
  const { errors, handleSubmit, register } = useForm({
    defaultValues: state?.steps?.job,
    // resolver: yupResolver(schema),
  })

  // useEffectToast(errors)

  return (
    <>
      <h1>Dans Step 0 : profession</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-10/12 m-auto text-gray-900"
      >
        <label>
          Nom profession
          <input name="job" className="mx-2 form-input" ref={register} />
        </label>

        <NavigationButtons goPrevious={goPrevious} />
      </form>
    </>
  )
}

// export const resetFreelance = reset("libéral")
// export const resetETS = reset("ETS")

function Step1() {
  // profession
  const { state, onSubmit, step, goPrevious } = useDeclarationForm()
  const { errors, handleSubmit, register } = useForm({
    defaultValues: state?.dateLocation,
    // resolver: yupResolver(schema),
  })

  // useEffectToast(errors)

  return (
    <>
      <h1>Dans Step 1 : Date & lieu</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-10/12 m-auto text-gray-900"
      >
        <label>
          Ville
          <input name="job" className="mx-2 form-input" ref={register} />
        </label>

        <NavigationButtons goPrevious={goPrevious} />
      </form>
    </>
  )
}

const getComponentForStep = (step) =>
  orderedSteps.filter((elt) => elt.name === step).map((elt) => elt.component)[0]

export function WizardForm() {
  const { action, state } = useStateMachine(formReducer(orderedSteps))
  console.log({ state })

  const { currentStep = orderedSteps?.[0].name } = state

  console.log({ currentStep })

  const Component = getComponentForStep(currentStep)

  console.log("component", Component)

  function onSubmit(data) {
    console.log({ data })
    const payload = {
      data,
      event: { name: "SUBMIT" },
      step: currentStep,
    }
    action(payload)
  }

  function goPrevious() {
    action({
      event: {
        name: "PREVIOUS",
      },
    })
  }

  return (
    <StateMachineProvider>
      <DeclarationPageContext.Provider
        value={{ goPrevious, onSubmit, state, step: currentStep }}
      >
        {/* <Component /> */}
      </DeclarationPageContext.Provider>
      <PrimaryButtton onClick={() => action({ event: { name: "RESET" } })}>
        Reset form
      </PrimaryButtton>
    </StateMachineProvider>
  )
}
