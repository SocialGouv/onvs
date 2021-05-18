export const onEnterKeyPress = (fn) => (event) =>
  event.key === "Enter" && fn(event);
