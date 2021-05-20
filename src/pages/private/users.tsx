import Link from "next/link"
import React from "react"

import PrivateLayout from "@/components/PrivateLayout"

import knex from "../../knex/knex"
import { GetServerSideProps } from "next"
import { UserModel } from "@/models/users"

type PageProps = {
  users: UserModel[]
}

function UsersAdministration({ users }: PageProps) {
  return (
    <PrivateLayout title="Utilisateurs">
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
                          {person.first_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {person.last_name}
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
                        <Link href={`/private/user/${person.id}`}>
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
  const users = await knex("users")
    .whereNull("deleted_at")
    .select("id", "first_name", "last_name", "email", "role")

  return {
    props: { users }, // will be passed to the page component as props
  }
}
