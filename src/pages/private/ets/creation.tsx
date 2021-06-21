import React from "react"
import { useRouter } from "next/router"
import { throttle } from "lodash"

import PrivateLayout from "@/components/PrivateLayout"
import { createEts } from "@/clients/ets"
import EtsForm from "@/components/EtsForm"
import { PrimaryButton, OutlineButton } from "@/components/lib"
import Alert, { AlertMessageType } from "@/components/Alert"

const EtsCreationPage = (): JSX.Element => {
  const router = useRouter()
  const [message, setMessage] = React.useState<AlertMessageType>()
  const [isLoading, setLoading] = React.useState(false)

  async function onCreateEts(ets) {
    setMessage(undefined)

    ets = { ...ets, juridicStatus: ets.juridicStatus?.value }

    try {
      setLoading(true)
      await createEts({ ets })
      setMessage({ text: "Établissement créé.", kind: "success" })
    } catch (error) {
      console.error("error.message", error.message)
      setMessage({ text: "Problème lors de la création.", kind: "error" })
    } finally {
      setLoading(false)
    }
  }

  // TODO: Why there is 2 possible calls between the throttle's timeout ?
  const throttledOnCreateEts = React.useCallback(
    throttle(onCreateEts, 2000),
    [],
  )

  return (
    <PrivateLayout title="Création d'un établissement">
      <Alert
        message={message}
        success={
          <Alert.Success message={message}>
            <Alert.Button
              label="Retour à la liste"
              fn={() => router.push("/private/ets")}
            />
          </Alert.Success>
        }
      ></Alert>

      <EtsForm onSubmit={throttledOnCreateEts}>
        <div className="flex justify-end">
          <OutlineButton onClick={() => router.push("/private/ets")}>
            Annuler
          </OutlineButton>
          <span className="w-4" />

          <PrimaryButton type="submit" disabled={isLoading}>
            Ajouter
          </PrimaryButton>
        </div>
      </EtsForm>
    </PrivateLayout>
  )
}

export default EtsCreationPage
