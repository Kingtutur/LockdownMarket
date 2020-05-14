/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + chunkId + "." + {"2":"d39cb0afeb5dda5c36fb","3":"442d2d5f7cd36a78cb57","4":"2ed995a0c7577a176045"}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([170,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return displayDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return displayMoney; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return displayActionMessage; });
var displayDate = function displayDate(timestamp) {
  var date = new Date(timestamp);
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear(); // return day + ' ' + monthNames[monthIndex] + ' ' + year;

  return "".concat(monthNames[monthIndex], " ").concat(day, ", ").concat(year);
};
var displayMoney = function displayMoney(n) {
  var format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }); // or use toLocaleString()

  return format.format(n);
};
var displayActionMessage = function displayActionMessage(msg) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
  var div = document.createElement('div');
  var span = document.createElement('span');
  div.className = "toast ".concat(status === 'info' ? 'toast-info' : status === 'success' ? 'toast-success' : 'toast-error');
  span.className = 'toast-msg';
  span.textContent = msg;
  div.appendChild(span);

  if (document.querySelector('.toast')) {
    document.body.removeChild(document.querySelector('.toast'));
    document.body.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  setTimeout(function () {
    try {
      document.body.removeChild(div);
    } catch (e) {}
  }, 3000);
};

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/defaultBanner.d7cf784d525a9ec138f1e4708c76a3d2.jpg";

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/defaultAvatar.5dfb1249302d6d9432120cb6480352dd.jpg";

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(171);
module.exports = __webpack_require__(386);


/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var CircularProgress = function CircularProgress(_ref) {
  var style = _ref.style,
      visible = _ref.visible,
      theme = _ref.theme;

  var className = function className() {
    return theme === 'light' ? 'circular-progress-light' : theme === 'dark' ? 'circular-progress-dark' : null;
  };

  return visible ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: className(),
    style: style
  }) : null;
};

CircularProgress.defaultProps = {
  visible: true,
  theme: 'dark',
  style: {}
};
CircularProgress.propType = {
  visible: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  theme: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["a"] = (CircularProgress);

/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(59);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 22 modules
var es = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/redux-persist/es/integration/react.js
var integration_react = __webpack_require__(165);

// EXTERNAL MODULE: ./node_modules/firebase/app/dist/index.cjs.js
var index_cjs = __webpack_require__(36);
var index_cjs_default = /*#__PURE__*/__webpack_require__.n(index_cjs);

// EXTERNAL MODULE: ./node_modules/firebase/auth/dist/index.esm.js
var index_esm = __webpack_require__(365);

// EXTERNAL MODULE: ./node_modules/firebase/firestore/dist/index.esm.js
var dist_index_esm = __webpack_require__(367);

// EXTERNAL MODULE: ./node_modules/firebase/storage/dist/index.esm.js + 1 modules
var storage_dist_index_esm = __webpack_require__(387);

// CONCATENATED MODULE: ./src/firebase/firebase.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var firebaseConfig = {
  apiKey: "AIzaSyDkdhNSAaHWDGjy_xx21gyDS_KVkYU78Rw",
  authDomain: "marche-deconfine.firebaseapp.com",
  databaseURL: "https://marche-deconfine.firebaseio.com",
  projectId: "marche-deconfine",
  storageBucket: "marche-deconfine.appspot.com",
  messagingSenderId: "420693000608",
  appId: "1:420693000608:web:f2bcbd4b266f7c796224c5"
};

var firebase_Firebase = function Firebase() {
  var _this = this;

  _classCallCheck(this, Firebase);

  _defineProperty(this, "createAccount", function (email, password) {
    return _this.auth.createUserWithEmailAndPassword(email, password);
  });

  _defineProperty(this, "signIn", function (email, password) {
    return _this.auth.signInWithEmailAndPassword(email, password);
  });

  _defineProperty(this, "signInWithGoogle", function () {
    return _this.auth.signInWithPopup(new index_cjs_default.a.auth.GoogleAuthProvider());
  });

  _defineProperty(this, "signInWithFacebook", function () {
    return _this.auth.signInWithPopup(new index_cjs_default.a.auth.FacebookAuthProvider());
  });

  _defineProperty(this, "signOut", function () {
    return _this.auth.signOut();
  });

  _defineProperty(this, "passwordReset", function (email) {
    return _this.auth.sendPasswordResetEmail(email);
  });

  _defineProperty(this, "addUser", function (id, user) {
    return _this.db.collection('users').doc(id).set(user);
  });

  _defineProperty(this, "getUser", function (id) {
    return _this.db.collection('users').doc(id).get();
  });

  _defineProperty(this, "passwordUpdate", function (password) {
    return _this.auth.currentUser.updatePassword(password);
  });

  _defineProperty(this, "changePassword", function (currentPassword, newPassword) {
    return new Promise(function (resolve, reject) {
      _this.reauthenticate(currentPassword).then(function () {
        var user = _this.auth.currentUser;
        user.updatePassword(newPassword).then(function () {
          resolve('Password updated successfully!');
        })["catch"](function (error) {
          return reject(error);
        });
      })["catch"](function (error) {
        return reject(error);
      });
    });
  });

  _defineProperty(this, "reauthenticate", function (currentPassword) {
    var user = _this.auth.currentUser;
    var cred = index_cjs_default.a.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  });

  _defineProperty(this, "updateEmail", function (currentPassword, newEmail) {
    return new Promise(function (resolve, reject) {
      _this.reauthenticate(currentPassword).then(function () {
        var user = _this.auth.currentUser;
        user.updateEmail(newEmail).then(function (data) {
          resolve('Email Successfully updated');
        })["catch"](function (error) {
          return reject(error);
        });
      })["catch"](function (error) {
        return reject(error);
      });
    });
  });

  _defineProperty(this, "updateProfile", function (id, updates) {
    return _this.db.collection('users').doc(id).update(updates);
  });

  _defineProperty(this, "onAuthStateChanged", function () {
    return new Promise(function (resolve, reject) {
      _this.auth.onAuthStateChanged(function (user) {
        if (user) {
          return resolve(user);
        } else {
          return reject(new Error('Auth State Changed failed'));
        }
      });
    });
  });

  _defineProperty(this, "setAuthPersistence", function () {
    return _this.auth.setPersistence(index_cjs_default.a.auth.Auth.Persistence.LOCAL);
  });

  _defineProperty(this, "getProducts", function (lastRefKey) {
    var didTimeout = false;
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
        var query, snapshot, products, lastKey, timeout, totalQuery, total, _query, _snapshot, _products, _lastKey;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!lastRefKey) {
                  _context.next = 17;
                  break;
                }

                _context.prev = 1;
                query = _this.db.collection('products').orderBy(index_cjs_default.a.firestore.FieldPath.documentId()).startAfter(lastRefKey).limit(12);
                _context.next = 5;
                return query.get();

              case 5:
                snapshot = _context.sent;
                products = [];
                snapshot.forEach(function (doc) {
                  return products.push(_objectSpread({
                    id: doc.id
                  }, doc.data()));
                });
                lastKey = snapshot.docs[snapshot.docs.length - 1];
                resolve({
                  products: products,
                  lastKey: lastKey
                });
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                reject(':( Failed to fetch products.');

              case 15:
                _context.next = 37;
                break;

              case 17:
                timeout = setTimeout(function () {
                  didTimeout = true;
                  reject('Request timeout, please try again');
                }, 15000);
                _context.prev = 18;
                _context.next = 21;
                return _this.db.collection('products').get();

              case 21:
                totalQuery = _context.sent;
                total = totalQuery.docs.length;
                _query = _this.db.collection('products').orderBy(index_cjs_default.a.firestore.FieldPath.documentId()).limit(12);
                _context.next = 26;
                return _query.get();

              case 26:
                _snapshot = _context.sent;
                clearTimeout(timeout);

                if (!didTimeout) {
                  _products = [];

                  _snapshot.forEach(function (doc) {
                    return _products.push(_objectSpread({
                      id: doc.id
                    }, doc.data()));
                  });

                  _lastKey = _snapshot.docs[_snapshot.docs.length - 1];
                  resolve({
                    products: _products,
                    lastKey: _lastKey,
                    total: total
                  });
                }

                _context.next = 37;
                break;

              case 31:
                _context.prev = 31;
                _context.t1 = _context["catch"](18);

                if (!didTimeout) {
                  _context.next = 35;
                  break;
                }

                return _context.abrupt("return");

              case 35:
                console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', _context.t1);
                reject(':( Failed to fetch products.');

              case 37:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 12], [18, 31]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  });

  _defineProperty(this, "addProduct", function (id, product) {
    return _this.db.collection('products').doc(id).set(product);
  });

  _defineProperty(this, "generateKey", function () {
    return _this.db.collection('products').doc().id;
  });

  _defineProperty(this, "storeImage", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, folder, imageFile) {
      var snapshot, downloadURL;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.storage.ref(folder).child(id).put(imageFile);

            case 2:
              snapshot = _context2.sent;
              _context2.next = 5;
              return snapshot.ref.getDownloadURL();

            case 5:
              downloadURL = _context2.sent;
              return _context2.abrupt("return", downloadURL);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "deleteImage", function (id) {
    return _this.storage.ref('products').child(id)["delete"]();
  });

  _defineProperty(this, "editProduct", function (id, updates) {
    return _this.db.collection('products').doc(id).update(updates);
  });

  _defineProperty(this, "removeProduct", function (id) {
    return _this.db.collection('products').doc(id)["delete"]();
  });

  index_cjs_default.a.initializeApp(firebaseConfig);
  this.storage = index_cjs_default.a.storage();
  this.db = index_cjs_default.a.firestore();
  this.auth = index_cjs_default.a.auth();
} // AUTH ACTIONS 
// --------
;

var firebase = new firebase_Firebase();
/* harmony default export */ var firebase_firebase = (firebase);
// EXTERNAL MODULE: ./node_modules/normalize.css/normalize.css
var normalize = __webpack_require__(371);

// EXTERNAL MODULE: ./node_modules/react-phone-input-2/lib/style.css
var style = __webpack_require__(372);

// EXTERNAL MODULE: ./src/styles/style.scss
var styles_style = __webpack_require__(373);

// EXTERNAL MODULE: ./node_modules/webfontloader/webfontloader.js
var webfontloader = __webpack_require__(166);
var webfontloader_default = /*#__PURE__*/__webpack_require__.n(webfontloader);

// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/history/esm/history.js + 2 modules
var esm_history = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./src/constants/constants.js
var GET_PRODUCTS = 'GET_PRODUCTS';
var GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
var ADD_PRODUCT = 'ADD_PRODUCT';
var ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
var REMOVE_PRODUCT = 'REMOVE_PRODUCT';
var REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS';
var EDIT_PRODUCT = 'EDIT_PRODUCT';
var EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
var CANCEL_GET_PRODUCTS = 'CANCEL_GET_PRODUCTS';
var SET_LAST_REF_KEY = 'SET_LAST_REF_KEY';
var ADD_TO_BASKET = 'ADD_TO_BASKET';
var REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';
var CLEAR_BASKET = 'CLEAR_BASKET';
var ADD_QTY_ITEM = 'ADD_QTY_ITEM';
var MINUS_QTY_ITEM = 'MINUS_QTY_ITEM';
var SET_CHECKOUT_SHIPPING_DETAILS = 'SET_CHECKOUT_SHIPPING_DETAILS';
var RESET_CHECKOUT_SHIPPING_DETAILS = 'RESET_CHECKOUT_SHIPPING_DETAILS';
var SIGNIN = 'SIGNIN';
var SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
var SIGNUP = 'SIGNUP';
var SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
var SIGNOUT = 'SIGNOUT';
var SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
var SET_AUTH_STATUS = 'SET_AUTH_STATUS';
var SIGNIN_WITH_GOOGLE = 'SIGNIN_WITH_GOOGLE';
var SIGNIN_WITH_FACEBOOK = 'SIGNIN_WITH_FACEBOOK';
var ON_AUTHSTATE_CHANGED = 'ON_AUTHSTATE_CHANGED';
var SET_AUTH_PERSISTENCE = 'SET_AUTH_PERSISTENCE';
var ON_AUTHSTATE_SUCCESS = 'ON_AUTHSTATE_SUCCESS';
var ON_AUTHSTATE_FAIL = 'ON_AUTHSTATE_FAIL';
var RESET_PASSWORD = 'RESET_PASSWORD';
var UPDATE_EMAIL = 'UPDATE_EMAIL';
var SET_PROFILE = 'SET_PROFILE';
var UPDATE_PROFILE = 'UPDATE_PROFILE';
var UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
var CLEAR_PROFILE = 'CLEAR_PROFILE';
var SET_TEXT_FILTER = 'SET_TEXT_FILTER';
var SET_BRAND_FILTER = 'SET_BRAND_FILTER';
var SET_MIN_PRICE_FILTER = 'SET_MIN_PRICE_FILTER';
var SET_MAX_PRICE_FILTER = 'SET_MAX_PRICE_FILTER';
var RESET_FILTER = 'RESET_FILTER';
var APPLY_FILTER = 'APPLY_FILTER';
var CLEAR_RECENT_SEARCH = 'CLEAR_RECENT_SEARCH';
var REMOVE_SELECTED_RECENT = 'REMOVE_SELECTED_RECENT';
var REGISTER_USER = 'REGISTER_USER';
var GET_USER = 'GET_USER';
var ADD_USER = 'ADD_USER';
var DELETE_USER = 'DELETE_USER';
var EDIT_USER = 'EDIT_USER';
var LOADING = 'LOADING';
var IS_AUTHENTICATING = 'IS_AUTHENTICATING';
var SET_REQUEST_STATUS = 'SET_REQUEST_STATUS';
// CONCATENATED MODULE: ./src/actions/basketActions.js

var basketActions_addToBasket = function addToBasket(product) {
  return {
    type: ADD_TO_BASKET,
    payload: product
  };
};
var basketActions_removeFromBasket = function removeFromBasket(id) {
  return {
    type: REMOVE_FROM_BASKET,
    payload: id
  };
};
var basketActions_clearBasket = function clearBasket() {
  return {
    type: CLEAR_BASKET
  };
};
var basketActions_addQtyItem = function addQtyItem(id) {
  return {
    type: ADD_QTY_ITEM,
    payload: id
  };
};
var basketActions_minusQtyItem = function minusQtyItem(id) {
  return {
    type: MINUS_QTY_ITEM,
    payload: id
  };
};
// CONCATENATED MODULE: ./src/components/basket/BasketItemControl.jsx




var BasketItemControl_BasketItemControl = function BasketItemControl(_ref) {
  var product = _ref.product,
      dispatch = _ref.dispatch;

  var onAddQty = function onAddQty() {
    if (product.quantity < product.maxQuantity) {
      dispatch(basketActions_addQtyItem(product.id));
    }
  };

  var onMinusQty = function onMinusQty() {
    if (product.maxQuantity >= product.quantity && product.quantity !== 0) {
      dispatch(basketActions_minusQtyItem(product.id));
    }
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-item-control"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-border button-border-gray button-small basket-control basket-control-add",
    disabled: product.maxQuantity === product.quantity,
    onClick: onAddQty
  }, "+"), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-border button-border-gray button-small basket-control basket-control-minus",
    disabled: product.quantity === 1,
    onClick: onMinusQty
  }, "-"));
};

BasketItemControl_BasketItemControl.propType = {
  action: prop_types_default.a.objectOf(prop_types_default.a.func).isRequired,
  product: prop_types_default.a.object.isRequired
};
/* harmony default export */ var basket_BasketItemControl = (BasketItemControl_BasketItemControl);
// CONCATENATED MODULE: ./src/components/ui/Badge.jsx



var Badge_Badge = function Badge(_ref) {
  var count = _ref.count;
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "badge"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "badge-count"
  }, count));
};

Badge_Badge.propType = {
  count: prop_types_default.a.number.isRequired
};
/* harmony default export */ var ui_Badge = (Badge_Badge);
// EXTERNAL MODULE: ./src/components/ui/ImageLoader.jsx
var ImageLoader = __webpack_require__(46);

// EXTERNAL MODULE: ./src/helpers/utils.js
var utils = __webpack_require__(11);

// CONCATENATED MODULE: ./src/components/basket/BasketItem.jsx








var BasketItem_BasketItem = function BasketItem(_ref) {
  var basket = _ref.basket,
      dispatch = _ref.dispatch,
      product = _ref.product;

  var onRemoveFromBasket = function onRemoveFromBasket() {
    return dispatch(basketActions_removeFromBasket(product.id));
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-item"
  }, /*#__PURE__*/react_default.a.createElement(basket_BasketItemControl, {
    dispatch: dispatch,
    product: product
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-item-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-item-img-wrapper"
  }, /*#__PURE__*/react_default.a.createElement(ImageLoader["a" /* default */], {
    className: "basket-item-img",
    src: product.image
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-item-details"
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "basket-item-name"
  }, product.name), /*#__PURE__*/react_default.a.createElement("h5", {
    className: "basket-item-price"
  }, Object(utils["c" /* displayMoney */])(product.price * product.quantity), /*#__PURE__*/react_default.a.createElement("span", null, " (x ".concat(product.quantity, ") ")))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "position-relative margin-right-l"
  }, /*#__PURE__*/react_default.a.createElement(ui_Badge, {
    count: product.quantity
  })), /*#__PURE__*/react_default.a.createElement("button", {
    className: "basket-item-remove button button-border button-border-gray button-small",
    onClick: onRemoveFromBasket
  }, "x")));
};

BasketItem_BasketItem.propType = {
  product: prop_types_default.a.object.isRequired,
  basket: prop_types_default.a.arrayOf(prop_types_default.a.object).isRequired
};
/* harmony default export */ var basket_BasketItem = (BasketItem_BasketItem);
// CONCATENATED MODULE: ./src/components/basket/BasketToggle.jsx


var BasketToggle = function BasketToggle(props) {
  var onClickToggle = function onClickToggle(e) {
    if (document.body.classList.contains('is-basket-open')) {
      document.body.classList.remove('is-basket-open');
    } else {
      document.body.classList.add('is-basket-open');
    }
  };

  document.addEventListener('click', function (e) {
    var closest = e.target.closest('.basket');
    var toggle = e.target.closest('.basket-toggle');
    var closeToggle = e.target.closest('.basket-item-remove');

    if (!closest && document.body.classList.contains('is-basket-open') && !toggle && !closeToggle) {
      document.body.classList.remove('is-basket-open');
    }
  });
  return props.children({
    onClickToggle: onClickToggle
  });
};

/* harmony default export */ var basket_BasketToggle = (BasketToggle);
// EXTERNAL MODULE: ./node_modules/react-modal/lib/index.js
var lib = __webpack_require__(120);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ./src/components/ui/Modal.jsx



var Modal_Modal = function Modal(props) {
  var customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      position: 'fixed',
      paddingTop: '50px',
      paddingBottom: '50px',
      transition: 'all .5s ease',
      zIndex: 9999,
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };
  lib_default.a.setAppElement('#app');
  return /*#__PURE__*/react_default.a.createElement(lib_default.a, {
    isOpen: props.isOpen,
    onAfterOpen: props.afterOpenModal,
    onRequestClose: props.closeModal,
    shouldCloseOnOverlayClick: true,
    style: customStyles,
    contentLabel: "Product Modal"
  }, props.children);
};

/* harmony default export */ var ui_Modal = (Modal_Modal);
// CONCATENATED MODULE: ./src/components/ui/Boundary.jsx
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Boundary_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function Boundary_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Boundary_Boundary = /*#__PURE__*/function (_Component) {
  _inherits(Boundary, _Component);

  var _super = _createSuper(Boundary);

  function Boundary() {
    var _this;

    Boundary_classCallCheck(this, Boundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Boundary_defineProperty(_assertThisInitialized(_this), "state", {
      hasError: false
    });

    return _this;
  }

  _createClass(Boundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      console.log(error);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.hasError) {
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: "loader"
        }, /*#__PURE__*/react_default.a.createElement("h3", null, ":( Something went wrong."));
      }

      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        hasError: true
      };
    }
  }]);

  return Boundary;
}(react["Component"]);

/* harmony default export */ var ui_Boundary = (Boundary_Boundary);
// EXTERNAL MODULE: ./src/constants/routes.js
var routes = __webpack_require__(4);

