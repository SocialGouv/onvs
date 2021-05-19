import PropTypes from "prop-types"
import React from "react"

// import Modal from "@/components/Modal"
import AddIcon from "@/components/svg/add"
import Info from "@/components/svg/info"
import MinusIcon from "@/components/svg/minus"

export const PrimaryButtton = ({
  children,
  className,
  type = "submit",
  onClick,
  tabIndex = "0",
}) => (
  <button
    type={type}
    className={`px-6 py-2 font-bold uppercase text-sm tracking-wider font-source text-white bg-blue-500 rounded ${className}`}
    onClick={onClick}
    tabIndex={tabIndex}
  >
    {children}
  </button>
)

PrimaryButtton.propTypes = {
  children: PropTypes.node,
  tabIndex: PropTypes.string,
  type: PropTypes.string,
}

export const OutlineButton = ({
  children,
  type = "submit",
  tabIndex = "-1",
  color = "",
  ...props
}) => {
  const colorStyle =
    color === "red"
      ? "text-red-500 border-red-500 hover:text-white hover:bg-red-400"
      : "text-blue-600 border-blue-500 hover:text-white hover:bg-blue-500"
  return (
    <button
      type={type}
      className={`px-6 py-2 text-sm tracking-wider uppercase rounded font-source border ${colorStyle} `}
      tabIndex={tabIndex}
      {...props}
    >
      {children}
    </button>
  )
}
OutlineButton.propTypes = PrimaryButtton.propTypes

export const HeroTitle = ({ children }) => (
  <h1 className="mt-6 text-2xl font-bold text-blue-200 md:text-4xl font-evolventa">
    {children}
  </h1>
)

HeroTitle.propTypes = {
  children: PropTypes.string,
}

export const TitleCard = ({ children, className }) => (
  <h1
    className={`mt-6 text-3xl font-bold leading-9 text-center text-gray-900 ${className}`}
  >
    {children}
  </h1>
)

TitleCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export const SubTitleCard = ({ children, className }) => (
  <h2
    className={`mt-3 text-sm leading-5 text-center text-gray-600 ${className}`}
  >
    {children}
  </h2>
)

SubTitleCard.propTypes = TitleCard.propTypes

export const Title1 = ({ children, className }) => (
  <h1 className={`text-lg text-center font-evolventa ${className}`}>
    {children}
  </h1>
)

Title1.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export const Title2 = ({ children, className }) => (
  <h2 className={`text-lg text-left font-evolventa ${className}`}>
    {children}
  </h2>
)

Title2.propTypes = Title1.propTypes

export const Input = ({
  ariaLabel,
  id,
  name,
  type = "text",
  required = false,
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
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(["text", "password", "email"]),
}

export const Checkbox = ({ ariaLabel, id, name, required = false }) => (
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
  required: PropTypes.bool,
}

// Shows different groups with different colors
export const Groups = ({ name, register, children }) => {
  if (!children) return null

  const expandedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { name, register })
    }
    return null // It should not happen.
  })

  return (
    <div className="mt-4">
      <div className="mt-2 space-y-2">{expandedChildren}</div>
    </div>
  )
}

Groups.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  register: PropTypes.func,
}

export const Group = ({ name, register, value, color }) => {
  return (
    <div>
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
  )
}

Group.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  value: PropTypes.string.isRequired,
}

// Shows options of a group with a same color. Options can be disabled.
export const Options = ({
  name,
  register,
  color = "text-indigo-600",
  disabled = false,
  children,
  allChecked = [],
}) => {
  if (!children) return null

  // TODO: gérer la liste des options cockés en tant que contexte plutôt que passer le paramètre allChecked

  // Iterate over children and set on them the factorized properties of their ancestor
  const expandedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        allChecked,
        color,
        disabled,
        name,
        register,
      })
    }
    return child // It should not happen.
  })

  return (
    <div className="my-4">
      <div className="mt-2 space-y-2">{expandedChildren}</div>
    </div>
  )
}

Options.propTypes = {
  allChecked: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  register: PropTypes.func,
  values: PropTypes.array,
}

//TODO: séparer les options checkbox et les options text (p. ex. defaultChecked ne fonctionne pas pour les inputs text)
export const Option = ({
  disabled = false,
  color = "text-indigo-600",
  value,
  register,
  name,
  precision,
  placeholder,
  error,
  hidden,
  info,
  onChangePrecision,
  allChecked,
}) => {
  const isChecked = allChecked.includes(value)

  return (
    <div className={hidden ? "hidden" : ""}>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className={`form-checkbox ${disabled ? "opacity-50" : ""} ${color}`}
          name={name}
          value={value}
          ref={register}
          disabled={disabled}
          defaultChecked={isChecked}
        />
        <span className={`ml-2 ${disabled ? "opacity-50" : ""}`}>
          {value}&nbsp;
          {/* <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title="Hop hop!"
            content="Bla blab et trilili et tralala!! "
          /> */}
          {info && <Info title={info} />}
        </span>
      </label>
      {precision && (
        <>
          <div
            className={`ml-2 inline-block pb-2 border-b-2  ${
              error ? "border-red-500" : "border-blue-400"
            }`}
          >
            <input
              className={`px-2 mr-3 leading-tight bg-transparent border-none focus:outline-none`}
              type="text"
              id={precision}
              name={precision}
              placeholder={placeholder}
              ref={register()}
              aria-invalid={error ? "true" : "false"}
              autoComplete="off"
              onChange={onChangePrecision}
            />
          </div>
        </>
      )}
    </div>
  )
}

Option.propTypes = {
  allChecked: PropTypes.arrayOf(String),
  color: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hidden: PropTypes.bool,
  info: PropTypes.string,
  name: PropTypes.string,
  onChangePrecision: PropTypes.func,
  placeholder: PropTypes.string,
  precision: PropTypes.string,
  register: PropTypes.func,
  value: PropTypes.string.isRequired,
}

export const Counter = ({ value = 0, onChange }) => {
  const add = () => {
    onChange(value + 1)
  }

  const substract = () => {
    if (value > 0) onChange(value - 1)
  }

  // A11y keyboard navigation: push space key to activate the button
  const keyPress = (event, fn) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault()
      fn(event)
    }
  }

  return (
    <div className="flex items-center justify-center mb-4 text-center">
      <MinusIcon
        onClick={substract}
        className="w-8 h-8 p-1 mr-2 bg-blue-100 rounded-full"
        tabIndex="0"
        onKeyPress={(e) => keyPress(e, substract)}
      />
      <span className="w-12">{value}</span>
      <AddIcon
        onClick={add}
        className="w-8 h-8 p-1 ml-2 bg-blue-100 rounded-full"
        tabIndex="0"
        onKeyPress={(e) => keyPress(e, add)}
      />
    </div>
  )
}

Counter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
}

export default Counter

export const RadioInput = ({
  name,
  value,
  register,
  defaultChecked = false,
  error,
}) => {
  return (
    <div>
      <label className="inline-flex items-center">
        <input
          type="radio"
          className={`form-radio ${error ? "border-red-500" : ""}`}
          name={name}
          value={value}
          ref={register}
          defaultChecked={defaultChecked}
        />
        <span className="ml-2">{value}</span>
      </label>
    </div>
  )
}

RadioInput.propTypes = {
  defaultChecked: PropTypes.bool,
  error: PropTypes.object,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export const InputError = ({ error }) => {
  return error ? (
    <div role="alert" className="text-red-500">
      <span role="img" aria-label="Warning">
        ⚠️
      </span>{" "}
      {error}
    </div>
  ) : null
}

InputError.propTypes = {
  error: PropTypes.string,
}
