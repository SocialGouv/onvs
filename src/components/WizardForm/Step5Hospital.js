import { yupResolver } from "@hookform/resolvers"
import React from "react"
import * as yup from "yup"

import { Title2 } from "@/components/lib"
import { useDeclarationForm } from "@/hooks/useDeclarationContext"
import { useScrollTop } from "@/hooks/useScrollTop"

import FormComponent from "./FormComponent"

const schema = yup.object({
  description: yup.string().required("La description doit être renseignée"),
})

const Step5Page = () => {
  useScrollTop()
  const { onSubmit, handleSubmit, errors, register } = useDeclarationForm({
    defaultValuesFromState: (state) => ({
      description: state?.steps?.precision?.description,
    }),

    resolver: yupResolver(schema),
  })

  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
      title="Pourriez-vous apporter quelques précisions ??"
    >
      <Title2 className="mt-8 mb-4">
        {"Description plus détaillée de l'événement"}
      </Title2>

      <i>
        Ne faites figurer aucun nom de personne dans la description des faits.
        Vous pouvez formuler ainsi : «&nbsp;M. ou Mme, le patient ou la
        patiente, le fils/la fille du patient, etc. a fait ceci&nbsp;».
      </i>

      <textarea
        className={`w-full mt-8 form-textarea ${
          errors?.description?.message ? "border-red-500" : "border-blue-400"
        }`}
        placeholder="Description de l’événement en ajoutant, si besoin, votre ressenti et le contexte."
        name="description"
        ref={register}
        style={{ height: "300px" }}
      />
    </FormComponent>
  )
}

export default Step5Page
