//! drill.js - v5.0.5 https://github.com/kirakiray/drill.js  (c) 2018-2023 YAO
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('less/lib/less')) :
	typeof define === 'function' && define.amd ? define(['less/lib/less'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lm = factory(global.createLess));
})(this, (function (createLess) { 'use strict';

	// import less from "less/lib/less/index.js";

	// import less from "./test/less.js";

	// console.log("less => ", less);

	// export default less;

	return createLess;

}));