// CONCATENATED MODULE: ./src/components/basket/basket.jsx
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var basket_Basket = function Basket(props) {
  var _useState = Object(react["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      isModalOpen = _useState2[0],
      setModalOpen = _useState2[1];

  var _useSelector = Object(es["d" /* useSelector */])(function (state) {
    return {
      basket: state.basket,
      isAuth: !!state.auth.id && !!state.auth.type
    };
  }),
      basket = _useSelector.basket,
      isAuth = _useSelector.isAuth;

  var dispatch = Object(es["c" /* useDispatch */])();

  var calculateTotal = function calculateTotal() {
    var total = 0;

    if (basket.length !== 0) {
      var result = basket.map(function (product) {
        return product.price * product.quantity;
      }).reduce(function (a, b) {
        return a + b;
      });
      total = result.toFixed(2);
    }

    return Object(utils["c" /* displayMoney */])(total);
  };

  var onOpenModal = function onOpenModal() {
    return setModalOpen(true);
  };

  var onCloseModal = function onCloseModal() {
    return setModalOpen(false);
  };

  var onCheckOut = function onCheckOut() {
    if (basket.length !== 0 && isAuth) {
      document.body.classList.remove('is-basket-open');
      props.history.push(routes["c" /* CHECKOUT_STEP_1 */]);
    } else {
      onOpenModal();
    }
  };

  var onSignInClick = function onSignInClick() {
    onCloseModal();
    document.body.classList.remove('basket-open');
    props.history.push(routes["c" /* CHECKOUT_STEP_1 */]);
  };

  var onClearBasket = function onClearBasket() {
    basket.length !== 0 && dispatch(basketActions_clearBasket());
  };

  return /*#__PURE__*/react_default.a.createElement(ui_Boundary, null, /*#__PURE__*/react_default.a.createElement(ui_Modal, {
    isOpen: isModalOpen,
    onRequestClose: onCloseModal
  }, /*#__PURE__*/react_default.a.createElement("p", {
    className: "text-center"
  }, "You must sign in to continue checking out"), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-flex-center"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-border button-border-gray button-small",
    onClick: onCloseModal
  }, "Continue shopping"), "\xA0", /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-small",
    onClick: onSignInClick
  }, "Sign in to checkout"))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-list"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-header"
  }, /*#__PURE__*/react_default.a.createElement("h3", {
    className: "basket-header-title"
  }, "My Basket \xA0", /*#__PURE__*/react_default.a.createElement("span", null, "(", " ".concat(basket.length, " ").concat(basket.length > 1 ? 'items' : 'item'), ")")), /*#__PURE__*/react_default.a.createElement(basket_BasketToggle, null, function (_ref) {
    var onClickToggle = _ref.onClickToggle;
    return /*#__PURE__*/react_default.a.createElement("span", {
      className: "basket-toggle button button-border button-border-gray button-small",
      onClick: onClickToggle
    }, "Close");
  }), /*#__PURE__*/react_default.a.createElement("button", {
    className: "basket-clear button button-border button-border-gray button-small",
    disabled: basket.length === 0,
    onClick: onClearBasket
  }, /*#__PURE__*/react_default.a.createElement("span", null, "Clear Basket"))), basket.length <= 0 && /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-empty"
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "basket-empty-msg"
  }, "Your basket is empty")), basket.map(function (product) {
    return /*#__PURE__*/react_default.a.createElement(basket_BasketItem, {
      key: product.id,
      product: product,
      basket: basket,
      dispatch: dispatch
    });
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-checkout"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-total"
  }, /*#__PURE__*/react_default.a.createElement("p", {
    className: "basket-total-title"
  }, "Subtotal Amout:"), /*#__PURE__*/react_default.a.createElement("h2", {
    className: "basket-total-amount"
  }, calculateTotal())), /*#__PURE__*/react_default.a.createElement("button", {
    className: "basket-checkout-button button",
    disabled: basket.length === 0 || props.location.pathname === '/checkout',
    onClick: onCheckOut
  }, "Check Out"))));
};

/* harmony default export */ var basket_basket = (Object(react_router["g" /* withRouter */])(basket_Basket));
// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(17);

// CONCATENATED MODULE: ./src/actions/authActions.js

var authActions_signIn = function signIn(email, password) {
  return {
    type: SIGNIN,
    payload: {
      email: email,
      password: password
    }
  };
};
var authActions_signInWithGoogle = function signInWithGoogle() {
  return {
    type: SIGNIN_WITH_GOOGLE
  };
};
var authActions_signInWithFacebook = function signInWithFacebook() {
  return {
    type: SIGNIN_WITH_FACEBOOK
  };
};
var authActions_signUp = function signUp(user) {
  return {
    type: SIGNUP,
    payload: user
  };
};
var authActions_signInSuccess = function signInSuccess(auth) {
  return {
    type: SIGNIN_SUCCESS,
    payload: auth
  };
};
var authActions_setAuthPersistence = function setAuthPersistence() {
  return {
    type: SET_AUTH_PERSISTENCE
  };
};
var authActions_signOut = function signOut() {
  return {
    type: SIGNOUT
  };
};
var authActions_signOutSuccess = function signOutSuccess() {
  return {
    type: SIGNOUT_SUCCESS
  };
};
var authActions_setAuthStatus = function setAuthStatus(status) {
  return {
    type: SET_AUTH_STATUS,
    payload: status
  };
};
var authActions_onAuthStateChanged = function onAuthStateChanged() {
  return {
    type: ON_AUTHSTATE_CHANGED
  };
};
var authActions_onAuthStateSuccess = function onAuthStateSuccess(user) {
  return {
    type: ON_AUTHSTATE_SUCCESS,
    payload: user
  };
};
var authActions_onAuthStateFail = function onAuthStateFail(error) {
  return {
    type: ON_AUTHSTATE_FAIL,
    payload: error
  };
};
var authActions_resetPassword = function resetPassword(email) {
  return {
    type: RESET_PASSWORD,
    payload: email
  };
};
var authActions_isAuthenticating = function isAuthenticating() {
  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return {
    type: IS_AUTHENTICATING,
    payload: bool
  };
};
// CONCATENATED MODULE: ./src/components/auth/SignOut.jsx




var SignOut_SignOut = function SignOut(props) {
  var dispatch = Object(es["c" /* useDispatch */])();

  var onSignOut = function onSignOut() {
    dispatch(authActions_signOut());
  };

  return props.children({
    onSignOut: onSignOut
  });
};

/* harmony default export */ var auth_SignOut = (SignOut_SignOut);
// EXTERNAL MODULE: ./src/components/ui/CircularProgress.jsx
var CircularProgress = __webpack_require__(20);

// CONCATENATED MODULE: ./src/views/account/UserAvatar.jsx







var UserAvatar_UserNav = function UserNav(_ref) {
  var profile = _ref.profile,
      isAuthenticating = _ref.isAuthenticating;
  Object(react["useEffect"])(function () {
    document.addEventListener('click', toggleDropdown);
    return function () {
      return document.removeEventListener('click', toggleDropdown);
    };
  }, []);
  var userNav = Object(react["useRef"])(null);

  var onClickNav = function onClickNav(e) {
    userNav.current.classList.toggle('user-sub-open');
  };

  var toggleDropdown = function toggleDropdown(e) {
    var closest = e.target.closest('div.user-nav');

    try {
      if (!closest && userNav.current.classList.contains('user-sub-open')) {
        userNav.current.classList.remove('user-sub-open');
      }
    } catch (e) {}
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "user-nav",
    onClick: onClickNav,
    ref: userNav
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "text-overflow-ellipsis"
  }, profile.fullname && profile.fullname.split(' ')[0]), /*#__PURE__*/react_default.a.createElement("div", {
    className: "user-nav-img-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("img", {
    alt: "",
    className: "user-nav-img",
    src: profile.avatar
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "icon-caret user-caret"
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "user-nav-sub"
  }, /*#__PURE__*/react_default.a.createElement(react_router_dom["a" /* Link */], {
    to: routes["a" /* ACCOUNT */],
    className: "user-nav-sub-link"
  }, "View Account"), /*#__PURE__*/react_default.a.createElement(auth_SignOut, null, function (_ref2) {
    var onSignOut = _ref2.onSignOut;
    return /*#__PURE__*/react_default.a.createElement("h6", {
      className: "user-nav-sub-link margin-0 d-flex",
      onClick: onSignOut
    }, "Sign Out", /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], {
      visible: isAuthenticating
    }));
  })));
};

UserAvatar_UserNav.propType = {
  profile: prop_types_default.a.object.isRequired
};
/* harmony default export */ var UserAvatar = (Object(react_router["g" /* withRouter */])(UserAvatar_UserNav));
// CONCATENATED MODULE: ./src/components/ui/mobile/MobileNavigation.jsx








var MobileNavigation_Navigation = function Navigation(_ref) {
  var path = _ref.path,
      disabledPaths = _ref.disabledPaths,
      basketLength = _ref.basketLength,
      isAuthenticating = _ref.isAuthenticating,
      profile = _ref.profile,
      isAuth = _ref.isAuth,
      history = _ref.history;
  return /*#__PURE__*/react_default.a.createElement("nav", {
    className: "mobile-navigation"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "mobile-navigation-main"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "mobile-navigation-logo"
  }, /*#__PURE__*/react_default.a.createElement(react_router_dom["a" /* Link */], {
    to: routes["g" /* HOME */]
  }, /*#__PURE__*/react_default.a.createElement("h3", {
    className: "margin-0 color-light"
  }, "Le March\xE9"))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-search-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("input", {
    className: "search-input product-search-input",
    onClick: function onClick() {
      return history.push(routes["h" /* SEARCH */]);
    },
    readOnly: true,
    placeholder: "Search for product",
    type: "text"
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "searchbar-icon"
  }))), /*#__PURE__*/react_default.a.createElement("ul", {
    className: "mobile-navigation-menu"
  }, /*#__PURE__*/react_default.a.createElement(basket_BasketToggle, null, function (_ref2) {
    var onClickToggle = _ref2.onClickToggle;
    return /*#__PURE__*/react_default.a.createElement("li", {
      className: "basket-toggle mobile-navigation-item"
    }, /*#__PURE__*/react_default.a.createElement("button", {
      className: "navigation-menu-link button-link",
      disabled: disabledPaths.includes(path),
      onClick: onClickToggle
    }, /*#__PURE__*/react_default.a.createElement("span", null, /*#__PURE__*/react_default.a.createElement(ui_Badge, {
      count: basketLength
    }), "My Basket")));
  }), isAuth ? /*#__PURE__*/react_default.a.createElement("li", {
    className: "mobile-navigation-item"
  }, /*#__PURE__*/react_default.a.createElement(UserAvatar, {
    isAuthenticating: isAuthenticating,
    profile: profile
  })) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, path !== routes["j" /* SIGNUP */] && /*#__PURE__*/react_default.a.createElement("li", {
    className: "mobile-navigation-item"
  }, /*#__PURE__*/react_default.a.createElement(react_router_dom["a" /* Link */], {
    className: "navigation-menu-link",
    to: routes["j" /* SIGNUP */]
  }, "Sign Up")), path !== routes["i" /* SIGNIN */] && /*#__PURE__*/react_default.a.createElement("li", {
    className: "mobile-navigation-item"
  }, /*#__PURE__*/react_default.a.createElement(react_router_dom["a" /* Link */], {
    className: "navigation-menu-link",
    to: routes["i" /* SIGNIN */]
  }, "Sign In")))));
};

MobileNavigation_Navigation.propType = {
  path: prop_types_default.a.string.isRequired,
  disabledPaths: prop_types_default.a.arrayOf(prop_types_default.a.string).isRequired
};
/* harmony default export */ var MobileNavigation = (Object(react_router["g" /* withRouter */])(MobileNavigation_Navigation));
// CONCATENATED MODULE: ./src/components/ui/Navigation.jsx









var Navigation_Navigation = function Navigation(_ref) {
  var path = _ref.path;
  Object(react["useEffect"])(function () {
    window.addEventListener('scroll', scrollHandler);
    return function () {
      return window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  var _useSelector = Object(es["d" /* useSelector */])(function (state) {
    return {
      basketLength: state.basket.length,
      profile: state.profile,
      isAuth: !!state.auth.id && !!state.auth.type,
      isAuthenticating: state.app.isAuthenticating
    };
  }),
      basketLength = _useSelector.basketLength,
      profile = _useSelector.profile,
      isAuth = _useSelector.isAuth,
      isAuthenticating = _useSelector.isAuthenticating;

  var navbar = Object(react["useRef"])(null);

  var scrollHandler = function scrollHandler() {
    if (navbar.current && window.screen.width > 480) {
      if (window.pageYOffset >= 70) {
        navbar.current.classList.add('is-nav-scrolled');
      } else {
        navbar.current.classList.remove('is-nav-scrolled');
      }
    }
  }; // disable the basket toggle to these paths


  var basketDisabledPaths = [routes["c" /* CHECKOUT_STEP_1 */], routes["d" /* CHECKOUT_STEP_2 */], routes["e" /* CHECKOUT_STEP_3 */], routes["i" /* SIGNIN */], routes["j" /* SIGNUP */], routes["f" /* FORGOT_PASSWORD */]];
  return window.screen.width <= 480 ? /*#__PURE__*/react_default.a.createElement(MobileNavigation, {
    basketLength: basketLength,
    profile: profile,
    isAuth: isAuth,
    isAuthenticating: isAuthenticating,
    path: path,
    disabledPaths: basketDisabledPaths
  }) : /*#__PURE__*/react_default.a.createElement("nav", {
    className: "navigation",
    ref: navbar
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/react_default.a.createElement(react_router_dom["a" /* Link */], {
    to: "/"
  }, /*#__PURE__*/react_default.a.createElement("h3", null, "Le March\xE9"))), /*#__PURE__*/react_default.a.createElement("ul", {
    className: "navigation-menu"
  }, /*#__PURE__*/react_default.a.createElement("li", {
    className: "navigation-menu-item"
  }, /*#__PURE__*/react_default.a.createElement(react_router_dom["b" /* NavLink */], {
    activeClassName: "navigation-menu-active",
    className: "navigation-menu-link",
    exact: true,
    to: routes["g" /* HOME */]
  }, "Home")), /*#__PURE__*/react_default.a.createElement("li", {
    className: "navigation-menu-item"
  }, /*#__PURE__*/react_default.a.createElement(basket_BasketToggle, null, function (_ref2) {
    var onClickToggle = _ref2.onClickToggle;
    return /*#__PURE__*/react_default.a.createElement("button", {
      className: "button-link navigation-menu-link basket-toggle",
      disabled: basketDisabledPaths.includes(path),
      onClick: onClickToggle
    }, /*#__PURE__*/react_default.a.createElement("span", null, /*#__PURE__*/react_default.a.createElement(ui_Badge, {
      count: basketLength
    }), "My Basket"));
  })), isAuth ? /*#__PURE__*/react_default.a.createElement("li", {
    className: "navigation-menu-item"
  }, /*#__PURE__*/react_default.a.createElement(UserAvatar, {
    isAuthenticating: isAuthenticating,
    profile: profile
  })) : /*#__PURE__*/react_default.a.createElement("li", {
    className: "navigation-action"
  }, (path === routes["i" /* SIGNIN */] || path === routes["g" /* HOME */]) && /*#__PURE__*/react_default.a.createElement(react_router_dom["b" /* NavLink */], {
    activeClassName: "navigation-menu-active",
    className: "button button-small",
    exact: true,
    to: routes["j" /* SIGNUP */]
  }, "Sign Up"), (path === routes["j" /* SIGNUP */] || path === routes["f" /* FORGOT_PASSWORD */] || path === routes["g" /* HOME */]) && /*#__PURE__*/react_default.a.createElement(react_router_dom["b" /* NavLink */], {
    activeClassName: "navigation-menu-active",
    className: "button button-small button-muted margin-left-s",
    exact: true,
    to: routes["i" /* SIGNIN */]
  }, "Sign In"))));
};

/* harmony default export */ var ui_Navigation = (Object(react_router["g" /* withRouter */])(Navigation_Navigation));
// CONCATENATED MODULE: ./src/components/ui/Footer.jsx



var Footer_Footer = function Footer(_ref) {
  var path = _ref.path;
  var hiddenPaths = [routes["i" /* SIGNIN */], routes["j" /* SIGNUP */], routes["f" /* FORGOT_PASSWORD */], routes["a" /* ACCOUNT */], routes["b" /* ACCOUNT_EDIT */], routes["c" /* CHECKOUT_STEP_1 */], routes["d" /* CHECKOUT_STEP_2 */], routes["e" /* CHECKOUT_STEP_3 */]];
  return hiddenPaths.includes(path) ? null : /*#__PURE__*/react_default.a.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "footer-col-1"
  }, /*#__PURE__*/react_default.a.createElement("h4", null, "Le March\xE9 \xA0", /*#__PURE__*/react_default.a.createElement("span", null, new Date().getFullYear()))));
};

/* harmony default export */ var ui_Footer = (Footer_Footer);
// CONCATENATED MODULE: ./src/routers/ClientRoute.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var ClientRoute_PrivateRoute = function PrivateRoute(_ref) {
  var isAuth = _ref.isAuth,
      userType = _ref.userType,
      Component = _ref.component,
      path = _ref.path,
      rest = _objectWithoutProperties(_ref, ["isAuth", "userType", "component", "path"]);

  return /*#__PURE__*/react_default.a.createElement(react_router["b" /* Route */], _extends({}, rest, {
    component: function component(props) {
      return isAuth && userType === 'client' ? /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(ui_Navigation, {
        path: path
      }), /*#__PURE__*/react_default.a.createElement(basket_basket, null), /*#__PURE__*/react_default.a.createElement("main", {
        className: "content"
      }, /*#__PURE__*/react_default.a.createElement(Component, props)), /*#__PURE__*/react_default.a.createElement(ui_Footer, {
        path: path
      })) : isAuth && userType === 'admin' ? /*#__PURE__*/react_default.a.createElement(react_router["a" /* Redirect */], {
        to: "/dashboard"
      }) : /*#__PURE__*/react_default.a.createElement(react_router["a" /* Redirect */], {
        to: {
          pathname: routes["i" /* SIGNIN */],
          state: {
            from: props.location
          }
        }
      });
    }
  }));
};

var mapStateToProps = function mapStateToProps(_ref2) {
  var auth = _ref2.auth;
  return {
    isAuth: !!auth.id && !!auth.type,
    userType: auth.type
  };
};

/* harmony default export */ var ClientRoute = (Object(es["b" /* connect */])(mapStateToProps)(ClientRoute_PrivateRoute));
// CONCATENATED MODULE: ./src/routers/PublicRoute.js
function PublicRoute_extends() { PublicRoute_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return PublicRoute_extends.apply(this, arguments); }

function PublicRoute_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = PublicRoute_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function PublicRoute_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var PublicRoute_PublicRoute = function PublicRoute(_ref) {
  var userType = _ref.userType,
      isAuth = _ref.isAuth,
      Component = _ref.component,
      path = _ref.path,
      rest = PublicRoute_objectWithoutProperties(_ref, ["userType", "isAuth", "component", "path"]);

  return /*#__PURE__*/react_default.a.createElement(react_router["b" /* Route */], PublicRoute_extends({}, rest, {
    component: function component(props) {
      var _ref2 = props.location.state || {
        from: {
          pathname: '/'
        }
      },
          from = _ref2.from;

      return isAuth && userType === 'admin' ? /*#__PURE__*/react_default.a.createElement(react_router["a" /* Redirect */], {
        to: "/dashboard"
      }) : isAuth && userType === 'client' && (path === routes["i" /* SIGNIN */] || path === routes["j" /* SIGNUP */]) ? /*#__PURE__*/react_default.a.createElement(react_router["a" /* Redirect */], {
        to: from
      }) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(ui_Navigation, {
        path: path
      }), /*#__PURE__*/react_default.a.createElement(basket_basket, null), /*#__PURE__*/react_default.a.createElement("main", {
        className: "content"
      }, /*#__PURE__*/react_default.a.createElement(Component, props)), /*#__PURE__*/react_default.a.createElement(ui_Footer, {
        path: path
      }));
    }
  }));
};

var PublicRoute_mapStateToProps = function mapStateToProps(_ref3) {
  var auth = _ref3.auth;
  return {
    isAuth: !!auth.id && !!auth.type,
    userType: auth.type
  };
};

/* harmony default export */ var routers_PublicRoute = (Object(es["b" /* connect */])(PublicRoute_mapStateToProps)(PublicRoute_PublicRoute));
// CONCATENATED MODULE: ./src/actions/filterActions.js

var filterActions_setTextFilter = function setTextFilter(keyword) {
  return {
    type: SET_TEXT_FILTER,
    payload: keyword
  };
};
var filterActions_setBrandFilter = function setBrandFilter(brand) {
  return {
    type: SET_BRAND_FILTER,
    payload: brand
  };
};
var filterActions_setMinPriceFilter = function setMinPriceFilter(min) {
  return {
    type: SET_MIN_PRICE_FILTER,
    payload: min
  };
};
var filterActions_setMaxPriceFilter = function setMaxPriceFilter(max) {
  return {
    type: SET_MAX_PRICE_FILTER,
    payload: max
  };
};
var filterActions_resetFilter = function resetFilter() {
  return {
    type: RESET_FILTER
  };
};
var filterActions_clearRecentSearch = function clearRecentSearch() {
  return {
    type: CLEAR_RECENT_SEARCH
  };
};
var filterActions_removeSelectedRecent = function removeSelectedRecent(keyword) {
  return {
    type: REMOVE_SELECTED_RECENT,
    payload: keyword
  };
};
var filterActions_applyFilter = function applyFilter(filters) {
  return {
    type: APPLY_FILTER,
    payload: filters
  };
};
// CONCATENATED MODULE: ./src/selectors/selector.js
var selectFilter = function selectFilter(products, filter) {
  if (!products || products.length === 0) return [];
  var keyword = filter.keyword.toLowerCase();
  return products.filter(function (product) {
    var isInRange = filter.maxPrice ? product.price >= filter.minPrice && product.price <= filter.maxPrice : true;
    var matchKeyword = product.keywords ? product.keywords.includes(keyword) : true;
    var matchName = product.name ? product.name.toLowerCase().includes(keyword) : true;
    var matchDescription = product.description ? product.description.toLowerCase().includes(keyword) : true;
    var matchBrand = product.brand ? product.brand.toLowerCase().includes(filter.brand) : true;
    return (matchKeyword || matchName || matchDescription) && matchBrand && isInRange;
  }).sort(function (a, b) {
    if (filter.sortBy === 'name-desc') {
      return a.name < b.name ? 1 : -1;
    } else if (filter.sortBy === 'name-asc') {
      return a.name > b.name ? 1 : -1;
    } else if (filter.sortBy === 'price-desc') {
      return a.price < b.price ? 1 : -1;
    } else if (filter.sortBy === 'price-asc') {
      return a.price > b.price ? 1 : -1;
    }
  });
}; // Select product with highest price

