exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    // New column with a real type of date
    table.date("date_new")
  })

  const rows = await knex("declarations").select("id", "date")

  rows.forEach(async (row) => {
    try {
      await knex("declarations")
        .where("id", row.id)
        .update({
          date_new: new Date(row.date),
        })
    } catch (error) {
      console.error(`Error for row.id ${row.id}`, error)
    }
  })

  await knex.schema.alterTable("declarations", (table) => {
    // New column with a real type of date
    table.date("date_new").notNullable().alter()
  })
}

exports.down = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("date_new")
  })
}
