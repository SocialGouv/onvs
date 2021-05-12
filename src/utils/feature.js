/**
 * The features need to be present in .k8s/environment.
 *
 * Use a name like NEXT_PUBLIC_FEATURE_XXX (ex: NEXT_PUBLIC_FEATURE_ETS_FORM).
 *
 * @param {string} feature name
 * @returns true if feature is on
 */

export function isOpenFeature(feature) {
  if (!process.env[feature]) {
    console.error("The feature doesn't exist")
    return false
  }

  return /on/i.test(process.env[feature]) || /true/i.test(process.env[feature])
}
