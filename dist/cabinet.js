(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entry = function Entry(val) {
	_classCallCheck(this, Entry);

	this.val = val;
	this.type = Object.prototype.toString.call(val);
	this.dateCreated = new Date();
};

exports.default = Entry;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Entry = require('./Entry');

var _Entry2 = _interopRequireDefault(_Entry);

var _utilities = require('./utilities');

var util = _interopRequireWildcard(_utilities);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageFactory = function StorageFactory(storageType) {
	var _this = this;

	_classCallCheck(this, StorageFactory);

	this.set = function (key, val) {
		if (typeof val === 'undefined') {
			util.invalidType();
			return false;
		}
		if (util.isValidValue(val)) {
			var entry = util.jstringify(new _Entry2.default(val));
			_this.Storage.setItem(key, entry);
		} else {
			return false;
		}
		return true;
	};

	this.get = function (key) {
		if (!util.isString(key)) {
			util.invalidType();
			return false;
		}
		var val = null;
		var item = _this.Storage.getItem(key);
		if (item !== null && util.isJsonString(item)) {
			item = JSON.parse(item);
			val = item.hasOwnProperty('val') ? item.val : item;
		} else if (util.isString(item)) {
			val = item;
		}
		return val;
	};

	this.getAll = function () {
		var keys = Object.keys(_this.Storage);
		return keys.length ? keys.map(function (key) {
			return _this.get(key);
		}) : [];
	};

	this.keys = function () {
		return Object.keys(_this.Storage);
	};

	this.remove = function (key) {
		if (!util.isString(key)) {
			util.invalidType();
			return false;
		}
		_this.Storage.removeItem(key);
		return true;
	};

	this.removeAll = function () {
		_this.Storage.clear();
		return true;
	};

	this.count = function () {
		return Object.keys(_this.Storage).length;
	};

	this.Storage = storageType === 'session' ? sessionStorage : localStorage;
};

exports.default = StorageFactory;

},{"./Entry":1,"./utilities":4}],3:[function(require,module,exports){
'use strict';

var _StorageFactory = require('./StorageFactory');

var _StorageFactory2 = _interopRequireDefault(_StorageFactory);

var _utilities = require('./utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ((0, _utilities.storageSupported)()) {
	var cabinet = new _StorageFactory2.default('local');
	cabinet.session = new _StorageFactory2.default('session');
	window.Cabinet = cabinet;
}

},{"./StorageFactory":2,"./utilities":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var storageSupported = exports.storageSupported = function storageSupported() {
	return typeof window['localStorage'].setItem !== 'function' ? false : true;
};
var getType = exports.getType = function getType(item) {
	return Object.prototype.toString.call(item);
};
var isString = exports.isString = function isString(str) {
	return typeof str === 'string';
};
var isFunction = exports.isFunction = function isFunction(fn) {
	return typeof fn === 'function';
};
var isArray = exports.isArray = function isArray(arr) {
	return getType(arr) === '[object Array]' ? true : false;
};
var isObject = exports.isObject = function isObject(obj) {
	return getType(obj) === '[object Object]' ? true : false;
};
var isDate = exports.isDate = function isDate(date) {
	return getType(date) === '[object Date]' ? true : false;
};
var isNumber = exports.isNumber = function isNumber(num) {
	return getType(num) === '[object Number]' ? true : false;
};
var isBool = exports.isBool = function isBool(bool) {
	return getType(bool) === '[object Boolean]' ? true : false;
};
var jstringify = exports.jstringify = function jstringify(item) {
	return JSON.stringify(item);
};
var jparse = exports.jparse = function jparse(item) {
	return JSON.parse(item);
};
var invalidType = exports.invalidType = function invalidType() {
	throw new Error('Provided key is an invalid type.');
};
var isJsonString = exports.isJsonString = function isJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};
var isValidValue = exports.isValidValue = function isValidValue(val) {
	if (isString(val) || isArray(val) || isObject(val) || isDate(val) || isNumber(val) || isBool(val)) {
		return true;
	} else {
		return false;
	}
};

},{}]},{},[3]);
