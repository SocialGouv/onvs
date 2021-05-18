import { v4 as uuid } from "uuid";

export const update = (state, payload) => ({
  ...state,
  form: {
    ...state.form,
    ...payload,
  },
});

const reset = (declarationType) => () => ({
  form: {
    declarationType,
    // We set a new uuid for each reset to prevent multiple submits of the same declaration
    id: uuid(),
  },
});

export const resetFreelance = reset("libéral");
export const resetETS = reset("ETS");
