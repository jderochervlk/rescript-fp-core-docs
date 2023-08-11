// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Js_exn from "rescript/lib/es6/js_exn.js";
import * as Js_dict from "rescript/lib/es6/js_dict.js";
import * as Belt_Int from "rescript/lib/es6/belt_Int.js";
import * as Belt_List from "rescript/lib/es6/belt_List.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Json_decode from "../vendor/Json_decode.mjs";
import * as Caml_js_exceptions from "rescript/lib/es6/caml_js_exceptions.js";

function toString(t) {
  switch (t) {
    case /* Reason */0 :
        return "Reason";
    case /* OCaml */1 :
        return "OCaml";
    case /* Res */2 :
        return "ReScript";
    
  }
}

function toExt(t) {
  switch (t) {
    case /* Reason */0 :
        return "re";
    case /* OCaml */1 :
        return "ml";
    case /* Res */2 :
        return "res";
    
  }
}

function decode(json) {
  var other = Json_decode.string(json);
  switch (other) {
    case "ml" :
        return /* OCaml */1;
    case "re" :
        return /* Reason */0;
    case "res" :
        return /* Res */2;
    default:
      throw {
            RE_EXN_ID: Json_decode.DecodeError,
            _1: "Unknown language \"" + other + "\"",
            Error: new Error()
          };
  }
}

var Lang = {
  toString: toString,
  toExt: toExt,
  decode: decode
};

function fromString(apiVersion) {
  var match = Belt_List.fromArray(apiVersion.split("."));
  if (!match) {
    return {
            _0: apiVersion,
            [Symbol.for("name")]: "UnknownVersion"
          };
  }
  var maj = match.hd;
  var match$1 = match.tl;
  if (match$1) {
    var maj$1 = Belt_Int.fromString(maj);
    Belt_Int.fromString(match$1.hd);
    if (maj$1 !== undefined && maj$1 >= 1) {
      return /* V1 */0;
    } else {
      return {
              _0: apiVersion,
              [Symbol.for("name")]: "UnknownVersion"
            };
    }
  }
  switch (maj) {
    case "2" :
        return /* V2 */1;
    case "3" :
        return /* V3 */2;
    default:
      return {
              _0: apiVersion,
              [Symbol.for("name")]: "UnknownVersion"
            };
  }
}

function toString$1(t) {
  if (typeof t !== "number") {
    return t._0;
  }
  switch (t) {
    case /* V1 */0 :
        return "1.0";
    case /* V2 */1 :
        return "2.0";
    case /* V3 */2 :
        return "3.0";
    
  }
}

function availableLanguages(t) {
  if (t === 0) {
    return [
            /* Reason */0,
            /* Res */2
          ];
  } else {
    return [/* Res */2];
  }
}

var Version = {
  fromString: fromString,
  toString: toString$1,
  defaultTargetLang: /* Res */2,
  availableLanguages: availableLanguages
};

function decode$1(json) {
  return {
          fullMsg: Json_decode.field("fullMsg", Json_decode.string, json),
          shortMsg: Json_decode.field("shortMsg", Json_decode.string, json),
          row: Json_decode.field("row", Json_decode.$$int, json),
          column: Json_decode.field("column", Json_decode.$$int, json),
          endRow: Json_decode.field("endRow", Json_decode.$$int, json),
          endColumn: Json_decode.field("endColumn", Json_decode.$$int, json)
        };
}

function toCompactErrorLine(prefix, locMsg) {
  var prefix$1 = prefix === "W" ? "W" : "E";
  return "[1;31m[" + prefix$1 + "] Line " + locMsg.row + ", " + locMsg.column + ":[0m " + locMsg.shortMsg;
}

function makeId(t) {
  return String(t.row) + ("-" + (String(t.endRow) + ("-" + (String(t.column) + ("-" + String(t.endColumn))))));
}

