import { removeEmpty } from "utils/misc"

export default function update(state, payload) {
  // payload = removeEmpty(payload)
  const res = {
    ...state,
    form: {
      ...state.form,
      ...payload,
    },
  }

  return res
}
export function reset() {
  return {
    form: {},
  }
}
