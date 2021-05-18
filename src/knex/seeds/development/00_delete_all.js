exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(() => knex("declarations").del())
    .then(() => knex("reports_history").del());
};
