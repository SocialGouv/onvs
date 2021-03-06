import { useRouter } from "next/router"
import React from "react"

import { PrimaryButton, SubTitleCard, TitleCard } from "@/components/lib"
import { RoughNotation } from "@/components/RoughNotation"
import DoctorsIcon from "@/components/svg/doctors"
import { startDeclarationUrl } from "@/components/wizard/stepFlows"
import { onEnterKeyPress } from "@/utils/events"

const FreelanceCard = (): JSX.Element => {
  const router = useRouter()

  const goToStep0 = () => router.push(startDeclarationUrl)

  return (
    <div
      className="w-full max-w-md px-4 py-2 text-gray-700 transition duration-500 ease-in transform bg-gray-100 border rounded shadow hover:scale-105 hover:border-gray-300"
      onClick={goToStep0}
      onKeyPress={onEnterKeyPress(goToStep0)}
      role="button"
      tabIndex={0}
    >
      <TitleCard>
        Vous exercez{" "}
        <RoughNotation
          type="highlight"
          color="lightgreen"
          show={false}
          animate={true}
        >
          en libéral ?
        </RoughNotation>
      </TitleCard>

      <SubTitleCard>
        Vous n’avez pas besoin de compte <br />
        pour remonter un signalement de violence.
      </SubTitleCard>
      <DoctorsIcon className="mx-auto mt-5" />
      <SubTitleCard className="mt-8">
        Votre déclaration pourra être effectuée de manière anonyme.
      </SubTitleCard>
      <div className="my-6 text-center">
        <PrimaryButton type="submit">Déclarer</PrimaryButton>
      </div>
    </div>
  )
}

export default FreelanceCard
