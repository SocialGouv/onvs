const alterId = (table) =>
  `alter table ${table} alter column id set default gen_random_uuid()`

exports.up = async function (knex) {
  await knex.schema.createTable("editors", (table) => {
    table.uuid("id").primary()
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())
    table.timestamp("updated_at", { useTz: true })
    table.string("name")
  })

  await knex.raw(alterId("editors"))

  await knex.schema.createTable("tokens", (table) => {
    table.uuid("id").primary()
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())
    table.timestamp("updated_at", { useTz: true })
    table.uuid("editor_id").references("editors.id")
  })

  await knex.raw(alterId("tokens"))

  await knex.schema.alterTable("declarations", (table) => {
    table.uuid("editor_id").references("editors.id").nullable()
  })
}

exports.down = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("editor_id")
  })

  await knex.schema.dropTable("tokens")
  await knex.schema.dropTable("editors")
}
