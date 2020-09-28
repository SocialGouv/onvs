import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import * as stateMachine from "little-state-machine"
import * as nextRouter from "next/router"
import React from "react"
import selectEvent from "react-select-event"
import * as reactToasts from "react-toast-notifications"

import { useScrollTop } from "@/hooks/useScrollTop"
import Step0Page from "@/pages/declarations/liberal/etape0"

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

beforeEach(() => {
  jest.clearAllMocks()
})

test("should display an error when no job are chosen", async () => {
  render(<Step0Page />)

  expect(useScrollTop).toHaveBeenCalled()

  fireEvent.click(screen.getByText(/Commencer/i))

  await screen.findByText(/La profession est à renseigner/i)

  expect(addToast).toHaveBeenCalled()

  expect(push).not.toHaveBeenCalled()
})

test("it should go to etape1 if a job is correctly selected", async () => {
  // to be sure that mocks are reset
  expect(addToast).not.toHaveBeenCalled()

  render(<Step0Page />)

  await selectEvent.select(screen.getByLabelText("job"), ["Médecin"])

  fireEvent.click(screen.getByText(/commencer/i))

  await waitFor(() => expect(push).toHaveBeenCalledTimes(1))

  expect(push).toHaveBeenCalledWith("/declarations/liberal/etape1")

  expect(addToast).not.toHaveBeenCalled()
})
