/** List of options expected by the db */

export const roles = [
  // "Gestionnaire d'ETS",
  // "Gestionnaire multi-ETS",
  "Gestionnaire d'ordre",
  "Administrateur",
]

export const juridicStatus = ["Public", "Privé"]

export const orders = [
  "Dentistes",
  "Infirmiers",
  "Sage-femmes",
  "Pharmaciens",
  "Pédicure-Podologue",
  "Masseurs-kiné",
]

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

export const rolesOptions = buildSelectOptions(roles)
export const juridicStatusOptions = buildSelectOptions(juridicStatus)
export const ordersOptions = buildSelectOptions(orders)

export const getRoleOption = getSelectOption(rolesOptions)
export const getJuridicStatusOption = getSelectOption(juridicStatusOptions)
export const getOrderOption = getSelectOption(ordersOptions)
