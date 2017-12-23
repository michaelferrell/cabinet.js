"use strict"

import StorageFactory from "./StorageFactory"
import { storageSupported } from "./utilities"

if (storageSupported()) {
  const cabinet = new StorageFactory("local")
  cabinet.session = new StorageFactory("session")
  window.Cabinet = cabinet
}
