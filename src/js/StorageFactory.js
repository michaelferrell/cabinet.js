import Entry from './Entry'
import * as util from './utilities'

class StorageFactory {
  constructor(storageType) {
    this.Storage = storageType === 'session' ? sessionStorage : localStorage
  }

  set = (key, val) => {
    if (typeof val === 'undefined') {
      util.invalidType()
      return false
    }
    if (util.isValidValue(val)) {
      var entry = util.jstringify(new Entry(val))
      this.Storage.setItem(key, entry)
    } else {
      return false
    }
    return true
  }

  get = key => {
    if (!util.isString(key)) {
      util.invalidType()
      return false
    }
    let val = null
    let item = this.Storage.getItem(key)
    if (item !== null && util.isJsonString(item)) {
      item = JSON.parse(item)
      val = item.hasOwnProperty('val') ? item.val : item
    } else if (util.isString(item)) {
      val = item
    }
    return val
  }

  getAll = () => {
    const keys = Object.keys(this.Storage)
    return keys.length ? keys.map(key => this.get(key)) : []
  }

  keys = () => {
    return Object.keys(this.Storage)
  }

  remove = key => {
    if (!util.isString(key)) {
      util.invalidType()
      return false
    }
    this.Storage.removeItem(key)
    return true
  }

  removeAll = () => {
    this.Storage.clear()
    return true
  }

  count = () => {
    return Object.keys(this.Storage).length
  }
}

export default StorageFactory
