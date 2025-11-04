---
title: Color
description: Ensure consistent use of color and readable contrast with Web Awesome's color properties.
hasOutline: true
---

<style>
  td { vertical-align: middle; }

  .color-name {
    font-weight: var(--wa-font-weight-semibold);
    margin-block-end: var(--wa-space-2xs);
  }
  ul.color-group {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .color-group {
    align-items: start;
    display: flex;
    flex-wrap: nowrap;
    gap: var(--wa-space-3xs);

    & small {
      font-size: var(--wa-font-size-xs);
      color: var(--wa-color-text-quiet);
    }
  }
  .color-group + * {
    margin-block-start: var(--wa-space-xl);
  }
  .color-preview {
    flex: 1 1 auto;
  }
  .swatch {
    border-color: transparent;
  }
  .color-mix-example {
    background-image:
      linear-gradient(to right,
      color-mix(in oklab, transparent, var(--mix-color)) 25%,
      color-mix(in oklab, var(--wa-color-brand-fill-loud), var(--mix-color)) 25%,
      color-mix(in oklab, var(--wa-color-brand-fill-loud), var(--mix-color)) 75%,
      var(--wa-color-brand-fill-loud) 75%,
      var(--wa-color-brand-fill-loud))
    ;
    border: none;
    color: var(--wa-color-brand-on-loud);
    text-align: center;
  }
</style>

Web Awesome's color system is made up of CSS custom properties to help with consistent color use throughout your project.

Color is organized by three main categories:

- [Color scales](#color-scales) that gives you a full spectrum of hues to work with
- [Foundational colors](#foundational-colors) that lay the groundwork for your theme
- [Semantic colors](#semantic-colors) that draw attention and convey meaning

## Color Scales

Color scales are determined by your [color palette](/docs/color-palettes) and are made up of the lowest level color tokens in your theme. Each token is identified by a name, like red or gray, and numerical tint based on the color's lightness. On this scale, 100 is equal to pure white and 0 is equal to pure black.

You can use these tints to ensure accessible color contrast per [WCAG 2.1 success criteria](https://www.w3.org/TR/WCAG21/#contrast-minimum):

- A difference of 40 ensures a minimum 3:1 contrast ratio, suitable for large text and icons (AA)
- A difference of 50 ensures a minimum 4.5:1 contrast ratio, suitable for normal text (AA) and large text (AAA)
- A difference of 60 ensures a minimum 7:1 contrast ratio, suitable for all text (AAA)

You have several hand-crafted [color palettes](/docs/color-palettes) to choose from. Each palette defines 10 hues each with a scale of 11 tints using the format `--wa-color-{hue}-{tint}`.

{% for hue in ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'gray'] -%}

<div class="color-name">{{ hue | capitalize }}</div>
<ul class="color-group">
  {% for tint in ['95', '90', '80', '70', '60', '50', '40', '30', '20', '10', '05'] -%}
    <li class="color-preview">
      <div class="color swatch" style="background-color: var(--wa-color-{{ hue }}-{{ tint }})">
        <wa-copy-button value="--wa-color-{{ hue }}-{{ tint }}" copy-label="--wa-color-{{ hue }}-{{ tint }}"></wa-copy-button>
      </div>
      <small>{{ tint }}</small>
    </li>
  {%- endfor %}
</ul>
{%- endfor %}

### Semantic Scales

Any hue can be mapped to `brand`, `neutral`, `success`, `warning`, and `danger` scales. Like the tokens in a color scale, each token is identified by its semantic group and a numerical tint using the format `--wa-color-{group}-{tint}`.

{% for group in ['brand', 'neutral', 'success', 'warning', 'danger'] -%}

<div class="color-name">{{ group | capitalize }}</div>
<ul class="color-group">
  {% for tint in ['95', '90', '80', '70', '60', '50', '40', '30', '20', '10', '05'] -%}
    <li class="color-preview">
      <div class="color swatch" style="background-color: var(--wa-color-{{ group }}-{{ tint }})">
        <wa-copy-button value="--wa-color-{{ group }}-{{ tint }}" copy-label="--wa-color-{{ group }}-{{ tint }}"></wa-copy-button>
      </div>
      <small>{{ tint }}</small>
    </li>
  {%- endfor %}
</ul>
{%- endfor %}

## Foundational Colors

Foundational colors lay the groundwork for the content and structure of your project. These colors are named according to their role in your theme.

### Surfaces

Surfaces are background layers that other content rests on. Surface colors help convey hierarchy through a sense of elevation, where `--wa-color-surface-raised` is the closest to the user (e.g., dialogs and popup menus) and `--wa-color-surface-lowered` is the farthest away (e.g., wells).

| Custom Property              | Preview                                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--wa-color-surface-raised`  | <div class="swatch" style="background-color: var(--wa-color-surface-raised); box-shadow:var(--wa-shadow-s)"></div>         |
| `--wa-color-surface-default` | <div class="swatch" style="background-color: var(--wa-color-surface-default)"></div>                                       |
| `--wa-color-surface-lowered` | <div class="swatch" style="background-color: var(--wa-color-surface-lowered); box-shadow: inset var(--wa-shadow-s)"></div> |
| `--wa-color-surface-border`  | <div class="swatch" style="border-color: var(--wa-color-surface-border)"></div>                                            |

### Text

Text colors are used for standard text elements. We recommend a minimum 4.5:1 contrast ratio between text colors and surface colors.

| Custom Property          | Preview                                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `--wa-color-text-normal` | <div class="swatch" value="--wa-color-text-normal" style="color: var(--wa-color-text-normal); display: inline-block;">AaBb</div> |
| `--wa-color-text-quiet`  | <div class="swatch" value="--wa-color-text-normal" style="color: var(--wa-color-text-quiet); display: inline-block;">AaBb</div>  |
| `--wa-color-text-link`   | <div class="swatch" value="--wa-color-text-normal" style="color: var(--wa-color-text-link); display: inline-block;">AaBb</div>   |

### Overlays

Overlays provide a backdrop to isolate content, often allowing background context to show through.

| Custom Property             | Preview                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------- |
| `--wa-color-overlay-modal`  | <div class="swatch" style="background-color: var(--wa-color-overlay-modal)"></div>  |
| `--wa-color-overlay-inline` | <div class="swatch" style="background-color: var(--wa-color-overlay-inline)"></div> |

### Shadow

Web Awesome uses a single color for all shadows.
This is used alongside other [shadow tokens](/docs/tokens/shadows) to construct your theme's shadows.

| Custom Property     | Preview                                                                     |
| ------------------- | --------------------------------------------------------------------------- |
| `--wa-color-shadow` | <div class="swatch" style="background-color: var(--wa-color-shadow)"></div> |

### Interactions

#### Focus

Web Awesome uses a single focus color for predictable keyboard navigation. This is used alongside other [focus tokens](/docs/tokens/focus) to construct `--wa-focus-ring`. We recommend a minimum 3:1 contrast ratio against surface colors and background colors wherever possible.

| Custom Property    | Preview                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--wa-color-focus` | <div class="swatch" value="--wa-color-focus" style="outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus)"></div> |

#### Hover and Active

Web Awesome leverages `color-mix()` to achieve consistent hover and active states across components without the need for untold numbers of handpicked colors. Through `color-mix()`, these custom properties contextually generate hover and active colors based on the color of the component.

| Custom Property         | Preview                                                                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `--wa-color-mix-hover`  | <div class="swatch color-mix-example" value="--wa-color-mix-hover" style="--mix-color: var(--wa-color-mix-hover)"><small>mixed</small></div>   |
| `--wa-color-mix-active` | <div class="swatch color-mix-example" value="--wa-color-mix-active" style="--mix-color: var(--wa-color-mix-active)"><small>mixed</small></div> |

## Semantic Colors

Semantic colors reinforce a specific message, intended usage, or expected results through familiar, meaningful hues. Each color is identified by its semantic group, role, and attention using the format `--wa-color-{group}-{role}-{attention}`. There are five groups of semantic colors:

- **Brand** to emphasize your brand color
- **Success** for validity or confirmation
- **Neutral** for ordinary or inactive content
- **Warning** for caution or uncertainty
- **Danger** for errors or risk

Each group defines colors for specific roles so that colors can be easily assembled with predictable results and readable contrast. There are three roles:

- **Fill** for background colors or areas larger than a few pixels
- **Border** for borders, dividers, and other stroke-width elements
- **On** for content displayed on a fill (e.g., pair `--wa-color-danger-on-loud` with `--wa-color-danger-fill-loud`)

Finally, each color is named according to how much attention it draws. Here, we use noise as an analogy: a loud noise draws more attention than a quiet one. There are three levels of attention:

- **Quiet** draws the least attention
- **Normal** draws some attention
- **Loud** draws the most attention

{% set variants = ['brand', 'success', 'neutral', 'warning', 'danger'] %}

<table>
  <thead>
    <tr>
      <th>Custom Property</th>
      {% for variant in variants -%}
        <th><code>{{ variant }}</code></th>
      {%- endfor %}
    </tr>
  </thead>
  {% for type in ['fill', 'border', 'on'] -%}
    {% for attention in ['quiet', 'normal', 'loud'] -%}
      <tr>
        <td><code>--wa-color-*-{{ type }}-{{ attention }}</code></td>
        {% for variant in variants -%}
          <td>
            {%- if type == 'border' -%}
            <div class="swatch" style="border-color: var(--wa-color-{{ variant }}-{{ type }}-{{ attention }})"></div>
            {%- else -%}
            <div class="swatch" style="background-color: var(--wa-color-{{ variant }}-fill-{{ attention }}); color: var(--wa-color-{{ variant }}-on-{{ attention }})">{{ 'AaBb' if type == 'on' }}</div>
            {%- endif %}
          </td>
        {%- endfor %}
      </tr>
    {%- endfor %}
    {%- endfor %}
</table>
