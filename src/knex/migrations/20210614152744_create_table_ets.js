exports.up = function (knex) {
  return knex.schema.createTable("ets", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
    table
      .timestamp("created_at", { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable()
    table.timestamp("updated_at", { useTz: true })
    table.string("finesset").notNullable().unique()
    table.string("finessej")
    table.string("rs").notNullable()
    table.string("town").notNullable()
    table.string("department", 3).notNullable()
    table
      .string("juridic_status")
      .notNullable()
      .comment("Valeurs parmi `Public` | `Privé`")
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTable("ets")
}
