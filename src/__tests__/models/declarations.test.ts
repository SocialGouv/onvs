import { schema } from "@/models/declarations"

test("A correct declaration for ets", () => {
  const declaration = {
    declarationType: "ets",
    postalCode: "78290",
    locationMain_deprecated: "Addictologie",
    locationSecondary_deprecated:
      "Véhicule (dans le cadre d’un transport de patients/résidents)",
    location: {
      "Dans quel service ?": "Addictologie",
      "Dans quel lieu précisément ?":
        "Véhicule (dans le cadre d’un transport de patients/résidents)",
    },
    declarantContactAgreement: null,
    date: "2021-07-20",
    hour: "Matin (7h-12h)",
    town: "Croissy-sur-Seine",
    fpSpokenViolences: [],
    fpSexualViolences: [],
    fpPsychologicalViolences: [],
    fpPhysicalViolences: [],
    fpOthers: [],
    fpNoRespects: [],
    fpGroups: [],
    fpDiscriminations: [],
    fgStealWithoutBreakins: [],
    fgStealWithBreakins: [],
    fgOthers: ["Trafic de stupéfiants ou autre trafic dans l’établissement"],
    fgGroups: ["Autres faits"],
    fgDeteriorations: [],
    factTypes: ["Atteinte aux biens"],
    rCausePatients: [],
    rCauseProfessionals: [],
    rDiscords: [],
    rLifeRules: [],
    rFalsifications: [],
    rDeficientCommunications: [],
    rOthers: [],
    rOthersPrecision: "",
    rNotApparent: true,
    pursuit: "Non",
    victims: [
      {
        type: {
          label: "Accompagnant/Visiteur/Famille",
          value: "Accompagnant/Visiteur/Famille",
        },
        gender: {
          label: "Masculin",
          value: "Masculin",
        },
        age: {
          label: "- de 18 ans",
          value: "- de 18 ans",
        },
        sickLeaveDays: 0,
        hospitalizationDays: 0,
        ITTDays: 0,
      },
    ],
    authors: [
      {
        discernmentTroublesIsPresent: "Non",
        type: {
          label: "Accompagnant/Visiteur/Famille",
          value: "Accompagnant/Visiteur/Famille",
        },
        gender: {
          label: "Masculin",
          value: "Masculin",
        },
        age: {
          label: "- de 18 ans",
          value: "- de 18 ans",
        },
      },
    ],
    thirdPartyIsPresent: "Non",
    pursuitBy: [],
    thirdParty: [],
    description: "test",
  }

  expect(schema.parse(declaration)).toMatchInlineSnapshot(`
          Object {
            "authors": Array [
              Object {},
            ],
            "date": "2021-07-20",
            "declarationType": "ets",
            "description": "test",
            "factTypes": Array [
              "Atteinte aux biens",
            ],
            "fgDeteriorations": Array [],
            "fgGroups": Array [
              "Autres faits",
            ],
            "fgOthers": Array [
              "Trafic de stupéfiants ou autre trafic dans l’établissement",
            ],
            "fgStealWithBreakins": Array [],
            "fgStealWithoutBreakins": Array [],
            "fpDiscriminations": Array [],
            "fpNoRespects": Array [],
            "fpOthers": Array [],
            "fpPhysicalViolences": Array [],
            "fpPsychologicalViolences": Array [],
            "fpSexualViolences": Array [],
            "fpSpokenViolences": Array [],
            "hour": "Matin (7h-12h)",
            "location": Object {
              "Dans quel lieu précisément ?": "Véhicule (dans le cadre d’un transport de patients/résidents)",
              "Dans quel service ?": "Addictologie",
            },
            "locationMain_deprecated": "Addictologie",
            "locationSecondary_deprecated": "Véhicule (dans le cadre d’un transport de patients/résidents)",
            "postalCode": "78290",
            "pursuit": "Non",
            "pursuitBy": Array [],
            "rCausePatients": Array [],
            "rCauseProfessionals": Array [],
            "rDeficientCommunications": Array [],
            "rDiscords": Array [],
            "rFalsifications": Array [],
            "rLifeRules": Array [],
            "rNotApparent": true,
            "rOthers": Array [],
            "rOthersPrecision": "",
            "thirdParty": Array [],
            "thirdPartyIsPresent": "Non",
            "town": "Croissy-sur-Seine",
            "victims": Array [
              Object {},
            ],
          }
        `)
})

