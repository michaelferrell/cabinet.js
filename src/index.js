'use strict'

import StorageFactory from './StorageFactory'
import { storageSupported } from './utilities'

let Cabinet

if (storageSupported()) {
	Cabinet = new StorageFactory('local')
	Cabinet.session = new StorageFactory('session')
} else {
	console.error('cabinet.js: local storage not supported')
}

export default Cabinet
