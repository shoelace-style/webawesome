---
title: Changelog
description: Changes to each version of the project are documented here.
layout: page-outline
---

Web Awesome follows [Semantic Versioning](https://semver.org/). Breaking changes in components with the <wa-badge variant="brand">Stable</wa-badge> badge will not be accepted until the next major version. As such, all contributions must consider the project's roadmap and take this into consideration. Features that are deemed no longer necessary will be deprecated but not removed.

Components with the <wa-badge variant="warning">Experimental</wa-badge> badge should not be used in production. They are made available as release candidates for development and testing purposes. As such, changes to experimental components will not be subject to semantic versioning.

## Next

### New Features {data-no-outline}

- Added `.wa-hover-rows` to native styles to opt-in to highlighting table rows on hover.

### Bug Fixes and Improvements {data-no-outline}

- Fixed a bug in `<wa-dropdown>` that prevented the menu from flipping/shifting to keep the menu in the viewport [discuss:1106]

## 3.0.0-beta.1

We're excited to share the first beta release of Web Awesome, which includes some breaking changes that make the library significantly more intuitive and consistent!

The list looks extensive, but that's because we've tried to be thorough in documenting every change. We expect most users will only encounter a few of these during their upgrade. The majority are simple attribute renames (like clearable becoming with-clear) and component simplifications that actually reduce the amount of code you need to write.

**If you're a Web Awesome alpha user, please read through these release notes carefully!**

Many of these changes and improvements were the direct result of feedback from users like you! These changes represent our commitment to getting the fundamentals right as we move from alpha into a more stable beta release.

### 🚨 Breaking Changes {data-no-outline}

- `input` and `change` events on form controls like `<wa-input>` now are always set to `bubble` and `compose`.
- Greatly simplified how native styles work and removed redundant utilities
  - Removed `.wa-button`, `.wa-callout` classes
  - Removed `themes/native/*.css` files; use `native.css` to opt into native styles
  - Clarified which utilities classes can be applied to which native elements
- Renamed the `classic` theme to `shoelace`
- Removed `:root` selector from all theme, color palette, and semantic color stylesheets except for the default theme and colors. All of these styles are now solely scoped to classes, such as `.wa-theme-awesome`, `.wa-palette-bright`, and `.wa-brand-orange`.
- Removed most custom properties from components that can otherwise be styled with `::part()` selectors and standard CSS properties.
  <<<<<<< HEAD
- `<wa-dropdown>` was reworked and simplified to not use menu, menu item, menu label; use `<wa-dropdown-item>` instead
- Renamed `pulse` attribute in `<wa-badge>` to `attention="pulse"` and added `attention="bounce"` [issue:940]
  > > > > > > > next
- Renamed the `vertical` attribute to `orientation="vertical"` in `<wa-split-panel>` and `<wa-divider>` to align with other components and the platform [issue:674]
- Renamed certain boolean attributes to be consistent using the `with-*` and `without-*` pattern:
  - `<wa-button caret>` => `<wa-button with-caret>`
  - `<wa-color-picker no-format-toggle>` => `<wa-color-picker without-format-toggle>`
  - `<wa-format-number no-grouping>` => `<wa-format-number without-grouping>`
  - `<wa-input no-spin-buttons>` => `<wa-input without-spin-buttons>`
  - `<wa-input clearable>` => `<wa-input with-clear>`
  - `<wa-select clearable>` => `<wa-select with-clear>`
  - `<wa-tab-group no-scroll-controls>` => `<wa-tab-group without-scroll-controls>`
  - `<wa-tag removable>` => `<wa-tag with-remove>`
- Renamed all `prefix` and `suffix` slots to `start` and `end`, affecting the following components:
  - `<wa-breadcrumb-item>`
  - `<wa-button>`
  - `<wa-input>`
  - `<wa-select>`
  - `<wa-option>`
- Removed the extra dash in the `<wa-carousel>` CSS part name `pagination-item--active` => `pagination-item-active`
- Renamed the `eye-dropper-*` parts to `eyedropper` in `<wa-color-picker>`
- removed the `size` attribute from `<wa-card>`; please set the size of child elements on the children directly
- Greatly simplified the sizing strategy across components and utilities
  - Removed `--wa-size`, `--wa-size-smaller`, `--wa-size-larger`, `--wa-space`, `--wa-space-smaller`, and `--wa-space-larger`
  - Added tokens for `--wa-form-control-padding-inline`, `--wa-form-control-padding-block`, and `--wa-form-control-toggle-size`
  - Refactored default `--wa-font-size-*` values to use an apparent 1.125 ratio and round rendered values to the nearest whole pixel
  - Added convenience tokens for `--wa-font-size-smaller` and `--wa-font-size-larger`
  - Updated components to use relative `em` values for internal padding and margin wherever appropriate
- Removed the `hint` property and slot from `<wa-radio>`; please apply hints directly to `<wa-radio-group>` instead
- Redesigned `<wa-slider>` with extensive new functionality
  - Added support for range sliders with dual thumbs using the `range` attribute
  - Added vertical orientation support with `orientation="vertical"`
  - Added visual markers at each step with `with-markers`
  - Added contextual reference labels with the `reference` slot
  - Added tooltips showing current values with `with-tooltip`
  - Added customizable indicator offset with `indicator-offset` attribute
  - Added value formatting support with the `valueFormatter` property
  - Improved the styling API to be consistent and more powerful (no more browser-specific selectors and pseudo elements to style)
  - Updated to use consistent `with-*` attribute naming pattern
- Reworked `<wa-select>` to use `<wa-option selected>` to set initially selected options, removing the "no spaces allowed" restrictions for option values

### New Features {data-no-outline}

- Added a new free component: `<wa-popover>` (#2 of 14 per stretch goals)
- Added a new free component: `<wa-zoomable-frame>` (#3 of 14 per stretch goals)
- Added a `min-block-size` to `<wa-divider orientation="vertical">` to ensure the divider is visible regardless of container height
- Added support for `name` in `<wa-details>` for exclusively opening one in a group
- Added `--checked-icon-scale` to `<wa-checkbox>`
- Added `--tag-max-size` to `<wa-select>` when using `multiple`
- Added support for `data-dialog="open <id>"` to `<wa-dialog>`
- Added support for `data-drawer="open <id>"` to `<wa-drawer>`
- Added `@media (hover: hover)` to component hover styles to prevent sticky hover states
- Added the ability to use `<wa-radio-group disabled>` to disable all radios in the group

### Bug Fixes and Improvements {data-no-outline}

- Fixed a bug in `<wa-radio-group>` that caused radios to uncheck when assigning a numeric value
- Fixed `<wa-button-group>` so dividers properly show between buttons
- Fixed the tooltip position in `<wa-slider>` when using RTL
- Fixed a bug in `<wa-details>` and native `<details>` styles that made the summary hard to click
- Fixed a handful of bugs unify form control height across components and native elements
- Fixed a bug where `input` events from components weren't bubbling
- Improved CSS utilities and Native Styles to use [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) for easier end user customization (no more specificity conflicts — your CSS wins!)
- Improved native `<button>` styles to properly space icons
- Improved button appearances in `<wa-color-picker>`
- Improved `<wa-rating>` to have more accessible icons by default

### Removals {data-no-outline}

- Removed the experimental `<wa-code-demo>` component
- `<wa-menu>`, `<wa-menu-item>`, `<wa-menu-label>` were dropped; use `<wa-dropdown-item>` instead
- `<wa-icon-button>` was removed; icon buttons can be added via `<wa-button>` now
- `<wa-radio-button>` was dropped; use `<wa-radio appearance="button">` instead

<details>
<summary>Alpha Changelogs</summary>

## 3.0.0-alpha.13

- 🚨 BREAKING: Renamed `<image-comparer>` to `<wa-comparison>` and improved compatibility for non-image content
- 🚨 BREAKING: Added slot detection to `<wa-dialog>` and `<wa-drawer>` so you don't need to specify `with-header` and `with-footer`; headers are on by default now, but you can use the `without-header` attribute to turn them off
- 🚨 BREAKING: Renamed the `image` slot to `media` for a more appropriate naming convention
- Added [a theme builder](/docs/themes/edit/) to create your own themes
- Added a new Blog & News pattern category
- Added a new free component: `<wa-scroller>` (#1 of 14 per stretch goals)
- Added support for Duotone Thin, Light, and Regular styles and the Sharp Duotone family of styles to `<wa-icon>`
- Added a default `gap` to `<wa-tag>` for better default spacing when used with icons
- Fixed a bug that caused `<wa-radio-group>` to have an undesired margin below it
- Fixed a bug in the Matter theme that prevented clicks on form control labels to not focus the control
- Fixed a bug in `<wa-select>` that caused incorrect spacing of icons
- Fixed a bug in `<wa-select>` that caused the listbox to now show after being disabled
- Fixed a bug in `<wa-radio-group>` that prevented radio buttons from validating
- Improved native radio alignment
- Improved the `.wa-cloak` utility class so all FOUCE-related solutions are 100% opt-in

## 3.0.0-alpha.12

### Enhancements {data-no-outline}

- Added `appearance` to [`<wa-details>`](/docs/components/details) and [`<wa-card>`](/docs/components/card) and support for the [appearance utilities](/docs/utilities/appearance/) in the [`<details>` native styles](/docs/utilities/native/details).
- Added an `orange` scale to all color palettes
- Added the [`.wa-cloak` utility](/docs/utilities/fouce) to prevent FOUCE
- Added the [`allDefined()` utility](/docs/usage/#all-defined) for awaiting component registration
- Simplified `<wa-breadcrumb-item>` by removing the `base` CSS part
- Simplified `<wa-menu-item>` and `<wa-menu-label>` by removing the `base` CSS part
- Added slots to `checked-icon` and `submenu-icon` in `<wa-menu-item>` so custom icons can be used

### Bug fixes {data-no-outline}

- Specifying inherited CSS properties on `<wa-tooltip>` now works as expected ([thanks Dennis!](https://github.com/shoelace-style/webawesome-alpha/discussions/203))
- Fixed a bug in `<wa-select>` that made it hard to use with VueJS, Svelte, and many other frameworks
- Fixed a bug in `<wa-select multiple>` that sometimes resulted in empty `<div>` elements being output
- Fixed a bug where changing a `<wa-option>` label wouldn't update the display label in `<wa-select>`
- Added default spacing to icons slotted into `<wa-tab>`
- Lots of fixes around pill-shaped elements:
  - Fixed the `wa-pill` class for text fields
  - Fixed `pill` style for `<wa-input>` and `<wa-radio-button>` elements
- Fixed a bug in `<wa-radio-button>` that prevented active buttons from receiving the correct styles
- Fixed a bug in `<wa-button>` that prevented the focus ring from showing in Safari
- Fixed alignment of `<wa-dropdown>` inside button groups
- Removed close watcher logic to backdrop hide animation bugs in `<wa-dialog>` and `<wa-drawer>`; this logic is already handled and we'll revisit `CloseWatcher` when browser support is better and behaviors are consistent
- Revert `<wa-dialog>` structure and CSS to fix clipped content in dialogs (WA-A #123) and light dismiss in iOS Safari (WA-A #201)
- Fixed a bug in `<wa-color-picker>` that prevented light dismiss from working when clicking immediately above the color picker dropdown
- Fixed a bug in `<wa-progress>` that prevented Safari from animation progress changes
- Fixed the missing indeterminate icon in [native checkbox styles](/docs/utilities/native/checkbox)
- Fixed a bug in `<wa-radio>` where elements would stack instead of display inline
- Docs fixes:
  - Fixed the search dialog's styles so it doesn't jump around as you search
  - Theme cards now have icons

## 3.0.0-alpha.11

### Color Palettes {data-no-outline}

- Color palette tweaking UI. Tweak hue, grays, overall colorfulness, save or share the results.
- Added a `pink` scale to all color palettes
- Tweaked hues of all color palettes to make them more distinct and make their hues more intentional
- Dropped `violet` and `teal`, instead using `purple` and `cyan` (this is not just a renaming, the colors have been adjusted too).
- Fixed a bug in `<wa-switch>` that caused tooltips to work incorrectly when toggling the switch

### Design Tokens {data-no-outline}

- Added `--wa-color-[hue]` tokens with the "core" color of each scale, regardless of which tint it lives on.
  You can find them in the first column of each color palette.

### Themes {data-no-outline}

- Improved UI for theme remixing:
  - You can now override the brand color of any theme with any of the 9 hues supported.
  - Rich previews
  - Generated copyable code snippets.
  - Permalinks
- Updated Active, Glossy, Playful, and Premium themes so that `--wa-color-brand-fill-loud` uses the core color of the chosen brand color, regardless of tint.

### Components {data-no-outline}

#### `<wa-radio>`

- Dropped the `base` part. It can now be styled by directly applying CSS to the element itself.
- Added `hint` attribute and corresponding slot.

#### `<wa-select>`

- Added the `tag` part (and associated exported parts) to `<wa-select>` to allow targeting the tag that shows when more than the max number of visible items have been selected
- Fixed a bug that prevented the placeholder color from being customized with the `--wa-form-control-placeholder-color` token
- Fixed an incorrect CSS value in the expand icon
- Fixed a bug that prevented the description from being read by screen readers

#### `<wa-option>`

- `label` attribute to override the generated label (useful for rich content)
- `defaultLabel` property
- Dropped `getTextLabel()` method (if you need dynamic labels, just set the `label` attribute dynamically)
- Dropped `base` part for easier styling. CSS can now be applied directly to the element itself.

#### `<wa-menu-item>`

- `label` attribute to override the generated label (useful for rich content)
- `defaultLabel` property
- Dropped `getTextLabel()` method (if you need dynamic labels, just set the `label` attribute dynamically)

#### `<wa-card>`

- Fixed a bug where child elements did not have correct rounding when headers and footers were absent.
- Re-introduced `--border-color` so that the card itself can have a different border color than its inner borders.
- Fixed a bug that prevented slots from showing automatically without `with-` attributes

#### `<wa-tab>`

- Fixed a bug that caused `document.createElement('wa-tab')` to fail (which also meant it could not be used in VueJS and other frameworks)

### Docs {data-no-outline}

- Added an orientation example to the native radio docs
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

### Theming {data-no-outline}

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

### Native styles {data-no-outline}

- Added native styles for
  [buttons](/docs/utilities/native/button),
  [input fields](/docs/utilities/native/input),
  [dialogs](/docs/utilities/native/dialog),
  [details](/docs/utilities/native/details),
  [tables](/docs/utilities/native/table),
  [lists](/docs/utilities/native/lists),
  and most [content elements](/docs/utilities/native/content).

### Style utilities {data-no-outline}

- Added [color variant utilities](/docs/utilities/color/)
- Added [appearance utilities](/docs/utilities/appearance/)
- Added [size utilities](/docs/utilities/size/)
- Added [layout utilities](/docs/layout/#utilities)
- Added [`.wa-visually hidden`](/docs/utilities/a11y/#visually-hidden) utility
- Added [`<wa-page>`](/docs/components/page/#styles) native styles and utilities

### Components {data-no-outline}

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

</details>

Did we miss something? [Let us know!](https://github.com/shoelace-style/webawesome-alpha/discussions)
