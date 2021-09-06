/** List of options expected by the UI and db */

export const factPersonsGroups = {
  fpSpokenViolences: {
    label: "La victime a subi une violence verbale",
    options: [
      {
        value: "Injure, provocation, outrage",
        info: "Paroles contre la personne ou sa profession, gestes obscènes ou de provocation pour mépriser, rabaisser, intimider ou chercher la bagarre, parler très près du visage, cracher par terre. Si crachat au visage ou sur la personne cocher violence volontaire sans arme. Si menace verbale ou par geste explicite de mort et/ou d’atteinte à l’intégrité physique : cocher menace de mort et d’atteinte à l’intégrité physique.",
      },
      {
        value: "Propos discriminatoire",
        info: "Quand les injures et outrages se rapportent spécifiquement à : la race, l'ethnie, la nation, au pays, la religion, au sexe.",
      },
      {
        value:
          "Menace de mort et d’atteinte à l’intégrité physique ou d’atteinte aux biens",
        info: "À un personnel de santé, sa famille, autre personne. Il faut une formulation ou un geste explicite : « Je vais te tuer, t’égorger, te casser la gueule, etc.», montrer les poings, faire le geste du couteau qu’on passe sous sa gorge, « Je vais brûler ta maison », « Je vais faire sauter l'hôpital »,  etc.",
      },
      {
        value: "Menace avec arme par nature ou par destination",
        info: "Arme par nature : arme à feu ; arme blanche dont les objets contondants: poing américain, tonfa, nunchaku, etc. ; bombe lacrymogène... Arme par destination: objet qui va être utilisé comme arme soit par détournement de son usage naturel à des fins de violence (canne de marche, chaise, clé, couverts, déambulateur, etc.) soit parce que l’auteur a délibérément transformé l’objet dans le but d’en faire une arme (petite cuillère aiguisée, etc.).",
      },
    ],
  },

  fpPhysicalViolences: {
    label: "La victime a subi une violence physique",
    options: [
      {
        value: "Maltraitance volontaire ou par négligence",
        info: "Cet item concerne uniquement la relation d'un personnel de santé envers un patient/résident (ex : négliger le patient/résident qui attend un soin de nursing, etc.)",
      },
      {
        value: "Violence volontaire sans arme",
        info: "Bousculade, coup, morsure, crachat au visage et sur la personne, saisir une personne à la gorge. Attention: une personne souffrant d’un Trouble Psychique ou Neuro-psychique (TPN), à savoir une abolition partielle ou totale de son discernement, est considérée comme commettant une violence volontaire (cocher également la case TPN). Une personne sous l’emprise manifeste d’alcool ou de stupéfiants commet une violence volontaire car c’est elle qui s’est mise dans cet état (ne pas cocher la case TPN).",
      },
      {
        value: "Violence volontaire avec arme par nature ou par destination",
        info: "Arme par nature: arme à feu ; arme blanche dont les objets contondants : poing américain, tonfa, nunchaku, etc. ; bombe lacrymogène. Arme par destination: objet qui va être utilisé comme arme soit par détournement de son usage naturel à des fins de violence (canne de marche, chaise, clé, couverts, jouet, etc.), soit parce que l’auteur a délibérément transformé l’objet dans le but d’en faire une arme (petite cuillère aiguisée, etc.).",
      },
      {
        value: "Autre fait qualifié de crime",
        info: "Meurtre et tentative, violences volontaires entraînant mutilation ou infirmité permanente, enlèvement, séquestration",
        precision: "fpPhysicalViolencesPrecision",
      },
    ],
  },
  fpSexualViolences: {
    label: "La victime a subi une violence sexuelle",
    options: [
      {
        value: "Exhibition sexuelle",
        info: "Se montrer nu de façon intentionnelle à la vue du public (personnel de santé ou autres personnes).",
      },
      {
        value: "Agression sexuelle",
        info: "L’agression sexuelle est une atteinte sexuelle sans pénétration commise avec contrainte, menace, surprise sans le consentement de la victime. Si pénétration, cocher viol.",
      },
      {
        value: "Viol",
        info: "Tout acte de pénétration sexuelle, de quelque nature qu'il soit, commis par violence, contrainte, menace ou surprise.",
      },
    ],
  },
  fpPsychologicalViolences: {
    label: "La victime a subi une violence psychologique",
    options: [
      {
        value: "Abus de faiblesse ou état d’ignorance",
        info: "Maltraitance physique et/ou psychique sur une personne dont on connaît sa particulière vulnérabilité (minorité, âge, maladie, infirmité, déficience physique ou psychique, état de grossesse) en vue d’obtenir un acte ou une abstention qui lui sont gravement préjudiciables. Par exemple, lui soutirer de l'argent, lui faire signer un chèque en blanc, une procuration, etc.",
      },
      {
        value: "Constat d'un suicide ou d'une tentative",
        info: "C’est une violence psychologique sur ceux qui constatent ce fait. Cette atteinte ne nécessite pas forcément de remplir le masque « motifs ».",
      },
      {
        value: "Harcèlement moral",
        info: "Agissements répétés de comportements, propos, réseaux sociaux, courriel, téléphone, SMS, écrits qui troublent la tranquillité de la victime ou dégradent les conditions de travail. Ex: répétitions d’appels téléphoniques à la suite du refus d’un médecin de délivrer une ordonnance, d’une vengeance d’un soin considéré comme mal fait, etc.",
      },
      {
        value: "Harcèlement sexuel",
        info: "Agissements répétés de comportements, propos, usage réseaux sociaux, courriel, téléphone, texto, écrit.",
      },
    ],
  },
  fpDiscriminations: {
    label: "La victime a été discriminée",
    options: [
      {
        value:
          "Refus de délivrer un bien ou d'un service en raison de critères discriminatoires",
        info: "Le fait (ici uniquement pour un personnel de santé ou un prestataire) de refuser de délivrer un bien ou un service en raison d’une distinction opérée à propos de : l'origine, le sexe, la religion, l'opinion politique...",
      },
      // Hack to make the field fpDiscriminations an array (like the other fields), not a boolean
      { value: "N/A", hidden: true },
    ],
  },
  fpNoRespects: {
    label:
      "Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique",
    options: [
      {
        value: "Nuisance, chahut, fugue",
        info: "Non-respect des règles de l’établissement (horaires de visites, stationnement, niveau sonore d’un appareil, fumer dans un espace interdit...). Parler exagérément fort ou ameuter le public pour parvenir à ses fins, taper sur les meubles, faire le siège d’un bureau avec un personnel à l’intérieur pour obtenir une décision, ne pas respecter les règles de la laïcité, etc.",
      },
      {
        value:
          "Consommation ou détention sur place d’alcool et/ou de produits stupéfiants pour son propre usage",
      },
    ],
  },
  fpOthers: {
    label: "Autres faits",
    options: [
      {
        value: "Atteinte à la vie privée et/ou au droit à l’image",
        info: "Atteinte à la vie privée: fait de filmer, photographier et/ou enregistrer vos propos sans vous demander l’autorisation. Atteinte au droit à l’image: fait de diffuser ensuite film, photo/enregistrement sonore dans les médias (presse, audio, vidéo) sans votre autorisation. Attention: La chambre d’un établissement est un lieu privé, mais un établissement (public ou privé) et un cabinet, une officine ne sont pas un lieu privé. Donc il n’y pas d’atteinte à la vie privée si vous êtes filmé dans les couloirs ou encore une salle d’attente. En revanche la diffusion de votre image peut dans certaines circonstances être une violation du droit à l’image.",
      },
      { value: "Atteinte au respect dû aux morts" },
    ],
  },
}

