import React from "react"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"

import PrivateLayout from "@/components/PrivateLayout"
import { OutlineButton } from "@/components/lib"
import prisma from "@/prisma/db"
import Table from "@/components/Table"

import { UserModel } from "@/models/users"

const UsersListPage = ({ users }: { users: UserModel[] }): JSX.Element => {
  const router = useRouter()

  return (
    <PrivateLayout
      title="Utilisateurs"
      leftComponent={null}
      rightComponent={
        <OutlineButton
          tabIndex={0}
          onClick={() => router.push("./users/creation")}
        >
          +&nbsp;Ajouter
        </OutlineButton>
      }
    >
      <Table
        headers={["Nom", "Email", "Rôle"].map((header) => (
          <th
            key={header}
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            {header}
          </th>
        ))}
        rows={users.map((person) => (
          <tr key={person.email}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{person.firstName}</div>
              <div className="text-sm text-gray-500">{person.lastName}</div>
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap">
              {person.email}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap">
              <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                {person.role}
              </span>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <Link href={`/private/users/${person.id}/edition`}>
                <a className="text-blue-600 hover:text-blue-900">Voir</a>
              </Link>
            </td>
          </tr>
        ))}
      />
    </PrivateLayout>
  )
}

export default UsersListPage as React.ReactNode

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  })

  return {
    props: { users }, // will be passed to the page component as props
  }
}
