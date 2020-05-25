import React from "react"
// import Link from "next/link"
import AuthentCard from "../components/AuthentCard"
import FreelanceCard from "../components/FreelanceCard"

const IndexPage = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full min-h-full flex flex-col sm:flex-row items-stretch justify-center py-6 space-y-8 sm:space-y-0 space-x-0 sm:space-x-12">
          <AuthentCard />
          <FreelanceCard />
        </div>
      </div>

      {/* <div className="jumbotron" style={{ marginTop: 40 }}>
        <h1 className="display-4">ONVS</h1>
        <p className="lead">Observatoire National des Violences en Santé</p>
      </div>

      <button className="btn-blue">Test tw</button>

      <Link href="step1">
        <a>Déclarer un acte</a>
      </Link>

      <Link href="/">
        <a className="text-blue-500 no-underline">Home</a>
      </Link> */}
    </>
  )
}

export default IndexPage
