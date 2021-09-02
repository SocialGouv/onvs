import React from "react"

// import Modal from "@/components/Modal"
import AddIcon from "@/components/svg/add"
import Info from "@/components/svg/info"
import MinusIcon from "@/components/svg/minus"

import PrimaryButton from "@/components/PrimaryButton"
import OutlineButton from "@/components/OutlineButton"

export { PrimaryButton, OutlineButton }

export const HeroTitle = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => (
  <h1 className="mt-6 text-2xl font-bold text-blue-200 md:text-4xl font-evolventa">
    {children}
  </h1>
)

export const TitleCard = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): JSX.Element => (
  <h1
    className={`mt-6 text-3xl font-bold leading-9 text-center text-gray-900 ${className}`}
  >
    {children}
  </h1>
)

export const SubTitleCard = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}): JSX.Element => (
  <h2
    className={`mt-3 text-sm leading-5 text-center text-gray-600 ${className}`}
  >
    {children}
  </h2>
)

export const Title1Declaration = ({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}): JSX.Element => (
  <h1
    className={`text-lg text-center font-evolventa ${className} bg-blue-100 py-2 mt-8`}
  >
    {children}
  </h1>
)

export const Title1 = ({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}): JSX.Element => (
  <h1 className={`text-lg text-center font-evolventa ${className}`}>
    {children}
  </h1>
)

export const Title2 = ({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}): JSX.Element => (
  <h2 className={`text-lg text-left font-evolventa ${className}`}>
    {children}
  </h2>
)

export const Input = ({
  ariaLabel,
  id,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  id?: string
  ariaLabel?: string
  name: string
  type: "text" | "password" | "email"
  required: boolean
  placeholder: string
}): JSX.Element => (
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

export const Checkbox = ({
  id,
  ariaLabel,
  name,
  required = false,
}: {
  id: string
  ariaLabel?: string
  name?: string
  required?: boolean
}): JSX.Element => (
  <input
    aria-label={ariaLabel}
    name={name}
    id={id}
    type="checkbox"
    required={!!required}
    className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
  />
)

// Shows different groups with different colors
export const Groups = ({
  name,
  register,
  children,
}: {
  name: string
  register: () => void
  children: React.ReactNode
}): JSX.Element | null => {
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

export const Group = ({
  name,
  register,
  value,
  color,
}: {
  name: string
  register: () => void
  value: string
  color: string
}): JSX.Element => {
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

// Shows options of a group with a same color. Options can be disabled.
export const Options = ({
  name,
  register,
  color = "text-indigo-600",
  disabled = false,
  children,
  allChecked = [],
  setValue,
  getValues,
}: {
  name
  register
  color: string
  disabled: boolean
  children
  allChecked: string[]
  setValue: () => void
  getValues: () => any
}): JSX.Element | null => {
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
        setValue,
        getValues,
      } as React.HTMLAttributes<any>)
    }
    return child // It should not happen.
  })

  return (
    <div className="my-4">
      <div className="mt-2 space-y-2">{expandedChildren}</div>
    </div>
  )
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
  allChecked,
  setValue,
  getValues,
}: {
  disabled: boolean
  color: string
  value: string
  register: () => React.LegacyRef<HTMLInputElement> | undefined
  name: string
  precision: string
  placeholder: string
  error: string
  hidden: boolean
  info: string
  allChecked: string[]
  setValue: (name: string, value: string[]) => void
  getValues: (name: string) => string[]
}): JSX.Element => {
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
              onChange={() => {
                const values = getValues(name)?.length ? getValues(name) : []

                if (!values?.includes(value)) setValue(name, [...values, value])
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export const Counter = ({
  value = 0,
  onChange,
}: {
  value: number
  onChange: (number) => void
}): JSX.Element => {
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
        tabIndex={0}
        onKeyPress={(e) => keyPress(e, substract)}
      />
      <span className="w-12">{value}</span>
      <AddIcon
        onClick={add}
        className="w-8 h-8 p-1 ml-2 bg-blue-100 rounded-full"
        tabIndex={0}
        onKeyPress={(e) => keyPress(e, add)}
      />
    </div>
  )
}

export default Counter

export const RadioInput = ({
  name,
  value,
  register,
  defaultChecked = false,
  error,
}: {
  name: string
  value: string
  register: () => void
  defaultChecked: boolean
  error: string
}): JSX.Element => {
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

export const InputError = ({
  error,
}: {
  error: string
}): JSX.Element | null => {
  return error ? (
    <div role="alert" className="text-red-500">
      <span role="img" aria-label="Warning">
        ⚠️
      </span>{" "}
      {error}
    </div>
  ) : null
}
