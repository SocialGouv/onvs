import React from "react"
import Link from "next/link"
import Hospital from "./svg/hospital.js"
import {
  PrimaryButtton,
  OutlineButton,
  Title1,
  Title2,
  Input,
  Checkbox,
} from "../components/lib"

const AuthentCard = () => {
  return (
    <div className="w-full max-w-md px-4 py-2 text-gray-700 transition duration-500 ease-in transform bg-gray-200 border rounded shadow hover:scale-105 hover:border-gray-400">
      <Hospital className="w-auto h-12 mx-auto" alt="hôpital" />
      <Title1>Établissement, ordre, fédération</Title1>
      <Title2>Connectez-vous à votre compte</Title2>
      <form className="mt-5" action="#">
        <label htmlFor="email">Adresse courriel</label>
        <div>
          <Input
            ariaLabel="Email address"
            name="email"
            type="email"
            required
            placeholder="jeanne.lebrun@yahoo.fr"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="password2">Mot de passe</label>
          <Input
            aria-label="Password"
            name="password"
            type="password"
            required
            placeholder="Mot de passe"
          />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <Checkbox id="rememberMe" />
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
          <PrimaryButtton type="submit">Se connecter</PrimaryButtton>
        </div>
      </form>
      <Title2>{"Vous n'avez pas encore de compte?"}</Title2>
      <div className="text-center">
        <OutlineButton>Créer un compte</OutlineButton>
      </div>
    </div>
  )
}

export default AuthentCard
