import Link from "next/link"
import PropTypes from "prop-types"
import React from "react"

import useUser from "@/hooks/useUser"

import Footer from "./Footer"

const Header = () => {
  const { user } = useUser()

  const url = user?.isLoggedIn ? "/private" : "/"

  return (
    <header className="text-gray-700 body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link href={url}>
          <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
            <span className="ml-3 text-xl font-bold text-gray-900 font-evolventa">
              {"ONVS | Observatoire National des Violences en Santé"}
            </span>
          </a>
        </Link>
      </div>
    </header>
  )
}

export const Layout = ({ children }) => (
  <div className="flex flex-col items-stretch min-h-screen">
    <Header />
    <main className="flex-grow px-4 md:px-8">{children}</main>
    <Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node,
}