var selectMax = function selectMax(products) {
  if (!products || products.length === 0) return 0;
  var high = products[0];

  for (var i = 0; i < products.length; i++) {
    if (products[i].price > high.price) {
      high = products[i];
    }
  }

  return Math.floor(high.price);
}; // Select product with lowest price

var selectMin = function selectMin(products) {
  if (!products || products.length === 0) return 0;
  var low = products[0];

  for (var i = 0; i < products.length; i++) {
    if (products[i].price < low.price) {
      low = products[i];
    }
  }

  return Math.floor(low.price);
};
// CONCATENATED MODULE: ./src/components/ui/PriceRange.jsx
function PriceRange_slicedToArray(arr, i) { return PriceRange_arrayWithHoles(arr) || PriceRange_iterableToArrayLimit(arr, i) || PriceRange_unsupportedIterableToArray(arr, i) || PriceRange_nonIterableRest(); }

function PriceRange_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function PriceRange_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return PriceRange_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return PriceRange_arrayLikeToArray(o, minLen); }

function PriceRange_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function PriceRange_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function PriceRange_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var PriceRange_PriceRange = function PriceRange(_ref) {
  var min = _ref.min,
      max = _ref.max,
      initMin = _ref.initMin,
      initMax = _ref.initMax,
      onPriceChange = _ref.onPriceChange,
      productsLength = _ref.productsLength;

  var _useState = Object(react["useState"])(initMin ? initMin : min),
      _useState2 = PriceRange_slicedToArray(_useState, 2),
      minState = _useState2[0],
      setMinState = _useState2[1];

  var _useState3 = Object(react["useState"])(initMax ? initMax : max),
      _useState4 = PriceRange_slicedToArray(_useState3, 2),
      maxState = _useState4[0],
      setMaxState = _useState4[1];

  var slider = Object(react["useRef"])(null);
  var inputMin = Object(react["useRef"])(null);
  var inputMax = Object(react["useRef"])(null);
  var rangeMin = Object(react["useRef"])(null);
  var rangeMax = Object(react["useRef"])(null);
  Object(react["useEffect"])(function () {
    setMinState(initMin ? initMin : min);
    setMaxState(initMax ? initMax : max);
  }, [initMin, initMax]);

  var onRangeChange = function onRangeChange() {
    var slide1 = +rangeMin.current.value;
    var slide2 = +rangeMax.current.value;

    if (slide1 > slide2) {
      var _ref2 = [slide2, slide1];
      slide1 = _ref2[0];
      slide2 = _ref2[1];
    }

    setMinState(slide1);
    setMaxState(slide2);
    onPriceChange(slide1, slide2);
  };

  var onInputChange = function onInputChange() {
    var valMin = +inputMin.current.value;
    var valMax = +inputMax.current.value;

    if (valMin > valMax) {
      var tmp = valMin;
      inputMin.current.value = valMax;
      inputMax.current.value = tmp;
    }

    setMinState(valMin);
    setMaxState(valMax);
    onPriceChange(valMin, valMax);
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "price-range",
    ref: slider
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "price-range-control"
  }, /*#__PURE__*/react_default.a.createElement("input", {
    className: "price-range-input",
    disabled: productsLength === 0,
    max: max,
    min: min,
    onChange: onInputChange,
    ref: inputMin,
    type: "number",
    value: minState
  }), "\u2014", /*#__PURE__*/react_default.a.createElement("input", {
    className: "price-range-input",
    disabled: productsLength === 0,
    max: max,
    min: min,
    onChange: onInputChange,
    ref: inputMax,
    type: "number",
    value: maxState
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "price-range-control"
  }, /*#__PURE__*/react_default.a.createElement("input", {
    className: "price-range-slider",
    disabled: productsLength === 0,
    max: max,
    min: min,
    onChange: onRangeChange,
    ref: rangeMin,
    step: "50",
    type: "range",
    value: minState
  }), /*#__PURE__*/react_default.a.createElement("input", {
    className: "price-range-slider",
    disabled: productsLength === 0,
    max: max,
    min: min,
    onChange: onRangeChange,
    ref: rangeMax,
    step: "20",
    type: "range",
    value: maxState
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "price-range-scale"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "price-range-price"
  }, Object(utils["c" /* displayMoney */])(min)), /*#__PURE__*/react_default.a.createElement("span", {
    className: "price-range-price"
  }, Object(utils["c" /* displayMoney */])(max))));
};

PriceRange_PriceRange.propType = {
  min: prop_types_default.a.number,
  max: prop_types_default.a.number,
  onMaxPriceChange: prop_types_default.a.func,
  onMinPriceChange: prop_types_default.a.func
};
/* harmony default export */ var ui_PriceRange = (PriceRange_PriceRange);
// CONCATENATED MODULE: ./src/components/ui/Filters.jsx
function Filters_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Filters_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Filters_ownKeys(Object(source), true).forEach(function (key) { Filters_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Filters_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Filters_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Filters_slicedToArray(arr, i) { return Filters_arrayWithHoles(arr) || Filters_iterableToArrayLimit(arr, i) || Filters_unsupportedIterableToArray(arr, i) || Filters_nonIterableRest(); }

function Filters_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Filters_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Filters_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Filters_arrayLikeToArray(o, minLen); }

function Filters_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Filters_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Filters_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var Filters_Filters = function Filters(props) {
  var productsLength = props.productsLength,
      products = props.products,
      filter = props.filter,
      isLoading = props.isLoading,
      dispatch = props.dispatch;
  var max = selectMax(products);
  var min = selectMin(products);

  var _useState = Object(react["useState"])(false),
      _useState2 = Filters_slicedToArray(_useState, 2),
      isMounted = _useState2[0],
      setMounted = _useState2[1];

  var _useState3 = Object(react["useState"])({
    brand: filter.brand,
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
    sortBy: filter.sortBy
  }),
      _useState4 = Filters_slicedToArray(_useState3, 2),
      filterField = _useState4[0],
      setFilter = _useState4[1];

  Object(react["useEffect"])(function () {
    // toggleRef && toggleRef.current.classList.remove('is-open-filters');
    document.body.classList.remove('is-open-filters');
    isMounted && window.screen.width <= 480 && props.history.push('/'); // update state upon prop filter change

    setFilter({
      brand: filter.brand,
      minPrice: filter.minPrice,
      maxPrice: filter.maxPrice,
      sortBy: filter.sortBy
    });
    setMounted(true);
    window.scrollTo(0, 0);
  }, [filter.brand, filter.minPrice, filter.maxPrice, filter.sortBy]);

  var onPriceChange = function onPriceChange(min, max) {
    setFilter(Filters_objectSpread(Filters_objectSpread({}, filterField), {}, {
      minPrice: min,
      maxPrice: max
    }));
  };

  var onBrandFilterChange = function onBrandFilterChange(e) {
    var val = e.target.value;
    setFilter(Filters_objectSpread(Filters_objectSpread({}, filterField), {}, {
      brand: val
    }));
  };

  var onSortFilterChange = function onSortFilterChange(e) {
    setFilter(Filters_objectSpread(Filters_objectSpread({}, filterField), {}, {
      sortBy: e.target.value
    }));
  };

  var onApplyFilter = function onApplyFilter() {
    var newFilter = {
      brand: filterField.brand,
      minPrice: filterField.minPrice,
      maxPrice: filterField.maxPrice,
      sortBy: filterField.sortBy
    };

    if (Object.keys(newFilter).some(function (key) {
      return filter[key] !== newFilter[key];
    })) {
      dispatch(filterActions_applyFilter(newFilter));
    }
  };

  var onResetFilter = function onResetFilter() {
    if (['brand', 'minPrice', 'maxPrice', 'sortBy'].some(function (key) {
      return !!filter[key];
    })) {
      dispatch(filterActions_resetFilter());
    }
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "filters"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "filters-field"
  }, /*#__PURE__*/react_default.a.createElement("span", null, "Brand"), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("br", null), productsLength === 0 && isLoading ? /*#__PURE__*/react_default.a.createElement("h5", {
    className: "text-subtle"
  }, "Loading Filter") : /*#__PURE__*/react_default.a.createElement("select", {
    className: "filters-brand",
    value: filterField.brand,
    disabled: isLoading || productsLength === 0,
    onChange: onBrandFilterChange
  }, /*#__PURE__*/react_default.a.createElement("option", {
    value: ""
  }, "All Brands"), /*#__PURE__*/react_default.a.createElement("option", {
    value: "salt"
  }, "Salt Maalat"), /*#__PURE__*/react_default.a.createElement("option", {
    value: "betsin"
  }, "Betsin Maalat"), /*#__PURE__*/react_default.a.createElement("option", {
    value: "black"
  }, "Black Kibal"), /*#__PURE__*/react_default.a.createElement("option", {
    value: "sexbomb"
  }, "Sexbomb"))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "filters-field"
  }, /*#__PURE__*/react_default.a.createElement("span", null, "Sort By"), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("select", {
    className: "filters-sort-by d-block",
    value: filterField.sortBy,
    disabled: isLoading || productsLength === 0,
    onChange: onSortFilterChange
  }, /*#__PURE__*/react_default.a.createElement("option", {
    value: ""
  }, "None"), /*#__PURE__*/react_default.a.createElement("option", {
    value: "name-asc"
  }, "Name Ascending A - Z"), /*#__PURE__*/react_default.a.createElement("option", {
    value: "name-desc"
  }, "Name Descending Z - A"), /*#__PURE__*/react_default.a.createElement("option", {
    value: "price-desc"
  }, "Price High - Low"), /*#__PURE__*/react_default.a.createElement("option", {
    value: "price-asc"
  }, "Price Low - High"))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "filters-field"
  }, /*#__PURE__*/react_default.a.createElement("span", null, "Price Range"), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("br", null), productsLength === 0 && isLoading ? /*#__PURE__*/react_default.a.createElement("h5", {
    className: "text-subtle"
  }, "Loading Filter") : /*#__PURE__*/react_default.a.createElement(ui_PriceRange, {
    min: min,
    max: max,
    initMin: filterField.minPrice,
    initMax: filterField.maxPrice,
    onPriceChange: onPriceChange,
    productsLength: productsLength
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "filters-action"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "filters-button button button-small",
    disabled: isLoading || productsLength === 0,
    onClick: onApplyFilter
  }, "Apply filters"), /*#__PURE__*/react_default.a.createElement("button", {
    className: "filters-button button button-border button-small",
    disabled: isLoading || productsLength === 0,
    onClick: onResetFilter
  }, "Reset filters")));
};

/* harmony default export */ var ui_Filters = (Object(react_router["g" /* withRouter */])(Filters_Filters));
// CONCATENATED MODULE: ./src/components/product/ProductSearch.jsx






var ProductSearch_ProductSearch = function ProductSearch(props) {
  var _useSelector = Object(es["d" /* useSelector */])(function (state) {
    return {
      filter: state.filter,
      products: state.products.items,
      isLoading: state.app.loading,
      productsLength: state.products.length
    };
  }),
      productsLength = _useSelector.productsLength,
      filter = _useSelector.filter,
      products = _useSelector.products,
      isLoading = _useSelector.isLoading;

  var dispatch = Object(es["c" /* useDispatch */])();
  var searchInput = Object(react["useRef"])(null);
  var input = '';
  Object(react["useEffect"])(function () {
    searchInput.current.focus();
  }, []);

  var onSearchChange = function onSearchChange(e) {
    var val = e.target.value.trim();
    input = val;

    if (val === '' && productsLength !== 0) {
      dispatch(filterActions_setTextFilter(val));
      props.history.push('/');
    }
  };

  var onKeyUp = function onKeyUp(e) {
    if (e.keyCode === 13 && productsLength !== 0) {
      dispatch(filterActions_setTextFilter(input));
      props.history.push('/');
    }
  };

  var onClearRecentSearch = function onClearRecentSearch() {
    dispatch(filterActions_clearRecentSearch());
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-search"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-search-header"
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "color-light",
    onClick: props.history.goBack
  }, "Back"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-search-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("input", {
    className: "search-input product-search-input",
    onChange: onSearchChange,
    onKeyUp: onKeyUp,
    placeholder: "Search for product",
    ref: searchInput,
    type: "text"
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "searchbar-icon"
  }))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-search-body"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-search-filter"
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "margin-0"
  }, "Choose Filters")), /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-search-filter-sub"
  }, /*#__PURE__*/react_default.a.createElement(ui_Filters, {
    products: products,
    dispatch: dispatch,
    isLoading: isLoading,
    productsLength: productsLength,
    filter: filter
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-search-recent"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-search-recent-header"
  }, /*#__PURE__*/react_default.a.createElement("h5", null, "Recent Searches"), /*#__PURE__*/react_default.a.createElement("h5", {
    onClick: onClearRecentSearch
  }, "Clear")), filter.recent.map(function (item, index) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "pill-wrapper",
      key: "".concat(item).concat(index)
    }, /*#__PURE__*/react_default.a.createElement("div", {
      className: "pill padding-right-l"
    }, /*#__PURE__*/react_default.a.createElement("h5", {
      className: "pill-title",
      onClick: function onClick() {
        dispatch(filterActions_setTextFilter(item));
        props.history.push('/');
      }
    }, item), /*#__PURE__*/react_default.a.createElement("div", {
      className: "pill-remove",
      onClick: function onClick() {
        return dispatch(filterActions_removeSelectedRecent(item));
      }
    }, /*#__PURE__*/react_default.a.createElement("h5", {
      className: "margin-0"
    }, "x"))));
  }), filter.recent.length === 0 && /*#__PURE__*/react_default.a.createElement("h5", {
    className: "text-subtle"
  }, "No recent searches"))));
};

/* harmony default export */ var product_ProductSearch = (Object(react_router["g" /* withRouter */])(ProductSearch_ProductSearch));
// CONCATENATED MODULE: ./src/hooks/useFieldHandler.js
function useFieldHandler_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function useFieldHandler_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { useFieldHandler_ownKeys(Object(source), true).forEach(function (key) { useFieldHandler_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { useFieldHandler_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useFieldHandler_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useFieldHandler_slicedToArray(arr, i) { return useFieldHandler_arrayWithHoles(arr) || useFieldHandler_iterableToArrayLimit(arr, i) || useFieldHandler_unsupportedIterableToArray(arr, i) || useFieldHandler_nonIterableRest(); }

function useFieldHandler_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useFieldHandler_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useFieldHandler_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useFieldHandler_arrayLikeToArray(o, minLen); }

function useFieldHandler_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useFieldHandler_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useFieldHandler_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var useFieldHandler_useFieldHandler = function useFieldHandler(initState) {
  var _useState = Object(react["useState"])(initState),
      _useState2 = useFieldHandler_slicedToArray(_useState, 2),
      field = _useState2[0],
      setField = _useState2[1];

  var _useState3 = Object(react["useState"])({}),
      _useState4 = useFieldHandler_slicedToArray(_useState3, 2),
      errorField = _useState4[0],
      setErrorField = _useState4[1];

  var onFieldChange = function onFieldChange(e, prop) {
    var optional = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var val = e.target ? e.target.value.trimStart() : '';
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    var nameRegex = /[^a-zA-Z\s]/g;
    var passwordRegex = /[A-Z\W]/g;
    var key = prop.substr(0, 1).toUpperCase().concat(prop.substr(1));

    if (prop === 'email' && !regex.test(val)) {
      setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, "".concat(key, " is invalid"))));
    } else if (prop === 'fullname') {
      val = val.replace(/[^a-zA-Z\s]/g, '').trimStart();

      if (val.length < 5) {
        setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, "".concat(key, " must be at least 5 letters"))));
      } else if (nameRegex.test(val)) {
        setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, "".concat(key, " must not include special characters"))));
      } else {
        setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, '')));
      }
    } else if (prop === 'mobile') {
      val = e.replace(/[^0-9]+/g, '').slice(data.dialCode.length);
      var len = val.toString().length;

      if (len >= 1 && len <= 9) {
        setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, "".concat(key, " number invalid"))));
      } else {
        setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, '')));
      }
    } else if (prop === 'password') {
      if (val.length < 8) {
        setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, "".concat(key, " should be 8 characters long."))));
      } else if (!passwordRegex.test(val)) {
        setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, "".concat(key, " should contain uppercase or special character."))));
      } else {
        setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, '')));
      }
    } else if (val === '' && !optional) {
      setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, "".concat(key, " is required"))));
    } else {
      setErrorField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, errorField), {}, useFieldHandler_defineProperty({}, prop, '')));
    }

    setField(useFieldHandler_objectSpread(useFieldHandler_objectSpread({}, field), {}, useFieldHandler_defineProperty({}, prop, val)));
  };

  return {
    field: field,
    setField: setField,
    onFieldChange: onFieldChange,
    errorField: errorField,
    setErrorField: setErrorField
  };
};

/* harmony default export */ var hooks_useFieldHandler = (useFieldHandler_useFieldHandler);
// CONCATENATED MODULE: ./src/views/auth/SignUp.jsx
function SignUp_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function SignUp_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { SignUp_ownKeys(Object(source), true).forEach(function (key) { SignUp_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { SignUp_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function SignUp_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function SignUp_slicedToArray(arr, i) { return SignUp_arrayWithHoles(arr) || SignUp_iterableToArrayLimit(arr, i) || SignUp_unsupportedIterableToArray(arr, i) || SignUp_nonIterableRest(); }

function SignUp_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function SignUp_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return SignUp_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return SignUp_arrayLikeToArray(o, minLen); }

function SignUp_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function SignUp_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function SignUp_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var SignUp_SignUp = function SignUp(props) {
  var _useState = Object(react["useState"])(true),
      _useState2 = SignUp_slicedToArray(_useState, 2),
      passwordHidden = _useState2[0],
      setPasswordHidden = _useState2[1];

  var _useSelector = Object(es["d" /* useSelector */])(function (state) {
    return {
      isAuthenticating: state.app.isAuthenticating,
      authStatus: state.app.authStatus
    };
  }),
      isAuthenticating = _useSelector.isAuthenticating,
      authStatus = _useSelector.authStatus;

  var _useFieldHandler = hooks_useFieldHandler({
    email: '',
    password: ''
  }),
      field = _useFieldHandler.field,
      setField = _useFieldHandler.setField,
      onFieldChange = _useFieldHandler.onFieldChange,
      errorField = _useFieldHandler.errorField;

  var dispatch = Object(es["c" /* useDispatch */])();
  var passwordField = Object(react["useRef"])(null);
  Object(react["useEffect"])(function () {
    return function () {
      dispatch(authActions_setAuthStatus(null));
      dispatch(authActions_isAuthenticating(false));
    };
  }, []);

  var onEmailInput = function onEmailInput(e) {
    return onFieldChange(e, 'email', false);
  };

  var onFullnameInput = function onFullnameInput(e) {
    return onFieldChange(e, 'fullname', false);
  };

  var onPasswordInput = function onPasswordInput(e) {
    return onFieldChange(e, 'password', false);
  };

  var onFormSubmit = function onFormSubmit(e) {
    e.preventDefault();

    if (field.fullname && field.email && field.password) {
      dispatch(authActions_signUp(SignUp_objectSpread({}, field)));
    }
  };

  var onTogglePasswordVisibility = function onTogglePasswordVisibility() {
    return setPasswordHidden(!passwordHidden);
  };

  var onClickSignIn = function onClickSignIn() {
    return props.history.push('/signin');
  };

  var errorClassName = function errorClassName(key) {
    return errorField[key] ? 'input-error' : '';
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "signup"
  }, authStatus && /*#__PURE__*/react_default.a.createElement("h5", {
    className: "text-center ".concat(authStatus.success ? 'toast-success' : 'toast-error')
  }, authStatus.message), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signup-wrapper ".concat(authStatus && !authStatus.success && 'input-error')
  }, /*#__PURE__*/react_default.a.createElement("h3", null, "Sign up to Marche"), /*#__PURE__*/react_default.a.createElement("form", {
    onSubmit: onFormSubmit
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "signup-field"
  }, errorField.fullname ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.fullname) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Full Name"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('fullname')),
    maxLength: 40,
    onKeyUp: onFullnameInput,
    placeholder: "John Doe",
    readOnly: isAuthenticating,
    style: {
      textTransform: 'capitalize'
    },
    type: "text"
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signup-field"
  }, errorField.email ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.email) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Email"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('email')),
    maxLength: 40,
    onInput: onEmailInput,
    placeholder: "test@example.com",
    readOnly: isAuthenticating,
    type: "email"
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signup-field"
  }, errorField.password ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.password) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Password"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block margin-0 ".concat(errorClassName('password')),
    maxLength: 40,
    onInput: onPasswordInput,
    placeholder: "Password",
    readOnly: isAuthenticating,
    ref: passwordField,
    type: passwordHidden ? 'password' : 'text'
  }), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-small button-muted",
    disabled: isAuthenticating,
    onClick: onTogglePasswordVisibility,
    type: "button"
  }, passwordHidden ? 'Peek' : 'Hide'))), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signup-field signup-action"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button signup-button",
    disabled: isAuthenticating,
    type: "submit"
  }, /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], {
    visible: isAuthenticating,
    theme: "light"
  }), isAuthenticating ? 'Signing Up' : 'Sign Up')))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin-message"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "signin-info"
  }, /*#__PURE__*/react_default.a.createElement("strong", null, "Already have an account?")), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-small button-border button-border-gray",
    disabled: isAuthenticating,
    onClick: onClickSignIn
  }, "Sign In")));
};

