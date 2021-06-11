import React from "react"
import { useRouter } from "next/router"
import { throttle } from "lodash"

import PrivateLayout from "@/components/PrivateLayout"
import UserForm from "@/components/UserForm"
import { PrimaryButton, OutlineButton } from "@/components/lib"
import { createUser } from "@/clients/users"
import Alert, { AlertMessageType } from "@/components/Alert"

const UserPage = (): JSX.Element => {
  const router = useRouter()
  const [message, setMessage] = React.useState<AlertMessageType>()
  const [isLoading, setLoading] = React.useState(false)

  async function onCreateUser(user) {
    setMessage(undefined)

    user = { ...user, role: user.role?.value }

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

  // TODO: Why there is 2 possible calls between the throttle's timeout ?
  const throttledOnCreateUser = React.useCallback(
    throttle(onCreateUser, 2000),
    [],
  )

  return (
    <PrivateLayout title="Utilisateurs">
      <Alert message={message} />
      <Alert
        message={message}
        success={
          <Alert.Success message={message}>
            <Alert.Button
              label="Retour à la liste"
              fn={() => router.push("/private/users")}
            />
          </Alert.Success>
        }
      ></Alert>

      <UserForm onSubmit={throttledOnCreateUser}>
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
