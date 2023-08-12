// This is the implementation of the _app.js file

// Resources:
// --------------
// Really good article on state persistence within layouts:
// https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/

// Register all the highlightjs stuff for the whole application
%%raw(`
  let hljs = require('highlight.js/lib/core');
  let js = require('highlight.js/lib/languages/javascript');
  let css = require('highlight.js/lib/languages/css');
  let ocaml = require('highlight.js/lib/languages/ocaml');
  let reason = require('plugins/reason-highlightjs');
  let rescript = require('plugins/rescript-highlightjs');
  let bash = require('highlight.js/lib/languages/bash');
  let json = require('highlight.js/lib/languages/json');
  let html = require('highlight.js/lib/languages/xml');
  let text = require('highlight.js/lib/languages/plaintext');
  let diff = require('highlight.js/lib/languages/diff');

  hljs.registerLanguage('reason', reason);
  hljs.registerLanguage('rescript', rescript);
  hljs.registerLanguage('javascript', js);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('ts', js);
  hljs.registerLanguage('ocaml', ocaml);
  hljs.registerLanguage('sh', bash);
  hljs.registerLanguage('json', json);
  hljs.registerLanguage('text', text);
  hljs.registerLanguage('html', html);
  hljs.registerLanguage('diff', diff);
`)

type pageComponent = React.component<{.}>
type pageProps = {.}

type props = {"Component": pageComponent, "pageProps": pageProps}

// @get
// external frontmatter: React.component<{.}> => Js.Json.t = "frontmatter"

let make = (props: props): React.element => {
  let component = props["Component"]
  let pageProps = props["pageProps"]

  let router = Next.Router.useRouter()

  let content = React.createElement(component, pageProps)

  let url = router.route->Url.parse

  switch url {
  // landing page
  | {base: [], pagepath: []} => <LandingPageLayout> content </LandingPageLayout>
  // docs
  | __ => <ManualDocsLayout.Latest> content </ManualDocsLayout.Latest>
  }
}
