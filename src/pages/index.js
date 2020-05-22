import React from "react"
import Link from "next/link"

const IndexPage = () => {
  return (
    <>
      <div className="jumbotron" style={{ marginTop: 40 }}>
        <h1 className="display-4">ONVS</h1>
        <p className="lead">Observatoire National des Violences en Santé</p>
      </div>

      <Link href="step1">
        <a>Déclarer un acte</a>
      </Link>
    </>
  )
}

export default IndexPage
