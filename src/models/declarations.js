import * as yup from "yup"

import * as common from "./common"

// Mapping keys from JS model to DB model
const mappingJStoDB = {
  authors: "authors",
  date: "date",
  declarantContactAgreement: "declarant_contact_agreement",
  declarantEmail: "declarant_email",
  declarantId: "declarant_id",
  declarantNames: "declarant_names",
  declarantTel: "declarant_tel",
  description: "description",
  factTypes: "fact_types",
  fgDeteriorations: "fg_deteriorations",
  fgGroups: "fg_groups",
  fgOthers: "fg_others",
  fgOthersPrecision: "fg_others_precision",
  fgStealWithBreakins: "fg_steal_with_breakins",
  fgStealWithoutBreakins: "fg_steal_without_breakins",
  fpDiscriminations: "fp_discriminations",
  fpGroups: "fp_groups",
  fpHarassments: "fp_harassments",
  fpNoRespects: "fp_no_respects",
  fpOthers: "fp_others",
  fpOthersPrecision: "fp_others_precision",
  fpPhysicalViolences: "fp_physical_violences",
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
  thirdParty: "third_party",
  town: "town",
  victims: "victims",
}

// Cast the Select input shape ({label, value}) into a simple string
const getValueFromSelect = () =>
  yup.string().transform(function (_, originalValue) {
    return originalValue?.value || ""
  })

const schemaJSToDB = yup.object({
  // authors: yup.array().of(
  //   yup.object({
  //     age: getValueFromSelect(),
  //     discernmentTroubles: yup.array().of(yup.string()),
  //     gender: getValueFromSelect(),
  //     type: getValueFromSelect(),
  //   }),
  // ),
  authors: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  date: yup.string().required(),
  declarantContactAgreement: yup.string(),
  declarantEmail: yup.string(),
  declarantId: yup.string(),
  declarantNames: yup.string(),
  declarantTel: yup.string(),
  description: yup.string(),
  // factTypes: yup.array().of(yup.string()),
  factTypes: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fgDeteriorations: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fgGroups: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fgOthers: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fgOthersPrecision: yup.string(),
  fgStealWithBreakins: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fgStealWithoutBreakins: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fpDiscriminations: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fpGroups: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fpHarassments: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fpNoRespects: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fpOthers: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fpOthersPrecision: yup.string(),
  fpPhysicalViolences: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fpPsychologicalViolences: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fpSexualViolences: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  fpSpokenViolences: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  hour: getValueFromSelect(),
  id: yup.string(),
  job: getValueFromSelect(),
  location: yup.string().required(),
  otherLocation: yup.string(),
  pursuit: yup.string(),
  pursuitBy: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  rCausePatients: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),

  rCauseProfessionals: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  rDeficientCommunications: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  rDiscords: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  rFalsifications: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),

  rLifeRules: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  rNotApparent: yup.boolean().transform((_, originalValue) => !!originalValue),
  rOthers: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
  thirdParty: yup.string(),
  town: yup.string().required(),
  // victims: yup.array().of(
  //   yup.object({
  //     ITTDays: yup.number(),
  //     age: getValueFromSelect(),
  //     gender: getValueFromSelect(),
  //     healthJob: getValueFromSelect(),
  //     hospitalizationDays: yup.number(),
  //     sickLeaveDays: yup.number(),
  //     type: getValueFromSelect(),
  //   }),
  victims: yup
    .string()
    .transform((_, originalValue) => JSON.stringify(originalValue)),
})

// TODO do the schema in reverse. Beware of rNotApparent, if true, set it to "Pas de motif apparent"
const schemaDBToJS = {}

export const { castJSToDB, validateJS } = common.build({
  entityName: "declarations",
  mappingJStoDB,
  schemaDBToJS,
  schemaJSToDB,
})

/*
1. validate pour caster et valider
2. renommage des propriétés
*/
