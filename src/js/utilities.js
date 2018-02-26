import {
  MS_PER_SECOND,
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
  SOURCE,
  TIME_UNITS
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

export const hasAttribute = (object, name) => isObject(object) && object.hasOwnProperty(name)

export const isValidKey = val => (isString(val) && val.length) || isNumber(val)

export const isValidTimeUnit = unit =>
  isString(unit) && TIME_UNITS.indexOf(unit.toLowerCase()) > -1

export const isValidExpiration = expires => {
  if (isDate(expires)) {
    // Date instance passed in
    return true
  } else if (
    !isObject(expires) ||
    !expires.hasOwnProperty("value") ||
    !expires.hasOwnProperty("unit")
  ) {
    throw new Error(
      "Expiration must be an object containing a value and a unit property, or a Date instance."
    )
  } else if (!isNumber(expires.value)) {
    throw new Error("Expiration value must be a number.")
  } else if (!isValidTimeUnit(expires.unit)) {
    throw new Error(
      "Expiration unit must be a string set to a valid time unit (ie. day, hour, minute, second)."
    )
  } else {
    return true
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


export const createExpiration = expires => {
  if (isDate(expires)) {
    return expires
  }
  let milliseconds = msByTimeUnit(expires.unit.toLowerCase())
  return new Date(
    Date.now() + expires.value * milliseconds
  )
}

export const hasExpired = item => {
  if (!hasAttribute(item, "expires")) {
    return false
  } else if (Date.parse(item.expires) <= Date.now()) {
    return true
  } else {
    return false
  }
}

export const invalidTypeError = () => {
  throw new Error("Provided key is an invalid type.")
}

export const storageError = e => {
  throw new Error(e)
}

export const invalidTimeUnitError = () => {
  throw new Error("Provided time unit is an invalid type.")
}
