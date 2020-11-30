import dotenv from "dotenv"
import { createTransport } from "nodemailer"

dotenv.config()

const emailConfig = {
  auth: {
    pass: process.env.MAIL_PASSWORD,
    user: process.env.MAIL_USERNAME,
  },
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_USE_TLS !== "false",
}

const transporter = createTransport(emailConfig)
const emailRecipients = process.env.MAIL_TO.split(",")

export const sendReportEmail = (subject, text, attachments) => {
  const message = {
    attachments,
    from: process.env.MAIL_FROM,
    subject,
    text,
    to: emailRecipients.length > 0 ? emailRecipients : "email@email.com",
  }
  return transporter.sendMail(message)
}
