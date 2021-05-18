const { v4: uuid } = require("uuid");

// NB: all passwords are bcrypted and have the value "test"
exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          email: "ets@onvs.fr",
          first_name: null,
          id: uuid(),
          last_name: null,
          password:
            "$2y$10$VQJlTRYj4aIXvsWLr1wc/Ov10DRAeTOsxR4q5XDfzewEouFI3eQ3i", // test
          role: "Gestionnaire établissement",
          scope: null,
        },
        {
          email: "admin@onvs.fr",
          first_name: null,
          id: uuid(),
          last_name: null,
          password:
            "$2y$10$VQJlTRYj4aIXvsWLr1wc/Ov10DRAeTOsxR4q5XDfzewEouFI3eQ3i", // test
          role: "Admin",
          scope: null,
        },
      ]);
    });
};
