import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useStateMachine } from "little-state-machine"
import update from "lib/pages/form"
import { Layout } from "components/Layout"
import { Counter, Options, PrimaryButtton, OutlineButton } from "components/lib"
import { Stepper, Title1, Title2 } from "components/Stepper"
import Select from "react-select"

function createArrayWithNumbers(length) {
  return Array.from({ length }, (_, k) => k)
}

const victimProfileOptions = [
  "Accompagnant/Visiteur/Famille",
  "Agent de sécurité-sûreté",
  "Détenu",
  "Établissement",
  "Étudiant en santé",
  "Patient/Résident",
  "Personnel administratif et technique",
  "Personnel de santé",
  "Prestataire extérieur",
].map((curr) => ({ value: curr, label: curr }))

const victimJobsOptions = [
  "Aide-soignant",
  "Ambulancier",
  "Assistant dentaire",
  "Audioprothésiste",
  "Auxiliaire de puériculture",
  "Chiropracteur",
  "Chirurgien-dentiste",
  "Diététicien",
  "Ergothérapeute",
  "Infirmier",
  "Manipulateur d'électroradiologie médicale",
  "Masseur-kinésithérapeute",
  "Médecin",
  "Opticien-lunetier",
  "Orthophoniste",
  "Orthoptiste",
  "Ostéopathe",
  "Pédicure-podologue",
  "Pharmacien",
  "Préparateur en pharmacie et en pharmacie hospitalière",
  "Prothésiste et orthésiste",
  "Psychologue",
  "Psychomotricien",
  "Psychothérapeute",
  "Sage-femme",
  "Technicien de laboratoire médical",
].map((curr) => ({ value: curr, label: curr }))

const authorProfileOptions = [
  "Accompagnant/Visiteur/Famille",
  "Agent de sécurité-sûreté",
  "Détenu",
  "Étudiant en santé",
  "Inconnu",
  "Patient/Résident",
  "Personnel administratif et technique",
  "Personnel de santé",
  "Prestataire extérieur",
].map((curr) => ({ value: curr, label: curr }))

