import * as hospital from "@/models/declarations/hospital"
import * as liberal from "@/models/declarations/liberal"

const helpers = {
  hospital,
  liberal,
}

export function getHelpers(type) {
  if (!type) {
    throw new Error("The declarationType must be present")
  }

  return {
    castDBToJS: helpers[type].castDBToJS,
    castJSToDB: helpers[type].castJSToDB,
    validateJS: helpers[type].validateJS,
  }
}
