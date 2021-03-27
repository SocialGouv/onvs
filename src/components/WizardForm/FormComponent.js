import PropTypes from "prop-types"
import React from "react"

import { useDeclarationContext } from "@/hooks/useDeclarationContext"

import { Layout } from "../Layout"
import { Title1 } from "../lib"
import { Stepper } from "../Stepper"
import NavigationButtons from "./NavigationButtons"

const FormComponent = ({ onSubmit, children, title }) => {
  const context = useDeclarationContext()

  const { goPrevious, step, orderedSteps } = context

  let isFinalStep = false

  const stepConfirmation = orderedSteps.length - 1

  if (step === stepConfirmation - 1) {
    isFinalStep = true
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper step={step} />

        <Title1 className="mt-4">{title}</Title1>

        <form onSubmit={onSubmit} className="w-10/12 m-auto text-gray-900">
          {children}
          <NavigationButtons
            goPrevious={goPrevious}
            isFinalStep={isFinalStep}
            isFirstStep={step === 0}
          />
        </form>
      </div>
    </Layout>
  )
}

FormComponent.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  title: PropTypes.node,
}

export default FormComponent
