import { format, parseISO } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import useSWR from "swr"

import { Layout } from "@/components/Layout"
import { OutlineButton, Title1Declaration } from "@/components/lib"
import Spinner from "@/components/svg/spinner"
import useUser from "@/hooks/useUser"
import { findDeclaration } from "@/clients/declarations"
import {
  AuthorSchema,
  DeclarationModel,
  DeclarationModelWithEditor,
  PursuitSchema,
  VictimSchema,
} from "@/models/declarations"
import { Prisma } from "@prisma/client"
import { Badge } from "@/components/Badge"
import { BadgeType } from "@/components/BadgeType"

const DeclarationTypePart = ({ data }: { data: DeclarationModel }) => {
  return (
    <p className="mt-6">
      <span className="inline-block w-48 font-bold">Type de déclaration</span>
      <BadgeType type={data.declarationType} />

      {data?.editorId && (
        <>
          <p>
            <span className="inline-block w-48 font-bold mt-2">Éditeur</span>
            <Badge
              content={
                (data as DeclarationModelWithEditor).editor?.name || "N/A"
              }
              colors={{ text: "bg-yellow-100", bg: "text-yellow-800" }}
            />
          </p>

          <p>
            <span className="inline-block w-48 font-bold mt-2">FINESS</span>
            {data.finesset || "N/A"}
          </p>
        </>
      )}
    </p>
  )
}

const DatePart = ({ data }: { data: DeclarationModel }) => {
  const location = data.location as Prisma.JsonObject

  return (
    <>
      <Title1Declaration className="mt-6 mb-4 text-left">
        <b>Date & lieu</b>
      </Title1Declaration>
      <p>
        <span className="inline-block w-48 font-bold">
          Date de la déclaration
        </span>
        {format(parseISO(data.createdAt as unknown as string), "dd/MM/yyyy")}
      </p>
      {data.job && (
        <p>
          <span className="inline-block w-48 font-bold">
            Profession du déclarant
          </span>
          {data.job}
        </p>
      )}
      <p>
        <span className="inline-block w-48 mt-4 font-bold">
          {"Date de l'évènement"}
        </span>
        {format(parseISO(data.date as unknown as string), "dd/MM/yyyy")}
      </p>
      <p>
        <span className="inline-block w-48 font-bold">Horaire</span>
        {data.hour}
      </p>
      <p>
        <span className="inline-block w-48 font-bold">Ville</span>
        {data.town}
      </p>
      <p>
        <span className="inline-block w-48 font-bold">Code postal</span>
        {data.postalCode}
      </p>
      {Object.keys(location)?.map((key) => (
        <p key={key}>
          <span className="inline-block w-48 font-bold">{key}</span>
          {Array.isArray(location[key])
            ? `${location[key]?.[0]} (${location[key]?.[1]})`
            : location[key]}
        </p>
      ))}
    </>
  )
}

// Utility to display fact and reasons, since they can be of type string or be a tuple of 2 elements.
function prettyDisplay(arrayWithPrecision: Prisma.JsonArray) {
  return arrayWithPrecision.map((fact) =>
    !Array.isArray(fact) ? (
      <li className="list-disc ml-8 pl-2">{fact}</li>
    ) : (
      <li className="list-disc ml-8 pl-2">{`${fact[0]} (${fact[1]})`}</li>
    ),
  )
}

const FactsPart = ({ data }: { data: DeclarationModel }) => {
  const factPersons = data.factPersons as Prisma.JsonObject
  const factGoods = data.factGoods as Prisma.JsonObject

  return (
    <>
      <Title1Declaration className="mt-6 mb-4">
        <b>Faits</b>
      </Title1Declaration>

      {factPersons && Boolean(Object.keys(factPersons).length) && (
        <>
          <span className="inline-block w-48 font-bold">
            Atteinte aux personnes
          </span>

          {Object.keys(factPersons).map((key) => (
            <p key={key}>
              <span className="inline-block">{key}</span> :&nbsp;
              <ul>
                {Array.isArray(factPersons[key]) &&
                  (factPersons[key] as Prisma.JsonArray).length &&
                  prettyDisplay(factPersons[key] as Prisma.JsonArray)}
              </ul>
            </p>
          ))}
        </>
      )}
      {factGoods && Boolean(Object.keys(factGoods).length) && (
        <>
          <span className="inline-block w-48 font-bold">
            Atteinte aux biens
          </span>

          {Object.keys(factGoods).map((key) => (
            <p key={key}>
              <span className="inline-block">{key}</span>
              {Array.isArray(factGoods[key]) &&
                (factGoods[key] as Prisma.JsonArray).length &&
                prettyDisplay(factGoods[key] as Prisma.JsonArray)}
            </p>
          ))}
        </>
      )}
    </>
  )
}

const ReasonsPart = ({ data }: { data: DeclarationModel }) => {
  const reasons = data.reasons as Prisma.JsonObject

  return (
    <>
      <Title1Declaration className="mt-6 mb-4">
        <b>Motifs</b>
      </Title1Declaration>

      {data.reasonNotApparent && (
        <p>
          <span className="inline-block">Pas de motif apparent</span>
        </p>
      )}
      {reasons && Boolean(Object.keys(reasons).length) && (
        <>
          {Object.keys(reasons).map((key) => (
            <p key={key}>
              <span className="inline-block">{key}</span>
              {Array.isArray(reasons[key]) &&
                (reasons[key] as Prisma.JsonArray).length &&
                prettyDisplay(reasons[key] as Prisma.JsonArray)}
            </p>
          ))}
        </>
      )}
    </>
  )
}

