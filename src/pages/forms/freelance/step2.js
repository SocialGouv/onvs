import { yupResolver } from "@hookform/resolvers"
import { useStateMachine } from "little-state-machine"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

import { Layout } from "@/components/Layout"
import {
  Group,
  Groups,
  Option,
  Options,
  OutlineButton,
  PrimaryButtton,
  Title1,
  Title2,
} from "@/components/lib"
import { Stepper } from "@/components/Stepper"
import Info from "@/components/svg/info"
import { useEffectToast } from "@/hooks/useEffectToast"
import { useScrollTop } from "@/hooks/useScrollTop"
import { update } from "@/lib/pages/form"

const schema = yup.object({
  factTypes: yup
    .array(yup.string())
    .min(1, "Aucun type de fait n'a été coché."),
  fgDeteriorations: yup.array(yup.string()).default(() => []),
  fgGroups: yup.array(yup.string()).default(() => []),
  fgOthers: yup.array(yup.string()).default(() => []),
  fgStealWithBreakins: yup.array(yup.string()).default(() => []),
  fgStealWithoutBreakins: yup.array(yup.string()).default(() => []),
  fpDiscriminations: yup.array(yup.string()).default(() => []),
  fpGroups: yup.array(yup.string()).default(() => []),
  fpNoRespects: yup.array(yup.string()).default(() => []),
  fpOthers: yup.array(yup.string()).default(() => []),

  fpPhysicalViolences: yup.array(yup.string()).default(() => []),
  fpPhysicalViolencesPrecision: yup
    .string()
    .when("fpPhysicalViolences", (fpPhysicalViolences, schema) => {
      return fpPhysicalViolences.includes("Autre fait qualifié de crime")
        ? schema
            .required("Le champ Autre fait qualifié de crime doit être précisé")
            .min(1, "Le champ Autre fait qualifié de crime doit être précisé")
        : yup
            .string()
            .nullable(true)
            .transform(() => "")
    }),
  fpPsychologicalViolences: yup.array(yup.string()).default(() => []),
  fpSexualViolences: yup.array(yup.string()).default(() => []),
  fpSpokenViolences: yup.array(yup.string()).default(() => []),
})

