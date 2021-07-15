import { validate as uuidValidate } from "uuid"

import prisma from "@/prisma/db"
import { DeclarationModel } from "@/models/declarations"

export const create = async (
  declaration: DeclarationModel,
): Promise<string | undefined> => {
  const type = declaration?.declarationType

  if (!type) {
    throw new Error("The declarationType must be present")
  }

  await prisma.declaration.create({
    data: declaration,
  })

  return declaration?.id
}

export const find = async ({
  id,
}: {
  id: string
}): Promise<DeclarationModel | null> => {
  if (!id || !uuidValidate(id)) {
    throw new Error("Bad request")
  }

  const declaration = await prisma.declaration.findUnique({
    where: {
      id,
    },
  })

  return declaration
}
