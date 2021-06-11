import React from "react"
import { CheckCircleIcon } from "@heroicons/react/solid"

type buttonType = {
  label: string
  fn: () => unknown
}

export function AlertButton(button: buttonType): JSX.Element {
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

export type AlertMessageType =
  | {
      text: string
      kind: "success" | "error"
    }
  | undefined

/**
 * Alert panel for error or success message kind.
 *
 * @param {message, success, error} - The message, the success and error overridable component.
 * @returns
 */
export default function Alert({
  message,
  success,
  error,
}: {
  message: AlertMessageType
  success?: JSX.Element
  error?: JSX.Element
}): JSX.Element | null {
  if (!message) return null

  if (message?.kind === "error")
    return error || <Alert.Error message={message} />
  else return success || <Alert.Success message={message} />
}

function AlertErrorItem({
  message,
  children,
}: {
  message: AlertMessageType
  children?: JSX.Element
}) {
  const colors = {
    bg: "bg-red-50",
    icon: "text-red-400",
    text: "text-red-700",
  }

  return (
    <AlertItem colors={colors} text={message?.text}>
      {children}
    </AlertItem>
  )
}

function AlertSuccessItem({
  message,
  children,
}: {
  message: AlertMessageType
  children?: JSX.Element
}) {
  const colors = {
    bg: "bg-green-50",
    icon: "text-green-400",
    text: "text-green-700",
  }

  return (
    <AlertItem colors={colors} text={message?.text}>
      {children}
    </AlertItem>
  )
}

function AlertItem({
  colors,
  text,
  children,
}: {
  colors: { bg: string; icon: string; text: string }
  text?: string
  children?: JSX.Element
}) {
  if (!text) return null
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
          <p className={`text-sm ${colors["text"]}`}>{text} </p>
          {children}
        </div>
      </div>
    </div>
  )
}

Alert.Error = AlertErrorItem
Alert.Success = AlertSuccessItem

Alert.Button = AlertButton
