// import { DevTool } from "little-state-machine-devtools"
//import "@socialgouv/bootstrap.core/dist/socialgouv-bootstrap.min.css"
import "../styles/index.css"

import * as Sentry from "@sentry/node"
import { initMatomo } from "lib/matomo"
// import Nav from "../components/Nav"
import { createStore, StateMachineProvider } from "little-state-machine"
import App from "next/app"
import Head from "next/head"
import React from "react"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
})

createStore({
  form: {},
})

class MyApp extends App {
  componentDidMount() {
    initMatomo({
      piwikUrl: process.env.MATOMO_URL,
      siteId: process.env.MATOMO_SITE_ID,
    })
  }
  render() {
    const { Component, pageProps } = this.props

    // Workaround for https://github.com/zeit/next.js/issues/8592
    const { err } = this.props
    const modifiedPageProps = { ...pageProps, err }

    return (
      <StateMachineProvider>
        {/* <DevTool /> */}

        <Head>
          <title>ONVS</title>
        </Head>
        {/* <Nav /> */}
        {/* <div className="container min-h-screen px-4 mx-auto"> */}
        <div className="min-h-screen">
          <Component {...modifiedPageProps} />{" "}
        </div>
      </StateMachineProvider>
    )
  }
}

export default MyApp
