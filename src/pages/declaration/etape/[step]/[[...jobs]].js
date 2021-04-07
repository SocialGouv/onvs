import React from "react"

import { WizardForm } from "@/components/wizard"

const maxStep = 6

export async function getServerSideProps({ query }) {
  // We use getServerSideProps to get the query whatever it is in SSR or in CSR.
  // Via useRouter, there is no error but we don't have access to router.query so we need to use getServerSideProps.

  const step = Number(query.step)

  const [job = "liberal", jobPrecision = ""] = query.jobs || []

  if (isNaN(query.step) || step > maxStep || step < 0)
    return {
      notFound: true,
    }

  return {
    props: { job, jobPrecision, step },
  }
}

const StepPage = (props) => {
  return <WizardForm {...props} />
}

export default StepPage
