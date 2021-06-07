import React from "react"
import { CheckCircleIcon } from "@heroicons/react/solid"

type buttonType = {
  label: string
  fn: () => any
}

export function AlertButton(button: buttonType) {
  return (
    <p key={button.label} className="mt-3 text-sm md:mt-0 md:ml-6">
      <button
        onClick={button.fn}
        className="p-2 text-green-700 border border-green-500 rounded font-sm whitespace-nowrap bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
      >
        {button.label}
        <span aria-hidden="true" className="ml-1">
          &rarr;
        </span>
      </button>
    </p>
  )
}

export default function Alert({
  title,
  kind = "success",
  children,
}: {
  title: string
  kind?: "success" | "error"
  children?: React.ReactElement
}) {
  let colors = {
    bg: "bg-green-50",
    icon: "text-green-400",
    text: "text-green-700",
  }

  if (kind === "error") {
    colors = {
      ...colors,
      bg: "bg-red-50",
      icon: "text-red-400",
      text: "text-red-700",
    }
  }

  return (
    <div className={`p-4 rounded-md ${colors["bg"]}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className={`w-5 h-5 ${colors["icon"]}`}
            aria-hidden="true"
          />
        </div>
        <div className="items-center flex-1 ml-3 md:flex md:justify-between">
          <p className={`text-sm ${colors["text"]}`}>{title} </p>
          {children}
        </div>
      </div>
    </div>
  )
}

Alert.Button = AlertButton
