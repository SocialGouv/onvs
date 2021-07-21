// Victims and authors had a shape in { label, value } for type, gender, age, healthJob. Fix that.
exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.jsonb("victims_json").nullable()
    table.jsonb("authors_json").nullable()
  })

  const rows = await knex("declarations").select("id", "victims", "authors")

  rows.forEach(async (row) => {
    const { victims } = row

    const victims_json = victims.map((victim) => {
      return {
        ...victim,
        age: victim.age.label,
        type: victim.type.label,
        gender: victim.gender.label,
        ...(victim.healthJob && { healthJob: victim.healthJob.label }),
      }
    })

    console.log("victims_json", victims_json)

    try {
      await knex("declarations")
        .where("id", row.id)
        .update({ victims_json: JSON.stringify(victims_json) })
    } catch (error) {
      console.log(`Error for row.id ${row.id}`, error)
    }
  })

  rows.forEach(async (row) => {
    const { authors } = row

    const authors_json = authors.map((author) => {
      // We ignore discernmentTroublesIsPresent, since it can be deduce if the discernmentTroubles is an empty array.
      // eslint-disable-next-line no-unused-vars
      const { discernmentTroublesIsPresent, ...restAuthors } = author
      return {
        ...restAuthors,
        age: author.age.label,
        type: author.type.label,
        gender: author.gender.label,
        ...(author.healthJob && { healthJob: author.healthJob.label }),
      }
    })

    try {
      await knex("declarations")
        .where("id", row.id)
        .update({ authors_json: JSON.stringify(authors_json) })
    } catch (error) {
      console.log(`Error for row.id ${row.id}`, error)
    }
  })

  // Add notNullable constraint now that we have ensured that the column is never empty.
  await knex.schema.alterTable("declarations", (table) => {
    table.jsonb("victims_json").notNullable().alter()
    table.jsonb("authors_json").notNullable().alter()
  })

  // Rename legacy column with deprecated (to be removed one day) and rename the new one with the expected name.
  await knex.schema.alterTable("declarations", (table) => {
    table.renameColumn("victims", "victims_deprecated")
    table.renameColumn("authors", "authors_deprecated")
    table.renameColumn("victims_json", "victims")
    table.renameColumn("authors_json", "authors")
  })
}

exports.down = function (knex) {
  return knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("victims")
    table.dropColumn("authors")
    table.renameColumn("victims_deprecated", "victims")
    table.renameColumn("authors_deprecated", "authors")
  })
}
