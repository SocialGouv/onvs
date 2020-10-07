import Link from "next/link"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import React from "react"
import useSWR from "swr"

import { findDeclaration } from "@/clients/declarations"
import { Layout } from "@/components/Layout"
import { OutlineButton, Title1 } from "@/components/lib"
import Spinner from "@/components/svg/spinner"
import { stringifyError } from "@/utils/errors"

const DatePart = ({ data }) => {
  return (
    <>
      <Title1 className="mt-12 mb-8">
        <b>Date & lieu</b>
      </Title1>
      <p>
        <span className="inline-block w-48 font-bold">Date</span>
        {data.date}
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
        <span className="inline-block w-48 font-bold">Précision lieu</span>
        {data.location}
      </p>
      {data.otherLocation && (
        <p>
          <span className="inline-block w-48 font-bold">Autre</span>
          {data.otherLocation}
        </p>
      )}
    </>
  )
}

const FactsPart = ({ data }) => {
  return (
    <>
      <Title1 className="mt-12 mb-8">
        <b>Faits</b>
      </Title1>
      {data.factTypes?.includes("Atteinte aux personnes") && (
        <>
          <span className="inline-block w-48 font-bold">
            Atteinte aux personnes
          </span>

          {!!data.fpSpokenViolences?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">Violence verbale</span>
              {data.fpSpokenViolences.join(", ")}
            </p>
          )}
          {!!data.fpPhysicalViolences?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">Violence physique</span>
              {data.fpPhysicalViolences.join(", ")}
            </p>
          )}
          {!!data.fpPhysicalViolencesPrecision && (
            <p>
              <span className="inline-block w-48 pl-8 ">
                Précision violence physique
              </span>
              {data.fpPhysicalViolencesPrecision}
            </p>
          )}
          {!!data.fpSexualViolences?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">Violence sexuelle</span>
              {data.fpSexualViolences.join(", ")}
            </p>
          )}
          {!!data.fpPsychologicalViolences?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">
                Violence psychologique
              </span>
              {data.fpPsychologicalViolences.join(", ")}
            </p>
          )}
          {!!data.fpDiscriminations?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">Discriminations</span>
              {data.fpDiscriminations.join(", ")}
            </p>
          )}
          {!!data.fpNoRespects?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">Respect du lieu</span>
              {data.fpNoRespects.join(", ")}
            </p>
          )}
          {!!data.fpOthers?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">Autres</span>
              {data.fpOthers.join(", ")}
            </p>
          )}
        </>
      )}
      {data.factTypes?.includes("Atteinte aux biens") && (
        <>
          <span className="inline-block w-48 mt-8 font-bold">
            Atteinte aux biens
          </span>

          {!!data.fgDeteriorations?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">Dégradations</span>
              {data.fgDeteriorations.join(", ")}
            </p>
          )}
          {!!data.fgStealWithoutBreakins?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">
                Vol sans effraction
              </span>
              {data.fgStealWithoutBreakins.join(", ")}
            </p>
          )}
          {!!data.fgStealWithBreakins?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">
                Vol avec effraction
              </span>
              {data.fgStealWithBreakins.join(", ")}
            </p>
          )}
          {!!data.fgOthers?.length && (
            <p>
              <span className="inline-block w-48 pl-8 ">Dégradations</span>
              {data.fgOthers.join(", ")}
            </p>
          )}
        </>
      )}
    </>
  )
}

const ReasonsPart = ({ data }) => {
  return (
    <>
      <Title1 className="mt-12 mb-8">
        <b>Motifs</b>
      </Title1>
      {!!data.rCausePatients?.length && (
        <p>
          <span className="inline-block w-48 font-bold">
            Refus par le patient
          </span>
          {data.rCausePatients.join(", ")}
        </p>
      )}
      {!!data.rCauseProfessionals?.length && (
        <p>
          <span className="inline-block w-48 font-bold">
            Refus par le professionnel
          </span>
          {data.rCauseProfessionals.join(", ")}
        </p>
      )}

      {!!data.rDiscords?.length && (
        <p>
          <span className="inline-block w-48 font-bold">Mésentente</span>
          {data.rDiscords.join(", ")}
        </p>
      )}
      {!!data.rLifeRules?.length && (
        <p>
          <span className="inline-block w-48 font-bold">
            Non respect règles de vie
          </span>
          {data.rLifeRules.join(", ")}
        </p>
      )}
      {!!data.rFalsifications?.length && (
        <p>
          <span className="inline-block w-48 font-bold">
            Non conformité documents
          </span>
          {data.rFalsifications.join(", ")}
        </p>
      )}
      {!!data.rDeficientCommunications?.length && (
        <p>
          <span className="inline-block w-48 font-bold">
            Communication défaillante
          </span>
          {data.rDeficientCommunications.join(", ")}
        </p>
      )}
      {!!data.rOthers?.length && (
        <p>
          <span className="inline-block w-48 font-bold">Motifs divers</span>
          {data.rOthers.join(", ")}
        </p>
      )}
      {!!data.rOthersPrecision && (
        <p>
          <span className="inline-block w-48 font-bold">
            Précision autre motif
          </span>
          {data.rOthersPrecision}
        </p>
      )}
    </>
  )
}

