"use strict"

import StorageFactory from "./StorageFactory"
import { storageSupported } from "./utilities"

let cabinet

if (storageSupported()) {
  cabinet = new StorageFactory("local")
  cabinet.session = new StorageFactory("session")
} else {
  console.error("cabinet.js: local storage not supported")
}

export default cabinet
