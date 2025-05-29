---
title: Native Styles
description: Native styles apply your theme to native HTML elements so they match the look and feel of Web Awesome components.
layout: page-outline
---

# Web Awesome Native Styles

Web Awesome provides optional Native Styles that make native HTML elements look good so you can continue using what you know and gradually adopt Web Awesome as you see fit.

## Installation

To use all Web Awesome page styles (including [utilities](/docs/utilities/)), include the following stylesheet in your project:

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/webawesome.css' %}" />
```

Or, to _only_ include styles for native elements:

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/native.css' %}" />
```

## Elements

### Headings

Semantic heading elements with proper hierarchy and styling.

```html {.example}
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

### Paragraphs

Standard paragraph text with optimal spacing and readability.

```html {.example}
<p>Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Amet mauris commodo quis imperdiet. Bibendum ut tristique et egestas quis ipsum suspendisse. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat.</p>

<p>Cras pulvinar mattis nunc sed blandit libero. Facilisis magna etiam tempor orci. Scelerisque eleifend donec pretium vulputate sapien nec. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque.</p>
```

### Blockquotes

Styled quotations that stand out from regular text.

```html {.example}
<blockquote>
  What is a Web year now, about three months? And when people can browse around, discover new things, and download them fast, when we all have agents - then Web years could slip by before human beings can notice.<br><br>
  — Tim Berners-Lee
</blockquote>
```

### Lists

Organized content in bulleted or numbered format with proper nesting support.

```html {.example}
<ul>
  <li>List item 1</li>
  <li>List item 2
    <ul>
      <li>Subitem a</li>
      <li>Subitem b</li>
    </ul>
  </li>
  <li>List item 3</li>
</ul>

<ol>
  <li>List item 1</li>
  <li>List item 2
    <ul>
      <li>Subitem a</li>
      <li>Subitem b</li>
    </ul>
  </li>
  <li>List item 3</li>
</ol>
```

### Definition Lists

Term and definition pairs for glossaries and descriptions.

```html {.example}
<dl>
  <dt>Definition 1</dt>
  <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
  <dt>Definition 2</dt>
  <dd>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</dd>
  <dt>Definition 3</dt>
  <dd>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</dd>
</dl>
```

### Details

Collapsible content sections with expand/collapse functionality.

```html {.example}
<details>
  <summary>Tincidunt nunc pulvinar</summary>
  <p>Ut lectus arcu bibendum at varius. Convallis a cras semper auctor neque vitae. Odio pellentesque diam volutpat commodo sed egestas. Amet dictum sit amet justo donec enim diam vulputate ut.</p>
</details>
```

### Dialog

Modal dialog windows for alerts, confirmations, and overlays.

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

### Inline Text

Various text formatting elements for emphasis and semantic meaning.

```html {.example}
<div class="two-columns">
  <p><strong>Bold</strong></p>
  <p><em>Italics</em></p>
  <p><u>Underline</u></p>
  <p><del>Deleted</del></p>
  <p><ins>Inserted</ins></p>
  <p><s>Strike-through</s></p>
  <p><small>Small</small></p>
  <p><span>Text <sub>Sub</sub></span></p>
  <p><span>Text <sup>Sup</sup></span></p>
  <p><abbr title="Abbreviation">Abbr.</abbr></p>
  <p><kbd>Keyboard</kbd></p>
  <p><mark>Highlighted</mark></p>
  <p><a href="#">Link text</a></p>
  <p><code>Inline code</code></p>
</div>
```

### Code Blocks

Formatted code snippets with proper syntax styling.

```
// do a thing
export function thing() {
  return true;
}
```

### Images

Responsive images with proper scaling and styling.

![A gray kitten lays next to a toy](https://images.unsplash.com/photo-1620196244888-d31ff5bbf163?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

### Progress Bars

Visual indicators for task completion and loading states.

```html {.example}
<progress value="40" max="100"></progress>
<br>
<progress></progress>
```

### Tables

Structured data presentation with clean styling and optional zebra striping.

```html {.example}
<table>
  <caption>I'm just a table</caption>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
      <th>Column 4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
  </tbody>
</table>
```

You can use the `wa-zebra-rows` class to add alternating row colors to your table:

```html {.example}
<table class="wa-zebra-rows">
  <caption>I'm just a table</caption>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
      <th>Column 4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
    <tr>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
      <td>Cell</td>
    </tr>
  </tbody>
</table>
```

## Form Controls

### Buttons

Use the [variant utility classes](../utilities/color.md) to set the button's semantic variant.

```html {.example}
<button class="wa-neutral"><wa-icon name="home"></wa-icon> Neutral</button>
<button class="wa-brand">Brand</button>
<button class="wa-success">Success</button>
<button class="wa-warning">Warning</button>
<button class="wa-danger">Danger</button>
```

Use the [appearance utility classes](/docs/utilities/appearance) to change the button's visual appearance:

```html {.example}
<div style="margin-block-end: 1rem;">
  <button class="wa-accent wa-outlined wa-neutral">A + O</button>
  <button class="wa-accent wa-neutral">Accent</button>
  <button class="wa-outlined wa-neutral">Outlined</button>
  <button class="wa-filled wa-outlined wa-neutral">F + O</button>
  <button class="wa-filled wa-neutral">Filled</button>
  <button class="wa-plain wa-neutral">Plain</button>
