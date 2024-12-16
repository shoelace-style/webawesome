---
title: Style Guide
description: TODO
layout: page
---

The styles shown below can be all yours by adding Web Awesome's applied stylesheet to your project.

---

## Forms

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;" class="wa">

<div>
<button>Button</button>
<input type="button" value="Input (button)"></input>
<input type="reset" value="Input (reset)"></input>
<input type="submit" value="Input (submit)"></input>
</div>

<wa-button>WA Button</wa-button>

<label for="input-text">Input (text)</label>
<input type="text" id="input-text"></input>

<wa-input label="WA Input (text)" type="text"></wa-input>

<label for="input-number">Input (number)</label>
<input type="number" id="input-number"></input>

<wa-input label="WA Input (number)" type="number"></wa-input>

<label for="input-password">Input (password)</label>
<input type="password" id="input-password"></input>

<wa-input label="WA Input (password)" type="password"></wa-input>

<input type="checkbox" id="input-checkbox"></input>
<label for="input-checkbox">Input (checkbox)</label>

<wa-checkbox>WA Checkbox</wa-checkbox>

<label for="input-color">Input (color)</label>
<input type="color" id="input-color"></input>

<wa-color-picker label="WA Color Picker"></wa-color-picker>

<label for="input-date">Input (date)</label>
<input type="date" id="input-date"></input>

<wa-input label="WA Input (date)" type="date"></wa-input>

<label for="input-time">Input (time)</label>
<input type="time" id="input-time"></input>

<wa-input label="WA Input (time)" type="time"></wa-input>

<fieldset>
  <legend>Radio Group:</legend>
  <input type="radio" id="radio-1" name="radio" value="radio-1" checked />
  <label for="radio-1">Radio 1</label>
  <input type="radio" id="radio-2" name="radio" value="radio-2" />
  <label for="radio-2">Radio 2</label>
  <input type="radio" id="radio-3" name="radio" value="radio-3" />
  <label for="radio-3">Radio 3</label>
</fieldset>

<fieldset>
  <wa-radio-group label="WA Radio Group:" name="wa-radio" value="radio-1">
    <wa-radio value="radio-1">Radio</wa-radio>
    <wa-radio value="radio-2">Radio</wa-radio>
    <wa-radio value="radio-3">Radio</wa-radio>
  </wa-radio-group>
</fieldset>

<label for="input-range">Input (range)</label>
<input type="range" id="input-range"></input>

<wa-range label="WA Range"></wa-range>

<div>
  <label for="textarea">Textarea</label>
  <textarea id="textarea"></textarea>
</div>

<wa-textarea label="WA Textarea"></wa-textarea>

<div>
<label for="select">Select</label>
  <select id="select">
    <option value="option-1">Option 1</option>
    <option value="option-2">Option 2</option>
    <option value="option-3">Option 3</option>
  </select>
</div>

<wa-select label="WA Select">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>


</div>





## Typography

Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Amet mauris commodo quis imperdiet. Bibendum ut tristique et egestas quis ipsum suspendisse. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat.

Cras pulvinar mattis nunc sed blandit libero. Facilisis magna etiam tempor orci. Scelerisque eleifend donec pretium vulputate sapien nec. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque.

> What is a Web year now, about three months? And when people can browse around, discover new things, and download them fast, when we all have agents - then Web years could slip by before human beings can notice.
>
> — Tim Berners-Lee

## Inline Text

```html
Feugiat nisl pretium fusce id. Ipsum dolor sit amet consectetur adipiscing elit. Eget nunc lobortis mattis aliquam faucibus purus. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Urna condimentum mattis pellentesque id nibh tortor id.
```

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

## Lists

- List item 1
- List item 2
- List item 3
  - Subitem a
  - Subitem b

1. List item 1
2. List item 2
3. List item 3
   - Subitem a
   - Subitem b

## Headings

### Heading 3

Feugiat nisl pretium fusce id. Ipsum dolor sit amet consectetur adipiscing elit. Eget nunc lobortis mattis aliquam faucibus purus. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Urna condimentum mattis pellentesque id nibh tortor id.

#### Heading 4

Gravida arcu ac tortor dignissim convallis aenean. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Donec adipiscing tristique risus nec feugiat in.

##### Heading 5

Enim diam vulputate ut pharetra sit. Enim facilisis gravida neque convallis a cras. Enim neque volutpat ac tincidunt vitae semper. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium.

###### Heading 6

Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Facilisis mauris sit amet massa vitae. Nunc faucibus a pellentesque sit amet porttitor. Adipiscing tristique risus nec feugiat in fermentum.

## Details

Individual details look like this.

<details>
  <summary>Tincidunt nunc pulvinar</summary>
  <p>Ut lectus arcu bibendum at varius. Convallis a cras semper auctor neque vitae. Odio pellentesque diam volutpat commodo sed egestas. Amet dictum sit amet justo donec enim diam vulputate ut.</p>
</details>

Grouping them provides accordion-style functionality.

<details name="details-accordion">
  <summary>Enim diam</summary>
  <p>Nunc faucibus a pellentesque sit amet porttitor. Adipiscing tristique risus nec feugiat in fermentum. Leo duis ut diam quam nulla porttitor massa id. Mauris nunc congue nisi vitae.</p>
</details>

<details name="details-accordion">
  <summary>Arcu non odio</summary>
  <p>Sed libero enim sed faucibus turpis in eu mi bibendum. Nunc mi ipsum faucibus vitae aliquet nec. Ultricies tristique nulla aliquet enim tortor. Tellus at urna condimentum mattis pellentesque.</p>
</details>

<details name="details-accordion">
  <summary>Ut porttitor</summary>
  <p>Eu facilisis sed odio morbi quis commodo odio aenean sed. Sit amet purus gravida quis blandit turpis cursus. Eu consequat ac felis donec et odio pellentesque diam volutpat.</p>
</details>

## Code Blocks

```
// do a thing
export function thing() {
  return true;
}
```

## Images

![A gray kitten lays next to a toy](https://images.unsplash.com/photo-1620196244888-d31ff5bbf163?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

## Tables

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

## Definition Lists

<dl>
  <dt>Definition 1</dt>
  <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
  <dt>Definition 2</dt>
  <dd>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</dd>
  <dt>Definition 3</dt>
  <dd>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</dd>
</dl>
