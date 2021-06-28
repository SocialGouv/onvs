import React from "react"
import { useRouter } from "next/router"
import { ArrowLeftIcon } from "@heroicons/react/solid"

import PrivateLayout from "@/components/PrivateLayout"
import UserForm, { buildRoleAndScopeFromUserForm } from "@/components/UserForm"
import { PrimaryButton, OutlineButton } from "@/components/lib"
import { createUser } from "@/clients/users"
import Alert, { AlertMessageType } from "@/components/Alert"
import ButtonAnchor from "@/components/Anchor"

const UserPage = (): JSX.Element => {
  const router = useRouter()
  const [message, setMessage] = React.useState<AlertMessageType>()
  const [isLoading, setLoading] = React.useState(false)

  async function onCreateUser(user) {
    setMessage(undefined)

    const { role, scope } = buildRoleAndScopeFromUserForm(user)

    user = { ...user, role, scope }

    try {
      setLoading(true)
      await createUser({ user })
      setMessage({ text: "Utilisateur créé.", kind: "success" })
    } catch (error) {
      console.error("error.message", error.message)
      setMessage({ text: "Problème lors de la création.", kind: "error" })
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

      <UserForm onSubmit={onCreateUser}>
        <div className="flex justify-end">
          <OutlineButton onClick={() => router.push("/private/users")}>
            Annuler
          </OutlineButton>
          <span className="w-4" />

          <PrimaryButton type="submit" disabled={isLoading}>
            Ajouter
          </PrimaryButton>
        </div>
      </UserForm>
    </PrivateLayout>
  )
}

export default UserPage
