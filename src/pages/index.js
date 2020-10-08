import { useStateMachine } from "little-state-machine"
import React, { useEffect, useState } from "react"

import AuthentCard from "@/components/AuthentCard"
import Footer from "@/components/Footer"
import FreelanceCard from "@/components/FreelanceCard"
import { HeroTitle } from "@/components/lib"
import Modal from "@/components/Modal"
import Wave from "@/components/svg/wave"
import { resetFreelance } from "@/lib/pages/form"

const IndexPage = () => {
  const { action } = useStateMachine(resetFreelance)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    action()
  }, [action])

  // const toggleModal = () => {
  //   setOpenModal((state) => !state)
  // }

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
        <HeroTitle>Observatoire national des violences en santé</HeroTitle>
        {/* <button onClick={toggleModal}>Toggle modal</button> */}
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          title="Nom de catégorie"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <Wave className="block" />
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
