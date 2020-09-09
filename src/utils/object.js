/**
 * Make object from another, swaping the keys and the values
 */
export const revertObject = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]
    acc[value] = key
    return acc
  }, {})
}

/**
 * Rename properties of an object with a mapping object.
 *
 * @param {*} obj the original object to transform
 * @param {*} mapping object with key is the property to be found in the object and value the new property to add to the object
 */
export const renameKeys = (obj, mapping) =>
  Object.fromEntries(
    Object.keys(mapping)
      .map((oldKey) => [mapping[oldKey], obj[oldKey]])
      .filter((curr) => !!curr[1]),
  )
