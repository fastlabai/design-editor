'use client'
import * as React from 'react';
import React__default, { memo, useRef, useEffect, useContext, useState, useCallback, useMemo } from 'react';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { fabric } from 'fabric';
import { Switch, Modal, InputNumber, message } from 'antd';
import { clsx } from 'clsx';
import '@radix-ui/react-slider';
import * as RadixPopover from '@radix-ui/react-popover';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import * as RadixSelect from '@radix-ui/react-select';
import { Toaster, toast } from 'sonner';
import { ArrowLeftOutlined, UndoOutlined, RedoOutlined, ZoomOutOutlined, ZoomInOutlined, SettingOutlined, AppstoreOutlined, SaveOutlined, SearchOutlined, LoadingOutlined, CloudUploadOutlined, UploadOutlined, SwapOutlined, ScissorOutlined, BoldOutlined, ItalicOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined, CopyOutlined, DeleteOutlined, FolderOutlined, CloseOutlined, PictureOutlined, SmileOutlined, FontSizeOutlined, UpOutlined, DownOutlined, RightOutlined, EyeOutlined, EyeInvisibleOutlined, VideoCameraOutlined } from '@ant-design/icons';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_root.js
var require_root = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObject.js"(exports, module) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_defineProperty.js"(exports, module) {
    var getNative = require_getNative();
    var defineProperty = (function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    })();
    module.exports = defineProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayAggregator.js
var require_arrayAggregator = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayAggregator.js"(exports, module) {
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index2 = -1, length = array == null ? 0 : array.length;
      while (++index2 < length) {
        var value = array[index2];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    module.exports = arrayAggregator;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createBaseFor.js
var require_createBaseFor = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createBaseFor.js"(exports, module) {
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index2];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    module.exports = createBaseFor;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseFor.js
var require_baseFor = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseFor.js"(exports, module) {
    var createBaseFor = require_createBaseFor();
    var baseFor = createBaseFor();
    module.exports = baseFor;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseTimes.js"(exports, module) {
    function baseTimes(n, iteratee) {
      var index2 = -1, result = Array(n);
      while (++index2 < n) {
        result[index2] = iteratee(index2);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsArguments.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArguments.js"(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArray.js"(exports, module) {
    var isArray2 = Array.isArray;
    module.exports = isArray2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/stubFalse.js"(exports, module) {
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isBuffer.js"(exports, module) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isLength.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nodeUtil.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    module.exports = nodeUtil;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isTypedArray.js"(exports, module) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray2 = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isPrototype.js"(exports, module) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_overArg.js"(exports, module) {
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module.exports = overArg;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeKeys.js"(exports, module) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseKeys.js"(exports, module) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArrayLike.js"(exports, module) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/keys.js
var require_keys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/keys.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseForOwn.js
var require_baseForOwn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseForOwn.js"(exports, module) {
    var baseFor = require_baseFor();
    var keys = require_keys();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    module.exports = baseForOwn;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createBaseEach.js
var require_createBaseEach = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createBaseEach.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length, index2 = fromRight ? length : -1, iterable = Object(collection);
        while (fromRight ? index2-- : ++index2 < length) {
          if (iteratee(iterable[index2], index2, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    module.exports = createBaseEach;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseEach.js
var require_baseEach = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseEach.js"(exports, module) {
    var baseForOwn = require_baseForOwn();
    var createBaseEach = require_createBaseEach();
    var baseEach = createBaseEach(baseForOwn);
    module.exports = baseEach;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAggregator.js
var require_baseAggregator = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAggregator.js"(exports, module) {
    var baseEach = require_baseEach();
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection2) {
        setter(accumulator, value, iteratee(value), collection2);
      });
      return accumulator;
    }
    module.exports = baseAggregator;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/eq.js
var require_eq = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index2, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    module.exports = listCacheGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackClear.js"(exports, module) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackDelete.js"(exports, module) {
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackGet.js"(exports, module) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackHas.js"(exports, module) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stackSet.js"(exports, module) {
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module.exports = stackSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Stack.js"(exports, module) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setCacheAdd.js"(exports, module) {
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    module.exports = setCacheAdd;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setCacheHas.js"(exports, module) {
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module.exports = setCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_SetCache.js"(exports, module) {
    var MapCache = require_MapCache();
    var setCacheAdd = require_setCacheAdd();
    var setCacheHas = require_setCacheHas();
    function SetCache(values) {
      var index2 = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index2 < length) {
        this.add(values[index2]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module.exports = SetCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arraySome.js"(exports, module) {
    function arraySome(array, predicate) {
      var index2 = -1, length = array == null ? 0 : array.length;
      while (++index2 < length) {
        if (predicate(array[index2], index2, array)) {
          return true;
        }
      }
      return false;
    }
    module.exports = arraySome;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_cacheHas.js"(exports, module) {
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    module.exports = cacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalArrays.js"(exports, module) {
    var SetCache = require_SetCache();
    var arraySome = require_arraySome();
    var cacheHas = require_cacheHas();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack.get(array);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array;
      }
      var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index2 < arrLength) {
        var arrValue = array[index2], othValue = other[index2];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    module.exports = equalArrays;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Uint8Array.js"(exports, module) {
    var root = require_root();
    var Uint8Array2 = root.Uint8Array;
    module.exports = Uint8Array2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapToArray.js"(exports, module) {
    function mapToArray(map) {
      var index2 = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index2] = [key, value];
      });
      return result;
    }
    module.exports = mapToArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setToArray.js"(exports, module) {
    function setToArray(set) {
      var index2 = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index2] = value;
      });
      return result;
    }
    module.exports = setToArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalByTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var Uint8Array2 = require_Uint8Array();
    var eq = require_eq();
    var equalArrays = require_equalArrays();
    var mapToArray = require_mapToArray();
    var setToArray = require_setToArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    module.exports = equalByTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayPush.js"(exports, module) {
    function arrayPush(array, values) {
      var index2 = -1, length = values.length, offset = array.length;
      while (++index2 < length) {
        array[offset + index2] = values[index2];
      }
      return array;
    }
    module.exports = arrayPush;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isArray2 = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray2(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayFilter.js"(exports, module) {
    function arrayFilter(array, predicate) {
      var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index2 < length) {
        var value = array[index2];
        if (predicate(value, index2, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module.exports = arrayFilter;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/stubArray.js"(exports, module) {
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getSymbols.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getAllKeys.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_equalObjects.js"(exports, module) {
    var getAllKeys = require_getAllKeys();
    var COMPARE_PARTIAL_FLAG = 1;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index2 = objLength;
      while (index2--) {
        var key = objProps[index2];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index2 < objLength) {
        key = objProps[index2];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    module.exports = equalObjects;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_DataView.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module.exports = DataView;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Promise.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module.exports = Promise2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Set.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Set2 = getNative(root, "Set");
    module.exports = Set2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_WeakMap.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap2 = getNative(root, "WeakMap");
    module.exports = WeakMap2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getTag.js"(exports, module) {
    var DataView = require_DataView();
    var Map2 = require_Map();
    var Promise2 = require_Promise();
    var Set2 = require_Set();
    var WeakMap2 = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
    var Stack = require_Stack();
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var getTag = require_getTag();
    var isArray2 = require_isArray();
    var isBuffer = require_isBuffer();
    var isTypedArray = require_isTypedArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    module.exports = baseIsEqualDeep;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsEqual.js"(exports, module) {
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module.exports = baseIsEqual;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsMatch.js"(exports, module) {
    var Stack = require_Stack();
    var baseIsEqual = require_baseIsEqual();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseIsMatch(object, source, matchData, customizer) {
      var index2 = matchData.length, length = index2, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index2--) {
        var data = matchData[index2];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index2 < length) {
        data = matchData[index2];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    module.exports = baseIsMatch;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isStrictComparable.js"(exports, module) {
    var isObject = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    module.exports = isStrictComparable;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMatchData.js
var require_getMatchData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMatchData.js"(exports, module) {
    var isStrictComparable = require_isStrictComparable();
    var keys = require_keys();
    function getMatchData(object) {
      var result = keys(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    module.exports = getMatchData;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_matchesStrictComparable.js
var require_matchesStrictComparable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    module.exports = matchesStrictComparable;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseMatches.js
var require_baseMatches = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseMatches.js"(exports, module) {
    var baseIsMatch = require_baseIsMatch();
    var getMatchData = require_getMatchData();
    var matchesStrictComparable = require_matchesStrictComparable();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    module.exports = baseMatches;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKey.js"(exports, module) {
    var isArray2 = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray2(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/memoize.js"(exports, module) {
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module.exports = memoize;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_memoizeCapped.js"(exports, module) {
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stringToPath.js"(exports, module) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array, iteratee) {
      var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index2 < length) {
        result[index2] = iteratee(array[index2], index2, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray2 = require_isArray();
    var isSymbol = require_isSymbol();
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray2(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -Infinity ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toString.js
var require_toString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_castPath.js"(exports, module) {
    var isArray2 = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray2(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module.exports = castPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toKey.js"(exports, module) {
    var isSymbol = require_isSymbol();
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -Infinity ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGet.js"(exports, module) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path2) {
      path2 = castPath(path2, object);
      var index2 = 0, length = path2.length;
      while (object != null && index2 < length) {
        object = object[toKey(path2[index2++])];
      }
      return index2 && index2 == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/get.js
var require_get = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/get.js"(exports, module) {
    var baseGet = require_baseGet();
    function get(object, path2, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path2);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseHasIn.js"(exports, module) {
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hasPath.js"(exports, module) {
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray2 = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path2, hasFunc) {
      path2 = castPath(path2, object);
      var index2 = -1, length = path2.length, result = false;
      while (++index2 < length) {
        var key = toKey(path2[index2]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index2 != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) && (isArray2(object) || isArguments(object));
    }
    module.exports = hasPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/hasIn.js"(exports, module) {
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path2) {
      return object != null && hasPath(object, path2, baseHasIn);
    }
    module.exports = hasIn;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    var get = require_get();
    var hasIn = require_hasIn();
    var isKey = require_isKey();
    var isStrictComparable = require_isStrictComparable();
    var matchesStrictComparable = require_matchesStrictComparable();
    var toKey = require_toKey();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path2, srcValue) {
      if (isKey(path2) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path2), srcValue);
      }
      return function(object) {
        var objValue = get(object, path2);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path2) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    module.exports = baseMatchesProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/identity.js
var require_identity = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/identity.js"(exports, module) {
    function identity(value) {
      return value;
    }
    module.exports = identity;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseProperty.js
var require_baseProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseProperty.js"(exports, module) {
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module.exports = baseProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_basePropertyDeep.js"(exports, module) {
    var baseGet = require_baseGet();
    function basePropertyDeep(path2) {
      return function(object) {
        return baseGet(object, path2);
      };
    }
    module.exports = basePropertyDeep;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/property.js
var require_property = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/property.js"(exports, module) {
    var baseProperty = require_baseProperty();
    var basePropertyDeep = require_basePropertyDeep();
    var isKey = require_isKey();
    var toKey = require_toKey();
    function property(path2) {
      return isKey(path2) ? baseProperty(toKey(path2)) : basePropertyDeep(path2);
    }
    module.exports = property;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIteratee.js
var require_baseIteratee = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIteratee.js"(exports, module) {
    var baseMatches = require_baseMatches();
    var baseMatchesProperty = require_baseMatchesProperty();
    var identity = require_identity();
    var isArray2 = require_isArray();
    var property = require_property();
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == "object") {
        return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    module.exports = baseIteratee;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createAggregator.js
var require_createAggregator = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_createAggregator.js"(exports, module) {
    var arrayAggregator = require_arrayAggregator();
    var baseAggregator = require_baseAggregator();
    var baseIteratee = require_baseIteratee();
    var isArray2 = require_isArray();
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
        return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
      };
    }
    module.exports = createAggregator;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/groupBy.js
var require_groupBy = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/groupBy.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var createAggregator = require_createAggregator();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var groupBy2 = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue(result, key, [value]);
      }
    });
    module.exports = groupBy2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/lodash.js
var require_lodash = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/lodash.js"(exports, module) {
    (function() {
      var undefined2;
      var VERSION2 = "4.18.1";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`", INVALID_TEMPL_IMPORTS_ERROR_TEXT = "Invalid `imports` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        // Latin Extended-A block.
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = (function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      })();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          var value = array[index2];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (iteratee(array[index2], index2, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (!predicate(array[index2], index2, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index2 < length) {
          var value = array[index2];
          if (predicate(value, index2, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (comparator(value, array[index2])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array[index2], index2, array);
        }
        return result;
      }
      function arrayPush(array, values) {
        var index2 = -1, length = values.length, offset = array.length;
        while (++index2 < length) {
          array[offset + index2] = values[index2];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index2 = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index2];
        }
        while (++index2 < length) {
          accumulator = iteratee(accumulator, array[index2], index2, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index2-- : ++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (comparator(array[index2], value)) {
            return index2;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined2 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined2 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index2, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index2, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index2 = -1, length = array.length;
        while (++index2 < length) {
          var current = iteratee(array[index2]);
          if (current !== undefined2) {
            result = result === undefined2 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index2 = -1, result = Array(n);
        while (++index2 < n) {
          result[index2] = iteratee(index2);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap(props, function(key) {
          return [key, object[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index2 = -1, length = strSymbols.length;
        while (++index2 < length && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index2 = strSymbols.length;
        while (index2-- && baseIndexOf(chrSymbols, strSymbols[index2], 0) > -1) {
        }
        return index2;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? undefined2 : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map) {
        var index2 = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index2] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index2 = -1, length = array.length, resIndex = 0, result = [];
        while (++index2 < length) {
          var value = array[index2];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index2] = PLACEHOLDER;
            result[resIndex++] = index2;
          }
        }
        return result;
      }
      function setToArray(set) {
        var index2 = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index2] = value;
        });
        return result;
      }
      function setToPairs(set) {
        var index2 = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index2] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (array[index2] === value) {
            return index2;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index2 = fromIndex + 1;
        while (index2--) {
          if (array[index2] === value) {
            return index2;
          }
        }
        return index2;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index2 = string.length;
        while (index2-- && reWhitespace.test(string.charAt(index2))) {
        }
        return index2;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = (function runInContext2(context) {
        context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = (function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        })();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
        var defineProperty = (function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        })();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap2 && new WeakMap2();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
        function lodash(value) {
          if (isObjectLike(value) && !isArray2(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = /* @__PURE__ */ (function() {
          function object() {
          }
          return function(proto) {
            if (!isObject(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined2;
            return result2;
          };
        })();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined2;
        }
        lodash.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash
          }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray2(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index2 = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index2 += dir;
              var iterIndex = -1, value = array[index2];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined2 : result2;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined2;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key) {
          var data = this.__data__, index2 = assocIndexOf(data, key);
          if (index2 < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index2 == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index2, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key) {
          var data = this.__data__, index2 = assocIndexOf(data, key);
          return index2 < 0 ? undefined2 : data[index2][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__, index2 = assocIndexOf(data, key);
          if (index2 < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index2][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index2 = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index2 < length) {
            var entry = entries[index2];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index2 = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index2 < length) {
            this.add(values2[index2]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined2;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index2 = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index2 < length) {
            result2[index2] = skip ? undefined2 : get(object, paths[index2]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined2) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined2) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined2) {
            return result2;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray2(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined2 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined2 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined2, args);
          }, wait);
        }
        function baseDifference(array, values2, iteratee2, comparator) {
          var index2 = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index2 < length) {
              var value = array[index2], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index2, collection2) {
            result2 = !!predicate(value, index2, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index2 = -1, length = array.length;
          while (++index2 < length) {
            var value = array[index2], current = iteratee2(value);
            if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined2 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index2, collection2) {
            if (predicate(value, index2, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index2 = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index2 < length) {
            var value = array[index2];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction(object[key]);
          });
        }
        function baseGet(object, path2) {
          path2 = castPath(path2, object);
          var index2 = 0, length = path2.length;
          while (object != null && index2 < length) {
            object = object[toKey(path2[index2++])];
          }
          return index2 && index2 == length ? object : undefined2;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray2(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined2 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
          }
          array = arrays[0];
          var index2 = -1, seen = caches[0];
          outer:
            while (++index2 < length && result2.length < maxLength) {
              var value = array[index2], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path2, args) {
          path2 = castPath(path2, object);
          object = parent(object, path2);
          var func = object == null ? object : object[toKey(last(path2))];
          return func == null ? undefined2 : apply(func, object, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index2 = matchData.length, length = index2, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index2--) {
            var data = matchData[index2];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index2 < length) {
            data = matchData[index2];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined2 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index2 = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index2] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path2, srcValue) {
          if (isKey(path2) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path2), srcValue);
          }
          return function(object) {
            var objValue = get(object, path2);
            return objValue === undefined2 && objValue === srcValue ? hasIn(object, path2) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
              if (newValue === undefined2) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
          var isCommon = newValue === undefined2;
          if (isCommon) {
            var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray2(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined2;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray2(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index2 = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index2, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path2) {
            return hasIn(object, path2);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index2 = -1, length = paths.length, result2 = {};
          while (++index2 < length) {
            var path2 = paths[index2], value = baseGet(object, path2);
            if (predicate(value, path2)) {
              baseSet(result2, castPath(path2, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path2) {
          return function(object) {
            return baseGet(object, path2);
          };
        }
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index2 = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index2 < length) {
            var fromIndex = 0, value = values2[index2], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index2 = indexes[length];
            if (length == lastIndex || index2 !== previous) {
              var previous = index2;
              if (isIndex(index2)) {
                splice.call(array, index2, 1);
              } else {
                baseUnset(array, index2);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index2 = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index2] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + "");
        }
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path2, value, customizer) {
          if (!isObject(object)) {
            return object;
          }
          path2 = castPath(path2, object);
          var index2 = -1, length = path2.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index2 < length) {
            var key = toKey(path2[index2]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index2 != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined2;
              if (newValue === undefined2) {
                newValue = isObject(objValue) ? objValue : isIndex(path2[index2 + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        function baseSlice(array, start, end) {
          var index2 = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index2 < length) {
            result2[index2] = array[index2 + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index2, collection2) {
            result2 = predicate(value, index2, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index2 = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index2 < length) {
            var value = array[index2], computed = iteratee2 ? iteratee2(value) : value;
            if (!index2 || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray2(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index2 = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index2 < length) {
              var value = array[index2], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path2) {
          path2 = castPath(path2, object);
          var index2 = -1, length = path2.length;
          if (!length) {
            return true;
          }
          while (++index2 < length) {
            var key = toKey(path2[index2]);
            if (key === "__proto__" && !hasOwnProperty.call(object, "__proto__")) {
              return false;
            }
            if ((key === "constructor" || key === "prototype") && index2 < length - 1) {
              return false;
            }
          }
          var obj = parent(object, path2);
          return obj == null || delete obj[toKey(last(path2))];
        }
        function baseUpdate(object, path2, updater, customizer) {
          return baseSet(object, path2, updater(baseGet(object, path2)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index2 = fromRight ? length : -1;
          while ((fromRight ? index2-- : ++index2 < length) && predicate(array[index2], index2, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index2, fromRight ? index2 + 1 : length) : baseSlice(array, fromRight ? index2 + 1 : 0, fromRight ? length : index2);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index2 = -1, result2 = Array2(length);
          while (++index2 < length) {
            var array = arrays[index2], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index2) {
                result2[index2] = baseDifference(result2[index2] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values2, assignFunc) {
          var index2 = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index2 < length) {
            var value = index2 < valsLength ? values2[index2] : undefined2;
            assignFunc(result2, props[index2], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        function castPath(value, object) {
          if (isArray2(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined2 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout2 = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index2 = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index2 < length) {
            var result2 = compareAscending(objCriteria[index2], othCriteria[index2]);
            if (result2) {
              if (index2 >= ordersLength) {
                return result2;
              }
              var order = orders[index2];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index2 = -1, length = source.length;
          array || (array = Array2(length));
          while (++index2 < length) {
            array[index2] = source[index2];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index2 = -1, length = props.length;
          while (++index2 < length) {
            var key = props[index2];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
            if (newValue === undefined2) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined2 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index2 < length) {
              var source = sources[index2];
              if (source) {
                assigner(object, source, index2, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index2 = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index2-- : ++index2 < length) {
              if (iteratee2(iterable[index2], index2, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index2 = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index2];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index2 = length, placeholder = getHolder(wrapper);
            while (index2--) {
              args[index2] = arguments[index2];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined2,
                args,
                holders,
                undefined2,
                undefined2,
                arity - length
              );
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index2 = findIndexFunc(collection, predicate, fromIndex);
            return index2 > -1 ? iterable[iteratee2 ? collection[index2] : index2] : undefined2;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index2 = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index2--) {
              var func = funcs[index2];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index2 = wrapper ? index2 : length;
            while (++index2 < length) {
              func = funcs[index2];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray2(value)) {
                return wrapper.plant(value).value();
              }
              var index3 = 0, result2 = length ? funcs[index3].apply(this, args) : value;
              while (++index3 < length) {
                result2 = funcs[index3].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index2 = length;
            while (index2--) {
              args[index2] = arguments[index2];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined2 && other === undefined2) {
              return defaultValue;
            }
            if (value !== undefined2) {
              result2 = value;
            }
            if (other !== undefined2) {
              if (result2 === undefined2) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined2 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined2;
            }
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= -4;
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined2, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
          return new Set2(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= -97;
            partials = holders = undefined2;
          }
          ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined2 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined2;
          }
          var data = isBindKey ? undefined2 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= -25;
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined2, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject(objValue) && isObject(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined2 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index2 = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
          stack.set(array, other);
          stack.set(other, array);
          while (++index2 < arrLength) {
            var arrValue = array[index2], othValue = other[index2];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
            }
            if (compared !== undefined2) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index2 = objLength;
          while (index2--) {
            var key = objProps[index2];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index2 < objLength) {
            key = objProps[index2];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined2, flatten), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map2, key) {
          var data = map2.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined2;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined2;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index2 = -1, length = transforms.length;
          while (++index2 < length) {
            var data = transforms[index2], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path2, hasFunc) {
          path2 = castPath(path2, object);
          var index2 = -1, length = path2.length, result2 = false;
          while (++index2 < length) {
            var key = toKey(path2[index2]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index2 != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray2(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray2(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index2, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index2;
          if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
            return eq(object[index2], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray2(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index2 < length) {
              array[index2] = args[start + index2];
            }
            index2 = -1;
            var otherArgs = Array2(start + 1);
            while (++index2 < start) {
              otherArgs[index2] = args[index2];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path2) {
          return path2.length < 2 ? object : baseGet(object, baseSlice(path2, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index2 = indexes[length];
            array[length] = isIndex(index2, arrLength) ? oldArray[index2] : undefined2;
          }
          return array;
        }
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined2, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index2 = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined2 ? length : size2;
          while (++index2 < size2) {
            var rand = baseRandom(index2, lastIndex), value = array[rand];
            array[rand] = array[index2];
            array[index2] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index2 = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index2 < length) {
            result2[resIndex++] = baseSlice(array, index2, index2 += size2);
          }
          return result2;
        }
        function compact(array) {
          var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index2 < length) {
            var value = array[index2];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index2 = length;
          while (index2--) {
            args[index2 - 1] = arguments[index2];
          }
          return arrayPush(isArray2(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index2 < 0) {
            index2 = nativeMax(length + index2, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index2);
        }
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = length - 1;
          if (fromIndex !== undefined2) {
            index2 = toInteger(fromIndex);
            index2 = fromIndex < 0 ? nativeMax(length + index2, 0) : nativeMin(index2, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index2, true);
        }
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index2 = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index2 < length) {
            var pair = pairs[index2];
            baseAssignValue(result2, pair[0], pair[1]);
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined2;
        }
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index2 < 0) {
            index2 = nativeMax(length + index2, 0);
          }
          return baseIndexOf(array, value, index2);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined2;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined2;
        }
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index2 = length;
          if (fromIndex !== undefined2) {
            index2 = toInteger(fromIndex);
            index2 = index2 < 0 ? nativeMax(length + index2, 0) : nativeMin(index2, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index2) : baseFindIndex(array, baseIsNaN, index2, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index2) {
            return isIndex(index2, length) ? +index2 : index2;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index2 = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index2 < length) {
            var value = array[index2];
            if (predicate(value, index2, array)) {
              result2.push(value);
              indexes.push(index2);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined2 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index2 = baseSortedIndex(array, value);
            if (index2 < length && eq(array[index2], value)) {
              return index2;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index2 = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index2], value)) {
              return index2;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return array && array.length ? baseUniq(array, undefined2, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index2) {
            return arrayMap(array, baseProperty(index2));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined2, group);
          });
        }
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined2
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined2);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined2) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined2;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined2
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray2(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        function forEach(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray2(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy2 = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path2, args) {
          var index2 = -1, isFunc = typeof path2 == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index2] = isFunc ? apply(path2, value, args) : baseInvoke(value, path2, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray2(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray2(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined2 : orders;
          if (!isArray2(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray2(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray2(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray2(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray2(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray2(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some(collection, predicate, guard) {
          var func = isArray2(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined2 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined2;
            }
            return result2;
          };
        }
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined2;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined2;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined2;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined2) {
              clearTimeout2(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined2;
          }
          function flush() {
            return timerId === undefined2 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined2) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout2(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined2) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray2(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index2 = -1, length = nativeMin(args.length, funcsLength);
            while (++index2 < length) {
              args[index2] = transforms[index2].call(this, args[index2]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined2 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle3(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray2(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray2 = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          var result2 = customizer ? customizer(value, other) : undefined2;
          return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        function isFinite(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN2(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString(value) {
          return typeof value == "string" || !isArray2(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined2;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index2 = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index2 < length) {
            var source = sources[index2];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined2, customDefaultsMerge);
          return apply(mergeWith, undefined2, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get(object, path2, defaultValue) {
          var result2 = object == null ? undefined2 : baseGet(object, path2);
          return result2 === undefined2 ? defaultValue : result2;
        }
        function has(object, path2) {
          return object != null && hasPath(object, path2, baseHas);
        }
        function hasIn(object, path2) {
          return object != null && hasPath(object, path2, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path2) {
            path2 = castPath(path2, object);
            isDeep || (isDeep = path2.length > 1);
            return path2;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick2 = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path2) {
            return predicate(value, path2[0]);
          });
        }
        function result(object, path2, defaultValue) {
          path2 = castPath(path2, object);
          var index2 = -1, length = path2.length;
          if (!length) {
            length = 1;
            object = undefined2;
          }
          while (++index2 < length) {
            var value = object == null ? undefined2 : object[toKey(path2[index2])];
            if (value === undefined2) {
              index2 = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set(object, path2, value) {
          return object == null ? object : baseSet(object, path2, value);
        }
        function setWith(object, path2, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseSet(object, path2, value, customizer);
        }
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray2(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index2, object2) {
            return iteratee2(accumulator, value, index2, object2);
          });
          return accumulator;
        }
        function unset(object, path2) {
          return object == null ? true : baseUnset(object, path2);
        }
        function update(object, path2, updater) {
          return object == null ? object : baseUpdate(object, path2, castFunction(updater));
        }
        function updateWith(object, path2, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseUpdate(object, path2, castFunction(updater), customizer);
        }
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined2) {
            upper = lower;
            lower = undefined2;
          }
          if (upper !== undefined2) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined2) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined2;
          }
          if (floating === undefined2) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined2;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined2;
            }
          }
          if (lower === undefined2 && upper === undefined2) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined2) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index2) {
          word = word.toLowerCase();
          return result2 + (index2 ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString(string).toLowerCase());
        }
        function deburr(string) {
          string = toString(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString(string), n);
        }
        function replace() {
          var args = arguments, string = toString(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined2;
          }
          limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined2;
          }
          string = toString(string);
          options = assignWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          arrayEach(importsKeys, function(key) {
            if (reForbiddenIdentifierChars.test(key)) {
              throw new Error2(INVALID_TEMPL_IMPORTS_ERROR_TEXT);
            }
          });
          var isEscaping, isEvaluating, index2 = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index2, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index2 = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString(value).toLowerCase();
        }
        function toUpper(value) {
          return toString(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined2) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index2 = result2.lastIndexOf(separator);
            if (index2 > -1) {
              result2 = result2.slice(0, index2);
            }
          }
          return result2 + omission;
        }
        function unescape(string) {
          string = toString(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index2) {
          return result2 + (index2 ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString(string);
          pattern = guard ? undefined2 : pattern;
          if (pattern === undefined2) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined2, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index2 = -1;
            while (++index2 < length) {
              var pair = pairs[index2];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path2, srcValue) {
          return baseMatchesProperty(path2, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path2, args) {
          return function(object) {
            return baseInvoke(object, path2, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path2) {
            return baseInvoke(object, path2, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path2) {
          return isKey(path2) ? baseProperty(toKey(path2)) : basePropertyDeep(path2);
        }
        function propertyOf(object) {
          return function(path2) {
            return object == null ? undefined2 : baseGet(object, path2);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index2 = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index2 < n) {
            iteratee2(index2);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray2(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
        }
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
        }
        function mean(array) {
          return baseMean(array, identity);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
        }
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy2;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick2;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle3;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray2;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN2;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt2;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext2;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin(lodash, (function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!hasOwnProperty.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        })(), { "chain": false });
        lodash.VERSION = VERSION2;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function(methodName, index2) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index2 ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index2) {
          var type = index2 + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index2) {
          var takeName = "take" + (index2 ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index2) {
          var dropName = "drop" + (index2 ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path2, args) {
          if (typeof path2 == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path2, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined2) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray2(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray2(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray2(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined2
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      });
      var _ = runInContext();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _;
        define(function() {
          return _;
        });
      } else if (freeModule) {
        (freeModule.exports = _)._ = _;
        freeExports._ = _;
      } else {
        root._ = _;
      }
    }).call(exports);
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/now.js
var require_now = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/now.js"(exports, module) {
    var root = require_root();
    var now = function() {
      return root.Date.now();
    };
    module.exports = now;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_trimmedEndIndex.js
var require_trimmedEndIndex = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
      var index2 = string.length;
      while (index2-- && reWhitespace.test(string.charAt(index2))) {
      }
      return index2;
    }
    module.exports = trimmedEndIndex;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseTrim.js
var require_baseTrim = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseTrim.js"(exports, module) {
    var trimmedEndIndex = require_trimmedEndIndex();
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    module.exports = baseTrim;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toNumber.js
var require_toNumber = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toNumber.js"(exports, module) {
    var baseTrim = require_baseTrim();
    var isObject = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = toNumber;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/debounce.js
var require_debounce = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/debounce.js"(exports, module) {
    var isObject = require_isObject();
    var now = require_now();
    var toNumber = require_toNumber();
    var FUNC_ERROR_TEXT = "Expected a function";
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    function debounce(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    module.exports = debounce;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/throttle.js
var require_throttle = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/throttle.js"(exports, module) {
    var debounce = require_debounce();
    var isObject = require_isObject();
    var FUNC_ERROR_TEXT = "Expected a function";
    function throttle3(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    module.exports = throttle3;
  }
});

// src/providers/defaults/localStoragePersistence.ts
function createLocalStoragePersistence(opts = {}) {
  const prefix = opts.prefix ?? "design_editor_scene_";
  return {
    async save(sceneKey, scene) {
      localStorage.setItem(prefix + sceneKey, JSON.stringify(scene));
    },
    async load(sceneKey) {
      const raw = localStorage.getItem(prefix + sceneKey);
      return raw ? JSON.parse(raw) : null;
    },
    async list() {
      const out = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(prefix)) {
          out.push({ sceneKey: key.slice(prefix.length), updatedAt: 0 });
        }
      }
      return out;
    }
  };
}

// src/providers/defaults/googleFonts.ts
var GOOGLE_FONTS_API = "https://www.googleapis.com/webfonts/v1/webfonts";
var CURATED_FONTS = [
  { family: "Inter", category: "sans-serif" },
  { family: "Roboto", category: "sans-serif" },
  { family: "Open Sans", category: "sans-serif" },
  { family: "Lato", category: "sans-serif" },
  { family: "Montserrat", category: "sans-serif" },
  { family: "Playfair Display", category: "serif" },
  { family: "Merriweather", category: "serif" },
  { family: "JetBrains Mono", category: "monospace" }
];
function createGoogleFontsProvider(opts = {}) {
  const loaded2 = /* @__PURE__ */ new Set();
  return {
    async list({ search, signal } = {}) {
      if (!opts.apiKey) {
        return CURATED_FONTS.filter(
          (f) => !search || f.family.toLowerCase().includes(search.toLowerCase())
        );
      }
      const url = `${GOOGLE_FONTS_API}?key=${opts.apiKey}&sort=popularity`;
      const res = await fetch(url, { signal });
      const data = await res.json();
      return data.items.map((it) => ({
        family: it.family,
        weights: it.variants.filter((v) => /^\d+$/.test(v)).map(Number),
        category: it.category
      }));
    },
    async load(family) {
      if (loaded2.has(family)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;700&display=swap`;
      document.head.appendChild(link);
      await document.fonts.ready;
      loaded2.add(family);
    }
  };
}

// src/internal/dynamicImport.ts
var dynamicImport = new Function("specifier", "return import(specifier)");
function importOptionalPeer(specifier) {
  return dynamicImport(specifier);
}

// src/providers/defaults/imglyBackgroundRemoval.ts
function createImglyBackgroundRemoval() {
  return {
    async remove(input, opts) {
      let removeBackground;
      try {
        ;
        ({ removeBackground } = await importOptionalPeer("@imgly/background-removal"));
      } catch {
        throw new Error(
          "@imgly/background-removal is not installed. Either install it as a peer dependency or pass a custom backgroundRemovalProvider prop."
        );
      }
      return removeBackground(input, {
        progress: opts?.onProgress ? (_key, current, total) => opts.onProgress(current / total) : void 0
      });
    }
  };
}

// src/providers/defaults/nullMedia.ts
function createNullMediaProvider() {
  return {
    async list() {
      return { items: [] };
    },
    async upload() {
      throw new Error(
        "No mediaProvider configured. Pass a mediaProvider prop to <DesignEditor /> to enable uploads."
      );
    }
  };
}
var Context = React.createContext({
  zoomRatio: 1,
  activeObject: null,
  contextMenuRequest: null,
  frame: null,
  objects: [],
  editor: null,
  setActiveObject: () => {
  },
  setContextMenuRequest: () => {
  },
  setFrame: () => {
  },
  setObjects: () => {
  },
  setZoomRatio: () => {
  },
  setEditor: () => {
  }
});
var Provider = ({ children }) => {
  const [zoomRatio, setZoomRatio] = React.useState(1);
  const [activeObject, setActiveObject] = React.useState(null);
  const [frame, setFrame] = React.useState(null);
  const [editor, setEditor] = React.useState(null);
  const [contextMenuRequest, setContextMenuRequest] = React.useState(null);
  const [objects, setObjects] = React.useState([]);
  return /* @__PURE__ */ jsx(
    Context.Provider,
    {
      value: {
        zoomRatio,
        setZoomRatio,
        activeObject,
        setActiveObject,
        frame,
        setFrame,
        contextMenuRequest,
        setContextMenuRequest,
        objects,
        setObjects,
        editor,
        setEditor
      },
      children
    }
  );
};
function useZoomRatio() {
  const { zoomRatio } = React__default.useContext(Context);
  return zoomRatio;
}
function useEditor() {
  const { editor } = React__default.useContext(Context);
  return editor;
}
function useObjects() {
  const { objects } = React__default.useContext(Context);
  return objects;
}
function useActiveObject() {
  const { activeObject } = React__default.useContext(Context);
  return activeObject;
}
var FrameObject = class extends fabric.Rect {
  static type = "Frame";
  initialize(options) {
    super.initialize({
      ...options,
      selectable: false,
      hasControls: false,
      lockMovementY: true,
      lockMovementX: true,
      strokeWidth: 0,
      padding: 0,
      evented: false
    });
    return this;
  }
  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }
  static fromObject(options, callback) {
    return callback && callback(new fabric.Frame(options));
  }
};
fabric.Frame = fabric.util.createClass(FrameObject, {
  type: FrameObject.type
});
fabric.Frame.fromObject = FrameObject.fromObject;
var StaticTextObject = class extends fabric.Textbox {
  static type = "StaticText";
  fontURL;
  initialize(options) {
    const { text, ...textOptions } = options;
    super.initialize(text, { ...textOptions });
    return this;
  }
  toObject(propertiesToInclude = []) {
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {
      fontURL: this.fontURL
      // keys: this.keys,
      // originalText: originalText,
      // metadata: this.metadata,
    });
  }
  toJSON(propertiesToInclude = []) {
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {
      fontURL: this.fontURL
      // keys: this.keys,
      // originalText: originalText,
      // metadata: this.metadata,
    });
  }
  static fromObject(options, callback) {
    return callback && callback(new fabric.StaticText(options));
  }
};
fabric.StaticText = fabric.util.createClass(StaticTextObject, {
  type: StaticTextObject.type
});
fabric.StaticText.fromObject = StaticTextObject.fromObject;
var StaticImageObject = class extends fabric.Image {
  static type = "StaticImage";
  role = "regular";
  //@ts-ignore
  initialize(element, options) {
    this.role = element.role;
    options.type = "StaticImage";
    super.initialize(element, options);
    return this;
  }
  static fromObject(options, callback) {
    fabric.util.loadImage(
      options.src,
      function(img) {
        return callback && callback(new fabric.StaticImage(img, options));
      },
      null,
      // @ts-ignore
      { crossOrigin: "anonymous" }
    );
  }
  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }
};
fabric.StaticImage = fabric.util.createClass(StaticImageObject, {
  type: StaticImageObject.type
});
fabric.StaticImage.fromObject = StaticImageObject.fromObject;

