exports.seed = function (knex) {
  return knex("tokens")
    .del()
    .then(function () {
      return knex("tokens").insert([
        {
          id: "5e679014-eec3-4956-96f8-f084c616c54e",
          editor_id: "e20d2341-aecf-4c42-aabb-b0a302060070",
        },
        {
          id: "8045dead-a8a8-4532-b9a9-3b6faf81498f",
          editor_id: "4ccd78c2-4958-4d81-a17e-88a3c7675131",
        },
      ])
    })
}
