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

- Fixed a number of broken event listeners throughout the docs

## 3.0.0-alpha.10

- 🚨 BREAKING: updated all components to use native events instead of `wa-` prefixed events. This will allow components to work more like native elements in your code, frameworks, third-party plugins, etc. To update your code, simply remove the prefix from your event listeners for the following events.
  - `wa-input` => `input`
  - `wa-change` => `change`
  - `wa-blur` => `blur` (this event will no longer bubble, use `focusout` for a bubbling version)
  - `wa-focus` => `focus` (this event will no longer bubble, use `focusin` for a bubbling version)
- Added `.wa-callout` utility class
- Added the `orientation` attribute to `<wa-radio-group>` to support vertical and horizontal radio items
- Added docs for visual tests
- Added docs on how to cherry-pick native styles
- Changed the behavior of the `variant` and `size` attributes so that nested components that support these attributes but do not have them set inherit the values set on their ancestors. Additionally:
  - Added `size` attribute to `<wa-dropdown>`, `<wa-button-group>`, `<wa-menu>`, `<wa-rating>`, `<wa-card>`
  - Added `variant` attribute to `<wa-button-group>`
- Fixed a bug in `<wa-tab-group>` that prevented nested tab groups from working properly
- Fixed slot names for `show-password-icon` and `hide-password-icon` in `<wa-input>` to more intuitively represent their functions
- Fixed a bug in `<wa-textarea>` that caused empty controls to submit a value if the initial value was deleted a certain way
- Fixed a bug in `<input>`, `<textarea>`, and `<select>` styles that prevented full-width controls from using 100% width when wrapped in a `<label>`
- Fixed a bug in `<select>` styles that caused the caret to block interactions and prevented the caret from rendering unless wrapped in a `<label>`
- Fixed a bug in `<wa-checkbox>` that caused hints to render inline with the label

## 3.0.0-alpha.9

- Added new themes:
  - Glossy
  - Matter
  - Premium
  - Playful
- Added docs on themes and palettes
- Separated colors and typography out from themes so they can be used independently
- Added test suite to ensure all color palettes provide the color contrast they are supposed to
- Added `.wa-invert` utility class to invert the current color scheme
- Added `:state(blank)` to `<wa-input>`, `<wa-textarea>`, and `<wa-select>` to style form inputs differently when empty.

## 3.0.0-alpha.8

- Simplified the internal structure and CSS properties of `<wa-card>`, removed `base` part.
- Added `appearance` to `<wa-callout>` and `<wa-tag>`
- Fixed a bug in `<wa-switch>` where it would not properly change its "checked" state when its property changed.
- Fixed a bug in `<wa-switch>` where the value would be incorrectly submitted as "on" when a value is provided and the switch is checked
- Fixed a bug in the `wa-split` CSS utility that caused it to behave incorrectly
- Improved performance of `<wa-select>` when using a large number of options
- Updated the Japanese translation

### Theming

- Added new themes:
  - Awesome
  - Active
  - Brutalist
  - Mellow
  - Tailspin
- Renamed `--wa-form-control-resting-color` to `--wa-form-control-border-color` for familiarity and accuracy
- Removed size-based `--wa-form-control-height-*` tokens in favor of `--wa-form-control-height` (see [size utilities](/docs/utilities/size/))
- Updated the `--wa-border-width-*` and `--wa-border-radius-*` scale for better DX
  - Changed the value of `--wa-border-width-scale` to `1` and updated calculations of size-based `--wa-border-width-*` tokens
  - Changed the value of `--wa-border-radius-scale` to `1` and updated calculations of size-based `--wa-border-radius-*` tokens
  - Removed unused `--wa-border-radius-xs` token and `wa-border-radius-xs` utility class
  - Decreased the size of the scale so that `--wa-border-radius-s` is now the smallest border radius token, matching the value of the previous `--wa-border-radius-xs` token
