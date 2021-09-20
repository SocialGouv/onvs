const {
  computePersonsMaxLevel,
  computeGoodsMaxLevel,
} = require("@/utils/levels")

exports.up = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.integer("fact_goods_level")
    table.integer("fact_persons_level")
  })

  const rows = await knex("declarations").select(
    "id",
    "fact_persons",
    "fact_goods",
  )

  rows.forEach(async (row) => {
    try {
      await knex("declarations")
        .where("id", row.id)
        .update({
          fact_persons_level: computePersonsMaxLevel(row.fact_persons),
          fact_goods_level: computeGoodsMaxLevel(row.fact_goods),
        })
    } catch (error) {
      console.error(`Error for row.id ${row.id}`, error)
    }
  })
}

exports.down = async function (knex) {
  await knex.schema.alterTable("declarations", (table) => {
    table.dropColumn("fact_goods_level")
    table.dropColumn("fact_persons_level")
  })
}
