---
title: Changelog
description: Changes to each version of the project are documented here.
layout: page
---

Web Awesome follows [Semantic Versioning](https://semver.org/). Breaking changes in components with the <wa-badge variant="brand" pill>Stable</wa-badge> badge will not be accepted until the next major version. As such, all contributions must consider the project's roadmap and take this into consideration. Features that are deemed no longer necessary will be deprecated but not removed.

Components with the <wa-badge variant="warning" pill>Experimental</wa-badge> badge should not be used in production. They are made available as release candidates for development and testing purposes. As such, changes to experimental components will not be subject to semantic versioning.

:::warning
During the alpha period, things might break! We take breaking changes very seriously, but sometimes they're necessary to make the final product that much better. We appreciate your patience!
:::

## Next

- Added support for <kbd>Enter</kbd> to `<sl-split-panel>` to align with ARIA APG's [window splitter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)
- Added more resilient support for lazy loaded options in `<wa-select>`
- Fixed a bug in `<wa-relative-time>` where the title attribute would show with redundant info
- Fixed a bug in `<wa-tooltip>` that caused a memory leak in disconnected elements
- Fixed a bug in `<wa-select>` that prevented label changes in `<wa-option>` from updating the controller
- Improved alignment of the play icon in `<wa-animated-image>`

## 3.0.0-alpha.3

- Added [SSR support](/docs/experimental/ssr/) to all components
- Added `scroll-margin-top` to children of `wa-page`
- Added `--scroll-margin-top` css variable `wa-page`
- Fixed form controls to behave like their native counterparts for value and defaultValue properties / attributes respectively.
- Fixed a bug in `<wa-input>` around value attributes and properties to behave like native `<input>`.
- Fixed a bug in `<wa-select>` that made the suffix slot collide with the clear button
- Fixed a bug in `<wa-checkbox>` where unchecking and then checking would "clear" its value.
- Fixed a bug where `<wa-relative-time>` would announce the full time instead of the relative time in screen readers [#22](https://github.com/shoelace-style/webawesome-alpha/issues/22)
- Fixed a bug in `<wa-tab-group>` in Firefox where the overflow container would keep focus. [#14](https://github.com/shoelace-style/webawesome-alpha/issues/14)
- Fixed a bug in `<wa-input>` where `minlength` and `maxlength` were not being properly validated. [#35](https://github.com/shoelace-style/webawesome-alpha/issues/35)
- Fixed a bug in `<wa-carousel>` that made pagination work incorrectly

## 3.0.0-alpha.2

- This is the initial release of Web Awesome alpha!

---

## What's different from Shoelace v2?

==If you're new to Web Awesome, you can skip this section.== If you're coming from [Shoelace](https://shoelace.style/), you're in the right place!

Here's a list of some of the things that have changed since Shoelace v2. For questions or help upgrading, [the alpha discussion board](https://github.com/shoelace-style/webawesome-alpha/discussions) is a great place to get help!

- Added `setKitCode()` and `getKitCode()` functions as well as support for setting kit codes declaratively with `data-webawesome-kit`
- Added `family` and `variant` attributes to `<wa-icon>` and `<wa-icon-button>`
- Added the `active` attribute to `<wa-tab-group>`
- Added an easier way to close dialogs by applying `data-dialog="close"` to any button in the dialog
- Added an easier way to close drawers by applying `data-dialog="close"` to any button in the drawer
- Added the `--show-duration` and `--hide-duration` custom properties to `<wa-details>`, `<wa-dialog>`, `<wa-drawer>`, `<wa-tree-item>`, and `<wa-popup>`
- Added visible labels to `<wa-color-picker>`
- Changed the attribute for setting the base path declaratively to `data-webawesome` instead of `data-shoelace`; additionally, you can place it on any element now instead of just the associated `<script>` tag
- Changed the `sl` prefix to `wa` for Web Awesome, including tags, events, etc.
- Changed `primary` variants to `brand` in all components
- Changed the internal structure of `<wa-checkbox>` so that the internal checkbox now takes up the full height and width of its wrapping container.
- Changed disabled form controls so they don't have the `disabled` attribute when disabled (use `:state(disabled)` or `[data-wa-disabled]` instead)
- Changed `<wa-checkbox>` to no longer have a `checked` attribute set when their `checked` property is changed, e.g. `el.checked = true` (use the `:state(:checked)` or `[data-checked]` selector instead)
- Changed `<wa-checkbox>` and `<wa-switch>` to use `:state(checked)` (fallback `[data-wa-checked]`) for styling their "checked" state (the `checked` attribute now maps to `defaultChecked` like native HTML checkboxes)
- Changed the `data-optional`, `data-required`, `data-invalid`, `data-valid`, `data-user-invalid`, and `data-user-valid` states to `data-wa-*` prefix to avoid conflicts with user provided attributes
- Changed `<wa-icon>` so icons are no longer fixed width by default to accommodate variable width icons
- Changed `<wa-radio>` from `display: block;` to `display: inline-block`
- Changed `<wa-tab-group>` to implement a "roving tabindex" and `<wa-tab>` is no longer tabbable by default. This aligns closer to the APG pattern for tabs. [#2041]
- Changed `<wa-tooltip>` to no longer wrap content due to accessibility and styling issues. Tooltips are now associated using the `for` attribute + an `id` on the trigger [#123]
- Improved `<wa-spinner>` so it doesn't wobble when zooming in Safari
- Improved submenu selection by implementing the [safe triangle](https://www.smashingmagazine.com/2023/08/better-context-menus-safe-triangles/) method [#1550]
- Improved tabbing in `<wa-tab-group>` so it uses a roving tab index instead of being able to cycle through each tab
- Removed `default` from `<wa-button>` and made `neutral` the new default
- Removed the `circle` modifier from `<wa-button>` because button's no longer have a set height
- Removed the `active-tab-indicator` part from `<wa-tab-group>`
- Removed the `closable` attribute from `<wa-tab>` because you can't nest interactive elements (see the updated example for a better method)
- Removed the `show()` method from `<wa-tab-group>` (use the `active` attribute instead)
- Removed the `show()` and `hide()` methods from `<wa-dialog>` and `<wa-drawer`> (toggle the `open` attribute instead)
- Removed JavaScript-based animation customizations due to high confusion and low usage
- Removed the `wa-request-close` event from `<wa-dialog>` and `<wa-drawer>` (use the `wa-hide` event instead)
- Removed `inline` from `<wa-color-picker>`
- Removed `getFormControls()` since we now use Form Associated Custom Elements and can reliably access Web Awesome Elements via `formElement.elements`.
- Removed `valueAsDate` from `<wa-input>`; use the following to mimic native behaviors:
    setter: `waInput.value = new Date().toLocaleDateString()`
    getter: `new Date(waInput.value)`
- Removed `valueAsNumber` from `<wa-input>`; use the following to mimic native behaviors:
    setter: `waInput.value = 5.toString()`
    getter: `Number(waInput.value)`

Did we miss something? [Let us know!](https://github.com/shoelace-style/webawesome-alpha/discussions)

Are you coming from Shoelace? [The 2.x changelog can be found here.](https://shoelace.style/resources/changelog/)