/** List of options expected by the db */

export const jobs = [
  "Assistant dentaire",
  "Assistant de service social",
  "Audioprothésiste",
  "Chiropracteur",
  "Chirurgien-dentiste",
  "Diététicien",
  "Epithésiste",
  "Ergothérapeute",
  "Infirmier",
  "Manipulateur en radiologie",
  "Masseur-kinésithérapeute",
  "Médecin",
  "Oculariste",
  "Opticien-lunetier",
  "Orthopédiste-orthésiste",
  "Orthophoniste",
  "Orthoprothésiste",
  "Orthoptiste",
  "Ostéopathe",
  "Pédicure-podologue",
  "Pharmacien",
  "Physicien médical",
  "Podo-orthésiste",
  "Psychologue",
  "Psychomotricien",
  "Psychothérapeute",
  "Sage-femme",
  "Technicien de laboratoire",
]

export const jobsByOrders = {
  Dentistes: ["Assistant dentaire", "Chirurgien-dentiste"],
  Infirmiers: ["Infirmier"],
  "Sages-femmes": ["Sage-femme"],
  Pharmaciens: ["Pharmacien"],
  "Pédicures-podologues": ["Pédicure-podologue", "Podo-orthésiste"],
  "Masseurs-kiné": ["Masseur-kinésithérapeute"],
}

export const roles = [
  "Gestionnaire établissement",
  // "Gestionnaire multi-établissements",
  "Gestionnaire d'ordre",
  "Administrateur",
]

export const juridicStatus = ["Public", "Privé"]

export const orders = Object.keys(jobsByOrders)

/** End of list */

export type SelectOption = {
  value: string
  label: string
}

const buildSelectOptions = (array) =>
  array.map((item) => ({
    value: item,
    label: item,
  }))

const getSelectOption =
  (array: SelectOption[]) =>
  (value: string): { value: string; label: string } =>
    array.filter((item) => item.value === value)?.[0] || null

export const jobsOptions = buildSelectOptions(jobs)
export const rolesOptions = buildSelectOptions(roles)
export const juridicStatusOptions = buildSelectOptions(juridicStatus)
export const ordersOptions = buildSelectOptions(orders)

export const getRoleOption = getSelectOption(rolesOptions)
export const getJuridicStatusOption = getSelectOption(juridicStatusOptions)
export const getOrderOption = getSelectOption(ordersOptions)
