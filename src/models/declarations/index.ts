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
  factPersonsGroups,
  factGoodsGroups,
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

const makeFactProperty = (property: {
  label: string
  options: Array<{ value: string }>
}) => ({
  [property.label]: z
    .string()
    .or(z.tuple([z.string(), z.string()]))
    .array()
    .transform((val) => uniq(val))
    .refine((arr) => {
      for (const elt of arr) {
        const key = Array.isArray(elt) && elt.length ? elt[0] : elt
        if (!property.options.map((option) => option.value).includes(key)) {
          return false
        }
      }
      return true
    })
    .optional(),
})

export const factPersonsSchema = z
  .object({
    ...makeFactProperty(factPersonsGroups.fpSpokenViolences),
    ...makeFactProperty(factPersonsGroups.fpPhysicalViolences),
    ...makeFactProperty(factPersonsGroups.fpSexualViolences),
    ...makeFactProperty(factPersonsGroups.fpPsychologicalViolences),
    ...makeFactProperty(factPersonsGroups.fpDiscriminations),
    ...makeFactProperty(factPersonsGroups.fpNoRespects),
    ...makeFactProperty(factPersonsGroups.fpOthers),
  })
  .strict()

export type FactPersonsSchema = z.infer<typeof factPersonsSchema>

export const factGoodsSchema = z
  .object({
    ...makeFactProperty(factGoodsGroups.fgDeteriorations),
    ...makeFactProperty(factGoodsGroups.fgStealWithoutBreakins),
    ...makeFactProperty(factGoodsGroups.fgStealWithBreakins),
    ...makeFactProperty(factGoodsGroups.fgOthers),
  })
  .strict()

export type FactGoodsSchema = z.infer<typeof factGoodsSchema>

// Fields available for all declaration types.
const baseSchemaDeclarationApi = z.object({
  id: z.string().uuid().optional(),
  date: z.string(),
  hour: z.string(), // TODO use an enum for hours see Step1.js
  town: z.string(),
  postalCode: z.string().min(4).max(5),
  factTypes_deprecated: z.string().array(), // TODO check the possible values
  //fpGroups: z.string(), // Not needed, I think.
  fpSpokenViolences_deprecated: z.string().array(),
  fpPhysicalViolences_deprecated: z.string().array(),
  fpPhysicalViolencesPrecision_deprecated: z.string().optional(),
  fpSexualViolences_deprecated: z.string().array(),
  fpPsychologicalViolences_deprecated: z.string().array(),
  fpDiscriminations_deprecated: z.string().array(),
  fpNoRespects_deprecated: z.string().array(),
  fpOthers_deprecated: z.string().array(),
  fgGroups_deprecated: z.string().array(),
  fgDeteriorations_deprecated: z.string().array(),
  fgStealWithoutBreakins_deprecated: z.string().array(),
  fgStealWithBreakins_deprecated: z.string().array(),
  fgOthers_deprecated: z.string().array(),

  factPersons: factPersonsSchema,
  factGoods: factGoodsSchema,

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

// The control on facts can't be on baseSchemaDeclarationApi directly, I don't know why (merge error in this case).
export const schemaLiberal = baseSchemaDeclarationApi
  .merge(liberalAddonSchema)
  .refine(
    (elt) =>
      Object.keys(elt.factPersons).length || Object.keys(elt.factGoods).length,
    {
      message:
        "Au moins un fait sur les personnes ou les biens doit être présent",
    },
  )
export const schemaEts = baseSchemaDeclarationApi
  .merge(etsAddonSchema)
  .refine(
    (elt) =>
      Object.keys(elt.factPersons).length || Object.keys(elt.factGoods).length,
    {
      message:
        "Au moins un fait sur les personnes ou les biens doit être présent",
    },
  )

export const schemaPharmacist = liberalAddonSchema.merge(pharmacistAddonSchema)

export const schema = z.union([schemaLiberal, schemaEts])

// export type DeclarationApiType = z.infer<typeof DeclarationApiSchema>

export type DeclarationModel = Declaration

export type DeclarationCreateInput = Prisma.DeclarationCreateInput

// export type DeclarationUpdateInput = Prisma.DeclarationUpdateInput

// export type PartialDeclarationModel = {
//   [Property in keyof DeclarationModel]+?: DeclarationModel[Property]
// }
