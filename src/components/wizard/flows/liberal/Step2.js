import { yupResolver } from "@hookform/resolvers"
import React from "react"
import * as yup from "yup"

import { Group, Groups, Option, Options, Title2 } from "@/components/lib"
import Info from "@/components/svg/info"
import FormComponent from "@/components/wizard/FormComponent"
import { useDeclarationForm } from "@/hooks/useDeclarationContext"
import { useScrollTop } from "@/hooks/useScrollTop"
import { factPersonsGroups, factGoodsGroups } from "@/utils/options"

const schema = yup.object({
  factTypes: yup
    .array(yup.string())
    .min(1, "Aucun type de fait n'a été coché."),
  fgDeteriorations: yup.array(yup.string()).default(() => []),
  fgGroups: yup.array(yup.string()).default(() => []),
  fgOthers: yup.array(yup.string()).default(() => []),
  fgStealWithBreakins: yup.array(yup.string()).default(() => []),
  fgStealWithoutBreakins: yup.array(yup.string()).default(() => []),
  fpDiscriminations: yup.array(yup.string()).default(() => []),
  fpGroups: yup.array(yup.string()).default(() => []),
  fpNoRespects: yup.array(yup.string()).default(() => []),
  fpOthers: yup.array(yup.string()).default(() => []),

  fpPhysicalViolences: yup.array(yup.string()).default(() => []),
  fpPhysicalViolencesPrecision: yup
    .string()
    .when("fpPhysicalViolences", (fpPhysicalViolences, schema) => {
      return fpPhysicalViolences.includes("Autre fait qualifié de crime")
        ? schema
            .required("Le champ Autre fait qualifié de crime doit être précisé")
            .min(1, "Le champ Autre fait qualifié de crime doit être précisé")
            .max(
              255,
              ({ max }) =>
                `Le champ Autre fait ne doit pas dépasser ${max} caractères`,
            )
        : yup
            .string()
            .nullable(true)
            .transform(() => "")
    }),
  fpPsychologicalViolences: yup.array(yup.string()).default(() => []),
  fpSexualViolences: yup.array(yup.string()).default(() => []),
  fpSpokenViolences: yup.array(yup.string()).default(() => []),
})

