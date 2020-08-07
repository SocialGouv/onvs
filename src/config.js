export const toastConfig = {
  error: {
    appearance: "error",
    autoDismiss: true,
    transitionDuration: 400,
  },
}

export const yupConfig = {
  abortEarly: false,
  strict: false,
}

export const selectConfig = {
  container: (styles) => ({
    ...styles,
    flexGrow: 1,
  }),
  menu: (styles) => ({
    ...styles,
    textAlign: "left",
  }),
}