</div>
<div style="margin-block-end: 1rem;">
  <button class="wa-accent wa-outlined wa-brand">A + O</button>
  <button class="wa-accent wa-brand">Accent</button>
  <button class="wa-outlined wa-brand">Outlined</button>
  <button class="wa-filled wa-outlined wa-brand">F + O</button>
  <button class="wa-filled wa-brand">Filled</button>
  <button class="wa-plain wa-brand">Plain</button>
</div>
<div style="margin-block-end: 1rem;">
  <button class="wa-accent wa-outlined wa-success">A + O</button>
  <button class="wa-accent wa-success">Accent</button>
  <button class="wa-outlined wa-success">Outlined</button>
  <button class="wa-filled wa-outlined wa-success">F + O</button>
  <button class="wa-filled wa-success">Filled</button>
  <button class="wa-plain wa-success">Plain</button>
</div>
<div style="margin-block-end: 1rem;">
  <button class="wa-accent wa-outlined wa-warning">A + O</button>
  <button class="wa-accent wa-warning">Accent</button>
  <button class="wa-outlined wa-warning">Outlined</button>
  <button class="wa-filled wa-outlined wa-warning">F + O</button>
  <button class="wa-filled wa-warning">Filled</button>
  <button class="wa-plain wa-warning">Plain</button>
</div>
<div>
  <button class="wa-accent wa-outlined wa-danger">A + O</button>
  <button class="wa-accent wa-danger">Accent</button>
  <button class="wa-outlined wa-danger">Outlined</button>
  <button class="wa-filled wa-outlined wa-danger">F + O</button>
  <button class="wa-filled wa-danger">Filled</button>
  <button class="wa-plain wa-danger">Plain</button>
</div>
```

Use the [size utility classes](../utilities/size.md) to change a button's size.

```html {.example}
<button class="wa-size-s">Small</button>
<button class="wa-size-m">Medium</button>
<button class="wa-size-l">Large</button>
```

Use the `wa-pill` class to give buttons rounded edges.

```html {.example}
<button class="wa-size-s wa-pill">Small</button>
<button class="wa-size-m wa-pill">Medium</button>
<button class="wa-size-l wa-pill">Large</button>
```

### Checkboxes

Multi-select form controls with checked, indeterminate, and disabled states.

```html {.example}
<label><input type="checkbox" checked> Checked</label><br>
<label><input type="checkbox" class="indeterminate"> Indeterminate</label><br>
<label><input type="checkbox" disabled> Disabled</label>

<script>
  document.querySelector(".indeterminate").indeterminate = true;
</script>
```

### Radios

Single-select form controls for mutually exclusive choices.

You can wrap native radios in a flex container to give them a horizontal or vertical orientation with even spacing. The convenience [`wa-cluster`](/docs/utilities/cluster) and [`wa-stack`](/docs/utilities/stack) utilities make this easy.

```html {.example}
<div class="wa-cluster">
  <label><input type="radio" name="b" value="1" checked> Option 1</label>
  <label><input type="radio" name="b" value="2"> Option 2</label>
  <label><input type="radio" name="b" value="3"> Option 3</label>
</div>

<div class="wa-stack" style="margin-block-start: var(--wa-space-2xl);">
  <label><input type="radio" name="g" value="1" checked> Option 1</label>
  <label><input type="radio" name="g" value="2"> Option 2</label>
  <label><input type="radio" name="g" value="3"> Option 3</label>
</div>
```

### Selects

Dropdown menus for choosing from a list of options.

```html {.example}
<label>Select
  <select id="select">
    <option value="option-1">Option 1</option>
    <option value="option-2">Option 2</option>
    <option value="option-3">Option 3</option>
  </select>
</label>
```

### Sliders

Range inputs for selecting numeric values within a specified range.

```html {.example}
<label>Select a value: <input type="range"></label>
```

### Text Fields

Various input types for collecting user text and data.

```html {.example}
<label>Text <input type="text" placeholder="placeholder"></label>

<label>Number <input type="number"></label>

<label>Password <input type="password" required></label>

<label>Email <input type="email"></label>

<label>Search <input type="search"></label>

<label>Telephone <input type="tel"></label>

<label>URL <input type="url"></label>
```

Add the `wa-pill` class to an `<input>` to make it pill-shaped.

```html {.example}
<label>Input <input type="text" placeholder="placeholder" class="wa-pill"></label>
```

### Color Pickers

Visual color selection interface with hex value input.

```html {.example}
<label>Input (color) <input type="color" value="#ff0066"></label>
```

### Date & Time Pickers

Specialized inputs for selecting dates, times, and datetime values.

```html {.example}
<label>Input (datetime-local) <input type="datetime-local"></label>

<label>Input (date) <input type="date"></label>

<label>Input (time) <input type="time"></label>
```

### Textareas

Multi-line text input fields for longer content.

```html {.example}
<label>Textarea <textarea placeholder="Type something"></textarea></label>
```
