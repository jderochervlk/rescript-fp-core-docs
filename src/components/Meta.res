module Head = Next.Head

/*
    canonical: Set a canonical URL pointing to the original content.
 */
@react.component
let make = (
  ~siteName="rescript-fp-ts",
  ~keywords: array<string>=["rescript", "fuctional programming", "core", "standard", "library"],
  ~description="A functional standard library for ReScript.",
  ~canonical=?,
  ~title=?,
  ~ogLocale="en_US",
  ~ogSiteName=?,
  ~ogDescription=description,
  ~ogTitle=?,
  ~ogImage=?,
) => {
  let title = switch title {
  | None
  | Some("") => siteName
  | Some(title) => title
  }

  let ogSiteName = switch ogSiteName {
  | Some(ogSiteName) => ogSiteName
  | None => siteName
  }

  let ogTitle = switch ogTitle {
  | Some(ogTitle) => ogTitle
  | None => title
  }

  <Head>
    <title key="title"> {React.string(title)} </title>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, minimal-ui"
    />
    <meta key="description" name="description" content=description />
    <meta key="keywords" name="keywords" content={Js.Array2.joinWith(keywords, ",")} />
    {switch canonical {
    | Some(href) => <link key="canonical" href rel="canonical" />
    | None => React.null
    }}
    <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
    <link rel="icon" type_="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
    <link rel="icon" type_="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
    <link rel="manifest" href="/static/favicon/site.webmanifest" />
    /* OG link preview meta data */
    <meta key="og:site_name" property="og:site_name" content=ogSiteName />
    <meta key="og:locale" property="og:locale" content=ogLocale />
    <meta key="og:title" property="og:title" content=ogTitle />
    <meta key="og:description" property="og:description" content=ogDescription />
    {switch ogImage {
    | Some(ogImage) => <meta key="og:image" property="og:image" content=ogImage />
    | None => React.null
    }}
    /* Twitter Meta */
    <meta key="twitter:title" name="twitter:title" content=title />
    <meta key="twitter:description" name="twitter:description" content=description />
    <meta key="twitter:site" name="twitter:site" content="@reasonml" />
    <meta key="twitter:creator" name="twitter:creator" content="@ReasonAssoc" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
    /* TODO: Undo this later */
    /* <meta key="twitter:image" property="twitter:image" content=ogImage /> */
    <link rel="alternate" type_="application/rss+xml" title="ReScript Blog" href="/blog/feed.xml" />
  </Head>
}
