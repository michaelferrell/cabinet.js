!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.cabinet=e():t.cabinet=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e,n){"use strict";var r=n(1),o=function(t){return t&&t.__esModule?t:{default:t}}(r);console.log("here goes nothing!"),console.log(o.default),window.Cabinet=o.default},function(t,e,n){!function(e,n){t.exports=n()}(0,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=4)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=(e.storageSupported=function(){return window.localStorage&&i(window.localStorage.setItem)},e.getType=function(t){return{}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}),o=e.isString=function(t){return"string"===r(t)},i=e.isFunction=function(t){return"function"===r(t)},u=e.isArray=function(t){return"array"===r(t)},a=e.isObject=function(t){return"object"===r(t)},s=e.isDate=function(t){return"date"===r(t)},c=e.isNumber=function(t){return"number"===r(t)},f=e.isBool=function(t){return"boolean"===r(t)},l=(e.jstringify=function(t){return JSON.stringify(t)},e.jparse=function(t){return JSON.parse(t)});e.invalidType=function(){throw new Error("Provided key is an invalid type.")},e.isJsonString=function(t){try{l(t)}catch(t){return!1}return!0},e.isValidValue=function(t){return o(t)||u(t)||a(t)||s(t)||c(t)||f(t)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),o=function(t){return t&&t.__esModule?t:{default:t}}(r),i=n(0),u=void 0;(0,i.storageSupported)()?(u=new o.default("local"),u.session=new o.default("session")):console.error("cabinet.js: local storage not supported"),e.default=u},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=function t(e){r(this,t),this.val=e,this.type=(0,o.getType)(e),this.dateCreated=new Date};e.default=i},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),i=function(t){return t&&t.__esModule?t:{default:t}}(o),u=n(0),a=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(u),s=function t(e){var n=this;r(this,t),this.set=function(t,e){if(void 0===e)return a.invalidType(),!1;if(!a.isValidValue(e))return!1;var r=a.jstringify(new i.default(e));return n.Storage.setItem(t,r),e},this.get=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!a.isString(t))return a.invalidType(),!1;var r=null,o=n.Storage.getItem(t);return null!==o&&a.isJsonString(o)?(o=JSON.parse(o),r=o.hasOwnProperty("val")?o.val:o):a.isString(o)?r=o:null===o&&a.isValidValue(e)&&(n.set(t,e),r=e),r},this.getAll=function(){var t=Object.keys(n.Storage);return t.length?t.map(function(t){return n.get(t)}):[]},this.keys=function(){return Object.keys(n.Storage)},this.remove=function(t){return a.isString(t)?(n.Storage.removeItem(t),!0):(a.invalidType(),!1)},this.removeAll=function(){return n.Storage.clear(),!0},this.count=function(){return Object.keys(n.Storage).length},this.Storage="session"===e?sessionStorage:localStorage};e.default=s},function(t,e,n){t.exports=n(1)}])})},function(t,e,n){t.exports=n(0)}])});