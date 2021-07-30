exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    // New columns
    table.jsonb("fact_persons").nullable()
    table.jsonb("fact_goods").nullable()
  })

  const rows = await knex("declarations").select(
    "id",
    "fp_spoken_violences", // La victime a subi une violence verbale
    "fp_physical_violences", // La victime a subi une violence physique
    "fp_physical_violences_precision", // ["Autre fait qualifié de crime", "xxx"]
    "fp_sexual_violences", // La victime a subi une violence sexuelle
    "fp_psychological_violences", // La victime a subi une violence psychologique
    "fp_discriminations", // La victime a été discriminée
    "fp_no_respects", // Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique
    "fp_others", // Autres faits
    "fg_deteriorations", // Dégradation
    "fg_steal_without_breakins", // Vol sans effraction
    "fg_steal_with_breakins", // Vol avec effraction
    "fg_others", // Autres faits
  )

  rows.forEach(async (row) => {
    const fpPhysicalViolences = row.fp_physical_violences.map((elt) =>
      elt !== "Autre fait qualifié de crime"
        ? elt
        : [elt, row.fp_physical_violences_precision],
    )

    const fact_persons = {
      ...(row.fp_spoken_violences &&
        row.fp_spoken_violences.length && {
          "La victime a subi une violence verbale": row.fp_spoken_violences,
        }),
      ...(row.fp_physical_violences &&
        row.fp_physical_violences.length && {
          "La victime a subi une violence physique": fpPhysicalViolences,
        }),
      ...(row.fp_sexual_violences &&
        row.fp_sexual_violences.length && {
          "La victime a subi une violence sexuelle": row.fp_sexual_violences,
        }),
      ...(row.fp_psychological_violences &&
        row.fp_psychological_violences.length && {
          "La victime a subi une violence psychologique":
            row.fp_psychological_violences,
        }),
      ...(row.fp_discriminations &&
        row.fp_discriminations.length && {
          "La victime a été discriminée": row.fp_discriminations,
        }),
      ...(row.fp_no_respects &&
        row.fp_no_respects.length && {
          "Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique":
            row.fp_no_respects,
        }),
      ...(row.fp_others &&
        row.fp_others.length && { "Autres faits": row.fp_others }),
    }

    const fact_goods = {
      ...(row.fg_deteriorations &&
        row.fg_deteriorations.length && {
          Dégradation: row.fg_deteriorations,
        }),
      ...(row.fg_steal_without_breakins &&
        row.fg_steal_without_breakins.length && {
          "Vol sans effraction": row.fg_steal_without_breakins,
        }),
      ...(row.fg_steal_with_breakins &&
        row.fg_steal_with_breakins.length && {
          "Vol avec effraction": row.fg_steal_with_breakins,
        }),
      ...(row.fg_others &&
        row.fg_others.length && { "Autres faits": row.fg_others }),
    }

    try {
      await knex("declarations")
        .where("id", row.id)
        .update({ fact_persons, fact_goods })
    } catch (error) {
      console.error(`Error for row.id ${row.id}`, error)
    }
  })

  await knex.schema.alterTable("declarations", (table) => {
    // Legacy columns
    table.renameColumn("fact_types", "fact_types_deprecated")
    table.renameColumn("fp_groups", "fp_groups_deprecated")
    table.renameColumn("fp_spoken_violences", "fp_spoken_violences_deprecated")
    table.renameColumn(
      "fp_physical_violences",
      "fp_physical_violences_deprecated",
    )
    table.renameColumn(
      "fp_physical_violences_precision",
      "fp_physical_violences_precision_deprecated",
    )
    table.renameColumn("fp_sexual_violences", "fp_sexual_violences_deprecated")
    table.renameColumn(
      "fp_psychological_violences",
      "fp_psychological_violences_deprecated",
    )
    table.renameColumn("fp_discriminations", "fp_discriminations_deprecated")
    table.renameColumn("fp_no_respects", "fp_no_respects_deprecated")
    table.renameColumn("fp_others", "fp_others_deprecated")

    table.renameColumn("fg_groups", "fg_groups_deprecated")
    table.renameColumn("fg_deteriorations", "fg_deteriorations_deprecated")
    table.renameColumn(
      "fg_steal_without_breakins",
      "fg_steal_without_breakins_deprecated",
    )
    table.renameColumn(
      "fg_steal_with_breakins",
      "fg_steal_with_breakins_deprecated",
    )
    table.renameColumn("fg_others", "fg_others_deprecated")
  })
}

exports.down = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("fact_persons")
    table.dropColumn("fact_goods")
    table.renameColumn("fact_types_deprecated", "fact_types")
    table.renameColumn("fp_groups_deprecated", "fp_groups")
    table.renameColumn("fp_spoken_violences_deprecated", "fp_spoken_violences")
    table.renameColumn(
      "fp_physical_violences_deprecated",
      "fp_physical_violences",
    )
    table.renameColumn(
      "fp_physical_violences_precision_deprecated",
      "fp_physical_violences_precision",
    )
    table.renameColumn("fp_sexual_violences_deprecated", "fp_sexual_violences")
    table.renameColumn(
      "fp_psychological_violences_deprecated",
      "fp_psychological_violences",
    )
    table.renameColumn("fp_discriminations_deprecated", "fp_discriminations")
    table.renameColumn("fp_no_respects_deprecated", "fp_no_respects")
    table.renameColumn("fp_others_deprecated", "fp_others")
    table.renameColumn("fg_groups_deprecated", "fg_groups")
    table.renameColumn("fg_deteriorations_deprecated", "fg_deteriorations")
    table.renameColumn(
      "fg_steal_without_breakins_deprecated",
      "fg_steal_without_breakins",
    )
    table.renameColumn(
      "fg_steal_with_breakins_deprecated",
      "fg_steal_with_breakins",
    )
    table.renameColumn("fg_others_deprecated", "fg_others")
  })
}
