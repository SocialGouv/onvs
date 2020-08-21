import { useStateMachine } from "little-state-machine"
import React from "react"

import update from "@/lib/pages/form"

const DebugPage = () => {
  const { state } = useStateMachine(update)

  return (
    <>
      <h1 className="mb-4 text-white bg-blue-700">Debug page</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  )
}

export default DebugPage
