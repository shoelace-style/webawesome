---
title: Native Styles
description: Native styles apply your theme to native HTML elements so they match the look and feel of Web Awesome components.
layout: page-outline
tags: styleUtilities
---

Native styles use design tokens to spruce up native HTML elements so that they match the look and feel of your theme. While these native styles are completely optional, they're a great starting point for a cohesive design and a huge help when using a combination of native elements and Web Awesome components in your project.

## Using native styles

<wa-tab-group>
  <wa-tab panel="cdn"><wa-icon name="rocket-launch" variant="regular"></wa-icon> CDN</wa-tab>
  <wa-tab panel="npm"><wa-icon name="box-open" variant="regular"></wa-icon> npm</wa-tab>
  <wa-tab panel="self-hosted"><wa-icon name="arrow-down-to-line" variant="regular"></wa-icon> Self-Hosted</wa-tab>

  <wa-tab-panel name="cdn">
{% markdown %}
1. Head over to your project's <wa-icon name="gear" variant="regular"></wa-icon> **Settings**.
2. Next to **Features**, select the **Native styles** checkbox.
3. **Save Changes** to immediately update anywhere you're using your project.
{% endmarkdown %}
  </wa-tab-panel>

  <wa-tab-panel name="npm">
{% markdown %}
To use all Web Awesome styles (including [utilities](/docs/utilities/)), import the following stylesheet in your project:

```js
import '@awesome.me/webawesome/dist/styles/webawesome.css';
```

Or, if you only want styles for native elements, import a theme and native styles individually:

```js
import '@awesome.me/webawesome/dist/styles/themes/default.css';
import '@awesome.me/webawesome/dist/styles/native.css';
```
{% endmarkdown %}
  </wa-tab-panel>

  <wa-tab-panel name="self-hosted">
{% markdown %}
To use all Web Awesome styles (including [utilities](/docs/utilities/)), include the following stylesheet in your project:

```html
<link rel="stylesheet" href="/dist/styles/webawesome.css" />
```

Or, if you only want styles for native elements, include a theme and native styles individually:

```html
<link rel="stylesheet" href="/dist/styles/themes/default.css" />
<link rel="stylesheet" href="/dist/styles/native.css" />
```
{% endmarkdown %}
  </wa-tab-panel>
</wa-tab-group>

You can additionally include any pre-made [theme](/docs/themes/) or [color palette](/docs/color-palettes/) to change the look of native elements.

## Content flow

Native styles set default space between many block-level HTML elements using the `--wa-content-spacing` token from your theme. This helps ensure that your content is readable.

```html {.example}
<h3>Curabitur odio ligula</h3>
<p>
  Fusce mollis quam lorem, et gravida arcu laoreet ut. Pellentesque et malesuada mi. Morbi faucibus nisl nec nulla
  porta, ac scelerisque elit finibus.
</p>
<blockquote>
  The Road goes ever on and on<br />
  Out from the door where it began.
</blockquote>
<p>
  Donec varius, ipsum sit amet lobortis tristique, quam arcu pellentesque turpis, non porta lacus arcu non arcu. Morbi
  luctus at nisl sit amet faucibus.
</p>
<hr />
<ul>
  <li>Aenean imperdiet</li>
  <li>Vivamus consectetur at est</li>
  <li>Quisque vel leo in leo semper</li>
</ul>
```

To remove this default spacing, you can set `--wa-content-spacing: 0` in your styles.

## Typography

Native styles use [typography design tokens](/docs/tokens/typography/) to style text elements. A number of styles — such as `color`, `font-family`, `font-size`, `font-weight`, and `line-height` — are set on the `<body>` element to be inherited by child elements.

### Headings

Create headings with `<h1>` through `<h6>`. Headings use tokens with the `-heading` suffix, condensed line height, and `text-wrap: balance` for a prominent yet compact appearance.

```html {.example}
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

### Paragraphs

Create paragraphs with `<p>`. Paragraphs inherit the default text styles set on the `<body>` element and use `text-wrap: pretty` to prevent orphaned lines in supported browsers.

```html {.example}
<p>
  Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Amet mauris commodo quis imperdiet. Bibendum
  ut tristique et egestas quis ipsum suspendisse. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat.
