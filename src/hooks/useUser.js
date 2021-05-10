import Router from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

export default function useUser({ redirectToIfSuccess = "" } = {}) {
  const { data: user, mutate: mutateUser } = useSWR("/api/auth/user")

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!user) return

    // If redirectToIfSuccess is set, redirect if the user was found
    if (redirectToIfSuccess && user?.isLoggedIn) {
      Router.push(redirectToIfSuccess)
    }
  }, [user, redirectToIfSuccess])

  return { mutateUser, user }
}
