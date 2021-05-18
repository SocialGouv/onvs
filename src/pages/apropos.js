import React from "react";

import { Layout } from "@/components/Layout";
import { Title1, Title2 } from "@/components/lib";

const AProposPage = () => {
  return (
    <>
      <Layout>
        <div className="px-32 pt-8 pb-16 m-auto mb-16 rounded-md shadow-xl max-w-xxl">
          <Title1 className="mt-12">
            <b>{"Qui sommes-nous?"}</b>
          </Title1>

          <p className="my-8">
            <i>
              {
                "L’Observatoire National des Violences en Santé (ONVS) est placé au sein de la Direction générale de l'offre de soins du Ministère des solidarités et de la santé."
              }
            </i>
          </p>
          <p>
            Créé en 2005, il recueille sur la base du volontariat les
            signalements de faits de violence (dont les incivilités) commis en
            milieu de santé contre les personnes et contre les biens. Afin de
            prévenir ces actes de violence, l’observatoire élabore et diffuse
            des outils et des bonnes pratiques, et encourage la coordination des
            acteurs de terrain.
          </p>

          <Title2 className="mt-12 mb-6">Un observatoire national</Title2>

          <p className="mb-4">
            <b>{"Contexte des violences et création de l'ONVS"}</b>
          </p>
          <ul className="pl-4 list-disc">
            <li className="pl-2">
              <a
                href="https://solidarites-sante.gouv.fr/IMG/pdf/circ609_15122000.pdf"
                className="text-blue-600 underline"
              >
                La circulaire DHOS/P1/2000/609 du 15 décembre 2000
              </a>{" "}
              relative à la prévention et à l’accompagnement des situations de
              violence définissait les grands axes d’une politique de prévention
              des situations de violence.
            </li>
            <li className="pl-2">
              <a
                href="http://circulaires.legifrance.gouv.fr/pdf/2009/04/cir_12079.pdf"
                className="text-blue-600 underline"
              >
                La circulaire DHOS/P1/2005/327 du 11 juillet 2005
              </a>{" "}
              instaure une remontée systématique des informations relatives aux
              faits de violence des établissements vers les agences régionales
              de l’hospitalisation et de ces dernières vers la direction de
              l’hospitalisation et de l’organisation des soins.
            </li>
            <li className="pl-2">
              <a
                href="https://solidarites-sante.gouv.fr/IMG/pdf/protocole-onvh-2.pdf"
                className="text-blue-600 underline"
              >
                Un protocole national signé le 12 août 2005
              </a>{" "}
              entre le ministère de la santé et le ministère de l’intérieur met
              en avant le nécessaire rapprochement entre l’hôpital et les forces
              de l’ordre pour améliorer la sécurité des établissements
              hospitaliers publics et privés.
            </li>
          </ul>

          <p className="mt-4">
            Ce protocole a été 
            <a
              href="https://solidarites-sante.gouv.fr/IMG/pdf/protocole_accord_amelioration_securite_es_100610.pdf"
              className="text-blue-600 underline"
            >
              modifié et complété par celui du 10 juin 2010
            </a>{" "}
            dans lequel s’est associé le ministère de la justice. Parmi ses
            dispositions : la désignation d’un interlocuteur privilégié pour
            l’hôpital, la facilité donnée aux personnels hospitaliers victimes
            de violence pour déposer plainte, l’établissement d’un système
            d’alerte privilégié, la possibilité de diagnostic de sécurité par
            les services de police ou de gendarmerie au bénéfice de
            l’établissement.
          </p>

          <p className="mt-4">
            Ce protocole national pour les établissements de santé a été
            transposé au profit des professionnels de santé par le 
            <a
              href="https://solidarites-sante.gouv.fr/IMG/pdf/protocol_national_securite_professionnels_sante_200411.pdf"
              className="text-blue-600 underline"
            >
              protocole national du 20 avril 2011
            </a>{" "}
            avec les 3 ministères (santé, intérieur, justice). Il prend en
            compte notamment le travail des professionnels de santé exerçant en
            libéral et formalise, par ailleurs, l’engagement des institutions
            ordinales dans le dispositif partenarial. Il renforce la coopération
            entre lesdits professionnels et les services de l’État compétents en
            matière de prévention de la violence et de traitement de la
            délinquance, la possibilité de diagnostic de sécurité par les
            services de police ou de gendarmerie au bénéfice du cabinet.
          </p>

          <p className="mt-4">
            Voir les{" "}
            <a
              href="https://solidarites-sante.gouv.fr/professionnels/ameliorer-les-conditions-d-exercice/observatoire-national-des-violences-en-milieu-de-sante/dgos-onvs-documentation-pratique"
              className="text-blue-600 underline"
            >
              modèles de conventions santé-sécurité-justice
            </a>
            .
          </p>

          <Title2 className="mt-12 mb-6">Ses missions</Title2>

          <p className="mb-4">
            <b>Mission principale</b>
          </p>

          <p className="mt-4">
            Cet observatoire a pour mission de coordonner et d’évaluer les
            politiques mises en œuvre par les différents acteurs sur l’ensemble
            du territoire afin de garantir la sécurité des personnes et des
            biens à l’intérieur des établissements concernés. Le domaine de
            compétence de l’ONVS recouvre les secteurs sanitaire et médicosocial
            publics et privés. Il entretient des contacts étroits avec les
            ordres professionnels de santé. Pour recenser les actes de violence
            commis en milieu de santé, l’observatoire a conçu et diffusé un
            système de remontée des actes de violence. Par le biais d’une
            application informatique unique, une procédure de recueil permet de
            recenser les atteintes et de centraliser les événements des
            incivilités et de violences. La consultation peut ensuite
            s’effectuer à trois niveaux : local pour l’établissement concerné,
            régional pour l’agence régionale de santé et enfin national pour
            l’ONVS.
          </p>

          <p className="mt-4">
            Il publie un rapport annuel sur les violences en santé (en ligne sur
            le site du Ministère).
          </p>

          <p className="mt-4">
            <b>Les actions sur le terrain de l’ONVS</b>
          </p>

          <p className="mt-4">
            Les établissements de santé sollicitent régulièrement l’appui
            technique de l’ONVS, soit à la suite de la survenance d’événements
            violents, soit dans le cadre d’un projet de mise en place d&apos;une
            politique de sécurisation. L’observatoire se rend également sur tout
            le territoire national, ce qui lui permet, au-delà des
            recommandations et préconisations dispensées, de rencontrer et de
            sensibiliser les acteurs de terrain. Il participe également à des
            conférences et tables rondes sur des thématiques de violences et de
            sécurisation.
          </p>
          <p className="mt-4">
            <b>Présentation type de l&apos;ONVS sur les violences</b> en format
            pdf à télécharger{" "}
            <a
              href="https://solidarites-sante.gouv.fr/IMG/pdf/presentation_type_violences_en_milieu_de_sante_2020-01_avec_volet_liberal_et_prive_filigrane_.pdf"
              className="text-blue-600 underline"
            >
              ici
            </a>
            .
            <br />
            Contexte - état des lieux - préconisations
          </p>

          <Title2 className="mt-12 mb-6">Contacts</Title2>

          <p>
            <b>Vincent Terrenoir</b>
            <br />
            Commissaire général de police
            <br />
            Délégué pour la sécurité générale
            <br />
            auprès de la directrice générale de l&apos;offre de soins
            <br />
            <a
              href="mailto:vincent.terrenoir@sante.gouv.fr"
              className="text-blue-600 underline"
            >
              vincent.terrenoir@sante.gouv.fr
            </a>
            <br />
            Tél. 01 40 56 71 40
          </p>

          <p className="mt-4">
            <b>Claude Barat</b>
            <br />
            Gestionnaire ONVS
            <br />
            <a
              href="mailto:claude.barat@sante.gouv.fr"
              className="text-blue-600 underline"
            >
              claude.barat@sante.gouv.fr
            </a>
            <br />
            Tél. 01 40 56 56 31
          </p>

          <p className="mt-4">
            <b>Courriel fonctionnel</b>
            <br />
            <a
              href="mailto:dgos-onvs@sante.gouv.fr"
              className="text-blue-600 underline"
            >
              dgos-onvs@sante.gouv.fr
            </a>
          </p>
          <p className="mt-4">
            <b>Adresse postale</b>
            <br />
            ONVS
            <br />
            Direction générale de l’offre de soins (DGOS)
            <br />
            14, avenue Duquesne
            <br />
            75350 Paris 07 SP
          </p>

          <p className="mt-4">
            <b>{"Pages internet dédiées à l'ONVS"}</b> (site du Ministère des
            solidarités et de la santé)
            <br />
            <a
              href="http://social-sante.gouv.fr/dgos-onvs"
              className="text-blue-600 underline"
            >
              http://social-sante.gouv.fr/dgos-onvs
            </a>
            <br />
            (Présentation de l&apos;Observatoire - Documentation pratique -
            Rapport annuel)
          </p>
        </div>
      </Layout>
    </>
  );
};

export default AProposPage;
