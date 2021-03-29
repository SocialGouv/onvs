import { useRouter } from "next/router"
import React from "react"

import { Layout } from "@/components/Layout"
import { PrimaryButtton, Title1 } from "@/components/lib"
import { firstStepUrl } from "@/utils/stepFlows"

function HospitalHomePage() {
  const router = useRouter()

  return (
    <Layout>
      <Title1 className="mt-4">Déclaration des incidents de violence</Title1>

      <PrimaryButtton onClick={() => router.push(firstStepUrl("ets"))}>
        Déclarer
      </PrimaryButtton>
    </Layout>
  )
}

export default HospitalHomePage
