import { format } from "date-fns"
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

const makeEmailContent = (startDate) =>
  `Voici les déclarations de violences du ${formatDate(
    startDate,
  )} au ${formatDate(
    new Date(),
  )}. Vous pouvez en prendre connaissance et les envoyer aux ordres concernés.

Ceci est un mail automatique, merci de ne pas y répondre.`

export const sendReportEmailTask = async () => {
  const latestReportDate = await getLatestReportDate()
  const currentReportDate = new Date()

  const declarations = await knex("declarations")
    .select("*")
    .where("created_at", ">", latestReportDate)
    .orderBy("date", "desc")

  const csv = await new ObjectsToCsv(
    declarations.map((declaration) => ({
      link:
        "https://onvs.fabrique.social.gouv.fr/declarations/" + declaration.id,
      ...declaration,
    })),
  ).toString()

  const csvAttachment = makeCsvAttachment(csv)
  const content = makeEmailContent(latestReportDate)

  try {
    await sendReportEmail("Rapport hebdomadaire ONVS", content, csvAttachment)

    await createReportHistory(currentReportDate, process.env.MAIL_TO)
  } catch (err) {
    console.error(err)
  }
}
