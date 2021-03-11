import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import * as stateMachine from "little-state-machine"
import * as nextRouter from "next/router"
import React from "react"
import selectEvent from "react-select-event"

import * as mockToast from "../../hooks/useEffectToast"
import * as mockScrollTop from "@/hooks/useScrollTop"

import Step0Page from "@/pages/declarations/liberal/etape0"
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

test("should display an error when no job are chosen", async () => {
  render(<Step0Page />)

  expect(mockScrollTop.useScrollTop).toHaveBeenCalled()

  fireEvent.click(screen.getByText(/Commencer/i))

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

  expect(push.mock).toMatchInlineSnapshot(`
    Object {
      "calls": Array [],
      "instances": Array [],
      "invocationCallOrder": Array [],
      "results": Array [],
    }
  `)
})

test("it should go to etape1 if a job is correctly selected", async () => {
  render(<Step0Page />)

  await selectEvent.select(screen.getByLabelText("job"), ["Médecin"])

  fireEvent.click(screen.getByText(/commencer/i))

  await waitFor(() => expect(push).toHaveBeenCalledTimes(1))

  expect(push).toHaveBeenCalledWith("/declarations/liberal/etape1")
})