const Step2Page = () => {
  useScrollTop()
  const router = useRouter()
  const { action, state } = useStateMachine(update)
  const { errors, handleSubmit, register, setError, setValue, watch } = useForm(
    {
      defaultValues: {
        factTypes: state?.form?.factTypes,
        fgDeteriorations: state?.form?.fgDeteriorations,
        fgGroups: state?.form?.fgGroups,
        fgOthers: state?.form?.fgOthers,
        fgStealWithBreakins: state?.form?.fgStealWithBreakins,
        fgStealWithoutBreakins: state?.form?.fgStealWithoutBreakins,
        fpDiscriminations: state?.form?.fpDiscriminations,
        fpGroups: state?.form?.fpGroups,
        fpNoRespects: state?.form?.fpNoRespects,
        fpOthers: state?.form?.fpOthers,
        fpPhysicalViolences: state?.form?.fpPhysicalViolences,
        fpPhysicalViolencesPrecision: state?.form?.fpPhysicalViolencesPrecision,
        fpPsychologicalViolences: state?.form?.fpPsychologicalViolences,
        fpSexualViolences: state?.form?.fpSexualViolences,
        fpSpokenViolences: state?.form?.fpSpokenViolences,
      },
      resolver: yupResolver(schema),
    },
  )

  useEffectToast(errors)

  const factTypes = watch("factTypes")
  const fpGroups = watch("fpGroups")
  const fgGroups = watch("fgGroups")
  const fpPhysicalViolences = watch("fpPhysicalViolences")

  const onSubmit = (data) => {
    if (data?.factTypes?.includes("Atteinte aux personnes")) {
      const hasClicked =
        data?.fpDiscriminations.length ||
        data?.fpNoRespects.length ||
        data?.fpOthers.length ||
        data?.fpPhysicalViolences.length ||
        data?.fpPsychologicalViolences.length ||
        data?.fpSexualViolences.length ||
        data?.fpSpokenViolences.length

      if (!hasClicked) {
        setError("global", {
          message: "Il faut au moins renseigner une atteinte aux personnes.",
          type: "manual",
        })
        return
      }
    }
    if (data?.factTypes?.includes("Atteinte aux biens")) {
      const hasClicked =
        data?.fgDeteriorations.length ||
        data?.fgOthers.length ||
        data?.fgStealWithBreakins.length ||
        data?.fgStealWithoutBreakins.length

      if (!hasClicked) {
        setError("global", {
          message: "Il faut au moins renseigner une atteinte aux biens.",
          type: "manual",
        })

        return
      }
    }

    action(data)

    router.push("/forms/freelance/step3")
  }

  const ensureOtherFpPhysicalViolencesIsChecked = () => {
    const physicalViolences = fpPhysicalViolences?.length
      ? fpPhysicalViolences
      : []

    if (!fpPhysicalViolences?.includes("Autre fait qualifié de crime"))
      setValue("fpPhysicalViolences", [
        ...physicalViolences,
        "Autre fait qualifié de crime",
      ])
  }

  return (
    <Layout>
      <div className="max-w-4xl m-auto mb-8">
        <Stepper step={2} />

        <Title1 className="mt-4">{"Que s'est il passé ?"}</Title1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-10/12 m-auto text-gray-900"
        >
          <Title2 className="mt-12 mb-8">
            De quel(s) type(s) d’atteinte s’agit-il ?
          </Title2>
          <div className="mt-4">
            <div className="mt-2 space-y-2">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    name="factTypes"
                    value="Atteinte aux personnes"
                    ref={register}
                  />
                  <span className="ml-2">Atteinte aux personnes</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    name="factTypes"
                    value="Atteinte aux biens"
                    ref={register}
                  />
                  <span className="ml-2">Atteinte aux biens</span>
                </label>
              </div>
            </div>
          </div>
          {factTypes?.includes("Atteinte aux personnes") && (
            <>
              <Title2 className="mt-12 mb-8">
                Veuillez préciser l’atteinte aux personnes :
              </Title2>

              <Groups name="fpGroups" register={register}>
                <Group
                  value="La victime a subi une violence verbale"
                  color="text-indigo-600"
                />
                <Group
                  value="La victime a subi une violence physique"
                  color="text-green-500"
                />
                <Group
                  value="La victime a subi une violence sexuelle"
                  color="text-pink-600"
                />
                <Group
                  value="La victime a subi une violence psychologique"
                  color="text-red-600"
                />
                <Group
                  value="La victime a été discriminée"
                  color="text-orange-600"
                />
                <Group
                  value="Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique"
                  color="text-purple-600"
                />
                <Group value="Autres faits" color="text-yellow-600" />
              </Groups>
            </>
          )}
          {factTypes?.includes("Atteinte aux biens") && (
            <>
              <Title2 className="mt-12 mb-8">
                Veuillez préciser l’atteinte aux biens :
              </Title2>

              <Groups name="fgGroups" register={register}>
                <Group value="Dégradation" color="text-indigo-600" />
                <Group value="Vol sans effraction" color="text-green-500" />
                <Group value="Vol avec effraction" color="text-pink-600" />
                <Group value="Autres faits" color="text-yellow-600" />
              </Groups>
            </>
          )}
          {factTypes?.includes("Atteinte aux personnes") && !!fpGroups?.length && (
            <>
              <Title2 className="mt-12 mb-8">
                {"Veuillez préciser les faits de l'atteinte aux personnes :"}
              </Title2>
              {fpGroups.includes("La victime a subi une violence verbale") && (
                <>
                  <b>La victime a subi une violence verbale</b>

                  <Options
                    name="fpSpokenViolences"
                    color="text-indigo-600"
                    register={register}
                  >
                    <Option
                      value="Injure, provocation, outrage"
                      info="Paroles contre la personne ou sa profession, gestes obscènes ou de provocation pour mépriser, rabaisser, intimider ou chercher la bagarre, parler très près du visage, cracher par terre (si crachat au visage ou sur la personne cocher violence volontaire sans arme).  En revanche, si menace verbale ou par geste explicite de mort et/ou d’atteinte à l’intégrité physique : cocher menace de mort et d’atteinte à l’intégrité physique."
                    />
                    <Option
                      value="Propos discriminatoire"
                      info="Quand les injures et outrages se rapportent spécifiquement à : la race, l'ethnie, la nation, au pays, la religion, au sexe."
                    />
                    <Option
                      value="Menace de mort et d’atteinte à l’intégrité physique ou d’atteinte aux biens"
                      info="À un personnel de santé, sa famille, autre personne. Il faut une formulation ou un geste explicite : « Je vais te tuer, t’égorger, te casser la gueule, etc.», montrer les poings, faire le geste du couteau qu’on passe sous sa gorge, « Je vais brûler ta maison », « Je vais faire sauter l'hôpital »,  etc."
                    />
                    <Option
                      value="Menace avec arme par nature ou par destination"
                      info="Arme par nature : arme à feu ; arme blanche dont les objets contondants: poing américain, tonfa, nunchaku, etc. ; bombe lacrymogène... Arme par destination : objet qui va être utilisé comme arme soit par détournement de son usage naturel à des fins de violence (canne de marche, chaise, clé, couverts, déambulateur, etc.) soit parce que l’auteur a délibérément transformé l’objet dans le but d’en faire une arme (petite cuillère aiguisée, etc.)."
                    />
                  </Options>
                </>
              )}
              {fpGroups.includes("La victime a subi une violence physique") && (
                <>
                  <b>La victime a subi une violence physique</b>

                  <Options
                    name="fpPhysicalViolences"
                    color="text-green-500"
                    register={register}
                  >
                    <Option
                      value="Maltraitance volontaire ou par négligence"
                      info="Cet item concerne uniquement la relation d'un personnel de santé envers un patient/résident (ex : négliger le patient/résident qui attend un soin de nursing, etc.)"
                    />
                    <Option
                      value="Violence volontaire sans arme"
                      info="Bousculade, coup, morsure, crachat au visage et sur la personne, saisir une personne à la gorge. Attention : une personne souffrant d’un Trouble Psychique ou Neuro-psychique - TPN), à savoir une abolition partielle ou totale de son discernement, est considérée comme commettant une violence volontaire (cocher également la case TPN). Une personne sous l’emprise manifeste d’alcool ou de stupéfiants commet une violence volontaire car c’est elle qui s’est mise dans cet état (ne pas cocher la case TPN)."
                    />
                    <Option
                      value="Violence volontaire avec arme par nature ou par destination"
                      info="Arme par nature: arme à feu ; arme blanche dont les objets contondants : poing américain, tonfa, nunchaku, etc. ; bombe lacrymogène. Arme par destination: objet qui va être utilisé comme arme soit par détournement de son usage naturel à des fins de violence (canne de marche, chaise, clé, couverts, jouet, etc.), soit parce que l’auteur a délibérément transformé l’objet dans le but d’en faire une arme (petite cuillère aiguisée, etc.)."
                    />
                    <Option
                      value="Autre fait qualifié de crime"
                      info="Meurtre et tentative, violences volontaires entraînant mutilation ou infirmité permanente, enlèvement, séquestration"
                      precision={"fpPhysicalViolencesPrecision"}
                      onChangePrecision={
                        ensureOtherFpPhysicalViolencesIsChecked
                      }
                    />
                  </Options>
                </>
              )}

              {fpGroups.includes("La victime a subi une violence sexuelle") && (
                <>
                  <b>La victime a subi une violence sexuelle</b>

                  <Options
                    name="fpSexualViolences"
                    color="text-pink-600"
                    register={register}
                  >
                    <Option
                      value="Exhibition sexuelle"
                      info="Se montrer nu de façon intentionnelle à la vue du public (personnel de santé ou autres personnes)."
                    />
                    <Option
                      value="Agression sexuelle"
                      info="L’agression sexuelle est une atteinte sexuelle sans pénétration commise avec contrainte, menace, surprise sans le consentement de la victime. Si pénétration, cocher viol."
                    />
                    <Option
                      value="Viol"
                      info="Tout acte de pénétration sexuelle, de quelque nature qu'il soit, commis par violence, contrainte, menace ou surprise."
                    />
                  </Options>
                </>
              )}

              {fpGroups.includes(
                "La victime a subi une violence psychologique",
              ) && (
                <>
                  <b>La victime a subi une violence psychologique</b>

                  <Options
                    name="fpPsychologicalViolences"
                    color="text-red-600"
                    register={register}
                  >
                    <Option
                      value="Abus de faiblesse ou état d’ignorance"
                      info="Maltraitance physique et/ou psychique sur une personne dont on connaît sa particulière vulnérabilité (minorité, âge, maladie, infirmité, déficience physique ou psychique, état de grossesse) en vue d’obtenir un acte ou une abstention qui lui sont gravement préjudiciables. Par exemple, lui soutirer de l'argent, lui faire signer un chèque en blanc, une procuration, etc."
                    />
                    <Option
                      value="Constat d'un suicide ou d'une tentative"
                      info="C’est une violence psychologique sur ceux qui constatent ce fait. Cette atteinte ne nécessite pas forcément de remplir le masque « motifs »."
                    />
                    <Option
                      value="Harcèlement moral"
                      info="Agissements répétés de comportements, propos, réseaux sociaux, courriel, téléphone, SMS, écrits qui troublent la tranquillité de la victime ou dégradent les conditions de travail. Ex: répétitions d’appels téléphoniques à la suite du refus d’un médecin de délivrer une ordonnance, d’une vengeance d’un soin considéré comme mal fait, etc."
                    />
                    <Option
                      value="Harcèlement sexuel"
                      info="Agissements répétés de comportements, propos, usage réseaux sociaux, courriel, téléphone, texto, écrit."
                    />
                  </Options>
                </>
              )}

              {fpGroups.includes("La victime a été discriminée") && (
                <>
                  <b>La victime a été discriminée</b>

                  <Options
                    name="fpDiscriminations"
                    color="text-orange-600"
                    register={register}
                  >
                    <Option
                      value="Refus de délivrer un bien ou d'un service en raison de critères discriminatoires"
                      info="Le fait (ici uniquement pour un personnel de santé ou un prestataire) de refuser de délivrer un bien ou un service en raison d’une distinction opérée à propos de : l'origine, le sexe, la religion, l'opinion politique..."
                    />
                    {/* Hack to make the field fpDiscriminations an array (like the other fields), not a boolean */}
                    <Option value="N/A" hidden />
                  </Options>
                </>
              )}

              {fpGroups.includes(
                "Les auteurs n’ont pas respecté les règles du lieu / ont eu un comportement incivique",
              ) && (
                <>
                  <b>
                    Les auteurs n’ont pas respecté les règles du lieu / ont eu
                    un comportement incivique
                  </b>

                  <Options
                    name="fpNoRespects"
                    color="text-purple-600"
                    register={register}
                  >
                    <Option
                      value="Nuisance, chahut, fugue"
                      info="Non-respect des règles de l’établissement (horaires de visites, stationnement, niveau sonore d’un appareil, fumer dans un espace interdit...). Parler exagérément fort ou ameuter le public pour parvenir à ses fins, taper sur les meubles, faire le siège d’un bureau avec un personnel à l’intérieur pour obtenir une décision, ne pas respecter les règles de la laïcité, etc."
                    />
                    <Option value="Consommation ou détention sur place d’alcool et/ou de produits stupéfiants pour son propre usage" />
                  </Options>
                </>
              )}
              {fpGroups.includes("Autres faits") && (
                <>
                  <b>Autres faits</b>

                  <Options
                    name="fpOthers"
                    color="text-yellow-600"
                    register={register}
                  >
                    <Option
                      value="Atteinte à la vie privée et/ou au droit à l’image"
                      info="Atteinte à la vie privée: fait de filmer, photographier et/ou enregistrer vos propos sans vous demander l’autorisation. Atteinte au droit à l’image: fait de diffuser ensuite film, photo/enregistrement sonore dans les médias (presse, audio, vidéo) sans votre autorisation. Attention: La chambre d’un établissement est un lieu privé, mais un établissement (public ou privé) et un cabinet, une officine ne sont pas un lieu privé. Donc il n’y pas d’atteinte à la vie privée si vous êtes filmé dans les couloirs ou encore une salle d’attente. En revanche la diffusion de votre image peut dans certaines circonstances être une violation du droit à l’image."
                    />
                    <Option value="Atteinte au respect dû aux morts" />
                  </Options>
                </>
              )}
            </>
          )}
          {factTypes?.includes("Atteinte aux biens") && !!fgGroups?.length && (
            <>
              <Title2 className="mt-12 mb-8">
                {"Veuillez préciser les faits de l'atteinte aux biens :"}
              </Title2>

              {fgGroups.includes("Dégradation") && (
                <>
                  <b>Dégradation</b>

                  <Options
                    name="fgDeteriorations"
                    color="text-indigo-600"
                    register={register}
                  >
                    <Option
                      value="Dégradation autre que par incendie"
                      info="Mobilier, véhicule, local, matériel, etc."
                    />
                    <Option
                      value="Dégradation par incendie volontaire"
                      info="Local, matelas, mobilier, poubelle, véhicule, etc."
                    />
                    <Option
                      value="Tags, graffitis, autres salissures"
                      info="Avec caractère ou non injurieux envers quelqu’un ou établissement/cabinet/officine."
                    />
                    <Option
                      value="Squat et occupation"
                      info="D’un lieu, d’un bâtiment, sous/sol avec détérioration ou non (laisser des détritus, salissures): se laver dans une chambre vide, rester ou dormir dans une salle d’attente, squatter une pièce en sous-sol, etc."
                    />
                    <Option value="Matériel de grande valeur (médical ou non)" />
                  </Options>
                </>
              )}

              {fgGroups.includes("Vol sans effraction") && (
                <>
                  <b>Vol sans effraction</b>

                  <Options
                    name="fgStealWithoutBreakins"
                    color="text-green-600"
                    register={register}
                  >
                    <Option
                      value="Objets professionnels ou personnels du personnel de santé"
                      info="Caducée, fonds de caisse, plaque professionnelle, ordonnancier, tampon professionnel, médicaments, mobilier, masque, ramettes de papier, nourriture dans les frigos, etc."
                    />
                    <Option
                      value="Matériel de grande valeur (médical ou non)"
                      info="outil informatique, endoscope, véhicule de l’établissement, etc."
                    />
                    <Option value="Effets personnels d’un patient, d’un accompagnant, d’une autre personne" />
                    <Option
                      value="Informations"
                      info="Par le biais du piratage des dossiers patients, de l’ordinateur, rançonnage."
                    />
                    <Option value="Vol à main armée" />
                  </Options>
                </>
              )}

              {fgGroups.includes("Vol avec effraction") && (
                <>
                  <b>
                    Vol avec effraction{" "}
                    <Info
                      title={
                        "Est assimilé à l'effraction l'usage de fausses clefs, de clefs indûment obtenues ou de tout instrument (dont badge) pouvant être frauduleusement employé pour actionner un dispositif de fermeture sans le forcer ni le dégrader."
                      }
                    />
                  </b>

                  <Options
                    name="fgStealWithBreakins"
                    color="text-pink-600"
                    register={register}
                  >
                    <Option
                      value="Objets professionnels ou personnels du personnel de santé"
                      info="Caducée, fonds de caisse, plaque professionnelle, ordonnancier, tampon professionnel, médicaments, mobilier, masque, ramettes de papier, nourriture dans les frigos, etc."
                    />
                    <Option
                      value="Matériel de grande valeur (médical ou non)"
                      info="Outil informatique, endoscope, véhicule de l’établissement, etc."
                    />
                    <Option value="Effets personnels d’un patient, d’un accompagnant, d’une autre personne" />
                    <Option
                      value="Informations"
                      info="Par le biais du piratage des dossiers patients, de l’ordinateur, rançonnage."
                    />
                    <Option value="Vol à main armée" />
                  </Options>
                </>
              )}

              {fgGroups.includes("Autres faits") && (
                <>
                  <b>Autres faits</b>

                  <Options
                    name="fgOthers"
                    color="text-yellow-600"
                    register={register}
                  >
                    <Option
                      value="Port d’arme ou détention d’arme"
                      info="Arme à feu, arme blanche, gaz lacrymogène, objet contondant : poing américain, tonfa, nunchaku, etc. Cette atteinte ne nécessite pas forcément de remplir le masque « motifs »."
                    />
                    <Option
                      value="Escroquerie"
                      info="Ex. : à la suite d’un vol d’ordonnancier pour se faire remettre indument des médicaments, obtenir des droits indus (présenter une fausse attestation ou une attestation falsifiée, une fausse carte vitale, un faux arrêt de travail, etc.)."
                    />
                    <Option
                      value="Trafic de stupéfiants ou autre trafic dans l’établissement"
                      info="Cigarettes, médicaments, etc."
                    />
                  </Options>
                </>
              )}
            </>
          )}
          {!!factTypes?.length && (
            <div className="flex justify-center w-full my-16 space-x-4">
              <Link href="/forms/freelance/step1">
                <a>
                  <OutlineButton type="button">Précédent</OutlineButton>
                </a>
              </Link>
              <PrimaryButtton>Suivant</PrimaryButtton>
            </div>
          )}
        </form>
      </div>
    </Layout>
  )
}

export default Step2Page
