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
        table.uuid("id").defaultTo(uuid())
        table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now())
        table.timestamp("updated_at", { useTz: true })
        table.timestamp("deleted_at", { useTz: true })
        table.string("job", 250)
        table.string("date", 30)
        table.string("hour", 60)
        table.string("town", 250)
        table.string("location", 250)
        table.string("other_location", 250)

        table.jsonb("fact_types")

        table.jsonb("fp_groups")
        table.jsonb("fp_spoken_violences")
        table.jsonb("fp_physical_violences")
        table.jsonb("fp_sexual_violences")
        table.jsonb("fp_psychological_violences")
        table.jsonb("fp_discriminations")
        table.jsonb("fp_harassments")
        table.jsonb("fp_no_respects")
        table.jsonb("fp_others")
        table.jsonb("fp_others_precision")

        table.jsonb("fg_groups")
        table.jsonb("fg_deteriorations")
        table.jsonb("fg_steal_without_breakins")
        table.jsonb("fg_steal_with_breakins")
        table.jsonb("fg_others")
        table.jsonb("fg_others_precision")

        table.jsonb("r_cause_patients")
        table.jsonb("r_cause_professionals")
        table.jsonb("r_discords")
        table.jsonb("r_life_rules")
        table.jsonb("r_falsifications")
        table.jsonb("r_deficient_communications")
        table.jsonb("r_others")
        table.boolean("r_not_apparent")

        table.jsonb("victims")
        table.string("third_party")
        table.string("pursuit")
        table.jsonb("pursuit_by")
        table.jsonb("authors")

        table.string("description")
        table.string("declarant_contact_agreement")
        table.string("declarant_names")
        table.string("declarant_id")
        table.string("declarant_email")
        table.string("declarant_tel")
      })
  )
}

exports.down = function (knex) {
  return knex.schema.dropTable("declarations")
}