// src/engine/objects/StaticVector.ts
var import_groupBy = __toESM(require_groupBy());
var StaticVectorObject = class extends fabric.Group {
  static type = "StaticVector";
  src;
  objectColors = {};
  colorMap = {};
  updateLayerColor(prev, next) {
    const sameObjects = this.objectColors[prev];
    if (sameObjects) {
      sameObjects.forEach((c) => {
        c.fill = next;
      });
      this.canvas?.requestRenderAll();
      this.colorMap[prev] = next;
    }
  }
  //@ts-ignore
  initialize(objects, options, others) {
    const existingColorMap = others.colorMap;
    const objectColors = (0, import_groupBy.default)(objects, "fill");
    if (existingColorMap) {
      Object.keys(existingColorMap).forEach((color) => {
        const colorObjects = objectColors[color];
        if (colorObjects) {
          colorObjects.forEach((c) => {
            c.fill = existingColorMap[color];
          });
        }
      });
    }
    this.objectColors = objectColors;
    const colorMap = {};
    Object.keys(objectColors).forEach((c) => {
      colorMap[c] = c;
    });
    if (existingColorMap) {
      Object.keys(existingColorMap).forEach((c) => {
        colorMap[c] = existingColorMap[c];
      });
    }
    this.colorMap = colorMap;
    const object = fabric.util.groupSVGElements(objects, options);
    super.initialize([object], { ...others, colorMap });
    this.set("src", others.src);
    return this;
  }
  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude, {
      src: this.src
    });
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude, {
      src: this.src
    });
  }
  static fromObject(options, callback) {
    fabric.loadSVGFromURL(options.src, (objects, opts) => {
      return callback && callback(new fabric.StaticVector(objects, opts, { ...options }));
    });
  }
};
fabric.StaticVector = fabric.util.createClass(StaticVectorObject, {
  type: StaticVectorObject.type
});
fabric.StaticVector.fromObject = StaticVectorObject.fromObject;
var StaticPathObject = class extends fabric.Path {
  static type = "StaticPath";
  initialize(options) {
    const { path: path2, ...pathOptions } = options;
    super.initialize(path2, pathOptions);
    return this;
  }
  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }
  static fromObject(options, callback) {
    return callback && callback(new fabric.StaticPath(options));
  }
};
fabric.StaticPath = fabric.util.createClass(StaticPathObject, {
  type: StaticPathObject.type
});
fabric.StaticPath.fromObject = StaticPathObject.fromObject;
var defaultShadow = {
  blur: 10,
  color: "#C7C7C7",
  offsetX: 0,
  offsetY: 0
};
var BackgroundObject = class extends fabric.Rect {
  static type = "Background";
  initialize(options) {
    const shadowOptions = options.shadow ? options.shadow : defaultShadow;
    const shadow = new fabric.Shadow({
      affectStroke: false,
      // @ts-ignore
      ...shadowOptions
    });
    super.initialize({
      ...options,
      selectable: false,
      hasControls: false,
      hasBorders: false,
      lockMovementY: true,
      lockMovementX: true,
      strokeWidth: 0,
      evented: true,
      hoverCursor: "default",
      shadow
    });
    this.on("mouseup", ({ target }) => {
      const activeSelection = this.canvas.getActiveObject();
      if (!activeSelection && target === this) {
        this.canvas.fire("background:selected");
      }
    });
    return this;
  }
  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }
  static fromObject(options, callback) {
    return callback && callback(new fabric.Background(options));
  }
};
fabric.Background = fabric.util.createClass(BackgroundObject, {
  type: BackgroundObject.type
});
fabric.Background.fromObject = BackgroundObject.fromObject;
var BackgroundImageObject = class extends fabric.Image {
  static type = "BackgroundImage";
  //@ts-ignore
  initialize(element, options) {
    options.type = "BackgroundImage";
    super.initialize(element, {
      ...options,
      hasControls: false,
      lockMovementY: true,
      lockMovementX: true,
      selectable: false,
      hoverCursor: "default",
      hasBorders: false
    });
    this.on("mouseup", ({ target }) => {
      const activeSelection = this.canvas.getActiveObject();
      if (!activeSelection && target === this) {
        this.canvas.fire("background:selected");
      }
    });
    this.on("mousedblclick", () => {
      this.set({
        hasControls: true,
        lockMovementY: false,
        lockMovementX: false,
        hasBorders: true
      });
      this.canvas.setActiveObject(this);
      this.canvas.requestRenderAll();
    });
    return this;
  }
  static fromObject(options, callback) {
    fabric.util.loadImage(
      options.src,
      function(img) {
        return callback && callback(new fabric.BackgroundImage(img, options));
      },
      null,
      // @ts-ignore
      { crossOrigin: "anonymous" }
    );
  }
  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }
  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }
};
fabric.BackgroundImage = fabric.util.createClass(BackgroundImageObject, {
  type: BackgroundImageObject.type
});
fabric.BackgroundImage.fromObject = BackgroundImageObject.fromObject;
var StaticVideoObject = class extends fabric.Image {
  static type = "StaticVideo";
  initialize(video, options) {
    const defaultOpts = {
      objectCaching: false,
      cacheProperties: ["time"]
    };
    options = options || {};
    super.initialize(video, Object.assign({}, defaultOpts, options));
    return this;
  }
  _draw(video, ctx, w, h) {
    const d = {
      x: -this.width / 2,
      y: -this.height / 2,
      w: this.width,
      h: this.height
    };
    ctx.drawImage(video, d.x, d.y, d.w, d.h);
  }
  _render(ctx) {
    this._draw(this.getElement(), ctx);
  }
  toObject(propertiesToInclude = []) {
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {});
  }
  toJSON(propertiesToInclude = []) {
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {});
  }
};
fabric.StaticVideo = fabric.util.createClass(StaticVideoObject, {
  type: StaticVideoObject.type
});
var StaticAudioObject = class extends fabric.Object {
  static type = "StaticAudio";
  initialize(options) {
    super.initialize({
      width: 0,
      height: 0,
      selectable: false,
      evented: false,
      visible: false,
      ...options
    });
    return this;
  }
  static fromObject(options, callback) {
    return callback && callback(new fabric.StaticAudio(options));
  }
};
fabric.StaticAudio = fabric.util.createClass(StaticAudioObject, {
  type: StaticAudioObject.type
});
fabric.StaticAudio.fromObject = StaticAudioObject.fromObject;

