import { validate as uuidValidate } from "uuid"

import prisma from "@/prisma/db"
import { DeclarationModel, schema } from "@/models/declarations"

export const create = async (
  declaration: DeclarationModel,
): Promise<string | undefined> => {
  schema.parse(declaration)

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
