import React from "react"
import PropTypes from "prop-types"
import AddIcon from "./svg/add"
import MinusIcon from "./svg/minus"

export const PrimaryButtton = ({
  children,
  className,
  type = "text",
  onClick,
}) => (
  <button
    type={type}
    className={`px-4 py-2 font-bold text-white bg-blue-500 rounded ${className}`}
    onClick={onClick}
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
    className="px-4 py-2 font-bold border border-gray-500 rounded"
  >
    {children}
  </button>
)

OutlineButton.propTypes = PrimaryButtton.propTypes

export const HeroTitle = ({ children }) => (
  <h1 className="mt-6 font-sans text-3xl font-medium text-blue-200 md:text-4xl title-font">
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

export const Groups = ({ name, values, register }) => {
  return (
    <div className="mt-4">
      <div className="mt-2 space-y-2">
        {values.map((value, index) => (
          <div key={index}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className={`form-checkbox ${value.color}`}
                name={name}
                value={value.label}
                ref={register}
              />
              <span className="ml-2">{value.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Options = ({
  name,
  values,
  register,
  color = "text-indigo-600",
}) => {
  return (
    <div className="my-4">
      <div className="mt-2 space-y-2">
        {values.map((value, index) => (
          <div key={index}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className={`form-checkbox ${color}`}
                name={name}
                value={value}
                ref={register}
              />
              <span className="ml-2">{value}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Counter = ({ value = 0, setValue }) => {
  const add = () => {
    setValue(value + 1)
  }

  const substract = () => {
    setValue(value - 1 >= 0 ? value - 1 : 0)
  }

  const keyPress = (event, fn) => event.key === "Enter" && fn(event)

  return (
    <>
      <div className="flex items-center justify-center mb-4 text-center">
        <MinusIcon
          onClick={substract}
          className="w-8 h-8 p-1 mr-4 bg-blue-100 rounded-full"
          tabIndex="0"
          onKeyPress={(e) => keyPress(e, substract)}
        />
        <span className="w-12">{value}</span>
        <AddIcon
          onClick={add}
          className="w-8 h-8 p-1 ml-4 bg-blue-100 rounded-full "
          tabIndex="0"
          onKeyPress={(e) => keyPress(e, add)}
        />
      </div>
    </>
  )
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default Counter
