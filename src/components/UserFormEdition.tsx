import { useRouter } from "next/router"
import UserForm from "@/components/UserForm"
import PrimaryButton from "@/components/PrimaryButton"
import OutlineButton from "@/components/OutlineButton"
import { UserModel } from "@/models/users"
import { UserFormType } from "@/components/UserForm"

export function UserFormEdition({
  onUpdateUser,
  user,
  isLoading,
}: {
  onUpdateUser: (user: UserFormType) => Promise<void>
  user: UserModel
  isLoading: boolean
}): JSX.Element {
  const router = useRouter()
  return (
    <UserForm user={user} onSubmit={onUpdateUser}>
      <div className="flex justify-end">
        <OutlineButton onClick={() => router.back()}>Annuler</OutlineButton>
        <span className="w-4" />

        <PrimaryButton type="submit" disabled={isLoading}>
          Modifier
        </PrimaryButton>
      </div>
    </UserForm>
  )
}
