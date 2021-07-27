exports.up = async function (knex) {
  // create a new column for location
  await knex.schema.alterTable("declarations", (table) => {
    table.jsonb("location_json")
  })

  // Today (16/07/2021), only liberal can add declarations, so we only take care of it.
  const rows = await knex("declarations")
    .select("id", "location", "other_location")
    .where("declaration_type", "liberal")

  rows.forEach(async (row) => {
    const location_json = {
      "Dans quel lieu précisément ?": row.other_location
        ? ["Autre", row.other_location]
        : row.location,
    }

    try {
      await knex("declarations").where("id", row.id).update({ location_json })
    } catch (error) {
      console.error(`Error for row.id ${row.id}`, error)
    }
  })

  // Add notNullable constraint now that we have ensured that the column is never empty.
  await knex.schema.alterTable("declarations", (table) => {
    table.jsonb("location_json").notNullable().alter()
  })

  // Rename old columns to ensure that the code can't use it anymore (prevents false positive)
  await knex.schema.alterTable("declarations", (table) => {
    table.renameColumn("location", "location_deprecated")
    table.renameColumn("other_location", "other_location_deprecated")
    table.renameColumn("location_json", "location")
    table.renameColumn("ets_location1", "ets_location1_deprecated")
    table.renameColumn("ets_location2", "ets_location2_deprecated")
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("location")
    table.renameColumn("location_deprecated", "location")
    table.renameColumn("other_location_deprecated", "other_location")
    table.renameColumn("ets_location1_deprecated", "ets_location1")
    table.renameColumn("ets_location2_deprecated", "ets_location2")
  })
}
