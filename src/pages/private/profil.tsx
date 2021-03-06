import { useRouter } from "next/router"
import React from "react"

import { Prisma } from ".prisma/client"
import { OutlineButton } from "@/components/lib"
import PrivateLayout from "@/components/PrivateLayout"
import useUser from "@/hooks/useUser"

const ProfilePage = () => {
  const router = useRouter()
  const { user } = useUser({ redirectToIfError: "/" })

  // Used to prevent erroneous display when page is returned in SSR.
  if (!user?.isLoggedIn) {
    return <span>Chargement...</span>
  }

  const scope = user.scope as Prisma.JsonObject

  return (
    <PrivateLayout title="Profil">
      <div className="w-8/12 p-8 py-16 mx-auto border border-gray-300 rounded-lg shadow-md min-h-64 md:px-16">
        <p className="font-semibold">{user.email}</p>
        <p>
          {user.lastName} {user.firstName}
        </p>
        <p className="text-lg font-light">{user.role}</p>
        <p>{scope?.order || ""}</p>
        <p>{scope?.ets || ""}</p>
      </div>
      <div className="mt-8 text-center">
        <OutlineButton onClick={() => router.back()}>Retour</OutlineButton>
      </div>
    </PrivateLayout>
  )
}

export default ProfilePage as React.ReactNode