</p>

<p>
  Cras pulvinar mattis nunc sed blandit libero. Facilisis magna etiam tempor orci. Scelerisque eleifend donec pretium
  vulputate sapien nec. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Mauris rhoncus aenean vel
  elit scelerisque mauris pellentesque.
</p>
```

### Blockquotes

Emphasize longer quotations with `<blockquote>`. Block quotes use your theme's serif font family and a leading border to stand out.

```html {.example}
<blockquote>
  What is a Web year now, about three months? And when people can browse around, discover new things, and download them
  fast, when we all have agents - then Web years could slip by before human beings can notice.<br /><br />
  — Tim Berners-Lee
</blockquote>
```

### Lists

Create ordered and unordered lists with `<ol>` and `<ul>`, plus `<li>` for list items within.

```html {.example}
<div class="wa-grid">
  <ol>
    <li>First item</li>
    <li>
      Another item
      <ol>
        <li>Nested item</li>
        <li>Another nested item</li>
      </ol>
    </li>
    <li>Final item</li>
  </ol>

  <ul>
    <li>First item</li>
    <li>
      Another item
      <ul>
        <li>Nested item</li>
        <li>Another nested item</li>
      </ul>
    </li>
    <li>Final item</li>
  </ul>
</div>
```

Use `<dl>` to create lists of terms (`<dt>`) and definitions (`<dd>`).

```html {.example}
<dl>
  <dt>First term</dt>
  <dd>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </dd>
  <dt>Second term</dt>
  <dd>
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </dd>
  <dt>Final term</dt>
  <dd>
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
  </dd>
</dl>
```

### Code blocks

Create code blocks or other preformatted text with `<pre>`. Preformatted text uses your theme's monospace font family and a subtle background color.

```html {.example}
<pre>
// do a thing
export function thing() {
  return true;
}
</pre>
```

### Inline text

Use any inline text element like `<strong>`, `<em>`, `<a>`, `<kbd>`, and others to stylize or emphasize text.

```html {.example}
<div class="wa-grid">
  <div class="wa-stack wa-align-items-start">
    <strong>Bold</strong>
    <em>Italic</em>
    <u>Underline</u>
    <s>Strike-through</s>
    <del>Deleted</del>
    <ins>Inserted</ins>
    <small>Small</small>
  </div>
  <div class="wa-stack wa-align-items-start">
    <span>Subscript <sub>Sub</sub></span>
    <span>Superscript <sup>Sup</sup></span>
    <abbr title="Abbreviation">Abbr.</abbr>
    <mark>Highlighted</mark>
    <a href="#">Link text</a>
    <code>Inline code</code>
    <kbd>Keyboard</kbd>
  </div>
</div>
```

## Widgets & media

### Media

Add responsive media with `<img>`, `<svg>`, `<video>`, `<iframe>`, and others. Media takes up 100% width by default and scales according to its container's width.

```html {.example}
<img
  src="https://images.unsplash.com/photo-1620196244888-d31ff5bbf163?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="A gray kitten lays next to a toy"
/>
```

### Tables

Structure tabular data with `<table>` and related elements like `<caption>`, `<thead>`, `<tbody>`, `<th>`, `<tr>`, and `<td>`.

```html {.example}
<table>
  <caption>
    This
    <code>&lt;caption&gt;</code>
    describes the table
  </caption>
  <thead>
    <tr>
      <th>First column</th>
      <th>Second column</th>
      <th>Third column</th>
      <th>Final column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
    </tr>
    <tr>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
    </tr>
    <tr>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
    </tr>
    <tr>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
    </tr>
  </tbody>
</table>
```

Add the `wa-hover-rows` class to highlight table rows on hover and the `wa-zebra-rows` class to add alternating row colors to your table.

```html {.example}
<table class="wa-zebra-rows wa-hover-rows">
  <thead>
    <tr>
      <th>First column</th>
      <th>Second column</th>
      <th>Third column</th>
      <th>Final column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
    </tr>
    <tr>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
    </tr>
    <tr>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
    </tr>
    <tr>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
      <td>Data</td>
    </tr>
  </tbody>
