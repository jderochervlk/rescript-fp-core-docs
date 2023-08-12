module Link = Next.Link

let link = "no-underline block text-inherit hover:cursor-pointer hover:text-fire-30 text-gray-40 mb-px"
let activeLink = "text-inherit font-medium text-fire-30 border-b border-fire"

let linkOrActiveLink = (~target, ~route) => target === route ? activeLink : link

let linkOrActiveLinkSubroute = (~target, ~route) =>
  Js.String2.startsWith(route, target) ? activeLink : link

let linkOrActiveApiSubroute = (~route) => {
  let url = Url.parse(route)
  switch Belt.Array.get(url.pagepath, 0) {
  | Some("api") => activeLink
  | _ => link
  }
}

let githubHref = "https://github.com/jderochervlk/rescript-fp-core"

module CollapsibleLink = {
  // KeepOpen = Menu has been opened and should stay open
  type state =
    | KeepOpen
    | HoverOpen
    | Closed

  @react.component
  let make = (
    ~title: string,
    ~onStateChange: (~id: string, state) => unit,
    ~allowHover=true,
    /* ~allowInteraction=true, */
    ~id: string,
    ~state: state,
    ~active=false,
    ~children,
  ) => {
    let onClick = _evt => {
      /* ReactEvent.Mouse.preventDefault(evt) */
      /* ReactEvent.Mouse.stopPropagation(evt) */

      onStateChange(
        ~id,
        switch state {
        | Closed => KeepOpen
        | HoverOpen => Closed
        | KeepOpen => Closed
        },
      )
    }

    let onMouseEnter = evt => {
      ReactEvent.Mouse.preventDefault(evt)
      if allowHover {
        onStateChange(~id, HoverOpen)
      }
    }

    let isOpen = switch state {
    | Closed => false
    | KeepOpen
    | HoverOpen => true
    }

    <>
      <div className="relative" onMouseEnter>
        <div className="flex items-center">
          <button
            tabIndex={0}
            onClick
            className={(active ? activeLink : link) ++
            (" border-none flex items-center hover:cursor-pointer " ++
            (isOpen ? " text-fire-30" : ""))}>
            <span className={active ? "border-b border-fire" : ""}> {React.string(title)} </span>
          </button>
        </div>
        <div
          className={(
            isOpen ? "flex" : "hidden"
          ) ++ " fixed left-0 overflow-y-scroll overflow-x-hidden border-gray-80 border-gray-40 min-w-320 w-full h-full bg-white sm:overflow-y-auto sm:bg-transparent sm:h-auto sm:justify-center sm:rounded-bl-xl sm:rounded-br-xl sm:shadow"}
          style={ReactDOMStyle.make(~marginTop="1rem", ())}>
          <div className="w-full"> children </div>
        </div>
      </div>
    </>
  }
}

type collapsible = {
  title: string,
  children: React.element,
  isActiveRoute: string => bool,
  href: string,
  state: CollapsibleLink.state,
}

module MobileNav = {
  @react.component
  let make = (~route: string) => {
    let base = "font-normal mx-4 py-5 text-gray-20 border-b border-gray-80"
    let extLink = "block hover:cursor-pointer hover:text-white text-gray-60"
    <div className="border-gray-80 border-t">
      <ul>
        <li className=base>
          <DocSearch.Textbox id="docsearch-mobile" />
        </li>
        <li className=base>
          <Link href="/try">
            <a className={linkOrActiveLink(~target="/try", ~route)}>
              {React.string("Playground")}
            </a>
          </Link>
        </li>
        <li className=base>
          <Link href="/blog">
            <a className={linkOrActiveLinkSubroute(~target="/blog", ~route)}>
              {React.string("Blog")}
            </a>
          </Link>
        </li>
        /*
         <li className=base>
           <Link href="/community">
             <a className={linkOrActiveLink(~target="/community", ~route)}>
               {React.string("Community")}
             </a>
           </Link>
         </li>
 */
        <li className=base>
          <a href="https://twitter.com/rescriptlang" rel="noopener noreferrer" className=extLink>
            {React.string("Twitter")}
          </a>
        </li>
        <li className=base>
          <a href=githubHref rel="noopener noreferrer" className=extLink>
            {React.string("GitHub")}
          </a>
        </li>
      </ul>
    </div>
  }
}

