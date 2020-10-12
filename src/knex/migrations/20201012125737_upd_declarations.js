// Changement d'un commentaire d'une colonne à des fins de test du processus de migration de Knex
exports.up = function (knex) {
  return knex.schema.alterTable("declarations", function (table) {
    table
      .string("ets_location1")
      .comment(
        "Service ou unite de l ETS dans lequel a eu lieu la violence, si la violence a été ajoutée par un ETS",
      )
      .alter()
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable("declarations", function (table) {
    table
      .string("ets_location1")
      .comment(
        "Service de l ETS dans lequel a eu lieu la violence, si la violence a été ajoutée par un ETS",
      )
      .alter()
  })
}
