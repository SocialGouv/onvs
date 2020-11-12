import PropTypes from "prop-types"
import React from "react"

import { Layout } from "@/components/Layout"
import { Title1 } from "@/components/lib"

const debug = () => {
  console.log(`NEXT_PUBLIC_SENTRY_DSN: ${process.env.NEXT_PUBLIC_SENTRY_DSN}`)
  console.log(
    `NEXT_PUBLIC_SENTRY_TOKEN: ${process.env.NEXT_PUBLIC_SENTRY_TOKEN}`,
  )
  console.log(`NEXT_PUBLIC_MATOMO_URL: ${process.env.NEXT_PUBLIC_MATOMO_URL}`)
  console.log(
    `NEXT_PUBLIC_MATOMO_SITE_ID: ${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}`,
  )
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`)
  console.log(`TEST_CURRENT_DATE: ${process.env.TEST_CURRENT_DATE}`)
}

const ArticleTitle = ({ children }) => (
  <h2 className={`text-lg text-left font-evolventa font-bold py-6`}>
    {children}
  </h2>
)

ArticleTitle.propTypes = {
  children: PropTypes.node,
}

const NumberTitle = ({ children }) => (
  <p className="my-3">
    <i>{children}</i>
  </p>
)

NumberTitle.propTypes = ArticleTitle.propTypes

const Underline = ({ children }) => (
  <p className="my-4">
    <i>
      <span className="underline">{children} </span>
    </i>
  </p>
)

Underline.propTypes = ArticleTitle.propTypes

const MentionsPage = () => {
  // To see values of build time variables (those in server.js are runtime variables et they can be not synchronized)
  debug()

  return (
    <>
      <Layout>
        <div className="px-32 pt-4 pb-16 m-auto mb-8 rounded-md shadow-xl max-w-xxl">
          <Title1 className="mt-12">
            <b>ONVS</b>
            <br />
            {"CONDITIONS D'UTILISATION"}
          </Title1>

          <div className="page-body">
            <p>
              <ArticleTitle className="font-bold">
                Conditions d’utilisation de la plateforme ONVS
              </ArticleTitle>
            </p>
            <p>
              Les présentes conditions générales d’utilisation (dites « CGU »)
              fixent le cadre juridique de la Plateforme ONVS.
            </p>
            <p>
              <ArticleTitle>Article 1 - Objet</ArticleTitle>
            </p>
            <p>
              La plateforme ONVS a pour objectif de proposer une solution
              numérique permettant de faciliter le recueillement, sur la base du
              volontariat, de faits de violence (dont les incivilités) commis en
              milieu de santé contre les personnes et contre les biens.
            </p>
            <p>
              <ArticleTitle>Article 2 - Champ d’application</ArticleTitle>
            </p>
            <p>
              La plateforme est accessible : d’une part aux professionnels de
              santé libéraux, qui peuvent y accéder sans création de compte ;
              d’autre part aux établissements de santé et établissements
              médico-sociaux, lesquels créent un compte pour s’identifier et
              reportent selon deux procédures possibles les signalements de
              violence : soit par transfert des données internes de leur fichier
              d’événements indésirables dans la nouvelle plateforme, soit en
              accédant directement à la plateforme de l’ONVS avec une création
              de compte.
            </p>
            <p>
              <ArticleTitle>Article 3 – Définitions</ArticleTitle>
            </p>
            <p>« L’Utilisateur » est toute personne utilisant la plateforme.</p>
            <p>
              Les « services » sont les moyens offerts par la plateforme pour
              répondre à ses finalités définies.
            </p>
            <p>
              « Le responsable de traitement » est la personne qui, au sens de
              l’article 4 du règlement (UE) n°2016/679 du Parlement européen et
              du Conseil du 27 avril 2016 relatif à la protection des personnes
              physiques à l’égard du traitement des données à caractère
              personnel et à la libre circulation de ces données détermine les
              finalités et les moyens des traitements de données à caractère
              personnel.
            </p>
            <p>
              <ArticleTitle>Article 4- Fonctionnalités</ArticleTitle>
            </p>
            <NumberTitle>4.1 Création du profil</NumberTitle>
            <p>
              En s’inscrivant sur la plateforme, l’Utilisateur s’engage à
              fournir des informations sincères et exactes permettant de créer
              son compte ou son profil. En effet, une fois sur la page
              d’accueil, il est invité à créer un profil, sauf s’il est
              professionnel libéral. L’Utilisateur en “créant son compte” est
              chargé de remplir les cases relatives aux : nom, adresse e-mail,
              fonction et téléphone.Chaque Utilisateur, sauf s’il est
              professionnel libéral, devra choisir pour son profil un
              identifiant et un mot de passe.
            </p>

            <NumberTitle>4.2 Description des fonctionnalités</NumberTitle>

            <p>
              La plateforme permet d’une part à toute personne travaillant dans
              le milieu de la santé et du médico-social, et d’autre part à un
              établissement de santé ou à un établissement médico-social, de
              faire un signalement d’acte violent.
            </p>
            <Underline>
              A- Déclaration d’un professionnel de santé travaillant en libéral
            </Underline>
            <p>
              Tout professionnel peut réaliser une déclaration en remplissant le
              formulaire en ligne de déclaration d’actes violents à l’encontre
              des personnes et des biens.
              <br />
              Il sera amené à remplir des informations relatives à
            </p>
            <ul className="ml-6 list-disc">
              <li>
                <b>la personne victime de l’acte de violence :</b>
                <br />
                La personne déclarante devra préciser :<br />
                <ul className="ml-6 list-disc">
                  <li>
                    le profil, notamment s’il s’agissait d’un professionnel de
                    santé ou non, le sexe et l’âge de la victime de l’acte de
                    violence.
                  </li>
                  <li>la profession de la victime de l’acte de violence.</li>
                  <li>
                    conséquences de l’acte de violence en matière d’arrêt de
                    travail, de jours d’hospitalisation et de jours
                    d’interruption totale de travail (ITT). Cette dernière
                    notion permet de donner un aperçu de la gravité de l’acte au
                    plan pénal.
                  </li>
                  <li>
                    les éventuelles poursuites avec les personnes qui les
                    déclenchent (la victime d’une atteinte physique et/ou d’une
                    atteinte aux biens ; l’ordre).
                  </li>
                </ul>
              </li>
              <li>
                <b>l’acte de violence :</b>
                <br />
                La personne déclarante précise :
                <ul className="ml-6 list-disc">
                  <li>le lieu de la violence.</li>
                </ul>
              </li>
            </ul>
            <p>
              La personne déclarante précise la catégorie d’atteinte provoquée
              par l’acte (sur les personnes ou sur les biens), ainsi que le type
              d’atteinte provoquée par l’acte :
              <ul className="ml-6 list-disc">
                <li>
                  violence verbale (injure et provocation, outrage, propos
                  discriminatoire se rapportant à la race, l’ethnie, la nation,
                  le pays, la religion, le sexe, menace de mort et d’atteinte à
                  l’intégrité physique).
                </li>
                <li>
                  violence physique (maltraitance volontaire ou par négligence
                  sans but d’obtenir un acte ou une abstention de la personne).
                </li>
                <li>
                  violence sexuelle (exhibition sexuelle, agression sexuelle
                  autre que le viol, viol).
                </li>
                <li>
                  violence psychologique (abus de faiblesse ou état d’ignorance,
                  constat d’un suicide ou d’une tentative, menace avec arme,
                  enlèvement ou séquestration, tentative de meurtre).
                </li>
                <li>discrimination de la victime.</li>
                <li>
                  harcèlement de la victime (harcèlement moral ou sexuel).
                </li>
                <li>
                  respect du lieu/comportement incivique (nuisance, chahut,
                  fugue, consommation ou détention).
                </li>
              </ul>
            </p>
            <ul className="ml-6 list-disc">
              <li>
                <b>les motifs de l’acte de violence :</b>
                <br />
                La personne déclarante précise les motifs de l’acte de violence
                (sur les personnes ou sur les biens) :
                <ul className="ml-6 list-disc">
                  <li>
                    refus ou contestation par le patient, le résident ou
                    l’accompagnant.
                  </li>
                  <li>refus par le professionnel de santé.</li>
                  <li>incompatibilité d’humeur et mésentente.</li>
                  <li>non-respect des règles de vie.</li>
                  <li>
                    falsification ou non-conformité de documents et/ou
                    administratifs.
                  </li>
                  <li>communication défaillante.</li>
                  <li>pas de motif apparent.</li>
                </ul>
              </li>
              <li>
                <b>la personne ayant causé l’acte de violence :</b>
                <br />
                La personne déclarante précise la catégorie d’atteinte provoquée
                par l’acte :
                <ul className="ml-6 list-disc">
                  <li>
                    le profil de l’auteur de l’acte de violence, son âge et son
                    sexe.
                  </li>
                  <li>son éventuelle altération du discernement.</li>
                </ul>
              </li>

              <li>
                <b>la personne déclarant l’acte de violence :</b>
                <br />
                La personne déclarante peut préciser :
                <ul className="ml-6 list-disc">
                  <li>son nom et son prénom.</li>
                  <li>
                    ses coordonnées (adresse e-mail et numéro de téléphone).
                  </li>
                  <li>son numéro RPPS ou Adeli</li>
                </ul>
              </li>
            </ul>
            <p>
              Elle pourra envoyer le formulaire et choisir si elle le souhaite
              fournir ou non ses coordonnées.
            </p>
            <Underline>
              B- Déclaration d’un établissement de santé ou d’un établissement
              médico-social
            </Underline>
            <p>
              L’établissement peut effectuer une déclaration en remplissant le
              formulaire en ligne de déclaration d’actes violents à l’encontre
              des personnes et des biens. Il devra se connecter sur son profil
              dans l’espace qu’il a préalablement créé, et indiquer son nom
              d’utilisateur et mot de passe. En cas d’oubli, chaque
              professionnel peut demander à renouveler son mot de passe.
            </p>
            <p>Il sera amené à remplir des informations relatives à :</p>
            <ul className="ml-6 list-disc">
              <li>
                <b>la personne victime de l’acte de violence :</b>
                <br />
                La personne déclarante devra préciser :
                <ul className="ml-6 list-disc">
                  <li>
                    le profil, notamment s’il s’agissait d’un professionnel de
                    santé ou non, le sexe et l’âge de la victime de l’acte de
                    violence.
                  </li>
                  <li>la profession de la victime de l’acte de violence.</li>
                  <li>
                    conséquences de l’acte de violence en matière d’arrêt de
                    travail, de jours d’hospitalisation et de jours
                    d’interruption totale de travail (ITT). Cette dernière
                    notion permet de donner un aperçu de la gravité de l’acte au
                    plan pénal.
                  </li>
                  <li>
                    les éventuelles poursuites avec les personnes qui les
                    déclenchent (la victime d’un atteinte physique et/ou d’une
                    atteinte aux biens ; l’ordre ; l’établissement).
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="ml-6 list-disc">
              <li>
                <b>l’acte de violence :</b>
                <br />
                La personne déclarante précise :
                <ul className="ml-6 list-disc">
                  <li>le lieu de la violence (hôpital et service).</li>
                </ul>
              </li>
            </ul>
            <p>
              La personne déclarante précise la catégorie d’atteinte provoquée
              par l’acte (sur les personnes ou sur les biens), ainsi que le type
              d’atteinte provoquée par l’acte :
              <ul className="ml-6 list-disc">
                <li>
                  violence verbale (injure et provocation, outrage, propos
                  discriminatoire se rapportant à la race, l’ethnie, la nation,
                  le pays, la religion, le sexe, menace de mort et d’atteinte à
                  l’intégrité physique).
                </li>
                <li>
                  violence physique (maltraitance volontaire ou par négligence
                  sans but d’obtenir un acte ou une abstention de la personne).
                </li>
                <li>
                  violence sexuelle (exhibition sexuelle, agression sexuelle
                  autre que le viol, viol).
                </li>
                <li>
                  violence psychologique (abus de faiblesse ou état d’ignorance,
                  constat d’un suicide ou d’une tentative, menace avec arme,
                  enlèvement ou séquestration, tentative de meurtre).
                </li>
                <li>discrimination de la victime.</li>
                <li>
                  harcèlement de la victime (harcèlement moral ou sexuel).
                </li>
                <li>
                  respect du lieu/comportement incivique (nuisance, chahut,
                  fugue, consommation ou détention).
                </li>
              </ul>
            </p>
            <ul className="ml-6 list-disc">
              <li>
                <b>les motifs de l’acte de violence :</b>
                <br />
                La personne déclarante précise les motifs de l’acte de violence
                (sur les personnes ou sur les biens)
                <ul className="ml-6 list-disc">
                  <li>
                    refus ou contestation par le patient, le résident ou
                    l’accompagnant.
                  </li>
                  <li>refus par le professionnel de santé.</li>
                  <li>incompatibilité d’humeur et mésentente.</li>
                  <li>non-respect des règles de vie.</li>
                  <li>
                    falsification ou non-conformité de documents et/ou
                    administratifs.
                  </li>
                  <li>communication défaillante.– pas de motif apparent.</li>
                </ul>
              </li>
              <li>
                <b>la personne ayant causé l’acte de violence :</b>
                <br />
                La personne déclarante précise la catégorie d’atteinte provoquée
                par l’acte :
                <ul className="ml-6 list-disc">
                  <li>
                    le profil de l’auteur de l’acte de violence, son âge et son
                    sexe.
                  </li>
                  <li>son éventuelle altération du discernement.</li>
                </ul>
              </li>

              <li>
                <b>la personne déclarant l’acte de violence :</b>
                <br />
                La personne déclarante précise sa profession, ce qui permettra à
                la plateforme de proposer des réponses adaptées au métier.
              </li>
            </ul>
            <ArticleTitle>Article 5 – Responsabilités</ArticleTitle>

            <NumberTitle>5.1 L’éditeur de la « Plateforme ONVS »</NumberTitle>

            <p>
              Les sources des informations diffusées sur la Plateforme sont
              réputées fiables mais le site ne garantit pas qu’il soit exempt de
              défauts, d’erreurs ou d’omissions.
            </p>
            <p>
              L’éditeur s’autorise à suspendre ou révoquer n’importe quel compte
              et toutes les actions réalisées par ce biais, s’il estime que
              l’usage réalisé du service porte préjudice à son image ou ne
              correspond pas aux exigences de sécurité.
            </p>
            <p>
              L’éditeur s’engage à mettre en œuvre toutes mesures appropriées,
              afin de protéger les données traitées.
            </p>
            <p>
              L’éditeur s’engage à la sécurisation de la Plateforme, notamment
              en prenant toutes les mesures nécessaires permettant de garantir
              la sécurité et la confidentialité des informations fournies.
            </p>
            <p>
              L’éditeur fournit les moyens nécessaires et raisonnables pour
              assurer un accès continu, sans contrepartie financière, à la
              Plateforme. Il se réserve la liberté de faire évoluer, de modifier
              ou de suspendre, sans préavis, la plateforme pour des raisons de
              maintenance ou pour tout autre motif jugé nécessaire.
            </p>

            <NumberTitle>5.2 L’Utilisateur</NumberTitle>

            <p>
              L’Utilisateur s’assure de garder son mot de passe secret. Toute
              divulgation du mot de passe, quelle que soit sa forme, est
              interdite. Il assume les risques liés à l’utilisation de son
              identifiant et mot de passe.
            </p>
            <p>
              Il s’engage à ne pas commercialiser les données reçues et à ne pas
              les communiquer à des tiers en dehors des cas prévus par la loi.
            </p>
            <p>
              Toute information transmise par l’Utilisateur est de sa seule
              responsabilité. Il est rappelé que toute personne procédant à une
              fausse déclaration pour elle-même ou pour autrui s’expose,
              notamment, aux sanctions prévues à l’article 441-1 du code pénal,
              prévoyant des peines pouvant aller jusqu’à trois ans
              d’emprisonnement et 45 000 euros d’amende.
            </p>
            <p>
              L’Utilisateur s’engage à ne pas mettre en ligne de contenus ou
              informations contraires aux dispositions légales et réglementaires
              en vigueur.
            </p>
            <p>
              Le contenu de l’Utilisateur peut être à tout moment et pour
              n’importe quelle raison supprimé ou modifié par le site, sans
              préavis.
            </p>
            <p>
              <ArticleTitle>
                Article 6 - Protection des données à caractère personnel
              </ArticleTitle>
            </p>

            <NumberTitle>6.1 Responsable de traitement</NumberTitle>

            <p>
              Le responsable de traitement est Madame Katia Julienne, Directrice
              générale de l’offre de soins.
            </p>

            <NumberTitle>6.2 Données personnelles traitées</NumberTitle>

            <p>
              La présente Plateforme traite les données personnelles des
              utilisateurs suivantes :
            </p>
            <ul className="ml-6 list-disc">
              <li>
                relatives aux données au profil (nom, fonction, adresse e-mail,
                téléphone) ;
              </li>
              <li>
                relatives aux déclarants du formulaire de déclaration d’actes
                violents dans le cadre de la médecine libérale (nom, prénom,
                numéro RPPS ou Adeli, adresse e-mail, numéro de téléphone,
                profession) ;
              </li>
              <li>
                relatives aux déclarants du formulaire de déclaration d’actes
                violents des ETS (profession) ;
              </li>
              <li>
                relatives aux victimes dans les formulaires de déclaration
                d’actes violents des ETS ou par les médecins libéraux (âge,
                sexe, profession et conséquences de blessures sur la victime) ;
              </li>
              <li>
                relatives aux auteurs de violence dans les formulaires de
                déclarations d’actes violents des ETS ou par les médecins
                libéraux (âge, sexe, profession de l’auteur de violence,
                altération du discernement, personne objet de plainte) ;
              </li>
              <li>
                relatives aux données d’hébergeur : adresse IP des agents,
                Identifiants de connexion, nature des opérations, date et heure
                de l’opération, logs de connexion ;
              </li>
              <li>Cookies</li>
            </ul>

            <NumberTitle>6.3 Finalités des traitements</NumberTitle>

            <p>La plateforme vise à :</p>
            <ul className="ml-6 list-disc">
              <li>
                permettre à toute personne travaillant dans le milieu de la
                santé de remonter le ou les incidents violents dont elle a été
                témoin ou dont il a eu connaissance.
              </li>
              <li>
                permettre à l’Observatoire national des violences en santé
                d’accompagner les autorités et services de santé dans leur
                politique de prévention et de prise en charge des actes de
                violence en milieu de santé.
              </li>
            </ul>

            <NumberTitle>
              6.4 Bases juridiques des traitements de données
            </NumberTitle>

            <p className="mt-4">
              <i>Données relatives au compte d’accès</i>
            </p>
            <p>
              Ce traitement de données est nécessaire à l’exercice d’une mission
              d’intérêt public ou relevant de l’exercice de l’autorité publique
              dont est investi le responsable du traitement au sens de l’article
              6-e du Règlement (UE) 2016/679 du Parlement européen et du Conseil
              du 27 avril 2016 relatif à la protection des personnes physiques à
              l’égard du traitement des données à caractère personnel et à la
              libre circulation de ces données.
            </p>

            <p className="mt-3">
              La mission d’intérêt public est notamment posée par :
            </p>
            <ul className="ml-6 list-disc">
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="https://www.legifrance.gouv.fr/affichTexteArticle.do?idArticle=LEGIARTI000037313626&amp;cidTexte=LEGITEXT000006068812&amp;dateTexte=20180812"
                >
                  l’article 11 de la loi n° 83-634 du 13 juillet 1983 portant
                  droits et obligations des fonctionnaires
                </a>{" "}
                (protection face aux menaces et violences)
              </li>
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="https://solidarites-sante.gouv.fr/IMG/pdf/circ609_15122000.pdf"
                >
                  la circulaire N° DHOS/P1/2000/609 du 15 décembre 2000 relative
                  à la prévention et à l’accompagnement des situations de
                  violence
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="http://circulaires.legifrance.gouv.fr/pdf/2009/04/cir_12079.pdf"
                >
                  la circulaire DHOS/P1/2005/327 du 11 juillet 2005
                </a>{" "}
                (créant un observatoire de la violence)
              </li>
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="https://solidarites-sante.gouv.fr/IMG/pdf/protocole-onvh-2.pdf"
                >
                  Le protocole national du 12 août 2005 (santé-intérieur) dont
                  les objectifs sont l&#x27;amélioration de la sécurité des
                  personnels de santé travaillant en établissement
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="https://solidarites-sante.gouv.fr/IMG/pdf/protocole_accord_amelioration_securite_es_100610.pdf"
                >
                  Le protocole national du 10 juin 2010
                  (santé-intérieur-justice) dont les objectifs sont
                  l&#x27;amélioration de la sécurité des personnels de santé
                  travaillant en établissement
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="https://solidarites-sante.gouv.fr/IMG/pdf/protocol_national_securite_professionnels_sante_200411.pdf"
                >
                  le protocole national du 20 avril 2011
                  (santé-intérieur-justice) dont les objectifs sont
                  l’amélioration de la sécurité des personnels de santé
                </a>{" "}
                travaillant dans le secteur libéral
              </li>
            </ul>
            <p className="mt-4">
              <i>
                Données relatives aux formulaires de déclaration d’actes
                violents (déclarants, victimes et auteurs d’actes violents)
              </i>
            </p>
            <p>
              Ces traitements de données sont nécessaires à l’exercice d’une
              mission d’intérêt public ou relevant de l’exercice de l’autorité
              publique dont est investi le responsable du traitement au sens de
              l’article 6-e du Règlement (UE) 2016/679 du Parlement européen et
              du Conseil du 27 avril 2016 relatif à la protection des personnes
              physiques à l’égard du traitement des données à caractère
              personnel et à la libre circulation de ces données.
            </p>
            <p>La mission d’intérêt public est notamment posée par :</p>
            <ul className="ml-6 list-disc">
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="https://www.legifrance.gouv.fr/affichTexteArticle.do?idArticle=LEGIARTI000037313626&amp;cidTexte=LEGITEXT000006068812&amp;dateTexte=20180812"
                >
                  l’article 11 de la loi n° 83-634 du 13 juillet 1983 portant
                  droits et obligations des fonctionnaires
                </a>{" "}
                (protection face aux menaces et violences)
              </li>
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="https://solidarites-sante.gouv.fr/IMG/pdf/circ609_15122000.pdf"
                >
                  la circulaire N° DHOS/P1/2000/609 du 15 décembre 2000 relative
                  à la prévention et à l’accompagnement des situations de
                  violence
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="http://circulaires.legifrance.gouv.fr/pdf/2009/04/cir_12079.pdf"
                >
                  la circulaire DHOS/P1/2005/327 du 11 juillet 2005
                </a>{" "}
                (créant un observatoire de la violence)
              </li>
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="https://solidarites-sante.gouv.fr/IMG/pdf/protocole-onvh-2.pdf"
                >
                  Le protocole national du 12 août 2005 (santé-intérieur) dont
                  les objectifs sont l&#x27;amélioration de la sécurité des
                  personnels de santé travaillant en établissement
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="https://solidarites-sante.gouv.fr/IMG/pdf/protocole_accord_amelioration_securite_es_100610.pdf"
                >
                  Le protocole national du 10 juin 2010
                  (santé-intérieur-justice) dont les objectifs sont
                  l&#x27;amélioration de la sécurité des personnels de santé
                  travaillant en établissement
                </a>
              </li>
              <li>
                <a
                  className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                  href="https://solidarites-sante.gouv.fr/IMG/pdf/protocol_national_securite_professionnels_sante_200411.pdf"
                >
                  le protocole national du 20 avril 2011
                  (santé-intérieur-justice) dont les objectifs sont
                  l’amélioration de la sécurité des personnels de santé
                </a>{" "}
                travaillant dans le secteur libéral
              </li>
            </ul>
            <p className="mt-4">
              <i>
                Données relatives à l’état de discernement de l’auteur d’actes
                violents
              </i>
            </p>
            <p>
              Ce traitement de données est nécessaire pour des motifs d’intérêt
              public important et proportionné à l’objectif poursuivi, au sens
              de l’article 9-g du Règlement (UE) 2016/679 du Parlement européen
              et du Conseil du 27 avril 2016 relatif à la protection des
              personnes physiques à l’égard du traitement des données à
              caractère personnel et à la libre circulation de ces données.
            </p>
            <p>
              Le motif d’intérêt public important est l’amélioration de la
              sécurité des personnels de santé telle qu’entendue par l’article
              11 de la loi n°83-634 du 13 juillet 1983 portant droits et
              obligations des fonctionnaires et du protocole national du 20
              avril 2011 dont les objectifs et missions sont l’amélioration de
              la sécurité des personnels de santé.
            </p>
            <p className="mt-4">
              <i>Données d’hébergeur</i>
            </p>
            <p>
              Ce traitement de données est nécessaire au respect d’une
              obligation légale à laquelle le responsable de traitement est
              soumis au sens de l’article 6-c du Règlement (UE) 2016/679 du
              Parlement européen et du Conseil du 27 avril 2016 relatif à la
              protection des personnes physiques à l’égard du traitement des
              données à caractère personnel et à la libre circulation de ces
              données.
            </p>
            <p>
              L’obligation légale est posée par la loi LCEN n° 2004-575 du 21
              juin 2004 pour la confiance dans l’économie numérique et par les
              articles 1 et 3 du décret n°2011-219 du 25 février 2011
            </p>
            <p className="mt-4">
              <i>Cookies</i>
            </p>
            <p>
              Ce traitement de données est autorisé par le consentement de la
              personne concernée pour une ou plusieurs finalités spécifiques, au
              sens de l’article 6-a du Règlement (UE) 2016/679 du Parlement
              européen et du Conseil du 27 avril 2016 relatif à la protection
              des personnes physiques à l’égard du traitement des données à
              caractère personnel et à la libre circulation de ces données.
            </p>

            <NumberTitle>
              6.5 Durée de conservation des traitements de données
            </NumberTitle>

            <p>Les données à caractère personnel sont conservées :</p>
            <ul className="ml-6 list-disc">
              <li>
                <b>Données relatives au compte d’accès</b> : Pendant la durée
                d’existence du compte.
              </li>
              <li>
                <b>
                  Données relatives aux formulaires de déclaration d’actes
                  violents :
                </b>
                5 ans à compter de la déclaration avant archivage.
              </li>
              <li>
                <b>Données d’hébergeur :</b>1 an à compter de la création du
                profil en application de la loi pour la confiance dans
                l’économie numérique et du décret n°2011-219 du 25 février 2011.
              </li>
              <li>
                <b>Cookies</b> : 13 mois
              </li>
            </ul>

            <NumberTitle>6.6 Sécurité et confidentialité</NumberTitle>

            <p>
              Le responsable de traitement s’engage à prendre les mesures
              techniques et organisationnelles de sécurité nécessaires pour
              assurer la confidentialité, l’intégrité et protéger l’accès des
              données.
            </p>

            <NumberTitle>6.7 Droits des personnes concernées</NumberTitle>

            <p>
              En vertu de l’article 13 du règlement (UE) n°2016/679 du Parlement
              européen et du Conseil du 27 avril 2016 relatif à la protection
              des personnes physiques à l’égard du traitement des données à
              caractère personnel et à la libre circulation de ces données
              (RGPD), il est rappelé à chaque utilisateur dont les données sont
              collectées dans le cadre de l’utilisation ou de la connexion à la
              plateforme qu’il dispose des droits suivants concernant ses
              données à caractère personnel :
            </p>
            <ul className="ml-6 list-disc">
              <li>Droit d’information ;</li>

              <li>Droit d’accès aux données ;</li>

              <li>
                Droit de rectification et droit d’effacement des données le cas
                échéant;
              </li>

              <li>
                Droit au retrait du consentement en matière de cookies
                uniquement.
              </li>
            </ul>
            <p>
              Conformément au considérant 73 du RGPD, les droits de
              rectification et d’effacement des données sont limités au regard
              de la prévention des menaces ou de manquements à la déontologie
              des professions réglementée.
            </p>
            <p>Ainsi :</p>
            <ul className="ml-6 list-disc">
              <li>
                Pour le professionnel libéral, les données ne sont plus
                susceptibles d’être modifiées 3 mois après la déclaration.
              </li>

              <li>
                Pour les établissements de santé et les établissements
                médico-sociaux, les données ne sont plus susceptibles d’être
                modifiées au plus tard au mois de mars de l’année qui suit celle
                l’année de déclaration.
              </li>
            </ul>
            <p>
              Les données de compte (nom, fonction, adresse e-mail, téléphone)
              quant à elles peuvent être modifiées à tout moment.
            </p>
            <p>Vous pouvez exercer ces droits en écrivant à :</p>
            <p>Ministère des solidarités et de la santé</p>
            <p>Direction générale de l’offre de soins</p>
            <p>Sous-direction de la stratégie et des ressources</p>
            <p>Bureau des données de pilotage et aide à la décision</p>
            <p>14, avenue Duquesne 75350</p>
            <p>Paris 07 SP</p>
            <p>
              En raison de l’obligation de sécurité et de confidentialité dans
              le traitement des données à caractère personnel qui incombe au
              responsable de traitement, votre demande ne sera traitée que si
              vous rapportez la preuve de votre identité. Pour vous aider dans
              votre démarche, vous trouverez ici un modèle de courrier élaboré
              par la Cnil.
            </p>
            <p>
              Vous avez la possibilité de vous opposer à un traitement de vos
              données personnelles. Pour vous aider dans votre démarche, vous
              trouverez ici un modèle de courrier élaboré par la Cnil.
            </p>
            <p className="mt-6">
              Délais de réponse :<br />
              La responsable de traitement s’engage à répondre à votre demande
              d’accès, de rectification ou d’opposition ou toute autre demande
              complémentaire d’informations dans un délai raisonnable qui ne
              saurait dépasser 1 mois à compter de la réception de votre
              demande.
            </p>

            <NumberTitle>6.8 Destinataires</NumberTitle>

            <p>
              Les données collectées et les demandes, ou dossiers réalisés
              depuis la Plateforme sont traitées par les seules personnes
              juridiquement habilitées à connaître des informations traitées.
            </p>
            <p>
              Il s’agit des agents, salariés ou autre personne pouvant
              représenter la personne morale titulaire d’une mission de service
              public qui utilise le service de la plateforme.
            </p>

            <NumberTitle>6.9 Sous-traitants</NumberTitle>

            <p>
              Certaines des données sont envoyées à des sous-traitants pour
              réaliser certaines missions. Le responsable de traitement s’est
              assuré de la mise en œuvre par ses sous-traitants de garanties
              adéquates et du respect de conditions strictes de confidentialité,
              d’usage et de protection des données.
            </p>

            <div className="mt-6">
              <table className="">
                <thead>
                  <tr>
                    <th>Partenaire</th>
                    <th>Traitement réalisé</th>
                    <th>Pays destinataire</th>
                    <th>Garanties</th>
                  </tr>
                </thead>
                <tr>
                  <td>Microsoft Azure</td>
                  <td>Hébergement</td>
                  <td>France</td>
                  <td>
                    <a
                      href="https://privacy.microsoft.com/fr-fr/privacystatement"
                      className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                    >
                      https://privacy.microsoft.com/fr-fr/privacystatement
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Hotjar</td>
                  <td>Questionnaire de satisfaction</td>
                  <td>Union Européenne</td>
                  <td>
                    <a
                      href="https://www.hotjar.com/legal/support/dpa/"
                      className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
                    >
                      https://www.hotjar.com/legal/support/dpa/
                    </a>
                  </td>
                </tr>
              </table>
            </div>

            <NumberTitle>6.10 Cookies</NumberTitle>

            <p>
              En tant qu’éditeur de la présente Plateforme, le responsable de
              traitement pourra faire usage de cookies. Certains cookies sont
              dispensés du recueil préalable de votre consentement dans la
              mesure où ils sont strictement nécessaires à la fourniture du
              service.Les traceurs ont vocation à être conservés sur le poste
              informatique de l’Internaute pour une durée allant jusqu’à 13
              mois.
              <br />
              Certains cookies permettent d’établir des mesures statistiques de
              fréquentation et d’utilisation du site pouvant être utilisées à
              des fins de suivi et d’amélioration du service :
              <ul className="ml-6 list-disc">
                <li>
                  Les données collectées ne sont pas recoupées avec d’autres
                  traitements.
                </li>
                <li>
                  Le cookie déposé sert uniquement à la production de
                  statistiques anonymes.
                </li>
                <li>
                  Le cookie ne permet pas de suivre la navigation de
                  l’internaute sur d’autres sites.
                </li>
              </ul>
            </p>
            <p>
              <ArticleTitle>
                Article 7 - Mise à jour des conditions d’utilisation
              </ArticleTitle>
            </p>
            <p>
              Les termes des présentes conditions d’utilisation peuvent être
              amendés à tout moment, sans préavis, en fonction des modifications
              apportées à la plateforme, de l’évolution de la législation ou
              pour tout autre motif jugé nécessaire.
            </p>
            <p />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default MentionsPage
