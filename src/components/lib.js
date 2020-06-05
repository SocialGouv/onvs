import React from "react"
import PropTypes from "prop-types"

export const PrimaryButtton = ({ children, type = "text" }) => (
  <button
    type={type}
    className="px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded"
  >
    {children}
  </button>
)

PrimaryButtton.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
}

export const OutlineButton = ({ children, type = "text" }) => (
  <button
    type={type}
    className="px-4 py-2 my-4 font-bold border border-gray-500 rounded"
  >
    {children}
  </button>
)

OutlineButton.propTypes = PrimaryButtton.propTypes

export const HeroTitle = ({ children }) => (
  <h1 className="mt-6 font-sans text-3xl font-medium text-gray-200 md:text-4xl title-font">
    {children}
  </h1>
)

HeroTitle.propTypes = {
  children: PropTypes.object,
}

export const Title1 = ({ children }) => (
  <h1 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
    {children}
  </h1>
)

Title1.propTypes = {
  children: PropTypes.object,
}

export const Title2 = ({ children }) => (
  <h2 className="mt-3 text-sm leading-5 text-center text-gray-600">
    {children}
  </h2>
)

Title2.propTypes = Title1.propTypes

export const Input = ({
  ariaLabel,
  id,
  name,
  type = "text",
  required,
  placeholder,
}) => (
  <input
    aria-label={ariaLabel}
    name={name}
    id={id}
    type={type}
    required={!!required}
    className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
    placeholder={placeholder}
  />
)

Input.propTypes = {
  ariaLabel: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "email"]),
  required: PropTypes.boolean,
  placeholder: PropTypes.string,
}

export const Checkbox = ({ ariaLabel, id, name, required }) => (
  <input
    aria-label={ariaLabel}
    name={name}
    id={id}
    type="checkbox"
    required={!!required}
    className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
  />
)

Checkbox.propTypes = {
  ariaLabel: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.boolean,
}
