import React from "react"
import DoctorsIcon from "./svg/doctors"

const FreelanceCard = () => {
  return (
    <div className="w-1/2 flex-grow text-gray-700 text-center bg-gray-200 px-4 py-2 m-2">
      <h1 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Vous êtes un libéral?
      </h1>
      <h2 className="mt-2 text-center text-sm leading-5 text-gray-600">
        Vous n’avez pas besoin de compte pour remonter un incident de violence.
      </h2>
      <DoctorsIcon className="mt-5 mx-auto" />
      <div className="mt-4 text-center text-sm leading-5 text-gray-600">
        Votre déclaration pourra être réalisée de manière anonyme.
      </div>
      <button className="btn-blue my-4">Déclarer</button>
    </div>
  )
}

export default FreelanceCard
