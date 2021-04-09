import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import * as stateMachine from "little-state-machine"
import * as nextRouter from "next/router"
import React from "react"
import selectEvent from "react-select-event"

import { WizardForm } from "@/components/wizard"
import * as mockScrollTop from "@/hooks/useScrollTop"
import { mockRouterImplementation } from "@/utils/test-utils"

import * as mockToast from "../../hooks/useEffectToast"

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

test("should display an error when no job are chosen", async () => {
  render(<WizardForm step={0} jobOrType="" jobPrecision="" />)

  expect(mockScrollTop.useScrollTop).toHaveBeenCalled()

  fireEvent.click(screen.getByText(/suivant/i))

  await screen.findByText(/La profession est à renseigner/i)

  expect(mockToast.useEffectToast.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {},
      ],
      Array [
        Object {
          "job": Object {
            "message": "La profession est à renseigner",
            "type": "required",
          },
        },
      ],
    ]
  `)

  expect(push).not.toHaveBeenCalled()
})

test("it should go to etape1 if a job is correctly selected", async () => {
  render(<WizardForm step={0} />)

  await selectEvent.select(screen.getByLabelText("job"), ["Médecin"])

  fireEvent.click(screen.getByText(/suivant/i))

  await waitFor(() => expect(push).toHaveBeenCalledTimes(1))

  expect(push).toHaveBeenCalledWith("/declaration/etape/1/liberal")
})

//  TODO: Decomment this test when pharmacien flow is enable

// test("it should go to etape1 with pharmacien flow if this job is selected", async () => {
//   render(<WizardForm step={0} />)

//   await selectEvent.select(screen.getByLabelText("job"), ["Pharmacien"])

//   fireEvent.click(screen.getByText(/suivant/i))

//   await waitFor(() => expect(push).toHaveBeenCalledTimes(1))

//   expect(push).toHaveBeenCalledWith("/declaration/etape/1/pharmacien")
// })
