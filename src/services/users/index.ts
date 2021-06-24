import { compareWithHash } from "@/utils/bcrypt"

import { UserModel } from "@/models/users"
import prisma from "@/prisma/db"

export const findWithCredentials = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<UserModel | null> => {
  if (!email) {
    throw new Error("Bad request")
  }

  const [user] = await prisma.user.findMany({
    where: {
      email,
      deletedAt: null,
    },
  })

  if (!user) {
    throw new Error("Error in authentication : user not found")
  }

  if (!(await compareWithHash(password, user.password))) {
    throw new Error("Error in authentication")
  }

  // We ensure to not return the password.
  user.password = ""

  return user
}
