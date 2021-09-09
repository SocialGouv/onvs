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
  thirdPartyOptions,
  victimTypes,
  factPersonsGroups,
  factGoodsGroups,
  reasons,
} from "@/utils/options"
import { difference, uniq } from "lodash"
import { EditorModel } from "../editor"

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
          if (
            !thirdPartyOptions
              .filter((option) => !option.precision)
              .map((option) => option.value)
              .includes(elt)
          ) {
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

const makeProperty = (property: {
  label: string
  options: Array<{ value: string; precision?: string }>
}) => ({
  [property.label]: z
    .string()
    .or(z.tuple([z.string(), z.string()]))
    .array()
    .transform((val) => uniq(val))
    .refine((arr) => {
      for (const elt of arr) {
        const key = Array.isArray(elt) && elt.length ? elt[0] : elt

        // If this is a tuple, it should have exactly 2 elemnts, and the first must be an option with a precision.
        if (Array.isArray(elt)) {
          if (
            elt.length !== 2 ||
            !property.options
              .filter((option) => Boolean(option.precision))
              .map((option) => option.value)
              .includes(key)
          ) {
            return false
          }
        }

        if (!property.options.map((option) => option.value).includes(key)) {
          return false
        }
      }
      return true
    })
    .optional(),
})

export const reasonsSchema = z
  .object({
    ...makeProperty(reasons.rCausePatients),
    ...makeProperty(reasons.rCauseProfessionals),
    ...makeProperty(reasons.rDiscords),
    ...makeProperty(reasons.rLifeRules),
    ...makeProperty(reasons.rFalsifications),
    ...makeProperty(reasons.rDeficientCommunications),
    ...makeProperty(reasons.rOthers),
  })
  .strict()

export type ReasonSchema = z.infer<typeof reasonsSchema>

export const factPersonsSchema = z
  .object({
    ...makeProperty(factPersonsGroups.fpSpokenViolences),
    ...makeProperty(factPersonsGroups.fpPhysicalViolences),
    ...makeProperty(factPersonsGroups.fpSexualViolences),
    ...makeProperty(factPersonsGroups.fpPsychologicalViolences),
    ...makeProperty(factPersonsGroups.fpDiscriminations),
    ...makeProperty(factPersonsGroups.fpNoRespects),
    ...makeProperty(factPersonsGroups.fpOthers),
  })
  .strict()

export type FactPersonsSchema = z.infer<typeof factPersonsSchema>

export const factGoodsSchema = z
  .object({
    ...makeProperty(factGoodsGroups.fgDeteriorations),
    ...makeProperty(factGoodsGroups.fgStealWithoutBreakins),
    ...makeProperty(factGoodsGroups.fgStealWithBreakins),
    ...makeProperty(factGoodsGroups.fgOthers),
  })
  .strict()

export type FactGoodsSchema = z.infer<typeof factGoodsSchema>

// Fields available for all declaration types.
const baseSchemaDeclarationApi = z.object({
  id: z.string().uuid().optional(),
  date: z.string().regex(/^(\d{4})-(\d{2})-(\d{2})$/, {
    message: "La date doit avoir un format ISO (YYYY-MM-DD)",
  }),
  hour: z.string(), // TODO use an enum for hours see Step1.js
  town: z.string(),
  postalCode: z.string().min(4).max(5),

  factPersons: factPersonsSchema,
  factGoods: factGoodsSchema,

  reasons: reasonsSchema.nullable(),
  reasonNotApparent: z.boolean(),

  victims: victimSchema.array(),
  authors: authorSchema.array(),

  thirdParty: thirdPartySchema.optional(),

  pursuit: pursuitSchema.optional(),
  description: z.string(),
})

// Specificity for liberal.
const liberalAddonSchema = z.object({
  declarationType: z.literal(DeclarationType.Liberal),
  job: z.string(),
  declarantContactAgreement: z.boolean(),

  declarantNames: z.string().optional(),
  declarantExternalId: z.string().optional(), // TODO : remove this field.
  declarantEmail: z.string().email().optional(),
  declarantTel: z.string().min(10).optional(),

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
  finesset: z
    .string()
    .regex(/^[0-9]{9}$/, "Le n° FINESS doit être composé de 9 chiffres."),
  editorId: z.string().refine(
    async (id) => {
      try {
        const editor = await prisma.editor.findUnique({
          where: {
            id,
          },
        })
        return editor !== null
      } catch (error) {
        console.error("Le champ editorId ne correspond pas à un éditeur connu.")
        return false
      }
    },
    { message: "Le champ editorId ne correspond pas à un éditeur connu." },
  ),

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

// The control on facts and reasons can't be on baseSchemaDeclarationApi directly, I don't know why (merge error in this case).
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
  .refine(
    (elt) =>
      elt.reasons !== null && Object.keys(elt.reasons).length
        ? elt.reasonNotApparent === false
        : elt.reasonNotApparent === true,
    {
      message:
        "S'il n'y a pas de raisons apparentes, le champ reasonNotApparent doit être à true",
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
  .refine(
    (elt) =>
      elt.reasons !== null && Object.keys(elt.reasons).length
        ? elt.reasonNotApparent === false
        : elt.reasonNotApparent === true,
    {
      message:
        "S'il n'y a pas de raisons apparentes, le champ reasonNotApparent doit être à true",
    },
  )

export const schemaPharmacist = liberalAddonSchema.merge(pharmacistAddonSchema)

export const schema = z.union([schemaLiberal, schemaEts])

// export type DeclarationApiType = z.infer<typeof DeclarationApiSchema>

export type DeclarationModel = Declaration

export type DeclarationModelWithEditor = Declaration & {
  editor: EditorModel | null
}

export type DeclarationCreateInput = Prisma.DeclarationCreateInput

// export type DeclarationUpdateInput = Prisma.DeclarationUpdateInput

// export type PartialDeclarationModel = {
//   [Property in keyof DeclarationModel]+?: DeclarationModel[Property]
// }
