import React from "react"
import { useToasts } from "react-toast-notifications"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers"
import { Option, Options } from "@/components/lib"
import Info from "@/components/svg/info"
import FormComponent from "@/components/wizard/FormComponent"
import { useDeclarationForm } from "@/hooks/useDeclarationContext"
import { useScrollTop } from "@/hooks/useScrollTop"
import { hasData } from "@/utils/misc"

import { toastConfig } from "../../../../config"
import { reasons } from "@/utils/options"

const schema = yup.object({
  rOthersPrecision: yup.string().when("rOthers", (rOthers, schema) => {
    return rOthers.includes("Autre")
      ? schema
          .required("Le champ Autre doit être précisé")
          .min(1, "Le champ Autre doit être précisé")
          .max(
            255,
            ({ max }) =>
              `Le champ Autre ne doit pas dépasser ${max} caractères`,
          )
      : yup
          .string()
          .nullable(true)
          .transform(() => "")
  }),
})

const Step3Page = () => {
  useScrollTop()
  const {
    onSubmit: originalOnSubmit,
    handleSubmit,
    setValue,
    getValues,
    watch,
    register,
  } = useDeclarationForm({
    defaultValuesFromState: (state) => ({
      rCausePatients: state?.steps?.reasons?.rCausePatients,
      rCauseProfessionals: state?.steps?.reasons?.rCauseProfessionals,
      rDeficientCommunications: state?.steps?.reasons?.rDeficientCommunications,
      rDiscords: state?.steps?.reasons?.rDiscords,
      rFalsifications: state?.steps?.reasons?.rFalsifications,
      rLifeRules: state?.steps?.reasons?.rLifeRules,
      rNotApparent: state?.steps?.reasons?.rNotApparent,
      rOthers: state?.steps?.reasons?.rOthers,
      rOthersPrecision: state?.steps?.reasons?.rOthersPrecision,
    }),
    resolver: yupResolver(schema),
  })

  const { addToast } = useToasts()

  const watchReasonNotApparent = watch("rNotApparent")

  React.useEffect(() => {
    if (watchReasonNotApparent) {
      setValue("rCausePatients", [])
      setValue("rCauseProfessionals", [])
      setValue("rDeficientCommunications", [])
      setValue("rDiscords", [])
      setValue("rFalsifications", [])
      setValue("rLifeRules", [])
      setValue("rOthers", [])
      setValue("rOthersPrecision", "")
    }
  }, [watchReasonNotApparent, setValue])

  const onSubmit = (data) => {
    if (!hasData(data)) {
      addToast(
        <div className="text-lg">
          {
            'Vous devez renseigner un motif ou bien cocher la case "Pas de motif apparent"'
          }
        </div>,
        toastConfig.error,
      )

      return
    }

    originalOnSubmit(data)
  }

  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
      title="Quel(s) étai(en)t le(s) motif(s) apparent(s) de la violence ?"
    >
      <div className="mt-12">
        <b>{reasons.rCausePatients.label}</b>

        <Options
          name="rCausePatients"
          disabled={!!watchReasonNotApparent}
          register={register}
          color="text-indigo-600"
        >
          {reasons.rCausePatients.options.map((option) => (
            <Option key={option.value} {...option} />
          ))}
        </Options>
      </div>

      <div className="mt-4">
        <b>{reasons.rCausePatients.label}</b>

        <Options
          name="rCauseProfessionals"
          disabled={!!watchReasonNotApparent}
          register={register}
          color="text-green-500"
        >
          {reasons.rCauseProfessionals.options.map((option) => (
            <Option key={option.value} {...option} />
          ))}
        </Options>
      </div>

      <div className="mt-4">
        <b>{reasons.rDiscords.label}</b>

        <Options
          name="rDiscords"
          disabled={!!watchReasonNotApparent}
          register={register}
          color="text-pink-600"
        >
          {reasons.rDiscords.options.map((option) => (
            <Option key={option.value} {...option} />
          ))}
        </Options>
      </div>

      <div className="mt-4">
        <b>{reasons.rLifeRules.label}</b>

        <Options
          name="rLifeRules"
          disabled={!!watchReasonNotApparent}
          register={register}
          color="text-red-600"
        >
          {reasons.rLifeRules.options.map((option) => (
            <Option key={option.value} {...option} />
          ))}
        </Options>
      </div>

      <div className="mt-4">
        <b>{reasons.rFalsifications.label}</b>

        <Options
          name="rFalsifications"
          disabled={!!watchReasonNotApparent}
          register={register}
          color="text-orange-600"
        >
          {reasons.rFalsifications.options.map((option) => (
            <Option key={option.value} {...option} />
          ))}
        </Options>
      </div>

      <div className="mt-4">
        <b>{reasons.rDeficientCommunications.label}</b>

        <Options
          name="rDeficientCommunications"
          disabled={!!watchReasonNotApparent}
          register={register}
          color="text-teal-600"
        >
          {reasons.rDeficientCommunications.options.map((option) => (
            <Option key={option.value} {...option} />
          ))}
        </Options>
      </div>

      <div className="mt-4">
        <b>{reasons.rOthers.label}</b>

        <Options
          name="rOthers"
          disabled={!!watchReasonNotApparent}
          register={register}
          color="text-purple-600"
          setValue={setValue}
          getValues={getValues}
        >
          {reasons.rOthers.options.map((option) => (
            <Option key={option.value} {...option} />
          ))}
        </Options>
      </div>

      <div className="mt-4">
        <b />
        <div className="block mt-3">
          <div className="mt-2 space-y-2">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-check"
                  name="rNotApparent"
                  ref={register}
                />
                <span className="mx-2">Pas de motif apparent</span>
                <Info
                  title="Ex :
- Dans le cadre d’un fait constaté de dégradation de la porte d’entrée de la boutique ou du cabinet, de l’officine, de son véhicule ou encore le vol d’un objet mobilier que vous constatez sans connaître l’auteur ou sans raison apparente.
- Une personne dans un état second (TPN, alcoolisée, droguée, encore sous l’effet de l’anesthésie) qui sera virulente sans raison apparente."
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </FormComponent>
  )
}

export default Step3Page
