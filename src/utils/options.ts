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

export const healthJobs = [
  "Aide-soignant",
  "Ambulancier",
  "Assistant dentaire",
  "Audioprothésiste",
  "Auxiliaire de puériculture",
  "Chiropracteur",
  "Chirurgien-dentiste",
  "Diététicien",
  "Ergothérapeute",
  "Infirmier",
  "Manipulateur d'électroradiologie médicale",
  "Masseur-kinésithérapeute",
  "Médecin",
  "Opticien-lunetier",
  "Orthophoniste",
  "Orthoptiste",
  "Ostéopathe",
  "Pédicure-podologue",
  "Pharmacien",
  "Préparateur en pharmacie et en pharmacie hospitalière",
  "Prothésiste et orthésiste",
  "Psychologue",
  "Psychomotricien",
  "Psychothérapeute",
  "Sage-femme",
  "Technicien de laboratoire médical",
]

export const jobsByOrders = {
  Dentistes: ["Assistant dentaire", "Chirurgien-dentiste"],
  Infirmiers: ["Infirmier"],
  "Sages-femmes": ["Sage-femme"],
  Pharmaciens: ["Pharmacien"],
  "Pédicures-podologues": ["Pédicure-podologue", "Podo-orthésiste"],
  "Masseurs-kiné": ["Masseur-kinésithérapeute"],
}

export const orders = Object.keys(jobsByOrders)

export const roles = [
  "Gestionnaire établissement",
  // "Gestionnaire multi-établissements",
  "Gestionnaire d'ordre",
  "Administrateur",
]

export const ages = ["- de 18 ans", "+ de 18 ans"]

export const genders = ["Masculin", "Féminin"]

const baseVictimsAuthors = [
  "Accompagnant/Visiteur/Famille",
  "Agent de sécurité-sûreté",
  "Détenu",
  "Étudiant en santé",
  "Patient/Résident",
  "Personnel administratif et technique",
  "Professionnel de santé",
  "Prestataire extérieur",
]

export const victimTypes = [...baseVictimsAuthors, "Établissement"].sort(
  (a, b) => a.localeCompare(b),
)

export const authorTypes = [...baseVictimsAuthors, "Inconnu"].sort((a, b) =>
  a.localeCompare(b),
)

export const juridicStatus = ["Public", "Privé"]

const healthTypes = ["Étudiant en santé", "Professionnel de santé"]

export const pursuits = ["Non", "Main courante", "Plainte"]

export const pursuitComplaintsByValues = [
  "La (les) victime(s)",
  "L'établissement",
  "L'ordre",
]

export const thirdParties = [
  "Personnel hospitalier",
  "Service de sécurité-sûreté",
  "Forces de l'ordre (police et gendarmerie nationales, police municipale)",
  "Sapeurs-pompiers",
]

export const ouiNonOptions = ["Oui", "Non"]

export const discernmentTroubles = [
  "Trouble psychique ou neuropsychique (TPN)",
  "Prise d’alcool",
  "Prise de produits stupéfiants",
  "Prise de médicaments",
  "Effet de l’anesthésie",
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

export const jobsOptions = buildSelectOptions(jobs)
export const healthJobOptions = buildSelectOptions(healthJobs)
export const victimTypesOptions = buildSelectOptions(victimTypes)
export const authorTypesOptions = buildSelectOptions(authorTypes)
export const ageOptions = buildSelectOptions(ages)
export const genderOptions = buildSelectOptions(genders)
export const rolesOptions = buildSelectOptions(roles)
export const juridicStatusOptions = buildSelectOptions(juridicStatus)
export const ordersOptions = buildSelectOptions(orders)

export const getRoleOption = getSelectOption(rolesOptions)
export const getJuridicStatusOption = getSelectOption(juridicStatusOptions)
export const getOrderOption = getSelectOption(ordersOptions)

export const isHealthType = (type: string): boolean =>
  healthTypes.includes(type)