// src/engine/core/common/constants.ts
var PROPERTIES_TO_INCLUDE = [
  "id",
  "name",
  "description",
  "src",
  "keys",
  "keyValues",
  "animation",
  "metadata",
  "cut",
  "startAt",
  "endAt",
  "originalURL",
  "colorMap",
  "fontURL",
  "duration",
  "preview"
];
var defaultEditorConfig = {
  id: "random_id_12",
  clipToFrame: true,
  scrollLimit: 200,
  propertiesToInclude: PROPERTIES_TO_INCLUDE,
  guidelines: true,
  shortcuts: true,
  frameMargin: 120,
  background: "#ecf0f1",
  type: "GRAPHIC",
  size: {
    width: 1200,
    height: 900
  },
  controlsPosition: {
    rotation: "TOP"
  },
  shadow: {
    blur: 10,
    color: "#C7C7C7",
    offsetX: 0,
    offsetY: 0
  }
};
var defaultFrameOptions = {
  width: 1200,
  height: 1200,
  id: "frame",
  name: "Initial Frame",
  fill: "#ffffff",
  hoverCursor: "default"
};
var defaultBackgroundOptions = {
  width: 1200,
  height: 1200,
  fill: "#ffffff",
  id: "background",
  name: "Initial Frame"
};
var getCopyStyleVector = () => {
  const copyStyleVector = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 3.5H5a.5.5 0 0 0-.5.5v1.5A.5.5 0 0 0 5 6h11a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5zM5 2a2 2 0 0 0-2 2v1.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-.25h.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-.75.75h-5.75a2.25 2.25 0 0 0-2.25 2.25v1.563A2 2 0 0 0 9 15v5a2 2 0 0 0 2 2h.5a2 2 0 0 0 2-2v-5a2 2 0 0 0-1.5-1.937V11.5a.75.75 0 0 1 .75-.75h5.75a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25h-.515A2 2 0 0 0 16 2H5zm7 13a.5.5 0 0 0-.5-.5H11a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-5z" fill="currentColor"></path></svg>
	`;
  return `data:image/svg+xml;base64,${window.btoa(copyStyleVector)}`;
};
var getCopyStyleCursor = () => {
  return `url(${getCopyStyleVector()}), crosshair`;
};
var copyStyleProps = {
  StaticText: [
    "fill",
    "opacity",
    "stroke",
    "strokeWidth",
    "textAlign",
    "fontFamily",
    "fontSize",
    "underline",
    "shadow",
    "angle"
  ],
  StaticImage: ["opacity", "stroke", "strokeWidth", "shadow", "angle"],
  StaticPath: ["fill", "opacity", "stroke", "strokeWidth", "shadow", "angle"]
};
var Canvas = class {
  editor;
  container;
  canvasContainer;
  canvasElement;
  canvas;
  canvasId;
  options = {
    width: 0,
    height: 0
  };
  config;
  constructor({ id, config, editor }) {
    this.config = config;
    this.editor = editor;
    this.canvasId = id;
    this.initialize();
  }
  initialize = () => {
    const canvas = new fabric.Canvas(this.canvasId, {
      backgroundColor: this.config.background,
      preserveObjectStacking: true,
      fireRightClick: true,
      height: this.config.size.height,
      width: this.config.size.width
    });
    this.canvas = canvas;
    this.canvas.disableEvents = function() {
      if (this.__fire === void 0) {
        this.__fire = this.fire;
        this.fire = function() {
        };
      }
    };
    this.canvas.enableEvents = function() {
      if (this.__fire !== void 0) {
        this.fire = this.__fire;
        this.__fire = void 0;
      }
    };
  };
  destroy = () => {
  };
  resize({ width, height }) {
    this.canvas.setWidth(width).setHeight(height);
    this.canvas.renderAll();
    const diffWidth = width / 2 - this.options.width / 2;
    const diffHeight = height / 2 - this.options.height / 2;
    this.options.width = width;
    this.options.height = height;
    const deltaPoint = new fabric.Point(diffWidth, diffHeight);
    this.canvas.relativePan(deltaPoint);
  }
  getBoundingClientRect() {
    const canvasEl = document.getElementById("canvas");
    const position = {
      left: canvasEl?.getBoundingClientRect().left,
      top: canvasEl?.getBoundingClientRect().top
    };
    return position;
  }
  requestRenderAll() {
    this.canvas.requestRenderAll();
  }
  get backgroundColor() {
    return this.canvas.backgroundColor;
  }
  setBackgroundColor(color) {
    this.canvas.setBackgroundColor(color, () => {
      this.canvas.requestRenderAll();
      this.editor.emit("canvas:updated");
    });
  }
};
var canvas_default = Canvas;

// src/engine/core/state.ts
var State = class {
  frame = null;
  activeObject = null;
  objects = [];
  zoomRatio = 1;
  contextMenuRequest = null;
  editor = null;
  setFrame(o) {
    this.frame = o;
  }
  setActiveObject(o) {
    this.activeObject = o;
  }
  setObjects(o) {
    this.objects = o;
  }
  setZoomRatio(o) {
    this.zoomRatio = o;
  }
  setContextMenuRequest(o) {
    this.contextMenuRequest = o;
  }
  setEditor(o) {
    this.editor = o;
  }
};

// src/engine/core/utils/fabric.ts
var import_lodash = __toESM(require_lodash());
function angleToPoint(angle, sx, sy) {
  while (angle < 0) angle += 360;
  angle %= 360;
  let a = sy, b = a + sx, c = b + sy, p = (sx + sy) * 2, rp = p * 277e-5, pp = Math.round((angle * rp + (sy >> 1)) % p);
  if (pp <= a) return { x: 0, y: sy - pp };
  if (pp <= b) return { y: 0, x: pp - a };
  if (pp <= c) return { x: sx, y: pp - b };
  return { y: sy, x: sx - (pp - c) };
}
var setObjectGradient = (object, angle, colors) => {
  let odx = object.width >> 1;
  let ody = object.height >> 1;
  let startPoint = angleToPoint(angle, object.width, object.height);
  let endPoint = {
    x: object.width - startPoint.x,
    y: object.height - startPoint.y
  };
  object.set(
    "fill",
    new fabric.Gradient({
      type: "linear",
      coords: {
        x1: startPoint.x - odx,
        y1: startPoint.y - ody,
        x2: endPoint.x - odx,
        y2: endPoint.y - ody
      },
      colorStops: [
        { offset: 0, color: colors[0] },
        { offset: 1, color: colors[1] }
      ]
    })
  );
};
var setObjectShadow = (object, options) => {
  if (options.enabled) {
    object.set({
      shadow: new fabric.Shadow(options)
    });
  } else {
    object.set({
      shadow: null
    });
  }
};
var updateObjectShadow = (object, options) => {
  if (options) {
    object.set({
      shadow: new fabric.Shadow(options)
    });
  } else {
    object.set({
      shadow: null
    });
  }
};
var updateObjectBounds = (element, options) => {
  const { top, left, width, height } = element;
  if ((0, import_lodash.isNaN)(top) || (0, import_lodash.isNaN)(left)) {
    element.set({
      top: options.top + options.height / 2 - height / 2,
      left: options.left + options.width / 2 - width / 2
    });
  }
};
var fabric_default = setObjectGradient;

// src/engine/core/controllers/Base.ts
var Base = class {
  canvas;
  config;
  editor;
  state;
  constructor({ canvas, config, editor, state }) {
    this.canvas = canvas;
    this.config = config;
    this.editor = editor;
    this.state = state;
  }
};
var Base_default = Base;

// src/engine/core/controllers/Frame.ts
var Frame = class extends Base_default {
  constructor(props) {
    super(props);
    this.initialize();
  }
  initialize() {
    const frame = new fabric.Frame({
      ...defaultFrameOptions,
      absolutePositioned: this.config.clipToFrame
    });
    const background = new fabric.Background({
      ...defaultBackgroundOptions,
      shadow: this.config.shadow
    });
    this.canvas.add(frame, background);
    this.canvas.getCenter();
    frame.center();
    background.center();
    this.state.setFrame({
      height: defaultFrameOptions.width,
      width: defaultFrameOptions.height
    });
    setTimeout(() => {
      this.editor.zoom.zoomToFit();
      this.editor.history.initialize();
    }, 50);
  }
  get frame() {
    return this.canvas.getObjects().find((object) => object.type === "Frame" /* FRAME */);
  }
  get background() {
    return this.canvas.getObjects().find((object) => object.type === "Background" /* BACKGROUND */);
  }
  get options() {
    const options = this.frame.toJSON(this.config.propertiesToInclude);
    return options;
  }
  resize({ height, width }) {
    this.state.setFrame({
      height,
      width
    });
    const frame = this.frame;
    const background = this.background;
    frame.set({ width, height });
    frame.center();
    if (background) {
      background.set({ width, height });
      background.center();
    }
    this.editor.zoom.zoomToFit();
  }
  setHoverCursor = (cursor) => {
    const background = this.background;
    if (background) {
      background.set("hoverCursor", cursor);
    }
  };
  setBackgroundColor = (color) => {
    const background = this.background;
    if (background) {
      background.set({
        fill: color
      });
      this.canvas.requestRenderAll();
      this.editor.history.save();
    }
  };
  setBackgroundGradient = ({ angle, colors }) => {
    const background = this.background;
    if (background) {
      fabric_default(background, angle, colors);
      this.canvas.requestRenderAll();
      this.editor.history.save();
    }
  };
  getBoundingClientRect() {
    const frame = this.frame;
    return frame.getBoundingRect();
  }
  get fitRatio() {
    const options = this.frame;
    const canvasWidth = this.canvas.getWidth() - this.config.frameMargin;
    const canvasHeight = this.canvas.getHeight() - this.config.frameMargin;
    let scaleX = canvasWidth / options.width;
    let scaleY = canvasHeight / options.height;
    if (options.height >= options.width) {
      scaleX = scaleY;
      if (canvasWidth < options.width * scaleX) {
        scaleX = scaleX * (canvasWidth / (options.width * scaleX));
      }
    } else {
      if (canvasHeight < options.height * scaleX) {
        scaleX = scaleX * (canvasHeight / (options.height * scaleX));
      }
    }
    return scaleX;
  }
};
var Frame_default = Frame;
var Zoom = class extends Base_default {
  zoomIn() {
    let zoomRatio = this.canvas.getZoom();
    zoomRatio += 0.05;
    const center = this.canvas.getCenter();
    this.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
    this.state.setZoomRatio(zoomRatio);
  }
  zoomOut() {
    let zoomRatio = this.canvas.getZoom();
    zoomRatio -= 0.05;
    const center = this.canvas.getCenter();
    this.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
    this.state.setZoomRatio(zoomRatio);
  }
  zoomToOne() {
    const center = this.canvas.getCenter();
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    this.zoomToPoint(new fabric.Point(center.left, center.top), 1);
    this.state.setZoomRatio(1);
  }
  zoomToFit() {
    const zoomFitRatio = this.editor.frame.fitRatio;
    const center = this.canvas.getCenter();
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    this.zoomToPoint(new fabric.Point(center.left, center.top), zoomFitRatio);
    this.state.setZoomRatio(zoomFitRatio);
  }
  zoomToRatio(zoomRatio) {
    const center = this.canvas.getCenter();
    this.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
    this.state.setZoomRatio(zoomRatio);
  }
  zoomToPoint(point, zoom) {
    const minZoom = 10;
    const maxZoom = 300;
    let zoomRatio = zoom;
    if (zoom <= minZoom / 100) {
      zoomRatio = minZoom / 100;
    } else if (zoom >= maxZoom / 100) {
      zoomRatio = maxZoom / 100;
    }
    this.canvas.zoomToPoint(point, zoomRatio);
    this.state.setZoomRatio(zoomRatio);
  }
};
var Zoom_default = Zoom;

// src/engine/core/controllers/History.ts
var import_throttle = __toESM(require_throttle());
var History = class extends Base_default {
  redos = [];
  undos = [];
  current = [];
  isActive = false;
  initialize = () => {
    const canvasJSON = this.canvas.toJSON(this.config.propertiesToInclude);
    canvasJSON.objects.forEach((object) => {
      if (object.clipPath) {
        fabric.util.enlivenObjects(
          [object.clipPath],
          function(arg1) {
            object.clipPath = arg1[0];
          },
          ""
        );
      }
    });
    this.current = canvasJSON.objects;
  };
  getStatus = () => {
    return {
      hasUndo: this.undos.length >= 1,
      hasRedo: this.undos.length > 0,
      undos: this.undos,
      redos: this.redos,
      state: this.current
    };
  };
  save = () => {
    try {
      if (this.current) {
        const json = this.current;
        this.undos.push({
          type: "UPDATE",
          json
        });
        const canvasJSON = this.canvas.toJSON(this.config.propertiesToInclude);
        canvasJSON.objects.forEach((object) => {
          if (object.clipPath) {
            fabric.util.enlivenObjects(
              [object.clipPath],
              function(arg1) {
                object.clipPath = arg1[0];
              },
              ""
            );
          }
        });
        this.current = canvasJSON.objects;
      }
    } catch (err) {
      console.log(err);
    }
    this.emitStatus();
  };
  undo = (0, import_throttle.default)(() => {
    if (this.undos.length >= 1) {
      const undo = this.undos.pop();
      if (!undo) {
        return;
      }
      this.redos.push({
        type: "redo",
        json: this.current
      });
      this.restore(undo);
    }
  }, 100);
  redo = (0, import_throttle.default)(() => {
    const redo = this.redos.pop();
    if (!redo) {
      return;
    }
    this.undos.push({
      type: "undo",
      json: this.current
    });
    this.restore(redo);
  }, 100);
  restore = (transaction) => {
    if (!this.isActive) {
      this.editor.objects.clear();
      const objects = transaction.json;
      this.current = objects;
      this.isActive = true;
      fabric.util.enlivenObjects(
        objects,
        (enlivenObjects) => {
          enlivenObjects.forEach((enlivenObject) => {
            if (enlivenObject.type !== "Frame" /* FRAME */) {
              this.canvas.add(enlivenObject);
            }
          });
          this.emitStatus();
        },
        ""
      );
      this.isActive = false;
    }
  };
  reset = () => {
    this.redos = [];
    this.undos = [];
    this.emitStatus();
  };
  emitStatus = () => {
    this.editor.emit("history:changed", {
      hasUndo: this.undos.length >= 1,
      hasRedo: this.redos.length > 0
    });
  };
  get status() {
    return {
      undos: this.undos,
      redos: this.redos,
      state: this.current
    };
  }
};
var History_default = History;

// src/engine/core/controllers/Objects.ts
var import_lodash2 = __toESM(require_lodash());

// src/engine/core/utils/id.ts
function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "id-" + Math.random().toString(36).substring(2, 15);
}
function loadImageFromURL(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      resolve(image);
    };
  });
}

// src/engine/core/utils/video-loader.ts
var createVideoElement = async (id, src) => {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement("video");
    videoElement.setAttribute("id", id);
    videoElement.setAttribute("src", src);
    videoElement.crossOrigin = "anonymous";
    videoElement.style.display = "none";
    videoElement.style.zIndex = "1000";
    videoElement.style.position = "absolute";
    videoElement.setAttribute("controls", "true");
    videoElement.addEventListener("loadedmetadata", (e) => {
      videoElement.currentTime = 0;
    });
    videoElement.addEventListener("seeked", function() {
      resolve(videoElement);
    });
    videoElement.addEventListener("error", function(error) {
      reject(error);
    });
  });
};

// src/engine/core/utils/object-importer.ts
var ObjectImporter = class {
  constructor(editor) {
    this.editor = editor;
  }
  editor;
  async import(item, options, inGroup = false) {
    let object;
    switch (item.type) {
      case "StaticText" /* STATIC_TEXT */:
        object = await this.staticText(item, options, inGroup);
        break;
      case "StaticImage" /* STATIC_IMAGE */:
        object = await this.staticImage(item, options, inGroup);
        break;
      case "BackgroundImage" /* BACKGROUND_IMAGE */:
        object = await this.backgroundImage(item, options, inGroup);
        break;
      case "StaticVideo" /* STATIC_VIDEO */:
        object = await this.staticVideo(item, options, inGroup);
        break;
      case "StaticVector" /* STATIC_VECTOR */:
        object = await this.staticVector(item, options, inGroup);
        break;
      case "StaticPath" /* STATIC_PATH */:
        object = await this.staticPath(item, options, inGroup);
        break;
      case "Background" /* BACKGROUND */:
        object = await this.background(item, options, inGroup);
        break;
      case "Group" /* GROUP */:
        object = await this.group(item, options, inGroup);
        break;
      case "StaticAudio" /* STATIC_AUDIO */:
        object = await this.staticAudio(item, options, inGroup);
        break;
      default:
        object = await this.background(item, options, inGroup);
    }
    return object;
  }
  staticText(item, options, inGroup) {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup);
        const metadata = item.metadata;
        const { textAlign, fontFamily, fontSize, charSpacing, lineHeight, text, underline, fill, fontURL } = item;
        const textOptions = {
          ...baseOptions,
          underline,
          width: baseOptions.width ? baseOptions.width : 240,
          fill: fill ? fill : "#333333",
          text: text ? text : "Empty Text",
          ...textAlign && { textAlign },
          ...fontFamily && { fontFamily },
          ...fontSize && { fontSize },
          ...charSpacing && { charSpacing },
          ...lineHeight && { lineHeight },
          metadata,
          fontURL
        };
        const element = new fabric.StaticText(textOptions);
        updateObjectBounds(element, options);
        updateObjectShadow(element, item.shadow);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  staticImage(item, options, inGroup) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup);
        const { src, cropX, cropY } = item;
        const image = await loadImageFromURL(src);
        const { width, height } = baseOptions;
        if (!width || !height) {
          baseOptions.width = image.width;
          baseOptions.height = image.height;
        }
        const element = new fabric.StaticImage(image, {
          ...baseOptions,
          cropX: cropX || 0,
          cropY: cropY || 0
        });
        updateObjectBounds(element, options);
        updateObjectShadow(element, item.shadow);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  backgroundImage(item, options, inGroup) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup);
        const { src, cropX, cropY } = item;
        const image = await loadImageFromURL(src);
        const { width, height } = baseOptions;
        if (!width || !height) {
          baseOptions.width = image.width;
          baseOptions.height = image.height;
        }
        const element = new fabric.BackgroundImage(image, {
          ...baseOptions,
          cropX: cropX || 0,
          cropY: cropY || 0
        });
        updateObjectBounds(element, options);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  staticVideo(item, options, inGroup) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup);
        const { src } = item;
        const id = item.id;
        const videoElement = await createVideoElement(id, src);
        const { width, height } = baseOptions;
        if (!width || !height) {
          baseOptions.width = videoElement.videoWidth;
          baseOptions.height = videoElement.videoHeight;
        }
        const element = new fabric.StaticVideo(videoElement, {
          ...baseOptions,
          src,
          duration: videoElement.duration,
          totalDuration: videoElement.duration
        });
        element.set("time", 10);
        videoElement.currentTime = 10;
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  staticAudio(item, options, inGroup) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup);
        const { src } = item;
        const element = new fabric.StaticAudio({
          ...baseOptions,
          src
        });
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  staticPath(item, options, inGroup) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup);
        const { path: path2, fill } = item;
        const element = new fabric.StaticPath({
          ...baseOptions,
          // @ts-ignore
          path: path2,
          fill
        });
        updateObjectBounds(element, options);
        updateObjectShadow(element, item.shadow);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  group(item, options, inGroup) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup);
        let objects = [];
        for (const object of item.objects) {
          objects = objects.concat(await this.import(object, options, true));
        }
        const element = new fabric.Group(objects, { ...baseOptions, subTargetCheck: true });
        updateObjectBounds(element, options);
        updateObjectShadow(element, item.shadow);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  background(item, options, inGroup) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup);
        const { fill } = item;
        const element = new fabric.Background({
          ...baseOptions,
          fill,
          // @ts-ignore
          shadow: item.shadow
        });
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  staticVector(item, options, inGroup) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options, inGroup);
        const { src, colorMap = {} } = item;
        fabric.loadSVGFromURL(src, (objects, opts) => {
          const { width, height } = baseOptions;
          if (!width || !height) {
            baseOptions.width = opts.width;
            baseOptions.height = opts.height;
            baseOptions.top = options.top;
            baseOptions.left = options.left;
          }
          const element = new fabric.StaticVector(objects, opts, {
            ...baseOptions,
            src,
            colorMap
          });
          updateObjectBounds(element, options);
          updateObjectShadow(element, item.shadow);
          resolve(element);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  getBaseOptions(item, options, inGroup) {
    const {
      id,
      name,
      left,
      top,
      width,
      height,
      scaleX,
      scaleY,
      stroke,
      strokeWidth,
      angle,
      opacity,
      flipX,
      flipY,
      skewX,
      skewY,
      originX,
      originY,
      type,
      preview
    } = item;
    let metadata = item.metadata ? item.metadata : {};
    const { fill } = metadata;
    let baseOptions = {
      id: id ? id : generateId(),
      name: name ? name : type,
      angle: angle ? angle : 0,
      top: inGroup ? top : options.top + top,
      left: inGroup ? left : options.left + left,
      width,
      height,
      originX: originX || "left",
      originY: originY || "top",
      scaleX: scaleX || 1,
      scaleY: scaleY || 1,
      fill: fill || "#000000",
      opacity: opacity ? opacity : 1,
      flipX: flipX ? flipX : false,
      flipY: flipY ? flipY : false,
      skewX: skewX ? skewX : 0,
      skewY: skewY ? skewY : 0,
      ...stroke && { stroke },
      strokeWidth: strokeWidth ? strokeWidth : 0,
      strokeDashArray: item.strokeDashArray ? item.strokeDashArray : null,
      strokeLineCap: item.strokeLineCap ? item.strokeLineCap : "butt",
      strokeLineJoin: item.strokeLineJoin ? item.strokeLineJoin : "miter",
      strokeUniform: item.strokeUniform || false,
      strokeMiterLimit: item.strokeMiterLimit ? item.strokeMiterLimit : 4,
      strokeDashOffset: item.strokeDashOffset ? item.strokeMiterLimit : 0,
      metadata,
      preview
    };
    return baseOptions;
  }
};
var object_importer_default = ObjectImporter;

// src/engine/core/controllers/Objects.ts
var Objects = class extends Base_default {
  clipboard;
  isCut;
  copyStyleClipboard;
  add = async (item) => {
    const { canvas } = this;
    const options = this.editor.frame.options;
    const objectImporter = new object_importer_default(this.editor);
    const refItem = item;
    const object = await objectImporter.import(refItem, options);
    if (this.config.clipToFrame) {
      const frame = this.editor.frame.frame;
      object.clipPath = frame;
    }
    const isBackgroundImage = refItem.type === "BackgroundImage" /* BACKGROUND_IMAGE */;
    let currentBackgrounImage;
    if (isBackgroundImage) {
      currentBackgrounImage = await this.unsetBackgroundImage();
    }
    if (isBackgroundImage) {
      canvas.add(object);
      object.moveTo(2);
      this.scale("fill", object.id);
      if (currentBackgrounImage) {
        canvas.add(currentBackgrounImage);
        this.sendToBack(currentBackgrounImage.id);
      }
    } else {
      canvas.add(object);
      object.center();
    }
    this.state.setActiveObject(object);
    canvas.setActiveObject(object);
    this.updateContextObjects();
    this.editor.history.save();
    if (object.type === "StaticVideo") {
      setTimeout(() => {
        this.canvas.requestRenderAll();
      }, 500);
    }
  };
  /**
   *
   * @param options object properties to be updated
   * @param id if provided, will update the update by id
   */
  update = (options, id) => {
    const frame = this.editor.frame.frame;
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    const canvas = this.canvas;
    if (refObject) {
      for (const property in options) {
        if (property === "angle" || property === "top" || property === "left") {
          if (property === "angle") {
            refObject.rotate(options["angle"]);
            canvas.requestRenderAll();
          } else {
            refObject.set(property, frame[property] + options[property]);
            canvas.requestRenderAll();
          }
        } else if (property === "clipToFrame") {
          if (options["clipToFrame"]) {
            refObject.set("clipPath", frame);
          } else {
            refObject.set("clipPath", null);
          }
        } else if (property === "shadow") {
          this.setShadow(options["shadow"]);
        } else if (property === "metadata") {
          refObject.set("metadata", {
            ...refObject.metadata,
            ...options[property]
          });
        } else if (refObject.type === "activeSelection" /* ACTIVE_SELECTION */ && refObject._objects) {
          refObject._objects.forEach((object) => {
            if (property === "metadata") {
              object.set("metadata", {
                ...object.metadata,
                ...options["metadata"]
              });
            } else {
              object.set(property, options[property]);
            }
            object.setCoords();
          });
        } else {
          refObject.set(property, options[property]);
          canvas.requestRenderAll();
          refObject.setCoords();
        }
      }
      this.editor.history.save();
    }
  };
  clear = () => {
    const frame = this.editor.frame.frame;
    this.canvas.getObjects().forEach((object) => {
      if (object.type !== "Frame" /* FRAME */) {
        this.canvas.remove(object);
      }
    });
    frame.set({
      fill: "#ffffff"
    });
    this.canvas.renderAll();
  };
  reset = () => {
    const background = this.editor.frame.background;
    this.canvas.getObjects().forEach((object) => {
      if (object.type !== "Frame" /* FRAME */ && object.type !== "Background" /* BACKGROUND */) {
        this.canvas.remove(object);
      }
    });
    background?.set({
      fill: "#ffffff"
    });
    this.canvas.renderAll();
    this.editor.history.reset();
  };
  select = (id) => {
    this.canvas.discardActiveObject();
    if (id) {
      const [object] = this.findById(id);
      if (object) {
        this.canvas.disableEvents();
        this.canvas.setActiveObject(object);
        if (object.group) {
          object.hasControls = false;
        }
        this.canvas.enableEvents();
        this.canvas.requestRenderAll();
        const activeObject = this.canvas.getActiveObject();
        this.state.setActiveObject(activeObject);
      }
    } else {
      const filteredObjects = this.canvas.getObjects().filter((object) => {
        if (object.type === "Frame" /* FRAME */ || object.type === "Background" /* BACKGROUND */) {
          return false;
        } else if (!object.evented) {
          return false;
        } else if (object.locked) {
          return false;
        }
        return true;
      });
      if (!filteredObjects.length) {
        return;
      }
      if (filteredObjects.length === 1) {
        this.canvas.setActiveObject(filteredObjects[0]);
        this.canvas.renderAll();
        this.state.setActiveObject(filteredObjects[0]);
        return;
      }
      const activeSelection = new fabric.ActiveSelection(filteredObjects, {
        canvas: this.canvas
      });
      this.canvas.setActiveObject(activeSelection);
      this.canvas.renderAll();
      this.state.setActiveObject(activeSelection);
    }
  };
  deselect = () => {
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
    this.state.setActiveObject(null);
  };
  move(direction, value, id) {
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      const updatedPosition = refObject[direction] + value;
      refObject.set(direction, updatedPosition);
      this.editor.history.save();
    }
  }
  position(position, value, id) {
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      refObject.set(position, value);
      this.editor.history.save();
    }
  }
  resize(size, value, id) {
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (size === "width") {
      refObject.set("scaleX", value / refObject.width);
    }
    if (size === "height") {
      refObject.set("scaleY", value / refObject.height);
    }
  }
  scale(type, id) {
    let refObject = this.canvas.getActiveObject();
    const { width, height, top } = this.editor.frame.frame;
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      let scaleX = width / refObject.width;
      let scaleY = height / refObject.height;
      const scaleMax = Math.max(scaleX, scaleY);
      const scaleMin = Math.min(scaleX, scaleY);
      if (type === "fit") {
        refObject.set({
          scaleX: scaleMin,
          scaleY: scaleMin
        });
      }
      if (type === "fill") {
        refObject.set({
          scaleY: scaleMax,
          scaleX: scaleMax
        });
      }
      refObject.center();
      if (scaleY >= scaleX) {
        refObject.set("top", top);
      }
    }
  }
  cut = () => {
    this.copy();
    this.isCut = true;
    this.remove();
  };
  copy = () => {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      this.clipboard = activeObject;
    }
  };
  copyById = (id) => {
    const object = this.findOneById(id);
    if (object) {
      this.clipboard = object;
    }
  };
  clone = () => {
    if (this.canvas) {
      const activeObject = this.canvas.getActiveObject();
      const frame = this.editor.frame.frame;
      this.canvas.discardActiveObject();
      this.duplicate(activeObject, frame, (duplicates) => {
        const selection = new fabric.ActiveSelection(duplicates, {
          canvas: this.canvas
        });
        this.canvas.setActiveObject(selection);
        this.canvas.requestRenderAll();
      });
    }
  };
  cloneAudio = (id) => {
    const object = this.findOneById(id);
    const frame = this.editor.frame.frame;
    this.deselect();
    this.duplicate(object, frame, (duplicates) => {
      this.canvas.requestRenderAll();
      this.updateContextObjects();
    });
  };
  duplicate(object, frame, callback) {
    if (object instanceof fabric.Group && object.type !== "StaticVector" /* STATIC_VECTOR */) {
      const objects = object.getObjects();
      const duplicates = [];
      for (let i = 0; i < objects.length; i++) {
        this.duplicate(objects[i], frame, (clones) => {
          duplicates.push(...clones);
          if (i === objects.length - 1) {
            callback(duplicates);
          }
        });
      }
    } else {
      object.clone(
        (clone) => {
          clone.clipPath = void 0;
          clone.id = generateId();
          clone.set({
            left: object.left + 10,
            top: object.top + 10
          });
          if (this.config.clipToFrame) {
            const frame2 = this.editor.frame.frame;
            clone.clipPath = frame2;
          }
          this.canvas.add(clone);
          callback([clone]);
        },
        ["keyValues", "src"]
      );
    }
  }
  paste = () => {
    const object = this.clipboard;
    if (object) {
      const frame = this.editor.frame.frame;
      this.canvas.discardActiveObject();
      this.duplicate(object, frame, (duplicates) => {
        const selection = new fabric.ActiveSelection(duplicates, {
          canvas: this.canvas
        });
        this.canvas.setActiveObject(selection);
        this.canvas.requestRenderAll();
        this.updateContextObjects();
      });
    }
  };
  /**`
   * Remove active object
   */
  remove = (id) => {
    let refObject = this.canvas.getActiveObjects();
    if (id) {
      refObject = this.findOneById(id);
    }
    if ((0, import_lodash2.isArray)(refObject)) {
      refObject.forEach((obj) => {
        this.canvas.remove(obj);
      });
    } else {
      this.canvas.remove(refObject);
    }
    this.canvas.discardActiveObject().renderAll();
    this.editor.history.save();
    this.updateContextObjects();
  };
  list = () => {
    const objects = this.canvas.getObjects();
    const filteredObjects = objects.filter((o) => {
      return o.type !== "Frame" /* FRAME */ && o.type !== "Background" /* BACKGROUND */;
    });
    return filteredObjects;
  };
  copyStyle = () => {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      const clonableProps = copyStyleProps[activeObject.type];
      const clonedProps = (0, import_lodash2.pick)(activeObject.toJSON(), clonableProps);
      this.copyStyleClipboard = {
        objectType: activeObject.type,
        props: clonedProps
      };
      this.editor.frame.setHoverCursor(getCopyStyleCursor());
      this.canvas.hoverCursor = getCopyStyleCursor();
      this.canvas.defaultCursor = getCopyStyleCursor();
    }
  };
  pasteStyle = () => {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject && this.copyStyleClipboard) {
      if (activeObject.type === this.copyStyleClipboard.objectType) {
        const { fill, ...basicProps } = this.copyStyleClipboard.props;
        activeObject.set(basicProps);
        if (fill) {
          if (fill.type) {
            activeObject.set({ fill: new fabric.Gradient(fill) });
          } else {
            activeObject.set({ fill });
          }
        }
      }
    }
    this.copyStyleClipboard = null;
    this.editor.frame.setHoverCursor("default");
    this.canvas.hoverCursor = "move";
    this.canvas.defaultCursor = "default";
  };
  /**
   * Moves an object or a selection up in stack of drawn objects.
   */
  bringForward = (id) => {
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      this.canvas.bringForward(refObject);
    }
  };
  bringForwardById = (id) => {
    this.canvas.getObjects().forEach((o) => {
      if (o.id === id) {
        this.canvas.bringForward(o);
      }
    });
  };
  /**
   * Moves an object or the objects of a multiple selection to the top of the stack of drawn objects
   */
  bringToFront = (id) => {
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      this.canvas.bringToFront(refObject);
    }
  };
  /**
   * Moves an object or a selection down in stack of drawn objects.
   */
  sendBackwards = (id) => {
    const objects = this.canvas.getObjects();
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    const index2 = objects.findIndex((o) => o === refObject);
    const backgroundImage = objects.find((o) => o.type === "BackgroundImage" /* BACKGROUND_IMAGE */);
    const canBeMoved = backgroundImage ? index2 > 3 : index2 > 2;
    if (refObject && canBeMoved) {
      this.canvas.sendBackwards(refObject);
    }
  };
  /**
   * Moves an object to specified level in stack of drawn objects.
   */
  sendToBack = (id) => {
    let refObject = this.canvas.getActiveObject();
    const objects = this.canvas.getObjects();
    const backgroundImage = objects.find((o) => o.type === "BackgroundImage" /* BACKGROUND_IMAGE */);
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      if (backgroundImage) {
        refObject.moveTo(3);
      } else {
        refObject.moveTo(2);
      }
    }
  };
  /**
   * Moves an object to the top of the frame. If multiple objects are selected,
   * will move all objects to the top of the selection.
   */
  alignTop = (id) => {
    const frame = this.editor.frame.frame;
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      if (refObject.type === "activeSelection" /* ACTIVE_SELECTION */) {
        const selectedObjects = refObject._objects;
        const refTop = refObject.top;
        this.canvas.discardActiveObject();
        selectedObjects.forEach((object) => {
          const currentObject = object;
          currentObject.set({
            top: refTop
          });
        });
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas
        });
        this.canvas.setActiveObject(selection);
        this.state.setActiveObject(selection);
      } else {
        const currentObject = refObject;
        currentObject.set({
          top: frame.top
        });
      }
      this.canvas.requestRenderAll();
    }
  };
  /**
   * Moves an object to the middle of the frame. If multiple objects are selected,
   * will move all objects to the middle of the selection.
   */
  alignMiddle = (id) => {
    const frame = this.editor.frame.frame;
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      if (refObject.type === "activeSelection" /* ACTIVE_SELECTION */) {
        const selectedObjects = refObject._objects;
        const refTop = refObject.top;
        const refHeight = refObject.height;
        this.canvas.discardActiveObject();
        selectedObjects.forEach((object) => {
          const currentObject = object;
          const currentObjectHeight = currentObject.getScaledHeight();
          currentObject.set({
            top: refTop + refHeight / 2 - currentObjectHeight / 2
          });
        });
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas
        });
        this.canvas.setActiveObject(selection);
        this.state.setActiveObject(selection);
      } else {
        const currentObject = refObject;
        const currentObjectHeight = currentObject.getScaledHeight();
        currentObject.set({
          top: frame.top + frame.height / 2 - currentObjectHeight / 2
        });
      }
      this.canvas.requestRenderAll();
    }
  };
  /**
   * Moves an object to the bottom of the frame. If multiple objects are selected,
   * will move all objects to the bottom of the selection.
   */
  alignBottom = (id) => {
    const frame = this.editor.frame.frame;
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      if (refObject.type === "activeSelection" /* ACTIVE_SELECTION */) {
        const selectedObjects = refObject._objects;
        const refTop = refObject.top;
        const refHeight = refObject.height;
        this.canvas.discardActiveObject();
        selectedObjects.forEach((object) => {
          const currentObject = object;
          const currentObjectHeight = currentObject.getScaledHeight();
          currentObject.set({
            top: refTop + refHeight - currentObjectHeight
          });
        });
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas
        });
        this.canvas.setActiveObject(selection);
        this.state.setActiveObject(selection);
      } else {
        const currentObject = refObject;
        const currentObjectHeight = currentObject.getScaledHeight();
        currentObject.set({
          top: frame.top + frame.height - currentObjectHeight
        });
      }
      this.canvas.requestRenderAll();
    }
  };
  /**
   * Moves an object to the left of the frame. If multiple objects are selected,
   * will move all objects to the left of the selection.
   */
  alignLeft = (id) => {
    const frame = this.editor.frame.frame;
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      if (refObject.type === "activeSelection" /* ACTIVE_SELECTION */) {
        const selectedObjects = refObject._objects;
        const refLeft = refObject.left;
        this.canvas.discardActiveObject();
        selectedObjects.forEach((object) => {
          const currentObject = object;
          currentObject.set({
            left: refLeft
          });
        });
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas
        });
        this.canvas.setActiveObject(selection);
        this.state.setActiveObject(selection);
      } else {
        const currentObject = refObject;
        currentObject.set({
          left: frame.left
        });
      }
      this.canvas.requestRenderAll();
    }
  };
  /**
   * Moves an object to the center of the frame. If multiple objects are selected,
   * will move all objects to the center of the selection.
   */
  alignCenter = (id) => {
    const frame = this.editor.frame.frame;
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      if (refObject.type === "activeSelection" /* ACTIVE_SELECTION */) {
        const selectedObjects = refObject._objects;
        const refLeft = refObject.left;
        const refWidth = refObject.width;
        this.canvas.discardActiveObject();
        selectedObjects.forEach((object) => {
          const currentObject = object;
          const currentObjectWidth = currentObject.getScaledWidth();
          currentObject.set({
            left: refLeft + refWidth / 2 - currentObjectWidth / 2
          });
        });
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas
        });
        this.canvas.setActiveObject(selection);
        this.state.setActiveObject(selection);
      } else {
        const currentObject = refObject;
        const currentObjectWidth = currentObject.getScaledWidth();
        currentObject.set({
          left: frame.left + frame.width / 2 - currentObjectWidth / 2
        });
      }
      this.canvas.requestRenderAll();
    }
  };
  /**
   * Moves an object to the right of the frame. If multiple objects are selected,
   * will move all objects to the right of the selection.
   */
  alignRight = (id) => {
    const frame = this.editor.frame.frame;
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      if (refObject.type === "activeSelection" /* ACTIVE_SELECTION */) {
        const selectedObjects = refObject._objects;
        const refLeft = refObject.left;
        const refWidth = refObject.width;
        this.canvas.discardActiveObject();
        selectedObjects.forEach((object) => {
          const currentObject = object;
          const currentObjectWidth = currentObject.getScaledWidth();
          currentObject.set({
            left: refLeft + refWidth - currentObjectWidth
          });
        });
        const selection = new fabric.ActiveSelection(selectedObjects, {
          canvas: this.canvas
        });
        this.canvas.setActiveObject(selection);
        this.state.setActiveObject(selection);
      } else {
        const currentObject = refObject;
        const currentObjectWidth = currentObject.getScaledWidth();
        currentObject.set({
          left: frame.left + frame.width - currentObjectWidth
        });
      }
      this.canvas.requestRenderAll();
    }
  };
  unsetBackgroundImage() {
    return new Promise(async (resolve) => {
      const objects = this.canvas.getObjects();
      const currentBackgroundImage = objects.find((o) => o.type === "BackgroundImage" /* BACKGROUND_IMAGE */);
      let nextImage;
      if (currentBackgroundImage) {
        const currentBackgroundImageJSON = currentBackgroundImage.toJSON(this.config.propertiesToInclude);
        delete currentBackgroundImageJSON.clipPath;
        const nextImageElement = await loadImageFromURL(currentBackgroundImageJSON.src);
        nextImage = new fabric.StaticImage(nextImageElement, { ...currentBackgroundImageJSON, id: generateId() });
        this.canvas.remove(currentBackgroundImage);
        resolve(nextImage);
      } else {
        resolve(null);
      }
    });
  }
  async setAsBackgroundImage(id) {
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject && refObject.type === "StaticImage" /* STATIC_IMAGE */) {
      const frame = this.editor.frame.frame;
      let nextImage = await this.unsetBackgroundImage();
      if (nextImage) {
        this.canvas.add(nextImage);
      }
      const objectJSON = refObject.toJSON(this.config.propertiesToInclude);
      delete objectJSON.clipPath;
      const image = await loadImageFromURL(objectJSON.src);
      const backgroundImage = new fabric.BackgroundImage(image, { ...objectJSON, id: generateId() });
      this.canvas.add(backgroundImage);
      backgroundImage.clipPath = frame;
      this.canvas.remove(refObject);
      this.canvas.requestRenderAll();
      this.scale("fill", backgroundImage.id);
      backgroundImage.moveTo(2);
      if (nextImage) {
        this.sendToBack(nextImage.id);
      }
    }
  }
  /**
   * Set object shadow
   * @param options ShadowOptions
   */
  setShadow = (options) => {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject instanceof fabric.Group && activeObject.type !== "StaticVector" /* STATIC_VECTOR */) {
      activeObject._objects.forEach((object) => {
        setObjectShadow(object, options);
      });
    } else {
      setObjectShadow(activeObject, options);
    }
    this.canvas.requestRenderAll();
    this.editor.history.save();
  };
  /**
   * Set object fill as gradient
   * @param param GradientOptions
   */
  setGradient = ({ angle, colors }) => {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject instanceof fabric.Group) {
      activeObject._objects.forEach((object) => {
        fabric_default(object, angle, colors);
      });
    } else {
      fabric_default(activeObject, angle, colors);
    }
    this.canvas.requestRenderAll();
    this.editor.history.save();
  };
  /**
   * Group selected objects
   */
  group = () => {
    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) {
      return;
    }
    if (activeObject.type !== "activeSelection" /* ACTIVE_SELECTION */) {
      return;
    }
    activeObject.toGroup();
    this.canvas.requestRenderAll();
    this.editor.history.save();
    const groupedActiveObject = this.canvas.getActiveObject();
    groupedActiveObject.set({
      name: "group",
      id: generateId(),
      // @ts-ignore
      subTargetCheck: true
    });
    this.updateContextObjects();
  };
  ungroup = () => {
    const frame = this.editor.frame.frame;
    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) {
      return;
    }
    if (activeObject.type !== "Group" /* GROUP */.toLowerCase()) {
      return;
    }
    activeObject.clipPath = null;
    const activeSelection = activeObject.toActiveSelection();
    activeSelection._objects.forEach((object) => {
      object.clipPath = frame;
    });
    this.state.setActiveObject(activeSelection);
    this.canvas.requestRenderAll();
    this.editor.history.save();
    this.updateContextObjects();
  };
  /**
   * Lock object movement and disable controls
   */
  lock = (id) => {
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      if (refObject._objects) {
        refObject._objects.forEach((object) => {
          object.set({
            hasControls: false,
            lockMovementY: true,
            lockMovementX: true,
            locked: true
          });
        });
        refObject.set({
          hasControls: false,
          lockMovementY: true,
          lockMovementX: true,
          locked: true
        });
      } else {
        refObject.set({
          hasControls: false,
          lockMovementY: true,
          lockMovementX: true,
          locked: true
        });
      }
      this.canvas.requestRenderAll();
      this.editor.history.save();
    }
  };
  /**
   * Unlock active object
   */
  unlock = (id) => {
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject) {
      if (refObject?._objects) {
        refObject._objects.forEach((object) => {
          object.set({
            hasControls: true,
            lockMovementY: false,
            lockMovementX: false,
            locked: false
          });
        });
        refObject.set({
          hasControls: true,
          lockMovementY: false,
          lockMovementX: false,
          locked: false
        });
      } else {
        refObject.set({
          hasControls: true,
          lockMovementY: false,
          lockMovementX: false,
          locked: false
        });
      }
      this.canvas.requestRenderAll();
      this.editor.history.save();
    }
  };
  findByName = (name) => {
    return this.canvas.getObjects().filter((o) => o.name === name);
  };
  removeByName = (name) => {
    this.canvas.getObjects().forEach((o) => {
      if (o.name === name) {
        this.canvas.remove(o);
        this.editor.history.save();
      }
    });
    this.canvas.requestRenderAll();
  };
  findByIdInObjecs = (id, objects) => {
    let item = null;
    for (const object of objects) {
      if (object.id === id) {
        item = object;
        break;
      }
      if (object.type === "group") {
        const itemInGroup = this.findByIdInObjecs(id, object._objects);
        if (itemInGroup) {
          item = itemInGroup;
          break;
        }
      }
    }
    return item;
  };
  findById = (id) => {
    const objects = this.canvas.getObjects();
    const object = this.findByIdInObjecs(id, objects);
    return [object];
  };
  findOneById = (id) => {
    const objects = this.findById(id);
    return objects[0];
  };
  removeById = (id) => {
    this.canvas.getObjects().forEach((o) => {
      if (o.id === id) {
        this.canvas.remove(o);
        this.editor.history.save();
        this.updateContextObjects();
      }
    });
    this.canvas.requestRenderAll();
  };
  // Text exclusive hooks
  toUppercase(id) {
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject && refObject.type === "StaticText" /* STATIC_TEXT */) {
      if (refObject.isEditing) {
        refObject.hiddenTextarea.value = refObject.hiddenTextarea.value.toUpperCase();
        refObject.updateFromTextArea();
        this.canvas.requestRenderAll();
        return;
      }
      const text = refObject.text;
      refObject.text = text.toUpperCase();
      this.canvas.requestRenderAll();
    }
  }
  // Text exclusive hooks
  toLowerCase(id) {
    let refObject = this.canvas.getActiveObject();
    if (id) {
      refObject = this.findOneById(id);
    }
    if (refObject && refObject.type === "StaticText" /* STATIC_TEXT */) {
      if (refObject.isEditing) {
        refObject.hiddenTextarea.value = refObject.hiddenTextarea.value.toLowerCase();
        refObject.updateFromTextArea();
        this.canvas.requestRenderAll();
        return;
      }
      const text = refObject.text;
      refObject.text = text.toLowerCase();
      this.canvas.requestRenderAll();
    }
  }
  updateContextObjects = () => {
    const objects = this.canvas.getObjects();
    const filteredObjects = objects.filter((o) => {
      return o.type !== "Frame" && o.type !== "Background";
    });
    this.state.setObjects(filteredObjects);
  };
};
var Objects_default = Objects;

