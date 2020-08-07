import { Layout } from "components/Layout"
import {
  Counter,
  Options,
  OutlineButton,
  PrimaryButtton,
  Title1,
  Title2,
} from "components/lib"
import { Stepper } from "components/Stepper"
import { useScrollTop } from "hooks/useScrollTop"
import update from "lib/pages/form"
import { useStateMachine } from "little-state-machine"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Select from "react-select"

const victimTypeOptions = [
  "Accompagnant/Visiteur/Famille",
  "Agent de sécurité-sûreté",
  "Détenu",
  "Établissement",
  "Étudiant en santé",
  "Patient/Résident",
  "Personnel administratif et technique",
  "Personnel de santé",
  "Prestataire extérieur",
].map((curr) => ({ label: curr, value: curr }))

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
].map((curr) => ({ label: curr, value: curr }))

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
].map((curr) => ({ label: curr, value: curr }))

const Step4Page = () => {
  useScrollTop()
  const router = useRouter()
  const { action, state } = useStateMachine(update)
  const [phase, setPhase] = useState(1)
  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      discernmentTroubles: state?.form?.discernmentTroubles,
      pursuit: state?.form?.pursuit,
      pursuitBy: state?.form?.pursuitBy,
      thirdParty: state?.form?.thirdParty,
    },
  })
  // const [victimsSize, setVictimsSize] = useState(1)
  const [stateForm, setStateForm] = useState({
    ITTDays: state?.form?.ITTDays,
    authorAge: state?.form?.authorAge && {
      label: state?.form?.authorAge,
      value: state?.form?.authorAge,
    },
    authorGender: state?.form?.authorGender && {
      label: state?.form?.authorGender,
      value: state?.form?.authorGender,
    },
    authorType: state?.form?.authorType && {
      label: state?.form?.authorType,
      value: state?.form?.authorType,
    },
    hospitalizationDays: state?.form?.hospitalizationDays,
    sickLeaveDays: state?.form?.sickLeaveDays,
    victimAge: state?.form?.victimAge && {
      label: state?.form?.victimAge,
      value: state?.form?.victimAge,
    },
    victimGender: state?.form?.victimGender && {
      label: state?.form?.victimGender,
      value: state?.form?.victimGender,
    },
    victimProfession: state?.form?.victimProfession && {
      label: state?.form?.victimProfession,
      value: state?.form?.victimProfession,
    },
    victimType: state?.form?.victimType && {
      label: state?.form?.victimType,
      value: state?.form?.victimType,
    },
  })

  useEffect(() => {
    // Extra field in form to store the value of selects
    register({ name: `victimType` })
    register({ name: `victimGender` })
    register({ name: `victimAge` })
    register({ name: `victimProfession` })
    register({ name: `authorType` })
    register({ name: `authorGender` })
    register({ name: `authorAge` })
    register({ name: `sickLeaveDays` })
    register({ name: `hospitalizationDays` })
    register({ name: `ITTDays` })
  }, [register])

  const onSubmit = (data) => {
    action(data)
    router.push("/forms/freelance/step5")
  }

  const onChange = (name, selectedOption) => {
    // Needs to sync specifically the value to the react-select as well
    setStateForm((state) => ({ ...state, [name]: selectedOption }))

    // Needs transformation between format of react-select to expected format for API call
    setValue(name, selectedOption?.value || null)
  }

  const onCounterChange = (name, selectedOption) => {
    // Needs to sync specifically the value to the react-select as well
    setStateForm((state) => ({ ...state, [name]: selectedOption }))

    // Needs transformation between format of react-select to expected format for API call
    setValue(name, selectedOption || null)
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
                <span className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase">
                  &nbsp;
                </span>

                <div className="">
                  <Select
                    options={victimTypeOptions}
                    placeholder="Choisir..."
                    value={stateForm?.victimType || ""}
                    onChange={(selectedOption) =>
                      onChange("victimType", selectedOption)
                    }
                    isClearable={true}
                    styles={customStyles}
                  />
                </div>
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
                  ].map((curr) => ({ label: curr, value: curr }))}
                  placeholder="Choisir..."
                  value={stateForm?.victimGender || ""}
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
                  ].map((curr) => ({ label: curr, value: curr }))}
                  placeholder="Choisir..."
                  value={stateForm?.victimAge || ""}
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
                    setValue={(value) =>
                      onCounterChange("sickLeaveDays", value)
                    }
                  />
                  {" jours d'arrêt de travail"}
                </div>
                <div className="text-center">
                  <Counter
                    value={stateForm?.hospitalizationDays}
                    setValue={(value) =>
                      onCounterChange("hospitalizationDays", value)
                    }
                  />
                  {" jours d'hospitalisation"}
                </div>
                <div className="text-center">
                  <Counter
                    value={stateForm?.ITTDays}
                    setValue={(value) => onCounterChange("ITTDays", value)}
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
              <Link href="/forms/freelance/step3">
                <a>
                  <OutlineButton>Précédent</OutlineButton>
                </a>
              </Link>

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
                    placeholder="Choisir..."
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
                    ].map((curr) => ({ label: curr, value: curr }))}
                    placeholder="Choisir..."
                    value={
                      state?.form?.authorGender && {
                        label: state?.form?.authorGender,
                        value: state?.form?.authorGender,
                      }
                    }
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
                    ].map((curr) => ({ label: curr, value: curr }))}
                    placeholder="Choisir..."
                    value={
                      state?.form?.authorAge && {
                        label: state?.form?.authorAge,
                        value: state?.form?.authorAge,
                      }
                    }
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
                    <OutlineButton type="button">Précédent</OutlineButton>
                  </a>
                </Link>
                <PrimaryButtton>Suivant</PrimaryButtton>
              </div>
            </>
          )}
        </form>
      </div>
    </Layout>
  )
}

export default Step4Page
