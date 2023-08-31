// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Url from "../common/Url.mjs";
import * as Icon from "./Icon.mjs";
import * as Next from "../bindings/Next.mjs";
import * as Curry from "rescript/lib/es6/curry.js";
import * as Hooks from "../common/Hooks.mjs";
import * as React from "react";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as ReactDOMStyle from "@rescript/react/src/ReactDOMStyle.mjs";

var link = "no-underline block hover:cursor-pointer hover:text-fire-30 text-gray-40 mb-px";

var activeLink = "font-medium text-fire-30 border-b border-fire";

function linkOrActiveApiSubroute(route) {
  var url = Url.parse(route);
  var match = Belt_Array.get(url.pagepath, 0);
  if (match === "api") {
    return activeLink;
  } else {
    return link;
  }
}

var githubHref = "https://github.com/jderochervlk/rescript-fp-core";

function Navigation$CollapsibleLink(Props) {
  var title = Props.title;
  var onStateChange = Props.onStateChange;
  var allowHoverOpt = Props.allowHover;
  var id = Props.id;
  var state = Props.state;
  var activeOpt = Props.active;
  var children = Props.children;
  var allowHover = allowHoverOpt !== undefined ? allowHoverOpt : true;
  var active = activeOpt !== undefined ? activeOpt : false;
  var onClick = function (_evt) {
    Curry._2(onStateChange, id, state >= 2 ? /* KeepOpen */0 : /* Closed */2);
  };
  var onMouseEnter = function (evt) {
    evt.preventDefault();
    if (allowHover) {
      return Curry._2(onStateChange, id, /* HoverOpen */1);
    }
    
  };
  var isOpen = state < 2;
  return React.createElement(React.Fragment, undefined, React.createElement("div", {
                  className: "relative",
                  onMouseEnter: onMouseEnter
                }, React.createElement("div", {
                      className: "flex items-center"
                    }, React.createElement("button", {
                          className: (
                            active ? activeLink : link
                          ) + (" border-none flex items-center hover:cursor-pointer " + (
                              isOpen ? " text-fire-30" : ""
                            )),
                          tabIndex: 0,
                          onClick: onClick
                        }, React.createElement("span", {
                              className: active ? "border-b border-fire" : ""
                            }, title))), React.createElement("div", {
                      className: (
                        isOpen ? "flex" : "hidden"
                      ) + " fixed left-0 overflow-y-scroll overflow-x-hidden border-gray-80 border-gray-40 min-w-320 w-full h-full bg-white sm:overflow-y-auto sm:bg-transparent sm:h-auto sm:justify-center sm:rounded-bl-xl sm:rounded-br-xl sm:shadow",
                      style: {
                        marginTop: "1rem"
                      }
                    }, React.createElement("div", {
                          className: "w-full"
                        }, children))));
}

function Navigation$MobileNav(Props) {
  return React.createElement("div", {
              className: "border-gray-80 border-t"
            }, React.createElement("ul", undefined, React.createElement("li", {
                      className: "font-normal mx-4 py-5 text-gray-20 border-b border-gray-80"
                    }, React.createElement("a", {
                          className: "block hover:cursor-pointer hover:text-white text-gray-60",
                          href: githubHref,
                          rel: "noopener noreferrer"
                        }, "GitHub"))));
}

