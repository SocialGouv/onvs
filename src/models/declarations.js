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

const getValueFromSelect = () =>
  yup.string().transform(function (_, originalValue) {
    return originalValue?.value || ""
  })

const schemaJSToDB = yup.object({
  authors: yup.array().of(
    yup.object({
      age: getValueFromSelect(),
      discernmentTroubles: yup.array().of(yup.string()),
      gender: getValueFromSelect(),
      type: getValueFromSelect(),
    }),
  ),
  date: yup.string().required(),
  declarantContactAgreement: yup.string(),
  declarantEmail: yup.string(),
  declarantId: yup.string(),
  declarantNames: yup.string(),
  declarantTel: yup.string(),
  description: yup.string(),
  factTypes: yup.array().of(yup.string()),
  fgDeteriorations: yup.array().of(yup.string()),
  fgGroups: yup.array().of(yup.string()),
  fgOthers: yup.array().of(yup.string()),
  fgOthersPrecision: yup.string(),
  fgStealWithBreakins: yup.array().of(yup.string()),
  fgStealWithoutBreakins: yup.array().of(yup.string()),
  fpDiscriminations: yup.array().of(yup.string()),
  fpGroups: yup.array().of(yup.string()),
  fpHarassments: yup.array().of(yup.string()),
  fpNoRespects: yup.array().of(yup.string()),
  fpOthers: yup.array().of(yup.string()),
  fpOthersPrecision: yup.string(),
  fpPhysicalViolences: yup.array().of(yup.string()),
  fpPsychologicalViolences: yup.array().of(yup.string()),
  fpSexualViolences: yup.array().of(yup.string()),
  fpSpokenViolences: yup.array().of(yup.string()),
  hour: getValueFromSelect(),
  id: yup.string(),
  job: getValueFromSelect(),
  location: yup.string().required(),
  otherLocation: yup.string(),
  pursuit: yup.string(),
  pursuitBy: yup.array().of(yup.string()),
  rCausePatients: yup.array().of(yup.string()),

  rCauseProfessionals: yup.array().of(yup.string()),
  rDeficientCommunications: yup.array().of(yup.string()),
  rDiscords: yup.array().of(yup.string()),
  rFalsifications: yup.array().of(yup.string()),

  rLifeRules: yup.array().of(yup.string()),
  rNotApparent: yup.boolean(),
  rOthers: yup.array().of(yup.string()),
  thirdParty: yup.string(),
  town: yup.string().required(),
  victims: yup.array().of(
    yup.object({
      ITTDays: yup.number(),
      age: getValueFromSelect(),
      gender: getValueFromSelect(),
      healthJob: getValueFromSelect(),
      hospitalizationDays: yup.number(),
      sickLeaveDays: yup.number(),
      type: getValueFromSelect(),
    }),
  ),
})

// TODO do the schema in reverse
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
