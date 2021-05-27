import Cors from "micro-cors"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

import { z, ZodError } from "zod"
import { roles } from "@/utils/roles"
import { OnvsError } from "@/utils/errors"

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

  const { user }: { user: UserType } = req?.body

  try {
    const parsedUser = UserSchema.parse(user)

    switch (req.method) {
      case "POST": {
        const otherUser = await prisma.user.findFirst({
          where: {
            email: parsedUser?.email,
            deletedAt: null,
          },
        })

        if (otherUser) {
          throw new OnvsError("Un utilisateur avec ce courriel existe déjà.")
        }

        const createdUser = await prisma.user.create({ data: parsedUser })

        return res.status(200).json({ user: createdUser })
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
  allowMethods: ["GET", "OPTIONS"],
})

export default cors(handler)
