const { v4: uuid } = require("uuid")

// NB: all passwords are bcrypted and have the value "test"
exports.seed = function (knex) {
  return knex("declarations")
    .del()
    .then(function () {
      return knex("declarations").insert([
        {
          declaration_type: "liberal",
          authors:
            '[{"age": "- de 18 ans", "type": "Accompagnant/Visiteur/Famille", "gender": "Masculin" }]',
          created_at: "2021-05-04 13:33:44.988147+00",
          date: "2021-05-04",
          declarant_contact_agreement: false,
          declarant_email: null,
          declarant_external_id: null,
          declarant_names: null,
          declarant_tel: null,
          description: "test",
          fact_goods: {
            "Autres faits": [
              "Trafic de stupéfiants ou autre trafic dans l’établissement",
            ],
          },
          hour: "Matin (7h-12h)",
          id: uuid(),
          job: "Assistant de service social",
          location: {
            "Dans quel lieu précisément ?": "Cabinet individuel",
          },
          pursuit: null,
          reasons: {
            "Incompatibilité d’humeur et mésentente": [
              "Entre les professionnels",
            ],
          },
          reason_not_apparent: false,
          third_party: null,
          town: "aze",
          postal_code: "",
          victims:
            '[{"age": "- de 18 ans", "type": "Agent de sécurité-sûreté", "gender": "Masculin", "ITTDays": 0, "sickLeaveDays": 0, "hospitalizationDays": 0}]',
        },
        {
          declaration_type: "ets",
          finesset: "350019337",
          authors:
            '[{"age": "- de 18 ans", "type": "Accompagnant/Visiteur/Famille", "gender": "Masculin"}]',
          created_at: "2021-05-04 13:34:53.18524+00",
          date: "2021-05-04",
          description: "test ets",
          location: {
            "Dans quel service ?": "Accueil Mère/enfant",
            "Dans quel lieu précisément ?":
              "Bureau du personnel (médical ou non)",
          },
          fact_goods: {
            "Autres faits": [
              "Trafic de stupéfiants ou autre trafic dans l’établissement",
            ],
          },
          hour: "Matin (7h-12h)",
          id: uuid(),
          job: null,
          pursuit: null,
          reasons: null,
          reason_not_apparent: true,
          third_party: null,
          town: "aze",
          postal_code: "",
          victims:
            '[{"age": "- de 18 ans", "type": "Accompagnant/Visiteur/Famille", "gender": "Masculin", "ITTDays": 0, "sickLeaveDays": 0, "hospitalizationDays": 0}]',
        },
        {
          declaration_type: "liberal",
          authors:
            '[{"age": "+ de 18 ans", "type": "Détenu", "gender": "Masculin"}]',
          created_at: "2021-04-22 20:39:14.915979+00",
          date: "2021-04-22",
          declarant_contact_agreement: false,
          declarant_email: null,
          declarant_external_id: null,
          declarant_names: null,
          declarant_tel: null,
          description: "tes ",
          fact_goods: {
            "Autres faits": [
              "Trafic de stupéfiants ou autre trafic dans l’établissement",
            ],
          },

          hour: "Matin (7h-12h)",
          id: uuid(),
          job: "Assistant dentaire",
          location: {
            "Dans quel lieu précisément ?": "Cabinet individuel",
          },
          pursuit: null,
          reasons: null,
          reason_not_apparent: true,
          third_party: null,
          town: "dg",
          postal_code: "",
          victims:
            '[{"age": "- de 18 ans", "type": "Accompagnant/Visiteur/Famille", "gender": "Masculin", "ITTDays": 0, "sickLeaveDays": 0, "hospitalizationDays": 0}]',
        },
        {
          declaration_type: "ets",
          finesset: "350023883",
          authors:
            '[{"age": "- de 18 ans", "type": "Accompagnant/Visiteur/Famille", "gender": "Féminin"}]',
          created_at: "2021-04-21 14:54:11.242723+00",
          date: "2021-04-21",
          declarant_contact_agreement: null,
          declarant_email: null,
          declarant_external_id: null,
          declarant_names: null,
          declarant_tel: null,
          description: "erezrez",
          fact_goods: {
            "Vol avec effraction": ["Vol à main armée"],
          },

          hour: "Matin (7h-12h)",
          id: uuid(),
          job: null,
          location: {
            "Dans quel service ?": "Accueil Mère/enfant",
            "Dans quel lieu précisément ?":
              "Bureau du personnel (médical ou non)",
          },
          pursuit: null,
          reasons: null,
          reason_not_apparent: true,
          third_party: null,
          town: "ave",
          postal_code: "",
          victims:
            '[{"age": "- de 18 ans", "type": "Accompagnant/Visiteur/Famille", "gender": "Masculin", "ITTDays": 10, "sickLeaveDays": 0, "hospitalizationDays": 0}]',
        },
      ])
    })
}
