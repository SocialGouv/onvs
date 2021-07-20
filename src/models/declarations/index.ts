import { z } from "zod"
import { Declaration, Prisma } from "@prisma/client"

export enum DeclarationType {
  Liberal = "liberal",
  Ets = "ets",
  Pharmacist = "pharmacist",
}

export enum OuiNonType {
  Oui = "oui",
  Non = "non",
}

// Fields available for all declaration types.
const baseSchemaDeclarationApi = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  hour: z.string(), // TODO use an enum for hours see Step1.js
  town: z.string(),
  postalCode: z.string().min(4).max(5),
  factTypes: z.string().array(), // TODO check the possible values
  //fpGroups: z.string(), // Not needed, I think.
  fpSpokenViolences: z.string().array(),
  fpPhysicalViolences: z.string().array(),
  fpPhysicalViolencesPrecision: z.string().optional(),
  fpSexualViolences: z.string().array(),
  fpPsychologicalViolences: z.string().array(),
  fpDiscriminations: z.string().array(),
  fpNoRespects: z.string().array(),
  fpOthers: z.string().array(),
  fgGroups: z.string().array(),
  fgDeteriorations: z.string().array(),
  fgStealWithoutBreakins: z.string().array(),
  fgStealWithBreakins: z.string().array(),
  fgOthers: z.string().array(),
  rCausePatients: z.string().array(),
  rCauseProfessionals: z.string().array(),
  rDiscords: z.string().array(),
  rLifeRules: z.string().array(),
  rFalsifications: z.string().array(),
  rDeficientCommunications: z.string().array(),
  rOthers: z.string().array(),
  rOthersPrecision: z.string().optional(),
  rNotApparent: z.boolean(),
  victims: z.object({}).array(),
  authors: z.object({}).array(),
  thirdParty: z.string().array(),
  thirdPartyIsPresent: z.string(), // TODO For now a string, later it should be a boolean.
  thirdPartyPrecision: z.string().optional(), // TODO : nest in future thirdParty JSON field.
  pursuit: z.string(), // TODO : check over possible values.
  pursuitPrecision: z.string().optional(), // TODO : nest in future thirdParty JSON field.
  pursuitBy: z.string().array(),
  description: z.string(),
})

// Specificity for liberal.
const schemaLocationForLiberal = z.object({
  declarationType: z.literal(DeclarationType.Liberal),
  job: z.string(),
  declarantContactAgreement: z.boolean(),
  declarantContactAgreement_deprecated: z.string(), // TODO: remove when time has come

  declarantNames: z.string().optional(),
  declarantExternalId: z.string().optional(), // TODO : remove this field.
  declarantEmail: z.string().email().optional(),
  declarantTel: z.string().min(10).optional(),

  location_deprecated: z.string(), // TODO remove when time has come
  otherLocation_deprecated: z.string().optional(), // TODO remove when time has come

  location: z
    .object({
      "Dans quel lieu précisément ?": z
        .string()
        .or(z.tuple([z.literal("Autre"), z.string()])),
    })
    .strict(),
})

// Specificity for ETS.
const schemaLocationForEts = z.object({
  declarationType: z.literal(DeclarationType.Ets),
  etsId: z.string().optional(), // TODO : check if this a uuid refering the ets.
  etsStatus: z.string().optional(), // TODO : remove this field ??
  etsDeclaredBy: z.string().optional(), // TODO : remove this field ??
  etsModeratedBy: z.string().optional(), // TODO : remove this field ??

  locationMain_deprecated: z.string(), // TODO: remove when time has come
  locationSecondary_deprecated: z.string(), // TODO: remove when time has come

  location: z
    .object({
      "Dans quel service ?": z.string(),
      "Dans quel lieu précisément ?": z.string(),
    })
    .strict(),
})

// TODO : il faut aussi préciser la spécialité en plus du job.
// Specificity for pharmacist.
const schemaLocationForPharmacist = z.object({
  declarationType: z.literal(DeclarationType.Liberal),
  job: z.literal("Pharmacien"),

  location: z
    .object({
      "Dans quel lieu précisément ?": z
        .string()
        .or(z.tuple([z.literal("Autre"), z.string()])),
      "Où votre officine se trouve-t-elle ?": z.string(),
      "La pharmacie était-elle ouverte ?": z.nativeEnum(OuiNonType),
      "La pharmacie était-elle de garde ?": z.nativeEnum(OuiNonType),
    })
    .strict(),
})

export const schemaLiberal = baseSchemaDeclarationApi.merge(
  schemaLocationForLiberal,
)
export const schemaEts = baseSchemaDeclarationApi.merge(schemaLocationForEts)

export const schemaPharmacist = schemaLocationForLiberal.merge(
  schemaLocationForPharmacist,
)

export const schema = z.union([schemaLiberal, schemaEts])

// export type DeclarationApiType = z.infer<typeof DeclarationApiSchema>

export type DeclarationModel = Declaration

export type DeclarationCreateInput = Prisma.DeclarationCreateInput

// export type DeclarationUpdateInput = Prisma.DeclarationUpdateInput

// export type PartialDeclarationModel = {
//   [Property in keyof DeclarationModel]+?: DeclarationModel[Property]
// }
