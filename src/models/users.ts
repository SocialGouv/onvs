import { z } from "zod"
import { roles } from "@/utils/roles"
import { User } from "@prisma/client"

export const UserApiSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Courriel non valide." }),
  role: z
    .string()
    .refine((val) => roles.includes(val), { message: "Le rôle n'existe pas." }),
  scope: z.any(),
  // scope: z
  //   .object({
  //     ets: z.string(),
  //   })
  //   .or(
  //     z
  //       .object({
  //         etsList: z.array(z.string()),
  //       })
  //       .or(
  //         z.object({
  //           departmentsList: z.array(z.string()),
  //         }),
  //       ),
  //   ),
})

export type UserApiType = z.infer<typeof UserApiSchema>

export type UserModel = User

export type PartialUserModel = {
  [Property in keyof UserModel]+?: UserModel[Property]
}

export interface UserLoggedModel extends UserModel {
  isLoggedIn: boolean
}
