// Clean unused columns
exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("ets_id")
    table.dropColumn("ets_status")
    table.dropColumn("ets_declared_by")
    table.dropColumn("ets_moderated_by")

    table
      .string("finesset")
      .comment("ETS finess must be present when declaration_type is ets")
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable("declarations", (table) => {
    table.uuid("ets_id")
    table.string("ets_status", 30)
    table.uuid("ets_declared_by")
    table.uuid("ets_moderated_by")

    table.dropColumn("finesset")
  })
}
