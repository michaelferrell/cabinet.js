export const storageSupported = () =>
  window.localStorage && isFunction(window.localStorage.setItem)

export const getType = obj =>
  ({}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase())

//type checks
export const isString = str => getType(str) === 'string'
export const isFunction = fn => getType(fn) === 'function'
export const isArray = arr => getType(arr) === 'array'
export const isObject = obj => getType(obj) === 'object'
export const isDate = date => getType(date) === 'date'
export const isNumber = num => getType(num) === 'number'
export const isBool = bool => getType(bool) === 'boolean'

//serialization
export const jstringify = item => JSON.stringify(item)
export const jparse = item => JSON.parse(item)

export const invalidType = () => {
  throw new Error("Provided key is an invalid type.")
}

export const isJsonString = str => {
  try {
    jparse(str)
  } catch (e) {
    return false
  }
  return true
}

export const isValidValue = val =>
  isString(val) ||
  isArray(val) ||
  isObject(val) ||
  isDate(val) ||
  isNumber(val) ||
  isBool(val)
