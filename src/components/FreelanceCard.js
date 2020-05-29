import React from "react"
import DoctorsIcon from "./svg/doctors"
import { PrimaryButtton, Title1, Title2 } from "../components/lib"

const FreelanceCard = () => {
  return (
    <div className="w-full max-w-md px-4 py-2 text-gray-700 transition duration-500 ease-in transform bg-gray-200 border rounded shadow hover:scale-105 hover:border-gray-400">
      <Title1>Vous exercez en libéral?</Title1>
      <Title2>
        Vous n’avez pas besoin de compte pour remonter un incident de violence.
      </Title2>
      <DoctorsIcon className="mx-auto mt-5" />
      <Title2>
        Votre déclaration pourra être réalisée de manière anonyme.
      </Title2>
      <div className="text-center">
        <PrimaryButtton type="submit">Déclarer</PrimaryButtton>
      </div>
    </div>
  )
}

export default FreelanceCard
