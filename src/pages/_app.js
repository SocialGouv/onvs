import "../styles/index.css"

import * as Sentry from "@sentry/node"
import { createStore, StateMachineProvider } from "little-state-machine"
import App from "next/app"
import Head from "next/head"
import React from "react"
import { ToastProvider } from "react-toast-notifications"

import { initMatomo } from "@/lib/matomo"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
})

function log(store) {
  console.log("Form state in session storage", store)
  return store
}

createStore({}, { middleWares: [log] })

class MyApp extends App {
  componentDidMount() {
    initMatomo({
      piwikUrl: process.env.NEXT_PUBLIC_MATOMO_URL,
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
    })
  }
  render() {
    const { Component, pageProps } = this.props

    // Workaround for https://github.com/zeit/next.js/issues/8592
    const { err } = this.props
    const modifiedPageProps = { ...pageProps, err }

    return (
      <>
        <Head>
          <title>ONVS</title>
        </Head>
        <div className="min-h-screen">
          <StateMachineProvider>
            <ToastProvider>
              <Component {...modifiedPageProps} />{" "}
            </ToastProvider>
          </StateMachineProvider>
        </div>
      </>
    )
  }
}

export default MyApp
