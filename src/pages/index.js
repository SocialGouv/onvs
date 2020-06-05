import React from "react"
import Link from "next/link"
import AuthentCard from "components/AuthentCard"
import FreelanceCard from "components/FreelanceCard"
import { HeroTitle } from "components/lib"
import Wave from "components/svg/wave"

const IndexPage = () => {
  return (
    <>
      <div
        style={{
          background: "#387CCB",
          color: "#FFF",
          textAlign: "center",
          overflow: "hidden",
        }}
        className="relative"
      >
        <HeroTitle>Observatoire national des violences en santé</HeroTitle>
        <Wave className="block" />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-wrap items-stretch justify-center w-full min-h-full py-6 space-x-0 space-y-8 lg:space-y-0 lg:space-x-8">
          <AuthentCard />
          <Link href="forms/freelance/step1">
            <a>
              <FreelanceCard />
            </a>
          </Link>
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