// src/engine/core/utils/shourcutsManager.ts
var ShortcutManager = class {
  //delete
  isDelete(event) {
    return event.key === "Delete" || event.key === "Backspace";
  }
  // save or update template
  isCtrlS(event) {
    return event.ctrlKey && event.code === "KeyS";
  }
  // select all
  isCtrlA(event) {
    return event.ctrlKey && event.code === "KeyA";
  }
  // copy
  isCtrlC(event) {
    return event.ctrlKey && event.code === "KeyC";
  }
  // paste
  isCtrlV(event) {
    return event.ctrlKey && event.code === "KeyV";
  }
  // redo
  isCtrlY(event) {
    return event.ctrlKey && event.code === "KeyY";
  }
  // cut
  isCtrlX(event) {
    return event.ctrlKey && event.code === "KeyX";
  }
  // nudge
  isArrowUp(event) {
    return event.code === "ArrowUp";
  }
  // nudge
  isArrowDown(event) {
    return event.code === "ArrowDown";
  }
  // nudge
  isArrowLeft(event) {
    return event.code === "ArrowLeft";
  }
  // nudge
  isArrowRight(event) {
    return event.code === "ArrowRight";
  }
  // modifier
  isShift(event) {
    return event.shiftKey;
  }
  // lineHeight--
  isAltDown(event) {
    return event.altKey && event.code === "ArrowDown";
  }
  // lineHeight++
  isAltUp(event) {
    return event.altKey && event.code === "ArrowUp";
  }
  // charSpacing++
  isAltRight(event) {
    return event.altKey && event.code === "ArrowRight";
  }
  // charSpacing--
  isAltLeft(event) {
    return event.altKey && event.code === "ArrowLeft";
  }
  // redo
  isCtrlShiftZ(event) {
    return event.ctrlKey && event.shiftKey && event.code === "KeyZ";
  }
  // undo
  isCtrlZ(event) {
    return event.ctrlKey && !event.shiftKey && event.code === "KeyZ";
  }
  // zoom reset
  isCtrlOne(event) {
    return event.ctrlKey && event.key === "1";
  }
  // zoom in
  isCtrlMinus(event) {
    return event.ctrlKey && event.key === "-";
  }
  // zoom out
  isCtrlEqual(event) {
    return event.ctrlKey && event.key === "=";
  }
  // zoom to fit
  isCtrlZero(event) {
    return event.ctrlKey && event.key === "0";
  }
};
var shourcutsManager_default = new ShortcutManager();

// src/engine/core/controllers/Events.ts
var Events = class extends Base_default {
  constructor(props) {
    super(props);
    this.initialize();
  }
  initialize() {
    this.canvas.wrapperEl.tabIndex = 1;
    this.canvas.wrapperEl.style.outline = "none";
    this.canvas.on({
      "mouse:dblclick": this.onDoubleClick,
      "mouse:down": this.onMouseDown,
      "mouse:up": this.handleSelection,
      "selection:cleared": this.handleSelection,
      "selection:updated": this.handleSelection,
      "mouse:wheel": this.onMouseWheel,
      "mouse:out": this.onMouseOut,
      "object:modified": this.objectModified,
      "background:selected": this.onBackgroundSelected
    });
    this.canvas.wrapperEl.addEventListener("keydown", this.onKeyDown.bind(this), false);
  }
  destroy() {
    this.canvas.off({
      "mouse:dblclick": this.onDoubleClick,
      "mouse:down": this.onMouseDown,
      "mouse:up": this.handleSelection,
      "selection:cleared": this.handleSelection,
      "selection:updated": this.handleSelection,
      "mouse:wheel": this.onMouseWheel,
      "mouse:out": this.onMouseOut,
      "object:modified": this.objectModified,
      "background:selected": this.onBackgroundSelected
    });
    this.canvas.wrapperEl.removeEventListener("keydown", this.onKeyDown.bind(this));
  }
  onDoubleClick = (event) => {
    const subTarget = event.subTargets[0];
    if (subTarget) {
      this.editor.objects.select(subTarget.id);
    }
  };
  onMouseDown = (e) => {
    this.editor.objects.pasteStyle();
    if (e.button === 3) {
      this.state.setContextMenuRequest({ left: e.e.offsetX, top: e.e.offsetY, target: e.target });
    } else {
      this.state.setContextMenuRequest(null);
    }
  };
  objectModified = (event) => {
    const { target } = event;
    if (target instanceof fabric.Textbox) {
      this.scaleTextbox(target);
    }
    this.editor.history.save();
  };
  onMouseOut = () => {
    this.canvas.renderAll();
  };
  onMouseWheel = (event) => {
    const isCtrlKey = event.e.ctrlKey;
    if (isCtrlKey) {
      this.handleZoom(event);
    }
  };
  handleZoom = (event) => {
    const delta = event.e.deltaY;
    let zoomRatio = this.canvas.getZoom();
    if (delta > 0) {
      zoomRatio -= 0.02;
    } else {
      zoomRatio += 0.02;
    }
    this.editor.zoom.zoomToPoint(new fabric.Point(this.canvas.getWidth() / 2, this.canvas.getHeight() / 2), zoomRatio);
    event.e.preventDefault();
    event.e.stopPropagation();
  };
  onKeyDown(event) {
    if (shourcutsManager_default.isCtrlZero(event)) {
      event.preventDefault();
      this.editor.zoom.zoomToFit();
    } else if (shourcutsManager_default.isCtrlMinus(event)) {
      event.preventDefault();
      this.editor.zoom.zoomIn();
    } else if (shourcutsManager_default.isCtrlEqual(event)) {
      event.preventDefault();
      this.editor.zoom.zoomOut();
    } else if (shourcutsManager_default.isCtrlOne(event)) {
      event.preventDefault();
      this.editor.zoom.zoomToOne();
    } else if (shourcutsManager_default.isCtrlZ(event)) {
      this.editor.history.undo();
    } else if (shourcutsManager_default.isCtrlShiftZ(event)) {
      this.editor.history.redo();
    } else if (shourcutsManager_default.isCtrlY(event)) {
      this.editor.history.redo();
    } else if (shourcutsManager_default.isCtrlA(event)) {
      event.preventDefault();
      this.editor.objects.select();
    } else if (shourcutsManager_default.isDelete(event)) {
      event.preventDefault();
      this.editor.objects.remove();
    } else if (shourcutsManager_default.isCtrlC(event)) {
      event.preventDefault();
      this.editor.objects.copy();
    } else if (shourcutsManager_default.isCtrlV(event)) {
      event.preventDefault();
      this.editor.objects.paste();
    } else if (shourcutsManager_default.isCtrlX(event)) {
      event.preventDefault();
      this.editor.objects.cut();
    }
  }
  onBackgroundSelected = () => {
    const objects = this.canvas.getObjects();
    const frame = objects[0];
    this.canvas.setActiveObject(objects[0]);
    this.state.setActiveObject(frame);
    this.canvas.requestRenderAll();
  };
  handleSelection = (target) => {
    if (target) {
      this.state.setActiveObject(null);
      const initialSelection = this.canvas.getActiveObject();
      const isNotMultipleSelection = initialSelection && initialSelection.type === "Group" /* GROUP */.toLowerCase() || initialSelection && initialSelection.type === "StaticVector" /* STATIC_VECTOR */;
      if (initialSelection && !isNotMultipleSelection && initialSelection._objects) {
        const filteredObjects = initialSelection._objects.filter((object) => {
          if (object.type === "Background" /* BACKGROUND */) {
            return false;
          }
          return !object.locked;
        });
        this.canvas.discardActiveObject();
        if (filteredObjects.length > 0) {
          if (filteredObjects.length === 1) {
            this.canvas.setActiveObject(filteredObjects[0]);
            this.state.setActiveObject(filteredObjects[0]);
          } else {
            const activeSelection = new fabric.ActiveSelection(filteredObjects, {
              canvas: this.canvas
            });
            this.canvas.setActiveObject(activeSelection);
            this.state.setActiveObject(activeSelection);
          }
        }
      } else {
        this.state.setActiveObject(initialSelection);
      }
    } else {
      this.state.setActiveObject(null);
    }
    this.canvas.requestRenderAll();
  };
  scaleTextbox = (target) => {
    const { fontSize, width, scaleX } = target;
    target.set({
      fontSize: fontSize * scaleX,
      width: width * scaleX,
      scaleX: 1,
      scaleY: 1
    });
  };
};
var Events_default = Events;

// src/engine/core/event-manager.ts
var EventManager = class {
  all = /* @__PURE__ */ new Map();
  /**
   * Register an event handler for the given type.
   * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
   * @param {Function} handler Function to call in response to given event
   * @memberOf EventManager
   */
  on(type, handler) {
    const handlers = this.all.get(type);
    if (handlers) {
      handlers.push(handler);
    } else {
      this.all.set(type, [handler]);
    }
  }
  /**
   * Remove an event handler for the given type.
   * If `handler` is omitted, all handlers of the given type are removed.
   * @param {string|symbol} type Type of event to unregister `handler` from, or `'*'`
   * @param {Function} [handler] Handler function to remove
   * @memberOf EventManager
   */
  off(type, handler) {
    const handlers = this.all.get(type);
    if (handlers) {
      if (handler) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      } else {
        this.all.set(type, []);
      }
    }
  }
  /**
   * Invoke all handlers for the given type.
   * If present, `'*'` handlers are invoked after type-matched handlers.
   *
   * Note: Manually firing '*' handlers is not supported.
   *
   * @param {string|symbol} type The event type to invoke
   * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
   * @memberOf EventManager
   */
  emit(type, evt) {
    let handlers = this.all.get(type);
    if (handlers) {
      handlers.slice().forEach((handler) => {
        handler(evt);
      });
    }
    handlers = this.all.get("*");
    if (handlers) {
      handlers.slice().forEach((handler) => {
        handler(type, evt);
      });
    }
  }
  //   public all() {}
};
var event_manager_default = EventManager;

// src/engine/core/utils/object-exporter.ts
var ObjectExporter = class {
  export(item, options, inGroup = false) {
    let object;
    switch (item.type) {
      case "StaticImage" /* STATIC_IMAGE */:
        object = this.staticImage(item, options, inGroup);
        break;
      case "BackgroundImage" /* BACKGROUND_IMAGE */:
        object = this.backgroundImage(item, options, inGroup);
        break;
      case "StaticVideo" /* STATIC_VIDEO */:
        object = this.staticVideo(item, options, inGroup);
        break;
      case "StaticText" /* STATIC_TEXT */:
        object = this.staticText(item, options, inGroup);
        break;
      case "StaticVector" /* STATIC_VECTOR */:
        object = this.staticVector(item, options, inGroup);
        break;
      case "StaticPath" /* STATIC_PATH */:
        object = this.staticPath(item, options, inGroup);
        break;
      case "Background" /* BACKGROUND */:
        object = this.background(item, options, inGroup);
        break;
      case "Group" /* GROUP */.toLowerCase():
        object = this.group(item, options, inGroup);
        break;
      case "StaticAudio" /* STATIC_AUDIO */:
        object = this.staticAudio(item, options, inGroup);
        break;
      default:
        object = this.background(item, options, inGroup);
    }
    return object;
  }
  staticText(item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup);
    const {
      fontFamily,
      textAlign,
      fontSize,
      charSpacing,
      lineHeight,
      fill,
      text,
      angle,
      underline,
      fontURL,
      metadata
    } = item;
    const object = {
      ...baseOptions,
      charSpacing,
      fill,
      fontFamily,
      fontSize,
      lineHeight,
      text,
      textAlign,
      angle,
      underline,
      fontURL,
      metadata
    };
    return object;
  }
  staticImage(item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup);
    const { src, cropX, cropY, metadata } = item;
    const object = {
      ...baseOptions,
      src,
      cropX,
      cropY,
      metadata
    };
    return object;
  }
  backgroundImage(item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup);
    const { src, cropX, cropY, metadata } = item;
    const object = {
      ...baseOptions,
      src,
      cropX,
      cropY,
      metadata
    };
    return object;
  }
  staticAudio(item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup);
    const { src, metadata } = item;
    const object = {
      ...baseOptions,
      src,
      metadata,
      speedFactor: 1
    };
    return object;
  }
  staticVideo(item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup);
    const { src } = item;
    const object = {
      ...baseOptions,
      src,
      metadata: {},
      speedFactor: 1
    };
    return object;
  }
  staticVector(item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup);
    const { src, colorMap, metadata } = item;
    const object = {
      ...baseOptions,
      src,
      colorMap,
      metadata
    };
    return object;
  }
  staticPath(item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup);
    const { path: path2, fill, metadata } = item;
    const object = {
      ...baseOptions,
      path: path2,
      fill,
      metadata
    };
    return object;
  }
  background(item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup);
    const { fill, metadata } = item;
    const object = {
      ...baseOptions,
      fill,
      metadata
    };
    return object;
  }
  group(item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup);
    const { objects, metadata } = item;
    const groupObjects = objects.map((object) => {
      return this.export(object, options, true);
    });
    return {
      ...baseOptions,
      type: "Group",
      objects: groupObjects,
      metadata
    };
  }
  getBaseOptions(item, options, inGroup = false) {
    const {
      id,
      name,
      top,
      left,
      width,
      height,
      scaleX,
      scaleY,
      originX,
      originY,
      type,
      stroke,
      strokeWidth,
      opacity,
      angle,
      flipX,
      flipY,
      skewX,
      skewY,
      shadow,
      preview
    } = item;
    const baseOptions = {
      id,
      name: name ? name : type,
      angle,
      stroke,
      strokeWidth,
      left: inGroup ? left : left - options.left,
      top: inGroup ? top : top - options.top,
      width,
      height,
      opacity,
      originX,
      originY,
      scaleX,
      scaleY,
      type,
      flipX,
      flipY,
      skewX,
      skewY,
      visible: true,
      shadow,
      preview
    };
    return baseOptions;
  }
};
var object_exporter_default = ObjectExporter;

// src/engine/core/utils/get-selection-type.ts
function get_selection_type_default(selection) {
  const types = /* @__PURE__ */ new Set();
  if (!selection) {
    return null;
  }
  if (selection._objects) {
    for (const object of selection._objects) {
      types.add(object.type);
    }
  } else {
    types.add(selection.type);
  }
  const typesArray = Array.from(types);
  return typesArray;
}

// src/engine/core/parser/constants.ts
var path = {
  angle: 0,
  stroke: "#ffffff",
  strokeWidth: 0,
  left: 0,
  top: 0,
  width: 60,
  height: 60,
  opacity: 1,
  originX: "left",
  originY: "top",
  scaleX: 1,
  scaleY: 1,
  type: "StaticPath",
  flipX: false,
  flipY: false,
  skewX: 0,
  skewY: 0,
  visible: true,
  path: [],
  fill: "#3dc1d3",
  metadata: {}
};

// src/engine/core/parser/shape.ts
function shape_default(object) {
  let position = {
    top: object.top,
    left: object.left
  };
  const { top, left, fill, path: path2 } = object;
  return {
    ...path,
    ...position,
    stroke: object.stroke,
    strokeWidth: object.strokeWidth,
    strokeDashArray: object.strokeDashArray,
    strokeLineCap: object.strokeLineCap,
    strokeLineJoin: object.strokeLineJoin,
    strokeUniform: object.strokeUniform,
    strokeMiterLimit: object.strokeMiterLimit,
    strokeDashOffset: object.strokeDashOffset,
    fill,
    path: path2
  };
}

// src/engine/core/parser/parser.ts
async function parseSVG(url) {
  return new Promise((resolve, reject) => {
    fabric.loadSVGFromURL(url, (objects, summary) => {
      const frame = {
        width: summary.width,
        height: summary.height
      };
      let layers = [];
      for (const object of objects) {
        if (object.type === "path") {
          const path2 = shape_default(object);
          layers = layers.concat(path2);
        }
      }
      const design = {
        frame,
        layers,
        name: "Hello world"
      };
      resolve(design);
    });
  });
}
var parser_default = parseSVG;

// src/engine/core/parser/index.ts
var parser_default2 = parser_default;

// src/engine/core/utils/parser.ts
function base64ImageToFile(str) {
  const pos = str.indexOf(";base64,");
  const type = str.substring(5, pos);
  const b64 = str.substr(pos + 8);
  const imageContent = atob(b64);
  const buffer = new ArrayBuffer(imageContent.length);
  const view = new Uint8Array(buffer);
  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }
  let blob = new Blob([buffer], { type });
  const objectURL = URL.createObjectURL(blob);
  return objectURL;
}

// src/engine/core/controllers/Scene.ts
var Scene = class extends Base_default {
  id = "";
  name = "";
  exportToJSON() {
    let animated = false;
    const canvasJSON = this.canvas.toJSON(this.config.propertiesToInclude);
    const frame = this.editor.frame.options;
    const template = {
      id: this.id ? this.id : generateId(),
      name: this.name ? this.name : "Untitled design",
      layers: [],
      frame: {
        width: frame.width,
        height: frame.height
      },
      metadata: {
        animated
      }
    };
    const layers = canvasJSON.objects.filter((object) => object.type !== "Frame" /* FRAME */);
    const objectExporter = new object_exporter_default();
    layers.forEach((layer) => {
      const exportedObject = objectExporter.export(layer, frame);
      template.layers = template.layers.concat(exportedObject);
    });
    template.metadata = {
      ...template.metadata,
      animated
    };
    return template;
  }
  exportAsComponent = async () => {
    const activeObject = this.canvas.getActiveObject();
    const selectionType = get_selection_type_default(activeObject);
    const frame = this.editor.frame.options;
    const objectExporter = new object_exporter_default();
    if (activeObject && selectionType) {
      const isMixed = selectionType.length > 1;
      if (activeObject.type === "activeSelection" || activeObject.type === "group") {
        let clonedObjects = [];
        const objects = activeObject._objects;
        for (const object of objects) {
          const cloned = await new Promise((resolve) => {
            object.clone((c) => {
              c.clipPath = void 0;
              resolve(c);
            }, this.editor.config.propertiesToInclude);
          });
          clonedObjects = clonedObjects.concat(cloned);
        }
        const group = new fabric.Group(clonedObjects);
        const component = objectExporter.export(group.toJSON(this.editor.config.propertiesToInclude), frame);
        const metadata = component.metadata ? component.metadata : {};
        return {
          ...component,
          top: 0,
          left: 0,
          metadata: {
            ...metadata,
            category: isMixed ? "mixed" : "single",
            types: selectionType
          }
        };
      } else {
        const component = objectExporter.export(activeObject.toJSON(this.editor.config.propertiesToInclude), frame);
        const metadata = component.metadata ? component.metadata : {};
        return {
          ...component,
          top: 0,
          left: 0,
          metadata: {
            ...metadata,
            category: isMixed ? "mixed" : "single",
            types: selectionType
          }
        };
      }
    }
  };
  /**
   * Export Canvas objects to be loaded as resources by PIXI loader
   * @returns
   */
  exportLayers = async (template) => {
    let elements = [];
    for (const [index2, layer] of template.layers.entries()) {
      if (layer.type === "StaticVideo") {
        elements = elements.concat({
          id: layer.id,
          type: "StaticVideo",
          // @ts-ignore
          url: layer.src,
          duration: 5e3,
          display: {
            from: 0,
            to: 5e3
          },
          cut: {
            from: 0,
            to: 0
          },
          position: {
            x: layer.left,
            y: layer.top,
            zIndex: index2,
            width: layer.width,
            height: layer.height,
            scaleX: layer.scaleX,
            scaleY: layer.scaleY
          },
          objectId: layer.id
        });
      } else {
        const preview = await this.editor.renderer.renderLayer(layer, {});
        const objectURL = base64ImageToFile(preview);
        elements = elements.concat({
          id: layer.id,
          type: "StaticImage",
          url: objectURL,
          duration: 5e3,
          display: {
            from: 0,
            to: 5e3
          },
          cut: {
            from: 0,
            to: 0
          },
          position: {
            x: layer.left,
            y: layer.top,
            zIndex: index2,
            width: layer.width,
            height: layer.height,
            scaleX: layer.scaleX,
            scaleY: layer.scaleY
          },
          objectId: layer.id
        });
      }
    }
    return elements;
  };
  /**
   * Deserializes JSON data
   * @returns Json Template
   */
  importFromJSON = async (template) => {
    this.name = template.name;
    this.id = template.id;
    const frameParams = template.frame;
    this.editor.objects.clear();
    this.editor.frame.resize({
      width: frameParams.width,
      height: frameParams.height
    });
    const frame = this.editor.frame.frame;
    const objectImporter = new object_importer_default(this.editor);
    const updatedTemplateLayers = template.layers.map((layer) => {
      if (layer.type === "Background" /* BACKGROUND */) {
        return {
          ...layer,
          shadow: this.config.shadow
        };
      }
      return layer;
    });
    for (const layer of updatedTemplateLayers) {
      const element = await objectImporter.import(layer, frame);
      if (element) {
        if (this.config.clipToFrame) {
          element.clipPath = frame;
        }
        this.canvas.add(element);
      } else {
        console.log("UNABLE TO LOAD OBJECT: ", layer);
      }
    }
    this.editor.zoom.zoomToFit();
    this.editor.objects.updateContextObjects();
    this.editor.history.save();
  };
  async importFromSVG(url) {
    const design = await parser_default2(url);
    this.importFromJSON(design);
  }
};
var Scene_default = Scene;
var ObjectImporter2 = class {
  async import(item, params) {
    let object;
    switch (item.type) {
      case "StaticText" /* STATIC_TEXT */:
        object = await this.staticText(item);
        break;
      case "StaticImage" /* STATIC_IMAGE */:
        object = await this.staticImage(item);
        break;
      case "BackgroundImage" /* BACKGROUND_IMAGE */:
        object = await this.backgroundImage(item);
        break;
      case "StaticVideo" /* STATIC_VIDEO */:
        object = await this.staticVideo(item);
        break;
      case "StaticVector" /* STATIC_VECTOR */:
        object = await this.staticVector(item);
        break;
      case "StaticPath" /* STATIC_PATH */:
        object = await this.staticPath(item);
        break;
      case "Background" /* BACKGROUND */:
        object = await this.background(item);
        break;
      case "Group" /* GROUP */:
        object = await this.group(item, params);
        break;
    }
    return object;
  }
  staticText(item) {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item);
        const metadata = item.metadata;
        const { textAlign, fontFamily, fontSize, charSpacing, lineHeight, text, underline, fill } = item;
        const textOptions = {
          ...baseOptions,
          underline,
          width: baseOptions.width ? baseOptions.width : 240,
          text: text ? text : "Empty Text",
          fill: fill ? fill : "#333333",
          ...textAlign && { textAlign },
          ...fontFamily && { fontFamily },
          ...fontSize && { fontSize },
          ...charSpacing && { charSpacing },
          ...lineHeight && { lineHeight },
          metadata
        };
        const element = new fabric.StaticText(textOptions);
        updateObjectShadow(element, item.shadow);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  staticImage(item) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item);
        const { src, cropX, cropY } = item;
        const image = await loadImageFromURL(src);
        const element = new fabric.StaticImage(image, {
          ...baseOptions,
          cropX: cropX || 0,
          cropY: cropY || 0
        });
        updateObjectShadow(element, item.shadow);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  backgroundImage(item) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item);
        const { src, cropX, cropY } = item;
        const image = await loadImageFromURL(src);
        const element = new fabric.BackgroundImage(image, {
          ...baseOptions,
          cropX: cropX || 0,
          cropY: cropY || 0
        });
        updateObjectShadow(element, item.shadow);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  staticVideo(item) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item);
        const { preview: src, cropX, cropY } = item;
        const image = await loadImageFromURL(src);
        const element = new fabric.StaticImage(image, {
          ...baseOptions,
          cropX: cropX || 0,
          cropY: cropY || 0
        });
        updateObjectShadow(element, item.shadow);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  staticPath(item) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item);
        const { path: path2, fill } = item;
        const element = new fabric.StaticPath({
          ...baseOptions,
          // @ts-ignore
          path: path2,
          fill
        });
        updateObjectShadow(element, item.shadow);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  group(item, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item);
        let objects = [];
        for (const object of item.objects) {
          objects = objects.concat(await this.import(object, params));
        }
        const element = new fabric.Group(objects, baseOptions);
        updateObjectShadow(element, item.shadow);
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  background(item) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item);
        const { fill } = item;
        const element = new fabric.Background({
          ...baseOptions,
          fill,
          id: "background",
          name: ""
        });
        resolve(element);
      } catch (err) {
        reject(err);
      }
    });
  }
  staticVector(item) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item);
        const { src, colorMap = {} } = item;
        fabric.loadSVGFromURL(src, (objects, opts) => {
          const { width, height } = baseOptions;
          if (!width || !height) {
            baseOptions.width = opts.width;
            baseOptions.height = opts.height;
          }
          const element = new fabric.StaticVector(objects, opts, {
            ...baseOptions,
            src,
            colorMap
          });
          updateObjectShadow(element, item.shadow);
          resolve(element);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  getBaseOptions(item) {
    const {
      id,
      name,
      left,
      top,
      width,
      height,
      scaleX,
      scaleY,
      opacity,
      flipX,
      flipY,
      skewX,
      skewY,
      stroke,
      strokeWidth,
      originX,
      originY,
      angle
    } = item;
    let metadata = item.metadata ? item.metadata : {};
    let baseOptions = {
      id,
      name,
      angle,
      top,
      left,
      width,
      height,
      originX: originX || "left",
      originY: originY || "top",
      scaleX: scaleX || 1,
      scaleY: scaleY || 1,
      opacity: opacity ? opacity : 1,
      flipX: flipX ? flipX : false,
      flipY: flipY ? flipY : false,
      skewX: skewX ? skewX : 0,
      skewY: skewY ? skewY : 0,
      ...stroke && { stroke },
      strokeWidth: strokeWidth ? strokeWidth : 0,
      strokeDashArray: item.strokeDashArray ? item.strokeDashArray : null,
      strokeLineCap: item.strokeLineCap ? item.strokeLineCap : "butt",
      strokeLineJoin: item.strokeLineJoin ? item.strokeLineJoin : "miter",
      strokeUniform: item.strokeUniform || false,
      strokeMiterLimit: item.strokeMiterLimit ? item.strokeMiterLimit : 4,
      strokeDashOffset: item.strokeDashOffset ? item.strokeMiterLimit : 0,
      metadata
    };
    return baseOptions;
  }
};
var object_importer_render_default = ObjectImporter2;

// src/engine/core/controllers/Renderer.ts
var Renderer = class {
  async render(template) {
    return await this.toDataURL(template, {});
  }
  async toDataURL(template, params) {
    return new Promise(async (resolve, reject) => {
      const staticCanvas = new fabric.StaticCanvas(null);
      await this.loadTemplate(staticCanvas, template, params);
      const data = staticCanvas.toDataURL({
        top: 0,
        left: 0,
        height: staticCanvas.getHeight(),
        width: staticCanvas.getWidth()
      });
      resolve(data);
    });
  }
  renderLayer = (layer, params) => {
    return new Promise(async (resolve, reject) => {
      const staticCanvas = new fabric.StaticCanvas(null);
      await this.loadTemplate(
        staticCanvas,
        {
          id: layer.id,
          metadata: {},
          layers: [{ ...layer, top: 0, left: 0 }],
          frame: {
            width: layer.width * layer.scaleX,
            height: layer.height * layer.scaleY
          }
        },
        params
      );
      const data = staticCanvas.toDataURL({
        top: 0,
        left: 0,
        height: staticCanvas.getHeight(),
        width: staticCanvas.getWidth()
      });
      resolve(data);
    });
  };
  async loadTemplate(staticCanvas, template, params) {
    const { frame } = template;
    this.setDimensions(staticCanvas, frame);
    const objectImporter = new object_importer_render_default();
    for (const layer of template.layers) {
      const element = await objectImporter.import(layer, params);
      if (element) {
        staticCanvas.add(element);
      } else {
        console.log("UNABLE TO LOAD LAYER: ", layer);
      }
    }
  }
  setDimensions(staticCanvas, { width, height }) {
    staticCanvas.setWidth(width).setHeight(height);
  }
};
var Renderer_default = Renderer;
function drawCircleIcon(ctx, left, top, __styleOverride, fabricObject) {
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, 2 * Math.PI);
  ctx.shadowColor = "#333333";
  ctx.shadowBlur = 3;
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.restore();
}

