import Cors from "micro-cors"
import { z, ZodError } from "zod"

import { roles } from "@/utils/roles"
import { OnvsError } from "@/utils/errors"
import prisma from "@/prisma/db"

const UserSchema = z.object({
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

type UserType = z.infer<typeof UserSchema>

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  const { id } = req.query

  try {
    switch (req.method) {
      case "DELETE": {
        await prisma.user.delete({
          where: {
            id,
          },
        })

        return res.status(200).json({})
      }
      case "PATCH": {
        const { user }: { user: UserType } = req?.body
        const parsedUser = UserSchema.parse(user)

        const otherUser = await prisma.user.findFirst({
          where: {
            email: parsedUser?.email,
            id: {
              not: parsedUser.id,
            },
          },
        })

        if (otherUser) {
          throw new OnvsError("Un utilisateur avec ce courriel existe déjà.")
        }

        const updatedUser = await prisma.user.update({
          where: {
            id: parsedUser?.id,
          },
          data: parsedUser,
        })

        return res.status(200).json({ user: updatedUser })
      }

      default:
        if (req.method !== "OPTIONS") return res.status(405).end()
    }
  } catch (error) {
    console.error("Erreur API", error)
    let message = "Erreur API"

    if (error instanceof ZodError) {
      const paths = error?.issues.map((issue) => issue.path)
      message = `Il y a des erreurs sur le(s) champ(s) : ${
        paths.length ? paths.join(",") : ""
      }`
    } else if (error instanceof OnvsError) {
      message = error.message
    }
    res.status(500).json({ message })
  }
}

const cors = Cors({
  allowMethods: ["DELETE", "PATCH", "OPTIONS"],
})

export default cors(handler)
