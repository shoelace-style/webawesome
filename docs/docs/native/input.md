---
title: Form Inputs
tags: native
layout: element
component:
 - input
 - select
 - textarea
 - range
elements:
  "<input>": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
  "<textarea>": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
  "<select>": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
---
<style>
wa-code-demo::part(preview) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
</style>

## Text fields

```html {.example}
<label>Input (text) <input type="text" placeholder="placeholder"></label>
<wa-input label="WA Input (text)" type="text" placeholder="placeholder"></wa-input>

<label>Input (number) <input type="number"></label>
<wa-input label="WA Input (number)" type="number"></wa-input>

<label>Input (password) <input type="password" required></label>
<wa-input label="WA Input (password)" type="password" required></wa-input>

<label>Input (email) <input type="email"></label>
<wa-input label="WA Input (email)" type="email"></wa-input>

<label>Input (search) <input type="search"></label>
<wa-input label="WA Input (search)" type="search"></wa-input>

<label>Input (tel) <input type="tel"></label>
<wa-input label="WA Input (tel)" type="tel"></wa-input>

<label>Input (url) <input type="url"></label>
<wa-input label="WA Input (url)" type="url"></wa-input>

<label>Textarea <textarea></textarea></label>
<wa-textarea label="WA Textarea"></wa-textarea>
```

## Choice inputs

```html {.example}
<label><input type="checkbox"> Input (checkbox)</label>
<wa-checkbox>WA Checkbox</wa-checkbox>

<label><input type="radio" name="radio" value="radio-1" checked>Radio</label>

<wa-radio value="radio-1">WA Radio</wa-radio>
```

## Color picker

```html {.example}
<label>Input (color) <input type="color"></label>

<wa-color-picker label="WA Color Picker"></wa-color-picker>
```

## Time and date Pickers

```html {.example}
<label>Input (datetime-local) <input type="datetime-local"></label>
<wa-input label="WA Input (datetime-local)" type="datetime-local"></wa-input>

<label>Input (date) <input type="date"></label>
<wa-input label="WA Input (date)" type="date"></wa-input>

<label>Input (time) <input type="time"></label>
<wa-input label="WA Input (time)" type="time"></wa-input>
```

## Sliders

```html {.example}
<label>Input (range)<input type="range"></label>
<wa-range label="WA Range"></wa-range>
```

## Select dropdowns

```html {.example}
<label>Select
  <select id="select">
    <option value="option-1">Option 1</option>
    <option value="option-2">Option 2</option>
    <option value="option-3">Option 3</option>
  </select>
</label>

<wa-select label="WA Select">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```