- Updated the `--wa-shadow-*` scales for better DX
  - Changed the value of `--wa-shadow-offset-y-scale` to `1` and updated calculations of size-based `--wa-shadow-offset-y-*` tokens
  - Changed the value of `--wa-shadow-blur-scale` to `1` and updated calculations of size-based `--wa-shadow-blur-*` tokens
  - Changed the value of `--wa-shadow-spread-scale` to `-0.5` and updated calculations of size-based `--wa-shadow-spread-*` tokens
  - Updated calculations of size-based `--wa-shadow-offset-x-*` tokens to match calculations used for other shadow qualities (`--wa-shadow-offset-x-scale` remains `0`)
  - Removed unused `--wa-shadow-xs` token

## 3.0.0-alpha.7

- Renamed applied.css to webawesome.css

## 3.0.0-alpha.6

### Native styles

- Added native styles for
  [buttons](/docs/native/button),
  [input fields](/docs/native/input),
  [dialogs](/docs/native/dialog),
  [details](/docs/native/details),
  [tables](/docs/native/table),
  [lists](/docs/native/lists),
  and most [content elements](/docs/native/content).

### Style utilities

- Added [color variant utilities](/docs/utilities/color/)
- Added [appearance utilities](/docs/utilities/appearance/)
- Added [size utilities](/docs/utilities/size/)
- Added [layout utilities](/docs/layout/#utilities)
- Added [`.wa-visually hidden`](/docs/utilities/a11y/#visually-hidden) utility
- Added [`<wa-page>`](/docs/components/page/#styles) native styles and utilities

### Components

- Removed `<wa-visually-hidden>` in favor of the utility class
- `<wa-page>`: `mobile-breakpoint` now takes any CSS length, not just pixels
- Added `checked` and `disabled` custom states to `<wa-checkbox>` and `<wa-radio>`
- Added `disabled`, `expanded`, `indeterminate`, and `selected` custom states to `<wa-tree-item>`
- Renamed the `navigation-button--previous` and `navigation-button--next` parts to `navigation-button-previous` and `navigation-button-next` in `<wa-carousel>`
- Renamed the `scroll-button--start` and `scroll-button--end` parts to `scroll-button-start` and `scroll-button-end` in `<wa-tab-group>`
- Removed stateful CSS parts in favor of custom states
  - `<wa-checkbox>`: `control--checked`, `control--indeterminate`
  - `<wa-radio>`: `control--checked`
  - `<wa-tree-item>`: `item--disabled`, `item--expanded`, `item--indeterminate`, `item--selected`

## 3.0.0-alpha.5

- Added the Finnish translation
- Added the Italian translation
- Added the Ukrainian translation
- Added support for <kbd>Enter</kbd> to `<wa-split-panel>` to align with ARIA APG's [window splitter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)
- Added more resilient support for lazy loaded options in `<wa-select>`
- Added support for vertical button groups
- Added the `focus()` method to `<wa-radio-group>`
- Fixed a bug in `<wa-dialog>` with scroll locking shifting viewports.
- Fixed a bug in `<wa-dialog>` when using `.show()`
- Fixed a bug in `<wa-rating>` when using `precision`
- Fixed a bug in `<wa-rating>` that allowed tabbing into the rating when readonly
- Fixed a bug in `<wa-relative-time>` where the title attribute would show with redundant info
- Fixed a bug in `<wa-select>` that caused the placeholder to display incorrectly when using placeholder and multiple
- Fixed a bug in `<wa-tooltip>` that caused a memory leak in disconnected elements
- Fixed a bug in `<wa-select>` that prevented label changes in `<wa-option>` from updating the controller
- Fixed a bug in `<wa-carousel>` that caused interactive elements to be activated when dragging
- Fixed a bug in `<wa-tab-group>` that prevented changing tabs by setting `active` on `<wa-tab>` elements
- Fixed a bug in `<wa-tab-group>` that caused an error when removed from the DOM too quickly
- Fixed a bug in `<wa-textarea>` causing scroll jumping when using `resize="auto"`
- Fixed a bug with certain bundlers when using dynamic imports
- Improved alignment of the play icon in `<wa-animated-image>`
- Improved behavior of link buttons to not set `noreferrer noopener` by default
- Updated all checks for directionality to use `this.localize.dir()` instead of `el.matches(:dir(rtl))` so older browsers don't error out

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
- Changed `<wa-tab-group>` to implement a "roving tabindex" and `<wa-tab>` is no longer tabbable by default. This aligns closer to the APG pattern for tabs [#2041]
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
