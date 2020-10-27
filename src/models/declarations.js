import * as yup from "yup"

import * as common from "./common"

// Mapping keys from JS model to DB model
const mappingJStoDB = {
  authors: "authors",
  createdAt: "created_at",
  date: "date",
  declarantContactAgreement: "declarant_contact_agreement",
  declarantEmail: "declarant_email",
  declarantExternalId: "declarant_external_id",
  declarantNames: "declarant_names",
  declarantTel: "declarant_tel",
  declarationType: "declaration_type",
  description: "description",
  factTypes: "fact_types",
  fgDeteriorations: "fg_deteriorations",
  fgGroups: "fg_groups",
  fgOthers: "fg_others",
  // fgOthersPrecision: "fg_others_precision",
  fgStealWithBreakins: "fg_steal_with_breakins",
  fgStealWithoutBreakins: "fg_steal_without_breakins",
  fpDiscriminations: "fp_discriminations",
  fpGroups: "fp_groups",
  fpNoRespects: "fp_no_respects",
  fpOthers: "fp_others",
  // fpOthersPrecision: "fp_others_precision",
  fpPhysicalViolences: "fp_physical_violences",
  // fpHarassments: "fp_harassments",
  fpPhysicalViolencesPrecision: "fp_physical_violences_precision",
  fpPsychologicalViolences: "fp_psychological_violences",
  fpSexualViolences: "fp_sexual_violences",
  fpSpokenViolences: "fp_spoken_violences",
  hour: "hour",
  id: "id",
  job: "job",
  location: "location",
  otherLocation: "other_location",
  pursuit: "pursuit",
  pursuitBy: "pursuit_by",
  rCausePatients: "r_cause_patients",
  rCauseProfessionals: "r_cause_professionals",
  rDeficientCommunications: "r_deficient_communications",
  rDiscords: "r_discords",
  rFalsifications: "r_falsifications",
  rLifeRules: "r_life_rules",
  rNotApparent: "r_not_apparent",
  rOthers: "r_others",
  rOthersPrecision: "r_others_precision",
  thirdParty: "third_party",
  thirdPartyIsPresent: "third_party_is_present",
  thirdPartyPrecision: "third_party_precision",
  town: "town",
  victims: "victims",
}

// Cast the Select input shape ({label, value}) into a simple string
const getValueFromSelect = () =>
  yup.string().transform(function (_, originalValue) {
    return originalValue?.value || ""
  })

const yupJson = yup
  .string()
  .transform((_, originalValue) => JSON.stringify(originalValue))

// TODO ajouter les valeurs possibles pour prévoir le cas des éditeurs qui appellent l'API
// ex: declarantContactAgreement = Oui ou Non
// declarantExternalId = 9 ou 11 chiffres, etc..
const schemaJS = yup.object({
  authors: yupJson,
  createdAt: yup.string(),
  date: yup.string().required(), // date
  declarantContactAgreement: yup.string(), // Oui ou Non
  declarantEmail: yup.string(),
  declarantExternalId: yup.string(), // 9 ou 11 chiffres
  declarantNames: yup.string(),
  declarantTel: yup.string(), // 10 chiffres
  declarationType: yup.string(), // libéral ou ets
  description: yup.string(), // non vide

  factTypes: yupJson, // Atteinte aux personnes ou Atteinte aux biens
  fgDeteriorations: yupJson,
  fgGroups: yupJson,
  fgOthers: yupJson,
  fgStealWithBreakins: yupJson,
  fgStealWithoutBreakins: yupJson,

  fpDiscriminations: yupJson,
  fpGroups: yupJson,
  fpNoRespects: yupJson,
  fpOthers: yupJson,
  fpPhysicalViolences: yupJson,
  fpPhysicalViolencesPrecision: yup.string(),
  fpPsychologicalViolences: yupJson,
  fpSexualViolences: yupJson,
  fpSpokenViolences: yupJson,

  hour: getValueFromSelect(),
  id: yup.string(),
  job: getValueFromSelect(),
  location: yup.string().required(),
  otherLocation: yup.string(),
  pursuit: yup.string(),
  pursuitBy: yupJson,
  pursuitPrecision: yup.string(),

  rCausePatients: yupJson,
  rCauseProfessionals: yupJson,
  rDeficientCommunications: yupJson,
  rDiscords: yupJson,
  rFalsifications: yupJson,
  rLifeRules: yupJson,
  rNotApparent: yup.boolean().transform((_, originalValue) => !!originalValue),
  rOthers: yupJson,
  rOthersPrecision: yup.string(),

  thirdParty: yupJson,
  thirdPartyIsPresent: yup.string(),
  thirdPartyPrecision: yup.string(),
  town: yup.string().required(),
  victims: yupJson,
})

// TODO do the schema in reverse. Beware of rNotApparent, if true, set it to "Pas de motif apparent"
const schemaDB = yup.object({
  r_not_apparent: yup
    .string()
    .transform((_, originalValue) =>
      originalValue ? "Pas de motif apparent" : "",
    ),
})

export const { castJSToDB, castDBToJS, validateJS } = common.build({
  entityName: "declarations",
  mappingJStoDB,
  schemaDB,
  schemaJS,
})

/*
1. validate pour caster et valider
2. renommage des propriétés
*/
