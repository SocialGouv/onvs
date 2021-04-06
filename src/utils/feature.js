// Change following object proprerties to enable/disable feature.
export const FEATURES = {
  ETS_FORM: true,
}

export const isOpenFeature = (feature) => {
  if (!FEATURES[feature] === undefined) {
    console.error(
      "Unknown feature. Check the list of all available features in https://github.com/SocialGouv/onvs/blob/master/src/utils/features.js",
    )
  }

  if (FEATURES[feature] === false) {
    console.debug(`Feature ${feature} disabled`)
  }

  return Boolean(FEATURES[feature])
}
