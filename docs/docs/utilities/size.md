---
title: Size
description: Size utilities give elements one of three preset sizes (small, medium, or large).
icon: theming/space
status: experimental
snippets:
  - .wa-size-s
  - .wa-size-m
  - .wa-size-l
---

Some Web Awesome components, like `<wa-button>`, allow you to change their size to one of three presets: `small`, `medium`, and `large` by using a `size` attribute:

{% for component in componentsBy.attribute.size %}
- <a href="../{{ component.url }}"><code>&lt;{{ component.tagName }}&gt;</code></a>
{%- endfor %}

You can create the same effect on any element by using the size utility classes:

- `.wa-size-s`
- `.wa-size-m` _(default)_
- `.wa-size-l`

Using these classes does two things:
- It sets `font-size` to one of the [size tokens](/docs/theming/typography/#font-size).
You can use CSS `em` units to reference that size in other properties.
- It calculates `--wa-form-control-height` based on the applied size, supporting consistent heights for elements like inputs and buttons.
- It aliases a bunch of other properties that CSS can use:

| Custom Property | Small | Medium | Large |
| --------------- | ----- | ------ | ----- |
| `--wa-size` | `--wa-font-size-s` | `--wa-font-size-m` | `--wa-font-size-l` |
| `--wa-size-smaller` | `--wa-font-size-xs` | `--wa-font-size-s` | `--wa-font-size-m` |
| `--wa-space` | `--wa-space-s` | `--wa-space-m` | `--wa-space-l` |
| `--wa-space-smaller` | `--wa-space-xs` | `--wa-space-s` | `--wa-space-m` |

For example, assume we wanted to make a custom `.tag` class with size variants.

```html { .example }
<span class="tag wa-size-s">Small</span>
<span class="tag">Default</span>
<span class="tag wa-size-m">Medium</span>
<span class="tag wa-size-l">Large</span>

<style>
  .tag {
	display: inline-block;
	padding: var(--wa-space-smaller) var(--wa-space);
	border-radius: var(--wa-border-radius-m); /* usually fixed across sizes */
	background-color: var(--wa-color-fill-quiet);
	border: 1px solid var(--wa-color-border-quiet);
	color: var(--wa-color-on-quiet);
  }
</style>
```

## Advanced: Customizing Sizes

But what if you are creating a style that should **generally** be smaller (e.g. a badge) or larger (e.g. a pull quote)?
For example, suppose we wanted to define a custom `.tag2` class just like `.tag` in the previous section,
but with a different set of sizes.

This is possible, though a bit more involved.
The first thing you need to do is define these 8 properties in your CSS for your "breakpoints":

| Custom property | Default value |
| --------------- | ------------- |
| `--size-xs` | `var(--wa-font-size-xs)` |
| `--size-s` | `var(--wa-font-size-s)` |
| `--size-m` | `var(--wa-font-size-m)` |
| `--size-l` | `var(--wa-font-size-l)` |
| `--space-xs` | `var(--wa-space-xs)` |
| `--space-s` | `var(--wa-space-s)` |
| `--space-m` | `var(--wa-space-m)` |
| `--space-l` | `var(--wa-space-l)` |


It would look like this:

```css
.tag2 {
	--size-xs: var(--wa-font-size-2xs);
	--size-s: var(--wa-font-size-xs);
	--size-m: var(--wa-font-size-s);
	--size-l: var(--wa-font-size-m);

	--space-xs: var(--wa-space-2xs);
	--space-s: var(--wa-space-xs);
	--space-m: var(--wa-space-s);
	--space-l: var(--wa-space-m);
}
```

That by itself is sufficient to give you sizes when the utility classes are used, though no default size:

```html { .example }
<span class="tag2 wa-size-s">Small</span>
<span class="tag2">Default</span>
<span class="tag2 wa-size-m">Medium</span>
<span class="tag2 wa-size-l">Large</span>

<style>
  .tag2 {
	--size-xs: var(--wa-font-size-2xs);
	--size-s: var(--wa-font-size-xs);
	--size-m: var(--wa-font-size-s);
	--size-l: var(--wa-font-size-m);

	--space-xs: var(--wa-space-2xs);
	--space-s: var(--wa-space-xs);
	--space-m: var(--wa-space-s);
	--space-l: var(--wa-space-m);

	display: inline-block;
	font-size: var(--wa-size); /* needed for the default size */
	padding: var(--wa-space-smaller) var(--wa-space);
	border-radius: var(--wa-border-radius-s); /* usually fixed across sizes */
	background-color: var(--wa-color-fill-quiet);
	border: 1px solid var(--wa-color-border-quiet);
	color: var(--wa-color-on-quiet);
  }
</style>
```

Supporting a default size as well requires a little bit more plumbing:

```html { .example }
<div>
	<span class="tag3 wa-size-s">Small</span>
	<span class="tag3">Default</span>
	<span class="tag3 wa-size-m">Medium</span>
	<span class="tag3 wa-size-l">Large</span>
</div>

<style>
  .tag3 {
	--size-xs: var(--wa-font-size-2xs);
	--size-s: var(--wa-font-size-xs);
	--size-m: var(--wa-font-size-s);
	--size-l: var(--wa-font-size-m);

	--space-xs: var(--wa-space-2xs);
	--space-s: var(--wa-space-xs);
	--space-m: var(--wa-space-s);
	--space-l: var(--wa-space-m);

	/* Default size assignments with 0 specificity */
	:where(&) {
		--wa-size: var(--size-m);
		--wa-size-smaller: var(--size-s);
		--wa-space: var(--space-m);
		--wa-space-smaller: var(--space-s);
	}

	display: inline-block;
	font-size: var(--wa-size); /* needed for the default size */
	padding: var(--wa-space-smaller) var(--wa-space);
	border-radius: var(--wa-border-radius-s); /* usually fixed across sizes */
	background-color: var(--wa-color-fill-quiet);
	border: 1px solid var(--wa-color-border-quiet);
	color: var(--wa-color-on-quiet);
  }
</style>
```

