import { EtsApiSchema } from "@/models/ets"

import faker from "faker"

import { JuridicStatus } from "@/models/ets"

test("A incorrect ets", () => {
  const ets = {
    id: "30498203948",
    juridicStatus: "Autre", // faux
  }

  expect(() => {
    EtsApiSchema.parse(ets)
  }).toThrow()
})

test("A correct ets", () => {
  const id = faker.datatype.uuid()
  const finesset = faker.datatype.number({ min: 100000000, max: 999999999 })
  const town = faker.address.city()

  const ets = {
    id,
    finesset: String(finesset),
    juridicStatus: JuridicStatus.Private, // faux
    town,
    rs: " CHU " + town,
  }

  const res = EtsApiSchema.parse(ets)

  // Expect no error.
  expect(res).toBe(res)
})