/* isOverlayOpen: if the mobile overlay is toggled open */
@react.component
let make = (~fixed=true, ~overlayState: (bool, (bool => bool) => unit)) => {
  let minWidth = "20rem"
  let router = Next.Router.useRouter()
  let route = router.route

  let (collapsibles, setCollapsibles) = React.useState(_ => [
    // {
    //   title: "Docs",
    //   href: "/docs/manual/latest/api",
    //   isActiveRoute: route => {
    //     let url = Url.parse(route)
    //     switch url {
    //     | {base: ["docs"]}
    //     | {base: ["docs", "react"]}
    //     | {base: ["docs", "gentype"]}
    //     | {base: ["docs", "manual"]} =>
    //       switch Belt.Array.get(url.pagepath, 0) {
    //       | Some("api") => false
    //       | _ => true
    //       }
    //     | _ => false
    //     }
    //   },
    //   state: Closed,
    //   children: <DocsSection />,
    // },
  ])

  let isSubnavOpen = Js.Array2.find(collapsibles, c => c.state !== Closed) !== None

  let (isOverlayOpen, setOverlayOpen) = overlayState

  let toggleOverlay = () => setOverlayOpen(prev => !prev)

  let resetCollapsibles = () =>
    setCollapsibles(prev => Belt.Array.map(prev, c => {...c, state: Closed}))

  let navRef = React.useRef(Js.Nullable.null)
  Hooks.useOutsideClick(ReactDOM.Ref.domRef(navRef), resetCollapsibles)

  /* let windowWidth = useWindowWidth() */

  /*
  // Don't allow hover behavior for collapsibles if mobile navigation is on
  let _allowHover = switch windowWidth {
  | Some(width) => width > 576 // Value noted in tailwind config
  | None => true
  }
 */

  // Client side navigation requires us to reset the collapsibles
  // whenever a route change had occurred, otherwise the collapsible
  // will stay open, even though you clicked a link
  React.useEffect0(() => {
    open Next.Router.Events
    let {Next.Router.events: events} = router

    let onChangeComplete = _url => {
      resetCollapsibles()
      setOverlayOpen(_ => false)
    }

    events->on(#routeChangeComplete(onChangeComplete))
    events->on(#hashChangeComplete(onChangeComplete))

    Some(
      () => {
        events->off(#routeChangeComplete(onChangeComplete))
        events->off(#hashChangeComplete(onChangeComplete))
      },
    )
  })

  let fixedNav = fixed ? "fixed top-0" : "relative"

  let onStateChange = (~id, state) => {
    setCollapsibles(prev => {
      Belt.Array.keepMap(prev, next => {
        if next.title === id {
          Some({...next, state})
        } else {
          None
        }
      })
    })
  }

  let collapsibleElements = Js.Array2.map(collapsibles, coll => {
    <CollapsibleLink
      key={coll.title}
      title={coll.title}
      state={coll.state}
      id={coll.title}
      allowHover={false}
      active={coll.isActiveRoute(route)}
      onStateChange>
      {coll.children}
    </CollapsibleLink>
  })

  <>
    <nav
      ref={ReactDOM.Ref.domRef(navRef)}
      id="header"
      style={ReactDOMStyle.make(~minWidth, ())}
      className={fixedNav ++ " z-50 px-4 flex xs:justify-center w-full h-16 bg-gray-90 shadow text-white-80 text-14"}>
      <div className="flex justify-between items-center h-full w-full max-w-1280">
        <div className="h-8 w-8 lg:h-10 lg:w-32">
          <a
            href="/"
            className="block hover:cursor-pointer w-full h-full flex justify-center items-center font-bold">
            <img src="/static/nav-logo@2x.png" className="lg:hidden" />
            <img src="/static/nav-logo-full@2x.png" className="hidden lg:block" />
          </a>
        </div>
        /* Desktop horizontal navigation */
        <div
          className="flex items-center xs:justify-between w-full bg-gray-90 sm:h-auto sm:relative">
          <div
            className="flex ml-10 space-x-5 w-full max-w-320"
            style={ReactDOMStyle.make(~maxWidth="26rem", ())}>
            {collapsibleElements->React.array}
            <Link href="/docs">
              <a className={linkOrActiveApiSubroute(~route)}> {React.string("Docs")} </a>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            // TODO: get search working
            // <div className="hidden sm:block mr-6">
            //   <DocSearch />
            // </div>
            <a href=githubHref rel="noopener noreferrer" className={"mr-5 " ++ link}>
              <Icon.GitHub className="w-6 h-6 opacity-50 hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>
      /* Burger Button */
      <button
        className="h-full px-4 xs:hidden flex items-center hover:text-white"
        onClick={evt => {
          ReactEvent.Mouse.preventDefault(evt)
          resetCollapsibles()
          toggleOverlay()
        }}>
        <Icon.DrawerDots
          className={"h-1 w-auto block " ++ (isOverlayOpen ? "text-fire" : "text-gray-60")}
        />
      </button>
      /* Mobile overlay */
      <div
        style={ReactDOMStyle.make(~minWidth, ~top="4rem", ())}
        className={(
          isOverlayOpen && !isSubnavOpen ? "flex" : "hidden"
        ) ++ " sm:hidden flex-col fixed top-0 left-0 h-full w-full z-50 sm:w-9/12 bg-gray-100 sm:h-auto sm:flex sm:relative sm:flex-row sm:justify-between"}>
        <MobileNav route />
      </div>
    </nav>
    <div
      className={if isSubnavOpen {
        "fixed"
      } else {
        "hidden"
      } ++ " z-40 bg-gray-10-tr w-full h-full bottom-0"}
      style={
        open ReactDOM.Style
        make()
        ->unsafeAddProp("backdropFilter", "blur(2px)")
        ->unsafeAddProp("WebkitBackdropFilter", "blur(2px)")
      }
    />
  </>
}
