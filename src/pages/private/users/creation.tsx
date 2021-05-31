import React from "react"
import { useRouter } from "next/router"
import { Options, useToasts } from "react-toast-notifications"
import { throttle } from "lodash"

import PrivateLayout from "@/components/PrivateLayout"

import UserForm from "@/components/UserForm"

import { PrimaryButton, OutlineButton } from "@/components/lib"
import { createUser } from "@/clients/users"

import { toastConfig } from "../../../config"
import { logDebug } from "@/utils/logger"
import Alert from "@/components/Alert"

type StatusType = "idle" | "pending" | "created" | "failed"

const initialState: { status: StatusType; message?: string } = {
  status: "idle",
}

type ActionType =
  | { type: "init" }
  | { type: "run" }
  | { type: "set_success"; message: string }
  | { type: "set_error"; message: string }

function reducer(
  state: typeof initialState,
  action: ActionType,
): typeof initialState {
  switch (action.type) {
    case "init":
      return { status: "idle" }
    case "run":
      return { status: "pending" }
    case "set_success":
      return { status: "created", message: action.message }
    case "set_error":
      return { status: "failed", message: action.message }
  }
}

const UserPage = () => {
  const router = useRouter()
  const [{ status, message }, dispatch] = React.useReducer(
    reducer,
    initialState,
  )
  const { addToast } = useToasts()

  async function addUser(user) {
    dispatch({ type: "init" })

    user = { ...user, role: user.role?.value }

    try {
      dispatch({ type: "run" })
      const data = await createUser({ user })
      dispatch({ type: "set_success", message: "Utilisateur créé." })
      if (!data?.user?.id) {
        const message = "Il y a un problème avec la création de cet utilisateur"
        console.error(message, data)
        throw new Error(message)
      }
    } catch (error) {
      console.error("error.message", error.message)
      addToast(
        <div className="text-lg">
          {error?.message}{" "}
          <span role="img" aria-hidden="true">
            😕👇
          </span>
        </div>,
        toastConfig.error as Options,
      )
      dispatch({ type: "set_error", message: error.message })
    }
  }

  logDebug("status", status)

  // TODO: Why there is 2 possible calls between the throttle's timeout ?
  const newAddUser = React.useCallback(throttle(addUser, 2000), [])

  return (
    <PrivateLayout title="Utilisateurs">
      {status === "created" && (
        <Alert title={message || ""}>
          <Alert.Button
            label="Retour à la liste"
            fn={() => router.push("/private/users")}
          />
        </Alert>
      )}

      <UserForm onSubmit={newAddUser}>
        <div className="flex justify-end">
          <OutlineButton onClick={() => router.push("/private/users")}>
            Annuler
          </OutlineButton>
          <span className="w-4" />

          <PrimaryButton
            type="submit"
            disabled={status === "pending" || status === "created"}
          >
            Ajouter
          </PrimaryButton>
        </div>
      </UserForm>
    </PrivateLayout>
  )
}

export default UserPage
