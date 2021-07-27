exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.jsonb("third_party_json").nullable()
  })

  const rows = await knex("declarations").select(
    "id",
    "third_party",
    "third_party_is_present",
    "third_party_precision",
  )

  rows.forEach(async (row) => {
    if (row.third_party_is_present === "Oui") {
      const third_party_json = row.third_party.map((elt) =>
        elt === "Autre" ? ["Autre", row.third_party_precision] : elt,
      )

      try {
        // Seems to be mandatory to use stringify for an array but not for an object...
        await knex("declarations")
          .where("id", row.id)
          .update({ third_party_json: JSON.stringify(third_party_json) })
      } catch (error) {
        console.error(`Error for row.id ${row.id}`, error)
      }
    }
  })

  // Rename legacy column with deprecated (to be removed one day) and rename the new one with the expected name.
  await knex.schema.alterTable("declarations", (table) => {
    table.renameColumn("third_party", "third_party_deprecated")
    table.renameColumn(
      "third_party_is_present",
      "third_party_is_present_deprecated",
    )
    table.renameColumn(
      "third_party_precision",
      "third_party_precision_deprecated",
    )
    table.renameColumn("third_party_json", "third_party")
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("third_party")
    table.renameColumn("third_party_deprecated", "third_party")
    table.renameColumn(
      "third_party_is_present_deprecated",
      "third_party_is_present",
    )
    table.renameColumn(
      "third_party_precision_deprecated",
      "third_party_precision",
    )
  })
}
