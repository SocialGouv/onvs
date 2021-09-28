import { FactGoodsSchema, FactPersonsSchema } from "@/models/declarations"
import { factGoodsGroups, factPersonsGroups } from "./options"

// Easier structure to handle facts.
const factByLabel = (facts) => {
  let res = {}

  for (const key in facts) {
    res = {
      ...res,
      [facts[key].label]: facts[key].options.reduce((acc, option) => {
        return { ...acc, [option.value]: option }
      }, {}),
    }
  }
  return res
}

const factPersonsByLabel = factByLabel(factPersonsGroups)
const factGoodsByLabel = factByLabel(factGoodsGroups)

// As facts in db can be string or [string, string], it is easier to reason in making them a simple list of string. Only the first element of tuple [string, string] interests us anyway.
function flattenFacts(values: (string | [string, string])[]) {
  return values.map((value) => (Array.isArray(value) ? value[0] : value))
}

// Get the maximum level of facts, for a certain fact type and given a list of values.
// Returns 0 if there is no facts (i.e. if facts is an empty object).
function computeMaxLevel(referenceFacts) {
  return function (facts: FactGoodsSchema | FactPersonsSchema): number {
    let level = 0

    for (const factType in facts) {
      const value = facts[factType]
      if (value != undefined) {
        const availableOptions = referenceFacts[factType]

        const flattenValues = flattenFacts(value)

        const levels: number[] = flattenValues.map(
          (value) => availableOptions[value].level,
        )

        const currentLevel = levels.reduce(
          (acc: number, curr: number) => (curr > acc ? curr : acc),
          0,
        )

        level = currentLevel > level ? currentLevel : level
      }
    }

    return level
  }
}

export const computePersonsMaxLevel = computeMaxLevel(factPersonsByLabel)
export const computeGoodsMaxLevel = computeMaxLevel(factGoodsByLabel)
