const { v4: uuid } = require("uuid")

// NB: all passwords are bcrypted and have the value "test"
exports.seed = function (knex) {
  return knex("ets")
    .del()
    .then(function () {
      return knex("ets").insert([
        {
          id: uuid(),
          finesset: "350019337",
          finessej: "350004826",
          rs: "PHARMACIE LE COZ",
          town: "Nantes",
          department: "44",
          juridic_status: "Privé",
        },
        {
          id: uuid(),
          finesset: "350023883",
          finessej: "350000246",
          rs: "HOPITAL DE JOUR CATTP CMP YSER",
          town: "Rennes",
          department: "35",
          juridic_status: "Public",
        },
        {
          id: uuid(),
          finesset: "350030763",
          finessej: "350000626",
          rs: "UNITE AUTODIALYSE SAINT MALO - AUB",
          town: "Saint Malo",
          department: "35",
          juridic_status: "Privé",
        },
      ])
    })
}
