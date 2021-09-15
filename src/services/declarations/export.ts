import { UserLoggedModel } from "@/models/users"
import prisma from "@/prisma/db"
import { EXPORT_LIMIT } from "@/utils/constants"
import { formatISO } from "date-fns"
import Excel from "exceljs"
import { buildWhereClause } from "."

export async function exportDeclarations({
  startDate,
  endDate,
  user,
}: {
  startDate?: string
  endDate?: string
  user: UserLoggedModel
}): Promise<Excel.Workbook> {
  const whereClause = await buildWhereClause(user, startDate, endDate)

  const totalCount = await prisma.declaration.count({
    where: whereClause,
  })

  if (totalCount > EXPORT_LIMIT) {
    throw new Error(`Too many rows (limit is ${EXPORT_LIMIT})`)
  }

  const declarations = await prisma.declaration.findMany({
    orderBy: [{ createdAt: "desc" }],
    where: whereClause,
  })

  const workbook = new Excel.Workbook()

  workbook.created = new Date()
  workbook.modified = new Date()

  const worksheet = workbook.addWorksheet("Onglet 1")

  worksheet.columns = [
    { header: "Id", key: "id", width: 20 },
    { header: "Type de déclaration", key: "declarationType", width: 20 },
    { header: "Profession", key: "job", width: 20 },
    { header: "Date", key: "date", width: 20 },
    { header: "Heure", key: "hour", width: 20 },
    { header: "Ville", key: "town", width: 20 },
    { header: "Description", key: "description", width: 20 },
    { header: "Nom déclarant", key: "declarantNames", width: 20 },
    {
      header: "N° ADELI/RPPS déclarant",
      key: "declarantExternalId",
      width: 20,
    },
    { header: "Email déclarant", key: "declarantEmail", width: 20 },
    { header: "Téléphone déclarant", key: "declarantTel", width: 20 },
    { header: "Code postal", key: "postalCode", width: 20 },
    { header: "Lieu", key: "location", width: 20 },
    {
      header: "Déclarant à contacter",
      key: "declarantContactAgreement",
      width: 20,
    },
    { header: "Tierce partie", key: "thirdParty", width: 20 },
    { header: "Poursuite", key: "pursuit", width: 20 },
    { header: "Victimes", key: "victims", width: 20 },
    { header: "Auteurs", key: "authors", width: 20 },
    { header: "N° FINESSET", key: "finesset", width: 20 },
    { header: "Faits personnes", key: "factPersons", width: 20 },
    { header: "Faits biens", key: "factGoods", width: 20 },
    { header: "Motifs", key: "reasons", width: 20 },
    { header: "Motif non apparent?", key: "reasonNotApparent", width: 20 },
    { header: "Id éditeur", key: "editorId", width: 20 },
    { header: "Éditeur", key: "editor", width: 20 },
  ]

  if (declarations?.length)
    declarations.forEach((element) => worksheet.addRow(element))

  const inputsWorksheet = workbook.addWorksheet("Paramètres de l'export")
  inputsWorksheet.columns = [
    { header: "Paramètre", key: "name", width: 40 },
    { header: "Valeur", key: "value", width: 80 },
  ]

  inputsWorksheet.addRow({
    name: "Date de l'export",
    value: formatISO(new Date(), { representation: "date" }),
  })
  inputsWorksheet.addRow({})
  inputsWorksheet.addRow({ name: "Date de début", value: startDate })
  inputsWorksheet.addRow({ name: "Date de fin", value: endDate })
  inputsWorksheet.addRow({})
  inputsWorksheet.addRow({
    name: "Email de l'utilisateur",
    value: user.email,
  })

  return workbook
}
