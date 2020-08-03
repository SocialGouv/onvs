export const removeEmpty = (data) => {
  const res = {}
  for (const prop in data) {
    if (Array.isArray(data[prop])) {
      if (data[prop].length) {
        res[prop] = data[prop]
      }
    } else if (data[prop]) {
      res[prop] = data[prop]
    }
  }
  return res
}
