import React from "react"

import { Layout } from "@/components/Layout"
import { Title1, Title2 } from "@/components/lib"

const debug = () => {
  console.log(`NEXT_PUBLIC_SENTRY_DSN: ${process.env.NEXT_PUBLIC_SENTRY_DSN}`)
  console.log(
    `NEXT_PUBLIC_SENTRY_TOKEN: ${process.env.NEXT_PUBLIC_SENTRY_TOKEN}`,
  )
  console.log(`NEXT_PUBLIC_MATOMO_URL: ${process.env.NEXT_PUBLIC_MATOMO_URL}`)
  console.log(
    `NEXT_PUBLIC_MATOMO_SITE_ID: ${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}`,
  )
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`)
  console.log(`TEST_CURRENT_DATE: ${process.env.TEST_CURRENT_DATE}`)
}

const MentionsPage = () => {
  // To see values of build time variables (those in server.js are runtime variables et they can be not synchronized)
  debug()

  return (
    <>
      <Layout>
        <div className="px-32 pt-4 pb-16 m-auto mb-8 rounded-md shadow-xl max-w-xxl">
          <Title1 className="mt-12">
            <b>{"Mentions légales"}</b>
          </Title1>

          <Title2 className="mt-12 mb-6">Editeur de la plateforme</Title2>

          <p>La plateforme est éditée par : </p>

          <p className="pt-4 ml-8">
            <b>Direction générale de l’offre de soins</b> <br />
            14 avenue Duquesne <br />
            75350 Paris 07 SP
          </p>

          <Title2 className="mt-12 mb-6">Directeur de la publication</Title2>

          <p>
            <b>Madame Katia Julienne</b>, Directrice générale de l’offre de
            soins.
          </p>

          <Title2 className="mt-12 mb-6">Hébergement de la plateforme</Title2>
          <p>Ce site est hébergé par : </p>

          <p className="pt-4 ml-8">
            Microsoft Azure <br />
            37 Quai du Président Roosevelt <br />
            92130 ISSY-LES-MOULINEAUX
          </p>

          <Title2 className="mt-12 mb-6">Accessibilité</Title2>

          <p>
            La conformité aux normes d’accessibilité numérique est un objectif
            ultérieur mais nous tâchons de rendre ce site accessible à toutes et
            à tous. Si vous rencontrez un défaut d’accessibilité vous empêchant
            d’accéder à un contenu ou une fonctionnalité du site, merci de nous
            en faire part. Si vous n’obtenez pas de réponse rapide de notre
            part, vous êtes en droit de faire parvenir vos doléances ou une
            demande de saisine au Défenseur des droits.
          </p>

          <p className="mt-4">
            Pour en savoir plus sur la politique d’accessibilité numérique de
            l’État :
            <br />
            <a
              href="http://references.modernisation.gouv.fr/accessibilite-numerique"
              className="text-blue-600 underline"
            >
              http://references.modernisation.gouv.fr/accessibilite-numerique.
            </a>
          </p>

          <Title2 className="mt-12 mb-6">Sécurité</Title2>

          <p>
            Le site est protégé par un certificat électronique, matérialisé pour
            la grande majorité des navigateurs par un cadenas. Cette protection
            participe à la confidentialité des échanges, mais permet aussi aux
            usagers de s’assurer de l’authenticité du site. En aucun cas les
            services associés à la plateforme ne seront à l’origine d’envoi de
            courriels pour demander la saisie d’informations personnelles, en
            particulier, le mot de passe qui reste sous le contrôle exclusif des
            usagers.
          </p>
        </div>
      </Layout>
    </>
  )
}

export default MentionsPage