export const factGoodsGroups = {
  fgDeteriorations: {
    label: "Dégradation",
    options: [
      {
        value: "Dégradation autre que par incendie",
        info: "Mobilier, véhicule, local, matériel, etc.",
      },
      {
        value: "Dégradation par incendie volontaire",
        info: "Local, matelas, mobilier, poubelle, véhicule, etc.",
      },
      {
        value: "Tags, graffitis, autres salissures",
        info: "Avec caractère ou non injurieux envers quelqu’un ou établissement/cabinet/officine. Si en plus le tag/graffiti a un caractère injurieux envers quelqu’un ou établissement/cabinet/officine, cocher la case correspondante dans la rubrique : La victime a subi une violence verbale.",
      },
      {
        value: "Squat et occupation",
        info: "D’un lieu, d’un bâtiment, sous/sol avec détérioration ou non (laisser des détritus, salissures): se laver dans une chambre vide, rester ou dormir dans une salle d’attente, squatter une pièce en sous-sol, etc.",
      },
      { value: "Matériel de grande valeur (médical ou non)" },
    ],
  },
  fgStealWithoutBreakins: {
    label: "Vol sans effraction",
    options: [
      {
        value: "Objets professionnels ou personnels du personnel de santé",
        info: "Caducée, fonds de caisse, plaque professionnelle, ordonnancier, tampon professionnel, médicaments, mobilier, masque, ramettes de papier, nourriture dans les frigos, etc.",
      },
      {
        value: "Matériel de grande valeur (médical ou non)",
        info: "outil informatique, endoscope, véhicule de l’établissement, etc.",
      },
      {
        value:
          "Effets personnels d’un patient, d’un accompagnant, d’une autre personne",
      },
      {
        value: "Informations",
        info: "Par le biais du piratage des dossiers patients, de l’ordinateur, rançonnage.",
      },
      { value: "Vol à main armée" },
    ],
  },
  fgStealWithBreakins: {
    label: "Vol avec effraction",
    options: [
      {
        value: "Objets professionnels ou personnels du personnel de santé",
        info: "Caducée, fonds de caisse, plaque professionnelle, ordonnancier, tampon professionnel, médicaments, mobilier, masque, ramettes de papier, nourriture dans les frigos, etc.",
      },
      {
        value: "Matériel de grande valeur (médical ou non)",
        info: "Outil informatique, endoscope, véhicule de l’établissement, etc.",
      },
      {
        value:
          "Effets personnels d’un patient, d’un accompagnant, d’une autre personne",
      },
      {
        value: "Informations",
        info: "Par le biais du piratage des dossiers patients, de l’ordinateur, rançonnage.",
      },
      { value: "Vol à main armée" },
    ],
  },
  fgOthers: {
    label: "Autres faits",
    options: [
      {
        value: "Port d’arme ou détention d’arme",
        info: "Arme à feu, arme blanche, gaz lacrymogène, objet contondant : poing américain, tonfa, nunchaku, etc. Cette atteinte ne nécessite pas forcément de remplir le masque « motifs ».",
      },
      {
        value: "Escroquerie",
        info: "Ex. : à la suite d’un vol d’ordonnancier pour se faire remettre indument des médicaments, obtenir des droits indus (présenter une fausse attestation ou une attestation falsifiée, une fausse carte vitale, un faux arrêt de travail, etc.).",
      },
      {
        value: "Trafic de stupéfiants ou autre trafic dans l’établissement",
        info: "Cigarettes, médicaments, etc.",
      },
    ],
  },
}

