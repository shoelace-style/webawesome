---
title: Color
description: Ensure consistent use of color and readable contrast with Web Awesome's color properties.
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
    gap: 0.25em;
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

- [Literal colors](/#literal-colors) that give familiar names to your starting color palette
- [Foundational colors](/#foundational-colors) that lay the groundwork for your theme
- [Semantic colors](/#semantic-colors) that draw attention and convey meaning


## Literal Colors

Literal colors are the lowest level color properties in your theme. Each color is identified by a name, like red or gray, and a number that roughly corresponds to the color's perceived lightness. On this scale, 100 is equal to pure white and 0 is equal to pure black.

Lightness values on this scale have a strong correlation to [relative luminance](https://www.w3.org/WAI/GL/wiki/Relative_luminance), which is used to calculate color contrast. To meet [WCAG 2.1 success criteria for minimum or enhanced contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum), even across hues, calculate the difference between the lightness values of any two colors:

- A difference of 40 ensures a minimum 3:1 contrast ratio, suitable for large text and icons (AA)
- A difference of 50 ensures a minimum 4.5:1 contrast ratio, suitable for normal text (AA) and large text (AAA)
- A difference of 60 ensures a minimum 7:1 contrast ratio, suitable for all text (AAA)

Web Awesome defines seven literal colors each with 11 lightness values using the format `--wa-color-{hue}-{tint}`.

<div class="color-name">Red</div>
<ul class="color-group">
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-95)"></div>
    <small>95</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-90)"></div>
    <small>90</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-80)"></div>
    <small>80</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-70)"></div>
    <small>70</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-60)"></div>
    <small>60</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-50)"></div>
    <small>50</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-40)"></div>
    <small>40</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-30)"></div>
    <small>30</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-20)"></div>
    <small>20</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-10)"></div>
    <small>10</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-red-05)"></div>
    <small>05</small>
  </li>
</ul>

<div class="color-name">Yellow</div>
<ul class="color-group">
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-95)"></div>
    <small>95</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-90)"></div>
    <small>90</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-80)"></div>
    <small>80</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-70)"></div>
    <small>70</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-60)"></div>
    <small>60</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-50)"></div>
    <small>50</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-40)"></div>
    <small>40</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-30)"></div>
    <small>30</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-20)"></div>
    <small>20</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-10)"></div>
    <small>10</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-yellow-05)"></div>
    <small>05</small>
  </li>
</ul>

<div class="color-name">Green</div>
<ul class="color-group">
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-95)"></div>
    <small>95</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-90)"></div>
    <small>90</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-80)"></div>
    <small>80</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-70)"></div>
    <small>70</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-60)"></div>
    <small>60</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-50)"></div>
    <small>50</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-40)"></div>
    <small>40</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-30)"></div>
    <small>30</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-20)"></div>
    <small>20</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-10)"></div>
    <small>10</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-green-05)"></div>
    <small>05</small>
  </li>
</ul>

<div class="color-name">Teal</div>
<ul class="color-group">
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-95)"></div>
    <small>95</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-90)"></div>
    <small>90</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-80)"></div>
    <small>80</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-70)"></div>
    <small>70</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-60)"></div>
    <small>60</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-50)"></div>
    <small>50</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-40)"></div>
    <small>40</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-30)"></div>
    <small>30</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-20)"></div>
    <small>20</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-10)"></div>
    <small>10</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-teal-05)"></div>
    <small>05</small>
  </li>
</ul>

<div class="color-name">Blue</div>
<ul class="color-group">
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-95)"></div>
    <small>95</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-90)"></div>
    <small>90</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-80)"></div>
    <small>80</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-70)"></div>
    <small>70</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-60)"></div>
    <small>60</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-50)"></div>
    <small>50</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-40)"></div>
    <small>40</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-30)"></div>
    <small>30</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-20)"></div>
    <small>20</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-10)"></div>
    <small>10</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-blue-05)"></div>
    <small>05</small>
  </li>
</ul>

