import React from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { ArrowLeftIcon } from "@heroicons/react/solid"

import prisma from "@/prisma/db"
import PrivateLayout from "@/components/PrivateLayout"
import Modal from "@/components/Modal"
import EtsForm from "@/components/EtsForm"
import { PrimaryButton, OutlineButton } from "@/components/lib"
import Alert, { AlertMessageType } from "@/components/Alert"
import ButtonAnchor from "@/components/Anchor"
import { deleteEts, updateEts } from "@/clients/ets"
import { EtsModel } from "@/models/ets"

const EtsEditionPage = ({ ets }: { ets: EtsModel }): JSX.Element => {
  const router = useRouter()
  const [openModal, setOpenModal] = React.useState(false)
  const [message, setMessage] = React.useState<AlertMessageType>()
  const [isLoading, setLoading] = React.useState(false)

  async function onDeleteEts() {
    setMessage(undefined)

    try {
      setLoading(true)

      await deleteEts(ets?.id)
      setMessage({
        text: "L'ETS a bien été supprimé.",
        kind: "success",
      })

      router.push(`/private/ets/`)
    } catch (error) {
      console.error(error)
      setMessage({
        text: "Problème lors de la suppression de l'ETS.",
        kind: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  async function onUpdateEts(values) {
    setLoading(true)

    const updatedEts: EtsModel = {
      ...values,
      id: ets?.id,
      juridicStatus: values.juridicStatus?.value,
    }

    try {
      setLoading(true)

      await updateEts({ ets: updatedEts })

      setMessage({
        text: "Les modifications ont bien été enregistrées.",
        kind: "success",
      })
    } catch (error) {
      console.error(error)
      setMessage({
        text: "Problème lors de la modification de l'ETS.",
        kind: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PrivateLayout
      title="Établissement"
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
        title="✋ Voulez-vous vraiment supprimer cet ETS?"
        text="Attention : cette opération est irréversible."
        labelPrimaryButton="Supprimer"
        fnPrimary={onDeleteEts}
      />

      <EtsForm ets={ets} onSubmit={onUpdateEts}>
        <div className="flex justify-end">
          <OutlineButton onClick={() => router.back()}>Annuler</OutlineButton>
          <span className="w-4" />

          <PrimaryButton type="submit" disabled={isLoading}>
            Modifier
          </PrimaryButton>
        </div>
        <div>
          <div className="p-8 mt-16 text-center border border-yellow-600 rounded">
            <h2 className="text-yellow-600">Zone dangereuse</h2>
            <div className="flex justify-between mt-4">
              <div>Je veux supprimer cet ETS</div>
              <OutlineButton variant="red" onClick={() => setOpenModal(true)}>
                Supprimer
              </OutlineButton>
            </div>
          </div>
        </div>
      </EtsForm>
    </PrivateLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { etsId } = params as {
    etsId?: string
  }

  const ets = await prisma.ets.findUnique({
    where: {
      id: etsId,
    },
  })

  return {
    props: { ets },
  }
}

export default EtsEditionPage
