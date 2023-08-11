// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Mdx from "./common/Mdx.mjs";
import * as Meta from "./components/Meta.mjs";
import * as Next from "./bindings/Next.mjs";
import * as Util from "./common/Util.mjs";
import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Button from "./components/Button.mjs";
import * as Footer from "./components/Footer.mjs";
import * as BlogApi from "./common/BlogApi.mjs";
import * as DateStr from "./common/DateStr.mjs";
import * as Markdown from "./components/Markdown.mjs";
import * as Belt_Array from "rescript/lib/es6/belt_Array.js";
import * as Navigation from "./components/Navigation.mjs";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as BlogFrontmatter from "./common/BlogFrontmatter.mjs";

var defaultPreviewImg = "/static/Art-3-rescript-launch.jpg";

var middleDotSpacer = " " + (String.fromCharCode(183) + " ");

function Blog$Badge(Props) {
  var badge = Props.badge;
  var bgColor = badge !== 1 ? "bg-turtle" : "bg-orange";
  var text = BlogFrontmatter.Badge.toString(badge);
  return React.createElement("div", {
              className: bgColor + " flex items-center h-6 font-medium tracking-tight text-gray-80-tr text-14 px-2 rounded-sm"
            }, React.createElement("div", undefined, React.createElement("img", {
                      className: "h-3 block mr-1",
                      src: "/static/star.svg"
                    })), React.createElement("div", undefined, text));
}

function Blog$CategorySelector(Props) {
  var selected = Props.selected;
  var onSelected = Props.onSelected;
  var tabs = [
    /* All */0,
    /* Archived */1
  ];
  return React.createElement("div", {
              className: "text-16 w-full flex items-center justify-between text-gray-60"
            }, Belt_Array.map(tabs, (function (tab) {
                    var onClick = function (evt) {
                      evt.preventDefault();
                      Curry._1(onSelected, tab);
                    };
                    var isActive = selected === tab;
                    var text = tab ? "Archived" : "All";
                    return React.createElement("div", {
                                key: text,
                                className: (
                                  isActive ? "bg-gray-20 text-gray-80 rounded py-1" : "hover:cursor-pointer bg-white hover:text-gray-80"
                                ) + "  px-4 inline-block",
                                onClick: onClick
                              }, text);
                  })));
}

function Blog$BlogCard(Props) {
  var previewImg = Props.previewImg;
  var titleOpt = Props.title;
  var category = Props.category;
  var badge = Props.badge;
  var date = Props.date;
  var slug = Props.slug;
  var title = titleOpt !== undefined ? titleOpt : "Unknown Title";
  var className = "absolute top-0 h-full w-full object-cover";
  return React.createElement("section", {
              className: "h-full"
            }, React.createElement("div", {
                  className: "relative"
                }, badge !== undefined ? React.createElement("div", {
                        className: "absolute z-10 bottom-0 mb-4 -ml-2"
                      }, React.createElement(Blog$Badge, {
                            badge: badge
                          })) : null, React.createElement(Next.Link.make, {
                      href: "/blog/[slug]",
                      as: "/blog/" + slug,
                      children: React.createElement("a", {
                            className: "relative hl-title block mb-4 pt-9/16"
                          }, previewImg !== undefined ? React.createElement("img", {
                                  className: className,
                                  src: previewImg
                                }) : React.createElement("img", {
                                  className: className,
                                  src: defaultPreviewImg
                                }))
                    })), React.createElement("div", {
                  className: "px-2"
                }, React.createElement(Next.Link.make, {
                      href: "/blog/[slug]",
                      as: "/blog/" + slug,
                      children: React.createElement("a", undefined, React.createElement("h2", {
                                className: "hl-4"
                              }, title))
                    }), React.createElement("div", {
                      className: "captions text-gray-40 pt-1"
                    }, category !== undefined ? React.createElement(React.Fragment, undefined, category, " · ") : null, Util.$$Date.toDayMonthYear(date))));
}

