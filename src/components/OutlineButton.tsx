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
  red: "text-red-500 border-red-500 hover:text-white hover:bg-red-400",
  yellow:
    "text-yellow-600 border-yellow-600 hover:text-white hover:bg-yellow-400",
  blue: "text-blue-600 border-blue-500 hover:text-white hover:bg-blue-500",
}

const OutlineButton = ({
  children,
  onClick,
  type = "button",
  tabIndex = 0,
  disabled = false,
  variant = "blue",
}: Props): JSX.Element => {
  const props = onClick ? { onClick } : {}

  return (
    <button
      type={type}
      className={classNames(
        "px-6 py-2 text-sm tracking-wider uppercase rounded font-source border ${colorStyle}",
        VARIANT_MAPS[variant],
      )}
      tabIndex={tabIndex}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default OutlineButton
