exports.up = function (knex) {
  return knex.schema.createTable("reports_history", (table) => {
    table.timestamp("sent_at");
    table.string("sent_to");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reports_history");
};
