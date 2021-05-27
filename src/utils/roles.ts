export const roles = [
  "Gestionnaire d'ETS",
  "Gestionnaire multi-ETS",
  "Gestionnaire d'ordre",
  "Administrateur",
]

export const rolesOptions = roles.map((role) => ({
  value: role,
  label: role,
}))

export function getOption(value: string) {
  return rolesOptions.filter((element) => element.value === value)?.[0] || null
}
