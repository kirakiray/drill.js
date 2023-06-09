//! drill.js - v5.0.5 https://github.com/kirakiray/drill.js  (c) 2018-2023 YAO
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.less = factory());
})(this, (function () { 'use strict';

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
					var args = [null];
					args.push.apply(args, arguments);
					var Ctor = Function.bind.apply(f, args);
					return new Ctor();
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var defaultOptions = {};

	Object.defineProperty(defaultOptions, "__esModule", { value: true });
	// Export a new default each time
	function default_1$1() {
	    return {
	        /* Inline Javascript - @plugin still allowed */
	        javascriptEnabled: false,
	        /* Outputs a makefile import dependency list to stdout. */
	        depends: false,
	        /* (DEPRECATED) Compress using less built-in compression.
	         * This does an okay job but does not utilise all the tricks of
	         * dedicated css compression. */
	        compress: false,
	        /* Runs the less parser and just reports errors without any output. */
	        lint: false,
	        /* Sets available include paths.
	         * If the file in an @import rule does not exist at that exact location,
	         * less will look for it at the location(s) passed to this option.
	         * You might use this for instance to specify a path to a library which
	         * you want to be referenced simply and relatively in the less files. */
	        paths: [],
	        /* color output in the terminal */
	        color: true,
	        /* The strictImports controls whether the compiler will allow an @import inside of either
	         * @media blocks or (a later addition) other selector blocks.
	         * See: https://github.com/less/less.js/issues/656 */
	        strictImports: false,
	        /* Allow Imports from Insecure HTTPS Hosts */
	        insecure: false,
	        /* Allows you to add a path to every generated import and url in your css.
	         * This does not affect less import statements that are processed, just ones
	         * that are left in the output css. */
	        rootpath: '',
	        /* By default URLs are kept as-is, so if you import a file in a sub-directory
	         * that references an image, exactly the same URL will be output in the css.
	         * This option allows you to re-write URL's in imported files so that the
	         * URL is always relative to the base imported file */
	        rewriteUrls: false,
	        /* How to process math
	         *   0 always           - eagerly try to solve all operations
	         *   1 parens-division  - require parens for division "/"
	         *   2 parens | strict  - require parens for all operations
	         *   3 strict-legacy    - legacy strict behavior (super-strict)
	         */
	        math: 1,
	        /* Without this option, less attempts to guess at the output unit when it does maths. */
	        strictUnits: false,
	        /* Effectively the declaration is put at the top of your base Less file,
	         * meaning it can be used but it also can be overridden if this variable
	         * is defined in the file. */
	        globalVars: null,
	        /* As opposed to the global variable option, this puts the declaration at the
	         * end of your base file, meaning it will override anything defined in your Less file. */
	        modifyVars: null,
	        /* This option allows you to specify a argument to go on to every URL.  */
	        urlArgs: ''
	    };
	}
	var _default$a = defaultOptions.default = default_1$1;

	var addDefaultOptions = {};

	/******************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	  extendStatics = Object.setPrototypeOf ||
	      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	  return extendStatics(d, b);
	};

	function __extends(d, b) {
	  if (typeof b !== "function" && b !== null)
	      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	  extendStatics(d, b);
	  function __() { this.constructor = d; }
	  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	var __assign = function() {
	  __assign = Object.assign || function __assign(t) {
	      for (var s, i = 1, n = arguments.length; i < n; i++) {
	          s = arguments[i];
	          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	      }
	      return t;
	  };
	  return __assign.apply(this, arguments);
	};

	function __rest(s, e) {
	  var t = {};
	  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	      t[p] = s[p];
	  if (s != null && typeof Object.getOwnPropertySymbols === "function")
	      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
	              t[p[i]] = s[p[i]];
	      }
	  return t;
	}

	function __decorate(decorators, target, key, desc) {
	  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	  return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	function __param(paramIndex, decorator) {
	  return function (target, key) { decorator(target, key, paramIndex); }
	}

	function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
	  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
	  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
	  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
	  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
	  var _, done = false;
	  for (var i = decorators.length - 1; i >= 0; i--) {
	      var context = {};
	      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
	      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
	      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
	      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
	      if (kind === "accessor") {
	          if (result === void 0) continue;
	          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
	          if (_ = accept(result.get)) descriptor.get = _;
	          if (_ = accept(result.set)) descriptor.set = _;
	          if (_ = accept(result.init)) initializers.unshift(_);
	      }
	      else if (_ = accept(result)) {
	          if (kind === "field") initializers.unshift(_);
	          else descriptor[key] = _;
	      }
	  }
	  if (target) Object.defineProperty(target, contextIn.name, descriptor);
	  done = true;
	}
	function __runInitializers(thisArg, initializers, value) {
	  var useValue = arguments.length > 2;
	  for (var i = 0; i < initializers.length; i++) {
	      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
	  }
	  return useValue ? value : void 0;
	}
	function __propKey(x) {
	  return typeof x === "symbol" ? x : "".concat(x);
	}
	function __setFunctionName(f, name, prefix) {
	  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
	  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
	}
	function __metadata(metadataKey, metadataValue) {
	  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	}

	function __awaiter(thisArg, _arguments, P, generator) {
	  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	  return new (P || (P = Promise))(function (resolve, reject) {
	      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	      step((generator = generator.apply(thisArg, _arguments || [])).next());
	  });
	}

	function __generator(thisArg, body) {
	  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	  function verb(n) { return function (v) { return step([n, v]); }; }
	  function step(op) {
	      if (f) throw new TypeError("Generator is already executing.");
	      while (g && (g = 0, op[0] && (_ = 0)), _) try {
	          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	          if (y = 0, t) op = [op[0] & 2, t.value];
	          switch (op[0]) {
	              case 0: case 1: t = op; break;
	              case 4: _.label++; return { value: op[1], done: false };
	              case 5: _.label++; y = op[1]; op = [0]; continue;
	              case 7: op = _.ops.pop(); _.trys.pop(); continue;
	              default:
	                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                  if (t[2]) _.ops.pop();
	                  _.trys.pop(); continue;
	          }
	          op = body.call(thisArg, _);
	      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	  }
	}

	var __createBinding = Object.create ? (function(o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  var desc = Object.getOwnPropertyDescriptor(m, k);
	  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	  }
	  Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  o[k2] = m[k];
	});

	function __exportStar(m, o) {
	  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
	}

	function __values(o) {
	  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	  if (m) return m.call(o);
	  if (o && typeof o.length === "number") return {
	      next: function () {
	          if (o && i >= o.length) o = void 0;
	          return { value: o && o[i++], done: !o };
	      }
	  };
	  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	}

	function __read(o, n) {
	  var m = typeof Symbol === "function" && o[Symbol.iterator];
	  if (!m) return o;
	  var i = m.call(o), r, ar = [], e;
	  try {
	      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	  }
	  catch (error) { e = { error: error }; }
	  finally {
	      try {
	          if (r && !r.done && (m = i["return"])) m.call(i);
	      }
	      finally { if (e) throw e.error; }
	  }
	  return ar;
	}

	/** @deprecated */
	function __spread() {
	  for (var ar = [], i = 0; i < arguments.length; i++)
	      ar = ar.concat(__read(arguments[i]));
	  return ar;
	}

	/** @deprecated */
	function __spreadArrays() {
	  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	  for (var r = Array(s), k = 0, i = 0; i < il; i++)
	      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
	          r[k] = a[j];
	  return r;
	}

	function __spreadArray(to, from, pack) {
	  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	      if (ar || !(i in from)) {
	          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	          ar[i] = from[i];
	      }
	  }
	  return to.concat(ar || Array.prototype.slice.call(from));
	}

	function __await(v) {
	  return this instanceof __await ? (this.v = v, this) : new __await(v);
	}

	function __asyncGenerator(thisArg, _arguments, generator) {
	  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	  var g = generator.apply(thisArg, _arguments || []), i, q = [];
	  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
	  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
	  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
	  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
	  function fulfill(value) { resume("next", value); }
	  function reject(value) { resume("throw", value); }
	  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
	}

	function __asyncDelegator(o) {
	  var i, p;
	  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
	  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
	}

	function __asyncValues(o) {
	  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	  var m = o[Symbol.asyncIterator], i;
	  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
	  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
	  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
	}

	function __makeTemplateObject(cooked, raw) {
	  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
	  return cooked;
	}
	var __setModuleDefault = Object.create ? (function(o, v) {
	  Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	  o["default"] = v;
	};

	function __importStar(mod) {
	  if (mod && mod.__esModule) return mod;
	  var result = {};
	  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	  __setModuleDefault(result, mod);
	  return result;
	}

	function __importDefault(mod) {
	  return (mod && mod.__esModule) ? mod : { default: mod };
	}

	function __classPrivateFieldGet(receiver, state, kind, f) {
	  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	}

	function __classPrivateFieldSet(receiver, state, value, kind, f) {
	  if (kind === "m") throw new TypeError("Private method is not writable");
	  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
	}

	function __classPrivateFieldIn(state, receiver) {
	  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
	  return typeof state === "function" ? receiver === state : state.has(receiver);
	}

	var tslib_es6 = {
	  __extends,
	  __assign,
	  __rest,
	  __decorate,
	  __param,
	  __metadata,
	  __awaiter,
	  __generator,
	  __createBinding,
	  __exportStar,
	  __values,
	  __read,
	  __spread,
	  __spreadArrays,
	  __spreadArray,
	  __await,
	  __asyncGenerator,
	  __asyncDelegator,
	  __asyncValues,
	  __makeTemplateObject,
	  __importStar,
	  __importDefault,
	  __classPrivateFieldGet,
	  __classPrivateFieldSet,
	  __classPrivateFieldIn,
	};

	var tslib_es6$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		get __assign () { return __assign; },
		__asyncDelegator: __asyncDelegator,
		__asyncGenerator: __asyncGenerator,
		__asyncValues: __asyncValues,
		__await: __await,
		__awaiter: __awaiter,
		__classPrivateFieldGet: __classPrivateFieldGet,
		__classPrivateFieldIn: __classPrivateFieldIn,
		__classPrivateFieldSet: __classPrivateFieldSet,
		__createBinding: __createBinding,
		__decorate: __decorate,
		__esDecorate: __esDecorate,
		__exportStar: __exportStar,
		__extends: __extends,
		__generator: __generator,
		__importDefault: __importDefault,
		__importStar: __importStar,
		__makeTemplateObject: __makeTemplateObject,
		__metadata: __metadata,
		__param: __param,
		__propKey: __propKey,
		__read: __read,
		__rest: __rest,
		__runInitializers: __runInitializers,
		__setFunctionName: __setFunctionName,
		__spread: __spread,
		__spreadArray: __spreadArray,
		__spreadArrays: __spreadArrays,
		__values: __values,
		default: tslib_es6
	});

	var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(tslib_es6$1);

	var utils$4 = {};

	Object.defineProperty(utils$4, "__esModule", { value: true });
	var addDataAttr_1 = utils$4.addDataAttr = utils$4.extractId = void 0;
	function extractId(href) {
	    return href.replace(/^[a-z-]+:\/+?[^\/]+/, '') // Remove protocol & domain
	        .replace(/[\?\&]livereload=\w+/, '') // Remove LiveReload cachebuster
	        .replace(/^\//, '') // Remove root /
	        .replace(/\.[a-zA-Z]+$/, '') // Remove simple extension
	        .replace(/[^\.\w-]+/g, '-') // Replace illegal characters
	        .replace(/\./g, ':'); // Replace dots with colons(for valid id)
	}
	utils$4.extractId = extractId;
	function addDataAttr(options, tag) {
	    if (!tag) {
	        return;
	    } // in case of tag is null or undefined
	    for (var opt in tag.dataset) {
	        if (tag.dataset.hasOwnProperty(opt)) {
	            if (opt === 'env' || opt === 'dumpLineNumbers' || opt === 'rootpath' || opt === 'errorReporting') {
	                options[opt] = tag.dataset[opt];
	            }
	            else {
	                try {
	                    options[opt] = JSON.parse(tag.dataset[opt]);
	                }
	                catch (_) { }
	            }
	        }
	    }
	}
	addDataAttr_1 = utils$4.addDataAttr = addDataAttr;

	var browser$1 = {};

	Object.defineProperty(browser$1, "__esModule", { value: true });
	var tslib_1$6 = require$$0$1;
	var utils$3 = tslib_1$6.__importStar(utils$4);
	var _default$9 = browser$1.default = {
	    createCSS: function (document, styles, sheet) {
	        // Strip the query-string
	        var href = sheet.href || '';
	        // If there is no title set, use the filename, minus the extension
	        var id = "less:" + (sheet.title || utils$3.extractId(href));
	        // If this has already been inserted into the DOM, we may need to replace it
	        var oldStyleNode = document.getElementById(id);
	        var keepOldStyleNode = false;
	        // Create a new stylesheet node for insertion or (if necessary) replacement
	        var styleNode = document.createElement('style');
	        styleNode.setAttribute('type', 'text/css');
	        if (sheet.media) {
	            styleNode.setAttribute('media', sheet.media);
	        }
	        styleNode.id = id;
	        if (!styleNode.styleSheet) {
	            styleNode.appendChild(document.createTextNode(styles));
	            // If new contents match contents of oldStyleNode, don't replace oldStyleNode
	            keepOldStyleNode = (oldStyleNode !== null && oldStyleNode.childNodes.length > 0 && styleNode.childNodes.length > 0 &&
	                oldStyleNode.firstChild.nodeValue === styleNode.firstChild.nodeValue);
	        }
	        var head = document.getElementsByTagName('head')[0];
	        // If there is no oldStyleNode, just append; otherwise, only append if we need
	        // to replace oldStyleNode with an updated stylesheet
	        if (oldStyleNode === null || keepOldStyleNode === false) {
	            var nextEl = sheet && sheet.nextSibling || null;
	            if (nextEl) {
	                nextEl.parentNode.insertBefore(styleNode, nextEl);
	            }
	            else {
	                head.appendChild(styleNode);
	            }
	        }
	        if (oldStyleNode && keepOldStyleNode === false) {
	            oldStyleNode.parentNode.removeChild(oldStyleNode);
	        }
	        // For IE.
	        // This needs to happen *after* the style element is added to the DOM, otherwise IE 7 and 8 may crash.
	        // See http://social.msdn.microsoft.com/Forums/en-US/7e081b65-878a-4c22-8e68-c10d39c2ed32/internet-explorer-crashes-appending-style-element-to-head
	        if (styleNode.styleSheet) {
	            try {
	                styleNode.styleSheet.cssText = styles;
	            }
	            catch (e) {
	                throw new Error('Couldn\'t reassign styleSheet.cssText.');
	            }
	        }
	    },
	    currentScript: function (window) {
	        var document = window.document;
	        return document.currentScript || (function () {
	            var scripts = document.getElementsByTagName('script');
	            return scripts[scripts.length - 1];
	        })();
	    }
	};

	Object.defineProperty(addDefaultOptions, "__esModule", { value: true });
	var tslib_1$5 = require$$0$1;
	var utils_1 = utils$4;
	var browser_1$1 = tslib_1$5.__importDefault(browser$1);
	var _default$8 = addDefaultOptions.default = (function (window, options) {
	    // use options from the current script tag data attribues
	    utils_1.addDataAttr(options, browser_1$1.default.currentScript(window));
	    if (options.isFileProtocol === undefined) {
	        options.isFileProtocol = /^(file|(chrome|safari)(-extension)?|resource|qrc|app):/.test(window.location.protocol);
	    }
	    // Load styles asynchronously (default: false)
	    //
	    // This is set to `false` by default, so that the body
	    // doesn't start loading before the stylesheets are parsed.
	    // Setting this to `true` can result in flickering.
	    //
	    options.async = options.async || false;
	    options.fileAsync = options.fileAsync || false;
	    // Interval between watch polls
	    options.poll = options.poll || (options.isFileProtocol ? 1000 : 1500);
	    options.env = options.env || (window.location.hostname == '127.0.0.1' ||
	        window.location.hostname == '0.0.0.0' ||
	        window.location.hostname == 'localhost' ||
	        (window.location.port &&
	            window.location.port.length > 0) ||
	        options.isFileProtocol ? 'development'
	        : 'production');
	    var dumpLineNumbers = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(window.location.hash);
	    if (dumpLineNumbers) {
	        options.dumpLineNumbers = dumpLineNumbers[1];
	    }
	    if (options.useFileCache === undefined) {
	        options.useFileCache = true;
	    }
	    if (options.onReady === undefined) {
	        options.onReady = true;
	    }
	    if (options.relativeUrls) {
	        options.rewriteUrls = 'all';
	    }
	});

	var less$1 = {};

	var environment = {};

	var logger$1 = {};

	var hasRequiredLogger;

	function requireLogger () {
		if (hasRequiredLogger) return logger$1;
		hasRequiredLogger = 1;
		Object.defineProperty(logger$1, "__esModule", { value: true });
		logger$1.default = {
		    error: function (msg) {
		        this._fireEvent('error', msg);
		    },
		    warn: function (msg) {
		        this._fireEvent('warn', msg);
		    },
		    info: function (msg) {
		        this._fireEvent('info', msg);
		    },
		    debug: function (msg) {
		        this._fireEvent('debug', msg);
		    },
		    addListener: function (listener) {
		        this._listeners.push(listener);
		    },
		    removeListener: function (listener) {
		        for (var i = 0; i < this._listeners.length; i++) {
		            if (this._listeners[i] === listener) {
		                this._listeners.splice(i, 1);
		                return;
		            }
		        }
		    },
		    _fireEvent: function (type, msg) {
		        for (var i = 0; i < this._listeners.length; i++) {
		            var logFunction = this._listeners[i][type];
		            if (logFunction) {
		                logFunction(msg);
		            }
		        }
		    },
		    _listeners: []
		};
		
		return logger$1;
	}

	var hasRequiredEnvironment;

	function requireEnvironment () {
		if (hasRequiredEnvironment) return environment;
		hasRequiredEnvironment = 1;
		/**
		 * @todo Document why this abstraction exists, and the relationship between
		 *       environment, file managers, and plugin manager
		 */
		Object.defineProperty(environment, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var logger_1 = tslib_1.__importDefault(requireLogger());
		var Environment = /** @class */ (function () {
		    function Environment(externalEnvironment, fileManagers) {
		        this.fileManagers = fileManagers || [];
		        externalEnvironment = externalEnvironment || {};
		        var optionalFunctions = ['encodeBase64', 'mimeLookup', 'charsetLookup', 'getSourceMapGenerator'];
		        var requiredFunctions = [];
		        var functions = requiredFunctions.concat(optionalFunctions);
		        for (var i = 0; i < functions.length; i++) {
		            var propName = functions[i];
		            var environmentFunc = externalEnvironment[propName];
		            if (environmentFunc) {
		                this[propName] = environmentFunc.bind(externalEnvironment);
		            }
		            else if (i < requiredFunctions.length) {
		                this.warn("missing required function in environment - " + propName);
		            }
		        }
		    }
		    Environment.prototype.getFileManager = function (filename, currentDirectory, options, environment, isSync) {
		        if (!filename) {
		            logger_1.default.warn('getFileManager called with no filename.. Please report this issue. continuing.');
		        }
		        if (currentDirectory == null) {
		            logger_1.default.warn('getFileManager called with null directory.. Please report this issue. continuing.');
		        }
		        var fileManagers = this.fileManagers;
		        if (options.pluginManager) {
		            fileManagers = [].concat(fileManagers).concat(options.pluginManager.getFileManagers());
		        }
		        for (var i = fileManagers.length - 1; i >= 0; i--) {
		            var fileManager = fileManagers[i];
		            if (fileManager[isSync ? 'supportsSync' : 'supports'](filename, currentDirectory, options, environment)) {
		                return fileManager;
		            }
		        }
		        return null;
		    };
		    Environment.prototype.addFileManager = function (fileManager) {
		        this.fileManagers.push(fileManager);
		    };
		    Environment.prototype.clearFileManagers = function () {
		        this.fileManagers = [];
		    };
		    return Environment;
		}());
		environment.default = Environment;
		
		return environment;
	}

	var data = {};

	var colors = {};

	var hasRequiredColors;

	function requireColors () {
		if (hasRequiredColors) return colors;
		hasRequiredColors = 1;
		Object.defineProperty(colors, "__esModule", { value: true });
		colors.default = {
		    'aliceblue': '#f0f8ff',
		    'antiquewhite': '#faebd7',
		    'aqua': '#00ffff',
		    'aquamarine': '#7fffd4',
		    'azure': '#f0ffff',
		    'beige': '#f5f5dc',
		    'bisque': '#ffe4c4',
		    'black': '#000000',
		    'blanchedalmond': '#ffebcd',
		    'blue': '#0000ff',
		    'blueviolet': '#8a2be2',
		    'brown': '#a52a2a',
		    'burlywood': '#deb887',
		    'cadetblue': '#5f9ea0',
		    'chartreuse': '#7fff00',
		    'chocolate': '#d2691e',
		    'coral': '#ff7f50',
		    'cornflowerblue': '#6495ed',
		    'cornsilk': '#fff8dc',
		    'crimson': '#dc143c',
		    'cyan': '#00ffff',
		    'darkblue': '#00008b',
		    'darkcyan': '#008b8b',
		    'darkgoldenrod': '#b8860b',
		    'darkgray': '#a9a9a9',
		    'darkgrey': '#a9a9a9',
		    'darkgreen': '#006400',
		    'darkkhaki': '#bdb76b',
		    'darkmagenta': '#8b008b',
		    'darkolivegreen': '#556b2f',
		    'darkorange': '#ff8c00',
		    'darkorchid': '#9932cc',
		    'darkred': '#8b0000',
		    'darksalmon': '#e9967a',
		    'darkseagreen': '#8fbc8f',
		    'darkslateblue': '#483d8b',
		    'darkslategray': '#2f4f4f',
		    'darkslategrey': '#2f4f4f',
		    'darkturquoise': '#00ced1',
		    'darkviolet': '#9400d3',
		    'deeppink': '#ff1493',
		    'deepskyblue': '#00bfff',
		    'dimgray': '#696969',
		    'dimgrey': '#696969',
		    'dodgerblue': '#1e90ff',
		    'firebrick': '#b22222',
		    'floralwhite': '#fffaf0',
		    'forestgreen': '#228b22',
		    'fuchsia': '#ff00ff',
		    'gainsboro': '#dcdcdc',
		    'ghostwhite': '#f8f8ff',
		    'gold': '#ffd700',
		    'goldenrod': '#daa520',
		    'gray': '#808080',
		    'grey': '#808080',
		    'green': '#008000',
		    'greenyellow': '#adff2f',
		    'honeydew': '#f0fff0',
		    'hotpink': '#ff69b4',
		    'indianred': '#cd5c5c',
		    'indigo': '#4b0082',
		    'ivory': '#fffff0',
		    'khaki': '#f0e68c',
		    'lavender': '#e6e6fa',
		    'lavenderblush': '#fff0f5',
		    'lawngreen': '#7cfc00',
		    'lemonchiffon': '#fffacd',
		    'lightblue': '#add8e6',
		    'lightcoral': '#f08080',
		    'lightcyan': '#e0ffff',
		    'lightgoldenrodyellow': '#fafad2',
		    'lightgray': '#d3d3d3',
		    'lightgrey': '#d3d3d3',
		    'lightgreen': '#90ee90',
		    'lightpink': '#ffb6c1',
		    'lightsalmon': '#ffa07a',
		    'lightseagreen': '#20b2aa',
		    'lightskyblue': '#87cefa',
		    'lightslategray': '#778899',
		    'lightslategrey': '#778899',
		    'lightsteelblue': '#b0c4de',
		    'lightyellow': '#ffffe0',
		    'lime': '#00ff00',
		    'limegreen': '#32cd32',
		    'linen': '#faf0e6',
		    'magenta': '#ff00ff',
		    'maroon': '#800000',
		    'mediumaquamarine': '#66cdaa',
		    'mediumblue': '#0000cd',
		    'mediumorchid': '#ba55d3',
		    'mediumpurple': '#9370d8',
		    'mediumseagreen': '#3cb371',
		    'mediumslateblue': '#7b68ee',
		    'mediumspringgreen': '#00fa9a',
		    'mediumturquoise': '#48d1cc',
		    'mediumvioletred': '#c71585',
		    'midnightblue': '#191970',
		    'mintcream': '#f5fffa',
		    'mistyrose': '#ffe4e1',
		    'moccasin': '#ffe4b5',
		    'navajowhite': '#ffdead',
		    'navy': '#000080',
		    'oldlace': '#fdf5e6',
		    'olive': '#808000',
		    'olivedrab': '#6b8e23',
		    'orange': '#ffa500',
		    'orangered': '#ff4500',
		    'orchid': '#da70d6',
		    'palegoldenrod': '#eee8aa',
		    'palegreen': '#98fb98',
		    'paleturquoise': '#afeeee',
		    'palevioletred': '#d87093',
		    'papayawhip': '#ffefd5',
		    'peachpuff': '#ffdab9',
		    'peru': '#cd853f',
		    'pink': '#ffc0cb',
		    'plum': '#dda0dd',
		    'powderblue': '#b0e0e6',
		    'purple': '#800080',
		    'rebeccapurple': '#663399',
		    'red': '#ff0000',
		    'rosybrown': '#bc8f8f',
		    'royalblue': '#4169e1',
		    'saddlebrown': '#8b4513',
		    'salmon': '#fa8072',
		    'sandybrown': '#f4a460',
		    'seagreen': '#2e8b57',
		    'seashell': '#fff5ee',
		    'sienna': '#a0522d',
		    'silver': '#c0c0c0',
		    'skyblue': '#87ceeb',
		    'slateblue': '#6a5acd',
		    'slategray': '#708090',
		    'slategrey': '#708090',
		    'snow': '#fffafa',
		    'springgreen': '#00ff7f',
		    'steelblue': '#4682b4',
		    'tan': '#d2b48c',
		    'teal': '#008080',
		    'thistle': '#d8bfd8',
		    'tomato': '#ff6347',
		    'turquoise': '#40e0d0',
		    'violet': '#ee82ee',
		    'wheat': '#f5deb3',
		    'white': '#ffffff',
		    'whitesmoke': '#f5f5f5',
		    'yellow': '#ffff00',
		    'yellowgreen': '#9acd32'
		};
		
		return colors;
	}

	var unitConversions = {};

	var hasRequiredUnitConversions;

	function requireUnitConversions () {
		if (hasRequiredUnitConversions) return unitConversions;
		hasRequiredUnitConversions = 1;
		Object.defineProperty(unitConversions, "__esModule", { value: true });
		unitConversions.default = {
		    length: {
		        'm': 1,
		        'cm': 0.01,
		        'mm': 0.001,
		        'in': 0.0254,
		        'px': 0.0254 / 96,
		        'pt': 0.0254 / 72,
		        'pc': 0.0254 / 72 * 12
		    },
		    duration: {
		        's': 1,
		        'ms': 0.001
		    },
		    angle: {
		        'rad': 1 / (2 * Math.PI),
		        'deg': 1 / 360,
		        'grad': 1 / 400,
		        'turn': 1
		    }
		};
		
		return unitConversions;
	}

	var hasRequiredData;

	function requireData () {
		if (hasRequiredData) return data;
		hasRequiredData = 1;
		Object.defineProperty(data, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var colors_1 = tslib_1.__importDefault(requireColors());
		var unit_conversions_1 = tslib_1.__importDefault(requireUnitConversions());
		data.default = { colors: colors_1.default, unitConversions: unit_conversions_1.default };
		
		return data;
	}

	var tree = {};

	var node = {};

	var hasRequiredNode;

	function requireNode () {
		if (hasRequiredNode) return node;
		hasRequiredNode = 1;
		Object.defineProperty(node, "__esModule", { value: true });
		/**
		 * The reason why Node is a class and other nodes simply do not extend
		 * from Node (since we're transpiling) is due to this issue:
		 *
		 * https://github.com/less/less.js/issues/3434
		 */
		var Node = /** @class */ (function () {
		    function Node() {
		        this.parent = null;
		        this.visibilityBlocks = undefined;
		        this.nodeVisible = undefined;
		        this.rootNode = null;
		        this.parsed = null;
		    }
		    Object.defineProperty(Node.prototype, "currentFileInfo", {
		        get: function () {
		            return this.fileInfo();
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Object.defineProperty(Node.prototype, "index", {
		        get: function () {
		            return this.getIndex();
		        },
		        enumerable: false,
		        configurable: true
		    });
		    Node.prototype.setParent = function (nodes, parent) {
		        function set(node) {
		            if (node && node instanceof Node) {
		                node.parent = parent;
		            }
		        }
		        if (Array.isArray(nodes)) {
		            nodes.forEach(set);
		        }
		        else {
		            set(nodes);
		        }
		    };
		    Node.prototype.getIndex = function () {
		        return this._index || (this.parent && this.parent.getIndex()) || 0;
		    };
		    Node.prototype.fileInfo = function () {
		        return this._fileInfo || (this.parent && this.parent.fileInfo()) || {};
		    };
		    Node.prototype.isRulesetLike = function () { return false; };
		    Node.prototype.toCSS = function (context) {
		        var strs = [];
		        this.genCSS(context, {
		            add: function (chunk, fileInfo, index) {
		                strs.push(chunk);
		            },
		            isEmpty: function () {
		                return strs.length === 0;
		            }
		        });
		        return strs.join('');
		    };
		    Node.prototype.genCSS = function (context, output) {
		        output.add(this.value);
		    };
		    Node.prototype.accept = function (visitor) {
		        this.value = visitor.visit(this.value);
		    };
		    Node.prototype.eval = function () { return this; };
		    Node.prototype._operate = function (context, op, a, b) {
		        switch (op) {
		            case '+': return a + b;
		            case '-': return a - b;
		            case '*': return a * b;
		            case '/': return a / b;
		        }
		    };
		    Node.prototype.fround = function (context, value) {
		        var precision = context && context.numPrecision;
		        // add "epsilon" to ensure numbers like 1.000000005 (represented as 1.000000004999...) are properly rounded:
		        return (precision) ? Number((value + 2e-16).toFixed(precision)) : value;
		    };
		    Node.compare = function (a, b) {
		        /* returns:
		         -1: a < b
		         0: a = b
		         1: a > b
		         and *any* other value for a != b (e.g. undefined, NaN, -2 etc.) */
		        if ((a.compare) &&
		            // for "symmetric results" force toCSS-based comparison
		            // of Quoted or Anonymous if either value is one of those
		            !(b.type === 'Quoted' || b.type === 'Anonymous')) {
		            return a.compare(b);
		        }
		        else if (b.compare) {
		            return -b.compare(a);
		        }
		        else if (a.type !== b.type) {
		            return undefined;
		        }
		        a = a.value;
		        b = b.value;
		        if (!Array.isArray(a)) {
		            return a === b ? 0 : undefined;
		        }
		        if (a.length !== b.length) {
		            return undefined;
		        }
		        for (var i = 0; i < a.length; i++) {
		            if (Node.compare(a[i], b[i]) !== 0) {
		                return undefined;
		            }
		        }
		        return 0;
		    };
		    Node.numericCompare = function (a, b) {
		        return a < b ? -1
		            : a === b ? 0
		                : a > b ? 1 : undefined;
		    };
		    // Returns true if this node represents root of ast imported by reference
		    Node.prototype.blocksVisibility = function () {
		        if (this.visibilityBlocks == null) {
		            this.visibilityBlocks = 0;
		        }
		        return this.visibilityBlocks !== 0;
		    };
		    Node.prototype.addVisibilityBlock = function () {
		        if (this.visibilityBlocks == null) {
		            this.visibilityBlocks = 0;
		        }
		        this.visibilityBlocks = this.visibilityBlocks + 1;
		    };
		    Node.prototype.removeVisibilityBlock = function () {
		        if (this.visibilityBlocks == null) {
		            this.visibilityBlocks = 0;
		        }
		        this.visibilityBlocks = this.visibilityBlocks - 1;
		    };
		    // Turns on node visibility - if called node will be shown in output regardless
		    // of whether it comes from import by reference or not
		    Node.prototype.ensureVisibility = function () {
		        this.nodeVisible = true;
		    };
		    // Turns off node visibility - if called node will NOT be shown in output regardless
		    // of whether it comes from import by reference or not
		    Node.prototype.ensureInvisibility = function () {
		        this.nodeVisible = false;
		    };
		    // return values:
		    // false - the node must not be visible
		    // true - the node must be visible
		    // undefined or null - the node has the same visibility as its parent
		    Node.prototype.isVisible = function () {
		        return this.nodeVisible;
		    };
		    Node.prototype.visibilityInfo = function () {
		        return {
		            visibilityBlocks: this.visibilityBlocks,
		            nodeVisible: this.nodeVisible
		        };
		    };
		    Node.prototype.copyVisibilityInfo = function (info) {
		        if (!info) {
		            return;
		        }
		        this.visibilityBlocks = info.visibilityBlocks;
		        this.nodeVisible = info.nodeVisible;
		    };
		    return Node;
		}());
		node.default = Node;
		
		return node;
	}

	var color$1 = {};

	var hasRequiredColor$1;

	function requireColor$1 () {
		if (hasRequiredColor$1) return color$1;
		hasRequiredColor$1 = 1;
		Object.defineProperty(color$1, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var colors_1 = tslib_1.__importDefault(requireColors());
		//
		// RGB Colors - #ff0014, #eee
		//
		var Color = function (rgb, a, originalForm) {
		    var self = this;
		    //
		    // The end goal here, is to parse the arguments
		    // into an integer triplet, such as `128, 255, 0`
		    //
		    // This facilitates operations and conversions.
		    //
		    if (Array.isArray(rgb)) {
		        this.rgb = rgb;
		    }
		    else if (rgb.length >= 6) {
		        this.rgb = [];
		        rgb.match(/.{2}/g).map(function (c, i) {
		            if (i < 3) {
		                self.rgb.push(parseInt(c, 16));
		            }
		            else {
		                self.alpha = (parseInt(c, 16)) / 255;
		            }
		        });
		    }
		    else {
		        this.rgb = [];
		        rgb.split('').map(function (c, i) {
		            if (i < 3) {
		                self.rgb.push(parseInt(c + c, 16));
		            }
		            else {
		                self.alpha = (parseInt(c + c, 16)) / 255;
		            }
		        });
		    }
		    this.alpha = this.alpha || (typeof a === 'number' ? a : 1);
		    if (typeof originalForm !== 'undefined') {
		        this.value = originalForm;
		    }
		};
		Color.prototype = Object.assign(new node_1.default(), {
		    type: 'Color',
		    luma: function () {
		        var r = this.rgb[0] / 255, g = this.rgb[1] / 255, b = this.rgb[2] / 255;
		        r = (r <= 0.03928) ? r / 12.92 : Math.pow(((r + 0.055) / 1.055), 2.4);
		        g = (g <= 0.03928) ? g / 12.92 : Math.pow(((g + 0.055) / 1.055), 2.4);
		        b = (b <= 0.03928) ? b / 12.92 : Math.pow(((b + 0.055) / 1.055), 2.4);
		        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
		    },
		    genCSS: function (context, output) {
		        output.add(this.toCSS(context));
		    },
		    toCSS: function (context, doNotCompress) {
		        var compress = context && context.compress && !doNotCompress;
		        var color;
		        var alpha;
		        var colorFunction;
		        var args = [];
		        // `value` is set if this color was originally
		        // converted from a named color string so we need
		        // to respect this and try to output named color too.
		        alpha = this.fround(context, this.alpha);
		        if (this.value) {
		            if (this.value.indexOf('rgb') === 0) {
		                if (alpha < 1) {
		                    colorFunction = 'rgba';
		                }
		            }
		            else if (this.value.indexOf('hsl') === 0) {
		                if (alpha < 1) {
		                    colorFunction = 'hsla';
		                }
		                else {
		                    colorFunction = 'hsl';
		                }
		            }
		            else {
		                return this.value;
		            }
		        }
		        else {
		            if (alpha < 1) {
		                colorFunction = 'rgba';
		            }
		        }
		        switch (colorFunction) {
		            case 'rgba':
		                args = this.rgb.map(function (c) {
		                    return clamp(Math.round(c), 255);
		                }).concat(clamp(alpha, 1));
		                break;
		            case 'hsla':
		                args.push(clamp(alpha, 1));
		            case 'hsl':
		                color = this.toHSL();
		                args = [
		                    this.fround(context, color.h),
		                    this.fround(context, color.s * 100) + "%",
		                    this.fround(context, color.l * 100) + "%"
		                ].concat(args);
		        }
		        if (colorFunction) {
		            // Values are capped between `0` and `255`, rounded and zero-padded.
		            return colorFunction + "(" + args.join("," + (compress ? '' : ' ')) + ")";
		        }
		        color = this.toRGB();
		        if (compress) {
		            var splitcolor = color.split('');
		            // Convert color to short format
		            if (splitcolor[1] === splitcolor[2] && splitcolor[3] === splitcolor[4] && splitcolor[5] === splitcolor[6]) {
		                color = "#" + splitcolor[1] + splitcolor[3] + splitcolor[5];
		            }
		        }
		        return color;
		    },
		    //
		    // Operations have to be done per-channel, if not,
		    // channels will spill onto each other. Once we have
		    // our result, in the form of an integer triplet,
		    // we create a new Color node to hold the result.
		    //
		    operate: function (context, op, other) {
		        var rgb = new Array(3);
		        var alpha = this.alpha * (1 - other.alpha) + other.alpha;
		        for (var c = 0; c < 3; c++) {
		            rgb[c] = this._operate(context, op, this.rgb[c], other.rgb[c]);
		        }
		        return new Color(rgb, alpha);
		    },
		    toRGB: function () {
		        return toHex(this.rgb);
		    },
		    toHSL: function () {
		        var r = this.rgb[0] / 255, g = this.rgb[1] / 255, b = this.rgb[2] / 255, a = this.alpha;
		        var max = Math.max(r, g, b), min = Math.min(r, g, b);
		        var h;
		        var s;
		        var l = (max + min) / 2;
		        var d = max - min;
		        if (max === min) {
		            h = s = 0;
		        }
		        else {
		            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		            switch (max) {
		                case r:
		                    h = (g - b) / d + (g < b ? 6 : 0);
		                    break;
		                case g:
		                    h = (b - r) / d + 2;
		                    break;
		                case b:
		                    h = (r - g) / d + 4;
		                    break;
		            }
		            h /= 6;
		        }
		        return { h: h * 360, s: s, l: l, a: a };
		    },
		    // Adapted from http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
		    toHSV: function () {
		        var r = this.rgb[0] / 255, g = this.rgb[1] / 255, b = this.rgb[2] / 255, a = this.alpha;
		        var max = Math.max(r, g, b), min = Math.min(r, g, b);
		        var h;
		        var s;
		        var v = max;
		        var d = max - min;
		        if (max === 0) {
		            s = 0;
		        }
		        else {
		            s = d / max;
		        }
		        if (max === min) {
		            h = 0;
		        }
		        else {
		            switch (max) {
		                case r:
		                    h = (g - b) / d + (g < b ? 6 : 0);
		                    break;
		                case g:
		                    h = (b - r) / d + 2;
		                    break;
		                case b:
		                    h = (r - g) / d + 4;
		                    break;
		            }
		            h /= 6;
		        }
		        return { h: h * 360, s: s, v: v, a: a };
		    },
		    toARGB: function () {
		        return toHex([this.alpha * 255].concat(this.rgb));
		    },
		    compare: function (x) {
		        return (x.rgb &&
		            x.rgb[0] === this.rgb[0] &&
		            x.rgb[1] === this.rgb[1] &&
		            x.rgb[2] === this.rgb[2] &&
		            x.alpha === this.alpha) ? 0 : undefined;
		    }
		});
		Color.fromKeyword = function (keyword) {
		    var c;
		    var key = keyword.toLowerCase();
		    if (colors_1.default.hasOwnProperty(key)) {
		        c = new Color(colors_1.default[key].slice(1));
		    }
		    else if (key === 'transparent') {
		        c = new Color([0, 0, 0], 0);
		    }
		    if (c) {
		        c.value = keyword;
		        return c;
		    }
		};
		function clamp(v, max) {
		    return Math.min(Math.max(v, 0), max);
		}
		function toHex(v) {
		    return "#" + v.map(function (c) {
		        c = clamp(Math.round(c), 255);
		        return (c < 16 ? '0' : '') + c.toString(16);
		    }).join('');
		}
		color$1.default = Color;
		
		return color$1;
	}

	var atrule = {};

	var selector = {};

	var element = {};

	var paren = {};

	var hasRequiredParen;

	function requireParen () {
		if (hasRequiredParen) return paren;
		hasRequiredParen = 1;
		Object.defineProperty(paren, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var Paren = function (node) {
		    this.value = node;
		};
		Paren.prototype = Object.assign(new node_1.default(), {
		    type: 'Paren',
		    genCSS: function (context, output) {
		        output.add('(');
		        this.value.genCSS(context, output);
		        output.add(')');
		    },
		    eval: function (context) {
		        return new Paren(this.value.eval(context));
		    }
		});
		paren.default = Paren;
		
		return paren;
	}

	var combinator = {};

	var hasRequiredCombinator;

	function requireCombinator () {
		if (hasRequiredCombinator) return combinator;
		hasRequiredCombinator = 1;
		Object.defineProperty(combinator, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var _noSpaceCombinators = {
		    '': true,
		    ' ': true,
		    '|': true
		};
		var Combinator = function (value) {
		    if (value === ' ') {
		        this.value = ' ';
		        this.emptyOrWhitespace = true;
		    }
		    else {
		        this.value = value ? value.trim() : '';
		        this.emptyOrWhitespace = this.value === '';
		    }
		};
		Combinator.prototype = Object.assign(new node_1.default(), {
		    type: 'Combinator',
		    genCSS: function (context, output) {
		        var spaceOrEmpty = (context.compress || _noSpaceCombinators[this.value]) ? '' : ' ';
		        output.add(spaceOrEmpty + this.value + spaceOrEmpty);
		    }
		});
		combinator.default = Combinator;
		
		return combinator;
	}

	var hasRequiredElement;

	function requireElement () {
		if (hasRequiredElement) return element;
		hasRequiredElement = 1;
		Object.defineProperty(element, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var paren_1 = tslib_1.__importDefault(requireParen());
		var combinator_1 = tslib_1.__importDefault(requireCombinator());
		var Element = function (combinator, value, isVariable, index, currentFileInfo, visibilityInfo) {
		    this.combinator = combinator instanceof combinator_1.default ?
		        combinator : new combinator_1.default(combinator);
		    if (typeof value === 'string') {
		        this.value = value.trim();
		    }
		    else if (value) {
		        this.value = value;
		    }
		    else {
		        this.value = '';
		    }
		    this.isVariable = isVariable;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.copyVisibilityInfo(visibilityInfo);
		    this.setParent(this.combinator, this);
		};
		Element.prototype = Object.assign(new node_1.default(), {
		    type: 'Element',
		    accept: function (visitor) {
		        var value = this.value;
		        this.combinator = visitor.visit(this.combinator);
		        if (typeof value === 'object') {
		            this.value = visitor.visit(value);
		        }
		    },
		    eval: function (context) {
		        return new Element(this.combinator, this.value.eval ? this.value.eval(context) : this.value, this.isVariable, this.getIndex(), this.fileInfo(), this.visibilityInfo());
		    },
		    clone: function () {
		        return new Element(this.combinator, this.value, this.isVariable, this.getIndex(), this.fileInfo(), this.visibilityInfo());
		    },
		    genCSS: function (context, output) {
		        output.add(this.toCSS(context), this.fileInfo(), this.getIndex());
		    },
		    toCSS: function (context) {
		        context = context || {};
		        var value = this.value;
		        var firstSelector = context.firstSelector;
		        if (value instanceof paren_1.default) {
		            // selector in parens should not be affected by outer selector
		            // flags (breaks only interpolated selectors - see #1973)
		            context.firstSelector = true;
		        }
		        value = value.toCSS ? value.toCSS(context) : value;
		        context.firstSelector = firstSelector;
		        if (value === '' && this.combinator.value.charAt(0) === '&') {
		            return '';
		        }
		        else {
		            return this.combinator.toCSS(context) + value;
		        }
		    }
		});
		element.default = Element;
		
		return element;
	}

	var lessError = {};

	var utils$2 = {};

	var constants = {};

	var hasRequiredConstants;

	function requireConstants () {
		if (hasRequiredConstants) return constants;
		hasRequiredConstants = 1;
		Object.defineProperty(constants, "__esModule", { value: true });
		constants.RewriteUrls = constants.Math = void 0;
		constants.Math = {
		    ALWAYS: 0,
		    PARENS_DIVISION: 1,
		    PARENS: 2
		    // removed - STRICT_LEGACY: 3
		};
		constants.RewriteUrls = {
		    OFF: 0,
		    LOCAL: 1,
		    ALL: 2
		};
		
		return constants;
	}

	var dist = {};

	/**
	 * Returns the object type of the given payload
	 *
	 * @param {*} payload
	 * @returns {string}
	 */
	function getType(payload) {
	    return Object.prototype.toString.call(payload).slice(8, -1);
	}
	/**
	 * Returns whether the payload is undefined
	 *
	 * @param {*} payload
	 * @returns {payload is undefined}
	 */
	function isUndefined(payload) {
	    return getType(payload) === 'Undefined';
	}
	/**
	 * Returns whether the payload is null
	 *
	 * @param {*} payload
	 * @returns {payload is null}
	 */
	function isNull(payload) {
	    return getType(payload) === 'Null';
	}
	/**
	 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
	 *
	 * @param {*} payload
	 * @returns {payload is PlainObject}
	 */
	function isPlainObject(payload) {
	    if (getType(payload) !== 'Object')
	        return false;
	    return payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype;
	}
	/**
	 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
	 *
	 * @param {*} payload
	 * @returns {payload is PlainObject}
	 */
	function isObject(payload) {
	    return isPlainObject(payload);
	}
	/**
	 * Returns whether the payload is a an empty object (excluding special classes or objects with other prototypes)
	 *
	 * @param {*} payload
	 * @returns {payload is { [K in any]: never }}
	 */
	function isEmptyObject(payload) {
	    return isPlainObject(payload) && Object.keys(payload).length === 0;
	}
	/**
	 * Returns whether the payload is a an empty object (excluding special classes or objects with other prototypes)
	 *
	 * @param {*} payload
	 * @returns {payload is PlainObject}
	 */
	function isFullObject(payload) {
	    return isPlainObject(payload) && Object.keys(payload).length > 0;
	}
	/**
	 * Returns whether the payload is an any kind of object (including special classes or objects with different prototypes)
	 *
	 * @param {*} payload
	 * @returns {payload is PlainObject}
	 */
	function isAnyObject(payload) {
	    return getType(payload) === 'Object';
	}
	/**
	 * Returns whether the payload is an object like a type passed in < >
	 *
	 * Usage: isObjectLike<{id: any}>(payload) // will make sure it's an object and has an `id` prop.
	 *
	 * @template T this must be passed in < >
	 * @param {*} payload
	 * @returns {payload is T}
	 */
	function isObjectLike(payload) {
	    return isAnyObject(payload);
	}
	/**
	 * Returns whether the payload is a function (regular or async)
	 *
	 * @param {*} payload
	 * @returns {payload is AnyFunction}
	 */
	function isFunction(payload) {
	    return typeof payload === 'function';
	}
	/**
	 * Returns whether the payload is an array
	 *
	 * @param {any} payload
	 * @returns {payload is any[]}
	 */
	function isArray(payload) {
	    return getType(payload) === 'Array';
	}
	/**
	 * Returns whether the payload is a an array with at least 1 item
	 *
	 * @param {*} payload
	 * @returns {payload is any[]}
	 */
	function isFullArray(payload) {
	    return isArray(payload) && payload.length > 0;
	}
	/**
	 * Returns whether the payload is a an empty array
	 *
	 * @param {*} payload
	 * @returns {payload is []}
	 */
	function isEmptyArray(payload) {
	    return isArray(payload) && payload.length === 0;
	}
	/**
	 * Returns whether the payload is a string
	 *
	 * @param {*} payload
	 * @returns {payload is string}
	 */
	function isString(payload) {
	    return getType(payload) === 'String';
	}
	/**
	 * Returns whether the payload is a string, BUT returns false for ''
	 *
	 * @param {*} payload
	 * @returns {payload is string}
	 */
	function isFullString(payload) {
	    return isString(payload) && payload !== '';
	}
	/**
	 * Returns whether the payload is ''
	 *
	 * @param {*} payload
	 * @returns {payload is string}
	 */
	function isEmptyString(payload) {
	    return payload === '';
	}
	/**
	 * Returns whether the payload is a number (but not NaN)
	 *
	 * This will return `false` for `NaN`!!
	 *
	 * @param {*} payload
	 * @returns {payload is number}
	 */
	function isNumber(payload) {
	    return getType(payload) === 'Number' && !isNaN(payload);
	}
	/**
	 * Returns whether the payload is a boolean
	 *
	 * @param {*} payload
	 * @returns {payload is boolean}
	 */
	function isBoolean(payload) {
	    return getType(payload) === 'Boolean';
	}
	/**
	 * Returns whether the payload is a regular expression (RegExp)
	 *
	 * @param {*} payload
	 * @returns {payload is RegExp}
	 */
	function isRegExp(payload) {
	    return getType(payload) === 'RegExp';
	}
	/**
	 * Returns whether the payload is a Map
	 *
	 * @param {*} payload
	 * @returns {payload is Map<any, any>}
	 */
	function isMap(payload) {
	    return getType(payload) === 'Map';
	}
	/**
	 * Returns whether the payload is a WeakMap
	 *
	 * @param {*} payload
	 * @returns {payload is WeakMap<any, any>}
	 */
	function isWeakMap(payload) {
	    return getType(payload) === 'WeakMap';
	}
	/**
	 * Returns whether the payload is a Set
	 *
	 * @param {*} payload
	 * @returns {payload is Set<any>}
	 */
	function isSet(payload) {
	    return getType(payload) === 'Set';
	}
	/**
	 * Returns whether the payload is a WeakSet
	 *
	 * @param {*} payload
	 * @returns {payload is WeakSet<any>}
	 */
	function isWeakSet(payload) {
	    return getType(payload) === 'WeakSet';
	}
	/**
	 * Returns whether the payload is a Symbol
	 *
	 * @param {*} payload
	 * @returns {payload is symbol}
	 */
	function isSymbol(payload) {
	    return getType(payload) === 'Symbol';
	}
	/**
	 * Returns whether the payload is a Date, and that the date is valid
	 *
	 * @param {*} payload
	 * @returns {payload is Date}
	 */
	function isDate(payload) {
	    return getType(payload) === 'Date' && !isNaN(payload);
	}
	/**
	 * Returns whether the payload is a Blob
	 *
	 * @param {*} payload
	 * @returns {payload is Blob}
	 */
	function isBlob(payload) {
	    return getType(payload) === 'Blob';
	}
	/**
	 * Returns whether the payload is a File
	 *
	 * @param {*} payload
	 * @returns {payload is File}
	 */
	function isFile(payload) {
	    return getType(payload) === 'File';
	}
	/**
	 * Returns whether the payload is a Promise
	 *
	 * @param {*} payload
	 * @returns {payload is Promise<any>}
	 */
	function isPromise(payload) {
	    return getType(payload) === 'Promise';
	}
	/**
	 * Returns whether the payload is an Error
	 *
	 * @param {*} payload
	 * @returns {payload is Error}
	 */
	function isError(payload) {
	    return getType(payload) === 'Error';
	}
	/**
	 * Returns whether the payload is literally the value `NaN` (it's `NaN` and also a `number`)
	 *
	 * @param {*} payload
	 * @returns {payload is typeof NaN}
	 */
	function isNaNValue(payload) {
	    return getType(payload) === 'Number' && isNaN(payload);
	}
	/**
	 * Returns whether the payload is a primitive type (eg. Boolean | Null | Undefined | Number | String | Symbol)
	 *
	 * @param {*} payload
	 * @returns {(payload is boolean | null | undefined | number | string | symbol)}
	 */
	function isPrimitive(payload) {
	    return (isBoolean(payload) ||
	        isNull(payload) ||
	        isUndefined(payload) ||
	        isNumber(payload) ||
	        isString(payload) ||
	        isSymbol(payload));
	}
	/**
	 * Returns true whether the payload is null or undefined
	 *
	 * @param {*} payload
	 * @returns {(payload is null | undefined)}
	 */
	var isNullOrUndefined = isOneOf(isNull, isUndefined);
	function isOneOf(a, b, c, d, e) {
	    return function (value) {
	        return a(value) || b(value) || (!!c && c(value)) || (!!d && d(value)) || (!!e && e(value));
	    };
	}
	/**
	 * Does a generic check to check that the given payload is of a given type.
	 * In cases like Number, it will return true for NaN as NaN is a Number (thanks javascript!);
	 * It will, however, differentiate between object and null
	 *
	 * @template T
	 * @param {*} payload
	 * @param {T} type
	 * @throws {TypeError} Will throw type error if type is an invalid type
	 * @returns {payload is T}
	 */
	function isType(payload, type) {
	    if (!(type instanceof Function)) {
	        throw new TypeError('Type must be a function');
	    }
	    if (!Object.prototype.hasOwnProperty.call(type, 'prototype')) {
	        throw new TypeError('Type is not a class');
	    }
	    // Classes usually have names (as functions usually have names)
	    var name = type.name;
	    return getType(payload) === name || Boolean(payload && payload.constructor === type);
	}

	var index_esm = /*#__PURE__*/Object.freeze({
		__proto__: null,
		getType: getType,
		isAnyObject: isAnyObject,
		isArray: isArray,
		isBlob: isBlob,
		isBoolean: isBoolean,
		isDate: isDate,
		isEmptyArray: isEmptyArray,
		isEmptyObject: isEmptyObject,
		isEmptyString: isEmptyString,
		isError: isError,
		isFile: isFile,
		isFullArray: isFullArray,
		isFullObject: isFullObject,
		isFullString: isFullString,
		isFunction: isFunction,
		isMap: isMap,
		isNaNValue: isNaNValue,
		isNull: isNull,
		isNullOrUndefined: isNullOrUndefined,
		isNumber: isNumber,
		isObject: isObject,
		isObjectLike: isObjectLike,
		isOneOf: isOneOf,
		isPlainObject: isPlainObject,
		isPrimitive: isPrimitive,
		isPromise: isPromise,
		isRegExp: isRegExp,
		isSet: isSet,
		isString: isString,
		isSymbol: isSymbol,
		isType: isType,
		isUndefined: isUndefined,
		isWeakMap: isWeakMap,
		isWeakSet: isWeakSet
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(index_esm);

	var hasRequiredDist;

	function requireDist () {
		if (hasRequiredDist) return dist;
		hasRequiredDist = 1;

		Object.defineProperty(dist, '__esModule', { value: true });

		var isWhat = require$$0;

		function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
		    const propType = {}.propertyIsEnumerable.call(originalObject, key)
		        ? 'enumerable'
		        : 'nonenumerable';
		    if (propType === 'enumerable')
		        carry[key] = newVal;
		    if (includeNonenumerable && propType === 'nonenumerable') {
		        Object.defineProperty(carry, key, {
		            value: newVal,
		            enumerable: false,
		            writable: true,
		            configurable: true,
		        });
		    }
		}
		/**
		 * Copy (clone) an object and all its props recursively to get rid of any prop referenced of the original object. Arrays are also cloned, however objects inside arrays are still linked.
		 *
		 * @export
		 * @template T
		 * @param {T} target Target can be anything
		 * @param {Options} [options = {}] Options can be `props` or `nonenumerable`
		 * @returns {T} the target with replaced values
		 * @export
		 */
		function copy(target, options = {}) {
		    if (isWhat.isArray(target)) {
		        return target.map((item) => copy(item, options));
		    }
		    if (!isWhat.isPlainObject(target)) {
		        return target;
		    }
		    const props = Object.getOwnPropertyNames(target);
		    const symbols = Object.getOwnPropertySymbols(target);
		    return [...props, ...symbols].reduce((carry, key) => {
		        if (isWhat.isArray(options.props) && !options.props.includes(key)) {
		            return carry;
		        }
		        const val = target[key];
		        const newVal = copy(val, options);
		        assignProp(carry, key, newVal, target, options.nonenumerable);
		        return carry;
		    }, {});
		}

		dist.copy = copy;
		return dist;
	}

	var hasRequiredUtils;

	function requireUtils () {
		if (hasRequiredUtils) return utils$2;
		hasRequiredUtils = 1;
		Object.defineProperty(utils$2, "__esModule", { value: true });
		utils$2.flattenArray = utils$2.merge = utils$2.copyOptions = utils$2.defaults = utils$2.clone = utils$2.copyArray = utils$2.getLocation = void 0;
		var tslib_1 = require$$0$1;
		/* jshint proto: true */
		var Constants = tslib_1.__importStar(requireConstants());
		var copy_anything_1 = requireDist();
		function getLocation(index, inputStream) {
		    var n = index + 1;
		    var line = null;
		    var column = -1;
		    while (--n >= 0 && inputStream.charAt(n) !== '\n') {
		        column++;
		    }
		    if (typeof index === 'number') {
		        line = (inputStream.slice(0, index).match(/\n/g) || '').length;
		    }
		    return {
		        line: line,
		        column: column
		    };
		}
		utils$2.getLocation = getLocation;
		function copyArray(arr) {
		    var i;
		    var length = arr.length;
		    var copy = new Array(length);
		    for (i = 0; i < length; i++) {
		        copy[i] = arr[i];
		    }
		    return copy;
		}
		utils$2.copyArray = copyArray;
		function clone(obj) {
		    var cloned = {};
		    for (var prop in obj) {
		        if (obj.hasOwnProperty(prop)) {
		            cloned[prop] = obj[prop];
		        }
		    }
		    return cloned;
		}
		utils$2.clone = clone;
		function defaults(obj1, obj2) {
		    var newObj = obj2 || {};
		    if (!obj2._defaults) {
		        newObj = {};
		        var defaults_1 = copy_anything_1.copy(obj1);
		        newObj._defaults = defaults_1;
		        var cloned = obj2 ? copy_anything_1.copy(obj2) : {};
		        Object.assign(newObj, defaults_1, cloned);
		    }
		    return newObj;
		}
		utils$2.defaults = defaults;
		function copyOptions(obj1, obj2) {
		    if (obj2 && obj2._defaults) {
		        return obj2;
		    }
		    var opts = defaults(obj1, obj2);
		    if (opts.strictMath) {
		        opts.math = Constants.Math.PARENS;
		    }
		    // Back compat with changed relativeUrls option
		    if (opts.relativeUrls) {
		        opts.rewriteUrls = Constants.RewriteUrls.ALL;
		    }
		    if (typeof opts.math === 'string') {
		        switch (opts.math.toLowerCase()) {
		            case 'always':
		                opts.math = Constants.Math.ALWAYS;
		                break;
		            case 'parens-division':
		                opts.math = Constants.Math.PARENS_DIVISION;
		                break;
		            case 'strict':
		            case 'parens':
		                opts.math = Constants.Math.PARENS;
		                break;
		            default:
		                opts.math = Constants.Math.PARENS;
		        }
		    }
		    if (typeof opts.rewriteUrls === 'string') {
		        switch (opts.rewriteUrls.toLowerCase()) {
		            case 'off':
		                opts.rewriteUrls = Constants.RewriteUrls.OFF;
		                break;
		            case 'local':
		                opts.rewriteUrls = Constants.RewriteUrls.LOCAL;
		                break;
		            case 'all':
		                opts.rewriteUrls = Constants.RewriteUrls.ALL;
		                break;
		        }
		    }
		    return opts;
		}
		utils$2.copyOptions = copyOptions;
		function merge(obj1, obj2) {
		    for (var prop in obj2) {
		        if (obj2.hasOwnProperty(prop)) {
		            obj1[prop] = obj2[prop];
		        }
		    }
		    return obj1;
		}
		utils$2.merge = merge;
		function flattenArray(arr, result) {
		    if (result === void 0) { result = []; }
		    for (var i = 0, length_1 = arr.length; i < length_1; i++) {
		        var value = arr[i];
		        if (Array.isArray(value)) {
		            flattenArray(value, result);
		        }
		        else {
		            if (value !== undefined) {
		                result.push(value);
		            }
		        }
		    }
		    return result;
		}
		utils$2.flattenArray = flattenArray;
		
		return utils$2;
	}

	var hasRequiredLessError;

	function requireLessError () {
		if (hasRequiredLessError) return lessError;
		hasRequiredLessError = 1;
		Object.defineProperty(lessError, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var utils = tslib_1.__importStar(requireUtils());
		var anonymousFunc = /(<anonymous>|Function):(\d+):(\d+)/;
		/**
		 * This is a centralized class of any error that could be thrown internally (mostly by the parser).
		 * Besides standard .message it keeps some additional data like a path to the file where the error
		 * occurred along with line and column numbers.
		 *
		 * @class
		 * @extends Error
		 * @type {module.LessError}
		 *
		 * @prop {string} type
		 * @prop {string} filename
		 * @prop {number} index
		 * @prop {number} line
		 * @prop {number} column
		 * @prop {number} callLine
		 * @prop {number} callExtract
		 * @prop {string[]} extract
		 *
		 * @param {Object} e              - An error object to wrap around or just a descriptive object
		 * @param {Object} fileContentMap - An object with file contents in 'contents' property (like importManager) @todo - move to fileManager?
		 * @param {string} [currentFilename]
		 */
		var LessError = function (e, fileContentMap, currentFilename) {
		    Error.call(this);
		    var filename = e.filename || currentFilename;
		    this.message = e.message;
		    this.stack = e.stack;
		    if (fileContentMap && filename) {
		        var input = fileContentMap.contents[filename];
		        var loc = utils.getLocation(e.index, input);
		        var line = loc.line;
		        var col = loc.column;
		        var callLine = e.call && utils.getLocation(e.call, input).line;
		        var lines = input ? input.split('\n') : '';
		        this.type = e.type || 'Syntax';
		        this.filename = filename;
		        this.index = e.index;
		        this.line = typeof line === 'number' ? line + 1 : null;
		        this.column = col;
		        if (!this.line && this.stack) {
		            var found = this.stack.match(anonymousFunc);
		            /**
		             * We have to figure out how this environment stringifies anonymous functions
		             * so we can correctly map plugin errors.
		             *
		             * Note, in Node 8, the output of anonymous funcs varied based on parameters
		             * being present or not, so we inject dummy params.
		             */
		            var func = new Function('a', 'throw new Error()');
		            var lineAdjust = 0;
		            try {
		                func();
		            }
		            catch (e) {
		                var match = e.stack.match(anonymousFunc);
		                var line = parseInt(match[2]);
		                lineAdjust = 1 - line;
		            }
		            if (found) {
		                if (found[2]) {
		                    this.line = parseInt(found[2]) + lineAdjust;
		                }
		                if (found[3]) {
		                    this.column = parseInt(found[3]);
		                }
		            }
		        }
		        this.callLine = callLine + 1;
		        this.callExtract = lines[callLine];
		        this.extract = [
		            lines[this.line - 2],
		            lines[this.line - 1],
		            lines[this.line]
		        ];
		    }
		};
		if (typeof Object.create === 'undefined') {
		    var F = function () { };
		    F.prototype = Error.prototype;
		    LessError.prototype = new F();
		}
		else {
		    LessError.prototype = Object.create(Error.prototype);
		}
		LessError.prototype.constructor = LessError;
		/**
		 * An overridden version of the default Object.prototype.toString
		 * which uses additional information to create a helpful message.
		 *
		 * @param {Object} options
		 * @returns {string}
		 */
		LessError.prototype.toString = function (options) {
		    options = options || {};
		    var message = '';
		    var extract = this.extract || [];
		    var error = [];
		    var stylize = function (str) { return str; };
		    if (options.stylize) {
		        var type = typeof options.stylize;
		        if (type !== 'function') {
		            throw Error("options.stylize should be a function, got a " + type + "!");
		        }
		        stylize = options.stylize;
		    }
		    if (this.line !== null) {
		        if (typeof extract[0] === 'string') {
		            error.push(stylize(this.line - 1 + " " + extract[0], 'grey'));
		        }
		        if (typeof extract[1] === 'string') {
		            var errorTxt = this.line + " ";
		            if (extract[1]) {
		                errorTxt += extract[1].slice(0, this.column) +
		                    stylize(stylize(stylize(extract[1].substr(this.column, 1), 'bold') +
		                        extract[1].slice(this.column + 1), 'red'), 'inverse');
		            }
		            error.push(errorTxt);
		        }
		        if (typeof extract[2] === 'string') {
		            error.push(stylize(this.line + 1 + " " + extract[2], 'grey'));
		        }
		        error = error.join('\n') + stylize('', 'reset') + "\n";
		    }
		    message += stylize(this.type + "Error: " + this.message, 'red');
		    if (this.filename) {
		        message += stylize(' in ', 'red') + this.filename;
		    }
		    if (this.line) {
		        message += stylize(" on line " + this.line + ", column " + (this.column + 1) + ":", 'grey');
		    }
		    message += "\n" + error;
		    if (this.callLine) {
		        message += stylize('from ', 'red') + (this.filename || '') + "/n";
		        message += stylize(this.callLine, 'grey') + " " + this.callExtract + "/n";
		    }
		    return message;
		};
		lessError.default = LessError;
		
		return lessError;
	}

	var hasRequiredSelector;

	function requireSelector () {
		if (hasRequiredSelector) return selector;
		hasRequiredSelector = 1;
		Object.defineProperty(selector, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var element_1 = tslib_1.__importDefault(requireElement());
		var less_error_1 = tslib_1.__importDefault(requireLessError());
		var Selector = function (elements, extendList, condition, index, currentFileInfo, visibilityInfo) {
		    this.extendList = extendList;
		    this.condition = condition;
		    this.evaldCondition = !condition;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.elements = this.getElements(elements);
		    this.mixinElements_ = undefined;
		    this.copyVisibilityInfo(visibilityInfo);
		    this.setParent(this.elements, this);
		};
		Selector.prototype = Object.assign(new node_1.default(), {
		    type: 'Selector',
		    accept: function (visitor) {
		        if (this.elements) {
		            this.elements = visitor.visitArray(this.elements);
		        }
		        if (this.extendList) {
		            this.extendList = visitor.visitArray(this.extendList);
		        }
		        if (this.condition) {
		            this.condition = visitor.visit(this.condition);
		        }
		    },
		    createDerived: function (elements, extendList, evaldCondition) {
		        elements = this.getElements(elements);
		        var newSelector = new Selector(elements, extendList || this.extendList, null, this.getIndex(), this.fileInfo(), this.visibilityInfo());
		        newSelector.evaldCondition = (evaldCondition != null) ? evaldCondition : this.evaldCondition;
		        newSelector.mediaEmpty = this.mediaEmpty;
		        return newSelector;
		    },
		    getElements: function (els) {
		        if (!els) {
		            return [new element_1.default('', '&', false, this._index, this._fileInfo)];
		        }
		        if (typeof els === 'string') {
		            this.parse.parseNode(els, ['selector'], this._index, this._fileInfo, function (err, result) {
		                if (err) {
		                    throw new less_error_1.default({
		                        index: err.index,
		                        message: err.message
		                    }, this.parse.imports, this._fileInfo.filename);
		                }
		                els = result[0].elements;
		            });
		        }
		        return els;
		    },
		    createEmptySelectors: function () {
		        var el = new element_1.default('', '&', false, this._index, this._fileInfo), sels = [new Selector([el], null, null, this._index, this._fileInfo)];
		        sels[0].mediaEmpty = true;
		        return sels;
		    },
		    match: function (other) {
		        var elements = this.elements;
		        var len = elements.length;
		        var olen;
		        var i;
		        other = other.mixinElements();
		        olen = other.length;
		        if (olen === 0 || len < olen) {
		            return 0;
		        }
		        else {
		            for (i = 0; i < olen; i++) {
		                if (elements[i].value !== other[i]) {
		                    return 0;
		                }
		            }
		        }
		        return olen; // return number of matched elements
		    },
		    mixinElements: function () {
		        if (this.mixinElements_) {
		            return this.mixinElements_;
		        }
		        var elements = this.elements.map(function (v) {
		            return v.combinator.value + (v.value.value || v.value);
		        }).join('').match(/[,&#\*\.\w-]([\w-]|(\\.))*/g);
		        if (elements) {
		            if (elements[0] === '&') {
		                elements.shift();
		            }
		        }
		        else {
		            elements = [];
		        }
		        return (this.mixinElements_ = elements);
		    },
		    isJustParentSelector: function () {
		        return !this.mediaEmpty &&
		            this.elements.length === 1 &&
		            this.elements[0].value === '&' &&
		            (this.elements[0].combinator.value === ' ' || this.elements[0].combinator.value === '');
		    },
		    eval: function (context) {
		        var evaldCondition = this.condition && this.condition.eval(context);
		        var elements = this.elements;
		        var extendList = this.extendList;
		        elements = elements && elements.map(function (e) { return e.eval(context); });
		        extendList = extendList && extendList.map(function (extend) { return extend.eval(context); });
		        return this.createDerived(elements, extendList, evaldCondition);
		    },
		    genCSS: function (context, output) {
		        var i, element;
		        if ((!context || !context.firstSelector) && this.elements[0].combinator.value === '') {
		            output.add(' ', this.fileInfo(), this.getIndex());
		        }
		        for (i = 0; i < this.elements.length; i++) {
		            element = this.elements[i];
		            element.genCSS(context, output);
		        }
		    },
		    getIsOutput: function () {
		        return this.evaldCondition;
		    }
		});
		selector.default = Selector;
		
		return selector;
	}

	var ruleset = {};

	var declaration = {};

	var value = {};

	var hasRequiredValue;

	function requireValue () {
		if (hasRequiredValue) return value;
		hasRequiredValue = 1;
		Object.defineProperty(value, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var Value = function (value) {
		    if (!value) {
		        throw new Error('Value requires an array argument');
		    }
		    if (!Array.isArray(value)) {
		        this.value = [value];
		    }
		    else {
		        this.value = value;
		    }
		};
		Value.prototype = Object.assign(new node_1.default(), {
		    type: 'Value',
		    accept: function (visitor) {
		        if (this.value) {
		            this.value = visitor.visitArray(this.value);
		        }
		    },
		    eval: function (context) {
		        if (this.value.length === 1) {
		            return this.value[0].eval(context);
		        }
		        else {
		            return new Value(this.value.map(function (v) {
		                return v.eval(context);
		            }));
		        }
		    },
		    genCSS: function (context, output) {
		        var i;
		        for (i = 0; i < this.value.length; i++) {
		            this.value[i].genCSS(context, output);
		            if (i + 1 < this.value.length) {
		                output.add((context && context.compress) ? ',' : ', ');
		            }
		        }
		    }
		});
		value.default = Value;
		
		return value;
	}

	var keyword = {};

	var hasRequiredKeyword;

	function requireKeyword () {
		if (hasRequiredKeyword) return keyword;
		hasRequiredKeyword = 1;
		Object.defineProperty(keyword, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var Keyword = function (value) {
		    this.value = value;
		};
		Keyword.prototype = Object.assign(new node_1.default(), {
		    type: 'Keyword',
		    genCSS: function (context, output) {
		        if (this.value === '%') {
		            throw { type: 'Syntax', message: 'Invalid % without number' };
		        }
		        output.add(this.value);
		    }
		});
		Keyword.True = new Keyword('true');
		Keyword.False = new Keyword('false');
		keyword.default = Keyword;
		
		return keyword;
	}

	var anonymous = {};

	var hasRequiredAnonymous;

	function requireAnonymous () {
		if (hasRequiredAnonymous) return anonymous;
		hasRequiredAnonymous = 1;
		Object.defineProperty(anonymous, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var Anonymous = function (value, index, currentFileInfo, mapLines, rulesetLike, visibilityInfo) {
		    this.value = value;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.mapLines = mapLines;
		    this.rulesetLike = (typeof rulesetLike === 'undefined') ? false : rulesetLike;
		    this.allowRoot = true;
		    this.copyVisibilityInfo(visibilityInfo);
		};
		Anonymous.prototype = Object.assign(new node_1.default(), {
		    type: 'Anonymous',
		    eval: function () {
		        return new Anonymous(this.value, this._index, this._fileInfo, this.mapLines, this.rulesetLike, this.visibilityInfo());
		    },
		    compare: function (other) {
		        return other.toCSS && this.toCSS() === other.toCSS() ? 0 : undefined;
		    },
		    isRulesetLike: function () {
		        return this.rulesetLike;
		    },
		    genCSS: function (context, output) {
		        this.nodeVisible = Boolean(this.value);
		        if (this.nodeVisible) {
		            output.add(this.value, this._fileInfo, this._index, this.mapLines);
		        }
		    }
		});
		anonymous.default = Anonymous;
		
		return anonymous;
	}

	var hasRequiredDeclaration;

	function requireDeclaration () {
		if (hasRequiredDeclaration) return declaration;
		hasRequiredDeclaration = 1;
		Object.defineProperty(declaration, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var value_1 = tslib_1.__importDefault(requireValue());
		var keyword_1 = tslib_1.__importDefault(requireKeyword());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var Constants = tslib_1.__importStar(requireConstants());
		var MATH = Constants.Math;
		function evalName(context, name) {
		    var value = '';
		    var i;
		    var n = name.length;
		    var output = { add: function (s) { value += s; } };
		    for (i = 0; i < n; i++) {
		        name[i].eval(context).genCSS(context, output);
		    }
		    return value;
		}
		var Declaration = function (name, value, important, merge, index, currentFileInfo, inline, variable) {
		    this.name = name;
		    this.value = (value instanceof node_1.default) ? value : new value_1.default([value ? new anonymous_1.default(value) : null]);
		    this.important = important ? " " + important.trim() : '';
		    this.merge = merge;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.inline = inline || false;
		    this.variable = (variable !== undefined) ? variable
		        : (name.charAt && (name.charAt(0) === '@'));
		    this.allowRoot = true;
		    this.setParent(this.value, this);
		};
		Declaration.prototype = Object.assign(new node_1.default(), {
		    type: 'Declaration',
		    genCSS: function (context, output) {
		        output.add(this.name + (context.compress ? ':' : ': '), this.fileInfo(), this.getIndex());
		        try {
		            this.value.genCSS(context, output);
		        }
		        catch (e) {
		            e.index = this._index;
		            e.filename = this._fileInfo.filename;
		            throw e;
		        }
		        output.add(this.important + ((this.inline || (context.lastRule && context.compress)) ? '' : ';'), this._fileInfo, this._index);
		    },
		    eval: function (context) {
		        var mathBypass = false, prevMath, name = this.name, evaldValue, variable = this.variable;
		        if (typeof name !== 'string') {
		            // expand 'primitive' name directly to get
		            // things faster (~10% for benchmark.less):
		            name = (name.length === 1) && (name[0] instanceof keyword_1.default) ?
		                name[0].value : evalName(context, name);
		            variable = false; // never treat expanded interpolation as new variable name
		        }
		        // @todo remove when parens-division is default
		        if (name === 'font' && context.math === MATH.ALWAYS) {
		            mathBypass = true;
		            prevMath = context.math;
		            context.math = MATH.PARENS_DIVISION;
		        }
		        try {
		            context.importantScope.push({});
		            evaldValue = this.value.eval(context);
		            if (!this.variable && evaldValue.type === 'DetachedRuleset') {
		                throw { message: 'Rulesets cannot be evaluated on a property.',
		                    index: this.getIndex(), filename: this.fileInfo().filename };
		            }
		            var important = this.important;
		            var importantResult = context.importantScope.pop();
		            if (!important && importantResult.important) {
		                important = importantResult.important;
		            }
		            return new Declaration(name, evaldValue, important, this.merge, this.getIndex(), this.fileInfo(), this.inline, variable);
		        }
		        catch (e) {
		            if (typeof e.index !== 'number') {
		                e.index = this.getIndex();
		                e.filename = this.fileInfo().filename;
		            }
		            throw e;
		        }
		        finally {
		            if (mathBypass) {
		                context.math = prevMath;
		            }
		        }
		    },
		    makeImportant: function () {
		        return new Declaration(this.name, this.value, '!important', this.merge, this.getIndex(), this.fileInfo(), this.inline);
		    }
		});
		declaration.default = Declaration;
		
		return declaration;
	}

	var comment = {};

	var debugInfo = {};

	var hasRequiredDebugInfo;

	function requireDebugInfo () {
		if (hasRequiredDebugInfo) return debugInfo;
		hasRequiredDebugInfo = 1;
		Object.defineProperty(debugInfo, "__esModule", { value: true });
		function asComment(ctx) {
		    return "/* line " + ctx.debugInfo.lineNumber + ", " + ctx.debugInfo.fileName + " */\n";
		}
		function asMediaQuery(ctx) {
		    var filenameWithProtocol = ctx.debugInfo.fileName;
		    if (!/^[a-z]+:\/\//i.test(filenameWithProtocol)) {
		        filenameWithProtocol = "file://" + filenameWithProtocol;
		    }
		    return "@media -sass-debug-info{filename{font-family:" + filenameWithProtocol.replace(/([.:\/\\])/g, function (a) {
		        if (a == '\\') {
		            a = '\/';
		        }
		        return "\\" + a;
		    }) + "}line{font-family:\\00003" + ctx.debugInfo.lineNumber + "}}\n";
		}
		function debugInfo$1(context, ctx, lineSeparator) {
		    var result = '';
		    if (context.dumpLineNumbers && !context.compress) {
		        switch (context.dumpLineNumbers) {
		            case 'comments':
		                result = asComment(ctx);
		                break;
		            case 'mediaquery':
		                result = asMediaQuery(ctx);
		                break;
		            case 'all':
		                result = asComment(ctx) + (lineSeparator || '') + asMediaQuery(ctx);
		                break;
		        }
		    }
		    return result;
		}
		debugInfo.default = debugInfo$1;
		
		return debugInfo;
	}

	var hasRequiredComment;

	function requireComment () {
		if (hasRequiredComment) return comment;
		hasRequiredComment = 1;
		Object.defineProperty(comment, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var debug_info_1 = tslib_1.__importDefault(requireDebugInfo());
		var Comment = function (value, isLineComment, index, currentFileInfo) {
		    this.value = value;
		    this.isLineComment = isLineComment;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.allowRoot = true;
		};
		Comment.prototype = Object.assign(new node_1.default(), {
		    type: 'Comment',
		    genCSS: function (context, output) {
		        if (this.debugInfo) {
		            output.add(debug_info_1.default(context, this), this.fileInfo(), this.getIndex());
		        }
		        output.add(this.value);
		    },
		    isSilent: function (context) {
		        var isCompressed = context.compress && this.value[2] !== '!';
		        return this.isLineComment || isCompressed;
		    }
		});
		comment.default = Comment;
		
		return comment;
	}

	var contexts = {};

	var hasRequiredContexts;

	function requireContexts () {
		if (hasRequiredContexts) return contexts;
		hasRequiredContexts = 1;
		Object.defineProperty(contexts, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var contexts$1 = {};
		contexts.default = contexts$1;
		var Constants = tslib_1.__importStar(requireConstants());
		var copyFromOriginal = function copyFromOriginal(original, destination, propertiesToCopy) {
		    if (!original) {
		        return;
		    }
		    for (var i = 0; i < propertiesToCopy.length; i++) {
		        if (original.hasOwnProperty(propertiesToCopy[i])) {
		            destination[propertiesToCopy[i]] = original[propertiesToCopy[i]];
		        }
		    }
		};
		/*
		 parse is used whilst parsing
		 */
		var parseCopyProperties = [
		    // options
		    'paths',
		    'rewriteUrls',
		    'rootpath',
		    'strictImports',
		    'insecure',
		    'dumpLineNumbers',
		    'compress',
		    'syncImport',
		    'chunkInput',
		    'mime',
		    'useFileCache',
		    // context
		    'processImports',
		    // Used by the import manager to stop multiple import visitors being created.
		    'pluginManager' // Used as the plugin manager for the session
		];
		contexts$1.Parse = function (options) {
		    copyFromOriginal(options, this, parseCopyProperties);
		    if (typeof this.paths === 'string') {
		        this.paths = [this.paths];
		    }
		};
		var evalCopyProperties = [
		    'paths',
		    'compress',
		    'math',
		    'strictUnits',
		    'sourceMap',
		    'importMultiple',
		    'urlArgs',
		    'javascriptEnabled',
		    'pluginManager',
		    'importantScope',
		    'rewriteUrls' // option - whether to adjust URL's to be relative
		];
		contexts$1.Eval = function (options, frames) {
		    copyFromOriginal(options, this, evalCopyProperties);
		    if (typeof this.paths === 'string') {
		        this.paths = [this.paths];
		    }
		    this.frames = frames || [];
		    this.importantScope = this.importantScope || [];
		};
		contexts$1.Eval.prototype.enterCalc = function () {
		    if (!this.calcStack) {
		        this.calcStack = [];
		    }
		    this.calcStack.push(true);
		    this.inCalc = true;
		};
		contexts$1.Eval.prototype.exitCalc = function () {
		    this.calcStack.pop();
		    if (!this.calcStack.length) {
		        this.inCalc = false;
		    }
		};
		contexts$1.Eval.prototype.inParenthesis = function () {
		    if (!this.parensStack) {
		        this.parensStack = [];
		    }
		    this.parensStack.push(true);
		};
		contexts$1.Eval.prototype.outOfParenthesis = function () {
		    this.parensStack.pop();
		};
		contexts$1.Eval.prototype.inCalc = false;
		contexts$1.Eval.prototype.mathOn = true;
		contexts$1.Eval.prototype.isMathOn = function (op) {
		    if (!this.mathOn) {
		        return false;
		    }
		    if (op === '/' && this.math !== Constants.Math.ALWAYS && (!this.parensStack || !this.parensStack.length)) {
		        return false;
		    }
		    if (this.math > Constants.Math.PARENS_DIVISION) {
		        return this.parensStack && this.parensStack.length;
		    }
		    return true;
		};
		contexts$1.Eval.prototype.pathRequiresRewrite = function (path) {
		    var isRelative = this.rewriteUrls === Constants.RewriteUrls.LOCAL ? isPathLocalRelative : isPathRelative;
		    return isRelative(path);
		};
		contexts$1.Eval.prototype.rewritePath = function (path, rootpath) {
		    var newPath;
		    rootpath = rootpath || '';
		    newPath = this.normalizePath(rootpath + path);
		    // If a path was explicit relative and the rootpath was not an absolute path
		    // we must ensure that the new path is also explicit relative.
		    if (isPathLocalRelative(path) &&
		        isPathRelative(rootpath) &&
		        isPathLocalRelative(newPath) === false) {
		        newPath = "./" + newPath;
		    }
		    return newPath;
		};
		contexts$1.Eval.prototype.normalizePath = function (path) {
		    var segments = path.split('/').reverse();
		    var segment;
		    path = [];
		    while (segments.length !== 0) {
		        segment = segments.pop();
		        switch (segment) {
		            case '.':
		                break;
		            case '..':
		                if ((path.length === 0) || (path[path.length - 1] === '..')) {
		                    path.push(segment);
		                }
		                else {
		                    path.pop();
		                }
		                break;
		            default:
		                path.push(segment);
		                break;
		        }
		    }
		    return path.join('/');
		};
		function isPathRelative(path) {
		    return !/^(?:[a-z-]+:|\/|#)/i.test(path);
		}
		function isPathLocalRelative(path) {
		    return path.charAt(0) === '.';
		}
		// todo - do the same for the toCSS ?
		
		return contexts;
	}

	var functionRegistry = {};

	var hasRequiredFunctionRegistry;

	function requireFunctionRegistry () {
		if (hasRequiredFunctionRegistry) return functionRegistry;
		hasRequiredFunctionRegistry = 1;
		Object.defineProperty(functionRegistry, "__esModule", { value: true });
		function makeRegistry(base) {
		    return {
		        _data: {},
		        add: function (name, func) {
		            // precautionary case conversion, as later querying of
		            // the registry by function-caller uses lower case as well.
		            name = name.toLowerCase();
		            if (this._data.hasOwnProperty(name)) ;
		            this._data[name] = func;
		        },
		        addMultiple: function (functions) {
		            var _this = this;
		            Object.keys(functions).forEach(function (name) {
		                _this.add(name, functions[name]);
		            });
		        },
		        get: function (name) {
		            return this._data[name] || (base && base.get(name));
		        },
		        getLocalFunctions: function () {
		            return this._data;
		        },
		        inherit: function () {
		            return makeRegistry(this);
		        },
		        create: function (base) {
		            return makeRegistry(base);
		        }
		    };
		}
		functionRegistry.default = makeRegistry(null);
		
		return functionRegistry;
	}

	var _default$7 = {};

	var hasRequired_default;

	function require_default () {
		if (hasRequired_default) return _default$7;
		hasRequired_default = 1;
		Object.defineProperty(_default$7, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var keyword_1 = tslib_1.__importDefault(requireKeyword());
		var defaultFunc = {
		    eval: function () {
		        var v = this.value_;
		        var e = this.error_;
		        if (e) {
		            throw e;
		        }
		        if (v != null) {
		            return v ? keyword_1.default.True : keyword_1.default.False;
		        }
		    },
		    value: function (v) {
		        this.value_ = v;
		    },
		    error: function (e) {
		        this.error_ = e;
		    },
		    reset: function () {
		        this.value_ = this.error_ = null;
		    }
		};
		_default$7.default = defaultFunc;
		
		return _default$7;
	}

	var hasRequiredRuleset;

	function requireRuleset () {
		if (hasRequiredRuleset) return ruleset;
		hasRequiredRuleset = 1;
		Object.defineProperty(ruleset, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var declaration_1 = tslib_1.__importDefault(requireDeclaration());
		var keyword_1 = tslib_1.__importDefault(requireKeyword());
		var comment_1 = tslib_1.__importDefault(requireComment());
		var paren_1 = tslib_1.__importDefault(requireParen());
		var selector_1 = tslib_1.__importDefault(requireSelector());
		var element_1 = tslib_1.__importDefault(requireElement());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var contexts_1 = tslib_1.__importDefault(requireContexts());
		var function_registry_1 = tslib_1.__importDefault(requireFunctionRegistry());
		var default_1 = tslib_1.__importDefault(require_default());
		var debug_info_1 = tslib_1.__importDefault(requireDebugInfo());
		var utils = tslib_1.__importStar(requireUtils());
		var Ruleset = function (selectors, rules, strictImports, visibilityInfo) {
		    this.selectors = selectors;
		    this.rules = rules;
		    this._lookups = {};
		    this._variables = null;
		    this._properties = null;
		    this.strictImports = strictImports;
		    this.copyVisibilityInfo(visibilityInfo);
		    this.allowRoot = true;
		    this.setParent(this.selectors, this);
		    this.setParent(this.rules, this);
		};
		Ruleset.prototype = Object.assign(new node_1.default(), {
		    type: 'Ruleset',
		    isRuleset: true,
		    isRulesetLike: function () { return true; },
		    accept: function (visitor) {
		        if (this.paths) {
		            this.paths = visitor.visitArray(this.paths, true);
		        }
		        else if (this.selectors) {
		            this.selectors = visitor.visitArray(this.selectors);
		        }
		        if (this.rules && this.rules.length) {
		            this.rules = visitor.visitArray(this.rules);
		        }
		    },
		    eval: function (context) {
		        var selectors;
		        var selCnt;
		        var selector;
		        var i;
		        var hasVariable;
		        var hasOnePassingSelector = false;
		        if (this.selectors && (selCnt = this.selectors.length)) {
		            selectors = new Array(selCnt);
		            default_1.default.error({
		                type: 'Syntax',
		                message: 'it is currently only allowed in parametric mixin guards,'
		            });
		            for (i = 0; i < selCnt; i++) {
		                selector = this.selectors[i].eval(context);
		                for (var j = 0; j < selector.elements.length; j++) {
		                    if (selector.elements[j].isVariable) {
		                        hasVariable = true;
		                        break;
		                    }
		                }
		                selectors[i] = selector;
		                if (selector.evaldCondition) {
		                    hasOnePassingSelector = true;
		                }
		            }
		            if (hasVariable) {
		                var toParseSelectors = new Array(selCnt);
		                for (i = 0; i < selCnt; i++) {
		                    selector = selectors[i];
		                    toParseSelectors[i] = selector.toCSS(context);
		                }
		                this.parse.parseNode(toParseSelectors.join(','), ["selectors"], selectors[0].getIndex(), selectors[0].fileInfo(), function (err, result) {
		                    if (result) {
		                        selectors = utils.flattenArray(result);
		                    }
		                });
		            }
		            default_1.default.reset();
		        }
		        else {
		            hasOnePassingSelector = true;
		        }
		        var rules = this.rules ? utils.copyArray(this.rules) : null;
		        var ruleset = new Ruleset(selectors, rules, this.strictImports, this.visibilityInfo());
		        var rule;
		        var subRule;
		        ruleset.originalRuleset = this;
		        ruleset.root = this.root;
		        ruleset.firstRoot = this.firstRoot;
		        ruleset.allowImports = this.allowImports;
		        if (this.debugInfo) {
		            ruleset.debugInfo = this.debugInfo;
		        }
		        if (!hasOnePassingSelector) {
		            rules.length = 0;
		        }
		        // inherit a function registry from the frames stack when possible;
		        // otherwise from the global registry
		        ruleset.functionRegistry = (function (frames) {
		            var i = 0;
		            var n = frames.length;
		            var found;
		            for (; i !== n; ++i) {
		                found = frames[i].functionRegistry;
		                if (found) {
		                    return found;
		                }
		            }
		            return function_registry_1.default;
		        }(context.frames)).inherit();
		        // push the current ruleset to the frames stack
		        var ctxFrames = context.frames;
		        ctxFrames.unshift(ruleset);
		        // currrent selectors
		        var ctxSelectors = context.selectors;
		        if (!ctxSelectors) {
		            context.selectors = ctxSelectors = [];
		        }
		        ctxSelectors.unshift(this.selectors);
		        // Evaluate imports
		        if (ruleset.root || ruleset.allowImports || !ruleset.strictImports) {
		            ruleset.evalImports(context);
		        }
		        // Store the frames around mixin definitions,
		        // so they can be evaluated like closures when the time comes.
		        var rsRules = ruleset.rules;
		        for (i = 0; (rule = rsRules[i]); i++) {
		            if (rule.evalFirst) {
		                rsRules[i] = rule.eval(context);
		            }
		        }
		        var mediaBlockCount = (context.mediaBlocks && context.mediaBlocks.length) || 0;
		        // Evaluate mixin calls.
		        for (i = 0; (rule = rsRules[i]); i++) {
		            if (rule.type === 'MixinCall') {
		                /* jshint loopfunc:true */
		                rules = rule.eval(context).filter(function (r) {
		                    if ((r instanceof declaration_1.default) && r.variable) {
		                        // do not pollute the scope if the variable is
		                        // already there. consider returning false here
		                        // but we need a way to "return" variable from mixins
		                        return !(ruleset.variable(r.name));
		                    }
		                    return true;
		                });
		                rsRules.splice.apply(rsRules, [i, 1].concat(rules));
		                i += rules.length - 1;
		                ruleset.resetCache();
		            }
		            else if (rule.type === 'VariableCall') {
		                /* jshint loopfunc:true */
		                rules = rule.eval(context).rules.filter(function (r) {
		                    if ((r instanceof declaration_1.default) && r.variable) {
		                        // do not pollute the scope at all
		                        return false;
		                    }
		                    return true;
		                });
		                rsRules.splice.apply(rsRules, [i, 1].concat(rules));
		                i += rules.length - 1;
		                ruleset.resetCache();
		            }
		        }
		        // Evaluate everything else
		        for (i = 0; (rule = rsRules[i]); i++) {
		            if (!rule.evalFirst) {
		                rsRules[i] = rule = rule.eval ? rule.eval(context) : rule;
		            }
		        }
		        // Evaluate everything else
		        for (i = 0; (rule = rsRules[i]); i++) {
		            // for rulesets, check if it is a css guard and can be removed
		            if (rule instanceof Ruleset && rule.selectors && rule.selectors.length === 1) {
		                // check if it can be folded in (e.g. & where)
		                if (rule.selectors[0] && rule.selectors[0].isJustParentSelector()) {
		                    rsRules.splice(i--, 1);
		                    for (var j = 0; (subRule = rule.rules[j]); j++) {
		                        if (subRule instanceof node_1.default) {
		                            subRule.copyVisibilityInfo(rule.visibilityInfo());
		                            if (!(subRule instanceof declaration_1.default) || !subRule.variable) {
		                                rsRules.splice(++i, 0, subRule);
		                            }
		                        }
		                    }
		                }
		            }
		        }
		        // Pop the stack
		        ctxFrames.shift();
		        ctxSelectors.shift();
		        if (context.mediaBlocks) {
		            for (i = mediaBlockCount; i < context.mediaBlocks.length; i++) {
		                context.mediaBlocks[i].bubbleSelectors(selectors);
		            }
		        }
		        return ruleset;
		    },
		    evalImports: function (context) {
		        var rules = this.rules;
		        var i;
		        var importRules;
		        if (!rules) {
		            return;
		        }
		        for (i = 0; i < rules.length; i++) {
		            if (rules[i].type === 'Import') {
		                importRules = rules[i].eval(context);
		                if (importRules && (importRules.length || importRules.length === 0)) {
		                    rules.splice.apply(rules, [i, 1].concat(importRules));
		                    i += importRules.length - 1;
		                }
		                else {
		                    rules.splice(i, 1, importRules);
		                }
		                this.resetCache();
		            }
		        }
		    },
		    makeImportant: function () {
		        var result = new Ruleset(this.selectors, this.rules.map(function (r) {
		            if (r.makeImportant) {
		                return r.makeImportant();
		            }
		            else {
		                return r;
		            }
		        }), this.strictImports, this.visibilityInfo());
		        return result;
		    },
		    matchArgs: function (args) {
		        return !args || args.length === 0;
		    },
		    // lets you call a css selector with a guard
		    matchCondition: function (args, context) {
		        var lastSelector = this.selectors[this.selectors.length - 1];
		        if (!lastSelector.evaldCondition) {
		            return false;
		        }
		        if (lastSelector.condition &&
		            !lastSelector.condition.eval(new contexts_1.default.Eval(context, context.frames))) {
		            return false;
		        }
		        return true;
		    },
		    resetCache: function () {
		        this._rulesets = null;
		        this._variables = null;
		        this._properties = null;
		        this._lookups = {};
		    },
		    variables: function () {
		        if (!this._variables) {
		            this._variables = !this.rules ? {} : this.rules.reduce(function (hash, r) {
		                if (r instanceof declaration_1.default && r.variable === true) {
		                    hash[r.name] = r;
		                }
		                // when evaluating variables in an import statement, imports have not been eval'd
		                // so we need to go inside import statements.
		                // guard against root being a string (in the case of inlined less)
		                if (r.type === 'Import' && r.root && r.root.variables) {
		                    var vars = r.root.variables();
		                    for (var name_1 in vars) {
		                        if (vars.hasOwnProperty(name_1)) {
		                            hash[name_1] = r.root.variable(name_1);
		                        }
		                    }
		                }
		                return hash;
		            }, {});
		        }
		        return this._variables;
		    },
		    properties: function () {
		        if (!this._properties) {
		            this._properties = !this.rules ? {} : this.rules.reduce(function (hash, r) {
		                if (r instanceof declaration_1.default && r.variable !== true) {
		                    var name_2 = (r.name.length === 1) && (r.name[0] instanceof keyword_1.default) ?
		                        r.name[0].value : r.name;
		                    // Properties don't overwrite as they can merge
		                    if (!hash["$" + name_2]) {
		                        hash["$" + name_2] = [r];
		                    }
		                    else {
		                        hash["$" + name_2].push(r);
		                    }
		                }
		                return hash;
		            }, {});
		        }
		        return this._properties;
		    },
		    variable: function (name) {
		        var decl = this.variables()[name];
		        if (decl) {
		            return this.parseValue(decl);
		        }
		    },
		    property: function (name) {
		        var decl = this.properties()[name];
		        if (decl) {
		            return this.parseValue(decl);
		        }
		    },
		    lastDeclaration: function () {
		        for (var i = this.rules.length; i > 0; i--) {
		            var decl = this.rules[i - 1];
		            if (decl instanceof declaration_1.default) {
		                return this.parseValue(decl);
		            }
		        }
		    },
		    parseValue: function (toParse) {
		        var self = this;
		        function transformDeclaration(decl) {
		            if (decl.value instanceof anonymous_1.default && !decl.parsed) {
		                if (typeof decl.value.value === 'string') {
		                    this.parse.parseNode(decl.value.value, ['value', 'important'], decl.value.getIndex(), decl.fileInfo(), function (err, result) {
		                        if (err) {
		                            decl.parsed = true;
		                        }
		                        if (result) {
		                            decl.value = result[0];
		                            decl.important = result[1] || '';
		                            decl.parsed = true;
		                        }
		                    });
		                }
		                else {
		                    decl.parsed = true;
		                }
		                return decl;
		            }
		            else {
		                return decl;
		            }
		        }
		        if (!Array.isArray(toParse)) {
		            return transformDeclaration.call(self, toParse);
		        }
		        else {
		            var nodes_1 = [];
		            toParse.forEach(function (n) {
		                nodes_1.push(transformDeclaration.call(self, n));
		            });
		            return nodes_1;
		        }
		    },
		    rulesets: function () {
		        if (!this.rules) {
		            return [];
		        }
		        var filtRules = [];
		        var rules = this.rules;
		        var i;
		        var rule;
		        for (i = 0; (rule = rules[i]); i++) {
		            if (rule.isRuleset) {
		                filtRules.push(rule);
		            }
		        }
		        return filtRules;
		    },
		    prependRule: function (rule) {
		        var rules = this.rules;
		        if (rules) {
		            rules.unshift(rule);
		        }
		        else {
		            this.rules = [rule];
		        }
		        this.setParent(rule, this);
		    },
		    find: function (selector, self, filter) {
		        self = self || this;
		        var rules = [];
		        var match;
		        var foundMixins;
		        var key = selector.toCSS();
		        if (key in this._lookups) {
		            return this._lookups[key];
		        }
		        this.rulesets().forEach(function (rule) {
		            if (rule !== self) {
		                for (var j = 0; j < rule.selectors.length; j++) {
		                    match = selector.match(rule.selectors[j]);
		                    if (match) {
		                        if (selector.elements.length > match) {
		                            if (!filter || filter(rule)) {
		                                foundMixins = rule.find(new selector_1.default(selector.elements.slice(match)), self, filter);
		                                for (var i = 0; i < foundMixins.length; ++i) {
		                                    foundMixins[i].path.push(rule);
		                                }
		                                Array.prototype.push.apply(rules, foundMixins);
		                            }
		                        }
		                        else {
		                            rules.push({ rule: rule, path: [] });
		                        }
		                        break;
		                    }
		                }
		            }
		        });
		        this._lookups[key] = rules;
		        return rules;
		    },
		    genCSS: function (context, output) {
		        var i;
		        var j;
		        var charsetRuleNodes = [];
		        var ruleNodes = [];
		        var // Line number debugging
		        debugInfo;
		        var rule;
		        var path;
		        context.tabLevel = (context.tabLevel || 0);
		        if (!this.root) {
		            context.tabLevel++;
		        }
		        var tabRuleStr = context.compress ? '' : Array(context.tabLevel + 1).join('  ');
		        var tabSetStr = context.compress ? '' : Array(context.tabLevel).join('  ');
		        var sep;
		        var charsetNodeIndex = 0;
		        var importNodeIndex = 0;
		        for (i = 0; (rule = this.rules[i]); i++) {
		            if (rule instanceof comment_1.default) {
		                if (importNodeIndex === i) {
		                    importNodeIndex++;
		                }
		                ruleNodes.push(rule);
		            }
		            else if (rule.isCharset && rule.isCharset()) {
		                ruleNodes.splice(charsetNodeIndex, 0, rule);
		                charsetNodeIndex++;
		                importNodeIndex++;
		            }
		            else if (rule.type === 'Import') {
		                ruleNodes.splice(importNodeIndex, 0, rule);
		                importNodeIndex++;
		            }
		            else {
		                ruleNodes.push(rule);
		            }
		        }
		        ruleNodes = charsetRuleNodes.concat(ruleNodes);
		        // If this is the root node, we don't render
		        // a selector, or {}.
		        if (!this.root) {
		            debugInfo = debug_info_1.default(context, this, tabSetStr);
		            if (debugInfo) {
		                output.add(debugInfo);
		                output.add(tabSetStr);
		            }
		            var paths = this.paths;
		            var pathCnt = paths.length;
		            var pathSubCnt = void 0;
		            sep = context.compress ? ',' : (",\n" + tabSetStr);
		            for (i = 0; i < pathCnt; i++) {
		                path = paths[i];
		                if (!(pathSubCnt = path.length)) {
		                    continue;
		                }
		                if (i > 0) {
		                    output.add(sep);
		                }
		                context.firstSelector = true;
		                path[0].genCSS(context, output);
		                context.firstSelector = false;
		                for (j = 1; j < pathSubCnt; j++) {
		                    path[j].genCSS(context, output);
		                }
		            }
		            output.add((context.compress ? '{' : ' {\n') + tabRuleStr);
		        }
		        // Compile rules and rulesets
		        for (i = 0; (rule = ruleNodes[i]); i++) {
		            if (i + 1 === ruleNodes.length) {
		                context.lastRule = true;
		            }
		            var currentLastRule = context.lastRule;
		            if (rule.isRulesetLike(rule)) {
		                context.lastRule = false;
		            }
		            if (rule.genCSS) {
		                rule.genCSS(context, output);
		            }
		            else if (rule.value) {
		                output.add(rule.value.toString());
		            }
		            context.lastRule = currentLastRule;
		            if (!context.lastRule && rule.isVisible()) {
		                output.add(context.compress ? '' : ("\n" + tabRuleStr));
		            }
		            else {
		                context.lastRule = false;
		            }
		        }
		        if (!this.root) {
		            output.add((context.compress ? '}' : "\n" + tabSetStr + "}"));
		            context.tabLevel--;
		        }
		        if (!output.isEmpty() && !context.compress && this.firstRoot) {
		            output.add('\n');
		        }
		    },
		    joinSelectors: function (paths, context, selectors) {
		        for (var s = 0; s < selectors.length; s++) {
		            this.joinSelector(paths, context, selectors[s]);
		        }
		    },
		    joinSelector: function (paths, context, selector) {
		        function createParenthesis(elementsToPak, originalElement) {
		            var replacementParen, j;
		            if (elementsToPak.length === 0) {
		                replacementParen = new paren_1.default(elementsToPak[0]);
		            }
		            else {
		                var insideParent = new Array(elementsToPak.length);
		                for (j = 0; j < elementsToPak.length; j++) {
		                    insideParent[j] = new element_1.default(null, elementsToPak[j], originalElement.isVariable, originalElement._index, originalElement._fileInfo);
		                }
		                replacementParen = new paren_1.default(new selector_1.default(insideParent));
		            }
		            return replacementParen;
		        }
		        function createSelector(containedElement, originalElement) {
		            var element, selector;
		            element = new element_1.default(null, containedElement, originalElement.isVariable, originalElement._index, originalElement._fileInfo);
		            selector = new selector_1.default([element]);
		            return selector;
		        }
		        // joins selector path from `beginningPath` with selector path in `addPath`
		        // `replacedElement` contains element that is being replaced by `addPath`
		        // returns concatenated path
		        function addReplacementIntoPath(beginningPath, addPath, replacedElement, originalSelector) {
		            var newSelectorPath, lastSelector, newJoinedSelector;
		            // our new selector path
		            newSelectorPath = [];
		            // construct the joined selector - if & is the first thing this will be empty,
		            // if not newJoinedSelector will be the last set of elements in the selector
		            if (beginningPath.length > 0) {
		                newSelectorPath = utils.copyArray(beginningPath);
		                lastSelector = newSelectorPath.pop();
		                newJoinedSelector = originalSelector.createDerived(utils.copyArray(lastSelector.elements));
		            }
		            else {
		                newJoinedSelector = originalSelector.createDerived([]);
		            }
		            if (addPath.length > 0) {
		                // /deep/ is a CSS4 selector - (removed, so should deprecate)
		                // that is valid without anything in front of it
		                // so if the & does not have a combinator that is "" or " " then
		                // and there is a combinator on the parent, then grab that.
		                // this also allows + a { & .b { .a & { ... though not sure why you would want to do that
		                var combinator = replacedElement.combinator;
		                var parentEl = addPath[0].elements[0];
		                if (combinator.emptyOrWhitespace && !parentEl.combinator.emptyOrWhitespace) {
		                    combinator = parentEl.combinator;
		                }
		                // join the elements so far with the first part of the parent
		                newJoinedSelector.elements.push(new element_1.default(combinator, parentEl.value, replacedElement.isVariable, replacedElement._index, replacedElement._fileInfo));
		                newJoinedSelector.elements = newJoinedSelector.elements.concat(addPath[0].elements.slice(1));
		            }
		            // now add the joined selector - but only if it is not empty
		            if (newJoinedSelector.elements.length !== 0) {
		                newSelectorPath.push(newJoinedSelector);
		            }
		            // put together the parent selectors after the join (e.g. the rest of the parent)
		            if (addPath.length > 1) {
		                var restOfPath = addPath.slice(1);
		                restOfPath = restOfPath.map(function (selector) {
		                    return selector.createDerived(selector.elements, []);
		                });
		                newSelectorPath = newSelectorPath.concat(restOfPath);
		            }
		            return newSelectorPath;
		        }
		        // joins selector path from `beginningPath` with every selector path in `addPaths` array
		        // `replacedElement` contains element that is being replaced by `addPath`
		        // returns array with all concatenated paths
		        function addAllReplacementsIntoPath(beginningPath, addPaths, replacedElement, originalSelector, result) {
		            var j;
		            for (j = 0; j < beginningPath.length; j++) {
		                var newSelectorPath = addReplacementIntoPath(beginningPath[j], addPaths, replacedElement, originalSelector);
		                result.push(newSelectorPath);
		            }
		            return result;
		        }
		        function mergeElementsOnToSelectors(elements, selectors) {
		            var i, sel;
		            if (elements.length === 0) {
		                return;
		            }
		            if (selectors.length === 0) {
		                selectors.push([new selector_1.default(elements)]);
		                return;
		            }
		            for (i = 0; (sel = selectors[i]); i++) {
		                // if the previous thing in sel is a parent this needs to join on to it
		                if (sel.length > 0) {
		                    sel[sel.length - 1] = sel[sel.length - 1].createDerived(sel[sel.length - 1].elements.concat(elements));
		                }
		                else {
		                    sel.push(new selector_1.default(elements));
		                }
		            }
		        }
		        // replace all parent selectors inside `inSelector` by content of `context` array
		        // resulting selectors are returned inside `paths` array
		        // returns true if `inSelector` contained at least one parent selector
		        function replaceParentSelector(paths, context, inSelector) {
		            // The paths are [[Selector]]
		            // The first list is a list of comma separated selectors
		            // The inner list is a list of inheritance separated selectors
		            // e.g.
		            // .a, .b {
		            //   .c {
		            //   }
		            // }
		            // == [[.a] [.c]] [[.b] [.c]]
		            //
		            var i, j, k, currentElements, newSelectors, selectorsMultiplied, sel, el, hadParentSelector = false, length, lastSelector;
		            function findNestedSelector(element) {
		                var maybeSelector;
		                if (!(element.value instanceof paren_1.default)) {
		                    return null;
		                }
		                maybeSelector = element.value.value;
		                if (!(maybeSelector instanceof selector_1.default)) {
		                    return null;
		                }
		                return maybeSelector;
		            }
		            // the elements from the current selector so far
		            currentElements = [];
		            // the current list of new selectors to add to the path.
		            // We will build it up. We initiate it with one empty selector as we "multiply" the new selectors
		            // by the parents
		            newSelectors = [
		                []
		            ];
		            for (i = 0; (el = inSelector.elements[i]); i++) {
		                // non parent reference elements just get added
		                if (el.value !== '&') {
		                    var nestedSelector = findNestedSelector(el);
		                    if (nestedSelector != null) {
		                        // merge the current list of non parent selector elements
		                        // on to the current list of selectors to add
		                        mergeElementsOnToSelectors(currentElements, newSelectors);
		                        var nestedPaths = [];
		                        var replaced = void 0;
		                        var replacedNewSelectors = [];
		                        replaced = replaceParentSelector(nestedPaths, context, nestedSelector);
		                        hadParentSelector = hadParentSelector || replaced;
		                        // the nestedPaths array should have only one member - replaceParentSelector does not multiply selectors
		                        for (k = 0; k < nestedPaths.length; k++) {
		                            var replacementSelector = createSelector(createParenthesis(nestedPaths[k], el), el);
		                            addAllReplacementsIntoPath(newSelectors, [replacementSelector], el, inSelector, replacedNewSelectors);
		                        }
		                        newSelectors = replacedNewSelectors;
		                        currentElements = [];
		                    }
		                    else {
		                        currentElements.push(el);
		                    }
		                }
		                else {
		                    hadParentSelector = true;
		                    // the new list of selectors to add
		                    selectorsMultiplied = [];
		                    // merge the current list of non parent selector elements
		                    // on to the current list of selectors to add
		                    mergeElementsOnToSelectors(currentElements, newSelectors);
		                    // loop through our current selectors
		                    for (j = 0; j < newSelectors.length; j++) {
		                        sel = newSelectors[j];
		                        // if we don't have any parent paths, the & might be in a mixin so that it can be used
		                        // whether there are parents or not
		                        if (context.length === 0) {
		                            // the combinator used on el should now be applied to the next element instead so that
		                            // it is not lost
		                            if (sel.length > 0) {
		                                sel[0].elements.push(new element_1.default(el.combinator, '', el.isVariable, el._index, el._fileInfo));
		                            }
		                            selectorsMultiplied.push(sel);
		                        }
		                        else {
		                            // and the parent selectors
		                            for (k = 0; k < context.length; k++) {
		                                // We need to put the current selectors
		                                // then join the last selector's elements on to the parents selectors
		                                var newSelectorPath = addReplacementIntoPath(sel, context[k], el, inSelector);
		                                // add that to our new set of selectors
		                                selectorsMultiplied.push(newSelectorPath);
		                            }
		                        }
		                    }
		                    // our new selectors has been multiplied, so reset the state
		                    newSelectors = selectorsMultiplied;
		                    currentElements = [];
		                }
		            }
		            // if we have any elements left over (e.g. .a& .b == .b)
		            // add them on to all the current selectors
		            mergeElementsOnToSelectors(currentElements, newSelectors);
		            for (i = 0; i < newSelectors.length; i++) {
		                length = newSelectors[i].length;
		                if (length > 0) {
		                    paths.push(newSelectors[i]);
		                    lastSelector = newSelectors[i][length - 1];
		                    newSelectors[i][length - 1] = lastSelector.createDerived(lastSelector.elements, inSelector.extendList);
		                }
		            }
		            return hadParentSelector;
		        }
		        function deriveSelector(visibilityInfo, deriveFrom) {
		            var newSelector = deriveFrom.createDerived(deriveFrom.elements, deriveFrom.extendList, deriveFrom.evaldCondition);
		            newSelector.copyVisibilityInfo(visibilityInfo);
		            return newSelector;
		        }
		        // joinSelector code follows
		        var i, newPaths, hadParentSelector;
		        newPaths = [];
		        hadParentSelector = replaceParentSelector(newPaths, context, selector);
		        if (!hadParentSelector) {
		            if (context.length > 0) {
		                newPaths = [];
		                for (i = 0; i < context.length; i++) {
		                    var concatenated = context[i].map(deriveSelector.bind(this, selector.visibilityInfo()));
		                    concatenated.push(selector);
		                    newPaths.push(concatenated);
		                }
		            }
		            else {
		                newPaths = [[selector]];
		            }
		        }
		        for (i = 0; i < newPaths.length; i++) {
		            paths.push(newPaths[i]);
		        }
		    }
		});
		ruleset.default = Ruleset;
		
		return ruleset;
	}

	var hasRequiredAtrule;

	function requireAtrule () {
		if (hasRequiredAtrule) return atrule;
		hasRequiredAtrule = 1;
		Object.defineProperty(atrule, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var selector_1 = tslib_1.__importDefault(requireSelector());
		var ruleset_1 = tslib_1.__importDefault(requireRuleset());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var AtRule = function (name, value, rules, index, currentFileInfo, debugInfo, isRooted, visibilityInfo) {
		    var i;
		    this.name = name;
		    this.value = (value instanceof node_1.default) ? value : (value ? new anonymous_1.default(value) : value);
		    if (rules) {
		        if (Array.isArray(rules)) {
		            this.rules = rules;
		        }
		        else {
		            this.rules = [rules];
		            this.rules[0].selectors = (new selector_1.default([], null, null, index, currentFileInfo)).createEmptySelectors();
		        }
		        for (i = 0; i < this.rules.length; i++) {
		            this.rules[i].allowImports = true;
		        }
		        this.setParent(this.rules, this);
		    }
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.debugInfo = debugInfo;
		    this.isRooted = isRooted || false;
		    this.copyVisibilityInfo(visibilityInfo);
		    this.allowRoot = true;
		};
		AtRule.prototype = Object.assign(new node_1.default(), {
		    type: 'AtRule',
		    accept: function (visitor) {
		        var value = this.value, rules = this.rules;
		        if (rules) {
		            this.rules = visitor.visitArray(rules);
		        }
		        if (value) {
		            this.value = visitor.visit(value);
		        }
		    },
		    isRulesetLike: function () {
		        return this.rules || !this.isCharset();
		    },
		    isCharset: function () {
		        return '@charset' === this.name;
		    },
		    genCSS: function (context, output) {
		        var value = this.value, rules = this.rules;
		        output.add(this.name, this.fileInfo(), this.getIndex());
		        if (value) {
		            output.add(' ');
		            value.genCSS(context, output);
		        }
		        if (rules) {
		            this.outputRuleset(context, output, rules);
		        }
		        else {
		            output.add(';');
		        }
		    },
		    eval: function (context) {
		        var mediaPathBackup, mediaBlocksBackup, value = this.value, rules = this.rules;
		        // media stored inside other atrule should not bubble over it
		        // backpup media bubbling information
		        mediaPathBackup = context.mediaPath;
		        mediaBlocksBackup = context.mediaBlocks;
		        // deleted media bubbling information
		        context.mediaPath = [];
		        context.mediaBlocks = [];
		        if (value) {
		            value = value.eval(context);
		        }
		        if (rules) {
		            // assuming that there is only one rule at this point - that is how parser constructs the rule
		            rules = [rules[0].eval(context)];
		            rules[0].root = true;
		        }
		        // restore media bubbling information
		        context.mediaPath = mediaPathBackup;
		        context.mediaBlocks = mediaBlocksBackup;
		        return new AtRule(this.name, value, rules, this.getIndex(), this.fileInfo(), this.debugInfo, this.isRooted, this.visibilityInfo());
		    },
		    variable: function (name) {
		        if (this.rules) {
		            // assuming that there is only one rule at this point - that is how parser constructs the rule
		            return ruleset_1.default.prototype.variable.call(this.rules[0], name);
		        }
		    },
		    find: function () {
		        if (this.rules) {
		            // assuming that there is only one rule at this point - that is how parser constructs the rule
		            return ruleset_1.default.prototype.find.apply(this.rules[0], arguments);
		        }
		    },
		    rulesets: function () {
		        if (this.rules) {
		            // assuming that there is only one rule at this point - that is how parser constructs the rule
		            return ruleset_1.default.prototype.rulesets.apply(this.rules[0]);
		        }
		    },
		    outputRuleset: function (context, output, rules) {
		        var ruleCnt = rules.length;
		        var i;
		        context.tabLevel = (context.tabLevel | 0) + 1;
		        // Compressed
		        if (context.compress) {
		            output.add('{');
		            for (i = 0; i < ruleCnt; i++) {
		                rules[i].genCSS(context, output);
		            }
		            output.add('}');
		            context.tabLevel--;
		            return;
		        }
		        // Non-compressed
		        var tabSetStr = "\n" + Array(context.tabLevel).join('  '), tabRuleStr = tabSetStr + "  ";
		        if (!ruleCnt) {
		            output.add(" {" + tabSetStr + "}");
		        }
		        else {
		            output.add(" {" + tabRuleStr);
		            rules[0].genCSS(context, output);
		            for (i = 1; i < ruleCnt; i++) {
		                output.add(tabRuleStr);
		                rules[i].genCSS(context, output);
		            }
		            output.add(tabSetStr + "}");
		        }
		        context.tabLevel--;
		    }
		});
		atrule.default = AtRule;
		
		return atrule;
	}

	var detachedRuleset = {};

	var hasRequiredDetachedRuleset;

	function requireDetachedRuleset () {
		if (hasRequiredDetachedRuleset) return detachedRuleset;
		hasRequiredDetachedRuleset = 1;
		Object.defineProperty(detachedRuleset, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var contexts_1 = tslib_1.__importDefault(requireContexts());
		var utils = tslib_1.__importStar(requireUtils());
		var DetachedRuleset = function (ruleset, frames) {
		    this.ruleset = ruleset;
		    this.frames = frames;
		    this.setParent(this.ruleset, this);
		};
		DetachedRuleset.prototype = Object.assign(new node_1.default(), {
		    type: 'DetachedRuleset',
		    evalFirst: true,
		    accept: function (visitor) {
		        this.ruleset = visitor.visit(this.ruleset);
		    },
		    eval: function (context) {
		        var frames = this.frames || utils.copyArray(context.frames);
		        return new DetachedRuleset(this.ruleset, frames);
		    },
		    callEval: function (context) {
		        return this.ruleset.eval(this.frames ? new contexts_1.default.Eval(context, this.frames.concat(context.frames)) : context);
		    }
		});
		detachedRuleset.default = DetachedRuleset;
		
		return detachedRuleset;
	}

	var operation = {};

	var dimension = {};

	var unit = {};

	var hasRequiredUnit;

	function requireUnit () {
		if (hasRequiredUnit) return unit;
		hasRequiredUnit = 1;
		Object.defineProperty(unit, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var unit_conversions_1 = tslib_1.__importDefault(requireUnitConversions());
		var utils = tslib_1.__importStar(requireUtils());
		var Unit = function (numerator, denominator, backupUnit) {
		    this.numerator = numerator ? utils.copyArray(numerator).sort() : [];
		    this.denominator = denominator ? utils.copyArray(denominator).sort() : [];
		    if (backupUnit) {
		        this.backupUnit = backupUnit;
		    }
		    else if (numerator && numerator.length) {
		        this.backupUnit = numerator[0];
		    }
		};
		Unit.prototype = Object.assign(new node_1.default(), {
		    type: 'Unit',
		    clone: function () {
		        return new Unit(utils.copyArray(this.numerator), utils.copyArray(this.denominator), this.backupUnit);
		    },
		    genCSS: function (context, output) {
		        // Dimension checks the unit is singular and throws an error if in strict math mode.
		        var strictUnits = context && context.strictUnits;
		        if (this.numerator.length === 1) {
		            output.add(this.numerator[0]); // the ideal situation
		        }
		        else if (!strictUnits && this.backupUnit) {
		            output.add(this.backupUnit);
		        }
		        else if (!strictUnits && this.denominator.length) {
		            output.add(this.denominator[0]);
		        }
		    },
		    toString: function () {
		        var i, returnStr = this.numerator.join('*');
		        for (i = 0; i < this.denominator.length; i++) {
		            returnStr += "/" + this.denominator[i];
		        }
		        return returnStr;
		    },
		    compare: function (other) {
		        return this.is(other.toString()) ? 0 : undefined;
		    },
		    is: function (unitString) {
		        return this.toString().toUpperCase() === unitString.toUpperCase();
		    },
		    isLength: function () {
		        return RegExp('^(px|em|ex|ch|rem|in|cm|mm|pc|pt|ex|vw|vh|vmin|vmax)$', 'gi').test(this.toCSS());
		    },
		    isEmpty: function () {
		        return this.numerator.length === 0 && this.denominator.length === 0;
		    },
		    isSingular: function () {
		        return this.numerator.length <= 1 && this.denominator.length === 0;
		    },
		    map: function (callback) {
		        var i;
		        for (i = 0; i < this.numerator.length; i++) {
		            this.numerator[i] = callback(this.numerator[i], false);
		        }
		        for (i = 0; i < this.denominator.length; i++) {
		            this.denominator[i] = callback(this.denominator[i], true);
		        }
		    },
		    usedUnits: function () {
		        var group;
		        var result = {};
		        var mapUnit;
		        var groupName;
		        mapUnit = function (atomicUnit) {
		            /* jshint loopfunc:true */
		            if (group.hasOwnProperty(atomicUnit) && !result[groupName]) {
		                result[groupName] = atomicUnit;
		            }
		            return atomicUnit;
		        };
		        for (groupName in unit_conversions_1.default) {
		            if (unit_conversions_1.default.hasOwnProperty(groupName)) {
		                group = unit_conversions_1.default[groupName];
		                this.map(mapUnit);
		            }
		        }
		        return result;
		    },
		    cancel: function () {
		        var counter = {};
		        var atomicUnit;
		        var i;
		        for (i = 0; i < this.numerator.length; i++) {
		            atomicUnit = this.numerator[i];
		            counter[atomicUnit] = (counter[atomicUnit] || 0) + 1;
		        }
		        for (i = 0; i < this.denominator.length; i++) {
		            atomicUnit = this.denominator[i];
		            counter[atomicUnit] = (counter[atomicUnit] || 0) - 1;
		        }
		        this.numerator = [];
		        this.denominator = [];
		        for (atomicUnit in counter) {
		            if (counter.hasOwnProperty(atomicUnit)) {
		                var count = counter[atomicUnit];
		                if (count > 0) {
		                    for (i = 0; i < count; i++) {
		                        this.numerator.push(atomicUnit);
		                    }
		                }
		                else if (count < 0) {
		                    for (i = 0; i < -count; i++) {
		                        this.denominator.push(atomicUnit);
		                    }
		                }
		            }
		        }
		        this.numerator.sort();
		        this.denominator.sort();
		    }
		});
		unit.default = Unit;
		
		return unit;
	}

	var hasRequiredDimension;

	function requireDimension () {
		if (hasRequiredDimension) return dimension;
		hasRequiredDimension = 1;
		Object.defineProperty(dimension, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var unit_conversions_1 = tslib_1.__importDefault(requireUnitConversions());
		var unit_1 = tslib_1.__importDefault(requireUnit());
		var color_1 = tslib_1.__importDefault(requireColor$1());
		//
		// A number with a unit
		//
		var Dimension = function (value, unit) {
		    this.value = parseFloat(value);
		    if (isNaN(this.value)) {
		        throw new Error('Dimension is not a number.');
		    }
		    this.unit = (unit && unit instanceof unit_1.default) ? unit :
		        new unit_1.default(unit ? [unit] : undefined);
		    this.setParent(this.unit, this);
		};
		Dimension.prototype = Object.assign(new node_1.default(), {
		    type: 'Dimension',
		    accept: function (visitor) {
		        this.unit = visitor.visit(this.unit);
		    },
		    eval: function (context) {
		        return this;
		    },
		    toColor: function () {
		        return new color_1.default([this.value, this.value, this.value]);
		    },
		    genCSS: function (context, output) {
		        if ((context && context.strictUnits) && !this.unit.isSingular()) {
		            throw new Error("Multiple units in dimension. Correct the units or use the unit function. Bad unit: " + this.unit.toString());
		        }
		        var value = this.fround(context, this.value);
		        var strValue = String(value);
		        if (value !== 0 && value < 0.000001 && value > -0.000001) {
		            // would be output 1e-6 etc.
		            strValue = value.toFixed(20).replace(/0+$/, '');
		        }
		        if (context && context.compress) {
		            // Zero values doesn't need a unit
		            if (value === 0 && this.unit.isLength()) {
		                output.add(strValue);
		                return;
		            }
		            // Float values doesn't need a leading zero
		            if (value > 0 && value < 1) {
		                strValue = (strValue).substr(1);
		            }
		        }
		        output.add(strValue);
		        this.unit.genCSS(context, output);
		    },
		    // In an operation between two Dimensions,
		    // we default to the first Dimension's unit,
		    // so `1px + 2` will yield `3px`.
		    operate: function (context, op, other) {
		        /* jshint noempty:false */
		        var value = this._operate(context, op, this.value, other.value);
		        var unit = this.unit.clone();
		        if (op === '+' || op === '-') {
		            if (unit.numerator.length === 0 && unit.denominator.length === 0) {
		                unit = other.unit.clone();
		                if (this.unit.backupUnit) {
		                    unit.backupUnit = this.unit.backupUnit;
		                }
		            }
		            else if (other.unit.numerator.length === 0 && unit.denominator.length === 0) ;
		            else {
		                other = other.convertTo(this.unit.usedUnits());
		                if (context.strictUnits && other.unit.toString() !== unit.toString()) {
		                    throw new Error("Incompatible units. Change the units or use the unit function. "
		                        + ("Bad units: '" + unit.toString() + "' and '" + other.unit.toString() + "'."));
		                }
		                value = this._operate(context, op, this.value, other.value);
		            }
		        }
		        else if (op === '*') {
		            unit.numerator = unit.numerator.concat(other.unit.numerator).sort();
		            unit.denominator = unit.denominator.concat(other.unit.denominator).sort();
		            unit.cancel();
		        }
		        else if (op === '/') {
		            unit.numerator = unit.numerator.concat(other.unit.denominator).sort();
		            unit.denominator = unit.denominator.concat(other.unit.numerator).sort();
		            unit.cancel();
		        }
		        return new Dimension(value, unit);
		    },
		    compare: function (other) {
		        var a, b;
		        if (!(other instanceof Dimension)) {
		            return undefined;
		        }
		        if (this.unit.isEmpty() || other.unit.isEmpty()) {
		            a = this;
		            b = other;
		        }
		        else {
		            a = this.unify();
		            b = other.unify();
		            if (a.unit.compare(b.unit) !== 0) {
		                return undefined;
		            }
		        }
		        return node_1.default.numericCompare(a.value, b.value);
		    },
		    unify: function () {
		        return this.convertTo({ length: 'px', duration: 's', angle: 'rad' });
		    },
		    convertTo: function (conversions) {
		        var value = this.value;
		        var unit = this.unit.clone();
		        var i;
		        var groupName;
		        var group;
		        var targetUnit;
		        var derivedConversions = {};
		        var applyUnit;
		        if (typeof conversions === 'string') {
		            for (i in unit_conversions_1.default) {
		                if (unit_conversions_1.default[i].hasOwnProperty(conversions)) {
		                    derivedConversions = {};
		                    derivedConversions[i] = conversions;
		                }
		            }
		            conversions = derivedConversions;
		        }
		        applyUnit = function (atomicUnit, denominator) {
		            /* jshint loopfunc:true */
		            if (group.hasOwnProperty(atomicUnit)) {
		                if (denominator) {
		                    value = value / (group[atomicUnit] / group[targetUnit]);
		                }
		                else {
		                    value = value * (group[atomicUnit] / group[targetUnit]);
		                }
		                return targetUnit;
		            }
		            return atomicUnit;
		        };
		        for (groupName in conversions) {
		            if (conversions.hasOwnProperty(groupName)) {
		                targetUnit = conversions[groupName];
		                group = unit_conversions_1.default[groupName];
		                unit.map(applyUnit);
		            }
		        }
		        unit.cancel();
		        return new Dimension(value, unit);
		    }
		});
		dimension.default = Dimension;
		
		return dimension;
	}

	var hasRequiredOperation;

	function requireOperation () {
		if (hasRequiredOperation) return operation;
		hasRequiredOperation = 1;
		Object.defineProperty(operation, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var color_1 = tslib_1.__importDefault(requireColor$1());
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var Constants = tslib_1.__importStar(requireConstants());
		var MATH = Constants.Math;
		var Operation = function (op, operands, isSpaced) {
		    this.op = op.trim();
		    this.operands = operands;
		    this.isSpaced = isSpaced;
		};
		Operation.prototype = Object.assign(new node_1.default(), {
		    type: 'Operation',
		    accept: function (visitor) {
		        this.operands = visitor.visitArray(this.operands);
		    },
		    eval: function (context) {
		        var a = this.operands[0].eval(context), b = this.operands[1].eval(context), op;
		        if (context.isMathOn(this.op)) {
		            op = this.op === './' ? '/' : this.op;
		            if (a instanceof dimension_1.default && b instanceof color_1.default) {
		                a = a.toColor();
		            }
		            if (b instanceof dimension_1.default && a instanceof color_1.default) {
		                b = b.toColor();
		            }
		            if (!a.operate || !b.operate) {
		                if ((a instanceof Operation || b instanceof Operation)
		                    && a.op === '/' && context.math === MATH.PARENS_DIVISION) {
		                    return new Operation(this.op, [a, b], this.isSpaced);
		                }
		                throw { type: 'Operation',
		                    message: 'Operation on an invalid type' };
		            }
		            return a.operate(context, op, b);
		        }
		        else {
		            return new Operation(this.op, [a, b], this.isSpaced);
		        }
		    },
		    genCSS: function (context, output) {
		        this.operands[0].genCSS(context, output);
		        if (this.isSpaced) {
		            output.add(' ');
		        }
		        output.add(this.op);
		        if (this.isSpaced) {
		            output.add(' ');
		        }
		        this.operands[1].genCSS(context, output);
		    }
		});
		operation.default = Operation;
		
		return operation;
	}

	var variable = {};

	var call = {};

	var functionCaller = {};

	var expression = {};

	var hasRequiredExpression;

	function requireExpression () {
		if (hasRequiredExpression) return expression;
		hasRequiredExpression = 1;
		Object.defineProperty(expression, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var paren_1 = tslib_1.__importDefault(requireParen());
		var comment_1 = tslib_1.__importDefault(requireComment());
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var Expression = function (value, noSpacing) {
		    this.value = value;
		    this.noSpacing = noSpacing;
		    if (!value) {
		        throw new Error('Expression requires an array parameter');
		    }
		};
		Expression.prototype = Object.assign(new node_1.default(), {
		    type: 'Expression',
		    accept: function (visitor) {
		        this.value = visitor.visitArray(this.value);
		    },
		    eval: function (context) {
		        var returnValue;
		        var mathOn = context.isMathOn();
		        var inParenthesis = this.parens;
		        var doubleParen = false;
		        if (inParenthesis) {
		            context.inParenthesis();
		        }
		        if (this.value.length > 1) {
		            returnValue = new Expression(this.value.map(function (e) {
		                if (!e.eval) {
		                    return e;
		                }
		                return e.eval(context);
		            }), this.noSpacing);
		        }
		        else if (this.value.length === 1) {
		            if (this.value[0].parens && !this.value[0].parensInOp && !context.inCalc) {
		                doubleParen = true;
		            }
		            returnValue = this.value[0].eval(context);
		        }
		        else {
		            returnValue = this;
		        }
		        if (inParenthesis) {
		            context.outOfParenthesis();
		        }
		        if (this.parens && this.parensInOp && !mathOn && !doubleParen
		            && (!(returnValue instanceof dimension_1.default))) {
		            returnValue = new paren_1.default(returnValue);
		        }
		        return returnValue;
		    },
		    genCSS: function (context, output) {
		        for (var i = 0; i < this.value.length; i++) {
		            this.value[i].genCSS(context, output);
		            if (!this.noSpacing && i + 1 < this.value.length) {
		                output.add(' ');
		            }
		        }
		    },
		    throwAwayComments: function () {
		        this.value = this.value.filter(function (v) {
		            return !(v instanceof comment_1.default);
		        });
		    }
		});
		expression.default = Expression;
		
		return expression;
	}

	var hasRequiredFunctionCaller;

	function requireFunctionCaller () {
		if (hasRequiredFunctionCaller) return functionCaller;
		hasRequiredFunctionCaller = 1;
		Object.defineProperty(functionCaller, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var expression_1 = tslib_1.__importDefault(requireExpression());
		var functionCaller$1 = /** @class */ (function () {
		    function functionCaller(name, context, index, currentFileInfo) {
		        this.name = name.toLowerCase();
		        this.index = index;
		        this.context = context;
		        this.currentFileInfo = currentFileInfo;
		        this.func = context.frames[0].functionRegistry.get(this.name);
		    }
		    functionCaller.prototype.isValid = function () {
		        return Boolean(this.func);
		    };
		    functionCaller.prototype.call = function (args) {
		        var _this = this;
		        if (!(Array.isArray(args))) {
		            args = [args];
		        }
		        var evalArgs = this.func.evalArgs;
		        if (evalArgs !== false) {
		            args = args.map(function (a) { return a.eval(_this.context); });
		        }
		        var commentFilter = function (item) { return !(item.type === 'Comment'); };
		        // This code is terrible and should be replaced as per this issue...
		        // https://github.com/less/less.js/issues/2477
		        args = args
		            .filter(commentFilter)
		            .map(function (item) {
		            if (item.type === 'Expression') {
		                var subNodes = item.value.filter(commentFilter);
		                if (subNodes.length === 1) {
		                    // https://github.com/less/less.js/issues/3616
		                    if (item.parens && subNodes[0].op === '/') {
		                        return item;
		                    }
		                    return subNodes[0];
		                }
		                else {
		                    return new expression_1.default(subNodes);
		                }
		            }
		            return item;
		        });
		        if (evalArgs === false) {
		            return this.func.apply(this, tslib_1.__spreadArray([this.context], args));
		        }
		        return this.func.apply(this, args);
		    };
		    return functionCaller;
		}());
		functionCaller.default = functionCaller$1;
		
		return functionCaller;
	}

	var hasRequiredCall;

	function requireCall () {
		if (hasRequiredCall) return call;
		hasRequiredCall = 1;
		Object.defineProperty(call, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var function_caller_1 = tslib_1.__importDefault(requireFunctionCaller());
		//
		// A function call node.
		//
		var Call = function (name, args, index, currentFileInfo) {
		    this.name = name;
		    this.args = args;
		    this.calc = name === 'calc';
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		};
		Call.prototype = Object.assign(new node_1.default(), {
		    type: 'Call',
		    accept: function (visitor) {
		        if (this.args) {
		            this.args = visitor.visitArray(this.args);
		        }
		    },
		    //
		    // When evaluating a function call,
		    // we either find the function in the functionRegistry,
		    // in which case we call it, passing the  evaluated arguments,
		    // if this returns null or we cannot find the function, we
		    // simply print it out as it appeared originally [2].
		    //
		    // The reason why we evaluate the arguments, is in the case where
		    // we try to pass a variable to a function, like: `saturate(@color)`.
		    // The function should receive the value, not the variable.
		    //
		    eval: function (context) {
		        var _this = this;
		        /**
		         * Turn off math for calc(), and switch back on for evaluating nested functions
		         */
		        var currentMathContext = context.mathOn;
		        context.mathOn = !this.calc;
		        if (this.calc || context.inCalc) {
		            context.enterCalc();
		        }
		        var exitCalc = function () {
		            if (_this.calc || context.inCalc) {
		                context.exitCalc();
		            }
		            context.mathOn = currentMathContext;
		        };
		        var result;
		        var funcCaller = new function_caller_1.default(this.name, context, this.getIndex(), this.fileInfo());
		        if (funcCaller.isValid()) {
		            try {
		                result = funcCaller.call(this.args);
		                exitCalc();
		            }
		            catch (e) {
		                if (e.hasOwnProperty('line') && e.hasOwnProperty('column')) {
		                    throw e;
		                }
		                throw {
		                    type: e.type || 'Runtime',
		                    message: "Error evaluating function `" + this.name + "`" + (e.message ? ": " + e.message : ''),
		                    index: this.getIndex(),
		                    filename: this.fileInfo().filename,
		                    line: e.lineNumber,
		                    column: e.columnNumber
		                };
		            }
		        }
		        if (result !== null && result !== undefined) {
		            // Results that that are not nodes are cast as Anonymous nodes
		            // Falsy values or booleans are returned as empty nodes
		            if (!(result instanceof node_1.default)) {
		                if (!result || result === true) {
		                    result = new anonymous_1.default(null);
		                }
		                else {
		                    result = new anonymous_1.default(result.toString());
		                }
		            }
		            result._index = this._index;
		            result._fileInfo = this._fileInfo;
		            return result;
		        }
		        var args = this.args.map(function (a) { return a.eval(context); });
		        exitCalc();
		        return new Call(this.name, args, this.getIndex(), this.fileInfo());
		    },
		    genCSS: function (context, output) {
		        output.add(this.name + "(", this.fileInfo(), this.getIndex());
		        for (var i = 0; i < this.args.length; i++) {
		            this.args[i].genCSS(context, output);
		            if (i + 1 < this.args.length) {
		                output.add(', ');
		            }
		        }
		        output.add(')');
		    }
		});
		call.default = Call;
		
		return call;
	}

	var hasRequiredVariable;

	function requireVariable () {
		if (hasRequiredVariable) return variable;
		hasRequiredVariable = 1;
		Object.defineProperty(variable, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var call_1 = tslib_1.__importDefault(requireCall());
		var Variable = function (name, index, currentFileInfo) {
		    this.name = name;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		};
		Variable.prototype = Object.assign(new node_1.default(), {
		    type: 'Variable',
		    eval: function (context) {
		        var variable, name = this.name;
		        if (name.indexOf('@@') === 0) {
		            name = "@" + new Variable(name.slice(1), this.getIndex(), this.fileInfo()).eval(context).value;
		        }
		        if (this.evaluating) {
		            throw { type: 'Name',
		                message: "Recursive variable definition for " + name,
		                filename: this.fileInfo().filename,
		                index: this.getIndex() };
		        }
		        this.evaluating = true;
		        variable = this.find(context.frames, function (frame) {
		            var v = frame.variable(name);
		            if (v) {
		                if (v.important) {
		                    var importantScope = context.importantScope[context.importantScope.length - 1];
		                    importantScope.important = v.important;
		                }
		                // If in calc, wrap vars in a function call to cascade evaluate args first
		                if (context.inCalc) {
		                    return (new call_1.default('_SELF', [v.value])).eval(context);
		                }
		                else {
		                    return v.value.eval(context);
		                }
		            }
		        });
		        if (variable) {
		            this.evaluating = false;
		            return variable;
		        }
		        else {
		            throw { type: 'Name',
		                message: "variable " + name + " is undefined",
		                filename: this.fileInfo().filename,
		                index: this.getIndex() };
		        }
		    },
		    find: function (obj, fun) {
		        for (var i = 0, r = void 0; i < obj.length; i++) {
		            r = fun.call(obj, obj[i]);
		            if (r) {
		                return r;
		            }
		        }
		        return null;
		    }
		});
		variable.default = Variable;
		
		return variable;
	}

	var property = {};

	var hasRequiredProperty;

	function requireProperty () {
		if (hasRequiredProperty) return property;
		hasRequiredProperty = 1;
		Object.defineProperty(property, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var declaration_1 = tslib_1.__importDefault(requireDeclaration());
		var Property = function (name, index, currentFileInfo) {
		    this.name = name;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		};
		Property.prototype = Object.assign(new node_1.default(), {
		    type: 'Property',
		    eval: function (context) {
		        var property;
		        var name = this.name;
		        // TODO: shorten this reference
		        var mergeRules = context.pluginManager.less.visitors.ToCSSVisitor.prototype._mergeRules;
		        if (this.evaluating) {
		            throw { type: 'Name',
		                message: "Recursive property reference for " + name,
		                filename: this.fileInfo().filename,
		                index: this.getIndex() };
		        }
		        this.evaluating = true;
		        property = this.find(context.frames, function (frame) {
		            var v;
		            var vArr = frame.property(name);
		            if (vArr) {
		                for (var i = 0; i < vArr.length; i++) {
		                    v = vArr[i];
		                    vArr[i] = new declaration_1.default(v.name, v.value, v.important, v.merge, v.index, v.currentFileInfo, v.inline, v.variable);
		                }
		                mergeRules(vArr);
		                v = vArr[vArr.length - 1];
		                if (v.important) {
		                    var importantScope = context.importantScope[context.importantScope.length - 1];
		                    importantScope.important = v.important;
		                }
		                v = v.value.eval(context);
		                return v;
		            }
		        });
		        if (property) {
		            this.evaluating = false;
		            return property;
		        }
		        else {
		            throw { type: 'Name',
		                message: "Property '" + name + "' is undefined",
		                filename: this.currentFileInfo.filename,
		                index: this.index };
		        }
		    },
		    find: function (obj, fun) {
		        for (var i = 0, r = void 0; i < obj.length; i++) {
		            r = fun.call(obj, obj[i]);
		            if (r) {
		                return r;
		            }
		        }
		        return null;
		    }
		});
		property.default = Property;
		
		return property;
	}

	var attribute = {};

	var hasRequiredAttribute;

	function requireAttribute () {
		if (hasRequiredAttribute) return attribute;
		hasRequiredAttribute = 1;
		Object.defineProperty(attribute, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var Attribute = function (key, op, value, cif) {
		    this.key = key;
		    this.op = op;
		    this.value = value;
		    this.cif = cif;
		};
		Attribute.prototype = Object.assign(new node_1.default(), {
		    type: 'Attribute',
		    eval: function (context) {
		        return new Attribute(this.key.eval ? this.key.eval(context) : this.key, this.op, (this.value && this.value.eval) ? this.value.eval(context) : this.value, this.cif);
		    },
		    genCSS: function (context, output) {
		        output.add(this.toCSS(context));
		    },
		    toCSS: function (context) {
		        var value = this.key.toCSS ? this.key.toCSS(context) : this.key;
		        if (this.op) {
		            value += this.op;
		            value += (this.value.toCSS ? this.value.toCSS(context) : this.value);
		        }
		        if (this.cif) {
		            value = value + " " + this.cif;
		        }
		        return "[" + value + "]";
		    }
		});
		attribute.default = Attribute;
		
		return attribute;
	}

	var quoted = {};

	var hasRequiredQuoted;

	function requireQuoted () {
		if (hasRequiredQuoted) return quoted;
		hasRequiredQuoted = 1;
		Object.defineProperty(quoted, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var variable_1 = tslib_1.__importDefault(requireVariable());
		var property_1 = tslib_1.__importDefault(requireProperty());
		var Quoted = function (str, content, escaped, index, currentFileInfo) {
		    this.escaped = (escaped == null) ? true : escaped;
		    this.value = content || '';
		    this.quote = str.charAt(0);
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.variableRegex = /@\{([\w-]+)\}/g;
		    this.propRegex = /\$\{([\w-]+)\}/g;
		    this.allowRoot = escaped;
		};
		Quoted.prototype = Object.assign(new node_1.default(), {
		    type: 'Quoted',
		    genCSS: function (context, output) {
		        if (!this.escaped) {
		            output.add(this.quote, this.fileInfo(), this.getIndex());
		        }
		        output.add(this.value);
		        if (!this.escaped) {
		            output.add(this.quote);
		        }
		    },
		    containsVariables: function () {
		        return this.value.match(this.variableRegex);
		    },
		    eval: function (context) {
		        var that = this;
		        var value = this.value;
		        var variableReplacement = function (_, name) {
		            var v = new variable_1.default("@" + name, that.getIndex(), that.fileInfo()).eval(context, true);
		            return (v instanceof Quoted) ? v.value : v.toCSS();
		        };
		        var propertyReplacement = function (_, name) {
		            var v = new property_1.default("$" + name, that.getIndex(), that.fileInfo()).eval(context, true);
		            return (v instanceof Quoted) ? v.value : v.toCSS();
		        };
		        function iterativeReplace(value, regexp, replacementFnc) {
		            var evaluatedValue = value;
		            do {
		                value = evaluatedValue.toString();
		                evaluatedValue = value.replace(regexp, replacementFnc);
		            } while (value !== evaluatedValue);
		            return evaluatedValue;
		        }
		        value = iterativeReplace(value, this.variableRegex, variableReplacement);
		        value = iterativeReplace(value, this.propRegex, propertyReplacement);
		        return new Quoted(this.quote + value + this.quote, value, this.escaped, this.getIndex(), this.fileInfo());
		    },
		    compare: function (other) {
		        // when comparing quoted strings allow the quote to differ
		        if (other.type === 'Quoted' && !this.escaped && !other.escaped) {
		            return node_1.default.numericCompare(this.value, other.value);
		        }
		        else {
		            return other.toCSS && this.toCSS() === other.toCSS() ? 0 : undefined;
		        }
		    }
		});
		quoted.default = Quoted;
		
		return quoted;
	}

	var url = {};

	var hasRequiredUrl;

	function requireUrl () {
		if (hasRequiredUrl) return url;
		hasRequiredUrl = 1;
		Object.defineProperty(url, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		function escapePath(path) {
		    return path.replace(/[\(\)'"\s]/g, function (match) { return "\\" + match; });
		}
		var URL = function (val, index, currentFileInfo, isEvald) {
		    this.value = val;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.isEvald = isEvald;
		};
		URL.prototype = Object.assign(new node_1.default(), {
		    type: 'Url',
		    accept: function (visitor) {
		        this.value = visitor.visit(this.value);
		    },
		    genCSS: function (context, output) {
		        output.add('url(');
		        this.value.genCSS(context, output);
		        output.add(')');
		    },
		    eval: function (context) {
		        var val = this.value.eval(context);
		        var rootpath;
		        if (!this.isEvald) {
		            // Add the rootpath if the URL requires a rewrite
		            rootpath = this.fileInfo() && this.fileInfo().rootpath;
		            if (typeof rootpath === 'string' &&
		                typeof val.value === 'string' &&
		                context.pathRequiresRewrite(val.value)) {
		                if (!val.quote) {
		                    rootpath = escapePath(rootpath);
		                }
		                val.value = context.rewritePath(val.value, rootpath);
		            }
		            else {
		                val.value = context.normalizePath(val.value);
		            }
		            // Add url args if enabled
		            if (context.urlArgs) {
		                if (!val.value.match(/^\s*data:/)) {
		                    var delimiter = val.value.indexOf('?') === -1 ? '?' : '&';
		                    var urlArgs = delimiter + context.urlArgs;
		                    if (val.value.indexOf('#') !== -1) {
		                        val.value = val.value.replace('#', urlArgs + "#");
		                    }
		                    else {
		                        val.value += urlArgs;
		                    }
		                }
		            }
		        }
		        return new URL(val, this.getIndex(), this.fileInfo(), true);
		    }
		});
		url.default = URL;
		
		return url;
	}

	var _import = {};

	var media = {};

	var hasRequiredMedia;

	function requireMedia () {
		if (hasRequiredMedia) return media;
		hasRequiredMedia = 1;
		Object.defineProperty(media, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var ruleset_1 = tslib_1.__importDefault(requireRuleset());
		var value_1 = tslib_1.__importDefault(requireValue());
		var selector_1 = tslib_1.__importDefault(requireSelector());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var expression_1 = tslib_1.__importDefault(requireExpression());
		var atrule_1 = tslib_1.__importDefault(requireAtrule());
		var utils = tslib_1.__importStar(requireUtils());
		var Media = function (value, features, index, currentFileInfo, visibilityInfo) {
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    var selectors = (new selector_1.default([], null, null, this._index, this._fileInfo)).createEmptySelectors();
		    this.features = new value_1.default(features);
		    this.rules = [new ruleset_1.default(selectors, value)];
		    this.rules[0].allowImports = true;
		    this.copyVisibilityInfo(visibilityInfo);
		    this.allowRoot = true;
		    this.setParent(selectors, this);
		    this.setParent(this.features, this);
		    this.setParent(this.rules, this);
		};
		Media.prototype = Object.assign(new atrule_1.default(), {
		    type: 'Media',
		    isRulesetLike: function () {
		        return true;
		    },
		    accept: function (visitor) {
		        if (this.features) {
		            this.features = visitor.visit(this.features);
		        }
		        if (this.rules) {
		            this.rules = visitor.visitArray(this.rules);
		        }
		    },
		    genCSS: function (context, output) {
		        output.add('@media ', this._fileInfo, this._index);
		        this.features.genCSS(context, output);
		        this.outputRuleset(context, output, this.rules);
		    },
		    eval: function (context) {
		        if (!context.mediaBlocks) {
		            context.mediaBlocks = [];
		            context.mediaPath = [];
		        }
		        var media = new Media(null, [], this._index, this._fileInfo, this.visibilityInfo());
		        if (this.debugInfo) {
		            this.rules[0].debugInfo = this.debugInfo;
		            media.debugInfo = this.debugInfo;
		        }
		        media.features = this.features.eval(context);
		        context.mediaPath.push(media);
		        context.mediaBlocks.push(media);
		        this.rules[0].functionRegistry = context.frames[0].functionRegistry.inherit();
		        context.frames.unshift(this.rules[0]);
		        media.rules = [this.rules[0].eval(context)];
		        context.frames.shift();
		        context.mediaPath.pop();
		        return context.mediaPath.length === 0 ? media.evalTop(context) :
		            media.evalNested(context);
		    },
		    evalTop: function (context) {
		        var result = this;
		        // Render all dependent Media blocks.
		        if (context.mediaBlocks.length > 1) {
		            var selectors = (new selector_1.default([], null, null, this.getIndex(), this.fileInfo())).createEmptySelectors();
		            result = new ruleset_1.default(selectors, context.mediaBlocks);
		            result.multiMedia = true;
		            result.copyVisibilityInfo(this.visibilityInfo());
		            this.setParent(result, this);
		        }
		        delete context.mediaBlocks;
		        delete context.mediaPath;
		        return result;
		    },
		    evalNested: function (context) {
		        var i;
		        var value;
		        var path = context.mediaPath.concat([this]);
		        // Extract the media-query conditions separated with `,` (OR).
		        for (i = 0; i < path.length; i++) {
		            value = path[i].features instanceof value_1.default ?
		                path[i].features.value : path[i].features;
		            path[i] = Array.isArray(value) ? value : [value];
		        }
		        // Trace all permutations to generate the resulting media-query.
		        //
		        // (a, b and c) with nested (d, e) ->
		        //    a and d
		        //    a and e
		        //    b and c and d
		        //    b and c and e
		        this.features = new value_1.default(this.permute(path).map(function (path) {
		            path = path.map(function (fragment) { return fragment.toCSS ? fragment : new anonymous_1.default(fragment); });
		            for (i = path.length - 1; i > 0; i--) {
		                path.splice(i, 0, new anonymous_1.default('and'));
		            }
		            return new expression_1.default(path);
		        }));
		        this.setParent(this.features, this);
		        // Fake a tree-node that doesn't output anything.
		        return new ruleset_1.default([], []);
		    },
		    permute: function (arr) {
		        if (arr.length === 0) {
		            return [];
		        }
		        else if (arr.length === 1) {
		            return arr[0];
		        }
		        else {
		            var result = [];
		            var rest = this.permute(arr.slice(1));
		            for (var i = 0; i < rest.length; i++) {
		                for (var j = 0; j < arr[0].length; j++) {
		                    result.push([arr[0][j]].concat(rest[i]));
		                }
		            }
		            return result;
		        }
		    },
		    bubbleSelectors: function (selectors) {
		        if (!selectors) {
		            return;
		        }
		        this.rules = [new ruleset_1.default(utils.copyArray(selectors), [this.rules[0]])];
		        this.setParent(this.rules, this);
		    }
		});
		media.default = Media;
		
		return media;
	}

	var hasRequired_import;

	function require_import () {
		if (hasRequired_import) return _import;
		hasRequired_import = 1;
		Object.defineProperty(_import, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var media_1 = tslib_1.__importDefault(requireMedia());
		var url_1 = tslib_1.__importDefault(requireUrl());
		var quoted_1 = tslib_1.__importDefault(requireQuoted());
		var ruleset_1 = tslib_1.__importDefault(requireRuleset());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var utils = tslib_1.__importStar(requireUtils());
		var less_error_1 = tslib_1.__importDefault(requireLessError());
		//
		// CSS @import node
		//
		// The general strategy here is that we don't want to wait
		// for the parsing to be completed, before we start importing
		// the file. That's because in the context of a browser,
		// most of the time will be spent waiting for the server to respond.
		//
		// On creation, we push the import path to our import queue, though
		// `import,push`, we also pass it a callback, which it'll call once
		// the file has been fetched, and parsed.
		//
		var Import = function (path, features, options, index, currentFileInfo, visibilityInfo) {
		    this.options = options;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.path = path;
		    this.features = features;
		    this.allowRoot = true;
		    if (this.options.less !== undefined || this.options.inline) {
		        this.css = !this.options.less || this.options.inline;
		    }
		    else {
		        var pathValue = this.getPath();
		        if (pathValue && /[#\.\&\?]css([\?;].*)?$/.test(pathValue)) {
		            this.css = true;
		        }
		    }
		    this.copyVisibilityInfo(visibilityInfo);
		    this.setParent(this.features, this);
		    this.setParent(this.path, this);
		};
		Import.prototype = Object.assign(new node_1.default(), {
		    type: 'Import',
		    accept: function (visitor) {
		        if (this.features) {
		            this.features = visitor.visit(this.features);
		        }
		        this.path = visitor.visit(this.path);
		        if (!this.options.isPlugin && !this.options.inline && this.root) {
		            this.root = visitor.visit(this.root);
		        }
		    },
		    genCSS: function (context, output) {
		        if (this.css && this.path._fileInfo.reference === undefined) {
		            output.add('@import ', this._fileInfo, this._index);
		            this.path.genCSS(context, output);
		            if (this.features) {
		                output.add(' ');
		                this.features.genCSS(context, output);
		            }
		            output.add(';');
		        }
		    },
		    getPath: function () {
		        return (this.path instanceof url_1.default) ?
		            this.path.value.value : this.path.value;
		    },
		    isVariableImport: function () {
		        var path = this.path;
		        if (path instanceof url_1.default) {
		            path = path.value;
		        }
		        if (path instanceof quoted_1.default) {
		            return path.containsVariables();
		        }
		        return true;
		    },
		    evalForImport: function (context) {
		        var path = this.path;
		        if (path instanceof url_1.default) {
		            path = path.value;
		        }
		        return new Import(path.eval(context), this.features, this.options, this._index, this._fileInfo, this.visibilityInfo());
		    },
		    evalPath: function (context) {
		        var path = this.path.eval(context);
		        var fileInfo = this._fileInfo;
		        if (!(path instanceof url_1.default)) {
		            // Add the rootpath if the URL requires a rewrite
		            var pathValue = path.value;
		            if (fileInfo &&
		                pathValue &&
		                context.pathRequiresRewrite(pathValue)) {
		                path.value = context.rewritePath(pathValue, fileInfo.rootpath);
		            }
		            else {
		                path.value = context.normalizePath(path.value);
		            }
		        }
		        return path;
		    },
		    eval: function (context) {
		        var result = this.doEval(context);
		        if (this.options.reference || this.blocksVisibility()) {
		            if (result.length || result.length === 0) {
		                result.forEach(function (node) {
		                    node.addVisibilityBlock();
		                });
		            }
		            else {
		                result.addVisibilityBlock();
		            }
		        }
		        return result;
		    },
		    doEval: function (context) {
		        var ruleset;
		        var registry;
		        var features = this.features && this.features.eval(context);
		        if (this.options.isPlugin) {
		            if (this.root && this.root.eval) {
		                try {
		                    this.root.eval(context);
		                }
		                catch (e) {
		                    e.message = 'Plugin error during evaluation';
		                    throw new less_error_1.default(e, this.root.imports, this.root.filename);
		                }
		            }
		            registry = context.frames[0] && context.frames[0].functionRegistry;
		            if (registry && this.root && this.root.functions) {
		                registry.addMultiple(this.root.functions);
		            }
		            return [];
		        }
		        if (this.skip) {
		            if (typeof this.skip === 'function') {
		                this.skip = this.skip();
		            }
		            if (this.skip) {
		                return [];
		            }
		        }
		        if (this.options.inline) {
		            var contents = new anonymous_1.default(this.root, 0, {
		                filename: this.importedFilename,
		                reference: this.path._fileInfo && this.path._fileInfo.reference
		            }, true, true);
		            return this.features ? new media_1.default([contents], this.features.value) : [contents];
		        }
		        else if (this.css) {
		            var newImport = new Import(this.evalPath(context), features, this.options, this._index);
		            if (!newImport.css && this.error) {
		                throw this.error;
		            }
		            return newImport;
		        }
		        else if (this.root) {
		            ruleset = new ruleset_1.default(null, utils.copyArray(this.root.rules));
		            ruleset.evalImports(context);
		            return this.features ? new media_1.default(ruleset.rules, this.features.value) : ruleset.rules;
		        }
		        else {
		            return [];
		        }
		    }
		});
		_import.default = Import;
		
		return _import;
	}

	var javascript = {};

	var jsEvalNode = {};

	var hasRequiredJsEvalNode;

	function requireJsEvalNode () {
		if (hasRequiredJsEvalNode) return jsEvalNode;
		hasRequiredJsEvalNode = 1;
		Object.defineProperty(jsEvalNode, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var variable_1 = tslib_1.__importDefault(requireVariable());
		var JsEvalNode = function () { };
		JsEvalNode.prototype = Object.assign(new node_1.default(), {
		    evaluateJavaScript: function (expression, context) {
		        var result;
		        var that = this;
		        var evalContext = {};
		        if (!context.javascriptEnabled) {
		            throw { message: 'Inline JavaScript is not enabled. Is it set in your options?',
		                filename: this.fileInfo().filename,
		                index: this.getIndex() };
		        }
		        expression = expression.replace(/@\{([\w-]+)\}/g, function (_, name) {
		            return that.jsify(new variable_1.default("@" + name, that.getIndex(), that.fileInfo()).eval(context));
		        });
		        try {
		            expression = new Function("return (" + expression + ")");
		        }
		        catch (e) {
		            throw { message: "JavaScript evaluation error: " + e.message + " from `" + expression + "`",
		                filename: this.fileInfo().filename,
		                index: this.getIndex() };
		        }
		        var variables = context.frames[0].variables();
		        for (var k in variables) {
		            if (variables.hasOwnProperty(k)) {
		                /* jshint loopfunc:true */
		                evalContext[k.slice(1)] = {
		                    value: variables[k].value,
		                    toJS: function () {
		                        return this.value.eval(context).toCSS();
		                    }
		                };
		            }
		        }
		        try {
		            result = expression.call(evalContext);
		        }
		        catch (e) {
		            throw { message: "JavaScript evaluation error: '" + e.name + ": " + e.message.replace(/["]/g, '\'') + "'",
		                filename: this.fileInfo().filename,
		                index: this.getIndex() };
		        }
		        return result;
		    },
		    jsify: function (obj) {
		        if (Array.isArray(obj.value) && (obj.value.length > 1)) {
		            return "[" + obj.value.map(function (v) { return v.toCSS(); }).join(', ') + "]";
		        }
		        else {
		            return obj.toCSS();
		        }
		    }
		});
		jsEvalNode.default = JsEvalNode;
		
		return jsEvalNode;
	}

	var hasRequiredJavascript;

	function requireJavascript () {
		if (hasRequiredJavascript) return javascript;
		hasRequiredJavascript = 1;
		Object.defineProperty(javascript, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var js_eval_node_1 = tslib_1.__importDefault(requireJsEvalNode());
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var quoted_1 = tslib_1.__importDefault(requireQuoted());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var JavaScript = function (string, escaped, index, currentFileInfo) {
		    this.escaped = escaped;
		    this.expression = string;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		};
		JavaScript.prototype = Object.assign(new js_eval_node_1.default(), {
		    type: 'JavaScript',
		    eval: function (context) {
		        var result = this.evaluateJavaScript(this.expression, context);
		        var type = typeof result;
		        if (type === 'number' && !isNaN(result)) {
		            return new dimension_1.default(result);
		        }
		        else if (type === 'string') {
		            return new quoted_1.default("\"" + result + "\"", result, this.escaped, this._index);
		        }
		        else if (Array.isArray(result)) {
		            return new anonymous_1.default(result.join(', '));
		        }
		        else {
		            return new anonymous_1.default(result);
		        }
		    }
		});
		javascript.default = JavaScript;
		
		return javascript;
	}

	var assignment = {};

	var hasRequiredAssignment;

	function requireAssignment () {
		if (hasRequiredAssignment) return assignment;
		hasRequiredAssignment = 1;
		Object.defineProperty(assignment, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var Assignment = function (key, val) {
		    this.key = key;
		    this.value = val;
		};
		Assignment.prototype = Object.assign(new node_1.default(), {
		    type: 'Assignment',
		    accept: function (visitor) {
		        this.value = visitor.visit(this.value);
		    },
		    eval: function (context) {
		        if (this.value.eval) {
		            return new Assignment(this.key, this.value.eval(context));
		        }
		        return this;
		    },
		    genCSS: function (context, output) {
		        output.add(this.key + "=");
		        if (this.value.genCSS) {
		            this.value.genCSS(context, output);
		        }
		        else {
		            output.add(this.value);
		        }
		    }
		});
		assignment.default = Assignment;
		
		return assignment;
	}

	var condition = {};

	var hasRequiredCondition;

	function requireCondition () {
		if (hasRequiredCondition) return condition;
		hasRequiredCondition = 1;
		Object.defineProperty(condition, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var Condition = function (op, l, r, i, negate) {
		    this.op = op.trim();
		    this.lvalue = l;
		    this.rvalue = r;
		    this._index = i;
		    this.negate = negate;
		};
		Condition.prototype = Object.assign(new node_1.default(), {
		    type: 'Condition',
		    accept: function (visitor) {
		        this.lvalue = visitor.visit(this.lvalue);
		        this.rvalue = visitor.visit(this.rvalue);
		    },
		    eval: function (context) {
		        var result = (function (op, a, b) {
		            switch (op) {
		                case 'and': return a && b;
		                case 'or': return a || b;
		                default:
		                    switch (node_1.default.compare(a, b)) {
		                        case -1:
		                            return op === '<' || op === '=<' || op === '<=';
		                        case 0:
		                            return op === '=' || op === '>=' || op === '=<' || op === '<=';
		                        case 1:
		                            return op === '>' || op === '>=';
		                        default:
		                            return false;
		                    }
		            }
		        })(this.op, this.lvalue.eval(context), this.rvalue.eval(context));
		        return this.negate ? !result : result;
		    }
		});
		condition.default = Condition;
		
		return condition;
	}

	var unicodeDescriptor = {};

	var hasRequiredUnicodeDescriptor;

	function requireUnicodeDescriptor () {
		if (hasRequiredUnicodeDescriptor) return unicodeDescriptor;
		hasRequiredUnicodeDescriptor = 1;
		Object.defineProperty(unicodeDescriptor, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var UnicodeDescriptor = function (value) {
		    this.value = value;
		};
		UnicodeDescriptor.prototype = Object.assign(new node_1.default(), {
		    type: 'UnicodeDescriptor'
		});
		unicodeDescriptor.default = UnicodeDescriptor;
		
		return unicodeDescriptor;
	}

	var negative = {};

	var hasRequiredNegative;

	function requireNegative () {
		if (hasRequiredNegative) return negative;
		hasRequiredNegative = 1;
		Object.defineProperty(negative, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var operation_1 = tslib_1.__importDefault(requireOperation());
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var Negative = function (node) {
		    this.value = node;
		};
		Negative.prototype = Object.assign(new node_1.default(), {
		    type: 'Negative',
		    genCSS: function (context, output) {
		        output.add('-');
		        this.value.genCSS(context, output);
		    },
		    eval: function (context) {
		        if (context.isMathOn()) {
		            return (new operation_1.default('*', [new dimension_1.default(-1), this.value])).eval(context);
		        }
		        return new Negative(this.value.eval(context));
		    }
		});
		negative.default = Negative;
		
		return negative;
	}

	var extend = {};

	var hasRequiredExtend;

	function requireExtend () {
		if (hasRequiredExtend) return extend;
		hasRequiredExtend = 1;
		Object.defineProperty(extend, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var selector_1 = tslib_1.__importDefault(requireSelector());
		var Extend = function (selector, option, index, currentFileInfo, visibilityInfo) {
		    this.selector = selector;
		    this.option = option;
		    this.object_id = Extend.next_id++;
		    this.parent_ids = [this.object_id];
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.copyVisibilityInfo(visibilityInfo);
		    this.allowRoot = true;
		    switch (option) {
		        case 'all':
		            this.allowBefore = true;
		            this.allowAfter = true;
		            break;
		        default:
		            this.allowBefore = false;
		            this.allowAfter = false;
		            break;
		    }
		    this.setParent(this.selector, this);
		};
		Extend.prototype = Object.assign(new node_1.default(), {
		    type: 'Extend',
		    accept: function (visitor) {
		        this.selector = visitor.visit(this.selector);
		    },
		    eval: function (context) {
		        return new Extend(this.selector.eval(context), this.option, this.getIndex(), this.fileInfo(), this.visibilityInfo());
		    },
		    clone: function (context) {
		        return new Extend(this.selector, this.option, this.getIndex(), this.fileInfo(), this.visibilityInfo());
		    },
		    // it concatenates (joins) all selectors in selector array
		    findSelfSelectors: function (selectors) {
		        var selfElements = [], i, selectorElements;
		        for (i = 0; i < selectors.length; i++) {
		            selectorElements = selectors[i].elements;
		            // duplicate the logic in genCSS function inside the selector node.
		            // future TODO - move both logics into the selector joiner visitor
		            if (i > 0 && selectorElements.length && selectorElements[0].combinator.value === '') {
		                selectorElements[0].combinator.value = ' ';
		            }
		            selfElements = selfElements.concat(selectors[i].elements);
		        }
		        this.selfSelectors = [new selector_1.default(selfElements)];
		        this.selfSelectors[0].copyVisibilityInfo(this.visibilityInfo());
		    }
		});
		Extend.next_id = 0;
		extend.default = Extend;
		
		return extend;
	}

	var variableCall = {};

	var hasRequiredVariableCall;

	function requireVariableCall () {
		if (hasRequiredVariableCall) return variableCall;
		hasRequiredVariableCall = 1;
		Object.defineProperty(variableCall, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var variable_1 = tslib_1.__importDefault(requireVariable());
		var ruleset_1 = tslib_1.__importDefault(requireRuleset());
		var detached_ruleset_1 = tslib_1.__importDefault(requireDetachedRuleset());
		var less_error_1 = tslib_1.__importDefault(requireLessError());
		var VariableCall = function (variable, index, currentFileInfo) {
		    this.variable = variable;
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.allowRoot = true;
		};
		VariableCall.prototype = Object.assign(new node_1.default(), {
		    type: 'VariableCall',
		    eval: function (context) {
		        var rules;
		        var detachedRuleset = new variable_1.default(this.variable, this.getIndex(), this.fileInfo()).eval(context);
		        var error = new less_error_1.default({ message: "Could not evaluate variable call " + this.variable });
		        if (!detachedRuleset.ruleset) {
		            if (detachedRuleset.rules) {
		                rules = detachedRuleset;
		            }
		            else if (Array.isArray(detachedRuleset)) {
		                rules = new ruleset_1.default('', detachedRuleset);
		            }
		            else if (Array.isArray(detachedRuleset.value)) {
		                rules = new ruleset_1.default('', detachedRuleset.value);
		            }
		            else {
		                throw error;
		            }
		            detachedRuleset = new detached_ruleset_1.default(rules);
		        }
		        if (detachedRuleset.ruleset) {
		            return detachedRuleset.callEval(context);
		        }
		        throw error;
		    }
		});
		variableCall.default = VariableCall;
		
		return variableCall;
	}

	var namespaceValue = {};

	var hasRequiredNamespaceValue;

	function requireNamespaceValue () {
		if (hasRequiredNamespaceValue) return namespaceValue;
		hasRequiredNamespaceValue = 1;
		Object.defineProperty(namespaceValue, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var variable_1 = tslib_1.__importDefault(requireVariable());
		var ruleset_1 = tslib_1.__importDefault(requireRuleset());
		var selector_1 = tslib_1.__importDefault(requireSelector());
		var NamespaceValue = function (ruleCall, lookups, index, fileInfo) {
		    this.value = ruleCall;
		    this.lookups = lookups;
		    this._index = index;
		    this._fileInfo = fileInfo;
		};
		NamespaceValue.prototype = Object.assign(new node_1.default(), {
		    type: 'NamespaceValue',
		    eval: function (context) {
		        var i, name, rules = this.value.eval(context);
		        for (i = 0; i < this.lookups.length; i++) {
		            name = this.lookups[i];
		            /**
		             * Eval'd DRs return rulesets.
		             * Eval'd mixins return rules, so let's make a ruleset if we need it.
		             * We need to do this because of late parsing of values
		             */
		            if (Array.isArray(rules)) {
		                rules = new ruleset_1.default([new selector_1.default()], rules);
		            }
		            if (name === '') {
		                rules = rules.lastDeclaration();
		            }
		            else if (name.charAt(0) === '@') {
		                if (name.charAt(1) === '@') {
		                    name = "@" + new variable_1.default(name.substr(1)).eval(context).value;
		                }
		                if (rules.variables) {
		                    rules = rules.variable(name);
		                }
		                if (!rules) {
		                    throw { type: 'Name',
		                        message: "variable " + name + " not found",
		                        filename: this.fileInfo().filename,
		                        index: this.getIndex() };
		                }
		            }
		            else {
		                if (name.substring(0, 2) === '$@') {
		                    name = "$" + new variable_1.default(name.substr(1)).eval(context).value;
		                }
		                else {
		                    name = name.charAt(0) === '$' ? name : "$" + name;
		                }
		                if (rules.properties) {
		                    rules = rules.property(name);
		                }
		                if (!rules) {
		                    throw { type: 'Name',
		                        message: "property \"" + name.substr(1) + "\" not found",
		                        filename: this.fileInfo().filename,
		                        index: this.getIndex() };
		                }
		                // Properties are an array of values, since a ruleset can have multiple props.
		                // We pick the last one (the "cascaded" value)
		                rules = rules[rules.length - 1];
		            }
		            if (rules.value) {
		                rules = rules.eval(context).value;
		            }
		            if (rules.ruleset) {
		                rules = rules.ruleset.eval(context);
		            }
		        }
		        return rules;
		    }
		});
		namespaceValue.default = NamespaceValue;
		
		return namespaceValue;
	}

	var mixinCall = {};

	var mixinDefinition = {};

	var hasRequiredMixinDefinition;

	function requireMixinDefinition () {
		if (hasRequiredMixinDefinition) return mixinDefinition;
		hasRequiredMixinDefinition = 1;
		Object.defineProperty(mixinDefinition, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var selector_1 = tslib_1.__importDefault(requireSelector());
		var element_1 = tslib_1.__importDefault(requireElement());
		var ruleset_1 = tslib_1.__importDefault(requireRuleset());
		var declaration_1 = tslib_1.__importDefault(requireDeclaration());
		var detached_ruleset_1 = tslib_1.__importDefault(requireDetachedRuleset());
		var expression_1 = tslib_1.__importDefault(requireExpression());
		var contexts_1 = tslib_1.__importDefault(requireContexts());
		var utils = tslib_1.__importStar(requireUtils());
		var Definition = function (name, params, rules, condition, variadic, frames, visibilityInfo) {
		    this.name = name || 'anonymous mixin';
		    this.selectors = [new selector_1.default([new element_1.default(null, name, false, this._index, this._fileInfo)])];
		    this.params = params;
		    this.condition = condition;
		    this.variadic = variadic;
		    this.arity = params.length;
		    this.rules = rules;
		    this._lookups = {};
		    var optionalParameters = [];
		    this.required = params.reduce(function (count, p) {
		        if (!p.name || (p.name && !p.value)) {
		            return count + 1;
		        }
		        else {
		            optionalParameters.push(p.name);
		            return count;
		        }
		    }, 0);
		    this.optionalParameters = optionalParameters;
		    this.frames = frames;
		    this.copyVisibilityInfo(visibilityInfo);
		    this.allowRoot = true;
		};
		Definition.prototype = Object.assign(new ruleset_1.default(), {
		    type: 'MixinDefinition',
		    evalFirst: true,
		    accept: function (visitor) {
		        if (this.params && this.params.length) {
		            this.params = visitor.visitArray(this.params);
		        }
		        this.rules = visitor.visitArray(this.rules);
		        if (this.condition) {
		            this.condition = visitor.visit(this.condition);
		        }
		    },
		    evalParams: function (context, mixinEnv, args, evaldArguments) {
		        /* jshint boss:true */
		        var frame = new ruleset_1.default(null, null);
		        var varargs;
		        var arg;
		        var params = utils.copyArray(this.params);
		        var i;
		        var j;
		        var val;
		        var name;
		        var isNamedFound;
		        var argIndex;
		        var argsLength = 0;
		        if (mixinEnv.frames && mixinEnv.frames[0] && mixinEnv.frames[0].functionRegistry) {
		            frame.functionRegistry = mixinEnv.frames[0].functionRegistry.inherit();
		        }
		        mixinEnv = new contexts_1.default.Eval(mixinEnv, [frame].concat(mixinEnv.frames));
		        if (args) {
		            args = utils.copyArray(args);
		            argsLength = args.length;
		            for (i = 0; i < argsLength; i++) {
		                arg = args[i];
		                if (name = (arg && arg.name)) {
		                    isNamedFound = false;
		                    for (j = 0; j < params.length; j++) {
		                        if (!evaldArguments[j] && name === params[j].name) {
		                            evaldArguments[j] = arg.value.eval(context);
		                            frame.prependRule(new declaration_1.default(name, arg.value.eval(context)));
		                            isNamedFound = true;
		                            break;
		                        }
		                    }
		                    if (isNamedFound) {
		                        args.splice(i, 1);
		                        i--;
		                        continue;
		                    }
		                    else {
		                        throw { type: 'Runtime', message: "Named argument for " + this.name + " " + args[i].name + " not found" };
		                    }
		                }
		            }
		        }
		        argIndex = 0;
		        for (i = 0; i < params.length; i++) {
		            if (evaldArguments[i]) {
		                continue;
		            }
		            arg = args && args[argIndex];
		            if (name = params[i].name) {
		                if (params[i].variadic) {
		                    varargs = [];
		                    for (j = argIndex; j < argsLength; j++) {
		                        varargs.push(args[j].value.eval(context));
		                    }
		                    frame.prependRule(new declaration_1.default(name, new expression_1.default(varargs).eval(context)));
		                }
		                else {
		                    val = arg && arg.value;
		                    if (val) {
		                        // This was a mixin call, pass in a detached ruleset of it's eval'd rules
		                        if (Array.isArray(val)) {
		                            val = new detached_ruleset_1.default(new ruleset_1.default('', val));
		                        }
		                        else {
		                            val = val.eval(context);
		                        }
		                    }
		                    else if (params[i].value) {
		                        val = params[i].value.eval(mixinEnv);
		                        frame.resetCache();
		                    }
		                    else {
		                        throw { type: 'Runtime', message: "wrong number of arguments for " + this.name + " (" + argsLength + " for " + this.arity + ")" };
		                    }
		                    frame.prependRule(new declaration_1.default(name, val));
		                    evaldArguments[i] = val;
		                }
		            }
		            if (params[i].variadic && args) {
		                for (j = argIndex; j < argsLength; j++) {
		                    evaldArguments[j] = args[j].value.eval(context);
		                }
		            }
		            argIndex++;
		        }
		        return frame;
		    },
		    makeImportant: function () {
		        var rules = !this.rules ? this.rules : this.rules.map(function (r) {
		            if (r.makeImportant) {
		                return r.makeImportant(true);
		            }
		            else {
		                return r;
		            }
		        });
		        var result = new Definition(this.name, this.params, rules, this.condition, this.variadic, this.frames);
		        return result;
		    },
		    eval: function (context) {
		        return new Definition(this.name, this.params, this.rules, this.condition, this.variadic, this.frames || utils.copyArray(context.frames));
		    },
		    evalCall: function (context, args, important) {
		        var _arguments = [];
		        var mixinFrames = this.frames ? this.frames.concat(context.frames) : context.frames;
		        var frame = this.evalParams(context, new contexts_1.default.Eval(context, mixinFrames), args, _arguments);
		        var rules;
		        var ruleset;
		        frame.prependRule(new declaration_1.default('@arguments', new expression_1.default(_arguments).eval(context)));
		        rules = utils.copyArray(this.rules);
		        ruleset = new ruleset_1.default(null, rules);
		        ruleset.originalRuleset = this;
		        ruleset = ruleset.eval(new contexts_1.default.Eval(context, [this, frame].concat(mixinFrames)));
		        if (important) {
		            ruleset = ruleset.makeImportant();
		        }
		        return ruleset;
		    },
		    matchCondition: function (args, context) {
		        if (this.condition && !this.condition.eval(new contexts_1.default.Eval(context, [this.evalParams(context, /* the parameter variables */ new contexts_1.default.Eval(context, this.frames ? this.frames.concat(context.frames) : context.frames), args, [])]
		            .concat(this.frames || []) // the parent namespace/mixin frames
		            .concat(context.frames)))) { // the current environment frames
		            return false;
		        }
		        return true;
		    },
		    matchArgs: function (args, context) {
		        var allArgsCnt = (args && args.length) || 0;
		        var len;
		        var optionalParameters = this.optionalParameters;
		        var requiredArgsCnt = !args ? 0 : args.reduce(function (count, p) {
		            if (optionalParameters.indexOf(p.name) < 0) {
		                return count + 1;
		            }
		            else {
		                return count;
		            }
		        }, 0);
		        if (!this.variadic) {
		            if (requiredArgsCnt < this.required) {
		                return false;
		            }
		            if (allArgsCnt > this.params.length) {
		                return false;
		            }
		        }
		        else {
		            if (requiredArgsCnt < (this.required - 1)) {
		                return false;
		            }
		        }
		        // check patterns
		        len = Math.min(requiredArgsCnt, this.arity);
		        for (var i = 0; i < len; i++) {
		            if (!this.params[i].name && !this.params[i].variadic) {
		                if (args[i].value.eval(context).toCSS() != this.params[i].value.eval(context).toCSS()) {
		                    return false;
		                }
		            }
		        }
		        return true;
		    }
		});
		mixinDefinition.default = Definition;
		
		return mixinDefinition;
	}

	var hasRequiredMixinCall;

	function requireMixinCall () {
		if (hasRequiredMixinCall) return mixinCall;
		hasRequiredMixinCall = 1;
		Object.defineProperty(mixinCall, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var selector_1 = tslib_1.__importDefault(requireSelector());
		var mixin_definition_1 = tslib_1.__importDefault(requireMixinDefinition());
		var default_1 = tslib_1.__importDefault(require_default());
		var MixinCall = function (elements, args, index, currentFileInfo, important) {
		    this.selector = new selector_1.default(elements);
		    this.arguments = args || [];
		    this._index = index;
		    this._fileInfo = currentFileInfo;
		    this.important = important;
		    this.allowRoot = true;
		    this.setParent(this.selector, this);
		};
		MixinCall.prototype = Object.assign(new node_1.default(), {
		    type: 'MixinCall',
		    accept: function (visitor) {
		        if (this.selector) {
		            this.selector = visitor.visit(this.selector);
		        }
		        if (this.arguments.length) {
		            this.arguments = visitor.visitArray(this.arguments);
		        }
		    },
		    eval: function (context) {
		        var mixins;
		        var mixin;
		        var mixinPath;
		        var args = [];
		        var arg;
		        var argValue;
		        var rules = [];
		        var match = false;
		        var i;
		        var m;
		        var f;
		        var isRecursive;
		        var isOneFound;
		        var candidates = [];
		        var candidate;
		        var conditionResult = [];
		        var defaultResult;
		        var defFalseEitherCase = -1;
		        var defNone = 0;
		        var defTrue = 1;
		        var defFalse = 2;
		        var count;
		        var originalRuleset;
		        var noArgumentsFilter;
		        this.selector = this.selector.eval(context);
		        function calcDefGroup(mixin, mixinPath) {
		            var f, p, namespace;
		            for (f = 0; f < 2; f++) {
		                conditionResult[f] = true;
		                default_1.default.value(f);
		                for (p = 0; p < mixinPath.length && conditionResult[f]; p++) {
		                    namespace = mixinPath[p];
		                    if (namespace.matchCondition) {
		                        conditionResult[f] = conditionResult[f] && namespace.matchCondition(null, context);
		                    }
		                }
		                if (mixin.matchCondition) {
		                    conditionResult[f] = conditionResult[f] && mixin.matchCondition(args, context);
		                }
		            }
		            if (conditionResult[0] || conditionResult[1]) {
		                if (conditionResult[0] != conditionResult[1]) {
		                    return conditionResult[1] ?
		                        defTrue : defFalse;
		                }
		                return defNone;
		            }
		            return defFalseEitherCase;
		        }
		        for (i = 0; i < this.arguments.length; i++) {
		            arg = this.arguments[i];
		            argValue = arg.value.eval(context);
		            if (arg.expand && Array.isArray(argValue.value)) {
		                argValue = argValue.value;
		                for (m = 0; m < argValue.length; m++) {
		                    args.push({ value: argValue[m] });
		                }
		            }
		            else {
		                args.push({ name: arg.name, value: argValue });
		            }
		        }
		        noArgumentsFilter = function (rule) { return rule.matchArgs(null, context); };
		        for (i = 0; i < context.frames.length; i++) {
		            if ((mixins = context.frames[i].find(this.selector, null, noArgumentsFilter)).length > 0) {
		                isOneFound = true;
		                // To make `default()` function independent of definition order we have two "subpasses" here.
		                // At first we evaluate each guard *twice* (with `default() == true` and `default() == false`),
		                // and build candidate list with corresponding flags. Then, when we know all possible matches,
		                // we make a final decision.
		                for (m = 0; m < mixins.length; m++) {
		                    mixin = mixins[m].rule;
		                    mixinPath = mixins[m].path;
		                    isRecursive = false;
		                    for (f = 0; f < context.frames.length; f++) {
		                        if ((!(mixin instanceof mixin_definition_1.default)) && mixin === (context.frames[f].originalRuleset || context.frames[f])) {
		                            isRecursive = true;
		                            break;
		                        }
		                    }
		                    if (isRecursive) {
		                        continue;
		                    }
		                    if (mixin.matchArgs(args, context)) {
		                        candidate = { mixin: mixin, group: calcDefGroup(mixin, mixinPath) };
		                        if (candidate.group !== defFalseEitherCase) {
		                            candidates.push(candidate);
		                        }
		                        match = true;
		                    }
		                }
		                default_1.default.reset();
		                count = [0, 0, 0];
		                for (m = 0; m < candidates.length; m++) {
		                    count[candidates[m].group]++;
		                }
		                if (count[defNone] > 0) {
		                    defaultResult = defFalse;
		                }
		                else {
		                    defaultResult = defTrue;
		                    if ((count[defTrue] + count[defFalse]) > 1) {
		                        throw { type: 'Runtime',
		                            message: "Ambiguous use of `default()` found when matching for `" + this.format(args) + "`",
		                            index: this.getIndex(), filename: this.fileInfo().filename };
		                    }
		                }
		                for (m = 0; m < candidates.length; m++) {
		                    candidate = candidates[m].group;
		                    if ((candidate === defNone) || (candidate === defaultResult)) {
		                        try {
		                            mixin = candidates[m].mixin;
		                            if (!(mixin instanceof mixin_definition_1.default)) {
		                                originalRuleset = mixin.originalRuleset || mixin;
		                                mixin = new mixin_definition_1.default('', [], mixin.rules, null, false, null, originalRuleset.visibilityInfo());
		                                mixin.originalRuleset = originalRuleset;
		                            }
		                            var newRules = mixin.evalCall(context, args, this.important).rules;
		                            this._setVisibilityToReplacement(newRules);
		                            Array.prototype.push.apply(rules, newRules);
		                        }
		                        catch (e) {
		                            throw { message: e.message, index: this.getIndex(), filename: this.fileInfo().filename, stack: e.stack };
		                        }
		                    }
		                }
		                if (match) {
		                    return rules;
		                }
		            }
		        }
		        if (isOneFound) {
		            throw { type: 'Runtime',
		                message: "No matching definition was found for `" + this.format(args) + "`",
		                index: this.getIndex(), filename: this.fileInfo().filename };
		        }
		        else {
		            throw { type: 'Name',
		                message: this.selector.toCSS().trim() + " is undefined",
		                index: this.getIndex(), filename: this.fileInfo().filename };
		        }
		    },
		    _setVisibilityToReplacement: function (replacement) {
		        var i, rule;
		        if (this.blocksVisibility()) {
		            for (i = 0; i < replacement.length; i++) {
		                rule = replacement[i];
		                rule.addVisibilityBlock();
		            }
		        }
		    },
		    format: function (args) {
		        return this.selector.toCSS().trim() + "(" + (args ? args.map(function (a) {
		            var argValue = '';
		            if (a.name) {
		                argValue += a.name + ":";
		            }
		            if (a.value.toCSS) {
		                argValue += a.value.toCSS();
		            }
		            else {
		                argValue += '???';
		            }
		            return argValue;
		        }).join(', ') : '') + ")";
		    }
		});
		mixinCall.default = MixinCall;
		
		return mixinCall;
	}

	var hasRequiredTree;

	function requireTree () {
		if (hasRequiredTree) return tree;
		hasRequiredTree = 1;
		Object.defineProperty(tree, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var node_1 = tslib_1.__importDefault(requireNode());
		var color_1 = tslib_1.__importDefault(requireColor$1());
		var atrule_1 = tslib_1.__importDefault(requireAtrule());
		var detached_ruleset_1 = tslib_1.__importDefault(requireDetachedRuleset());
		var operation_1 = tslib_1.__importDefault(requireOperation());
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var unit_1 = tslib_1.__importDefault(requireUnit());
		var keyword_1 = tslib_1.__importDefault(requireKeyword());
		var variable_1 = tslib_1.__importDefault(requireVariable());
		var property_1 = tslib_1.__importDefault(requireProperty());
		var ruleset_1 = tslib_1.__importDefault(requireRuleset());
		var element_1 = tslib_1.__importDefault(requireElement());
		var attribute_1 = tslib_1.__importDefault(requireAttribute());
		var combinator_1 = tslib_1.__importDefault(requireCombinator());
		var selector_1 = tslib_1.__importDefault(requireSelector());
		var quoted_1 = tslib_1.__importDefault(requireQuoted());
		var expression_1 = tslib_1.__importDefault(requireExpression());
		var declaration_1 = tslib_1.__importDefault(requireDeclaration());
		var call_1 = tslib_1.__importDefault(requireCall());
		var url_1 = tslib_1.__importDefault(requireUrl());
		var import_1 = tslib_1.__importDefault(require_import());
		var comment_1 = tslib_1.__importDefault(requireComment());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var value_1 = tslib_1.__importDefault(requireValue());
		var javascript_1 = tslib_1.__importDefault(requireJavascript());
		var assignment_1 = tslib_1.__importDefault(requireAssignment());
		var condition_1 = tslib_1.__importDefault(requireCondition());
		var paren_1 = tslib_1.__importDefault(requireParen());
		var media_1 = tslib_1.__importDefault(requireMedia());
		var unicode_descriptor_1 = tslib_1.__importDefault(requireUnicodeDescriptor());
		var negative_1 = tslib_1.__importDefault(requireNegative());
		var extend_1 = tslib_1.__importDefault(requireExtend());
		var variable_call_1 = tslib_1.__importDefault(requireVariableCall());
		var namespace_value_1 = tslib_1.__importDefault(requireNamespaceValue());
		// mixins
		var mixin_call_1 = tslib_1.__importDefault(requireMixinCall());
		var mixin_definition_1 = tslib_1.__importDefault(requireMixinDefinition());
		tree.default = {
		    Node: node_1.default,
		    Color: color_1.default,
		    AtRule: atrule_1.default,
		    DetachedRuleset: detached_ruleset_1.default,
		    Operation: operation_1.default,
		    Dimension: dimension_1.default,
		    Unit: unit_1.default,
		    Keyword: keyword_1.default,
		    Variable: variable_1.default,
		    Property: property_1.default,
		    Ruleset: ruleset_1.default,
		    Element: element_1.default,
		    Attribute: attribute_1.default,
		    Combinator: combinator_1.default,
		    Selector: selector_1.default,
		    Quoted: quoted_1.default,
		    Expression: expression_1.default,
		    Declaration: declaration_1.default,
		    Call: call_1.default,
		    URL: url_1.default,
		    Import: import_1.default,
		    Comment: comment_1.default,
		    Anonymous: anonymous_1.default,
		    Value: value_1.default,
		    JavaScript: javascript_1.default,
		    Assignment: assignment_1.default,
		    Condition: condition_1.default,
		    Paren: paren_1.default,
		    Media: media_1.default,
		    UnicodeDescriptor: unicode_descriptor_1.default,
		    Negative: negative_1.default,
		    Extend: extend_1.default,
		    VariableCall: variable_call_1.default,
		    NamespaceValue: namespace_value_1.default,
		    mixin: {
		        Call: mixin_call_1.default,
		        Definition: mixin_definition_1.default
		    }
		};
		
		return tree;
	}

	var abstractFileManager = {};

	var hasRequiredAbstractFileManager;

	function requireAbstractFileManager () {
		if (hasRequiredAbstractFileManager) return abstractFileManager;
		hasRequiredAbstractFileManager = 1;
		Object.defineProperty(abstractFileManager, "__esModule", { value: true });
		var AbstractFileManager = /** @class */ (function () {
		    function AbstractFileManager() {
		    }
		    AbstractFileManager.prototype.getPath = function (filename) {
		        var j = filename.lastIndexOf('?');
		        if (j > 0) {
		            filename = filename.slice(0, j);
		        }
		        j = filename.lastIndexOf('/');
		        if (j < 0) {
		            j = filename.lastIndexOf('\\');
		        }
		        if (j < 0) {
		            return '';
		        }
		        return filename.slice(0, j + 1);
		    };
		    AbstractFileManager.prototype.tryAppendExtension = function (path, ext) {
		        return /(\.[a-z]*$)|([\?;].*)$/.test(path) ? path : path + ext;
		    };
		    AbstractFileManager.prototype.tryAppendLessExtension = function (path) {
		        return this.tryAppendExtension(path, '.less');
		    };
		    AbstractFileManager.prototype.supportsSync = function () {
		        return false;
		    };
		    AbstractFileManager.prototype.alwaysMakePathsAbsolute = function () {
		        return false;
		    };
		    AbstractFileManager.prototype.isPathAbsolute = function (filename) {
		        return (/^(?:[a-z-]+:|\/|\\|#)/i).test(filename);
		    };
		    // TODO: pull out / replace?
		    AbstractFileManager.prototype.join = function (basePath, laterPath) {
		        if (!basePath) {
		            return laterPath;
		        }
		        return basePath + laterPath;
		    };
		    AbstractFileManager.prototype.pathDiff = function (url, baseUrl) {
		        // diff between two paths to create a relative path
		        var urlParts = this.extractUrlParts(url);
		        var baseUrlParts = this.extractUrlParts(baseUrl);
		        var i;
		        var max;
		        var urlDirectories;
		        var baseUrlDirectories;
		        var diff = '';
		        if (urlParts.hostPart !== baseUrlParts.hostPart) {
		            return '';
		        }
		        max = Math.max(baseUrlParts.directories.length, urlParts.directories.length);
		        for (i = 0; i < max; i++) {
		            if (baseUrlParts.directories[i] !== urlParts.directories[i]) {
		                break;
		            }
		        }
		        baseUrlDirectories = baseUrlParts.directories.slice(i);
		        urlDirectories = urlParts.directories.slice(i);
		        for (i = 0; i < baseUrlDirectories.length - 1; i++) {
		            diff += '../';
		        }
		        for (i = 0; i < urlDirectories.length - 1; i++) {
		            diff += urlDirectories[i] + "/";
		        }
		        return diff;
		    };
		    // helper function, not part of API
		    AbstractFileManager.prototype.extractUrlParts = function (url, baseUrl) {
		        // urlParts[1] = protocol://hostname/ OR /
		        // urlParts[2] = / if path relative to host base
		        // urlParts[3] = directories
		        // urlParts[4] = filename
		        // urlParts[5] = parameters
		        var urlPartsRegex = /^((?:[a-z-]+:)?\/{2}(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i;
		        var urlParts = url.match(urlPartsRegex);
		        var returner = {};
		        var rawDirectories = [];
		        var directories = [];
		        var i;
		        var baseUrlParts;
		        if (!urlParts) {
		            throw new Error("Could not parse sheet href - '" + url + "'");
		        }
		        // Stylesheets in IE don't always return the full path
		        if (baseUrl && (!urlParts[1] || urlParts[2])) {
		            baseUrlParts = baseUrl.match(urlPartsRegex);
		            if (!baseUrlParts) {
		                throw new Error("Could not parse page url - '" + baseUrl + "'");
		            }
		            urlParts[1] = urlParts[1] || baseUrlParts[1] || '';
		            if (!urlParts[2]) {
		                urlParts[3] = baseUrlParts[3] + urlParts[3];
		            }
		        }
		        if (urlParts[3]) {
		            rawDirectories = urlParts[3].replace(/\\/g, '/').split('/');
		            // collapse '..' and skip '.'
		            for (i = 0; i < rawDirectories.length; i++) {
		                if (rawDirectories[i] === '..') {
		                    directories.pop();
		                }
		                else if (rawDirectories[i] !== '.') {
		                    directories.push(rawDirectories[i]);
		                }
		            }
		        }
		        returner.hostPart = urlParts[1];
		        returner.directories = directories;
		        returner.rawPath = (urlParts[1] || '') + rawDirectories.join('/');
		        returner.path = (urlParts[1] || '') + directories.join('/');
		        returner.filename = urlParts[4];
		        returner.fileUrl = returner.path + (urlParts[4] || '');
		        returner.url = returner.fileUrl + (urlParts[5] || '');
		        return returner;
		    };
		    return AbstractFileManager;
		}());
		abstractFileManager.default = AbstractFileManager;
		
		return abstractFileManager;
	}

	var abstractPluginLoader = {};

	var hasRequiredAbstractPluginLoader;

	function requireAbstractPluginLoader () {
		if (hasRequiredAbstractPluginLoader) return abstractPluginLoader;
		hasRequiredAbstractPluginLoader = 1;
		Object.defineProperty(abstractPluginLoader, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var function_registry_1 = tslib_1.__importDefault(requireFunctionRegistry());
		var less_error_1 = tslib_1.__importDefault(requireLessError());
		var AbstractPluginLoader = /** @class */ (function () {
		    function AbstractPluginLoader() {
		        // Implemented by Node.js plugin loader
		        this.require = function () {
		            return null;
		        };
		    }
		    AbstractPluginLoader.prototype.evalPlugin = function (contents, context, imports, pluginOptions, fileInfo) {
		        var loader, registry, pluginObj, localModule, pluginManager, filename, result;
		        pluginManager = context.pluginManager;
		        if (fileInfo) {
		            if (typeof fileInfo === 'string') {
		                filename = fileInfo;
		            }
		            else {
		                filename = fileInfo.filename;
		            }
		        }
		        var shortname = (new this.less.FileManager()).extractUrlParts(filename).filename;
		        if (filename) {
		            pluginObj = pluginManager.get(filename);
		            if (pluginObj) {
		                result = this.trySetOptions(pluginObj, filename, shortname, pluginOptions);
		                if (result) {
		                    return result;
		                }
		                try {
		                    if (pluginObj.use) {
		                        pluginObj.use.call(this.context, pluginObj);
		                    }
		                }
		                catch (e) {
		                    e.message = e.message || 'Error during @plugin call';
		                    return new less_error_1.default(e, imports, filename);
		                }
		                return pluginObj;
		            }
		        }
		        localModule = {
		            exports: {},
		            pluginManager: pluginManager,
		            fileInfo: fileInfo
		        };
		        registry = function_registry_1.default.create();
		        var registerPlugin = function (obj) {
		            pluginObj = obj;
		        };
		        try {
		            loader = new Function('module', 'require', 'registerPlugin', 'functions', 'tree', 'less', 'fileInfo', contents);
		            loader(localModule, this.require(filename), registerPlugin, registry, this.less.tree, this.less, fileInfo);
		        }
		        catch (e) {
		            return new less_error_1.default(e, imports, filename);
		        }
		        if (!pluginObj) {
		            pluginObj = localModule.exports;
		        }
		        pluginObj = this.validatePlugin(pluginObj, filename, shortname);
		        if (pluginObj instanceof less_error_1.default) {
		            return pluginObj;
		        }
		        if (pluginObj) {
		            pluginObj.imports = imports;
		            pluginObj.filename = filename;
		            // For < 3.x (or unspecified minVersion) - setOptions() before install()
		            if (!pluginObj.minVersion || this.compareVersion('3.0.0', pluginObj.minVersion) < 0) {
		                result = this.trySetOptions(pluginObj, filename, shortname, pluginOptions);
		                if (result) {
		                    return result;
		                }
		            }
		            // Run on first load
		            pluginManager.addPlugin(pluginObj, fileInfo.filename, registry);
		            pluginObj.functions = registry.getLocalFunctions();
		            // Need to call setOptions again because the pluginObj might have functions
		            result = this.trySetOptions(pluginObj, filename, shortname, pluginOptions);
		            if (result) {
		                return result;
		            }
		            // Run every @plugin call
		            try {
		                if (pluginObj.use) {
		                    pluginObj.use.call(this.context, pluginObj);
		                }
		            }
		            catch (e) {
		                e.message = e.message || 'Error during @plugin call';
		                return new less_error_1.default(e, imports, filename);
		            }
		        }
		        else {
		            return new less_error_1.default({ message: 'Not a valid plugin' }, imports, filename);
		        }
		        return pluginObj;
		    };
		    AbstractPluginLoader.prototype.trySetOptions = function (plugin, filename, name, options) {
		        if (options && !plugin.setOptions) {
		            return new less_error_1.default({
		                message: "Options have been provided but the plugin " + name + " does not support any options."
		            });
		        }
		        try {
		            plugin.setOptions && plugin.setOptions(options);
		        }
		        catch (e) {
		            return new less_error_1.default(e);
		        }
		    };
		    AbstractPluginLoader.prototype.validatePlugin = function (plugin, filename, name) {
		        if (plugin) {
		            // support plugins being a function
		            // so that the plugin can be more usable programmatically
		            if (typeof plugin === 'function') {
		                plugin = new plugin();
		            }
		            if (plugin.minVersion) {
		                if (this.compareVersion(plugin.minVersion, this.less.version) < 0) {
		                    return new less_error_1.default({
		                        message: "Plugin " + name + " requires version " + this.versionToString(plugin.minVersion)
		                    });
		                }
		            }
		            return plugin;
		        }
		        return null;
		    };
		    AbstractPluginLoader.prototype.compareVersion = function (aVersion, bVersion) {
		        if (typeof aVersion === 'string') {
		            aVersion = aVersion.match(/^(\d+)\.?(\d+)?\.?(\d+)?/);
		            aVersion.shift();
		        }
		        for (var i = 0; i < aVersion.length; i++) {
		            if (aVersion[i] !== bVersion[i]) {
		                return parseInt(aVersion[i]) > parseInt(bVersion[i]) ? -1 : 1;
		            }
		        }
		        return 0;
		    };
		    AbstractPluginLoader.prototype.versionToString = function (version) {
		        var versionString = '';
		        for (var i = 0; i < version.length; i++) {
		            versionString += (versionString ? '.' : '') + version[i];
		        }
		        return versionString;
		    };
		    AbstractPluginLoader.prototype.printUsage = function (plugins) {
		        for (var i = 0; i < plugins.length; i++) {
		            var plugin = plugins[i];
		            if (plugin.printUsage) {
		                plugin.printUsage();
		            }
		        }
		    };
		    return AbstractPluginLoader;
		}());
		abstractPluginLoader.default = AbstractPluginLoader;
		
		return abstractPluginLoader;
	}

	var visitors = {};

	var visitor = {};

	var hasRequiredVisitor;

	function requireVisitor () {
		if (hasRequiredVisitor) return visitor;
		hasRequiredVisitor = 1;
		Object.defineProperty(visitor, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var tree_1 = tslib_1.__importDefault(requireTree());
		var _visitArgs = { visitDeeper: true };
		var _hasIndexed = false;
		function _noop(node) {
		    return node;
		}
		function indexNodeTypes(parent, ticker) {
		    // add .typeIndex to tree node types for lookup table
		    var key, child;
		    for (key in parent) {
		        /* eslint guard-for-in: 0 */
		        child = parent[key];
		        switch (typeof child) {
		            case 'function':
		                // ignore bound functions directly on tree which do not have a prototype
		                // or aren't nodes
		                if (child.prototype && child.prototype.type) {
		                    child.prototype.typeIndex = ticker++;
		                }
		                break;
		            case 'object':
		                ticker = indexNodeTypes(child, ticker);
		                break;
		        }
		    }
		    return ticker;
		}
		var Visitor = /** @class */ (function () {
		    function Visitor(implementation) {
		        this._implementation = implementation;
		        this._visitInCache = {};
		        this._visitOutCache = {};
		        if (!_hasIndexed) {
		            indexNodeTypes(tree_1.default, 1);
		            _hasIndexed = true;
		        }
		    }
		    Visitor.prototype.visit = function (node) {
		        if (!node) {
		            return node;
		        }
		        var nodeTypeIndex = node.typeIndex;
		        if (!nodeTypeIndex) {
		            // MixinCall args aren't a node type?
		            if (node.value && node.value.typeIndex) {
		                this.visit(node.value);
		            }
		            return node;
		        }
		        var impl = this._implementation;
		        var func = this._visitInCache[nodeTypeIndex];
		        var funcOut = this._visitOutCache[nodeTypeIndex];
		        var visitArgs = _visitArgs;
		        var fnName;
		        visitArgs.visitDeeper = true;
		        if (!func) {
		            fnName = "visit" + node.type;
		            func = impl[fnName] || _noop;
		            funcOut = impl[fnName + "Out"] || _noop;
		            this._visitInCache[nodeTypeIndex] = func;
		            this._visitOutCache[nodeTypeIndex] = funcOut;
		        }
		        if (func !== _noop) {
		            var newNode = func.call(impl, node, visitArgs);
		            if (node && impl.isReplacing) {
		                node = newNode;
		            }
		        }
		        if (visitArgs.visitDeeper && node) {
		            if (node.length) {
		                for (var i = 0, cnt = node.length; i < cnt; i++) {
		                    if (node[i].accept) {
		                        node[i].accept(this);
		                    }
		                }
		            }
		            else if (node.accept) {
		                node.accept(this);
		            }
		        }
		        if (funcOut != _noop) {
		            funcOut.call(impl, node);
		        }
		        return node;
		    };
		    Visitor.prototype.visitArray = function (nodes, nonReplacing) {
		        if (!nodes) {
		            return nodes;
		        }
		        var cnt = nodes.length;
		        var i;
		        // Non-replacing
		        if (nonReplacing || !this._implementation.isReplacing) {
		            for (i = 0; i < cnt; i++) {
		                this.visit(nodes[i]);
		            }
		            return nodes;
		        }
		        // Replacing
		        var out = [];
		        for (i = 0; i < cnt; i++) {
		            var evald = this.visit(nodes[i]);
		            if (evald === undefined) {
		                continue;
		            }
		            if (!evald.splice) {
		                out.push(evald);
		            }
		            else if (evald.length) {
		                this.flatten(evald, out);
		            }
		        }
		        return out;
		    };
		    Visitor.prototype.flatten = function (arr, out) {
		        if (!out) {
		            out = [];
		        }
		        var cnt, i, item, nestedCnt, j, nestedItem;
		        for (i = 0, cnt = arr.length; i < cnt; i++) {
		            item = arr[i];
		            if (item === undefined) {
		                continue;
		            }
		            if (!item.splice) {
		                out.push(item);
		                continue;
		            }
		            for (j = 0, nestedCnt = item.length; j < nestedCnt; j++) {
		                nestedItem = item[j];
		                if (nestedItem === undefined) {
		                    continue;
		                }
		                if (!nestedItem.splice) {
		                    out.push(nestedItem);
		                }
		                else if (nestedItem.length) {
		                    this.flatten(nestedItem, out);
		                }
		            }
		        }
		        return out;
		    };
		    return Visitor;
		}());
		visitor.default = Visitor;
		
		return visitor;
	}

	var importVisitor = {};

	var importSequencer = {};

	var hasRequiredImportSequencer;

	function requireImportSequencer () {
		if (hasRequiredImportSequencer) return importSequencer;
		hasRequiredImportSequencer = 1;
		Object.defineProperty(importSequencer, "__esModule", { value: true });
		var ImportSequencer = /** @class */ (function () {
		    function ImportSequencer(onSequencerEmpty) {
		        this.imports = [];
		        this.variableImports = [];
		        this._onSequencerEmpty = onSequencerEmpty;
		        this._currentDepth = 0;
		    }
		    ImportSequencer.prototype.addImport = function (callback) {
		        var importSequencer = this, importItem = {
		            callback: callback,
		            args: null,
		            isReady: false
		        };
		        this.imports.push(importItem);
		        return function () {
		            importItem.args = Array.prototype.slice.call(arguments, 0);
		            importItem.isReady = true;
		            importSequencer.tryRun();
		        };
		    };
		    ImportSequencer.prototype.addVariableImport = function (callback) {
		        this.variableImports.push(callback);
		    };
		    ImportSequencer.prototype.tryRun = function () {
		        this._currentDepth++;
		        try {
		            while (true) {
		                while (this.imports.length > 0) {
		                    var importItem = this.imports[0];
		                    if (!importItem.isReady) {
		                        return;
		                    }
		                    this.imports = this.imports.slice(1);
		                    importItem.callback.apply(null, importItem.args);
		                }
		                if (this.variableImports.length === 0) {
		                    break;
		                }
		                var variableImport = this.variableImports[0];
		                this.variableImports = this.variableImports.slice(1);
		                variableImport();
		            }
		        }
		        finally {
		            this._currentDepth--;
		        }
		        if (this._currentDepth === 0 && this._onSequencerEmpty) {
		            this._onSequencerEmpty();
		        }
		    };
		    return ImportSequencer;
		}());
		importSequencer.default = ImportSequencer;
		
		return importSequencer;
	}

	var hasRequiredImportVisitor;

	function requireImportVisitor () {
		if (hasRequiredImportVisitor) return importVisitor;
		hasRequiredImportVisitor = 1;
		Object.defineProperty(importVisitor, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var contexts_1 = tslib_1.__importDefault(requireContexts());
		var visitor_1 = tslib_1.__importDefault(requireVisitor());
		var import_sequencer_1 = tslib_1.__importDefault(requireImportSequencer());
		var utils = tslib_1.__importStar(requireUtils());
		var ImportVisitor = function (importer, finish) {
		    this._visitor = new visitor_1.default(this);
		    this._importer = importer;
		    this._finish = finish;
		    this.context = new contexts_1.default.Eval();
		    this.importCount = 0;
		    this.onceFileDetectionMap = {};
		    this.recursionDetector = {};
		    this._sequencer = new import_sequencer_1.default(this._onSequencerEmpty.bind(this));
		};
		ImportVisitor.prototype = {
		    isReplacing: false,
		    run: function (root) {
		        try {
		            // process the contents
		            this._visitor.visit(root);
		        }
		        catch (e) {
		            this.error = e;
		        }
		        this.isFinished = true;
		        this._sequencer.tryRun();
		    },
		    _onSequencerEmpty: function () {
		        if (!this.isFinished) {
		            return;
		        }
		        this._finish(this.error);
		    },
		    visitImport: function (importNode, visitArgs) {
		        var inlineCSS = importNode.options.inline;
		        if (!importNode.css || inlineCSS) {
		            var context = new contexts_1.default.Eval(this.context, utils.copyArray(this.context.frames));
		            var importParent = context.frames[0];
		            this.importCount++;
		            if (importNode.isVariableImport()) {
		                this._sequencer.addVariableImport(this.processImportNode.bind(this, importNode, context, importParent));
		            }
		            else {
		                this.processImportNode(importNode, context, importParent);
		            }
		        }
		        visitArgs.visitDeeper = false;
		    },
		    processImportNode: function (importNode, context, importParent) {
		        var evaldImportNode;
		        var inlineCSS = importNode.options.inline;
		        try {
		            evaldImportNode = importNode.evalForImport(context);
		        }
		        catch (e) {
		            if (!e.filename) {
		                e.index = importNode.getIndex();
		                e.filename = importNode.fileInfo().filename;
		            }
		            // attempt to eval properly and treat as css
		            importNode.css = true;
		            // if that fails, this error will be thrown
		            importNode.error = e;
		        }
		        if (evaldImportNode && (!evaldImportNode.css || inlineCSS)) {
		            if (evaldImportNode.options.multiple) {
		                context.importMultiple = true;
		            }
		            // try appending if we haven't determined if it is css or not
		            var tryAppendLessExtension = evaldImportNode.css === undefined;
		            for (var i = 0; i < importParent.rules.length; i++) {
		                if (importParent.rules[i] === importNode) {
		                    importParent.rules[i] = evaldImportNode;
		                    break;
		                }
		            }
		            var onImported = this.onImported.bind(this, evaldImportNode, context), sequencedOnImported = this._sequencer.addImport(onImported);
		            this._importer.push(evaldImportNode.getPath(), tryAppendLessExtension, evaldImportNode.fileInfo(), evaldImportNode.options, sequencedOnImported);
		        }
		        else {
		            this.importCount--;
		            if (this.isFinished) {
		                this._sequencer.tryRun();
		            }
		        }
		    },
		    onImported: function (importNode, context, e, root, importedAtRoot, fullPath) {
		        if (e) {
		            if (!e.filename) {
		                e.index = importNode.getIndex();
		                e.filename = importNode.fileInfo().filename;
		            }
		            this.error = e;
		        }
		        var importVisitor = this, inlineCSS = importNode.options.inline, isPlugin = importNode.options.isPlugin, isOptional = importNode.options.optional, duplicateImport = importedAtRoot || fullPath in importVisitor.recursionDetector;
		        if (!context.importMultiple) {
		            if (duplicateImport) {
		                importNode.skip = true;
		            }
		            else {
		                importNode.skip = function () {
		                    if (fullPath in importVisitor.onceFileDetectionMap) {
		                        return true;
		                    }
		                    importVisitor.onceFileDetectionMap[fullPath] = true;
		                    return false;
		                };
		            }
		        }
		        if (!fullPath && isOptional) {
		            importNode.skip = true;
		        }
		        if (root) {
		            importNode.root = root;
		            importNode.importedFilename = fullPath;
		            if (!inlineCSS && !isPlugin && (context.importMultiple || !duplicateImport)) {
		                importVisitor.recursionDetector[fullPath] = true;
		                var oldContext = this.context;
		                this.context = context;
		                try {
		                    this._visitor.visit(root);
		                }
		                catch (e) {
		                    this.error = e;
		                }
		                this.context = oldContext;
		            }
		        }
		        importVisitor.importCount--;
		        if (importVisitor.isFinished) {
		            importVisitor._sequencer.tryRun();
		        }
		    },
		    visitDeclaration: function (declNode, visitArgs) {
		        if (declNode.value.type === 'DetachedRuleset') {
		            this.context.frames.unshift(declNode);
		        }
		        else {
		            visitArgs.visitDeeper = false;
		        }
		    },
		    visitDeclarationOut: function (declNode) {
		        if (declNode.value.type === 'DetachedRuleset') {
		            this.context.frames.shift();
		        }
		    },
		    visitAtRule: function (atRuleNode, visitArgs) {
		        this.context.frames.unshift(atRuleNode);
		    },
		    visitAtRuleOut: function (atRuleNode) {
		        this.context.frames.shift();
		    },
		    visitMixinDefinition: function (mixinDefinitionNode, visitArgs) {
		        this.context.frames.unshift(mixinDefinitionNode);
		    },
		    visitMixinDefinitionOut: function (mixinDefinitionNode) {
		        this.context.frames.shift();
		    },
		    visitRuleset: function (rulesetNode, visitArgs) {
		        this.context.frames.unshift(rulesetNode);
		    },
		    visitRulesetOut: function (rulesetNode) {
		        this.context.frames.shift();
		    },
		    visitMedia: function (mediaNode, visitArgs) {
		        this.context.frames.unshift(mediaNode.rules[0]);
		    },
		    visitMediaOut: function (mediaNode) {
		        this.context.frames.shift();
		    }
		};
		importVisitor.default = ImportVisitor;
		
		return importVisitor;
	}

	var setTreeVisibilityVisitor = {};

	var hasRequiredSetTreeVisibilityVisitor;

	function requireSetTreeVisibilityVisitor () {
		if (hasRequiredSetTreeVisibilityVisitor) return setTreeVisibilityVisitor;
		hasRequiredSetTreeVisibilityVisitor = 1;
		Object.defineProperty(setTreeVisibilityVisitor, "__esModule", { value: true });
		var SetTreeVisibilityVisitor = /** @class */ (function () {
		    function SetTreeVisibilityVisitor(visible) {
		        this.visible = visible;
		    }
		    SetTreeVisibilityVisitor.prototype.run = function (root) {
		        this.visit(root);
		    };
		    SetTreeVisibilityVisitor.prototype.visitArray = function (nodes) {
		        if (!nodes) {
		            return nodes;
		        }
		        var cnt = nodes.length;
		        var i;
		        for (i = 0; i < cnt; i++) {
		            this.visit(nodes[i]);
		        }
		        return nodes;
		    };
		    SetTreeVisibilityVisitor.prototype.visit = function (node) {
		        if (!node) {
		            return node;
		        }
		        if (node.constructor === Array) {
		            return this.visitArray(node);
		        }
		        if (!node.blocksVisibility || node.blocksVisibility()) {
		            return node;
		        }
		        if (this.visible) {
		            node.ensureVisibility();
		        }
		        else {
		            node.ensureInvisibility();
		        }
		        node.accept(this);
		        return node;
		    };
		    return SetTreeVisibilityVisitor;
		}());
		setTreeVisibilityVisitor.default = SetTreeVisibilityVisitor;
		
		return setTreeVisibilityVisitor;
	}

	var extendVisitor = {};

	var hasRequiredExtendVisitor;

	function requireExtendVisitor () {
		if (hasRequiredExtendVisitor) return extendVisitor;
		hasRequiredExtendVisitor = 1;
		Object.defineProperty(extendVisitor, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var tree_1 = tslib_1.__importDefault(requireTree());
		var visitor_1 = tslib_1.__importDefault(requireVisitor());
		var logger_1 = tslib_1.__importDefault(requireLogger());
		var utils = tslib_1.__importStar(requireUtils());
		/* jshint loopfunc:true */
		var ExtendFinderVisitor = /** @class */ (function () {
		    function ExtendFinderVisitor() {
		        this._visitor = new visitor_1.default(this);
		        this.contexts = [];
		        this.allExtendsStack = [[]];
		    }
		    ExtendFinderVisitor.prototype.run = function (root) {
		        root = this._visitor.visit(root);
		        root.allExtends = this.allExtendsStack[0];
		        return root;
		    };
		    ExtendFinderVisitor.prototype.visitDeclaration = function (declNode, visitArgs) {
		        visitArgs.visitDeeper = false;
		    };
		    ExtendFinderVisitor.prototype.visitMixinDefinition = function (mixinDefinitionNode, visitArgs) {
		        visitArgs.visitDeeper = false;
		    };
		    ExtendFinderVisitor.prototype.visitRuleset = function (rulesetNode, visitArgs) {
		        if (rulesetNode.root) {
		            return;
		        }
		        var i;
		        var j;
		        var extend;
		        var allSelectorsExtendList = [];
		        var extendList;
		        // get &:extend(.a); rules which apply to all selectors in this ruleset
		        var rules = rulesetNode.rules, ruleCnt = rules ? rules.length : 0;
		        for (i = 0; i < ruleCnt; i++) {
		            if (rulesetNode.rules[i] instanceof tree_1.default.Extend) {
		                allSelectorsExtendList.push(rules[i]);
		                rulesetNode.extendOnEveryPath = true;
		            }
		        }
		        // now find every selector and apply the extends that apply to all extends
		        // and the ones which apply to an individual extend
		        var paths = rulesetNode.paths;
		        for (i = 0; i < paths.length; i++) {
		            var selectorPath = paths[i], selector = selectorPath[selectorPath.length - 1], selExtendList = selector.extendList;
		            extendList = selExtendList ? utils.copyArray(selExtendList).concat(allSelectorsExtendList)
		                : allSelectorsExtendList;
		            if (extendList) {
		                extendList = extendList.map(function (allSelectorsExtend) {
		                    return allSelectorsExtend.clone();
		                });
		            }
		            for (j = 0; j < extendList.length; j++) {
		                this.foundExtends = true;
		                extend = extendList[j];
		                extend.findSelfSelectors(selectorPath);
		                extend.ruleset = rulesetNode;
		                if (j === 0) {
		                    extend.firstExtendOnThisSelectorPath = true;
		                }
		                this.allExtendsStack[this.allExtendsStack.length - 1].push(extend);
		            }
		        }
		        this.contexts.push(rulesetNode.selectors);
		    };
		    ExtendFinderVisitor.prototype.visitRulesetOut = function (rulesetNode) {
		        if (!rulesetNode.root) {
		            this.contexts.length = this.contexts.length - 1;
		        }
		    };
		    ExtendFinderVisitor.prototype.visitMedia = function (mediaNode, visitArgs) {
		        mediaNode.allExtends = [];
		        this.allExtendsStack.push(mediaNode.allExtends);
		    };
		    ExtendFinderVisitor.prototype.visitMediaOut = function (mediaNode) {
		        this.allExtendsStack.length = this.allExtendsStack.length - 1;
		    };
		    ExtendFinderVisitor.prototype.visitAtRule = function (atRuleNode, visitArgs) {
		        atRuleNode.allExtends = [];
		        this.allExtendsStack.push(atRuleNode.allExtends);
		    };
		    ExtendFinderVisitor.prototype.visitAtRuleOut = function (atRuleNode) {
		        this.allExtendsStack.length = this.allExtendsStack.length - 1;
		    };
		    return ExtendFinderVisitor;
		}());
		var ProcessExtendsVisitor = /** @class */ (function () {
		    function ProcessExtendsVisitor() {
		        this._visitor = new visitor_1.default(this);
		    }
		    ProcessExtendsVisitor.prototype.run = function (root) {
		        var extendFinder = new ExtendFinderVisitor();
		        this.extendIndices = {};
		        extendFinder.run(root);
		        if (!extendFinder.foundExtends) {
		            return root;
		        }
		        root.allExtends = root.allExtends.concat(this.doExtendChaining(root.allExtends, root.allExtends));
		        this.allExtendsStack = [root.allExtends];
		        var newRoot = this._visitor.visit(root);
		        this.checkExtendsForNonMatched(root.allExtends);
		        return newRoot;
		    };
		    ProcessExtendsVisitor.prototype.checkExtendsForNonMatched = function (extendList) {
		        var indices = this.extendIndices;
		        extendList.filter(function (extend) {
		            return !extend.hasFoundMatches && extend.parent_ids.length == 1;
		        }).forEach(function (extend) {
		            var selector = '_unknown_';
		            try {
		                selector = extend.selector.toCSS({});
		            }
		            catch (_) { }
		            if (!indices[extend.index + " " + selector]) {
		                indices[extend.index + " " + selector] = true;
		                logger_1.default.warn("extend '" + selector + "' has no matches");
		            }
		        });
		    };
		    ProcessExtendsVisitor.prototype.doExtendChaining = function (extendsList, extendsListTarget, iterationCount) {
		        //
		        // chaining is different from normal extension.. if we extend an extend then we are not just copying, altering
		        // and pasting the selector we would do normally, but we are also adding an extend with the same target selector
		        // this means this new extend can then go and alter other extends
		        //
		        // this method deals with all the chaining work - without it, extend is flat and doesn't work on other extend selectors
		        // this is also the most expensive.. and a match on one selector can cause an extension of a selector we had already
		        // processed if we look at each selector at a time, as is done in visitRuleset
		        var extendIndex;
		        var targetExtendIndex;
		        var matches;
		        var extendsToAdd = [];
		        var newSelector;
		        var extendVisitor = this;
		        var selectorPath;
		        var extend;
		        var targetExtend;
		        var newExtend;
		        iterationCount = iterationCount || 0;
		        // loop through comparing every extend with every target extend.
		        // a target extend is the one on the ruleset we are looking at copy/edit/pasting in place
		        // e.g.  .a:extend(.b) {}  and .b:extend(.c) {} then the first extend extends the second one
		        // and the second is the target.
		        // the separation into two lists allows us to process a subset of chains with a bigger set, as is the
		        // case when processing media queries
		        for (extendIndex = 0; extendIndex < extendsList.length; extendIndex++) {
		            for (targetExtendIndex = 0; targetExtendIndex < extendsListTarget.length; targetExtendIndex++) {
		                extend = extendsList[extendIndex];
		                targetExtend = extendsListTarget[targetExtendIndex];
		                // look for circular references
		                if (extend.parent_ids.indexOf(targetExtend.object_id) >= 0) {
		                    continue;
		                }
		                // find a match in the target extends self selector (the bit before :extend)
		                selectorPath = [targetExtend.selfSelectors[0]];
		                matches = extendVisitor.findMatch(extend, selectorPath);
		                if (matches.length) {
		                    extend.hasFoundMatches = true;
		                    // we found a match, so for each self selector..
		                    extend.selfSelectors.forEach(function (selfSelector) {
		                        var info = targetExtend.visibilityInfo();
		                        // process the extend as usual
		                        newSelector = extendVisitor.extendSelector(matches, selectorPath, selfSelector, extend.isVisible());
		                        // but now we create a new extend from it
		                        newExtend = new (tree_1.default.Extend)(targetExtend.selector, targetExtend.option, 0, targetExtend.fileInfo(), info);
		                        newExtend.selfSelectors = newSelector;
		                        // add the extend onto the list of extends for that selector
		                        newSelector[newSelector.length - 1].extendList = [newExtend];
		                        // record that we need to add it.
		                        extendsToAdd.push(newExtend);
		                        newExtend.ruleset = targetExtend.ruleset;
		                        // remember its parents for circular references
		                        newExtend.parent_ids = newExtend.parent_ids.concat(targetExtend.parent_ids, extend.parent_ids);
		                        // only process the selector once.. if we have :extend(.a,.b) then multiple
		                        // extends will look at the same selector path, so when extending
		                        // we know that any others will be duplicates in terms of what is added to the css
		                        if (targetExtend.firstExtendOnThisSelectorPath) {
		                            newExtend.firstExtendOnThisSelectorPath = true;
		                            targetExtend.ruleset.paths.push(newSelector);
		                        }
		                    });
		                }
		            }
		        }
		        if (extendsToAdd.length) {
		            // try to detect circular references to stop a stack overflow.
		            // may no longer be needed.
		            this.extendChainCount++;
		            if (iterationCount > 100) {
		                var selectorOne = '{unable to calculate}';
		                var selectorTwo = '{unable to calculate}';
		                try {
		                    selectorOne = extendsToAdd[0].selfSelectors[0].toCSS();
		                    selectorTwo = extendsToAdd[0].selector.toCSS();
		                }
		                catch (e) { }
		                throw { message: "extend circular reference detected. One of the circular extends is currently:" + selectorOne + ":extend(" + selectorTwo + ")" };
		            }
		            // now process the new extends on the existing rules so that we can handle a extending b extending c extending
		            // d extending e...
		            return extendsToAdd.concat(extendVisitor.doExtendChaining(extendsToAdd, extendsListTarget, iterationCount + 1));
		        }
		        else {
		            return extendsToAdd;
		        }
		    };
		    ProcessExtendsVisitor.prototype.visitDeclaration = function (ruleNode, visitArgs) {
		        visitArgs.visitDeeper = false;
		    };
		    ProcessExtendsVisitor.prototype.visitMixinDefinition = function (mixinDefinitionNode, visitArgs) {
		        visitArgs.visitDeeper = false;
		    };
		    ProcessExtendsVisitor.prototype.visitSelector = function (selectorNode, visitArgs) {
		        visitArgs.visitDeeper = false;
		    };
		    ProcessExtendsVisitor.prototype.visitRuleset = function (rulesetNode, visitArgs) {
		        if (rulesetNode.root) {
		            return;
		        }
		        var matches;
		        var pathIndex;
		        var extendIndex;
		        var allExtends = this.allExtendsStack[this.allExtendsStack.length - 1];
		        var selectorsToAdd = [];
		        var extendVisitor = this;
		        var selectorPath;
		        // look at each selector path in the ruleset, find any extend matches and then copy, find and replace
		        for (extendIndex = 0; extendIndex < allExtends.length; extendIndex++) {
		            for (pathIndex = 0; pathIndex < rulesetNode.paths.length; pathIndex++) {
		                selectorPath = rulesetNode.paths[pathIndex];
		                // extending extends happens initially, before the main pass
		                if (rulesetNode.extendOnEveryPath) {
		                    continue;
		                }
		                var extendList = selectorPath[selectorPath.length - 1].extendList;
		                if (extendList && extendList.length) {
		                    continue;
		                }
		                matches = this.findMatch(allExtends[extendIndex], selectorPath);
		                if (matches.length) {
		                    allExtends[extendIndex].hasFoundMatches = true;
		                    allExtends[extendIndex].selfSelectors.forEach(function (selfSelector) {
		                        var extendedSelectors;
		                        extendedSelectors = extendVisitor.extendSelector(matches, selectorPath, selfSelector, allExtends[extendIndex].isVisible());
		                        selectorsToAdd.push(extendedSelectors);
		                    });
		                }
		            }
		        }
		        rulesetNode.paths = rulesetNode.paths.concat(selectorsToAdd);
		    };
		    ProcessExtendsVisitor.prototype.findMatch = function (extend, haystackSelectorPath) {
		        //
		        // look through the haystack selector path to try and find the needle - extend.selector
		        // returns an array of selector matches that can then be replaced
		        //
		        var haystackSelectorIndex;
		        var hackstackSelector;
		        var hackstackElementIndex;
		        var haystackElement;
		        var targetCombinator;
		        var i;
		        var extendVisitor = this;
		        var needleElements = extend.selector.elements;
		        var potentialMatches = [];
		        var potentialMatch;
		        var matches = [];
		        // loop through the haystack elements
		        for (haystackSelectorIndex = 0; haystackSelectorIndex < haystackSelectorPath.length; haystackSelectorIndex++) {
		            hackstackSelector = haystackSelectorPath[haystackSelectorIndex];
		            for (hackstackElementIndex = 0; hackstackElementIndex < hackstackSelector.elements.length; hackstackElementIndex++) {
		                haystackElement = hackstackSelector.elements[hackstackElementIndex];
		                // if we allow elements before our match we can add a potential match every time. otherwise only at the first element.
		                if (extend.allowBefore || (haystackSelectorIndex === 0 && hackstackElementIndex === 0)) {
		                    potentialMatches.push({ pathIndex: haystackSelectorIndex, index: hackstackElementIndex, matched: 0,
		                        initialCombinator: haystackElement.combinator });
		                }
		                for (i = 0; i < potentialMatches.length; i++) {
		                    potentialMatch = potentialMatches[i];
		                    // selectors add " " onto the first element. When we use & it joins the selectors together, but if we don't
		                    // then each selector in haystackSelectorPath has a space before it added in the toCSS phase. so we need to
		                    // work out what the resulting combinator will be
		                    targetCombinator = haystackElement.combinator.value;
		                    if (targetCombinator === '' && hackstackElementIndex === 0) {
		                        targetCombinator = ' ';
		                    }
		                    // if we don't match, null our match to indicate failure
		                    if (!extendVisitor.isElementValuesEqual(needleElements[potentialMatch.matched].value, haystackElement.value) ||
		                        (potentialMatch.matched > 0 && needleElements[potentialMatch.matched].combinator.value !== targetCombinator)) {
		                        potentialMatch = null;
		                    }
		                    else {
		                        potentialMatch.matched++;
		                    }
		                    // if we are still valid and have finished, test whether we have elements after and whether these are allowed
		                    if (potentialMatch) {
		                        potentialMatch.finished = potentialMatch.matched === needleElements.length;
		                        if (potentialMatch.finished &&
		                            (!extend.allowAfter &&
		                                (hackstackElementIndex + 1 < hackstackSelector.elements.length || haystackSelectorIndex + 1 < haystackSelectorPath.length))) {
		                            potentialMatch = null;
		                        }
		                    }
		                    // if null we remove, if not, we are still valid, so either push as a valid match or continue
		                    if (potentialMatch) {
		                        if (potentialMatch.finished) {
		                            potentialMatch.length = needleElements.length;
		                            potentialMatch.endPathIndex = haystackSelectorIndex;
		                            potentialMatch.endPathElementIndex = hackstackElementIndex + 1; // index after end of match
		                            potentialMatches.length = 0; // we don't allow matches to overlap, so start matching again
		                            matches.push(potentialMatch);
		                        }
		                    }
		                    else {
		                        potentialMatches.splice(i, 1);
		                        i--;
		                    }
		                }
		            }
		        }
		        return matches;
		    };
		    ProcessExtendsVisitor.prototype.isElementValuesEqual = function (elementValue1, elementValue2) {
		        if (typeof elementValue1 === 'string' || typeof elementValue2 === 'string') {
		            return elementValue1 === elementValue2;
		        }
		        if (elementValue1 instanceof tree_1.default.Attribute) {
		            if (elementValue1.op !== elementValue2.op || elementValue1.key !== elementValue2.key) {
		                return false;
		            }
		            if (!elementValue1.value || !elementValue2.value) {
		                if (elementValue1.value || elementValue2.value) {
		                    return false;
		                }
		                return true;
		            }
		            elementValue1 = elementValue1.value.value || elementValue1.value;
		            elementValue2 = elementValue2.value.value || elementValue2.value;
		            return elementValue1 === elementValue2;
		        }
		        elementValue1 = elementValue1.value;
		        elementValue2 = elementValue2.value;
		        if (elementValue1 instanceof tree_1.default.Selector) {
		            if (!(elementValue2 instanceof tree_1.default.Selector) || elementValue1.elements.length !== elementValue2.elements.length) {
		                return false;
		            }
		            for (var i = 0; i < elementValue1.elements.length; i++) {
		                if (elementValue1.elements[i].combinator.value !== elementValue2.elements[i].combinator.value) {
		                    if (i !== 0 || (elementValue1.elements[i].combinator.value || ' ') !== (elementValue2.elements[i].combinator.value || ' ')) {
		                        return false;
		                    }
		                }
		                if (!this.isElementValuesEqual(elementValue1.elements[i].value, elementValue2.elements[i].value)) {
		                    return false;
		                }
		            }
		            return true;
		        }
		        return false;
		    };
		    ProcessExtendsVisitor.prototype.extendSelector = function (matches, selectorPath, replacementSelector, isVisible) {
		        // for a set of matches, replace each match with the replacement selector
		        var currentSelectorPathIndex = 0, currentSelectorPathElementIndex = 0, path = [], matchIndex, selector, firstElement, match, newElements;
		        for (matchIndex = 0; matchIndex < matches.length; matchIndex++) {
		            match = matches[matchIndex];
		            selector = selectorPath[match.pathIndex];
		            firstElement = new tree_1.default.Element(match.initialCombinator, replacementSelector.elements[0].value, replacementSelector.elements[0].isVariable, replacementSelector.elements[0].getIndex(), replacementSelector.elements[0].fileInfo());
		            if (match.pathIndex > currentSelectorPathIndex && currentSelectorPathElementIndex > 0) {
		                path[path.length - 1].elements = path[path.length - 1]
		                    .elements.concat(selectorPath[currentSelectorPathIndex].elements.slice(currentSelectorPathElementIndex));
		                currentSelectorPathElementIndex = 0;
		                currentSelectorPathIndex++;
		            }
		            newElements = selector.elements
		                .slice(currentSelectorPathElementIndex, match.index)
		                .concat([firstElement])
		                .concat(replacementSelector.elements.slice(1));
		            if (currentSelectorPathIndex === match.pathIndex && matchIndex > 0) {
		                path[path.length - 1].elements =
		                    path[path.length - 1].elements.concat(newElements);
		            }
		            else {
		                path = path.concat(selectorPath.slice(currentSelectorPathIndex, match.pathIndex));
		                path.push(new tree_1.default.Selector(newElements));
		            }
		            currentSelectorPathIndex = match.endPathIndex;
		            currentSelectorPathElementIndex = match.endPathElementIndex;
		            if (currentSelectorPathElementIndex >= selectorPath[currentSelectorPathIndex].elements.length) {
		                currentSelectorPathElementIndex = 0;
		                currentSelectorPathIndex++;
		            }
		        }
		        if (currentSelectorPathIndex < selectorPath.length && currentSelectorPathElementIndex > 0) {
		            path[path.length - 1].elements = path[path.length - 1]
		                .elements.concat(selectorPath[currentSelectorPathIndex].elements.slice(currentSelectorPathElementIndex));
		            currentSelectorPathIndex++;
		        }
		        path = path.concat(selectorPath.slice(currentSelectorPathIndex, selectorPath.length));
		        path = path.map(function (currentValue) {
		            // we can re-use elements here, because the visibility property matters only for selectors
		            var derived = currentValue.createDerived(currentValue.elements);
		            if (isVisible) {
		                derived.ensureVisibility();
		            }
		            else {
		                derived.ensureInvisibility();
		            }
		            return derived;
		        });
		        return path;
		    };
		    ProcessExtendsVisitor.prototype.visitMedia = function (mediaNode, visitArgs) {
		        var newAllExtends = mediaNode.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
		        newAllExtends = newAllExtends.concat(this.doExtendChaining(newAllExtends, mediaNode.allExtends));
		        this.allExtendsStack.push(newAllExtends);
		    };
		    ProcessExtendsVisitor.prototype.visitMediaOut = function (mediaNode) {
		        var lastIndex = this.allExtendsStack.length - 1;
		        this.allExtendsStack.length = lastIndex;
		    };
		    ProcessExtendsVisitor.prototype.visitAtRule = function (atRuleNode, visitArgs) {
		        var newAllExtends = atRuleNode.allExtends.concat(this.allExtendsStack[this.allExtendsStack.length - 1]);
		        newAllExtends = newAllExtends.concat(this.doExtendChaining(newAllExtends, atRuleNode.allExtends));
		        this.allExtendsStack.push(newAllExtends);
		    };
		    ProcessExtendsVisitor.prototype.visitAtRuleOut = function (atRuleNode) {
		        var lastIndex = this.allExtendsStack.length - 1;
		        this.allExtendsStack.length = lastIndex;
		    };
		    return ProcessExtendsVisitor;
		}());
		extendVisitor.default = ProcessExtendsVisitor;
		
		return extendVisitor;
	}

	var joinSelectorVisitor = {};

	var hasRequiredJoinSelectorVisitor;

	function requireJoinSelectorVisitor () {
		if (hasRequiredJoinSelectorVisitor) return joinSelectorVisitor;
		hasRequiredJoinSelectorVisitor = 1;
		Object.defineProperty(joinSelectorVisitor, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var visitor_1 = tslib_1.__importDefault(requireVisitor());
		var JoinSelectorVisitor = /** @class */ (function () {
		    function JoinSelectorVisitor() {
		        this.contexts = [[]];
		        this._visitor = new visitor_1.default(this);
		    }
		    JoinSelectorVisitor.prototype.run = function (root) {
		        return this._visitor.visit(root);
		    };
		    JoinSelectorVisitor.prototype.visitDeclaration = function (declNode, visitArgs) {
		        visitArgs.visitDeeper = false;
		    };
		    JoinSelectorVisitor.prototype.visitMixinDefinition = function (mixinDefinitionNode, visitArgs) {
		        visitArgs.visitDeeper = false;
		    };
		    JoinSelectorVisitor.prototype.visitRuleset = function (rulesetNode, visitArgs) {
		        var context = this.contexts[this.contexts.length - 1];
		        var paths = [];
		        var selectors;
		        this.contexts.push(paths);
		        if (!rulesetNode.root) {
		            selectors = rulesetNode.selectors;
		            if (selectors) {
		                selectors = selectors.filter(function (selector) { return selector.getIsOutput(); });
		                rulesetNode.selectors = selectors.length ? selectors : (selectors = null);
		                if (selectors) {
		                    rulesetNode.joinSelectors(paths, context, selectors);
		                }
		            }
		            if (!selectors) {
		                rulesetNode.rules = null;
		            }
		            rulesetNode.paths = paths;
		        }
		    };
		    JoinSelectorVisitor.prototype.visitRulesetOut = function (rulesetNode) {
		        this.contexts.length = this.contexts.length - 1;
		    };
		    JoinSelectorVisitor.prototype.visitMedia = function (mediaNode, visitArgs) {
		        var context = this.contexts[this.contexts.length - 1];
		        mediaNode.rules[0].root = (context.length === 0 || context[0].multiMedia);
		    };
		    JoinSelectorVisitor.prototype.visitAtRule = function (atRuleNode, visitArgs) {
		        var context = this.contexts[this.contexts.length - 1];
		        if (atRuleNode.rules && atRuleNode.rules.length) {
		            atRuleNode.rules[0].root = (atRuleNode.isRooted || context.length === 0 || null);
		        }
		    };
		    return JoinSelectorVisitor;
		}());
		joinSelectorVisitor.default = JoinSelectorVisitor;
		
		return joinSelectorVisitor;
	}

	var toCssVisitor = {};

	var hasRequiredToCssVisitor;

	function requireToCssVisitor () {
		if (hasRequiredToCssVisitor) return toCssVisitor;
		hasRequiredToCssVisitor = 1;
		Object.defineProperty(toCssVisitor, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var tree_1 = tslib_1.__importDefault(requireTree());
		var visitor_1 = tslib_1.__importDefault(requireVisitor());
		var CSSVisitorUtils = /** @class */ (function () {
		    function CSSVisitorUtils(context) {
		        this._visitor = new visitor_1.default(this);
		        this._context = context;
		    }
		    CSSVisitorUtils.prototype.containsSilentNonBlockedChild = function (bodyRules) {
		        var rule;
		        if (!bodyRules) {
		            return false;
		        }
		        for (var r = 0; r < bodyRules.length; r++) {
		            rule = bodyRules[r];
		            if (rule.isSilent && rule.isSilent(this._context) && !rule.blocksVisibility()) {
		                // the atrule contains something that was referenced (likely by extend)
		                // therefore it needs to be shown in output too
		                return true;
		            }
		        }
		        return false;
		    };
		    CSSVisitorUtils.prototype.keepOnlyVisibleChilds = function (owner) {
		        if (owner && owner.rules) {
		            owner.rules = owner.rules.filter(function (thing) { return thing.isVisible(); });
		        }
		    };
		    CSSVisitorUtils.prototype.isEmpty = function (owner) {
		        return (owner && owner.rules)
		            ? (owner.rules.length === 0) : true;
		    };
		    CSSVisitorUtils.prototype.hasVisibleSelector = function (rulesetNode) {
		        return (rulesetNode && rulesetNode.paths)
		            ? (rulesetNode.paths.length > 0) : false;
		    };
		    CSSVisitorUtils.prototype.resolveVisibility = function (node, originalRules) {
		        if (!node.blocksVisibility()) {
		            if (this.isEmpty(node) && !this.containsSilentNonBlockedChild(originalRules)) {
		                return;
		            }
		            return node;
		        }
		        var compiledRulesBody = node.rules[0];
		        this.keepOnlyVisibleChilds(compiledRulesBody);
		        if (this.isEmpty(compiledRulesBody)) {
		            return;
		        }
		        node.ensureVisibility();
		        node.removeVisibilityBlock();
		        return node;
		    };
		    CSSVisitorUtils.prototype.isVisibleRuleset = function (rulesetNode) {
		        if (rulesetNode.firstRoot) {
		            return true;
		        }
		        if (this.isEmpty(rulesetNode)) {
		            return false;
		        }
		        if (!rulesetNode.root && !this.hasVisibleSelector(rulesetNode)) {
		            return false;
		        }
		        return true;
		    };
		    return CSSVisitorUtils;
		}());
		var ToCSSVisitor = function (context) {
		    this._visitor = new visitor_1.default(this);
		    this._context = context;
		    this.utils = new CSSVisitorUtils(context);
		};
		ToCSSVisitor.prototype = {
		    isReplacing: true,
		    run: function (root) {
		        return this._visitor.visit(root);
		    },
		    visitDeclaration: function (declNode, visitArgs) {
		        if (declNode.blocksVisibility() || declNode.variable) {
		            return;
		        }
		        return declNode;
		    },
		    visitMixinDefinition: function (mixinNode, visitArgs) {
		        // mixin definitions do not get eval'd - this means they keep state
		        // so we have to clear that state here so it isn't used if toCSS is called twice
		        mixinNode.frames = [];
		    },
		    visitExtend: function (extendNode, visitArgs) {
		    },
		    visitComment: function (commentNode, visitArgs) {
		        if (commentNode.blocksVisibility() || commentNode.isSilent(this._context)) {
		            return;
		        }
		        return commentNode;
		    },
		    visitMedia: function (mediaNode, visitArgs) {
		        var originalRules = mediaNode.rules[0].rules;
		        mediaNode.accept(this._visitor);
		        visitArgs.visitDeeper = false;
		        return this.utils.resolveVisibility(mediaNode, originalRules);
		    },
		    visitImport: function (importNode, visitArgs) {
		        if (importNode.blocksVisibility()) {
		            return;
		        }
		        return importNode;
		    },
		    visitAtRule: function (atRuleNode, visitArgs) {
		        if (atRuleNode.rules && atRuleNode.rules.length) {
		            return this.visitAtRuleWithBody(atRuleNode, visitArgs);
		        }
		        else {
		            return this.visitAtRuleWithoutBody(atRuleNode, visitArgs);
		        }
		    },
		    visitAnonymous: function (anonymousNode, visitArgs) {
		        if (!anonymousNode.blocksVisibility()) {
		            anonymousNode.accept(this._visitor);
		            return anonymousNode;
		        }
		    },
		    visitAtRuleWithBody: function (atRuleNode, visitArgs) {
		        // if there is only one nested ruleset and that one has no path, then it is
		        // just fake ruleset
		        function hasFakeRuleset(atRuleNode) {
		            var bodyRules = atRuleNode.rules;
		            return bodyRules.length === 1 && (!bodyRules[0].paths || bodyRules[0].paths.length === 0);
		        }
		        function getBodyRules(atRuleNode) {
		            var nodeRules = atRuleNode.rules;
		            if (hasFakeRuleset(atRuleNode)) {
		                return nodeRules[0].rules;
		            }
		            return nodeRules;
		        }
		        // it is still true that it is only one ruleset in array
		        // this is last such moment
		        // process childs
		        var originalRules = getBodyRules(atRuleNode);
		        atRuleNode.accept(this._visitor);
		        visitArgs.visitDeeper = false;
		        if (!this.utils.isEmpty(atRuleNode)) {
		            this._mergeRules(atRuleNode.rules[0].rules);
		        }
		        return this.utils.resolveVisibility(atRuleNode, originalRules);
		    },
		    visitAtRuleWithoutBody: function (atRuleNode, visitArgs) {
		        if (atRuleNode.blocksVisibility()) {
		            return;
		        }
		        if (atRuleNode.name === '@charset') {
		            // Only output the debug info together with subsequent @charset definitions
		            // a comment (or @media statement) before the actual @charset atrule would
		            // be considered illegal css as it has to be on the first line
		            if (this.charset) {
		                if (atRuleNode.debugInfo) {
		                    var comment = new tree_1.default.Comment("/* " + atRuleNode.toCSS(this._context).replace(/\n/g, '') + " */\n");
		                    comment.debugInfo = atRuleNode.debugInfo;
		                    return this._visitor.visit(comment);
		                }
		                return;
		            }
		            this.charset = true;
		        }
		        return atRuleNode;
		    },
		    checkValidNodes: function (rules, isRoot) {
		        if (!rules) {
		            return;
		        }
		        for (var i = 0; i < rules.length; i++) {
		            var ruleNode = rules[i];
		            if (isRoot && ruleNode instanceof tree_1.default.Declaration && !ruleNode.variable) {
		                throw { message: 'Properties must be inside selector blocks. They cannot be in the root',
		                    index: ruleNode.getIndex(), filename: ruleNode.fileInfo() && ruleNode.fileInfo().filename };
		            }
		            if (ruleNode instanceof tree_1.default.Call) {
		                throw { message: "Function '" + ruleNode.name + "' did not return a root node",
		                    index: ruleNode.getIndex(), filename: ruleNode.fileInfo() && ruleNode.fileInfo().filename };
		            }
		            if (ruleNode.type && !ruleNode.allowRoot) {
		                throw { message: ruleNode.type + " node returned by a function is not valid here",
		                    index: ruleNode.getIndex(), filename: ruleNode.fileInfo() && ruleNode.fileInfo().filename };
		            }
		        }
		    },
		    visitRuleset: function (rulesetNode, visitArgs) {
		        // at this point rulesets are nested into each other
		        var rule;
		        var rulesets = [];
		        this.checkValidNodes(rulesetNode.rules, rulesetNode.firstRoot);
		        if (!rulesetNode.root) {
		            // remove invisible paths
		            this._compileRulesetPaths(rulesetNode);
		            // remove rulesets from this ruleset body and compile them separately
		            var nodeRules = rulesetNode.rules;
		            var nodeRuleCnt = nodeRules ? nodeRules.length : 0;
		            for (var i = 0; i < nodeRuleCnt;) {
		                rule = nodeRules[i];
		                if (rule && rule.rules) {
		                    // visit because we are moving them out from being a child
		                    rulesets.push(this._visitor.visit(rule));
		                    nodeRules.splice(i, 1);
		                    nodeRuleCnt--;
		                    continue;
		                }
		                i++;
		            }
		            // accept the visitor to remove rules and refactor itself
		            // then we can decide nogw whether we want it or not
		            // compile body
		            if (nodeRuleCnt > 0) {
		                rulesetNode.accept(this._visitor);
		            }
		            else {
		                rulesetNode.rules = null;
		            }
		            visitArgs.visitDeeper = false;
		        }
		        else { // if (! rulesetNode.root) {
		            rulesetNode.accept(this._visitor);
		            visitArgs.visitDeeper = false;
		        }
		        if (rulesetNode.rules) {
		            this._mergeRules(rulesetNode.rules);
		            this._removeDuplicateRules(rulesetNode.rules);
		        }
		        // now decide whether we keep the ruleset
		        if (this.utils.isVisibleRuleset(rulesetNode)) {
		            rulesetNode.ensureVisibility();
		            rulesets.splice(0, 0, rulesetNode);
		        }
		        if (rulesets.length === 1) {
		            return rulesets[0];
		        }
		        return rulesets;
		    },
		    _compileRulesetPaths: function (rulesetNode) {
		        if (rulesetNode.paths) {
		            rulesetNode.paths = rulesetNode.paths
		                .filter(function (p) {
		                var i;
		                if (p[0].elements[0].combinator.value === ' ') {
		                    p[0].elements[0].combinator = new (tree_1.default.Combinator)('');
		                }
		                for (i = 0; i < p.length; i++) {
		                    if (p[i].isVisible() && p[i].getIsOutput()) {
		                        return true;
		                    }
		                }
		                return false;
		            });
		        }
		    },
		    _removeDuplicateRules: function (rules) {
		        if (!rules) {
		            return;
		        }
		        // remove duplicates
		        var ruleCache = {};
		        var ruleList;
		        var rule;
		        var i;
		        for (i = rules.length - 1; i >= 0; i--) {
		            rule = rules[i];
		            if (rule instanceof tree_1.default.Declaration) {
		                if (!ruleCache[rule.name]) {
		                    ruleCache[rule.name] = rule;
		                }
		                else {
		                    ruleList = ruleCache[rule.name];
		                    if (ruleList instanceof tree_1.default.Declaration) {
		                        ruleList = ruleCache[rule.name] = [ruleCache[rule.name].toCSS(this._context)];
		                    }
		                    var ruleCSS = rule.toCSS(this._context);
		                    if (ruleList.indexOf(ruleCSS) !== -1) {
		                        rules.splice(i, 1);
		                    }
		                    else {
		                        ruleList.push(ruleCSS);
		                    }
		                }
		            }
		        }
		    },
		    _mergeRules: function (rules) {
		        if (!rules) {
		            return;
		        }
		        var groups = {};
		        var groupsArr = [];
		        for (var i = 0; i < rules.length; i++) {
		            var rule = rules[i];
		            if (rule.merge) {
		                var key = rule.name;
		                groups[key] ? rules.splice(i--, 1) :
		                    groupsArr.push(groups[key] = []);
		                groups[key].push(rule);
		            }
		        }
		        groupsArr.forEach(function (group) {
		            if (group.length > 0) {
		                var result_1 = group[0];
		                var space_1 = [];
		                var comma_1 = [new tree_1.default.Expression(space_1)];
		                group.forEach(function (rule) {
		                    if ((rule.merge === '+') && (space_1.length > 0)) {
		                        comma_1.push(new tree_1.default.Expression(space_1 = []));
		                    }
		                    space_1.push(rule.value);
		                    result_1.important = result_1.important || rule.important;
		                });
		                result_1.value = new tree_1.default.Value(comma_1);
		            }
		        });
		    }
		};
		toCssVisitor.default = ToCSSVisitor;
		
		return toCssVisitor;
	}

	var hasRequiredVisitors;

	function requireVisitors () {
		if (hasRequiredVisitors) return visitors;
		hasRequiredVisitors = 1;
		Object.defineProperty(visitors, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var visitor_1 = tslib_1.__importDefault(requireVisitor());
		var import_visitor_1 = tslib_1.__importDefault(requireImportVisitor());
		var set_tree_visibility_visitor_1 = tslib_1.__importDefault(requireSetTreeVisibilityVisitor());
		var extend_visitor_1 = tslib_1.__importDefault(requireExtendVisitor());
		var join_selector_visitor_1 = tslib_1.__importDefault(requireJoinSelectorVisitor());
		var to_css_visitor_1 = tslib_1.__importDefault(requireToCssVisitor());
		visitors.default = {
		    Visitor: visitor_1.default,
		    ImportVisitor: import_visitor_1.default,
		    MarkVisibleSelectorsVisitor: set_tree_visibility_visitor_1.default,
		    ExtendVisitor: extend_visitor_1.default,
		    JoinSelectorVisitor: join_selector_visitor_1.default,
		    ToCSSVisitor: to_css_visitor_1.default
		};
		
		return visitors;
	}

	var parser = {};

	var parserInput = {};

	var chunker = {};

	var hasRequiredChunker;

	function requireChunker () {
		if (hasRequiredChunker) return chunker;
		hasRequiredChunker = 1;
		Object.defineProperty(chunker, "__esModule", { value: true });
		// Split the input into chunks.
		function default_1(input, fail) {
		    var len = input.length;
		    var level = 0;
		    var parenLevel = 0;
		    var lastOpening;
		    var lastOpeningParen;
		    var lastMultiComment;
		    var lastMultiCommentEndBrace;
		    var chunks = [];
		    var emitFrom = 0;
		    var chunkerCurrentIndex;
		    var currentChunkStartIndex;
		    var cc;
		    var cc2;
		    var matched;
		    function emitChunk(force) {
		        var len = chunkerCurrentIndex - emitFrom;
		        if (((len < 512) && !force) || !len) {
		            return;
		        }
		        chunks.push(input.slice(emitFrom, chunkerCurrentIndex + 1));
		        emitFrom = chunkerCurrentIndex + 1;
		    }
		    for (chunkerCurrentIndex = 0; chunkerCurrentIndex < len; chunkerCurrentIndex++) {
		        cc = input.charCodeAt(chunkerCurrentIndex);
		        if (((cc >= 97) && (cc <= 122)) || (cc < 34)) {
		            // a-z or whitespace
		            continue;
		        }
		        switch (cc) {
		            case 40: // (
		                parenLevel++;
		                lastOpeningParen = chunkerCurrentIndex;
		                continue;
		            case 41: // )
		                if (--parenLevel < 0) {
		                    return fail('missing opening `(`', chunkerCurrentIndex);
		                }
		                continue;
		            case 59: // ;
		                if (!parenLevel) {
		                    emitChunk();
		                }
		                continue;
		            case 123: // {
		                level++;
		                lastOpening = chunkerCurrentIndex;
		                continue;
		            case 125: // }
		                if (--level < 0) {
		                    return fail('missing opening `{`', chunkerCurrentIndex);
		                }
		                if (!level && !parenLevel) {
		                    emitChunk();
		                }
		                continue;
		            case 92: // \
		                if (chunkerCurrentIndex < len - 1) {
		                    chunkerCurrentIndex++;
		                    continue;
		                }
		                return fail('unescaped `\\`', chunkerCurrentIndex);
		            case 34:
		            case 39:
		            case 96: // ", ' and `
		                matched = 0;
		                currentChunkStartIndex = chunkerCurrentIndex;
		                for (chunkerCurrentIndex = chunkerCurrentIndex + 1; chunkerCurrentIndex < len; chunkerCurrentIndex++) {
		                    cc2 = input.charCodeAt(chunkerCurrentIndex);
		                    if (cc2 > 96) {
		                        continue;
		                    }
		                    if (cc2 == cc) {
		                        matched = 1;
		                        break;
		                    }
		                    if (cc2 == 92) { // \
		                        if (chunkerCurrentIndex == len - 1) {
		                            return fail('unescaped `\\`', chunkerCurrentIndex);
		                        }
		                        chunkerCurrentIndex++;
		                    }
		                }
		                if (matched) {
		                    continue;
		                }
		                return fail("unmatched `" + String.fromCharCode(cc) + "`", currentChunkStartIndex);
		            case 47: // /, check for comment
		                if (parenLevel || (chunkerCurrentIndex == len - 1)) {
		                    continue;
		                }
		                cc2 = input.charCodeAt(chunkerCurrentIndex + 1);
		                if (cc2 == 47) {
		                    // //, find lnfeed
		                    for (chunkerCurrentIndex = chunkerCurrentIndex + 2; chunkerCurrentIndex < len; chunkerCurrentIndex++) {
		                        cc2 = input.charCodeAt(chunkerCurrentIndex);
		                        if ((cc2 <= 13) && ((cc2 == 10) || (cc2 == 13))) {
		                            break;
		                        }
		                    }
		                }
		                else if (cc2 == 42) {
		                    // /*, find */
		                    lastMultiComment = currentChunkStartIndex = chunkerCurrentIndex;
		                    for (chunkerCurrentIndex = chunkerCurrentIndex + 2; chunkerCurrentIndex < len - 1; chunkerCurrentIndex++) {
		                        cc2 = input.charCodeAt(chunkerCurrentIndex);
		                        if (cc2 == 125) {
		                            lastMultiCommentEndBrace = chunkerCurrentIndex;
		                        }
		                        if (cc2 != 42) {
		                            continue;
		                        }
		                        if (input.charCodeAt(chunkerCurrentIndex + 1) == 47) {
		                            break;
		                        }
		                    }
		                    if (chunkerCurrentIndex == len - 1) {
		                        return fail('missing closing `*/`', currentChunkStartIndex);
		                    }
		                    chunkerCurrentIndex++;
		                }
		                continue;
		            case 42: // *, check for unmatched */
		                if ((chunkerCurrentIndex < len - 1) && (input.charCodeAt(chunkerCurrentIndex + 1) == 47)) {
		                    return fail('unmatched `/*`', chunkerCurrentIndex);
		                }
		                continue;
		        }
		    }
		    if (level !== 0) {
		        if ((lastMultiComment > lastOpening) && (lastMultiCommentEndBrace > lastMultiComment)) {
		            return fail('missing closing `}` or `*/`', lastOpening);
		        }
		        else {
		            return fail('missing closing `}`', lastOpening);
		        }
		    }
		    else if (parenLevel !== 0) {
		        return fail('missing closing `)`', lastOpeningParen);
		    }
		    emitChunk(true);
		    return chunks;
		}
		chunker.default = default_1;
		
		return chunker;
	}

	var hasRequiredParserInput;

	function requireParserInput () {
		if (hasRequiredParserInput) return parserInput;
		hasRequiredParserInput = 1;
		Object.defineProperty(parserInput, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var chunker_1 = tslib_1.__importDefault(requireChunker());
		parserInput.default = (function () {
		    var // Less input string
		    input;
		    var // current chunk
		    j;
		    var // holds state for backtracking
		    saveStack = [];
		    var // furthest index the parser has gone to
		    furthest;
		    var // if this is furthest we got to, this is the probably cause
		    furthestPossibleErrorMessage;
		    var // chunkified input
		    chunks;
		    var // current chunk
		    current;
		    var // index of current chunk, in `input`
		    currentPos;
		    var parserInput = {};
		    var CHARCODE_SPACE = 32;
		    var CHARCODE_TAB = 9;
		    var CHARCODE_LF = 10;
		    var CHARCODE_CR = 13;
		    var CHARCODE_PLUS = 43;
		    var CHARCODE_COMMA = 44;
		    var CHARCODE_FORWARD_SLASH = 47;
		    var CHARCODE_9 = 57;
		    function skipWhitespace(length) {
		        var oldi = parserInput.i;
		        var oldj = j;
		        var curr = parserInput.i - currentPos;
		        var endIndex = parserInput.i + current.length - curr;
		        var mem = (parserInput.i += length);
		        var inp = input;
		        var c;
		        var nextChar;
		        var comment;
		        for (; parserInput.i < endIndex; parserInput.i++) {
		            c = inp.charCodeAt(parserInput.i);
		            if (parserInput.autoCommentAbsorb && c === CHARCODE_FORWARD_SLASH) {
		                nextChar = inp.charAt(parserInput.i + 1);
		                if (nextChar === '/') {
		                    comment = { index: parserInput.i, isLineComment: true };
		                    var nextNewLine = inp.indexOf('\n', parserInput.i + 2);
		                    if (nextNewLine < 0) {
		                        nextNewLine = endIndex;
		                    }
		                    parserInput.i = nextNewLine;
		                    comment.text = inp.substr(comment.index, parserInput.i - comment.index);
		                    parserInput.commentStore.push(comment);
		                    continue;
		                }
		                else if (nextChar === '*') {
		                    var nextStarSlash = inp.indexOf('*/', parserInput.i + 2);
		                    if (nextStarSlash >= 0) {
		                        comment = {
		                            index: parserInput.i,
		                            text: inp.substr(parserInput.i, nextStarSlash + 2 - parserInput.i),
		                            isLineComment: false
		                        };
		                        parserInput.i += comment.text.length - 1;
		                        parserInput.commentStore.push(comment);
		                        continue;
		                    }
		                }
		                break;
		            }
		            if ((c !== CHARCODE_SPACE) && (c !== CHARCODE_LF) && (c !== CHARCODE_TAB) && (c !== CHARCODE_CR)) {
		                break;
		            }
		        }
		        current = current.slice(length + parserInput.i - mem + curr);
		        currentPos = parserInput.i;
		        if (!current.length) {
		            if (j < chunks.length - 1) {
		                current = chunks[++j];
		                skipWhitespace(0); // skip space at the beginning of a chunk
		                return true; // things changed
		            }
		            parserInput.finished = true;
		        }
		        return oldi !== parserInput.i || oldj !== j;
		    }
		    parserInput.save = function () {
		        currentPos = parserInput.i;
		        saveStack.push({ current: current, i: parserInput.i, j: j });
		    };
		    parserInput.restore = function (possibleErrorMessage) {
		        if (parserInput.i > furthest || (parserInput.i === furthest && possibleErrorMessage && !furthestPossibleErrorMessage)) {
		            furthest = parserInput.i;
		            furthestPossibleErrorMessage = possibleErrorMessage;
		        }
		        var state = saveStack.pop();
		        current = state.current;
		        currentPos = parserInput.i = state.i;
		        j = state.j;
		    };
		    parserInput.forget = function () {
		        saveStack.pop();
		    };
		    parserInput.isWhitespace = function (offset) {
		        var pos = parserInput.i + (offset || 0);
		        var code = input.charCodeAt(pos);
		        return (code === CHARCODE_SPACE || code === CHARCODE_CR || code === CHARCODE_TAB || code === CHARCODE_LF);
		    };
		    // Specialization of $(tok)
		    parserInput.$re = function (tok) {
		        if (parserInput.i > currentPos) {
		            current = current.slice(parserInput.i - currentPos);
		            currentPos = parserInput.i;
		        }
		        var m = tok.exec(current);
		        if (!m) {
		            return null;
		        }
		        skipWhitespace(m[0].length);
		        if (typeof m === 'string') {
		            return m;
		        }
		        return m.length === 1 ? m[0] : m;
		    };
		    parserInput.$char = function (tok) {
		        if (input.charAt(parserInput.i) !== tok) {
		            return null;
		        }
		        skipWhitespace(1);
		        return tok;
		    };
		    parserInput.$str = function (tok) {
		        var tokLength = tok.length;
		        // https://jsperf.com/string-startswith/21
		        for (var i = 0; i < tokLength; i++) {
		            if (input.charAt(parserInput.i + i) !== tok.charAt(i)) {
		                return null;
		            }
		        }
		        skipWhitespace(tokLength);
		        return tok;
		    };
		    parserInput.$quoted = function (loc) {
		        var pos = loc || parserInput.i;
		        var startChar = input.charAt(pos);
		        if (startChar !== '\'' && startChar !== '"') {
		            return;
		        }
		        var length = input.length;
		        var currentPosition = pos;
		        for (var i = 1; i + currentPosition < length; i++) {
		            var nextChar = input.charAt(i + currentPosition);
		            switch (nextChar) {
		                case '\\':
		                    i++;
		                    continue;
		                case '\r':
		                case '\n':
		                    break;
		                case startChar:
		                    var str = input.substr(currentPosition, i + 1);
		                    if (!loc && loc !== 0) {
		                        skipWhitespace(i + 1);
		                        return str;
		                    }
		                    return [startChar, str];
		            }
		        }
		        return null;
		    };
		    /**
		     * Permissive parsing. Ignores everything except matching {} [] () and quotes
		     * until matching token (outside of blocks)
		     */
		    parserInput.$parseUntil = function (tok) {
		        var quote = '';
		        var returnVal = null;
		        var inComment = false;
		        var blockDepth = 0;
		        var blockStack = [];
		        var parseGroups = [];
		        var length = input.length;
		        var startPos = parserInput.i;
		        var lastPos = parserInput.i;
		        var i = parserInput.i;
		        var loop = true;
		        var testChar;
		        if (typeof tok === 'string') {
		            testChar = function (char) { return char === tok; };
		        }
		        else {
		            testChar = function (char) { return tok.test(char); };
		        }
		        do {
		            var nextChar = input.charAt(i);
		            if (blockDepth === 0 && testChar(nextChar)) {
		                returnVal = input.substr(lastPos, i - lastPos);
		                if (returnVal) {
		                    parseGroups.push(returnVal);
		                }
		                else {
		                    parseGroups.push(' ');
		                }
		                returnVal = parseGroups;
		                skipWhitespace(i - startPos);
		                loop = false;
		            }
		            else {
		                if (inComment) {
		                    if (nextChar === '*' &&
		                        input.charAt(i + 1) === '/') {
		                        i++;
		                        blockDepth--;
		                        inComment = false;
		                    }
		                    i++;
		                    continue;
		                }
		                switch (nextChar) {
		                    case '\\':
		                        i++;
		                        nextChar = input.charAt(i);
		                        parseGroups.push(input.substr(lastPos, i - lastPos + 1));
		                        lastPos = i + 1;
		                        break;
		                    case '/':
		                        if (input.charAt(i + 1) === '*') {
		                            i++;
		                            inComment = true;
		                            blockDepth++;
		                        }
		                        break;
		                    case '\'':
		                    case '"':
		                        quote = parserInput.$quoted(i);
		                        if (quote) {
		                            parseGroups.push(input.substr(lastPos, i - lastPos), quote);
		                            i += quote[1].length - 1;
		                            lastPos = i + 1;
		                        }
		                        else {
		                            skipWhitespace(i - startPos);
		                            returnVal = nextChar;
		                            loop = false;
		                        }
		                        break;
		                    case '{':
		                        blockStack.push('}');
		                        blockDepth++;
		                        break;
		                    case '(':
		                        blockStack.push(')');
		                        blockDepth++;
		                        break;
		                    case '[':
		                        blockStack.push(']');
		                        blockDepth++;
		                        break;
		                    case '}':
		                    case ')':
		                    case ']':
		                        var expected = blockStack.pop();
		                        if (nextChar === expected) {
		                            blockDepth--;
		                        }
		                        else {
		                            // move the parser to the error and return expected
		                            skipWhitespace(i - startPos);
		                            returnVal = expected;
		                            loop = false;
		                        }
		                }
		                i++;
		                if (i > length) {
		                    loop = false;
		                }
		            }
		        } while (loop);
		        return returnVal ? returnVal : null;
		    };
		    parserInput.autoCommentAbsorb = true;
		    parserInput.commentStore = [];
		    parserInput.finished = false;
		    // Same as $(), but don't change the state of the parser,
		    // just return the match.
		    parserInput.peek = function (tok) {
		        if (typeof tok === 'string') {
		            // https://jsperf.com/string-startswith/21
		            for (var i = 0; i < tok.length; i++) {
		                if (input.charAt(parserInput.i + i) !== tok.charAt(i)) {
		                    return false;
		                }
		            }
		            return true;
		        }
		        else {
		            return tok.test(current);
		        }
		    };
		    // Specialization of peek()
		    // TODO remove or change some currentChar calls to peekChar
		    parserInput.peekChar = function (tok) { return input.charAt(parserInput.i) === tok; };
		    parserInput.currentChar = function () { return input.charAt(parserInput.i); };
		    parserInput.prevChar = function () { return input.charAt(parserInput.i - 1); };
		    parserInput.getInput = function () { return input; };
		    parserInput.peekNotNumeric = function () {
		        var c = input.charCodeAt(parserInput.i);
		        // Is the first char of the dimension 0-9, '.', '+' or '-'
		        return (c > CHARCODE_9 || c < CHARCODE_PLUS) || c === CHARCODE_FORWARD_SLASH || c === CHARCODE_COMMA;
		    };
		    parserInput.start = function (str, chunkInput, failFunction) {
		        input = str;
		        parserInput.i = j = currentPos = furthest = 0;
		        // chunking apparently makes things quicker (but my tests indicate
		        // it might actually make things slower in node at least)
		        // and it is a non-perfect parse - it can't recognise
		        // unquoted urls, meaning it can't distinguish comments
		        // meaning comments with quotes or {}() in them get 'counted'
		        // and then lead to parse errors.
		        // In addition if the chunking chunks in the wrong place we might
		        // not be able to parse a parser statement in one go
		        // this is officially deprecated but can be switched on via an option
		        // in the case it causes too much performance issues.
		        if (chunkInput) {
		            chunks = chunker_1.default(str, failFunction);
		        }
		        else {
		            chunks = [str];
		        }
		        current = chunks[0];
		        skipWhitespace(0);
		    };
		    parserInput.end = function () {
		        var message;
		        var isFinished = parserInput.i >= input.length;
		        if (parserInput.i < furthest) {
		            message = furthestPossibleErrorMessage;
		            parserInput.i = furthest;
		        }
		        return {
		            isFinished: isFinished,
		            furthest: parserInput.i,
		            furthestPossibleErrorMessage: message,
		            furthestReachedEnd: parserInput.i >= input.length - 1,
		            furthestChar: input[parserInput.i]
		        };
		    };
		    return parserInput;
		});
		
		return parserInput;
	}

	var hasRequiredParser;

	function requireParser () {
		if (hasRequiredParser) return parser;
		hasRequiredParser = 1;
		Object.defineProperty(parser, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var less_error_1 = tslib_1.__importDefault(requireLessError());
		var tree_1 = tslib_1.__importDefault(requireTree());
		var visitors_1 = tslib_1.__importDefault(requireVisitors());
		var parser_input_1 = tslib_1.__importDefault(requireParserInput());
		var utils = tslib_1.__importStar(requireUtils());
		var function_registry_1 = tslib_1.__importDefault(requireFunctionRegistry());
		//
		// less.js - parser
		//
		//    A relatively straight-forward predictive parser.
		//    There is no tokenization/lexing stage, the input is parsed
		//    in one sweep.
		//
		//    To make the parser fast enough to run in the browser, several
		//    optimization had to be made:
		//
		//    - Matching and slicing on a huge input is often cause of slowdowns.
		//      The solution is to chunkify the input into smaller strings.
		//      The chunks are stored in the `chunks` var,
		//      `j` holds the current chunk index, and `currentPos` holds
		//      the index of the current chunk in relation to `input`.
		//      This gives us an almost 4x speed-up.
		//
		//    - In many cases, we don't need to match individual tokens;
		//      for example, if a value doesn't hold any variables, operations
		//      or dynamic references, the parser can effectively 'skip' it,
		//      treating it as a literal.
		//      An example would be '1px solid #000' - which evaluates to itself,
		//      we don't need to know what the individual components are.
		//      The drawback, of course is that you don't get the benefits of
		//      syntax-checking on the CSS. This gives us a 50% speed-up in the parser,
		//      and a smaller speed-up in the code-gen.
		//
		//
		//    Token matching is done with the `$` function, which either takes
		//    a terminal string or regexp, or a non-terminal function to call.
		//    It also takes care of moving all the indices forwards.
		//
		var Parser = function Parser(context, imports, fileInfo) {
		    var parsers;
		    var parserInput = parser_input_1.default();
		    function error(msg, type) {
		        throw new less_error_1.default({
		            index: parserInput.i,
		            filename: fileInfo.filename,
		            type: type || 'Syntax',
		            message: msg
		        }, imports);
		    }
		    function expect(arg, msg) {
		        // some older browsers return typeof 'function' for RegExp
		        var result = (arg instanceof Function) ? arg.call(parsers) : parserInput.$re(arg);
		        if (result) {
		            return result;
		        }
		        error(msg || (typeof arg === 'string'
		            ? "expected '" + arg + "' got '" + parserInput.currentChar() + "'"
		            : 'unexpected token'));
		    }
		    // Specialization of expect()
		    function expectChar(arg, msg) {
		        if (parserInput.$char(arg)) {
		            return arg;
		        }
		        error(msg || "expected '" + arg + "' got '" + parserInput.currentChar() + "'");
		    }
		    function getDebugInfo(index) {
		        var filename = fileInfo.filename;
		        return {
		            lineNumber: utils.getLocation(index, parserInput.getInput()).line + 1,
		            fileName: filename
		        };
		    }
		    /**
		     *  Used after initial parsing to create nodes on the fly
		     *
		     *  @param {String} str          - string to parse
		     *  @param {Array}  parseList    - array of parsers to run input through e.g. ["value", "important"]
		     *  @param {Number} currentIndex - start number to begin indexing
		     *  @param {Object} fileInfo     - fileInfo to attach to created nodes
		     */
		    function parseNode(str, parseList, currentIndex, fileInfo, callback) {
		        var result;
		        var returnNodes = [];
		        var parser = parserInput;
		        try {
		            parser.start(str, false, function fail(msg, index) {
		                callback({
		                    message: msg,
		                    index: index + currentIndex
		                });
		            });
		            for (var x = 0, p = void 0, i = void 0; (p = parseList[x]); x++) {
		                i = parser.i;
		                result = parsers[p]();
		                if (result) {
		                    try {
		                        result._index = i + currentIndex;
		                        result._fileInfo = fileInfo;
		                    }
		                    catch (e) { }
		                    returnNodes.push(result);
		                }
		                else {
		                    returnNodes.push(null);
		                }
		            }
		            var endInfo = parser.end();
		            if (endInfo.isFinished) {
		                callback(null, returnNodes);
		            }
		            else {
		                callback(true, null);
		            }
		        }
		        catch (e) {
		            throw new less_error_1.default({
		                index: e.index + currentIndex,
		                message: e.message
		            }, imports, fileInfo.filename);
		        }
		    }
		    //
		    // The Parser
		    //
		    return {
		        parserInput: parserInput,
		        imports: imports,
		        fileInfo: fileInfo,
		        parseNode: parseNode,
		        //
		        // Parse an input string into an abstract syntax tree,
		        // @param str A string containing 'less' markup
		        // @param callback call `callback` when done.
		        // @param [additionalData] An optional map which can contains vars - a map (key, value) of variables to apply
		        //
		        parse: function (str, callback, additionalData) {
		            var root;
		            var err = null;
		            var globalVars;
		            var modifyVars;
		            var ignored;
		            var preText = '';
		            // Optionally disable @plugin parsing
		            if (additionalData && additionalData.disablePluginRule) {
		                parsers.plugin = function () {
		                    var dir = parserInput.$re(/^@plugin?\s+/);
		                    if (dir) {
		                        error('@plugin statements are not allowed when disablePluginRule is set to true');
		                    }
		                };
		            }
		            globalVars = (additionalData && additionalData.globalVars) ? Parser.serializeVars(additionalData.globalVars) + "\n" : '';
		            modifyVars = (additionalData && additionalData.modifyVars) ? "\n" + Parser.serializeVars(additionalData.modifyVars) : '';
		            if (context.pluginManager) {
		                var preProcessors = context.pluginManager.getPreProcessors();
		                for (var i = 0; i < preProcessors.length; i++) {
		                    str = preProcessors[i].process(str, { context: context, imports: imports, fileInfo: fileInfo });
		                }
		            }
		            if (globalVars || (additionalData && additionalData.banner)) {
		                preText = ((additionalData && additionalData.banner) ? additionalData.banner : '') + globalVars;
		                ignored = imports.contentsIgnoredChars;
		                ignored[fileInfo.filename] = ignored[fileInfo.filename] || 0;
		                ignored[fileInfo.filename] += preText.length;
		            }
		            str = str.replace(/\r\n?/g, '\n');
		            // Remove potential UTF Byte Order Mark
		            str = preText + str.replace(/^\uFEFF/, '') + modifyVars;
		            imports.contents[fileInfo.filename] = str;
		            // Start with the primary rule.
		            // The whole syntax tree is held under a Ruleset node,
		            // with the `root` property set to true, so no `{}` are
		            // output. The callback is called when the input is parsed.
		            try {
		                parserInput.start(str, context.chunkInput, function fail(msg, index) {
		                    throw new less_error_1.default({
		                        index: index,
		                        type: 'Parse',
		                        message: msg,
		                        filename: fileInfo.filename
		                    }, imports);
		                });
		                tree_1.default.Node.prototype.parse = this;
		                root = new tree_1.default.Ruleset(null, this.parsers.primary());
		                tree_1.default.Node.prototype.rootNode = root;
		                root.root = true;
		                root.firstRoot = true;
		                root.functionRegistry = function_registry_1.default.inherit();
		            }
		            catch (e) {
		                return callback(new less_error_1.default(e, imports, fileInfo.filename));
		            }
		            // If `i` is smaller than the `input.length - 1`,
		            // it means the parser wasn't able to parse the whole
		            // string, so we've got a parsing error.
		            //
		            // We try to extract a \n delimited string,
		            // showing the line where the parse error occurred.
		            // We split it up into two parts (the part which parsed,
		            // and the part which didn't), so we can color them differently.
		            var endInfo = parserInput.end();
		            if (!endInfo.isFinished) {
		                var message = endInfo.furthestPossibleErrorMessage;
		                if (!message) {
		                    message = 'Unrecognised input';
		                    if (endInfo.furthestChar === '}') {
		                        message += '. Possibly missing opening \'{\'';
		                    }
		                    else if (endInfo.furthestChar === ')') {
		                        message += '. Possibly missing opening \'(\'';
		                    }
		                    else if (endInfo.furthestReachedEnd) {
		                        message += '. Possibly missing something';
		                    }
		                }
		                err = new less_error_1.default({
		                    type: 'Parse',
		                    message: message,
		                    index: endInfo.furthest,
		                    filename: fileInfo.filename
		                }, imports);
		            }
		            var finish = function (e) {
		                e = err || e || imports.error;
		                if (e) {
		                    if (!(e instanceof less_error_1.default)) {
		                        e = new less_error_1.default(e, imports, fileInfo.filename);
		                    }
		                    return callback(e);
		                }
		                else {
		                    return callback(null, root);
		                }
		            };
		            if (context.processImports !== false) {
		                new visitors_1.default.ImportVisitor(imports, finish)
		                    .run(root);
		            }
		            else {
		                return finish();
		            }
		        },
		        //
		        // Here in, the parsing rules/functions
		        //
		        // The basic structure of the syntax tree generated is as follows:
		        //
		        //   Ruleset ->  Declaration -> Value -> Expression -> Entity
		        //
		        // Here's some Less code:
		        //
		        //    .class {
		        //      color: #fff;
		        //      border: 1px solid #000;
		        //      width: @w + 4px;
		        //      > .child {...}
		        //    }
		        //
		        // And here's what the parse tree might look like:
		        //
		        //     Ruleset (Selector '.class', [
		        //         Declaration ("color",  Value ([Expression [Color #fff]]))
		        //         Declaration ("border", Value ([Expression [Dimension 1px][Keyword "solid"][Color #000]]))
		        //         Declaration ("width",  Value ([Expression [Operation " + " [Variable "@w"][Dimension 4px]]]))
		        //         Ruleset (Selector [Element '>', '.child'], [...])
		        //     ])
		        //
		        //  In general, most rules will try to parse a token with the `$re()` function, and if the return
		        //  value is truly, will return a new node, of the relevant type. Sometimes, we need to check
		        //  first, before parsing, that's when we use `peek()`.
		        //
		        parsers: parsers = {
		            //
		            // The `primary` rule is the *entry* and *exit* point of the parser.
		            // The rules here can appear at any level of the parse tree.
		            //
		            // The recursive nature of the grammar is an interplay between the `block`
		            // rule, which represents `{ ... }`, the `ruleset` rule, and this `primary` rule,
		            // as represented by this simplified grammar:
		            //
		            //     primary  →  (ruleset | declaration)+
		            //     ruleset  →  selector+ block
		            //     block    →  '{' primary '}'
		            //
		            // Only at one point is the primary rule not called from the
		            // block rule: at the root level.
		            //
		            primary: function () {
		                var mixin = this.mixin;
		                var root = [];
		                var node;
		                while (true) {
		                    while (true) {
		                        node = this.comment();
		                        if (!node) {
		                            break;
		                        }
		                        root.push(node);
		                    }
		                    // always process comments before deciding if finished
		                    if (parserInput.finished) {
		                        break;
		                    }
		                    if (parserInput.peek('}')) {
		                        break;
		                    }
		                    node = this.extendRule();
		                    if (node) {
		                        root = root.concat(node);
		                        continue;
		                    }
		                    node = mixin.definition() || this.declaration() || mixin.call(false, false) ||
		                        this.ruleset() || this.variableCall() || this.entities.call() || this.atrule();
		                    if (node) {
		                        root.push(node);
		                    }
		                    else {
		                        var foundSemiColon = false;
		                        while (parserInput.$char(';')) {
		                            foundSemiColon = true;
		                        }
		                        if (!foundSemiColon) {
		                            break;
		                        }
		                    }
		                }
		                return root;
		            },
		            // comments are collected by the main parsing mechanism and then assigned to nodes
		            // where the current structure allows it
		            comment: function () {
		                if (parserInput.commentStore.length) {
		                    var comment = parserInput.commentStore.shift();
		                    return new (tree_1.default.Comment)(comment.text, comment.isLineComment, comment.index, fileInfo);
		                }
		            },
		            //
		            // Entities are tokens which can be found inside an Expression
		            //
		            entities: {
		                mixinLookup: function () {
		                    return parsers.mixin.call(true, true);
		                },
		                //
		                // A string, which supports escaping " and '
		                //
		                //     "milky way" 'he\'s the one!'
		                //
		                quoted: function (forceEscaped) {
		                    var str;
		                    var index = parserInput.i;
		                    var isEscaped = false;
		                    parserInput.save();
		                    if (parserInput.$char('~')) {
		                        isEscaped = true;
		                    }
		                    else if (forceEscaped) {
		                        parserInput.restore();
		                        return;
		                    }
		                    str = parserInput.$quoted();
		                    if (!str) {
		                        parserInput.restore();
		                        return;
		                    }
		                    parserInput.forget();
		                    return new (tree_1.default.Quoted)(str.charAt(0), str.substr(1, str.length - 2), isEscaped, index, fileInfo);
		                },
		                //
		                // A catch-all word, such as:
		                //
		                //     black border-collapse
		                //
		                keyword: function () {
		                    var k = parserInput.$char('%') || parserInput.$re(/^\[?(?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+\]?/);
		                    if (k) {
		                        return tree_1.default.Color.fromKeyword(k) || new (tree_1.default.Keyword)(k);
		                    }
		                },
		                //
		                // A function call
		                //
		                //     rgb(255, 0, 255)
		                //
		                // The arguments are parsed with the `entities.arguments` parser.
		                //
		                call: function () {
		                    var name;
		                    var args;
		                    var func;
		                    var index = parserInput.i;
		                    // http://jsperf.com/case-insensitive-regex-vs-strtolower-then-regex/18
		                    if (parserInput.peek(/^url\(/i)) {
		                        return;
		                    }
		                    parserInput.save();
		                    name = parserInput.$re(/^([\w-]+|%|~|progid:[\w\.]+)\(/);
		                    if (!name) {
		                        parserInput.forget();
		                        return;
		                    }
		                    name = name[1];
		                    func = this.customFuncCall(name);
		                    if (func) {
		                        args = func.parse();
		                        if (args && func.stop) {
		                            parserInput.forget();
		                            return args;
		                        }
		                    }
		                    args = this.arguments(args);
		                    if (!parserInput.$char(')')) {
		                        parserInput.restore('Could not parse call arguments or missing \')\'');
		                        return;
		                    }
		                    parserInput.forget();
		                    return new (tree_1.default.Call)(name, args, index, fileInfo);
		                },
		                //
		                // Parsing rules for functions with non-standard args, e.g.:
		                //
		                //     boolean(not(2 > 1))
		                //
		                //     This is a quick prototype, to be modified/improved when
		                //     more custom-parsed funcs come (e.g. `selector(...)`)
		                //
		                customFuncCall: function (name) {
		                    /* Ideally the table is to be moved out of here for faster perf.,
		                       but it's quite tricky since it relies on all these `parsers`
		                       and `expect` available only here */
		                    return {
		                        alpha: f(parsers.ieAlpha, true),
		                        boolean: f(condition),
		                        'if': f(condition)
		                    }[name.toLowerCase()];
		                    function f(parse, stop) {
		                        return {
		                            parse: parse,
		                            stop: stop // when true - stop after parse() and return its result, 
		                            // otherwise continue for plain args
		                        };
		                    }
		                    function condition() {
		                        return [expect(parsers.condition, 'expected condition')];
		                    }
		                },
		                arguments: function (prevArgs) {
		                    var argsComma = prevArgs || [];
		                    var argsSemiColon = [];
		                    var isSemiColonSeparated;
		                    var value;
		                    parserInput.save();
		                    while (true) {
		                        if (prevArgs) {
		                            prevArgs = false;
		                        }
		                        else {
		                            value = parsers.detachedRuleset() || this.assignment() || parsers.expression();
		                            if (!value) {
		                                break;
		                            }
		                            if (value.value && value.value.length == 1) {
		                                value = value.value[0];
		                            }
		                            argsComma.push(value);
		                        }
		                        if (parserInput.$char(',')) {
		                            continue;
		                        }
		                        if (parserInput.$char(';') || isSemiColonSeparated) {
		                            isSemiColonSeparated = true;
		                            value = (argsComma.length < 1) ? argsComma[0]
		                                : new tree_1.default.Value(argsComma);
		                            argsSemiColon.push(value);
		                            argsComma = [];
		                        }
		                    }
		                    parserInput.forget();
		                    return isSemiColonSeparated ? argsSemiColon : argsComma;
		                },
		                literal: function () {
		                    return this.dimension() ||
		                        this.color() ||
		                        this.quoted() ||
		                        this.unicodeDescriptor();
		                },
		                // Assignments are argument entities for calls.
		                // They are present in ie filter properties as shown below.
		                //
		                //     filter: progid:DXImageTransform.Microsoft.Alpha( *opacity=50* )
		                //
		                assignment: function () {
		                    var key;
		                    var value;
		                    parserInput.save();
		                    key = parserInput.$re(/^\w+(?=\s?=)/i);
		                    if (!key) {
		                        parserInput.restore();
		                        return;
		                    }
		                    if (!parserInput.$char('=')) {
		                        parserInput.restore();
		                        return;
		                    }
		                    value = parsers.entity();
		                    if (value) {
		                        parserInput.forget();
		                        return new (tree_1.default.Assignment)(key, value);
		                    }
		                    else {
		                        parserInput.restore();
		                    }
		                },
		                //
		                // Parse url() tokens
		                //
		                // We use a specific rule for urls, because they don't really behave like
		                // standard function calls. The difference is that the argument doesn't have
		                // to be enclosed within a string, so it can't be parsed as an Expression.
		                //
		                url: function () {
		                    var value;
		                    var index = parserInput.i;
		                    parserInput.autoCommentAbsorb = false;
		                    if (!parserInput.$str('url(')) {
		                        parserInput.autoCommentAbsorb = true;
		                        return;
		                    }
		                    value = this.quoted() || this.variable() || this.property() ||
		                        parserInput.$re(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/) || '';
		                    parserInput.autoCommentAbsorb = true;
		                    expectChar(')');
		                    return new (tree_1.default.URL)((value.value != null ||
		                        value instanceof tree_1.default.Variable ||
		                        value instanceof tree_1.default.Property) ?
		                        value : new (tree_1.default.Anonymous)(value, index), index, fileInfo);
		                },
		                //
		                // A Variable entity, such as `@fink`, in
		                //
		                //     width: @fink + 2px
		                //
		                // We use a different parser for variable definitions,
		                // see `parsers.variable`.
		                //
		                variable: function () {
		                    var ch;
		                    var name;
		                    var index = parserInput.i;
		                    parserInput.save();
		                    if (parserInput.currentChar() === '@' && (name = parserInput.$re(/^@@?[\w-]+/))) {
		                        ch = parserInput.currentChar();
		                        if (ch === '(' || ch === '[' && !parserInput.prevChar().match(/^\s/)) {
		                            // this may be a VariableCall lookup
		                            var result = parsers.variableCall(name);
		                            if (result) {
		                                parserInput.forget();
		                                return result;
		                            }
		                        }
		                        parserInput.forget();
		                        return new (tree_1.default.Variable)(name, index, fileInfo);
		                    }
		                    parserInput.restore();
		                },
		                // A variable entity using the protective {} e.g. @{var}
		                variableCurly: function () {
		                    var curly;
		                    var index = parserInput.i;
		                    if (parserInput.currentChar() === '@' && (curly = parserInput.$re(/^@\{([\w-]+)\}/))) {
		                        return new (tree_1.default.Variable)("@" + curly[1], index, fileInfo);
		                    }
		                },
		                //
		                // A Property accessor, such as `$color`, in
		                //
		                //     background-color: $color
		                //
		                property: function () {
		                    var name;
		                    var index = parserInput.i;
		                    if (parserInput.currentChar() === '$' && (name = parserInput.$re(/^\$[\w-]+/))) {
		                        return new (tree_1.default.Property)(name, index, fileInfo);
		                    }
		                },
		                // A property entity useing the protective {} e.g. ${prop}
		                propertyCurly: function () {
		                    var curly;
		                    var index = parserInput.i;
		                    if (parserInput.currentChar() === '$' && (curly = parserInput.$re(/^\$\{([\w-]+)\}/))) {
		                        return new (tree_1.default.Property)("$" + curly[1], index, fileInfo);
		                    }
		                },
		                //
		                // A Hexadecimal color
		                //
		                //     #4F3C2F
		                //
		                // `rgb` and `hsl` colors are parsed through the `entities.call` parser.
		                //
		                color: function () {
		                    var rgb;
		                    parserInput.save();
		                    if (parserInput.currentChar() === '#' && (rgb = parserInput.$re(/^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4})([\w.#\[])?/))) {
		                        if (!rgb[2]) {
		                            parserInput.forget();
		                            return new (tree_1.default.Color)(rgb[1], undefined, rgb[0]);
		                        }
		                    }
		                    parserInput.restore();
		                },
		                colorKeyword: function () {
		                    parserInput.save();
		                    var autoCommentAbsorb = parserInput.autoCommentAbsorb;
		                    parserInput.autoCommentAbsorb = false;
		                    var k = parserInput.$re(/^[_A-Za-z-][_A-Za-z0-9-]+/);
		                    parserInput.autoCommentAbsorb = autoCommentAbsorb;
		                    if (!k) {
		                        parserInput.forget();
		                        return;
		                    }
		                    parserInput.restore();
		                    var color = tree_1.default.Color.fromKeyword(k);
		                    if (color) {
		                        parserInput.$str(k);
		                        return color;
		                    }
		                },
		                //
		                // A Dimension, that is, a number and a unit
		                //
		                //     0.5em 95%
		                //
		                dimension: function () {
		                    if (parserInput.peekNotNumeric()) {
		                        return;
		                    }
		                    var value = parserInput.$re(/^([+-]?\d*\.?\d+)(%|[a-z_]+)?/i);
		                    if (value) {
		                        return new (tree_1.default.Dimension)(value[1], value[2]);
		                    }
		                },
		                //
		                // A unicode descriptor, as is used in unicode-range
		                //
		                // U+0??  or U+00A1-00A9
		                //
		                unicodeDescriptor: function () {
		                    var ud;
		                    ud = parserInput.$re(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/);
		                    if (ud) {
		                        return new (tree_1.default.UnicodeDescriptor)(ud[0]);
		                    }
		                },
		                //
		                // JavaScript code to be evaluated
		                //
		                //     `window.location.href`
		                //
		                javascript: function () {
		                    var js;
		                    var index = parserInput.i;
		                    parserInput.save();
		                    var escape = parserInput.$char('~');
		                    var jsQuote = parserInput.$char('`');
		                    if (!jsQuote) {
		                        parserInput.restore();
		                        return;
		                    }
		                    js = parserInput.$re(/^[^`]*`/);
		                    if (js) {
		                        parserInput.forget();
		                        return new (tree_1.default.JavaScript)(js.substr(0, js.length - 1), Boolean(escape), index, fileInfo);
		                    }
		                    parserInput.restore('invalid javascript definition');
		                }
		            },
		            //
		            // The variable part of a variable definition. Used in the `rule` parser
		            //
		            //     @fink:
		            //
		            variable: function () {
		                var name;
		                if (parserInput.currentChar() === '@' && (name = parserInput.$re(/^(@[\w-]+)\s*:/))) {
		                    return name[1];
		                }
		            },
		            //
		            // Call a variable value to retrieve a detached ruleset
		            // or a value from a detached ruleset's rules.
		            //
		            //     @fink();
		            //     @fink;
		            //     color: @fink[@color];
		            //
		            variableCall: function (parsedName) {
		                var lookups;
		                var i = parserInput.i;
		                var inValue = !!parsedName;
		                var name = parsedName;
		                parserInput.save();
		                if (name || (parserInput.currentChar() === '@'
		                    && (name = parserInput.$re(/^(@[\w-]+)(\(\s*\))?/)))) {
		                    lookups = this.mixin.ruleLookups();
		                    if (!lookups && ((inValue && parserInput.$str('()') !== '()') || (name[2] !== '()'))) {
		                        parserInput.restore('Missing \'[...]\' lookup in variable call');
		                        return;
		                    }
		                    if (!inValue) {
		                        name = name[1];
		                    }
		                    var call = new tree_1.default.VariableCall(name, i, fileInfo);
		                    if (!inValue && parsers.end()) {
		                        parserInput.forget();
		                        return call;
		                    }
		                    else {
		                        parserInput.forget();
		                        return new tree_1.default.NamespaceValue(call, lookups, i, fileInfo);
		                    }
		                }
		                parserInput.restore();
		            },
		            //
		            // extend syntax - used to extend selectors
		            //
		            extend: function (isRule) {
		                var elements;
		                var e;
		                var index = parserInput.i;
		                var option;
		                var extendList;
		                var extend;
		                if (!parserInput.$str(isRule ? '&:extend(' : ':extend(')) {
		                    return;
		                }
		                do {
		                    option = null;
		                    elements = null;
		                    while (!(option = parserInput.$re(/^(all)(?=\s*(\)|,))/))) {
		                        e = this.element();
		                        if (!e) {
		                            break;
		                        }
		                        if (elements) {
		                            elements.push(e);
		                        }
		                        else {
		                            elements = [e];
		                        }
		                    }
		                    option = option && option[1];
		                    if (!elements) {
		                        error('Missing target selector for :extend().');
		                    }
		                    extend = new (tree_1.default.Extend)(new (tree_1.default.Selector)(elements), option, index, fileInfo);
		                    if (extendList) {
		                        extendList.push(extend);
		                    }
		                    else {
		                        extendList = [extend];
		                    }
		                } while (parserInput.$char(','));
		                expect(/^\)/);
		                if (isRule) {
		                    expect(/^;/);
		                }
		                return extendList;
		            },
		            //
		            // extendRule - used in a rule to extend all the parent selectors
		            //
		            extendRule: function () {
		                return this.extend(true);
		            },
		            //
		            // Mixins
		            //
		            mixin: {
		                //
		                // A Mixin call, with an optional argument list
		                //
		                //     #mixins > .square(#fff);
		                //     #mixins.square(#fff);
		                //     .rounded(4px, black);
		                //     .button;
		                //
		                // We can lookup / return a value using the lookup syntax:
		                //
		                //     color: #mixin.square(#fff)[@color];
		                //
		                // The `while` loop is there because mixins can be
		                // namespaced, but we only support the child and descendant
		                // selector for now.
		                //
		                call: function (inValue, getLookup) {
		                    var s = parserInput.currentChar();
		                    var important = false;
		                    var lookups;
		                    var index = parserInput.i;
		                    var elements;
		                    var args;
		                    var hasParens;
		                    if (s !== '.' && s !== '#') {
		                        return;
		                    }
		                    parserInput.save(); // stop us absorbing part of an invalid selector
		                    elements = this.elements();
		                    if (elements) {
		                        if (parserInput.$char('(')) {
		                            args = this.args(true).args;
		                            expectChar(')');
		                            hasParens = true;
		                        }
		                        if (getLookup !== false) {
		                            lookups = this.ruleLookups();
		                        }
		                        if (getLookup === true && !lookups) {
		                            parserInput.restore();
		                            return;
		                        }
		                        if (inValue && !lookups && !hasParens) {
		                            // This isn't a valid in-value mixin call
		                            parserInput.restore();
		                            return;
		                        }
		                        if (!inValue && parsers.important()) {
		                            important = true;
		                        }
		                        if (inValue || parsers.end()) {
		                            parserInput.forget();
		                            var mixin = new (tree_1.default.mixin.Call)(elements, args, index, fileInfo, !lookups && important);
		                            if (lookups) {
		                                return new tree_1.default.NamespaceValue(mixin, lookups);
		                            }
		                            else {
		                                return mixin;
		                            }
		                        }
		                    }
		                    parserInput.restore();
		                },
		                /**
		                 * Matching elements for mixins
		                 * (Start with . or # and can have > )
		                 */
		                elements: function () {
		                    var elements;
		                    var e;
		                    var c;
		                    var elem;
		                    var elemIndex;
		                    var re = /^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/;
		                    while (true) {
		                        elemIndex = parserInput.i;
		                        e = parserInput.$re(re);
		                        if (!e) {
		                            break;
		                        }
		                        elem = new (tree_1.default.Element)(c, e, false, elemIndex, fileInfo);
		                        if (elements) {
		                            elements.push(elem);
		                        }
		                        else {
		                            elements = [elem];
		                        }
		                        c = parserInput.$char('>');
		                    }
		                    return elements;
		                },
		                args: function (isCall) {
		                    var entities = parsers.entities;
		                    var returner = { args: null, variadic: false };
		                    var expressions = [];
		                    var argsSemiColon = [];
		                    var argsComma = [];
		                    var isSemiColonSeparated;
		                    var expressionContainsNamed;
		                    var name;
		                    var nameLoop;
		                    var value;
		                    var arg;
		                    var expand;
		                    var hasSep = true;
		                    parserInput.save();
		                    while (true) {
		                        if (isCall) {
		                            arg = parsers.detachedRuleset() || parsers.expression();
		                        }
		                        else {
		                            parserInput.commentStore.length = 0;
		                            if (parserInput.$str('...')) {
		                                returner.variadic = true;
		                                if (parserInput.$char(';') && !isSemiColonSeparated) {
		                                    isSemiColonSeparated = true;
		                                }
		                                (isSemiColonSeparated ? argsSemiColon : argsComma)
		                                    .push({ variadic: true });
		                                break;
		                            }
		                            arg = entities.variable() || entities.property() || entities.literal() || entities.keyword() || this.call(true);
		                        }
		                        if (!arg || !hasSep) {
		                            break;
		                        }
		                        nameLoop = null;
		                        if (arg.throwAwayComments) {
		                            arg.throwAwayComments();
		                        }
		                        value = arg;
		                        var val = null;
		                        if (isCall) {
		                            // Variable
		                            if (arg.value && arg.value.length == 1) {
		                                val = arg.value[0];
		                            }
		                        }
		                        else {
		                            val = arg;
		                        }
		                        if (val && (val instanceof tree_1.default.Variable || val instanceof tree_1.default.Property)) {
		                            if (parserInput.$char(':')) {
		                                if (expressions.length > 0) {
		                                    if (isSemiColonSeparated) {
		                                        error('Cannot mix ; and , as delimiter types');
		                                    }
		                                    expressionContainsNamed = true;
		                                }
		                                value = parsers.detachedRuleset() || parsers.expression();
		                                if (!value) {
		                                    if (isCall) {
		                                        error('could not understand value for named argument');
		                                    }
		                                    else {
		                                        parserInput.restore();
		                                        returner.args = [];
		                                        return returner;
		                                    }
		                                }
		                                nameLoop = (name = val.name);
		                            }
		                            else if (parserInput.$str('...')) {
		                                if (!isCall) {
		                                    returner.variadic = true;
		                                    if (parserInput.$char(';') && !isSemiColonSeparated) {
		                                        isSemiColonSeparated = true;
		                                    }
		                                    (isSemiColonSeparated ? argsSemiColon : argsComma)
		                                        .push({ name: arg.name, variadic: true });
		                                    break;
		                                }
		                                else {
		                                    expand = true;
		                                }
		                            }
		                            else if (!isCall) {
		                                name = nameLoop = val.name;
		                                value = null;
		                            }
		                        }
		                        if (value) {
		                            expressions.push(value);
		                        }
		                        argsComma.push({ name: nameLoop, value: value, expand: expand });
		                        if (parserInput.$char(',')) {
		                            hasSep = true;
		                            continue;
		                        }
		                        hasSep = parserInput.$char(';') === ';';
		                        if (hasSep || isSemiColonSeparated) {
		                            if (expressionContainsNamed) {
		                                error('Cannot mix ; and , as delimiter types');
		                            }
		                            isSemiColonSeparated = true;
		                            if (expressions.length > 1) {
		                                value = new (tree_1.default.Value)(expressions);
		                            }
		                            argsSemiColon.push({ name: name, value: value, expand: expand });
		                            name = null;
		                            expressions = [];
		                            expressionContainsNamed = false;
		                        }
		                    }
		                    parserInput.forget();
		                    returner.args = isSemiColonSeparated ? argsSemiColon : argsComma;
		                    return returner;
		                },
		                //
		                // A Mixin definition, with a list of parameters
		                //
		                //     .rounded (@radius: 2px, @color) {
		                //        ...
		                //     }
		                //
		                // Until we have a finer grained state-machine, we have to
		                // do a look-ahead, to make sure we don't have a mixin call.
		                // See the `rule` function for more information.
		                //
		                // We start by matching `.rounded (`, and then proceed on to
		                // the argument list, which has optional default values.
		                // We store the parameters in `params`, with a `value` key,
		                // if there is a value, such as in the case of `@radius`.
		                //
		                // Once we've got our params list, and a closing `)`, we parse
		                // the `{...}` block.
		                //
		                definition: function () {
		                    var name;
		                    var params = [];
		                    var match;
		                    var ruleset;
		                    var cond;
		                    var variadic = false;
		                    if ((parserInput.currentChar() !== '.' && parserInput.currentChar() !== '#') ||
		                        parserInput.peek(/^[^{]*\}/)) {
		                        return;
		                    }
		                    parserInput.save();
		                    match = parserInput.$re(/^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/);
		                    if (match) {
		                        name = match[1];
		                        var argInfo = this.args(false);
		                        params = argInfo.args;
		                        variadic = argInfo.variadic;
		                        // .mixincall("@{a}");
		                        // looks a bit like a mixin definition..
		                        // also
		                        // .mixincall(@a: {rule: set;});
		                        // so we have to be nice and restore
		                        if (!parserInput.$char(')')) {
		                            parserInput.restore('Missing closing \')\'');
		                            return;
		                        }
		                        parserInput.commentStore.length = 0;
		                        if (parserInput.$str('when')) { // Guard
		                            cond = expect(parsers.conditions, 'expected condition');
		                        }
		                        ruleset = parsers.block();
		                        if (ruleset) {
		                            parserInput.forget();
		                            return new (tree_1.default.mixin.Definition)(name, params, ruleset, cond, variadic);
		                        }
		                        else {
		                            parserInput.restore();
		                        }
		                    }
		                    else {
		                        parserInput.restore();
		                    }
		                },
		                ruleLookups: function () {
		                    var rule;
		                    var lookups = [];
		                    if (parserInput.currentChar() !== '[') {
		                        return;
		                    }
		                    while (true) {
		                        parserInput.save();
		                        rule = this.lookupValue();
		                        if (!rule && rule !== '') {
		                            parserInput.restore();
		                            break;
		                        }
		                        lookups.push(rule);
		                        parserInput.forget();
		                    }
		                    if (lookups.length > 0) {
		                        return lookups;
		                    }
		                },
		                lookupValue: function () {
		                    parserInput.save();
		                    if (!parserInput.$char('[')) {
		                        parserInput.restore();
		                        return;
		                    }
		                    var name = parserInput.$re(/^(?:[@$]{0,2})[_a-zA-Z0-9-]*/);
		                    if (!parserInput.$char(']')) {
		                        parserInput.restore();
		                        return;
		                    }
		                    if (name || name === '') {
		                        parserInput.forget();
		                        return name;
		                    }
		                    parserInput.restore();
		                }
		            },
		            //
		            // Entities are the smallest recognized token,
		            // and can be found inside a rule's value.
		            //
		            entity: function () {
		                var entities = this.entities;
		                return this.comment() || entities.literal() || entities.variable() || entities.url() ||
		                    entities.property() || entities.call() || entities.keyword() || this.mixin.call(true) ||
		                    entities.javascript();
		            },
		            //
		            // A Declaration terminator. Note that we use `peek()` to check for '}',
		            // because the `block` rule will be expecting it, but we still need to make sure
		            // it's there, if ';' was omitted.
		            //
		            end: function () {
		                return parserInput.$char(';') || parserInput.peek('}');
		            },
		            //
		            // IE's alpha function
		            //
		            //     alpha(opacity=88)
		            //
		            ieAlpha: function () {
		                var value;
		                // http://jsperf.com/case-insensitive-regex-vs-strtolower-then-regex/18
		                if (!parserInput.$re(/^opacity=/i)) {
		                    return;
		                }
		                value = parserInput.$re(/^\d+/);
		                if (!value) {
		                    value = expect(parsers.entities.variable, 'Could not parse alpha');
		                    value = "@{" + value.name.slice(1) + "}";
		                }
		                expectChar(')');
		                return new tree_1.default.Quoted('', "alpha(opacity=" + value + ")");
		            },
		            //
		            // A Selector Element
		            //
		            //     div
		            //     + h1
		            //     #socks
		            //     input[type="text"]
		            //
		            // Elements are the building blocks for Selectors,
		            // they are made out of a `Combinator` (see combinator rule),
		            // and an element name, such as a tag a class, or `*`.
		            //
		            element: function () {
		                var e;
		                var c;
		                var v;
		                var index = parserInput.i;
		                c = this.combinator();
		                e = parserInput.$re(/^(?:\d+\.\d+|\d+)%/) ||
		                    parserInput.$re(/^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/) ||
		                    parserInput.$char('*') || parserInput.$char('&') || this.attribute() ||
		                    parserInput.$re(/^\([^&()@]+\)/) || parserInput.$re(/^[\.#:](?=@)/) ||
		                    this.entities.variableCurly();
		                if (!e) {
		                    parserInput.save();
		                    if (parserInput.$char('(')) {
		                        if ((v = this.selector(false)) && parserInput.$char(')')) {
		                            e = new (tree_1.default.Paren)(v);
		                            parserInput.forget();
		                        }
		                        else {
		                            parserInput.restore('Missing closing \')\'');
		                        }
		                    }
		                    else {
		                        parserInput.forget();
		                    }
		                }
		                if (e) {
		                    return new (tree_1.default.Element)(c, e, e instanceof tree_1.default.Variable, index, fileInfo);
		                }
		            },
		            //
		            // Combinators combine elements together, in a Selector.
		            //
		            // Because our parser isn't white-space sensitive, special care
		            // has to be taken, when parsing the descendant combinator, ` `,
		            // as it's an empty space. We have to check the previous character
		            // in the input, to see if it's a ` ` character. More info on how
		            // we deal with this in *combinator.js*.
		            //
		            combinator: function () {
		                var c = parserInput.currentChar();
		                if (c === '/') {
		                    parserInput.save();
		                    var slashedCombinator = parserInput.$re(/^\/[a-z]+\//i);
		                    if (slashedCombinator) {
		                        parserInput.forget();
		                        return new (tree_1.default.Combinator)(slashedCombinator);
		                    }
		                    parserInput.restore();
		                }
		                if (c === '>' || c === '+' || c === '~' || c === '|' || c === '^') {
		                    parserInput.i++;
		                    if (c === '^' && parserInput.currentChar() === '^') {
		                        c = '^^';
		                        parserInput.i++;
		                    }
		                    while (parserInput.isWhitespace()) {
		                        parserInput.i++;
		                    }
		                    return new (tree_1.default.Combinator)(c);
		                }
		                else if (parserInput.isWhitespace(-1)) {
		                    return new (tree_1.default.Combinator)(' ');
		                }
		                else {
		                    return new (tree_1.default.Combinator)(null);
		                }
		            },
		            //
		            // A CSS Selector
		            // with less extensions e.g. the ability to extend and guard
		            //
		            //     .class > div + h1
		            //     li a:hover
		            //
		            // Selectors are made out of one or more Elements, see above.
		            //
		            selector: function (isLess) {
		                var index = parserInput.i;
		                var elements;
		                var extendList;
		                var c;
		                var e;
		                var allExtends;
		                var when;
		                var condition;
		                isLess = isLess !== false;
		                while ((isLess && (extendList = this.extend())) || (isLess && (when = parserInput.$str('when'))) || (e = this.element())) {
		                    if (when) {
		                        condition = expect(this.conditions, 'expected condition');
		                    }
		                    else if (condition) {
		                        error('CSS guard can only be used at the end of selector');
		                    }
		                    else if (extendList) {
		                        if (allExtends) {
		                            allExtends = allExtends.concat(extendList);
		                        }
		                        else {
		                            allExtends = extendList;
		                        }
		                    }
		                    else {
		                        if (allExtends) {
		                            error('Extend can only be used at the end of selector');
		                        }
		                        c = parserInput.currentChar();
		                        if (elements) {
		                            elements.push(e);
		                        }
		                        else {
		                            elements = [e];
		                        }
		                        e = null;
		                    }
		                    if (c === '{' || c === '}' || c === ';' || c === ',' || c === ')') {
		                        break;
		                    }
		                }
		                if (elements) {
		                    return new (tree_1.default.Selector)(elements, allExtends, condition, index, fileInfo);
		                }
		                if (allExtends) {
		                    error('Extend must be used to extend a selector, it cannot be used on its own');
		                }
		            },
		            selectors: function () {
		                var s;
		                var selectors;
		                while (true) {
		                    s = this.selector();
		                    if (!s) {
		                        break;
		                    }
		                    if (selectors) {
		                        selectors.push(s);
		                    }
		                    else {
		                        selectors = [s];
		                    }
		                    parserInput.commentStore.length = 0;
		                    if (s.condition && selectors.length > 1) {
		                        error("Guards are only currently allowed on a single selector.");
		                    }
		                    if (!parserInput.$char(',')) {
		                        break;
		                    }
		                    if (s.condition) {
		                        error("Guards are only currently allowed on a single selector.");
		                    }
		                    parserInput.commentStore.length = 0;
		                }
		                return selectors;
		            },
		            attribute: function () {
		                if (!parserInput.$char('[')) {
		                    return;
		                }
		                var entities = this.entities;
		                var key;
		                var val;
		                var op;
		                //
		                // case-insensitive flag
		                // e.g. [attr operator value i]
		                //
		                var cif;
		                if (!(key = entities.variableCurly())) {
		                    key = expect(/^(?:[_A-Za-z0-9-\*]*\|)?(?:[_A-Za-z0-9-]|\\.)+/);
		                }
		                op = parserInput.$re(/^[|~*$^]?=/);
		                if (op) {
		                    val = entities.quoted() || parserInput.$re(/^[0-9]+%/) || parserInput.$re(/^[\w-]+/) || entities.variableCurly();
		                    if (val) {
		                        cif = parserInput.$re(/^[iIsS]/);
		                    }
		                }
		                expectChar(']');
		                return new (tree_1.default.Attribute)(key, op, val, cif);
		            },
		            //
		            // The `block` rule is used by `ruleset` and `mixin.definition`.
		            // It's a wrapper around the `primary` rule, with added `{}`.
		            //
		            block: function () {
		                var content;
		                if (parserInput.$char('{') && (content = this.primary()) && parserInput.$char('}')) {
		                    return content;
		                }
		            },
		            blockRuleset: function () {
		                var block = this.block();
		                if (block) {
		                    block = new tree_1.default.Ruleset(null, block);
		                }
		                return block;
		            },
		            detachedRuleset: function () {
		                var argInfo;
		                var params;
		                var variadic;
		                parserInput.save();
		                if (parserInput.$re(/^[.#]\(/)) {
		                    /**
		                     * DR args currently only implemented for each() function, and not
		                     * yet settable as `@dr: #(@arg) {}`
		                     * This should be done when DRs are merged with mixins.
		                     * See: https://github.com/less/less-meta/issues/16
		                     */
		                    argInfo = this.mixin.args(false);
		                    params = argInfo.args;
		                    variadic = argInfo.variadic;
		                    if (!parserInput.$char(')')) {
		                        parserInput.restore();
		                        return;
		                    }
		                }
		                var blockRuleset = this.blockRuleset();
		                if (blockRuleset) {
		                    parserInput.forget();
		                    if (params) {
		                        return new tree_1.default.mixin.Definition(null, params, blockRuleset, null, variadic);
		                    }
		                    return new tree_1.default.DetachedRuleset(blockRuleset);
		                }
		                parserInput.restore();
		            },
		            //
		            // div, .class, body > p {...}
		            //
		            ruleset: function () {
		                var selectors;
		                var rules;
		                var debugInfo;
		                parserInput.save();
		                if (context.dumpLineNumbers) {
		                    debugInfo = getDebugInfo(parserInput.i);
		                }
		                selectors = this.selectors();
		                if (selectors && (rules = this.block())) {
		                    parserInput.forget();
		                    var ruleset = new (tree_1.default.Ruleset)(selectors, rules, context.strictImports);
		                    if (context.dumpLineNumbers) {
		                        ruleset.debugInfo = debugInfo;
		                    }
		                    return ruleset;
		                }
		                else {
		                    parserInput.restore();
		                }
		            },
		            declaration: function () {
		                var name;
		                var value;
		                var index = parserInput.i;
		                var hasDR;
		                var c = parserInput.currentChar();
		                var important;
		                var merge;
		                var isVariable;
		                if (c === '.' || c === '#' || c === '&' || c === ':') {
		                    return;
		                }
		                parserInput.save();
		                name = this.variable() || this.ruleProperty();
		                if (name) {
		                    isVariable = typeof name === 'string';
		                    if (isVariable) {
		                        value = this.detachedRuleset();
		                        if (value) {
		                            hasDR = true;
		                        }
		                    }
		                    parserInput.commentStore.length = 0;
		                    if (!value) {
		                        // a name returned by this.ruleProperty() is always an array of the form:
		                        // [string-1, ..., string-n, ""] or [string-1, ..., string-n, "+"]
		                        // where each item is a tree.Keyword or tree.Variable
		                        merge = !isVariable && name.length > 1 && name.pop().value;
		                        // Custom property values get permissive parsing
		                        if (name[0].value && name[0].value.slice(0, 2) === '--') {
		                            value = this.permissiveValue();
		                        }
		                        // Try to store values as anonymous
		                        // If we need the value later we'll re-parse it in ruleset.parseValue
		                        else {
		                            value = this.anonymousValue();
		                        }
		                        if (value) {
		                            parserInput.forget();
		                            // anonymous values absorb the end ';' which is required for them to work
		                            return new (tree_1.default.Declaration)(name, value, false, merge, index, fileInfo);
		                        }
		                        if (!value) {
		                            value = this.value();
		                        }
		                        if (value) {
		                            important = this.important();
		                        }
		                        else if (isVariable) {
		                            // As a last resort, try permissiveValue
		                            value = this.permissiveValue();
		                        }
		                    }
		                    if (value && (this.end() || hasDR)) {
		                        parserInput.forget();
		                        return new (tree_1.default.Declaration)(name, value, important, merge, index, fileInfo);
		                    }
		                    else {
		                        parserInput.restore();
		                    }
		                }
		                else {
		                    parserInput.restore();
		                }
		            },
		            anonymousValue: function () {
		                var index = parserInput.i;
		                var match = parserInput.$re(/^([^.#@\$+\/'"*`(;{}-]*);/);
		                if (match) {
		                    return new (tree_1.default.Anonymous)(match[1], index);
		                }
		            },
		            /**
		             * Used for custom properties, at-rules, and variables (as fallback)
		             * Parses almost anything inside of {} [] () "" blocks
		             * until it reaches outer-most tokens.
		             *
		             * First, it will try to parse comments and entities to reach
		             * the end. This is mostly like the Expression parser except no
		             * math is allowed.
		             */
		            permissiveValue: function (untilTokens) {
		                var i;
		                var e;
		                var done;
		                var value;
		                var tok = untilTokens || ';';
		                var index = parserInput.i;
		                var result = [];
		                function testCurrentChar() {
		                    var char = parserInput.currentChar();
		                    if (typeof tok === 'string') {
		                        return char === tok;
		                    }
		                    else {
		                        return tok.test(char);
		                    }
		                }
		                if (testCurrentChar()) {
		                    return;
		                }
		                value = [];
		                do {
		                    e = this.comment();
		                    if (e) {
		                        value.push(e);
		                        continue;
		                    }
		                    e = this.entity();
		                    if (e) {
		                        value.push(e);
		                    }
		                } while (e);
		                done = testCurrentChar();
		                if (value.length > 0) {
		                    value = new (tree_1.default.Expression)(value);
		                    if (done) {
		                        return value;
		                    }
		                    else {
		                        result.push(value);
		                    }
		                    // Preserve space before $parseUntil as it will not
		                    if (parserInput.prevChar() === ' ') {
		                        result.push(new tree_1.default.Anonymous(' ', index));
		                    }
		                }
		                parserInput.save();
		                value = parserInput.$parseUntil(tok);
		                if (value) {
		                    if (typeof value === 'string') {
		                        error("Expected '" + value + "'", 'Parse');
		                    }
		                    if (value.length === 1 && value[0] === ' ') {
		                        parserInput.forget();
		                        return new tree_1.default.Anonymous('', index);
		                    }
		                    var item = void 0;
		                    for (i = 0; i < value.length; i++) {
		                        item = value[i];
		                        if (Array.isArray(item)) {
		                            // Treat actual quotes as normal quoted values
		                            result.push(new tree_1.default.Quoted(item[0], item[1], true, index, fileInfo));
		                        }
		                        else {
		                            if (i === value.length - 1) {
		                                item = item.trim();
		                            }
		                            // Treat like quoted values, but replace vars like unquoted expressions
		                            var quote = new tree_1.default.Quoted('\'', item, true, index, fileInfo);
		                            quote.variableRegex = /@([\w-]+)/g;
		                            quote.propRegex = /\$([\w-]+)/g;
		                            result.push(quote);
		                        }
		                    }
		                    parserInput.forget();
		                    return new tree_1.default.Expression(result, true);
		                }
		                parserInput.restore();
		            },
		            //
		            // An @import atrule
		            //
		            //     @import "lib";
		            //
		            // Depending on our environment, importing is done differently:
		            // In the browser, it's an XHR request, in Node, it would be a
		            // file-system operation. The function used for importing is
		            // stored in `import`, which we pass to the Import constructor.
		            //
		            'import': function () {
		                var path;
		                var features;
		                var index = parserInput.i;
		                var dir = parserInput.$re(/^@import\s+/);
		                if (dir) {
		                    var options = (dir ? this.importOptions() : null) || {};
		                    if ((path = this.entities.quoted() || this.entities.url())) {
		                        features = this.mediaFeatures();
		                        if (!parserInput.$char(';')) {
		                            parserInput.i = index;
		                            error('missing semi-colon or unrecognised media features on import');
		                        }
		                        features = features && new (tree_1.default.Value)(features);
		                        return new (tree_1.default.Import)(path, features, options, index, fileInfo);
		                    }
		                    else {
		                        parserInput.i = index;
		                        error('malformed import statement');
		                    }
		                }
		            },
		            importOptions: function () {
		                var o;
		                var options = {};
		                var optionName;
		                var value;
		                // list of options, surrounded by parens
		                if (!parserInput.$char('(')) {
		                    return null;
		                }
		                do {
		                    o = this.importOption();
		                    if (o) {
		                        optionName = o;
		                        value = true;
		                        switch (optionName) {
		                            case 'css':
		                                optionName = 'less';
		                                value = false;
		                                break;
		                            case 'once':
		                                optionName = 'multiple';
		                                value = false;
		                                break;
		                        }
		                        options[optionName] = value;
		                        if (!parserInput.$char(',')) {
		                            break;
		                        }
		                    }
		                } while (o);
		                expectChar(')');
		                return options;
		            },
		            importOption: function () {
		                var opt = parserInput.$re(/^(less|css|multiple|once|inline|reference|optional)/);
		                if (opt) {
		                    return opt[1];
		                }
		            },
		            mediaFeature: function () {
		                var entities = this.entities;
		                var nodes = [];
		                var e;
		                var p;
		                parserInput.save();
		                do {
		                    e = entities.keyword() || entities.variable() || entities.mixinLookup();
		                    if (e) {
		                        nodes.push(e);
		                    }
		                    else if (parserInput.$char('(')) {
		                        p = this.property();
		                        e = this.value();
		                        if (parserInput.$char(')')) {
		                            if (p && e) {
		                                nodes.push(new (tree_1.default.Paren)(new (tree_1.default.Declaration)(p, e, null, null, parserInput.i, fileInfo, true)));
		                            }
		                            else if (e) {
		                                nodes.push(new (tree_1.default.Paren)(e));
		                            }
		                            else {
		                                error('badly formed media feature definition');
		                            }
		                        }
		                        else {
		                            error('Missing closing \')\'', 'Parse');
		                        }
		                    }
		                } while (e);
		                parserInput.forget();
		                if (nodes.length > 0) {
		                    return new (tree_1.default.Expression)(nodes);
		                }
		            },
		            mediaFeatures: function () {
		                var entities = this.entities;
		                var features = [];
		                var e;
		                do {
		                    e = this.mediaFeature();
		                    if (e) {
		                        features.push(e);
		                        if (!parserInput.$char(',')) {
		                            break;
		                        }
		                    }
		                    else {
		                        e = entities.variable() || entities.mixinLookup();
		                        if (e) {
		                            features.push(e);
		                            if (!parserInput.$char(',')) {
		                                break;
		                            }
		                        }
		                    }
		                } while (e);
		                return features.length > 0 ? features : null;
		            },
		            media: function () {
		                var features;
		                var rules;
		                var media;
		                var debugInfo;
		                var index = parserInput.i;
		                if (context.dumpLineNumbers) {
		                    debugInfo = getDebugInfo(index);
		                }
		                parserInput.save();
		                if (parserInput.$str('@media')) {
		                    features = this.mediaFeatures();
		                    rules = this.block();
		                    if (!rules) {
		                        error('media definitions require block statements after any features');
		                    }
		                    parserInput.forget();
		                    media = new (tree_1.default.Media)(rules, features, index, fileInfo);
		                    if (context.dumpLineNumbers) {
		                        media.debugInfo = debugInfo;
		                    }
		                    return media;
		                }
		                parserInput.restore();
		            },
		            //
		            // A @plugin directive, used to import plugins dynamically.
		            //
		            //     @plugin (args) "lib";
		            //
		            plugin: function () {
		                var path;
		                var args;
		                var options;
		                var index = parserInput.i;
		                var dir = parserInput.$re(/^@plugin\s+/);
		                if (dir) {
		                    args = this.pluginArgs();
		                    if (args) {
		                        options = {
		                            pluginArgs: args,
		                            isPlugin: true
		                        };
		                    }
		                    else {
		                        options = { isPlugin: true };
		                    }
		                    if ((path = this.entities.quoted() || this.entities.url())) {
		                        if (!parserInput.$char(';')) {
		                            parserInput.i = index;
		                            error('missing semi-colon on @plugin');
		                        }
		                        return new (tree_1.default.Import)(path, null, options, index, fileInfo);
		                    }
		                    else {
		                        parserInput.i = index;
		                        error('malformed @plugin statement');
		                    }
		                }
		            },
		            pluginArgs: function () {
		                // list of options, surrounded by parens
		                parserInput.save();
		                if (!parserInput.$char('(')) {
		                    parserInput.restore();
		                    return null;
		                }
		                var args = parserInput.$re(/^\s*([^\);]+)\)\s*/);
		                if (args[1]) {
		                    parserInput.forget();
		                    return args[1].trim();
		                }
		                else {
		                    parserInput.restore();
		                    return null;
		                }
		            },
		            //
		            // A CSS AtRule
		            //
		            //     @charset "utf-8";
		            //
		            atrule: function () {
		                var index = parserInput.i;
		                var name;
		                var value;
		                var rules;
		                var nonVendorSpecificName;
		                var hasIdentifier;
		                var hasExpression;
		                var hasUnknown;
		                var hasBlock = true;
		                var isRooted = true;
		                if (parserInput.currentChar() !== '@') {
		                    return;
		                }
		                value = this['import']() || this.plugin() || this.media();
		                if (value) {
		                    return value;
		                }
		                parserInput.save();
		                name = parserInput.$re(/^@[a-z-]+/);
		                if (!name) {
		                    return;
		                }
		                nonVendorSpecificName = name;
		                if (name.charAt(1) == '-' && name.indexOf('-', 2) > 0) {
		                    nonVendorSpecificName = "@" + name.slice(name.indexOf('-', 2) + 1);
		                }
		                switch (nonVendorSpecificName) {
		                    case '@charset':
		                        hasIdentifier = true;
		                        hasBlock = false;
		                        break;
		                    case '@namespace':
		                        hasExpression = true;
		                        hasBlock = false;
		                        break;
		                    case '@keyframes':
		                    case '@counter-style':
		                        hasIdentifier = true;
		                        break;
		                    case '@document':
		                    case '@supports':
		                        hasUnknown = true;
		                        isRooted = false;
		                        break;
		                    default:
		                        hasUnknown = true;
		                        break;
		                }
		                parserInput.commentStore.length = 0;
		                if (hasIdentifier) {
		                    value = this.entity();
		                    if (!value) {
		                        error("expected " + name + " identifier");
		                    }
		                }
		                else if (hasExpression) {
		                    value = this.expression();
		                    if (!value) {
		                        error("expected " + name + " expression");
		                    }
		                }
		                else if (hasUnknown) {
		                    value = this.permissiveValue(/^[{;]/);
		                    hasBlock = (parserInput.currentChar() === '{');
		                    if (!value) {
		                        if (!hasBlock && parserInput.currentChar() !== ';') {
		                            error(name + " rule is missing block or ending semi-colon");
		                        }
		                    }
		                    else if (!value.value) {
		                        value = null;
		                    }
		                }
		                if (hasBlock) {
		                    rules = this.blockRuleset();
		                }
		                if (rules || (!hasBlock && value && parserInput.$char(';'))) {
		                    parserInput.forget();
		                    return new (tree_1.default.AtRule)(name, value, rules, index, fileInfo, context.dumpLineNumbers ? getDebugInfo(index) : null, isRooted);
		                }
		                parserInput.restore('at-rule options not recognised');
		            },
		            //
		            // A Value is a comma-delimited list of Expressions
		            //
		            //     font-family: Baskerville, Georgia, serif;
		            //
		            // In a Rule, a Value represents everything after the `:`,
		            // and before the `;`.
		            //
		            value: function () {
		                var e;
		                var expressions = [];
		                var index = parserInput.i;
		                do {
		                    e = this.expression();
		                    if (e) {
		                        expressions.push(e);
		                        if (!parserInput.$char(',')) {
		                            break;
		                        }
		                    }
		                } while (e);
		                if (expressions.length > 0) {
		                    return new (tree_1.default.Value)(expressions, index);
		                }
		            },
		            important: function () {
		                if (parserInput.currentChar() === '!') {
		                    return parserInput.$re(/^! *important/);
		                }
		            },
		            sub: function () {
		                var a;
		                var e;
		                parserInput.save();
		                if (parserInput.$char('(')) {
		                    a = this.addition();
		                    if (a && parserInput.$char(')')) {
		                        parserInput.forget();
		                        e = new (tree_1.default.Expression)([a]);
		                        e.parens = true;
		                        return e;
		                    }
		                    parserInput.restore('Expected \')\'');
		                    return;
		                }
		                parserInput.restore();
		            },
		            multiplication: function () {
		                var m;
		                var a;
		                var op;
		                var operation;
		                var isSpaced;
		                m = this.operand();
		                if (m) {
		                    isSpaced = parserInput.isWhitespace(-1);
		                    while (true) {
		                        if (parserInput.peek(/^\/[*\/]/)) {
		                            break;
		                        }
		                        parserInput.save();
		                        op = parserInput.$char('/') || parserInput.$char('*') || parserInput.$str('./');
		                        if (!op) {
		                            parserInput.forget();
		                            break;
		                        }
		                        a = this.operand();
		                        if (!a) {
		                            parserInput.restore();
		                            break;
		                        }
		                        parserInput.forget();
		                        m.parensInOp = true;
		                        a.parensInOp = true;
		                        operation = new (tree_1.default.Operation)(op, [operation || m, a], isSpaced);
		                        isSpaced = parserInput.isWhitespace(-1);
		                    }
		                    return operation || m;
		                }
		            },
		            addition: function () {
		                var m;
		                var a;
		                var op;
		                var operation;
		                var isSpaced;
		                m = this.multiplication();
		                if (m) {
		                    isSpaced = parserInput.isWhitespace(-1);
		                    while (true) {
		                        op = parserInput.$re(/^[-+]\s+/) || (!isSpaced && (parserInput.$char('+') || parserInput.$char('-')));
		                        if (!op) {
		                            break;
		                        }
		                        a = this.multiplication();
		                        if (!a) {
		                            break;
		                        }
		                        m.parensInOp = true;
		                        a.parensInOp = true;
		                        operation = new (tree_1.default.Operation)(op, [operation || m, a], isSpaced);
		                        isSpaced = parserInput.isWhitespace(-1);
		                    }
		                    return operation || m;
		                }
		            },
		            conditions: function () {
		                var a;
		                var b;
		                var index = parserInput.i;
		                var condition;
		                a = this.condition(true);
		                if (a) {
		                    while (true) {
		                        if (!parserInput.peek(/^,\s*(not\s*)?\(/) || !parserInput.$char(',')) {
		                            break;
		                        }
		                        b = this.condition(true);
		                        if (!b) {
		                            break;
		                        }
		                        condition = new (tree_1.default.Condition)('or', condition || a, b, index);
		                    }
		                    return condition || a;
		                }
		            },
		            condition: function (needsParens) {
		                var result;
		                var logical;
		                var next;
		                function or() {
		                    return parserInput.$str('or');
		                }
		                result = this.conditionAnd(needsParens);
		                if (!result) {
		                    return;
		                }
		                logical = or();
		                if (logical) {
		                    next = this.condition(needsParens);
		                    if (next) {
		                        result = new (tree_1.default.Condition)(logical, result, next);
		                    }
		                    else {
		                        return;
		                    }
		                }
		                return result;
		            },
		            conditionAnd: function (needsParens) {
		                var result;
		                var logical;
		                var next;
		                var self = this;
		                function insideCondition() {
		                    var cond = self.negatedCondition(needsParens) || self.parenthesisCondition(needsParens);
		                    if (!cond && !needsParens) {
		                        return self.atomicCondition(needsParens);
		                    }
		                    return cond;
		                }
		                function and() {
		                    return parserInput.$str('and');
		                }
		                result = insideCondition();
		                if (!result) {
		                    return;
		                }
		                logical = and();
		                if (logical) {
		                    next = this.conditionAnd(needsParens);
		                    if (next) {
		                        result = new (tree_1.default.Condition)(logical, result, next);
		                    }
		                    else {
		                        return;
		                    }
		                }
		                return result;
		            },
		            negatedCondition: function (needsParens) {
		                if (parserInput.$str('not')) {
		                    var result = this.parenthesisCondition(needsParens);
		                    if (result) {
		                        result.negate = !result.negate;
		                    }
		                    return result;
		                }
		            },
		            parenthesisCondition: function (needsParens) {
		                function tryConditionFollowedByParenthesis(me) {
		                    var body;
		                    parserInput.save();
		                    body = me.condition(needsParens);
		                    if (!body) {
		                        parserInput.restore();
		                        return;
		                    }
		                    if (!parserInput.$char(')')) {
		                        parserInput.restore();
		                        return;
		                    }
		                    parserInput.forget();
		                    return body;
		                }
		                var body;
		                parserInput.save();
		                if (!parserInput.$str('(')) {
		                    parserInput.restore();
		                    return;
		                }
		                body = tryConditionFollowedByParenthesis(this);
		                if (body) {
		                    parserInput.forget();
		                    return body;
		                }
		                body = this.atomicCondition(needsParens);
		                if (!body) {
		                    parserInput.restore();
		                    return;
		                }
		                if (!parserInput.$char(')')) {
		                    parserInput.restore("expected ')' got '" + parserInput.currentChar() + "'");
		                    return;
		                }
		                parserInput.forget();
		                return body;
		            },
		            atomicCondition: function (needsParens) {
		                var entities = this.entities;
		                var index = parserInput.i;
		                var a;
		                var b;
		                var c;
		                var op;
		                function cond() {
		                    return this.addition() || entities.keyword() || entities.quoted() || entities.mixinLookup();
		                }
		                cond = cond.bind(this);
		                a = cond();
		                if (a) {
		                    if (parserInput.$char('>')) {
		                        if (parserInput.$char('=')) {
		                            op = '>=';
		                        }
		                        else {
		                            op = '>';
		                        }
		                    }
		                    else if (parserInput.$char('<')) {
		                        if (parserInput.$char('=')) {
		                            op = '<=';
		                        }
		                        else {
		                            op = '<';
		                        }
		                    }
		                    else if (parserInput.$char('=')) {
		                        if (parserInput.$char('>')) {
		                            op = '=>';
		                        }
		                        else if (parserInput.$char('<')) {
		                            op = '=<';
		                        }
		                        else {
		                            op = '=';
		                        }
		                    }
		                    if (op) {
		                        b = cond();
		                        if (b) {
		                            c = new (tree_1.default.Condition)(op, a, b, index, false);
		                        }
		                        else {
		                            error('expected expression');
		                        }
		                    }
		                    else {
		                        c = new (tree_1.default.Condition)('=', a, new (tree_1.default.Keyword)('true'), index, false);
		                    }
		                    return c;
		                }
		            },
		            //
		            // An operand is anything that can be part of an operation,
		            // such as a Color, or a Variable
		            //
		            operand: function () {
		                var entities = this.entities;
		                var negate;
		                if (parserInput.peek(/^-[@\$\(]/)) {
		                    negate = parserInput.$char('-');
		                }
		                var o = this.sub() || entities.dimension() ||
		                    entities.color() || entities.variable() ||
		                    entities.property() || entities.call() ||
		                    entities.quoted(true) || entities.colorKeyword() ||
		                    entities.mixinLookup();
		                if (negate) {
		                    o.parensInOp = true;
		                    o = new (tree_1.default.Negative)(o);
		                }
		                return o;
		            },
		            //
		            // Expressions either represent mathematical operations,
		            // or white-space delimited Entities.
		            //
		            //     1px solid black
		            //     @var * 2
		            //
		            expression: function () {
		                var entities = [];
		                var e;
		                var delim;
		                var index = parserInput.i;
		                do {
		                    e = this.comment();
		                    if (e) {
		                        entities.push(e);
		                        continue;
		                    }
		                    e = this.addition() || this.entity();
		                    if (e instanceof tree_1.default.Comment) {
		                        e = null;
		                    }
		                    if (e) {
		                        entities.push(e);
		                        // operations do not allow keyword "/" dimension (e.g. small/20px) so we support that here
		                        if (!parserInput.peek(/^\/[\/*]/)) {
		                            delim = parserInput.$char('/');
		                            if (delim) {
		                                entities.push(new (tree_1.default.Anonymous)(delim, index));
		                            }
		                        }
		                    }
		                } while (e);
		                if (entities.length > 0) {
		                    return new (tree_1.default.Expression)(entities);
		                }
		            },
		            property: function () {
		                var name = parserInput.$re(/^(\*?-?[_a-zA-Z0-9-]+)\s*:/);
		                if (name) {
		                    return name[1];
		                }
		            },
		            ruleProperty: function () {
		                var name = [];
		                var index = [];
		                var s;
		                var k;
		                parserInput.save();
		                var simpleProperty = parserInput.$re(/^([_a-zA-Z0-9-]+)\s*:/);
		                if (simpleProperty) {
		                    name = [new (tree_1.default.Keyword)(simpleProperty[1])];
		                    parserInput.forget();
		                    return name;
		                }
		                function match(re) {
		                    var i = parserInput.i;
		                    var chunk = parserInput.$re(re);
		                    if (chunk) {
		                        index.push(i);
		                        return name.push(chunk[1]);
		                    }
		                }
		                match(/^(\*?)/);
		                while (true) {
		                    if (!match(/^((?:[\w-]+)|(?:[@\$]\{[\w-]+\}))/)) {
		                        break;
		                    }
		                }
		                if ((name.length > 1) && match(/^((?:\+_|\+)?)\s*:/)) {
		                    parserInput.forget();
		                    // at last, we have the complete match now. move forward,
		                    // convert name particles to tree objects and return:
		                    if (name[0] === '') {
		                        name.shift();
		                        index.shift();
		                    }
		                    for (k = 0; k < name.length; k++) {
		                        s = name[k];
		                        name[k] = (s.charAt(0) !== '@' && s.charAt(0) !== '$') ?
		                            new (tree_1.default.Keyword)(s) :
		                            (s.charAt(0) === '@' ?
		                                new (tree_1.default.Variable)("@" + s.slice(2, -1), index[k], fileInfo) :
		                                new (tree_1.default.Property)("$" + s.slice(2, -1), index[k], fileInfo));
		                    }
		                    return name;
		                }
		                parserInput.restore();
		            }
		        }
		    };
		};
		Parser.serializeVars = function (vars) {
		    var s = '';
		    for (var name_1 in vars) {
		        if (Object.hasOwnProperty.call(vars, name_1)) {
		            var value = vars[name_1];
		            s += ((name_1[0] === '@') ? '' : '@') + name_1 + ": " + value + ((String(value).slice(-1) === ';') ? '' : ';');
		        }
		    }
		    return s;
		};
		parser.default = Parser;
		
		return parser;
	}

	var functions = {};

	var boolean = {};

	var hasRequiredBoolean;

	function requireBoolean () {
		if (hasRequiredBoolean) return boolean;
		hasRequiredBoolean = 1;
		Object.defineProperty(boolean, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var keyword_1 = tslib_1.__importDefault(requireKeyword());
		function boolean$1(condition) {
		    return condition ? keyword_1.default.True : keyword_1.default.False;
		}
		/**
		 * Functions with evalArgs set to false are sent context
		 * as the first argument.
		 */
		function If(context, condition, trueValue, falseValue) {
		    return condition.eval(context) ? trueValue.eval(context)
		        : (falseValue ? falseValue.eval(context) : new anonymous_1.default);
		}
		If.evalArgs = false;
		function isdefined(context, variable) {
		    try {
		        variable.eval(context);
		        return keyword_1.default.True;
		    }
		    catch (e) {
		        return keyword_1.default.False;
		    }
		}
		isdefined.evalArgs = false;
		boolean.default = { isdefined: isdefined, boolean: boolean$1, 'if': If };
		
		return boolean;
	}

	var color = {};

	var hasRequiredColor;

	function requireColor () {
		if (hasRequiredColor) return color;
		hasRequiredColor = 1;
		Object.defineProperty(color, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var color_1 = tslib_1.__importDefault(requireColor$1());
		var quoted_1 = tslib_1.__importDefault(requireQuoted());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var expression_1 = tslib_1.__importDefault(requireExpression());
		var operation_1 = tslib_1.__importDefault(requireOperation());
		var colorFunctions;
		function clamp(val) {
		    return Math.min(1, Math.max(0, val));
		}
		function hsla(origColor, hsl) {
		    var color = colorFunctions.hsla(hsl.h, hsl.s, hsl.l, hsl.a);
		    if (color) {
		        if (origColor.value &&
		            /^(rgb|hsl)/.test(origColor.value)) {
		            color.value = origColor.value;
		        }
		        else {
		            color.value = 'rgb';
		        }
		        return color;
		    }
		}
		function toHSL(color) {
		    if (color.toHSL) {
		        return color.toHSL();
		    }
		    else {
		        throw new Error('Argument cannot be evaluated to a color');
		    }
		}
		function toHSV(color) {
		    if (color.toHSV) {
		        return color.toHSV();
		    }
		    else {
		        throw new Error('Argument cannot be evaluated to a color');
		    }
		}
		function number(n) {
		    if (n instanceof dimension_1.default) {
		        return parseFloat(n.unit.is('%') ? n.value / 100 : n.value);
		    }
		    else if (typeof n === 'number') {
		        return n;
		    }
		    else {
		        throw {
		            type: 'Argument',
		            message: 'color functions take numbers as parameters'
		        };
		    }
		}
		function scaled(n, size) {
		    if (n instanceof dimension_1.default && n.unit.is('%')) {
		        return parseFloat(n.value * size / 100);
		    }
		    else {
		        return number(n);
		    }
		}
		colorFunctions = {
		    rgb: function (r, g, b) {
		        var a = 1;
		        /**
		         * Comma-less syntax
		         *   e.g. rgb(0 128 255 / 50%)
		         */
		        if (r instanceof expression_1.default) {
		            var val = r.value;
		            r = val[0];
		            g = val[1];
		            b = val[2];
		            /**
		             * @todo - should this be normalized in
		             *   function caller? Or parsed differently?
		             */
		            if (b instanceof operation_1.default) {
		                var op = b;
		                b = op.operands[0];
		                a = op.operands[1];
		            }
		        }
		        var color = colorFunctions.rgba(r, g, b, a);
		        if (color) {
		            color.value = 'rgb';
		            return color;
		        }
		    },
		    rgba: function (r, g, b, a) {
		        try {
		            if (r instanceof color_1.default) {
		                if (g) {
		                    a = number(g);
		                }
		                else {
		                    a = r.alpha;
		                }
		                return new color_1.default(r.rgb, a, 'rgba');
		            }
		            var rgb = [r, g, b].map(function (c) { return scaled(c, 255); });
		            a = number(a);
		            return new color_1.default(rgb, a, 'rgba');
		        }
		        catch (e) { }
		    },
		    hsl: function (h, s, l) {
		        var a = 1;
		        if (h instanceof expression_1.default) {
		            var val = h.value;
		            h = val[0];
		            s = val[1];
		            l = val[2];
		            if (l instanceof operation_1.default) {
		                var op = l;
		                l = op.operands[0];
		                a = op.operands[1];
		            }
		        }
		        var color = colorFunctions.hsla(h, s, l, a);
		        if (color) {
		            color.value = 'hsl';
		            return color;
		        }
		    },
		    hsla: function (h, s, l, a) {
		        try {
		            if (h instanceof color_1.default) {
		                if (s) {
		                    a = number(s);
		                }
		                else {
		                    a = h.alpha;
		                }
		                return new color_1.default(h.rgb, a, 'hsla');
		            }
		            var m1_1;
		            var m2_1;
		            function hue(h) {
		                h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
		                if (h * 6 < 1) {
		                    return m1_1 + (m2_1 - m1_1) * h * 6;
		                }
		                else if (h * 2 < 1) {
		                    return m2_1;
		                }
		                else if (h * 3 < 2) {
		                    return m1_1 + (m2_1 - m1_1) * (2 / 3 - h) * 6;
		                }
		                else {
		                    return m1_1;
		                }
		            }
		            h = (number(h) % 360) / 360;
		            s = clamp(number(s));
		            l = clamp(number(l));
		            a = clamp(number(a));
		            m2_1 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
		            m1_1 = l * 2 - m2_1;
		            var rgb = [
		                hue(h + 1 / 3) * 255,
		                hue(h) * 255,
		                hue(h - 1 / 3) * 255
		            ];
		            a = number(a);
		            return new color_1.default(rgb, a, 'hsla');
		        }
		        catch (e) { }
		    },
		    hsv: function (h, s, v) {
		        return colorFunctions.hsva(h, s, v, 1.0);
		    },
		    hsva: function (h, s, v, a) {
		        h = ((number(h) % 360) / 360) * 360;
		        s = number(s);
		        v = number(v);
		        a = number(a);
		        var i;
		        var f;
		        i = Math.floor((h / 60) % 6);
		        f = (h / 60) - i;
		        var vs = [v,
		            v * (1 - s),
		            v * (1 - f * s),
		            v * (1 - (1 - f) * s)];
		        var perm = [[0, 3, 1],
		            [2, 0, 1],
		            [1, 0, 3],
		            [1, 2, 0],
		            [3, 1, 0],
		            [0, 1, 2]];
		        return colorFunctions.rgba(vs[perm[i][0]] * 255, vs[perm[i][1]] * 255, vs[perm[i][2]] * 255, a);
		    },
		    hue: function (color) {
		        return new dimension_1.default(toHSL(color).h);
		    },
		    saturation: function (color) {
		        return new dimension_1.default(toHSL(color).s * 100, '%');
		    },
		    lightness: function (color) {
		        return new dimension_1.default(toHSL(color).l * 100, '%');
		    },
		    hsvhue: function (color) {
		        return new dimension_1.default(toHSV(color).h);
		    },
		    hsvsaturation: function (color) {
		        return new dimension_1.default(toHSV(color).s * 100, '%');
		    },
		    hsvvalue: function (color) {
		        return new dimension_1.default(toHSV(color).v * 100, '%');
		    },
		    red: function (color) {
		        return new dimension_1.default(color.rgb[0]);
		    },
		    green: function (color) {
		        return new dimension_1.default(color.rgb[1]);
		    },
		    blue: function (color) {
		        return new dimension_1.default(color.rgb[2]);
		    },
		    alpha: function (color) {
		        return new dimension_1.default(toHSL(color).a);
		    },
		    luma: function (color) {
		        return new dimension_1.default(color.luma() * color.alpha * 100, '%');
		    },
		    luminance: function (color) {
		        var luminance = (0.2126 * color.rgb[0] / 255) +
		            (0.7152 * color.rgb[1] / 255) +
		            (0.0722 * color.rgb[2] / 255);
		        return new dimension_1.default(luminance * color.alpha * 100, '%');
		    },
		    saturate: function (color, amount, method) {
		        // filter: saturate(3.2);
		        // should be kept as is, so check for color
		        if (!color.rgb) {
		            return null;
		        }
		        var hsl = toHSL(color);
		        if (typeof method !== 'undefined' && method.value === 'relative') {
		            hsl.s += hsl.s * amount.value / 100;
		        }
		        else {
		            hsl.s += amount.value / 100;
		        }
		        hsl.s = clamp(hsl.s);
		        return hsla(color, hsl);
		    },
		    desaturate: function (color, amount, method) {
		        var hsl = toHSL(color);
		        if (typeof method !== 'undefined' && method.value === 'relative') {
		            hsl.s -= hsl.s * amount.value / 100;
		        }
		        else {
		            hsl.s -= amount.value / 100;
		        }
		        hsl.s = clamp(hsl.s);
		        return hsla(color, hsl);
		    },
		    lighten: function (color, amount, method) {
		        var hsl = toHSL(color);
		        if (typeof method !== 'undefined' && method.value === 'relative') {
		            hsl.l += hsl.l * amount.value / 100;
		        }
		        else {
		            hsl.l += amount.value / 100;
		        }
		        hsl.l = clamp(hsl.l);
		        return hsla(color, hsl);
		    },
		    darken: function (color, amount, method) {
		        var hsl = toHSL(color);
		        if (typeof method !== 'undefined' && method.value === 'relative') {
		            hsl.l -= hsl.l * amount.value / 100;
		        }
		        else {
		            hsl.l -= amount.value / 100;
		        }
		        hsl.l = clamp(hsl.l);
		        return hsla(color, hsl);
		    },
		    fadein: function (color, amount, method) {
		        var hsl = toHSL(color);
		        if (typeof method !== 'undefined' && method.value === 'relative') {
		            hsl.a += hsl.a * amount.value / 100;
		        }
		        else {
		            hsl.a += amount.value / 100;
		        }
		        hsl.a = clamp(hsl.a);
		        return hsla(color, hsl);
		    },
		    fadeout: function (color, amount, method) {
		        var hsl = toHSL(color);
		        if (typeof method !== 'undefined' && method.value === 'relative') {
		            hsl.a -= hsl.a * amount.value / 100;
		        }
		        else {
		            hsl.a -= amount.value / 100;
		        }
		        hsl.a = clamp(hsl.a);
		        return hsla(color, hsl);
		    },
		    fade: function (color, amount) {
		        var hsl = toHSL(color);
		        hsl.a = amount.value / 100;
		        hsl.a = clamp(hsl.a);
		        return hsla(color, hsl);
		    },
		    spin: function (color, amount) {
		        var hsl = toHSL(color);
		        var hue = (hsl.h + amount.value) % 360;
		        hsl.h = hue < 0 ? 360 + hue : hue;
		        return hsla(color, hsl);
		    },
		    //
		    // Copyright (c) 2006-2009 Hampton Catlin, Natalie Weizenbaum, and Chris Eppstein
		    // http://sass-lang.com
		    //
		    mix: function (color1, color2, weight) {
		        if (!weight) {
		            weight = new dimension_1.default(50);
		        }
		        var p = weight.value / 100.0;
		        var w = p * 2 - 1;
		        var a = toHSL(color1).a - toHSL(color2).a;
		        var w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		        var w2 = 1 - w1;
		        var rgb = [color1.rgb[0] * w1 + color2.rgb[0] * w2,
		            color1.rgb[1] * w1 + color2.rgb[1] * w2,
		            color1.rgb[2] * w1 + color2.rgb[2] * w2];
		        var alpha = color1.alpha * p + color2.alpha * (1 - p);
		        return new color_1.default(rgb, alpha);
		    },
		    greyscale: function (color) {
		        return colorFunctions.desaturate(color, new dimension_1.default(100));
		    },
		    contrast: function (color, dark, light, threshold) {
		        // filter: contrast(3.2);
		        // should be kept as is, so check for color
		        if (!color.rgb) {
		            return null;
		        }
		        if (typeof light === 'undefined') {
		            light = colorFunctions.rgba(255, 255, 255, 1.0);
		        }
		        if (typeof dark === 'undefined') {
		            dark = colorFunctions.rgba(0, 0, 0, 1.0);
		        }
		        // Figure out which is actually light and dark:
		        if (dark.luma() > light.luma()) {
		            var t = light;
		            light = dark;
		            dark = t;
		        }
		        if (typeof threshold === 'undefined') {
		            threshold = 0.43;
		        }
		        else {
		            threshold = number(threshold);
		        }
		        if (color.luma() < threshold) {
		            return light;
		        }
		        else {
		            return dark;
		        }
		    },
		    // Changes made in 2.7.0 - Reverted in 3.0.0
		    // contrast: function (color, color1, color2, threshold) {
		    //     // Return which of `color1` and `color2` has the greatest contrast with `color`
		    //     // according to the standard WCAG contrast ratio calculation.
		    //     // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		    //     // The threshold param is no longer used, in line with SASS.
		    //     // filter: contrast(3.2);
		    //     // should be kept as is, so check for color
		    //     if (!color.rgb) {
		    //         return null;
		    //     }
		    //     if (typeof color1 === 'undefined') {
		    //         color1 = colorFunctions.rgba(0, 0, 0, 1.0);
		    //     }
		    //     if (typeof color2 === 'undefined') {
		    //         color2 = colorFunctions.rgba(255, 255, 255, 1.0);
		    //     }
		    //     var contrast1, contrast2;
		    //     var luma = color.luma();
		    //     var luma1 = color1.luma();
		    //     var luma2 = color2.luma();
		    //     // Calculate contrast ratios for each color
		    //     if (luma > luma1) {
		    //         contrast1 = (luma + 0.05) / (luma1 + 0.05);
		    //     } else {
		    //         contrast1 = (luma1 + 0.05) / (luma + 0.05);
		    //     }
		    //     if (luma > luma2) {
		    //         contrast2 = (luma + 0.05) / (luma2 + 0.05);
		    //     } else {
		    //         contrast2 = (luma2 + 0.05) / (luma + 0.05);
		    //     }
		    //     if (contrast1 > contrast2) {
		    //         return color1;
		    //     } else {
		    //         return color2;
		    //     }
		    // },
		    argb: function (color) {
		        return new anonymous_1.default(color.toARGB());
		    },
		    color: function (c) {
		        if ((c instanceof quoted_1.default) &&
		            (/^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4})$/i.test(c.value))) {
		            var val = c.value.slice(1);
		            return new color_1.default(val, undefined, "#" + val);
		        }
		        if ((c instanceof color_1.default) || (c = color_1.default.fromKeyword(c.value))) {
		            c.value = undefined;
		            return c;
		        }
		        throw {
		            type: 'Argument',
		            message: 'argument must be a color keyword or 3|4|6|8 digit hex e.g. #FFF'
		        };
		    },
		    tint: function (color, amount) {
		        return colorFunctions.mix(colorFunctions.rgb(255, 255, 255), color, amount);
		    },
		    shade: function (color, amount) {
		        return colorFunctions.mix(colorFunctions.rgb(0, 0, 0), color, amount);
		    }
		};
		color.default = colorFunctions;
		
		return color;
	}

	var colorBlending = {};

	var hasRequiredColorBlending;

	function requireColorBlending () {
		if (hasRequiredColorBlending) return colorBlending;
		hasRequiredColorBlending = 1;
		Object.defineProperty(colorBlending, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var color_1 = tslib_1.__importDefault(requireColor$1());
		// Color Blending
		// ref: http://www.w3.org/TR/compositing-1
		function colorBlend(mode, color1, color2) {
		    var ab = color1.alpha; // result
		    var // backdrop
		    cb;
		    var as = color2.alpha;
		    var // source
		    cs;
		    var ar;
		    var cr;
		    var r = [];
		    ar = as + ab * (1 - as);
		    for (var i = 0; i < 3; i++) {
		        cb = color1.rgb[i] / 255;
		        cs = color2.rgb[i] / 255;
		        cr = mode(cb, cs);
		        if (ar) {
		            cr = (as * cs + ab * (cb -
		                as * (cb + cs - cr))) / ar;
		        }
		        r[i] = cr * 255;
		    }
		    return new color_1.default(r, ar);
		}
		var colorBlendModeFunctions = {
		    multiply: function (cb, cs) {
		        return cb * cs;
		    },
		    screen: function (cb, cs) {
		        return cb + cs - cb * cs;
		    },
		    overlay: function (cb, cs) {
		        cb *= 2;
		        return (cb <= 1) ?
		            colorBlendModeFunctions.multiply(cb, cs) :
		            colorBlendModeFunctions.screen(cb - 1, cs);
		    },
		    softlight: function (cb, cs) {
		        var d = 1;
		        var e = cb;
		        if (cs > 0.5) {
		            e = 1;
		            d = (cb > 0.25) ? Math.sqrt(cb)
		                : ((16 * cb - 12) * cb + 4) * cb;
		        }
		        return cb - (1 - 2 * cs) * e * (d - cb);
		    },
		    hardlight: function (cb, cs) {
		        return colorBlendModeFunctions.overlay(cs, cb);
		    },
		    difference: function (cb, cs) {
		        return Math.abs(cb - cs);
		    },
		    exclusion: function (cb, cs) {
		        return cb + cs - 2 * cb * cs;
		    },
		    // non-w3c functions:
		    average: function (cb, cs) {
		        return (cb + cs) / 2;
		    },
		    negation: function (cb, cs) {
		        return 1 - Math.abs(cb + cs - 1);
		    }
		};
		for (var f in colorBlendModeFunctions) {
		    if (colorBlendModeFunctions.hasOwnProperty(f)) {
		        colorBlend[f] = colorBlend.bind(null, colorBlendModeFunctions[f]);
		    }
		}
		colorBlending.default = colorBlend;
		
		return colorBlending;
	}

	var dataUri = {};

	var hasRequiredDataUri;

	function requireDataUri () {
		if (hasRequiredDataUri) return dataUri;
		hasRequiredDataUri = 1;
		Object.defineProperty(dataUri, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var quoted_1 = tslib_1.__importDefault(requireQuoted());
		var url_1 = tslib_1.__importDefault(requireUrl());
		var utils = tslib_1.__importStar(requireUtils());
		var logger_1 = tslib_1.__importDefault(requireLogger());
		dataUri.default = (function (environment) {
		    var fallback = function (functionThis, node) { return new url_1.default(node, functionThis.index, functionThis.currentFileInfo).eval(functionThis.context); };
		    return { 'data-uri': function (mimetypeNode, filePathNode) {
		            if (!filePathNode) {
		                filePathNode = mimetypeNode;
		                mimetypeNode = null;
		            }
		            var mimetype = mimetypeNode && mimetypeNode.value;
		            var filePath = filePathNode.value;
		            var currentFileInfo = this.currentFileInfo;
		            var currentDirectory = currentFileInfo.rewriteUrls ?
		                currentFileInfo.currentDirectory : currentFileInfo.entryPath;
		            var fragmentStart = filePath.indexOf('#');
		            var fragment = '';
		            if (fragmentStart !== -1) {
		                fragment = filePath.slice(fragmentStart);
		                filePath = filePath.slice(0, fragmentStart);
		            }
		            var context = utils.clone(this.context);
		            context.rawBuffer = true;
		            var fileManager = environment.getFileManager(filePath, currentDirectory, context, environment, true);
		            if (!fileManager) {
		                return fallback(this, filePathNode);
		            }
		            var useBase64 = false;
		            // detect the mimetype if not given
		            if (!mimetypeNode) {
		                mimetype = environment.mimeLookup(filePath);
		                if (mimetype === 'image/svg+xml') {
		                    useBase64 = false;
		                }
		                else {
		                    // use base 64 unless it's an ASCII or UTF-8 format
		                    var charset = environment.charsetLookup(mimetype);
		                    useBase64 = ['US-ASCII', 'UTF-8'].indexOf(charset) < 0;
		                }
		                if (useBase64) {
		                    mimetype += ';base64';
		                }
		            }
		            else {
		                useBase64 = /;base64$/.test(mimetype);
		            }
		            var fileSync = fileManager.loadFileSync(filePath, currentDirectory, context, environment);
		            if (!fileSync.contents) {
		                logger_1.default.warn("Skipped data-uri embedding of " + filePath + " because file not found");
		                return fallback(this, filePathNode || mimetypeNode);
		            }
		            var buf = fileSync.contents;
		            if (useBase64 && !environment.encodeBase64) {
		                return fallback(this, filePathNode);
		            }
		            buf = useBase64 ? environment.encodeBase64(buf) : encodeURIComponent(buf);
		            var uri = "data:" + mimetype + "," + buf + fragment;
		            return new url_1.default(new quoted_1.default("\"" + uri + "\"", uri, false, this.index, this.currentFileInfo), this.index, this.currentFileInfo);
		        } };
		});
		
		return dataUri;
	}

	var list = {};

	var hasRequiredList;

	function requireList () {
		if (hasRequiredList) return list;
		hasRequiredList = 1;
		Object.defineProperty(list, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var comment_1 = tslib_1.__importDefault(requireComment());
		var node_1 = tslib_1.__importDefault(requireNode());
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var declaration_1 = tslib_1.__importDefault(requireDeclaration());
		var expression_1 = tslib_1.__importDefault(requireExpression());
		var ruleset_1 = tslib_1.__importDefault(requireRuleset());
		var selector_1 = tslib_1.__importDefault(requireSelector());
		var element_1 = tslib_1.__importDefault(requireElement());
		var quoted_1 = tslib_1.__importDefault(requireQuoted());
		var value_1 = tslib_1.__importDefault(requireValue());
		var getItemsFromNode = function (node) {
		    // handle non-array values as an array of length 1
		    // return 'undefined' if index is invalid
		    var items = Array.isArray(node.value) ?
		        node.value : Array(node);
		    return items;
		};
		list.default = {
		    _SELF: function (n) {
		        return n;
		    },
		    '~': function () {
		        var expr = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            expr[_i] = arguments[_i];
		        }
		        if (expr.length === 1) {
		            return expr[0];
		        }
		        return new value_1.default(expr);
		    },
		    extract: function (values, index) {
		        // (1-based index)
		        index = index.value - 1;
		        return getItemsFromNode(values)[index];
		    },
		    length: function (values) {
		        return new dimension_1.default(getItemsFromNode(values).length);
		    },
		    /**
		     * Creates a Less list of incremental values.
		     * Modeled after Lodash's range function, also exists natively in PHP
		     *
		     * @param {Dimension} [start=1]
		     * @param {Dimension} end  - e.g. 10 or 10px - unit is added to output
		     * @param {Dimension} [step=1]
		     */
		    range: function (start, end, step) {
		        var from;
		        var to;
		        var stepValue = 1;
		        var list = [];
		        if (end) {
		            to = end;
		            from = start.value;
		            if (step) {
		                stepValue = step.value;
		            }
		        }
		        else {
		            from = 1;
		            to = start;
		        }
		        for (var i = from; i <= to.value; i += stepValue) {
		            list.push(new dimension_1.default(i, to.unit));
		        }
		        return new expression_1.default(list);
		    },
		    each: function (list, rs) {
		        var _this = this;
		        var rules = [];
		        var newRules;
		        var iterator;
		        var tryEval = function (val) {
		            if (val instanceof node_1.default) {
		                return val.eval(_this.context);
		            }
		            return val;
		        };
		        if (list.value && !(list instanceof quoted_1.default)) {
		            if (Array.isArray(list.value)) {
		                iterator = list.value.map(tryEval);
		            }
		            else {
		                iterator = [tryEval(list.value)];
		            }
		        }
		        else if (list.ruleset) {
		            iterator = tryEval(list.ruleset).rules;
		        }
		        else if (list.rules) {
		            iterator = list.rules.map(tryEval);
		        }
		        else if (Array.isArray(list)) {
		            iterator = list.map(tryEval);
		        }
		        else {
		            iterator = [tryEval(list)];
		        }
		        var valueName = '@value';
		        var keyName = '@key';
		        var indexName = '@index';
		        if (rs.params) {
		            valueName = rs.params[0] && rs.params[0].name;
		            keyName = rs.params[1] && rs.params[1].name;
		            indexName = rs.params[2] && rs.params[2].name;
		            rs = rs.rules;
		        }
		        else {
		            rs = rs.ruleset;
		        }
		        for (var i = 0; i < iterator.length; i++) {
		            var key = void 0;
		            var value = void 0;
		            var item = iterator[i];
		            if (item instanceof declaration_1.default) {
		                key = typeof item.name === 'string' ? item.name : item.name[0].value;
		                value = item.value;
		            }
		            else {
		                key = new dimension_1.default(i + 1);
		                value = item;
		            }
		            if (item instanceof comment_1.default) {
		                continue;
		            }
		            newRules = rs.rules.slice(0);
		            if (valueName) {
		                newRules.push(new declaration_1.default(valueName, value, false, false, this.index, this.currentFileInfo));
		            }
		            if (indexName) {
		                newRules.push(new declaration_1.default(indexName, new dimension_1.default(i + 1), false, false, this.index, this.currentFileInfo));
		            }
		            if (keyName) {
		                newRules.push(new declaration_1.default(keyName, key, false, false, this.index, this.currentFileInfo));
		            }
		            rules.push(new ruleset_1.default([new (selector_1.default)([new element_1.default("", '&')])], newRules, rs.strictImports, rs.visibilityInfo()));
		        }
		        return new ruleset_1.default([new (selector_1.default)([new element_1.default("", '&')])], rules, rs.strictImports, rs.visibilityInfo()).eval(this.context);
		    }
		};
		
		return list;
	}

	var math = {};

	var mathHelper = {};

	var hasRequiredMathHelper;

	function requireMathHelper () {
		if (hasRequiredMathHelper) return mathHelper;
		hasRequiredMathHelper = 1;
		Object.defineProperty(mathHelper, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var MathHelper = function (fn, unit, n) {
		    if (!(n instanceof dimension_1.default)) {
		        throw { type: 'Argument', message: 'argument must be a number' };
		    }
		    if (unit == null) {
		        unit = n.unit;
		    }
		    else {
		        n = n.unify();
		    }
		    return new dimension_1.default(fn(parseFloat(n.value)), unit);
		};
		mathHelper.default = MathHelper;
		
		return mathHelper;
	}

	var hasRequiredMath;

	function requireMath () {
		if (hasRequiredMath) return math;
		hasRequiredMath = 1;
		Object.defineProperty(math, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var math_helper_js_1 = tslib_1.__importDefault(requireMathHelper());
		var mathFunctions = {
		    // name,  unit
		    ceil: null,
		    floor: null,
		    sqrt: null,
		    abs: null,
		    tan: '',
		    sin: '',
		    cos: '',
		    atan: 'rad',
		    asin: 'rad',
		    acos: 'rad'
		};
		for (var f in mathFunctions) {
		    if (mathFunctions.hasOwnProperty(f)) {
		        mathFunctions[f] = math_helper_js_1.default.bind(null, Math[f], mathFunctions[f]);
		    }
		}
		mathFunctions.round = function (n, f) {
		    var fraction = typeof f === 'undefined' ? 0 : f.value;
		    return math_helper_js_1.default(function (num) { return num.toFixed(fraction); }, null, n);
		};
		math.default = mathFunctions;
		
		return math;
	}

	var number = {};

	var hasRequiredNumber;

	function requireNumber () {
		if (hasRequiredNumber) return number;
		hasRequiredNumber = 1;
		Object.defineProperty(number, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var math_helper_js_1 = tslib_1.__importDefault(requireMathHelper());
		var minMax = function (isMin, args) {
		    args = Array.prototype.slice.call(args);
		    switch (args.length) {
		        case 0: throw { type: 'Argument', message: 'one or more arguments required' };
		    }
		    var i; // key is the unit.toString() for unified Dimension values,
		    var j;
		    var current;
		    var currentUnified;
		    var referenceUnified;
		    var unit;
		    var unitStatic;
		    var unitClone;
		    var // elems only contains original argument values.
		    order = [];
		    var values = {};
		    // value is the index into the order array.
		    for (i = 0; i < args.length; i++) {
		        current = args[i];
		        if (!(current instanceof dimension_1.default)) {
		            if (Array.isArray(args[i].value)) {
		                Array.prototype.push.apply(args, Array.prototype.slice.call(args[i].value));
		            }
		            continue;
		        }
		        currentUnified = current.unit.toString() === '' && unitClone !== undefined ? new dimension_1.default(current.value, unitClone).unify() : current.unify();
		        unit = currentUnified.unit.toString() === '' && unitStatic !== undefined ? unitStatic : currentUnified.unit.toString();
		        unitStatic = unit !== '' && unitStatic === undefined || unit !== '' && order[0].unify().unit.toString() === '' ? unit : unitStatic;
		        unitClone = unit !== '' && unitClone === undefined ? current.unit.toString() : unitClone;
		        j = values[''] !== undefined && unit !== '' && unit === unitStatic ? values[''] : values[unit];
		        if (j === undefined) {
		            if (unitStatic !== undefined && unit !== unitStatic) {
		                throw { type: 'Argument', message: 'incompatible types' };
		            }
		            values[unit] = order.length;
		            order.push(current);
		            continue;
		        }
		        referenceUnified = order[j].unit.toString() === '' && unitClone !== undefined ? new dimension_1.default(order[j].value, unitClone).unify() : order[j].unify();
		        if (isMin && currentUnified.value < referenceUnified.value ||
		            !isMin && currentUnified.value > referenceUnified.value) {
		            order[j] = current;
		        }
		    }
		    if (order.length == 1) {
		        return order[0];
		    }
		    args = order.map(function (a) { return a.toCSS(this.context); }).join(this.context.compress ? ',' : ', ');
		    return new anonymous_1.default((isMin ? 'min' : 'max') + "(" + args + ")");
		};
		number.default = {
		    min: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        try {
		            return minMax(true, args);
		        }
		        catch (e) { }
		    },
		    max: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        try {
		            return minMax(false, args);
		        }
		        catch (e) { }
		    },
		    convert: function (val, unit) {
		        return val.convertTo(unit.value);
		    },
		    pi: function () {
		        return new dimension_1.default(Math.PI);
		    },
		    mod: function (a, b) {
		        return new dimension_1.default(a.value % b.value, a.unit);
		    },
		    pow: function (x, y) {
		        if (typeof x === 'number' && typeof y === 'number') {
		            x = new dimension_1.default(x);
		            y = new dimension_1.default(y);
		        }
		        else if (!(x instanceof dimension_1.default) || !(y instanceof dimension_1.default)) {
		            throw { type: 'Argument', message: 'arguments must be numbers' };
		        }
		        return new dimension_1.default(Math.pow(x.value, y.value), x.unit);
		    },
		    percentage: function (n) {
		        var result = math_helper_js_1.default(function (num) { return num * 100; }, '%', n);
		        return result;
		    }
		};
		
		return number;
	}

	var string = {};

	var hasRequiredString;

	function requireString () {
		if (hasRequiredString) return string;
		hasRequiredString = 1;
		Object.defineProperty(string, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var quoted_1 = tslib_1.__importDefault(requireQuoted());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var javascript_1 = tslib_1.__importDefault(requireJavascript());
		string.default = {
		    e: function (str) {
		        return new quoted_1.default('"', str instanceof javascript_1.default ? str.evaluated : str.value, true);
		    },
		    escape: function (str) {
		        return new anonymous_1.default(encodeURI(str.value).replace(/=/g, '%3D').replace(/:/g, '%3A').replace(/#/g, '%23').replace(/;/g, '%3B')
		            .replace(/\(/g, '%28').replace(/\)/g, '%29'));
		    },
		    replace: function (string, pattern, replacement, flags) {
		        var result = string.value;
		        replacement = (replacement.type === 'Quoted') ?
		            replacement.value : replacement.toCSS();
		        result = result.replace(new RegExp(pattern.value, flags ? flags.value : ''), replacement);
		        return new quoted_1.default(string.quote || '', result, string.escaped);
		    },
		    '%': function (string /* arg, arg, ... */) {
		        var args = Array.prototype.slice.call(arguments, 1);
		        var result = string.value;
		        var _loop_1 = function (i) {
		            /* jshint loopfunc:true */
		            result = result.replace(/%[sda]/i, function (token) {
		                var value = ((args[i].type === 'Quoted') &&
		                    token.match(/s/i)) ? args[i].value : args[i].toCSS();
		                return token.match(/[A-Z]$/) ? encodeURIComponent(value) : value;
		            });
		        };
		        for (var i = 0; i < args.length; i++) {
		            _loop_1(i);
		        }
		        result = result.replace(/%%/g, '%');
		        return new quoted_1.default(string.quote || '', result, string.escaped);
		    }
		};
		
		return string;
	}

	var svg = {};

	var hasRequiredSvg;

	function requireSvg () {
		if (hasRequiredSvg) return svg;
		hasRequiredSvg = 1;
		Object.defineProperty(svg, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var color_1 = tslib_1.__importDefault(requireColor$1());
		var expression_1 = tslib_1.__importDefault(requireExpression());
		var quoted_1 = tslib_1.__importDefault(requireQuoted());
		var url_1 = tslib_1.__importDefault(requireUrl());
		svg.default = (function (environment) {
		    return { 'svg-gradient': function (direction) {
		            var stops;
		            var gradientDirectionSvg;
		            var gradientType = 'linear';
		            var rectangleDimension = 'x="0" y="0" width="1" height="1"';
		            var renderEnv = { compress: false };
		            var returner;
		            var directionValue = direction.toCSS(renderEnv);
		            var i;
		            var color;
		            var position;
		            var positionValue;
		            var alpha;
		            function throwArgumentDescriptor() {
		                throw { type: 'Argument',
		                    message: 'svg-gradient expects direction, start_color [start_position], [color position,]...,' +
		                        ' end_color [end_position] or direction, color list' };
		            }
		            if (arguments.length == 2) {
		                if (arguments[1].value.length < 2) {
		                    throwArgumentDescriptor();
		                }
		                stops = arguments[1].value;
		            }
		            else if (arguments.length < 3) {
		                throwArgumentDescriptor();
		            }
		            else {
		                stops = Array.prototype.slice.call(arguments, 1);
		            }
		            switch (directionValue) {
		                case 'to bottom':
		                    gradientDirectionSvg = 'x1="0%" y1="0%" x2="0%" y2="100%"';
		                    break;
		                case 'to right':
		                    gradientDirectionSvg = 'x1="0%" y1="0%" x2="100%" y2="0%"';
		                    break;
		                case 'to bottom right':
		                    gradientDirectionSvg = 'x1="0%" y1="0%" x2="100%" y2="100%"';
		                    break;
		                case 'to top right':
		                    gradientDirectionSvg = 'x1="0%" y1="100%" x2="100%" y2="0%"';
		                    break;
		                case 'ellipse':
		                case 'ellipse at center':
		                    gradientType = 'radial';
		                    gradientDirectionSvg = 'cx="50%" cy="50%" r="75%"';
		                    rectangleDimension = 'x="-50" y="-50" width="101" height="101"';
		                    break;
		                default:
		                    throw { type: 'Argument', message: 'svg-gradient direction must be \'to bottom\', \'to right\',' +
		                            ' \'to bottom right\', \'to top right\' or \'ellipse at center\'' };
		            }
		            returner = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><" + gradientType + "Gradient id=\"g\" " + gradientDirectionSvg + ">";
		            for (i = 0; i < stops.length; i += 1) {
		                if (stops[i] instanceof expression_1.default) {
		                    color = stops[i].value[0];
		                    position = stops[i].value[1];
		                }
		                else {
		                    color = stops[i];
		                    position = undefined;
		                }
		                if (!(color instanceof color_1.default) || (!((i === 0 || i + 1 === stops.length) && position === undefined) && !(position instanceof dimension_1.default))) {
		                    throwArgumentDescriptor();
		                }
		                positionValue = position ? position.toCSS(renderEnv) : i === 0 ? '0%' : '100%';
		                alpha = color.alpha;
		                returner += "<stop offset=\"" + positionValue + "\" stop-color=\"" + color.toRGB() + "\"" + (alpha < 1 ? " stop-opacity=\"" + alpha + "\"" : '') + "/>";
		            }
		            returner += "</" + gradientType + "Gradient><rect " + rectangleDimension + " fill=\"url(#g)\" /></svg>";
		            returner = encodeURIComponent(returner);
		            returner = "data:image/svg+xml," + returner;
		            return new url_1.default(new quoted_1.default("'" + returner + "'", returner, false, this.index, this.currentFileInfo), this.index, this.currentFileInfo);
		        } };
		});
		
		return svg;
	}

	var types = {};

	var hasRequiredTypes;

	function requireTypes () {
		if (hasRequiredTypes) return types;
		hasRequiredTypes = 1;
		Object.defineProperty(types, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var keyword_1 = tslib_1.__importDefault(requireKeyword());
		var detached_ruleset_1 = tslib_1.__importDefault(requireDetachedRuleset());
		var dimension_1 = tslib_1.__importDefault(requireDimension());
		var color_1 = tslib_1.__importDefault(requireColor$1());
		var quoted_1 = tslib_1.__importDefault(requireQuoted());
		var anonymous_1 = tslib_1.__importDefault(requireAnonymous());
		var url_1 = tslib_1.__importDefault(requireUrl());
		var operation_1 = tslib_1.__importDefault(requireOperation());
		var isa = function (n, Type) { return (n instanceof Type) ? keyword_1.default.True : keyword_1.default.False; };
		var isunit = function (n, unit) {
		    if (unit === undefined) {
		        throw { type: 'Argument', message: 'missing the required second argument to isunit.' };
		    }
		    unit = typeof unit.value === 'string' ? unit.value : unit;
		    if (typeof unit !== 'string') {
		        throw { type: 'Argument', message: 'Second argument to isunit should be a unit or a string.' };
		    }
		    return (n instanceof dimension_1.default) && n.unit.is(unit) ? keyword_1.default.True : keyword_1.default.False;
		};
		types.default = {
		    isruleset: function (n) {
		        return isa(n, detached_ruleset_1.default);
		    },
		    iscolor: function (n) {
		        return isa(n, color_1.default);
		    },
		    isnumber: function (n) {
		        return isa(n, dimension_1.default);
		    },
		    isstring: function (n) {
		        return isa(n, quoted_1.default);
		    },
		    iskeyword: function (n) {
		        return isa(n, keyword_1.default);
		    },
		    isurl: function (n) {
		        return isa(n, url_1.default);
		    },
		    ispixel: function (n) {
		        return isunit(n, 'px');
		    },
		    ispercentage: function (n) {
		        return isunit(n, '%');
		    },
		    isem: function (n) {
		        return isunit(n, 'em');
		    },
		    isunit: isunit,
		    unit: function (val, unit) {
		        if (!(val instanceof dimension_1.default)) {
		            throw { type: 'Argument',
		                message: "the first argument to unit must be a number" + (val instanceof operation_1.default ? '. Have you forgotten parenthesis?' : '') };
		        }
		        if (unit) {
		            if (unit instanceof keyword_1.default) {
		                unit = unit.value;
		            }
		            else {
		                unit = unit.toCSS();
		            }
		        }
		        else {
		            unit = '';
		        }
		        return new dimension_1.default(val.value, unit);
		    },
		    'get-unit': function (n) {
		        return new anonymous_1.default(n.unit);
		    }
		};
		
		return types;
	}

	var hasRequiredFunctions;

	function requireFunctions () {
		if (hasRequiredFunctions) return functions;
		hasRequiredFunctions = 1;
		Object.defineProperty(functions, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var function_registry_1 = tslib_1.__importDefault(requireFunctionRegistry());
		var function_caller_1 = tslib_1.__importDefault(requireFunctionCaller());
		var boolean_1 = tslib_1.__importDefault(requireBoolean());
		var default_1 = tslib_1.__importDefault(require_default());
		var color_1 = tslib_1.__importDefault(requireColor());
		var color_blending_1 = tslib_1.__importDefault(requireColorBlending());
		var data_uri_1 = tslib_1.__importDefault(requireDataUri());
		var list_1 = tslib_1.__importDefault(requireList());
		var math_1 = tslib_1.__importDefault(requireMath());
		var number_1 = tslib_1.__importDefault(requireNumber());
		var string_1 = tslib_1.__importDefault(requireString());
		var svg_1 = tslib_1.__importDefault(requireSvg());
		var types_1 = tslib_1.__importDefault(requireTypes());
		functions.default = (function (environment) {
		    var functions = { functionRegistry: function_registry_1.default, functionCaller: function_caller_1.default };
		    // register functions
		    function_registry_1.default.addMultiple(boolean_1.default);
		    function_registry_1.default.add('default', default_1.default.eval.bind(default_1.default));
		    function_registry_1.default.addMultiple(color_1.default);
		    function_registry_1.default.addMultiple(color_blending_1.default);
		    function_registry_1.default.addMultiple(data_uri_1.default(environment));
		    function_registry_1.default.addMultiple(list_1.default);
		    function_registry_1.default.addMultiple(math_1.default);
		    function_registry_1.default.addMultiple(number_1.default);
		    function_registry_1.default.addMultiple(string_1.default);
		    function_registry_1.default.addMultiple(svg_1.default(environment));
		    function_registry_1.default.addMultiple(types_1.default);
		    return functions;
		});
		
		return functions;
	}

	var transformTree = {};

	var hasRequiredTransformTree;

	function requireTransformTree () {
		if (hasRequiredTransformTree) return transformTree;
		hasRequiredTransformTree = 1;
		Object.defineProperty(transformTree, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var contexts_1 = tslib_1.__importDefault(requireContexts());
		var visitors_1 = tslib_1.__importDefault(requireVisitors());
		var tree_1 = tslib_1.__importDefault(requireTree());
		function default_1(root, options) {
		    options = options || {};
		    var evaldRoot;
		    var variables = options.variables;
		    var evalEnv = new contexts_1.default.Eval(options);
		    //
		    // Allows setting variables with a hash, so:
		    //
		    //   `{ color: new tree.Color('#f01') }` will become:
		    //
		    //   new tree.Declaration('@color',
		    //     new tree.Value([
		    //       new tree.Expression([
		    //         new tree.Color('#f01')
		    //       ])
		    //     ])
		    //   )
		    //
		    if (typeof variables === 'object' && !Array.isArray(variables)) {
		        variables = Object.keys(variables).map(function (k) {
		            var value = variables[k];
		            if (!(value instanceof tree_1.default.Value)) {
		                if (!(value instanceof tree_1.default.Expression)) {
		                    value = new tree_1.default.Expression([value]);
		                }
		                value = new tree_1.default.Value([value]);
		            }
		            return new tree_1.default.Declaration("@" + k, value, false, null, 0);
		        });
		        evalEnv.frames = [new tree_1.default.Ruleset(null, variables)];
		    }
		    var visitors = [
		        new visitors_1.default.JoinSelectorVisitor(),
		        new visitors_1.default.MarkVisibleSelectorsVisitor(true),
		        new visitors_1.default.ExtendVisitor(),
		        new visitors_1.default.ToCSSVisitor({ compress: Boolean(options.compress) })
		    ];
		    var preEvalVisitors = [];
		    var v;
		    var visitorIterator;
		    /**
		     * first() / get() allows visitors to be added while visiting
		     *
		     * @todo Add scoping for visitors just like functions for @plugin; right now they're global
		     */
		    if (options.pluginManager) {
		        visitorIterator = options.pluginManager.visitor();
		        for (var i = 0; i < 2; i++) {
		            visitorIterator.first();
		            while ((v = visitorIterator.get())) {
		                if (v.isPreEvalVisitor) {
		                    if (i === 0 || preEvalVisitors.indexOf(v) === -1) {
		                        preEvalVisitors.push(v);
		                        v.run(root);
		                    }
		                }
		                else {
		                    if (i === 0 || visitors.indexOf(v) === -1) {
		                        if (v.isPreVisitor) {
		                            visitors.unshift(v);
		                        }
		                        else {
		                            visitors.push(v);
		                        }
		                    }
		                }
		            }
		        }
		    }
		    evaldRoot = root.eval(evalEnv);
		    for (var i = 0; i < visitors.length; i++) {
		        visitors[i].run(evaldRoot);
		    }
		    // Run any remaining visitors added after eval pass
		    if (options.pluginManager) {
		        visitorIterator.first();
		        while ((v = visitorIterator.get())) {
		            if (visitors.indexOf(v) === -1 && preEvalVisitors.indexOf(v) === -1) {
		                v.run(evaldRoot);
		            }
		        }
		    }
		    return evaldRoot;
		}
		transformTree.default = default_1;
		
		return transformTree;
	}

	var pluginManager = {};

	var hasRequiredPluginManager;

	function requirePluginManager () {
		if (hasRequiredPluginManager) return pluginManager;
		hasRequiredPluginManager = 1;
		Object.defineProperty(pluginManager, "__esModule", { value: true });
		/**
		 * Plugin Manager
		 */
		var PluginManager = /** @class */ (function () {
		    function PluginManager(less) {
		        this.less = less;
		        this.visitors = [];
		        this.preProcessors = [];
		        this.postProcessors = [];
		        this.installedPlugins = [];
		        this.fileManagers = [];
		        this.iterator = -1;
		        this.pluginCache = {};
		        this.Loader = new less.PluginLoader(less);
		    }
		    /**
		     * Adds all the plugins in the array
		     * @param {Array} plugins
		     */
		    PluginManager.prototype.addPlugins = function (plugins) {
		        if (plugins) {
		            for (var i = 0; i < plugins.length; i++) {
		                this.addPlugin(plugins[i]);
		            }
		        }
		    };
		    /**
		     *
		     * @param plugin
		     * @param {String} filename
		     */
		    PluginManager.prototype.addPlugin = function (plugin, filename, functionRegistry) {
		        this.installedPlugins.push(plugin);
		        if (filename) {
		            this.pluginCache[filename] = plugin;
		        }
		        if (plugin.install) {
		            plugin.install(this.less, this, functionRegistry || this.less.functions.functionRegistry);
		        }
		    };
		    /**
		     *
		     * @param filename
		     */
		    PluginManager.prototype.get = function (filename) {
		        return this.pluginCache[filename];
		    };
		    /**
		     * Adds a visitor. The visitor object has options on itself to determine
		     * when it should run.
		     * @param visitor
		     */
		    PluginManager.prototype.addVisitor = function (visitor) {
		        this.visitors.push(visitor);
		    };
		    /**
		     * Adds a pre processor object
		     * @param {object} preProcessor
		     * @param {number} priority - guidelines 1 = before import, 1000 = import, 2000 = after import
		     */
		    PluginManager.prototype.addPreProcessor = function (preProcessor, priority) {
		        var indexToInsertAt;
		        for (indexToInsertAt = 0; indexToInsertAt < this.preProcessors.length; indexToInsertAt++) {
		            if (this.preProcessors[indexToInsertAt].priority >= priority) {
		                break;
		            }
		        }
		        this.preProcessors.splice(indexToInsertAt, 0, { preProcessor: preProcessor, priority: priority });
		    };
		    /**
		     * Adds a post processor object
		     * @param {object} postProcessor
		     * @param {number} priority - guidelines 1 = before compression, 1000 = compression, 2000 = after compression
		     */
		    PluginManager.prototype.addPostProcessor = function (postProcessor, priority) {
		        var indexToInsertAt;
		        for (indexToInsertAt = 0; indexToInsertAt < this.postProcessors.length; indexToInsertAt++) {
		            if (this.postProcessors[indexToInsertAt].priority >= priority) {
		                break;
		            }
		        }
		        this.postProcessors.splice(indexToInsertAt, 0, { postProcessor: postProcessor, priority: priority });
		    };
		    /**
		     *
		     * @param manager
		     */
		    PluginManager.prototype.addFileManager = function (manager) {
		        this.fileManagers.push(manager);
		    };
		    /**
		     *
		     * @returns {Array}
		     * @private
		     */
		    PluginManager.prototype.getPreProcessors = function () {
		        var preProcessors = [];
		        for (var i = 0; i < this.preProcessors.length; i++) {
		            preProcessors.push(this.preProcessors[i].preProcessor);
		        }
		        return preProcessors;
		    };
		    /**
		     *
		     * @returns {Array}
		     * @private
		     */
		    PluginManager.prototype.getPostProcessors = function () {
		        var postProcessors = [];
		        for (var i = 0; i < this.postProcessors.length; i++) {
		            postProcessors.push(this.postProcessors[i].postProcessor);
		        }
		        return postProcessors;
		    };
		    /**
		     *
		     * @returns {Array}
		     * @private
		     */
		    PluginManager.prototype.getVisitors = function () {
		        return this.visitors;
		    };
		    PluginManager.prototype.visitor = function () {
		        var self = this;
		        return {
		            first: function () {
		                self.iterator = -1;
		                return self.visitors[self.iterator];
		            },
		            get: function () {
		                self.iterator += 1;
		                return self.visitors[self.iterator];
		            }
		        };
		    };
		    /**
		     *
		     * @returns {Array}
		     * @private
		     */
		    PluginManager.prototype.getFileManagers = function () {
		        return this.fileManagers;
		    };
		    return PluginManager;
		}());
		var pm;
		var PluginManagerFactory = function (less, newFactory) {
		    if (newFactory || !pm) {
		        pm = new PluginManager(less);
		    }
		    return pm;
		};
		//
		pluginManager.default = PluginManagerFactory;
		
		return pluginManager;
	}

	var sourceMapOutput = {};

	var hasRequiredSourceMapOutput;

	function requireSourceMapOutput () {
		if (hasRequiredSourceMapOutput) return sourceMapOutput;
		hasRequiredSourceMapOutput = 1;
		Object.defineProperty(sourceMapOutput, "__esModule", { value: true });
		function default_1(environment) {
		    var SourceMapOutput = /** @class */ (function () {
		        function SourceMapOutput(options) {
		            this._css = [];
		            this._rootNode = options.rootNode;
		            this._contentsMap = options.contentsMap;
		            this._contentsIgnoredCharsMap = options.contentsIgnoredCharsMap;
		            if (options.sourceMapFilename) {
		                this._sourceMapFilename = options.sourceMapFilename.replace(/\\/g, '/');
		            }
		            this._outputFilename = options.outputFilename;
		            this.sourceMapURL = options.sourceMapURL;
		            if (options.sourceMapBasepath) {
		                this._sourceMapBasepath = options.sourceMapBasepath.replace(/\\/g, '/');
		            }
		            if (options.sourceMapRootpath) {
		                this._sourceMapRootpath = options.sourceMapRootpath.replace(/\\/g, '/');
		                if (this._sourceMapRootpath.charAt(this._sourceMapRootpath.length - 1) !== '/') {
		                    this._sourceMapRootpath += '/';
		                }
		            }
		            else {
		                this._sourceMapRootpath = '';
		            }
		            this._outputSourceFiles = options.outputSourceFiles;
		            this._sourceMapGeneratorConstructor = environment.getSourceMapGenerator();
		            this._lineNumber = 0;
		            this._column = 0;
		        }
		        SourceMapOutput.prototype.removeBasepath = function (path) {
		            if (this._sourceMapBasepath && path.indexOf(this._sourceMapBasepath) === 0) {
		                path = path.substring(this._sourceMapBasepath.length);
		                if (path.charAt(0) === '\\' || path.charAt(0) === '/') {
		                    path = path.substring(1);
		                }
		            }
		            return path;
		        };
		        SourceMapOutput.prototype.normalizeFilename = function (filename) {
		            filename = filename.replace(/\\/g, '/');
		            filename = this.removeBasepath(filename);
		            return (this._sourceMapRootpath || '') + filename;
		        };
		        SourceMapOutput.prototype.add = function (chunk, fileInfo, index, mapLines) {
		            // ignore adding empty strings
		            if (!chunk) {
		                return;
		            }
		            var lines, sourceLines, columns, sourceColumns, i;
		            if (fileInfo && fileInfo.filename) {
		                var inputSource = this._contentsMap[fileInfo.filename];
		                // remove vars/banner added to the top of the file
		                if (this._contentsIgnoredCharsMap[fileInfo.filename]) {
		                    // adjust the index
		                    index -= this._contentsIgnoredCharsMap[fileInfo.filename];
		                    if (index < 0) {
		                        index = 0;
		                    }
		                    // adjust the source
		                    inputSource = inputSource.slice(this._contentsIgnoredCharsMap[fileInfo.filename]);
		                }
		                /**
		                 * ignore empty content, or failsafe
		                 * if contents map is incorrect
		                 */
		                if (inputSource === undefined) {
		                    this._css.push(chunk);
		                    return;
		                }
		                inputSource = inputSource.substring(0, index);
		                sourceLines = inputSource.split('\n');
		                sourceColumns = sourceLines[sourceLines.length - 1];
		            }
		            lines = chunk.split('\n');
		            columns = lines[lines.length - 1];
		            if (fileInfo && fileInfo.filename) {
		                if (!mapLines) {
		                    this._sourceMapGenerator.addMapping({ generated: { line: this._lineNumber + 1, column: this._column },
		                        original: { line: sourceLines.length, column: sourceColumns.length },
		                        source: this.normalizeFilename(fileInfo.filename) });
		                }
		                else {
		                    for (i = 0; i < lines.length; i++) {
		                        this._sourceMapGenerator.addMapping({ generated: { line: this._lineNumber + i + 1, column: i === 0 ? this._column : 0 },
		                            original: { line: sourceLines.length + i, column: i === 0 ? sourceColumns.length : 0 },
		                            source: this.normalizeFilename(fileInfo.filename) });
		                    }
		                }
		            }
		            if (lines.length === 1) {
		                this._column += columns.length;
		            }
		            else {
		                this._lineNumber += lines.length - 1;
		                this._column = columns.length;
		            }
		            this._css.push(chunk);
		        };
		        SourceMapOutput.prototype.isEmpty = function () {
		            return this._css.length === 0;
		        };
		        SourceMapOutput.prototype.toCSS = function (context) {
		            this._sourceMapGenerator = new this._sourceMapGeneratorConstructor({ file: this._outputFilename, sourceRoot: null });
		            if (this._outputSourceFiles) {
		                for (var filename in this._contentsMap) {
		                    if (this._contentsMap.hasOwnProperty(filename)) {
		                        var source = this._contentsMap[filename];
		                        if (this._contentsIgnoredCharsMap[filename]) {
		                            source = source.slice(this._contentsIgnoredCharsMap[filename]);
		                        }
		                        this._sourceMapGenerator.setSourceContent(this.normalizeFilename(filename), source);
		                    }
		                }
		            }
		            this._rootNode.genCSS(context, this);
		            if (this._css.length > 0) {
		                var sourceMapURL = void 0;
		                var sourceMapContent = JSON.stringify(this._sourceMapGenerator.toJSON());
		                if (this.sourceMapURL) {
		                    sourceMapURL = this.sourceMapURL;
		                }
		                else if (this._sourceMapFilename) {
		                    sourceMapURL = this._sourceMapFilename;
		                }
		                this.sourceMapURL = sourceMapURL;
		                this.sourceMap = sourceMapContent;
		            }
		            return this._css.join('');
		        };
		        return SourceMapOutput;
		    }());
		    return SourceMapOutput;
		}
		sourceMapOutput.default = default_1;
		
		return sourceMapOutput;
	}

	var sourceMapBuilder = {};

	var hasRequiredSourceMapBuilder;

	function requireSourceMapBuilder () {
		if (hasRequiredSourceMapBuilder) return sourceMapBuilder;
		hasRequiredSourceMapBuilder = 1;
		Object.defineProperty(sourceMapBuilder, "__esModule", { value: true });
		function default_1(SourceMapOutput, environment) {
		    var SourceMapBuilder = /** @class */ (function () {
		        function SourceMapBuilder(options) {
		            this.options = options;
		        }
		        SourceMapBuilder.prototype.toCSS = function (rootNode, options, imports) {
		            var sourceMapOutput = new SourceMapOutput({
		                contentsIgnoredCharsMap: imports.contentsIgnoredChars,
		                rootNode: rootNode,
		                contentsMap: imports.contents,
		                sourceMapFilename: this.options.sourceMapFilename,
		                sourceMapURL: this.options.sourceMapURL,
		                outputFilename: this.options.sourceMapOutputFilename,
		                sourceMapBasepath: this.options.sourceMapBasepath,
		                sourceMapRootpath: this.options.sourceMapRootpath,
		                outputSourceFiles: this.options.outputSourceFiles,
		                sourceMapGenerator: this.options.sourceMapGenerator,
		                sourceMapFileInline: this.options.sourceMapFileInline,
		                disableSourcemapAnnotation: this.options.disableSourcemapAnnotation
		            });
		            var css = sourceMapOutput.toCSS(options);
		            this.sourceMap = sourceMapOutput.sourceMap;
		            this.sourceMapURL = sourceMapOutput.sourceMapURL;
		            if (this.options.sourceMapInputFilename) {
		                this.sourceMapInputFilename = sourceMapOutput.normalizeFilename(this.options.sourceMapInputFilename);
		            }
		            if (this.options.sourceMapBasepath !== undefined && this.sourceMapURL !== undefined) {
		                this.sourceMapURL = sourceMapOutput.removeBasepath(this.sourceMapURL);
		            }
		            return css + this.getCSSAppendage();
		        };
		        SourceMapBuilder.prototype.getCSSAppendage = function () {
		            var sourceMapURL = this.sourceMapURL;
		            if (this.options.sourceMapFileInline) {
		                if (this.sourceMap === undefined) {
		                    return '';
		                }
		                sourceMapURL = "data:application/json;base64," + environment.encodeBase64(this.sourceMap);
		            }
		            if (this.options.disableSourcemapAnnotation) {
		                return '';
		            }
		            if (sourceMapURL) {
		                return "/*# sourceMappingURL=" + sourceMapURL + " */";
		            }
		            return '';
		        };
		        SourceMapBuilder.prototype.getExternalSourceMap = function () {
		            return this.sourceMap;
		        };
		        SourceMapBuilder.prototype.setExternalSourceMap = function (sourceMap) {
		            this.sourceMap = sourceMap;
		        };
		        SourceMapBuilder.prototype.isInline = function () {
		            return this.options.sourceMapFileInline;
		        };
		        SourceMapBuilder.prototype.getSourceMapURL = function () {
		            return this.sourceMapURL;
		        };
		        SourceMapBuilder.prototype.getOutputFilename = function () {
		            return this.options.sourceMapOutputFilename;
		        };
		        SourceMapBuilder.prototype.getInputFilename = function () {
		            return this.sourceMapInputFilename;
		        };
		        return SourceMapBuilder;
		    }());
		    return SourceMapBuilder;
		}
		sourceMapBuilder.default = default_1;
		
		return sourceMapBuilder;
	}

	var parseTree = {};

	var hasRequiredParseTree;

	function requireParseTree () {
		if (hasRequiredParseTree) return parseTree;
		hasRequiredParseTree = 1;
		Object.defineProperty(parseTree, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var less_error_1 = tslib_1.__importDefault(requireLessError());
		var transform_tree_1 = tslib_1.__importDefault(requireTransformTree());
		var logger_1 = tslib_1.__importDefault(requireLogger());
		function default_1(SourceMapBuilder) {
		    var ParseTree = /** @class */ (function () {
		        function ParseTree(root, imports) {
		            this.root = root;
		            this.imports = imports;
		        }
		        ParseTree.prototype.toCSS = function (options) {
		            var evaldRoot;
		            var result = {};
		            var sourceMapBuilder;
		            try {
		                evaldRoot = transform_tree_1.default(this.root, options);
		            }
		            catch (e) {
		                throw new less_error_1.default(e, this.imports);
		            }
		            try {
		                var compress = Boolean(options.compress);
		                if (compress) {
		                    logger_1.default.warn('The compress option has been deprecated. ' +
		                        'We recommend you use a dedicated css minifier, for instance see less-plugin-clean-css.');
		                }
		                var toCSSOptions = {
		                    compress: compress,
		                    dumpLineNumbers: options.dumpLineNumbers,
		                    strictUnits: Boolean(options.strictUnits),
		                    numPrecision: 8
		                };
		                if (options.sourceMap) {
		                    sourceMapBuilder = new SourceMapBuilder(options.sourceMap);
		                    result.css = sourceMapBuilder.toCSS(evaldRoot, toCSSOptions, this.imports);
		                }
		                else {
		                    result.css = evaldRoot.toCSS(toCSSOptions);
		                }
		            }
		            catch (e) {
		                throw new less_error_1.default(e, this.imports);
		            }
		            if (options.pluginManager) {
		                var postProcessors = options.pluginManager.getPostProcessors();
		                for (var i = 0; i < postProcessors.length; i++) {
		                    result.css = postProcessors[i].process(result.css, { sourceMap: sourceMapBuilder, options: options, imports: this.imports });
		                }
		            }
		            if (options.sourceMap) {
		                result.map = sourceMapBuilder.getExternalSourceMap();
		            }
		            result.imports = [];
		            for (var file in this.imports.files) {
		                if (this.imports.files.hasOwnProperty(file) && file !== this.imports.rootFilename) {
		                    result.imports.push(file);
		                }
		            }
		            return result;
		        };
		        return ParseTree;
		    }());
		    return ParseTree;
		}
		parseTree.default = default_1;
		
		return parseTree;
	}

	var importManager = {};

	var hasRequiredImportManager;

	function requireImportManager () {
		if (hasRequiredImportManager) return importManager;
		hasRequiredImportManager = 1;
		Object.defineProperty(importManager, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var contexts_1 = tslib_1.__importDefault(requireContexts());
		var parser_1 = tslib_1.__importDefault(requireParser());
		var less_error_1 = tslib_1.__importDefault(requireLessError());
		var utils = tslib_1.__importStar(requireUtils());
		var logger_1 = tslib_1.__importDefault(requireLogger());
		function default_1(environment) {
		    // FileInfo = {
		    //  'rewriteUrls' - option - whether to adjust URL's to be relative
		    //  'filename' - full resolved filename of current file
		    //  'rootpath' - path to append to normal URLs for this node
		    //  'currentDirectory' - path to the current file, absolute
		    //  'rootFilename' - filename of the base file
		    //  'entryPath' - absolute path to the entry file
		    //  'reference' - whether the file should not be output and only output parts that are referenced
		    var ImportManager = /** @class */ (function () {
		        function ImportManager(less, context, rootFileInfo) {
		            this.less = less;
		            this.rootFilename = rootFileInfo.filename;
		            this.paths = context.paths || []; // Search paths, when importing
		            this.contents = {}; // map - filename to contents of all the files
		            this.contentsIgnoredChars = {}; // map - filename to lines at the beginning of each file to ignore
		            this.mime = context.mime;
		            this.error = null;
		            this.context = context;
		            // Deprecated? Unused outside of here, could be useful.
		            this.queue = []; // Files which haven't been imported yet
		            this.files = {}; // Holds the imported parse trees.
		        }
		        /**
		         * Add an import to be imported
		         * @param path - the raw path
		         * @param tryAppendExtension - whether to try appending a file extension (.less or .js if the path has no extension)
		         * @param currentFileInfo - the current file info (used for instance to work out relative paths)
		         * @param importOptions - import options
		         * @param callback - callback for when it is imported
		         */
		        ImportManager.prototype.push = function (path, tryAppendExtension, currentFileInfo, importOptions, callback) {
		            var importManager = this, pluginLoader = this.context.pluginManager.Loader;
		            this.queue.push(path);
		            var fileParsedFunc = function (e, root, fullPath) {
		                importManager.queue.splice(importManager.queue.indexOf(path), 1); // Remove the path from the queue
		                var importedEqualsRoot = fullPath === importManager.rootFilename;
		                if (importOptions.optional && e) {
		                    callback(null, { rules: [] }, false, null);
		                    logger_1.default.info("The file " + fullPath + " was skipped because it was not found and the import was marked optional.");
		                }
		                else {
		                    // Inline imports aren't cached here.
		                    // If we start to cache them, please make sure they won't conflict with non-inline imports of the
		                    // same name as they used to do before this comment and the condition below have been added.
		                    if (!importManager.files[fullPath] && !importOptions.inline) {
		                        importManager.files[fullPath] = { root: root, options: importOptions };
		                    }
		                    if (e && !importManager.error) {
		                        importManager.error = e;
		                    }
		                    callback(e, root, importedEqualsRoot, fullPath);
		                }
		            };
		            var newFileInfo = {
		                rewriteUrls: this.context.rewriteUrls,
		                entryPath: currentFileInfo.entryPath,
		                rootpath: currentFileInfo.rootpath,
		                rootFilename: currentFileInfo.rootFilename
		            };
		            var fileManager = environment.getFileManager(path, currentFileInfo.currentDirectory, this.context, environment);
		            if (!fileManager) {
		                fileParsedFunc({ message: "Could not find a file-manager for " + path });
		                return;
		            }
		            var loadFileCallback = function (loadedFile) {
		                var plugin;
		                var resolvedFilename = loadedFile.filename;
		                var contents = loadedFile.contents.replace(/^\uFEFF/, '');
		                // Pass on an updated rootpath if path of imported file is relative and file
		                // is in a (sub|sup) directory
		                //
		                // Examples:
		                // - If path of imported file is 'module/nav/nav.less' and rootpath is 'less/',
		                //   then rootpath should become 'less/module/nav/'
		                // - If path of imported file is '../mixins.less' and rootpath is 'less/',
		                //   then rootpath should become 'less/../'
		                newFileInfo.currentDirectory = fileManager.getPath(resolvedFilename);
		                if (newFileInfo.rewriteUrls) {
		                    newFileInfo.rootpath = fileManager.join((importManager.context.rootpath || ''), fileManager.pathDiff(newFileInfo.currentDirectory, newFileInfo.entryPath));
		                    if (!fileManager.isPathAbsolute(newFileInfo.rootpath) && fileManager.alwaysMakePathsAbsolute()) {
		                        newFileInfo.rootpath = fileManager.join(newFileInfo.entryPath, newFileInfo.rootpath);
		                    }
		                }
		                newFileInfo.filename = resolvedFilename;
		                var newEnv = new contexts_1.default.Parse(importManager.context);
		                newEnv.processImports = false;
		                importManager.contents[resolvedFilename] = contents;
		                if (currentFileInfo.reference || importOptions.reference) {
		                    newFileInfo.reference = true;
		                }
		                if (importOptions.isPlugin) {
		                    plugin = pluginLoader.evalPlugin(contents, newEnv, importManager, importOptions.pluginArgs, newFileInfo);
		                    if (plugin instanceof less_error_1.default) {
		                        fileParsedFunc(plugin, null, resolvedFilename);
		                    }
		                    else {
		                        fileParsedFunc(null, plugin, resolvedFilename);
		                    }
		                }
		                else if (importOptions.inline) {
		                    fileParsedFunc(null, contents, resolvedFilename);
		                }
		                else {
		                    // import (multiple) parse trees apparently get altered and can't be cached.
		                    // TODO: investigate why this is
		                    if (importManager.files[resolvedFilename]
		                        && !importManager.files[resolvedFilename].options.multiple
		                        && !importOptions.multiple) {
		                        fileParsedFunc(null, importManager.files[resolvedFilename].root, resolvedFilename);
		                    }
		                    else {
		                        new parser_1.default(newEnv, importManager, newFileInfo).parse(contents, function (e, root) {
		                            fileParsedFunc(e, root, resolvedFilename);
		                        });
		                    }
		                }
		            };
		            var loadedFile;
		            var promise;
		            var context = utils.clone(this.context);
		            if (tryAppendExtension) {
		                context.ext = importOptions.isPlugin ? '.js' : '.less';
		            }
		            if (importOptions.isPlugin) {
		                context.mime = 'application/javascript';
		                if (context.syncImport) {
		                    loadedFile = pluginLoader.loadPluginSync(path, currentFileInfo.currentDirectory, context, environment, fileManager);
		                }
		                else {
		                    promise = pluginLoader.loadPlugin(path, currentFileInfo.currentDirectory, context, environment, fileManager);
		                }
		            }
		            else {
		                if (context.syncImport) {
		                    loadedFile = fileManager.loadFileSync(path, currentFileInfo.currentDirectory, context, environment);
		                }
		                else {
		                    promise = fileManager.loadFile(path, currentFileInfo.currentDirectory, context, environment, function (err, loadedFile) {
		                        if (err) {
		                            fileParsedFunc(err);
		                        }
		                        else {
		                            loadFileCallback(loadedFile);
		                        }
		                    });
		                }
		            }
		            if (loadedFile) {
		                if (!loadedFile.filename) {
		                    fileParsedFunc(loadedFile);
		                }
		                else {
		                    loadFileCallback(loadedFile);
		                }
		            }
		            else if (promise) {
		                promise.then(loadFileCallback, fileParsedFunc);
		            }
		        };
		        return ImportManager;
		    }());
		    return ImportManager;
		}
		importManager.default = default_1;
		
		return importManager;
	}

	var parse = {};

	var hasRequiredParse;

	function requireParse () {
		if (hasRequiredParse) return parse;
		hasRequiredParse = 1;
		Object.defineProperty(parse, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var contexts_1 = tslib_1.__importDefault(requireContexts());
		var parser_1 = tslib_1.__importDefault(requireParser());
		var plugin_manager_1 = tslib_1.__importDefault(requirePluginManager());
		var less_error_1 = tslib_1.__importDefault(requireLessError());
		var utils = tslib_1.__importStar(requireUtils());
		function default_1(environment, ParseTree, ImportManager) {
		    var parse = function (input, options, callback) {
		        if (typeof options === 'function') {
		            callback = options;
		            options = utils.copyOptions(this.options, {});
		        }
		        else {
		            options = utils.copyOptions(this.options, options || {});
		        }
		        if (!callback) {
		            var self_1 = this;
		            return new Promise(function (resolve, reject) {
		                parse.call(self_1, input, options, function (err, output) {
		                    if (err) {
		                        reject(err);
		                    }
		                    else {
		                        resolve(output);
		                    }
		                });
		            });
		        }
		        else {
		            var context_1;
		            var rootFileInfo = void 0;
		            var pluginManager_1 = new plugin_manager_1.default(this, !options.reUsePluginManager);
		            options.pluginManager = pluginManager_1;
		            context_1 = new contexts_1.default.Parse(options);
		            if (options.rootFileInfo) {
		                rootFileInfo = options.rootFileInfo;
		            }
		            else {
		                var filename = options.filename || 'input';
		                var entryPath = filename.replace(/[^\/\\]*$/, '');
		                rootFileInfo = {
		                    filename: filename,
		                    rewriteUrls: context_1.rewriteUrls,
		                    rootpath: context_1.rootpath || '',
		                    currentDirectory: entryPath,
		                    entryPath: entryPath,
		                    rootFilename: filename
		                };
		                // add in a missing trailing slash
		                if (rootFileInfo.rootpath && rootFileInfo.rootpath.slice(-1) !== '/') {
		                    rootFileInfo.rootpath += '/';
		                }
		            }
		            var imports_1 = new ImportManager(this, context_1, rootFileInfo);
		            this.importManager = imports_1;
		            // TODO: allow the plugins to be just a list of paths or names
		            // Do an async plugin queue like lessc
		            if (options.plugins) {
		                options.plugins.forEach(function (plugin) {
		                    var evalResult, contents;
		                    if (plugin.fileContent) {
		                        contents = plugin.fileContent.replace(/^\uFEFF/, '');
		                        evalResult = pluginManager_1.Loader.evalPlugin(contents, context_1, imports_1, plugin.options, plugin.filename);
		                        if (evalResult instanceof less_error_1.default) {
		                            return callback(evalResult);
		                        }
		                    }
		                    else {
		                        pluginManager_1.addPlugin(plugin);
		                    }
		                });
		            }
		            new parser_1.default(context_1, imports_1, rootFileInfo)
		                .parse(input, function (e, root) {
		                if (e) {
		                    return callback(e);
		                }
		                callback(null, root, imports_1, options);
		            }, options);
		        }
		    };
		    return parse;
		}
		parse.default = default_1;
		
		return parse;
	}

	var render = {};

	var hasRequiredRender;

	function requireRender () {
		if (hasRequiredRender) return render;
		hasRequiredRender = 1;
		Object.defineProperty(render, "__esModule", { value: true });
		var tslib_1 = require$$0$1;
		var utils = tslib_1.__importStar(requireUtils());
		function default_1(environment, ParseTree, ImportManager) {
		    var render = function (input, options, callback) {
		        if (typeof options === 'function') {
		            callback = options;
		            options = utils.copyOptions(this.options, {});
		        }
		        else {
		            options = utils.copyOptions(this.options, options || {});
		        }
		        if (!callback) {
		            var self_1 = this;
		            return new Promise(function (resolve, reject) {
		                render.call(self_1, input, options, function (err, output) {
		                    if (err) {
		                        reject(err);
		                    }
		                    else {
		                        resolve(output);
		                    }
		                });
		            });
		        }
		        else {
		            this.parse(input, options, function (err, root, imports, options) {
		                if (err) {
		                    return callback(err);
		                }
		                var result;
		                try {
		                    var parseTree = new ParseTree(root, imports);
		                    result = parseTree.toCSS(options);
		                }
		                catch (err) {
		                    return callback(err);
		                }
		                callback(null, result);
		            });
		        }
		    };
		    return render;
		}
		render.default = default_1;
		
		return render;
	}

	var name = "less";
	var version = "4.1.3";
	var description = "Leaner CSS";
	var homepage = "http://lesscss.org";
	var author = {
		name: "Alexis Sellier",
		email: "self@cloudhead.net"
	};
	var contributors = [
		"The Core Less Team"
	];
	var bugs = {
		url: "https://github.com/less/less.js/issues"
	};
	var repository = {
		type: "git",
		url: "https://github.com/less/less.js.git"
	};
	var master = {
		url: "https://github.com/less/less.js/blob/master/",
		raw: "https://raw.githubusercontent.com/less/less.js/master/"
	};
	var license = "Apache-2.0";
	var bin = {
		lessc: "./bin/lessc"
	};
	var main = "index";
	var module = "./lib/less-node/index";
	var directories = {
		test: "./test"
	};
	var browser = "./dist/less.js";
	var engines = {
		node: ">=6"
	};
	var scripts = {
		test: "grunt test",
		grunt: "grunt",
		build: "npm-run-all clean compile",
		clean: "shx rm -rf ./lib tsconfig.tsbuildinfo",
		compile: "tsc -p tsconfig.json",
		"copy:root": "shx cp -rf ./dist ../../",
		dev: "tsc -p tsconfig.json -w",
		prepublishOnly: "grunt dist"
	};
	var optionalDependencies = {
		errno: "^0.1.1",
		"graceful-fs": "^4.1.2",
		"image-size": "~0.5.0",
		"make-dir": "^2.1.0",
		mime: "^1.4.1",
		needle: "^3.1.0",
		"source-map": "~0.6.0"
	};
	var devDependencies = {
		"@less/test-data": "^4.1.0",
		"@less/test-import-module": "^4.0.0",
		"@rollup/plugin-commonjs": "^17.0.0",
		"@rollup/plugin-json": "^4.1.0",
		"@rollup/plugin-node-resolve": "^11.0.0",
		"@typescript-eslint/eslint-plugin": "^4.28.0",
		"@typescript-eslint/parser": "^4.28.0",
		benny: "^3.6.12",
		"bootstrap-less-port": "0.3.0",
		chai: "^4.2.0",
		"cross-env": "^7.0.3",
		diff: "^3.2.0",
		eslint: "^7.29.0",
		"fs-extra": "^8.1.0",
		"git-rev": "^0.2.1",
		globby: "^10.0.1",
		grunt: "^1.0.4",
		"grunt-cli": "^1.3.2",
		"grunt-contrib-clean": "^1.0.0",
		"grunt-contrib-connect": "^1.0.2",
		"grunt-eslint": "^23.0.0",
		"grunt-saucelabs": "^9.0.1",
		"grunt-shell": "^1.3.0",
		"html-template-tag": "^3.2.0",
		"jit-grunt": "^0.10.0",
		"less-plugin-autoprefix": "^1.5.1",
		"less-plugin-clean-css": "^1.5.1",
		minimist: "^1.2.0",
		mocha: "^6.2.1",
		"mocha-headless-chrome": "^2.0.3",
		"mocha-teamcity-reporter": "^3.0.0",
		nock: "^11.8.2",
		"npm-run-all": "^4.1.5",
		"performance-now": "^0.2.0",
		phin: "^2.2.3",
		promise: "^7.1.1",
		"read-glob": "^3.0.0",
		resolve: "^1.17.0",
		rollup: "^2.52.2",
		"rollup-plugin-terser": "^5.1.1",
		"rollup-plugin-typescript2": "^0.29.0",
		semver: "^6.3.0",
		shx: "^0.3.2",
		"time-grunt": "^1.3.0",
		"ts-node": "^9.1.1",
		typescript: "^4.3.4",
		uikit: "2.27.4"
	};
	var keywords = [
		"compile less",
		"css nesting",
		"css variable",
		"css",
		"gradients css",
		"gradients css3",
		"less compiler",
		"less css",
		"less mixins",
		"less",
		"less.js",
		"lesscss",
		"mixins",
		"nested css",
		"parser",
		"preprocessor",
		"bootstrap css",
		"bootstrap less",
		"style",
		"styles",
		"stylesheet",
		"variables in css",
		"css less"
	];
	var rawcurrent = "https://raw.github.com/less/less.js/v";
	var sourcearchive = "https://github.com/less/less.js/archive/v";
	var dependencies = {
		"copy-anything": "^2.0.1",
		"parse-node-version": "^1.0.1",
		tslib: "^2.3.0"
	};
	var require$$21 = {
		name: name,
		version: version,
		description: description,
		homepage: homepage,
		author: author,
		contributors: contributors,
		bugs: bugs,
		repository: repository,
		master: master,
		license: license,
		bin: bin,
		main: main,
		module: module,
		directories: directories,
		browser: browser,
		engines: engines,
		scripts: scripts,
		optionalDependencies: optionalDependencies,
		devDependencies: devDependencies,
		keywords: keywords,
		rawcurrent: rawcurrent,
		sourcearchive: sourcearchive,
		dependencies: dependencies
	};

	var parseNodeVersion_1;
	var hasRequiredParseNodeVersion;

	function requireParseNodeVersion () {
		if (hasRequiredParseNodeVersion) return parseNodeVersion_1;
		hasRequiredParseNodeVersion = 1;

		function parseNodeVersion(version) {
		  var match = version.match(/^v(\d{1,2})\.(\d{1,2})\.(\d{1,2})(?:-([0-9A-Za-z-.]+))?(?:\+([0-9A-Za-z-.]+))?$/); // eslint-disable-line max-len
		  if (!match) {
		    throw new Error('Unable to parse: ' + version);
		  }

		  var res = {
		    major: parseInt(match[1], 10),
		    minor: parseInt(match[2], 10),
		    patch: parseInt(match[3], 10),
		    pre: match[4] || '',
		    build: match[5] || '',
		  };

		  return res;
		}

		parseNodeVersion_1 = parseNodeVersion;
		return parseNodeVersion_1;
	}

	Object.defineProperty(less$1, "__esModule", { value: true });
	var tslib_1$4 = require$$0$1;
	var environment_1 = tslib_1$4.__importDefault(requireEnvironment());
	var data_1 = tslib_1$4.__importDefault(requireData());
	var tree_1 = tslib_1$4.__importDefault(requireTree());
	var abstract_file_manager_1 = tslib_1$4.__importDefault(requireAbstractFileManager());
	var abstract_plugin_loader_1 = tslib_1$4.__importDefault(requireAbstractPluginLoader());
	var visitors_1 = tslib_1$4.__importDefault(requireVisitors());
	var parser_1 = tslib_1$4.__importDefault(requireParser());
	var functions_1 = tslib_1$4.__importDefault(requireFunctions());
	var contexts_1 = tslib_1$4.__importDefault(requireContexts());
	var less_error_1 = tslib_1$4.__importDefault(requireLessError());
	var transform_tree_1 = tslib_1$4.__importDefault(requireTransformTree());
	var utils$1 = tslib_1$4.__importStar(requireUtils());
	var plugin_manager_1 = tslib_1$4.__importDefault(requirePluginManager());
	var logger_1 = tslib_1$4.__importDefault(requireLogger());
	var source_map_output_1 = tslib_1$4.__importDefault(requireSourceMapOutput());
	var source_map_builder_1 = tslib_1$4.__importDefault(requireSourceMapBuilder());
	var parse_tree_1 = tslib_1$4.__importDefault(requireParseTree());
	var import_manager_1 = tslib_1$4.__importDefault(requireImportManager());
	var parse_1 = tslib_1$4.__importDefault(requireParse());
	var render_1 = tslib_1$4.__importDefault(requireRender());
	var package_json_1 = require$$21;
	var parse_node_version_1 = tslib_1$4.__importDefault(requireParseNodeVersion());
	function default_1(environment, fileManagers) {
	    var sourceMapOutput, sourceMapBuilder, parseTree, importManager;
	    environment = new environment_1.default(environment, fileManagers);
	    sourceMapOutput = source_map_output_1.default(environment);
	    sourceMapBuilder = source_map_builder_1.default(sourceMapOutput, environment);
	    parseTree = parse_tree_1.default(sourceMapBuilder);
	    importManager = import_manager_1.default(environment);
	    var render = render_1.default(environment, parseTree, importManager);
	    var parse = parse_1.default(environment, parseTree, importManager);
	    var v = parse_node_version_1.default("v" + package_json_1.version);
	    var initial = {
	        version: [v.major, v.minor, v.patch],
	        data: data_1.default,
	        tree: tree_1.default,
	        Environment: environment_1.default,
	        AbstractFileManager: abstract_file_manager_1.default,
	        AbstractPluginLoader: abstract_plugin_loader_1.default,
	        environment: environment,
	        visitors: visitors_1.default,
	        Parser: parser_1.default,
	        functions: functions_1.default(environment),
	        contexts: contexts_1.default,
	        SourceMapOutput: sourceMapOutput,
	        SourceMapBuilder: sourceMapBuilder,
	        ParseTree: parseTree,
	        ImportManager: importManager,
	        render: render,
	        parse: parse,
	        LessError: less_error_1.default,
	        transformTree: transform_tree_1.default,
	        utils: utils$1,
	        PluginManager: plugin_manager_1.default,
	        logger: logger_1.default
	    };
	    // Create a public API
	    var ctor = function (t) {
	        return function () {
	            var obj = Object.create(t.prototype);
	            t.apply(obj, Array.prototype.slice.call(arguments, 0));
	            return obj;
	        };
	    };
	    var t;
	    var api = Object.create(initial);
	    for (var n in initial.tree) {
	        /* eslint guard-for-in: 0 */
	        t = initial.tree[n];
	        if (typeof t === 'function') {
	            api[n.toLowerCase()] = ctor(t);
	        }
	        else {
	            api[n] = Object.create(null);
	            for (var o in t) {
	                /* eslint guard-for-in: 0 */
	                api[n][o.toLowerCase()] = ctor(t[o]);
	            }
	        }
	    }
	    /**
	     * Some of the functions assume a `this` context of the API object,
	     * which causes it to fail when wrapped for ES6 imports.
	     *
	     * An assumed `this` should be removed in the future.
	     */
	    initial.parse = initial.parse.bind(api);
	    initial.render = initial.render.bind(api);
	    return api;
	}
	var _default$6 = less$1.default = default_1;

	var fileManager = {};

	/* global window, XMLHttpRequest */
	Object.defineProperty(fileManager, "__esModule", { value: true });
	var tslib_1$3 = require$$0$1;
	var abstract_file_manager_js_1 = tslib_1$3.__importDefault(requireAbstractFileManager());
	var options$1;
	var logger;
	var fileCache = {};
	// TODOS - move log somewhere. pathDiff and doing something similar in node. use pathDiff in the other browser file for the initial load
	var FileManager = function () { };
	FileManager.prototype = Object.assign(new abstract_file_manager_js_1.default(), {
	    alwaysMakePathsAbsolute: function () {
	        return true;
	    },
	    join: function (basePath, laterPath) {
	        if (!basePath) {
	            return laterPath;
	        }
	        return this.extractUrlParts(laterPath, basePath).path;
	    },
	    doXHR: function (url, type, callback, errback) {
	        var xhr = new XMLHttpRequest();
	        var async = options$1.isFileProtocol ? options$1.fileAsync : true;
	        if (typeof xhr.overrideMimeType === 'function') {
	            xhr.overrideMimeType('text/css');
	        }
	        logger.debug("XHR: Getting '" + url + "'");
	        xhr.open('GET', url, async);
	        xhr.setRequestHeader('Accept', type || 'text/x-less, text/css; q=0.9, */*; q=0.5');
	        xhr.send(null);
	        function handleResponse(xhr, callback, errback) {
	            if (xhr.status >= 200 && xhr.status < 300) {
	                callback(xhr.responseText, xhr.getResponseHeader('Last-Modified'));
	            }
	            else if (typeof errback === 'function') {
	                errback(xhr.status, url);
	            }
	        }
	        if (options$1.isFileProtocol && !options$1.fileAsync) {
	            if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
	                callback(xhr.responseText);
	            }
	            else {
	                errback(xhr.status, url);
	            }
	        }
	        else if (async) {
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4) {
	                    handleResponse(xhr, callback, errback);
	                }
	            };
	        }
	        else {
	            handleResponse(xhr, callback, errback);
	        }
	    },
	    supports: function () {
	        return true;
	    },
	    clearFileCache: function () {
	        fileCache = {};
	    },
	    loadFile: function (filename, currentDirectory, options, environment) {
	        // TODO: Add prefix support like less-node?
	        // What about multiple paths?
	        if (currentDirectory && !this.isPathAbsolute(filename)) {
	            filename = currentDirectory + filename;
	        }
	        filename = options.ext ? this.tryAppendExtension(filename, options.ext) : filename;
	        options = options || {};
	        // sheet may be set to the stylesheet for the initial load or a collection of properties including
	        // some context variables for imports
	        var hrefParts = this.extractUrlParts(filename, window.location.href);
	        var href = hrefParts.url;
	        var self = this;
	        return new Promise(function (resolve, reject) {
	            if (options.useFileCache && fileCache[href]) {
	                try {
	                    var lessText = fileCache[href];
	                    return resolve({ contents: lessText, filename: href, webInfo: { lastModified: new Date() } });
	                }
	                catch (e) {
	                    return reject({ filename: href, message: "Error loading file " + href + " error was " + e.message });
	                }
	            }
	            self.doXHR(href, options.mime, function doXHRCallback(data, lastModified) {
	                // per file cache
	                fileCache[href] = data;
	                // Use remote copy (re-parse)
	                resolve({ contents: data, filename: href, webInfo: { lastModified: lastModified } });
	            }, function doXHRError(status, url) {
	                reject({ type: 'File', message: "'" + url + "' wasn't found (" + status + ")", href: href });
	            });
	        });
	    }
	});
	var _default$5 = fileManager.default = (function (opts, log) {
	    options$1 = opts;
	    logger = log;
	    return FileManager;
	});

	var pluginLoader = {};

	// TODO: Add tests for browser @plugin
	/* global window */
	Object.defineProperty(pluginLoader, "__esModule", { value: true });
	var tslib_1$2 = require$$0$1;
	var abstract_plugin_loader_js_1 = tslib_1$2.__importDefault(requireAbstractPluginLoader());
	/**
	 * Browser Plugin Loader
	 */
	var PluginLoader = function (less) {
	    this.less = less;
	    // Should we shim this.require for browser? Probably not?
	};
	PluginLoader.prototype = Object.assign(new abstract_plugin_loader_js_1.default(), {
	    loadPlugin: function (filename, basePath, context, environment, fileManager) {
	        return new Promise(function (fulfill, reject) {
	            fileManager.loadFile(filename, basePath, context, environment)
	                .then(fulfill).catch(reject);
	        });
	    }
	});
	var _default$4 = pluginLoader.default = PluginLoader;

	var logListener = {};

	Object.defineProperty(logListener, "__esModule", { value: true });
	var _default$3 = logListener.default = (function (less, options) {
	    var logLevel_debug = 4;
	    var logLevel_info = 3;
	    var logLevel_warn = 2;
	    var logLevel_error = 1;
	    // The amount of logging in the javascript console.
	    // 3 - Debug, information and errors
	    // 2 - Information and errors
	    // 1 - Errors
	    // 0 - None
	    // Defaults to 2
	    options.logLevel = typeof options.logLevel !== 'undefined' ? options.logLevel : (options.env === 'development' ? logLevel_info : logLevel_error);
	    if (!options.loggers) {
	        options.loggers = [{
	                debug: function (msg) {
	                    if (options.logLevel >= logLevel_debug) {
	                        console.log(msg);
	                    }
	                },
	                info: function (msg) {
	                    if (options.logLevel >= logLevel_info) {
	                        console.log(msg);
	                    }
	                },
	                warn: function (msg) {
	                    if (options.logLevel >= logLevel_warn) {
	                        console.warn(msg);
	                    }
	                },
	                error: function (msg) {
	                    if (options.logLevel >= logLevel_error) {
	                        console.error(msg);
	                    }
	                }
	            }];
	    }
	    for (var i = 0; i < options.loggers.length; i++) {
	        less.logger.addListener(options.loggers[i]);
	    }
	});

	var errorReporting = {};

	Object.defineProperty(errorReporting, "__esModule", { value: true });
	var tslib_1$1 = require$$0$1;
	var utils = tslib_1$1.__importStar(utils$4);
	var browser_1 = tslib_1$1.__importDefault(browser$1);
	var _default$2 = errorReporting.default = (function (window, less, options) {
	    function errorHTML(e, rootHref) {
	        var id = "less-error-message:" + utils.extractId(rootHref || '');
	        var template = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>';
	        var elem = window.document.createElement('div');
	        var timer;
	        var content;
	        var errors = [];
	        var filename = e.filename || rootHref;
	        var filenameNoPath = filename.match(/([^\/]+(\?.*)?)$/)[1];
	        elem.id = id;
	        elem.className = 'less-error-message';
	        content = "<h3>" + (e.type || 'Syntax') + "Error: " + (e.message || 'There is an error in your .less file') +
	            ("</h3><p>in <a href=\"" + filename + "\">" + filenameNoPath + "</a> ");
	        var errorline = function (e, i, classname) {
	            if (e.extract[i] !== undefined) {
	                errors.push(template.replace(/\{line\}/, (parseInt(e.line, 10) || 0) + (i - 1))
	                    .replace(/\{class\}/, classname)
	                    .replace(/\{content\}/, e.extract[i]));
	            }
	        };
	        if (e.line) {
	            errorline(e, 0, '');
	            errorline(e, 1, 'line');
	            errorline(e, 2, '');
	            content += "on line " + e.line + ", column " + (e.column + 1) + ":</p><ul>" + errors.join('') + "</ul>";
	        }
	        if (e.stack && (e.extract || options.logLevel >= 4)) {
	            content += "<br/>Stack Trace</br />" + e.stack.split('\n').slice(1).join('<br/>');
	        }
	        elem.innerHTML = content;
	        // CSS for error messages
	        browser_1.default.createCSS(window.document, [
	            '.less-error-message ul, .less-error-message li {',
	            'list-style-type: none;',
	            'margin-right: 15px;',
	            'padding: 4px 0;',
	            'margin: 0;',
	            '}',
	            '.less-error-message label {',
	            'font-size: 12px;',
	            'margin-right: 15px;',
	            'padding: 4px 0;',
	            'color: #cc7777;',
	            '}',
	            '.less-error-message pre {',
	            'color: #dd6666;',
	            'padding: 4px 0;',
	            'margin: 0;',
	            'display: inline-block;',
	            '}',
	            '.less-error-message pre.line {',
	            'color: #ff0000;',
	            '}',
	            '.less-error-message h3 {',
	            'font-size: 20px;',
	            'font-weight: bold;',
	            'padding: 15px 0 5px 0;',
	            'margin: 0;',
	            '}',
	            '.less-error-message a {',
	            'color: #10a',
	            '}',
	            '.less-error-message .error {',
	            'color: red;',
	            'font-weight: bold;',
	            'padding-bottom: 2px;',
	            'border-bottom: 1px dashed red;',
	            '}'
	        ].join('\n'), { title: 'error-message' });
	        elem.style.cssText = [
	            'font-family: Arial, sans-serif',
	            'border: 1px solid #e00',
	            'background-color: #eee',
	            'border-radius: 5px',
	            '-webkit-border-radius: 5px',
	            '-moz-border-radius: 5px',
	            'color: #e00',
	            'padding: 15px',
	            'margin-bottom: 15px'
	        ].join(';');
	        if (options.env === 'development') {
	            timer = setInterval(function () {
	                var document = window.document;
	                var body = document.body;
	                if (body) {
	                    if (document.getElementById(id)) {
	                        body.replaceChild(elem, document.getElementById(id));
	                    }
	                    else {
	                        body.insertBefore(elem, body.firstChild);
	                    }
	                    clearInterval(timer);
	                }
	            }, 10);
	        }
	    }
	    function removeErrorHTML(path) {
	        var node = window.document.getElementById("less-error-message:" + utils.extractId(path));
	        if (node) {
	            node.parentNode.removeChild(node);
	        }
	    }
	    function removeError(path) {
	        if (!options.errorReporting || options.errorReporting === 'html') {
	            removeErrorHTML(path);
	        }
	        else if (options.errorReporting === 'console') ;
	        else if (typeof options.errorReporting === 'function') {
	            options.errorReporting('remove', path);
	        }
	    }
	    function errorConsole(e, rootHref) {
	        var template = '{line} {content}';
	        var filename = e.filename || rootHref;
	        var errors = [];
	        var content = (e.type || 'Syntax') + "Error: " + (e.message || 'There is an error in your .less file') + " in " + filename;
	        var errorline = function (e, i, classname) {
	            if (e.extract[i] !== undefined) {
	                errors.push(template.replace(/\{line\}/, (parseInt(e.line, 10) || 0) + (i - 1))
	                    .replace(/\{class\}/, classname)
	                    .replace(/\{content\}/, e.extract[i]));
	            }
	        };
	        if (e.line) {
	            errorline(e, 0, '');
	            errorline(e, 1, 'line');
	            errorline(e, 2, '');
	            content += " on line " + e.line + ", column " + (e.column + 1) + ":\n" + errors.join('\n');
	        }
	        if (e.stack && (e.extract || options.logLevel >= 4)) {
	            content += "\nStack Trace\n" + e.stack;
	        }
	        less.logger.error(content);
	    }
	    function error(e, rootHref) {
	        if (!options.errorReporting || options.errorReporting === 'html') {
	            errorHTML(e, rootHref);
	        }
	        else if (options.errorReporting === 'console') {
	            errorConsole(e, rootHref);
	        }
	        else if (typeof options.errorReporting === 'function') {
	            options.errorReporting('add', e, rootHref);
	        }
	    }
	    return {
	        add: error,
	        remove: removeError
	    };
	});

	var cache = {};

	// Cache system is a bit outdated and could do with work
	Object.defineProperty(cache, "__esModule", { value: true });
	var _default$1 = cache.default = (function (window, options, logger) {
	    var cache = null;
	    if (options.env !== 'development') {
	        try {
	            cache = (typeof window.localStorage === 'undefined') ? null : window.localStorage;
	        }
	        catch (_) { }
	    }
	    return {
	        setCSS: function (path, lastModified, modifyVars, styles) {
	            if (cache) {
	                logger.info("saving " + path + " to cache.");
	                try {
	                    cache.setItem(path, styles);
	                    cache.setItem(path + ":timestamp", lastModified);
	                    if (modifyVars) {
	                        cache.setItem(path + ":vars", JSON.stringify(modifyVars));
	                    }
	                }
	                catch (e) {
	                    // TODO - could do with adding more robust error handling
	                    logger.error("failed to save \"" + path + "\" to local storage for caching.");
	                }
	            }
	        },
	        getCSS: function (path, webInfo, modifyVars) {
	            var css = cache && cache.getItem(path);
	            var timestamp = cache && cache.getItem(path + ":timestamp");
	            var vars = cache && cache.getItem(path + ":vars");
	            modifyVars = modifyVars || {};
	            vars = vars || "{}"; // if not set, treat as the JSON representation of an empty object
	            if (timestamp && webInfo.lastModified &&
	                (new Date(webInfo.lastModified).valueOf() ===
	                    new Date(timestamp).valueOf()) &&
	                JSON.stringify(modifyVars) === vars) {
	                // Use local copy
	                return css;
	            }
	        }
	    };
	});

	var imageSize = {};

	Object.defineProperty(imageSize, "__esModule", { value: true });
	var tslib_1 = require$$0$1;
	var function_registry_1 = tslib_1.__importDefault(requireFunctionRegistry());
	var _default = imageSize.default = (function () {
	    function imageSize() {
	        throw {
	            type: 'Runtime',
	            message: 'Image size functions are not supported in browser version of less'
	        };
	    }
	    var imageFunctions = {
	        'image-size': function (filePathNode) {
	            imageSize();
	            return -1;
	        },
	        'image-width': function (filePathNode) {
	            imageSize();
	            return -1;
	        },
	        'image-height': function (filePathNode) {
	            imageSize();
	            return -1;
	        }
	    };
	    function_registry_1.default.addMultiple(imageFunctions);
	});

	//
	// index.js
	// Should expose the additional browser functions on to the less object
	//

	var root = (window, options) => {
	  const document = window.document;
	  const less = _default$6({
	    getSourceMapGenerator: () => sourceMap.SourceMapGenerator,
	  });

	  less.options = options;
	  const environment = less.environment;
	  const FileManager = _default$5(options, less.logger);
	  const fileManager = new FileManager();
	  environment.addFileManager(fileManager);
	  less.FileManager = FileManager;
	  less.PluginLoader = _default$4;

	  _default$3(less, options);
	  const errors = _default$2(window, less, options);
	  const cache = (less.cache =
	    options.cache || _default$1(window, options, less.logger));
	  _default(less.environment);

	  // Setup user functions - Deprecate?
	  if (options.functions) {
	    less.functions.functionRegistry.addMultiple(options.functions);
	  }

	  const typePattern = /^text\/(x-)?less$/;

	  function clone(obj) {
	    const cloned = {};
	    for (const prop in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	        cloned[prop] = obj[prop];
	      }
	    }
	    return cloned;
	  }

	  // only really needed for phantom
	  function bind(func, thisArg) {
	    const curryArgs = Array.prototype.slice.call(arguments, 2);
	    return function () {
	      const args = curryArgs.concat(Array.prototype.slice.call(arguments, 0));
	      return func.apply(thisArg, args);
	    };
	  }

	  function loadStyles(modifyVars) {
	    const styles = document.getElementsByTagName("style");
	    let style;

	    for (let i = 0; i < styles.length; i++) {
	      style = styles[i];
	      if (style.type.match(typePattern)) {
	        const instanceOptions = clone(options);
	        instanceOptions.modifyVars = modifyVars;
	        const lessText = style.innerHTML || "";
	        instanceOptions.filename = document.location.href.replace(/#.*$/, "");

	        /* jshint loopfunc:true */
	        // use closure to store current style
	        less.render(
	          lessText,
	          instanceOptions,
	          bind(
	            (style, e, result) => {
	              if (e) {
	                errors.add(e, "inline");
	              } else {
	                style.type = "text/css";
	                if (style.styleSheet) {
	                  style.styleSheet.cssText = result.css;
	                } else {
	                  style.innerHTML = result.css;
	                }
	              }
	            },
	            null,
	            style
	          )
	        );
	      }
	    }
	  }

	  function loadStyleSheet(sheet, callback, reload, remaining, modifyVars) {
	    const instanceOptions = clone(options);
	    addDataAttr_1(instanceOptions, sheet);
	    instanceOptions.mime = sheet.type;

	    if (modifyVars) {
	      instanceOptions.modifyVars = modifyVars;
	    }

	    function loadInitialFileCallback(loadedFile) {
	      const data = loadedFile.contents;
	      const path = loadedFile.filename;
	      const webInfo = loadedFile.webInfo;

	      const newFileInfo = {
	        currentDirectory: fileManager.getPath(path),
	        filename: path,
	        rootFilename: path,
	        rewriteUrls: instanceOptions.rewriteUrls,
	      };

	      newFileInfo.entryPath = newFileInfo.currentDirectory;
	      newFileInfo.rootpath =
	        instanceOptions.rootpath || newFileInfo.currentDirectory;

	      if (webInfo) {
	        webInfo.remaining = remaining;

	        const css = cache.getCSS(path, webInfo, instanceOptions.modifyVars);
	        if (!reload && css) {
	          webInfo.local = true;
	          callback(null, css, data, sheet, webInfo, path);
	          return;
	        }
	      }

	      // TODO add tests around how this behaves when reloading
	      errors.remove(path);

	      instanceOptions.rootFileInfo = newFileInfo;
	      less.render(data, instanceOptions, (e, result) => {
	        if (e) {
	          e.href = path;
	          callback(e);
	        } else {
	          cache.setCSS(
	            sheet.href,
	            webInfo.lastModified,
	            instanceOptions.modifyVars,
	            result.css
	          );
	          callback(null, result.css, data, sheet, webInfo, path);
	        }
	      });
	    }

	    fileManager
	      .loadFile(sheet.href, null, instanceOptions, environment)
	      .then((loadedFile) => {
	        loadInitialFileCallback(loadedFile);
	      })
	      .catch((err) => {
	        console.log(err);
	        callback(err);
	      });
	  }

	  function loadStyleSheets(callback, reload, modifyVars) {
	    for (let i = 0; i < less.sheets.length; i++) {
	      loadStyleSheet(
	        less.sheets[i],
	        callback,
	        reload,
	        less.sheets.length - (i + 1),
	        modifyVars
	      );
	    }
	  }

	  function initRunningMode() {
	    if (less.env === "development") {
	      less.watchTimer = setInterval(() => {
	        if (less.watchMode) {
	          fileManager.clearFileCache();
	          /**
	           * @todo remove when this is typed with JSDoc
	           */
	          // eslint-disable-next-line no-unused-vars
	          loadStyleSheets((e, css, _, sheet, webInfo) => {
	            if (e) {
	              errors.add(e, e.href || sheet.href);
	            } else if (css) {
	              _default$9.createCSS(window.document, css, sheet);
	            }
	          });
	        }
	      }, options.poll);
	    }
	  }

	  //
	  // Watch mode
	  //
	  less.watch = function () {
	    if (!less.watchMode) {
	      less.env = "development";
	      initRunningMode();
	    }
	    this.watchMode = true;
	    return true;
	  };

	  less.unwatch = function () {
	    clearInterval(less.watchTimer);
	    this.watchMode = false;
	    return false;
	  };

	  //
	  // Synchronously get all <link> tags with the 'rel' attribute set to
	  // "stylesheet/less".
	  //
	  less.registerStylesheetsImmediately = () => {
	    const links = document.getElementsByTagName("link");
	    less.sheets = [];

	    for (let i = 0; i < links.length; i++) {
	      if (
	        links[i].rel === "stylesheet/less" ||
	        (links[i].rel.match(/stylesheet/) && links[i].type.match(typePattern))
	      ) {
	        less.sheets.push(links[i]);
	      }
	    }
	  };

	  //
	  // Asynchronously get all <link> tags with the 'rel' attribute set to
	  // "stylesheet/less", returning a Promise.
	  //
	  less.registerStylesheets = () =>
	    new Promise((resolve) => {
	      less.registerStylesheetsImmediately();
	      resolve();
	    });

	  //
	  // With this function, it's possible to alter variables and re-render
	  // CSS without reloading less-files
	  //
	  less.modifyVars = (record) => less.refresh(true, record, false);

	  less.refresh = (reload, modifyVars, clearFileCache) => {
	    if ((reload || clearFileCache) && clearFileCache !== false) {
	      fileManager.clearFileCache();
	    }
	    return new Promise((resolve, reject) => {
	      let startTime;
	      let endTime;
	      let totalMilliseconds;
	      let remainingSheets;
	      startTime = endTime = new Date();

	      // Set counter for remaining unprocessed sheets
	      remainingSheets = less.sheets.length;

	      if (remainingSheets === 0) {
	        endTime = new Date();
	        totalMilliseconds = endTime - startTime;
	        less.logger.info("Less has finished and no sheets were loaded.");
	        resolve({
	          startTime,
	          endTime,
	          totalMilliseconds,
	          sheets: less.sheets.length,
	        });
	      } else {
	        // Relies on less.sheets array, callback seems to be guaranteed to be called for every element of the array
	        loadStyleSheets(
	          (e, css, _, sheet, webInfo) => {
	            if (e) {
	              errors.add(e, e.href || sheet.href);
	              reject(e);
	              return;
	            }
	            if (webInfo.local) {
	              less.logger.info(`Loading ${sheet.href} from cache.`);
	            } else {
	              less.logger.info(`Rendered ${sheet.href} successfully.`);
	            }
	            _default$9.createCSS(window.document, css, sheet);
	            less.logger.info(
	              `CSS for ${sheet.href} generated in ${new Date() - endTime}ms`
	            );

	            // Count completed sheet
	            remainingSheets--;

	            // Check if the last remaining sheet was processed and then call the promise
	            if (remainingSheets === 0) {
	              totalMilliseconds = new Date() - startTime;
	              less.logger.info(
	                `Less has finished. CSS generated in ${totalMilliseconds}ms`
	              );
	              resolve({
	                startTime,
	                endTime,
	                totalMilliseconds,
	                sheets: less.sheets.length,
	              });
	            }
	            endTime = new Date();
	          },
	          reload,
	          modifyVars
	        );
	      }

	      loadStyles(modifyVars);
	    });
	  };

	  less.refreshStyles = loadStyles;
	  return less;
	};

	const options = _default$a();

	if (window.less) {
	  for (const key in window.less) {
	    if (Object.prototype.hasOwnProperty.call(window.less, key)) {
	      options[key] = window.less[key];
	    }
	  }
	}
	_default$8(window, options);

	options.plugins = options.plugins || [];

	const less = root(window, options);

	window.less = less;

	return less;

}));