test("A inccorrect declaration for ets", () => {
  const declaration = {
    declarationType: "ets",
    postalCode: "78290",
    locationMain_deprecated: "Addictologie",
    locationSecondary_deprecated:
      "Véhicule (dans le cadre d’un transport de patients/résidents)",
    location: {
      "Dans quel service ?": "Addictologie",
      // "Dans quel lieu précisément ?":
      //   "Véhicule (dans le cadre d’un transport de patients/résidents)", // This question is mandatory for ets flow
    },
    declarantContactAgreement: null,
    date: "2021-07-20",
    hour: "Matin (7h-12h)",
    town: "Croissy-sur-Seine",
    fpSpokenViolences: [],
    fpSexualViolences: [],
    fpPsychologicalViolences: [],
    fpPhysicalViolences: [],
    fpOthers: [],
    fpNoRespects: [],
    fpGroups: [],
    fpDiscriminations: [],
    fgStealWithoutBreakins: [],
    fgStealWithBreakins: [],
    fgOthers: ["Trafic de stupéfiants ou autre trafic dans l’établissement"],
    fgGroups: ["Autres faits"],
    fgDeteriorations: [],
    factTypes: ["Atteinte aux biens"],
    rCausePatients: [],
    rCauseProfessionals: [],
    rDiscords: [],
    rLifeRules: [],
    rFalsifications: [],
    rDeficientCommunications: [],
    rOthers: [],
    rOthersPrecision: "",
    rNotApparent: true,
    pursuit: "Non",
    victims: [
      {
        type: {
          label: "Accompagnant/Visiteur/Famille",
          value: "Accompagnant/Visiteur/Famille",
        },
        gender: {
          label: "Masculin",
          value: "Masculin",
        },
        age: {
          label: "- de 18 ans",
          value: "- de 18 ans",
        },
        sickLeaveDays: 0,
        hospitalizationDays: 0,
        ITTDays: 0,
      },
    ],
    authors: [
      {
        discernmentTroublesIsPresent: "Non",
        type: {
          label: "Accompagnant/Visiteur/Famille",
          value: "Accompagnant/Visiteur/Famille",
        },
        gender: {
          label: "Masculin",
          value: "Masculin",
        },
        age: {
          label: "- de 18 ans",
          value: "- de 18 ans",
        },
      },
    ],
    thirdPartyIsPresent: "Non",
    pursuitBy: [],
    thirdParty: [],
    // description: "test", // The description is mandatory
  }

  try {
    schema.parse(declaration)
  } catch (error) {
    expect(error?.format()).toMatchInlineSnapshot(`
      Object {
        "_errors": Array [],
        "declarantContactAgreement": Object {
          "_errors": Array [
            "Expected boolean, received null",
          ],
        },
        "declarantContactAgreement_deprecated": Object {
          "_errors": Array [
            "Required",
          ],
        },
        "declarationType": Object {
          "_errors": Array [
            "Expected liberal, received ets",
          ],
        },
        "description": Object {
          "_errors": Array [
            "Required",
            "Required",
          ],
        },
        "job": Object {
          "_errors": Array [
            "Required",
          ],
        },
        "location": Object {
          "Dans quel lieu précisément ?": Object {
            "_errors": Array [
              "Required",
              "Required",
              "Required",
            ],
          },
          "_errors": Array [
            "Unrecognized key(s) in object: 'Dans quel service ?'",
          ],
        },
        "location_deprecated": Object {
          "_errors": Array [
            "Required",
          ],
        },
      }
    `)
  }
})

