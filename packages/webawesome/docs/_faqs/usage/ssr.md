---
question: Does Web Awesome work with server-side rendering?
order: 50
synonyms: [ssr, server rendering, hydration, declarative shadow dom, lit]
source: webawesome/docs/docs/ssr.md
---
It does, but it's experimental, partly because Lit's SSR package is too. The goal today is to reduce layout shifting and show a rough approximation of each component until its JavaScript is ready, not to make components work without JavaScript. The <a href="/docs/ssr">SSR guide</a> covers setup and lists the known issues, which are worth a read before you commit.
