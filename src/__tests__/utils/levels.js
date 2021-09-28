import { computeGoodsMaxLevel, computePersonsMaxLevel } from "@/utils/levels"

test("Gravity is 3 for Trafic de stupéfiants", function () {
  const level = computeGoodsMaxLevel({
    "Autres faits": [
      "Trafic de stupéfiants ou autre trafic dans l’établissement",
    ],
  })
  expect(level).toBe(3)
})

test("Gravity is 3 for Trafic de stupéfiants and Escroquerie", function () {
  const level = computeGoodsMaxLevel({
    "Autres faits": [
      "Trafic de stupéfiants ou autre trafic dans l’établissement",
      "Escroquerie",
    ],
  })
  expect(level).toBe(3)
})

test("Gravity is 2 for Escroquerie and Port d'arme", function () {
  const level = computeGoodsMaxLevel({
    "Autres faits": ["Escroquerie", "Port d’arme ou détention d’arme"],
  })
  expect(level).toBe(2)
})

test("Gravity is 2 because of Harcèlement moral", function () {
  const level = computePersonsMaxLevel({
    "La victime a subi une violence psychologique": ["Harcèlement moral"],
    "Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique":
      ["Nuisance, chahut, fugue"],
  })
  expect(level).toBe(2)
})

test("Gravity is 1 because for Nuisance and Consommation d'alcool", function () {
  const level = computePersonsMaxLevel({
    "Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique":
      [
        "Nuisance, chahut, fugue",
        "Consommation ou détention sur place d’alcool et/ou de produits stupéfiants pour son propre usage",
      ],
  })
  expect(level).toBe(1)
})

test("Gravity is 4 because of Viol", function () {
  const level = computePersonsMaxLevel({
    "La victime a subi une violence sexuelle": ["Viol", "Agression sexuelle"],
    "Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique":
      [
        "Nuisance, chahut, fugue",
        "Consommation ou détention sur place d’alcool et/ou de produits stupéfiants pour son propre usage",
      ],
  })
  expect(level).toBe(4)
})