function dedupe(arr) {
  var result = {};
  for(var i = 0 ,i_finish = arr.length; i < i_finish; ++i){
    var locMsg = arr[i];
    var id = makeId(locMsg);
    result[id] = locMsg;
  }
  return Js_dict.values(result);
}

var LocMsg = {
  decode: decode$1,
  toCompactErrorLine: toCompactErrorLine,
  makeId: makeId,
  dedupe: dedupe
};

function decode$2(json) {
  var warnNumber = Json_decode.field("warnNumber", Json_decode.$$int, json);
  var details = decode$1(json);
  if (Json_decode.field("isError", Json_decode.bool, json)) {
    return {
            TAG: 1,
            warnNumber: warnNumber,
            details: details,
            [Symbol.for("name")]: "WarnErr"
          };
  } else {
    return {
            TAG: 0,
            warnNumber: warnNumber,
            details: details,
            [Symbol.for("name")]: "Warn"
          };
  }
}

function toCompactErrorLine$1(t) {
  var prefix;
  prefix = t.TAG === /* Warn */0 ? "W" : "E";
  var details = t.details;
  var msg = "(Warning number " + t.warnNumber + ") " + details.shortMsg;
  return "[1;31m[" + prefix + "] Line " + details.row + ", " + details.column + ":[0m " + msg;
}

var Warning = {
  decode: decode$2,
  toCompactErrorLine: toCompactErrorLine$1
};

function decode$3(json) {
  return {
          msg: Json_decode.field("msg", Json_decode.string, json),
          warn_flags: Json_decode.field("warn_flags", Json_decode.string, json),
          warn_error_flags: Json_decode.field("warn_error_flags", Json_decode.string, json)
        };
}

var WarningFlag = {
  decode: decode$3
};

function decodePosition(json) {
  return {
          line: Json_decode.field("line", Json_decode.$$int, json),
          col: Json_decode.field("col", Json_decode.$$int, json)
        };
}

function decode$4(json) {
  var data_start = Json_decode.field("start", decodePosition, json);
  var data_end = Json_decode.field("end", decodePosition, json);
  var data_hint = Json_decode.field("hint", Json_decode.string, json);
  var data = {
    start: data_start,
    end: data_end,
    hint: data_hint
  };
  var other = Json_decode.field("kind", Json_decode.string, json);
  switch (other) {
    case "binding" :
        return {
                TAG: 2,
                _0: data,
                [Symbol.for("name")]: "Binding"
              };
    case "core_type" :
        return {
                TAG: 3,
                _0: data,
                [Symbol.for("name")]: "CoreType"
              };
    case "expression" :
        return {
                TAG: 1,
                _0: data,
                [Symbol.for("name")]: "Expression"
              };
    case "type_declaration" :
        return {
                TAG: 0,
                _0: data,
                [Symbol.for("name")]: "TypeDeclaration"
              };
    default:
      throw {
            RE_EXN_ID: Json_decode.DecodeError,
            _1: "Unknown kind \"" + other + "\" type hint",
            Error: new Error()
          };
  }
}

function decode$5(time, json) {
  return {
          js_code: Json_decode.field("js_code", Json_decode.string, json),
          warnings: Json_decode.field("warnings", (function (param) {
                  return Json_decode.array(decode$2, param);
                }), json),
          type_hints: Json_decode.withDefault([], (function (param) {
                  return Json_decode.field("type_hints", (function (param) {
                                return Json_decode.array(decode$4, param);
                              }), param);
                }), json),
          time: time
        };
}

var CompileSuccess = {
  decode: decode$5
};

function decode$6(json) {
  return {
          code: Json_decode.field("code", Json_decode.string, json),
          fromLang: Json_decode.field("fromLang", decode, json),
          toLang: Json_decode.field("toLang", decode, json)
        };
}

var ConvertSuccess = {
  decode: decode$6
};

