import React from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useStateMachine } from "little-state-machine"
import update from "../lib/pages/form"

const Step1Page = () => {
  const router = useRouter()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      location: "Vincennes",
    },
  })
  const { action } = useStateMachine(update)

  const onSubmit = (data) => {
    console.log({ data })
    action(data)
    router.push("/step2")
  }

  return (
    <>
      <h1>Page 1 du formulaire</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="date" type="date" ref={register} />
        <input name="location" ref={register} />
        <button type="submit">Suivant</button>
      </form>
    </>
  )
}

export default Step1Page
