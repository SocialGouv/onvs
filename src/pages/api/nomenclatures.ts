import Cors from "micro-cors"
import { handleErrors, handleNotAllowedMethods } from "@/utils/api"
import * as options from "@/utils/options"

function flatten(obj) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{
        [obj[key].label]: obj[key].options,
      },
    }),
    {},
  )
}

const handler = async (req, res) => {
  res.setHeader("Content-Type", "application/json")

  try {
    switch (req.method) {
      case "GET": {
        return res.status(200).json({
          factPersonsGroups: {
            description:
              "Groupe des faits de violence concernant les personnes",
            relatedField: "factPersons",
            values: flatten(options.factPersonsGroups),
          },
          factGoodsGroups: {
            description: "Groupe des faits de violence concernant les biens",
            relatedField: "factGoods",
            values: flatten(options.factGoodsGroups),
          },
          reasons: {
            description: "Motifs des violences",
            relatedField: "reasons",
            values: flatten(options.reasons),
          },
          hours: {
            description: "Champ horaire",
            relatedField: "hour",
            values: options.hours,
          },
          mainLocation: {
            description: "Dans quel service ? (lieu principal)",
            relatedField: "",
            values: options.etsMainLocations,
          },
          secondaryLocations: {
            description: "Dans quel lieu précisément ? (lieu secondaire)",
            relatedField: "",
            values: options.etsSecondaryLocations,
          },
          healthJobs: {
            description:
              "Liste des professions de santé, éventuellement demandé si le type d'une victim ou d'un auteur correspond à une profession de santé",
            relatedField: "",
            values: options.healthJobs,
          },
          healthTypes: {
            description:
              "Type qui nécessite une précision sur la profession de santé",
            relatedField: "N/A",
            values: options.healthTypes,
          },
          victimTypes: {
            description:
              "Liste des types (profession ou autres) pour les victimes",
            relatedField: "victim.type",
            values: options.victimTypes,
          },
          authorTypes: {
            description:
              "Liste des types (profession ou autres) pour les auteurs",
            relatedField: "author.type",
            values: options.authorTypes,
          },
          ages: {
            description: "Champs âges des victimes ou auteurs",
            relatedField: "victim.age / author.age",
            values: options.ages,
          },
          genders: {
            description: "Genre des victimes ou auteurs",
            relatedField: "victim.gender / author.gender",
            values: options.genders,
          },
          pursuits: {
            description: "Poursuites",
            relatedField: "pursuit",
            values: options.pursuits,
          },
          pursuitComplaintsByValues: {
            description: "Options quand la poursuite est Plainte",
            relatedField: "pursuit.pursuitBy",
            values: options.pursuitComplaintsByValues,
          },
          thirdParties: {
            description: "Liste pour les intervention de tiers",
            relatedField: "thirdParty",
            values: options.thirdParties,
          },
          discernmentTroubles: {
            description: "Liste des troubles du discernement",
            relatedField: "author.discernmentTroubles",
            values: options.discernmentTroubles,
          },
        })
      }

      default: {
        handleNotAllowedMethods(req, res)
      }
    }
  } catch (error) {
    handleErrors(error, res)
  }
}

const cors = Cors({
  allowMethods: ["GET"],
})

export default cors(handler)
