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
  children,
}: {
  title: string
  children?: React.ReactElement
}) {
  return (
    <div className="p-4 rounded-md bg-green-50">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="w-5 h-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="items-center flex-1 ml-3 md:flex md:justify-between">
          <p className="text-sm text-green-700">{title} </p>
          {children}
        </div>
      </div>
    </div>
  )
}

Alert.Button = AlertButton
