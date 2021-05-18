exports.up = function (knex) {
  return knex.schema.table("declarations", (table) => {
    table.text("description").alter();
  });
};

exports.down = function (knex) {};
