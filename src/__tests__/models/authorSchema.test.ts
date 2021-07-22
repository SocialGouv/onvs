import { authorSchema, AuthorSchema } from "@/models/declarations"

test("authorSchema ok, simplest case", () => {
  const object: AuthorSchema = {
    type: "Détenu",
    gender: "Masculin",
    age: "- de 18 ans",
  }
  expect(authorSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "age": "- de 18 ans",
      "gender": "Masculin",
      "type": "Détenu",
    }
  `)
})

test("authorSchema ok, with discernment troubles (duplicate is ok if expected values)", () => {
  const object: AuthorSchema = {
    type: "Détenu",
    gender: "Masculin",
    age: "- de 18 ans",
    discernmentTroubles: [
      "Prise d’alcool",
      "Prise d’alcool",
      "Prise de produits stupéfiants",
    ],
  }
  expect(authorSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "age": "- de 18 ans",
      "discernmentTroubles": Array [
        "Prise d’alcool",
        "Prise de produits stupéfiants",
      ],
      "gender": "Masculin",
      "type": "Détenu",
    }
  `)
})

test("authorSchema ok, for health type", () => {
  const object: AuthorSchema = {
    type: "Étudiant en santé",
    gender: "Masculin",
    age: "- de 18 ans",
    healthJob: "Ambulancier",
  }
  expect(authorSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "age": "- de 18 ans",
      "gender": "Masculin",
      "healthJob": "Ambulancier",
      "type": "Étudiant en santé",
    }
  `)
})

test("authorSchema ok, for health type, the healthJob must be filled", () => {
  const object: AuthorSchema = {
    type: "Étudiant en santé",
    gender: "Masculin",
    age: "- de 18 ans",
  }
  expect.assertions(1)

  try {
    authorSchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [
          "Le champ healthJob doit être rempli (nomenclature healthJobs) si le type est en lien avec une profession de santé (nomenclature healthTypes) et vide sinon.",
        ],
      }
    `)
  }
})

test("authorSchema in error, for an health type, there is an healthJob but not an expected value", () => {
  const object: AuthorSchema = {
    type: "Étudiant en santé",
    gender: "Masculin",
    age: "- de 18 ans",
    healthJob: "titi",
  }
  expect.assertions(1)

  try {
    authorSchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [
          "Le champ healthJob doit être rempli (nomenclature healthJobs) si le type est en lien avec une profession de santé (nomenclature healthTypes) et vide sinon.",
        ],
      }
    `)
  }
})

test("authorSchema in error, for not an health type, this shoud be no healthJob", () => {
  const object: AuthorSchema = {
    type: "Détenu",
    gender: "Masculin",
    age: "- de 18 ans",
    healthJob: "Ambulancier",
  }
  expect.assertions(1)

  try {
    authorSchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [
          "Le champ healthJob doit être rempli (nomenclature healthJobs) si le type est en lien avec une profession de santé (nomenclature healthTypes) et vide sinon.",
        ],
      }
    `)
  }
})

test("authorSchema in error for tuple which not have 2 elements only", () => {
  const object: AuthorSchema = {
    type: "titi",
    gender: "Masculin",
    age: "- de 18 ans",
  }

  expect.assertions(1)

  try {
    authorSchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [],
        "type": Object {
          "_errors": Array [
            "Invalid input",
          ],
        },
      }
    `)
  }
})

// Tests on non compatible types (like the consumer of our API).

test("authorSchema in error, for not an health type, this shoud be no healthJob", () => {
  const object = {
    type: "Détenu",
    gender: "Masculin",
    age: 18,
  }
  expect.assertions(1)

  try {
    authorSchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [],
        "age": Object {
          "_errors": Array [
            "Expected string, received number",
          ],
        },
      }
    `)
  }
})
