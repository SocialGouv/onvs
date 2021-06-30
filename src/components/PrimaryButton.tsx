import React, { ButtonHTMLAttributes } from "react"
import { classNames } from "@/utils/classnames"

type Variant = "blue" | "red" | "yellow"

type Props = {
  children: React.ReactNode
  onClick?: () => void
  variant?: Variant
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  disabled?: boolean
  tabIndex?: number
}

const VARIANT_MAPS: Record<Variant, string> = {
  red: "text-white bg-red-500",
  yellow: "text-white bg-yellow-500",
  blue: "text-white bg-blue-500",
}

const VARIANT_MAPS_DISABLED: Record<Variant, string> = {
  red: "text-white bg-red-300",
  yellow: "text-white bg-yellow-300",
  blue: "text-white bg-blue-300",
}

const PrimaryButton = ({
  children,
  onClick,
  type = "submit",
  tabIndex = 0,
  disabled = false,
  variant = "blue",
}: Props): JSX.Element => {
  const props = onClick ? { onClick } : {}

  return (
    <button
      type={type}
      className={classNames(
        "px-6 py-2 font-bold uppercase text-sm tracking-wider font-source text-white rounded",
        disabled ? VARIANT_MAPS_DISABLED[variant] : VARIANT_MAPS[variant],
      )}
      tabIndex={tabIndex}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
