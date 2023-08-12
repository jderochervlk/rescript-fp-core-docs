module LatestLayout = DocsLayout.Make({
  // Structure defined by `scripts/extract-tocs.js`
  let tocData: SidebarLayout.Toc.raw = %raw("require('index_data/manual_latest_toc.json')")
})

module Latest = {
  @react.component
  let make = (~frontmatter=?, ~components=Markdown.default, ~children) => {
    let title = "rescript-fp-core"
    <LatestLayout theme=#Reason components title metaTitleCategory="Docs" ?frontmatter>
      children
    </LatestLayout>
  }
}
