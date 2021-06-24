const {
  functionUp,
  triggerUp,
} = require("../versions/functions/updated_at_auto/v1")

const alterId = (table) =>
  `alter table ${table} alter column id set default gen_random_uuid()`

exports.up = async function (knex) {
  await knex.raw(alterId("users"))
  await knex.raw(alterId("declarations"))

  await knex.raw(functionUp)
  await knex.raw(triggerUp("users"))
  await knex.raw(triggerUp("declarations"))
  await knex.raw(triggerUp("ets"))
}

exports.down = async function () {}
