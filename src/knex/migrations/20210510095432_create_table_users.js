exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.uuid("id").primary();
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true });
    table.timestamp("deleted_at", { useTz: true });
    table.string("first_name");
    table.string("last_name");
    table.string("email", 128).notNullable();
    table.string("password", 128);
    table
      .string("role", 128)
      .notNullable()
      .comment(
        "Valeur parmi `Gestionnaire géographique` | `Gestionnaire établissement` | `Gestionnaire multi-établissements` | `Admin`"
      );

    table.jsonb("scope");

    table.unique(["email", "deleted_at"]);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("users");
};
