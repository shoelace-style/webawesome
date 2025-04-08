---
title: Inheritance & Default value tests
wide: true
---

## Variant

{%- set variantDefaults = {
	button: 'neutral',
	tag: 'neutral',
	badge: 'brand',
	callout: 'brand'
} %}
{%- set variants = ['', 'neutral', 'brand'] %}

### Defaults

```html {.example}
<table>
	<thead>
		<tr>
			<th>Element</th>
			<th>Default</th>
			<th>Neutral</th>
			<th>Brand</th>
		</tr>
	</thead>
	{% for element, default in variantDefaults %}
	<tr>
		<th>{{ element | capitalize }}</th>
		<td><wa-{{ element }}>{{ default | capitalize }}</wa-{{ element }}></td>
		<td><wa-{{ element }} variant="neutral">Neutral</wa-{{ element }}></td>
		<td><wa-{{ element }} variant="brand">Brand</wa-{{ element }}></td>
	</tr>
	{% endfor %}
</table>
```

### Nested elements

{% set containers = [
	{parent: 'callout', child: 'button'},
	{parent: 'callout', child: 'callout'},
	{parent: 'button', child: 'badge'}
] %}

{% for container in containers %}
{% set parent = container.parent %}
{% set child = container.child %}

#### {{ child | capitalize }} in {{ parent | capitalize }}

```html {.example}
<table>
	<thead>
		<tr>
			{% if parent == child -%}
			<th>👇 Parent / Child 👉</th>
			{% else %}
			<th>👇 {{ parent | capitalize }} / {{ child | capitalize }} 👉</th>
			{%- endif %}
			<th>Default</th>
			<th>Neutral</th>
			<th>Brand</th>
		</tr>
	</thead>
	{% for parentVariant in variants %}
	{% set parentContent = (parentVariant | capitalize or 'Default') if parent == 'button' %}

	<tr>
		<th>{{ parentVariant | capitalize or 'Default' }}</th>
		{% for childVariant in variants -%}
		{% set childContent = (childVariant or parentVariant or variantDefaults[child]) | capitalize %}
		{% set childContent = childContent[0] if child == 'badge' else childContent  %}
		<td><wa-{{ parent }}{{ parentVariant | attr('variant') }}>
			{{ parentContent }}
			<wa-{{ child }}{{ childVariant | attr('variant') }}>{{ childContent }}</wa-{{ child }}>
		</wa-{{ parent }}></td>
		{% endfor %}
	</tr>
	{% endfor %}
</table>
```
{% endfor %}
