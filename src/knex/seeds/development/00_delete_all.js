exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => knex("declarations").del())
    .then(() => knex("reports_history").del())
    .then(() => knex("ets").del())
    .then(() => knex("tokens").del())
    .then(() => knex("editors").del())
}
