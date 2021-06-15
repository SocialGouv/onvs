const alterId = (table) =>
  `alter table ${table} alter column id set default gen_random_uuid()`

exports.up = async function (knex) {
  await knex.raw(alterId("users"))
  await knex.raw(alterId("declarations"))
}

exports.down = async function () {}
