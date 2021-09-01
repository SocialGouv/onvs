import React from "react"
import { useRouter } from "next/router"
import { useStateMachine } from "little-state-machine"

import { PrimaryButton, Title1 } from "@/components/lib"
import PrivateLayout from "@/components/PrivateLayout"
import {
  formReducer,
  initEtsForm,
  reset,
} from "@/components/wizard/formReducer"
import { firstStepUrl } from "@/components/wizard/stepFlows"
import useUser from "@/hooks/useUser"
import fetcher from "@/utils/fetcher"
import useSWR from "swr"
import { EtsModel } from "@/models/ets"

function HomePage(): JSX.Element {
  const router = useRouter()
  const { user } = useUser()

  const { action } = useStateMachine(formReducer)

  const { data: ets } = useSWR<{ data: EtsModel }>(
    user?.scope?.ets ? `/api/ets/${user.scope.ets}` : null,
    fetcher,
  )

  function reinit() {
    console.log("dans reinit", ets?.data?.finesset)
    reset({ action })
    initEtsForm({ action, finesset: ets?.data?.finesset || "" })

    router.push(firstStepUrl("ets"))
  }

  if (["Administrateur", "Gestionnaire d'ordre"].includes(user?.role)) {
    router.replace("/private/declarations")
    return <>Chargement...</>
  }

  return (
    <PrivateLayout title="Tableau de bord">
      {user?.role === "Gestionnaire établissement" && (
        <div className="w-8/12 p-8 py-4 mx-auto text-center border border-gray-300 rounded-lg shadow-md min-h-64">
          <Title1 className="mb-8 text-center">Formulaire</Title1>

          <p>Remplissez le questionnaire directement. </p>

          <p className="mb-8">Temps estimé : 4 minutes.</p>

          <PrimaryButton onClick={reinit}>Déclarer</PrimaryButton>
        </div>
      )}
      <div className="w-8/12 p-8 py-4 mx-auto text-center border border-gray-300 rounded-lg shadow-md min-h-64">
        <Title1 className="mb-8 text-center">Liste des déclarations</Title1>

        <PrimaryButton onClick={() => router.push("/private/declarations")}>
          Voir
        </PrimaryButton>
      </div>
    </PrivateLayout>
  )
}

export default HomePage
