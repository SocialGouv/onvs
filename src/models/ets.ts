import { z } from "zod"
import { Ets } from "@prisma/client"

export enum JuridicStatus {
  Public = "Public",
  Private = "Privé",
}

// TODO DEMAIN  : Je cherche à aovir un champ finessej qui est soit vide soit de 9 caractères. à voir comment c'est fait dans yup dans EtsForm.

export const EtsApiSchema = z.object({
  id: z.string().uuid().optional(),
  finesset: z.string().length(9),
  finessej: z.string().length(9).or(z.literal("")),
  rs: z.string(),
  town: z.string(),
  department: z.string().regex(/^\d\d\d?$/),
  juridicStatus: z.nativeEnum(JuridicStatus),
})

export type EtsApiType = z.infer<typeof EtsApiSchema>

export type EtsModel = Ets

export type PartialEtsModel = {
  [Property in keyof EtsModel]+?: EtsModel[Property]
}
