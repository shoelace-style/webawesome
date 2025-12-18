---
title: Contributing
description: Web Awesome is an open source project, meaning everyone can use it and contribute to its development.
layout: page
---

Many Web Awesome components are open source, meaning everyone can use them and contribute to their development. When you join our community, you'll find a friendly group of enthusiasts at all experience levels who are willing to chat about anything and everything related to Web Awesome.

The easiest way to get started contributing is to join the [community chat](https://discord.gg/mg8f26C). This is where we hang out, discuss new ideas, ask for feedback, and more!

A common misconception about contributing to an open source project is that you need to know how to code. This simply isn't true. In fact, there are _many_ ways to contribute, and some of the most important contributions come from those who never write a single line of code. Here's a list of ways you can make a meaningful contribution to the project:

- Submitting well-written bug reports
- Submitting feature requests that are within the scope of the project
- Improving the documentation
- Responding to users that need help in the community chat or discussion forum
- Triaging issues on GitHub
- Being a developer advocate for the project
- Sponsoring the project financially
- Writing tests
- Sharing ideas
- And, of course, contributing code!

Please take a moment to review these guidelines to make the contribution process as easy as possible for both yourself and the project's maintainers.

## Using the Issue Tracker

The [issue tracker](https://github.com/shoelace-style/webawesome/issues) is for bug reports, feature requests, and pull requests.

- Please **do not** use the issue tracker for personal support requests. Use [the discussion forum](https://github.com/shoelace-style/webawesome/discussions/categories/help-support) instead.
- Please **do not** use the issue tracker for feature requests. Use [the discussion forum](https://github.com/shoelace-style/webawesome/discussions/categories/ideas) instead.
- Please **do not** derail, hijack, or troll issues. Keep the discussion on topic and be respectful of others.
- Please **do not** post comments with "+1" or "👍". Use [reactions](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/) instead.
- Please **do** use the issue tracker for bug reports and pull requests.

Issues that do not follow these guidelines are subject to closure. There simply aren't enough resources for the author and contributors to troubleshoot personal support requests.

### Feature Requests

Feature requests can be added using [the discussion forum](https://github.com/shoelace-style/webawesome/discussions/categories/ideas).

- Please **do** search for an existing request before suggesting a new feature.
- Please **do** use the voting buttons to vote for a feature.
- Please **do** share substantial use cases and perspective that support new features if they haven't already been mentioned.
- Please **do not** bump, spam, or ping contributors to prioritize your own feature.

### Bug Reports

A bug is _a demonstrable problem_ caused by code in the library. Bug reports are an important contribution to the quality of the project. When submitting a bug report, there are a few steps you can take to make sure your issues gets attention quickly.

- Please **do not** paste in large blocks of irrelevant code
- Please **do** search for an existing issue before creating a new one
- Please **do** explain the bug clearly
- Please **do** provide a minimal test case that demonstrates the bug (e.g. [jsfiddle.net](https://jsfiddle.net/) or [CodePen](https://codepen.io/))
- Please **do** provide additional information, when necessary, to replicate the bug

**A minimal test case is critical to a successful bug report.** It demonstrates that the bug exists in the library and not in surrounding code. Contributors should be able to understand the bug without studying your code, otherwise they'll probably move on to another bug.

### Pull Requests

To keep the project on track, please consider the following guidelines before submitting a PR.

- Please **do not** submit a PR without opening an issue first, unless the changes are trivial (e.g. fixing typos or outdated docs). This may prevent you from doing work that won't be accepted for various reasons (e.g. someone is already working on it, it's not a good fit for the project's roadmap, it needs additional planning, etc.)
- Please **do** make sure your PR clearly defines what you're changing. Even if you feel your changes are obvious, please explain them so other contributors can more easily review your works. PRs without detailed descriptions are subject to closure pending more details.
- Please **do** open your PR against the `next` branch.
- Please **do not** edit anything in `dist/`. These files are generated automatically, so you need to edit the source files instead.

The author reserves the right to reject any PR that's outside the scope of the project or doesn't meet code quality standards.

### Branches

`current` - This branch reflects the latest release.

`next` - This is the branch you should submit pull requests against. It reflects what's coming in the _next_ release.

## Documentation

Maintaining good documentation can be a painstaking task, but poor documentation leads to frustration and makes the project less appealing to users. Fortunately, writing documentation for Web Awesome is fast and easy!

Most of Web Awesome's technical documentation is generated with JSDoc comments and TypeScript metadata from the source code. Every property, method, event, etc. is documented this way. In-code comments encourage contributors to keep the documentation up to date as changes occur so the docs are less likely to become stale. Refer to an existing component to see how JSDoc comments are used in Web Awesome.

Instructions, code examples, and interactive demos are hand-curated to give users the best possible experience. Typically, the most relevant information is shown first and less common examples are shown towards the bottom. Edge cases and gotchas should be called out in context with tips or warnings.

The docs are powered by [Eleventy](https://www.11ty.dev/). Check out `docs/components/*.md` to get an idea of how pages are structured and formatted. If you're creating a new component, it may help to use an existing component's markdown file as a template.

If you need help with documentation, feel free to reach out on the [community chat](https://discord.gg/mg8f26C).

### Web Awesome-flavoured Markdown

The Web Awesome documentation uses an extended version of [markdown-it](https://github.com/markdown-it/markdown-it). Generally speaking, it follows the [Commonmark spec](https://spec.commonmark.org/) while sprinkling in some additional features.

#### Code Previews

To render a code preview, use the standard code field syntax and add a class of `example`:

````md
```html {.example}
[code goes here]
```
````

You can also append `.open` to expand the code by default, and `.no-edit` to disable the CodePen button. The order of these modifiers doesn't matter, but no spaces should exist between the language and the modifiers.

````md
```html {.example .open .no-edit}
[code goes here]
```
````

#### Callouts

Special callouts can be added using the following syntax.

```
:::info
This is a tip/informational callout
:::

:::warning
This is a caution callout
:::
```

#### GitHub Issues

To link to a GitHub issue, PR, or discussion, use the following syntax.

```
[#1234]
```

### Frontmatter

There's a number of frontmatter properties for doing different things in the Web Awesome documentation.

For example, to only show a page in development, use the `unpublished: true` key / value pair.

```md
---
unpublished: true
---
```

To build a page, but not add it to any search indexes and collections so they don't appear in the sidebar, use `unlisted: true, eleventyExcludeFromCollections: true` key / value pairs.

```md
---
unlisted: true
eleventyExcludeFromCollections: true
---
```

## Best Practices

The following is a non-exhaustive list of conventions, patterns, and best practices we try to follow. As a contributor, we ask that you make a good faith effort to follow them as well. This ensures consistency and maintainability throughout the project.

If in doubt, use your best judgment and the maintainers will be happy to guide you during the code review process. If you'd like clarification on something before submitting a PR, feel free to reach out on the [community chat](https://discord.gg/mg8f26C).

:::info
This section can be a lot to digest in one sitting, so don't feel like you need to take it all in right now. Most contributors will be better off skimming this section and reviewing the relevant content as needed.
:::

### Accessibility

Web Awesome is built with accessibility in mind. Creating generic components that are fully accessible to users with varying capabilities across a multitude of circumstances is a daunting challenge. Oftentimes, the solution to an a11y problem is not written in black and white and, therefore, we may not get it right the first time around. There are, however, guidelines we can follow in our effort to make Web Awesome an accessible foundation from which applications and websites can be built.

We take this commitment seriously, so please ensure your contributions have this goal in mind. If you need help with anything a11y-related, please reach out on the [community chat](https://discord.gg/mg8f26C) for assistance. If you discover an accessibility concern within the library, please file a bug on the [issue tracker](https://github.com/shoelace-style/webawesome/issues).

It's important to remember that, although accessibility starts with foundational components, it doesn't end with them. It everyone's responsibility to encourage best practices and ensure we're providing an optimal experience for all of our users.

### Code Formatting

Most code formatting is handled automatically by [Prettier](https://prettier.io/) via commit hooks. However, for the best experience, you should [install it in your editor](https://prettier.io/docs/en/editors.html) and enable format on save.

Please do not make any changes to `prettier.config.cjs` without consulting the maintainers.

### Composability

Components should be composable, meaning you can easily reuse them with and within other components. This reduces the overall size of the library, expedites feature development, and maintains a consistent user experience.

### Component Structure

All components have a host element, which is a reference to the `<wa-*>` element itself. Make sure to always set the host element's `display` property to the appropriate value depending on your needs, as the default is `inline` per the custom element spec.

```css
:host {
  display: block;
}
```

Aside from `display`, avoid setting styles on the host element when possible. The reason for this is that styles applied to the host element are not encapsulated. Instead, create a base element that wraps the component's internals and style that instead. This convention also makes it easier to use BEM in components, as the base element can serve as the "block" entity.

When authoring components, please try to follow the same structure and conventions found in other components. Classes, for example, generally follow this structure:

- Static properties/methods
- Private/public properties (that are _not_ reactive)
- `@query` decorators
- `@state` decorators
- `@property` decorators
- Lifecycle methods (`connectedCallback()`, `disconnectedCallback()`, `firstUpdated()`, etc.)
- Private methods
- `@watch` decorators
- Public methods
- The `render()` method

Please avoid using the `public` keyword for class fields. It's simply too verbose when combined with decorators, property names, and arguments. However, _please do_ add `private` in front of any property or method that is intended to be private.

:::info
This might seem like a lot, but it's fairly intuitive once you start working with the library. However, don't let this structure prevent you from submitting a PR. [Code can change](https://www.abeautifulsite.net/posts/code-can-change/) and nobody will chastise you for "getting it wrong." At the same time, encouraging consistency helps keep the library maintainable and easy for others to understand. (A lint rule that helps with things like this would be a very welcome PR!)
:::

### Class Names

All components use a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), so styles are completely encapsulated from the rest of the document. As a result, class names used _inside_ a component won't conflict with class names _outside_ the component, so we're free to name them anything we want.

Internally, each component uses the [BEM methodology](http://getbem.com/) for class names. There is no technical requirement to do this — it's purely the preference of the author to enforce consistency and clarity throughout components. As such, all contributions are expected to follow this pattern.

### Boolean Props

Boolean props should _always_ default to `false`, otherwise there's no way for the user to unset them using only attributes. To keep the API as friendly and consistent as possible, use the following convention to show or hide optional content.

- `with-*` - The content doesn't show by default, but will be shown when this attribute is present
- `without-*` - The content shows by default, but will not be shown when this attribute is present

### Conditional Slots

When a component relies on the presence of slotted content to do something, don't assume its initial state is permanent. Slotted content can be added or removed any time and components must be aware of this. A good practice to manage this is:

- Add `@slotchange={this.handleSlotChange}` to the slots you want to watch
- Add a `handleSlotChange` method and use the `hasSlot` utility to update state variables for the the respective slot(s)
- Never conditionally render `<slot>` elements in a component — always use `hidden` so the slot remains in the DOM and the `slotchange` event can be captured

See the source of card, dialog, or drawer for examples.

### Dynamic Slot Names and Expand/Collapse Icons

A pattern has been established in `<wa-details>` and `<wa-tree-item>` for expand/collapse icons that animate on open/close. In short, create two slots called `expand-icon` and `collapse-icon` and render them both in the DOM, using CSS to show/hide only one based on the current open state. Avoid conditionally rendering them. Also avoid using dynamic slot names, such as `<slot name=${open ? 'open' : 'closed'}>`, because Firefox will not animate them.

There should be a container element immediately surrounding both slots. The container should be animated with CSS by default and it should have a part so the user can override the animation or disable it. Please refer to the source and documentation for `<wa-details>` and/or `<wa-tree-item>` for details.

### Fallback Content in Slots

When providing fallback content inside of `<slot>` elements, avoid adding parts, e.g.:

```html
<slot name="icon">
  <wa-icon part="close-icon"></wa-icon>
</slot>
```

This creates confusion because the part will be documented, but it won't work when the user slots in their own content. The recommended way to customize this example is for the user to slot in their own content and target its styles with CSS as needed.

### Emitting Events

Components must only emit events that start with `wa-` as a namespace. For compatibility with frameworks that utilize DOM templates, events must have lowercase, kebab-style names. For example, use `wa-event` instead of `waEvent`.

This convention avoids the problem of browsers lowercasing attributes, causing some frameworks to be unable to listen to them. This problem isn't specific to one framework, but [Vue's documentation](https://vuejs.org/v2/guide/components-custom-events.html#Event-Names) provides a good explanation of the problem.

### Data Attribute Invokers

Some components can be controlled using [data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/data-*) that trigger specific behaviors. These controls must use the following convention:

```html
<button data-component="action id">Button text</button>
```

The `data-component` portion corresponds to the component's name without the `wa-` prefix. For example, `data-dialog` must control a `<wa-dialog>` component.

The `action` parameter is required and must be a concise, descriptive term indicating the intended behavior, e.g. `open` and `close`.

The `id` parameter must point to the ID of the target component. The ID may be omitted if and only if the target component wraps the element with the `data-` attribute.

```html
<wa-dialog id="my-dialog"> Dialog content </wa-dialog>

<button data-dialog="open my-dialog">Open dialog</button>
```

### CSS Custom Properties

Custom properties allow users to customize Web Awesome components by exposing specific styles across a component's shadow boundary. Use custom properties to expose key characteristics of a component for low-level theming. Avoid using custom properties for styles that may interfere with proper rendering.

To expose custom properties as part of a component's API, scope them to the `:host` block.

```css
:host {
  --color: var(--wa-color-brand-on-loud);
  --background-color: var(--wa-color-brand-fill-loud);
}
```

Then use the following syntax for comments so they appear in the generated docs. Do not use the `--wa-` prefix, as that is reserved for design tokens that live in the global scope.

```js
/**
 * @cssproperty --color: The component's text color.
 * @cssproperty --background-color: The component's background color.
 */
@customElement('wa-example')
export default class WaExample {
  // ...
}
```

### Focusing on Disabled Items

When an item within a keyboard navigable set is disabled (e.g. tabs, trees, menu items, etc.), the disabled item _should not_ receive focus via keyboard, click, or tap. It should be skipped just like in operating system menus and in native HTML form controls. There is no exception to this. If a particular item requires focus for assistive devices to provide a good user experience, the item should not be disabled and, upon activation, it should inform the user why the respective action cannot be completed.

### When to use a property vs. a CSS custom property

When designing a component's API, standard properties are generally used to change the _behavior_ of a component, whereas CSS custom properties ("CSS variables") are used to change the _appearance_ of a component. Remember that properties can't respond to media queries, but CSS variables can.

There are some exceptions to this (e.g. when it significantly improves developer experience), but a good rule of thumbs is "will this need to change based on screen size?" If so, you probably want to use a CSS variable.

### When to use a CSS custom property vs. a CSS part

There are two ways to enable customizations for components. One way is with CSS custom properties ("CSS variables"), the other is with CSS parts ("parts").

CSS variables are scoped to the host element and can be reused throughout the component. A good example of a CSS variable would be `--border-width`, which might get reused throughout a component to ensure borders share the same width for all internal elements.

Parts let you target a specific element inside the component's shadow DOM but, by design, you can't target a part's children or siblings. You can _only_ customize the part itself. Use a part when you need to allow a single element inside the component to accept styles.

This convention can be relaxed when the developer experience is greatly improved by not following these suggestions.

### Naming CSS Parts

While CSS parts can be named [virtually anything](https://www.abeautifulsite.net/posts/valid-names-for-css-parts/), within Web Awesome they must use the kebab-case convention and lowercase letters. Additionally, [a BEM-inspired naming convention](https://www.abeautifulsite.net/posts/css-parts-inspired-by-bem/) is used to distinguish parts, subparts, and states.

When composing elements, use `part` to export the host element and `exportparts` to export its parts.

```js
render() {
  return html`
    <div part="base">
      <wa-icon part="icon" exportparts="base:icon__base" ...></wa-icon>
    </div>
  `;
}
```

This results in a consistent, easy to understand structure for parts. In this example, the `icon` part will target the host element and the `icon__base` part will target the icon's `base` part.

### Dependencies

TL;DR – a component is a dependency if and only if it's rendered inside another component's shadow root.

Many Web Awesome components use other Web Awesome components internally. For example, `<wa-button>` uses both `<wa-icon>` and `<wa-spinner>` for its caret icon and loading state, respectively. Since these components appear in the button's shadow root, they are considered dependencies of Button. Since dependencies are automatically loaded, users only need to import the button and everything will work as expected.

The rule of thumb for dependencies is: if a component is rendered _inside_ a host element's shadow root OR if the component is required to be slotted in by the user (e.g. `<wa-radio-group>` + `<wa-radio>`), it's a dependency.

### Form Controls

Form controls should support submission and validation through the following conventions:

- Form Controls should extend from `WebAwesomeFormAssociatedElement`
- All form controls must use `name`, `value`, and `disabled` properties in the same manner as `HTMLInputElement`
- All form controls with the `disabled` property _NOT_ reflect the `disabled` attribute.
- All form controls must have an `invalid` property that reflects their validity
- All form controls should mirror their native validation attributes such as `required`, `pattern`, `minlength`, `maxlength`, etc. when possible and use the `MirrorValidator`.
- All form controls must be tested to work with the standard `<form>` element
- Form controls that **DO NOT** have an editable value such as a button only need `@property({ reflect: true }) value`
- Form controls that **DO** have an editable value such as an input or textarea should have: `@property({ attribute: false }) value` and `@property({ attribute: "value", reflect: true }) defaultValue`. We do this to align with how native form controls work.
- Form controls which have an editable property such as `checked` or `selected` should also have a `defaultSelected` and `defaultChecked` property respectively for use when the form is "reset".

### System Icons

Avoid inlining SVG icons inside of templates. If a component requires an icon, make sure `<wa-icon>` is a dependency of the component and use the [system library](/docs/components/icon#customizing-the-system-library):

```html
<wa-icon library="system" name="..." variant="..."></wa-icon>
```

This will render the icons instantly whereas the default library will fetch them from a remote source. If an icon isn't available in the system library, you will need to add it to `library.system.ts`. Using the system library ensures that all icons load instantly and are customizable by users who wish to provide a custom resolver for the system library.

### Writing tests

What to test for a given component:

- Start with a simple test that checks that the default version of the component still renders.
- Add at least one accessibility test (The accessibility check only covers the parts of the DOM which are currently visible and rendered. Depending on the component, more than one accessibility test is required to cover all scenarios.):

```ts
const myComponent = await fixture<WaComponent>(html`<wa-component>...</wa-component>`);

await expect(myComponent).to.be.accessible();
```

- Try to cover all features advertised in the component's description

Guidelines for writing tests:

- Each test should declare its own, hand crafted hml fixture for the component. Do not try to write one big component to match all tests. This helps keeping each test understandable in isolation.
- Tests should not produce log lines. Note that sometimes this cannot be prevented as the test runner might log errors (e.g. 404s).
- Try keeping the main test readable: Extract more complicated sets of selectors/commands/assertions into separate functions.
- Try to aim testing the user facing features of the component instead of the internal workings of the component.
- Group multiple tests for one feature into describe blocks.

### Running tests

Right now, tests run both "hydrated" (SSR → client hydrated) and "client only". If you're debugging only one specific kind you can set an environment variable. For example, to run only the client tests, you can do:

```bash
CSR_ONLY="true" npm run test
```

or for hydrated rendering only:

```bash
SSR_ONLY="true" npm run test
```
