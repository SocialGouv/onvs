import { v4 as uuid } from "uuid"

export default function update(state, payload) {
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
    form: {
      // We set a new uuid for each reset to prevent multiple submits of the same declaration
      id: uuid(),
    },
  }
}
