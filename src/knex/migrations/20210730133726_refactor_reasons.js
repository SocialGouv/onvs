exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    // New column
    table.jsonb("reasons").nullable()
    table.boolean("reason_not_apparent").defaultTo(false).notNullable()
  })

  const rows = await knex("declarations").select(
    "id",
    "r_cause_patients", // rCausePatients
    "r_cause_professionals", // rCauseProfessionals
    "r_discords", // rDiscords
    "r_life_rules", // rLifeRules
    "r_falsifications", // rFalsifications
    "r_deficient_communications", // rDeficientCommunications
    "r_others", // rOthers
    "r_others_precision",
    "r_not_apparent",
  )

  rows.forEach(async (row) => {
    const rOthers = row.r_others.map((elt) =>
      elt !== "Autre" ? elt : [elt, row.r_others_precision],
    )

    const reasons = {
      ...(row.r_cause_patients &&
        row.r_cause_patients.length && {
          "Refus ou contestation par le patient, le résident ou l’accompagnant/la famille":
            row.r_cause_patients,
        }),
      ...(row.r_cause_professionals &&
        row.r_cause_professionals.length && {
          "Refus par le professionnel de santé": row.r_cause_professionals,
        }),
      ...(row.r_discords &&
        row.r_discords.length && {
          "Incompatibilité d’humeur et mésentente": row.r_discords,
        }),
      ...(row.r_life_rules &&
        row.r_life_rules.length && {
          "Non-respect des règles de vie": row.r_life_rules,
        }),
      ...(row.r_falsifications &&
        row.r_falsifications.length && {
          "Falsification ou non-conformité de documents médicaux et/ou administratifs":
            row.r_falsifications,
        }),
      ...(row.r_deficient_communications &&
        row.r_deficient_communications.length && {
          "Communication défaillante": row.r_deficient_communications,
        }),
      ...(row.r_others &&
        row.r_others.length && {
          "Motifs divers": rOthers,
        }),
    }

    try {
      await knex("declarations")
        .where("id", row.id)
        .update({
          reasons,
          reason_not_apparent: Boolean(row.r_not_apparent),
        })
    } catch (error) {
      console.error(`Error for row.id ${row.id}`, error)
    }
  })

  await knex.schema.alterTable("declarations", (table) => {
    // Legacy columns
    table.renameColumn("r_cause_patients", "r_cause_patients_deprecated")
    table.renameColumn(
      "r_cause_professionals",
      "r_cause_professionals_deprecated",
    )
    table.renameColumn("r_discords", "r_discords_deprecated")
    table.renameColumn("r_life_rules", "r_life_rules_deprecated")
    table.renameColumn("r_falsifications", "r_falsifications_deprecated")
    table.renameColumn(
      "r_deficient_communications",
      "r_deficient_communications_deprecated",
    )
    table.renameColumn("r_others", "r_others_deprecated")
    table.renameColumn("r_others_precision", "r_others_precision_deprecated")
    table.renameColumn("r_not_apparent", "r_not_apparent_deprecated")
  })
}

exports.down = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("reasons")
    table.dropColumn("reason_not_apparent")

    table.renameColumn("r_cause_patients_deprecated", "r_cause_patients")
    table.renameColumn(
      "r_cause_professionals_deprecated",
      "r_cause_professionals",
    )
    table.renameColumn("r_discords_deprecated", "r_discords")
    table.renameColumn("r_life_rules_deprecated", "r_life_rules")
    table.renameColumn("r_falsifications_deprecated", "r_falsifications")
    table.renameColumn(
      "r_deficient_communications_deprecated",
      "r_deficient_communications",
    )
    table.renameColumn("r_others_deprecated", "r_others")
    table.renameColumn("r_others_precision_deprecated", "r_others_precision")
    table.renameColumn("r_not_apparent_deprecated", "r_not_apparent")
  })
}
