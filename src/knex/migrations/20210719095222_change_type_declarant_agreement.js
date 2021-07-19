// Use boolean as type for declarant_contact_agreement's column instead of string.
// This column makes only sense for the liberal value. So this column is also becoming optional now.
exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.boolean("declarant_contact_agreement_boolean").nullable()
    table.string("declarant_contact_agreement", 30).nullable().alter() // Must be nullable, because we don't want to require it in Prisma.
  })

  const rows = await knex("declarations").select(
    "id",
    "declarant_contact_agreement",
  )

  rows.forEach(async (row) => {
    const value = row.declarant_contact_agreement === "true"

    try {
      await knex("declarations")
        .where("id", row.id)
        .update({ declarant_contact_agreement_boolean: value })
    } catch (error) {
      console.log(`Error for row.id ${row.id}`, error)
    }
  })

  // Rename legacy column with deprecated (to be removed one day) and rename the new one with the expected name.
  await knex.schema.alterTable("declarations", (table) => {
    table.renameColumn(
      "declarant_contact_agreement",
      "declarant_contact_agreement_deprecated",
    )
    table.renameColumn(
      "declarant_contact_agreement_boolean",
      "declarant_contact_agreement",
    )
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("declarant_contact_agreement")
    table.renameColumn(
      "declarant_contact_agreement_deprecated",
      "declarant_contact_agreement",
    )
  })
}