/* harmony default export */ var auth_SignUp = (SignUp_SignUp);
// CONCATENATED MODULE: ./src/views/auth/SignIn.jsx
function SignIn_slicedToArray(arr, i) { return SignIn_arrayWithHoles(arr) || SignIn_iterableToArrayLimit(arr, i) || SignIn_unsupportedIterableToArray(arr, i) || SignIn_nonIterableRest(); }

function SignIn_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function SignIn_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return SignIn_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return SignIn_arrayLikeToArray(o, minLen); }

function SignIn_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function SignIn_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function SignIn_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var SignIn_SignIn = function SignIn(props) {
  var _useState = Object(react["useState"])(undefined),
      _useState2 = SignIn_slicedToArray(_useState, 2),
      buttonClicked = _useState2[0],
      setClicked = _useState2[1];

  var dispatch = Object(es["c" /* useDispatch */])();

  var _useFieldHandler = hooks_useFieldHandler({
    email: '',
    password: ''
  }),
      field = _useFieldHandler.field,
      setField = _useFieldHandler.setField,
      onFieldChange = _useFieldHandler.onFieldChange,
      errorField = _useFieldHandler.errorField;

  Object(react["useEffect"])(function () {
    return function () {
      dispatch(authActions_setAuthStatus(null));
      dispatch(authActions_isAuthenticating(false));
    };
  }, []);

  var _useSelector = Object(es["d" /* useSelector */])(function (state) {
    return {
      authStatus: state.app.authStatus,
      isAuthenticating: state.app.isAuthenticating
    };
  }),
      authStatus = _useSelector.authStatus,
      isAuthenticating = _useSelector.isAuthenticating;

  var onEmailInput = function onEmailInput(e) {
    return onFieldChange(e, 'email', false);
  };

  var onPasswordInput = function onPasswordInput(e) {
    return onFieldChange(e, 'password', false);
  };

  var onSubmitForm = function onSubmitForm(e) {
    e.preventDefault();
    var noError = !!field.email && !!field.password && !errorField.email && !errorField.password;

    if (noError) {
      dispatch(authActions_signIn(field.email, field.password));
      setClicked('signin');
    }
  };

  var onSignUp = function onSignUp() {
    return props.history.push('/signup');
  };

  var onSignInWithGoogle = function onSignInWithGoogle() {
    dispatch(authActions_signInWithGoogle());
    setClicked('google');
  };

  var onSignInWithFacebook = function onSignInWithFacebook() {
    dispatch(authActions_signInWithFacebook());
    setClicked('facebook');
  };

  var errorClassName = function errorClassName(field) {
    return errorField[field] ? 'input-error' : '';
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin-content"
  }, authStatus && /*#__PURE__*/react_default.a.createElement("h5", {
    className: "text-center ".concat(authStatus.success ? 'toast-success' : 'toast-error')
  }, authStatus.message), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin ".concat(authStatus && !authStatus.success && 'input-error')
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin-main"
  }, /*#__PURE__*/react_default.a.createElement("h3", null, "Sign in to Marche"), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin-wrapper"
  }, errorField.auth && /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.auth), /*#__PURE__*/react_default.a.createElement("form", {
    onSubmit: onSubmitForm
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin-field"
  }, errorField.email ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.email) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Email"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('email')),
    onChange: onEmailInput,
    placeholder: "test@example.com",
    readOnly: isAuthenticating,
    type: "email"
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin-field"
  }, errorField.password ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.password) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Password"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('password')),
    onChange: onPasswordInput,
    placeholder: "Your Password",
    readOnly: isAuthenticating,
    type: "password"
  })), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin-field signin-action"
  }, /*#__PURE__*/react_default.a.createElement(react_router_dom["a" /* Link */], {
    style: {
      textDecoration: 'underline'
    },
    to: "/forgot_password"
  }, /*#__PURE__*/react_default.a.createElement("span", null, "Forgot password?")), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button signin-button",
    disabled: isAuthenticating,
    type: "submit"
  }, /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], {
    theme: "light",
    visible: isAuthenticating && buttonClicked === 'signin'
  }), isAuthenticating && buttonClicked === 'signin' ? 'Signing In' : 'Sign In'))))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin-divider"
  }, /*#__PURE__*/react_default.a.createElement("h6", null, "OR")), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin-provider"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button signin-provider-button provider-facebook",
    disabled: isAuthenticating,
    onClick: onSignInWithFacebook
  }, /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], {
    theme: "light",
    visible: isAuthenticating && buttonClicked === 'facebook'
  }), "Sign in with Facebook"), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button signin-provider-button provider-google",
    disabled: isAuthenticating,
    onClick: onSignInWithGoogle
  }, /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], {
    theme: "dark",
    visible: isAuthenticating && buttonClicked === 'google'
  }), "Sign in with Google"))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "signin-message"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "signin-info"
  }, /*#__PURE__*/react_default.a.createElement("strong", null, "Don't have an account?")), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-small button-border button-border-gray",
    disabled: isAuthenticating,
    onClick: onSignUp
  }, "Sign Up")));
};

/* harmony default export */ var auth_SignIn = (SignIn_SignIn);
// CONCATENATED MODULE: ./src/views/auth/ForgotPassword.jsx






var ForgotPassword_ForgotPassword = function ForgotPassword() {
  var dispatch = Object(es["c" /* useDispatch */])();

  var _useFieldHandler = hooks_useFieldHandler({
    email: ''
  }),
      field = _useFieldHandler.field,
      setField = _useFieldHandler.setField,
      onFieldChange = _useFieldHandler.onFieldChange,
      errorField = _useFieldHandler.errorField;

  Object(react["useEffect"])(function () {
    return function () {
      dispatch(authActions_setAuthStatus(null));
      dispatch(authActions_isAuthenticating(false));
    };
  }, []);

  var _useSelector = Object(es["d" /* useSelector */])(function (state) {
    return {
      isAuthenticating: state.app.isAuthenticating,
      authStatus: state.app.authStatus
    };
  }),
      authStatus = _useSelector.authStatus,
      isAuthenticating = _useSelector.isAuthenticating;

  var onEmailChange = function onEmailChange(e) {
    return onFieldChange(e, 'email', false);
  };

  var onSubmitEmail = function onSubmitEmail() {
    field.email && !errorField.email && dispatch(authActions_resetPassword(field.email));
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "forgot_password"
  }, authStatus && /*#__PURE__*/react_default.a.createElement("h5", {
    className: "text-center ".concat(authStatus.success ? 'toast-success' : 'toast-error')
  }, authStatus.message), /*#__PURE__*/react_default.a.createElement("h3", null, "Forgot Your Password?"), /*#__PURE__*/react_default.a.createElement("p", null, "Enter your email address and we will send you a password reset email."), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("br", null), errorField.email && /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.email), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorField.email ? 'input-error' : ''),
    onChange: onEmailChange,
    placeholder: "Enter your email",
    readOnly: isAuthenticating,
    type: "text"
  }), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button w-100-mobile",
    disabled: isAuthenticating,
    onClick: onSubmitEmail,
    type: "button"
  }, /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], {
    theme: "light",
    visible: isAuthenticating
  }), isAuthenticating ? 'Sending Password Reset Email' : 'Send Password Reset Email'));
};

/* harmony default export */ var auth_ForgotPassword = (ForgotPassword_ForgotPassword);
// CONCATENATED MODULE: ./src/views/account/tab/UserTab.jsx
function UserTab_slicedToArray(arr, i) { return UserTab_arrayWithHoles(arr) || UserTab_iterableToArrayLimit(arr, i) || UserTab_unsupportedIterableToArray(arr, i) || UserTab_nonIterableRest(); }

function UserTab_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function UserTab_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return UserTab_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return UserTab_arrayLikeToArray(o, minLen); }

function UserTab_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function UserTab_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function UserTab_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var UserTab_UserTab = function UserTab(props) {
  var _useState = Object(react["useState"])(props.children[0].props.index || 0),
      _useState2 = UserTab_slicedToArray(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1];

  var onClickTabItem = function onClickTabItem(index) {
    return setActiveTab(index);
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "user-tab"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "user-tab-nav"
  }, /*#__PURE__*/react_default.a.createElement("ul", {
    className: "user-tab-menu"
  }, props.children.map(function (child) {
    return /*#__PURE__*/react_default.a.createElement("li", {
      className: "user-tab-item ".concat(child.props.index === activeTab ? 'user-tab-active' : ''),
      key: child.props.label,
      onClick: function onClick() {
        return onClickTabItem(child.props.index);
      }
    }, child.props.label);
  }))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "user-tab-content"
  }, props.children.map(function (child) {
    if (child.props.index !== activeTab) return undefined;
    return child.props.children;
  })));
};

/* harmony default export */ var tab_UserTab = (UserTab_UserTab);
// CONCATENATED MODULE: ./src/views/account/UserAccount.jsx



var UserAccountTab = Object(react["lazy"])(function () {
  return __webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(null, 388));
});
var UserWishListTab = Object(react["lazy"])(function () {
  return __webpack_require__.e(/* import() */ 4).then(__webpack_require__.bind(null, 389));
});
var UserOrdersTab = Object(react["lazy"])(function () {
  return __webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(null, 390));
});

var UserAccount_UserAccount = function UserAccount() {
  var Loader = function Loader() {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "loader"
    }, /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], null), /*#__PURE__*/react_default.a.createElement("h6", null, "Loading ... "));
  };

  return /*#__PURE__*/react_default.a.createElement(tab_UserTab, null, /*#__PURE__*/react_default.a.createElement("div", {
    index: 0,
    label: "Account"
  }, /*#__PURE__*/react_default.a.createElement(react["Suspense"], {
    fallback: /*#__PURE__*/react_default.a.createElement(Loader, null)
  }, /*#__PURE__*/react_default.a.createElement(UserAccountTab, null))), /*#__PURE__*/react_default.a.createElement("div", {
    index: 1,
    label: "My Wish List"
  }, /*#__PURE__*/react_default.a.createElement(react["Suspense"], {
    fallback: /*#__PURE__*/react_default.a.createElement(Loader, null)
  }, /*#__PURE__*/react_default.a.createElement(UserWishListTab, null))), /*#__PURE__*/react_default.a.createElement("div", {
    index: 2,
    label: "My Orders"
  }, /*#__PURE__*/react_default.a.createElement(react["Suspense"], {
    fallback: /*#__PURE__*/react_default.a.createElement(Loader, null)
  }, /*#__PURE__*/react_default.a.createElement(UserOrdersTab, null))));
};

/* harmony default export */ var account_UserAccount = (UserAccount_UserAccount);
// EXTERNAL MODULE: ./node_modules/react-phone-input-2/lib/lib.js
var lib_lib = __webpack_require__(118);
var lib_lib_default = /*#__PURE__*/__webpack_require__.n(lib_lib);

// CONCATENATED MODULE: ./src/actions/appActions.js

var appActions_isLoading = function isLoading() {
  var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return {
    type: LOADING,
    payload: bool
  };
};
// CONCATENATED MODULE: ./src/actions/profileActions.js

var profileActions_clearProfile = function clearProfile() {
  return {
    type: CLEAR_PROFILE
  };
};
var profileActions_setProfile = function setProfile(user) {
  return {
    type: SET_PROFILE,
    payload: user
  };
};
var profileActions_updateEmail = function updateEmail(password, newEmail) {
  return {
    type: UPDATE_EMAIL,
    payload: {
      password: password,
      newEmail: newEmail
    }
  };
};
var profileActions_updateProfile = function updateProfile(newProfile) {
  return {
    type: UPDATE_PROFILE,
    payload: {
      updates: newProfile.updates,
      files: newProfile.files,
      credentials: newProfile.credentials
    }
  };
};
var profileActions_updateProfileSuccess = function updateProfileSuccess(updates) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: updates
  };
};
// CONCATENATED MODULE: ./src/hooks/useFileHandler.js
function useFileHandler_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function useFileHandler_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { useFileHandler_ownKeys(Object(source), true).forEach(function (key) { useFileHandler_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { useFileHandler_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useFileHandler_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useFileHandler_slicedToArray(arr, i) { return useFileHandler_arrayWithHoles(arr) || useFileHandler_iterableToArrayLimit(arr, i) || useFileHandler_unsupportedIterableToArray(arr, i) || useFileHandler_nonIterableRest(); }

function useFileHandler_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useFileHandler_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useFileHandler_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useFileHandler_arrayLikeToArray(o, minLen); }

function useFileHandler_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useFileHandler_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useFileHandler_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var useFileHandler_useFileHandler = function useFileHandler(initState) {
  var _useState = Object(react["useState"])(initState),
      _useState2 = useFileHandler_slicedToArray(_useState, 2),
      imageFile = _useState2[0],
      setImageFile = _useState2[1];

  var _useState3 = Object(react["useState"])(false),
      _useState4 = useFileHandler_slicedToArray(_useState3, 2),
      isFileLoading = _useState4[0],
      setFileLoading = _useState4[1];

  var onFileChange = function onFileChange(e, prop) {
    var val = e.target.value;
    var img = e.target.files[0];
    var size = img.size / 1024 / 1024;
    var regex = /(\.jpg|\.jpeg|\.png)$/i;
    setFileLoading(true);

    if (!regex.exec(val)) {
      alert('File type must be JPEG or PNG', 'error');
      setFileLoading(false);
    } else if (size > 0.5) {
      alert('File size exceeded 500kb, consider optimizing your image', 'error');
      setFileLoading(false);
    } else {
      var reader = new FileReader();
      reader.addEventListener('load', function (e) {
        setImageFile(useFileHandler_objectSpread(useFileHandler_objectSpread({}, imageFile), {}, useFileHandler_defineProperty({}, prop, {
          file: img,
          url: e.target.result
        })));
        setFileLoading(false);
      });
      reader.readAsDataURL(img);
    }
  };

  return {
    imageFile: imageFile,
    setImageFile: setImageFile,
    isFileLoading: isFileLoading,
    onFileChange: onFileChange
  };
};

/* harmony default export */ var hooks_useFileHandler = (useFileHandler_useFileHandler);
// CONCATENATED MODULE: ./src/views/account/EditAccount.jsx
function EditAccount_slicedToArray(arr, i) { return EditAccount_arrayWithHoles(arr) || EditAccount_iterableToArrayLimit(arr, i) || EditAccount_unsupportedIterableToArray(arr, i) || EditAccount_nonIterableRest(); }

function EditAccount_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function EditAccount_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return EditAccount_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return EditAccount_arrayLikeToArray(o, minLen); }

function EditAccount_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function EditAccount_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function EditAccount_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }















var EditAccount_EditProfile = function EditProfile(props) {
  Object(react["useEffect"])(function () {
    return function () {
      dispatch(appActions_isLoading(false));
    };
  }, []);

  var _useSelector = Object(es["d" /* useSelector */])(function (state) {
    return {
      profile: state.profile,
      auth: state.auth,
      isLoading: state.app.loading
    };
  }),
      profile = _useSelector.profile,
      auth = _useSelector.auth,
      isLoading = _useSelector.isLoading;

  var dispatch = Object(es["c" /* useDispatch */])();

  var _useFieldHandler = hooks_useFieldHandler({
    fullname: profile.fullname ? profile.fullname : '',
    email: profile.email ? profile.email : '',
    address: profile.address ? profile.address : '',
    mobile: profile.mobile ? profile.mobile : '',
    avatar: profile.avatar ? profile.avatar : '',
    banner: profile.banner ? profile.banner : ''
  }),
      field = _useFieldHandler.field,
      setField = _useFieldHandler.setField,
      onFieldChange = _useFieldHandler.onFieldChange,
      errorField = _useFieldHandler.errorField;

  Object(react["useEffect"])(function () {
    setField(profile);
  }, [profile]);

  var _useState = Object(react["useState"])(false),
      _useState2 = EditAccount_slicedToArray(_useState, 2),
      isOpenModal = _useState2[0],
      setModalOpen = _useState2[1];

  var _useState3 = Object(react["useState"])(null),
      _useState4 = EditAccount_slicedToArray(_useState3, 2),
      password = _useState4[0],
      setPassword = _useState4[1];

  var _useFileHandler = hooks_useFileHandler({
    avatar: {},
    banner: {}
  }),
      imageFile = _useFileHandler.imageFile,
      setImageFile = _useFileHandler.setImageFile,
      isFileLoading = _useFileHandler.isFileLoading,
      onFileChange = _useFileHandler.onFileChange;

  var onEmailChange = function onEmailChange(e) {
    return onFieldChange(e, 'email', false);
  };

  var onFullNameChange = function onFullNameChange(e) {
    return onFieldChange(e, 'fullname', false);
  };

  var onAddressChange = function onAddressChange(e) {
    return onFieldChange(e, 'address', true);
  };

  var onMobileChange = function onMobileChange(mob, data) {
    return onFieldChange(mob, 'mobile', true, data);
  };

  var onCloseModal = function onCloseModal() {
    return setModalOpen(false);
  };

  var onPasswordInput = function onPasswordInput(e) {
    return setPassword(e.target.value.trim());
  };

  var onConfirmUpdate = function onConfirmUpdate() {
    if (password) {
      dispatch(profileActions_updateProfile({
        updates: field,
        files: {
          bannerFile: imageFile.banner.file,
          avatarFile: imageFile.avatar.file
        },
        credentials: {
          email: field.email,
          password: password
        }
      }));
      setModalOpen(false);
    }
  };

  var onSubmitUpdate = function onSubmitUpdate() {
    var noError = Object.keys(errorField).every(function (key) {
      return errorField[key] === '';
    });
    var allFieldsFilled = Object.keys(field).some(function (key) {
      return profile[key] !== field[key];
    });
    var filesUpdated = imageFile.banner.file || imageFile.avatar.file;

    if (noError) {
      if (field.email !== profile.email) {
        setModalOpen(true);
      } else if (allFieldsFilled || filesUpdated) {
        dispatch(profileActions_updateProfile({
          updates: field,
          files: {
            bannerFile: imageFile.banner.file,
            avatarFile: imageFile.avatar.file
          },
          credentials: {}
        }));
      }
    }
  };

  var errorClassName = function errorClassName(key) {
    return errorField[key] ? 'input-error' : '';
  };

  return /*#__PURE__*/react_default.a.createElement(ui_Boundary, null, /*#__PURE__*/react_default.a.createElement("div", {
    className: "edit-user"
  }, /*#__PURE__*/react_default.a.createElement("h3", {
    className: "text-center"
  }, "Edit Account Details"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "user-profile-banner"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "user-profile-banner-wrapper"
  }, /*#__PURE__*/react_default.a.createElement(ImageLoader["a" /* default */], {
    alt: "Banner",
    className: "user-profile-banner-img",
    src: imageFile.banner.url || field.banner
  }), /*#__PURE__*/react_default.a.createElement("input", {
    accept: "image/x-png,image/jpeg",
    disabled: isLoading,
    id: "edit-banner",
    hidden: true,
    onChange: function onChange(e) {
      return onFileChange(e, 'banner');
    },
    type: "file"
  }), isFileLoading ? /*#__PURE__*/react_default.a.createElement("div", {
    className: "loading-wrapper"
  }, /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], {
    visible: true,
    theme: "light"
  })) : /*#__PURE__*/react_default.a.createElement("div", {
    className: "edit-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("label", {
    className: "edit-button edit-banner-button",
    htmlFor: "edit-banner"
  }, "Change"))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "user-profile-avatar-wrapper"
  }, /*#__PURE__*/react_default.a.createElement(ImageLoader["a" /* default */], {
    alt: "Avatar",
    className: "user-profile-img",
    src: imageFile.avatar.url || field.avatar
  }), /*#__PURE__*/react_default.a.createElement("input", {
    accept: "image/x-png,image/jpeg",
    id: "edit-avatar",
    disabled: isLoading,
    hidden: true,
    onChange: function onChange(e) {
      return onFileChange(e, 'avatar');
    },
    type: "file"
  }), isFileLoading ? /*#__PURE__*/react_default.a.createElement("div", {
    className: "loading-wrapper"
  }, /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], {
    visible: true,
    theme: "light"
  })) : /*#__PURE__*/react_default.a.createElement("div", {
    className: "edit-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("label", {
    className: "edit-button edit-avatar-button",
    htmlFor: "edit-avatar"
  }, "Change")))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "user-profile-details"
  }, errorField.fullname ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.fullname) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Full Name"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('fullname')),
    maxLength: 30,
    onChange: onFullNameChange,
    placeholder: "Full Name",
    readOnly: isLoading,
    style: {
      textTransform: 'capitalize'
    },
    type: "text",
    value: field.fullname
  }), errorField.email ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.email) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Email"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('email')),
    maxLength: 40,
    onChange: onEmailChange,
    placeholder: "test@example.com",
    readOnly: auth.provider !== 'password' || isLoading,
    type: "email",
    value: field.email
  }), /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Shipping Address"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block",
    maxLength: 120,
    placeholder: "eg: #245 Brgy. Maligalig, Arayat Pampanga, Philippines",
    onChange: onAddressChange,
    readOnly: isLoading,
    type: "text",
    value: field.address
  }), errorField.mobile && /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.mobile), /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Mobile"), /*#__PURE__*/react_default.a.createElement(lib_lib_default.a, {
    defaultCountry: 'ph',
    disabled: isLoading,
    inputExtraProps: {
      required: true
    },
    inputClass: "input-form d-block ".concat(errorClassName('mobile')),
    masks: {
      'ph': '+.. .... ... ....'
    },
    onChange: onMobileChange,
    placeholder: "09264538861",
    value: field.mobile
  }), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "edit-user-action"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-muted w-100-mobile",
    disabled: isLoading,
    onClick: function onClick() {
      return props.history.push(routes["a" /* ACCOUNT */]);
    }
  }, "Back to Profile"), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button w-100-mobile",
    disabled: isLoading,
    onClick: onSubmitUpdate
  }, /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], {
    visible: isLoading,
    theme: "light"
  }), isLoading ? 'Updating Profile' : 'Update Profile')))), /*#__PURE__*/react_default.a.createElement(ui_Modal, {
    isOpen: isOpenModal,
    onRequestClose: onCloseModal
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "text-center padding-l"
  }, /*#__PURE__*/react_default.a.createElement("h4", null, "Confirm Update"), /*#__PURE__*/react_default.a.createElement("p", null, "To continue updating profile including your \xA0", /*#__PURE__*/react_default.a.createElement("strong", null, "email"), ",", /*#__PURE__*/react_default.a.createElement("br", null), "please confirm by entering your password"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block",
    onChange: onPasswordInput,
    placeholder: "Enter your password",
    type: "password"
  })), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-flex-center"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button",
    onClick: onConfirmUpdate
  }, "Confirm")), /*#__PURE__*/react_default.a.createElement("button", {
    className: "modal-close-button button button-border button-border-gray button-small",
    onClick: onCloseModal
  }, "X")));
};

