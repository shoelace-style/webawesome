---
title: Matter
description: Digital design inspired by the real world.
isPro: true
tags: pro
palette: mild
brand: indigo
---

Set the page theme to "{{ title }}" from the top right to preview the following examples.

## Floating Labels

This theme implements "floating labels" for `wa-input`, `wa-textarea`, `wa-select`,
which makes labels look like placeholders when the input is empty, does not have an actual placeholder, and is not focused.

```html {.example}
<wa-input label="What is your name?"></wa-input>
<br>
<wa-input label="What is your name?" appearance="filled"></wa-input>
```

## Ripple Effect

This theme implements a ripple effect for buttons, including native buttons.
Click on the following buttons to observe it:

```html {.example}
<wa-button variant="brand">Button</wa-button>
<button class="wa-brand">Button</button>
```



### Customization

You can use several properties to customize the ripple effect.

These properties can be set on any ancestor, including the root element:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `--wa-ripple-start-radius` | `<length>` | `0.1em` | The starting radius of the ripple effect. |
| `--wa-ripple-start-opacity` | `<number>` | `0.1` | The starting opacity of the ripple effect. |
| `--wa-ripple-duration` | `<time>` | `calc(2 * var(--wa-transition-slow))` | The duration of the ripple effect transition. |

Any of these can be used to disable the ripple effect:

```css
--wa-ripple-start-radius: 0em;
```
```css
--wa-ripple-start-opacity: 0;
```
```css
--wa-ripple-duration: 0s;
```

These properties would only work on the button itself:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `--wa-ripple-center-x` | `<percentage>` | `50%` | The x-coordinate of the ripple center point as a percentage of the button width. |
| `--wa-ripple-center-y` | `<percentage>` | `50%` | The y-coordinate of the ripple center point as a percentage of the button height. |

### Ripple Center Point

By default the ripple effect starts from the center of the button.
If you want it to start from the position the button was clicked, you can use this JS snippet:

```js
document.addEventListener("mousedown", evt => {
	let target = evt.target;

	if (!target.matches?.('wa-button, button, .wa-button')) {
		return;
	}

	let rect = target.getBoundingClientRect();
	let x = (evt.clientX - rect.left) / rect.width;
	let y = (evt.clientY - rect.top) / rect.height;

	target.style.setProperty("--mouse-local-x", x);
	target.style.setProperty("--mouse-local-y", y);
});
```
