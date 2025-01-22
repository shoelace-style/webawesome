---
title: Inheritance & Default value tests
---

## Variant

Button variant should default to `neutral`:

```html {.example}
<wa-button>Default (Neutral)</wa-button>
<wa-button variant="neutral">Neutral</wa-button>
<wa-button variant="brand">Brand</wa-button>
```

Badge variant should default to `brand`:

```html {.example}
<wa-badge>Default (Brand)</wa-badge>
<wa-badge variant="neutral">Neutral</wa-badge>
<wa-badge variant="brand">Brand</wa-badge>
```

Badges within buttons should inherit that variant unless they have a variant of their own.
```html {.example}
<div class="wa-stack">
	<div class="wa-cluster">
		<wa-button>
			Default (Neutral)
			<wa-badge>Inh</wa-badge>
		</wa-button>
		<wa-button>
			Default (Neutral)
			<wa-badge variant="neutral">N</wa-badge>
		</wa-button>
		<wa-button>
			Default (Neutral)
			<wa-badge variant="brand">B</wa-badge>
		</wa-button>
	</div>
	<div class="wa-cluster">
		<wa-button variant="neutral">
			Neutral
			<wa-badge>Inh</wa-badge>
		</wa-button>
		<wa-button variant="neutral">
			Neutral
			<wa-badge variant="neutral">N</wa-badge>
		</wa-button>
		<wa-button variant="neutral">
			Neutral
			<wa-badge variant="brand">B</wa-badge>
		</wa-button>
	</div>
	<div class="wa-cluster">
		<wa-button variant="brand">
			Brand
			<wa-badge>Inh</wa-badge>
		</wa-button>
		<wa-button variant="brand">
			Brand
			<wa-badge variant="neutral">N</wa-badge>
		</wa-button>
		<wa-button variant="brand">
			Brand
			<wa-badge variant="brand">B</wa-badge>
		</wa-button>
	</div>
</div>
```

Tag variant should default to `neutral`:

```html {.example}
<wa-tag>Default (Neutral)</wa-tag>
<wa-tag variant="neutral">Neutral</wa-tag>
<wa-tag variant="brand">Brand</wa-tag>
```

Callout variant should default to `brand`.
Buttons, tags, and badges within an element with a variant should inherit that variant unless they have a variant of their own.

```html {.example}
<wa-callout>
	<div class="wa-stack">
		<span>Default (Brand)</span>
		<div class="wa-cluster">
			<wa-button>Default (Inherit)</wa-button>
			<wa-button variant="neutral">Neutral</wa-button>
			<wa-button variant="brand">Brand</wa-button>
		</div>
		<div class="wa-cluster">
			<button>Default (Inherit)</button>
			<button class="wa-neutral">Neutral</button>
			<button class="wa-brand">Brand</button>
		</div>
		<div class="wa-cluster">
			<wa-tag>Default (Inherit)</wa-tag>
			<wa-tag variant="neutral">Neutral</wa-tag>
			<wa-tag variant="brand">Brand</wa-tag>
		</div>
		<div class="wa-cluster">
			<wa-badge>Default (Inherit)</wa-badge>
			<wa-badge variant="neutral">Neutral</wa-badge>
			<wa-badge variant="brand">Brand</wa-badge>
		</div>
	</div>
</wa-callout>
<wa-callout variant="neutral">
	<div class="wa-stack">
		<span>Neutral</span>
		<div class="wa-cluster">
			<wa-button>Default (Inherit)</wa-button>
			<wa-button variant="neutral">Neutral</wa-button>
			<wa-button variant="brand">Brand</wa-button>
		</div>
		<div class="wa-cluster">
			<button>Default (Inherit)</button>
			<button class="wa-neutral">Neutral</button>
			<button class="wa-brand">Brand</button>
		</div>
		<div class="wa-cluster">
			<wa-tag>Default (Inherit)</wa-tag>
			<wa-tag variant="neutral">Neutral</wa-tag>
			<wa-tag variant="brand">Brand</wa-tag>
		</div>
		<div class="wa-cluster">
			<wa-badge>Default (Inherit)</wa-badge>
			<wa-badge variant="neutral">Neutral</wa-badge>
			<wa-badge variant="brand">Brand</wa-badge>
		</div>
	</div>
</wa-callout>
<wa-callout variant="brand">
	<div class="wa-stack">
		<span>Brand</span>
		<div class="wa-cluster">
			<wa-button>Default (Inherit)</wa-button>
			<wa-button variant="neutral">Neutral</wa-button>
			<wa-button variant="brand">Brand</wa-button>
		</div>
		<div class="wa-cluster">
			<button>Default (Inherit)</button>
			<button class="wa-neutral">Neutral</button>
			<button class="wa-brand">Brand</button>
		</div>
		<div class="wa-cluster">
			<wa-tag>Default (Inherit)</wa-tag>
			<wa-tag variant="neutral">Neutral</wa-tag>
			<wa-tag variant="brand">Brand</wa-tag>
		</div>
		<div class="wa-cluster">
			<wa-badge>Default (Inherit)</wa-badge>
			<wa-badge variant="neutral">Neutral</wa-badge>
			<wa-badge variant="brand">Brand</wa-badge>
		</div>
	</div>
</wa-callout>
```

Nested callouts:


```html {.example}
<wa-callout>
	Brand
	<wa-callout>Brand</wa-callout>
	<wa-callout variant="neutral">Neutral</wa-callout>
</wa-callout>
<wa-callout variant="neutral">
	Neutral
	<wa-callout>Neutral</wa-callout>
	<wa-callout variant="brand">Brand</wa-callout>
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
