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

export const hasData = (data) => {
  for (const prop in data) {
    if (Array.isArray(data[prop])) {
      if (data[prop].length) {
        return true
      }
    } else if (data[prop]) {
      return true
    }
  }
  return false
}
