import Link from "next/link"
import React from "react"

import Marianne from "@/components/svg/marianne"

const Footer = () => {
  return (
    <footer className="px-4 py-4 mt-16 text-gray-700 bg-gray-200  body-font">
      <div className="container flex flex-col py-4 mx-auto sm:items-start sm:justify-between sm:flex-row">
        <div className="">
          <div>
            <a>
              <Marianne className="w-24" />
            </a>
          </div>
          <div className="my-2 text-xl">
            Observatoire national des violences en santé.
          </div>
        </div>

        <div className="space-y-2 sm:ml-4">
          <div>
            <Link href="/apropos">
              <a>Qui sommes-nous&nbsp;?</a>
            </Link>
          </div>
          <div>
            <a href="mailto:dgos-onvs@sante.gouv.fr">Contactez&#8209;nous</a>
          </div>
        </div>

        <div className="mt-2 space-y-2 sm:mt-0 sm:ml-4">
          <div>
            <Link href="/mentions">
              <a>Mentions légales</a>
            </Link>
          </div>
          <div>
            <Link href="/politique-confidentialite">
              <a>Politique de confidentialité</a>
            </Link>
          </div>
          <div>
            <Link href="/cgu">
              <a>{"Conditions générales d'utilisation"}</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
