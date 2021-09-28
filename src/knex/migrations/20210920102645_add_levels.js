exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.integer("fact_goods_level")
    table.integer("fact_persons_level")
  })
}

exports.down = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("fact_goods_level")
    table.dropColumn("fact_persons_level")
  })
}
