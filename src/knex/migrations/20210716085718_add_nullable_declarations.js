// Use not nullable directives when appropriate, to help prisma introspect
exports.up = async function (knex) {
  const rows = await knex("declarations").select(
    "id",
    "postal_code",
    "declarant_contact_agreement",
  )

  rows.forEach(async (row) => {
    const postal_code = row.postal_code === null ? "" : row.postal_code
    const declarant_contact_agreement =
      row.declarant_contact_agreement === null
        ? ""
        : row.declarant_contact_agreement

    try {
      await knex("declarations")
        .where("id", row.id)
        .update({ postal_code, declarant_contact_agreement })
    } catch (error) {
      console.error(`Error for row.id ${row.id}`, error)
    }
  })

  return knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("deleted_at")
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now()).alter()
    table.string("declaration_type", 60).notNullable().alter()
    table.string("date", 30).notNullable().alter()
    table.string("hour", 60).notNullable().alter()
    table.string("town").notNullable().alter()
    table.string("postal_code", 5).notNullable().alter()
    table.jsonb("victims").notNullable().alter()
    table.jsonb("authors").notNullable().alter()
    table.text("description").notNullable().alter()
    table.string("declarant_contact_agreement", 30).notNullable().alter() // use boolean next time
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable("declarations", (table) => {
    table.timestamp("deleted_at", { useTz: true })
  })
}
