import { z } from "zod"
import { Ets } from "@prisma/client"

export enum JuridicStatus {
  Public = "public",
  Private = "privé",
}

export const EtsApiSchema = z.object({
  id: z.string().uuid().optional(),
  finesset: z.string().length(9),
  finessej: z.string().length(9).optional(),
  rs: z.string(),
  town: z.string(),
  department: z.string(),
  juridicStatus: z.nativeEnum(JuridicStatus),
})

export type EtsApiType = z.infer<typeof EtsApiSchema>

export type EtsModel = Ets

export type PartialEtsModel = {
  [Property in keyof EtsModel]+?: EtsModel[Property]
}
