import PropTypes from "prop-types"
import React from "react"

const Tab = ({ children, selected = false }) =>
  selected ? (
    <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wide text-gray-100 bg-blue-400 border-b-4 border-r-2 border-blue-500 rounded-t sm:px-6 sm:w-auto sm:justify-start font-evolventa">
      {children}
    </a>
  ) : (
    <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wide text-gray-600 border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start font-evolventa">
      {children}
    </a>
  )

Tab.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
}

export const Stepper = ({ step }) => (
  <section className="container flex flex-col flex-wrap py-1 mx-auto text-gray-700 body-font">
    <div className="flex flex-wrap w-full mb-8 uppercase">
      <Tab selected={step === 1}>01/ Date et lieu</Tab>
      <Tab selected={step === 2}>02/ Faits</Tab>
      <Tab selected={step === 3}>03/ Motifs</Tab>
      <Tab selected={step === 4}>{"04/ Victimes & auteurs"}</Tab>
      <Tab selected={step === 5}>05/ Précisions</Tab>
    </div>
  </section>
)

Stepper.propTypes = {
  step: PropTypes.number,
}
