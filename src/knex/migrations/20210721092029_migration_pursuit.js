exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.jsonb("pursuit_json").nullable()
  })

  const rows = await knex("declarations").select(
    "id",
    "pursuit",
    "pursuit_by",
    "pursuit_precision",
  )

  rows.forEach(async (row) => {
    if (row.pursuit !== "Non") {
      const pursuit_json = {
        value:
          row.pursuit === "Autre"
            ? ["Autre", row.pursuit_precision]
            : row.pursuit,
      }
      if (row.pursuit === "Plainte") {
        pursuit_json.details = row.pursuit_by
      }

      try {
        await knex("declarations")
          .where("id", row.id)
          .update({ pursuit_json: JSON.stringify(pursuit_json) })
      } catch (error) {
        console.log(`Error for row.id ${row.id}`, error)
      }
    }
  })

  // Rename legacy column with deprecated (to be removed one day) and rename the new one with the expected name.
  await knex.schema.alterTable("declarations", (table) => {
    table.renameColumn("pursuit", "pursuit_deprecated")
    table.renameColumn("pursuit_by", "pursuit_by_deprecated")
    table.renameColumn("pursuit_precision", "pursuit_precision_deprecated")
    table.renameColumn("pursuit_json", "pursuit")
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("pursuit")
    table.renameColumn("pursuit_deprecated", "pursuit")
    table.renameColumn("pursuit_by_deprecated", "pursuit_by")
    table.renameColumn("pursuit_precision_deprecated", "pursuit_precision")
  })
}