// src/engine/core/controllers/Personalization.ts
var Personalization = class extends Base_default {
  constructor(props) {
    super(props);
    this.init();
  }
  init() {
    const rotationControlPosition = {
      y: this.config.controlsPosition.rotation === "TOP" ? -0.5 : 0.5,
      offsetY: this.config.controlsPosition.rotation === "TOP" ? -30 : 30
    };
    fabric.util.addListener(document.getElementsByClassName("upper-canvas")[0], "contextmenu", function(e) {
      e.preventDefault();
    });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#20bf6b";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.borderColor = "#3782F7";
    fabric.Object.prototype.cornerSize = 12;
    fabric.Object.prototype.borderScaleFactor = 2.25;
    fabric.Object.prototype.borderOpacityWhenMoving = 1;
    fabric.Object.prototype.borderOpacity = 1;
    fabric.Object.prototype.controls.tr = new fabric.Control({
      x: 0.5,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true
    });
    fabric.Object.prototype.controls.tl = new fabric.Control({
      x: -0.5,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true
    });
    fabric.Object.prototype.controls.bl = new fabric.Control({
      x: -0.5,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true
    });
    fabric.Object.prototype.controls.br = new fabric.Control({
      x: 0.5,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true
    });
    fabric.Object.prototype.controls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true
    });
    fabric.Object.prototype.controls.mt = new fabric.Control({
      x: 0,
      y: -0.5,
      actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true
    });
    fabric.Object.prototype.controls.mb = new fabric.Control({
      x: 0,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true
    });
    fabric.Object.prototype.controls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true
    });
    fabric.Object.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: 0.5,
      offsetY: 30,
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
      actionName: "rotate",
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
      ...rotationControlPosition
    });
    fabric.Textbox.prototype.controls.tr = fabric.Object.prototype.controls.tr;
    fabric.Textbox.prototype.controls.tl = fabric.Object.prototype.controls.tl;
    fabric.Textbox.prototype.controls.bl = fabric.Object.prototype.controls.bl;
    fabric.Textbox.prototype.controls.br = fabric.Object.prototype.controls.br;
    fabric.Textbox.prototype.controls.mt = new fabric.Control({
      render: () => true
    });
    fabric.Textbox.prototype.controls.mb = fabric.Textbox.prototype.controls.mt;
    fabric.Textbox.prototype.controls.mr = new fabric.Control({
      x: 0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.changeWidth,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: "resizing",
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true
    });
    fabric.Textbox.prototype.controls.ml = new fabric.Control({
      x: -0.5,
      y: 0,
      actionHandler: fabric.controlsUtils.changeWidth,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionName: "resizing",
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true
    });
    fabric.Textbox.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: 0.5,
      offsetY: 30,
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
      actionName: "rotate",
      render: drawCircleIcon,
      cornerSize: 28,
      withConnection: true,
      ...rotationControlPosition
    });
    this.canvas.selectionColor = "rgba(55, 130, 247, 0.15)";
    this.canvas.selectionBorderColor = "#3782F7";
    this.canvas.selectionLineWidth = 1.5;
    this.canvas.on("selection:created", (ev) => {
      const objects = this.canvas.getActiveObjects();
      const selection = this.canvas.getActiveObject();
      if (objects.length > 1) {
        selection.setControlsVisibility({
          mt: false,
          mb: false,
          mr: false,
          ml: false
        });
        selection.padding = 10;
      }
    });
    this.canvas.on("mouse:over", (event) => {
      const target = event.target;
      const activeObjects = this.canvas.getActiveObject();
      if (target && activeObjects !== target && target.type !== "Background" && target.type !== "BackgroundImage") {
        const bound = target.getBoundingRect();
        const ctx = this.canvas.getContext();
        ctx.strokeStyle = "#3782F7";
        ctx.lineWidth = 2.25;
        ctx.strokeRect(bound.left, bound.top, bound.width, bound.height);
      }
    });
  }
};
var Personalization_default = Personalization;
var Guidelines = class extends Base_default {
  viewportTransform = [];
  aligningLineOffset;
  aligningLineMargin;
  aligningLineWidth;
  aligningLineColor;
  ctx;
  constructor(props) {
    super(props);
    this.initAligningGuidelines(this.canvas);
  }
  initAligningGuidelines(canvas) {
    var ctx = canvas.getSelectionContext(), aligningLineOffset = 0, aligningLineMargin = 16, aligningLineWidth = 1.2, aligningLineColor = "#e056fd", viewportTransform, zoom = canvas.getZoom();
    function drawVerticalLine(coords) {
      drawLine(
        coords.x + 0.5,
        coords.y1 > coords.y2 ? coords.y2 : coords.y1,
        coords.x + 0.5,
        coords.y2 > coords.y1 ? coords.y2 : coords.y1
      );
    }
    function drawHorizontalLine(coords) {
      drawLine(
        coords.x1 > coords.x2 ? coords.x2 : coords.x1,
        coords.y + 0.5,
        coords.x2 > coords.x1 ? coords.x2 : coords.x1,
        coords.y + 0.5
      );
    }
    function drawLine(x1, y1, x2, y2) {
      const vt = canvas.viewportTransform;
      ctx.save();
      ctx.lineWidth = aligningLineWidth;
      ctx.strokeStyle = aligningLineColor;
      ctx.beginPath();
      ctx.moveTo((x1 + viewportTransform[4] / vt[0]) * zoom, (y1 + viewportTransform[5] / vt[0]) * zoom);
      ctx.lineTo((x2 + viewportTransform[4] / vt[0]) * zoom, (y2 + viewportTransform[5] / vt[0]) * zoom);
      ctx.stroke();
      ctx.restore();
    }
    function isInRange(value1, value2, customAligningLineMargin) {
      let aligningMargin = customAligningLineMargin ? customAligningLineMargin : aligningLineMargin;
      value1 = Math.round(value1);
      value2 = Math.round(value2);
      for (var i = value1 - aligningMargin, len = value1 + aligningMargin; i <= len; i++) {
        if (i === value2) {
          return true;
        }
      }
      return false;
    }
    var verticalLines = [];
    var horizontalLines = [];
    canvas.on("mouse:down", function() {
      viewportTransform = canvas.viewportTransform;
      zoom = canvas.getZoom();
    });
    canvas.on("object:moving", function(e) {
      var activeObject = e.target, canvasObjects = canvas.getObjects(), activeObjectCenter = activeObject.getCenterPoint(), activeObjectLeft = activeObjectCenter.x, activeObjectTop = activeObjectCenter.y, activeObjectBoundingRect = activeObject.getBoundingRect(), activeObjectHeight = activeObjectBoundingRect.height / viewportTransform[3], activeObjectWidth = activeObjectBoundingRect.width / viewportTransform[0], horizontalInTheRange = false, verticalInTheRange = false, transform = canvas._currentTransform;
      if (!transform) return;
      for (var i = canvasObjects.length; i--; ) {
        if (canvasObjects[i] === activeObject || canvasObjects[i].type === "Background") continue;
        var objectCenter = canvasObjects[i].getCenterPoint(), objectLeft = objectCenter.x, objectTop = objectCenter.y, objectBoundingRect = canvasObjects[i].getBoundingRect(), objectHeight = objectBoundingRect.height / viewportTransform[3], objectWidth = objectBoundingRect.width / viewportTransform[0];
        let backgroundImageMargin = activeObject.type === "BackgroundImage" && canvasObjects[i].type === "Frame" ? 30 : false;
        if (isInRange(objectLeft, activeObjectLeft, backgroundImageMargin)) {
          verticalInTheRange = true;
          if (canvasObjects[i].type === "Frame") {
            verticalLines.push({
              x: objectLeft,
              y1: -5e3,
              y2: 5e3
            });
          } else {
            verticalLines.push({
              x: objectLeft,
              y1: objectTop < activeObjectTop ? objectTop - objectHeight / 2 - aligningLineOffset : objectTop + objectHeight / 2 + aligningLineOffset,
              y2: activeObjectTop > objectTop ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset
            });
          }
          activeObject.setPositionByOrigin(new fabric.Point(objectLeft, activeObjectTop), "center", "center");
        }
        if (isInRange(objectLeft - objectWidth / 2, activeObjectLeft - activeObjectWidth / 2, backgroundImageMargin)) {
          verticalInTheRange = true;
          if (canvasObjects[i].type === "Frame") {
            verticalLines.push({
              x: objectLeft - objectWidth / 2,
              y1: -5e3,
              y2: 5e3
            });
          } else {
            verticalLines.push({
              x: objectLeft - objectWidth / 2,
              y1: objectTop < activeObjectTop ? objectTop - objectHeight / 2 - aligningLineOffset : objectTop + objectHeight / 2 + aligningLineOffset,
              y2: activeObjectTop > objectTop ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset
            });
          }
          activeObject.setPositionByOrigin(
            new fabric.Point(objectLeft - objectWidth / 2 + activeObjectWidth / 2, activeObjectTop),
            "center",
            "center"
          );
        }
        if (isInRange(objectLeft + objectWidth / 2, activeObjectLeft + activeObjectWidth / 2, backgroundImageMargin)) {
          verticalInTheRange = true;
          if (canvasObjects[i].type === "Frame") {
            verticalLines.push({
              x: objectLeft + objectWidth / 2,
              y1: -5e3,
              y2: 5e3
            });
          } else {
            verticalLines.push({
              x: objectLeft + objectWidth / 2,
              y1: objectTop < activeObjectTop ? objectTop - objectHeight / 2 - aligningLineOffset : objectTop + objectHeight / 2 + aligningLineOffset,
              y2: activeObjectTop > objectTop ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset
            });
          }
          activeObject.setPositionByOrigin(
            new fabric.Point(objectLeft + objectWidth / 2 - activeObjectWidth / 2, activeObjectTop),
            "center",
            "center"
          );
        }
        if (isInRange(objectTop, activeObjectTop, backgroundImageMargin)) {
          horizontalInTheRange = true;
          if (canvasObjects[i].type === "Frame") {
            horizontalLines.push({
              y: objectTop,
              x1: -5e3,
              x2: 5e3
            });
          } else {
            horizontalLines.push({
              y: objectTop,
              x1: objectLeft < activeObjectLeft ? objectLeft - objectWidth / 2 - aligningLineOffset : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2: activeObjectLeft > objectLeft ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset
            });
          }
          activeObject.setPositionByOrigin(new fabric.Point(activeObjectLeft, objectTop), "center", "center");
        }
        if (isInRange(objectTop - objectHeight / 2, activeObjectTop - activeObjectHeight / 2, backgroundImageMargin)) {
          horizontalInTheRange = true;
          if (canvasObjects[i].type === "Frame") {
            horizontalLines.push({
              y: objectTop - objectHeight / 2,
              x1: -5e3,
              x2: 5e3
            });
          } else {
            horizontalLines.push({
              y: objectTop - objectHeight / 2,
              x1: objectLeft < activeObjectLeft ? objectLeft - objectWidth / 2 - aligningLineOffset : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2: activeObjectLeft > objectLeft ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset
            });
          }
          activeObject.setPositionByOrigin(
            new fabric.Point(activeObjectLeft, objectTop - objectHeight / 2 + activeObjectHeight / 2),
            "center",
            "center"
          );
        }
        if (isInRange(objectTop + objectHeight / 2, activeObjectTop + activeObjectHeight / 2, backgroundImageMargin)) {
          horizontalInTheRange = true;
          if (canvasObjects[i].type === "Frame") {
            horizontalLines.push({
              y: objectTop + objectHeight / 2,
              x1: -5e3,
              x2: 5e3
            });
          } else {
            horizontalLines.push({
              y: objectTop + objectHeight / 2,
              x1: objectLeft < activeObjectLeft ? objectLeft - objectWidth / 2 - aligningLineOffset : objectLeft + objectWidth / 2 + aligningLineOffset,
              x2: activeObjectLeft > objectLeft ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset
            });
          }
          activeObject.setPositionByOrigin(
            new fabric.Point(activeObjectLeft, objectTop + objectHeight / 2 - activeObjectHeight / 2),
            "center",
            "center"
          );
        }
      }
      if (!horizontalInTheRange) {
        horizontalLines.length = 0;
      }
      if (!verticalInTheRange) {
        verticalLines.length = 0;
      }
    });
    canvas.on("before:render", function() {
      canvas.clearContext(canvas.contextTop);
    });
    canvas.on("after:render", function() {
      for (let i = verticalLines.length; i--; ) {
        drawVerticalLine(verticalLines[i]);
      }
      for (let i = horizontalLines.length; i--; ) {
        drawHorizontalLine(horizontalLines[i]);
      }
      verticalLines.length = horizontalLines.length = 0;
    });
    canvas.on("mouse:up", function() {
      verticalLines.length = horizontalLines.length = 0;
      canvas.renderAll();
    });
  }
};
var Guidelines_default = Guidelines;

// src/engine/core/editor.ts
var Editor = class extends event_manager_default {
  canvas;
  frame;
  zoom;
  history;
  objects;
  scene;
  renderer;
  state;
  config;
  canvasId;
  events;
  personalization;
  guidelines;
  constructor({ id, state, config }) {
    super();
    this.state = state ? state : new State();
    this.config = {
      ...defaultEditorConfig,
      ...config,
      id
    };
    this.canvasId = id;
    this.initializeCanvas();
    this.initializeControllers();
    this.state.setEditor(this);
  }
  initializeCanvas = () => {
    const canvas = new canvas_default({
      id: this.canvasId,
      config: this.config,
      editor: this
    });
    this.canvas = canvas;
  };
  initializeControllers = () => {
    const options = {
      canvas: this.canvas.canvas,
      editor: this,
      config: this.config,
      state: this.state
    };
    this.frame = new Frame_default(options);
    this.zoom = new Zoom_default(options);
    this.history = new History_default(options);
    this.objects = new Objects_default(options);
    this.events = new Events_default(options);
    this.personalization = new Personalization_default(options);
    this.scene = new Scene_default(options);
    this.guidelines = new Guidelines_default(options);
    this.renderer = new Renderer_default();
  };
  debug() {
    console.log({
      objects: this.canvas.canvas.getObjects(),
      json: this.canvas.canvas.toJSON()
    });
  }
  destroy() {
    this.canvas.destroy();
  }
  // CONTEXT MENU
  cancelContextMenuRequest = () => {
    this.state.setContextMenuRequest(null);
  };
};

