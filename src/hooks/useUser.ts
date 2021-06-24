import { UserLoggedModel } from "@/models/users"
import Router from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

interface ReturnType {
  mutateUser: (
    data?: any,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<any>
  user: UserLoggedModel
}

/**
 * Hook which returns the user object and the SWR function to mutate it.
 * It can optionnaly redirect to some configured pages after the result of fetching the user data.
 *
 * param {string} redirectToIfSuccess (optionnal). Page to redirect to in case of success.
 * param {string} redirectToIfError (optionnal). Page to redirect to in case of error.
 * @returns the user
 *
 * TODO: add a role to check against
 */
export default function useUser({
  redirectToIfSuccess = "",
  redirectToIfError = "",
} = {}): ReturnType {
  const { data: user, mutate: mutateUser } = useSWR("/api/auth/user")

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!user) return

    // If redirectToIfSuccess is set, redirect if the user was found
    if (redirectToIfSuccess && user?.isLoggedIn) {
      Router.push(redirectToIfSuccess)
    }
    if (redirectToIfError && !user?.isLoggedIn) {
      Router.push(redirectToIfError)
    }
  }, [user, redirectToIfSuccess, redirectToIfError])

  return { mutateUser, user }
}
