import React from "react"
import Link from "next/link"
import Hospital from "./svg/hospital.js"

const AuthentCard = () => {
  return (
    <div className="max-w-md w-1/2 text-gray-700 text-center bg-gray-200 px-4 py-2 m-2 rounded shadow">
      <Hospital className="mx-auto h-12 w-auto" alt="hôpital" />
      <h1 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Établissements, ordres, fédérations
      </h1>
      <h2 className="mt-3 text-center text-sm leading-5 text-gray-600">
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
            className="appearance-none rounded-none relative block w-full px-3 py-2 mt-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
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
            className="appearance-none rounded-none relative block w-full mt-1 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
            placeholder="Mot de passe"
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm leading-5 text-gray-900"
            >
              Se souvenir de moi
            </label>
          </div>

          <div className="text-sm leading-5">
            <Link href="#">
              <a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                Mot de passe oublié?
              </a>
            </Link>
          </div>
        </div>
        <button type="submit" className="btn-blue mt-4">
          Se connecter
        </button>
      </form>

      <h2 className="mt-2 text-center text-sm leading-5 text-gray-600">
        {"Vous n'avez pas encore de compte?"}
      </h2>
      <button className="my-4 border border-gray-500 font-bold py-2 px-4 rounded">
        Créer un compte
      </button>
    </div>
  )
}

export default AuthentCard
