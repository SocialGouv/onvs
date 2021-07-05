exports.up = function (knex) {
  return knex.schema.alterTable("declarations", (table) => {
    table.string("postal_code", 5)
  })
}

exports.down = function (knex) {
  return knex.schema.table("declarations", (table) => {
    table.dropColumn("postal_code")
  })
}