const Step2Page = () => {
  useScrollTop()
  const {
    onSubmit: originalOnSubmit,
    handleSubmit,
    watch,
    register,
    setError,
    setValue,
    getValues,
  } = useDeclarationForm({
    defaultValuesFromState: (state) => ({
      factTypes: state?.steps?.facts?.factTypes,
      fgDeteriorations: state?.steps?.facts?.fgDeteriorations,
      fgGroups: state?.steps?.facts?.fgGroups,
      fgOthers: state?.steps?.facts?.fgOthers,
      fgStealWithBreakins: state?.steps?.facts?.fgStealWithBreakins,
      fgStealWithoutBreakins: state?.steps?.facts?.fgStealWithoutBreakins,
      fpDiscriminations: state?.steps?.facts?.fpDiscriminations,
      fpGroups: state?.steps?.facts?.fpGroups,
      fpNoRespects: state?.steps?.facts?.fpNoRespects,
      fpOthers: state?.steps?.facts?.fpOthers,
      fpPhysicalViolences: state?.steps?.facts?.fpPhysicalViolences,
      fpPhysicalViolencesPrecision:
        state?.steps?.facts?.fpPhysicalViolencesPrecision,
      fpPsychologicalViolences: state?.steps?.facts?.fpPsychologicalViolences,
      fpSexualViolences: state?.steps?.facts?.fpSexualViolences,
      fpSpokenViolences: state?.steps?.facts?.fpSpokenViolences,
    }),
    resolver: yupResolver(schema),
  })

  const factTypes = watch("factTypes")
  const fpGroups = watch("fpGroups")
  const fgGroups = watch("fgGroups")

  const onSubmit = (data) => {
    if (data?.factTypes?.includes("Atteinte aux personnes")) {
      const hasClicked =
        data?.fpDiscriminations.length ||
        data?.fpNoRespects.length ||
        data?.fpOthers.length ||
        data?.fpPhysicalViolences.length ||
        data?.fpPsychologicalViolences.length ||
        data?.fpSexualViolences.length ||
        data?.fpSpokenViolences.length

      if (!hasClicked) {
        setError("global", {
          message: "Il faut au moins renseigner une atteinte aux personnes.",
          type: "manual",
        })
        return
      }
    }
    if (data?.factTypes?.includes("Atteinte aux biens")) {
      const hasClicked =
        data?.fgDeteriorations.length ||
        data?.fgOthers.length ||
        data?.fgStealWithBreakins.length ||
        data?.fgStealWithoutBreakins.length

      if (!hasClicked) {
        setError("global", {
          message: "Il faut au moins renseigner une atteinte aux biens.",
          type: "manual",
        })

        return
      }
    }

    originalOnSubmit(data)
  }

  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
      title="Où la violence a-t-elle eu lieu ?"
    >
      <Title2 className="mt-12 mb-6">
        De quel(s) type(s) d’atteinte s’agit-il ?
      </Title2>

      <p className="mb-8">
        <i>
          Vous pouvez être victime des deux types d’atteintes (cocher alors les
          deux cases).
        </i>
      </p>

      <div className="mt-4">
        <div className="mt-2 space-y-2">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                name="factTypes"
                value="Atteinte aux personnes"
                ref={register}
              />
              <span className="ml-2">Atteinte aux personnes</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                name="factTypes"
                value="Atteinte aux biens"
                ref={register}
              />
              <span className="ml-2">Atteinte aux biens</span>
            </label>
          </div>
        </div>
      </div>
      {factTypes?.includes("Atteinte aux personnes") && (
        <>
          <Title2 className="mt-12 mb-8">
            Veuillez préciser l’atteinte aux personnes :
          </Title2>

          <Groups name="fpGroups" register={register}>
            <Group
              value={factPersonsGroups.fpSpokenViolences.label}
              color="text-indigo-600"
            />
            <Group
              value={factPersonsGroups.fpPhysicalViolences.label}
              color="text-green-500"
            />
            <Group
              value={factPersonsGroups.fpSexualViolences.label}
              color="text-pink-600"
            />
            <Group
              value={factPersonsGroups.fpPsychologicalViolences.label}
              color="text-red-600"
            />
            <Group
              value={factPersonsGroups.fpDiscriminations.label}
              color="text-orange-600"
            />
            <Group
              value={factPersonsGroups.fpNoRespects.label}
              color="text-purple-600"
            />
            <Group
              value={factPersonsGroups.fpOthers.label}
              color="text-yellow-600"
            />
          </Groups>
        </>
      )}
      {factTypes?.includes("Atteinte aux biens") && (
        <>
          <Title2 className="mt-12 mb-8">
            Veuillez préciser l’atteinte aux biens :
          </Title2>

          <Groups name="fgGroups" register={register}>
            <Group
              value={factGoodsGroups.fgDeteriorations.label}
              color="text-indigo-600"
            />
            <Group
              value={factGoodsGroups.fgStealWithoutBreakins.label}
              color="text-green-500"
            />
            <Group
              value={factGoodsGroups.fgStealWithBreakins.label}
              color="text-pink-600"
            />
            <Group
              value={factGoodsGroups.fgOthers.label}
              color="text-yellow-600"
            />
          </Groups>
        </>
      )}
      {factTypes?.includes("Atteinte aux personnes") && !!fpGroups?.length && (
        <>
          <Title2 className="mt-12 mb-8">
            {"Veuillez préciser les faits de l'atteinte aux personnes :"}
          </Title2>
          {fpGroups.includes(factPersonsGroups.fpSpokenViolences.label) && (
            <>
              <b>{factPersonsGroups.fpSpokenViolences.label}</b>

              <Options
                name="fpSpokenViolences"
                color="text-indigo-600"
                register={register}
              >
                {factPersonsGroups.fpSpokenViolences.options.map((option) => (
                  <Option key={option.value} {...option} />
                ))}
              </Options>
            </>
          )}
          {fpGroups.includes(factPersonsGroups.fpPhysicalViolences.label) && (
            <>
              <b>{factPersonsGroups.fpPhysicalViolences.label}</b>

              <Options
                name="fpPhysicalViolences"
                color="text-green-500"
                register={register}
                setValue={setValue}
                getValues={getValues}
              >
                {factPersonsGroups.fpPhysicalViolences.options.map((option) => (
                  <Option key={option.value} {...option} />
                ))}
              </Options>
            </>
          )}

          {fpGroups.includes(factPersonsGroups.fpSexualViolences.label) && (
            <>
              <b>{factPersonsGroups.fpSexualViolences.label}</b>

              <Options
                name="fpSexualViolences"
                color="text-pink-600"
                register={register}
              >
                {factPersonsGroups.fpSexualViolences.options.map((option) => (
                  <Option key={option.value} {...option} />
                ))}
              </Options>
            </>
          )}

          {fpGroups.includes(
            factPersonsGroups.fpPsychologicalViolences.label,
          ) && (
            <>
              <b>{factPersonsGroups.fpPsychologicalViolences.label}</b>

              <Options
                name="fpPsychologicalViolences"
                color="text-red-600"
                register={register}
              >
                {factPersonsGroups.fpPsychologicalViolences.options.map(
                  (option) => (
                    <Option key={option.value} {...option} />
                  ),
                )}
              </Options>
            </>
          )}

          {fpGroups.includes(factPersonsGroups.fpDiscriminations.label) && (
            <>
              <b>{factPersonsGroups.fpDiscriminations.label}</b>

              <Options
                name="fpDiscriminations"
                color="text-orange-600"
                register={register}
              >
                {factPersonsGroups.fpDiscriminations.options.map((option) => (
                  <Option key={option.value} {...option} />
                ))}
              </Options>
            </>
          )}

          {fpGroups.includes(factPersonsGroups.fpNoRespects.label) && (
            <>
              <b>{factPersonsGroups.fpNoRespects.label}</b>

              <Options
                name="fpNoRespects"
                color="text-purple-600"
                register={register}
              >
                {factPersonsGroups.fpNoRespects.options.map((option) => (
                  <Option key={option.value} {...option} />
                ))}
              </Options>
            </>
          )}
          {fpGroups.includes(factPersonsGroups.fpOthers.label) && (
            <>
              <b>{factPersonsGroups.fpOthers.label}</b>

              <Options
                name="fpOthers"
                color="text-yellow-600"
                register={register}
              >
                {factPersonsGroups.fpOthers.options.map((option) => (
                  <Option key={option.value} {...option} />
                ))}
              </Options>
            </>
          )}
        </>
      )}
      {factTypes?.includes("Atteinte aux biens") && !!fgGroups?.length && (
        <>
          <Title2 className="mt-12 mb-8">
            {"Veuillez préciser les faits de l'atteinte aux biens :"}
          </Title2>

          {fgGroups.includes(factGoodsGroups.fgDeteriorations.label) && (
            <>
              <b>{factGoodsGroups.fgDeteriorations.label}</b>

              <Options
                name="fgDeteriorations"
                color="text-indigo-600"
                register={register}
              >
                {factGoodsGroups.fgDeteriorations.options.map((option) => (
                  <Option key={option.value} {...option} />
                ))}
              </Options>
            </>
          )}

          {fgGroups.includes(factGoodsGroups.fgStealWithoutBreakins.label) && (
            <>
              <b>{factGoodsGroups.fgStealWithoutBreakins.label}</b>

              <Options
                name="fgStealWithoutBreakins"
                color="text-green-600"
                register={register}
              >
                {factGoodsGroups.fgStealWithoutBreakins.options.map(
                  (option) => (
                    <Option key={option.value} {...option} />
                  ),
                )}
              </Options>
            </>
          )}

          {fgGroups.includes(factGoodsGroups.fgStealWithBreakins.label) && (
            <>
              <b>
                {factGoodsGroups.fgStealWithBreakins.label}{" "}
                <Info
                  title={
                    "Est assimilé à l'effraction l'usage de fausses clefs, de clefs indûment obtenues ou de tout instrument (dont badge) pouvant être frauduleusement employé pour actionner un dispositif de fermeture sans le forcer ni le dégrader."
                  }
                />
              </b>

              <Options
                name="fgStealWithBreakins"
                color="text-pink-600"
                register={register}
              >
                {factGoodsGroups.fgStealWithBreakins.options.map((option) => (
                  <Option key={option.value} {...option} />
                ))}
              </Options>
            </>
          )}

          {fgGroups.includes(factGoodsGroups.fgOthers.label) && (
            <>
              <b>{factGoodsGroups.fgOthers.label}</b>

              <Options
                name="fgOthers"
                color="text-yellow-600"
                register={register}
              >
                {factGoodsGroups.fgOthers.options.map((option) => (
                  <Option key={option.value} {...option} />
                ))}
              </Options>
            </>
          )}
        </>
      )}
    </FormComponent>
  )
}

export default Step2Page
