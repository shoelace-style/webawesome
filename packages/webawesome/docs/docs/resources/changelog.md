---
title: Changelog
description: Changes to each version of the project are documented here.
layout: page-outline
---

{% from "macros/component-badges.njk" import statusBadge %}

Web Awesome follows <a href="https://semver.org/" class="appearance-plain">Semantic Versioning</a>, and each release on this page follows the <a href="https://keepachangelog.com/" class="appearance-plain">Keep a Changelog</a> convention. Additionally, both [components](/docs/components) and features carry a status badge that tells you what to expect from their API.

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>What to Expect</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{{ statusBadge('stable') }}</td>
      <td>A settled API you can build on. Breaking changes land only in major releases, and anything deprecated stays available through the next major version. Safe for production.</td>
    </tr>
    <tr>
      <td>{{ statusBadge('experimental') }}</td>
      <td>Still taking shape. The API can change in any minor release, so it's ideal for prototyping — but risky for production code you can't easily update.</td>
    </tr>
  </tbody>
</table>

{% include "changelog-email-signup.njk" %}

## Unreleased

:::added

- Added the experimental `<wa-random-content>` component, which randomly shows one or more of its children — handy for rotating testimonials, tips, or featured content
- Added the Mosaic, Pixel, Vellum, Slab Duo, and Slab Press Duo Pro+ icon families to `<wa-icon>` [pr:2562]
- Added the `buzz`, `flip-360`, `float`, `jello`, `spin-snap`, `spin-snap-4`, `spin-snap-8`, `swing`, and `wag` animations to `<wa-icon>` [pr:2562]
- Added the `canvas` attribute to `<wa-icon>` for choosing the icon canvas — `fixed` (default), `auto`, `square`, or `roomy` [pr:2562]

:::

:::fixed

- Fixed a type issue in `<wa-checkbox>` that caused the `name` property to have an incorrect type. [pr:2568]
- Fixed a bug in `<wa-page>` causing the viewport to always overflow if a footer was present. [pr:2537]
- Fixed a bug in `wa-video` that was causing the `z-index` to leak out of the context of the component [issue:2542]
- Fixed a bug in `<wa-chart>` and its variants that threw a `DataCloneError` when the Chart.js config contained functions, such as tooltip or scale callbacks
- Fixed a bug in `<wa-date-input>` and `<wa-time-input>` where an empty `start`/`end` slot added a phantom gap causing it to be misaligned with other form controls [issue:2527]
- Fixed a bug in `<wa-select>` that prevented the dropdown menu from scrolling when using the keyboard [issue:2472]
- Fixed a bug in `<wa-carousel>` that caused the pagination controls to clip vertically by adding block padding around them [issue:2495]
- Fixed a bug in `<wa-carousel>` with `loop` enabled that displayed the wrong slide, briefly flashing it on load, when the carousel was initialized inside a hidden container such as an inactive tab panel [issue:1163]
- Fixed component API tables in the `webawesome` Agent Skill by generating them from the CEM instead of scraping the rendered HTML [issue:2475]
- Fixed a bug in `<wa-known-date>` that showed validation errors while typing instead of on form submission like other form controls
- Fixed a bug in `<wa-known-date>` where the validation tooltip always pointed to the first input regardless of which one was invalid
- Fixed a bug in `<wa-toast-item>` where the documented `--padding` custom property was unused in component styles
- Aligned the `start` and `end` slot region in `<wa-date-input>` and `<wa-time-input>` with `<wa-input>` and `<wa-select>`
  - The trailing calendar/clock and clear icons no longer sit a few pixels inward of where the other controls place them
  - The `start` and `end` slots now use the same spacing as the other controls instead of a tighter gap

:::

:::changed

- Synced `<wa-option>` visuals with `<wa-dropdown-item>` so options and menu items read as the same primitive [issue:2413]
  - `<wa-option>` now uses rounded corners and sits inset within `<wa-select>`'s listbox, with spacing between options
  - The current (keyboard-highlighted) state now uses `--wa-form-control-activated-color` for its background and a new `--current-text-color` custom property for its text, so options track form control theming alongside `<wa-checkbox>`, `<wa-radio>`, `<wa-switch>`, and `<wa-slider>`
  - Hover and current state changes now animate, matching `<wa-dropdown-item>`
