import {
  factGoodsSchema,
  FactGoodsSchema,
  factPersonsSchema,
  FactPersonsSchema,
} from "@/models/declarations"

test("factGoodsSchema ok, duplication of correct values is ok", () => {
  const object: FactGoodsSchema = {
    Dégradation: [
      "Dégradation autre que par incendie",
      "Tags, graffitis, autres salissures",
      "Tags, graffitis, autres salissures",
      "Tags, graffitis, autres salissures",
    ],
    "Vol sans effraction": ["Informations", "Vol à main armée"],
  }

  expect(factGoodsSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "Dégradation": Array [
        "Dégradation autre que par incendie",
        "Tags, graffitis, autres salissures",
      ],
      "Vol sans effraction": Array [
        "Informations",
        "Vol à main armée",
      ],
    }
  `)
})

test("factGoodsSchema ko, unexpected values", () => {
  const object: FactGoodsSchema = {
    Dégradation: ["Dégradation autre que par incendie", "graffitis..."],
  }

  expect.assertions(1)

  try {
    factGoodsSchema.parse(object)
  } catch (error) {
    expect(error).toMatchInlineSnapshot(`
      [Error: [
        {
          "code": "custom",
          "message": "Invalid input",
          "path": [
            "Dégradation"
          ]
        }
      ]]
    `)
  }
})

test("factPersonsSchema ok, duplication of correct values is ok", () => {
  const object: FactPersonsSchema = {
    "La victime a subi une violence verbale": [
      "Injure, provocation, outrage",
      "Propos discriminatoire",
    ],
    "La victime a subi une violence physique": [
      "Maltraitance volontaire ou par négligence",
      "Maltraitance volontaire ou par négligence",
    ],
  }

  expect(factPersonsSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "La victime a subi une violence physique": Array [
        "Maltraitance volontaire ou par négligence",
      ],
      "La victime a subi une violence verbale": Array [
        "Injure, provocation, outrage",
        "Propos discriminatoire",
      ],
    }
  `)
})

test("factPersonsSchema ko, free text fields with incorrect format", () => {
  const object: FactPersonsSchema = {
    "La victime a subi une violence verbale xxx": [
      "Injure, provocation, outrage",
    ],
  }

  expect.assertions(1)

  try {
    factPersonsSchema.parse(object)
  } catch (error) {
    expect(error).toMatchInlineSnapshot(`
      [Error: [
        {
          "code": "unrecognized_keys",
          "keys": [
            "La victime a subi une violence verbale xxx"
          ],
          "path": [],
          "message": "Unrecognized key(s) in object: 'La victime a subi une violence verbale xxx'"
        }
      ]]
    `)
  }
})

test("factPersonsSchema ok, free text fields with correct format", () => {
  const object: FactPersonsSchema = {
    "La victime a subi une violence verbale": [
      "Injure, provocation, outrage",
      "Propos discriminatoire",
    ],
    "La victime a subi une violence physique": [
      "Maltraitance volontaire ou par négligence",
      ["Autre fait qualifié de crime", "xxx"],
    ],
  }

  expect(factPersonsSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "La victime a subi une violence physique": Array [
        "Maltraitance volontaire ou par négligence",
        Array [
          "Autre fait qualifié de crime",
          "xxx",
        ],
      ],
      "La victime a subi une violence verbale": Array [
        "Injure, provocation, outrage",
        "Propos discriminatoire",
      ],
    }
  `)
})

test("factPersonsSchema ko, free text fields with incorrect format", () => {
  const object: any = {
    "La victime a subi une violence verbale": [
      "Injure, provocation, outrage",
      "Propos discriminatoire",
    ],
    "La victime a subi une violence physique": [
      "Maltraitance volontaire ou par négligence",
      ["Autre fait qualifié de crime", "xxx", "yyy"],
    ],
  }

  expect.assertions(1)

  try {
    factPersonsSchema.parse(object)
  } catch (error) {
    expect(error).toMatchInlineSnapshot(`
      [Error: [
        {
          "code": "invalid_union",
          "unionErrors": [
            {
              "issues": [
                {
                  "code": "invalid_type",
                  "expected": "string",
                  "received": "array",
                  "path": [
                    "La victime a subi une violence physique",
                    1
                  ],
                  "message": "Expected string, received array"
                }
              ]
            },
            {
              "issues": [
                {
                  "code": "too_big",
                  "maximum": 2,
                  "inclusive": true,
                  "type": "array",
                  "path": [
                    "La victime a subi une violence physique",
                    1
                  ],
                  "message": "Should have at most 2 items"
                }
              ]
            }
          ],
          "path": [
            "La victime a subi une violence physique",
            1
          ],
          "message": "Invalid input"
        }
      ]]
    `)
  }
})
