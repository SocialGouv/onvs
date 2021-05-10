const { v4: uuid } = require("uuid")

exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.uuid("id").defaultTo(uuid()).primary()
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())
    table.timestamp("updated_at", { useTz: true })
    table.timestamp("deleted_at", { useTz: true })
    table.string("email", 128)
    table.string("password", 128)
    table
      .string("role", 128)
      .comment(
        "Valeur parmi `Gestionnaire géographique` | `Gestionnaire établissement` | `Gestionnaire multi-établissements` | `Admin`",
      )

    table.jsonb("scope")
  })
}

exports.down = function (knex) {
  knex.schema.dropTable("users")
}
