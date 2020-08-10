import React from "react"

import Marianne from "@/components/svg/marianne"

const Footer = () => {
  return (
    <footer className="py-4 mt-16 text-gray-700 bg-gray-200 body-font">
      <div className="container flex flex-wrap items-center justify-between py-4 mx-auto">
        <div className="w-1/3">
          <div>
            <a>
              <Marianne className="w-24" />
            </a>
          </div>
          <div className="my-2 text-xl">
            Observatoire national des violences en santé.
          </div>
        </div>
        <div>Qui somme-nous ?</div>
        <div>Mentions légales</div>
        <div>FAQ</div>
        <div>Contactez-nous</div>
      </div>
    </footer>
  )
}

export default Footer
