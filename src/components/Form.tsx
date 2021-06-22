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

export const InputText = ({
  label,
  name,
  register,
  errors,
  requiredFlag = false,
  placeholder,
}: {
  label: string
  name: string
  register: () => void
  errors: Record<string, unknown>
  requiredFlag?: boolean
  placeholder?: string
}): JSX.Element => (
  <>
    <label className="block text-sm font-medium text-gray-700">
      {label}&nbsp;
      {requiredFlag ? <span className="text-md text-red-500">*</span> : ""}
      <div className="mt-1">
        <input
          type="text"
          name={name}
          id={name}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ref={register}
          placeholder={placeholder}
          autoComplete="off"
          aria-invalid={Boolean(errors[name])}
        />
        <AlertInput>{(errors[name] as FieldError)?.message}</AlertInput>
      </div>
    </label>
  </>
)
