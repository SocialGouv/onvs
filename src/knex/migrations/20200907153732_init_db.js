const { v4: uuid } = require("uuid")

exports.up = function (knex) {
  return (
    knex.schema
      // .createTable("structures", function (table) {
      //   table.increments("id")
      //   table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())
      //   table.timestamp("updated_at", { useTz: true })
      //   table.timestamp("deleted_at", { useTz: true })
      //   table.string("finesse_number", 50)
      //   table.string("name", 255).notNullable()
      //   table.string("category", 50)
      //   table.string("addr1", 255)
      //   table.string("addr2", 255)
      //   table.string("town", 255)
      //   table.string("dep_code", 3)
      //   table.string("postal_code", 5)

      //   table.json("extra_data")
      // })
      // .createTable("users", function (table) {
      //   table.increments("id")
      //   table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())
      //   table.timestamp("updated_at", { useTz: true })
      //   table.timestamp("deleted_at", { useTz: true })
      //   table.string("first_name", 255)
      //   table.string("last_name", 255)
      //   table.string("email", 255).notNullable()
      //   table.string("password", 255).notNullable()
      //   table.string("role", 50)
      //   table.integer("hospital_id").unsigned()

      //   table.foreign("hospital_id").references("id").inTable("hospitals")

      //   table.unique("email")
      // })
      .createTable("declarations", function (table) {
        table.uuid("id").defaultTo(uuid()).primary()
        table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())
        table.timestamp("updated_at", { useTz: true })
        table.timestamp("deleted_at", { useTz: true })
        table
          .string("declaration_type", 60)
          .comment("Valeur parmi `libéral` | `ETS`")

        table.string("job")
        table.string("date", 30)
        table.string("hour", 60)
        table.string("town")
        table.string("location")
        table.string("other_location")

        table.jsonb("fact_types")

        table.jsonb("fp_groups")
        table.jsonb("fp_spoken_violences")
        table.jsonb("fp_physical_violences")
        table.string("fp_physical_violences_precision")
        table.jsonb("fp_sexual_violences")
        table.jsonb("fp_psychological_violences")
        table.jsonb("fp_discriminations")
        // table.jsonb("fp_harassments")
        table.jsonb("fp_no_respects")
        table.jsonb("fp_others")
        // table.string("fp_others_precision")

        table.jsonb("fg_groups")
        table.jsonb("fg_deteriorations")
        table.jsonb("fg_steal_without_breakins")
        table.jsonb("fg_steal_with_breakins")
        table.jsonb("fg_others")
        // table.string("fg_others_precision")

        table.jsonb("r_cause_patients")
        table.jsonb("r_cause_professionals")
        table.jsonb("r_discords")
        table.jsonb("r_life_rules")
        table.jsonb("r_falsifications")
        table.jsonb("r_deficient_communications")
        table.jsonb("r_others")
        table.boolean("r_not_apparent")

        table.jsonb("victims")
        table.jsonb("third_party")
        table.string("third_party_precision")

        table.string("pursuit")
        table.string("pursuit_precision")
        table.jsonb("pursuit_by")
        table.jsonb("authors")

        table.string("description")
        table.string("declarant_contact_agreement", 30)
        table.string("declarant_names")
        table.string("declarant_external_id").comment("id RPPS ou ADELI")
        table.string("declarant_email")
        table.string("declarant_tel", 30)

        table
          .uuid("ets_id")
          .comment(
            "ETS qui a rempli (i.e. ETS du déclarant si le type est ETS)",
          )
        table
          .string("ets_status", 30)
          .comment(
            "Remplit si ETS. Valeur parmi `brouillon` | `publié` | `refusé`",
          )
        table.uuid("ets_declared_by").comment("Remplit par id du user (si ETS)")
        table
          .uuid("ets_moderated_by")
          .comment("Remplit par id du modérateur (si ETS)")

        table
          .string("ets_location1")
          .comment(
            "Service de l ETS dans lequel a eu lieu la violence, si la violence a été ajoutée par un ETS",
          )
        table
          .string("ets_location2")
          .comment(
            "Précision sur sur le lieu de la violence dans le cas où la violence a été ajoutée par un ETS",
          )
      })
  )
}

exports.down = function (knex) {
  return knex.schema.dropTable("declarations")
}
