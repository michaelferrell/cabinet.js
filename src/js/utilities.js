import {
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
  SOURCE
} from "./constants"

export const storageSupported = () =>
  window.localStorage && isFunction(window.localStorage.setItem)

export const getType = obj =>
  ({}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase())

//type checks
export const isString = str => getType(str) === "string"
export const isFunction = fn => getType(fn) === "function"
export const isArray = arr => getType(arr) === "array"
export const isObject = obj => getType(obj) === "object"
export const isDate = date => getType(date) === "date"
export const isNumber = num => getType(num) === "number"
export const isBool = bool => getType(bool) === "boolean"

export const isJsonString = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const isValidKey = val => (isString(val) && val.length) || isNumber(val)

export const isValidValue = val =>
  isString(val) ||
  isArray(val) ||
  isObject(val) ||
  isDate(val) ||
  isNumber(val) ||
  isBool(val)

export const hasPropVal = operand =>
  isObject(operand) && operand.hasOwnProperty("val")

export const hasPropExpires = operand =>
  isObject(operand) && operand.hasOwnProperty("expires")

export const isValidExpiration = val => {
  if (isNumber(val) || isDate(val)) {
    return true
  } else {
    throw new Error("Expiration value must be a number.")
  }
}

export const msByTimeUnit = unit => {
  switch (unit) {
    case "day":
      return MS_PER_DAY
    case "hour":
      return MS_PER_HOUR
    case "minute":
      return MS_PER_MINUTE
    case "second":
      return MS_PER_SECOND
    default:
      invalidTimeUnitError()
  }
}

export const createExpiration = ({ expires, unit = "day" }) => {
  console.log("expires:", expires)
  console.log("unit:", unit)
  // Date instance passed in
  if (isDate(expires)) {
    return expires
  }
  expires = Date.now() + expires * msByTimeUnit(unit)
  return new Date(expires)
}

export const hasExpired = dateStr => {
  let expires = Date.parse(dateStr)
  // only use expires if its a number (excluding NaN)
  if (!isNaN(expires) && expires <= Date.now()) {
    return true
  }
  return false
}

export const invalidTypeError = () => {
  throw new Error("Provided key is an invalid type.")
}

export const storageError = e => {
  alert(e)
  throw new Error(e)
}

export const invalidTimeUnitError = () => {
  throw new Error("Provided time unit is an invalid type.")
}