/* harmony default export */ var EditAccount = (EditAccount_EditProfile);
// CONCATENATED MODULE: ./src/actions/productActions.js

var productActions_getProducts = function getProducts(lastRef) {
  return {
    type: GET_PRODUCTS,
    payload: lastRef
  };
};
var productActions_getProductsSuccess = function getProductsSuccess(products) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: products
  };
};
var productActions_cancelGetProducts = function cancelGetProducts() {
  return {
    type: CANCEL_GET_PRODUCTS
  };
};
var productActions_addProduct = function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    payload: product
  };
};
var productActions_addProductSuccess = function addProductSuccess(product) {
  return {
    type: ADD_PRODUCT_SUCCESS,
    payload: product
  };
};
var productActions_removeProduct = function removeProduct(id) {
  return {
    type: REMOVE_PRODUCT,
    payload: id
  };
};
var productActions_removeProductSuccess = function removeProductSuccess(id) {
  return {
    type: REMOVE_PRODUCT_SUCCESS,
    payload: id
  };
};
var productActions_editProduct = function editProduct(id, updates) {
  return {
    type: EDIT_PRODUCT,
    payload: {
      id: id,
      updates: updates
    }
  };
};
var productActions_editProductSuccess = function editProductSuccess(updates) {
  return {
    type: EDIT_PRODUCT_SUCCESS,
    payload: updates
  };
};
// CONCATENATED MODULE: ./src/components/product/ProductList.jsx
function ProductList_slicedToArray(arr, i) { return ProductList_arrayWithHoles(arr) || ProductList_iterableToArrayLimit(arr, i) || ProductList_unsupportedIterableToArray(arr, i) || ProductList_nonIterableRest(); }

function ProductList_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function ProductList_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ProductList_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ProductList_arrayLikeToArray(o, minLen); }

function ProductList_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ProductList_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ProductList_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var ProductList_ProductList = function ProductList(_ref) {
  var isLoading = _ref.isLoading,
      requestStatus = _ref.requestStatus,
      productsLength = _ref.productsLength,
      filteredProductsLength = _ref.filteredProductsLength,
      lastRefKey = _ref.lastRefKey,
      totalItems = _ref.totalItems,
      dispatch = _ref.dispatch,
      children = _ref.children;

  var _useState = Object(react["useState"])(0),
      _useState2 = ProductList_slicedToArray(_useState, 2),
      lastScrollPos = _useState2[0],
      setLastScrollPos = _useState2[1];

  var _useState3 = Object(react["useState"])(false),
      _useState4 = ProductList_slicedToArray(_useState3, 2),
      isFetching = _useState4[0],
      setFetching = _useState4[1];

  var _useState5 = Object(react["useState"])(false),
      _useState6 = ProductList_slicedToArray(_useState5, 2),
      scrolledAtBottom = _useState6[0],
      setScrolledAtBottom = _useState6[1];

  Object(react["useEffect"])(function () {
    if (productsLength === 0) {
      fetchProducts();
    }

    return function () {
      return dispatch(appActions_isLoading(false));
    };
  }, []);
  Object(react["useEffect"])(function () {
    window.scrollTo(0, lastScrollPos);
    setFetching(false);
  }, [lastRefKey]); // watch for changes on lastRefKey, if it changes that means new products have been fetched.

  Object(react["useEffect"])(function () {
    window.addEventListener('scroll', watchForScroll);
    return function () {
      return window.removeEventListener('scroll', watchForScroll);
    };
  }, [lastRefKey, isLoading]); // re-add event listener since the height of the window has increased for fetching new items.

  var watchForScroll = function watchForScroll() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = winScroll / height; // value of 1 means it's at the bottom

    if (scrolled === 1 && !!lastRefKey && !isLoading && productsLength < totalItems) {
      setLastScrollPos(window.pageYOffset);
      setScrolledAtBottom(true);
      window.removeEventListener('scroll', watchForScroll);
    }
  };

  var fetchProducts = function fetchProducts() {
    setFetching(true);
    dispatch(productActions_getProducts(lastRefKey));
  };

  return filteredProductsLength === 0 && !isLoading && !requestStatus ? /*#__PURE__*/react_default.a.createElement("div", {
    className: "loader"
  }, /*#__PURE__*/react_default.a.createElement("h3", {
    className: "text-center"
  }, "There are no items found"), /*#__PURE__*/react_default.a.createElement("span", null, "Try using correct filters and keyword")) : requestStatus ? /*#__PURE__*/react_default.a.createElement("div", {
    className: "loader"
  }, /*#__PURE__*/react_default.a.createElement("h3", {
    className: "text-center"
  }, requestStatus), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-small",
    onClick: fetchProducts
  }, "Try again")) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, children, scrolledAtBottom && productsLength < totalItems && /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-flex-center padding-l"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-small",
    disabled: isFetching,
    onClick: fetchProducts
  }, isFetching ? 'Fetching Items...' : 'Fetch More Items')), !isFetching && productsLength >= totalItems && /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-flex-center padding-l"
  }, /*#__PURE__*/react_default.a.createElement("span", null, "End of result.")));
};

ProductList_ProductList.propType = {
  isLoading: prop_types_default.a.bool.isRequired,
  requestStatus: prop_types_default.a.string.isRequired,
  productsLength: prop_types_default.a.number.isRequired,
  filteredProductsLength: prop_types_default.a.number.isRequired,
  dispatch: prop_types_default.a.func.isRequired
};
/* harmony default export */ var product_ProductList = (ProductList_ProductList);
// EXTERNAL MODULE: ./node_modules/react-loading-skeleton/dist/bundle.js
var bundle = __webpack_require__(67);
var bundle_default = /*#__PURE__*/__webpack_require__.n(bundle);

// CONCATENATED MODULE: ./src/components/product/ProductItem.jsx







var ProductItem_ProductItem = function ProductItem(_ref) {
  var product = _ref.product,
      onOpenModal = _ref.onOpenModal,
      onClickProduct = _ref.onClickProduct,
      dispatch = _ref.dispatch,
      foundOnBasket = _ref.foundOnBasket;

  var onClickItem = function onClickItem() {
    if (product.id) {
      onOpenModal();
      onClickProduct(product);
    }
  };

  var onAddToBasket = function onAddToBasket() {
    if (foundOnBasket(product.id)) {
      dispatch(basketActions_removeFromBasket(product.id));
      Object(utils["a" /* displayActionMessage */])('Item removed from basket', 'info');
    } else {
      dispatch(basketActions_addToBasket(product));
      Object(utils["a" /* displayActionMessage */])('Item added to basket', 'success');
    }
  };

  return /*#__PURE__*/react_default.a.createElement(bundle["SkeletonTheme"], {
    color: "#e1e1e1",
    highlightColor: "#f2f2f2"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-card ".concat(!product.id ? 'product-loading' : ''),
    style: {
      border: foundOnBasket(product.id) ? '1px solid #cacaca' : '',
      boxShadow: foundOnBasket(product.id) ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
    }
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-card-content",
    onClick: onClickItem
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-card-img-wrapper"
  }, product.image ? /*#__PURE__*/react_default.a.createElement(ImageLoader["a" /* default */], {
    className: "product-card-img",
    src: product.image
  }) : /*#__PURE__*/react_default.a.createElement(bundle_default.a, {
    width: 100,
    height: 70
  })), /*#__PURE__*/react_default.a.createElement("h5", {
    className: "product-card-name text-overflow-ellipsis margin-auto"
  }, product.name || /*#__PURE__*/react_default.a.createElement(bundle_default.a, {
    width: 80
  })), /*#__PURE__*/react_default.a.createElement("p", {
    className: "product-card-brand"
  }, product.brand || /*#__PURE__*/react_default.a.createElement(bundle_default.a, {
    width: 60
  })), /*#__PURE__*/react_default.a.createElement("h4", {
    className: "product-card-price"
  }, product.price ? Object(utils["c" /* displayMoney */])(product.price) : /*#__PURE__*/react_default.a.createElement(bundle_default.a, {
    width: 40
  }))), product.id && /*#__PURE__*/react_default.a.createElement("button", {
    className: "product-card-button button-small button button-block ".concat(foundOnBasket(product.id) ? 'button-border button-border-gray' : ''),
    onClick: onAddToBasket
  }, foundOnBasket(product.id) ? 'Remove from basket' : 'Add to basket')));
};

ProductItem_ProductItem.propType = {
  onClickItem: prop_types_default.a.func,
  dispatch: prop_types_default.a.func.isRequired,
  product: prop_types_default.a.object.isRequired,
  onOpenModal: prop_types_default.a.func,
  foundOnBasket: prop_types_default.a.func.isRequired
};
/* harmony default export */ var product_ProductItem = (ProductItem_ProductItem);
// CONCATENATED MODULE: ./src/components/product/ProductAppliedFilters.jsx





var ProductAppliedFilters_ProductAppliedFilters = function ProductAppliedFilters(_ref) {
  var filter = _ref.filter;
  var dispatch = Object(es["c" /* useDispatch */])();
  var fields = ['brand', 'minPrice', 'maxPrice', 'sortBy', 'keyword'];

  var onRemoveKeywordFilter = function onRemoveKeywordFilter() {
    dispatch(filterActions_applyFilter({
      keyword: ''
    }));
  };

  var onRemovePriceRangeFilter = function onRemovePriceRangeFilter() {
    dispatch(filterActions_applyFilter({
      minPrice: 0,
      maxPrice: 0
    }));
  };

  var onRemoveBrandFilter = function onRemoveBrandFilter() {
    dispatch(filterActions_applyFilter({
      brand: ''
    }));
  };

  var onRemoveSortFilter = function onRemoveSortFilter() {
    dispatch(filterActions_applyFilter({
      sortBy: ''
    }));
  };

  return !fields.some(function (key) {
    return !!filter[key];
  }) ? null : /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-applied-filters"
  }, filter.keyword && /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block"
  }, "Keyword"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill padding-right-l"
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "margin-0"
  }, filter.keyword), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill-remove",
    onClick: onRemoveKeywordFilter
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "margin-0 text-subtle"
  }, "x")))), filter.brand && /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block"
  }, "Brand"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill padding-right-l"
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "margin-0"
  }, filter.brand), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill-remove",
    onClick: onRemoveBrandFilter
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "margin-0 text-subtle"
  }, "x")))), (!!filter.minPrice || !!filter.maxPrice) && /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block"
  }, "Price Range"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill padding-right-l"
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "margin-0"
  }, "$", filter.minPrice, " - $", filter.maxPrice), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill-remove",
    onClick: onRemovePriceRangeFilter
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "margin-0 text-subtle"
  }, "x")))), filter.sortBy && /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block"
  }, "Sort By"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill padding-right-l"
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "margin-0"
  }, filter.sortBy === 'price-desc' ? 'Price High - Low' : filter.sortBy === 'price-asc' ? 'Price Low - High' : filter.sortBy === 'name-desc' ? 'Name Z - A' : 'Name A - Z'), /*#__PURE__*/react_default.a.createElement("div", {
    className: "pill-remove",
    onClick: onRemoveSortFilter
  }, /*#__PURE__*/react_default.a.createElement("h5", {
    className: "margin-0 text-subtle"
  }, "x")))));
};

ProductAppliedFilters_ProductAppliedFilters.propType = {
  filter: prop_types_default.a.shape({
    brand: prop_types_default.a.string,
    keyword: prop_types_default.a.string,
    minPrice: prop_types_default.a.number,
    maxPrice: prop_types_default.a.number
  })
};
/* harmony default export */ var product_ProductAppliedFilters = (ProductAppliedFilters_ProductAppliedFilters);
// CONCATENATED MODULE: ./src/views/home/Header.jsx
function Header_slicedToArray(arr, i) { return Header_arrayWithHoles(arr) || Header_iterableToArrayLimit(arr, i) || Header_unsupportedIterableToArray(arr, i) || Header_nonIterableRest(); }

function Header_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Header_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Header_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Header_arrayLikeToArray(o, minLen); }

function Header_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Header_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Header_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var Header_Header = function Header(_ref) {
  var dispatch = _ref.dispatch,
      filter = _ref.filter,
      isLoading = _ref.isLoading,
      products = _ref.products,
      productsLength = _ref.productsLength,
      filteredProductsLength = _ref.filteredProductsLength,
      history = _ref.history;

  var _useState = Object(react["useState"])(filter.keyword),
      _useState2 = Header_slicedToArray(_useState, 2),
      searchInput = _useState2[0],
      setSearchInput = _useState2[1];

  var searchbarRef = Object(react["useRef"])(null);
  Object(react["useEffect"])(function () {
    setSearchInput(filter.keyword);
  }, [filter.keyword]);
  Object(react["useEffect"])(function () {
    document.addEventListener('click', watchForClick);
    return function () {
      document.removeEventListener('click', watchForClick);
    };
  }, []);
  var isFiltered = ['keyword', 'brand', 'minPrice', 'maxPrice', 'sortBy'].some(function (key) {
    return !!filter[key];
  });
  var isMobile = window.screen.width <= 480 ? true : false;

  var onSearchChange = function onSearchChange(e) {
    var val = e.target.value.trimStart();
    setSearchInput(val);
  };

  var onKeyUp = function onKeyUp(e) {
    if (e.keyCode === 13 && productsLength !== 0) {
      dispatch(filterActions_setTextFilter(searchInput));
      e.target.blur();
      searchbarRef.current.classList.remove('is-open-recent-search');
      isMobile && history.push('/');
    }
  };

  var onFocusInput = function onFocusInput(e) {
    e.target.select();
    searchbarRef.current.classList.add('is-open-recent-search');
  };

  var onClickToggle = function onClickToggle() {
    if (document.body.classList.contains('is-open-filters')) {
      document.body.classList.remove('is-open-filters');
    } else {
      document.body.classList.add('is-open-filters');
    }
  };

  var onClickRecentSearch = function onClickRecentSearch(keyword) {
    dispatch(filterActions_setTextFilter(keyword));
    searchbarRef.current.classList.remove('is-open-recent-search');
  };

  var watchForClick = function watchForClick(e) {
    var toggleClosest = e.target.closest('.filters-toggle');
    var searchbarClosest = e.target.closest('.searchbar-recent');
    var searchbarInput = e.target.closest('.searchbar-input');
    var searchBarRemove = e.target.closest('.searchbar-recent-button');

    try {
      if (!toggleClosest && document.body.classList.contains('is-open-filters')) {
        document.body.classList.remove('is-open-filters');
      }

      if (!searchbarClosest && !searchbarInput && !searchBarRemove) {
        searchbarRef.current.classList.remove('is-open-recent-search');
      }
    } catch (e) {}
  };

  var onClearRecent = function onClearRecent() {
    dispatch(filterActions_clearRecentSearch());
  };

  var onResetFilter = function onResetFilter() {
    dispatch(filterActions_resetFilter());
  };

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-list-header-title"
  }, isFiltered ? /*#__PURE__*/react_default.a.createElement("h3", null, filteredProductsLength === 0 ? "No product found" : "Found ".concat(filteredProductsLength, " ").concat(filteredProductsLength > 1 ? 'products' : 'product')) : /*#__PURE__*/react_default.a.createElement("h3", null, "Eyewear")), /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-list-header-actions"
  }, isFiltered && /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-muted button-small",
    onClick: onResetFilter
  }, "Reset Filters"), "\xA0", /*#__PURE__*/react_default.a.createElement("div", {
    className: "filters-toggle"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-small button-border button-border-gray",
    disabled: isLoading,
    onClick: onClickToggle
  }, "Filters", /*#__PURE__*/react_default.a.createElement("div", {
    className: "filters-toggle-caret icon-caret"
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "filters-toggle-sub"
  }, /*#__PURE__*/react_default.a.createElement(ui_Filters, {
    dispatch: dispatch,
    products: products,
    productsLength: productsLength,
    filter: filter,
    isLoading: isLoading
  }))), "\xA0", /*#__PURE__*/react_default.a.createElement("div", {
    className: "searchbar",
    ref: searchbarRef
  }, /*#__PURE__*/react_default.a.createElement("input", {
    className: "search-input searchbar-input",
    onChange: onSearchChange,
    onKeyUp: onKeyUp,
    onFocus: onFocusInput,
    placeholder: "Filter products by keyword",
    readOnly: isLoading,
    type: "text",
    value: searchInput
  }), filter.recent.length !== 0 && /*#__PURE__*/react_default.a.createElement("div", {
    className: "searchbar-recent"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "searchbar-recent-header"
  }, /*#__PURE__*/react_default.a.createElement("h5", null, "Recent Search"), /*#__PURE__*/react_default.a.createElement("h5", {
    className: "searchbar-recent-clear text-subtle",
    onClick: onClearRecent
  }, "Clear")), filter.recent.map(function (item) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "searchbar-recent-wrapper",
      key: "search-".concat(item)
    }, /*#__PURE__*/react_default.a.createElement("h5", {
      className: "searchbar-recent-keyword margin-0",
      onClick: function onClick() {
        return onClickRecentSearch(item);
      }
    }, item), /*#__PURE__*/react_default.a.createElement("span", {
      className: "searchbar-recent-button text-subtle",
      onClick: function onClick() {
        return dispatch(filterActions_removeSelectedRecent(item));
      }
    }, "X"));
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "searchbar-icon",
    style: {
      opacity: isLoading ? .5 : 1
    }
  }))));
};

/* harmony default export */ var home_Header = (Header_Header);
// CONCATENATED MODULE: ./src/components/product/ProductModalDetails.jsx






var ProductModalDetails_ProductModalDetails = function ProductModalDetails(_ref) {
  var product = _ref.product,
      dispatch = _ref.dispatch,
      foundOnBasket = _ref.foundOnBasket;

  var onAddToBasket = function onAddToBasket() {
    if (foundOnBasket(product.id)) {
      dispatch(basketActions_removeFromBasket(product.id));
      Object(utils["a" /* displayActionMessage */])('Item removed from basket', 'info');
    } else {
      dispatch(basketActions_addToBasket(product));
      Object(utils["a" /* displayActionMessage */])('Item added to basket', 'success');
    }
  };

  return !product ? null : /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-modal"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-modal-image-wrapper"
  }, /*#__PURE__*/react_default.a.createElement(ImageLoader["a" /* default */], {
    alt: product.name,
    className: "product-modal-image",
    src: product.image
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-modal-details"
  }, /*#__PURE__*/react_default.a.createElement("h3", null, product.name), /*#__PURE__*/react_default.a.createElement("span", null, "Brand: ", /*#__PURE__*/react_default.a.createElement("strong", null, product.brand)), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("span", null, "Description:\xA0"), /*#__PURE__*/react_default.a.createElement("span", null, product.description), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("h1", null, Object(utils["c" /* displayMoney */])(product.price)), /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-modal-action"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-small ".concat(foundOnBasket(product.id) ? 'button-border button-border-gray' : ''),
    onClick: onAddToBasket
  }, foundOnBasket(product.id) ? 'Remove From Basket' : 'Add To Basket'))));
};

ProductModalDetails_ProductModalDetails.propType = {
  product: prop_types_default.a.object.isRequired,
  addToBasket: prop_types_default.a.func.isRequired,
  foundOnBasket: prop_types_default.a.func.isRequired
};
/* harmony default export */ var product_ProductModalDetails = (ProductModalDetails_ProductModalDetails);
// CONCATENATED MODULE: ./src/views/home/Home.jsx
function Home_slicedToArray(arr, i) { return Home_arrayWithHoles(arr) || Home_iterableToArrayLimit(arr, i) || Home_unsupportedIterableToArray(arr, i) || Home_nonIterableRest(); }