- Reordered component reference pages in the `webawesome` Agent Skill to put the import instructions and API tables before the examples
- Rewrote `prose.css` rules with `@scope` so that `wa-prose` and `wa-not-prose` classes are proximity aware. This ensures that nested instances of either class work as expected, no matter the nesting depth. [pr:2564]
- Updated `<wa-icon>` to use [Font Awesome 7.3.0](https://fontawesome.com/changelog#v7-3-0) [pr:2562]
- Aligned `<wa-icon>` animation defaults with Font Awesome 7.3.0 — `flip`, `shake`, `fade`, and `beat-fade` use updated timing, duration, and keyframes [pr:2562]

:::

:::deprecated

- Deprecated the `auto-width` attribute on `<wa-icon>` in favor of `canvas="auto"` [pr:2562]

:::

## 3.9.0

<small><time datetime="2026-06-18">June 18th, 2026</time></small>

:::added

- Added a `dist/ssr/all.js` endpoint for making SSR integration easier. Scoped under `/ssr` to make it clear this file is intended for _servers_ as importing everything on the client is heavy, and instead users should cherry-pick client imports. [pr:2520]
- Added a `webawesome-design` [Agent Skill](/docs/ai/agent-skills) that teaches AI tools how to design with Web Awesome
- Added a `choosing-components` decision tree to the `webawesome` Agent Skill so AI tools pick the right component by intent instead of guessing from names
- Added `npm run verify:skills` (also wired into `npm run verify`) that cross-checks Agent Skill content against the Custom Elements Manifest so silent drift can't ship
- Added the `<wa-checkbox-group>` component [pr:2514]
- Added `leaf-multiple` as a new `selection` option for `<wa-tree>`, allowing multiple leaf nodes to be selected while parent nodes only expand and collapse. [pr:2486]
- Added support for grouping native `<button>` elements in `<wa-button-group>` when Native Styles are included [issue:2510] [pr:2515]

:::

:::fixed

- Fixed a bug in SSR polyfills for the style property. This fixes `<wa-progress-bar>` not properly serializing on the server. [pr:2517]
- Fixed a bug in `<wa-color-picker>` where initial values in SSR would not be set properly. [pr:2517]
- Fixed a bug in `<wa-video>` where setting the `hidden` attribute would not hide it causing `<wa-video-playlist>` to show multiple videos at once. [pr:2501]
- Fixed a race condition with `<wa-accordion>` and `<wa-accordion-item>` causing a hydration mismatch in SSR [pr:2501]
- Fixed a bug in `<wa-checkbox>` and `<wa-switch>` where `.checked` property would not properly update the shadow dom checkbox. [pr:2481]
- Fixed a bug where `@lit-labs/ssr` was not included as a dependency. [pr:2501]
- Fixed a bug in `<wa-button>` where the slotted icon was rendered off-center at `size="xs"` in Firefox [issue:2426] [pr:2467]
- Fixed a bug in `<wa-tooltip>` that caused the tooltip to hide when hovering over HTML content [pr:2512]

:::

:::changed

- Synced default `--show-duration`, `--hide-duration`, and `--easing` values in `<wa-accordion-item>`, `<wa-date-input>`, `<wa-time-input>`, `<wa-toast>`, and `<wa-video>` with `--wa-transition-*` tokens [pr:2485]
- Updated Native Styles so that `<th>` borders only apply to column headers [pr:2492]
- Removed `wa-prose`'s top margin on `h1` elements that follow a sibling

:::

:::removed

- Removed `--wa-accordion-divider-color` from `<wa-accordion-item>` due to improper scope and limited usage [pr:2491]

:::

## 3.8.0

<small><time datetime="2026-06-05">June 5th, 2026</time></small>

:::added

- Added experimental SSR support to all Web Awesome components in free and pro. [pr:2428]
- Added the `<wa-date-input>` experimental pro component
- Added the `<wa-date-picker>` experimental pro component
- Added the `<wa-known-date>` experimental component
- Added the `<wa-time-input>` experimental component
- Added the experimental `<wa-accordion>` and `<wa-accordion-item>` components [pr:2434]
- Added the ability to set a centered image for `<wa-qr-code>` and have different corner colors [pr:2139]
- Added the `capture` attribute to `<wa-file-input>` for capturing media directly from a device's camera or microphone [discuss:2380]
- Added the `wa-text-uppercase` text utility class for transforming text to uppercase [pr:2404]
- Added the `wa-text-lowercase` text utility class for transforming text to lowercase [pr:2404]
- Added the `wa-text-capitalize` text utility class for capitalizing the first letter of each word [pr:2404]
- Added the `wa-text-start` text utility class for logical (direction-aware) text alignment [pr:2403]
- Added the `wa-text-center` text utility class for centered text alignment [pr:2403]
- Added the `wa-text-end` text utility class for logical (direction-aware) text alignment [pr:2403]
- Added the `wa-text-justify` text utility class for justified text alignment [pr:2403]
- Added the `wa-prose` utility class for applying typographic rhythm to long-form content (docs, blog posts, marketing copy) [pr:2370]

:::

:::fixed

- Fixed a bug in `<wa-dialog>` and `<wa-drawer>` where it would not correctly capture `slotchange` event for footers. [pr:2428]
- Fixed a bug in `<wa-zoomable-frame>` where it was not importing `<wa-icon>` [pr:2457]
- Fixed a bug in `<wa-video>` where the `timeupdate` method was not emitting when seeking or scrubbing the timeline [issue:2393]
- Fixed a bug in `<wa-breadcrumb-item>` where `href=""` rendered as a button instead of a link, making it harder to follow the [WAI-ARIA breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) for the current-page item [issue:2387]
- Fixed a regression in `<wa-breadcrumb-item>` that caused items without an `href` to render as a link instead of a button [pr:2400]
- Fixed a regression in `<wa-popover>` where the body's viewport-edge margin caused the popover and arrow to be misaligned for `top/bottom-start` and `top/bottom-end` placements
- Fixed a bug in `<wa-textarea>` where the disabled state had no visual styling, unlike other form controls [issue:2416]
- Fixed a bug in `<wa-icon>` that caused some FA icons to not render based on `currentColor`
- Fixed default show/hide animations in `<wa-dropdown>`, `<wa-popup>`, `<wa-popover>`, `<wa-select>`, `<wa-details>`, `<wa-dialog>`, `<wa-drawer>`, and `<wa-tree-item>` to honor `prefers-reduced-motion: reduce`
- Fixed a bug in `<wa-drawer>` that caused the `light-dismiss` option not work as intended [pr:2437]
- Fixed a bug in `<wa-dropdown>` that prevented items from being visible when the selected overflowed [pr:2430]
- Fixed a bug in `<wa-carousel>` that prevented the carousel from smoothly snapping back into position when using with the mouse [issue:1103] [pr:2394]
- Fixed a bug in `<wa-page>` where a custom navigation toggle placed in the `navigation-toggle` slot was not detected, due to an internal selector referencing a non-existent slot name

:::

:::changed

- Updated from `qr-creator` to `@konnorr/qr-creator` NPM package to facilitate `<wa-qr-code>` improvements. [pr:2139]
- Synced default `--show-duration` and `--hide-duration` values in `<wa-dropdown>`, `<wa-popup>`, `<wa-popover>`, `<wa-select>`, `<wa-combobox>`, `<wa-details>`, `<wa-dialog>`, `<wa-drawer>`, `<wa-tree-item>`, and `<wa-toast-item>` with `--wa-transition-fast` and `--wa-transition-normal` tokens [pr:2423]
- Synced hardcoded transitions in `<wa-copy-button>`, `<wa-select>`, `<wa-combobox>`, and `<wa-toast-item>` with `--wa-transition-*` tokens [pr:2427]
- Improved the vertical placement of content within `<wa-textarea>` and `textarea` when the content overflows the control [pr:2424]
- Updated Native Styles for several text elements [pr:2459]:
  - Updated `<blockquote>` to use a quiet text color and a font-size based on `--wa-font-size-larger`
  - Updated `<h6>` to use `--wa-font-size-xs`, further distinguishing small headings from surrounding body text
  - Updated `<table>` to use `font-variant-numeric: tabular-nums` so numeric columns align
  - Updated `<th>` to render a visually stronger bottom border, distinguishing the header row from body cells
  - Added `<figcaption>` (previously unstyled): quiet text color, smaller font-size, condensed line-height, and a small top margin
  - Added `<ul>` and `<ol>` markers using `currentColor` with reduced opacity; `<ol>` markers retain more contrast since numerals are text rather than graphical elements
- Added Native Styles for `<menu>` (previously unstyled) to reset `list-style`, `margin`, and `padding` [discuss:2436] [pr:2450]
- Renamed `wa-text-wrap-nowrap`, `wa-text-wrap-balance`, and `wa-text-wrap-pretty` to `wa-text-nowrap`, `wa-text-balance`, and `wa-text-pretty` to align with the flat `wa-text-*` utility namespace. The original class names continue to work as aliases. [pr:2403]

:::

:::deprecated

- Deprecated `wa-text-wrap-nowrap`, `wa-text-wrap-balance`, and `wa-text-wrap-pretty` in favor of their shorter `wa-text-*` equivalents. The original names still work but will be removed in a future major version.

:::

## 3.7.0

<small><time datetime="2026-05-12">May 12, 2026</time></small>

:::added

- Added two new experimental components: `<wa-video>` and `<wa-video-playlist>`
- Added `--wa-button-transform-hover` and `--wa-button-transform-active` design tokens [pr:2360]
- Added the `wa-text-wrap-nowrap` text utility class for preventing text from wrapping [pr:2365]
- Added the `wa-text-wrap-balance` text utility class for evenly distributing text across lines [pr:2365]
- Added the `wa-text-wrap-pretty` text utility class for avoiding orphaned words on the last line (not supported in Firefox) [pr:2365]

:::

:::fixed

- Fixed a bug in `<wa-textarea>` with `resize="auto"` where the height stayed collapsed when the textarea was initially hidden [issue:2347] [pr:2356]
- Fixed a bug in `<wa-button-group>` that caused single buttons to not have the correct border radius [issue:2367] [pr:2371]
- Fixed a bug in `<wa-switch>` that showed the switch direction backwards in RTL [pr:2330]
- Fixed a bug in `<wa-popover>` where the popover would overflow the viewport on narrow screens [issue:2333] [pr:2375]
- Fixed a bug in `<wa-radio-group>` where the label was vertically offset by a few pixels compared to other form control labels [issue:2334] [pr:2374]
- Fixed a bug in `<wa-badge>` that caused the height to differ slightly when icons were present in the `start` or `end` slot [issue:2280] [pr:2377]
- Fixed a bug in `<wa-toast>` that prevented notifications from being read properly in certain screen readers [issue:2282]
- Fixed a Playful theme bug where modifier classes (e.g. `wa-filled`) didn't apply to native button elements

:::

:::changed

- Updated `--wa-color-mix-hover` and `--wa-color-mix-active` values for all themes for better hover and active feedback [pr:2360]
- Upgraded the `<wa-copy-button>` component from _experimental_ to _stable_ [pr:2343]
  - Added support for custom buttons
  - Added `tooltip` attribute to control when feedback is shown in the tooltip on hover and click

:::

## 3.6.0

<small><time datetime="2026-04-30">April 30, 2026</time></small>

:::added

- Added a `:::pro` callout variant in the docs that renders with the same orange/white styling as the Pro badge [pr:2386]
- Added `xs` and `xl` sizes for all form controls and sized components [pr:2319]
  - Deprecated `small`, `medium`, and `large` in favor of `s`, `m`, and `l` (old values will continue to work in 3.x)
- Added `beforeinput` event to `<wa-number-input>` stepper buttons so value changes can be cancelled with `event.preventDefault()` [issue:2296] [pr:2310]
- Added the `--backdrop-filter` CSS custom property to `<wa-dialog>` and `<wa-drawer>` for applying filters such as `blur()` to the backdrop

:::

:::fixed

- Fixed a bug in `<wa-checkbox>` where the `value` property returned `null` instead of `'on'` when unchecked
- Fixed a bug in `<wa-rating>` where disabling via a `<fieldset>` did not properly restore the enabled state when the fieldset was re-enabled
- Fixed a bug in `<wa-zoomable-frame>` where zoom control buttons did not properly update their disabled state after zoom levels were parsed
- Fixed a bug in `<wa-button>` where icon-only buttons with `with-caret` were sized as a square, causing the caret to overflow
- Fixed a bug in `<wa-checkbox>` where the `aria-checked` attribute was not set to `mixed` when the checkbox was indeterminate
- Fixed a bug in `<wa-file-input>` that incorrectly exposed a `file-icon` slot that never worked as described [issue:2294]
- Fixed React imports to point directly to each component's `index.js` file [issue:2293]
- Fixed a bug in `<wa-dropdown-item>` where disabled items in a submenu showed a pointer cursor instead of the default cursor [issue:2276]
- Fixed a bug in `<wa-dropdown-item>` where items with an open submenu did not show a selection state
- Fixed a bug in `<wa-input>` and `<wa-number-input>` where invalid values for `number`, `date`, `time`, and `datetime-local` types were preserved instead of being sanitized to an empty string like the native input
- Fixed a bug where `<wa-dropdown-item>` was erroneously listed as experimental
- Fixed `<pre>` border radius in Native Styles so it correctly uses the `--wa-panel-border-radius` token like similar elements

:::

:::changed

- Refactored component tests across core and pro packages to follow a consistent structure with improved coverage
- Replaced the tooltip in the experimental `<wa-copy-button>` with a built-in feedback popup that works with default and custom triggers
  - Added the `feedback-placement` attribute to replace `tooltip-placement`
  - Added the `feedback` CSS part
  - Removed the `tooltip-placement` attribute and the related `tooltip__*` parts
- Upgraded the following components from _experimental_ to _stable_: `<wa-bar-chart>`, `<wa-bubble-chart>`, `<wa-chart>`, `<wa-combobox>`, `<wa-doughnut-chart>`, `<wa-file-input>`, `<wa-line-chart>`, `<wa-copy-button>`, `<wa-number-input>`, `<wa-pie-chart>`, `<wa-polar-area-chart>`, `<wa-radar-chart>`, `<wa-scatter-chart>`, `<wa-sparkline>`, `<wa-toast>`, and `<wa-toast-item>`
- Updated `@shoelace-style/localize` to 3.2.2 to prevent Chrome translations from throwing errors [issue:2322]
- Updated TypeScript to 5.9.3

:::

## 3.5.0

<small><time datetime="2026-04-03">April 3, 2026</time></small>

:::added

- Moved `<wa-page>` from pro to core [pr:2244]
- Added a new core experimental component: `<wa-markdown>` (#6 of 14 per stretch goals) [pr:2170]
- Added the `data-wa-preload` attribute for preloading components that aren't on the page yet when using the autoloader [issue:1501] [pr:2238]
- Added `placement` attribute to `<wa-color-picker>` [issue:2099]
- Added form association to `<wa-rating>` [pr:2215]
- Added a default slot to `<wa-copy-button>` so users can provide custom buttons [issue:1327]
- Added `:state(success)` and `:state(error)` CSS custom states to `<wa-copy-button>` for styling feedback on custom triggers
- Added the `disabled`, `icon-button`, `link`, and `loading` custom states to `<wa-button>` [discuss:2185] [pr:2214]
- Added the `disabled` custom state to `<wa-option>` so the disabled style applies when using the property [issue:1997]
- Added the `with-count` attribute to `<wa-textarea>` to show a character count below the textarea [pr:2236]

:::

:::fixed

- Fixed a bug in the native styles utility where `<select>` text could overlap the caret icon when the selected option had a long name
- Fixed a bug in the native styles utility where `<select multiple>` did not expand to show multiple options
- Fixed a bug in `<wa-badge>` where `role` was incorrectly set on a `<slot>` element, which is not allowed per spec [issue:2163]
- Fixed a bug in `<wa-toast-item>` where the progress ring's continuously updating value was announced by screen readers [issue:2126]
- Fixed a bug in `<wa-spinner>` where the `--track-width` custom property was not being applied to the track and indicator properly [issue:1317]
- Fixed a bug in form controls where the focus ring would flash white in dark mode in Firefox due to the browser transitioning from the system outline color [issue:2074]
- Fixed a bug in `<wa-dropdown>` where heading colors in the menu used `!important`, preventing users from overriding them with light DOM styles [issue:2102]
- Fixed a bug in `<wa-select>` where the `:state(blank)` custom state was incorrectly applied when the selected option had an empty string value [issue:1920]
- Fixed a bug in `<wa-dropdown-item>` where the `click` event could still fire when the item was disabled [issue:1817]
- Fixed a bug in `<wa-select>`, `<wa-combobox>`, and `<wa-option>` where the `change` and `input` events could dispatch with incorrect timing [pr:2243]
- Fixed a bug in `<wa-drawer>` that threw an error when including Web Awesome in the `<head>` [discuss:2241]
- Fixed Lit dev mode "change-in-update" warnings across multiple components [issue:1269] [pr:2161]
- Fixed a bug in Native Styles where text would incorrectly overflow in `<pre>` elements
- Fixed a bug in `<wa-details>` where rapid toggling of the open state could cause the content visibility to get out of sync with the open attribute
- Fixed a bug in `<wa-tree-item>` where rapid clicking on the expand button could cause the expand/collapse indicator to get out of sync with the children visibility
- Fixed a bug in `<wa-select>` and `<wa-combobox>` where the selected value was not displayed when the value property was set before options were added to the DOM [pr:2253]
- Fixed a bug in `<wa-carousel>` where slide contents were not interactive when the carousel was initially rendered inside a hidden container (e.g., an inactive tab panel). [pr:2133]

:::

:::changed

- Updated the Awesome and Shoelace themes [pr:2135]:
  - Adds missing `<input type="range">` overrides to Shoelace theme to match `<wa-slider>`
  - Adds `<wa-combobox>` overrides to both themes to match other text-based inputs
  - Fixed a bug in the Awesome theme to remove an erroneous `transform` property from `<wa-radio>`s with `appearance="button"` [issue:1766]
  - Fixed a bug in the Shoelace theme where `size` had no effect on `<wa-callout>`
  - Fixed a bug in both themes where `appearance` had no effect on `<wa-card>`
  - Updated Awesome theme `--wa-form-control-padding-block` and `--wa-form-control-padding-inline` to better match its source material ({{ site.siblings.fontAwesome.name }})
  - Updated Shoelace theme `--wa-color-focus` and focus styles to better match its source material (Shoelace)
- Improved the accessibility of `<wa-rating>` by moving role and ARIA attributes to the host element [issue:2205]
- Improved performance of `<wa-textarea>` by only creating a resize observer when necessary
- Improved SSR compatibility by adding server-side rendering guards to components that use browser-only APIs [pr:2237]

:::

## 3.4.0

<small><time datetime="2026-03-25">March 25, 2026</time></small>

:::added

- Added `--wa-space-5xl` design token to all themes [issue:1606] [pr:2153]
- Added `wa-gap-5xl` utility class [issue:1606] [pr:2153]
- Added `wa-gap-4xl` to the gap utility `:where()` selector [pr:2153]
- Added `--wa-font-size-3xs` and `--wa-font-size-5xl` design tokens [issue:1606] [pr:2154]
- Added `*-3xs` and `*-5xl` to `wa-font-size`, `wa-body`, `wa-heading`, `wa-caption`, and `wa-longform` utility classes [issue:1606] [pr:2154]
- Added support for labeled swatches in `<wa-color-picker>` by accepting an array of `{ color, label }` objects via the `swatches` property, improving screen reader accessibility [pr:2164]
- Added the ability to return promises from icon resolvers [discuss:2144] [pr:2152]

:::

:::fixed

- Fixed a bug in `<wa-dropdown-item>` where `aria-checked` was incorrectly set on items when `type` was not `checkbox` [pr:2180]
- Fixed `<wa-badge>` font size to use `--wa-font-size-3xs` now that the token is available [pr:2162]
- Fixed the off-centered position of indent guides in `<wa-tree>`
- Fixed slider styling when using the `label` slot so that it matches attribute use. [issue:2124]
- Fixed a bug in `<wa-scroller>` that caused horizontal page overflow in Chrome when containing wide content such as tables
- Fixed a bug in `<wa-details>` and native `<details>` that caused full-width elements to overflow the details content [issue:2137]
- Fixed a bug in `<wa-slider>` that introduced a `required` attribute which isn't valid on range elements [issue:1471]
- Fixed horizontal layout styles in `<wa-card>` that used invalid or non-matching `::slotted()` selectors for the body and actions regions [pr:2198]
- Fixed the `autocorrect` property type in `<wa-input>` and `<wa-combobox>` to use `boolean` instead of a string union
- Fixed a bug in `<wa-dropdown-item>` that caused descenders to get clipped at certain line heights [issue:2207]
- Fixed a bug in `<wa-number-input>` where pressing stepper buttons on a touch device would show the virtual keyboard and shift the page
- Fixed a bug in `<wa-select>` which caused it to not be clearable with initial values set [pr:2141]

:::

:::changed

- Improved `<wa-tree>` and `<wa-tree-item>` so all internal dimensions (labels, checkboxes, expand buttons, etc.) scale proportionally with `font-size`, making it easy to resize the tree [discuss:2147]
- Improved `<wa-combobox>` [pr:2166]
  - Added `autocapitalize`, `autocorrect`, `enterkeyhint`, `inputmode`, and `spellcheck` properties to `<wa-combobox>` to support virtual keyboard customization [pr:2200]
  - Added `allow-create` attribute to `<wa-combobox>` that lets users create new options on the fly. When typing text that doesn't match any existing option, a "Create [value]" option appears. Selecting it adds a real `<wa-option>` to the DOM. Fires a cancelable `wa-create` event for custom handling.
  - Added `input` event dispatching to `<wa-combobox>` when the user types, matching the behavior of `<wa-input>` and native form controls
  - Fixed a bug in `<wa-combobox>` where custom values were not committed on blur when `allow-custom-value` was set
  - Fixed a bug in `<wa-combobox>` where clearing the input and blurring would restore the previous selection instead of clearing the value
  - Removed the `autocomplete` property from `<wa-combobox>` since it conflicted with the native HTML attribute
- Improved `<wa-select>`, `<wa-combobox>`, and `<wa-option>` performance with large numbers of options by batching slot changes, caching options, and lazily rendering check icons
- Improved `<wa-card>`: the `body` part wraps the default slot in a container instead of on the slot, preserving normal slot display and accessibility [pr:2198]
- Improved `<wa-tab-group>`: the `body` part wraps the default slot in a container instead of on the slot, consistent with `<wa-dialog>` and `<wa-card>` [pr:2212]
- Updated `<wa-zoomable-frame>` with an opt-in attribute for theme syncing [pr:2165]
- [Docs]: Updated space, gap, stack, and cluster documentation for the new tokens and utilities [issue:1606]
- [Docs]: Updated typography and text documentation for the new tokens and utilities [issue:1606]

:::

## 3.3.1

<small><time datetime="2026-03-04">March 4, 2026</time></small>

:::removed

- Removed a `preinstall` script in `webawesome-pro` that was causing issues in some package managers.

:::

## 3.3.0

<small><time datetime="2026-03-03">March 3, 2026</time></small>

:::added

- Added `<wa-chart>` and other chart types as experimental Pro components [pr:1073]
- Added `<wa-toast>` and `<wa-toast-item>` as experimental Pro components [pr:105]
- Added `wa-button` class for styling `<a>` elements as buttons [pr:2040]
- Added `--popup-border-width` parameter to `<wa-popup>`. This must be set to match the width of any border added to the popup element [pr:2070]
- Added `start` and `end` slots to `<wa-badge>` [pr:2082]

:::

:::fixed

- Fixed a bug in `<wa-switch>` and `<wa-checkbox>` not rendering properly on first load [pr:2105]
- Fixed a bug in `<wa-drawer>` and `<wa-dialog>` where it was attempting to register global event listeners in server environments. [pr:2105]
- Fixed a bug in `<wa-textarea>` and `<wa-input>` where the internally rendered form controls were not resetting their value properly. [pr:2105]
- Fixed a bug in HasSlotController where it would attempt to call APIs not available on the server. [pr:2105]
- Fixed a bug in `<wa-page>` where it was attempting to insert styles during SSR with unsupported APIs. [issue:1862]
- Fixed a bug in `<wa-page>` where the hamburger navigation would show up if there was no slot content. [issue:1601]
- Fixed a bug in `<wa-dropdown-item>` where a click event would fire on `disabled`. [pr:2023]
- Fixed a bug in the custom elements manifest where events may not have a name. [pr:2026]
- Fixed a bug in `<wa-select>` where options with `selected` set via framework property binding (e.g., Vue's `:selected`) were not respected when `with-clear` was present [pr:1985]
- Fixed a bug in `<wa-radio-group>`, `<wa-slider>`, `<wa-checkbox>`, and `<wa-switch>` to align with how browsers differentiate attributes vs properties. [pr:2105]
- Fixed a bug in `<wa-input>` where it stays invalid when updating value property. [pr:2105]
- Fixed a bug `<wa-color-picker>` that prevented it from flipping horizontally when position to the right of the viewport. [pr:2024]
- Fixed a bug by adding `color: inherit` to the `<wa-dialog>` and `<wa-drawer>` styles so they inherit the text color from the document context rather than the browser default. [pr:2064]
- Fixed a bug that caused 0ms animations to not fire correctly in the internal `animateWithClass()` function [pr:2068]
- Fixed a bug that caused `<wa-dropdown>` elements to scroll the document in Chrome 145
- Fixed a bug in native styles so `border-radius` does not apply to `svg` elements by default [pr:2078]
- Fixed a bug in `<wa-popup>` that caused arrows to point the wrong direction for `-start` and `-end` placements
- Fixed a bug in `<wa-split-panel>` that caused a ResizeObserver error in Chromium-based browser when resizing the primary panel [issue:2018] [pr:2092]
- Fixed a bug that caused the `Escape` key to close more than just the active dismissible component when nested inside other dismissible elements [pr:2096]
- Fixed a bug that forced a box-sizing opinion on host elements

:::

:::changed

- Updated `<wa-icon>` to use [{{ site.siblings.fontAwesome.name }} 7.2.0](https://fontawesome.com/changelog#v7-2-0) [pr:2059]
- Updated `<wa-popup>` arrow styling to prevent larger sized arrow from overlapping the contents of the popup [pr:2070]

:::

## 3.2.1

<small><time datetime="2026-02-04">February 4, 2026</time></small>

:::fixed

- Fixed a bug in the build script causing `llms.txt` and `dist/skills` to be omitted from {{ site.namePro }} packages. [pr:2022]

:::

## 3.2.0

<small><time datetime="2026-02-04">February 4, 2026</time></small>

:::added

- Added `<wa-file-input>` as an experimental pro component [issue:1240]
- Added `<wa-sparkline>` as an experimental pro component
- Added `<wa-number-input>` as an experimental component for numeric input with stepper buttons [issue:1688]
- Added [Agent Skill](/docs/ai/agent-skills) for AI coding assistants following the [agentskills.io](https://agentskills.io/) specification
- Added llms.txt to assist AI agents with using Web Awesome [discuss:1100]
- Added types for Vue and Svelte generated by CEM
- Added `pointercancel` and `touchcancel` event handling to draggable elements to prevent drags from getting stuck
- Added `wa-justify-content-*` utility classes [pr:1930]
- Added `wa-flex-wrap` utility classes [pr:1994]
- Added missing `wa-gap-4xl` utility class [pr:1931]
- Added `track` and `indicator` CSS parts to `<wa-progress-ring>` [pr:1863]
- Added rotation, flip, and animation support to `<wa-icon>` with `rotate`, `flip`, and `animation` attributes supporting {{ site.siblings.fontAwesome.name }}'s animation utilities [pr:1824]
- Added the ability to disable link buttons in `<wa-button>` [pr:1848]
- [Docs]: Included framework specific documentation for Svelte, Vue, and Angular [pr:1895]

:::

:::fixed

- Fixed a bug in `<wa-select>` where the `selected` attribute on `<wa-option>` was ignored when `with-clear` was present [issue:1922]
- Fixed a bug in `<wa-popover>` where the popover closed unexpectedly when clicked inside while it is declared in a shadow DOM [pr:1969]
- Fixed a bug in `<wa-tag>` where the icon color was mismatched with the tag's `appearance` [pr:1814]
- Fixed a bug in `<wa-animated-image>`, `<wa-carousel>`, `<wa-progress-ring>`, `<wa-slider>` that violated the `style-src-attr` CSP directive when enabled [pr:1937]
- Fixed a bug in `<wa-icon>` to support Font Awesome Pro+ icon families that include qualifiers (e.g., `family="jelly-duo"` now works correctly instead of requiring `family="jelly" variant="duo-regular"`) and updated Font Awesome to 7.1.0
- Fixed a bug in `<wa-icon>` where Bootstrap icon sizes were overwritten [pr:1968]
- Fixed a bug in `<wa-tooltip>` where safe triangles were not respected [pr:1967]
- Fixed a bug in `<wa-dropdown>` where submenu detection would not work in shadow DOM [pr:1956]
- Fixed a bug in `<wa-popup>` and `<wa-dropdown-item>` that caused an error when removing a popup while it was opening [issue:1910]
- Fixed a bug in `<wa-popup>` and `<wa-dropdown>` that caused errors when shadow DOM queries returned null [issue:1911]
- Fixed a bug in `<wa-combobox>` that prevented the listbox from opening when options were preselected [issue:1883]
- Fixed a bug in draggable elements that caused a TypeError on `touchend` events when `event.touches` was empty
- Fixed a bug in `<wa-tree-item>` that caused the cursor to show a pointer when no expand icon was present [pr:1936]
- Fixed a bug in `<wa-tree-item>` that caused the chevron to render the wrong direction in RTL [pr:1798]
- Fixed a bug in `<wa-button>` that caused `<wa-dropdown>` elements to close immediately after opening when placed inside a `<form>` element [pr:1996]
- Fixed a bug in `<wa-radio-group>` where `<wa-radio>` elements with an explicit size would be overridden by the radio group even when the group had no size set [pr:2005]
- Fixed a bug in `<wa-radio-group>` that caused radio sizes to not work as documented [issue:2001]
- Fixed a bug in `<wa-popover>` that caused event handlers to be lost when moving the host element around in the DOM [pr:1976]
- Fixed a bug preventing the `wa-visually-hidden-label` class from hiding labels for radio groups and color pickers [pr:2012]

:::

:::changed

- [Docs]: component APIs like slots, state, methods, etc, are now alphabetized [pr:1895]
- [Docs]: component APIs now properly check their inheritance chain [pr:1895]
- Improved the Persian translation [pr:1923]
- Improved `<wa-qr-code>` to use CSS `color` for fill and `background-color` on the host for background [pr:1991]
  - Deprecated the `fill` and `background` attributes
  - Existing implementations now correctly adapt to light/dark mode automatically
  - When using CSS, the QR code will now adapt to `color` and `background` color changes automatically
- Modified `wa-align-items-*` utility classes to apply `display: flex` by default [pr:1943]

:::

## 3.1.0

<small><time datetime="2025-12-16">December 16, 2025</time></small>

:::added

- Added `<wa-combobox>` as an experimental pro component [issue:1074]
- Added version 2.0.0 of the [official Web Awesome Figma Design Kit](/docs/resources/figma)
- Added npm support for {{ site.namePro }}
- Added `layers.css` to define cascade layer order and updated palettes, themes, native styles, and utilities to import the new rule for more fail-safe modularity [pr:1793]

:::

:::fixed

- [PRO]: Fixed a few sizing bugs in `<wa-page>` and `slot="footer"` no longer will always "overflow" the container.
- Fixed a bug in `<wa-slider>` that caused some touch devices to end up with the incorrect value [issue:1703]
- Fixed a bug in `<wa-card>` that prevented some slots from being detected correctly [discuss:1450]
- Fixed a z-index bug in `<wa-scroller>` styles [issue:1724]
- Fixed a bug in `<wa-icon>` that caused some icon libraries to render with the incorrect SVG fill [issue:1733]
- Fixed a bug in `<wa-tree-item>` that caused the spinner to not show when lazy loading [issue:1678]
- Fixed a bug in `<wa-dropdown>` that caused the browser to hang when cancelling the `wa-hide` event [issue:1483]
- Fixed a bug in `<wa-tab-group>` that ensures the active indicator always shows [issue:1206]
- Fixed a bug in `<wa-dropdown-item>` that prevented the icon dependency from being imported [issue:1825]
- Fixed a bug in `<wa-select>` that prevented clicks on the tag's remove button from removing options in multiple mode
- Fixed a bug in `<wa-select>` that caused tags to appear in alphabetical order instead of selection order when using `multiple`
- Fixed a bug in Web Awesome form controls that caused `<wa-input form="foo">` to set the form property to equal `"foo"` instead of returning an `HTMLFormElement` breaking platform expectations. [pr:1815]
- Fixed a bug in `<wa-button>` causing it to not copy over attributes for form submissions. [pr:1815]
- Fixed a bug where the build script was not building `/dist/(utilities|events).js` [pr:1816]

:::

:::changed

- Improved performance of `<wa-icon>` so initial rendering occurs faster, especially with multiple icons on the page [issue:1729]
- Improved `<wa-slider>` to not throw an error when string values are passed to the `min`, `max`, and `step` properties [issue:1823]
- Improved performance of all components by fixing how CSS is imported and reused [issue:1812]
- Modified the default `transition` styles of `<wa-dropdown-item>` to use design tokens [pr:1693]

:::

## 3.0.0

<small><time datetime="2025-12-02">December 2, 2025</time></small>

:::breaking

- 🚨 BREAKING: Changed `appearance="filled outlined"` to `appearance="filled-outlined"` in the following elements [issue:1127]
  - `<wa-button>`
  - `<wa-callout>`
  - `<wa-card>`
  - `<wa-details>`
  - `<wa-input>`
  - `<wa-select>`
  - `<wa-tag>`
  - `<wa-textarea>`
- 🚨 BREAKING: Fixed a bug where `base` and `input` parts were swapped in `<wa-input>` [issue:1646]

:::

:::added

- Added the Kazakh translation [pr:1496]
- Added docs for code completion for VS Code and JetBrains [pr:1550]
- Added back the missing `form-control-label` part to `<wa-textarea>` for consistency with other form controls [pr:1533]
- Added focus delegation to `<wa-button>` to ensure tabbing works properly when using `tabindex` [issue:1622]
- Added [text utilities](/docs/utilities/text/) for longform text, form control text, font sizes, font weights, text color, and truncation [pr:1602]
- Added version 1.0.0 of the [official Web Awesome Figma Design Kit](/docs/resources/figma)

:::

:::fixed

- Fixed a bug in `<wa-button>` where slotted badges weren't properly positioned in buttons with an `href` [issue:1377]
- Fixed focus outline styles in `<wa-details>` and native `<details>` [issue:1456]
- Fixed focus outline styles in `<wa-scroller>`, `<wa-dialog>`, and `<wa-drawer>` [issue:1484]
- Fixed a bug in `<wa-checkbox>` where its value would revert to `""` when checked / unchecked [pr:1547]
- Fixed a bug that caused icon button labels to not render in frameworks [issue:1542]
- Fixed a bug in `<wa-details>` that caused the `name` property not to reflect [pr:1538]
- Fixed a bug in `<wa-dialog>` and `<wa-drawer>` that prevented focus from being set on the dialog/drawer when opened [issue:1302]
- Fixed an overflow style that was causing tab group content to be unnecessarily truncated [issue:1401]
- Fixed a bug in `<wa-icon>` that caused icon buttons to render when non-text nodes were slotted in [issue:1475]
- Fixed a bug in `<wa-tooltip>` that prevented tooltips from showing when disconnecting and then reconnecting to the DOM [issue:1595]
- Fixed a bug that caused the required `*` in form labels to have incorrect spacing in `<wa-checkbox>` and `<wa-switch>` [issue:1472]
- Fixed a bug in `<wa-dialog>` and `<wa-drawer>` that caused the component to prematurely hide when certain child elements are used [pr:1636]
- Fixed a bug in `<wa-popover>` and `<wa-tooltip>` that prevented dots and other valid ID characters from being used [issue:1648]
- [Pro] Fixed a bug in `<wa-page>` that caused menu and aside content to reserve space for slots with `disable-sticky`
- Fixed incorrect docs for the `wa-include-error` event which is dispatched by `<wa-include>` [issue:1663]
- Fixed a bug in `<wa-card>` where slotted header and footer content wasn't properly aligned [pr:1435]

:::

:::changed

- Improved autofill styles in `<wa-input>` so they span the entire width of the visual input [issue:1439]
- Improved [text utilities](/docs/utilities/text/) so that each size modifier always exactly matches the applied font size [pr:1602]
- Improved Native Styles to use the `--wa-font-weight-code` design token
- Modified `<wa-slider>` to only show the tooltip on the handle being dragged when in range mode [issue:1320]
- Upgraded `<wa-page>` from _experimental_ to _stable_

:::

## Pre-Release Versions

Betas, release candidates, and snapshots from before each major release.

<details data-no-outline>

<summary>Show all pre-release versions</summary>

## 3.0.0-beta.6

:::fixed

- Fixed a bug in `<wa-dropdown>` that closed the dropdown event when preventing `wa-select` [issue:1432]
- Pin `@ctrl/tinycolor` to `4.1.0` due to malware in `4.1.1` and `4.1.2`. <https://socket.dev/npm/package/@ctrl/tinycolor/overview/4.1.1>

:::

## 3.0.0-beta.5

:::breaking

- 🚨 BREAKING: Updated `<wa-icon>` to use {{ site.siblings.fontAwesome.name }} 7 [pr:1222]
  - Added the `auto-width` attribute to automatically size icons, since FA7 is fixed-width by default now
  - Changed the default width of icons to `1.25em` to match FA7's fixed-width proportions
  - Improved support for duotone icons in `<wa-icon>`, including custom colors, custom opacity, and opacity swapping
  - Removed the `fixed-width` attribute as it's now the default behavior
- 🚨 BREAKING: Renamed the `icon-position` attribute to `icon-placement` in `<wa-details>` [discuss:1340]
- 🚨 BREAKING: Removed the `size` attribute from `<wa-button-group>` as it only set the initial size and gets out of sync when buttons are updated (apply a `size` to each button instead)

:::

:::added

- Added the `<wa-intersection-observer>` component
- Added the Hindi translation [pr:1307]
- Added `--show-duration` and `--hide-duration` to `<wa-select>` [issue:1281]
- Added horizontal orientation support with `orientation="horizontal"` for `<wa-card>`

:::

:::fixed

- Fixed incorrectly named exported tooltip parts in `<wa-slider>` [pr:1277]
- Fixed a bug in `<wa-dropdown>` that caused menus to overflow the viewport instead of resizing [issue:1267]
- Fixed a bug in `<wa-dropdown>` that prevented keyboard selection of items when nested in shadow roots [issue:1270]
- Fixed a bug in `<wa-dropdown>` that prevented items passed in from slots from being detected [issue:1271]
- Fixed a bug in JSX typings that prevented the types file from being exported [pr:1295]
- Fixed a bug in JSX typings that generated the incorrect component imports [issue:1303]
- Fixed a bug in `<wa-slider>` that prevented the thumb from receiving focus when clicking/tapping [issue:1312]
- Fixed a bug in `<wa-scroller>` that caused the shadow to appear below relatively-positioned elements [issue:1326]
- Fixed a bug in `<wa-details>` that caused it to expand/collapse when clicking on interactive elements in the summary [issue:1252]
- Fixed `<wa-button>` to have `static` positioning by default and `relative` positioning only when used with `<wa-badge>` [pr:1346]
- Fixed spacing in `<wa-input>` when both clear and password toggle icons are present [issue:1325]
- Fixed a bug in `<wa-radio-group>` and `<wa-radio>` where changing appearances dynamically would render incorrectly [issue:1178]
- Fixed a bug in `<wa-input>` that prevented the value from changing when assigning non-string values to `value` [issue:1323]
- Fixed a bug in `<wa-color-picker>` that prevent the picker from staying in the viewport
- Fixed a bug that in `<wa-icon>` that caused `library`, `family`, `variant` and `name` to not reflect [pr:1395]
- Fixed a bug in `<wa-format-date>` and `<wa-relative-time>` that caused spaces to appear before and after the output [pr:1418]

:::

## 3.0.0-beta.4

:::added

- Added the `icon-position` attribute to `<wa-details>` [discuss:1099]
- Added the `animating` custom state to `<wa-details>` [pr:1214]
- Added `--wa-tooltip-border-color`, `--wa-tooltip-border-style`, and `--wa-tooltip-border-width` tokens [issue:1224]
- Added the `without-arrow` attribute to `<wa-popover>` and `<wa-tooltip>` to hide arrows without artifacts
- Added JSX types for use with React and others [pr:1256]
- Added `<input type="file">` to native styles [pr:1279]

:::

:::fixed

- Fixed a bug in `<wa-details>` that caused the content to overflow the container when animating [issue:1149]
- Fixed a bug in `<wa-dialog>` and `<wa-drawer>` that prevented the header from showing when the label was missing [issue:1209]
- Fixed a missing dependency required for React wrappers
- Fixed missing `:hover` and `:active` styles on native buttons without an appearance modifier class

:::

## 3.0.0-beta.3

:::added

- Added `--track-height` custom property to `<wa-progress-bar>` [pr:1154]
- Added `--pulse-color` custom property to `<wa-badge>` [pr:1173]

:::

:::fixed

- Fixed a bug in `<wa-badge>` where `appearance="pulse"` was not working as expected [pr:1173]
- Fixed a missing TypeScript type for `<wa-badge>` for its `attention` property missing `bounce` value. [pr:1173]
- Fixed the missing `nanoid` dependency in `package.json` [discuss:1139]
- Fixed a bug in `<wa-slider>` that prevented the hint from showing up [discuss:1172]
- Fixed a bug in `<wa-textarea>` where setting `resize="auto"` caused the height of the textarea to double [issue:1155]
- Fixed a bug in `<wa-color-picker>`, `<wa-checkbox>`, `<wa-input>`, `<wa-radio-group>`, `<wa-switch>`, and `<wa-textarea>` that prevented screen readers from announcing hints [issue:1186]
- Fixed a bug in `<wa-card>` that caused slotted media to have incorrectly rounded corners [issue:1107]
- Fixed a bug in `<wa-button-group>` that prevented pill buttons from rendering corners properly [issue:1165]
- Fixed a bug in `<wa-button-group>` that caused some vertical groups to appear horizontal [issue:1152]

:::

:::changed

- Improved accessibility of `<wa-animated-image>` so keyboard users can focus and toggle the animation [issue:1177]

:::

## 3.0.0-beta.2

:::added

- Added `.wa-hover-rows` to native styles to opt-in to highlighting table rows on hover.
- Added `.wa-hover-rows` to native styles to opt-in to highlighting table rows on hover [pr:1111]
- Added missing changelog entries for beta.1 [pr:1117]

:::

:::fixed

- Fixed a bug in `<wa-select>` with options that had blank string values. [pr:1136]
- Fixed a bug in `<wa-dropdown>` that prevented the menu from flipping/shifting to keep the menu in the viewport [pr:1122]
- Fixed the themes page so it shows the correct palette and imports [pr:1125]
- Fixed `filled` and `outlined` appearance styles in various components [issue:1102]
- Fixed active state styles in the Awesome theme [pr:1129]
- Fixed native text styles when applied to certain backgrounds [pr:1130]

:::

:::changed

- Improved the organization of essential and optional styles [pr:1113]

:::

## 3.0.0-beta.1

We're excited to share the first beta release of Web Awesome, which includes some breaking changes that make the library significantly more intuitive and consistent!

The list looks extensive, but that's because we've tried to be thorough in documenting every change. We expect most users will only encounter a few of these during their upgrade. The majority are simple attribute renames (like clearable becoming with-clear) and component simplifications that actually reduce the amount of code you need to write.

**If you're a Web Awesome alpha user, please read through these release notes carefully!**

Many of these changes and improvements were the direct result of feedback from users like you! These changes represent our commitment to getting the fundamentals right as we move from alpha into a more stable beta release.

:::breaking

- `input` and `change` events on form controls like `<wa-input>` now are always set to `bubble` and `compose`.
- Greatly simplified how native styles work and removed redundant utilities
  - Removed `.wa-button`, `.wa-callout` classes
  - Removed `themes/native/*.css` files; use `native.css` to opt into native styles
  - Clarified which utilities classes can be applied to which native elements
- Renamed the `classic` theme to `shoelace`
- Removed `:root` selector from all theme, color palette, and semantic color stylesheets except for the default theme and colors. All of these styles are now solely scoped to classes, such as `.wa-theme-awesome`, `.wa-palette-bright`, and `.wa-brand-orange`.
- Removed most custom properties from components that can otherwise be styled with `::part()` selectors and standard CSS properties.
- `<wa-dropdown>` was reworked and simplified to not use menu, menu item, menu label; use `<wa-dropdown-item>` instead
- Renamed `pulse` attribute in `<wa-badge>` to `attention="pulse"` and added `attention="bounce"` [issue:940]
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

:::

:::added

- Added a new component: `<wa-popover>` (#2 of 14 per stretch goals)
- Added a new component: `<wa-zoomable-frame>` (#3 of 14 per stretch goals)
- Added a `min-block-size` to `<wa-divider orientation="vertical">` to ensure the divider is visible regardless of container height
- Added support for `name` in `<wa-details>` for exclusively opening one in a group
- Added `--wa-content-spacing` to themes to set default spacing between HTML elements in Native Styles
- Added `--checked-icon-scale` to `<wa-checkbox>`
- Added `--tag-max-size` to `<wa-select>` when using `multiple`
- Added support for `data-dialog="open <id>"` to `<wa-dialog>`
- Added support for `data-drawer="open <id>"` to `<wa-drawer>`
- Added `@media (hover: hover)` to component hover styles to prevent sticky hover states
- Added the ability to use `<wa-radio-group disabled>` to disable all radios in the group

:::

:::fixed

- Fixed a bug in `<wa-radio-group>` that caused radios to uncheck when assigning a numeric value
- Fixed `<wa-button-group>` so dividers properly show between buttons
- Fixed the tooltip position in `<wa-slider>` when using RTL
- Fixed a bug in `<wa-details>` and native `<details>` styles that made the summary hard to click
- Fixed a handful of bugs unify form control height across components and native elements
- Fixed a bug where `input` events from components weren't bubbling

:::

:::changed

- Improved CSS utilities and Native Styles to use [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) for easier end user customization (no more specificity conflicts — your CSS wins!)
- Improved native `<button>` styles to properly space icons
- Improved button appearances in `<wa-color-picker>`
- Improved `<wa-rating>` to have more accessible icons by default

:::

:::removed

- Removed the experimental `<wa-code-demo>` component
- `<wa-menu>`, `<wa-menu-item>`, `<wa-menu-label>` were dropped; use `<wa-dropdown-item>` instead
- `<wa-icon-button>` was removed; icon buttons can be added via `<wa-button>` now
- `<wa-radio-button>` was dropped; use `<wa-radio appearance="button">` instead

:::

## 3.0.0-alpha.13

:::breaking

- 🚨 BREAKING: Renamed `<image-comparer>` to `<wa-comparison>` and improved compatibility for non-image content
- 🚨 BREAKING: Added slot detection to `<wa-dialog>` and `<wa-drawer>` so you don't need to specify `with-header` and `with-footer`; headers are on by default now, but you can use the `without-header` attribute to turn them off
- 🚨 BREAKING: Renamed the `image` slot to `media` for a more appropriate naming convention

:::

:::added

- Added Theme Builder to create your own themes
- Added a new Blog & News pattern category
- Added a new component: `<wa-scroller>` (#1 of 14 per stretch goals)
- Added support for Duotone Thin, Light, and Regular styles and the Sharp Duotone family of styles to `<wa-icon>`
- Added a default `gap` to `<wa-tag>` for better default spacing when used with icons

:::

:::fixed

- Fixed a bug that caused `<wa-radio-group>` to have an undesired margin below it
- Fixed a bug in the Matter theme that prevented clicks on form control labels to not focus the control
- Fixed a bug in `<wa-select>` that caused incorrect spacing of icons
- Fixed a bug in `<wa-select>` that caused the listbox to now show after being disabled
- Fixed a bug in `<wa-radio-group>` that prevented radio buttons from validating

:::

:::changed

- Improved native radio alignment
- Improved the `.wa-cloak` utility class so all FOUCE-related solutions are 100% opt-in

:::

## 3.0.0-alpha.12

:::added

- Added `appearance` to [`<wa-details>`](/docs/components/details) and [`<wa-card>`](/docs/components/card) and support for the appearance utilities in the [`<details>` native styles](/docs/utilities/native/#details).
- Added an `orange` scale to all color palettes
- Added the [`.wa-cloak` utility](/docs/utilities/fouce) to prevent FOUCE
- Added the [`allDefined()` utility](/docs/usage/#all-defined) for awaiting component registration
- Added slots to `checked-icon` and `submenu-icon` in `<wa-menu-item>` so custom icons can be used

:::

:::changed

- Simplified `<wa-breadcrumb-item>` by removing the `base` CSS part
- Simplified `<wa-menu-item>` and `<wa-menu-label>` by removing the `base` CSS part

:::

:::fixed

- Specifying inherited CSS properties on `<wa-tooltip>` now works as expected
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
- Fixed the missing indeterminate icon in [native checkbox styles](/docs/utilities/native/#form-controls)
- Fixed a bug in `<wa-radio>` where elements would stack instead of display inline
- Docs fixes:
  - Fixed the search dialog's styles so it doesn't jump around as you search
  - Theme cards now have icons

:::

## 3.0.0-alpha.11

:::added

- Color palette tweaking UI. Tweak hue, grays, overall colorfulness, save or share the results.
- Added a `pink` scale to all color palettes
- Added `--wa-color-[hue]` tokens with the "core" color of each scale, regardless of which tint it lives on. You can find them in the first column of each color palette.
- Added `hint` attribute and corresponding slot to `<wa-radio>`
- Added the `tag` part (and associated exported parts) to `<wa-select>` to allow targeting the tag that shows when more than the max number of visible items have been selected
- Added `label` attribute and `defaultLabel` property to `<wa-option>` to override the generated label (useful for rich content)
- Added `label` attribute and `defaultLabel` property to `<wa-menu-item>` to override the generated label (useful for rich content)
- Re-introduced `--border-color` on `<wa-card>` so that the card itself can have a different border color than its inner borders.
- Added an orientation example to the native radio docs

:::

:::fixed

- Fixed a bug in `<wa-switch>` that caused tooltips to work incorrectly when toggling the switch
- Fixed a bug in `<wa-select>` that prevented the placeholder color from being customized with the `--wa-form-control-placeholder-color` token
- Fixed an incorrect CSS value in the expand icon in `<wa-select>`
- Fixed a bug in `<wa-select>` that prevented the description from being read by screen readers
- Fixed a bug in `<wa-card>` where child elements did not have correct rounding when headers and footers were absent.
- Fixed a bug in `<wa-card>` that prevented slots from showing automatically without `with-` attributes
- Fixed a bug that caused `document.createElement('wa-tab')` to fail (which also meant it could not be used in VueJS and other frameworks)
- Fixed a number of broken event listeners throughout the docs

:::

:::changed

- Tweaked hues of all color palettes to make them more distinct and make their hues more intentional
- Improved UI for theme remixing:
  - You can now override the brand color of any theme with any of the 9 hues supported.
  - Rich previews
  - Generated copyable code snippets.
  - Permalinks
- Updated Active, Glossy, Playful, and Premium themes so that `--wa-color-brand-fill-loud` uses the core color of the chosen brand color, regardless of tint.

:::

:::removed

- Dropped `violet` and `teal` from color palettes, instead using `purple` and `cyan` (this is not just a renaming, the colors have been adjusted too).
- Dropped the `base` part from `<wa-radio>`. It can now be styled by directly applying CSS to the element itself.
- Dropped `getTextLabel()` method from `<wa-option>` (if you need dynamic labels, just set the `label` attribute dynamically)
- Dropped `base` part from `<wa-option>` for easier styling. CSS can now be applied directly to the element itself.
- Dropped `getTextLabel()` method from `<wa-menu-item>` (if you need dynamic labels, just set the `label` attribute dynamically)

:::

## 3.0.0-alpha.10

:::breaking

- 🚨 BREAKING: updated all components to use native events instead of `wa-` prefixed events. This will allow components to work more like native elements in your code, frameworks, third-party plugins, etc. To update your code, simply remove the prefix from your event listeners for the following events.
  - `wa-input` => `input`
  - `wa-change` => `change`
  - `wa-blur` => `blur` (this event will no longer bubble, use `focusout` for a bubbling version)
  - `wa-focus` => `focus` (this event will no longer bubble, use `focusin` for a bubbling version)

:::

:::added

- Added `.wa-callout` utility class
- Added the `orientation` attribute to `<wa-radio-group>` to support vertical and horizontal radio items
- Added docs for visual tests
- Added docs on how to cherry-pick native styles

:::

:::fixed

- Fixed a bug in `<wa-tab-group>` that prevented nested tab groups from working properly
- Fixed slot names for `show-password-icon` and `hide-password-icon` in `<wa-input>` to more intuitively represent their functions
- Fixed a bug in `<wa-textarea>` that caused empty controls to submit a value if the initial value was deleted a certain way
- Fixed a bug in `<input>`, `<textarea>`, and `<select>` styles that prevented full-width controls from using 100% width when wrapped in a `<label>`
- Fixed a bug in `<select>` styles that caused the caret to block interactions and prevented the caret from rendering unless wrapped in a `<label>`
- Fixed a bug in `<wa-checkbox>` that caused hints to render inline with the label

:::

:::changed

- Changed the behavior of the `variant` and `size` attributes so that nested components that support these attributes but do not have them set inherit the values set on their ancestors. Additionally:
  - Added `size` attribute to `<wa-dropdown>`, `<wa-button-group>`, `<wa-menu>`, `<wa-rating>`, `<wa-card>`
  - Added `variant` attribute to `<wa-button-group>`

:::

## 3.0.0-alpha.9

:::added

- Added new themes:
  - Glossy
  - Matter
  - Premium
  - Playful
- Added docs on themes and palettes
- Added test suite to ensure all color palettes provide the color contrast they are supposed to
- Added `.wa-invert` utility class to invert the current color scheme
- Added `:state(blank)` to `<wa-input>`, `<wa-textarea>`, and `<wa-select>` to style form inputs differently when empty.

:::

:::changed

- Separated colors and typography out from themes so they can be used independently

:::

## 3.0.0-alpha.8

:::added

- Added `appearance` to `<wa-callout>` and `<wa-tag>`
- Added new themes:
  - Awesome
  - Active
  - Brutalist
  - Mellow
  - Tailspin

:::

:::fixed

- Fixed a bug in `<wa-switch>` where it would not properly change its "checked" state when its property changed.
- Fixed a bug in `<wa-switch>` where the value would be incorrectly submitted as "on" when a value is provided and the switch is checked
- Fixed a bug in the `wa-split` CSS utility that caused it to behave incorrectly

:::

:::changed

- Simplified the internal structure and CSS properties of `<wa-card>`, removed `base` part.
- Improved performance of `<wa-select>` when using a large number of options
- Updated the Japanese translation
- Renamed `--wa-form-control-resting-color` to `--wa-form-control-border-color` for familiarity and accuracy
- Updated the `--wa-border-width-*` and `--wa-border-radius-*` scale for better DX
  - Changed the value of `--wa-border-width-scale` to `1` and updated calculations of size-based `--wa-border-width-*` tokens
  - Changed the value of `--wa-border-radius-scale` to `1` and updated calculations of size-based `--wa-border-radius-*` tokens
  - Decreased the size of the scale so that `--wa-border-radius-s` is now the smallest border radius token, matching the value of the previous `--wa-border-radius-xs` token
- Updated the `--wa-shadow-*` scales for better DX
  - Changed the value of `--wa-shadow-offset-y-scale` to `1` and updated calculations of size-based `--wa-shadow-offset-y-*` tokens
  - Changed the value of `--wa-shadow-blur-scale` to `1` and updated calculations of size-based `--wa-shadow-blur-*` tokens
  - Changed the value of `--wa-shadow-spread-scale` to `-0.5` and updated calculations of size-based `--wa-shadow-spread-*` tokens
  - Updated calculations of size-based `--wa-shadow-offset-x-*` tokens to match calculations used for other shadow qualities (`--wa-shadow-offset-x-scale` remains `0`)

:::

:::removed

- Removed size-based `--wa-form-control-height-*` tokens in favor of `--wa-form-control-height` (see [size utilities](/docs/utilities/size/))
- Removed unused `--wa-border-radius-xs` token and `wa-border-radius-xs` utility class
- Removed unused `--wa-shadow-xs` token

:::

## 3.0.0-alpha.7

:::changed

- Renamed applied.css to webawesome.css

:::

## 3.0.0-alpha.6

:::added

- Added native styles for
  [buttons](/docs/utilities/native/#buttons),
  [input fields](/docs/utilities/native/#form-controls),
  [dialogs](/docs/utilities/native/#dialog),
  [details](/docs/utilities/native/#details),
  [tables](/docs/utilities/native/#tables),
  [lists](/docs/utilities/native/#lists),
  and most [content elements](/docs/utilities/native/#typography).
- Added [color variant utilities](/docs/utilities/color/)
- Added [appearance utilities](/docs/utilities/appearance/)
- Added [size utilities](/docs/utilities/size/)
- Added [layout utilities](/docs/layout/#utilities)
- Added [`.wa-visually hidden`](/docs/utilities/visually-hidden) utility
- Added [`<wa-page>`](/docs/components/page/#styles) native styles and utilities
- Added `checked` and `disabled` custom states to `<wa-checkbox>` and `<wa-radio>`
- Added `disabled`, `expanded`, `indeterminate`, and `selected` custom states to `<wa-tree-item>`

:::

:::changed

- `<wa-page>`: `mobile-breakpoint` now takes any CSS length, not just pixels
- Renamed the `navigation-button--previous` and `navigation-button--next` parts to `navigation-button-previous` and `navigation-button-next` in `<wa-carousel>`
- Renamed the `scroll-button--start` and `scroll-button--end` parts to `scroll-button-start` and `scroll-button-end` in `<wa-tab-group>`

:::

:::removed

- Removed `<wa-visually-hidden>` in favor of the utility class
- Removed stateful CSS parts in favor of custom states
  - `<wa-checkbox>`: `control--checked`, `control--indeterminate`
  - `<wa-radio>`: `control--checked`
  - `<wa-tree-item>`: `item--disabled`, `item--expanded`, `item--indeterminate`, `item--selected`

:::

## 3.0.0-alpha.5

:::added

- Added the Finnish translation
- Added the Italian translation
- Added the Ukrainian translation
- Added support for <kbd>Enter</kbd> to `<wa-split-panel>` to align with ARIA APG's [window splitter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)
- Added more resilient support for lazy loaded options in `<wa-select>`
- Added support for vertical button groups
- Added the `focus()` method to `<wa-radio-group>`

:::

:::fixed

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

:::

:::changed

- Improved alignment of the play icon in `<wa-animated-image>`
- Improved behavior of link buttons to not set `noreferrer noopener` by default
- Updated all checks for directionality to use `this.localize.dir()` instead of `el.matches(:dir(rtl))` so older browsers don't error out

:::

</details>

<wa-callout>
  <div class="wa-flank:end">
    <div class="wa-stack wa-gap-2xs">
      <strong>Something seem off or missing?</strong>
      <span>If you spotted a typo, a missing change, or anything that doesn't look right, let us know.</span>
    </div>
    <div class="wa-cluster wa-gap-s">
      <wa-button
        size="s"
        href="{{ site.github.issues }}"
        target="_blank"
        data-track-event="changelog:link_click"
        data-track-context="feedback_callout"
        data-track-destination="report_bug"
      >
        <wa-icon slot="start" variant="regular" name="bug"></wa-icon>
        Report a bug
      </wa-button>
      <wa-button
        size="s"
        href="{{ site.github.discussions }}"
        target="_blank"
        data-track-event="changelog:link_click"
        data-track-context="feedback_callout"
        data-track-destination="ask_for_help"
      >
        <wa-icon slot="start" variant="regular" name="message-question"></wa-icon>
        Ask for help
      </wa-button>
    </div>
  </div>
</wa-callout>