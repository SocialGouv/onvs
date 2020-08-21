import Link from "next/link"
import React from "react"

import { Layout } from "@/components/Layout"
import { OutlineButton, PrimaryButtton, Title1 } from "@/components/lib"
import { Stepper } from "@/components/Stepper"

const ConfirmationPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper step={5} />

        <Title1 className="mt-4">
          <b>Votre déclaration d’incident de violence a été enregistrée.</b>
        </Title1>

        <div className="max-w-2xl m-auto">
          <p className="mt-16 text-center">
            Le Ministère de la Santé et à défaut la fédération/association de
            votre branche y auront accès.
          </p>
          <p className="mt-12 text-center">
            Votre déclaration est disponible en téléchargement. Vous pouvez vous
            munir de ce document lors du dépôt de plainte afin de vous aider à
            reconstituer les faits de manière précise.
          </p>

          <div className="flex justify-center w-full my-16 space-x-4">
            <PrimaryButtton>Télécharger le récapitulatif</PrimaryButtton>
          </div>
          <div className="flex justify-center w-full my-16 space-x-4">
            <Link href="/">
              <a>
                <OutlineButton>+&nbsp;Déclarer un autre incident</OutlineButton>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ConfirmationPage
