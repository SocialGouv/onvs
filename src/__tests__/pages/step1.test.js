import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { formatISO } from "date-fns"
import * as stateMachine from "little-state-machine"
import * as nextRouter from "next/router"
import React from "react"
import * as reactToasts from "react-toast-notifications"

import { useScrollTop } from "@/hooks/useScrollTop"
import Step1Page from "@/pages/forms/freelance/step1"

jest.mock("react-toast-notifications")
jest.mock("@/hooks/useScrollTop")
jest.mock("little-state-machine")

const addToast = jest.fn()
const action = jest.fn()
const push = jest.fn()

beforeAll(() => {
  /* eslint-disable no-import-assign*/
  reactToasts.useToasts = jest.fn()

  reactToasts.useToasts.mockImplementation(() => ({
    addToast,
  }))

  stateMachine.useStateMachine = jest.fn()
  stateMachine.useStateMachine.mockImplementation(() => ({ action }))

  nextRouter.useRouter = jest.fn()
  nextRouter.useRouter.mockImplementation(() => ({
    push,
  }))
})

test("the step1 should display an error on town if not present", async () => {
  render(<Step1Page />)

  expect(useScrollTop).toHaveBeenCalled()

  fireEvent.click(screen.queryByText(/suivant/i))

  await screen.findByText(/la ville est à renseigner/i)

  expect(addToast).toHaveBeenCalled()

  const date = screen.getByLabelText(/date/i)

  const today = formatISO(new Date(), { representation: "date" })

  expect(date?.value).toBe(today)

  expect(screen.queryByText(/la date est à renseigner/i)).toBeNull()
  expect(
    screen.queryByText(/le champ "Autre lieu" doit être précisé/i),
  ).toBeNull()
})

test("the step1 should display an error on Autre if no precision is present", async () => {
  render(<Step1Page />)

  userEvent.type(screen.getByLabelText(/ville/i), "Vincennes")

  fireEvent.click(screen.getByDisplayValue("Autre"))

  fireEvent.click(screen.queryByText(/suivant/i))

  await screen.findByText(/le champ "Autre lieu" doit être précisé./i)

  expect(screen.getByLabelText(/ville/i).value).toBe("Vincennes")

  expect(screen.queryByText(/La ville est à renseigner./i)).toBeNull()
  expect(screen.queryByText(/la date est à renseigner/i)).toBeNull()
  expect(addToast).toHaveBeenCalled()
})

test("the step1 should route to step2 if all informations are present", async () => {
  render(<Step1Page />)

  userEvent.type(screen.getByLabelText(/ville/i), "Vincennes")

  fireEvent.click(screen.getByDisplayValue("Autre"))

  userEvent.type(screen.getByDisplayValue("Autre"), "Chez moi")

  fireEvent.click(screen.queryByText(/suivant/i))

  await waitFor(() => expect(push).toHaveBeenCalledTimes(1))
  expect(push).toHaveBeenCalledWith("/forms/freelance/step2")
  expect(action).toHaveBeenCalledTimes(1)
})