</table>
```

### Details

Create disclosure widgets with `<details>` and `<summary>`. Details closely match the appearance of [`<wa-details>`](/docs/components/details/).

```html {.example}
<details>
  <summary>Summary</summary>
  <p>
    Ut lectus arcu bibendum at varius. Convallis a cras semper auctor neque vitae. Odio pellentesque diam volutpat
    commodo sed egestas. Amet dictum sit amet justo donec enim diam vulputate ut.
  </p>
</details>
```

### Dialog

Create modal and non-modal dialog boxes with `<dialog>`. Dialogs closely match the appearance of [`<wa-dialog>`](/docs/components/dialog/).

```html {.example}
<dialog id="dialog-example">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <button type="button">Close</button>
</dialog>

<button>Open Dialog</button>

<script>
  const dialog = document.querySelector('#dialog-example');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('button');

  openButton.addEventListener('click', () => dialog.showModal());
  closeButton.addEventListener('click', () => dialog.close());
</script>
```

### Progress

Create progress indicators with `<progress>`. Progress indicators closely match the appearance of [`<wa-progress-bar>`](/docs/components/progress-bar/).

```html {.example}
<progress value="40" max="100"></progress>
<br />
<progress></progress>
```

## Forms

Native styles use [form control design tokens](/docs/tokens/component-groups/#form-controls) to style form elements like buttons and inputs. Form elements additionally inherit `font-family` from the `<body>` element.

### Buttons

Create buttons with `<button>` or `<input type="button | submit | reset">`. Buttons closely match the appearance of [`<wa-button>`](/docs/components/button/).

```html {.example}
<button>Button</button>
<input type="button" value="Input (button)" />
<input type="submit" value="Input (submit)" />
<input type="reset" value="Input (reset)" />
```

Add the `wa-brand`, `wa-neutral`, `wa-success`, `wa-warning`, or `wa-danger` class to specify the button's [color variant](/docs/utilities/color/).

```html {.example}
<button class="wa-neutral">Neutral</button>
<button class="wa-brand">Brand</button>
<button class="wa-success">Success</button>
<button class="wa-warning">Warning</button>
<button class="wa-danger">Danger</button>
```

Add the `wa-accent`, `wa-filled`, `wa-outlined`, or `wa-plain` class to specify the button's visual appearance.

```html {.example}
<button class="wa-accent wa-neutral">Accent</button>
<button class="wa-filled wa-outlined wa-neutral">Filled + Outlined</button>
<button class="wa-filled wa-neutral">Filled</button>
<button class="wa-outlined wa-neutral">Outlined</button>
<button class="wa-plain wa-neutral">Plain</button>
```

Add the `wa-size-s`, `wa-size-m`, or `wa-size-l` class to specify the size of the button.

```html {.example}
<button class="wa-size-s">Small</button>
<button class="wa-size-m">Medium</button>
<button class="wa-size-l">Large</button>
```

Add the `wa-pill` class to give buttons rounded edges.

```html {.example}
<button class="wa-pill">Pill button</button>
```

When using `<wa-icon>` within a button, wrap adjacent label text in `<span>` or similar to automatically add margin between the icon and the label, just like the `start` and `end` slots of `<wa-button>`.

```html {.example}
<button>
  <wa-icon name="plane-departure"></wa-icon>
  <span>Start Icon</span>
</button>
<button>
  <span>End Icon</span>
  <wa-icon name="plane-arrival"></wa-icon>
</button>
```

### Form controls

Create a variety of form controls with `<input type="">`, `<select>`, and `<textarea>`. Each control closely matches the appearance of the corresponding Web Awesome component.

```html {.example}
<div class="wa-stack">
  <label>Text <input type="text" placeholder="add some text" /></label>
  <label>Date <input type="date" /></label>
  <label>Time <input type="time" /></label>
  <label>Number <input type="number" placeholder="12345" /></label>
  <label>Color <input type="color" value="#f36944" /></label>
  <label>File <input type="file" multiple /></label>
  <label>Range <input type="range" /></label>
  <label
    >Select
    <select>
      <option value="option-1">Option 1</option>
      <option value="option-2">Option 2</option>
      <option value="option-3">Option 3</option>
    </select>
  </label>
  <label>Textarea <textarea placeholder="add more text"></textarea></label>
  <div class="wa-cluster">
    <label><input type="checkbox" checked /> Checked</label>
    <label><input type="checkbox" class="indeterminate" /> Indeterminate</label>
    <label><input type="checkbox" /> Unchecked</label>
  </div>
  <div class="wa-cluster">
    <label><input type="radio" name="radio-group" value="1" checked /> First radio</label>
    <label><input type="radio" name="radio-group" value="2" /> Second radio</label>
    <label><input type="radio" name="radio-group" value="3" /> Third radio</label>
  </div>
