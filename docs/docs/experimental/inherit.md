---
title: Inheritance & Default value tests
---

Button variant should default to `neutral`:

```html {.example}
<wa-button>Neutral</wa-button>
<wa-button variant="neutral">Neutral</wa-button>
<wa-button variant="brand">Brand</wa-button>
```

Callout variant should default to `brand`.
Buttons within an element with a variant should inherit that variant unless they have a variant of their own.

```html {.example}
<wa-callout>
	Brand
	<wa-button>Brand</wa-button>
	<wa-button variant="neutral">Neutral</wa-button>
	<wa-button variant="brand">Brand</wa-button>
	<button>Brand</button>
	<button class="wa-neutral">Neutral</button>
	<button class="wa-brand">Brand</button>
</wa-callout>
<wa-callout variant="neutral">
	Neutral
	<wa-button>Neutral</wa-button>
	<wa-button variant="neutral">Neutral</wa-button>
	<wa-button variant="brand">Brand</wa-button>
	<button>Neutral</button>
	<button class="wa-neutral">Neutral</button>
	<button class="wa-brand">Brand</button>
</wa-callout>
```

Nested callouts:


```html {.example}
<wa-callout>
	Brand
	<wa-callout>Brand</wa-callout>
</wa-callout>
<wa-callout variant="neutral">
	Neutral
	<wa-callout>Neutral</wa-callout>
</wa-callout>
```


```html {.example}
<wa-callout>
	Brand
	<wa-button>Brand</wa-button>
	<wa-button variant="neutral">Neutral</wa-button>
	<button>Brand</button>
	<button class="wa-neutral">Neutral</button>
	<br>
	<br>
	<wa-callout variant="neutral">
		Neutral
		<wa-button>Neutral</wa-button>
		<wa-button variant="brand">Brand</wa-button>
		<button>Neutral</button>
		<button class="wa-brand">Brand</button>
	</wa-callout>
</wa-callout>
```
