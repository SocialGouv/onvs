import React from "react"
import DoctorsIcon from "./svg/doctors"
import { PrimaryButtton, TitleCard, SubTitleCard } from "../components/lib"
import { RoughNotation } from "../components/RoughNotation"
import { useRouter } from "next/router"

const FreelanceCard = () => {
  const router = useRouter()

  const goToStep1 = () => router.push("/forms/freelance/step1")

  const keyPress = (event, fn) => event.key === "Enter" && fn(event)

  return (
    <div
      className="w-full max-w-md px-4 py-2 text-gray-700 transition duration-500 ease-in transform bg-gray-200 border rounded shadow hover:scale-105 hover:border-gray-400"
      onClick={goToStep1}
      onKeyPress={(e) => keyPress(e, goToStep1)}
      role="button"
      tabIndex="0"
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
        Vous n’avez pas besoin de compte pour remonter un incident de violence.
      </SubTitleCard>
      <DoctorsIcon className="mx-auto mt-5" />
      <SubTitleCard className="mt-8">
        Votre déclaration pourra être réalisée de manière anonyme.
      </SubTitleCard>
      <div className="my-6 text-center">
        <PrimaryButtton type="submit">Déclarer</PrimaryButtton>
      </div>
    </div>
  )
}

export default FreelanceCard