test("A correct declaration for liberal", async () => {
  const declaration = {
    declarantContactAgreement: false,
    declarationType: "liberal",
    postalCode: "91590",
    job: "Audioprothésiste",
    location_deprecated: "Cabinet individuel",
    otherLocation_deprecated: "",
    declarantContactAgreement_deprecated: "false",
    date: "2021-07-20",
    location: {
      "Dans quel lieu précisément ?": "Cabinet individuel",
    },
    hour: "Matin (7h-12h)",
    town: "D'Huison-Longueville",
    fpSpokenViolences: [],
    fpSexualViolences: [],
    fpPsychologicalViolences: [],
    fpPhysicalViolences: [],
    fpOthers: [],
    fpNoRespects: [],
    fpGroups: [],
    fpDiscriminations: [],
    fgStealWithoutBreakins: [],
    fgStealWithBreakins: [],
    fgOthers: ["Trafic de stupéfiants ou autre trafic dans l’établissement"],
    fgGroups: ["Autres faits"],
    fgDeteriorations: [],
    factTypes: ["Atteinte aux biens"],
    rCausePatients: [],
    rCauseProfessionals: [],
    rDiscords: [],
    rLifeRules: [],
    rFalsifications: [],
    rDeficientCommunications: [],
    rOthers: [],
    rOthersPrecision: "",
    rNotApparent: true,
    pursuit: "Non",
    victims: [
      {
        type: {
          label: "Accompagnant/Visiteur/Famille",
          value: "Accompagnant/Visiteur/Famille",
        },
        gender: {
          label: "Masculin",
          value: "Masculin",
        },
        age: {
          label: "- de 18 ans",
          value: "- de 18 ans",
        },
        sickLeaveDays: 0,
        hospitalizationDays: 0,
        ITTDays: 0,
      },
    ],
    authors: [
      {
        discernmentTroublesIsPresent: "Non",
        type: {
          label: "Accompagnant/Visiteur/Famille",
          value: "Accompagnant/Visiteur/Famille",
        },
        gender: {
          label: "Masculin",
          value: "Masculin",
        },
        age: {
          label: "- de 18 ans",
          value: "- de 18 ans",
        },
      },
    ],
    thirdPartyIsPresent: "Non",
    pursuitBy: [],
    thirdParty: [],
    description: "test",
  }

  expect(schema.parse(declaration)).toMatchInlineSnapshot(`
    Object {
      "authors": Array [
        Object {},
      ],
      "date": "2021-07-20",
      "declarantContactAgreement": false,
      "declarantContactAgreement_deprecated": "false",
      "declarationType": "liberal",
      "description": "test",
      "factTypes": Array [
        "Atteinte aux biens",
      ],
      "fgDeteriorations": Array [],
      "fgGroups": Array [
        "Autres faits",
      ],
      "fgOthers": Array [
        "Trafic de stupéfiants ou autre trafic dans l’établissement",
      ],
      "fgStealWithBreakins": Array [],
      "fgStealWithoutBreakins": Array [],
      "fpDiscriminations": Array [],
      "fpNoRespects": Array [],
      "fpOthers": Array [],
      "fpPhysicalViolences": Array [],
      "fpPsychologicalViolences": Array [],
      "fpSexualViolences": Array [],
      "fpSpokenViolences": Array [],
      "hour": "Matin (7h-12h)",
      "job": "Audioprothésiste",
      "location": Object {
        "Dans quel lieu précisément ?": "Cabinet individuel",
      },
      "location_deprecated": "Cabinet individuel",
      "otherLocation_deprecated": "",
      "postalCode": "91590",
      "pursuit": "Non",
      "pursuitBy": Array [],
      "rCausePatients": Array [],
      "rCauseProfessionals": Array [],
      "rDeficientCommunications": Array [],
      "rDiscords": Array [],
      "rFalsifications": Array [],
      "rLifeRules": Array [],
      "rNotApparent": true,
      "rOthers": Array [],
      "rOthersPrecision": "",
      "thirdParty": Array [],
      "thirdPartyIsPresent": "Non",
      "town": "D'Huison-Longueville",
      "victims": Array [
        Object {},
      ],
    }
  `)
})