function decode$7(json) {
  var other = Json_decode.field("type", Json_decode.string, json);
  switch (other) {
    case "other_error" :
        var locMsgs = Json_decode.field("errors", (function (param) {
                return Json_decode.array(decode$1, param);
              }), json);
        return {
                TAG: 4,
                _0: locMsgs,
                [Symbol.for("name")]: "OtherErr"
              };
    case "syntax_error" :
        var locMsgs$1 = Json_decode.field("errors", (function (param) {
                return Json_decode.array(decode$1, param);
              }), json);
        return {
                TAG: 0,
                _0: dedupe(locMsgs$1),
                [Symbol.for("name")]: "SyntaxErr"
              };
    case "type_error" :
        var locMsgs$2 = Json_decode.field("errors", (function (param) {
                return Json_decode.array(decode$1, param);
              }), json);
        return {
                TAG: 1,
                _0: locMsgs$2,
                [Symbol.for("name")]: "TypecheckErr"
              };
    case "warning_error" :
        var warnings = Json_decode.field("errors", (function (param) {
                return Json_decode.array(decode$2, param);
              }), json);
        return {
                TAG: 2,
                _0: warnings,
                [Symbol.for("name")]: "WarningErr"
              };
    case "warning_flag_error" :
        var warningFlag = decode$3(json);
        return {
                TAG: 3,
                _0: warningFlag,
                [Symbol.for("name")]: "WarningFlagErr"
              };
    default:
      throw {
            RE_EXN_ID: Json_decode.DecodeError,
            _1: "Unknown type \"" + other + "\" in CompileFail result",
            Error: new Error()
          };
  }
}

var CompileFail = {
  decode: decode$7
};

function decode$8(time, json) {
  try {
    var match = Json_decode.field("type", Json_decode.string, json);
    switch (match) {
      case "success" :
          return {
                  TAG: 1,
                  _0: decode$5(time, json),
                  [Symbol.for("name")]: "Success"
                };
      case "unexpected_error" :
          return {
                  TAG: 2,
                  _0: Json_decode.field("msg", Json_decode.string, json),
                  [Symbol.for("name")]: "UnexpectedError"
                };
      default:
        return {
                TAG: 0,
                _0: decode$7(json),
                [Symbol.for("name")]: "Fail"
              };
    }
  }
  catch (raw_errMsg){
    var errMsg = Caml_js_exceptions.internalToOCamlException(raw_errMsg);
    if (errMsg.RE_EXN_ID === Json_decode.DecodeError) {
      return {
              TAG: 3,
              _0: errMsg._1,
              _1: json,
              [Symbol.for("name")]: "Unknown"
            };
    }
    throw errMsg;
  }
}

var CompilationResult = {
  decode: decode$8
};

function decode$9(fromLang, toLang, json) {
  try {
    var other = Json_decode.field("type", Json_decode.string, json);
    switch (other) {
      case "success" :
          return {
                  TAG: 0,
                  _0: decode$6(json),
                  [Symbol.for("name")]: "Success"
                };
      case "syntax_error" :
          var locMsgs = Json_decode.field("errors", (function (param) {
                  return Json_decode.array(decode$1, param);
                }), json);
          return {
                  TAG: 1,
                  fromLang: fromLang,
                  toLang: toLang,
                  details: locMsgs,
                  [Symbol.for("name")]: "Fail"
                };
      case "unexpected_error" :
          return {
                  TAG: 2,
                  _0: Json_decode.field("msg", Json_decode.string, json),
                  [Symbol.for("name")]: "UnexpectedError"
                };
      default:
        return {
                TAG: 3,
                _0: "Unknown conversion result type \"" + other + "\"",
                _1: json,
                [Symbol.for("name")]: "Unknown"
              };
    }
  }
  catch (raw_errMsg){
    var errMsg = Caml_js_exceptions.internalToOCamlException(raw_errMsg);
    if (errMsg.RE_EXN_ID === Json_decode.DecodeError) {
      return {
              TAG: 3,
              _0: errMsg._1,
              _1: json,
              [Symbol.for("name")]: "Unknown"
            };
    }
    throw errMsg;
  }
}

