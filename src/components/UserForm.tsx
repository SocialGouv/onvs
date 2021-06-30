import React from "react"
import { useForm, Controller, FieldError } from "react-hook-form"
import Select from "react-select"
import * as yup from "yup"

import { PartialUserModel, UserModel } from "@/models/users"
import { yupResolver } from "@hookform/resolvers"
import {
  ordersOptions,
  rolesOptions,
  getRoleOption,
  getOrderOption,
  SelectOption,
} from "@/utils/options"
import {
  AlertInput,
  InputText,
  Label,
  MandatoryFieldFlag,
} from "@/components/Form"
import { Prisma } from ".prisma/client"

const formSchema = yup.object({
  id: yup.string().optional(),
  firstName: yup.string().required("Le champ prénom est requis.").default(null),
  lastName: yup.string().optional().default(null),
  email: yup
    .string()
    .email()
    .required("Le champ email est requis.")
    .nullable(false),
  role: yup
    .object({ label: yup.string(), value: yup.string() })
    .nullable()
    .required("Le champ rôle est requis."),
  scope: yup.mixed().when("role", (role: SelectOption) => {
    if (role?.value === "Gestionnaire d'ordre") {
      return yup.object({
        order: yup
          .object({
            label: yup.string(),
            value: yup.string(),
          })
          .nullable()
          .required("L'ordre est requis"),
      })
    } else if (role?.value === "Gestionnaire d'ETS") {
      return yup.object({
        ets: yup.string().required(),
      })
    } else {
      return yup.object()
    }
  }),
})

// Hack: yup considers that email is of type string | undefined, even the field is yup.string.required().
// A replacement of yup by zod will make us able to remove this hack.
export type UserFormType = yup.TypeOf<typeof formSchema> & { email: string }

type Props = {
  user?: UserModel & { scope: any }
  onSubmit: (values: UserFormType) => void
  children: React.ReactNode
}

export function buildRoleAndScopeFromUserForm(user: UserFormType): {
  role: string
  scope: Prisma.JsonValue
} {
  if (!user?.role?.value) {
    throw new Error("The user is not well formed")
  }

  const role = user.role.value

  let scope = {}
  if (role === "Gestionnaire d'ordre") {
    scope = { order: user?.scope?.order?.value }
  } else if (role === "Gestionnaire d'ETS") {
    scope = { ets: user?.scope?.ets?.value }
  }
  return { role, scope }
}

const emptyUser: PartialUserModel = {
  firstName: "",
  lastName: "",
  email: "",
  role: undefined,
  scope: null,
}

const UserForm = ({ user, onSubmit, children }: Props): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...emptyUser,
      ...user,
      role: user?.role ? getRoleOption(user.role) : null,
      scope: {
        order: user?.scope?.order ? getOrderOption(user.scope.order) : null,
        ets: user?.scope?.ets ? user.scope.ets : "",
      },
    },
    resolver: yupResolver(formSchema),
  })

  const role = watch<string, SelectOption>("role")

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="user-form"
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informations personnelles
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Veuillez renseigner les informations suivantes.
            </p>
          </div>
          <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <InputText
                label="Prénom"
                name="firstName"
                register={register}
                errors={errors}
                requiredFlag={true}
              />
            </div>

            <div className="sm:col-span-3">
              <InputText
                label="Nom"
                name="lastName"
                register={register}
                errors={errors}
              />
            </div>

            <div className="sm:col-span-3">
              <InputText
                label="Courriel"
                name="email"
                register={register}
                errors={errors}
                requiredFlag={true}
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Rôle&nbsp;
                <MandatoryFieldFlag />
              </label>
              <div className="mt-1">
                <Controller
                  options={rolesOptions}
                  name="role"
                  inputId="role"
                  control={control}
                  as={Select}
                  placeholder="Choisir..."
                  aria-invalid={Boolean(errors.role)}
                />
                <AlertInput>{errors?.role?.message}</AlertInput>
              </div>
            </div>

            {role?.value === "Gestionnaire d'ETS" && (
              <div className="sm:col-span-6">
                <InputText
                  label="ETS"
                  name="scope.ets"
                  register={register}
                  errors={errors}
                />
              </div>
            )}
            {role?.value === "Gestionnaire d'ordre" && (
              <div className="sm:col-span-6">
                <Label htmlFor="scope.order">
                  <span className="block text-sm font-medium text-gray-700">
                    Ordre&nbsp;
                    <MandatoryFieldFlag />
                  </span>
                  <Controller
                    options={ordersOptions}
                    name="scope.order"
                    inputId="scope.order"
                    control={control}
                    as={Select}
                    placeholder="Choisir..."
                    aria-invalid={Boolean(errors?.scope?.["order"])}
                  />
                </Label>
                <AlertInput>
                  {(errors?.scope?.["order"] as FieldError)?.message}
                </AlertInput>{" "}
              </div>
            )}
          </div>
          <div className="pt-5">{children}</div>
        </div>
      </div>
    </form>
  )
}

export default UserForm
