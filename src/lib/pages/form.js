import { removeEmpty } from "utils/misc"

export default function update(state, payload) {
  payload = removeEmpty(payload)
  return {
    ...state,
    form: {
      ...state.form,
      ...payload,
    },
  }
}
export function reset() {
  return {
    form: {},
  }
}
