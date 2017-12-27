import { getType } from './utilities'

class Entry {
  constructor(val) {
    this.val  = val
    this.type = getType(val)
    this.dateCreated = new Date()
  }
}

export default Entry