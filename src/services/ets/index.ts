import { validate as uuidValidate } from "uuid"

import prisma from "@/prisma/db"
import { EtsApiType, EtsModel } from "@/models/ets"

export async function findEts(id: string): Promise<EtsModel | null> {
  if (!id || !uuidValidate(id)) {
    throw new Error("Bad request")
  }

  const ets = await prisma.ets.findUnique({
    where: {
      id,
    },
  })

  return ets
}

export async function updateEts({
  id,
  ets,
}: {
  id: string
  ets: EtsApiType
}): Promise<EtsModel> {
  const updatedEts = await prisma.ets.update({
    where: {
      id,
    },
    data: ets,
  })

  return updatedEts
}

export async function deleteEts(id: string): Promise<void> {
  await prisma.ets.delete({
    where: {
      id,
    },
  })
}
