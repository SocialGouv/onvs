/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import selectEvent from "react-select-event"

import { formatISO } from "date-fns"
import * as stateMachine from "little-state-machine"
import * as nextRouter from "next/router"
import React from "react"

import { WizardForm } from "@/components/wizard"

import * as mockScrollTop from "@/hooks/useScrollTop"
import { useScrollTop } from "@/hooks/useScrollTop"
import { mockRouterImplementation } from "@/utils/test-utils"

import * as mockToast from "../../hooks/useEffectToast"

const push = jest.fn(() => Promise.resolve(true))

// fetcher mock for ce cities select. (don't mock useEffectToast, it's complicated and it is an implementation detail).
jest.mock("@/utils/fetcher", () => {
  return function () {
    return Promise.resolve({
      features: [
        {
          properties: {
            city: "Vincennes",
            postcode: "94300",
          },
        },
      ],
    })
  }
})

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
  mockToast.useEffectToast.mockImplementation(() => {})

  stateMachine.useStateMachine.mockReturnValue({
    action: jest.fn(),
    state: {},
  })

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
  render(<WizardForm step={1} jobOrType="ets" jobPrecision="" />)

  expect(useScrollTop).toHaveBeenCalled()

  fireEvent.click(screen.queryByText(/suivant/i))

  await screen.findByText(/la ville est à renseigner/i)

  const date = screen.getByLabelText(/date/i)

  const today = formatISO(new Date(), { representation: "date" })

  expect(date?.value).toBe(today)

  expect(screen.queryByText(/la date est à renseigner/i)).toBeNull()
  expect(
    screen.queryByText(/le champ "Autre lieu" doit être précisé/i),
  ).toBeNull()
})

test("the etape1 of liberal flow should display an error on Autre if no precision is present", async () => {
  render(<WizardForm step={1} jobOrType="liberal" jobPrecision="" />)

  // We need to do fireEvent.change + selectEvent.select, to fetch and to select (source : https://github.com/romgain/react-select-event#selectinput-htmlelement-optionoroptions-matcher--arraymatcher-config-object-promisevoid)
  fireEvent.change(screen.getByLabelText(/ville/i), {
    target: { value: "Vincennes" },
  })

  await selectEvent.select(screen.getByLabelText(/ville/i), "Vincennes (94300)")

  fireEvent.click(screen.getByDisplayValue("Autre"))

  fireEvent.click(screen.queryByText(/suivant/i))

  await screen.findByText(/le champ "Autre lieu" doit être précisé/i)

  expect(screen.queryByText(/La ville est à renseigner/i)).toBeNull()

  expect(screen.queryByText(/la date est à renseigner/i)).toBeNull() // the input is prefilled with today's date.
})

test("the etape1 should route to etape2 if all informations are present", async () => {
  const declarationType = "pharmacien"

  stateMachine.useStateMachine.mockReturnValue({
    action: jest.fn(),
    state: { declarationType },
  })

  render(<WizardForm step={1} jobOrType="pharmacien" jobPrecision="" />)

  fireEvent.change(screen.getByLabelText(/ville/i), {
    target: { value: "Vincennes" },
  })
  await selectEvent.select(screen.getByLabelText(/ville/i), "Vincennes (94300)")

  fireEvent.click(screen.getByDisplayValue("Autre"))

  userEvent.type(screen.getByDisplayValue("Autre"), "Chez moi")

  fireEvent.click(screen.queryByText(/suivant/i))

  expect(screen.queryByText(/La ville est à renseigner/i)).toBeNull()

  expect(screen.queryByText(/la date est à renseigner/i)).toBeNull()

  // Check if we go the the next page.
  await waitFor(() =>
    expect(push).toHaveBeenCalledWith(
      `/declaration/etape/2/${declarationType}`,
    ),
  )
})