const Step4Page = () => {
  const router = useRouter()
  const { action } = useStateMachine(update)
  const [phase, setPhase] = useState(1)
  const { handleSubmit, register, setValue, getValues } = useForm({})
  // const [victimsSize, setVictimsSize] = useState(1)
  const [stateForm, setStateForm] = useState({
    sickLeaveDays: 0,
    hospitalizationDays: 0,
    ITTDays: 0,
  })

  useEffect(() => {
    document.body.focus()
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Extra field in form to store the value of selects

    register({ name: `victimType` })
    register({ name: `victimGender` })
    register({ name: `victimAge` })
    register({ name: `victimProfession` })
  }, [register])

  const onSubmit = (data) => {
    console.log({ data })
    action(data)

    router.push("/forms/freelance/step5")
  }

  const onChange = (name, selectedOption) => {
    // Needs to sync specifically the value to the react-select as well
    setStateForm((state) => ({ ...state, [name]: selectedOption }))

    // Needs transformation between format of react-select to expected format for API call
    setValue(name, selectedOption?.value || null)
  }

  const customStyles = {
    container: (styles) => ({
      ...styles,
      flexGrow: 1,
    }),
    menu: (styles) => ({
      ...styles,
      textAlign: "left",
    }),
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper step={4} />

        <Title1 className="mt-4">
          Qui a été <b>victime</b> ?
        </Title1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-10/12 m-auto text-gray-900"
        >
          <>
            <Title2 className="mt-8 mb-4">1ère victime</Title2>

            <b>Profil</b>

            <div className="flex space-x-6">
              <div className="flex-1">
                <label className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase">
                  &nbsp;
                </label>

                <Select
                  options={victimProfileOptions}
                  placeholder="Choisir une profession"
                  value={stateForm?.victimType || ""}
                  onChange={(selectedOption) =>
                    onChange("victimType", selectedOption)
                  }
                  isClearable={true}
                  styles={customStyles}
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase">
                  de genre
                </label>
                <Select
                  options={[
                    "Masculin",
                    "Féminin",
                    "Autre genre",
                  ].map((curr) => ({ value: curr, label: curr }))}
                  placeholder="Choisir..."
                  value={stateForm?.victimGender}
                  onChange={(selectedOption) =>
                    onChange("victimGender", selectedOption)
                  }
                  isClearable={true}
                  styles={customStyles}
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase">
                  et âgé de
                </label>
                <Select
                  options={[
                    "- de 18 ans",
                    "+ de 18 ans",
                    "non déterminable",
                  ].map((curr) => ({ value: curr, label: curr }))}
                  placeholder="Choisir..."
                  value={stateForm?.victimAge}
                  onChange={(selectedOption) =>
                    onChange("victimAge", selectedOption)
                  }
                  isClearable={true}
                  styles={customStyles}
                />
              </div>
            </div>

            <div className="mt-12">
              <b>
                Conséquences d’éventuelles blessures physiques et/ou psychiques
              </b>
              <div className="flex items-center justify-around mt-12">
                <div className="text-center">
                  <Counter
                    value={stateForm?.sickLeaveDays}
                    setValue={(value) => onChange("sickLeaveDays", value)}
                  />
                  {" jours d'arrêt de travail"}
                </div>
                <div className="text-center">
                  <Counter
                    value={stateForm?.hospitalizationDays}
                    setValue={(value) => onChange("hospitalizationDays", value)}
                  />
                  {" jours d'hospitalisation"}
                </div>
                <div className="text-center">
                  <Counter
                    value={stateForm?.ITTDays}
                    setValue={(value) => onChange("ITTDays", value)}
                  />
                  {" jours d'ITT"}
                </div>
              </div>
            </div>

            <Title2 className="mt-12">
              Y’a-t-il eu des poursuites judiciaires ?
            </Title2>

            <div className="mt-4">
              <div className="block mt-3">
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="pursuit"
                        value="Non"
                        ref={register}
                      />
                      <span className="ml-2">Non</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="pursuit"
                        value="Main courante"
                        ref={register}
                      />
                      <span className="ml-2">Main courante</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="pursuit"
                        value="Plainte"
                        ref={register}
                      />
                      <span className="ml-2">Plainte</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio"
                        name="pursuit"
                        value="Autre"
                        ref={register}
                      />
                      <span className="ml-2">Autre</span>
                    </label>
                  </div>
                </div>

                <div>
                  <Title2 className="mt-12">Par...</Title2>

                  <Options
                    name="pursuitBy"
                    values={[
                      "La (les) victime(s)",
                      "L'établissement",
                      "L'ordre",
                    ]}
                    register={register}
                  />
                </div>
              </div>
            </div>
          </>
          {phase === 1 && (
            <div className="flex justify-center w-full my-16 space-x-4">
              <PrimaryButtton onClick={() => setPhase(2)}>
                Suivant
              </PrimaryButtton>
            </div>
          )}
          {phase >= 2 && (
            <>
              <Title1 className="mt-16">
                Qui a été <b>auteur</b> de la violence ?
              </Title1>
              <Title2 className="mt-8 mb-4">1er auteur</Title2>

              <b>Profil</b>

              <div className="flex space-x-6">
                <div className="flex-1">
                  <label className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase">
                    &nbsp;
                  </label>

                  <Select
                    options={authorProfileOptions}
                    placeholder="Choisir une profession"
                    value={stateForm?.authorType || ""}
                    onChange={(selectedOption) =>
                      onChange("authorType", selectedOption)
                    }
                    isClearable={true}
                    styles={customStyles}
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase">
                    de genre
                  </label>
                  <Select
                    options={[
                      "Masculin",
                      "Féminin",
                      "Autre genre",
                    ].map((curr) => ({ value: curr, label: curr }))}
                    placeholder="Choisir..."
                    value={stateForm?.authorGender}
                    onChange={(selectedOption) =>
                      onChange("authorGender", selectedOption)
                    }
                    isClearable={true}
                    styles={customStyles}
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase">
                    et âgé de
                  </label>
                  <Select
                    options={[
                      "- de 18 ans",
                      "+ de 18 ans",
                      "non déterminable",
                    ].map((curr) => ({ value: curr, label: curr }))}
                    placeholder="Choisir..."
                    value={stateForm?.authorAge}
                    onChange={(selectedOption) =>
                      onChange("authorAge", selectedOption)
                    }
                    isClearable={true}
                    styles={customStyles}
                  />
                </div>
              </div>

              <div className="mt-12">
                <b>Altération du discernement</b> (optionnel)
                <Options
                  name="discernmentTroubles"
                  values={[
                    "Trouble psychique ou neuropsychique",
                    "Prise d’alcool",
                    "Prise de produits stupéfiants",
                    "Prise de médicaments",
                    "Effet de l’anesthésie",
                  ]}
                  register={register}
                />
              </div>
              {phase === 2 && (
                <div className="flex justify-center w-full my-16 space-x-4">
                  <PrimaryButtton onClick={() => setPhase(3)}>
                    Suivant
                  </PrimaryButtton>
                </div>
              )}
            </>
          )}

          {phase === 3 && (
            <>
              <Title1 className="mt-16">
                Quelles ont été les <b>autres personnes</b> impliquées ?
              </Title1>
              <Title2 className="mt-8 mb-4">
                Intervention de tiers (optionnel)
              </Title2>{" "}
              <Options
                name="thirdParty"
                values={[
                  "Personnel hospitalier",
                  "Service de sécurité interne",
                  "Forces de l'ordre",
                  "Autre",
                ]}
                register={register}
              />
              <div className="flex justify-center w-full my-16 space-x-4">
                <Link href="/forms/freelance/step3">
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

export default Step4Page
