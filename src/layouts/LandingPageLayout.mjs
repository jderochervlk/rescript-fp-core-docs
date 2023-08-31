// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Mdx from "../common/Mdx.mjs";
import * as Meta from "../components/Meta.mjs";
import * as Next from "../bindings/Next.mjs";
import * as React from "react";
import * as Button from "../components/Button.mjs";
import * as Markdown from "../components/Markdown.mjs";
import * as Navigation from "../components/Navigation.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

var text = [
  "An alternative to the ReScript Core library heavily inspired by fp-ts.",
  "ReScript Core has a focus of providing bindings for JavaScript API's without having an opinion on those APIs.\n  This library has a different philosophy of providing functions that are focused on functional patterns, \n  and only offering a subset of Javascript APIs.",
  "This library encorages immutable data and safe access that are often wrapped in Options."
];

function LandingPageLayout$Intro(Props) {
  return React.createElement(React.Fragment, {
              children: React.createElement("section", {
                    className: "flex justify-center"
                  }, React.createElement("div", {
                        className: "max-w-1060 flex flex-col items-center px-5 sm:px-8 lg:box-content"
                      }, React.createElement("h1", {
                            className: "hl-title text-center max-w-[53rem]"
                          }, "rescript-fp-core"), React.createElement("h2", {
                            className: "body-lg text-center text-gray-60 my-4 max-w-[40rem]"
                          }, "A functional standard library for ReScript."), React.createElement("div", {
                            className: "body-lg text-center text-gray-60 max-w-[40rem]"
                          }, text.map(function (t) {
                                return React.createElement("p", {
                                            key: t,
                                            className: "my-4"
                                          }, t);
                              })), React.createElement("div", {
                            className: "mt-4 mb-2"
                          }, React.createElement(Next.Link.make, {
                                href: "/docs/installation",
                                passHref: true,
                                children: React.createElement(Button.make, {
                                      children: "Get started"
                                    })
                              }))))
            });
}

function LandingPageLayout(Props) {
  var componentsOpt = Props.components;
  var children = Props.children;
  var components = componentsOpt !== undefined ? Caml_option.valFromOption(componentsOpt) : Markdown.$$default;
  var overlayState = React.useState(function () {
        return false;
      });
  return React.createElement(React.Fragment, undefined, React.createElement(Meta.make, {
                  keywords: [
                    "ReScript",
                    "rescriptlang",
                    "JavaScript",
                    "JS",
                    "TypeScript",
                    "funtional programming",
                    "fp",
                    "core"
                  ],
                  description: "Rescript FP Core",
                  title: "Rescript FP Core",
                  ogImage: "/static/Art-3-rescript-launch.jpg"
                }), React.createElement("div", {
                  className: "mt-4 xs:mt-16"
                }, React.createElement("div", {
                      className: "text-gray-80 text-18"
                    }, React.createElement(Navigation.make, {
                          overlayState: overlayState
                        }), React.createElement("div", {
                          className: "absolute top-16 w-full"
                        }, React.createElement("div", {
                              className: "relative overflow-hidden pb-32"
                            }, React.createElement("main", {
                                  className: "mt-10 min-w-320 lg:align-center w-full"
                                }, React.createElement(Mdx.Provider.make, {
                                      components: components,
                                      children: React.createElement("div", {
                                            className: ""
                                          }, React.createElement("div", {
                                                className: "w-full"
                                              }, React.createElement("div", {
                                                    className: "mt-16 md:mt-32 lg:mt-40 mb-12"
                                                  }, React.createElement(LandingPageLayout$Intro, {})), children))
                                    })))))));
}

var make = LandingPageLayout;

export {
  make ,
}
/* Mdx Not a pure module */