function Blog$FeatureCard(Props) {
  var previewImg = Props.previewImg;
  var titleOpt = Props.title;
  var author = Props.author;
  var badge = Props.badge;
  var date = Props.date;
  var category = Props.category;
  var firstParagraphOpt = Props.firstParagraph;
  var slug = Props.slug;
  var title = titleOpt !== undefined ? titleOpt : "Unknown Title";
  var firstParagraph = firstParagraphOpt !== undefined ? firstParagraphOpt : "";
  var authorImg = React.createElement("img", {
        className: "h-full w-full rounded-full",
        src: author.imgUrl
      });
  var className = "absolute top-0 h-full w-full object-cover";
  return React.createElement("section", {
              className: "flex sm:px-4 md:px-8 lg:px-0 flex-col justify-end lg:flex-row sm:items-center h-full"
            }, React.createElement("div", {
                  className: "w-full h-full sm:self-start md:self-auto",
                  style: {
                    maxHeight: "25.4375rem"
                  }
                }, React.createElement(Next.Link.make, {
                      href: "/blog/[slug]",
                      as: "/blog/" + slug,
                      children: React.createElement("a", {
                            className: "relative block pt-2/3"
                          }, badge !== undefined ? React.createElement("div", {
                                  className: "absolute z-10 top-0 mt-10 ml-4 lg:-ml-4"
                                }, React.createElement(Blog$Badge, {
                                      badge: badge
                                    })) : null, previewImg !== undefined ? React.createElement("img", {
                                  className: className,
                                  src: previewImg
                                }) : React.createElement("img", {
                                  className: className,
                                  src: defaultPreviewImg
                                }))
                    })), React.createElement("div", {
                  className: "relative px-4 lg:self-auto sm:pt-12 md:px-20 sm:self-start md:-mt-20 mt-4 bg-white lg:w-full lg:pt-0 lg:mt-0 lg:px-0 lg:ml-12"
                }, React.createElement("div", {
                      className: "max-w-400 "
                    }, React.createElement("h2", {
                          className: "hl-1"
                        }, title), React.createElement("div", {
                          className: "mb-6"
                        }, React.createElement("div", {
                              className: "flex items-center body-sm text-gray-40 mt-2 mb-5"
                            }, React.createElement("div", {
                                  className: "inline-block w-4 h-4 mr-2"
                                }, authorImg), React.createElement("div", undefined, React.createElement("a", {
                                      className: "hover:text-gray-60",
                                      href: "https://twitter.com/" + author.twitter,
                                      rel: "noopener noreferrer"
                                    }, author.fullname), category !== undefined ? React.createElement(React.Fragment, undefined, middleDotSpacer, category, middleDotSpacer) : middleDotSpacer, Util.$$Date.toDayMonthYear(date))), React.createElement("p", {
                              className: "body-md text-gray-70"
                            }, firstParagraph))), React.createElement(Next.Link.make, {
                      href: "/blog/[slug]",
                      as: "/blog/" + slug,
                      children: React.createElement("a", undefined, React.createElement(Button.make, {
                                children: "Read Article"
                              }))
                    })));
}

