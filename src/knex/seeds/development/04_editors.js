exports.seed = function (knex) {
  return knex("editors")
    .del()
    .then(function () {
      return knex("editors").insert([
        {
          id: "e20d2341-aecf-4c42-aabb-b0a302060070",
          name: "ONVS",
        },
        {
          id: "4ccd78c2-4958-4d81-a17e-88a3c7675131",
          name: "BlueKango",
        },
      ])
    })
}
