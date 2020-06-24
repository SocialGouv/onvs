import React, { useEffect } from "react"
import AuthentCard from "components/AuthentCard"
import FreelanceCard from "components/FreelanceCard"
import { HeroTitle } from "components/lib"
import Wave from "components/svg/wave"
import { useStateMachine } from "little-state-machine"
import { reset } from "lib/pages/form"

const IndexPage = () => {
  const { action } = useStateMachine(reset)

  useEffect(() => {
    action()
  }, [action])

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
          <FreelanceCard />
        </div>
      </div>
    </>
  )
}

export default IndexPage
