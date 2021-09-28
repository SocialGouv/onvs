exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.jsonb("fact_goods").notNullable().alter()
    table.jsonb("fact_persons").notNullable().alter()
  })
}

exports.down = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.jsonb("fact_goods").nullable().alter()
    table.jsonb("fact_persons").nullable().alter()
  })
}
