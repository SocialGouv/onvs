import React from "react"
import PropTypes from "prop-types"

export const Title1 = ({ children, className }) => (
  <h1 className={`text-lg text-center font-evolventa ${className}`}>
    {children}
  </h1>
)

Title1.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
}

export const Title2 = ({ children, className }) => (
  <h2 className={`text-lg text-left font-evolventa ${className}`}>
    {children}
  </h2>
)

Title2.propTypes = Title1.propTypes

const Tab = ({ children, selected = false }) =>
  selected ? (
    <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wide text-gray-100 bg-blue-400 border-b-4 border-r-2 border-blue-500 rounded-t sm:px-6 sm:w-auto sm:justify-start font-evolventa">
      {children}
    </a>
  ) : (
    <a className="inline-flex items-center justify-center w-1/2 py-3 text-base font-medium leading-none tracking-wide text-gray-600 border-b-2 border-gray-200 sm:px-6 sm:w-auto sm:justify-start hover:text-gray-900 font-evolventa">
      {children}
    </a>
  )

export const Stepper = ({ step = 1 }) => (
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
