!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.cabinet=t():e.cabinet=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.invalidTimeUnitError=t.storageError=t.invalidTypeError=t.hasExpired=t.createExpiration=t.msByTimeUnit=t.isValidExpiration=t.isValidTimeUnit=t.isValidKey=t.hasAttribute=t.isJsonString=t.isBool=t.isNumber=t.isDate=t.isObject=t.isArray=t.isFunction=t.isString=t.getType=t.storageSupported=void 0;var n=r(1),i=(t.storageSupported=function(){return window.localStorage&&a(window.localStorage.setItem)},t.getType=function(e){return{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}),o=t.isString=function(e){return"string"===i(e)},a=t.isFunction=function(e){return"function"===i(e)},u=(t.isArray=function(e){return"array"===i(e)},t.isObject=function(e){return"object"===i(e)}),s=t.isDate=function(e){return"date"===i(e)},c=t.isNumber=function(e){return"number"===i(e)},l=(t.isBool=function(e){return"boolean"===i(e)},t.isJsonString=function(e){try{JSON.parse(e)}catch(e){return!1}return!0},t.hasAttribute=function(e,t){return u(e)&&e.hasOwnProperty(t)}),f=(t.isValidKey=function(e){return o(e)&&e.length||c(e)},t.isValidTimeUnit=function(e){return o(e)&&n.TIME_UNITS.indexOf(e.toLowerCase())>-1}),d=(t.isValidExpiration=function(e){if(s(e))return!0;if(u(e)&&e.hasOwnProperty("value")&&e.hasOwnProperty("unit")){if(c(e.value)){if(f(e.unit))return!0;throw new Error("Expiration unit must be a string set to a valid time unit (ie. day, hour, minute, second).")}throw new Error("Expiration value must be a number.")}throw new Error("Expiration must be an object containing a value and a unit property, or a Date instance.")},t.msByTimeUnit=function(e){switch(e){case"day":return n.MS_PER_DAY;case"hour":return n.MS_PER_HOUR;case"minute":return n.MS_PER_MINUTE;case"second":return n.MS_PER_SECOND;default:p()}}),p=(t.createExpiration=function(e){if(s(e))return e;var t=d(e.unit.toLowerCase());return new Date(Date.now()+e.value*t)},t.hasExpired=function(e){return!!l(e,"expires")&&Date.parse(e.expires)<=Date.now()},t.invalidTypeError=function(){throw new Error("Provided key is an invalid type.")},t.storageError=function(e){throw new Error(e)},t.invalidTimeUnitError=function(){throw new Error("Provided time unit is an invalid type.")})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=(t.TIME_UNITS=["day","hour","minute","second"],t.MS_PER_SECOND=1e3),i=t.MS_PER_MINUTE=60*n,o=t.MS_PER_HOUR=60*i;t.MS_PER_DAY=24*o,t.SOURCE="CABINET_STORAGE"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4),i=function(e){return e&&e.__esModule?e:{default:e}}(n),o=r(0),a=void 0;(0,o.storageSupported)()?(a=new i.default("local"),a.session=new i.default("session")):console.error("cabinet.js: local storage not supported"),t.default=a},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=r(0),o=r(1),a=function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;n(this,e),this.val=t,this.type=(0,i.getType)(t),this.dateCreated=new Date,this.expires=r,this.source=o.SOURCE};t.default=a},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=r(3),o=function(e){return e&&e.__esModule?e:{default:e}}(i),a=r(0),u=function e(t){var r=this;n(this,e),this.set=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;(0,a.isValidKey)(e)&&void 0!==t||(0,a.invalidTypeError)();var i=(0,a.hasAttribute)(n,"expires")&&(0,a.isValidExpiration)(n.expires)?(0,a.createExpiration)(n.expires):null,u=JSON.stringify(new o.default(t,i));try{r.Storage.setItem(e,u)}catch(e){(0,a.storageError)(e)}return t},this.get=function(e,t){(0,a.isValidKey)(e)||(0,a.invalidTypeError)();var n=null,i=r.Storage.getItem(e);return null!==i&&(0,a.isJsonString)(i)?(i=JSON.parse(i),n=(0,a.hasAttribute)(i,"val")?i.val:i,(0,a.hasExpired)(i)&&(r.remove(e),n=null)):(0,a.isString)(i)?n=i:null===i&&void 0!==t&&(r.set(e,t),n=t),n},this.getAll=function(){var e=Object.keys(r.Storage);return e.length?e.map(function(e){return r.get(e)}):[]},this.keys=function(){return Object.keys(r.Storage)},this.remove=function(e){return(0,a.isValidKey)(e)||(0,a.invalidTypeError)(),null!==r.Storage.getItem(e)?(r.Storage.removeItem(e),!0):null},this.removeAll=function(){return r.Storage.clear(),!0},this.count=function(){return Object.keys(r.Storage).length},this.getMetadata=function(e){(0,a.isValidKey)(e)||(0,a.invalidTypeError)();var t=r.Storage.getItem(e);return null!==t&&(0,a.isJsonString)(t)&&(t=JSON.parse(t)),t},this.removeExpired=function(){return Object.keys(r.Storage).filter(function(e){if(!(0,a.isValidKey)(e))return!1;var t=r.getMetadata(e);return(0,a.hasExpired)(t)?r.remove(e):void 0})},this.Storage="session"===t?sessionStorage:localStorage};t.default=u},function(e,t,r){e.exports=r(2)}])});