import { useStateMachine } from "little-state-machine"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import { createDeclaration } from "@/clients/declarations"
import { Layout } from "@/components/Layout"
import { OutlineButton, PrimaryButtton, Title1 } from "@/components/lib"
import { useEffectToast } from "@/hooks/useEffectToast"
import update from "@/lib/pages/form"

const ConfirmationPage = () => {
  const { state } = useStateMachine(update)
  const [error, setError] = useState()

  useEffect(() => {
    const create = async (declaration) => {
      try {
        await createDeclaration(declaration)
      } catch (error) {
        console.error(error)

        if (error.status === 409) {
          setError({
            emoji: "🤫",
            message: "Il semble que la déclaration soit déjà enregistrée.",
          })
        } else
          setError({
            emoji: "😕😵",
            message:
              "Malheureusement, la déclaration n'a pas pu être enregistrée.",
          })
      }
    }
    create(state)
  }, [state])

  useEffectToast(error)

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        {error && (
          <Title1 className="mt-12">
            <b>
              {
                "Votre déclaration d’incident de violence n'a pas pu être enregistrée. 😕"
              }
            </b>
          </Title1>
        )}
        {!error && (
          <>
            <Title1 className="mt-12">
              <b>Votre déclaration d’incident de violence a été enregistrée.</b>
            </Title1>
            <div className="max-w-2xl m-auto">
              <p className="mt-16 text-center">
                Le Ministère de la Santé et à défaut la fédération/association
                de votre branche y auront accès.
              </p>
              <p className="mt-12 text-center">
                Votre déclaration est disponible en téléchargement. Vous pouvez
                vous munir de ce document lors du dépôt de plainte afin de vous
                aider à reconstituer les faits de manière précise.
              </p>

              <div className="flex justify-center w-full my-16 space-x-4">
                <Link href={`/declarations/${state.id}`}>
                  <a>
                    <PrimaryButtton>
                      Télécharger le récapitulatif
                    </PrimaryButtton>
                  </a>
                </Link>
              </div>
              <div className="flex justify-center w-full my-16 space-x-4">
                <Link href="/">
                  <a>
                    <OutlineButton>
                      +&nbsp;Déclarer un autre incident
                    </OutlineButton>
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default ConfirmationPage
