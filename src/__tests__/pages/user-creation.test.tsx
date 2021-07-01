/**
 * @jest-environment jsdom
 */
import React from "react"
import { fireEvent, render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import selectEvent from "react-select-event"

import { UserFormCreation } from "@/components/UserFormCreation"

afterAll(() => {
  jest.restoreAllMocks()
})

beforeEach(() => {
  jest.mock("@/hooks/useUser", () => ({
    __esModule: true, // this property makes it work
    default: () => ({ user: { isLoggedIn: true } }),
  }))
})

afterEach(() => {
  jest.clearAllMocks()
})

test("if firstname is not filled, there is an error", async () => {
  const onCreateUser = jest.fn()
  render(<UserFormCreation onCreateUser={onCreateUser} isLoading={false} />)

  fireEvent.click(screen.getByText(/ajouter/i))

  await screen.findByText(/le champ prénom est requis/i)

  screen.getByText(/Le champ email est requis/i)
  screen.getByText(/Le champ rôle est requis/i)

  expect(screen.queryByText(/L'ordre est requis/i)).toBeNull()
  expect(onCreateUser).not.toHaveBeenCalled()
})

test("if role 'Gestionnaire d'ordre is chosen', there is an additional input on the screen", async () => {
  const onCreateUser = jest.fn()
  render(<UserFormCreation onCreateUser={onCreateUser} isLoading={false} />)

  userEvent.type(screen.getByText(/prénom/i), "John")
  userEvent.type(screen.getByText(/courriel/i), "john@gmail.com")
  await selectEvent.select(screen.getByLabelText(/rôle/i), [
    "Gestionnaire d'ordre",
  ])

  fireEvent.click(screen.getByText(/ajouter/i))

  await screen.findByText(/l'ordre est requis/i)
  expect(onCreateUser).not.toHaveBeenCalled()
})

test("if role 'Gestionnaire d'ordre is chosen', and a Ordre is chosen, then it is valid", async () => {
  const onCreateUser = jest.fn()
  render(<UserFormCreation onCreateUser={onCreateUser} isLoading={false} />)

  userEvent.type(screen.getByText(/prénom/i), "John")
  userEvent.type(screen.getByText(/courriel/i), "john@gmail.com")
  await selectEvent.select(
    screen.getByLabelText(/rôle/i),
    "Gestionnaire d'ordre",
  )

  await selectEvent.select(screen.getByLabelText(/ordre/i), "Dentistes")

  await act(() =>
    Promise.resolve(fireEvent.click(screen.getByText(/ajouter/i))),
  )

  expect(onCreateUser).toHaveBeenCalled()
})
