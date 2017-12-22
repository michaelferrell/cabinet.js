export const storageSupported = () => {
	return typeof window['localStorage'].setItem !== 'function' ? false : true
}
export const getType = item => {
	return Object.prototype.toString.call(item)
}
export const isString = str => {
	return typeof str === 'string'
}
export const isFunction = fn => {
	return typeof fn === 'function'
}
export const isArray = arr => {
	return getType(arr) === '[object Array]' ? true : false
}
export const isObject = obj => {
	return getType(obj) === '[object Object]' ? true : false
}
export const isDate = date => {
	return getType(date) === '[object Date]' ? true : false
}
export const isNumber = num => {
	return getType(num) === '[object Number]' ? true : false
}
export const isBool = bool => {
	return getType(bool) === '[object Boolean]' ? true : false
}
export const jstringify = item => {
	return JSON.stringify(item)
}
export const jparse = item => {
	return JSON.parse(item)
}
export const invalidType = () => {
	throw new Error('Provided key is an invalid type.')
}
export const isJsonString = str => {
	try {
		JSON.parse(str)
	} catch (e) {
		return false
	}
	return true
}
export const isValidValue = val => {
	if (
		isString(val) ||
		isArray(val) ||
		isObject(val) ||
		isDate(val) ||
		isNumber(val) ||
		isBool(val)
	) {
		return true
	} else {
		return false
	}
}
