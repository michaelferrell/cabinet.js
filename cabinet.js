/*!
  * CabinetJS - copyright (c) Michael Ferrell 2016
  * https://github.com/michaelferrell/cabinetjs
  * MIT license
  */
(function(root, factory) {
	if(typeof define === 'function' && define.amd) {
		define([], factory);
	} else if(typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Cabinet = factory();
	}
}(this, function() {
	'use strict';

	var storageSupported = function() {
		try {
			var storage = window['localStorage'];
			var check = 'supported';
			storage.setItem(check, check);
			storage.removeItem(check);
			return true;
		}
		catch(e) {
			return false;
		}
	}

	// not supported in this browser
	if (!storageSupported()) return;

	// Cache instances
	var session_storage = sessionStorage; 
	var local_storage   = localStorage;

	var getType     = function(item) { return Object.prototype.toString.call(item); }
	var isString    = function(str)  { return typeof str === 'string'; }
	var isFunction  = function(fn)   { return typeof fn === 'function'; }
	var isArray     = function(arr)  { return getType(arr) === '[object Array]' ? true : false; }
	var isObject    = function(obj)  { return getType(obj) === '[object Object]' ? true : false; }
	var isDate      = function(date) { return getType(date) === '[object Date]' ? true : false; }
	var isNumber    = function(num)  { return getType(num) === '[object Number]' ? true : false; }
	var isBool      = function(bool) { return getType(bool) === '[object Boolean]' ? true : false; }
	var jstringify  = function(item) { return JSON.stringify(item); }
	var jparse      = function(item) { return JSON.parse(item); }
	var invalidType = function()     { throw new Error('Provided key is an invalid type.'); }

	// Constructor for a new entry
	var Entry       = function(val) {
		this.val  = val;
		this.type = Object.prototype.toString.call(val);
	}

	////////////////////////////
	////////////////////////////
	// Generic Storage Interface

	var StorageFactory = (function() {

		var setInstance = function(type) {
			return type === 'session' ? session_storage : local_storage;
		}

		var Factory = {};

		Factory.set = function(key, val) {
			var storage = setInstance(arguments[2]);

			if (typeof val === 'undefined')  {
				invalidType();
				return false;
			}

			if (isString(val)
				|| isArray(val)
				|| isObject(val)
				|| isDate(val)
				|| isNumber(val)
				|| isBool(val)
			) {
				var entry = jstringify(new Entry(val));
				storage.setItem(key, entry);
			} else {
				return false;
			}

			return true;
		}

		Factory.get = function(key) {
			var storage = setInstance(arguments[1]);
			if (!isString(key)) {
				invalidType();
				return false;
			}
			var item = JSON.parse(storage.getItem(key));

			return item !== null ? item.val : null;
		}
		
		Factory.getAll = function() {
			// either string 'session' or undefined
			var arg     = arguments[0];
			var storage = setInstance(arg);
			var keys    = Object.keys(storage);
			var items   = [];

			if (keys.length > 0) {
				items = keys.map(function(key) {
					return Factory.get(key, arg);
				});
			}

			return items;
		}

		Factory.keys = function() {
			var storage = setInstance(arguments[0]);
			return Object.keys(storage);
		}

		Factory.remove = function(key) {
			var storage = setInstance(arguments[1]);
			if (!isString(key)) {
				invalidType();
				return false;
			}
			storage.removeItem(key);
			return true;
		}

		Factory.removeAll = function() {
			var storage = setInstance(arguments[0]);
			storage.clear();
			return true;
		}

		Factory.count = function() {
			var storage = setInstance(arguments[0]);
			return Object.keys(storage).length;
		}

		return Factory;

	})();

	//////////////////////
	//////////////////////
	// Local storage API

	var Cabinet = {};

	Cabinet.set = function(key, val) {
		return StorageFactory.set(key, val);
	}

	Cabinet.get = function(key) {
		return StorageFactory.get(key);
	}

	Cabinet.getAll = function() {
		return StorageFactory.getAll();
	}

	Cabinet.keys = function() {
		return StorageFactory.keys();
	}

	Cabinet.remove = function(key) {
		return StorageFactory.remove(key);
	}

	Cabinet.removeAll = function() {
		return StorageFactory.removeAll();
	}

	Cabinet.count = function() {
		return StorageFactory.count();
	}

	//////////////////////
	//////////////////////
	// Session storage API

	Cabinet.session = {};

	Cabinet.session.set = function(key, val) {
		return StorageFactory.set(key, val, 'session');
	}

	Cabinet.session.get = function(key) {
		return StorageFactory.get(key, 'session');
	}

	Cabinet.session.getAll = function() {
		return StorageFactory.getAll('session');
	}

	Cabinet.session.keys = function() {
		return StorageFactory.keys('session');
	}

	Cabinet.session.remove = function(key) {
		return StorageFactory.remove(key, 'session');
	}

	Cabinet.session.removeAll = function() {
		return StorageFactory.removeAll('session');
	}

	Cabinet.session.count = function() {
		return StorageFactory.count('session');
	}

	return Cabinet;
}));