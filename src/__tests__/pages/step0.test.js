import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import * as stateMachine from "little-state-machine"
import * as nextRouter from "next/router"
import React from "react"
import * as reactToasts from "react-toast-notifications"

import { useScrollTop } from "@/hooks/useScrollTop"
import Step0Page from "@/pages/forms/freelance/step0"

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

test("should display an error when no job are chosen", async () => {
  render(<Step0Page />)

  expect(useScrollTop).toHaveBeenCalled()

  // screen.debug(screen.getByText(/Commencer/i))

  fireEvent.click(screen.getByText(/Commencer/i))

  await screen.findByText(/La profession est à renseigner./i)

  expect(addToast).toHaveBeenCalled()

  expect(push).not.toHaveBeenCalled()
})

//TODO test avec le choix d'une profession
// l'erreur La profession est à renseigner ne doit pas être présente (expect.toBeNull)
// push doit être appelé (expect.toHaveBennCalled)

// see: https://stackoverflow.com/a/61470870/2728710
// https://github.com/romgain/react-select-event
