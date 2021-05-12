// List all your features here. The variables need to exist in .env for development and in .k8s/environement/app.configmap.yaml for CI/CD.
const features = { ETS_FORM: process.env.NEXT_PUBLIC_FEATURE_ETS_FORM }

/**
 * See if a feature is open.
 *
 * @param {string} feature name
 * @returns true if feature is open
 */
export function isOpenFeature(feature) {
  if (!features[feature]) {
    console.error("The feature doesn't exist")
    return false
  }

  return /on/i.test(features[feature]) || /true/i.test(features[feature])
}