const VictimsAuthorsPart = ({ data }) => {
  return (
    <>
      <Title1 className="mt-12 mb-8">
        <b>Victimes</b>
      </Title1>

      {data.victims?.map((victim, index) => (
        <div key={index} className="mb-6">
          <p>
            <span className="inline-block w-48 font-bold">
              Victime #{index + 1}
            </span>
            {victim.type.label} de genre {victim.gender.label} et âgé de{" "}
            {victim.age.age}
            {victim.healthJob && (
              <>&nbsp;dont la profession est {victim.healthJob.label}</>
            )}
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
      {data.pursuit && (
        <p>
          <span className="inline-block w-48 ">Poursuites judiciaires</span>
          {data.pursuit}
        </p>
      )}
      {!!data.pursuitBy.length && (
        <p>
          <span className="inline-block w-48 ">Poursuites par</span>
          {data.pursuitBy.join(", ")}
        </p>
      )}

      {data.authors?.map((author, index) => (
        <div key={index} className="mt-6">
          <p>
            <span className="inline-block w-48 font-bold">
              Auteur #{index + 1}
            </span>
            {author.type.label} de genre {author.gender.label} et âgé de{" "}
            {author.age.age}
            {author.healthJob && (
              <>&nbsp;dont la profession est {author.healthJob.label}</>
            )}
          </p>
          <p>
            <span className="inline-block w-48 ">
              Altération du discernement
            </span>
            {author.discernmentTroublesIsPresent}
            {!!author.discernmentTroubles?.length &&
              ` (${author.discernmentTroubles.join(", ")})`}
          </p>
        </div>
      ))}

      {data.thirdPartyIsPresent && (
        <p>
          <span className="inline-block w-48 ">Intervention de tiers</span>
          {data.thirdPartyIsPresent}
          {!!data.thirdParty?.length && ` (${data.thirdParty.join(", ")})`}
        </p>
      )}
    </>
  )
}

const FinalPrecisionsPart = ({ data }) => {
  return (
    <>
      <Title1 className="mt-12 mb-8">
        <b>Précisions</b>
      </Title1>

      <p>
        <span className="inline-block w-48 font-bold">Description</span>
        {data.description}
      </p>
      <p>
        <span className="inline-block w-48 font-bold">Consentement</span>
        {data.declarantContactAgreement === "true" ? "Oui" : "Non"}
      </p>
      {data.declarantContactAgreement === "true" && (
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

DatePart.propTypes = {
  data: PropTypes.object,
}

FactsPart.propTypes = DatePart.propTypes
ReasonsPart.propTypes = DatePart.propTypes
VictimsAuthorsPart.propTypes = DatePart.propTypes
FinalPrecisionsPart.propTypes = DatePart.propTypes

const ShowDeclarationPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(
    id ? ["/api/declarations", id] : null,
    (url, id) => findDeclaration(id),
  )

  // if (error) console.error("error", error)
  if (error) console.error(error.info?.error)
  // if (error) console.error("stringify", stringifyError(error))
  // if (error) console.error(JSON.stringify(error))

  return (
    <>
      <Layout>
        <div className="px-32 py-4 m-auto mb-8 shadow-xl max-w-xxl">
          <Title1 className="mt-12">
            <b>{"Votre déclaration"}</b>
          </Title1>

          {!error && !data && (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          )}

          {error && (
            <>
              <Title1 className="mt-12">
                {
                  " Oups, il semble qu'il y ait des problèmes pour récupérer les informations de cette déclaration..."
                }
                <span role="img" aria-hidden="true">
                  🤫
                </span>
              </Title1>
            </>
          )}

          {data && (
            <>
              <DatePart data={data} />
              <FactsPart data={data} />
              <ReasonsPart data={data} />
              <VictimsAuthorsPart data={data} />
              <FinalPrecisionsPart data={data} />
            </>
          )}

          <div className="flex justify-center w-full my-16 space-x-4">
            <Link href="/">
              <a>
                <OutlineButton>Retour à la page principale</OutlineButton>
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ShowDeclarationPage
