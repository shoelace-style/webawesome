---
question: Does Web Awesome work with React, Vue, Angular, or Svelte?
order: 20
synonyms: [react, vue, angular, svelte, framework, integration]
source: webawesome/docs/docs/frameworks.md; webawesome/docs/docs/frameworks/react.md, vue.md, angular.md, svelte.md
---
All four, plus Vue 2, Astro, Express, and 11ty. Web Awesome is built on standard web components, so it works with any framework. The setup differs a little by framework:

- **React** 19 and up needs no wrappers; React 18 and below use our legacy wrappers
- **Angular** needs the custom elements schema
- **Vue** needs its custom-element config
- **Svelte** needs two-way binding done by hand

Pick yours on the <a href="/docs/frameworks">Frameworks</a> page, which links to a guide for each, with the known limitations.
