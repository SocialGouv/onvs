import React from "react"
import { useToasts } from "react-toast-notifications"

import { isEmpty } from "@/utils/misc"

import { toastConfig } from "../config"

// Display, as a toast, yup error messages
export const useEffectToast = (errors) => {
  const { addToast } = useToasts()

  React.useEffect(() => {
    if (!isEmpty(errors)) {
      addToast(
        <div>
          Vous devez renseigner les informations de cette page. <br />
          {Object.keys(errors)?.map((err, index) => (
            <ul key={index} className="ml-5">
              <li className="list-disc">{errors[err].message}</li>
            </ul>
          ))}
        </div>,
        toastConfig.error,
      )
    }
  }, [errors, addToast])
}
