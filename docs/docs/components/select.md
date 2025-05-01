---
title: Select
description: Selects allow you to choose items from a menu of predefined options.
tags: [inputs, forms]
native: select
icon: select
---

```html {.example}
<wa-select label="Single + not clearable" value="option-1">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-select>

<br>

<wa-select label="Single + clearable" value="option-1" clearable>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-select>

<br>

<wa-select label="Single + icon + not clearable" value="option-1">
  <wa-icon slot="prefix" name="house" variant="solid"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
  <wa-icon name="taco" slot="suffix"></wa-icon>
</wa-select>

<br>

<wa-select label="Single + icon + clearable" value="option-1" clearable>
  <wa-icon slot="prefix" name="house" variant="solid"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
  <wa-icon name="taco" slot="suffix"></wa-icon>
</wa-select>

<br>

<wa-select label="Multiple + not clearable" value="option-1" multiple>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-select>

<br>

<wa-select label="Multiple + clearable" value="option-1" multiple clearable>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-select>

<br>

<wa-select label="Multiple + icon + not clearable" value="option-1" multiple>
  <wa-icon slot="prefix" name="house" variant="solid"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
  <wa-icon name="taco" slot="suffix"></wa-icon>
</wa-select>

<br>

<wa-select label="Multiple + icon + clearable" value="option-1" multiple clearable>
  <wa-icon slot="prefix" name="house" variant="solid"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
  <wa-icon name="taco" slot="suffix"></wa-icon>
</wa-select>
```
