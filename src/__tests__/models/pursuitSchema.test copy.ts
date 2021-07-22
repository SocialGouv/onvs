import { pursuitSchema, PursuitSchema } from "@/models/declarations"

test("pursuitSchema ok, for tuple with Autre in first place", () => {
  const object: PursuitSchema = {
    value: ["Autre", "titi"],
  }
  expect(pursuitSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "value": Array [
        "Autre",
        "titi",
      ],
    }
  `)
})

test("pursuitSchema ok, for Plainte", () => {
  const object: PursuitSchema = {
    value: "Plainte",
    details: ["L'établissement", "L'ordre", "L'ordre"],
  }
  expect(pursuitSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "details": Array [
        "L'établissement",
        "L'ordre",
      ],
      "value": "Plainte",
    }
  `)
})

test("pursuitSchema in error for Plainte because details has not expected values", () => {
  const object: PursuitSchema = {
    value: "Plainte",
    details: ["L'établissement", "L'ordre", "titi"],
  }

  expect.assertions(1)

  try {
    pursuitSchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [
          "Unrecognized key(s) in object: 'details'",
          "Unrecognized key(s) in object: 'details'",
        ],
        "details": Object {
          "_errors": Array [
            "Invalid input",
          ],
        },
        "value": Object {
          "_errors": Array [
            "Expected array, received string",
            "Expected Main courante, received Plainte",
          ],
        },
      }
    `)
  }
})

test("pursuitSchema ok, for Main courante", () => {
  const object: PursuitSchema = {
    value: "Main courante",
  }
  expect(pursuitSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "value": "Main courante",
    }
  `)
})

// Tests on non compatible types (like the consumer of our API).

test("pursuitSchema in error for tuple which not have 2 elements only", () => {
  const object = {
    value: ["Autre", "toto", "titi"],
  }

  expect.assertions(1)

  try {
    pursuitSchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [],
        "details": Object {
          "_errors": Array [
            "Required",
          ],
        },
        "value": Object {
          "_errors": Array [
            "Should have at most 2 items",
            "Expected Main courante, received Autre,toto,titi",
            "Expected Plainte, received Autre,toto,titi",
          ],
        },
      }
    `)
  }
})

test("pursuitSchema in error for Main courante when not expected fields", () => {
  const object = {
    value: "Main courante",
    details: ["L'ordre"],
  }

  expect.assertions(1)

  try {
    pursuitSchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [
          "Unrecognized key(s) in object: 'details'",
          "Unrecognized key(s) in object: 'details'",
        ],
        "value": Object {
          "_errors": Array [
            "Expected array, received string",
            "Expected Plainte, received Main courante",
          ],
        },
      }
    `)
  }
})