<div class="color-name">Indigo</div>
<ul class="color-group">
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-95)"></div>
    <small>95</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-90)"></div>
    <small>90</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-80)"></div>
    <small>80</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-70)"></div>
    <small>70</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-60)"></div>
    <small>60</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-50)"></div>
    <small>50</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-40)"></div>
    <small>40</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-30)"></div>
    <small>30</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-20)"></div>
    <small>20</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-10)"></div>
    <small>10</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-indigo-05)"></div>
    <small>05</small>
  </li>
</ul>

<div class="color-name">Violet</div>
<ul class="color-group">
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-95)"></div>
    <small>95</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-90)"></div>
    <small>90</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-80)"></div>
    <small>80</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-70)"></div>
    <small>70</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-60)"></div>
    <small>60</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-50)"></div>
    <small>50</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-40)"></div>
    <small>40</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-30)"></div>
    <small>30</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-20)"></div>
    <small>20</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-10)"></div>
    <small>10</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-violet-05)"></div>
    <small>05</small>
  </li>
</ul>

<div class="color-name">Gray</div>
<ul class="color-group">
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-95)"></div>
    <small>95</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-90)"></div>
    <small>90</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-80)"></div>
    <small>80</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-70)"></div>
    <small>70</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-60)"></div>
    <small>60</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-50)"></div>
    <small>50</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-40)"></div>
    <small>40</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-30)"></div>
    <small>30</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-20)"></div>
    <small>20</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-10)"></div>
    <small>10</small>
  </li>
  <li class="color-preview">
    <div class="swatch" style="background-color: var(--wa-color-gray-05)"></div>
    <small>05</small>
  </li>
</ul>

## Foundational Colors

Foundational colors lay the groundwork for the content and structure of your project. These colors are named according to their role in your theme.

### Surfaces

Surfaces are background layers that other content rests on. Surface colors help convey hierarchy through a sense of elevation, where `--wa-color-surface-raised` is the closest to the user (e.g., dialogs and popup menus) and `--wa-color-surface-lowered` is the farthest away (e.g., wells).

| Custom Property               | Preview                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `--wa-color-surface-raised`   | <div class="swatch" style="background-color: var(--wa-color-surface-raised); box-shadow:var(--wa-shadow-s)"></div>              |
| `--wa-color-surface-default`  | <div class="swatch" style="background-color: var(--wa-color-surface-default)"></div>                                            |
| `--wa-color-surface-lowered`  | <div class="swatch" style="background-color: var(--wa-color-surface-lowered); box-shadow: inset var(--wa-shadow-s)"></div>      |
| `--wa-color-surface-border`   | <div class="swatch" style="border-color: var(--wa-color-surface-border)"></div>                                                 |

### Text

Text colors are used for standard text elements. We recommend a minimum 4.5:1 contrast ratio between text colors and surface colors.

| Custom Property          | Preview                                                    |
| ------------------------ | ---------------------------------------------------------- |
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
This is used alongside other [shadow properties](/docs/tokens/shadows) to construct your theme's shadows.

| Custom Property     | Preview                                                                     |
| ------------------- | --------------------------------------------------------------------------- |
| `--wa-color-shadow` | <div class="swatch" style="background-color: var(--wa-color-shadow)"></div> |

### Interactions

#### Focus

Web Awesome uses a single focus color for predictable keyboard navigation. This is used alongside other [focus properties](/docs/tokens/focus) to construct `--wa-focus-ring`. We recommend a minimum 3:1 contrast ratio against surface colors and background colors wherever possible.

| Custom Property    | Preview                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `--wa-color-focus` | <div class="swatch" value="--wa-color-focus" style="outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus)"></div> |

#### Hover and Active

Web Awesome leverages `color-mix()` to achieve consistent hover and active states across components without the need for untold numbers of handpicked colors. Through `color-mix()`, these custom properties contextually generate hover and active colors based on the color of the component.

| Custom Property         | Preview                                                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `--wa-color-mix-hover`  | <div class="swatch color-mix-example" value="--wa-color-mix-hover" style="--mix-color: var(--wa-color-mix-hover)"><small>mixed</small></div>  |
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

