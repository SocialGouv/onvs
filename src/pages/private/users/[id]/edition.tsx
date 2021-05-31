import React from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { Options, useToasts } from "react-toast-notifications"
import { throttle } from "lodash"

import PrivateLayout from "@/components/PrivateLayout"
import Modal from "@/components/Modal"
import { deleteUser, updateUser } from "@/clients/users"

import { PrismaClient, User } from "@prisma/client"
import UserForm from "@/components/UserForm"
import { toastConfig } from "@/config"
import { PrimaryButton, OutlineButton } from "@/components/lib"
import Alert from "@/components/Alert"

const prisma = new PrismaClient()

type Props = {
  user: User
}

type StatusType = "idle" | "pending" | "complete" | "failed"

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
      return { status: "complete", message: action.message }
    case "set_error":
      return { status: "failed", message: action.message }
  }
}

const UserPage = ({ user }: Props) => {
  const router = useRouter()
  const [openModal, setOpenModal] = React.useState(false)

  const [{ status, message }, dispatch] = React.useReducer(
    reducer,
    initialState,
  )
  const { addToast } = useToasts()

  async function onDeleteUser() {
    dispatch({ type: "init" })

    try {
      dispatch({ type: "run" })

      await deleteUser(user?.id)
      dispatch({
        type: "set_success",
        message: "L'utilisateur a bien été supprimé.",
      })
      router.push(`/private/users/`)
    } catch (error) {
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

      console.error("error.message", error.message)
    }
  }

  async function onUpdateUser(values) {
    dispatch({ type: "init" })

    const updatedUser = { ...values, id: user?.id, role: values.role?.value }

    try {
      dispatch({ type: "run" })

      const data = await updateUser({ user: updatedUser })

      if (!data?.user?.id) {
        console.error(
          "Il y a un problème avec la création de cet utilisateur",
          data,
        )
        throw new Error(
          "Il y a un problème avec la création de cet utilisateur",
        )
      }
      dispatch({
        type: "set_success",
        message: "Les modifications ont bien été enregistrées.",
      })
    } catch (error) {
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

      console.error("error.message", error.message)
    }
  }

  // TODO: Why there is 2 possible calls between the throttle's timeout ?
  const newUpdateUser = React.useCallback(throttle(onUpdateUser, 2000), [])

  return (
    <PrivateLayout title="Utilisateurs">
      {status === "complete" && message && (
        <Alert title={message}>
          <Alert.Button
            label="Retour à la liste"
            fn={() => router.push("/private/users")}
          />
        </Alert>
      )}

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="✋ Voulez-vous vraiment supprimer cet utilisateur?"
        text="Attention : cette opération est irréversible."
        labelPrimaryButton="Supprimer"
        fnPrimary={onDeleteUser}
      />

      <UserForm user={user} onSubmit={newUpdateUser}>
        <div className="flex justify-end">
          <OutlineButton onClick={() => router.push("/private/users")}>
            Annuler
          </OutlineButton>
          <span className="w-4" />

          <PrimaryButton type="submit">Modifier</PrimaryButton>
        </div>
        <div>
          <div className="p-8 mt-16 text-center border border-red-500 rounded">
            <h2 className="text-red-600">Zone dangereuse</h2>
            <div className="flex justify-between mt-4">
              <div>Je veux supprimer cet utilisateur</div>
              <OutlineButton color="red" onClick={() => setOpenModal(true)}>
                Supprimer
              </OutlineButton>
            </div>
          </div>
        </div>
      </UserForm>
    </PrivateLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as {
    id?: string
  }

  // TODO: faut-il ne pas rendre le user si deletedAt est non null ?

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      deletedAt: true,
    },
  })

  return {
    props: { user },
  }
}

export default UserPage