function Navigation(Props) {
  var fixedOpt = Props.fixed;
  var overlayState = Props.overlayState;
  var fixed = fixedOpt !== undefined ? fixedOpt : true;
  var minWidth = "20rem";
  var router = Next.Router.useRouter(undefined);
  var route = router.route;
  var match = React.useState(function () {
        return [];
      });
  var setCollapsibles = match[1];
  var collapsibles = match[0];
  var isSubnavOpen = Caml_option.undefined_to_opt(collapsibles.find(function (c) {
            return c.state !== /* Closed */2;
          })) !== undefined;
  var setOverlayOpen = overlayState[1];
  var isOverlayOpen = overlayState[0];
  var resetCollapsibles = function (param) {
    Curry._1(setCollapsibles, (function (prev) {
            return Belt_Array.map(prev, (function (c) {
                          return {
                                  title: c.title,
                                  children: c.children,
                                  isActiveRoute: c.isActiveRoute,
                                  href: c.href,
                                  state: /* Closed */2
                                };
                        }));
          }));
  };
  var navRef = React.useRef(null);
  Hooks.useOutsideClick(navRef, resetCollapsibles);
  React.useEffect((function () {
          var events = router.events;
          var onChangeComplete = function (_url) {
            resetCollapsibles(undefined);
            Curry._1(setOverlayOpen, (function (param) {
                    return false;
                  }));
          };
          Curry._2(Next.Router.Events.on, events, {
                NAME: "routeChangeComplete",
                VAL: onChangeComplete
              });
          Curry._2(Next.Router.Events.on, events, {
                NAME: "hashChangeComplete",
                VAL: onChangeComplete
              });
          return (function (param) {
                    Curry._2(Next.Router.Events.off, events, {
                          NAME: "routeChangeComplete",
                          VAL: onChangeComplete
                        });
                    Curry._2(Next.Router.Events.off, events, {
                          NAME: "hashChangeComplete",
                          VAL: onChangeComplete
                        });
                  });
        }), []);
  var fixedNav = fixed ? "fixed top-0" : "relative";
  var onStateChange = function (id, state) {
    Curry._1(setCollapsibles, (function (prev) {
            return Belt_Array.keepMap(prev, (function (next) {
                          if (next.title === id) {
                            return {
                                    title: next.title,
                                    children: next.children,
                                    isActiveRoute: next.isActiveRoute,
                                    href: next.href,
                                    state: state
                                  };
                          }
                          
                        }));
          }));
  };
  var collapsibleElements = collapsibles.map(function (coll) {
        return React.createElement(Navigation$CollapsibleLink, {
                    title: coll.title,
                    onStateChange: onStateChange,
                    allowHover: false,
                    id: coll.title,
                    state: coll.state,
                    active: Curry._1(coll.isActiveRoute, route),
                    children: coll.children,
                    key: coll.title
                  });
      });
  return React.createElement(React.Fragment, undefined, React.createElement("nav", {
                  ref: navRef,
                  className: fixedNav + " z-50 px-4 flex xs:justify-center w-full h-16 bg-gray-90 shadow text-white-80 text-14",
                  id: "header",
                  style: {
                    minWidth: minWidth
                  }
                }, React.createElement("div", {
                      className: "flex justify-between items-center h-full w-full max-w-1280"
                    }, React.createElement("div", {
                          className: "h-8 whitespace-nowrap"
                        }, React.createElement("a", {
                              className: "block hover:cursor-pointer h-full flex items-center font-bold hover:text-fire-30 text-gray-40 w-40 lg:w-50",
                              href: "/"
                            }, React.createElement("img", {
                                  className: "lg:block h-[80%] mr-5",
                                  src: "/static/nav-logo@2x.png"
                                }), "rescript-fp-core")), React.createElement("div", {
                          className: "flex items-center xs:justify-between w-full bg-gray-90 sm:h-auto sm:relative"
                        }, React.createElement("div", {
                              className: "flex ml-10 space-x-5 w-full max-w-320",
                              style: {
                                maxWidth: "26rem"
                              }
                            }, collapsibleElements, React.createElement(Next.Link.make, {
                                  href: "/docs/installation",
                                  children: React.createElement("a", {
                                        className: linkOrActiveApiSubroute(route)
                                      }, "Docs")
                                })), React.createElement("div", {
                              className: "hidden md:flex items-center"
                            }, React.createElement("a", {
                                  className: "mr-5 " + link,
                                  href: githubHref,
                                  rel: "noopener noreferrer"
                                }, React.createElement(Icon.GitHub.make, {
                                      className: "w-6 h-6 opacity-50 hover:opacity-100"
                                    }))))), React.createElement("button", {
                      className: "h-full px-4 xs:hidden flex items-center hover:text-white",
                      onClick: (function (evt) {
                          evt.preventDefault();
                          resetCollapsibles(undefined);
                          Curry._1(setOverlayOpen, (function (prev) {
                                  return !prev;
                                }));
                        })
                    }, React.createElement(Icon.DrawerDots.make, {
                          className: "h-1 w-auto block " + (
                            isOverlayOpen ? "text-fire" : "text-gray-60"
                          )
                        })), React.createElement("div", {
                      className: (
                        isOverlayOpen && !isSubnavOpen ? "flex" : "hidden"
                      ) + " sm:hidden flex-col fixed top-0 left-0 h-full w-full z-50 sm:w-9/12 bg-gray-100 sm:h-auto sm:flex sm:relative sm:flex-row sm:justify-between",
                      style: {
                        minWidth: minWidth,
                        top: "4rem"
                      }
                    }, React.createElement(Navigation$MobileNav, {
                          _route: route
                        }))), React.createElement("div", {
                  className: (
                    isSubnavOpen ? "fixed" : "hidden"
                  ) + " z-40 bg-gray-10-tr w-full h-full bottom-0",
                  style: ReactDOMStyle.unsafeAddProp(ReactDOMStyle.unsafeAddProp({}, "backdropFilter", "blur(2px)"), "WebkitBackdropFilter", "blur(2px)")
                }));
}

var make = Navigation;

export {
  make ,
}
/* Icon Not a pure module */
