const { formatISO } = require("date-fns")

exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    // New column with a real type of date
    table.dropColumn("date")
    table.renameColumn("date_new", "date")
  })
}

exports.down = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.string("date_legacy", 30)
  })

  const rows = await knex("declarations").select("id", "date")

  rows.forEach(async (row) => {
    try {
      await knex("declarations")
        .where("id", row.id)
        .update({
          date_legacy: formatISO(row.date, { representation: "date" }),
        })
    } catch (error) {
      console.error(`Error for row.id ${row.id}`, error)
    }
  })

  await knex.schema.alterTable("declarations", (table) => {
    // New column with a real type of date
    table.string("date_legacy", 30).notNullable().alter()
    table.renameColumn("date", "date_new")
    table.renameColumn("date_legacy", "date")
  })
}
