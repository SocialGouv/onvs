import React from "react"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select"
import { User } from "@prisma/client"

// import { z } from "zod"

type SelectOption = {
  value: string
  label: string
}

// const UserSchema = z.object({
//   id: z.string().uuid().nullable(),
//   firstName: z.string().nullable(),
//   lastName: z.string().nullable(),
//   email: z.string().email({ message: "Courriel non valide." }),
//   role: z.any(), // The role has not to be checked since it is constrained by a listbox in the form.
//   scope: z.any(),
// })

// type FormData = z.infer<typeof UserSchema>

import { rolesOptions, getOption } from "../utils/roles"

type Props = {
  user?: User
  onSubmit: (values: any) => void
  children: React.ReactNode
}

const emptyUser = {
  firstName: "",
  lastName: "",
  email: "",
  role: null,
  scope: "",
}

export default function UserForm({ user, onSubmit, children }: Props) {
  const { register, control, errors, handleSubmit, watch } = useForm({
    defaultValues: {
      ...emptyUser,
      ...user,
      role: user?.role ? getOption(user?.role) : null,
    },
  })

  const role = watch<string, SelectOption>("role")

  console.log({ errors })

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit(onSubmit)}
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
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                Prénom
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ref={register}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Nom
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ref={register}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Courriel
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ref={register}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Rôle
              </label>
              <div className="mt-1">
                <Controller
                  options={rolesOptions}
                  name="role"
                  control={control}
                  as={Select}
                  placeholder="Choisir..."
                />
              </div>
            </div>

            {role?.value !== "Administrateur" && (
              <div className="sm:col-span-6">
                <label
                  htmlFor="scope"
                  className="block text-sm font-medium text-gray-700"
                >
                  Périmètre
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="scope"
                    id="scope"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ref={register}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="pt-5">{children}</div>
        </div>
      </div>
    </form>
  )
}
