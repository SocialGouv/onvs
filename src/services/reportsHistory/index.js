import { fromUnixTime } from "date-fns"

import knex from "../../knex/knex"

export const createReportHistory = async (date, sentTo) => {
  const id = await knex("reports_history").insert({
    sent_at: date,
    sent_to: sentTo,
  })

  return id
}

// Timestamp for the 08th November 2020, which was the last report before automation
const DEFAULT_TIMESTAMP = fromUnixTime(1604854800)

export const getLatestReportDate = async () => {
  const [latestReport] = await knex("reports_history")
    .orderBy("sent_at", "desc")
    .limit(1)

  return latestReport ? latestReport.sent_at : DEFAULT_TIMESTAMP
}