export const thirdPartyOptions = [
  { value: "Personnel hospitalier" },
  { value: "Service de sécurité-sûreté" },
  {
    value:
      "Forces de l'ordre (police et gendarmerie nationales, police municipale)",
  },
  { value: "Sapeurs-pompiers" },
  {
    value: "Autre",
    precision: "thirdPartyPrecision",
  },
]

export const reasons = {
  rCausePatients: {
    label:
      "Refus ou contestation par le patient, le résident ou l’accompagnant/la famille",
    options: [
      { value: "Du RDV donné (délai, horaire)" },
      {
        value:
          "D’accepter le diagnostic, la décision thérapeutique/médicale/de sortie, etc.",
      },
      { value: "D’accepter les soins" },
      { value: "D’accepter les soins de toilette" },
      { value: "De paiement" },
      { value: "De participer à une activité extérieure" },
    ],
  },
  rCauseProfessionals: {
    label: "Refus par le professionnel de santé",
    options: [
      {
        value:
          "De prescription, de délivrance, de modification : d’une ordonnance, d’un arrêt de travail, d’hospitalisation",
      },
      {
        value:
          "De donner des informations médicales à une tierce personne non référent médical",
      },
      { value: "De soins" },
      { value: "De donner un RDV (délai, horaire)" },
      {
        value: "De vente pour non-conformité des droits",
        info: "Pièce justificative manquante, falsifiée, périmée (carte vitale, ordonnance, etc.)  - à valider avec pharmaciens",
      },
      { value: "De vente pour d’autres raisons (hors stupéfiants)" },
    ],
  },
  rDiscords: {
    label: "Incompatibilité d’humeur et mésentente",
    options: [
      {
        value:
          "Entre le professionnel/collaborateur et le patient/résident/accompagnant/famille",
      },
      { value: "Entre les professionnels" },
      { value: "Entre les patients/résidents/accompagnants" },
      { value: "Autres (bandes, clans, squatteurs…)" },
    ],
  },
  rLifeRules: {
    label: "Non-respect des règles de vie",
    options: [
      { value: "Retard du patient" },
      {
        value:
          "Temps d’attente jugé excessif par le patient/résident/accompagnant/famille",
      },
      { value: "Ordre de passage entre patients" },
      {
        value: "Non-respect des conditions de séjour",
        info: "règlement intérieur - droits et devoirs des patients, des accompagnants dans un établissement",
      },
      {
        value:
          "Frustation/contrariété (pas de sortie, pas de cigarettes, pas de nourriture supplémentaire, etc.)",
      },
    ],
  },
  rFalsifications: {
    label:
      "Falsification ou non-conformité de documents médicaux et/ou administratifs",
    options: [
      { value: "Document médical (ordonnance)" },
      {
        value:
          "Document administratif (CNI, carte Vitale non mise à jour, etc.)",
      },
    ],
  },
  rDeficientCommunications: {
    label: "Communication défaillante",
    options: [
      { value: "Remarques de la part du professionnel/collaborateur" },
      {
        value:
          "Défaut d’information ou information incomplète du professionnel",
      },
      {
        value:
          "Reproche d’une communication non adaptée (termes trop techniques, difficultés de compréhension de la langue)",
      },
    ],
  },
  rOthers: {
    label: "Motifs divers",
    options: [
      {
        value: "Atteinte au principe de laïcité",
        info: "À ne pas confondre avec la radicalisation (Voir item suivant). L’atteinte à la laïcité est le non-respect des devoirs de neutralité, de dignité, de réserve, d’exécuter ses fonctions. Ex. :  ne pas vouloir serrer la main d’une personne du sexe opposé, ne pas vouloir soigner une personne du sexe opposé, refuser d’être dans la salle d’attente avec une personne d’un autre sexe, ne pas vouloir se faire soigner ou qu’un tiers refuse qu’un membre de sa famille soit soigné par un soignant du sexe opposé, installer un coin prière dans une partie de l’établissement, etc. Dans le privé on peut retrouver ces attitudes également : Ex. : ne pas retirer son voile sur le fauteuil du dentiste, etc.",
      },
      {
        value: "Radicalisation",
        info: " À ne pas confondre avec l’atteinte au principe de laïcité. «La radicalisation est un processus par lequel un individu ou un groupe adopte des velléités de violence, directement liées à une idéologie extrémiste à contenu politique, social ou religieux qui conteste l’ordre établi sur le plan politique, social ou culturel. » Les trois critères cumulatifs de la radicalisation violente sont donc : => Un processus marqué par des ruptures comportementales ; => L’adhésion à une idéologie extrémiste ; => L’adoption de la violence (risque de passage à l’acte, soutien, apologie.",
      },
      { value: "Caisse (vol de caisse, rendu de monnaie, etc.)" },
      { value: "Réaction face à la douleur du soin" },
      { value: "Patient sous stupéfiants" },
      {
        value: "Autre",
        precision: "rOthersPrecision",
      },
    ],
  },
}

