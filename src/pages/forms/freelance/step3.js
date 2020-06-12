import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useStateMachine } from "little-state-machine"
import update from "lib/pages/form"
import { Layout } from "components/Layout"
import { PrimaryButtton, OutlineButton } from "components/lib"
import { Stepper, Title1, Title2 } from "components/Stepper"
import Select from "react-select"

const Step2Page = () => {
  const router = useRouter()
  const { action } = useStateMachine(update)

  const { handleSubmit, register, setValue, getValues } = useForm({})

  const onSubmit = (data) => {
    console.log({ data })
    action(data)

    router.push("/forms/freelance/step3")
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper step={3} />

        <Title1 className="mt-4">{"Que s'est il passé ?"}</Title1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-10/12 m-auto text-gray-900"
        >
          <Title2 className="mt-12 mb-8">
            De quel(s) type(s) d’atteinte s’agit-il ?
          </Title2>

          <div className="mt-4">
            <div className="mt-2 space-y-2">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="factType"
                    value="Atteintes aux personnes"
                    ref={register}
                  />
                  <span className="ml-2">Atteintes aux personnes</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="factType"
                    value="Atteinte aux biens"
                    ref={register}
                  />
                  <span className="ml-2">Atteinte aux biens</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="factType"
                    value="Les deux"
                    ref={register}
                  />
                  <span className="ml-2">Les deux</span>
                </label>
              </div>
            </div>
          </div>

          {getValues("factType") === "Atteintes aux personnes" ||
            (getValues("factType") === "Les deux" && (
              <>
                <Title2 className="mt-12 mb-8">
                  De quel(s) type(s) d’atteinte s’agit-il ?
                </Title2>

                <div className="mt-4">
                  <div className="mt-2 space-y-2">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio"
                          name="factType"
                          value="Atteintes aux personnes"
                          ref={register}
                        />
                        <span className="ml-2">Atteintes aux personnes</span>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            ))}

          <div className="flex justify-center w-full my-16 space-x-4">
            <Link href="/index">
              <a>
                <OutlineButton>Précédent</OutlineButton>
              </a>
            </Link>
            <PrimaryButtton>Suivant</PrimaryButtton>
          </div>

          {/* <input name="date" type="date" ref={register} />
          <input name="location" ref={register} />
          <button type="submit">Suivant</button> */}
        </form>
      </div>
    </Layout>
  )
}

export default Step2Page
