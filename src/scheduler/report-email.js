import { format } from "date-fns"
import { compose, groupBy, join, map, toPairs } from "lodash/fp"
import ObjectsToCsv from "objects-to-csv"

import { sendReportEmail } from "@/services/email"
import {
  createReportHistory,
  getLatestReportDate,
} from "@/services/reportsHistory"

import knex from "../knex/knex"

const makeCsvAttachment = (csv) => [
  {
    content: csv,
    filename: "rapport.csv",
  },
]

const formatDate = (date) => format(date, "dd/MM/yyyy")

const makeEmailContent = (startDate, declarations) =>
  `Voici les déclarations de violences du ${formatDate(
    startDate,
  )} au ${formatDate(
    new Date(),
  )}. Vous pouvez en prendre connaissance et les envoyer aux ordres concernés.
  
${makeDeclarationList(declarations)}

Ceci est un mail automatique, merci de ne pas y répondre.`

const getDeclarationLink = (declaration) =>
  `https://onvs.fabrique.social.gouv.fr/declarations/${declaration.id}`

const getDeclarationLinkTextsFromDeclarations = (declarations) =>
  declarations.map(getDeclarationLink).join("\n")

const makeJobDeclarationList = (job, declarations) => `${job} :
${getDeclarationLinkTextsFromDeclarations(declarations)}
`

const makeDeclarationList = compose(
  join("\n"),
  map(([job, declarations]) => makeJobDeclarationList(job, declarations)),
  toPairs,
  groupBy("job"),
)

export const sendReportEmailTask = async () => {
  const latestReportDate = await getLatestReportDate()
  const currentReportDate = new Date()

  const declarations = await knex("declarations")
    .select("*")
    .where("created_at", ">", latestReportDate)
    .orderBy("date", "desc")

  const csv = await new ObjectsToCsv(
    declarations.map((declaration) => ({
      link: getDeclarationLink(declaration),
      ...declaration,
    })),
  ).toString()

  const csvAttachment = makeCsvAttachment(csv)
  const content = makeEmailContent(latestReportDate, declarations)

  try {
    await sendReportEmail("Rapport hebdomadaire ONVS", content, csvAttachment)

    await createReportHistory(currentReportDate, process.env.MAIL_TO)
  } catch (err) {
    console.error(err)
  }
}
