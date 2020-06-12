import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useStateMachine } from "little-state-machine"
import update from "lib/pages/form"
import { Layout } from "components/Layout"
import { PrimaryButtton, OutlineButton } from "components/lib"
import { Stepper, Title1, Title2 } from "components/Stepper"

const Step2Page = () => {
  const router = useRouter()
  const { action } = useStateMachine(update)
  const [hasClickedNext, setClickedNext] = useState(false)

  const { handleSubmit, register, setValue, getValues, watch } = useForm({})

  // console.log("getValues", getValues("factType"))

  const factType = watch("factType")
  const factGroups = watch("factGroups")

  console.log("Step2Page -> factGroups", factGroups)

  const onSubmit = (data) => {
    console.log({ data })
    action(data)

    router.push("/forms/freelance/step3")
  }

  const onClickNext = (e) => {
    e.preventDefault()

    if (factGroups?.length) setClickedNext(true)
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper step={2} />

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
          {(getValues("factType") === "Atteintes aux personnes" ||
            getValues("factType") === "Les deux") && (
            <>
              <Title2 className="mt-12 mb-8">
                Veuillez préciser l’atteinte aux personnes :
              </Title2>

              <div className="mt-4">
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="text-indigo-600 form-checkbox"
                        name="factGroups"
                        value="La victime a subi une violence verbale"
                        ref={register}
                      />
                      <span className="ml-2">
                        La victime a subi une violence verbale
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="text-green-500 form-checkbox"
                        name="factGroups"
                        value="La victime a subi une violence physique"
                        ref={register}
                      />
                      <span className="ml-2">
                        La victime a subi une violence physique
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="text-pink-600 form-checkbox"
                        name="factGroups"
                        value="La victime a subi une violence sexuelle"
                        ref={register}
                      />
                      <span className="ml-2">
                        La victime a subi une violence sexuelle
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="text-red-600 form-checkbox"
                        name="factGroups"
                        value="La victime a subi une violence psychologique"
                        ref={register}
                      />
                      <span className="ml-2">
                        La victime a subi une violence psychologique
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="text-orange-600 form-checkbox"
                        name="factGroups"
                        value="La victime a été discriminée"
                        ref={register}
                      />
                      <span className="ml-2">La victime a été discriminée</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="text-teal-600 form-checkbox"
                        name="factGroups"
                        value="La victime a été harcelée"
                        ref={register}
                      />
                      <span className="ml-2">La victime a été harcelée</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="text-purple-600 form-checkbox"
                        name="factGroups"
                        value="Les auteurs n'ont pas respecté les règles du lieu / ont eu un comportement incivique"
                        ref={register}
                      />
                      <span className="ml-2">
                        {
                          "Les auteurs n'ont pas respecté les règles du lieu / ont eu un comportement incivique"
                        }
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="text-yellow-600 form-checkbox"
                        name="factGroups"
                        value="Autres atteintes aux personnes"
                        ref={register}
                      />
                      <span className="ml-2">
                        Autres atteintes aux personnes
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {!hasClickedNext && factGroups?.length && (
                <PrimaryButtton className="mt-8" onClick={onClickNext}>
                  Suivant
                </PrimaryButtton>
              )}
            </>
          )}

          {hasClickedNext && (
            <>
              <Title2 className="mt-12 mb-8">
                Veuillez préciser les faits :
              </Title2>

              {factGroups.includes(
                "La victime a subi une violence verbale",
              ) && (
                <>
                  <b>La victime a subi une violence verbale</b>
                  <div className="mt-4">
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Injure et provocation"
                            ref={register}
                          />
                          <span className="ml-2">Injure et provocation</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Outrage"
                            ref={register}
                          />
                          <span className="ml-2">Outrage</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Propos discriminatoire se rapportant à la race, l’ethnie, la nation, le pays, la religion, le sexe"
                            ref={register}
                          />
                          <span className="ml-2">
                            Propos discriminatoire se rapportant à la race,
                            l’ethnie, la nation, le pays, la religion, le sexe
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Menace de mort et d’atteinte à l’intégrité physique d’un personnel de santé ou de sa famille en raison de la connaissance de sa qualité par l’auteur"
                            ref={register}
                          />
                          <span className="ml-2">
                            Menace de mort et d’atteinte à l’intégrité physique
                            d’un personnel de santé ou de sa famille en raison
                            de la connaissance de sa qualité par l’auteur
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Menace grave d’atteinte aux biens d’un personnel de santé ou de sa famille en raison de la connaissance de sa qualité"
                            ref={register}
                          />
                          <span className="ml-2">
                            Menace grave d’atteinte aux biens d’un personnel de
                            santé ou de sa famille en raison de la connaissance
                            de sa qualité
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {factGroups.includes(
                "La victime a subi une violence physique",
              ) && (
                <>
                  <b>La victime a subi une violence physique</b>

                  <div className="mt-4">
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Maltraitance volontaire ou par négligence sans but d’obtenir un acte ou une abstention de la personne"
                            ref={register}
                          />
                          <span className="ml-2">
                            Maltraitance volontaire ou par négligence sans but
                            d’obtenir un acte ou une abstention de la personne
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Maltraitance volontaire ou par négligence sans but d’obtenir un acte ou une abstention de la personne"
                            ref={register}
                          />
                          <span className="ml-2">
                            Maltraitance volontaire ou par négligence sans but
                            d’obtenir un acte ou une abstention de la personne
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Violence involontaire"
                            ref={register}
                          />
                          <span className="ml-2">Violence involontaire</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Violence volontaire avec arme (par nature ou par destination)"
                            ref={register}
                          />
                          <span className="ml-2">
                            Violence volontaire avec arme (par nature ou par
                            destination)
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {factGroups.includes(
                "La victime a subi une violence sexuelle",
              ) && (
                <>
                  <b>La victime a subi une violence sexuelle</b>

                  <div className="mt-4">
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Exhibition sexuelle"
                            ref={register}
                          />
                          <span className="ml-2">Exhibition sexuelle</span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Agression sexuelle autre que le viol"
                            ref={register}
                          />
                          <span className="ml-2">
                            Agression sexuelle autre que le viol
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Viol"
                            ref={register}
                          />
                          <span className="ml-2">Viol</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {factGroups.includes(
                "La victime a subi une violence psychologique",
              ) && (
                <>
                  <b>La victime a subi une violence psychologique</b>

                  <div className="mt-4">
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="toto"
                            ref={register}
                          />
                          <span className="ml-2">toto</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {factGroups.includes("La victime a été discriminée") && (
                <>
                  <b>La victime a été discriminée</b>

                  <div className="mt-4">
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="toto"
                            ref={register}
                          />
                          <span className="ml-2">toto</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {factGroups.includes("La victime a été harcelée") && (
                <>
                  <b>La victime a été harcelée</b>

                  <div className="mt-4">
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Injure et  provocation"
                            ref={register}
                          />
                          <span className="ml-2">Injure et provocation</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {factGroups.includes(
                "Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique",
              ) && (
                <>
                  <b>
                    Les auteurs n’ont pas respecté les règles du lieu / ont eu
                    un comportement incivique
                  </b>

                  <div className="mt-4">
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Injure et  provocation"
                            ref={register}
                          />
                          <span className="ml-2">Injure et provocation</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {factGroups.includes("Autres atteintes aux personnes") && (
                <>
                  <b>Autres atteintes aux personnes</b>

                  <div className="mt-4">
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Injure et  provocation"
                            ref={register}
                          />
                          <span className="ml-2">Injure et provocation</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {factGroups.includes(
                "La victime a subi une violence verbale",
              ) && (
                <>
                  <b>La victime a subi une violence psychologique</b>

                  <div className="mt-4">
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Injure et  provocation"
                            ref={register}
                          />
                          <span className="ml-2">Injure et provocation</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {factGroups.includes(
                "La victime a subi une violence verbale",
              ) && (
                <>
                  <b>La victime a subi une violence psychologique</b>

                  <div className="mt-4">
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="text-indigo-600 form-checkbox"
                            name="factSpokenViolence"
                            value="Injure et  provocation"
                            ref={register}
                          />
                          <span className="ml-2">Injure et provocation</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-center w-full my-16 space-x-4">
                <Link href="/index">
                  <a>
                    <OutlineButton>Précédent</OutlineButton>
                  </a>
                </Link>
                <PrimaryButtton>Suivant</PrimaryButtton>
              </div>
            </>
          )}

          {/* <input name="date" type="date" ref={register} />
          <input name="location" ref={register} />
          <button type="submit">Suivant</button> */}
        </form>
      </div>
    </Layout>
  )
}

export default Step2Page
