const FEATURES = {
  FEATURE_ETS_FORM: "on",
}

export function isOpenFeature(feature) {
  if (!FEATURES?.[feature]) {
    console.error("The feature doesn't exist")
    return false
  }

  return /on/i.test(FEATURES[feature])
}
