import { useStateMachine } from "little-state-machine"
import React from "react"

import AuthentCard from "@/components/AuthentCard"
import Footer from "@/components/Footer"
import FreelanceCard from "@/components/FreelanceCard"
import { HeroTitle } from "@/components/lib"
import Wave from "@/components/svg/wave"
import { formReducer } from "@/components/wizard/formReducer"

const IndexPage = () => {
  const { action } = useStateMachine(formReducer)

  React.useEffect(() => {
    action({ event: { name: "RESET" } })
  }, [action])

  return (
    <>
      <div
        style={{
          background: "#387CCB",
          color: "#FFF",
          overflow: "hidden",
          textAlign: "center",
        }}
        className="relative"
      >
        <HeroTitle>Observatoire National des Violences en Santé</HeroTitle>
        <Wave />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-wrap items-stretch justify-center w-full min-h-full py-6 space-x-0 space-y-8 lg:space-y-0 lg:space-x-8">
          <AuthentCard />
          <FreelanceCard />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default IndexPage
