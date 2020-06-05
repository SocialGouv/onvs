import React from "react"
import App from "next/app"
import Head from "next/head"
import * as Sentry from "@sentry/node"
import { initMatomo } from "lib/matomo"
// import Nav from "../components/Nav"
import { StateMachineProvider, createStore } from "little-state-machine"
// import { DevTool } from "little-state-machine-devtools"

//import "@socialgouv/bootstrap.core/dist/socialgouv-bootstrap.min.css"

import "../styles/index.css"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
})

createStore({
  form: {},
})

class MyApp extends App {
  componentDidMount() {
    initMatomo({
      siteId: process.env.MATOMO_SITE_ID,
      piwikUrl: process.env.MATOMO_URL,
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
        <div className="">
          <Component {...modifiedPageProps} />{" "}
        </div>
      </StateMachineProvider>
    )
  }
}

export default MyApp
