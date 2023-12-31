// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Js_exn from "rescript/lib/es6/js_exn.js";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Caml_js_exceptions from "rescript/lib/es6/caml_js_exceptions.js";
import * as Core from "highlight.js/lib/core";

function renderHLJS(highlightedLinesOpt, darkmodeOpt, code, lang, param) {
  var highlightedLines = highlightedLinesOpt !== undefined ? highlightedLinesOpt : [];
  var darkmode = darkmodeOpt !== undefined ? darkmodeOpt : false;
  var options = {
    language: lang
  };
  var match;
  try {
    match = [
      lang,
      Core.highlight(code, options).value
    ];
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Js_exn.$$Error) {
      match = [
        "text",
        code
      ];
    } else {
      throw exn;
    }
  }
  var highlighted = match[1];
  var highlighted$1 = highlightedLines.length !== 0 ? Belt_Array.mapWithIndex(highlighted.split("\n"), (function (i, line) {
              if (Caml_option.undefined_to_opt(highlightedLines.find(function (lnum) {
                          return lnum === (i + 1 | 0);
                        })) === undefined) {
                return "<span class=\"inline-block text-inherit opacity-50\">" + (line + "</span>");
              }
              var content = line === "" ? "&nbsp;" : line;
              return "<span class=\"inline-block\">" + (content + "</span>");
            })).join("\n") : highlighted;
  var dark = darkmode ? "dark" : "";
  return React.createElement("code", {
              className: "hljs lang-" + (match[0] + (" " + dark)),
              dangerouslySetInnerHTML: {
                __html: highlighted$1
              }
            });
}

export {
  renderHLJS ,
}
/* react Not a pure module */