var ConversionResult = {
  decode: decode$9
};

var Config = {};

function resCompile(t, code) {
  var startTime = performance.now();
  var json = t.rescript.compile(code);
  var stopTime = performance.now();
  return decode$8(stopTime - startTime, json);
}

function resFormat(t, code) {
  var json = t.rescript.format(code);
  return decode$9(/* Res */2, /* Res */2, json);
}

function reasonCompile(t, code) {
  var startTime = performance.now();
  var json = t.reason.compile(code);
  var stopTime = performance.now();
  return decode$8(stopTime - startTime, json);
}

function reasonFormat(t, code) {
  var json = t.reason.format(code);
  return decode$9(/* Reason */0, /* Reason */0, json);
}

function ocamlCompile(t, code) {
  var startTime = performance.now();
  var json = t.ocaml.compile(code);
  var stopTime = performance.now();
  return decode$8(stopTime - startTime, json);
}

function setConfig(t, config) {
  var match = config.module_system;
  var moduleSystem;
  switch (match) {
    case "es6" :
        moduleSystem = "es6";
        break;
    case "nodejs" :
        moduleSystem = "nodejs";
        break;
    default:
      moduleSystem = undefined;
  }
  Belt_Option.forEach(moduleSystem, (function (moduleSystem) {
          t.setModuleSystem(moduleSystem);
        }));
  t.setWarnFlags(config.warn_flags);
}

function convertSyntax(fromLang, toLang, code, t) {
  try {
    return decode$9(fromLang, toLang, t.convertSyntax(toExt(fromLang), toExt(toLang), code));
  }
  catch (raw_obj){
    var obj = Caml_js_exceptions.internalToOCamlException(raw_obj);
    if (obj.RE_EXN_ID === Js_exn.$$Error) {
      var m = obj._1.message;
      if (m !== undefined) {
        return {
                TAG: 2,
                _0: m,
                [Symbol.for("name")]: "UnexpectedError"
              };
      } else {
        return {
                TAG: 2,
                _0: "",
                [Symbol.for("name")]: "UnexpectedError"
              };
      }
    }
    throw obj;
  }
}

var TypeHint = {
  decode: decode$4
};

function Compiler_version(prim) {
  return prim.version;
}

function Compiler_resVersion(prim) {
  return prim.rescript.version;
}

function Compiler_ocamlVersion(prim) {
  return prim.ocaml.version;
}

function Compiler_getConfig(prim) {
  return prim.getConfig();
}

function Compiler_setFilename(prim0, prim1) {
  return prim0.setFilename(prim1);
}

function Compiler_setModuleSystem(prim0, prim1) {
  return prim0.setModuleSystem(prim1);
}

function Compiler_setWarnFlags(prim0, prim1) {
  return prim0.setWarnFlags(prim1);
}

var Compiler = {
  version: Compiler_version,
  resVersion: Compiler_resVersion,
  resCompile: resCompile,
  resFormat: resFormat,
  reasonCompile: reasonCompile,
  reasonFormat: reasonFormat,
  ocamlVersion: Compiler_ocamlVersion,
  ocamlCompile: ocamlCompile,
  getConfig: Compiler_getConfig,
  setFilename: Compiler_setFilename,
  setModuleSystem: Compiler_setModuleSystem,
  setWarnFlags: Compiler_setWarnFlags,
  setConfig: setConfig,
  convertSyntax: convertSyntax
};

export {
  Lang ,
  Version ,
  LocMsg ,
  Warning ,
  WarningFlag ,
  TypeHint ,
  CompileSuccess ,
  ConvertSuccess ,
  CompileFail ,
  CompilationResult ,
  ConversionResult ,
  Config ,
  Compiler ,
}
/* No side effect */
