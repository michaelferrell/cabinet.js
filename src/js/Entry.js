import { getType } from "./utilities"
import { SOURCE } from "./constants"

class Entry {
  constructor(val, expires) {
    this.val  = val
    this.type = getType(val)
    this.dateCreated = new Date()
    this.expires = expires
    this.source = SOURCE
  }
}

export default Entry