</div>

<script>
  document.querySelector('.indeterminate').indeterminate = true;
</script>
```

Add the `wa-size-s`, `wa-size-m`, or `wa-size-l` class to any form control or its parent `<label>` to specify its size.

```html {.example}
<div class="wa-stack">
  <input type="text" placeholder="Small input" class="wa-size-s" />
  <div class="wa-cluster">
    <label class="wa-size-s"><input type="checkbox" checked /> Small checkbox</label>
    <label class="wa-size-s"><input type="radio" name="radio-small" value="1" checked /> Small radio</label>
  </div>
  <input type="text" placeholder="Medium input" class="wa-size-m" />
  <div class="wa-cluster">
    <label class="wa-size-m"><input type="checkbox" checked /> Medium checkbox</label>
    <label class="wa-size-m"><input type="radio" name="radio-medium" value="1" checked /> Medium radio</label>
  </div>
  <input type="text" placeholder="Large input" class="wa-size-l" />
  <div class="wa-cluster">
    <label class="wa-size-l"><input type="checkbox" checked /> Large checkbox</label>
    <label class="wa-size-l"><input type="radio" name="radio-large" value="1" checked /> Large radio</label>
  </div>
</div>
```

Add the `wa-filled` class to an input to give it a filled background.

```html {.example}
<div class="wa-stack">
  <input type="text" placeholder="Filled input" class="wa-filled" />
  <select class="wa-filled">
    <option value="filled">Filled select</option>
  </select>
  <textarea placeholder="Filled textarea" class="wa-filled"></textarea>
</div>
```

Add the `wa-pill` class to an input or select to give it rounded edges.

```html {.example}
<div class="wa-stack">
  <input type="text" placeholder="Pill input" class="wa-pill" />
  <select class="wa-pill">
    <option value="pill">Pill select</option>
  </select>
</div>
```

Add any [button](#buttons) modifier class to `<input type="file">` to change the file selector button's color variant, appearance, size, and shape.

```html {.example}
<input type="file" class="wa-filled wa-outlined wa-warning wa-size-s wa-pill" />
```

### Fieldsets

Group form controls together with `<fieldset>` and `<legend>`.

```html {.example}
<fieldset class="wa-stack wa-align-items-start">
  <legend>Legend</legend>
  <label><input type="radio" name="legends" value="1" checked /> King Arthur</label>
  <label><input type="radio" name="legends" value="2" /> Robin Hood</label>
  <label><input type="radio" name="legends" value="3" /> Odysseus</label>
</fieldset>
```

### Form layouts

Wrap form controls in a flex container to arrange them horizontally or vertically with even spacing. Layout utility classes like [`wa-cluster`](/docs/utilities/cluster) and [`wa-stack`](/docs/utilities/stack) can be added directly to a `<fieldset>` or `<form>` to make this especially easy.

```html {.example}
<fieldset class="wa-cluster">
  <legend>Ducks in a row</legend>
  <label><input type="checkbox" checked /> Mallard</label>
  <label><input type="checkbox" /> Common Loon</label>
  <label><input type="checkbox" /> Least Grebe</label>
</fieldset>

<br />

<form class="wa-stack">
  <label>Number of pancakes <input type="number" value="5" /></label>
  <label
    >Syrup flavor
    <select>
      <option value="maple">Maple</option>
      <option value="strawberry">Strawberry</option>
      <option value="blueberry">Blueberry</option>
      <option value="pecan">Butter pecan</option>
    </select>
  </label>
  <label><input type="checkbox" checked /> Add whipped butter</label>
  <button>
    <wa-icon name="pancakes"></wa-icon>
    Stack 'em up
  </button>
</form>
```
