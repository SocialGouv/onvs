import Link from "next/link"
import React from "react"

import PrivateLayout from "@/components/PrivateLayout"

import { GetServerSideProps } from "next"
import { OutlineButton } from "@/components/lib"
import { PrismaClient, User } from "@prisma/client"
import { useRouter } from "next/router"

const prisma = new PrismaClient()

type PageProps = {
  users: User[]
}

function UsersAdministration({ users }: PageProps) {
  const router = useRouter()

  return (
    <PrivateLayout
      title="Utilisateurs"
      leftComponent={null}
      rightComponent={
        <OutlineButton
          tabIndex="0"
          onClick={() => router.push("./users/creation")}
        >
          +&nbsp;Ajouter
        </OutlineButton>
      }
    >
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Rôle
                    </th>
                    <th />
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {person.firstName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {person.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {person.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                          {person.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <Link href={`/private/users/${person.id}/edition`}>
                          <a className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  )
}

export default UsersAdministration as React.ReactNode

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
