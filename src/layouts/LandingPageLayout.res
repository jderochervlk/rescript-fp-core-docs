let text = [
  `An alternative to the ReScript Core library heavily inspired by fp-ts.`,
  `ReScript Core has a focus of providing bindings for JavaScript API's without having an opinion on those APIs.
  This library has a different philosophy of providing functions that are focused on functional patterns, 
  and only offering a subset of Javascript APIs.`,
  `This library encorages immutable data and safe access that are often wrapped in Options.`,
]

module Intro = {
  @react.component
  let make = () => {
    <React.Fragment>
      <section className="flex justify-center">
        <div className="max-w-1060 flex flex-col items-center px-5 sm:px-8 lg:box-content">
          <h1 className="hl-title text-center max-w-[53rem]">
            {React.string("rescript-fp-core")}
          </h1>
          <h2 className="body-lg text-center text-gray-60 my-4 max-w-[40rem]">
            {React.string(`A functional standard library for ReScript.`)}
          </h2>
          <div className="body-lg text-center text-gray-60 max-w-[40rem]">
            {text
            ->Js.Array2.map(t => <p key={t} className="my-4"> {React.string(t)} </p>)
            ->React.array}
          </div>
          <div className="mt-4 mb-2">
            <Next.Link href="/docs/installation" passHref={true}>
              <Button> {React.string("Get started")} </Button>
            </Next.Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  }
}

@react.component
let make = (~components=Markdown.default, ~children) => {
  let overlayState = React.useState(() => false)

  <>
    <Meta
      title="Rescript FP Core"
      description="Fast, Simple, Fully Typed JavaScript from the Future"
      keywords=["ReScript", "rescriptlang", "JavaScript", "JS", "TypeScript"]
      ogImage="/static/Art-3-rescript-launch.jpg"
    />
    <div className="mt-4 xs:mt-16">
      <div className="text-gray-80 text-18">
        <Navigation overlayState />
        <div className="absolute top-16 w-full">
          <div className="relative overflow-hidden pb-32">
            <main className="mt-10 min-w-320 lg:align-center w-full">
              <Mdx.Provider components>
                <div className="">
                  <div className="w-full">
                    <div className="mt-16 md:mt-32 lg:mt-40 mb-12">
                      <Intro />
                    </div>
                    // more content can go here
                    children
                  </div>
                </div>
              </Mdx.Provider>
            </main>
          </div>
        </div>
      </div>
    </div>
  </>
}
