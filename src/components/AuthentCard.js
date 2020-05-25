import React from "react"
import Link from "next/link"
import Hospital from "./svg/hospital.js"

const AuthentCard = () => {
  return (
    <div className="w-full max-w-md px-4 py-2 text-gray-700 transition duration-500 ease-in transform bg-gray-200 border rounded shadow hover:scale-105 hover:border-gray-400">
      <Hospital className="w-auto h-12 mx-auto" alt="hôpital" />
      <h1 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
        Établissement, ordre, fédération
      </h1>
      <h2 className="mt-3 text-sm leading-5 text-center text-gray-600">
        Connectez-vous à votre compte
      </h2>
      <form className="mt-5" action="#">
        <label htmlFor="email">Adresse courriel</label>
        <div>
          <input
            aria-label="Email address"
            name="email"
            type="email"
            required
            className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="jeanne.lebrun@yahoo.fr"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="password2">Mot de passe</label>
          <input
            aria-label="Password"
            name="password"
            type="password"
            required
            className="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Mot de passe"
          />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
            />
            <label
              htmlFor="rememberMe"
              className="block ml-2 text-sm leading-5 text-gray-900"
            >
              Se souvenir de moi
            </label>
          </div>

          <div className="text-sm leading-5">
            <Link href="#">
              <a className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline">
                Mot de passe oublié?
              </a>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="mt-5 btn-blue">
            Se connecter
          </button>
        </div>
      </form>
      <h2 className="mt-10 text-sm leading-5 text-center text-gray-600">
        {"Vous n'avez pas encore de compte?"}
      </h2>
      <div className="text-center">
        <button className="px-4 py-2 my-4 font-bold border border-gray-500 rounded">
          Créer un compte
        </button>
      </div>
    </div>
  )
}

export default AuthentCard