// ../../node_modules/.pnpm/resize-observer-polyfill@1.5.1/node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js
var MapShim = (function() {
  if (typeof Map !== "undefined") {
    return Map;
  }
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function(entry, index2) {
      if (entry[0] === key) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    (function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    })()
  );
})();
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var global$1 = (function() {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  if (typeof window !== "undefined" && window.Math === Math) {
    return window;
  }
  return Function("return this")();
})();
var requestAnimationFrame$1 = (function() {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame.bind(global$1);
  }
  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
})();
var trailingTimeout = 2;
function throttle2(callback, delay) {
  var leadingCall = false, trailingCall = false, lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var mutationObserverSupported = typeof MutationObserver !== "undefined";
var ResizeObserverController = (
  /** @class */
  (function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle2(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  })()
);
var defineConfigurable = (function(target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  return target;
});
var getWindowOf = (function(target) {
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
});
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value) {
  return parseFloat(value) || 0;
}
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function(size, position) {
    var value = styles["border-" + position + "-width"];
    return size + toFloat(value);
  }, 0);
}
function getPaddings(styles) {
  var positions = ["top", "right", "bottom", "left"];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles["padding-" + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
  var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  var width = toFloat(styles.width), height = toFloat(styles.height);
  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, "left", "right") + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, "top", "bottom") + vertPad;
    }
  }
  if (!isDocumentElement(target)) {
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = (function() {
  if (typeof SVGGraphicsElement !== "undefined") {
    return function(target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  return function(target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
  };
})();
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
  var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
  var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}
function createRectInit(x, y, width, height) {
  return { x, y, width, height };
}
var ResizeObservation = (
  /** @class */
  (function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  })()
);
var ResizeObserverEntry = (
  /** @class */
  /* @__PURE__ */ (function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  })()
);
var ResizeObserverSPI = (
  /** @class */
  (function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  })()
);
var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
var ResizeObserver2 = (
  /** @class */
  /* @__PURE__ */ (function() {
    function ResizeObserver3(callback) {
      if (!(this instanceof ResizeObserver3)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver3;
  })()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(method) {
  ResizeObserver2.prototype[method] = function() {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});
((function() {
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver2;
}))();
var Button = React.forwardRef(
  ({ variant = "secondary", size = "md", iconOnly, className, ...rest }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      "data-de-button": true,
      "data-variant": variant,
      "data-size": size,
      "data-icon-only": iconOnly ? "" : void 0,
      className: clsx("de-btn", className),
      ...rest
    }
  )
);
Button.displayName = "Button";
function Popover({ children, content, open, onOpenChange, placement = "bottom", contentClassName }) {
  return /* @__PURE__ */ jsxs(RadixPopover.Root, { open, onOpenChange, children: [
    /* @__PURE__ */ jsx(RadixPopover.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(RadixPopover.Portal, { children: /* @__PURE__ */ jsxs(
      RadixPopover.Content,
      {
        side: placement,
        sideOffset: 4,
        className: clsx("de-popover-content", contentClassName),
        children: [
          content,
          /* @__PURE__ */ jsx(RadixPopover.Arrow, { className: "de-popover-arrow", width: 10, height: 5 })
        ]
      }
    ) })
  ] });
}
var Input = React.forwardRef(
  ({ className, size = "md", ...rest }, ref) => /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      "data-size": size,
      className: clsx("de-input", className),
      ...rest
    }
  )
);
Input.displayName = "Input";
var Tooltip = React.forwardRef(({ children, title, placement = "top", className }, ref) => {
  if (!title) return /* @__PURE__ */ jsx(Fragment, { children });
  return /* @__PURE__ */ jsx(RadixTooltip.Provider, { delayDuration: 200, children: /* @__PURE__ */ jsxs(RadixTooltip.Root, { children: [
    /* @__PURE__ */ jsx(RadixTooltip.Trigger, { asChild: true, ref, children }),
    /* @__PURE__ */ jsx(RadixTooltip.Portal, { children: /* @__PURE__ */ jsxs(
      RadixTooltip.Content,
      {
        side: placement,
        sideOffset: 4,
        className: clsx("de-tooltip-content", className),
        children: [
          title,
          /* @__PURE__ */ jsx(RadixTooltip.Arrow, { className: "de-tooltip-arrow", width: 8, height: 4 })
        ]
      }
    ) })
  ] }) });
});
var Select = React.forwardRef(({ value, defaultValue, onValueChange, options, placeholder, className, style }, ref) => {
  return /* @__PURE__ */ jsxs(RadixSelect.Root, { value, defaultValue, onValueChange, children: [
    /* @__PURE__ */ jsxs(RadixSelect.Trigger, { ref, className: clsx("de-select-trigger", className), style, children: [
      /* @__PURE__ */ jsx(RadixSelect.Value, { placeholder }),
      /* @__PURE__ */ jsx(RadixSelect.Icon, { children: /* @__PURE__ */ jsx("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819L7.43179 8.56819C7.60753 8.74393 7.89245 8.74393 8.06819 8.56819L10.5682 6.06819C10.7439 5.89245 10.7439 5.60753 10.5682 5.43179C10.3924 5.25605 10.1075 5.25605 9.93179 5.43179L7.75 7.61358L5.56819 5.43179C5.39245 5.25605 5.10753 5.25605 4.93179 5.43179Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) }) })
    ] }),
    /* @__PURE__ */ jsx(RadixSelect.Portal, { children: /* @__PURE__ */ jsx(RadixSelect.Content, { className: "de-select-content", position: "popper", sideOffset: 4, children: /* @__PURE__ */ jsx(RadixSelect.Viewport, { className: "de-select-viewport", children: options.map((option) => /* @__PURE__ */ jsxs(RadixSelect.Item, { value: option.value, className: "de-select-item", children: [
      /* @__PURE__ */ jsx(RadixSelect.ItemText, { children: option.label }),
      /* @__PURE__ */ jsx(RadixSelect.ItemIndicator, { className: "de-select-item-indicator", children: /* @__PURE__ */ jsx("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z", fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd" }) }) })
    ] }, option.value)) }) }) })
  ] });
});
function PBtn({ active, danger, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      style: {
        width: 30,
        height: 30,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: danger ? "rgba(239, 68, 68, 0.1)" : active ? "rgba(37, 99, 235, 0.15)" : "transparent",
        color: danger ? "#ef4444" : active ? "var(--color-primary, #2563eb)" : "inherit",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        transition: "all 0.15s ease",
        ...props.style
      }
    }
  );
}
function PDivider(props) {
  return /* @__PURE__ */ jsx("hr", { ...props });
}
function HDivider(props) {
  return /* @__PURE__ */ jsx("hr", { ...props });
}
var toastApi = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  info: (msg) => toast(msg),
  warning: (msg) => toast.warning(msg)
};
var AD_SIZES = [
  { label: "1920\xD71080 (Landscape)", value: "1920x1080" },
  { label: "1080\xD71080 (Square)", value: "1080x1080" },
  { label: "1080\xD71920 (Portrait)", value: "1080x1920" },
  { label: "728\xD790 (Leaderboard)", value: "728x90" },
  { label: "300\xD7250 (Med Rect)", value: "300x250" },
  { label: "Custom\u2026", value: "custom" }
];
function useCanvasSize(editor) {
  const [size, setSize] = useState("1920x1080");
  const [customOpen, setCustomOpen] = useState(false);
  const [customW, setCustomW] = useState(1920);
  const [customH, setCustomH] = useState(1080);
  const applySize = useCallback((w, h) => {
    if (!editor) return;
    editor.frame.resize({ width: w, height: h });
  }, [editor]);
  const handleSizeChange = useCallback((value) => {
    if (value === "custom") {
      setCustomOpen(true);
      return;
    }
    setCustomOpen(false);
    setSize(value);
    const [w, h] = value.split("x").map(Number);
    applySize(w, h);
  }, [applySize]);
  const handleApplyCustom = useCallback(() => {
    const w = Math.max(100, Math.min(8e3, customW));
    const h = Math.max(100, Math.min(8e3, customH));
    setCustomOpen(false);
    setSize(`${w}\xD7${h}`);
    applySize(w, h);
  }, [customW, customH, applySize]);
  return {
    size,
    customOpen,
    setCustomOpen,
    customW,
    setCustomW,
    customH,
    setCustomH,
    handleSizeChange,
    handleApplyCustom
  };
}
var TOOL_BTN = {
  width: 34,
  height: 34,
  border: "none",
  borderRadius: 9,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  background: "color-mix(in srgb, var(--color-text) 5%, transparent)",
  color: "var(--color-text-muted)",
  transition: "all 0.15s",
  outline: "none"
};
var TOOL_BTN_ACTIVE = {
  ...TOOL_BTN,
  background: "color-mix(in srgb, var(--color-primary) 18%, transparent)",
  color: "var(--color-primary)",
  boxShadow: "0 0 0 1px var(--color-primary)"
};
function Toolbar({
  editor,
  zoomPct,
  size,
  customOpen,
  setCustomOpen,
  customW,
  setCustomW,
  customH,
  setCustomH,
  handleSizeChange,
  handleApplyCustom,
  layerPanelOpen,
  onToggleLayers,
  exporting,
  onExport,
  onBack,
  settings,
  onSettings,
  canvasBg,
  onBgChange,
  workspaceBg,
  onWorkspaceBgChange,
  title
}) {
  const settingsContent = /* @__PURE__ */ jsxs("div", { style: {
    width: 230,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    background: "var(--color-surface)",
    borderRadius: 12,
    padding: 16,
    border: "1px solid var(--color-border)",
    boxShadow: "0 10px 30px var(--shadow-color)"
  }, children: [
    /* @__PURE__ */ jsx("div", { style: { fontWeight: 700, fontSize: 12, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.08em" }, children: "Editor Settings" }),
    [
      { label: "Grid overlay", key: "showGrid" },
      { label: "Snap to grid", key: "snapGrid" }
    ].map(({ label, key }) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 13, color: "var(--color-text)" }, children: label }),
      /* @__PURE__ */ jsx(
        Switch,
        {
          size: "small",
          checked: settings[key],
          onChange: (v) => onSettings({ [key]: v }),
          style: { background: settings[key] ? "var(--color-primary)" : void 0 }
        }
      )
    ] }, key)),
    /* @__PURE__ */ jsxs("div", { style: { borderTop: "1px solid var(--color-border)", paddingTop: 12 }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }, children: "Panel Rail" }),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 6 }, children: ["left", "right"].map((side) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onSettings({ railSide: side }),
          style: {
            flex: 1,
            padding: "7px 0",
            borderRadius: 8,
            cursor: "pointer",
            border: settings.railSide === side ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
            background: settings.railSide === side ? "color-mix(in srgb, var(--color-primary) 18%, transparent)" : "color-mix(in srgb, var(--color-text) 3%, transparent)",
            color: settings.railSide === side ? "var(--color-primary)" : "var(--color-text-muted)",
            fontSize: 12,
            fontWeight: 700,
            textTransform: "capitalize",
            outline: "none"
          },
          children: side
        },
        side
      )) })
    ] })
  ] });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-center shrink-0 h-[56px] px-[16px] gap-1 z-50 overflow-x-auto whitespace-nowrap scrollbar-hide",
      style: {
        background: "color-mix(in srgb, var(--color-surface) 96%, transparent)",
        borderBottom: "1px solid var(--color-border)",
        boxShadow: "0 1px 0 var(--color-border), 0 4px 20px var(--shadow-color)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)"
      },
      children: [
        onBack && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => Modal.confirm({
              title: "Leave without saving?",
              content: "Any unsaved changes will be lost.",
              okText: "Leave",
              cancelText: "Stay",
              onOk: onBack
            }),
            style: {
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "color-mix(in srgb, var(--color-text) 5%, transparent)",
              border: "1px solid var(--color-border)",
              borderRadius: 9,
              padding: "6px 13px",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              fontSize: 12,
              fontWeight: 600,
              transition: "all 0.15s",
              outline: "none"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.color = "var(--color-text)";
              e.currentTarget.style.background = "color-mix(in srgb, var(--color-text) 10%, transparent)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.color = "var(--color-text-muted)";
              e.currentTarget.style.background = "color-mix(in srgb, var(--color-text) 5%, transparent)";
            },
            children: [
              /* @__PURE__ */ jsx(ArrowLeftOutlined, { style: { fontSize: 11 } }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: "Back" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, marginLeft: 8, marginRight: 4 }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            width: 26,
            height: 26,
            borderRadius: 7,
            background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.02em"
          }, children: "A" }),
          /* @__PURE__ */ jsx("span", { className: "hidden md:inline", style: { fontSize: 13, fontWeight: 700, color: "var(--color-text)", letterSpacing: "-0.01em" }, children: title || "FastlabAI Design Studio" })
        ] }),
        /* @__PURE__ */ jsx(HDivider, {}),
        /* @__PURE__ */ jsx(Tooltip, { title: "Undo (Ctrl+Z)", placement: "bottom", children: /* @__PURE__ */ jsx("button", { onClick: () => editor?.history.undo(), style: TOOL_BTN, children: /* @__PURE__ */ jsx(UndoOutlined, {}) }) }),
        /* @__PURE__ */ jsx(Tooltip, { title: "Redo (Ctrl+Y)", placement: "bottom", children: /* @__PURE__ */ jsx("button", { onClick: () => editor?.history.redo(), style: TOOL_BTN, children: /* @__PURE__ */ jsx(RedoOutlined, {}) }) }),
        /* @__PURE__ */ jsx(HDivider, {}),
        /* @__PURE__ */ jsx(Tooltip, { title: "Zoom out", placement: "bottom", children: /* @__PURE__ */ jsx("button", { onClick: () => editor?.zoom.zoomOut(), style: TOOL_BTN, children: /* @__PURE__ */ jsx(ZoomOutOutlined, {}) }) }),
        /* @__PURE__ */ jsxs("div", { style: {
          minWidth: 50,
          textAlign: "center",
          fontSize: 12,
          fontWeight: 700,
          color: "var(--color-primary)",
          background: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
          borderRadius: 7,
          padding: "4px 8px",
          userSelect: "none",
          border: "1px solid color-mix(in srgb, var(--color-primary) 25%, transparent)"
        }, children: [
          zoomPct,
          "%"
        ] }),
        /* @__PURE__ */ jsx(Tooltip, { title: "Zoom in", placement: "bottom", children: /* @__PURE__ */ jsx("button", { onClick: () => editor?.zoom.zoomIn(), style: TOOL_BTN, children: /* @__PURE__ */ jsx(ZoomInOutlined, {}) }) }),
        /* @__PURE__ */ jsx(HDivider, {}),
        /* @__PURE__ */ jsx(
          ColorPickerBtn,
          {
            color: canvasBg,
            onChange: onBgChange,
            label: "BG",
            tooltip: "Outer workspace background",
            checkerboard: true
          }
        ),
        /* @__PURE__ */ jsx(
          ColorPickerBtn,
          {
            color: workspaceBg,
            onChange: onWorkspaceBgChange,
            label: "Canvas",
            tooltip: "Canvas frame interior color"
          }
        ),
        /* @__PURE__ */ jsx("div", { style: { flex: 1 } }),
        /* @__PURE__ */ jsx(
          Popover,
          {
            open: customOpen,
            onOpenChange: (open) => !open && setCustomOpen(false),
            placement: "bottom",
            content: /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10, width: 220, padding: 4 }, children: [
              /* @__PURE__ */ jsx("div", { style: { fontWeight: 700, fontSize: 12, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.07em" }, children: "Custom Canvas Size" }),
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ jsx(
                  InputNumber,
                  {
                    min: 100,
                    max: 8e3,
                    value: customW,
                    onChange: (v) => setCustomW(v ?? 100),
                    style: { flex: 1 },
                    addonAfter: "px",
                    placeholder: "Width"
                  }
                ),
                /* @__PURE__ */ jsx("span", { style: { color: "var(--color-text-muted)", fontWeight: 600 }, children: "\xD7" }),
                /* @__PURE__ */ jsx(
                  InputNumber,
                  {
                    min: 100,
                    max: 8e3,
                    value: customH,
                    onChange: (v) => setCustomH(v ?? 100),
                    style: { flex: 1 },
                    addonAfter: "px",
                    placeholder: "Height"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "primary", size: "sm", onClick: handleApplyCustom, style: { width: "100%" }, children: "Apply" })
            ] }),
            children: /* @__PURE__ */ jsx(
              Select,
              {
                value: size,
                onValueChange: handleSizeChange,
                options: AD_SIZES,
                style: { width: 140 },
                className: "studio-size-select md:w-[200px]"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(HDivider, {}),
        /* @__PURE__ */ jsx(
          Popover,
          {
            content: settingsContent,
            placement: "bottom",
            children: /* @__PURE__ */ jsx("button", { style: TOOL_BTN, children: /* @__PURE__ */ jsx(SettingOutlined, {}) })
          }
        ),
        /* @__PURE__ */ jsx(Tooltip, { title: "Toggle layers panel", placement: "bottom", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onToggleLayers,
            style: layerPanelOpen ? TOOL_BTN_ACTIVE : TOOL_BTN,
            children: /* @__PURE__ */ jsx(AppstoreOutlined, {})
          }
        ) }),
        /* @__PURE__ */ jsx(HDivider, {}),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onExport,
            disabled: exporting,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: exporting ? "color-mix(in srgb, var(--color-primary) 30%, transparent)" : "var(--color-primary)",
              border: "none",
              borderRadius: 10,
              padding: "8px 20px",
              color: "var(--color-primary-text)",
              fontWeight: 700,
              fontSize: 13,
              cursor: exporting ? "wait" : "pointer",
              boxShadow: exporting ? "none" : "0 0 20px color-mix(in srgb, var(--color-primary) 35%, transparent), 0 4px 12px var(--shadow-color)",
              transition: "all 0.2s",
              letterSpacing: "-0.01em",
              outline: "none"
            },
            children: [
              /* @__PURE__ */ jsx(SaveOutlined, { style: { fontSize: 13 } }),
              /* @__PURE__ */ jsx("span", { className: "hidden md:inline", children: exporting ? "Saving\u2026" : "Save to Library" }),
              /* @__PURE__ */ jsx("span", { className: "md:hidden", children: exporting ? "\u2026" : "Save" })
            ]
          }
        )
      ]
    }
  );
}
var SWATCHES = [
  // Row 1 — Neutrals
  "#ffffff",
  "#f5f5f5",
  "#e0e0e0",
  "#9e9e9e",
  "#616161",
  "#212121",
  "#000000",
  // Row 2 — Warm
  "#ffebee",
  "#ef5350",
  "#e53935",
  "#c62828",
  "#ff7043",
  "#ff8f00",
  "#f9a825",
  // Row 3 — Cool
  "#e8f5e9",
  "#66bb6a",
  "#2e7d32",
  "#26c6da",
  "#0288d1",
  "#1565c0",
  "#7b1fa2",
  // Row 4 — Vibrant
  "#f06292",
  "#ba68c8",
  "#7986cb",
  "#4dd0e1",
  "#4db6ac",
  "#aed581",
  "#fff176",
  // Row 5 — Pastels
  "#fce4ec",
  "#f3e5f5",
  "#e8eaf6",
  "#e1f5fe",
  "#e0f2f1",
  "#f1f8e9",
  "#fffde7"
];
function ColorPickerBtn({
  color,
  onChange,
  label,
  tooltip,
  checkerboard
}) {
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(color);
  useEffect(() => {
    setHex(color);
  }, [color]);
  const commitHex = useCallback((val) => {
    const clean = val.startsWith("#") ? val : `#${val}`;
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
      onChange(clean);
      setHex(clean);
    }
  }, [onChange]);
  const pickerContent = /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        width: 220,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "4px 2px"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              height: 10,
              borderRadius: 6,
              background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
              cursor: "crosshair",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)"
            },
            onClick: (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              const hue = Math.round(pct * 360);
              const hex6 = `#${[0, 8, 16].map((s) => {
                const c = Math.round(hslToRgb(hue / 360, 1, 0.5)[s / 8]);
                return c.toString(16).padStart(2, "0");
              }).join("")}`;
              onChange(hex6);
              setHex(hex6);
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 6
        }, children: SWATCHES.map((sw) => /* @__PURE__ */ jsx(
          "button",
          {
            title: sw,
            onClick: () => {
              onChange(sw);
              setHex(sw);
            },
            style: {
              width: "100%",
              aspectRatio: "1/1",
              borderRadius: 6,
              border: color.toLowerCase() === sw.toLowerCase() ? "2px solid var(--color-primary)" : "1.5px solid rgba(0,0,0,0.1)",
              background: sw,
              cursor: "pointer",
              transition: "transform 0.1s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)"
            },
            onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.18)",
            onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)"
          },
          sw
        )) }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { position: "relative", flexShrink: 0 }, children: [
            /* @__PURE__ */ jsx("div", { style: {
              width: 36,
              height: 36,
              borderRadius: 10,
              background: color,
              border: "2px solid var(--color-border)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
              cursor: "pointer",
              overflow: "hidden"
            } }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "color",
                value: color,
                onChange: (e) => {
                  onChange(e.target.value);
                  setHex(e.target.value);
                },
                style: {
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  padding: 0,
                  border: "none"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: hex,
              onChange: (e) => setHex(e.target.value),
              onBlur: (e) => commitHex(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && commitHex(e.target.value),
              maxLength: 7,
              spellCheck: false,
              style: {
                flex: 1,
                height: 36,
                border: "1.5px solid var(--color-border)",
                borderRadius: 8,
                padding: "0 10px",
                fontSize: 13,
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.04em",
                background: "color-mix(in srgb, var(--color-text) 4%, var(--color-surface))",
                color: "var(--color-text)",
                outline: "none",
                transition: "border-color 0.15s"
              },
              onFocus: (e) => e.target.style.borderColor = "var(--color-primary)",
              onBlurCapture: (e) => e.target.style.borderColor = "var(--color-border)"
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ jsx(
    Popover,
    {
      content: pickerContent,
      placement: "bottom",
      open,
      onOpenChange: setOpen,
      children: /* @__PURE__ */ jsx("div", { style: { display: "inline-block" }, children: /* @__PURE__ */ jsx(Tooltip, { title: tooltip, placement: "bottom", children: /* @__PURE__ */ jsxs(
        "button",
        {
          style: {
            ...TOOL_BTN,
            padding: "4px 8px",
            gap: 6,
            width: "auto",
            background: open ? "color-mix(in srgb, var(--color-primary) 18%, transparent)" : TOOL_BTN.background,
            boxShadow: open ? "0 0 0 1px var(--color-primary)" : "none"
          },
          children: [
            /* @__PURE__ */ jsx("span", { style: {
              display: "inline-block",
              width: 18,
              height: 18,
              borderRadius: 5,
              border: "1.5px solid rgba(0,0,0,0.15)",
              background: checkerboard ? `linear-gradient(${color}, ${color}), repeating-conic-gradient(#bbb 0% 25%, #fff 0% 50%) 0 0 / 8px 8px` : color,
              flexShrink: 0,
              boxShadow: "0 1px 5px rgba(0,0,0,0.22)",
              overflow: "hidden"
            } }),
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline", style: { fontSize: 11, fontWeight: 700, color: "var(--color-text-muted)" }, children: label })
          ]
        }
      ) }) })
    }
  );
}
function hslToRgb(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}
var ICONS = [
  { key: "library", icon: /* @__PURE__ */ jsx(PictureOutlined, {}), label: "Library" },
  { key: "shapes", icon: /* @__PURE__ */ jsx(AppstoreOutlined, {}), label: "Shapes" },
  { key: "stickers", icon: /* @__PURE__ */ jsx(SmileOutlined, {}), label: "Stickers" },
  { key: "text", icon: /* @__PURE__ */ jsx(FontSizeOutlined, {}), label: "Text" },
  { key: "fonts", icon: /* @__PURE__ */ jsx("span", { style: { fontSize: 13, fontWeight: 900, lineHeight: 1 }, children: "Aa" }), label: "Fonts" },
  { key: "upload", icon: /* @__PURE__ */ jsx(UploadOutlined, {}), label: "Upload" }
];
function IconRail({ activePanel, onTogglePanel }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "flex flex-row md:flex-col items-center gap-[3px] px-[10px] py-[4px] md:py-[10px] md:px-0 w-full md:w-[62px] h-[66px] md:h-auto shrink-0 overflow-x-auto md:overflow-visible z-10",
      style: {
        background: "color-mix(in srgb, var(--color-surface) 96%, transparent)",
        borderRight: "1px solid var(--color-border)",
        borderTop: "1px solid var(--color-border)",
        boxShadow: "0 -4px 20px var(--shadow-color)"
      },
      children: ICONS.map(({ key, icon, label }) => /* @__PURE__ */ jsx(
        RailButton,
        {
          icon,
          label,
          active: activePanel === key,
          onClick: () => onTogglePanel(key)
        },
        key
      ))
    }
  );
}
function RailButton({ icon, label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      className: "flex flex-col items-center justify-center shrink-0 border-none rounded-xl cursor-pointer relative outline-none transition-all duration-200",
      style: {
        width: 54,
        padding: "8px 0",
        gap: 4,
        background: active ? "color-mix(in srgb, var(--color-primary) 18%, transparent)" : hov ? "color-mix(in srgb, var(--color-text) 5%, transparent)" : "transparent",
        color: active ? "var(--color-primary)" : hov ? "var(--color-text)" : "var(--color-text-muted)",
        fontSize: 18,
        boxShadow: active ? "0 0 0 1px var(--color-primary)" : hov ? "0 0 0 1px var(--color-border)" : "none",
        transform: active ? "scale(1.02)" : "scale(1)"
      },
      children: [
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 17,
          filter: active ? "drop-shadow(0 0 6px var(--color-primary))" : "none",
          transition: "filter 0.2s"
        }, children: icon }),
        /* @__PURE__ */ jsx("span", { style: {
          fontSize: 8,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          opacity: active ? 1 : 0.7
        }, children: label }),
        active && /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-[-4px] left-1/2 -translate-x-1/2 w-[22px] h-[3px] rounded-b-sm md:top-1/2 md:left-auto md:right-[-1px] md:-translate-x-0 md:-translate-y-1/2 md:w-[3px] md:h-[22px] md:rounded-l-sm md:rounded-b-none",
            style: {
              background: "var(--color-primary)",
              boxShadow: "0 0 8px var(--color-primary)"
            }
          }
        )
      ]
    }
  );
}
var WORKSPACE_BG = "var(--color-bg)";
var FrozenCanvas = memo(
  function FrozenCanvas2({
    config,
    contextRef,
    canvasBg
  }) {
    const containerRef = useRef(null);
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      const initTimer = window.setTimeout(() => {
        if (!container || !contextRef.current) return;
        const w = container.clientWidth || 800;
        const h = container.clientHeight || 600;
        let editor = null;
        try {
          editor = new Editor({
            id: "layerhub_io_canvas",
            config: { ...config, size: { width: w, height: h } },
            state: contextRef.current
          });
        } catch (err) {
          console.error("[FrozenCanvas] Editor init failed:", err);
          return;
        }
        try {
          if (canvasBg && canvasBg !== "#ffffff") {
            editor?.frame?.setBackgroundColor?.(canvasBg);
          }
        } catch {
        }
        const resizeObserver = new ResizeObserver(() => {
          if (!container) return;
          const nw = container.clientWidth || 800;
          const nh = container.clientHeight || 600;
          try {
            editor?.canvas?.resize?.({ width: nw, height: nh });
          } catch {
          }
        });
        resizeObserver.observe(container);
        container.__layerhubEditor = editor;
        container.__layerhubObserver = resizeObserver;
      }, 0);
      return () => {
        clearTimeout(initTimer);
        if (!container) return;
        const obs = container.__layerhubObserver;
        obs?.disconnect();
        const ed = container.__layerhubEditor;
        try {
          ed?.destroy?.();
        } catch {
        }
        delete container.__layerhubEditor;
        delete container.__layerhubObserver;
      };
    }, []);
    return /* @__PURE__ */ jsx("div", { style: { position: "absolute", inset: 0 }, children: /* @__PURE__ */ jsx("div", { ref: containerRef, style: { width: "100%", height: "100%", position: "relative" }, children: /* @__PURE__ */ jsx("canvas", { id: "layerhub_io_canvas" }) }) });
  },
  () => true
  // NEVER re-render after mount
);
var CANVAS_CONFIG = {
  clipToFrame: true,
  scrollLimit: 2500,
  frameMargin: 80,
  background: "transparent",
  size: { width: 1920, height: 1080 },
  controlsPosition: { rotation: "TOP" },
  guidelines: true,
  shortcuts: true
};
function CanvasContextBridge({ canvasBg }) {
  const context = useContext(Context);
  const contextRef = useRef(null);
  if (contextRef.current === null) contextRef.current = context;
  return /* @__PURE__ */ jsx(FrozenCanvas, { config: CANVAS_CONFIG, contextRef, canvasBg });
}
var CanvasArea = memo(function CanvasArea2({
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  canvasBg,
  workspaceBg
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        backgroundColor: workspaceBg ?? WORKSPACE_BG,
        backgroundImage: "radial-gradient(color-mix(in srgb, var(--color-text) 8%, transparent) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
        overflow: "hidden",
        outline: dragOver ? "3px solid var(--color-primary)" : "none",
        outlineOffset: -3,
        transition: "outline 0.15s"
      },
      onDragOver,
      onDragLeave,
      onDrop,
      children: [
        /* @__PURE__ */ jsx(CanvasContextBridge, { canvasBg }),
        dragOver && /* @__PURE__ */ jsx("div", { style: {
          position: "absolute",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 10,
          background: "color-mix(in srgb, var(--color-primary) 88%, transparent)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          padding: "8px 20px",
          borderRadius: 10,
          boxShadow: "0 4px 24px color-mix(in srgb, var(--color-primary) 50%, transparent)"
        }, children: "Drop to add to canvas" })
      ]
    }
  );
});
var TYPE_ICONS = {
  StaticImage: /* @__PURE__ */ jsx(PictureOutlined, {}),
  BackgroundImage: /* @__PURE__ */ jsx(PictureOutlined, {}),
  StaticText: /* @__PURE__ */ jsx(FontSizeOutlined, {}),
  DynamicText: /* @__PURE__ */ jsx(FontSizeOutlined, {}),
  StaticVideo: /* @__PURE__ */ jsx(VideoCameraOutlined, {}),
  StaticPath: /* @__PURE__ */ jsx(AppstoreOutlined, {}),
  StaticVector: /* @__PURE__ */ jsx(AppstoreOutlined, {}),
  Group: /* @__PURE__ */ jsx(FolderOutlined, {})
};
function LayerPanel({ layers, activeId, editor, onClose }) {
  const [selectedIds, setSelectedIds] = useState(/* @__PURE__ */ new Set());
  const toggleSelect = (id, multi) => {
    if (multi) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    } else {
      setSelectedIds(/* @__PURE__ */ new Set([id]));
      editor?.objects.select(id);
    }
  };
  const handleGroup = () => {
    if (selectedIds.size < 2) return;
    editor?.objects.group?.([...selectedIds]);
    setSelectedIds(/* @__PURE__ */ new Set());
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "absolute top-[56px] bottom-[66px] right-0 z-40 w-full md:relative md:top-0 md:bottom-0 md:w-[230px] md:z-auto shrink-0 animate-[panelSlideIn_0.2s_cubic-bezier(0.4,0,0.2,1)]",
      style: {
        background: "color-mix(in srgb, var(--color-surface) 97%, transparent)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderLeft: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "-8px 0 40px var(--shadow-color)"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { style: {
          height: 50,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 8,
          background: "linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 12%, transparent) 0%, transparent 100%)",
          borderBottom: "1px solid var(--color-border)"
        }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            width: 3,
            height: 16,
            borderRadius: 2,
            background: "var(--color-primary)",
            flexShrink: 0
          } }),
          /* @__PURE__ */ jsx("span", { style: {
            flex: 1,
            fontSize: 11,
            fontWeight: 800,
            color: "var(--color-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.09em"
          }, children: "Layers" }),
          selectedIds.size >= 2 && /* @__PURE__ */ jsx(Tooltip, { title: "Group selected layers", children: /* @__PURE__ */ jsx("button", { onClick: handleGroup, style: ICON_BTN, children: /* @__PURE__ */ jsx(FolderOutlined, { style: { fontSize: 12 } }) }) }),
          /* @__PURE__ */ jsx(Tooltip, { title: "Close layers panel", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              style: { ...ICON_BTN, color: "var(--color-text-muted)" },
              children: /* @__PURE__ */ jsx(CloseOutlined, { style: { fontSize: 12 } })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { flex: 1, overflowY: "auto" }, children: layers.length === 0 ? /* @__PURE__ */ jsxs("div", { style: { padding: "32px 16px", textAlign: "center", color: "var(--color-text-muted)", fontSize: 12 }, children: [
          "No layers yet.",
          /* @__PURE__ */ jsx("br", {}),
          "Add content to the canvas."
        ] }) : layers.map((layer) => /* @__PURE__ */ jsx(
          LayerRow,
          {
            layer,
            isActive: layer.id === activeId,
            isSelected: selectedIds.has(layer.id),
            depth: 0,
            onSelect: (multi) => toggleSelect(layer.id, multi),
            onToggleVisible: () => editor?.objects.update({ visible: !layer.visible }, layer.id),
            onDelete: () => editor?.objects.remove(layer.id),
            onCopy: () => editor?.objects.copyById?.(layer.id) ?? editor?.objects.clone?.(),
            onRename: (name) => editor?.objects.update({ name }, layer.id),
            editor
          },
          layer.id
        )) }),
        /* @__PURE__ */ jsx("div", { style: {
          padding: "8px 12px",
          borderTop: "1px solid var(--color-border)",
          fontSize: 9,
          color: "var(--color-text-muted)",
          lineHeight: 1.5
        }, children: "Click to select \xB7 Shift-click to multi-select \xB7 Double-click to rename" })
      ]
    }
  );
}
function LayerRow({ layer, isActive, isSelected, depth, onSelect, onToggleVisible, onDelete, onCopy, onRename, editor }) {
  const [hov, setHov] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState(layer.name);
  const [collapsed, setCollapsed] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);
  const commitRename = () => {
    const trimmed = editVal.trim();
    if (trimmed && trimmed !== layer.name) onRename(trimmed);
    else setEditVal(layer.name);
    setEditing(false);
  };
  const hasChildren = layer.children && layer.children.length > 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: (e) => {
          if (!editing) onSelect(e.shiftKey);
        },
        onDoubleClick: () => {
          setEditing(true);
          setEditVal(layer.name);
        },
        onMouseEnter: () => setHov(true),
        onMouseLeave: () => setHov(false),
        style: {
          height: 36,
          display: "flex",
          alignItems: "center",
          gap: 6,
          paddingLeft: 12 + depth * 16,
          paddingRight: 8,
          cursor: "pointer",
          background: isSelected ? "color-mix(in srgb, var(--color-primary) 22%, transparent)" : isActive ? "color-mix(in srgb, var(--color-primary) 10%, transparent)" : hov ? "color-mix(in srgb, var(--color-text) 3%, transparent)" : "transparent",
          transition: "all 0.12s",
          borderLeft: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
          boxShadow: isActive ? "inset 0 0 20px color-mix(in srgb, var(--color-primary) 6%, transparent)" : "none"
        },
        children: [
          hasChildren ? /* @__PURE__ */ jsx(
            "span",
            {
              onClick: (e) => {
                e.stopPropagation();
                setCollapsed((c) => !c);
              },
              style: { fontSize: 10, color: "var(--color-text-muted)", flexShrink: 0, cursor: "pointer" },
              children: collapsed ? /* @__PURE__ */ jsx(RightOutlined, {}) : /* @__PURE__ */ jsx(DownOutlined, {})
            }
          ) : /* @__PURE__ */ jsx("span", { style: { width: 10 } }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: isActive ? "var(--color-primary)" : "var(--color-text-muted)", flexShrink: 0 }, children: TYPE_ICONS[layer.type] ?? /* @__PURE__ */ jsx(AppstoreOutlined, {}) }),
          editing ? /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              value: editVal,
              onChange: (e) => setEditVal(e.target.value),
              onBlur: commitRename,
              onKeyDown: (e) => {
                if (e.key === "Enter") commitRename();
                if (e.key === "Escape") {
                  setEditVal(layer.name);
                  setEditing(false);
                }
              },
              onClick: (e) => e.stopPropagation(),
              style: {
                flex: 1,
                background: "var(--color-bg)",
                border: "1px solid var(--color-primary)",
                borderRadius: 4,
                color: "var(--color-text)",
                fontSize: 11,
                padding: "2px 6px",
                outline: "none"
              }
            }
          ) : /* @__PURE__ */ jsx("span", { style: {
            flex: 1,
            fontSize: 11,
            color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            opacity: layer.visible ? 1 : 0.45
          }, children: layer.name }),
          (hov || isActive) && !editing && /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 1, flexShrink: 0 }, children: [
            /* @__PURE__ */ jsx(Tooltip, { title: layer.visible ? "Hide" : "Show", children: /* @__PURE__ */ jsx("button", { onClick: (e) => {
              e.stopPropagation();
              onToggleVisible();
            }, style: ICON_BTN, children: layer.visible ? /* @__PURE__ */ jsx(EyeOutlined, { style: { fontSize: 10 } }) : /* @__PURE__ */ jsx(EyeInvisibleOutlined, { style: { fontSize: 10 } }) }) }),
            /* @__PURE__ */ jsx(Tooltip, { title: "Duplicate", children: /* @__PURE__ */ jsx("button", { onClick: (e) => {
              e.stopPropagation();
              onCopy();
            }, style: ICON_BTN, children: /* @__PURE__ */ jsx(CopyOutlined, { style: { fontSize: 10 } }) }) }),
            /* @__PURE__ */ jsx(Tooltip, { title: "Delete", children: /* @__PURE__ */ jsx("button", { onClick: (e) => {
              e.stopPropagation();
              onDelete();
            }, style: { ...ICON_BTN, color: "var(--color-danger)" }, children: /* @__PURE__ */ jsx(DeleteOutlined, { style: { fontSize: 10 } }) }) })
          ] })
        ]
      }
    ),
    hasChildren && !collapsed && layer.children.map((child) => /* @__PURE__ */ jsx(
      LayerRow,
      {
        layer: child,
        isActive: false,
        isSelected: false,
        depth: depth + 1,
        onSelect: () => editor?.objects.select(child.id),
        onToggleVisible: () => editor?.objects.update({ visible: !child.visible }, child.id),
        onDelete: () => editor?.objects.remove(child.id),
        onCopy: () => editor?.objects.copyById?.(child.id) ?? editor?.objects.clone?.(),
        onRename: (name) => editor?.objects.update({ name }, child.id),
        editor
      },
      child.id
    ))
  ] });
}
var ICON_BTN = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "var(--color-text-muted)",
  padding: 3,
  borderRadius: 4,
  display: "flex",
  alignItems: "center"
};
function ObjectPropertiesBar({ activeObj, editor, removingBg, onRemoveBg }) {
  const type = activeObj?.type;
  const isImage = type === "StaticImage" || type === "BackgroundImage";
  const isText = type === "StaticText" || type === "DynamicText";
  const isShape = type === "StaticPath" || type === "StaticVector";
  const [opacity, setOpacity] = useState(() => Math.round((activeObj?.opacity ?? 1) * 100));
  useEffect(() => {
    setOpacity(Math.round((activeObj?.opacity ?? 1) * 100));
  }, [activeObj?.id]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const [pos, setPos] = useState(null);
  const dragRef = useRef(null);
  const onDragStart = useCallback((e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
    e.preventDefault();
    const bar = e.currentTarget.parentElement;
    const rect = bar.getBoundingClientRect();
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: rect.left, origY: rect.top };
    const onMove = (ev) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      setPos({ x: dragRef.current.origX + dx, y: dragRef.current.origY + dy });
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);
  const label = isImage ? "Image" : isText ? "Text" : isShape ? "Shape" : "Object";
  const posStyle = isMobile ? { position: "absolute", bottom: 12, left: 12, right: 12, transform: "none", width: "auto" } : pos ? { position: "absolute", left: pos.x, top: pos.y, transform: "none", bottom: "auto" } : { position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)" };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "scrollbar-hide",
      style: {
        ...posStyle,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 12px",
        background: "color-mix(in srgb, var(--color-surface) 94%, transparent)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--color-border)",
        borderRadius: 14,
        boxShadow: "0 8px 32px var(--shadow-color)",
        whiteSpace: "nowrap",
        overflowX: "auto"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: onDragStart,
            style: { cursor: "grab", padding: "0 4px", color: "var(--color-text-muted)", fontSize: 12, flexShrink: 0, userSelect: "none" },
            title: "Drag to move",
            children: "\u283F"
          }
        ),
        /* @__PURE__ */ jsx("div", { style: {
          background: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
          borderRadius: 6,
          padding: "3px 9px",
          fontSize: 10,
          fontWeight: 800,
          color: "var(--color-primary)",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          flexShrink: 0
        }, children: label }),
        /* @__PURE__ */ jsx(PDivider, {}),
        /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "var(--color-text-muted)", flexShrink: 0 }, children: "Opacity" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 100,
            value: opacity,
            style: { width: 72, accentColor: "var(--color-primary)", cursor: "pointer" },
            onChange: (e) => {
              const v = Number(e.target.value);
              setOpacity(v);
              editor?.objects.update({ opacity: v / 100 });
            }
          }
        ),
        /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "var(--color-text)", minWidth: 30, textAlign: "right" }, children: [
          opacity,
          "%"
        ] }),
        isImage && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(PDivider, {}),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6 }, children: [
              /* @__PURE__ */ jsx(PBtn, { title: "Flip horizontal", onClick: () => editor?.objects.update({ flipX: !activeObj?.flipX }), children: /* @__PURE__ */ jsx(SwapOutlined, {}) }),
              /* @__PURE__ */ jsx(PBtn, { title: "Flip vertical", onClick: () => editor?.objects.update({ flipY: !activeObj?.flipY }), children: /* @__PURE__ */ jsx(SwapOutlined, { style: { transform: "rotate(90deg)" } }) }),
              /* @__PURE__ */ jsxs(
                PBtn,
                {
                  title: "Remove image background (runs in-browser)",
                  onClick: onRemoveBg,
                  style: {
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "0 10px",
                    background: removingBg ? "color-mix(in srgb, var(--color-text) 5%, transparent)" : "color-mix(in srgb, var(--color-primary) 12%, transparent)",
                    border: `1px solid ${removingBg ? "var(--color-border)" : "var(--color-primary)"}`,
                    color: removingBg ? "var(--color-text-muted)" : "var(--color-primary)"
                  },
                  children: [
                    /* @__PURE__ */ jsx(ScissorOutlined, { style: { fontSize: 12 } }),
                    removingBg ? "Removing\u2026" : "Remove BG"
                  ]
                }
              )
            ] }),
            activeObj?.clipPath && /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, marginTop: 4 }, children: [
              /* @__PURE__ */ jsx("span", { style: { fontSize: 10, color: "var(--color-text-muted)", flexShrink: 0 }, children: "Img Scale" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: 0.1,
                  max: 3,
                  step: 0.1,
                  defaultValue: activeObj?.scaleX || 1,
                  style: { width: 60, accentColor: "var(--color-primary)", cursor: "pointer" },
                  onChange: (e) => {
                    const v = Number(e.target.value);
                    editor?.objects.update({ scaleX: v, scaleY: v });
                  }
                }
              ),
              /* @__PURE__ */ jsx("span", { style: { fontSize: 10, color: "var(--color-text-muted)", flexShrink: 0 }, children: "Crop X/Y" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: -100,
                  max: 100,
                  step: 1,
                  defaultValue: 0,
                  style: { width: 40, accentColor: "var(--color-primary)", cursor: "pointer" },
                  onChange: (e) => {
                  }
                }
              )
            ] })
          ] })
        ] }),
        isText && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(PDivider, {}),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "var(--color-text-muted)", flexShrink: 0 }, children: "Font" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              defaultValue: activeObj?.fontFamily ?? "sans-serif",
              style: {
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: 6,
                color: "var(--color-text)",
                fontSize: 11,
                padding: "4px 6px",
                maxWidth: 120,
                cursor: "pointer",
                outline: "none"
              },
              onChange: (e) => editor?.objects.update({ fontFamily: e.target.value }),
              children: [
                "sans-serif",
                "serif",
                "monospace",
                "Roboto",
                "Open Sans",
                "Montserrat",
                "Lato",
                "Oswald",
                "Playfair Display",
                "Pacifico",
                "Lobster",
                "Dancing Script",
                "Bebas Neue",
                "Anton"
              ].map(
                (f) => /* @__PURE__ */ jsx("option", { value: f, style: { background: "var(--color-surface)", color: "var(--color-text)" }, children: f }, f)
              )
            },
            activeObj?.id + "-ff"
          ),
          /* @__PURE__ */ jsx(PDivider, {}),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "var(--color-text-muted)", flexShrink: 0 }, children: "Size" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 6,
              max: 500,
              defaultValue: activeObj?.fontSize ?? 32,
              style: {
                width: 52,
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: 6,
                color: "var(--color-text)",
                fontSize: 12,
                padding: "4px 6px",
                textAlign: "center",
                outline: "none"
              },
              onChange: (e) => editor?.objects.update({ fontSize: Number(e.target.value) })
            },
            activeObj?.id + "-fs"
          ),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "var(--color-text-muted)", flexShrink: 0 }, children: "Color" }),
          /* @__PURE__ */ jsx(
            PropertyColorPicker,
            {
              color: typeof activeObj?.fill === "string" ? activeObj.fill : "#000000",
              onChange: (c) => editor?.objects.update({ fill: c }),
              tooltip: "Text color",
              activeObjId: activeObj?.id
            }
          ),
          /* @__PURE__ */ jsx(PDivider, {}),
          /* @__PURE__ */ jsx(
            PBtn,
            {
              title: "Bold",
              onClick: () => editor?.objects.update({ fontWeight: activeObj?.fontWeight === "bold" ? "normal" : "bold" }),
              active: activeObj?.fontWeight === "bold",
              children: /* @__PURE__ */ jsx(BoldOutlined, {})
            }
          ),
          /* @__PURE__ */ jsx(
            PBtn,
            {
              title: "Italic",
              onClick: () => editor?.objects.update({ fontStyle: activeObj?.fontStyle === "italic" ? "normal" : "italic" }),
              active: activeObj?.fontStyle === "italic",
              children: /* @__PURE__ */ jsx(ItalicOutlined, {})
            }
          ),
          /* @__PURE__ */ jsx(PDivider, {}),
          /* @__PURE__ */ jsx(PBtn, { title: "Align left", onClick: () => editor?.objects.update({ textAlign: "left" }), active: activeObj?.textAlign === "left", children: /* @__PURE__ */ jsx(AlignLeftOutlined, {}) }),
          /* @__PURE__ */ jsx(PBtn, { title: "Align center", onClick: () => editor?.objects.update({ textAlign: "center" }), active: activeObj?.textAlign === "center", children: /* @__PURE__ */ jsx(AlignCenterOutlined, {}) }),
          /* @__PURE__ */ jsx(PBtn, { title: "Align right", onClick: () => editor?.objects.update({ textAlign: "right" }), active: activeObj?.textAlign === "right", children: /* @__PURE__ */ jsx(AlignRightOutlined, {}) })
        ] }),
        (isShape || !isImage && !isText) && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(PDivider, {}),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "var(--color-text-muted)", flexShrink: 0 }, children: "Fill" }),
          /* @__PURE__ */ jsx(
            PropertyColorPicker,
            {
              color: typeof activeObj?.fill === "string" ? activeObj.fill : "#7c3aed",
              onChange: (c) => editor?.objects.update({ fill: c }),
              tooltip: "Shape fill color",
              activeObjId: activeObj?.id
            }
          ),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "var(--color-text-muted)", flexShrink: 0 }, children: "Stroke" }),
          /* @__PURE__ */ jsx(
            PropertyColorPicker,
            {
              color: typeof activeObj?.stroke === "string" && activeObj.stroke ? activeObj.stroke : "#ffffff",
              onChange: (c) => editor?.objects.update({ stroke: c }),
              tooltip: "Shape stroke color",
              activeObjId: activeObj?.id
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              max: 40,
              defaultValue: activeObj?.strokeWidth ?? 0,
              style: {
                width: 44,
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: 6,
                color: "var(--color-text)",
                fontSize: 12,
                padding: "4px 6px",
                textAlign: "center",
                outline: "none"
              },
              onChange: (e) => editor?.objects.update({ strokeWidth: Number(e.target.value) })
            },
            activeObj?.id + "-sw"
          )
        ] }),
        /* @__PURE__ */ jsx(PDivider, {}),
        /* @__PURE__ */ jsx(PBtn, { title: "Bring forward", onClick: () => editor?.objects.bringForward(), children: /* @__PURE__ */ jsx(VerticalAlignTopOutlined, {}) }),
        /* @__PURE__ */ jsx(PBtn, { title: "Send backward", onClick: () => editor?.objects.sendBackwards(), children: /* @__PURE__ */ jsx(VerticalAlignBottomOutlined, {}) }),
        /* @__PURE__ */ jsx(PDivider, {}),
        /* @__PURE__ */ jsx(PBtn, { title: "Duplicate", onClick: () => editor?.objects.clone(), children: /* @__PURE__ */ jsx(CopyOutlined, {}) }),
        /* @__PURE__ */ jsx(PBtn, { title: "Delete (Del)", onClick: () => editor?.objects.remove(), danger: true, children: /* @__PURE__ */ jsx(DeleteOutlined, {}) })
      ]
    }
  );
}
var SWATCHES2 = [
  // Row 1 — Neutrals
  "#ffffff",
  "#f5f5f5",
  "#e0e0e0",
  "#9e9e9e",
  "#616161",
  "#212121",
  "#000000",
  // Row 2 — Warm
  "#ffebee",
  "#ef5350",
  "#e53935",
  "#c62828",
  "#ff7043",
  "#ff8f00",
  "#f9a825",
  // Row 3 — Cool
  "#e8f5e9",
  "#66bb6a",
  "#2e7d32",
  "#26c6da",
  "#0288d1",
  "#1565c0",
  "#7b1fa2",
  // Row 4 — Vibrant
  "#f06292",
  "#ba68c8",
  "#7986cb",
  "#4dd0e1",
  "#4db6ac",
  "#aed581",
  "#fff176",
  // Row 5 — Pastels
  "#fce4ec",
  "#f3e5f5",
  "#e8eaf6",
  "#e1f5fe",
  "#e0f2f1",
  "#f1f8e9",
  "#fffde7"
];
function hslToRgb2(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}
function PropertyColorPicker({
  color,
  onChange,
  tooltip,
  activeObjId
}) {
  const [hex, setHex] = useState(color);
  useEffect(() => {
    setHex(color);
  }, [color, activeObjId]);
  const commitHex = useCallback((val) => {
    const clean = val.startsWith("#") ? val : `#${val}`;
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
      onChange(clean);
      setHex(clean);
    }
  }, [onChange]);
  const pickerContent = /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        width: 220,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: "4px 2px"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              height: 10,
              borderRadius: 6,
              background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
              cursor: "crosshair",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)"
            },
            onClick: (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              const hue = Math.round(pct * 360);
              const hex6 = `#${[0, 8, 16].map((s) => {
                const c = Math.round(hslToRgb2(hue / 360, 1, 0.5)[s / 8]);
                return c.toString(16).padStart(2, "0");
              }).join("")}`;
              onChange(hex6);
              setHex(hex6);
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 6
        }, children: SWATCHES2.map((sw) => /* @__PURE__ */ jsx(
          "button",
          {
            title: sw,
            onClick: () => {
              onChange(sw);
              setHex(sw);
            },
            style: {
              width: "100%",
              aspectRatio: "1/1",
              borderRadius: 6,
              border: color.toLowerCase() === sw.toLowerCase() ? "2px solid var(--color-primary)" : "1px solid rgba(0,0,0,0.12)",
              background: sw,
              cursor: "pointer",
              transition: "transform 0.1s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            },
            onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.15)",
            onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)"
          },
          sw
        )) }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { position: "relative", flexShrink: 0 }, children: [
            /* @__PURE__ */ jsx("div", { style: {
              width: 34,
              height: 34,
              borderRadius: 10,
              background: color,
              border: "1.5px solid var(--color-border)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              cursor: "pointer",
              overflow: "hidden"
            } }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "color",
                value: color,
                onChange: (e) => {
                  onChange(e.target.value);
                  setHex(e.target.value);
                },
                style: {
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  padding: 0,
                  border: "none"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: hex,
              onChange: (e) => setHex(e.target.value),
              onBlur: (e) => commitHex(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && commitHex(e.target.value),
              maxLength: 7,
              spellCheck: false,
              style: {
                flex: 1,
                height: 34,
                border: "1.5px solid var(--color-border)",
                borderRadius: 8,
                padding: "0 8px",
                fontSize: 12,
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: "0.04em",
                background: "color-mix(in srgb, var(--color-text) 4%, var(--color-surface))",
                color: "var(--color-text)",
                outline: "none",
                transition: "border-color 0.15s"
              },
              onFocus: (e) => e.target.style.borderColor = "var(--color-primary)",
              onBlurCapture: (e) => e.target.style.borderColor = "var(--color-border)"
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ jsx(
    Popover,
    {
      content: pickerContent,
      placement: "top",
      children: /* @__PURE__ */ jsx(Tooltip, { title: tooltip, placement: "top", children: /* @__PURE__ */ jsx(
        "button",
        {
          style: {
            height: 30,
            width: 38,
            padding: 3,
            borderRadius: 8,
            border: "1px solid var(--color-border)",
            background: "var(--color-bg)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            transition: "all 0.15s ease",
            outline: "none"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.borderColor = "color-mix(in srgb, var(--color-text) 30%, var(--color-border))";
            e.currentTarget.style.background = "color-mix(in srgb, var(--color-text) 4%, var(--color-bg))";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.background = "var(--color-bg)";
          },
          children: /* @__PURE__ */ jsx("div", { style: {
            width: "100%",
            height: "100%",
            borderRadius: 5,
            border: "1px solid rgba(0,0,0,0.12)",
            background: color,
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
          } })
        }
      ) })
    }
  );
}
var Ctx = React.createContext(null);
function useEditorContext() {
  const v = React.useContext(Ctx);
  if (!v) throw new Error("useEditorContext must be used inside <DesignEditor>");
  return v;
}
var EditorContextProvider = Ctx.Provider;
function LibraryPanel() {
  const { mediaProvider } = useEditorContext();
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    let mounted = true;
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const res = await mediaProvider.list({});
        if (mounted) setItems(res.items);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMedia();
    return () => {
      mounted = false;
    };
  }, [mediaProvider]);
  if (loading) return /* @__PURE__ */ jsx("div", { style: { padding: "1rem" }, children: "Loading library..." });
  return /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "16px" }, children: items.map((item) => /* @__PURE__ */ jsx("div", { style: { cursor: "pointer", borderRadius: "4px", overflow: "hidden" }, onClick: () => {
  }, children: /* @__PURE__ */ jsx("img", { src: item.thumbnailUrl || item.url, alt: item.name, style: { width: "100%", height: "auto", display: "block" } }) }, item.id)) });
}
var SHAPE_FILES = {
  filled: [
    "filled-arrow-archer.png",
    "filled-arrow-fat.png",
    "filled-arrow-thin-rounded.png",
    "filled-arrow-thin.png",
    "filled-arrow-wide.png",
    "filled-blob.png",
    "filled-cloud.png",
    "filled-crescent.png",
    "filled-cross.png",
    "filled-ellipse.png",
    "filled-four-star.png",
    "filled-frame.png",
    "filled-heart.png",
    "filled-kite.png",
    "filled-line.png",
    "filled-oval.png",
    "filled-pie.png",
    "filled-pill.png",
    "filled-polygon.png",
    "filled-quarter-circle-outline.png",
    "filled-quarter-circle.png",
    "filled-quarterfoil.png",
    "filled-rectangle-mask.png",
    "filled-rectangle.png",
    "filled-rhombus.png",
    "filled-ring.png",
    "filled-round-mask.png",
    "filled-rounded-rectangle.png",
    "filled-semicircle.png",
    "filled-square.png",
    "filled-star-round.png",
    "filled-star.png",
    "filled-sun.png",
    "filled-trefoil.png",
    "filled-triangle-right.png",
    "filled-triangle.png",
    "filled-wiggle.png",
    "filled-ziczac.png"
  ],
  outline: [
    "outline-arrow-archer.png",
    "outline-arrow-fat.png",
    "outline-arrow-thin-rounded.png",
    "outline-arrow-thin.png",
    "outline-arrow-wide.png",
    "outline-blob.png",
    "outline-cloud.png",
    "outline-crescent.png",
    "outline-cross.png",
    "outline-ellipse.png",
    "outline-four-star.png",
    "outline-frame.png",
    "outline-heart.png",
    "outline-kite.png",
    "outline-line.png",
    "outline-oval.png",
    "outline-pie.png",
    "outline-pill.png",
    "outline-quarter-circle-outline.png",
    "outline-quarter-circle.png",
    "outline-quarterfoil.png",
    "outline-rectangle-mask.png",
    "outline-rectangle.png",
    "outline-rhombus.png",
    "outline-ring.png",
    "outline-round-mask.png",
    "outline-rounded-rectangle.png",
    "outline-semicircle.png",
    "outline-square.png",
    "outline-star-round.png",
    "outline-star.png",
    "outline-sun.png",
    "outline-trefoil.png",
    "outline-triangle-right.png",
    "outline-triangle.png",
    "outline-wiggle.png",
    "outline-ziczac.png"
  ],
  gradient: [
    "gradient-arrow-archer.png",
    "gradient-arrow-fat.png",
    "gradient-arrow-thin-rounded.png",
    "gradient-arrow-thin.png",
    "gradient-arrow-wide.png",
    "gradient-blob.png",
    "gradient-cloud.png",
    "gradient-crescent.png",
    "gradient-cross.png",
    "gradient-ellipse.png",
    "gradient-four-star.png",
    "gradient-frame.png",
    "gradient-heart.png",
    "gradient-kite.png",
    "gradient-line.png",
    "gradient-oval.png",
    "gradient-pie.png",
    "gradient-pill.png",
    "gradient-polygon.png",
    "gradient-quarter-circle-outline.png",
    "gradient-quarter-circle.png",
    "gradient-quarterfoil.png",
    "gradient-rectangle-mask.png",
    "gradient-rhombus.png",
    "gradient-ring.png",
    "gradient-round-mask.png",
    "gradient-rounded-rectangle.png",
    "gradient-semicircle.png",
    "gradient-square.png",
    "gradient-star-round.png",
    "gradient-star.png",
    "gradient-sun.png",
    "gradient-trefoil.png",
    "gradient-triangle-right.png",
    "gradient-triangle.png",
    "gradient-wiggle.png",
    "gradient-ziczac.png"
  ],
  image: [
    "image-arrow-archer.png",
    "image-arrow-fat.png",
    "image-arrow-thin-rounded.png",
    "image-arrow-thin.png",
    "image-arrow-wide.png",
    "image-blob.png",
    "image-cloud.png",
    "image-crescent.png",
    "image-cross.png",
    "image-ellipse.png",
    "image-four-star.png",
    "image-frame.png",
    "image-heart.png",
    "image-kite.png",
    "image-line.png",
    "image-oval.png",
    "image-pie.png",
    "image-pill.png",
    "image-polygon.png",
    "image-quarter-circle-outline.png",
    "image-quarter-circle.png",
    "image-quarterfoil.png",
    "image-rectangle-mask.png",
    "image-rectangle.png",
    "image-rhombus.png",
    "image-ring.png",
    "image-round-mask.png",
    "image-rounded-rectangle.png",
    "image-semicircle.png",
    "image-square.png",
    "image-star-round.png",
    "image-star.png",
    "image-sun.png",
    "image-trefoil.png",
    "image-triangle-right.png",
    "image-triangle.png",
    "image-wiggle.png",
    "image-ziczac.png"
  ],
  abstract: [
    "filled-organic-1.png",
    "filled-organic-2.png",
    "filled-organic-3.png",
    "filled-organic-4.png",
    "filled-organic-dot-1.png",
    "filled-organic-dot-2.png",
    "filled-splash-1.png",
    "filled-splash-2.png",
    "filled-splash-3.png",
    "filled-splash-4.png"
  ],
  abstract_outline: [
    "outline-organic-1.png",
    "outline-organic-2.png",
    "outline-organic-3.png",
    "outline-organic-4.png",
    "outline-organic-dot-1.png",
    "outline-organic-dot-2.png",
    "outline-splash-1.png",
    "outline-splash-2.png",
    "outline-splash-3.png",
    "outline-splash-4.png"
  ],
  abstract_gradient: [
    "gradient-organic-1.png",
    "gradient-organic-2.png",
    "gradient-organic-3.png",
    "gradient-organic-4.png",
    "gradient-organic-dot-1.png",
    "gradient-organic-dot-2.png",
    "gradient-splash-1.png",
    "gradient-splash-2.png",
    "gradient-splash-3.png",
    "gradient-splash-4.png"
  ],
  abstract_image: [
    "image-organic-1.png",
    "image-organic-2.png",
    "image-organic-3.png",
    "image-organic-4.png",
    "image-organic-dot-1.png",
    "image-organic-dot-2.png",
    "image-splash-1.png",
    "image-splash-2.png",
    "image-splash-3.png",
    "image-splash-4.png"
  ]
};
var SHAPES = Object.entries(
  SHAPE_FILES
).flatMap(
  ([category, files]) => files.map((file) => ({
    id: file.replace(/\.(svg|png)$/i, "").replace(/_/g, "-"),
    label: file.replace(/\.(svg|png)$/i, "").replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    category,
    file
  }))
);
var CATEGORY_ORDER = [
  { key: "filled", label: "Filled" },
  { key: "outline", label: "Outline" },
  { key: "gradient", label: "Gradient" },
  { key: "image", label: "Image" },
  { key: "abstract", label: "Abstract" },
  { key: "abstract_outline", label: "Abstract Outline" },
  { key: "abstract_gradient", label: "Abstract Gradient" },
  { key: "abstract_image", label: "Abstract Image" }
];
function ShapesPanel({ onAddShape }) {
  const [search, setSearch] = useState("");
  const filteredShapes = search.trim() ? SHAPES.filter(
    (s) => s.label.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
  ) : SHAPES;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-surface", children: [
    /* @__PURE__ */ jsx("div", { className: "px-4 pt-4 pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-[color-mix(in_srgb,var(--color-text)_5%,transparent)] rounded-lg px-3 py-2 border border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors", children: [
      /* @__PURE__ */ jsx(SearchOutlined, { className: "text-[var(--color-text-muted)] mr-2" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search shapes...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "bg-transparent border-none outline-none flex-1 text-[var(--color-text)] text-sm"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto pb-6 scrollbar-hide px-4", children: [
      CATEGORY_ORDER.map((category) => {
        const categoryShapes = filteredShapes.filter(
          (shape) => shape.category === category.key
        );
        return /* @__PURE__ */ jsx(
          ShapeCategory,
          {
            title: category.label,
            shapes: categoryShapes,
            onAddShape
          },
          category.key
        );
      }),
      filteredShapes.length === 0 && /* @__PURE__ */ jsxs("div", { className: "mt-8 text-center text-[var(--color-text-muted)] text-sm", children: [
        'No shapes found for "',
        search,
        '"'
      ] })
    ] })
  ] });
}
function ShapeCategory({
  title,
  shapes,
  onAddShape
}) {
  const [expanded, setExpanded] = useState(false);
  if (shapes.length === 0) return null;
  const hasMore = shapes.length > 0;
  return /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-[var(--color-text)] tracking-tight", children: title }),
      hasMore && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setExpanded(!expanded),
          className: "flex items-center text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors bg-transparent border-none cursor-pointer",
          children: [
            expanded ? "Less" : `More (${shapes.length})`,
            expanded ? /* @__PURE__ */ jsx(UpOutlined, { className: "ml-1 text-[10px]" }) : /* @__PURE__ */ jsx(DownOutlined, { className: "ml-1 text-[10px]" })
          ]
        }
      )
    ] }),
    expanded ? (
      /* EXPANDED — 3-col grid */
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 mt-1 auto-rows-fr", children: shapes.map((shape) => /* @__PURE__ */ jsx(
        ShapeTile,
        {
          shape,
          onClick: () => onAddShape(
            `https://cdn.jsdelivr.net/gh/fastlabai/design-editor/assets/shapes/${shape.category}/${shape.file}`
          )
        },
        shape.id
      )) })
    ) : (
      /* COLLAPSED — horizontal scroll, scrollbar hidden, with arrow hint */
      /* @__PURE__ */ jsx(ScrollRow, { shapes, onAddShape })
    )
  ] });
}
function ScrollRow({
  shapes,
  onAddShape
}) {
  const scrollRef = React__default.useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 160, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("style", { children: `.sticker-hscroll::-webkit-scrollbar { display: none; }` }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        className: "sticker-hscroll flex gap-2 py-[3px] mx-[-16px] px-[16px]",
        style: {
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        },
        onScroll: checkScroll,
        children: shapes.map((shape) => /* @__PURE__ */ jsx("div", { className: "shrink-0", style: {
          width: "calc((100% - 24px) / 4)"
        }, children: /* @__PURE__ */ jsx(
          ShapeTile,
          {
            shape,
            onClick: () => onAddShape(
              `https://cdn.jsdelivr.net/gh/fastlabai/design-editor/assets/shapes/${shape.category}/${shape.file}`
            )
          }
        ) }, shape.id))
      }
    ),
    canScrollRight && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: scrollRight,
        className: "absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer border-none outline-none",
        style: {
          width: 22,
          height: 22,
          borderRadius: 6,
          background: "var(--color-surface, #fff)",
          boxShadow: "-8px 0 14px 8px var(--color-surface, #fff)"
        },
        children: /* @__PURE__ */ jsx(RightOutlined, { style: { fontSize: 10, color: "var(--color-text-muted)" } })
      }
    )
  ] });
}
function ShapeTile({
  shape,
  onClick,
  expanded = false
}) {
  const [hovered, setHovered] = useState(false);
  const imageUrl = `https://cdn.jsdelivr.net/gh/fastlabai/design-editor/assets/shapes/${shape.category}/${shape.file}`;
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/x-fastlabai-type", "shape");
    e.dataTransfer.setData(
      "text/x-fastlabai-shape-src",
      imageUrl
    );
  };
  return /* @__PURE__ */ jsx(Tooltip, { title: shape.label, placement: "top", children: /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      draggable: true,
      onDragStart: handleDragStart,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      className: "\n          w-full\n          rounded-xl\n          flex\n          items-center\n          justify-center\n          cursor-pointer\n          border-none\n          outline-none\n          transition-all\n          duration-200\n          shrink-0\n        ",
      style: {
        width: "100%",
        aspectRatio: "1 / 1",
        background: "color-mix(in srgb, var(--color-text) 5%, transparent)",
        boxShadow: hovered ? "0 0 0 2px var(--color-border, #d1d5db)" : "none",
        transform: hovered ? "scale(1.03)" : "scale(1)"
      },
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: imageUrl,
          alt: shape.label,
          draggable: false,
          className: "\n            w-[78%]\n            h-[78%]\n            object-contain\n            pointer-events-none\n            select-none\n            transition-opacity\n            duration-200\n          ",
          style: {
            opacity: hovered ? 0.85 : 1
          },
          onError: (e) => {
            e.currentTarget.style.display = "none";
          }
        }
      )
    }
  ) });
}
var STICKER_FILES = {
  emoji: [
    "emoji_anguished.svg",
    "emoji_ape.svg",
    "emoji_beer.svg",
    "emoji_crying.svg",
    "emoji_devil.svg",
    "emoji_doubtful.svg",
    "emoji_drooling.svg",
    "emoji_flushed.svg",
    "emoji_grim.svg",
    "emoji_grimacing.svg",
    "emoji_halo.svg",
    "emoji_happyface.svg",
    "emoji_hearteyes.svg",
    "emoji_lips.svg",
    "emoji_melon.svg",
    "emoji_nauseated.svg",
    "emoji_pacman.svg",
    "emoji_persevering.svg",
    "emoji_pizza.svg",
    "emoji_rollingeyes.svg",
    "emoji_sad.svg",
    "emoji_skull.svg",
    "emoji_smile.svg",
    "emoji_sunglasses.svg",
    "emoji_tearsofjoy.svg",
    "emoji_thumbsup.svg",
    "emoji_tongueout.svg"
  ],
  doodle: [
    "doodle_camera.svg",
    "doodle_divingmask.svg",
    "doodle_fish.svg",
    "doodle_hat.svg",
    "doodle_hula.svg",
    "doodle_jetpack.svg",
    "doodle_pipe.svg",
    "doodle_rocket.svg",
    "doodle_saturn.svg",
    "doodle_skateboard.svg",
    "doodle_spaceman.svg",
    "doodle_star.svg",
    "doodle_starfish.svg",
    "doodle_sun.svg",
    "doodle_surfing.svg",
    "doodle_wing_01.svg",
    "doodle_wing_02.svg"
  ],
  craft: [
    "clip.png",
    "photo_frame.svg",
    "polaroid_frame.png",
    "tape01.png",
    "tape02.png",
    "tape03.png",
    "tape04.png",
    "tape05.png",
    "tape06.png",
    "tape07.png",
    "tape08.png",
    "tape09.png",
    "tape10.png",
    "tape11.png",
    "tape12.png"
  ],
  emoticons: [
    "imgly_sticker_emoticons_angel.svg",
    "imgly_sticker_emoticons_angry.svg",
    "imgly_sticker_emoticons_anxious.svg",
    "imgly_sticker_emoticons_asleep.svg",
    "imgly_sticker_emoticons_attention.svg",
    "imgly_sticker_emoticons_baby_chicken.svg",
    "imgly_sticker_emoticons_batman.svg",
    "imgly_sticker_emoticons_beer.svg",
    "imgly_sticker_emoticons_blush.svg",
    "imgly_sticker_emoticons_boxer.svg",
    "imgly_sticker_emoticons_business.svg",
    "imgly_sticker_emoticons_chicken.svg",
    "imgly_sticker_emoticons_cool.svg",
    "imgly_sticker_emoticons_cry.svg",
    "imgly_sticker_emoticons_deceased.svg",
    "imgly_sticker_emoticons_devil.svg",
    "imgly_sticker_emoticons_duckface.svg",
    "imgly_sticker_emoticons_furious.svg",
    "imgly_sticker_emoticons_grin.svg",
    "imgly_sticker_emoticons_guitar.svg",
    "imgly_sticker_emoticons_harry_potter.svg",
    "imgly_sticker_emoticons_hippie.svg",
    "imgly_sticker_emoticons_hitman.svg",
    "imgly_sticker_emoticons_humourous.svg",
    "imgly_sticker_emoticons_idea.svg",
    "imgly_sticker_emoticons_impatient.svg",
    "imgly_sticker_emoticons_kiss.svg",
    "imgly_sticker_emoticons_kisses.svg",
    "imgly_sticker_emoticons_laugh.svg",
    "imgly_sticker_emoticons_loud_cry.svg",
    "imgly_sticker_emoticons_loving.svg",
    "imgly_sticker_emoticons_masked.svg",
    "imgly_sticker_emoticons_music.svg",
    "imgly_sticker_emoticons_nerd.svg",
    "imgly_sticker_emoticons_ninja.svg",
    "imgly_sticker_emoticons_not_speaking_to_you.svg",
    "imgly_sticker_emoticons_pig.svg",
    "imgly_sticker_emoticons_pumpkin.svg",
    "imgly_sticker_emoticons_question.svg",
    "imgly_sticker_emoticons_rabbit.svg",
    "imgly_sticker_emoticons_sad.svg",
    "imgly_sticker_emoticons_sick.svg",
    "imgly_sticker_emoticons_skateboard.svg",
    "imgly_sticker_emoticons_skull.svg",
    "imgly_sticker_emoticons_sleepy.svg",
    "imgly_sticker_emoticons_smile.svg",
    "imgly_sticker_emoticons_smoking.svg",
    "imgly_sticker_emoticons_sobbing.svg",
    "imgly_sticker_emoticons_star.svg",
    "imgly_sticker_emoticons_steaming_furious.svg",
    "imgly_sticker_emoticons_sunbathing.svg",
    "imgly_sticker_emoticons_tired.svg",
    "imgly_sticker_emoticons_tongue_out_wink.svg",
    "imgly_sticker_emoticons_wave.svg",
    "imgly_sticker_emoticons_wide_grin.svg",
    "imgly_sticker_emoticons_wink.svg",
    "imgly_sticker_emoticons_wrestler.svg"
  ],
  florals: [
    "florals_01.svg",
    "florals_02.svg",
    "florals_03.svg",
    "florals_04.svg",
    "florals_05.svg",
    "florals_06.svg",
    "florals_07.svg",
    "florals_08.svg",
    "florals_09.svg",
    "florals_10.svg"
  ],
  hand: [
    "hand_alive.svg",
    "hand_five.svg",
    "hand_friends.svg",
    "hand_fuck.svg",
    "hand_heart.svg",
    "hand_luck.svg",
    "hand_ok.svg",
    "hand_vibes.svg"
  ],
  "3Dstickers": [
    "3d_stickers_astronaut.png",
    "3d_stickers_brain.png",
    "3d_stickers_cube.png",
    "3d_stickers_light.png",
    "3d_stickers_megaphone.png",
    "3d_stickers_pizza.png",
    "3d_stickers_rainbow.png",
    "3d_stickers_thumbs_up.png",
    "3d_stickers_thunder.png"
  ]
};
var STICKERS = Object.entries(
  STICKER_FILES
).flatMap(
  ([category, files]) => files.map((file) => ({
    id: file.replace(/\.(svg|png)$/i, "").replace(/_/g, "-"),
    label: file.replace(/\.(svg|png)$/i, "").replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    category,
    file
  }))
);
var CATEGORY_ORDER2 = [
  { key: "emoji", label: "Emoji" },
  { key: "emoticons", label: "Emoticons" },
  { key: "craft", label: "Craft" },
  { key: "3Dstickers", label: "3D Grain" },
  { key: "hand", label: "Hands" },
  { key: "doodle", label: "Doodle" },
  { key: "florals", label: "Florals" }
];
function StickersPanel({ onAddSticker }) {
  const [search, setSearch] = useState("");
  const filteredStickers = useMemo(() => {
    if (!search.trim()) return STICKERS;
    const q = search.toLowerCase();
    return STICKERS.filter(
      (sticker) => sticker.label.toLowerCase().includes(q) || sticker.id.toLowerCase().includes(q)
    );
  }, [search]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-surface", children: [
    /* @__PURE__ */ jsx("div", { className: "px-4 pt-4 pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-[color-mix(in_srgb,var(--color-text)_5%,transparent)] rounded-lg px-3 py-2 border border-[var(--color-border)] focus-within:border-[var(--color-primary)] transition-colors", children: [
      /* @__PURE__ */ jsx(SearchOutlined, { className: "text-[var(--color-text-muted)] mr-2" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search stickers...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "bg-transparent border-none outline-none flex-1 text-[var(--color-text)] text-sm"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto pb-6 scrollbar-hide px-4", children: [
      CATEGORY_ORDER2.map((category) => {
        const stickers = filteredStickers.filter(
          (s) => s.category === category.key
        );
        if (stickers.length === 0) return null;
        return /* @__PURE__ */ jsx(
          StickerCategory,
          {
            title: category.label,
            stickers,
            onAddSticker
          },
          category.key
        );
      }),
      filteredStickers.length === 0 && /* @__PURE__ */ jsxs("div", { className: "mt-8 text-center text-[var(--color-text-muted)] text-sm", children: [
        'No stickers found for "',
        search,
        '"'
      ] })
    ] })
  ] });
}
function StickerCategory({
  title,
  stickers,
  onAddSticker
}) {
  const [expanded, setExpanded] = useState(false);
  if (stickers.length === 0) return null;
  const hasMore = stickers.length > 0;
  return /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-[var(--color-text)] tracking-tight", children: title }),
      hasMore && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setExpanded(!expanded),
          className: "flex items-center text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors bg-transparent border-none cursor-pointer",
          children: [
            expanded ? "Less" : `More (${stickers.length})`,
            expanded ? /* @__PURE__ */ jsx(UpOutlined, { className: "ml-1 text-[10px]" }) : /* @__PURE__ */ jsx(DownOutlined, { className: "ml-1 text-[10px]" })
          ]
        }
      )
    ] }),
    expanded ? (
      /* EXPANDED — 3-col grid */
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 mt-1 auto-rows-fr", children: stickers.map((sticker) => /* @__PURE__ */ jsx(
        StickerTile,
        {
          sticker,
          onClick: () => onAddSticker(
            `https://cdn.jsdelivr.net/gh/fastlabai/design-editor/assets/stickers/${sticker.category}/${sticker.file}`
          )
        },
        sticker.id
      )) })
    ) : (
      /* COLLAPSED — horizontal scroll, scrollbar hidden, with arrow hint */
      /* @__PURE__ */ jsx(ScrollRow2, { stickers, onAddSticker })
    )
  ] });
}
function ScrollRow2({
  stickers,
  onAddSticker
}) {
  const scrollRef = React__default.useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 160, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("style", { children: `.sticker-hscroll::-webkit-scrollbar { display: none; }` }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        className: "sticker-hscroll flex gap-2 py-[3px] mx-[-16px] px-[16px]",
        style: {
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        },
        onScroll: checkScroll,
        children: stickers.map((sticker) => /* @__PURE__ */ jsx("div", { className: "shrink-0", style: {
          width: "calc((100% - 24px) / 4)"
        }, children: /* @__PURE__ */ jsx(
          StickerTile,
          {
            sticker,
            onClick: () => onAddSticker(
              `https://cdn.jsdelivr.net/gh/fastlabai/design-editor/assets/stickers/${sticker.category}/${sticker.file}`
            )
          }
        ) }, sticker.id))
      }
    ),
    canScrollRight && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: scrollRight,
        className: "absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer border-none outline-none",
        style: {
          width: 22,
          height: 22,
          borderRadius: 6,
          background: "var(--color-surface, #fff)",
          boxShadow: "-8px 0 14px 8px var(--color-surface, #fff)"
        },
        children: /* @__PURE__ */ jsx(RightOutlined, { style: { fontSize: 10, color: "var(--color-text-muted)" } })
      }
    )
  ] });
}
function StickerTile({
  sticker,
  onClick,
  expanded = false
}) {
  const [hovered, setHovered] = useState(false);
  const imageUrl = `https://cdn.jsdelivr.net/gh/fastlabai/design-editor/assets/stickers/${sticker.category}/${sticker.file}`;
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/x-fastlabai-type", "sticker");
    e.dataTransfer.setData(
      "text/x-fastlabai-sticker-src",
      imageUrl
    );
  };
  return /* @__PURE__ */ jsx(Tooltip, { title: sticker.label, placement: "top", children: /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      draggable: true,
      onDragStart: handleDragStart,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      className: "\n          w-full\n          rounded-xl\n          flex\n          items-center\n          justify-center\n          cursor-pointer\n          border-none\n          outline-none\n          transition-all\n          duration-200\n          shrink-0\n        ",
      style: {
        width: "100%",
        aspectRatio: "1 / 1",
        background: "color-mix(in srgb, var(--color-text) 5%, transparent)",
        boxShadow: hovered ? "0 0 0 2px var(--color-border, #d1d5db)" : "none",
        transform: hovered ? "scale(1.03)" : "scale(1)"
      },
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: imageUrl,
          alt: sticker.label,
          draggable: false,
          className: "\n            w-[78%]\n            h-[78%]\n            object-contain\n            pointer-events-none\n            select-none\n            transition-opacity\n            duration-200\n          ",
          style: {
            opacity: hovered ? 0.85 : 1
          },
          onError: (e) => {
            e.currentTarget.style.display = "none";
          }
        }
      )
    }
  ) });
}
var PRESETS = [
  { label: "Add Heading", displaySize: 22, weight: 800, fontSize: 72 },
  { label: "Add Subheading", displaySize: 15, weight: 600, fontSize: 48 },
  { label: "Add Body Text", displaySize: 13, weight: 400, fontSize: 28 }
];
function TextPanel({ onAddText }) {
  return /* @__PURE__ */ jsxs("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 }, children: [
    /* @__PURE__ */ jsx("p", { style: { color: "var(--color-text-muted)", fontSize: 11, margin: "4px 0 8px", lineHeight: 1.4 }, children: "Click to add text, then double-click on canvas to edit." }),
    PRESETS.map(({ label, displaySize, weight, fontSize }) => /* @__PURE__ */ jsx(
      TextPresetBtn,
      {
        label,
        size: displaySize,
        weight,
        onClick: () => onAddText(label.replace("Add ", ""), fontSize)
      },
      label
    ))
  ] });
}
function TextPresetBtn({ label, size, weight, onClick }) {
  const [hov, setHov] = useState(false);
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: {
        width: "100%",
        padding: "12px 14px",
        cursor: "pointer",
        textAlign: "left",
        background: hov ? "color-mix(in srgb, var(--color-primary) 12%, var(--color-surface-2))" : "color-mix(in srgb, var(--color-text) 4%, var(--color-surface-2))",
        border: `1px solid ${hov ? "var(--color-primary)" : "var(--color-border)"}`,
        borderRadius: 10,
        color: "var(--color-text)",
        fontSize: size,
        fontWeight: weight,
        transition: "all 0.15s",
        outline: "none"
      },
      children: label
    }
  );
}

