const knex = require("../../knex/knex")
const dateFns = require("date-fns")

const create = async (date, sentTo) => {
  const id = await knex("reports_history").insert({
    sent_at: date,
    sent_to: sentTo,
  })

  return id
}

// Timestamp for the 08th November 2020, which was the last report before automation
const DEFAULT_TIMESTAMP = dateFns.fromUnixTime(1604854800)

const getLatestReportDate = async () => {
  const [latestReport] = await knex("reports_history")
    .orderBy("sent_at", "desc")
    .limit(1)

  return latestReport ? latestReport.sent_at : DEFAULT_TIMESTAMP
}

module.exports = {
  create,
  getLatestReportDate,
}