const VictimsAuthorsPart = ({ data }: { data: DeclarationModel }) => {
  const victims = data?.victims as Prisma.JsonArray
  const authors = data?.authors as Prisma.JsonArray
  const pursuit = data?.pursuit as PursuitSchema
  const pursuitBy = pursuit && pursuit["pursuitBy"]
  const thirdParty = data?.thirdParty as Prisma.JsonArray

  return (
    <>
      <Title1Declaration className="mb-4">
        <b>Victimes & auteurs</b>
      </Title1Declaration>

      {victims?.map((victim: VictimSchema, index) => (
        <div key={index} className="mb-6">
          <p className="mb-4">
            <p className="font-bold">Victime n°{index + 1}</p>
            {victim.type} de sexe {victim.gender} et âgé de {victim.age}
            {victim.healthJob && (
              <>&nbsp;dont la profession est {victim.healthJob}</>
            )}
            .
          </p>
          <p>
            <span className="inline-block w-48 ">Jours arrêt de travail</span>
            {victim.sickLeaveDays}
          </p>
          <p>
            <span className="inline-block w-48 ">
              {"Jours d'hospitalisation"}
            </span>
            {victim.hospitalizationDays}
          </p>
          <p>
            <span className="inline-block w-48 ">{"Jours d'ITT"}</span>
            {victim.ITTDays}
          </p>
        </div>
      ))}
      {pursuit && (
        <p className="flex">
          <span className="inline-block w-48 ">Suites judiciaires</span>
          {pursuit.type}
        </p>
      )}
      {pursuitBy?.length && (
        <p className="flex">
          <span className="inline-block w-48 ">Par</span>
          {pursuitBy.join(", ")}
        </p>
      )}

      {authors?.map((author: AuthorSchema, index) => (
        <div key={index} className="mt-6">
          <p className="mb-4">
            <p className="font-bold">Auteur n°{index + 1}</p>
            {author.type} de sexe {author.gender} et âgé de {author.age}
            {author.healthJob && (
              <>&nbsp;dont la profession est {author.healthJob}</>
            )}
            .
          </p>
          <p className="flex">
            <span className="inline-block w-48 ">
              Altération du discernement
            </span>
            {!!author.discernmentTroubles?.length &&
              `${author.discernmentTroubles.join(", ")}`}
          </p>
        </div>
      ))}

      {thirdParty && (
        <p className="flex">
          <span className="inline-block w-48">Intervention de tiers</span>
          {thirdParty
            ?.map((elt) =>
              Array.isArray(elt) ? `${elt?.[0]} (${elt?.[1]})` : elt,
            )
            .join(", ")}
        </p>
      )}
    </>
  )
}

const FinalPrecisionsPart = ({ data }: { data: DeclarationModel }) => {
  return (
    <>
      <Title1Declaration className="mt-6 mb-4">
        <b>Précisions</b>
      </Title1Declaration>

      <p className="flex">
        <p className="font-bold w-48">Description</p>
        <p>{data.description}</p>
      </p>
      {/* Those data doesn't exist for hospital flow */}
      {data.declarantContactAgreement !== null && (
        <p>
          <span className="inline-block font-bold w-48">Consentement</span>
          {data.declarantContactAgreement === true ? "Oui" : "Non"}
        </p>
      )}
      {data.declarantContactAgreement && (
        <>
          <p>
            <span className="inline-block w-48 font-bold ">Nom Prénom</span>
            {data.declarantNames}
          </p>
          <p>
            <span className="inline-block w-48 font-bold ">N° RPPS/ADELI</span>
            {data.declarantExternalId}
          </p>
          <p>
            <span className="inline-block w-48 font-bold ">Courriel</span>
            {data.declarantEmail}
          </p>
          <p>
            <span className="inline-block w-48 font-bold ">Téléphone</span>
            {data.declarantTel}
          </p>
        </>
      )}
    </>
  )
}

const ShowDeclarationPage = (): JSX.Element => {
  const { user } = useUser()

  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(
    id ? ["/api/declarations", id] : null,
    (url, id) => findDeclaration(id),
  )

  if (error) console.error(error.info?.error)

  return (
    <>
      <Layout>
        <div
          className="px-16 py-4 m-auto mb-8 shadow-xl max-w-xxl"
          style={{ maxWidth: 800 }}
        >
          <Title1Declaration className="mt-12">
            <b>{"Votre déclaration"}</b>
          </Title1Declaration>

          {!error && !data && (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          )}

          {error && (
            <>
              <Title1Declaration className="mt-12">
                {
                  " Oups, il semble qu'il y ait des problèmes pour récupérer les informations de cette déclaration..."
                }
                <span role="img" aria-hidden="true">
                  🤫
                </span>
              </Title1Declaration>
            </>
          )}

          {data && (
            <>
              <DeclarationTypePart data={data} />
              <DatePart data={data} />
              <FactsPart data={data} />
              <ReasonsPart data={data} />
              <VictimsAuthorsPart data={data} />
              <FinalPrecisionsPart data={data} />
            </>
          )}

          <div className="flex justify-center w-full my-16 space-x-4">
            {user?.isLoggedIn ? (
              <Link href="/private">
                <a>
                  <OutlineButton>
                    +&nbsp;Retour au tableau de bord
                  </OutlineButton>
                </a>
              </Link>
            ) : (
              <Link href="/">
                <a>
                  <OutlineButton>Retour à la page principale</OutlineButton>
                </a>
              </Link>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ShowDeclarationPage
