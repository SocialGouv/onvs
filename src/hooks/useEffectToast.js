import React from "react"
import { useToasts } from "react-toast-notifications"

import { isEmpty } from "@/utils/misc"

import { toastConfig } from "../config"

/**
 * Display error as a toast
 *
 * @param {*} error error in the form of an object
 */
export const useEffectToast = (error) => {
  const { addToast } = useToasts()

  if (error && Object.keys(error).length) {
    console.error("Erreur", error)
  }

  const message = React.useMemo(
    () =>
      error?.message ? (
        <>
          {error.message}{" "}
          {error.emoji && (
            <span role="img" aria-hidden="true">
              {error.emoji}
            </span>
          )}
        </>
      ) : (
        <>
          Oups ! Des erreurs se sont glissées dans la page...{" "}
          <span role="img" aria-hidden="true">
            😕👇
          </span>
        </>
      ),
    [error],
  )

  React.useEffect(() => {
    if (!isEmpty(error)) {
      addToast(
        <div className="text-lg" data-testid="toast-message">
          {message}
          <br />
          <ul className="ml-5">
            {Object.keys(error)?.map((key, index) => {
              return (
                error[key].message && (
                  <li key={index} className="list-disc">
                    {error[key].message}
                  </li>
                )
              )
            })}
          </ul>
        </div>,
        toastConfig.error,
      )
    }
  }, [error, addToast, message])
}