export const hours = [
  "Matin (7h-12h)",
  "Après-midi (12h-19h)",
  "Soirée (19h-00h)",
  "Nuit (00h-7h)",
]

export const insideLiberalLocations = [
  "Cabinet individuel",
  "Cabinet collectif",
  "Officine",
]
export const outsideLiberalLocations = [
  "En face/à proximité du cabinet ou de l’officine",
  "Au domicile du patient",
  "location",
  "Sur le trajet entre le cabinet et le domicile du patient",
  "Sur le trajet entre votre domicile et votre lieu de travail",
]

export const liberalLocations = [
  ...insideLiberalLocations,
  ...outsideLiberalLocations,
]

export const etsMainLocations = [
  "Accueil Mère/enfant",
  "Addictologie",
  "Cancérologie",
  "Chirurgie",
  "CMP",
  "Dialyse",
  "Établissement pénitentiaire (autre que UHSI et UHSA)",
  "Gériatrie court séjour",
  "Gynécologie-obstétrique-maternité",
  "Hôpital de jour",
  "Imagerie médicale",
  "Laboratoire",
  "Médecine",
  "Morgue",
  "PASS",
  "Pédiatrie-néonatologie",
  "PUI",
  "Réanimation",
  "Rééducation",
  "SAU",
  "SMUR",
  "Soins palliatifs",
  "UHCD/UHTCD",
  "UMJ",
  "USIP",
  "USLD",
  "USMP",
  "Autre",
]

