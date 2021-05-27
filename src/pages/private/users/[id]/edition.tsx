import React from "react"

import PrivateLayout from "@/components/PrivateLayout"

import { GetServerSideProps } from "next"

// import { v4 as uuid } from "uuid"
import { PrismaClient, User } from "@prisma/client"
import UserForm from "@/components/UserForm"
import { useRouter } from "next/router"

import { PrimaryButton, OutlineButton } from "@/components/lib"

const prisma = new PrismaClient()

type Props = {
  user: User
}

const UserPage = ({ user }: Props) => {
  const router = useRouter()

  return (
    <PrivateLayout title="Utilisateurs">
      <UserForm user={user} onSubmit={(values) => console.log(values)}>
        <OutlineButton onClick={() => router.push("/private/users")}>
          Annuler
        </OutlineButton>
        <span className="w-4" />

        <PrimaryButton type="submit">Modifier</PrimaryButton>
      </UserForm>
    </PrivateLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as {
    id?: string
  }

  // TODO: faut-il ne pas rendre le user si deletedAt est non null ?

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      deletedAt: true,
    },
  })

  return {
    props: { user },
  }
}

export default UserPage