// src/hooks/useToast.ts
function useToast() {
  return toastApi;
}
function UploadPanel({ onUploadFile }) {
  const fileInputRef = useRef(null);
  const [hov, setHov] = useState(false);
  const { mediaProvider } = useEditorContext();
  const toast2 = useToast();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    if (!mediaProvider) return;
    setIsLoading(true);
    mediaProvider.list({}).then((res) => {
      setItems(res.items);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [mediaProvider]);
  const handleFileChange = async (e) => {
    const f = e.target.files?.[0];
    if (f) {
      if (f.size > 50 * 1024 * 1024) {
        toast2.error("File size must be less than 50MB");
        return;
      }
      if (!mediaProvider) {
        toast2.error("Media provider not configured");
        return;
      }
      try {
        setIsUploading(true);
        const newItem = await mediaProvider.upload(f);
        setItems((prev) => [newItem, ...prev]);
        toast2.success("Upload complete");
      } catch (err) {
        toast2.error(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
      e.target.value = "";
    }
  };
  return /* @__PURE__ */ jsxs("div", { style: { padding: 14, display: "flex", flexDirection: "column", height: "100%" }, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*,video/*",
        style: { display: "none" },
        onChange: handleFileChange
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => fileInputRef.current?.click(),
        onMouseEnter: () => setHov(true),
        onMouseLeave: () => setHov(false),
        disabled: isUploading,
        style: {
          width: "100%",
          padding: "24px 16px",
          cursor: isUploading ? "wait" : "pointer",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          background: hov ? "color-mix(in srgb, var(--color-primary) 12%, transparent)" : "color-mix(in srgb, var(--color-primary) 6%, transparent)",
          border: `2px dashed ${hov ? "var(--color-primary)" : "color-mix(in srgb, var(--color-primary) 30%, transparent)"}`,
          transition: "all 0.2s",
          outline: "none",
          flexShrink: 0
        },
        children: [
          isUploading ? /* @__PURE__ */ jsx(LoadingOutlined, { style: { fontSize: 32, color: "var(--color-primary)" } }) : /* @__PURE__ */ jsx(CloudUploadOutlined, { style: { fontSize: 32, color: "var(--color-primary)" } }),
          /* @__PURE__ */ jsxs("div", { style: { textAlign: "center" }, children: [
            /* @__PURE__ */ jsx("div", { style: { color: "var(--color-text)", fontSize: 13, fontWeight: 600 }, children: isUploading ? "Uploading..." : "Click to upload" }),
            /* @__PURE__ */ jsx("div", { style: { color: "var(--color-text-muted)", fontSize: 11, marginTop: 4 }, children: "PNG \xB7 JPG \xB7 SVG \xB7 MP4 \xB7 max 50 MB" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: { marginTop: 24, flex: 1, overflowY: "auto" }, className: "scrollbar-hide", children: [
      /* @__PURE__ */ jsx("h3", { style: { fontSize: 13, fontWeight: 600, color: "var(--color-text)", marginBottom: 12 }, children: "Your Uploads" }),
      isLoading && items.length === 0 ? /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: 20, color: "var(--color-text-muted)" }, children: /* @__PURE__ */ jsx(LoadingOutlined, {}) }) : items.length === 0 ? /* @__PURE__ */ jsx("div", { style: { textAlign: "center", padding: 20, color: "var(--color-text-muted)", fontSize: 12 }, children: "No uploads yet" }) : /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }, children: items.filter((m) => m.url).map((item) => /* @__PURE__ */ jsxs(
        "div",
        {
          draggable: true,
          onDragStart: (e) => {
            e.dataTransfer.effectAllowed = "copy";
            e.dataTransfer.setData("text/x-fastlabai-url", item.url);
            e.dataTransfer.setData("text/x-fastlabai-type", item.mimeType?.startsWith("video/") ? "video" : "image");
          },
          onClick: () => onUploadFile(item.url),
          style: {
            position: "relative",
            paddingTop: "100%",
            borderRadius: 8,
            overflow: "hidden",
            cursor: "grab",
            background: "color-mix(in srgb, var(--color-text) 5%, transparent)",
            border: "1px solid var(--color-border)"
          },
          className: "group",
          children: [
            item.mimeType?.startsWith("video/") ? /* @__PURE__ */ jsx("video", { src: item.url, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ jsx("img", { src: item.url, alt: item.name, draggable: false, style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-semibold", children: "Use" }) })
          ]
        },
        item.id
      )) })
    ] })
  ] });
}
var GOOGLE_FONTS = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Source Sans Pro",
  "Raleway",
  "PT Sans",
  "Merriweather",
  "Nunito",
  "Playfair Display",
  "Ubuntu",
  "Poppins",
  "Muli",
  "PT Serif",
  "Josefin Sans",
  "Fira Sans",
  "Noto Sans",
  "Dosis",
  "Quicksand",
  "Cabin",
  "Varela Round",
  "Lobster",
  "Pacifico",
  "Dancing Script",
  "Comfortaa",
  "Righteous",
  "Satisfy",
  "Abril Fatface",
  "Bebas Neue",
  "Anton",
  "Permanent Marker"
];
var loaded = /* @__PURE__ */ new Set();
function loadGoogleFont(family) {
  if (loaded.has(family)) return;
  loaded.add(family);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&display=swap`;
  document.head.appendChild(link);
}
function FontsPanel({ onApplyFont }) {
  const [search, setSearch] = useState("");
  const [customFonts, setCustomFonts] = useState([]);
  const fileRef = useRef(null);
  const filtered = GOOGLE_FONTS.filter((f) => f.toLowerCase().includes(search.toLowerCase()));
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const name = file.name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " ");
    const url = URL.createObjectURL(file);
    const font = new FontFace(name, `url(${url})`);
    font.load().then((f) => {
      document.fonts.add(f);
      setCustomFonts((prev) => [name, ...prev]);
      message.success(`Font "${name}" loaded`);
    }).catch(() => message.error("Failed to load font"));
    e.target.value = "";
  };
  const FontTile = ({ name, isCustom }) => {
    if (!isCustom) loadGoogleFont(name);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => onApplyFont(name),
        style: {
          padding: "10px 12px",
          cursor: "pointer",
          borderRadius: 8,
          border: "1px solid var(--color-border)",
          marginBottom: 6,
          background: "color-mix(in srgb, var(--color-text) 3%, var(--color-surface-2))",
          transition: "all 0.15s",
          display: "flex",
          flexDirection: "column",
          gap: 2
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.borderColor = "var(--color-primary)";
          e.currentTarget.style.background = "color-mix(in srgb, var(--color-primary) 8%, var(--color-surface-2))";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.background = "color-mix(in srgb, var(--color-text) 3%, var(--color-surface-2))";
        },
        children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "var(--color-text-muted)", fontWeight: 600 }, children: name }),
          /* @__PURE__ */ jsx("span", { style: { fontFamily: `'${name}', sans-serif`, fontSize: 18, color: "var(--color-text)", lineHeight: 1.2 }, children: "Aa Bb Cc" })
        ]
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { style: { padding: "10px 10px 0" }, children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        placeholder: "Search fonts\u2026",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        style: { marginBottom: 10, borderRadius: 8 }
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => fileRef.current?.click(),
        style: {
          width: "100%",
          padding: "8px",
          marginBottom: 10,
          background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
          border: "1px dashed color-mix(in srgb, var(--color-primary) 35%, transparent)",
          borderRadius: 8,
          color: "var(--color-primary)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          outline: "none"
        },
        children: [
          /* @__PURE__ */ jsx(UploadOutlined, {}),
          " Upload Custom Font (.ttf / .otf / .woff)"
        ]
      }
    ),
    /* @__PURE__ */ jsx("input", { ref: fileRef, type: "file", accept: ".ttf,.otf,.woff,.woff2", style: { display: "none" }, onChange: handleUpload }),
    customFonts.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }, children: "Custom" }),
      customFonts.map((f) => /* @__PURE__ */ jsx(FontTile, { name: f, isCustom: true }, f)),
      /* @__PURE__ */ jsx("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", margin: "10px 0 6px" }, children: "Google Fonts" })
    ] }),
    filtered.map((f) => /* @__PURE__ */ jsx(FontTile, { name: f }, f))
  ] });
}
function useStudioExport() {
  const [exporting, setExporting] = useState(false);
  const toast2 = useToast();
  const { onExport } = useEditorContext();
  async function exportToLibrary(blob, filename, scene) {
    setExporting(true);
    try {
      if (onExport) {
        await onExport(blob, filename.endsWith(".png") ? "png" : "jpg", scene);
      }
      toast2.success("Saved to Media Library");
      return true;
    } catch {
      toast2.error("Failed to save \u2014 please try again");
      return false;
    } finally {
      setExporting(false);
    }
  }
  return { exportToLibrary, exporting };
}

// src/hooks/useLayerPanel.ts
var TYPE_LABELS = {
  StaticImage: "Image",
  BackgroundImage: "Image",
  StaticText: "Text",
  DynamicText: "Text",
  StaticVideo: "Video",
  StaticPath: "Shape",
  StaticVector: "Shape",
  Group: "Group"
};
function toLayerItem(obj, idx) {
  const children = Array.isArray(obj.objects) ? obj.objects.map((c, ci) => toLayerItem(c, ci)) : void 0;
  return {
    id: String(obj.id ?? idx),
    type: String(obj.type ?? "Object"),
    name: obj.name ?? `${TYPE_LABELS[obj.type] ?? "Object"} ${idx + 1}`,
    visible: obj.visible !== false,
    children
  };
}
function useLayerPanel() {
  const objects = useObjects() ?? [];
  const activeObj = useActiveObject();
  const layers = [...objects].reverse().map(toLayerItem);
  const activeId = activeObj?.id ? String(activeObj.id) : null;
  return { layers, activeId };
}
var AUTOSAVE_KEY_PREFIX = "design_autosave";
var getAutosaveKey = (sceneKey) => sceneKey ? `${AUTOSAVE_KEY_PREFIX}_${sceneKey}` : AUTOSAVE_KEY_PREFIX;
function useAutoSave(editor, canvasBg, workspaceBg, sceneKey) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const timerRef = useRef();
  const key = getAutosaveKey(sceneKey);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);
  useEffect(() => {
    if (!editor) return;
    const canvas = editor.canvas?.canvas;
    if (!canvas) return;
    const schedule = () => {
      setHasUnsavedChanges(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        try {
          const payload = {
            scene: editor.scene.exportToJSON(),
            canvasBg,
            workspaceBg
          };
          localStorage.setItem(key, JSON.stringify(payload));
        } catch {
        }
      }, 1500);
    };
    canvas.on("object:modified", schedule);
    canvas.on("object:added", schedule);
    canvas.on("object:removed", schedule);
    return () => {
      canvas.off("object:modified", schedule);
      canvas.off("object:added", schedule);
      canvas.off("object:removed", schedule);
      clearTimeout(timerRef.current);
    };
  }, [editor, canvasBg, workspaceBg, key]);
  useEffect(() => {
    if (!editor) return;
    setHasUnsavedChanges(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        const payload = {
          scene: editor.scene.exportToJSON(),
          canvasBg,
          workspaceBg
        };
        localStorage.setItem(key, JSON.stringify(payload));
      } catch {
      }
    }, 1500);
  }, [canvasBg, workspaceBg, editor, key]);
  return { hasUnsavedChanges, setHasUnsavedChanges };
}
function loadAutosave(sceneKey) {
  try {
    const raw = localStorage.getItem(getAutosaveKey(sceneKey));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function clearAutosave(sceneKey) {
  localStorage.removeItem(getAutosaveKey(sceneKey));
}
var WORKSPACE_BG2 = "var(--color-bg)";
function getStorageSafe(key, DEFAULT_SETTINGS) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
    return DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}
function DesignEditorInner({ onBack, initialScene, className, libraryPanel, title }) {
  const editor = useEditor();
  const activeObj = useActiveObject();
  const zoomRatio = useZoomRatio();
  const { exportToLibrary, exporting } = useStudioExport();
  const message2 = useToast();
  const { backgroundRemovalProvider, sceneKey } = useEditorContext();
  const [activePanel, setActivePanel] = useState(null);
  const [layerPanelOpen, setLayerPanelOpen] = useState(false);
  const [removingBg, setRemovingBg] = useState(false);
  const [shimmerRect, setShimmerRect] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const { layers, activeId } = useLayerPanel();
  const [canvasBg, setCanvasBg] = useState(() => {
    return initialScene?.canvasBg || getStorageSafe("studio_canvasBg", "#ffffff");
  });
  const [workspaceBg, setWorkspaceBg] = useState(() => {
    return initialScene?.workspaceBg || getStorageSafe("studio_workspaceBg", "#1a1a2e");
  });
  const { setHasUnsavedChanges } = useAutoSave(editor, canvasBg, workspaceBg, sceneKey);
  const handleBack = useCallback(() => {
    clearAutosave(sceneKey);
    if (onBack) onBack();
  }, [onBack, sceneKey]);
  const [settings, setSettings] = useState(() => {
    return getStorageSafe("studio_settings", { showGrid: false, snapGrid: false, railSide: "left" });
  });
  const handleSettings = useCallback((patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem("studio_settings", JSON.stringify(next));
      return next;
    });
  }, []);
  const restoreShapes = useCallback(() => {
    if (!editor) return;
    const objs = editor.scene.exportToJSON()?.layers || [];
    objs.forEach((o) => {
      if (o.type === "polygon" && o.metadata?.shapeType) {
        const polyObj = editor.canvas?.canvas?.getObjects?.().find((obj) => obj.id === o.id);
        if (polyObj) {
          polyObj.set({ shapeType: o.metadata.shapeType });
        }
      }
    });
  }, [editor]);
  useEffect(() => {
    if (!editor) return;
    const saved = loadAutosave(sceneKey);
    if (saved && Object.keys(saved).length > 0) {
      if (saved.scene) editor.scene.importFromJSON(saved.scene).catch(() => {
      }).then(restoreShapes);
      if (saved.canvasBg) setCanvasBg(saved.canvasBg);
      if (saved.workspaceBg) setWorkspaceBg(saved.workspaceBg);
    } else if (initialScene) {
      const scene = initialScene.scene || initialScene;
      editor.scene.importFromJSON(scene).catch(() => {
      }).then(restoreShapes);
      if (initialScene.canvasBg) setCanvasBg(initialScene.canvasBg);
      if (initialScene.workspaceBg) setWorkspaceBg(initialScene.workspaceBg);
    }
    const handleChange = () => setHasUnsavedChanges(true);
    editor.on("history:changed", handleChange);
    return () => editor.off("history:changed", handleChange);
  }, [editor, initialScene, restoreShapes, setHasUnsavedChanges, sceneKey]);
  const zoomPct = Math.round(zoomRatio * 100);
  const {
    size,
    customOpen,
    setCustomOpen,
    customW,
    setCustomW,
    customH,
    setCustomH,
    handleSizeChange,
    handleApplyCustom
  } = useCanvasSize(editor);
  const handleAddMedia = useCallback(async (url, position) => {
    if (!editor) return;
    try {
      const type = url.match(/\.(mp4|webm)$/i) ? "StaticVideo" : "StaticImage";
      const options = {
        type,
        src: url,
        top: position?.top ?? 100,
        left: position?.left ?? 100,
        metadata: { source: "fastlabai" }
      };
      await editor?.objects.add(options);
    } catch (err) {
      console.error("[handleAddMedia] Error:", err);
      message2.error("Failed to add media");
    }
  }, [editor, message2]);
  const addImageToCanvas = useCallback((url, top = 100, left = 100) => {
    if (!editor) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = async () => {
      let scale = 1;
      const frame = editor?.frame?.frame;
      const maxW = (frame?.width || 1080) * 0.8;
      const maxH = (frame?.height || 1080) * 0.8;
      if (img.width > maxW || img.height > maxH) {
        const scaleW = maxW / img.width;
        const scaleH = maxH / img.height;
        scale = Math.min(scaleW, scaleH);
      }
      await editor?.objects.add({
        type: "StaticImage",
        src: url,
        top,
        left,
        scaleX: scale,
        scaleY: scale
      });
    };
    img.onerror = () => message2.error("Failed to load image.");
  }, [editor, message2]);
  const handleAddText = useCallback(async (text, fontSize) => {
    if (!editor) return;
    try {
      await editor?.objects.add({ type: "StaticText", text, fontSize, fill: "#1a1a1a", top: 100, left: 100 });
    } catch {
      message2.error("Failed to add text");
    }
  }, [editor, message2]);
  const handleRemoveBg = useCallback(async () => {
    if (!editor || !activeObj || activeObj.type !== "StaticImage" || !activeObj.src) return;
    setShimmerRect({
      top: activeObj.top ?? 0,
      left: activeObj.left ?? 0,
      width: (activeObj.width ?? 100) * (activeObj.scaleX ?? 1),
      height: (activeObj.height ?? 100) * (activeObj.scaleY ?? 1)
    });
    setRemovingBg(true);
    message2.info("Removing background...");
    try {
      const blob = await backgroundRemovalProvider.remove(activeObj.src);
      const newUrl = URL.createObjectURL(blob);
      editor?.objects.update({ src: newUrl });
      message2.success("Background removed successfully!");
    } catch (err) {
      console.error("[handleRemoveBg] Error:", err);
      message2.error(`Failed: ${err.message || "Unknown error"}`);
    } finally {
      setRemovingBg(false);
      setShimmerRect(null);
    }
  }, [editor, activeObj, message2, backgroundRemovalProvider]);
  const handleExport = useCallback(async () => {
    if (!editor) return;
    try {
      const scene = editor.scene.exportToJSON();
      const dataUrl = await editor.renderer.toDataURL(scene, { format: "png", quality: 1, multiplier: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const success = await exportToLibrary(blob, `design-${Date.now()}.png`, scene);
      if (success) {
        setHasUnsavedChanges(false);
        clearAutosave(sceneKey);
      }
    } catch {
      message2.error("Failed to export");
    }
  }, [editor, exportToLibrary, message2, setHasUnsavedChanges]);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    if (!editor) return;
    const shapeSrc = e.dataTransfer.getData("text/x-fastlabai-shape-src");
    const stickerSrc = e.dataTransfer.getData("text/x-fastlabai-sticker-src");
    const mediaUrl = e.dataTransfer.getData("text/x-fastlabai-url");
    const rect = e.currentTarget.getBoundingClientRect();
    let left = e.clientX - rect.left;
    let top = e.clientY - rect.top;
    try {
      const zoom = editor.canvas.canvas.getZoom() || 1;
      const vpt = editor.canvas.canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
      left = (left - vpt[4]) / zoom;
      top = (top - vpt[5]) / zoom;
    } catch {
    }
    if (shapeSrc || stickerSrc) {
      addImageToCanvas(shapeSrc || stickerSrc, top, left);
    } else if (mediaUrl) {
      handleAddMedia(mediaUrl, { top, left });
    }
  }, [editor, addImageToCanvas, handleAddMedia]);
  return /* @__PURE__ */ jsx("div", { "data-de-root": true, className, style: { width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "var(--de-color-bg)", color: "var(--de-color-fg)" }, children: /* @__PURE__ */ jsxs("div", { style: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    background: WORKSPACE_BG2
  }, children: [
    /* @__PURE__ */ jsx(
      Toolbar,
      {
        editor,
        zoomPct,
        size,
        customOpen,
        setCustomOpen,
        customW,
        setCustomW,
        customH,
        setCustomH,
        handleSizeChange,
        handleApplyCustom,
        layerPanelOpen,
        onToggleLayers: () => setLayerPanelOpen((p) => !p),
        exporting,
        onExport: handleExport,
        settings,
        onSettings: handleSettings,
        onBack: onBack ? handleBack : void 0,
        canvasBg,
        onBgChange: setCanvasBg,
        workspaceBg,
        onWorkspaceBgChange: setWorkspaceBg,
        title
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: { flex: 1, display: "flex", overflow: "hidden" }, children: [
      /* @__PURE__ */ jsx(
        IconRail,
        {
          activePanel,
          onTogglePanel: setActivePanel
        }
      ),
      activePanel && /* @__PURE__ */ jsxs("div", { style: { width: 320, background: "var(--color-surface, var(--de-color-bg-elevated))", borderRight: "1px solid var(--color-border, var(--de-color-border))", display: "flex", flexDirection: "column", zIndex: 10 }, children: [
        activePanel === "library" && (libraryPanel ? typeof libraryPanel === "function" ? libraryPanel({ onAddMedia: handleAddMedia }) : libraryPanel : /* @__PURE__ */ jsx(LibraryPanel, {})),
        activePanel === "text" && /* @__PURE__ */ jsx(TextPanel, { onAddText: handleAddText }),
        activePanel === "shapes" && /* @__PURE__ */ jsx(ShapesPanel, { onAddShape: (src) => addImageToCanvas(src) }),
        activePanel === "stickers" && /* @__PURE__ */ jsx(StickersPanel, { onAddSticker: (url) => addImageToCanvas(url) }),
        activePanel === "upload" && /* @__PURE__ */ jsx(UploadPanel, { onUploadFile: (url) => handleAddMedia(url) }),
        activePanel === "fonts" && /* @__PURE__ */ jsx(FontsPanel, { onApplyFont: (family) => editor?.objects.update({ fontFamily: family }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { flex: 1, position: "relative", overflow: "hidden" }, children: [
        /* @__PURE__ */ jsx(
          CanvasArea,
          {
            canvasBg,
            workspaceBg,
            dragOver,
            onDragOver: (e) => {
              e.preventDefault();
              setDragOver(true);
            },
            onDragLeave: () => setDragOver(false),
            onDrop: handleDrop
          }
        ),
        removingBg && shimmerRect && /* @__PURE__ */ jsx("div", { style: {
          position: "absolute",
          top: shimmerRect.top,
          left: shimmerRect.left,
          width: shimmerRect.width,
          height: shimmerRect.height,
          background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
          pointerEvents: "none",
          zIndex: 9999,
          borderRadius: 8
        } }),
        activeObj && /* @__PURE__ */ jsx(
          ObjectPropertiesBar,
          {
            activeObj,
            editor,
            removingBg,
            onRemoveBg: handleRemoveBg
          }
        )
      ] }),
      layerPanelOpen && /* @__PURE__ */ jsx(
        LayerPanel,
        {
          layers,
          activeId,
          editor,
          onClose: () => setLayerPanelOpen(false)
        }
      )
    ] })
  ] }) });
}
function DesignEditor({
  initialScene,
  sceneKey,
  onBack,
  onExport,
  mediaProvider = createNullMediaProvider(),
  fontProvider = createGoogleFontsProvider(),
  backgroundRemovalProvider,
  persistenceProvider = createLocalStoragePersistence(),
  className,
  libraryPanel,
  title
}) {
  const resolvedBackgroundRemovalProvider = backgroundRemovalProvider ?? createImglyBackgroundRemoval();
  const ctx = React__default.useMemo(
    () => ({ mediaProvider, fontProvider, backgroundRemovalProvider: resolvedBackgroundRemovalProvider, persistenceProvider, sceneKey, onExport, onBack }),
    [mediaProvider, fontProvider, resolvedBackgroundRemovalProvider, persistenceProvider, sceneKey, onExport, onBack]
  );
  return /* @__PURE__ */ jsx(Provider, { children: /* @__PURE__ */ jsxs(EditorContextProvider, { value: ctx, children: [
    /* @__PURE__ */ jsx(DesignEditorInner, { onBack, initialScene, className, libraryPanel, title }),
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-right" })
  ] }) });
}

// src/index.ts
var VERSION = "1.0.0-beta.3";
/*! Bundled license information:

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/

export { DesignEditor, VERSION, createGoogleFontsProvider, createImglyBackgroundRemoval, createLocalStoragePersistence, createNullMediaProvider };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map