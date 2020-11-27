require("dotenv")
const nodemailer = require("nodemailer")

const emailConfig = {
  auth: {
    pass: process.env.MAIL_PASSWORD,
    user: process.env.MAIL_USERNAME,
  },
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_USE_TLS !== "false",
}

const transporter = nodemailer.createTransport(emailConfig)

const sendReportEmail = (subject, text, attachments) => {
  const message = {
    attachments,
    from: process.env.MAIL_FROM,
    subject,
    text,
    to: process.env.MAIL_TO.split(","),
  }
  return transporter.sendMail(message)
}

module.exports = {
  sendReportEmail,
}
