import React from "react"
import { FieldError } from "react-hook-form"

export const Form = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => (
  <>
    <div className="container px-16 mx-auto ">{children}</div>
  </>
)

export const AlertInput = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element | null =>
  children ? (
    <span role="alert" className="text-sm" style={{ color: "tomato" }}>
      {children}
    </span>
  ) : null

export const Label = ({
  htmlFor,
  children,
}: {
  htmlFor?: string
  children?: React.ReactNode
}): JSX.Element => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  )
}

export const MandatoryFieldFlag = (): JSX.Element => (
  <span className="text-md text-red-500">*</span>
)

export const InputText = ({
  type = "text",
  label,
  name,
  register,
  errors,
  requiredFlag = false,
  placeholder,
  onChange,
}: {
  type?: string
  label: string
  name: string
  register: () => void
  errors: Record<string, unknown>
  requiredFlag?: boolean
  placeholder?: string
  onChange?: () => void
}): JSX.Element => (
  <>
    <Label>
      {label}&nbsp;
      {requiredFlag ? <MandatoryFieldFlag /> : ""}
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ref={register}
          placeholder={placeholder}
          autoComplete="off"
          aria-invalid={Boolean(errors[name])}
          onChange={onChange}
        />
        <AlertInput>{(errors[name] as FieldError)?.message}</AlertInput>
      </div>
    </Label>
  </>
)

export const InputSearch = ({
  id,
  name,
  placeholder,
  onChange,
  value,
}: {
  id: string
  name?: string
  placeholder?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string
}): JSX.Element => (
  <input
    type="search"
    name={name || id}
    id={id}
    className="block w-full mb-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    placeholder={placeholder || "Recherche..."}
    autoComplete="off"
    onChange={onChange}
    value={value}
  />
)
