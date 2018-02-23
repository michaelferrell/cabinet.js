import Entry from "./Entry"
import {
  createExpiration,
  hasExpired,
  hasPropExpires,
  hasPropVal,
  invalidTypeError,
  isJsonString,
  isString,
  isValidExpiration,
  isValidKey,
  storageError
} from "./utilities"

class StorageFactory {
  constructor(storageType) {
    this.Storage = storageType === "session" ? sessionStorage : localStorage
    this.removeExpired()
  }

  set = (key, val, attributes = null) => {
    if (!isValidKey(key) || typeof val === "undefined") {
      invalidTypeError()
    }
    let expires =
      hasPropExpires(attributes) && isValidExpiration(attributes.expires)
        ? createExpiration(attributes)
        : null
    var entry = JSON.stringify(new Entry(val, expires))
    try {
      this.Storage.setItem(key, entry)
    } catch (e) {
      storageError(e)
    }
    return val
  }

  get = (key, defaultVal) => {
    if (!isValidKey(key)) {
      invalidTypeError()
    }
    let val = null
    let item = this.Storage.getItem(key)

    if (item !== null && isJsonString(item)) {
      item = JSON.parse(item)
      val = hasPropVal(item) ? item.val : item
      if (hasPropExpires(item) && hasExpired(item.expires)) {
        console.log("EXPIRED item", key)
        this.remove(key)
        val = null
      }
    } else if (isString(item)) {
      val = item
    } else if (item === null && typeof defaultVal !== "undefined") {
      this.set(key, defaultVal)
      val = defaultVal
    }

    return val
  }

  getAll = () => {
    const keys = Object.keys(this.Storage)
    return keys.length ? keys.map(key => this.get(key)) : []
  }

  keys = () => Object.keys(this.Storage)

  remove = key => {
    if (!isValidKey(key)) {
      invalidTypeError()
    }
    this.Storage.removeItem(key)
    return true
  }

  removeAll = () => {
    this.Storage.clear()
    return true
  }

  count = () => Object.keys(this.Storage).length

  getMetadata = key => {
    if (!isValidKey(key)) {
      invalidTypeError()
    }
    let item = this.Storage.getItem(key)
    if (item !== null && isJsonString(item)) {
      item = JSON.parse(item)
    }
    return item
  }

  removeExpired = () => {
    Object.keys(this.Storage).map(key => {
      if (!isValidKey(key)) return
      let item = this.getMetadata(key)
      if (hasPropExpires(item) && hasExpired(item.expires)) {
        console.log("EXPIRED item:", key)
        this.remove(key)
      }
    })
  }
}

export default StorageFactory