function Home_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Home_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Home_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Home_arrayLikeToArray(o, minLen); }

function Home_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Home_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Home_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var Home_Home = function Home(props) {
  var _useState = Object(react["useState"])(false),
      _useState2 = Home_slicedToArray(_useState, 2),
      isOpenModal = _useState2[0],
      setModalOpen = _useState2[1];

  var _useState3 = Object(react["useState"])(null),
      _useState4 = Home_slicedToArray(_useState3, 2),
      productSelected = _useState4[0],
      setProductSelected = _useState4[1];

  var _useState5 = Object(react["useState"])(6),
      _useState6 = Home_slicedToArray(_useState5, 2),
      columnCount = _useState6[0],
      setColumnCount = _useState6[1];

  var _useSelector = Object(es["d" /* useSelector */])(function (state) {
    return {
      store: {
        productsLength: state.products.items.length,
        products: state.products.items,
        filter: state.filter,
        basket: state.basket,
        lastRefKey: state.products.lastRefKey,
        totalItems: state.products.total,
        isLoading: state.app.loading,
        filteredProducts: selectFilter(state.products.items, state.filter),
        requestStatus: state.app.requestStatus
      }
    };
  }),
      store = _useSelector.store;

  Object(react["useEffect"])(function () {
    onProductsLengthChanged(); // console.log(store.filteredProducts);
    // console.log(store.filteredProducts.length);
  }, [store.filteredProducts]);
  var dispatch = Object(es["c" /* useDispatch */])();
  var productListWrapper = Object(react["useRef"])(null);

  var onProductsLengthChanged = function onProductsLengthChanged() {
    var width = window.screen.width - 250; // minus 250px padding

    setColumnCount(Math.floor(width / 160));

    if (columnCount >= store.filteredProducts.length && store.filteredProducts.length !== 0) {
      setColumnCount(store.filteredProducts.length);
    }
  };

  var onClickProduct = function onClickProduct(product) {
    return setProductSelected(product);
  };

  var foundOnBasket = function foundOnBasket(id) {
    return !!store.basket.find(function (item) {
      return item.id === id;
    });
  };

  var onOpenModal = function onOpenModal() {
    return setModalOpen(true);
  };

  var onCloseModal = function onCloseModal() {
    return setModalOpen(false);
  };

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("section", {
    className: "product-list-wrapper"
  }, !store.requestStatus && /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-list-header"
  }, /*#__PURE__*/react_default.a.createElement(home_Header, {
    dispatch: dispatch,
    products: store.products,
    productsLength: store.productsLength,
    filteredProductsLength: store.filteredProducts.length,
    filter: store.filter,
    isLoading: store.isLoading
  })), /*#__PURE__*/react_default.a.createElement(product_ProductAppliedFilters, {
    filter: store.filter
  }), /*#__PURE__*/react_default.a.createElement(ui_Boundary, null, /*#__PURE__*/react_default.a.createElement(product_ProductList, {
    dispatch: dispatch,
    productsLength: store.productsLength,
    filteredProductsLength: store.filteredProducts.length,
    foundOnBasket: foundOnBasket,
    isLoading: store.isLoading,
    lastRefKey: store.lastRefKey,
    totalItems: store.totalItems,
    requestStatus: store.requestStatus
  }, /*#__PURE__*/react_default.a.createElement(ui_Modal, {
    isOpen: isOpenModal,
    onRequestClose: onCloseModal
  }, /*#__PURE__*/react_default.a.createElement(product_ProductModalDetails, {
    product: productSelected,
    dispatch: dispatch,
    foundOnBasket: foundOnBasket
  }), /*#__PURE__*/react_default.a.createElement("button", {
    className: "modal-close-button button-muted button-small",
    onClick: onCloseModal
  }, "X")), /*#__PURE__*/react_default.a.createElement("div", {
    className: "product-list",
    ref: productListWrapper,
    style: {
      gridTemplateColumns: "repeat(".concat(columnCount, ", 160px)")
    }
  }, store.filteredProducts.length === 0 ? new Array(14).fill({}).map(function (product, index) {
    return /*#__PURE__*/react_default.a.createElement(product_ProductItem, {
      foundOnBasket: foundOnBasket,
      key: "product-skeleton ".concat(index),
      product: product
    });
  }) : store.filteredProducts.map(function (product) {
    return /*#__PURE__*/react_default.a.createElement(product_ProductItem, {
      foundOnBasket: foundOnBasket,
      dispatch: dispatch,
      key: product.id,
      onOpenModal: onOpenModal,
      onClickProduct: onClickProduct,
      product: product
    });
  }))))));
};

/* harmony default export */ var home_Home = (Home_Home);
// CONCATENATED MODULE: ./src/views/checkout/header/CheckOutHeader.jsx


var CheckOutHeader_CheckOutHeader = function CheckOutHeader(_ref) {
  var current = _ref.current;

  var className = function className(step) {
    return current === step ? "is-active-step" : step < current ? "is-done-step" : '';
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-header"
  }, /*#__PURE__*/react_default.a.createElement("ul", {
    className: "checkout-header-menu"
  }, /*#__PURE__*/react_default.a.createElement("li", {
    className: "checkout-header-list ".concat(className(1))
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-header-item"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-header-icon"
  }, /*#__PURE__*/react_default.a.createElement("h4", {
    className: "checkout-header-step"
  }, "1")), /*#__PURE__*/react_default.a.createElement("h6", {
    className: "checkout-header-subtitle"
  }, "Order Summary"))), /*#__PURE__*/react_default.a.createElement("li", {
    className: "checkout-header-list ".concat(className(2))
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-header-item"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-header-icon"
  }, /*#__PURE__*/react_default.a.createElement("h4", {
    className: "checkout-header-step"
  }, "2")), /*#__PURE__*/react_default.a.createElement("h6", {
    className: "checkout-header-subtitle"
  }, "Shipping Details"))), /*#__PURE__*/react_default.a.createElement("li", {
    className: "checkout-header-list ".concat(className(3))
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-header-item"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-header-icon"
  }, /*#__PURE__*/react_default.a.createElement("h4", {
    className: "checkout-header-step"
  }, "3")), /*#__PURE__*/react_default.a.createElement("h6", {
    className: "checkout-header-subtitle"
  }, "Payment")))));
};

/* harmony default export */ var header_CheckOutHeader = (CheckOutHeader_CheckOutHeader);
// CONCATENATED MODULE: ./src/views/checkout/hoc/withAuth.js
function withAuth_extends() { withAuth_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return withAuth_extends.apply(this, arguments); }






var withAuth_withAuth = function withAuth(Component) {
  return Object(react_router["g" /* withRouter */])(function (props) {
    var _useSelector = Object(es["d" /* useSelector */])(function (state) {
      return {
        isAuth: !!state.auth.id && !!state.auth.type,
        basket: state.basket,
        shipping: state.checkout.shipping,
        profile: state.profile
      };
    }),
        isAuth = _useSelector.isAuth,
        basket = _useSelector.basket,
        profile = _useSelector.profile,
        shipping = _useSelector.shipping;

    var dispatch = Object(es["c" /* useDispatch */])();

    var calculateSubTotal = function calculateSubTotal() {
      var total = 0;

      if (basket.length !== 0) {
        var result = basket.map(function (product) {
          return product.price * product.quantity;
        }).reduce(function (a, b) {
          return a + b;
        });
        total = result;
      }

      return total;
    };

    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, !isAuth ? /*#__PURE__*/react_default.a.createElement(react_router["a" /* Redirect */], {
      to: "/signin"
    }) : basket.length === 0 ? /*#__PURE__*/react_default.a.createElement(react_router["a" /* Redirect */], {
      to: "/"
    }) : null, /*#__PURE__*/react_default.a.createElement(Component, withAuth_extends({}, props, {
      basket: basket,
      subtotal: calculateSubTotal(),
      dispatch: dispatch,
      profile: profile,
      shipping: shipping
    })));
  });
};

/* harmony default export */ var hoc_withAuth = (withAuth_withAuth);
// CONCATENATED MODULE: ./src/views/checkout/step1/OrderSummary.jsx






var OrderSummary_OrderSummary = function OrderSummary(_ref) {
  var basket = _ref.basket,
      subtotal = _ref.subtotal,
      dispatch = _ref.dispatch,
      history = _ref.history;

  var onContinue = function onContinue() {
    history.push('/');
  };

  var onNext = function onNext() {
    history.push('/checkout/step2');
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout"
  }, /*#__PURE__*/react_default.a.createElement(header_CheckOutHeader, {
    current: 1
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-step-1"
  }, /*#__PURE__*/react_default.a.createElement("h3", {
    className: "text-center"
  }, "Order Summary"), /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block text-center"
  }, "Review items in your basket."), /*#__PURE__*/react_default.a.createElement("br", null), basket.map(function (product) {
    return /*#__PURE__*/react_default.a.createElement(basket_BasketItem, {
      key: product.id,
      product: product,
      basket: basket,
      dispatch: dispatch
    });
  }), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-total text-right"
  }, /*#__PURE__*/react_default.a.createElement("p", {
    className: "basket-total-title"
  }, "Subtotal:"), /*#__PURE__*/react_default.a.createElement("h2", {
    className: "basket-total-amount"
  }, Object(utils["c" /* displayMoney */])(subtotal))), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-shipping-action padding-0"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-muted",
    onClick: onContinue
  }, "Continue Shopping"), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button",
    onClick: onNext
  }, "Next Step"))));
};

/* harmony default export */ var step1_OrderSummary = (hoc_withAuth(OrderSummary_OrderSummary));
// CONCATENATED MODULE: ./src/actions/checkoutActions.js

var checkoutActions_setShippingDetails = function setShippingDetails(details) {
  return {
    type: SET_CHECKOUT_SHIPPING_DETAILS,
    payload: details
  };
};
var checkoutActions_resetShippingDetails = function resetShippingDetails() {
  return {
    type: RESET_CHECKOUT_SHIPPING_DETAILS
  };
};
// CONCATENATED MODULE: ./src/views/checkout/step2/ShippingDetails.jsx
function ShippingDetails_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function ShippingDetails_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ShippingDetails_ownKeys(Object(source), true).forEach(function (key) { ShippingDetails_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ShippingDetails_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ShippingDetails_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var ShippingDetails_ShippingDetails = function ShippingDetails(_ref) {
  var profile = _ref.profile,
      dispatch = _ref.dispatch,
      shipping = _ref.shipping,
      subtotal = _ref.subtotal,
      history = _ref.history;

  var _useFieldHandler = hooks_useFieldHandler({
    fullname: profile.fullname ? profile.fullname : '',
    email: profile.email ? profile.email : '',
    address: profile.address ? profile.address : shipping.address ? shipping.address : '',
    mobile: profile.mobile ? profile.mobile : shipping.mobile ? shipping.mobile : '',
    isDone: false
  }),
      field = _useFieldHandler.field,
      setField = _useFieldHandler.setField,
      onFieldChange = _useFieldHandler.onFieldChange,
      errorField = _useFieldHandler.errorField;

  var onFullNameInput = function onFullNameInput(e) {
    return onFieldChange(e, 'fullname', false);
  };

  var onEmailInput = function onEmailInput(e) {
    return onFieldChange(e, 'email', false);
  };

  var onAddressInput = function onAddressInput(e) {
    return onFieldChange(e, 'address', false);
  };

  var onMobileInput = function onMobileInput(e, data) {
    onFieldChange(e, 'mobile', false, data);
  };

  var errorClassName = function errorClassName(key) {
    return errorField[key] ? 'input-error' : '';
  };

  var onClickNext = function onClickNext() {
    var noError = Object.keys(errorField).every(function (key) {
      return errorField[key] === '';
    });
    var allFieldsFilled = Object.keys(field).every(function (key) {
      return field[key] !== '';
    });

    if (noError && allFieldsFilled) {
      dispatch(checkoutActions_setShippingDetails(ShippingDetails_objectSpread(ShippingDetails_objectSpread({}, field), {}, {
        isDone: true
      })));
      history.push('/checkout/step3');
    }
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout"
  }, /*#__PURE__*/react_default.a.createElement(header_CheckOutHeader, {
    current: 2
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-step-2"
  }, /*#__PURE__*/react_default.a.createElement("h3", {
    className: "text-center"
  }, "Shipping Details"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-shipping-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-shipping-form"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-fieldset"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-block checkout-field"
  }, errorField.fullname ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.fullname) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Full Name"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('fullname')),
    onChange: onFullNameInput,
    placeholder: "Your full name",
    style: {
      textTransform: 'capitalize'
    },
    type: "text",
    value: field.fullname
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-block checkout-field"
  }, errorField.email && /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.email), /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Email"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('email')),
    onChange: onEmailInput,
    placeholder: "Your email",
    type: "email",
    value: field.email
  }))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-fieldset"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-block checkout-field"
  }, errorField.address ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.address) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Shipping Address"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('address')),
    onChange: onAddressInput,
    placeholder: "#05 Brgy. Maligalig, Arayat Pampanga, Philippines",
    type: "text",
    value: field.address
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-block checkout-field"
  }, errorField.mobile ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.mobile) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Mobile Number"))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-fieldset"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-field"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Shipping Option"))), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-total d-flex-end padding-right-m"
  }, /*#__PURE__*/react_default.a.createElement("table", null, /*#__PURE__*/react_default.a.createElement("td", null, /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block margin-0 padding-right-s text-right"
  }, "Total: \xA0")), /*#__PURE__*/react_default.a.createElement("td", null, /*#__PURE__*/react_default.a.createElement("h2", {
    className: "basket-total-amount text-right"
  }, Object(utils["c" /* displayMoney */])(subtotal + (field.isInternational ? 50 : 0)))))), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-shipping-action"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-muted checkout-shipping-back",
    onClick: function onClick() {
      return history.push('/checkout/step1');
    },
    type: "button"
  }, "Back"), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button checkout-shipping-back",
    disabled: !(Object.keys(errorField).every(function (key) {
      return errorField[key] === '';
    }) && Object.keys(field).every(function (key) {
      return field[key] !== '';
    })),
    onClick: onClickNext
  }, "Next Step"))))));
};

/* harmony default export */ var step2_ShippingDetails = (hoc_withAuth(ShippingDetails_ShippingDetails));
// CONCATENATED MODULE: ./src/views/checkout/step3/Payment.jsx
function Payment_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Payment_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Payment_ownKeys(Object(source), true).forEach(function (key) { Payment_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Payment_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Payment_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Payment_slicedToArray(arr, i) { return Payment_arrayWithHoles(arr) || Payment_iterableToArrayLimit(arr, i) || Payment_unsupportedIterableToArray(arr, i) || Payment_nonIterableRest(); }

function Payment_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Payment_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Payment_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Payment_arrayLikeToArray(o, minLen); }

function Payment_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Payment_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Payment_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var Payment_Payment = function Payment(props) {
  var _useFieldHandler = hooks_useFieldHandler({
    name: '',
    cardnumber: '',
    expiry: '',
    ccv: ''
  }),
      field = _useFieldHandler.field,
      setField = _useFieldHandler.setField,
      onFieldChange = _useFieldHandler.onFieldChange,
      errorField = _useFieldHandler.errorField,
      setErrorField = _useFieldHandler.setErrorField;

  var _useState = Object(react["useState"])('paypal'),
      _useState2 = Payment_slicedToArray(_useState, 2),
      paymentMode = _useState2[0],
      setPaymentMode = _useState2[1];

  var collapseCreditHeight = Object(react["useRef"])(null);
  var cardInputRef = Object(react["useRef"])(null);
  var shipping = props.shipping,
      subtotal = props.subtotal;

  var onCreditModeChange = function onCreditModeChange(e) {
    setPaymentMode('credit');
    var parent = e.target.closest('.checkout-fieldset-collapse');
    var checkBoxContainer = e.target.closest('.checkout-checkbox-field');
    cardInputRef.current.focus();
    parent.style.height = checkBoxContainer.offsetHeight + collapseCreditHeight.current.offsetHeight + 'px';
  };

  var onPayPalModeChange = function onPayPalModeChange() {
    setPaymentMode('paypal');
    collapseCreditHeight.current.parentElement.style.height = '97px';
  };

  var onCardNameInput = function onCardNameInput(e) {
    return onFieldChange(e, 'name', false);
  };

  var onCardNumberInput = function onCardNumberInput(e) {
    var val = e.target.value.trim();
    onFieldChange(e, 'cardnumber', false);

    if (!(val.length >= 13 && val.length <= 19)) {
      setErrorField(Payment_objectSpread(Payment_objectSpread({}, errorField), {}, {
        cardnumber: 'Card number is invalid'
      }));
    }
  };

  var onExpiryInput = function onExpiryInput(e) {
    return onFieldChange(e, 'expiry', false);
  };

  var onCcvInput = function onCcvInput(e) {
    onFieldChange(e, 'ccv', false);

    if (e.target.value.trim().length < 3) {
      setErrorField(Payment_objectSpread(Payment_objectSpread({}, errorField), {}, {
        ccv: 'CCV is invalid'
      }));
    }
  };

  var errorClassName = function errorClassName(field) {
    return errorField[field] ? 'input-error' : '';
  };

  var onConfirm = function onConfirm(e) {
    e.preventDefault();
    if (!paymentMode) return;

    if (paymentMode === 'credit') {
      var ready = Object.keys(field).every(function (key) {
        return field[key] !== '';
      }) && Object.keys(errorField).every(function (key) {
        return errorField[key] === '';
      });

      if (ready) {
        Object(utils["a" /* displayActionMessage */])('Feature not ready yet :)', 'info');
      } else {
        Object(utils["a" /* displayActionMessage */])('All credentials for credit payment required!', 'error');
      }
    } else {
      Object(utils["a" /* displayActionMessage */])('Feature not ready yet :)', 'info');
    }
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout"
  }, !shipping.isDone && /*#__PURE__*/react_default.a.createElement(react_router["a" /* Redirect */], {
    to: "/checkout/step1"
  }), /*#__PURE__*/react_default.a.createElement(header_CheckOutHeader, {
    current: 3
  }), /*#__PURE__*/react_default.a.createElement("form", {
    className: "checkout-step-3",
    onSubmit: onConfirm
  }, /*#__PURE__*/react_default.a.createElement("h3", {
    className: "text-center"
  }, "Payment"), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Payment Option"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-fieldset-collapse ".concat(paymentMode === 'credit' ? 'is-selected-payment' : '')
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-field margin-0"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-checkbox-field"
  }, /*#__PURE__*/react_default.a.createElement("input", {
    className: "",
    id: "payment-credit-checkbox",
    name: "checkout_payment",
    onChange: onCreditModeChange,
    type: "radio"
  }), /*#__PURE__*/react_default.a.createElement("label", {
    className: "d-flex w-100",
    htmlFor: "payment-credit-checkbox"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-flex-grow-1 margin-left-s"
  }, /*#__PURE__*/react_default.a.createElement("h4", {
    className: "margin-0"
  }, "Credit Card"), /*#__PURE__*/react_default.a.createElement("span", {
    className: "text-subtle d-block margin-top-s"
  }, "Pay with Visa, Master Card and other debit or credit card")), /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "payment-img payment-img-visa"
  }), "\xA0", /*#__PURE__*/react_default.a.createElement("div", {
    className: "payment-img payment-img-mastercard"
  }))))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-collapse-sub",
    ref: collapseCreditHeight
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s text-center"
  }, "Accepted Cards"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-cards-accepted d-flex-center"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "payment-img payment-img-visa",
    title: "Visa"
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "payment-img payment-img-express",
    title: "American Express"
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "payment-img payment-img-mastercard",
    title: "Master Card"
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "payment-img payment-img-maestro",
    title: "Maestro"
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "payment-img payment-img-discover",
    title: "Discover"
  })), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-field margin-0"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-fieldset"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-field"
  }, errorField.name ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.name) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Name on Card"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('name')),
    onChange: onCardNameInput,
    placeholder: "Jane Doe",
    ref: cardInputRef,
    style: {
      textTransform: 'capitalize'
    },
    type: "text",
    value: field.name
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-field"
  }, errorField.cardnumber ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.cardnumber) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Card Number"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('cardnumber')),
    maxLength: 19,
    onChange: onCardNumberInput,
    placeholder: "Card Number",
    type: "number",
    value: field.cardnumber
  }))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-fieldset"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-field"
  }, errorField.expiry ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.expiry) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "Expiry Date"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('expiry')),
    onChange: onExpiryInput,
    placeholder: "Expiry Date",
    type: "date",
    value: field.expiry
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-field"
  }, errorField.ccv ? /*#__PURE__*/react_default.a.createElement("span", {
    className: "input-message"
  }, errorField.ccv) : /*#__PURE__*/react_default.a.createElement("span", {
    className: "d-block padding-s"
  }, "CCV Number"), /*#__PURE__*/react_default.a.createElement("input", {
    className: "input-form d-block ".concat(errorClassName('ccv')),
    maxLength: 4,
    onChange: onCcvInput,
    placeholder: "CCV Number",
    type: "number",
    value: field.ccv
  })))))), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-fieldset-collapse ".concat(paymentMode === 'paypal' ? 'is-selected-payment' : '')
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-field margin-0"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-checkbox-field"
  }, /*#__PURE__*/react_default.a.createElement("input", {
    className: "",
    checked: paymentMode === 'paypal',
    id: "payment-paypal-checkbox",
    name: "checkout_payment",
    onChange: onPayPalModeChange,
    type: "radio"
  }), /*#__PURE__*/react_default.a.createElement("label", {
    className: "d-flex w-100",
    htmlFor: "payment-paypal-checkbox"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "d-flex-grow-1 margin-left-s"
  }, /*#__PURE__*/react_default.a.createElement("h4", {
    className: "margin-0"
  }, "PayPal"), /*#__PURE__*/react_default.a.createElement("span", {
    className: "text-subtle d-block margin-top-s"
  }, "Pay easily, fast and secure with PayPal.")), /*#__PURE__*/react_default.a.createElement("div", {
    className: "payment-img payment-img-paypal"
  }))))), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "basket-total text-right"
  }, /*#__PURE__*/react_default.a.createElement("p", {
    className: "basket-total-title"
  }, "Total:"), /*#__PURE__*/react_default.a.createElement("h2", {
    className: "basket-total-amount"
  }, Object(utils["c" /* displayMoney */])(subtotal + (shipping.isInternational ? 50 : 0)))), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "checkout-shipping-action padding-0"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: "button button-muted checkout-shipping-back",
    onClick: function onClick() {
      return props.history.push('/checkout/step2');
    },
    type: "button"
  }, "Back"), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button",
    disabled: !!!paymentMode,
    type: "submit"
  }, "Confirm"))));
};

