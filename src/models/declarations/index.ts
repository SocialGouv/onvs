import { z } from "zod"
import { Declaration, Prisma } from "@prisma/client"

// export const DeclarationApiSchema = z.object({
//   id: z.string().uuid().optional(),
//   firstName: z.string().optional(),
//   lastName: z.string().optional(),
//   email: z.string().email({ message: "Courriel non valide." }),
//   role: z
//     .string()
//     .refine((val) => roles.includes(val), { message: "Le rôle n'existe pas." }),
//   scope: z.any(),
//   // scope: z
//   //   .object({
//   //     ets: z.string(),
//   //   })
//   //   .or(
//   //     z
//   //       .object({
//   //         etsList: z.array(z.string()),
//   //       })
//   //       .or(
//   //         z.object({
//   //           departmentsList: z.array(z.string()),
//   //         }),
//   //       ),
//   //   ),
// })

// export type DeclarationApiType = z.infer<typeof DeclarationApiSchema>

export type DeclarationModel = Declaration

export type DeclarationCreateInput = Prisma.DeclarationCreateInput

// export type DeclarationUpdateInput = Prisma.DeclarationUpdateInput

// export type PartialDeclarationModel = {
//   [Property in keyof DeclarationModel]+?: DeclarationModel[Property]
// }
