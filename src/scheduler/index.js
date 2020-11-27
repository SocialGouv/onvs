require("dotenv")
const { job } = require("cron")
const sendReportEmailTask = require("./report-email").sendReportEmailTask

// All dependencies must not use es6 imports as this does not go
// through Babel and would require some heavy refactoring
job(
  process.env.REPORT_EMAIL_CRON,
  sendReportEmailTask,
  null,
  true,
  "Europe/Paris",
).start()
