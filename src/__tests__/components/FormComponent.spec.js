/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect"

import { render, screen } from "@testing-library/react"
import React from "react"

import FormComponent from "@/components/wizard/FormComponent"
import * as context from "@/hooks/useDeclarationContext"

beforeAll(() => {
  jest.spyOn(context, "useDeclarationContext")
})

afterAll(() => {
  jest.restoreAllMocks()
})

afterEach(() => {
  jest.clearAllMocks()
})

const DummyComponent = () => <span>Dummy</span>

test("should display label for second button to go next", () => {
  const orderedSteps = [
    { component: DummyComponent, label: "Date et Lieu", name: "dateLocation" },
    { component: DummyComponent, label: "Faits", name: "facts" },
    { component: DummyComponent, label: "Motifs", name: "reasons" },
    { component: DummyComponent, name: "confirmation" },
  ]

  context.useDeclarationContext.mockReturnValue({
    goPrevious: jest.fn(),
    orderedSteps,
    step: 2,
  })

  render(<FormComponent onSubmit={jest.fn()} title="test" />)

  const buttons = screen.queryAllByRole("button")

  expect(buttons?.length).toBe(2)
  expect(buttons[0]).toHaveTextContent(/Retour/i)
  expect(buttons[1]).toHaveTextContent(/Suivant/i)
})

test("should display label for second button to send declaration", () => {
  const orderedSteps = [
    { component: DummyComponent, label: "Date et Lieu", name: "dateLocation" },
    { component: DummyComponent, label: "Motifs", name: "reasons" },
    { component: DummyComponent, name: "confirmation" },
  ]

  context.useDeclarationContext.mockReturnValue({
    goPrevious: jest.fn(),
    orderedSteps,
    step: 2,
  })

  render(<FormComponent onSubmit={jest.fn()} title="test" />)

  const buttons = screen.queryAllByRole("button")

  expect(buttons?.length).toBe(2)
  expect(buttons[0]).toHaveTextContent(/Retour/i)
  expect(buttons[1]).toHaveTextContent(/Envoyer la déclaration/i)
})

test("should display label for first button to cancel", () => {
  const orderedSteps = [
    { component: DummyComponent, label: "Date et Lieu", name: "dateLocation" },
    { component: DummyComponent, label: "Motifs", name: "reasons" },
    { component: DummyComponent, name: "confirmation" },
  ]

  context.useDeclarationContext.mockReturnValue({
    goPrevious: jest.fn(),
    orderedSteps,
    step: 1,
  })

  render(<FormComponent onSubmit={jest.fn()} title="test" />)

  const buttons = screen.queryAllByRole("button")

  expect(buttons?.length).toBe(2)
  expect(buttons[0]).toHaveTextContent(/Annuler/i)
  expect(buttons[1]).toHaveTextContent(/Suivant/i)
})
