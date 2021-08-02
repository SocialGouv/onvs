import { EditorModel } from "@/models/editor"
import prisma from "@/prisma/db"

export async function getEditorFromToken(
  token: string,
): Promise<EditorModel | null> {
  const existingToken = await prisma.token.findUnique({
    where: {
      id: token,
    },
    include: {
      editor: true,
    },
  })

  return existingToken?.editor || null
}
