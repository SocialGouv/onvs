export default function update(state, payload) {
  return {
    ...state,
    form: {
      ...state.form,
      ...payload,
    },
  }
}
