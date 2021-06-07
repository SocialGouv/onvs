import React from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import PrivateLayout from "@/components/PrivateLayout"
import { PrimaryButton, OutlineButton } from "@/components/lib"
import Alert from "@/components/Alert"
import useUser from "@/hooks/useUser"
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup"
import { AlertInput } from "@/components/Form"
import { changePasswordUser } from "@/clients/users"

const formSchema = yup.object({
  password: yup
    .string()
    .min(12, "Le mot de passe doit avoir au moins 12 caractères."),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Le champ ne correspond pas au champ mot de passe.",
    )
    .required("Champ requis."),
})

// in zod
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Les mots de passe ne correspondent pas.",
//   path: ["confirmPassword"],
// })

type MessageType = {
  text?: string
  kind?: "success" | "error"
}

const ChangePasswordPage = () => {
  const { user } = useUser({ redirectToIfError: "/" })

  const router = useRouter()

  const [message, setMessage] = React.useState<MessageType>({})

  const { userId } = router.query

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })

  // TODO: Améliorer la gestion des droits sur les pages
  if (user?.role !== "Administrateur") return "Cette page est inacessible."

  const onSubmit = async (data) => {
    setMessage({})

    try {
      await changePasswordUser({
        id: userId as string,
        password: data?.password,
      })
      setMessage({ text: "Mot de passe mis à jour.", kind: "success" })
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe.", error)
      setMessage({
        text: "Il y a une erreur sur le serveur lors de la mise à jour. 😔",
        kind: "error",
      })
    }
  }

  return (
    <PrivateLayout title="Utilisateurs">
      {message?.text && (
        <Alert kind={message?.kind} title={message?.text}>
          {message?.kind === "success" ? (
            <Alert.Button
              label="Retour à la liste"
              fn={() => router.push("/private/users")}
            />
          ) : undefined}
        </Alert>
      )}

      <form className="space-y-8 " onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:col-span-3">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe
          </label>
          <div className="mt-1">
            <input
              type="password"
              placeholder="12 caractères minimum"
              name="password"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-invalid={Boolean(errors.password)}
              ref={register({ min: 12 })}
            />
            <AlertInput>{errors?.password?.message}</AlertInput>
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Confirmation du mot de passe
          </label>
          <div className="mt-1">
            <input
              type="password"
              placeholder="confirmez le mot de passe"
              name="confirmPassword"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ref={register({ min: 12 })}
            />
            <AlertInput>{errors?.confirmPassword?.message}</AlertInput>
          </div>
        </div>

        <div className="flex justify-end">
          <OutlineButton onClick={() => router.push("/private/users")}>
            Annuler
          </OutlineButton>
          <span className="w-4" />

          <PrimaryButton type="submit">Modifier</PrimaryButton>
        </div>
      </form>
    </PrivateLayout>
  )
}

export default ChangePasswordPage
