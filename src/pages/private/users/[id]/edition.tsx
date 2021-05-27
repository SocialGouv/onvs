import React from "react"

import PrivateLayout from "@/components/PrivateLayout"

import { GetServerSideProps } from "next"

import { deleteUser } from "@/clients/users"

// import { v4 as uuid } from "uuid"
import { PrismaClient, User } from "@prisma/client"
import UserForm from "@/components/UserForm"
import { useRouter } from "next/router"

import { toastConfig } from "@/config"
import { Options, useToasts } from "react-toast-notifications"

import { PrimaryButton, OutlineButton } from "@/components/lib"

const prisma = new PrismaClient()

type Props = {
  user: User
}

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

const UserPage = ({ user }: Props) => {
  const router = useRouter()

  const [{ status }, dispatch] = React.useReducer(reducer, initialState)
  const { addToast } = useToasts()

  async function onDeleteUser() {
    dispatch({ type: "reset" })

    console.log("Suppression de l'utilisateur " + user?.id)
    try {
      dispatch({ type: "run" })

      await deleteUser(user?.id)
      dispatch({ type: "set_success" })
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

  console.log("status", status)

  return (
    <PrivateLayout title="Utilisateurs">
      <UserForm user={user} onSubmit={(values) => console.log(values)}>
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
              <OutlineButton color="red" onClick={onDeleteUser}>
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
