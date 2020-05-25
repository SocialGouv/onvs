import React from "react"
// import Link from "next/link"
import AuthentCard from "../components/AuthentCard"
import FreelanceCard from "../components/FreelanceCard"

const IndexPage = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="flex flex-wrap items-stretch justify-center w-full min-h-full py-6 space-x-0 space-y-8 lg:space-y-0 lg:space-x-8">
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
