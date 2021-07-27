import { thirdPartySchema, ThirdPartySchemaType } from "@/models/declarations"

test("thirdPartySchema ok, even for duplicate entries when they are expected entries", () => {
  const object: ThirdPartySchemaType = [
    "Personnel hospitalier",
    "Sapeurs-pompiers",
    "Sapeurs-pompiers",
  ]

  expect(thirdPartySchema.parse(object)).toMatchInlineSnapshot(`
    Array [
      "Personnel hospitalier",
      "Sapeurs-pompiers",
    ]
  `)
})

test("thirdPartySchema is ok, example with tuple Autre", () => {
  const object: ThirdPartySchemaType = []

  expect(thirdPartySchema.parse(object)).toMatchInlineSnapshot(`Array []`)
})

test("thirdPartySchema is ok, example with tuple Autre", () => {
  const object: ThirdPartySchemaType = [["Autre", "titi"], "Sapeurs-pompiers"]

  expect(thirdPartySchema.parse(object)).toMatchInlineSnapshot(`
    Array [
      Array [
        "Autre",
        "titi",
      ],
      "Sapeurs-pompiers",
    ]
  `)
})

test("thirdPartySchema in error when found an unknown entry", () => {
  const object: ThirdPartySchemaType = ["Personnel hospitalier", "titi"]

  expect.assertions(1)

  try {
    thirdPartySchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [],
        "thirdParty": Object {
          "_errors": Array [
            "Valeur inconnue pour le champ thirdParty ou présence de plusieurs tableaux Autre",
          ],
        },
      }
    `)
  }
})

test("thirdPartySchema in error if there is 2 tuples with Autre in first place", () => {
  const object: ThirdPartySchemaType = [
    ["Autre", "titi"],
    ["Autre", "toto"],
  ]

  expect.assertions(1)

  try {
    thirdPartySchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [],
        "thirdParty": Object {
          "_errors": Array [
            "Valeur inconnue pour le champ thirdParty ou présence de plusieurs tableaux Autre",
          ],
        },
      }
    `)
  }
})

// Tests on non compatible types (like the consumer of our API).

test("thirdPartySchema in error for type non string", () => {
  const object = [3]

  expect.assertions(1)

  try {
    thirdPartySchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "0": Object {
          "_errors": Array [
            "Expected string, received number",
            "Expected array, received number",
          ],
        },
        "_errors": Array [],
      }
    `)
  }
})

test("thirdPartySchema in error if tuple has no Autre sring in first place", () => {
  const object = [["AUTRE2", "titi"]]

  expect.assertions(1)

  try {
    thirdPartySchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "0": Object {
          "0": Object {
            "_errors": Array [
              "Expected Autre, received AUTRE2",
            ],
          },
          "_errors": Array [
            "Expected string, received array",
          ],
        },
        "_errors": Array [],
      }
    `)
  }
})
