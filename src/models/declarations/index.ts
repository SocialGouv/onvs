import { z } from "zod"
import { Declaration, Prisma } from "@prisma/client"
import prisma from "@/prisma/db"

import {
  ages,
  authorTypes,
  discernmentTroubles,
  etsMainLocations,
  etsSecondaryLocations,
  genders,
  healthJobs,
  isHealthType,
  liberalLocations,
  pursuitComplaintsByValues,
  thirdParties,
  victimTypes,
} from "@/utils/options"
import { difference, uniq } from "lodash"

export enum DeclarationType {
  Liberal = "liberal",
  Ets = "ets",
  Pharmacist = "pharmacist",
}

export enum OuiNonType {
  Oui = "oui",
  Non = "non",
}

export const victimSchema = z
  .object({
    type: z.string().refine((type) => victimTypes.includes(type)),
    gender: z.string().refine((gender) => genders.includes(gender)),
    age: z.string().refine((age) => ages.includes(age)),
    healthJob: z.string().optional(), // the refine rule below will check if this field can be really undefined.
    sickLeaveDays: z.number(),
    hospitalizationDays: z.number(),
    ITTDays: z.number(),
  })
  .strict()
  .refine(
    (val) =>
      isHealthType(val.type)
        ? val.healthJob && healthJobs.includes(val.healthJob)
        : val.healthJob === undefined,
    {
      message:
        "Le champ healthJob doit être rempli (nomenclature healthJobs) si le type est en lien avec une profession de santé (nomenclature healthTypes) et vide sinon.",
    },
  )

export type VictimSchema = z.infer<typeof victimSchema>

export const authorSchema = z
  .object({
    type: z.string().refine((type) => authorTypes.includes(type)),
    gender: z.string().refine((gender) => genders.includes(gender)),
    age: z.string().refine((age) => ages.includes(age)),
    healthJob: z.string().optional(), // the refine rule below will check if this field can be really undefined.
    discernmentTroubles: z
      .string()
      .array()
      .transform((val) => uniq(val))
      .refine((val) => difference(val, discernmentTroubles).length === 0) // Are all the elements included in discernmentTroubles ?
      .optional(),
  })
  .strict()
  .refine(
    (val) =>
      isHealthType(val.type)
        ? val.healthJob && healthJobs.includes(val.healthJob)
        : val.healthJob === undefined,
    {
      message:
        "Le champ healthJob doit être rempli (nomenclature healthJobs) si le type est en lien avec une profession de santé (nomenclature healthTypes) et vide sinon.",
    },
  )

export type AuthorSchema = z.infer<typeof authorSchema>

export const thirdPartySchema = z
  .string()
  .or(z.tuple([z.literal("Autre"), z.string()]))
  .array()
  .transform((val) => uniq(val)) // Remove duplicate entries if any.
  .refine(
    (val) => {
      if (!val.length) return true // Optional is ok.

      // Only 1 array with Autre is allowed.
      const nbArrays = val.filter((elt) => Array.isArray(elt))
      if (nbArrays.length > 1) return false

      for (const elt of val) {
        if (!Array.isArray(elt)) {
          if (!thirdParties.includes(elt)) {
            return false
          }
        }
      }
      return true
    },
    {
      message:
        "Valeur inconnue pour le champ thirdParty ou présence de plusieurs tableaux Autre",
      path: ["thirdParty"],
    },
  )

export type ThirdPartySchemaType = z.infer<typeof thirdPartySchema>

const pursuitSchemaForOther = z
  .object({
    type: z.tuple([z.literal("Autre"), z.string()]),
  })
  .strict()

const pursuitSchemaForLogBook = z
  .object({
    type: z.literal("Main courante"),
  })
  .strict()

const pursuitSchemaForComplaint = z
  .object({
    type: z.literal("Plainte"),
    pursuitBy: z
      .string()
      .array()
      .transform((val) => uniq(val))
      .refine((val) => {
        for (const elt of val) {
          if (!pursuitComplaintsByValues.includes(elt)) return false
        }
        return true
      }),
  })
  .strict()

export const pursuitSchema = z.union([
  pursuitSchemaForOther,
  pursuitSchemaForLogBook,
  pursuitSchemaForComplaint,
])

export type PursuitSchema = z.infer<typeof pursuitSchema>

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
  victims: victimSchema.array(),
  authors: authorSchema.array(),
  victims_deprecated: z.object({}).array(),
  authors_deprecated: z.object({}).array(),

  thirdParty: thirdPartySchema.optional(),
  thirdParty_deprecated: z.string().array(),
  thirdPartyIsPresent_deprecated: z.string(), // TODO For now a string, later it should be a boolean.
  thirdPartyPrecision_deprecated: z.string().optional(), // TODO : nest in future thirdParty JSON field.
  pursuit_deprecated: z.string(), // TODO : check over possible values.
  pursuitPrecision_deprecated: z.string().optional(), // TODO : nest in future thirdParty JSON field.
  pursuitBy_deprecated: z.string().array(),

  pursuit: pursuitSchema.optional(),
  description: z.string(),
})

// Specificity for liberal.
const liberalAddonSchema = z.object({
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
        .or(z.tuple([z.literal("Autre"), z.string()]))
        .refine(
          (val) => {
            if (!Array.isArray(val)) {
              return liberalLocations.includes(val)
            }
            return true
          },
          {
            message:
              "Les valeurs attendues sont dans la nomenclature liberalLocations",
          },
        ),
    })
    .strict(),
})

// Specificity for ETS.
const etsAddonSchema = z.object({
  declarationType: z.literal(DeclarationType.Ets),
  finesset: z.string().refine(async (finesset) => {
    try {
      const ets = await prisma.ets.findUnique({
        where: {
          finesset,
        },
      })
      console.log("pour ets, on trouve", ets)
      return ets !== null
    } catch (error) {
      console.error("Erreur lors du test du finesset")
      return false
    }
  }),

  locationMain_deprecated: z.string(), // TODO: remove when time has come
  locationSecondary_deprecated: z.string(), // TODO: remove when time has come

  location: z
    .object({
      "Dans quel service ?": z
        .string()
        .refine((val) => etsMainLocations.includes(val), {
          message:
            "Les valeurs attendues sont dans la nomenclature etsMainLocations",
        }),
      "Dans quel lieu précisément ?": z
        .string()
        .refine((val) => etsSecondaryLocations.includes(val), {
          message:
            "Les valeurs attendues sont dans la nomenclature etsSecondaryLocations",
        }),
    })
    .strict(),
})

// TODO : il faut aussi préciser la spécialité en plus du job.
// Specificity for pharmacist.
const pharmacistAddonSchema = z.object({
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

export const schemaLiberal = baseSchemaDeclarationApi.merge(liberalAddonSchema)
export const schemaEts = baseSchemaDeclarationApi.merge(etsAddonSchema)

export const schemaPharmacist = liberalAddonSchema.merge(pharmacistAddonSchema)

export const schema = z.union([schemaLiberal, schemaEts])

// export type DeclarationApiType = z.infer<typeof DeclarationApiSchema>

export type DeclarationModel = Declaration

export type DeclarationCreateInput = Prisma.DeclarationCreateInput

// export type DeclarationUpdateInput = Prisma.DeclarationUpdateInput

// export type PartialDeclarationModel = {
//   [Property in keyof DeclarationModel]+?: DeclarationModel[Property]
// }
