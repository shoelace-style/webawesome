---
title: Appearance Variants
description: Appearance utilities apply a collection of properties to achieve certain effects, like making elements accented, outlined, filled, or plain.
snippets:
  - .wa-accent
  - .wa-outlined
  - .wa-filled
  - .wa-plain
---

Some Web Awesome components, like `<wa-button>`, allow you to change their overall style by using an `appearance` attribute:

{% for component in componentsBy.attribute.appearance %}
- <a href="../{{ component.url }}"><code>&lt;{{ component.tagName }}&gt;</code></a>
{%- endfor %}

You can create the same effect on any element by using the appearance utility classes:

- `.wa-accent`
- `.wa-outlined`
- `.wa-filled`
- `.wa-plain`

Using these classes is a two-way handshake:
they do not directly apply styles, but define custom properties that you can use in styles that should respond to these utilities:
- `--background-color`
- `--background-color-hover`
- `--background-color-active`
- `--border-color`
- `--border-color-hover`
- `--text-color`
- `--text-color-hover`

Then you can use (some of) these properties in any class that should respond to these.

For example, assume we wanted to make a custom `.badge` class with appearance variants.
This is all we need to do:

```html { .example }
<small class="badge wa-accent">Accent</small>
<small class="badge wa-outlined">Outlined</small>
<small class="badge wa-filled">Filled</small>
<small class="badge wa-plain">Plain</small>

<style>
  .badge {
	background-color: var(--background-color);
	border: 1px solid var(--border-color);
	color: var(--text-color);
	padding: var(--wa-space-2xs) var(--wa-space-xs);
	border-radius: var(--wa-border-radius-s);
  }
</style>
```

## With Color Variants

These properties also work well with the [color variants](/docs/utilities/color/) utility classes:

```html { .example }
<div class="wa-stack">
	<div class="wa-brand">
		<small class="badge wa-accent">Accent</small>
		<small class="badge wa-outlined">Outlined</small>
		<small class="badge wa-filled">Filled</small>
		<small class="badge wa-plain">Plain</small>
	</div>
	<div class="wa-danger">
		<small class="badge wa-accent">Accent</small>
		<small class="badge wa-outlined">Outlined</small>
		<small class="badge wa-filled">Filled</small>
		<small class="badge wa-plain">Plain</small>
	</div>
	<div class="wa-warning">
		<small class="badge wa-accent">Accent</small>
		<small class="badge wa-outlined">Outlined</small>
		<small class="badge wa-filled">Filled</small>
		<small class="badge wa-plain">Plain</small>
	</div>
	<div class="wa-success">
		<small class="badge wa-accent">Accent</small>
		<small class="badge wa-outlined">Outlined</small>
		<small class="badge wa-filled">Filled</small>
		<small class="badge wa-plain">Plain</small>
	</div>
</div>

<style>
  .badge {
	background-color: var(--background-color);
	border: 1px solid var(--border-color);
	color: var(--text-color);
	padding: var(--wa-space-2xs) var(--wa-space-xs);
	border-radius: var(--wa-border-radius-s);
  }
</style>
```

