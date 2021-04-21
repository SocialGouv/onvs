require("dotenv").config()

const pack = require("../package.json")

const next = require("next")
const express = require("express")

const port = parseInt(process.env.PORT, 10) || 3030
const dev = process.env.NODE_ENV !== "production"

const app = next({ dev })
const handler = app.getRequestHandler()

const sourcemapsForSentryOnly = (token) => (req, res, next) => {
  // In production we only want to serve source maps for Sentry
  if (!dev && !!token && req.headers["x-sentry-token"] !== token) {
    res
      .status(401)
      .send("Authentication access token is required to access the source map.")
    return
  }
  next()
}

const faultyRoute = () => {
  throw new Error("Server exception")
}

app.prepare().then(() => {
  // app.buildId is only available after app.prepare(), hence why we setup here
  const { Sentry } = require("../src/lib/sentry")(app.buildId)

  express()
    // This attaches request information to Sentry errors
    .use(Sentry.Handlers.requestHandler())
    .get(/\.map$/, sourcemapsForSentryOnly(process.env.SENTRY_TOKEN))
    // demo server-exception
    .get("/page-error", faultyRoute)
    // Regular next.js request handler
    .use(handler)
    // This handles errors if they are thrown before reaching the app
    .use(Sentry.Handlers.errorHandler())
    .listen(port, (err) => {
      if (err) {
        throw err
      }
      console.debug("Debug -----------")
      console.debug(
        "Run time variables (cf. index pour les build time variables)",
      )

      console.debug(`Package ${pack.name}: ${pack.version}`)
      console.debug(`process.env.PORT: ${port}`)
      console.debug(
        `process.env.NEXT_PUBLIC_SENTRY_DSN: ${process.env.NEXT_PUBLIC_SENTRY_DSN}`,
      )
      console.debug(
        `process.env.NEXT_PUBLIC_SENTRY_TOKEN: ${process.env.NEXT_PUBLIC_SENTRY_TOKEN}`,
      )
      console.debug(
        `process.env.NEXT_PUBLIC_MATOMO_URL: ${process.env.NEXT_PUBLIC_MATOMO_URL}`,
      )
      console.debug(
        `process.env.NEXT_PUBLIC_MATOMO_SITE_ID: ${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}`,
      )
      // console.debug(`process.env.POSTGRES_SSL: ${process.env.POSTGRES_SSL}`)
      console.debug(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`)
      console.debug(
        `process.env.TEST_CURRENT_DATE: ${process.env.TEST_CURRENT_DATE}`,
      )
      // eslint-disable-next-line no-console
      console.debug(`> Ready on http://localhost:${port}`)
      console.debug("-----------------")
    })
})
