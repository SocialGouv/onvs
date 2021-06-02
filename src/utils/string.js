const { words, upperFirst, toLower, flow } = require("lodash")

export const upperCaseFirstLetters = (str) =>
  words(str)
    .map(flow([toLower, upperFirst]))
    .join(" ")