| Custom Property              |  <code>brand</code> |  <code>success</code> |  <code>neutral</code> |  <code>warning</code> | <code>danger</code> |
| ---------------------------- | ------------------- | --------------------- | --------------------- | --------------------- | ------------------- |
| `--wa-color-*-fill-quiet`    | <div class="swatch" style="background-color: var(--wa-color-brand-fill-quiet)"></div> |  <div class="swatch" style="background-color: var(--wa-color-success-fill-quiet)"></div> | <div class="swatch" style="background-color: var(--wa-color-neutral-fill-quiet)"></div> | <div class="swatch" style="background-color: var(--wa-color-warning-fill-quiet)"></div> | <div class="swatch" style="background-color: var(--wa-color-danger-fill-quiet)"></div> |
| `--wa-color-*-fill-normal`   | <div class="swatch" style="background-color: var(--wa-color-brand-fill-normal)"></div> | <div class="swatch" style="background-color: var(--wa-color-success-fill-normal)"></div> |<div class="swatch" style="background-color: var(--wa-color-neutral-fill-normal)"></div> | <div class="swatch" style="background-color: var(--wa-color-warning-fill-normal)"></div> | <div class="swatch" style="background-color: var(--wa-color-danger-fill-normal)"></div> |
| `--wa-color-*-fill-loud`     | <div class="swatch" style="background-color: var(--wa-color-brand-fill-loud)"></div> | <div class="swatch" style="background-color: var(--wa-color-success-fill-loud)"></div> | <div class="swatch" style="background-color: var(--wa-color-neutral-fill-loud)"></div> |  <div class="swatch" style="background-color: var(--wa-color-warning-fill-loud)"></div> |  <div class="swatch" style="background-color: var(--wa-color-danger-fill-loud)"></div> |
| `--wa-color-*-border-quiet`  | <div class="swatch" value="--wa-color-brand-border-quiet" style="border-color: var(--wa-color-brand-border-quiet)"></div> | <div class="swatch" value="--wa-color-success-border-quiet" style="border-color: var(--wa-color-success-border-quiet)"></div> | <div class="swatch" value="--wa-color-success-border-quiet" style="border-color: var(--wa-color-neutral-border-quiet)"></div> | <div class="swatch" value="--wa-color-warning-border-quiet" style="border-color: var(--wa-color-warning-border-quiet)"></div> | <div class="swatch" value="--wa-color-danger-border-quiet" style="border-color: var(--wa-color-danger-border-quiet)"></div> |
| `--wa-color-*-border-normal`  | <div class="swatch" value="--wa-color-brand-border-normal" style="border-color: var(--wa-color-brand-border-normal)"></div> | <div class="swatch" value="--wa-color-success-border-normal" style="border-color: var(--wa-color-success-border-normal)"></div> | <div class="swatch" value="--wa-color-success-border-normal" style="border-color: var(--wa-color-neutral-border-normal)"></div> | <div class="swatch" value="--wa-color-warning-border-normal" style="border-color: var(--wa-color-warning-border-normal)"></div> | <div class="swatch" value="--wa-color-danger-border-normal" style="border-color: var(--wa-color-danger-border-normal)"></div> |
| `--wa-color-*-border-loud`  | <div class="swatch" value="--wa-color-brand-border-loud" style="border-color: var(--wa-color-brand-border-loud)"></div> | <div class="swatch" value="--wa-color-success-border-loud" style="border-color: var(--wa-color-success-border-loud)"></div> | <div class="swatch" value="--wa-color-success-border-loud" style="border-color: var(--wa-color-neutral-border-loud)"></div> | <div class="swatch" value="--wa-color-warning-border-loud" style="border-color: var(--wa-color-warning-border-loud)"></div> | <div class="swatch" value="--wa-color-danger-border-loud" style="border-color: var(--wa-color-danger-border-loud)"></div> |
| `--wa-color-*-on-quiet`      | <div class="swatch" value="--wa-color-brand-on-quiet" style="background-color: var(--wa-color-brand-fill-quiet); color: var(--wa-color-brand-on-quiet)">AaBb</div> | <div class="swatch" value="--wa-color-success-on-quiet" style="background-color: var(--wa-color-success-fill-quiet); color: var(--wa-color-success-on-quiet)">AaBb</div> | <div class="swatch" value="--wa-color-neutral-on-quiet" style="background-color: var(--wa-color-neutral-fill-quiet); color: var(--wa-color-neutral-on-quiet)">AaBb</div> | <div class="swatch" value="--wa-color-warning-on-quiet" style="background-color: var(--wa-color-warning-fill-quiet); color: var(--wa-color-warning-on-quiet)">AaBb</div> | <div class="swatch" value="--wa-color-danger-on-quiet" style="background-color: var(--wa-color-danger-fill-quiet); color: var(--wa-color-danger-on-quiet)">AaBb</div> |
| `--wa-color-*-on-normal`     | <div class="swatch" value="--wa-color-brand-on-normal" style="background-color: var(--wa-color-brand-fill-normal); color: var(--wa-color-brand-on-normal)">AaBb</div> | <div class="swatch" value="--wa-color-success-on-normal" style="background-color: var(--wa-color-success-fill-normal); color: var(--wa-color-success-on-normal)">AaBb</div> | <div class="swatch" value="--wa-color-neutral-on-normal" style="background-color: var(--wa-color-neutral-fill-normal); color: var(--wa-color-neutral-on-normal)">AaBb</div> | <div class="swatch" value="--wa-color-warning-on-normal" style="background-color: var(--wa-color-warning-fill-normal); color: var(--wa-color-warning-on-normal)">AaBb</div> | <div class="swatch" value="--wa-color-warning-on-normal" style="background-color: var(--wa-color-danger-fill-normal); color: var(--wa-color-danger-on-normal)">AaBb</div> |
| `--wa-color-*-on-loud`       | <div class="swatch" value="--wa-color-brand-on-loud" style="background-color: var(--wa-color-brand-fill-loud); color: var(--wa-color-brand-on-loud)">AaBb</div> | <div class="swatch" value="--wa-color-success-on-loud" style="background-color: var(--wa-color-success-fill-loud); color: var(--wa-color-success-on-loud)">AaBb</div> | <div class="swatch" value="--wa-color-neutral-on-loud" style="background-color: var(--wa-color-neutral-fill-loud); color: var(--wa-color-neutral-on-loud)">AaBb</div> | <div class="swatch" value="--wa-color-warning-on-loud" style="background-color: var(--wa-color-warning-fill-loud); color: var(--wa-color-warning-on-loud)">AaBb</div> | <div class="swatch" value="--wa-color-danger-on-loud" style="background-color: var(--wa-color-danger-fill-loud); color: var(--wa-color-danger-on-loud)">AaBb</div> |

<style>
.swatch {
  position: relative;
}
.swatch wa-copy-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.swatch wa-copy-button::part(button) {
  display: block;
  height: 100%;
  width: 100%;
}

.swatch wa-copy-button {
  --background-color-hover: transparent;
  font-family: var(--wa-font-family-code);
}

.swatch wa-copy-button::part(button):hover {
  cursor: copy;
}

.swatch wa-copy-button::part(copy-icon),
.swatch wa-copy-button::part(success-icon),
.swatch wa-copy-button::part(error-icon) {
  opacity: 0 !important;
}
</style>

<script type="module">
  const computedStyle = getComputedStyle(document.body)
  document.querySelectorAll(".swatch").forEach((swatch) => {
    let varName = swatch.getAttribute("value")

    if (!varName) {
      const bgColor = swatch.style.backgroundColor
      varName = bgColor.replace(/^var\((--.*)\)$/, "$1")
    }

    const copyButton = Object.assign(document.createElement("wa-copy-button"), {
      value: varName,
      copyLabel: varName,
      errorLabel: "Whoops, your browser doesn't support this!",
    })

    swatch.appendChild(copyButton)
  })
</script>
