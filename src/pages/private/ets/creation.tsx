import React from "react"
import { useRouter } from "next/router"
import { ArrowLeftIcon } from "@heroicons/react/solid"

import { createEts } from "@/clients/ets"
import PrivateLayout from "@/components/PrivateLayout"
import EtsForm from "@/components/EtsForm"
import { PrimaryButton, OutlineButton } from "@/components/lib"
import Alert, { AlertMessageType } from "@/components/Alert"
import ButtonAnchor from "@/components/Anchor"

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

  return (
    <PrivateLayout
      title="Création d'un établissement"
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

      <EtsForm onSubmit={onCreateEts}>
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
