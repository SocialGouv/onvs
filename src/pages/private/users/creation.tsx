import React from "react"
import { useRouter } from "next/router"
import { ArrowLeftIcon } from "@heroicons/react/solid"

import PrivateLayout from "@/components/PrivateLayout"
import { buildRoleAndScopeFromUserForm } from "@/components/UserForm"
import { createUser } from "@/clients/users"
import Alert, { AlertMessageType } from "@/components/Alert"
import ButtonAnchor from "@/components/Anchor"
import { UserModel, UserCreateInput } from "@/models/users"
import { UserFormCreation } from "@/components/UserFormCreation"
import { UserFormType } from "@/components/UserForm"

const UserPage = (): JSX.Element => {
  const router = useRouter()
  const [message, setMessage] = React.useState<AlertMessageType>()
  const [isLoading, setLoading] = React.useState(false)
  const [createdUser, setCreatedUser] = React.useState<UserModel>()

  async function onCreateUser(user: UserFormType) {
    setMessage(undefined)

    const { role, scope } = buildRoleAndScopeFromUserForm(user)

    const newUser: UserCreateInput = {
      ...user,
      role,
      scope,
    }

    try {
      setLoading(true)
      const res = await createUser({ user: newUser })
      setCreatedUser(res?.user)
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
      title="Nouvel utilisateur"
      leftComponent={
        <ButtonAnchor
          LeftIconComponent={ArrowLeftIcon}
          onClick={() => router.back()}
        >
          Retour
        </ButtonAnchor>
      }
    >
      <Alert
        message={message}
        success={
          <Alert.Success message={message}>
            <Alert.Button
              label="Modifier"
              fn={() =>
                router.replace(`/private/users/${createdUser?.id}/edition`)
              }
            />
          </Alert.Success>
        }
      ></Alert>

      <UserFormCreation
        onCreateUser={onCreateUser}
        isLoading={isLoading || Boolean(createdUser)}
      />
    </PrivateLayout>
  )
}

export default UserPage
