import React from "react"
import { useForm, Controller, FieldError } from "react-hook-form"
import Select from "react-select"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers"

import { EtsModel, PartialEtsModel } from "@/models/ets"
import { AlertInput, InputText } from "@/components/Form"
import {
  getJuridicStatusOption,
  juridicStatus,
  juridicStatusOptions,
} from "@/utils/options"

const formSchema = yup.object({
  id: yup.string().uuid(),
  finesset: yup.string().length(9, "Le champ est composé de 9 chiffres"),
  finessej: yup
    .mixed()
    .test(
      "null or 9 k",
      "Le champ est composé de 9 chiffres",
      (value) => value === "" || value?.length === 9,
    ),
  rs: yup.string().required("La raison sociale est obligatoire"),
  town: yup.string().required("La ville est obligatoire"),
  department: yup
    .string()
    .matches(/^\d\d\d?$/, "Le département est composé de 2 ou 3 chiffres"),
  juridicStatus: yup
    .object({ label: yup.string(), value: yup.string() })
    .required("Le champ statut juridique est requis"),
})

type Props = {
  ets?: EtsModel
  onSubmit: (values: yup.TypeOf<typeof formSchema>) => void
  children: React.ReactNode
}

const emptyEts: PartialEtsModel = {
  finesset: "",
  finessej: "",
  rs: "",
  town: "",
  department: "",
  juridicStatus: juridicStatus[0],
}

const EtsForm = ({ ets, onSubmit, children }: Props): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...emptyEts,
      ...ets,
      juridicStatus: ets?.juridicStatus
        ? getJuridicStatusOption(ets?.juridicStatus)
        : getJuridicStatusOption(juridicStatus[0]),
    },
    resolver: yupResolver(formSchema),
  })

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {"Informations de l'ETS"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Veuillez renseigner les informations suivantes.
            </p>
          </div>
          <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputText
                label="N° FINESS"
                name="finesset"
                register={register}
                errors={errors}
                requiredFlag={true}
                placeholder="Code FINESS sur 9 caractères"
              />
            </div>

            <div className="sm:col-span-3">
              <InputText
                label="N° FINESS juridique"
                name="finessej"
                register={register}
                errors={errors}
                placeholder="Code FINESS juridique sur 9 caractères"
              />
            </div>

            <div className="sm:col-span-3">
              <InputText
                label="Raison sociale"
                name="rs"
                register={register}
                errors={errors}
                requiredFlag={true}
                placeholder="Ex: CHU de Nantes"
              />
            </div>

            <div className="sm:col-span-3">
              <InputText
                label="Ville"
                name="town"
                register={register}
                errors={errors}
                requiredFlag={true}
                placeholder="Ex: Nantes"
              />
            </div>

            <div className="sm:col-span-3">
              <InputText
                label="Département"
                name="department"
                register={register}
                errors={errors}
                requiredFlag={true}
                placeholder="Ex: 94"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="juridicStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Statut juridique
              </label>
              <div className="mt-1">
                <Controller
                  options={juridicStatusOptions}
                  name="juridicStatus"
                  inputId="juridicStatus"
                  control={control}
                  as={Select}
                  placeholder="Choisir..."
                  aria-invalid={Boolean(errors.juridicStatus)}
                />

                <AlertInput>
                  {(errors?.juridicStatus as FieldError)?.message}
                </AlertInput>
              </div>
            </div>
          </div>
          <div className="pt-5">{children}</div>
        </div>
      </div>
    </form>
  )
}

export default EtsForm