/* harmony default export */ var step3_Payment = (hoc_withAuth(Payment_Payment));
// CONCATENATED MODULE: ./src/views/404/PageNotFound.jsx


var PageNotFound_PageNotFound = function PageNotFound(_ref) {
  var history = _ref.history;
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "page-not-found"
  }, /*#__PURE__*/react_default.a.createElement("h1", null, ":( Page you are looking for doesn't exists."), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement("button", {
    className: "button",
    onClick: history.goBack
  }, "Go back"));
};

/* harmony default export */ var _404_PageNotFound = (PageNotFound_PageNotFound);
// CONCATENATED MODULE: ./src/components/ui/ScrollToTop.jsx



var ScrollToTop_ScrollToTop = function ScrollToTop(Component) {
  return Object(react_router["g" /* withRouter */])(function (props) {
    Object(react["useEffect"])(function () {
      window.scrollTo(0, 0);
    }, [props.location]);
    return /*#__PURE__*/react_default.a.createElement(Component, props);
  });
};

/* harmony default export */ var ui_ScrollToTop = (ScrollToTop_ScrollToTop);
// CONCATENATED MODULE: ./src/routers/AppRouter.js




 // import AdminRoute from './AdminRoute';

 // Admin components
// to be added on next update
// import Dashboard from 'views/admin/dashboard/Dashboard';
// import DashboardProducts from 'views/admin/products/Products';
// import DashboardUsers from 'views/admin/users/Users';
// import EditProduct from 'views/admin/products/EditProduct';
// import AddProduct from 'views/admin/products/AddProduct';













var AppRouter_history = Object(esm_history["a" /* createBrowserHistory */])();

var AppRouter_AppRouter = function AppRouter() {
  return /*#__PURE__*/react_default.a.createElement(react_router["c" /* Router */], {
    history: AppRouter_history
  }, /*#__PURE__*/react_default.a.createElement(react_router["d" /* Switch */], null, /*#__PURE__*/react_default.a.createElement(react_router["b" /* Route */], {
    component: ui_ScrollToTop(product_ProductSearch),
    exact: true,
    path: routes["h" /* SEARCH */]
  }), /*#__PURE__*/react_default.a.createElement(routers_PublicRoute, {
    component: home_Home,
    exact: true,
    path: routes["g" /* HOME */]
  }), /*#__PURE__*/react_default.a.createElement(routers_PublicRoute, {
    component: ui_ScrollToTop(auth_SignUp),
    path: routes["j" /* SIGNUP */]
  }), /*#__PURE__*/react_default.a.createElement(routers_PublicRoute, {
    component: ui_ScrollToTop(auth_SignIn),
    path: routes["i" /* SIGNIN */]
  }), /*#__PURE__*/react_default.a.createElement(routers_PublicRoute, {
    component: ui_ScrollToTop(auth_ForgotPassword),
    path: routes["f" /* FORGOT_PASSWORD */]
  }), /*#__PURE__*/react_default.a.createElement(ClientRoute, {
    component: ui_ScrollToTop(account_UserAccount),
    exact: true,
    path: routes["a" /* ACCOUNT */]
  }), /*#__PURE__*/react_default.a.createElement(ClientRoute, {
    component: ui_ScrollToTop(EditAccount),
    exact: true,
    path: routes["b" /* ACCOUNT_EDIT */]
  }), /*#__PURE__*/react_default.a.createElement(ClientRoute, {
    component: ui_ScrollToTop(step1_OrderSummary),
    path: routes["c" /* CHECKOUT_STEP_1 */]
  }), /*#__PURE__*/react_default.a.createElement(ClientRoute, {
    component: ui_ScrollToTop(step2_ShippingDetails),
    path: routes["d" /* CHECKOUT_STEP_2 */]
  }), /*#__PURE__*/react_default.a.createElement(ClientRoute, {
    component: ui_ScrollToTop(step3_Payment),
    path: routes["e" /* CHECKOUT_STEP_3 */]
  }), /*#__PURE__*/react_default.a.createElement(routers_PublicRoute, {
    component: ui_ScrollToTop(_404_PageNotFound)
  })));
};

/* harmony default export */ var routers_AppRouter = (AppRouter_AppRouter);
// CONCATENATED MODULE: ./src/components/ui/Preloader.jsx



var Preloader_Preloader = function Preloader() {
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "preloader"
  }, /*#__PURE__*/react_default.a.createElement("h3", null, "March\xE9"), /*#__PURE__*/react_default.a.createElement("br", null), /*#__PURE__*/react_default.a.createElement(CircularProgress["a" /* default */], null));
};

/* harmony default export */ var ui_Preloader = (Preloader_Preloader);
// EXTERNAL MODULE: ./node_modules/redux/es/redux.js
var redux = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/redux-persist/es/index.js + 11 modules
var redux_persist_es = __webpack_require__(124);

// EXTERNAL MODULE: ./node_modules/redux-persist/lib/storage/index.js
var storage = __webpack_require__(167);
var storage_default = /*#__PURE__*/__webpack_require__.n(storage);

// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js + 2 modules
var redux_saga_core_npm_proxy_esm = __webpack_require__(169);

// CONCATENATED MODULE: ./src/reducers/productReducer.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || productReducer_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function productReducer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return productReducer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return productReducer_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return productReducer_arrayLikeToArray(arr); }

function productReducer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function productReducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function productReducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { productReducer_ownKeys(Object(source), true).forEach(function (key) { productReducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { productReducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function productReducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ var productReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    lastRefKey: null,
    total: 0,
    items: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return productReducer_objectSpread(productReducer_objectSpread({}, state), {}, {
        lastRefKey: action.payload.lastKey,
        total: action.payload.total,
        items: [].concat(_toConsumableArray(state.items), _toConsumableArray(action.payload.products))
      });

    case ADD_PRODUCT_SUCCESS:
      return productReducer_objectSpread(productReducer_objectSpread({}, state), {}, {
        items: [].concat(_toConsumableArray(state.items), [action.payload])
      });

    case REMOVE_PRODUCT_SUCCESS:
      return productReducer_objectSpread(productReducer_objectSpread({}, state), {}, {
        items: state.items.filter(function (product) {
          return product.id !== action.payload;
        })
      });

    case EDIT_PRODUCT_SUCCESS:
      return productReducer_objectSpread(productReducer_objectSpread({}, state), {}, {
        items: state.items.map(function (product) {
          if (product.id === action.payload.id) {
            return productReducer_objectSpread(productReducer_objectSpread({}, product), action.payload.updates);
          }

          return product;
        })
      });

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/reducers/basketReducer.js
function basketReducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function basketReducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { basketReducer_ownKeys(Object(source), true).forEach(function (key) { basketReducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { basketReducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function basketReducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function basketReducer_toConsumableArray(arr) { return basketReducer_arrayWithoutHoles(arr) || basketReducer_iterableToArray(arr) || basketReducer_unsupportedIterableToArray(arr) || basketReducer_nonIterableSpread(); }

function basketReducer_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function basketReducer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return basketReducer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return basketReducer_arrayLikeToArray(o, minLen); }

function basketReducer_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function basketReducer_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return basketReducer_arrayLikeToArray(arr); }

function basketReducer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


/* harmony default export */ var basketReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ADD_TO_BASKET:
      return state.some(function (product) {
        return product.id === action.payload.id;
      }) ? state : [].concat(basketReducer_toConsumableArray(state), [action.payload]);

    case REMOVE_FROM_BASKET:
      return state.filter(function (product) {
        return product.id !== action.payload;
      });

    case CLEAR_BASKET:
      return [];

    case ADD_QTY_ITEM:
      return state.map(function (product) {
        if (product.id === action.payload) {
          return basketReducer_objectSpread(basketReducer_objectSpread({}, product), {}, {
            quantity: product.quantity + 1
          });
        }

        return product;
      });

    case MINUS_QTY_ITEM:
      return state.map(function (product) {
        if (product.id === action.payload) {
          return basketReducer_objectSpread(basketReducer_objectSpread({}, product), {}, {
            quantity: product.quantity - 1
          });
        }

        return product;
      });

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/reducers/authReducer.js

var authReducer_initState = {// id: 'test-123',
  // type: 'admin',
  // provider: 'password'
};
/* harmony default export */ var authReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : authReducer_initState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        id: action.payload.id,
        type: action.payload.type,
        provider: action.payload.provider
      };

    case SIGNOUT_SUCCESS:
      return {};

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/reducers/profileReducer.js
function profileReducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function profileReducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { profileReducer_ownKeys(Object(source), true).forEach(function (key) { profileReducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { profileReducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function profileReducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ var profileReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_PROFILE:
      return action.payload;

    case UPDATE_PROFILE_SUCCESS:
      return profileReducer_objectSpread(profileReducer_objectSpread({}, state), action.payload);

    case CLEAR_PROFILE:
      return {};

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/reducers/filterReducer.js
function filterReducer_toConsumableArray(arr) { return filterReducer_arrayWithoutHoles(arr) || filterReducer_iterableToArray(arr) || filterReducer_unsupportedIterableToArray(arr) || filterReducer_nonIterableSpread(); }

function filterReducer_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function filterReducer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return filterReducer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return filterReducer_arrayLikeToArray(o, minLen); }

function filterReducer_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function filterReducer_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return filterReducer_arrayLikeToArray(arr); }

function filterReducer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function filterReducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function filterReducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { filterReducer_ownKeys(Object(source), true).forEach(function (key) { filterReducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { filterReducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function filterReducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var filterReducer_initState = {
  recent: [],
  keyword: '',
  brand: '',
  minPrice: 0,
  maxPrice: 0,
  sortBy: ''
};
/* harmony default export */ var filterReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : filterReducer_initState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_TEXT_FILTER:
      return filterReducer_objectSpread(filterReducer_objectSpread({}, state), {}, {
        recent: !!state.recent.find(function (n) {
          return n === action.payload;
        }) || action.payload === '' ? state.recent : [action.payload].concat(filterReducer_toConsumableArray(state.recent)),
        keyword: action.payload
      });

    case SET_BRAND_FILTER:
      return filterReducer_objectSpread(filterReducer_objectSpread({}, state), {}, {
        brand: action.payload
      });

    case SET_MAX_PRICE_FILTER:
      return filterReducer_objectSpread(filterReducer_objectSpread({}, state), {}, {
        maxPrice: action.payload
      });

    case SET_MIN_PRICE_FILTER:
      return filterReducer_objectSpread(filterReducer_objectSpread({}, state), {}, {
        minPrice: action.payload
      });

    case RESET_FILTER:
      return filterReducer_initState;

    case CLEAR_RECENT_SEARCH:
      return filterReducer_objectSpread(filterReducer_objectSpread({}, state), {}, {
        recent: []
      });

    case REMOVE_SELECTED_RECENT:
      return filterReducer_objectSpread(filterReducer_objectSpread({}, state), {}, {
        recent: state.recent.filter(function (item) {
          return item !== action.payload;
        })
      });

    case APPLY_FILTER:
      return filterReducer_objectSpread(filterReducer_objectSpread({}, state), action.payload);

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/reducers/checkoutReducer.js
function checkoutReducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function checkoutReducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { checkoutReducer_ownKeys(Object(source), true).forEach(function (key) { checkoutReducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { checkoutReducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function checkoutReducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* harmony default export */ var checkoutReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    shipping: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_CHECKOUT_SHIPPING_DETAILS:
      return checkoutReducer_objectSpread(checkoutReducer_objectSpread({}, state), {}, {
        shipping: action.payload
      });

    case RESET_CHECKOUT_SHIPPING_DETAILS:
      return {
        shipping: {}
      };

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/reducers/userReducer.js
function userReducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function userReducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { userReducer_ownKeys(Object(source), true).forEach(function (key) { userReducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { userReducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function userReducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function userReducer_toConsumableArray(arr) { return userReducer_arrayWithoutHoles(arr) || userReducer_iterableToArray(arr) || userReducer_unsupportedIterableToArray(arr) || userReducer_nonIterableSpread(); }

function userReducer_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function userReducer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return userReducer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return userReducer_arrayLikeToArray(o, minLen); }

function userReducer_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function userReducer_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return userReducer_arrayLikeToArray(arr); }

function userReducer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

 // const initState = [
//   {
//     firstname: 'Gago',
//     lastname: 'Ka',
//     email: 'gagoka@mail.com',
//     password: 'gagooo',
//     avatar: '',
//     banner: '',
//     dateJoined: 0
//   }
// ];

/* harmony default export */ var userReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ADD_USER:
      return [].concat(userReducer_toConsumableArray(state), [action.payload]);

    case EDIT_USER:
      return state.map(function (user) {
        if (user.id === action.payload.id) {
          return userReducer_objectSpread(userReducer_objectSpread({}, user), action.payload);
        }

        return user;
      });

    case DELETE_USER:
      return state.filter(function (user) {
        return user.id !== action.payload;
      });

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/reducers/appReducer.js
function appReducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function appReducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { appReducer_ownKeys(Object(source), true).forEach(function (key) { appReducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { appReducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function appReducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var appReducer_initState = {
  loading: false,
  isAuthenticating: false,
  authStatus: null,
  requestStatus: null,
  theme: 'default'
};
/* harmony default export */ var appReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : appReducer_initState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case LOADING:
      return appReducer_objectSpread(appReducer_objectSpread({}, state), {}, {
        loading: action.payload
      });

    case IS_AUTHENTICATING:
      return appReducer_objectSpread(appReducer_objectSpread({}, state), {}, {
        isAuthenticating: action.payload
      });

    case SET_REQUEST_STATUS:
      return appReducer_objectSpread(appReducer_objectSpread({}, state), {}, {
        requestStatus: action.payload
      });

    case SET_AUTH_STATUS:
      return appReducer_objectSpread(appReducer_objectSpread({}, state), {}, {
        authStatus: action.payload
      });

    default:
      return state;
  }
});
// CONCATENATED MODULE: ./src/reducers/index.js








var rootReducer = {
  products: productReducer,
  basket: basketReducer,
  auth: authReducer,
  profile: profileReducer,
  filter: filterReducer,
  users: userReducer,
  checkout: checkoutReducer,
  app: appReducer
};
/* harmony default export */ var reducers = (rootReducer);
// EXTERNAL MODULE: ./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js + 1 modules
var redux_saga_effects_npm_proxy_esm = __webpack_require__(3);

// EXTERNAL MODULE: ./src/images/defaultAvatar.jpg
var defaultAvatar = __webpack_require__(168);
var defaultAvatar_default = /*#__PURE__*/__webpack_require__.n(defaultAvatar);

// EXTERNAL MODULE: ./src/images/defaultBanner.jpg
var defaultBanner = __webpack_require__(123);
var defaultBanner_default = /*#__PURE__*/__webpack_require__.n(defaultBanner);

// CONCATENATED MODULE: ./src/sagas/authSaga.js
var _marked = /*#__PURE__*/regeneratorRuntime.mark(handleError),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(initRequest),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(authSaga);













function handleError(e) {
  return regeneratorRuntime.wrap(function handleError$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_isAuthenticating(false));

        case 2:
          _context.t0 = e.code;
          _context.next = _context.t0 === 'auth/network-request-failed' ? 5 : _context.t0 === 'auth/email-already-in-use' ? 8 : _context.t0 === 'auth/wrong-password' ? 11 : _context.t0 === 'auth/user-not-found' ? 14 : _context.t0 === 'auth/reset-password-error' ? 17 : 20;
          break;

        case 5:
          _context.next = 7;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_setAuthStatus({
            success: false,
            message: 'Network error has occured. Please try again.'
          }));

        case 7:
          return _context.abrupt("break", 23);

        case 8:
          _context.next = 10;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_setAuthStatus({
            success: false,
            message: 'Email is already in use. Please use another email'
          }));

        case 10:
          return _context.abrupt("break", 23);

        case 11:
          _context.next = 13;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_setAuthStatus({
            success: false,
            message: 'Incorrect email or password'
          }));

        case 13:
          return _context.abrupt("break", 23);

        case 14:
          _context.next = 16;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_setAuthStatus({
            success: false,
            message: 'Incorrect email or password'
          }));

        case 16:
          return _context.abrupt("break", 23);

        case 17:
          _context.next = 19;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_setAuthStatus({
            success: false,
            message: 'Failed to send password reset email. Did you type your email correctly?'
          }));

        case 19:
          return _context.abrupt("break", 23);

        case 20:
          _context.next = 22;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_setAuthStatus({
            success: false,
            message: e.message
          }));

        case 22:
          return _context.abrupt("break", 23);

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function initRequest() {
  return regeneratorRuntime.wrap(function initRequest$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_isAuthenticating());

        case 2:
          _context2.next = 4;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_setAuthStatus(null));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function authSaga(_ref) {
  var type, payload, ref, fullname, user, snapshot, _user;

  return regeneratorRuntime.wrap(function authSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          type = _ref.type, payload = _ref.payload;
          _context3.t0 = type;
          _context3.next = _context3.t0 === SIGNIN ? 4 : _context3.t0 === SIGNIN_WITH_GOOGLE ? 16 : _context3.t0 === SIGNIN_WITH_FACEBOOK ? 28 : _context3.t0 === SIGNUP ? 40 : _context3.t0 === SIGNOUT ? 61 : _context3.t0 === RESET_PASSWORD ? 86 : _context3.t0 === ON_AUTHSTATE_SUCCESS ? 101 : _context3.t0 === ON_AUTHSTATE_FAIL ? 122 : _context3.t0 === SET_AUTH_PERSISTENCE ? 127 : 136;
          break;

        case 4:
          _context3.prev = 4;
          _context3.next = 7;
          return initRequest();

        case 7:
          _context3.next = 9;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.signIn, payload.email, payload.password);

        case 9:
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t1 = _context3["catch"](4);
          _context3.next = 15;
          return handleError(_context3.t1);

        case 15:
          return _context3.abrupt("break", 137);

        case 16:
          _context3.prev = 16;
          _context3.next = 19;
          return initRequest();

        case 19:
          _context3.next = 21;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.signInWithGoogle);

        case 21:
          _context3.next = 27;
          break;

        case 23:
          _context3.prev = 23;
          _context3.t2 = _context3["catch"](16);
          _context3.next = 27;
          return handleError(_context3.t2);

        case 27:
          return _context3.abrupt("break", 137);

        case 28:
          _context3.prev = 28;
          _context3.next = 31;
          return initRequest();

        case 31:
          _context3.next = 33;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.signInWithFacebook);

        case 33:
          _context3.next = 39;
          break;

        case 35:
          _context3.prev = 35;
          _context3.t3 = _context3["catch"](28);
          _context3.next = 39;
          return handleError(_context3.t3);

        case 39:
          return _context3.abrupt("break", 137);

        case 40:
          _context3.prev = 40;
          _context3.next = 43;
          return initRequest();

        case 43:
          _context3.next = 45;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.createAccount, payload.email, payload.password);

        case 45:
          ref = _context3.sent;
          fullname = payload.fullname.split(' ').map(function (name) {
            return name[0].toUpperCase().concat(name.substring(1));
          }).join(' ');
          user = {
            fullname: fullname,
            avatar: defaultAvatar_default.a,
            banner: defaultBanner_default.a,
            email: payload.email,
            address: '',
            mobile: '',
            role: 'USER',
            dateJoined: ref.user.metadata.creationTime || new Date().getTime()
          };
          _context3.next = 50;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.addUser, ref.user.uid, user);

        case 50:
          _context3.next = 52;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(profileActions_setProfile(user));

        case 52:
          _context3.next = 54;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_isAuthenticating(false));

        case 54:
          _context3.next = 60;
          break;

        case 56:
          _context3.prev = 56;
          _context3.t4 = _context3["catch"](40);
          _context3.next = 60;
          return handleError(_context3.t4);

        case 60:
          return _context3.abrupt("break", 137);

        case 61:
          _context3.prev = 61;
          _context3.next = 64;
          return initRequest();

        case 64:
          _context3.next = 66;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.signOut);

        case 66:
          _context3.next = 68;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(basketActions_clearBasket());

        case 68:
          _context3.next = 70;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(profileActions_clearProfile());

        case 70:
          _context3.next = 72;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(filterActions_resetFilter());

        case 72:
          _context3.next = 74;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(checkoutActions_resetShippingDetails());

        case 74:
          _context3.next = 76;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_signOutSuccess());

        case 76:
          _context3.next = 78;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_isAuthenticating(false));

        case 78:
          _context3.next = 80;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(AppRouter_history.push, '/signin');

        case 80:
          _context3.next = 85;
          break;

        case 82:
          _context3.prev = 82;
          _context3.t5 = _context3["catch"](61);
          console.log(_context3.t5);

        case 85:
          return _context3.abrupt("break", 137);

        case 86:
          _context3.prev = 86;
          _context3.next = 89;
          return initRequest();

        case 89:
          _context3.next = 91;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.passwordReset, payload);

        case 91:
          _context3.next = 93;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_setAuthStatus({
            success: true,
            message: 'Password reset email has been sent to your provided email.'
          }));

        case 93:
          _context3.next = 95;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_isAuthenticating(false));

        case 95:
          _context3.next = 100;
          break;

        case 97:
          _context3.prev = 97;
          _context3.t6 = _context3["catch"](86);
          handleError({
            code: 'auth/reset-password-error'
          });

        case 100:
          return _context3.abrupt("break", 137);

        case 101:
          _context3.next = 103;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_setAuthStatus({
            success: true,
            message: 'Successfully signed in.'
          }));

        case 103:
          _context3.next = 105;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.getUser, payload.uid);

        case 105:
          snapshot = _context3.sent;

          if (!snapshot.data()) {
            _context3.next = 111;
            break;
          }

          _context3.next = 109;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(profileActions_setProfile(snapshot.data()));

        case 109:
          _context3.next = 117;
          break;

        case 111:
          if (!(payload.providerData[0].providerId !== 'password')) {
            _context3.next = 117;
            break;
          }

          // add the user if auth provider is not password
          _user = {
            fullname: payload.displayName ? payload.displayName : 'User',
            avatar: payload.photoURL,
            //? payload.photoURL
            banner: defaultBanner_default.a,
            email: payload.email,
            address: '',
            mobile: '',
            role: 'USER',
            dateJoined: payload.metadata.creationTime
          };
          _context3.next = 115;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.addUser, payload.uid, _user);

        case 115:
          _context3.next = 117;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(profileActions_setProfile(_user));

        case 117:
          _context3.next = 119;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_signInSuccess({
            id: payload.uid,
            type: 'client',
            provider: payload.providerData[0].providerId
          }));

        case 119:
          _context3.next = 121;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_isAuthenticating(false));

        case 121:
          return _context3.abrupt("break", 137);

        case 122:
          _context3.next = 124;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(profileActions_clearProfile());

        case 124:
          _context3.next = 126;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(authActions_signOutSuccess());

        case 126:
          return _context3.abrupt("break", 137);

        case 127:
          _context3.prev = 127;
          _context3.next = 130;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.setAuthPersistence);

        case 130:
          _context3.next = 135;
          break;

        case 132:
          _context3.prev = 132;
          _context3.t7 = _context3["catch"](127);
          console.log(_context3.t7);

        case 135:
          return _context3.abrupt("break", 137);

        case 136:
          return _context3.abrupt("return");

        case 137:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[4, 11], [16, 23], [28, 35], [40, 56], [61, 82], [86, 97], [127, 132]]);
}