export const etsSecondaryLocations = [
  "Accueil, standard (de l’Ets ou d’un service de l’Ets)",
  "Atelier thérapeutique",
  "Bloc opératoire",
  "Bureau du personnel (médical ou non)",
  "Cafétéria/commerce",
  "Chambre du patient/résident",
  "Chambre sécurisée (détenu ou gardé à vue)",
  "Chambre d’isolement",
  "Domicile patient (intérieur)",
  "Domicile patient (extérieur : rue, parking, hall d’immeuble, ascenseur, escalier, palier)",
  "Dans l’enceinte : s/sol, jardin, parking,  zone de circulation dont ascenseur, escalier, couloir, toilettes",
  "À l’extérieur (voie publique, commerces)",
  "Espace d’apaisement",
  "Espace fumeurs",
  "Locaux des services de sécurité",
  "Magasin/entrepôt/local/services techniques",
  "Salle à manger",
  "Salle d’attente",
  "Salle de détente (patients/résidents : tv, jeux, etc.)",
  "Salle de pause du personnel",
  "Salle de réveil",
  "Trésorerie",
  "Unité de soins (box, bureau de consultation, salle de soins)",
  "Véhicule (dans le cadre d’un transport de patients/résidents)",
  "Vestiaire",
  "Autre",
]

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

export const healthTypes = ["Étudiant en santé", "Professionnel de santé"]

export const pursuits = ["Non", "Main courante", "Plainte"]

export const pursuitComplaintsByValues = [
  "La (les) victime(s)",
  "L'établissement",
  "L'ordre",
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

const getSelectOption = (array: SelectOption[]) => (value: string) =>
  array.filter((item) => item.value === value)?.[0] || null

export const hoursOptions = buildSelectOptions(hours)
export const locationMainOptions = buildSelectOptions(etsMainLocations)
export const locationSecondaryOptions = buildSelectOptions(
  etsSecondaryLocations,
)

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
