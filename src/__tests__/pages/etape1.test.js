import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { formatISO } from "date-fns"
import * as stateMachine from "little-state-machine"
import * as nextRouter from "next/router"
import React from "react"

import * as mockToast from "../../hooks/useEffectToast"
import * as mockScrollTop from "@/hooks/useScrollTop"

import { useScrollTop } from "@/hooks/useScrollTop"
import Step1Page from "@/pages/declarations/liberal/etape1"

import { mockRouterImplementation } from "@/utils/test-utils"

const push = jest.fn(() => Promise.resolve(true))

beforeAll(() => {
  jest.spyOn(nextRouter, "useRouter")
  jest.spyOn(mockToast, "useEffectToast")
  jest.spyOn(stateMachine, "useStateMachine")
  jest.spyOn(mockScrollTop, "useScrollTop")
  jest.spyOn(window, "scrollTo")
})

afterAll(() => {
  jest.restoreAllMocks()
})

beforeEach(() => {
  mockToast.useEffectToast.mockReturnValue({ addToast: jest.fn() })

  stateMachine.useStateMachine.mockReturnValue({ action: jest.fn(), state: {} })

  nextRouter.useRouter.mockReturnValue({
    ...mockRouterImplementation,
    push,
    query: {},
  })

  window.scrollTo = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks()
})

test("the etape1 should display an error on town if not present", async () => {
  render(<Step1Page />)

  expect(useScrollTop).toHaveBeenCalled()

  fireEvent.click(screen.queryByText(/suivant/i))

  await screen.findByText(/la ville est à renseigner/i)

  expect(mockToast.useEffectToast).toHaveBeenCalled()

  const date = screen.getByLabelText(/date/i)

  const today = formatISO(new Date(), { representation: "date" })

  expect(date?.value).toBe(today)

  expect(screen.queryByText(/la date est à renseigner/i)).toBeNull()
  expect(
    screen.queryByText(/le champ "Autre lieu" doit être précisé/i),
  ).toBeNull()
})

test("the etape1 should display an error on Autre if no precision is present", async () => {
  render(<Step1Page />)

  userEvent.type(screen.getByLabelText(/ville/i), "Vincennes")

  fireEvent.click(screen.getByDisplayValue("Autre"))

  fireEvent.click(screen.queryByText(/suivant/i))

  await screen.findByText(/le champ "Autre lieu" doit être précisé/i)

  expect(screen.getByLabelText(/ville/i).value).toBe("Vincennes")

  expect(screen.queryByText(/La ville est à renseigner/i)).toBeNull()
  expect(screen.queryByText(/la date est à renseigner/i)).toBeNull()
  expect(mockToast.useEffectToast).toHaveBeenCalled()
})

test("the etape1 should route to etape2 if all informations are present", async () => {
  render(<Step1Page />)

  userEvent.type(screen.getByLabelText(/ville/i), "Vincennes")

  fireEvent.click(screen.getByDisplayValue("Autre"))

  userEvent.type(screen.getByDisplayValue("Autre"), "Chez moi")

  fireEvent.click(screen.queryByText(/suivant/i))

  await waitFor(() => expect(push).toHaveBeenCalledTimes(1))
  expect(push).toHaveBeenCalledWith("/declarations/liberal/etape2")
})
