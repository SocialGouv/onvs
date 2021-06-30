import { useRouter } from "next/router"
import UserForm from "@/components/UserForm"
import PrimaryButton from "@/components/PrimaryButton"
import OutlineButton from "@/components/OutlineButton"

export function UserFormCreation({
  onCreateUser,
  isLoading,
}: {
  onCreateUser
  isLoading: boolean
}): JSX.Element {
  const router = useRouter()
  return (
    <UserForm onSubmit={onCreateUser}>
      <div className="flex justify-end">
        <OutlineButton onClick={() => router.back()}>Annuler</OutlineButton>
        <span className="w-4" />

        <PrimaryButton type="submit" disabled={isLoading}>
          Ajouter
        </PrimaryButton>
      </div>
    </UserForm>
  )
}
