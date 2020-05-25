import React from "react"
// import Link from "next/link"
import AuthentCard from "../components/AuthentCard"
import FreelanceCard from "../components/FreelanceCard"

const IndexPage = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <AuthentCard />

        <FreelanceCard />
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
