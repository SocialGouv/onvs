import { words, upperFirst, toLower, flow } from "lodash"

export const upperCaseFirstLetters: (string) => string = (str: string) =>
  words(str)
    .map(flow([toLower, upperFirst]))
    .join(" ")
