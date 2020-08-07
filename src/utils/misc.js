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

export const isEmpty = (obj) =>
  !obj ||
  (obj.constructor === Object && Object.keys(obj).length === 0) ||
  (obj.constructor === Array && obj.length === 0)

export const deleteProperty = (obj, property) => {
  const res = { ...obj }
  delete res[property]
  return res
}

export const capitalize = (str) =>
  !str?.length ? "" : str[0].toUpperCase() + str.slice(1)

export const pluralize = (count) => (count && count > 1 ? "s" : "")
