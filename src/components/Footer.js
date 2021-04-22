import Link from "next/link"
import React from "react"

import Marianne from "@/components/svg/marianne"

const Footer = () => {
  return (
    <footer className="px-4 py-4 mt-16 text-gray-700 bg-gray-200 body-font">
      <div className="container flex flex-col py-4 mx-auto sm:items-start sm:justify-between sm:flex-row">
        <div className="">
          <div>
            <a>
              <Marianne className="w-24" />
            </a>
          </div>
          <div className="my-2 text-lg font-light text-black font-source ">
            {"Direction générale de l'offre de soins"}
          </div>
        </div>

        <div className="flex flex-col mt-8 mr-8 space-x-0 sm:space-x-24 sm:flex-row">
          <div className="space-y-3 sm:ml-4">
            <div>
              <Link href="/apropos">
                <a className="font-evolventa">Qui sommes-nous&nbsp;?</a>
              </Link>
            </div>
            <div>
              <a
                className="font-evolventa"
                href="mailto:dgos-onvs@sante.gouv.fr"
              >
                Contactez&#8209;nous
              </a>
            </div>
          </div>

          <div className="mt-2 space-y-3 sm:mt-0 sm:ml-4">
            <div>
              <Link href="/mentions">
                <a className="font-evolventa">Mentions légales</a>
              </Link>
            </div>
            <div>
              <Link href="/politique-confidentialite">
                <a className="font-evolventa">Politique de confidentialité</a>
              </Link>
            </div>
            <div>
              <Link href="/cgu">
                <a className="font-evolventa">
                  {"Conditions générales d'utilisation"}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
