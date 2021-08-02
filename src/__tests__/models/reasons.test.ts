import { reasonsSchema, ReasonSchema } from "@/models/declarations"

test("reasonsSchema ok, duplication of correct values is ok", () => {
  const object: ReasonSchema = {
    "Refus par le professionnel de santé": [
      "De soins",
      "De donner un RDV (délai, horaire)",
      "De donner un RDV (délai, horaire)",
    ],
  }

  expect(reasonsSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "Refus par le professionnel de santé": Array [
        "De soins",
        "De donner un RDV (délai, horaire)",
      ],
    }
  `)
})

test("reasonsSchema KO, key is not expected", () => {
  const object: ReasonSchema = {
    "Refus par le professionnel de santé xxx": ["De soins"],
  }

  expect.assertions(1)

  try {
    reasonsSchema.parse(object)
  } catch (error) {
    expect(error).toMatchInlineSnapshot(`
      [Error: [
        {
          "code": "unrecognized_keys",
          "keys": [
            "Refus par le professionnel de santé xxx"
          ],
          "path": [],
          "message": "Unrecognized key(s) in object: 'Refus par le professionnel de santé xxx'"
        }
      ]]
    `)
  }
})

test("reasonsSchema ok, exemple with a precision", () => {
  const object: ReasonSchema = {
    "Refus par le professionnel de santé": ["De soins"],
    "Motifs divers": ["Atteinte au principe de laïcité", ["Autre", "xxx"]],
  }

  expect(reasonsSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "Motifs divers": Array [
        "Atteinte au principe de laïcité",
        Array [
          "Autre",
          "xxx",
        ],
      ],
      "Refus par le professionnel de santé": Array [
        "De soins",
      ],
    }
  `)
})

test("reasonsSchema KO, precision is not expected with this key", () => {
  const object: ReasonSchema = {
    "Refus par le professionnel de santé": ["De soins"],
    "Motifs divers": ["Atteinte au principe de laïcité", ["Autre xxxx", "xxx"]],
  }

  expect.assertions(1)

  try {
    reasonsSchema.parse(object)
  } catch (error) {
    expect(error).toMatchInlineSnapshot(`
      [Error: [
        {
          "code": "custom",
          "message": "Invalid input",
          "path": [
            "Motifs divers"
          ]
        }
      ]]
    `)
  }
})
