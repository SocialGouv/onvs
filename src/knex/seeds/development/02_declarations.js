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
            '[{"age": {"label": "- de 18 ans", "value": "- de 18 ans"}, "type": {"label": "Accompagnant/Visiteur/Famille", "value": "Accompagnant/Visiteur/Famille"}, "gender": {"label": "Masculin", "value": "Masculin"}, "discernmentTroublesIsPresent": "Non"}]',
          created_at: "2021-05-04 13:33:44.988147+00",
          date: "2021-05-04",
          declarant_contact_agreement: false,
          declarant_contact_agreement_deprecated: "false", // TODO : remove when this colmun will be removed.
          declarant_email: null,
          declarant_external_id: null,
          declarant_names: null,
          declarant_tel: null,
          description: "test",
          ets_declared_by: null,
          ets_id: null,
          ets_moderated_by: null,
          ets_status: null,
          fact_types: '["Atteinte aux biens"]',
          fg_deteriorations: "[]",
          fg_groups: '["Autres faits"]',
          fg_others:
            '["Trafic de stupéfiants ou autre trafic dans l’établissement"]',
          fg_steal_with_breakins: "[]",
          fg_steal_without_breakins: "[]",
          fp_discriminations: "[]",
          fp_groups: "[]",
          fp_no_respects: "[]",
          fp_others: "[]",
          fp_physical_violences: "[]",
          fp_physical_violences_precision: null,
          fp_psychological_violences: "[]",
          fp_sexual_violences: "[]",
          fp_spoken_violences: "[]",
          hour: "Matin (7h-12h)",
          id: uuid(),
          job: "Assistant de service social",
          location: {
            "Dans quel lieu précisément ?": "Cabinet individuel",
          },
          pursuit: "Non",
          pursuit_by: "[]",
          pursuit_precision: null,
          r_cause_patients: "[]",
          r_cause_professionals: "[]",
          r_deficient_communications: "[]",
          r_discords: "[]",
          r_falsifications: "[]",
          r_life_rules: "[]",
          r_not_apparent: true,
          r_others: "[]",
          r_others_precision: null,
          third_party: "[]",
          third_party_is_present: "Non",
          third_party_precision: null,
          town: "aze",
          postal_code: "",
          victims:
            '[{"age": {"label": "- de 18 ans", "value": "- de 18 ans"}, "type": {"label": "Agent de sécurité-sûreté", "value": "Agent de sécurité-sûreté"}, "gender": {"label": "Masculin", "value": "Masculin"}, "ITTDays": 0, "sickLeaveDays": 0, "hospitalizationDays": 0}]',
        },
        {
          declaration_type: "ets",
          authors:
            '[{"age": {"label": "- de 18 ans", "value": "- de 18 ans"}, "type": {"label": "Accompagnant/Visiteur/Famille", "value": "Accompagnant/Visiteur/Famille"}, "gender": {"label": "Masculin", "value": "Masculin"}, "discernmentTroublesIsPresent": "Non"}]',
          created_at: "2021-05-04 13:34:53.18524+00",
          date: "2021-05-04",
          description: "test ets",
          ets_declared_by: null,
          ets_id: null,
          location: {
            "Dans quel service ?": "Accueil Mère/enfant",
            "Dans quel lieu précisément ?":
              "Bureau du personnel (médical ou non)",
          },
          declarant_contact_agreement_deprecated: "false",
          ets_moderated_by: null,
          ets_status: null,
          fact_types: '["Atteinte aux biens"]',
          fg_deteriorations: "[]",
          fg_groups: '["Autres faits"]',
          fg_others:
            '["Trafic de stupéfiants ou autre trafic dans l’établissement"]',
          fg_steal_with_breakins: "[]",
          fg_steal_without_breakins: "[]",
          fp_discriminations: "[]",
          fp_groups: "[]",
          fp_no_respects: "[]",
          fp_others: "[]",
          fp_physical_violences: "[]",
          fp_physical_violences_precision: null,
          fp_psychological_violences: "[]",
          fp_sexual_violences: "[]",
          fp_spoken_violences: "[]",
          hour: "Matin (7h-12h)",
          id: uuid(),
          job: null,
          pursuit: "Non",
          pursuit_by: "[]",
          pursuit_precision: null,
          r_cause_patients: "[]",
          r_cause_professionals: "[]",
          r_deficient_communications: "[]",
          r_discords: "[]",
          r_falsifications: "[]",
          r_life_rules: "[]",
          r_not_apparent: true,
          r_others: "[]",
          r_others_precision: null,
          third_party: "[]",
          third_party_is_present: "Non",
          third_party_precision: null,
          town: "aze",
          postal_code: "",
          victims:
            '[{"age": {"label": "- de 18 ans", "value": "- de 18 ans"}, "type": {"label": "Accompagnant/Visiteur/Famille", "value": "Accompagnant/Visiteur/Famille"}, "gender": {"label": "Masculin", "value": "Masculin"}, "ITTDays": 0, "sickLeaveDays": 0, "hospitalizationDays": 0}]',
        },
        {
          declaration_type: "liberal",
          authors:
            '[{"age": {"label": "+ de 18 ans", "value": "+ de 18 ans"}, "type": {"label": "Détenu", "value": "Détenu"}, "gender": {"label": "Masculin", "value": "Masculin"}, "discernmentTroublesIsPresent": "Non"}]',
          created_at: "2021-04-22 20:39:14.915979+00",
          date: "2021-04-22",
          declarant_contact_agreement: false,
          declarant_contact_agreement_deprecated: "false", // TODO : remove when this colmun will be removed.
          declarant_email: null,
          declarant_external_id: null,
          declarant_names: null,
          declarant_tel: null,
          description: "tes ",
          ets_declared_by: null,
          ets_id: null,
          ets_moderated_by: null,
          ets_status: null,
          fact_types: '["Atteinte aux biens"]',
          fg_deteriorations: "[]",
          fg_groups: '["Autres faits"]',
          fg_others:
            '["Trafic de stupéfiants ou autre trafic dans l’établissement"]',
          fg_steal_with_breakins: "[]",
          fg_steal_without_breakins: "[]",
          fp_discriminations: "[]",
          fp_groups: "[]",
          fp_no_respects: "[]",
          fp_others: "[]",
          fp_physical_violences: "[]",
          fp_physical_violences_precision: null,
          fp_psychological_violences: "[]",
          fp_sexual_violences: "[]",
          fp_spoken_violences: "[]",
          hour: "Matin (7h-12h)",
          id: uuid(),
          job: "Assistant dentaire",
          location: {
            "Dans quel lieu précisément ?": "Cabinet individuel",
          },
          pursuit: "Non",
          pursuit_by: "[]",
          pursuit_precision: null,
          r_cause_patients: "[]",
          r_cause_professionals: "[]",
          r_deficient_communications: "[]",
          r_discords: "[]",
          r_falsifications: "[]",
          r_life_rules: "[]",
          r_not_apparent: true,
          r_others: "[]",
          r_others_precision: null,
          third_party: "[]",
          third_party_is_present: "Non",
          third_party_precision: null,
          town: "dg",
          postal_code: "",
          victims:
            '[{"age": {"label": "- de 18 ans", "value": "- de 18 ans"}, "type": {"label": "Accompagnant/Visiteur/Famille", "value": "Accompagnant/Visiteur/Famille"}, "gender": {"label": "Masculin", "value": "Masculin"}, "ITTDays": 0, "sickLeaveDays": 0, "hospitalizationDays": 0}]',
        },
        {
          declaration_type: "ets",
          authors:
            '[{"age": {"label": "- de 18 ans", "value": "- de 18 ans"}, "type": {"label": "Accompagnant/Visiteur/Famille", "value": "Accompagnant/Visiteur/Famille"}, "gender": {"label": "Féminin", "value": "Féminin"}, "discernmentTroublesIsPresent": "Non"}]',
          created_at: "2021-04-21 14:54:11.242723+00",
          date: "2021-04-21",
          declarant_contact_agreement: null,
          declarant_contact_agreement_deprecated: "false", // TODO : remove when this colmun will be removed.
          declarant_email: null,
          declarant_external_id: null,
          declarant_names: null,
          declarant_tel: null,
          description: "erezrez",
          ets_declared_by: null,
          ets_id: null,
          ets_moderated_by: null,
          ets_status: null,
          fact_types: '["Atteinte aux biens"]',
          fg_deteriorations: "[]",
          fg_groups: '["Vol avec effraction"]',
          fg_others: "[]",
          fg_steal_with_breakins: '["Vol à main armée"]',
          fg_steal_without_breakins: "[]",
          fp_discriminations: "[]",
          fp_groups: "[]",
          fp_no_respects: "[]",
          fp_others: "[]",
          fp_physical_violences: "[]",
          fp_physical_violences_precision: null,
          fp_psychological_violences: "[]",
          fp_sexual_violences: "[]",
          fp_spoken_violences: "[]",
          hour: "Matin (7h-12h)",
          id: uuid(),
          job: null,
          location: {
            "Dans quel service ?": "Accueil Mère/enfant",
            "Dans quel lieu précisément ?":
              "Bureau du personnel (médical ou non)",
          },
          pursuit: "Non",
          pursuit_by: "[]",
          pursuit_precision: null,
          r_cause_patients: "[]",
          r_cause_professionals: "[]",
          r_deficient_communications: "[]",
          r_discords: "[]",
          r_falsifications: "[]",
          r_life_rules: "[]",
          r_not_apparent: true,
          r_others: "[]",
          r_others_precision: null,
          third_party: "[]",
          third_party_is_present: "Non",
          third_party_precision: null,
          town: "ave",
          postal_code: "",
          victims:
            '[{"age": {"label": "- de 18 ans", "value": "- de 18 ans"}, "type": {"label": "Accompagnant/Visiteur/Famille", "value": "Accompagnant/Visiteur/Famille"}, "gender": {"label": "Masculin", "value": "Masculin"}, "ITTDays": 0, "sickLeaveDays": 0, "hospitalizationDays": 0}]',
        },
      ])
    })
}
