class Entry {
  constructor(val) {
    this.val  = val
    this.type = Object.prototype.toString.call(val)
    this.dateCreated = new Date()
  }
}

export default Entry