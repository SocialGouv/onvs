import { DeclarationModel } from "@/models/declarations"
import { API_URL } from "@/utils/config"
import fetcher from "@/utils/fetcher"
import { flatObject } from "@/utils/object"
import { factGoodsGroups, factPersonsGroups, reasons } from "@/utils/options"

const DECLARATION_ENDPOINT = "declarations"

// Extract town and postal code in the field. For example : "Nantes (44000)".
function extractTownAndPostalCode(town) {
  // Regex magic ✨
  // There is 2 captured groups : 1/ everthing before a parenthesis, 2/ everything between the '(' and the ')'.
  const groups = town?.match(/([^(]+)\(([^)]+)\)/)

  if (groups?.[2]) {
    return { town: groups[1]?.trim(), postalCode: groups[2]?.trim() }
  }
  return { town }
}

// Note: this function returns a Promise, as expected, even await is not required by return syntax.
export const createDeclaration = async ({
  declaration,
  keys,
}: {
  declaration: any
  keys: Array<any>
}): Promise<string> => {
  const data = flatObject(declaration?.steps, keys)
  const { town, postalCode } = extractTownAndPostalCode(data?.town?.label)

  // console.log("declaration", declaration)
  // console.log("data", data)

  // Reminder : the id is generated client side, to prevent multiple submits.
  data.id = declaration.id
  data.declarationType = declaration.declarationType
  data.town = town
  data.postalCode = postalCode

  data.hour = data.hour.label

  if (declaration?.steps?.job) {
    // job is outside the ordered steps by flow. Refactor the wizard forms to better manage job info transfer
    data.job = declaration.steps.job.job.label
  }

  // LOCATION ---------------------------------------------------------------

  if (data.declarationType === "ets") {
    // Filling the legacy columns (renamed in _deprecated to distinguish them).
    if (data.locationMain?.label) {
      data.locationMain_deprecated = data.locationMain.label
    }

    if (data.locationSecondary?.label) {
      data.locationSecondary_deprecated = data.locationSecondary.label
    }

    // Filling the new column.
    data.location = {
      "Dans quel service ?": data.locationMain?.label,
      "Dans quel lieu précisément ?": data.locationSecondary?.label,
    }

    // We need to remove these fields since they are renamed in _deprecated.
    delete data.locationMain
    delete data.locationSecondary
  } else {
    // Should be the liberal flow.
    data.location_deprecated = data.location
    data.otherLocation_deprecated = data.otherLocation

    // Fill the new column.
    data.location = {
      "Dans quel lieu précisément ?": data.otherLocation
        ? ["Autre", data.otherLocation]
        : data.location,
    }

    // We need to remove the newly deprecated fied as zod expect not to see it.
    delete data.otherLocation
  }

  // FACTS  -----------------------------------------------------------------------------------

  data.fpSpokenViolences_deprecated = data.fpSpokenViolences
  data.fpSexualViolences_deprecated = data.fpSexualViolences
  data.fpPsychologicalViolences_deprecated = data.fpPsychologicalViolences
  data.fpPhysicalViolences_deprecated = data.fpPhysicalViolences
  data.fpPhysicalViolencesPrecision_deprecated =
    data.fpPhysicalViolencesPrecision
  data.fpOthers_deprecated = data.fpOthers
  data.fpNoRespects_deprecated = data.fpNoRespects
  data.fpGroups_deprecated = data.fpGroups
  data.fpDiscriminations_deprecated = data.fpDiscriminations
  data.fgStealWithoutBreakins_deprecated = data.fgStealWithoutBreakins
  data.fgStealWithBreakins_deprecated = data.fgStealWithBreakins
  data.fgOthers_deprecated = data.fgOthers
  data.fgGroups_deprecated = data.fgGroups
  data.fgDeteriorations_deprecated = data.fgDeteriorations
  data.factTypes_deprecated = data.factTypes

  data.factPersons = Object.keys(factPersonsGroups)
    .map((key) => ({
      key,
      label: factPersonsGroups[key].label,
      data: data[key],
    }))
    .filter((elt) => elt.data.length)
    .map((elt) =>
      elt.key !== "fpPhysicalViolences"
        ? elt
        : {
            ...elt,
            data: elt.data.map((option) =>
              option !== "Autre fait qualifié de crime"
                ? option
                : [
                    "Autre fait qualifié de crime",
                    data?.fpPhysicalViolencesPrecision,
                  ],
            ),
          },
    )
    .reduce((acc, current) => ({ ...acc, [current.label]: current.data }), {})

  data.factGoods = Object.keys(factGoodsGroups)
    .map((key) => ({
      key,
      label: factGoodsGroups[key].label,
      data: data[key],
    }))
    .filter((elt) => elt.data.length)
    .reduce((acc, current) => ({ ...acc, [current.label]: current.data }), {})

  delete data.fpSpokenViolences
  delete data.fpSexualViolences
  delete data.fpPsychologicalViolences
  delete data.fpPhysicalViolences
  delete data.fpPhysicalViolencesPrecision
  delete data.fpOthers
  delete data.fpNoRespects
  delete data.fpGroups
  delete data.fpDiscriminations
  delete data.fgStealWithoutBreakins
  delete data.fgStealWithBreakins
  delete data.fgOthers
  delete data.fgGroups
  delete data.fgDeteriorations
  delete data.factTypes

  // REASONS  -----------------------------------------------------------------------------------

  data.rCausePatients_deprecated = data.rCausePatients
  data.rCauseProfessionals_deprecated = data.rCauseProfessionals
  data.rDiscords_deprecated = data.rDiscords
  data.rLifeRules_deprecated = data.rLifeRules
  data.rFalsifications_deprecated = data.rFalsifications
  data.rDeficientCommunications_deprecated = data.rDeficientCommunications
  data.rOthers_deprecated = data.rOthers
  data.rOthersPrecision_deprecated = data.rOthersPrecision
  data.rNotApparent_deprecated = data.rNotApparent

  data.reasons = Object.keys(reasons)
    .map((key) => ({
      ...reasons[key],
      data: data[key],
    }))
    .filter((elt) => elt.data.length)
    .map((elt) => ({
      ...elt,
      data: elt.data.map((option) => {
        const [optionDefinition] = elt.options.filter(
          (aux) => aux.value === option,
        )

        return !optionDefinition?.precision
          ? option
          : [optionDefinition.value, data?.rOthersPrecision]
      }),
    }))
    .reduce((acc, current) => ({ ...acc, [current.label]: current.data }), {})

  if (!Object.keys(data.reasons).length) {
    delete data.reasons
  }

  data.reasonNotApparent = Boolean(data.rNotApparent)

  delete data.rCausePatients
  delete data.rCauseProfessionals
  delete data.rDiscords
  delete data.rLifeRules
  delete data.rFalsifications
  delete data.rDeficientCommunications
  delete data.rOthers
  delete data.rOthersPrecision
  delete data.rNotApparent

  // DECLARANT_CONTACT_AGREEMENT ---------------------------------------------------------------
  // Filling the legacy column for user agreement (renamed in _deprecated).
  data.declarantContactAgreement_deprecated = data.declarantContactAgreement
  // Filling the new column for user agreement (which is of boolean type and can be null)
  data.declarantContactAgreement =
    data.declarantContactAgreement_deprecated === "true"
      ? true
      : data.declarantContactAgreement_deprecated === "false"
      ? false
      : null

  // PURSUIT  ---------------------------------------------------------------

  data.pursuit_deprecated = data.pursuit // => Non, Main courate ou plainte (varachar)
  data.pursuitBy_deprecated = data.pursuitBy // tableau
  // pursuit_precision_deprecated => jamais utilisé

  if (data.pursuit === "Non") {
    delete data.pursuit // We don't store the pursuit anymore when no is choosen.
  } else {
    data.pursuit = {
      type:
        data.pursuit === "Autre"
          ? ["Autre", data.pursuitPrecision]
          : data.pursuit,
      ...(data.pursuit === "Plainte" && { pursuitBy: data.pursuitBy }),
    }
  }

  delete data.pursuitBy

  // THIRD_PARTY  ---------------------------------------------------------------

  data.thirdParty_deprecated = data.thirdParty
  data.thirdPartyIsPresent_deprecated = data.thirdPartyIsPresent
  data.thirdPartyPrecision_deprecated = data.thirdPartyPrecision

  if (data.thirdPartyIsPresent === "Non") {
    delete data.thirdParty
  } else {
    data.thirdParty = data.thirdParty.map((elt) =>
      elt === "Autre" ? ["Autre", data.thirdPartyPrecision] : elt,
    )
  }

  delete data.thirdPartyIsPresent
  delete data.thirdPartyPrecision

  // VICTIMS & AUTHORS ---------------------------------------------------------------

  data.victims_deprecated = data.victims
  data.authors_deprecated = data.authors

  if (data.victims?.length) {
    const victims = data.victims.map((victim) => {
      return {
        ...victim,
        type: victim.type.label,
        gender: victim.gender.label,
        age: victim.age.label,
        ...(victim.healthJob && { healthJob: victim.healthJob.label }),
      }
    })

    data.victims = victims
  }

  if (data.authors?.length) {
    const authors = data.authors.map((author) => {
      // We ignore discernmentTroublesIsPresent, since it can be deduce if the discernmentTroubles is an empty array.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { discernmentTroublesIsPresent, ...restAuthors } = author

      return {
        ...restAuthors,
        type: author.type.label,
        gender: author.gender.label,
        age: author.age.label,
        ...(author.healthJob && { healthJob: author.healthJob.label }),
      }
    })

    data.authors = authors
  }

  // console.log("dans clients", data)

  return fetcher(`${API_URL}/${DECLARATION_ENDPOINT}`, {
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
}
export const findDeclaration = async (
  id: string,
): Promise<DeclarationModel> => {
  return fetcher(`${API_URL}/${DECLARATION_ENDPOINT}/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
}
