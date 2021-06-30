import React from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers"
import { ArrowLeftIcon } from "@heroicons/react/solid"

import PrivateLayout from "@/components/PrivateLayout"
import { PrimaryButton, OutlineButton } from "@/components/lib"
import Alert, { AlertMessageType } from "@/components/Alert"
import { InputText } from "@/components/Form"
import ButtonAnchor from "@/components/Anchor"
import useUser from "@/hooks/useUser"
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

const ChangePasswordPage = (): JSX.Element => {
  const { user } = useUser({ redirectToIfError: "/" })

  const router = useRouter()

  const [message, setMessage] = React.useState<AlertMessageType>()

  const { userId } = router.query

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  })

  // TODO: Améliorer la gestion des droits sur les pages
  if (user?.role !== "Administrateur")
    return <span>Cette page est inacessible.</span>

  const onSubmit = async (data) => {
    setMessage(undefined)

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
    <PrivateLayout
      title="Mot de passe"
      leftComponent={
        <ButtonAnchor
          LeftIconComponent={ArrowLeftIcon}
          onClick={() => router.back()}
        >
          Retour
        </ButtonAnchor>
      }
    >
      <Alert message={message}></Alert>

      <form className="space-y-8 " onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:col-span-3">
          <InputText
            name="password"
            type="password"
            label="Mot de passe"
            placeholder="Au moins 12 caractères"
            register={register}
            errors={errors}
            requiredFlag={true}
          />
        </div>
        <div className="sm:col-span-3">
          <InputText
            name="confirmPassword"
            type="password"
            label="Confirmation du mot de passe"
            placeholder="Confirmez le mot de passe"
            register={register}
            errors={errors}
            requiredFlag={true}
          />
        </div>

        <div className="flex justify-end">
          <OutlineButton onClick={() => router.back()}>Annuler</OutlineButton>
          <span className="w-4" />

          <PrimaryButton type="submit">Modifier</PrimaryButton>
        </div>
      </form>
    </PrivateLayout>
  )
}

export default ChangePasswordPage
