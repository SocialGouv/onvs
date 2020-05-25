import React from "react"
import DoctorsIcon from "./svg/doctors"

const FreelanceCard = () => {
  return (
    <div className="w-full max-w-md px-4 py-2 text-gray-700 transition duration-500 ease-in transform bg-gray-200 border rounded shadow hover:scale-105 hover:border-gray-400">
      <h1 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
        Vous exercez en libéral?
      </h1>
      <h2 className="mt-2 text-sm leading-5 text-center text-gray-600">
        Vous n’avez pas besoin de compte pour remonter un incident de violence.
      </h2>
      <DoctorsIcon className="mx-auto mt-5" />
      <div className="mt-4 text-sm leading-5 text-center text-gray-600">
        Votre déclaration pourra être réalisée de manière anonyme.
      </div>
      <div className="text-center">
        <button className="my-4 btn-blue">Déclarer</button>
      </div>
    </div>
  )
}

export default FreelanceCard
