import React from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ArrowLeftIcon } from "@heroicons/react/solid"

import prisma from "@/prisma/db"
import { deleteUser, updateUser } from "@/clients/users"
import { UserModel } from "@/models/users"
import PrivateLayout from "@/components/PrivateLayout"
import Modal from "@/components/Modal"
import UserForm from "@/components/UserForm"
import { PrimaryButton, OutlineButton } from "@/components/lib"
import Alert, { AlertMessageType } from "@/components/Alert"
import ButtonAnchor from "@/components/Anchor"

const UserPage = ({ user }: { user: UserModel }): JSX.Element => {
  const router = useRouter()
  const [openModal, setOpenModal] = React.useState(false)
  const [message, setMessage] = React.useState<AlertMessageType>()
  const [isLoading, setLoading] = React.useState(false)

  async function onDeleteUser() {
    setMessage(undefined)

    try {
      setLoading(true)

      await deleteUser(user?.id)
      setMessage({
        text: "L'utilisateur a bien été supprimé.",
        kind: "success",
      })

      router.push(`/private/users/`)
    } catch (error) {
      console.error(error)
      setMessage({
        text: "Problème lors de la suppression de l'utilisateur.",
        kind: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  async function onUpdateUser(values) {
    setLoading(true)

    const updatedUser = { ...values, id: user?.id, role: values.role?.value }

    try {
      setLoading(true)

      await updateUser({ user: updatedUser })

      setMessage({
        text: "Les modifications ont bien été enregistrées.",
        kind: "success",
      })
    } catch (error) {
      console.error(error)
      setMessage({
        text: "Problème lors de la modification de l'utilisateur.",
        kind: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PrivateLayout
      title="Utilisateurs"
      leftComponent={
        <ButtonAnchor
          LeftIconComponent={ArrowLeftIcon}
          onClick={() => router.back()}
        >
          Retour
        </ButtonAnchor>
      }
    >
      <Alert message={message}></Alert>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="✋ Voulez-vous vraiment supprimer cet utilisateur?"
        text="Attention : cette opération est irréversible."
        labelPrimaryButton="Supprimer"
        fnPrimary={onDeleteUser}
      />

      <UserForm user={user} onSubmit={onUpdateUser}>
        <div className="flex justify-end">
          <OutlineButton onClick={() => router.push("/private/users")}>
            Annuler
          </OutlineButton>
          <span className="w-4" />

          <PrimaryButton type="submit" disabled={isLoading}>
            Modifier
          </PrimaryButton>
        </div>
        <div>
          <div className="p-8 mt-16 text-center border border-yellow-600 rounded">
            <h2 className="text-yellow-600">Zone dangereuse</h2>
            <div className="flex justify-between mt-4">
              <div>Je réinitialise le mot de passe de cet utilisateur</div>
              <PrimaryButton
                variant="yellow"
                onClick={() =>
                  router.push(`/private/users/${user?.id}/password`)
                }
              >
                Réinitialiser
              </PrimaryButton>
            </div>
            <div className="flex justify-between mt-4">
              <div>Je veux supprimer cet utilisateur</div>
              <OutlineButton variant="red" onClick={() => setOpenModal(true)}>
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
  const { userId } = params as {
    userId?: string
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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
