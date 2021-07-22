import { victimSchema, VictimSchema } from "@/models/declarations"

test("victimSchema ok, simplest case", () => {
  const object: VictimSchema = {
    type: "Détenu",
    gender: "Masculin",
    age: "- de 18 ans",
    sickLeaveDays: 0,
    hospitalizationDays: 0,
    ITTDays: 0,
  }

  expect(victimSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "ITTDays": 0,
      "age": "- de 18 ans",
      "gender": "Masculin",
      "hospitalizationDays": 0,
      "sickLeaveDays": 0,
      "type": "Détenu",
    }
  `)
})

test("victimSchema ok, simplest case variation 1", () => {
  const object: VictimSchema = {
    type: "Étudiant en santé",
    gender: "Masculin",
    age: "- de 18 ans",
    healthJob: "Ambulancier",
    sickLeaveDays: 1,
    hospitalizationDays: 2,
    ITTDays: 3,
  }

  expect(victimSchema.parse(object)).toMatchInlineSnapshot(`
    Object {
      "ITTDays": 3,
      "age": "- de 18 ans",
      "gender": "Masculin",
      "healthJob": "Ambulancier",
      "hospitalizationDays": 2,
      "sickLeaveDays": 1,
      "type": "Étudiant en santé",
    }
  `)
})

test("victimSchema in error, for not healthType, healthJob should not be present", () => {
  const object: VictimSchema = {
    type: "Détenu",
    gender: "Masculin",
    age: "- de 18 ans",
    healthJob: "Ambulancier",
    sickLeaveDays: 0,
    hospitalizationDays: 0,
    ITTDays: 0,
  }

  try {
    victimSchema.parse(object)
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

test("victimSchema in error, type is not an expected value", () => {
  const object: VictimSchema = {
    type: "titi",
    gender: "Masculin",
    age: "- de 18 ans",
    sickLeaveDays: 0,
    hospitalizationDays: 0,
    ITTDays: 0,
  }

  try {
    victimSchema.parse(object)
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

test("victimSchema in error, gender is not an expected value", () => {
  const object: VictimSchema = {
    type: "Détenu",
    gender: "titi",
    age: "- de 18 ans",
    sickLeaveDays: 0,
    hospitalizationDays: 0,
    ITTDays: 0,
  }

  try {
    victimSchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [],
        "gender": Object {
          "_errors": Array [
            "Invalid input",
          ],
        },
      }
    `)
  }
})

test("victimSchema in error, healthJob is expectend but has not an expected value", () => {
  const object: VictimSchema = {
    type: "Étudiant en santé",
    gender: "Masculin",
    age: "- de 18 ans",
    healthJob: "titi",
    sickLeaveDays: 1,
    hospitalizationDays: 2,
    ITTDays: 3,
  }

  try {
    victimSchema.parse(object)
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

// Tests on non compatible types (like the consumer of our API).

test("victimSchema ok, simplest case", () => {
  const object = {
    type: "Détenu",
    gender: "Masculin",
    age: "- de 18 ans",
    sickLeaveDays: "10",
    hospitalizationDays: 0,
    ITTDays: 0,
  }

  expect.assertions(1)

  try {
    victimSchema.parse(object)
  } catch (error) {
    expect(error.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [],
        "sickLeaveDays": Object {
          "_errors": Array [
            "Expected number, received string",
          ],
        },
      }
    `)
  }
})
