import React from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useStateMachine } from "little-state-machine"
import update from "lib/pages/form"

const Step1Page = () => {
  const router = useRouter()

  const { handleSubmit } = useForm()
  const { action, state } = useStateMachine(update)

  const onSubmit = (data) => {
    console.log({ data })
    action(data)
    router.push("/step2")
  }

  return (
    <>
      <h1>Page 3 du formulaire</h1>

      <p>state: {JSON.stringify(state)}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">Confirmation</button>
      </form>
    </>
  )
}

export default Step1Page