function $$default(props) {
  var posts = props.posts;
  var match = React.useState(function () {
        return /* All */0;
      });
  var setSelection = match[1];
  var currentSelection = match[0];
  var content;
  if (posts.length === 0) {
    content = React.createElement("div", {
          className: "mt-8"
        }, React.createElement(Markdown.H1.make, {
              children: "Blog not yet available"
            }), React.createElement(Markdown.Warn.make, {
              children: "This blog is currently in the works."
            }));
  } else {
    var filtered = currentSelection ? props.archived : posts;
    var match$1 = filtered.length;
    var result;
    if (match$1 !== 0) {
      var first = Belt_Array.getExn(filtered, 0);
      var rest = filtered.slice(1);
      var tmp = {
        title: first.frontmatter.title,
        author: first.frontmatter.author,
        date: DateStr.toDate(first.frontmatter.date),
        slug: BlogApi.blogPathToSlug(first.path)
      };
      var tmp$1 = Caml_option.null_to_opt(first.frontmatter.previewImg);
      if (tmp$1 !== undefined) {
        tmp.previewImg = tmp$1;
      }
      var tmp$2 = Caml_option.null_to_opt(first.frontmatter.badge);
      if (tmp$2 !== undefined) {
        tmp.badge = Caml_option.valFromOption(tmp$2);
      }
      var tmp$3 = Caml_option.null_to_opt(first.frontmatter.description);
      if (tmp$3 !== undefined) {
        tmp.firstParagraph = tmp$3;
      }
      var featureBox = React.createElement("div", {
            className: "w-full mb-24 lg:px-8 xl:px-0"
          }, React.createElement(Blog$FeatureCard, tmp));
      var postsBox = rest.length !== 0 ? React.createElement("div", {
              className: "px-4 md:px-8 xl:px-0 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-20 gap-y-12 md:gap-y-24 w-full"
            }, rest.map(function (post) {
                  var badge = post.frontmatter.badge;
                  var tmp = {
                    title: post.frontmatter.title,
                    author: post.frontmatter.author,
                    date: DateStr.toDate(post.frontmatter.date),
                    slug: BlogApi.blogPathToSlug(post.path),
                    key: post.path
                  };
                  var tmp$1 = Caml_option.null_to_opt(post.frontmatter.previewImg);
                  if (tmp$1 !== undefined) {
                    tmp.previewImg = tmp$1;
                  }
                  var tmp$2 = badge === null ? undefined : Caml_option.some(badge);
                  if (tmp$2 !== undefined) {
                    tmp.badge = Caml_option.valFromOption(tmp$2);
                  }
                  return React.createElement(Blog$BlogCard, tmp);
                })) : null;
      result = React.createElement(React.Fragment, undefined, featureBox, postsBox);
    } else {
      result = React.createElement("div", undefined, "No posts for this category available...");
    }
    content = React.createElement(React.Fragment, undefined, React.createElement("div", {
              className: "hidden sm:flex justify-center "
            }, React.createElement("div", {
                  className: "my-16 w-full",
                  style: {
                    maxWidth: "12rem"
                  }
                }, React.createElement(Blog$CategorySelector, {
                      selected: currentSelection,
                      onSelected: (function (selection) {
                          Curry._1(setSelection, (function (param) {
                                  return selection;
                                }));
                        })
                    }))), result);
  }
  var overlayState = React.useState(function () {
        return false;
      });
  return React.createElement(React.Fragment, undefined, React.createElement(Meta.make, {
                  siteName: "ReScript Blog",
                  description: "News, Announcements, Release Notes and more",
                  title: "Blog | ReScript Documentation"
                }), React.createElement("div", {
                  className: "mt-16 pt-2"
                }, React.createElement("div", {
                      className: "text-gray-80 text-18"
                    }, React.createElement(Navigation.make, {
                          overlayState: overlayState
                        }), React.createElement("div", {
                          className: "flex justify-center overflow-hidden"
                        }, React.createElement("main", {
                              className: "min-w-320 lg:align-center w-full lg:px-0 max-w-1280 pb-48"
                            }, React.createElement(Mdx.Provider.make, {
                                  components: Markdown.$$default,
                                  children: React.createElement("div", {
                                        className: "flex justify-center"
                                      }, React.createElement("div", {
                                            className: "w-full",
                                            style: {
                                              maxWidth: "66.625rem"
                                            }
                                          }, content))
                                }))), React.createElement(Footer.make, {}))));
}

async function getStaticProps(_ctx) {
  var match = Belt_Array.partition(BlogApi.getAllPosts(undefined), (function (data) {
          return data.archived;
        }));
  return {
          props: {
            posts: match[1],
            archived: match[0]
          }
        };
}

export {
  defaultPreviewImg ,
  $$default ,
  $$default as default,
  getStaticProps ,
}
/* middleDotSpacer Not a pure module */
