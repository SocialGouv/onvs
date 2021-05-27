import React from "react"

import PrivateLayout from "@/components/PrivateLayout"

import UserForm from "@/components/UserForm"
import { useRouter } from "next/router"

import { PrimaryButton, OutlineButton } from "@/components/lib"
import { createUser } from "@/clients/users"

import { toastConfig } from "../../../config"
import { useToasts } from "react-toast-notifications"
import { throttle } from "lodash"
import { logDebug } from "@/utils/logger"

type StatusType = "idle" | "pending" | "complete" | "failed"

const initialState: { status: StatusType; message?: string } = {
  status: "idle",
}

type ActionType =
  | { type: "reset" }
  | { type: "run" }
  | { type: "set_success" }
  | { type: "set_error"; message: string }

function reducer(
  state: typeof initialState,
  action: ActionType,
): typeof initialState {
  switch (action.type) {
    case "reset":
      return { status: "idle" }
    case "run":
      return { status: "pending" }
    case "set_success":
      return { status: "complete" }
    case "set_error":
      return { status: "failed", message: action.message }
  }
}

const UserPage = () => {
  const router = useRouter()
  const [{ status }, dispatch] = React.useReducer(reducer, initialState)
  const { addToast } = useToasts()

  async function addUser(user) {
    dispatch({ type: "reset" })

    user = { ...user, role: user.role?.value }

    try {
      dispatch({ type: "run" })
      const data = await createUser({ user })
      dispatch({ type: "set_success" })
      if (data?.user?.id) {
        router.push(`/private/users/${data?.user?.id}/edition`)
      } else {
        console.error(
          "Il y a un problème avec la création de cet utilisateur",
          data,
        )
        throw new Error(
          "Il y a un problème avec la création de cet utilisateur",
        )
      }
    } catch (error) {
      addToast(
        <div className="text-lg">
          {error?.message}{" "}
          <span role="img" aria-hidden="true">
            😕👇
          </span>
        </div>,
        toastConfig.error,
      )
      dispatch({ type: "set_error", message: error.message })

      console.error("error.message", error.message)
    }
  }

  logDebug("status", status)

  // TODO: Why there is 2 possible calls between the throttle's timeout ?
  const newAddUser = React.useCallback(throttle(addUser, 2000), [])

  return (
    <PrivateLayout title="Utilisateurs">
      <UserForm onSubmit={newAddUser}>
        <OutlineButton onClick={() => router.push("/private/users")}>
          Annuler
        </OutlineButton>
        <span className="w-4" />

        <PrimaryButton type="submit" disabled={status === "pending"}>
          Ajouter
        </PrimaryButton>
      </UserForm>
    </PrivateLayout>
  )
}

export default UserPage