/* harmony default export */ var sagas_authSaga = (authSaga);
// CONCATENATED MODULE: ./src/sagas/productSaga.js
function productSaga_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { productSaga_typeof = function _typeof(obj) { return typeof obj; }; } else { productSaga_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return productSaga_typeof(obj); }

function productSaga_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function productSaga_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { productSaga_ownKeys(Object(source), true).forEach(function (key) { productSaga_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { productSaga_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function productSaga_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var productSaga_marked = /*#__PURE__*/regeneratorRuntime.mark(productSaga_initRequest),
    productSaga_marked2 = /*#__PURE__*/regeneratorRuntime.mark(productSaga_handleError),
    productSaga_marked3 = /*#__PURE__*/regeneratorRuntime.mark(handleAction),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(productSaga);








function productSaga_initRequest() {
  return regeneratorRuntime.wrap(function initRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])({
            type: LOADING,
            payload: true
          });

        case 2:
          _context.next = 4;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])({
            type: SET_REQUEST_STATUS,
            payload: null
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, productSaga_marked);
}

function productSaga_handleError(e) {
  return regeneratorRuntime.wrap(function handleError$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])({
            type: LOADING,
            payload: false
          });

        case 2:
          _context2.next = 4;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])({
            type: SET_REQUEST_STATUS,
            payload: e
          });

        case 4:
          console.log('ERROR: ', e);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, productSaga_marked2);
}

function handleAction(location, message, status) {
  return regeneratorRuntime.wrap(function handleAction$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!location) {
            _context3.next = 3;
            break;
          }

          _context3.next = 3;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(AppRouter_history.push, location);

        case 3:
          _context3.next = 5;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(utils["a" /* displayActionMessage */], message, status);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, productSaga_marked3);
}

function productSaga(_ref) {
  var type, payload, state, result, key, downloadURL, image, _downloadURL, updates;

  return regeneratorRuntime.wrap(function productSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          type = _ref.type, payload = _ref.payload;
          _context4.t0 = type;
          _context4.next = _context4.t0 === GET_PRODUCTS ? 4 : _context4.t0 === ADD_PRODUCT ? 24 : _context4.t0 === EDIT_PRODUCT ? 50 : _context4.t0 === REMOVE_PRODUCT ? 84 : 104;
          break;

        case 4:
          _context4.prev = 4;
          _context4.next = 7;
          return productSaga_initRequest();

        case 7:
          _context4.next = 9;
          return Object(redux_saga_effects_npm_proxy_esm["c" /* select */])();

        case 9:
          state = _context4.sent;
          _context4.next = 12;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.getProducts, payload);

        case 12:
          result = _context4.sent;
          _context4.next = 15;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(productActions_getProductsSuccess({
            products: result.products,
            lastKey: result.lastKey ? result.lastKey : state.products.lastRefKey,
            total: result.total ? result.total : state.products.total
          }));

        case 15:
          _context4.next = 17;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])({
            type: LOADING,
            payload: false
          });

        case 17:
          _context4.next = 23;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t1 = _context4["catch"](4);
          _context4.next = 23;
          return productSaga_handleError(_context4.t1);

        case 23:
          return _context4.abrupt("break", 105);

        case 24:
          _context4.prev = 24;
          _context4.next = 27;
          return productSaga_initRequest();

        case 27:
          _context4.next = 29;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.generateKey);

        case 29:
          key = _context4.sent;
          _context4.next = 32;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.storeImage, key, 'products', payload.image);

        case 32:
          downloadURL = _context4.sent;
          _context4.next = 35;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.addProduct, key, productSaga_objectSpread(productSaga_objectSpread({}, payload), {}, {
            image: downloadURL
          }));

        case 35:
          _context4.next = 37;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(productActions_addProductSuccess(productSaga_objectSpread(productSaga_objectSpread({
            id: key
          }, payload), {}, {
            image: downloadURL
          })));

        case 37:
          _context4.next = 39;
          return handleAction('/dashboard/products', 'Item succesfully added', 'success');

        case 39:
          _context4.next = 41;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])({
            type: LOADING,
            payload: false
          });

        case 41:
          _context4.next = 49;
          break;

        case 43:
          _context4.prev = 43;
          _context4.t2 = _context4["catch"](24);
          _context4.next = 47;
          return productSaga_handleError(_context4.t2);

        case 47:
          _context4.next = 49;
          return handleAction(undefined, 'Item failed to add: ' + _context4.t2.message_, 'error');

        case 49:
          return _context4.abrupt("break", 105);

        case 50:
          _context4.prev = 50;
          _context4.next = 53;
          return productSaga_initRequest();

        case 53:
          image = payload.updates.image;

          if (!(image.constructor === File && productSaga_typeof(image) === 'object')) {
            _context4.next = 67;
            break;
          }

          _context4.next = 57;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.deleteImage, payload.id);

        case 57:
          _context4.next = 59;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.storeImage, 'products', payload.id, image);

        case 59:
          _downloadURL = _context4.sent;
          updates = productSaga_objectSpread(productSaga_objectSpread({}, payload.updates), {}, {
            image: _downloadURL
          });
          _context4.next = 63;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.editProduct, payload.id, updates);

        case 63:
          _context4.next = 65;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(productActions_editProductSuccess({
            id: payload.id,
            updates: updates
          }));

        case 65:
          _context4.next = 71;
          break;

        case 67:
          _context4.next = 69;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.editProduct, payload.id, payload.updates);

        case 69:
          _context4.next = 71;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(productActions_editProductSuccess({
            id: payload.id,
            updates: payload.updates
          }));

        case 71:
          _context4.next = 73;
          return handleAction('/dashboard/products', 'Item succesfully edited', 'success');

        case 73:
          _context4.next = 75;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])({
            type: LOADING,
            payload: false
          });

        case 75:
          _context4.next = 83;
          break;

        case 77:
          _context4.prev = 77;
          _context4.t3 = _context4["catch"](50);
          _context4.next = 81;
          return productSaga_handleError(_context4.t3);

        case 81:
          _context4.next = 83;
          return handleAction(undefined, 'Item failed to edit: ' + _context4.t3.message, 'error');

        case 83:
          return _context4.abrupt("break", 105);

        case 84:
          _context4.prev = 84;
          _context4.next = 87;
          return productSaga_initRequest();

        case 87:
          _context4.next = 89;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.removeProduct, payload);

        case 89:
          _context4.next = 91;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(productActions_removeProductSuccess(payload));

        case 91:
          _context4.next = 93;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])({
            type: LOADING,
            payload: false
          });

        case 93:
          _context4.next = 95;
          return handleAction('/dashboard/products', 'Item succesfully removed', 'success');

        case 95:
          _context4.next = 103;
          break;

        case 97:
          _context4.prev = 97;
          _context4.t4 = _context4["catch"](84);
          _context4.next = 101;
          return productSaga_handleError(_context4.t4);

        case 101:
          _context4.next = 103;
          return handleAction(undefined, 'Item failed to remove: ' + _context4.t4.message, 'error');

        case 103:
          return _context4.abrupt("break", 105);

        case 104:
          return _context4.abrupt("return");

        case 105:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[4, 19], [24, 43], [50, 77], [84, 97]]);
}

/* harmony default export */ var sagas_productSaga = (productSaga);
// CONCATENATED MODULE: ./src/sagas/profileSaga.js
var profileSaga_marked = /*#__PURE__*/regeneratorRuntime.mark(profileSaga);

function profileSaga_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function profileSaga_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { profileSaga_ownKeys(Object(source), true).forEach(function (key) { profileSaga_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { profileSaga_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function profileSaga_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










function profileSaga(_ref) {
  var type, payload, state, _payload$credentials, email, password, _payload$files, avatarFile, bannerFile, bannerURL, avatarURL, updates;

  return regeneratorRuntime.wrap(function profileSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          type = _ref.type, payload = _ref.payload;
          _context.t0 = type;
          _context.next = _context.t0 === UPDATE_EMAIL ? 4 : _context.t0 === UPDATE_PROFILE ? 21 : 80;
          break;

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(appActions_isLoading(false));

        case 7:
          _context.next = 9;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.updateEmail, payload.password, payload.newEmail);

        case 9:
          _context.next = 11;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(appActions_isLoading(false));

        case 11:
          _context.next = 13;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(AppRouter_history.push, '/profile');

        case 13:
          _context.next = 15;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(utils["a" /* displayActionMessage */], 'Email Updated Successfully!', 'success');

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t1 = _context["catch"](4);
          console.log(_context.t1.message);

        case 20:
          return _context.abrupt("break", 81);

        case 21:
          _context.prev = 21;
          _context.next = 24;
          return Object(redux_saga_effects_npm_proxy_esm["c" /* select */])();

        case 24:
          state = _context.sent;
          _payload$credentials = payload.credentials, email = _payload$credentials.email, password = _payload$credentials.password;
          _payload$files = payload.files, avatarFile = _payload$files.avatarFile, bannerFile = _payload$files.bannerFile;
          _context.next = 29;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(appActions_isLoading(true));

        case 29:
          if (!(email && password && email !== state.profile.email)) {
            _context.next = 32;
            break;
          }

          _context.next = 32;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.updateEmail, password, email);

        case 32:
          if (!(avatarFile || bannerFile)) {
            _context.next = 56;
            break;
          }

          if (!bannerFile) {
            _context.next = 39;
            break;
          }

          _context.next = 36;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.storeImage, state.auth.id, 'banner', bannerFile);

        case 36:
          _context.t2 = _context.sent;
          _context.next = 40;
          break;

        case 39:
          _context.t2 = payload.updates.banner;

        case 40:
          bannerURL = _context.t2;

          if (!avatarFile) {
            _context.next = 47;
            break;
          }

          _context.next = 44;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.storeImage, state.auth.id, 'avatar', avatarFile);

        case 44:
          _context.t3 = _context.sent;
          _context.next = 48;
          break;

        case 47:
          _context.t3 = payload.updates.avatar;

        case 48:
          avatarURL = _context.t3;
          updates = profileSaga_objectSpread(profileSaga_objectSpread({}, payload.updates), {}, {
            avatar: avatarURL,
            banner: bannerURL
          });
          _context.next = 52;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.updateProfile, state.auth.id, updates);

        case 52:
          _context.next = 54;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(profileActions_updateProfileSuccess(updates));

        case 54:
          _context.next = 60;
          break;

        case 56:
          _context.next = 58;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(firebase_firebase.updateProfile, state.auth.id, payload.updates);

        case 58:
          _context.next = 60;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(profileActions_updateProfileSuccess(payload.updates));

        case 60:
          _context.next = 62;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(appActions_isLoading(false));

        case 62:
          _context.next = 64;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(AppRouter_history.push, routes["a" /* ACCOUNT */]);

        case 64:
          _context.next = 66;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(utils["a" /* displayActionMessage */], 'Profile Updated Successfully!', 'success');

        case 66:
          _context.next = 80;
          break;

        case 68:
          _context.prev = 68;
          _context.t4 = _context["catch"](21);
          console.log(_context.t4);
          _context.next = 73;
          return Object(redux_saga_effects_npm_proxy_esm["b" /* put */])(appActions_isLoading(false));

        case 73:
          if (!(_context.t4.code === 'auth/wrong-password')) {
            _context.next = 78;
            break;
          }

          _context.next = 76;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(utils["a" /* displayActionMessage */], 'Wrong password, profile update failed :(', 'error');

        case 76:
          _context.next = 80;
          break;

        case 78:
          _context.next = 80;
          return Object(redux_saga_effects_npm_proxy_esm["a" /* call */])(utils["a" /* displayActionMessage */], ":( Failed to update profile. ".concat(_context.t4.message ? _context.t4.message : ''), 'error');

        case 80:
          return _context.abrupt("return");

        case 81:
        case "end":
          return _context.stop();
      }
    }
  }, profileSaga_marked, null, [[4, 17], [21, 68]]);
}

/* harmony default export */ var sagas_profileSaga = (profileSaga);
// CONCATENATED MODULE: ./src/sagas/rootSaga.js
var rootSaga_marked = /*#__PURE__*/regeneratorRuntime.mark(rootSaga);







function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects_npm_proxy_esm["d" /* takeLatest */])([SIGNIN, SIGNUP, SIGNOUT, SIGNIN_WITH_GOOGLE, SIGNIN_WITH_FACEBOOK, ON_AUTHSTATE_CHANGED, ON_AUTHSTATE_SUCCESS, ON_AUTHSTATE_FAIL, SET_AUTH_PERSISTENCE, RESET_PASSWORD], sagas_authSaga);

        case 2:
          _context.next = 4;
          return Object(redux_saga_effects_npm_proxy_esm["d" /* takeLatest */])([ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT, GET_PRODUCTS], sagas_productSaga);

        case 4:
          _context.next = 6;
          return Object(redux_saga_effects_npm_proxy_esm["d" /* takeLatest */])([UPDATE_EMAIL, UPDATE_PROFILE], sagas_profileSaga);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, rootSaga_marked);
}

/* harmony default export */ var sagas_rootSaga = (rootSaga);
// CONCATENATED MODULE: ./src/store/store.js






var sagaMiddleware = Object(redux_saga_core_npm_proxy_esm["a" /* default */])();
var composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux["d" /* compose */];
var authPersistConfig = {
  key: 'root',
  storage: storage_default.a,
  whitelist: ['auth', 'profile', 'basket', 'checkout']
};
/* harmony default export */ var store_store = (function () {
  var store = Object(redux["e" /* createStore */])(Object(redux_persist_es["a" /* persistCombineReducers */])(authPersistConfig, reducers), composeEnhancer(Object(redux["a" /* applyMiddleware */])(sagaMiddleware)));
  var persistor = Object(redux_persist_es["b" /* persistStore */])(store);
  sagaMiddleware.run(sagas_rootSaga);
  return {
    store: store,
    persistor: persistor
  };
});
// CONCATENATED MODULE: ./src/index.js













webfontloader_default.a.load({
  google: {
    families: ['Tajawal']
  }
});

var _configureStore = store_store(),
    src_store = _configureStore.store,
    src_persistor = _configureStore.persistor;

var src_AppRoot = function AppRoot() {
  return /*#__PURE__*/react_default.a.createElement(react["StrictMode"], null, /*#__PURE__*/react_default.a.createElement(es["a" /* Provider */], {
    store: src_store
  }, /*#__PURE__*/react_default.a.createElement(integration_react["a" /* PersistGate */], {
    loading: /*#__PURE__*/react_default.a.createElement(ui_Preloader, null),
    persistor: src_persistor
  }, /*#__PURE__*/react_default.a.createElement(routers_AppRouter, null))));
};

if (window.navigator.onLine) {
  // Render the preloader on initial load
  Object(react_dom["render"])( /*#__PURE__*/react_default.a.createElement(ui_Preloader, null), document.getElementById('app'));
  firebase_firebase.auth.onAuthStateChanged(function (user) {
    if (user) {
      src_store.dispatch(authActions_onAuthStateSuccess(user));
    } else {
      src_store.dispatch(authActions_onAuthStateFail('Failed to authenticate'));
    } // then render the app after checking the auth state


    Object(react_dom["render"])( /*#__PURE__*/react_default.a.createElement(src_AppRoot, null), document.getElementById('app'));
  });
} else {
  Object(react_dom["render"])( /*#__PURE__*/react_default.a.createElement("div", {
    className: "loader"
  }, /*#__PURE__*/react_default.a.createElement("h2", null, ":( No internet connection.")), document.getElementById('app'));
}

if ( true && 'serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      console.log('SW registered: ', registration);
    })["catch"](function (registrationError) {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return HOME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACCOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ACCOUNT_EDIT; });
/* unused harmony export DASHBOARD */
/* unused harmony export DASHBOARD_PRODUCTS */
/* unused harmony export DASHBOARD_USERS */
/* unused harmony export ADD_PRODUCT */
/* unused harmony export EDIT_PRODUCT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SIGNIN; });
/* unused harmony export SIGNOUT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return SIGNUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return FORGOT_PASSWORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CHECKOUT_STEP_1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CHECKOUT_STEP_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CHECKOUT_STEP_3; });
var HOME = '/';
var ACCOUNT = '/account';
var ACCOUNT_EDIT = '/account/edit';
var DASHBOARD = '/dashboard';
var DASHBOARD_PRODUCTS = '/dashboard/products';
var DASHBOARD_USERS = '/dashboard/users';
var ADD_PRODUCT = '/dashboard/add';
var EDIT_PRODUCT = '/dashboard/edit/:id';
var SEARCH = '/search';
var SIGNIN = '/signin';
var SIGNOUT = '/signout';
var SIGNUP = '/signup';
var FORGOT_PASSWORD = '/forgot_password';
var CHECKOUT_STEP_1 = '/checkout/step1';
var CHECKOUT_STEP_2 = '/checkout/step2';
var CHECKOUT_STEP_3 = '/checkout/step3';

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CircularProgress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var ImageLoader = function ImageLoader(props) {
  var _loaded = {};
  var spinnerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto'
  };

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_loaded[props.src]),
      _useState2 = _slicedToArray(_useState, 2),
      loaded = _useState2[0],
      setLoaded = _useState2[1];

  var onLoad = function onLoad() {
    _loaded[props.src] = true;
    setLoaded(true);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, !loaded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CircularProgress__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    style: spinnerStyle
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    alt: props.alt || '',
    className: "".concat(props.className || '', " ").concat(loaded ? 'is-img-loaded' : 'is-img-loading'),
    onLoad: onLoad,
    src: props.src
  }));
};

/* harmony default export */ __webpack_exports__["a"] = (ImageLoader);

/***/ })

/******/ });
//# sourceMappingURL=main.8a76fcc927efbd0484e7.js.map