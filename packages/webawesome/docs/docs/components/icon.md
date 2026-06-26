---
title: Icon
layout: component
category: Media
synonyms:
  - symbol
  - glyph
  - pictogram
  - fa icon
use-cases:
  - icon button
  - status icon
  - navigation icon
---

Web Awesome comes bundled with over 2,000 free icons courtesy of [Font Awesome](https://fontawesome.com/). These icons are part of the `default` icon library. Font Awesome Pro users can unlock additional [icon families](#families-and-variants). Or, if you prefer, you can register your own [custom icon library](#third-party-icon-libraries).

```html {.example}
<div class="wa-cluster" style="font-size: 2em;">
  <wa-icon name="star" label="Star"></wa-icon>
  <wa-icon name="heart" label="Heart"></wa-icon>
  <wa-icon name="bell" label="Bell"></wa-icon>
  <wa-icon name="cloud" label="Cloud"></wa-icon>
  <wa-icon name="camera" label="Camera"></wa-icon>
  <wa-icon name="rocket" label="Rocket"></wa-icon>
  <wa-icon name="face-smile" label="Smile"></wa-icon>
  <wa-icon name="paw" label="Paw"></wa-icon>
</div>
```

<wa-callout variant="brand">
  <wa-icon slot="icon" family="brands" name="font-awesome"></wa-icon>
  Not sure which icon to use?
  <a href="https://fontawesome.com/search?o=r&m=free&f=brands%2Cclassic">Find the perfect icon over at {{ site.siblings.fontAwesome.name }}!</a>
</wa-callout>

## Sizing

Icons are sized relative to the current font size. To change their size, set the `font-size` property on the icon itself or on a parent element — drag the slider to see it in action.

```html {.example}
<div class="icon-sizing">
  <div class="wa-cluster icon-sizing-preview" style="font-size: 2rem;">
    <wa-icon name="bell"></wa-icon>
    <wa-icon name="heart"></wa-icon>
    <wa-icon name="image"></wa-icon>
    <wa-icon name="microphone"></wa-icon>
    <wa-icon name="search"></wa-icon>
    <wa-icon name="star"></wa-icon>
  </div>

  <wa-divider></wa-divider>

  <wa-slider label="Font size" min="0" max="4" value="2" with-markers>
    <span slot="reference">1rem</span>
    <span slot="reference">1.5rem</span>
    <span slot="reference">2rem</span>
    <span slot="reference">3rem</span>
    <span slot="reference">4rem</span>
  </wa-slider>
</div>

<style>
  .icon-sizing-preview {
    min-height: 6rem;
    align-items: center;
    justify-content: center;
    margin-block-end: 1.5rem;
  }
</style>

<script>
  (() => {
    const container = document.querySelector('.icon-sizing');
    const preview = container.querySelector('.icon-sizing-preview');
    const slider = container.querySelector('wa-slider');
    const sizes = ['1rem', '1.5rem', '2rem', '3rem', '4rem'];
    slider.addEventListener('input', () => (preview.style.fontSize = sizes[slider.value]));
  })();
</script>
```

## Colors

Icons inherit their color from the current text color. Thus, you can set the `color` property on the `<wa-icon>` element or an ancestor to change the color.

```html {.example}
<div class="wa-cluster" style="font-size: 1.5em;">
  <wa-icon name="heart" style="color: salmon;"></wa-icon>
  <wa-icon name="fire" style="color: coral;"></wa-icon>
  <wa-icon name="sun" style="color: gold;"></wa-icon>
  <wa-icon name="leaf" style="color: mediumseagreen;"></wa-icon>
  <wa-icon name="cloud-showers-heavy" style="color: steelblue;"></wa-icon>
  <wa-icon name="hat-wizard" style="color: mediumpurple;"></wa-icon>
</div>
```

## Families & Variants

A _family_ sets an icon's overall style; a _variant_ sets its weight. Set them with the `family` and `variant` attributes — `family` defaults to `classic` and `variant` to `solid`.

<table>
  <thead>
    <tr>
      <th>Family</th>
      <th>Variants</th>
      <th>Plan</th>
      <th>Preview</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>classic</code></td>
      <td><code>solid</code>, <code>regular</code>, <code>light</code>, <code>thin</code></td>
      <td>Free</td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.25em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;gem&quot;></wa-icon>"><wa-icon variant="solid" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon variant=&quot;regular&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon variant="regular" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon variant=&quot;light&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon variant="light" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon variant=&quot;thin&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon variant="thin" name="gem"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>brands</code></td>
      <td>—</td>
      <td>Free</td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.25em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;brands&quot; name=&quot;font-awesome&quot;></wa-icon>"><wa-icon family="brands" name="font-awesome"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;brands&quot; name=&quot;github&quot;></wa-icon>"><wa-icon family="brands" name="github"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;brands&quot; name=&quot;discord&quot;></wa-icon>"><wa-icon family="brands" name="discord"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>duotone</code></td>
      <td><code>solid</code>, <code>regular</code>, <code>light</code>, <code>thin</code></td>
      <td>Pro</td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.25em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;duotone&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="duotone" variant="solid" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;duotone&quot; variant=&quot;regular&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="duotone" variant="regular" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;duotone&quot; variant=&quot;light&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="duotone" variant="light" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;duotone&quot; variant=&quot;thin&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="duotone" variant="thin" name="gem"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>sharp</code></td>
      <td><code>solid</code>, <code>regular</code>, <code>light</code>, <code>thin</code></td>
      <td>Pro</td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.25em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;sharp&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="sharp" variant="solid" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;sharp&quot; variant=&quot;regular&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="sharp" variant="regular" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;sharp&quot; variant=&quot;light&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="sharp" variant="light" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;sharp&quot; variant=&quot;thin&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="sharp" variant="thin" name="gem"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>sharp-duotone</code></td>
      <td><code>solid</code>, <code>regular</code>, <code>light</code>, <code>thin</code></td>
      <td>Pro</td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.25em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;sharp-duotone&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="sharp-duotone" variant="solid" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;sharp-duotone&quot; variant=&quot;regular&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="sharp-duotone" variant="regular" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;sharp-duotone&quot; variant=&quot;light&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="sharp-duotone" variant="light" name="gem"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;sharp-duotone&quot; variant=&quot;thin&quot; name=&quot;gem&quot;></wa-icon>"><wa-icon family="sharp-duotone" variant="thin" name="gem"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<wa-callout variant="brand">
  <wa-icon slot="icon" family="brands" name="font-awesome"></wa-icon>
  The <code>light</code> and <code>thin</code> variants, the <code>sharp</code>, <code>duotone</code>, and
  <code>sharp-duotone</code> families, and the <a href="#font-awesome-pro-icons">Pro+ packs</a> require a Font Awesome Pro
  plan. <a href="/docs/#using-font-awesome-kit-codes">Provide a Kit code</a> to unlock them.
</wa-callout>

## Canvas

The _canvas_ is the box an icon sits in. Choose one of four mutually exclusive modes with the `canvas` attribute (the default is `fixed`). It mirrors [{{ site.siblings.fontAwesome.name }}'s icon canvas](https://docs.fontawesome.com/web/style/icon-canvas/) and scales with `font-size`, independent of [sizing](#sizing). The tinted box below shows each canvas's extent.

<table>
  <thead>
    <tr>
      <th>Canvas</th>
      <th>Box</th>
      <th>Best For</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>fixed</code></td>
      <td><code>1.25 × 1em</code></td>
      <td>Aligning icons in lists, menus, and toolbars</td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.75em; align-items: center; justify-content: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;bookmark&quot;></wa-icon>"><wa-icon name="bookmark" style="background: var(--wa-color-brand-fill-quiet);"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>auto</code></td>
      <td><code>auto × 1em</code></td>
      <td>Matching the icon's natural width</td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.75em; align-items: center; justify-content: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;bookmark&quot; canvas=&quot;auto&quot;></wa-icon>"><wa-icon name="bookmark" canvas="auto" style="background: var(--wa-color-brand-fill-quiet);"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>square</code></td>
      <td><code>1.25 × 1.25em</code></td>
      <td>Standalone icons on a square footprint</td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.75em; align-items: center; justify-content: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;bookmark&quot; canvas=&quot;square&quot;></wa-icon>"><wa-icon name="bookmark" canvas="square" style="background: var(--wa-color-brand-fill-quiet);"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>roomy</code></td>
      <td><code>1.5 × 1.5em</code></td>
      <td>Standalone icons that need more breathing room</td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.75em; align-items: center; justify-content: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;bookmark&quot; canvas=&quot;roomy&quot;></wa-icon>"><wa-icon name="bookmark" canvas="roomy" style="background: var(--wa-color-brand-fill-quiet);"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
  </tbody>
</table>

```html {.example}
<div class="canvas-demo">
  <div class="canvas-demo-preview wa-cluster">
    <wa-icon name="ruler-horizontal" style="background: var(--wa-color-brand-fill-quiet);"></wa-icon>
    <wa-icon name="ruler-vertical" style="background: var(--wa-color-brand-fill-quiet);"></wa-icon>
    <wa-icon name="face-smile" style="background: var(--wa-color-brand-fill-quiet);"></wa-icon>
  </div>

  <wa-divider></wa-divider>

  <div class="wa-cluster wa-gap-xl" style="align-items: start;">
    <wa-select label="Canvas" name="canvas" value="fixed">
      <wa-option value="fixed">fixed</wa-option>
      <wa-option value="auto">auto</wa-option>
      <wa-option value="square">square</wa-option>
      <wa-option value="roomy">roomy</wa-option>
    </wa-select>
    <wa-slider label="Size" min="0" max="4" value="2" with-markers style="flex: 1 1 14rem;">
      <span slot="reference">1.5rem</span>
      <span slot="reference">2rem</span>
      <span slot="reference">3rem</span>
      <span slot="reference">4rem</span>
      <span slot="reference">5rem</span>
    </wa-slider>
  </div>
</div>

<style>
  .canvas-demo-preview {
    margin-block-end: 1.5rem;
    font-size: 3rem;
  }
</style>

<script>
  (() => {
    const demo = document.querySelector('.canvas-demo');
    const preview = demo.querySelector('.canvas-demo-preview');
    const icons = preview.querySelectorAll('wa-icon');
    const sizes = ['1.5rem', '2rem', '3rem', '4rem', '5rem'];

    demo.querySelector('wa-select[name="canvas"]').addEventListener('change', event => {
      icons.forEach(icon => (icon.canvas = event.target.value));
    });
    demo.querySelector('wa-slider').addEventListener('input', event => {
      preview.style.fontSize = sizes[event.target.value];
    });
  })();
</script>
```

:::info
The `auto-width` attribute still works but is deprecated — prefer `canvas="auto"`, which renders the same way.
:::

## Rotating & Flipping

Web Awesome supports [{{ site.siblings.fontAwesome.name }}'s rotation and flip utilities](https://docs.fontawesome.com/web/style/rotate/) for adjusting icon orientation. Use the `rotate` attribute to turn an icon by **any** number of degrees — not just the quarter-turns below — and the `flip` attribute to mirror it across the `x`, `y`, or `both` axes.

<table>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Value</th>
      <th>Preview</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>rotate</code></td>
      <td><code>90</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;hand-point-up&quot; rotate=&quot;90&quot;></wa-icon>"><wa-icon name="hand-point-up" rotate="90"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>rotate</code></td>
      <td><code>180</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;hand-point-up&quot; rotate=&quot;180&quot;></wa-icon>"><wa-icon name="hand-point-up" rotate="180"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>rotate</code></td>
      <td><code>270</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;hand-point-up&quot; rotate=&quot;270&quot;></wa-icon>"><wa-icon name="hand-point-up" rotate="270"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>flip</code></td>
      <td><code>x</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;hand-point-up&quot; flip=&quot;x&quot;></wa-icon>"><wa-icon name="hand-point-up" flip="x"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>flip</code></td>
      <td><code>y</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;hand-point-up&quot; flip=&quot;y&quot;></wa-icon>"><wa-icon name="hand-point-up" flip="y"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><code>flip</code></td>
      <td><code>both</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon name=&quot;hand-point-up&quot; flip=&quot;both&quot;></wa-icon>"><wa-icon name="hand-point-up" flip="both"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
  </tbody>
</table>

Rotate by any angle — and combine `rotate` and `flip` on the same icon:

```html {.example}
<wa-icon name="snowboarding" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" rotate="45" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" rotate="135" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" rotate="270" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" flip="both" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" rotate="45" flip="x" label="Snowboarding" style="font-size: 2em;"></wa-icon>
```

## Animating

Web Awesome supports [{{ site.siblings.fontAwesome.name }}'s animation utilities](https://docs.fontawesome.com/web/style/animate/) for adding visual interest to icons. To select different types of animations, use the `animation` attribute when you reference an icon.

Every animation accepts the same timing controls — `--animation-delay`, `--animation-direction`, `--animation-duration`, `--animation-iteration-count`, and `--animation-timing` — plus the animation-specific custom properties shown in each example below. All animations respect `prefers-reduced-motion` (see [Accessibility Considerations](#accessibility-considerations)).

### Beat

Use the `beat` animation to scale an icon up or down. This is useful for grabbing attention or for use with health/heart-centric icons.

```html {.example}
<wa-icon name="heart" animation="beat" label="Beating Heart" style="font-size: 2em;"></wa-icon>
<wa-icon name="circle-plus" animation="beat" label="Beating Circle Plus" style="font-size: 2em;"></wa-icon>
<!-- Use --beat-scale to control how far it grows -->
<wa-icon name="heart" animation="beat" label="Beating Heart" style="font-size: 2em; --beat-scale: 2;"></wa-icon>
```

### Fade

Use the `fade` animation to fade an icon in and out visually to grab attention in a subtle (or not so subtle) way.

```html {.example}
<wa-icon name="triangle-exclamation" animation="fade" label="Fading Warning" style="font-size: 2em;"></wa-icon>
<wa-icon name="skull-crossbones" animation="fade" label="Fading Danger" style="font-size: 2em;"></wa-icon>
<wa-icon name="cloud-arrow-down" animation="fade" label="Fading Download" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="i-cursor"
  animation="fade"
  label="Fading Cursor"
  style="font-size: 2em; --animation-duration: 2s; --fade-opacity: 0.6;"
></wa-icon>
```

### Beat-Fade

Use the `beat-fade` animation to grab attention by visually scaling and pulsing an icon in and out.

```html {.example}
<wa-icon name="person-digging" animation="beat-fade" label="Beat-Fading Construction" style="font-size: 2em;"></wa-icon>
<wa-icon name="circle-exclamation" animation="beat-fade" label="Beat-Fading Alert" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="square-exclamation"
  animation="beat-fade"
  label="Beat-Fading Alert"
  style="font-size: 2em; --beat-fade-opacity: 0.1;--beat-fade-scale: 1.25"
></wa-icon>
<wa-icon
  name="circle-info"
  animation="beat-fade"
  label="Beat-Fading Info"
  style="font-size: 2em; --beat-fade-opacity: 0.67;--beat-fade-scale: 1.075"
></wa-icon>
```

### Bounce

Use the `bounce` animation to grab attention by visually bouncing an icon up and down.

```html {.example}
<wa-icon name="volleyball" animation="bounce" label="Bouncing Volleyball" style="font-size: 2em;"></wa-icon>

<!-- bounce with extra rebound and "squish" on landing -->
<wa-icon
  name="basketball"
  animation="bounce"
  label="Bouncing Basketball"
  style="font-size: 2em; --bounce-land-scale-x: 1.2;--bounce-land-scale-y: .8;--bounce-rebound: 5px;"
></wa-icon>

<!-- bounce animation with no "squish" -->
<wa-icon
  name="frog"
  animation="bounce"
  label="Bouncing Frog"
  style="font-size: 2em; --bounce-start-scale-x: 1; --bounce-start-scale-y: 1; --bounce-jump-scale-x: 1; --bounce-jump-scale-y: 1; --bounce-land-scale-x: 1; --bounce-land-scale-y: 1;"
></wa-icon>

<!-- bounce animation with no "squish" or "rebound" -->
<wa-icon
  name="envelope"
  animation="bounce"
  label="Bouncing Envelope"
  style="font-size: 2em; --bounce-start-scale-x: 1;--bounce-start-scale-y: 1;--bounce-jump-scale-x: 1;--bounce-jump-scale-y: 1;--bounce-land-scale-x: 1;--bounce-land-scale-y: 1;--bounce-rebound: 0;"
></wa-icon>
```

### Flip

Use the `flip` animation to rotate an icon in 3D space. By default, flip rotates an icon about the Y axis 180 degrees. Flipping is helpful for transitions, processing states, or for using physical objects that one flips in the real world.

```html {.example}
<wa-icon name="compact-disc" animation="flip" label="Flipping Compact Disc" style="font-size: 2em;"></wa-icon>
<wa-icon name="camera-rotate" animation="flip" label="Flipping Camera Rotate" style="font-size: 2em;"></wa-icon>
<wa-icon name="compact-disc" animation="flip" label="Flipping Disc" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="scroll"
  animation="flip"
  label="Flipping Scroll"
  style="font-size: 2em; --flip-x: 1; --flip-y: 0"
></wa-icon>
<wa-icon
  name="money-check-dollar"
  animation="flip"
  label="Flipping Money Check Dollar"
  style="font-size: 2em; --animation-duration: 3s;"
></wa-icon>
```

### Flip 360

Use the `flip-360` animation to flip an icon all the way around in one smooth rotation — an extension of `flip` that gives it some extra oomph. It shares the same `--flip-x`, `--flip-y`, and `--flip-z` axis properties.

```html {.example}
<wa-icon name="compact-disc" animation="flip-360" label="Flipping Compact Disc" style="font-size: 2em;"></wa-icon>
<wa-icon name="camera-rotate" animation="flip-360" label="Flipping Camera Rotate" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="scroll"
  animation="flip-360"
  label="Flipping Scroll"
  style="font-size: 2em; --flip-x: 1; --flip-y: 0;"
></wa-icon>
<wa-icon
  name="compact-disc"
  animation="flip-360"
  label="Flipping Compact Disc"
  style="font-size: 2em; --animation-duration: 3s;"
></wa-icon>
```

### Shake

Use the `shake` animation to grab attention or note that something is not allowed by shaking an icon back and forth.

```html {.example}
<wa-icon name="bell" animation="shake" label="Shaking Bell" style="font-size: 2em;"></wa-icon>
<wa-icon name="lock" animation="shake" label="Shaking Lock" style="font-size: 2em;"></wa-icon>
<wa-icon name="stopwatch" animation="shake" label="Shaking Stopwatch" style="font-size: 2em;"></wa-icon>
<wa-icon name="bomb" animation="shake" label="Shaking Bomb" style="font-size: 2em;"></wa-icon>
```

### Spin

Use the `spin` animation to get any icon to rotate, and use `spin-pulse` to have it rotate with eight steps. Use `spin-reverse` to rotate counter-clockwise. This works especially well with `spinner` and everything in the spinner icons category.

```html {.example}
<wa-icon name="sync" animation="spin" label="Spinning Sync" style="font-size: 2em;"></wa-icon>
<wa-icon name="circle-notch" animation="spin" label="Spinning Circle Notch" style="font-size: 2em;"></wa-icon>
<wa-icon name="cog" animation="spin" label="Spinning Cog" style="font-size: 2em;"></wa-icon>
<wa-icon name="cog" animation="spin-reverse" label="Reverse Spinning Cog" style="font-size: 2em;"></wa-icon>
<wa-icon name="spinner" animation="spin-pulse" label="Pulse Spinning Spinner" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="spinner"
  animation="spin-pulse"
  label="Pulse Spinning Spinner"
  style="font-size: 2em; --animation-direction: reverse"
></wa-icon>

<!-- spin a set number of times, then stop -->
<wa-icon
  name="compact-disc"
  animation="spin"
  label="Spinning Compact Disc"
  style="font-size: 2em; --animation-duration: 3s; --animation-iteration-count: 5; --animation-timing: ease-in-out;"
></wa-icon>
```

### Spin Snap

Use `spin-snap` to rotate in distinct steps with a pause on each, like a clock's second hand. `spin-snap-4` stops at four positions and `spin-snap-8` at eight. Unlike `spin-pulse` — a continuous eight-step rotation — the snap animations ease into each stop. Add `--animation-direction: reverse` to any of them to run counter-clockwise.

```html {.example}
<wa-icon name="gear" animation="spin-snap" label="Snapping Gear" style="font-size: 2em;"></wa-icon>
<wa-icon name="gear" animation="spin-snap-4" label="Snapping Gear, four stops" style="font-size: 2em;"></wa-icon>
<wa-icon name="gear" animation="spin-snap-8" label="Snapping Gear, eight stops" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="gear"
  animation="spin-snap"
  label="Snapping Gear, reversed"
  style="font-size: 2em; --animation-direction: reverse;"
></wa-icon>
```

### Buzz

Use the `buzz` animation for a fast, tight vibration with rapid decay — quick attention without being loud, like a phone buzzing on a table or an expiring timer. Set `--buzz-distance` to control how far it travels.

```html {.example}
<wa-icon name="bell" animation="buzz" label="Buzzing Bell" style="font-size: 2em;"></wa-icon>
<wa-icon name="mobile" animation="buzz" label="Buzzing Phone" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="triangle-exclamation"
  animation="buzz"
  label="Buzzing Warning"
  style="font-size: 2em; --buzz-distance: 9px;"
></wa-icon>
```

### Float

Use the `float` animation for a slow, drifting motion — great for empty states, subtle attention, and adding a bit of playful lightness. Adjust `--float-height`, `--float-drift`, and `--float-tilt` to shape the motion.

```html {.example}
<wa-icon name="feather" animation="float" label="Floating Feather" style="font-size: 2em;"></wa-icon>
<wa-icon name="ghost" animation="float" label="Floating Ghost" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="feather"
  animation="float"
  label="Floating Feather"
  style="font-size: 2em; --animation-duration: 2s; --float-height: 0.5em;"
></wa-icon>
```

### Jello

Use the `jello` animation for a playful jiggle — great for calling attention to something new, fun, or interactive. Set `--jello-scale-x` and `--jello-scale-y` to control how far it deforms.

```html {.example}
<wa-icon name="cube" animation="jello" label="Jiggling Cube" style="font-size: 2em;"></wa-icon>
<wa-icon name="droplet" animation="jello" label="Jiggling Droplet" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="star"
  animation="jello"
  label="Jiggling Star"
  style="font-size: 2em; --animation-duration: 2s; --jello-scale-x: 1.3;"
></wa-icon>
```

### Swing

Use the `swing` animation for a subtle dangle with a slow decay — great for things that physically dangle, like keys or a hanging sign. Set `--swing-angle` to control the peak rotation.

```html {.example}
<wa-icon name="bell" animation="swing" label="Swinging Bell" style="font-size: 2em;"></wa-icon>
<wa-icon name="key" animation="swing" label="Swinging Key" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="bell"
  animation="swing"
  label="Swinging Bell"
  style="font-size: 2em; --animation-duration: 2s; --swing-angle: 45deg;"
></wa-icon>
```

### Wag

Use the `wag` animation, a cousin of `swing`, for a bottom-anchored wag — the top of the icon sways back and forth with a slow decay. Set `--wag-angle` to control the peak rotation.

```html {.example}
<wa-icon name="hand-pointer" animation="wag" label="Wagging Pointer" style="font-size: 2em;"></wa-icon>
<wa-icon name="hand-point-up" animation="wag" label="Wagging Finger" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="hand-point-right"
  animation="wag"
  label="Wagging Finger"
  style="font-size: 2em; --animation-duration: 2s; --wag-angle: 45deg;"
></wa-icon>
```

## Duotone

Duotone icons render on two layers — a primary and a secondary — that you can recolor and fade independently. By default both layers use `currentColor`, with the secondary layer at 40% opacity. These properties don't inherit, so set them directly on the icon.

| Property              | Description                                              | Default        |
| --------------------- | -------------------------------------------------------- | -------------- |
| `--primary-color`     | Color of the primary (foreground) layer                  | `currentColor` |
| `--secondary-color`   | Color of the secondary (background) layer                | `currentColor` |
| `--primary-opacity`   | Opacity of the primary layer                             | `1`            |
| `--secondary-opacity` | Opacity of the secondary layer                           | `0.4`          |
| `swap-opacity`        | Attribute that swaps the primary and secondary opacities | `false`        |

```html {.example}
<div class="duotone-demo">
  <div class="duotone-demo-preview wa-cluster">
    <wa-icon
      family="duotone"
      name="palette"
      label="Palette"
      style="--primary-color: #3b82f6; --secondary-color: #3b82f6;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      name="crow"
      label="Crow"
      style="--primary-color: #3b82f6; --secondary-color: #3b82f6;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      name="campfire"
      label="Campfire"
      style="--primary-color: #3b82f6; --secondary-color: #3b82f6;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      name="cloud-sun"
      label="Cloud and sun"
      style="--primary-color: #3b82f6; --secondary-color: #3b82f6;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      name="bell"
      label="Bell"
      style="--primary-color: #3b82f6; --secondary-color: #3b82f6;"
    ></wa-icon>
  </div>

  <wa-divider></wa-divider>

  <div class="wa-cluster wa-gap-xl duotone-demo-controls">
    <wa-color-picker label="Primary color" value="#3b82f6"></wa-color-picker>
    <wa-color-picker label="Secondary color" value="#3b82f6"></wa-color-picker>
    <wa-slider label="Primary opacity" min="0" max="1" step="0.1" value="1"></wa-slider>
    <wa-slider label="Secondary opacity" min="0" max="1" step="0.1" value="0.4"></wa-slider>
  </div>
</div>

<style>
  .duotone-demo-preview {
    justify-content: center;
    font-size: 4rem;
    min-height: 6rem;
    margin-block-end: 1.5rem;
  }
  .duotone-demo-controls {
    align-items: end;
  }
  .duotone-demo-controls wa-slider {
    flex: 1 1 10rem;
  }
</style>

<script>
  (() => {
    const demo = document.querySelector('.duotone-demo');
    const icons = demo.querySelectorAll('.duotone-demo-preview wa-icon');
    const [primary, secondary] = demo.querySelectorAll('wa-color-picker');
    const [primaryOpacity, secondaryOpacity] = demo.querySelectorAll('wa-slider');

    const apply = () => {
      icons.forEach(icon => {
        icon.style.setProperty('--primary-color', primary.value);
        icon.style.setProperty('--secondary-color', secondary.value);
        icon.style.setProperty('--primary-opacity', primaryOpacity.value);
        icon.style.setProperty('--secondary-opacity', secondaryOpacity.value);
      });
    };

    [primary, secondary, primaryOpacity, secondaryOpacity].forEach(control => control.addEventListener('input', apply));
  })();
</script>
```

<wa-callout variant="brand">
  <wa-icon slot="icon" family="brands" name="font-awesome"></wa-icon>
  Duotone icons can be unlocked by
  <a href="/docs/#using-font-awesome-kit-codes">providing a valid {{ site.siblings.fontAwesome.name }} Kit code</a>.
</wa-callout>

## Swap Duotone Opacity

For duotone icons, you can swap the primary and secondary opacity values using the `swap-opacity` attribute. This is useful when you want to emphasize the secondary layer of the icon.

```html {.example}
<div class="wa-stack">
  <div class="wa-cluster" style="font-size: 1.5em;">
    <wa-icon family="duotone" name="home"></wa-icon>
    <wa-icon family="duotone" name="user"></wa-icon>
    <wa-icon family="duotone" name="envelope"></wa-icon>
    <wa-icon family="duotone" name="calendar"></wa-icon>
    <span style="font-size: 1rem;">Normal</span>
  </div>
  <div class="wa-cluster" style="font-size: 1.5em;">
    <wa-icon family="duotone" name="home" swap-opacity></wa-icon>
    <wa-icon family="duotone" name="user" swap-opacity></wa-icon>
    <wa-icon family="duotone" name="envelope" swap-opacity></wa-icon>
    <wa-icon family="duotone" name="calendar" swap-opacity></wa-icon>
    <span style="font-size: 1rem;">Swapped opacity</span>
  </div>
</div>
```

## Font Awesome Pro+ Icons

If you're a [Font Awesome Pro+ customer](https://fontawesome.com/), you have access to whole packs of distinctive icons. Set the pack's `family` and `variant` like any other icon.

<table>
  <thead>
    <tr>
      <th>Pack</th>
      <th>Family</th>
      <th>Variant</th>
      <th>Preview</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/chisel" target="_blank">Chisel</a></td>
      <td><code>chisel</code></td>
      <td><code>regular</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;chisel&quot; variant=&quot;regular&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="chisel" variant="regular" name="house"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/etch" target="_blank">Etch</a></td>
      <td><code>etch</code></td>
      <td><code>solid</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;etch&quot; variant=&quot;solid&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="etch" variant="solid" name="house"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/graphite" target="_blank">Graphite</a></td>
      <td><code>graphite</code></td>
      <td><code>thin</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;graphite&quot; variant=&quot;thin&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="graphite" variant="thin" name="house"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/jelly" target="_blank">Jelly</a></td>
      <td><code>jelly</code>, <code>jelly-duo</code>, <code>jelly-fill</code></td>
      <td><code>regular</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;jelly&quot; variant=&quot;regular&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="jelly" variant="regular" name="house"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;jelly-duo&quot; variant=&quot;regular&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="jelly-duo" variant="regular" name="house" style="--secondary-color: skyblue; --secondary-opacity: 0.8;"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;jelly-fill&quot; variant=&quot;regular&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="jelly-fill" variant="regular" name="house"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/mosaic" target="_blank">Mosaic</a></td>
      <td><code>mosaic</code></td>
      <td><code>solid</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;mosaic&quot; variant=&quot;solid&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="mosaic" variant="solid" name="house"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/notdog" target="_blank">Notdog</a></td>
      <td><code>notdog</code>, <code>notdog-duo</code></td>
      <td><code>solid</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;notdog&quot; variant=&quot;solid&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="notdog" variant="solid" name="house"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;notdog-duo&quot; variant=&quot;solid&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="notdog-duo" variant="solid" name="house" style="--secondary-color: skyblue; --secondary-opacity: 0.8;"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/pixel" target="_blank">Pixel</a></td>
      <td><code>pixel</code></td>
      <td><code>regular</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;pixel&quot; variant=&quot;regular&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="pixel" variant="regular" name="house"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/slab" target="_blank">Slab</a></td>
      <td><code>slab</code>, <code>slab-press</code>, <code>slab-duo</code>, <code>slab-press-duo</code></td>
      <td><code>regular</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;slab&quot; variant=&quot;regular&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="slab" variant="regular" name="house"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;slab-press&quot; variant=&quot;regular&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="slab-press" variant="regular" name="house"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;slab-duo&quot; variant=&quot;regular&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="slab-duo" variant="regular" name="house" style="--secondary-color: skyblue; --secondary-opacity: 0.8;"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;slab-press-duo&quot; variant=&quot;regular&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="slab-press-duo" variant="regular" name="house" style="--secondary-color: skyblue; --secondary-opacity: 0.8;"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/thumbprint" target="_blank">Thumbprint</a></td>
      <td><code>thumbprint</code></td>
      <td><code>light</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;thumbprint&quot; variant=&quot;light&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="thumbprint" variant="light" name="house" style="--secondary-color: skyblue; --secondary-opacity: 0.8;"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/utility" target="_blank">Utility</a></td>
      <td><code>utility</code>, <code>utility-duo</code>, <code>utility-fill</code></td>
      <td><code>semibold</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;utility&quot; variant=&quot;semibold&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="utility" variant="semibold" name="house"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;utility-duo&quot; variant=&quot;semibold&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="utility-duo" variant="semibold" name="house" style="--secondary-color: skyblue; --secondary-opacity: 0.8;"></wa-icon></wa-copy-button>
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;utility-fill&quot; variant=&quot;semibold&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="utility-fill" variant="semibold" name="house"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/vellum" target="_blank">Vellum</a></td>
      <td><code>vellum</code></td>
      <td><code>solid</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;vellum&quot; variant=&quot;solid&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="vellum" variant="solid" name="house"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
    <tr>
      <td><a href="https://fontawesome.com/icons/packs/whiteboard" target="_blank">Whiteboard</a></td>
      <td><code>whiteboard</code></td>
      <td><code>semibold</code></td>
      <td>
        <div class="wa-cluster icon-copy-row" style="font-size: 1.5em; gap: 0.75rem; align-items: center;">
          <wa-copy-button copy-label="Copy code" value="<wa-icon family=&quot;whiteboard&quot; variant=&quot;semibold&quot; name=&quot;house&quot;></wa-icon>"><wa-icon family="whiteboard" variant="semibold" name="house"></wa-icon></wa-copy-button>
        </div>
      </td>
    </tr>
  </tbody>
</table>

<wa-callout variant="brand">
  <wa-icon slot="icon" family="brands" name="font-awesome"></wa-icon>
  Pro+ icons can be unlocked by
  <a href="/docs/#using-font-awesome-kit-codes">providing a valid {{ site.siblings.fontAwesome.name }} Kit code</a>.
</wa-callout>

## Custom Icons

Custom icons can be loaded individually with the `src` attribute. Only SVGs on a local or CORS-enabled endpoint are supported. If you're using more than one custom icon, it might make sense to register a [custom icon library](#third-party-icon-libraries).

```html {.example}
<wa-icon src="https://shoelace.style/assets/images/shoe.svg" style="font-size: 4rem;"></wa-icon>
```

## Self-hosting the Default Library

By default, icons are loaded from the {{ site.siblings.fontAwesome.name }} CDN. If you'd prefer to [download the icons](https://fontawesome.com/download) and serve them from your own server, you can use the `setIconPath()` function to point the default icon library at your self-hosted directory.

When you download {{ site.siblings.fontAwesome.name }}, the archive will contain an `svgs` directory with subfolders such as `solid/`, `regular/`, `brands/`, etc. Copy the `svgs` directory (or its contents) into your project and set the icon path to point to it.

```html
<script type="module">
  import { setIconPath } from '/dist/webawesome.js';

  // Point to the `svgs` directory from your Font Awesome download
  setIconPath('/assets/fontawesome/svgs');
</script>
```

After calling `setIconPath()`, icons will resolve to your self-hosted directory instead of the CDN. For example, `<wa-icon name="house">` will load from `/assets/fontawesome/svgs/solid/house.svg`.

For more control over how icon URLs are constructed, you can use the `getIconFolder()` helper along with `registerIconLibrary()` to build a custom resolver. The `getIconFolder()` function maps a family and variant to the correct folder name, so you don't have to replicate that logic yourself.

```html
<script type="module">
  import { getIconFolder, registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('default', {
    resolver: (name, family, variant) => {
      const folder = getIconFolder(name, family, variant);
      return `/assets/fontawesome/svgs/${folder}/${name}.svg?v=2`;
    },
  });
</script>
```

:::warning
`setIconPath()` must be called before Web Awesome components are loaded, similar to `setBasePath()` and `setKitCode()`.
:::

## Customizing the Default Library

The default icon library contains over 2,000 icons courtesy of [{{ site.siblings.fontAwesome.name }}]({{ site.siblings.fontAwesome.url }}). These are the icons that display when you use `<wa-icon>` without the `library` attribute. If you prefer to have these icons resolve elsewhere or to a different icon library, register an icon library using the `default` name and a custom resolver.

For example, this will change the default icon library to use [Bootstrap Icons](https://icons.getbootstrap.com/) loaded from the jsDelivr CDN.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('default', {
    resolver: (name, family) => {
      const suffix = family === 'filled' ? '-fill' : '';
      return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/icons/${name}${suffix}.svg`;
    },
  });
</script>
```

### Customize the default library to use SVG sprites

To improve performance you can use a SVG sprites to avoid multiple trips for each SVG. The browser will load the sprite sheet once and then you reference the particular SVG within the sprite sheet using hash selector.

As always, make sure to benchmark these changes. When using HTTP/2, it may in fact be more bandwidth-friendly to use multiple small requests instead of 1 large sprite sheet.

:::warning
When using sprite sheets, the `wa-load` and `wa-error` events will not fire.

For security reasons, browsers may apply the same-origin policy on `<use>` elements located in the `<wa-icon>` shadow DOM and may refuse to load a cross-origin URL. There is currently no defined way to set a cross-origin policy for `<use>` elements. For this reason, sprite sheets should only be used if you're self-hosting them.
:::

```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('sprite', {
    resolver: name => `/assets/images/sprite.svg#${name}`,
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
    spriteSheet: true,
  });
</script>
```

## Customizing the System Library

The system library contains only the icons used internally by Web Awesome components. Unlike the default icon library, the system library does not rely on physical assets. Instead, its icons are hard-coded as data URIs into the resolver to ensure their availability.

If you want to change the icons Web Awesome uses internally, you can register an icon library using the `system` name and a custom resolver. If you choose to do this, it's your responsibility to provide all of the icons that are required by components. You can reference `src/components/library.system.ts` for a complete list of system icons used by Web Awesome.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('system', {
    resolver: name => `/path/to/custom/icons/${name}.svg`,
  });
</script>
```

## Third-party Icon Libraries

You can register additional icons to use with the `<wa-icon>` component through icon libraries. Icon files can exist locally or on a CORS-enabled endpoint (e.g. a CDN). There is no limit to how many icon libraries you can register and there is no cost associated with registering them, as individual icons are only requested when they're used.

[Sizing](#sizing), [colors](#colors), [the canvas](#canvas), [rotating and flipping](#rotating-and-flipping), and [animations](#animating) work with icons from any library — they're applied to the `<wa-icon>` host, so they don't depend on where the icon comes from. (Only the duotone color properties are specific to Font Awesome's duotone icons.)

Web Awesome ships with two built-in icon libraries, `default` and `system`. The [default icon library](#customizing-the-default-library) is provided courtesy of [{{ site.siblings.fontAwesome.name }}]({{ site.siblings.fontAwesome.url }}). The [system icon library](#customizing-the-system-library) contains only a small subset of icons that are used internally by Web Awesome components.

To register an additional icon library, use the `registerIconLibrary()` function that's exported from `dist/webawesome.js`. At a minimum, you must provide a name and a resolver function. The resolver function translates an icon name to a URL where the corresponding SVG file exists. Refer to the examples below to better understand how it works.

If necessary, a mutator function can be used to mutate the SVG element before rendering. This is necessary for some libraries due to the many possible ways SVGs are crafted. For example, icons should ideally inherit the current text color via `currentColor`, so you may need to apply `fill="currentColor` or `stroke="currentColor"` to the SVG element using this function.

Here's an example that registers an icon library located in the `/assets/icons` directory.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('my-icons', {
    resolver: (name, family, variant) => `/assets/icons/${name}.svg`,
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
  });
</script>
```

To display an icon, set the `library` and `name` attributes of an `<wa-icon>` element.

```html
<!-- This will show the icon located at /assets/icons/smile.svg -->
<wa-icon library="my-icons" name="smile"></wa-icon>
```

If an icon is used before registration occurs, it will be empty initially but shown when registered.

The following examples demonstrate how to register a number of popular, open source icon libraries via CDN. Feel free to adapt the code as you see fit to use your own origin or naming conventions.

### Bootstrap Icons

This will register the [Bootstrap Icons](https://icons.getbootstrap.com/) library using the jsDelivr CDN. This library has two families: `regular` and `filled`.

Icons in this library are licensed under the [MIT License](https://github.com/twbs/icons/blob/main/LICENSE).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('bootstrap', {
    resolver: (name, family) => {
      const suffix = family === 'filled' ? '-fill' : '';
      return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/icons/${name}${suffix}.svg`;
    },
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="bootstrap" name="backpack"></wa-icon>
  <wa-icon library="bootstrap" name="cup-hot"></wa-icon>
  <wa-icon library="bootstrap" name="envelope-heart"></wa-icon>
  <wa-icon library="bootstrap" name="inboxes"></wa-icon>
  <wa-icon library="bootstrap" name="lamp"></wa-icon>
  <wa-icon library="bootstrap" name="piggy-bank"></wa-icon>
  <br />
  <wa-icon library="bootstrap" family="filled" name="backpack"></wa-icon>
  <wa-icon library="bootstrap" family="filled" name="cup-hot"></wa-icon>
  <wa-icon library="bootstrap" family="filled" name="envelope-heart"></wa-icon>
  <wa-icon library="bootstrap" family="filled" name="inboxes"></wa-icon>
  <wa-icon library="bootstrap" family="filled" name="lamp"></wa-icon>
  <wa-icon library="bootstrap" family="filled" name="piggy-bank"></wa-icon>
</div>
```

### Boxicons

This will register the [Boxicons](https://boxicons.com/) library using the jsDelivr CDN. This library has three variations: regular (`bx-*`), solid (`bxs-*`), and logos (`bxl-*`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Creative Commons 4.0 License](https://github.com/atisawd/boxicons#license).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('boxicons', {
    resolver: name => {
      let folder = 'regular';
      if (name.substring(0, 4) === 'bxs-') folder = 'solid';
      if (name.substring(0, 4) === 'bxl-') folder = 'logos';
      return `https://cdn.jsdelivr.net/npm/boxicons@2.1.4/svg/${folder}/${name}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="boxicons" name="bx-bot"></wa-icon>
  <wa-icon library="boxicons" name="bx-cookie"></wa-icon>
  <wa-icon library="boxicons" name="bx-joystick"></wa-icon>
  <wa-icon library="boxicons" name="bx-save"></wa-icon>
  <wa-icon library="boxicons" name="bx-server"></wa-icon>
  <wa-icon library="boxicons" name="bx-wine"></wa-icon>
  <br />
  <wa-icon library="boxicons" name="bxs-bot"></wa-icon>
  <wa-icon library="boxicons" name="bxs-cookie"></wa-icon>
  <wa-icon library="boxicons" name="bxs-joystick"></wa-icon>
  <wa-icon library="boxicons" name="bxs-save"></wa-icon>
  <wa-icon library="boxicons" name="bxs-server"></wa-icon>
  <wa-icon library="boxicons" name="bxs-wine"></wa-icon>
  <br />
  <wa-icon library="boxicons" name="bxl-apple"></wa-icon>
  <wa-icon library="boxicons" name="bxl-chrome"></wa-icon>
  <wa-icon library="boxicons" name="bxl-edge"></wa-icon>
  <wa-icon library="boxicons" name="bxl-firefox"></wa-icon>
  <wa-icon library="boxicons" name="bxl-opera"></wa-icon>
  <wa-icon library="boxicons" name="bxl-microsoft"></wa-icon>
</div>
```

### Lucide

This will register the [Lucide](https://lucide.dev/) icon library using the jsDelivr CDN. This project is a community-maintained fork of the popular [Feather](https://feathericons.com/) icon library.

Icons in this library are licensed under the [MIT License](https://github.com/lucide-icons/lucide/blob/master/LICENSE).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('lucide', {
    resolver: name => `https://cdn.jsdelivr.net/npm/lucide-static@1.8.0/icons/${name}.svg`,
    mutator: svg =>
      svg.querySelectorAll('path').forEach(path => {
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
      }),
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="lucide" name="feather"></wa-icon>
  <wa-icon library="lucide" name="pie-chart"></wa-icon>
  <wa-icon library="lucide" name="settings"></wa-icon>
  <wa-icon library="lucide" name="map-pin"></wa-icon>
  <wa-icon library="lucide" name="printer"></wa-icon>
  <wa-icon library="lucide" name="shopping-cart"></wa-icon>
</div>
```

### Heroicons

This will register the [Heroicons](https://heroicons.com/) library using the jsDelivr CDN.

Icons in this library are licensed under the [MIT License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('heroicons', {
    resolver: name => `https://cdn.jsdelivr.net/npm/heroicons@2.2.0/24/outline/${name}.svg`,
    mutator: svg =>
      svg.querySelectorAll('path').forEach(path => {
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
      }),
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="heroicons" name="chat-bubble-left"></wa-icon>
  <wa-icon library="heroicons" name="cloud"></wa-icon>
  <wa-icon library="heroicons" name="cog"></wa-icon>
  <wa-icon library="heroicons" name="document-text"></wa-icon>
  <wa-icon library="heroicons" name="gift"></wa-icon>
  <wa-icon library="heroicons" name="speaker-wave"></wa-icon>
</div>
```

### Iconoir

This will register the [Iconoir](https://iconoir.com/) library using the jsDelivr CDN.

Icons in this library are licensed under the [MIT License](https://github.com/lucaburgio/iconoir/blob/master/LICENSE).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('iconoir', {
    resolver: (name, family) => {
      return `https://cdn.jsdelivr.net/npm/iconoir@7.11.0/icons/regular/${name}.svg`;
    },
    mutator: svg =>
      svg.querySelectorAll('path').forEach(path => {
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
      }),
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="iconoir" name="check-circle"></wa-icon>
  <wa-icon library="iconoir" name="drawer"></wa-icon>
  <wa-icon library="iconoir" name="keyframes"></wa-icon>
  <wa-icon library="iconoir" name="headset-help"></wa-icon>
  <wa-icon library="iconoir" name="color-picker"></wa-icon>
  <wa-icon library="iconoir" name="wifi"></wa-icon>
</div>
```

### Ionicons

This will register the [Ionicons](https://ionicons.com/) library using the jsDelivr CDN. This library has three variations: outline (default), filled (`*-filled`), and sharp (`*-sharp`). A mutator function is required to polyfill a handful of styles we're not including.

Icons in this library are licensed under the [MIT License](https://github.com/ionic-team/ionicons/blob/master/LICENSE).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('ionicons', {
    resolver: name => `https://cdn.jsdelivr.net/npm/ionicons@8.0.13/dist/ionicons/svg/${name}.svg`,
    mutator: svg => {
      svg.setAttribute('fill', 'currentColor');
      svg.setAttribute('stroke', 'currentColor');
      [...svg.querySelectorAll('.ionicon-fill-none')].map(el => el.setAttribute('fill', 'none'));
      [...svg.querySelectorAll('.ionicon-stroke-width')].map(el => el.setAttribute('stroke-width', '32px'));
    },
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="ionicons" name="alarm"></wa-icon>
  <wa-icon library="ionicons" name="american-football"></wa-icon>
  <wa-icon library="ionicons" name="bug"></wa-icon>
  <wa-icon library="ionicons" name="chatbubble"></wa-icon>
  <wa-icon library="ionicons" name="settings"></wa-icon>
  <wa-icon library="ionicons" name="warning"></wa-icon>
  <br />
  <wa-icon library="ionicons" name="alarm-outline"></wa-icon>
  <wa-icon library="ionicons" name="american-football-outline"></wa-icon>
  <wa-icon library="ionicons" name="bug-outline"></wa-icon>
  <wa-icon library="ionicons" name="chatbubble-outline"></wa-icon>
  <wa-icon library="ionicons" name="settings-outline"></wa-icon>
  <wa-icon library="ionicons" name="warning-outline"></wa-icon>
  <br />
  <wa-icon library="ionicons" name="alarm-sharp"></wa-icon>
  <wa-icon library="ionicons" name="american-football-sharp"></wa-icon>
  <wa-icon library="ionicons" name="bug-sharp"></wa-icon>
  <wa-icon library="ionicons" name="chatbubble-sharp"></wa-icon>
  <wa-icon library="ionicons" name="settings-sharp"></wa-icon>
  <wa-icon library="ionicons" name="warning-sharp"></wa-icon>
</div>
```

### Jam Icons

This will register the [Jam Icons](https://jam-icons.com/) library using the jsDelivr CDN. This library has two variations: regular (default) and filled (`*-f`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [MIT License](https://github.com/michaelampr/jam/blob/master/LICENSE).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('jam', {
    resolver: name => `https://cdn.jsdelivr.net/npm/jam-icons@2.0.0/svg/${name}.svg`,
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="jam" name="calendar"></wa-icon>
  <wa-icon library="jam" name="camera"></wa-icon>
  <wa-icon library="jam" name="filter"></wa-icon>
  <wa-icon library="jam" name="leaf"></wa-icon>
  <wa-icon library="jam" name="picture"></wa-icon>
  <wa-icon library="jam" name="set-square"></wa-icon>
  <br />
  <wa-icon library="jam" name="calendar-f"></wa-icon>
  <wa-icon library="jam" name="camera-f"></wa-icon>
  <wa-icon library="jam" name="filter-f"></wa-icon>
  <wa-icon library="jam" name="leaf-f"></wa-icon>
  <wa-icon library="jam" name="picture-f"></wa-icon>
  <wa-icon library="jam" name="set-square-f"></wa-icon>
</div>
```

### Material Icons

This will register the [Material Icons](https://material.io/resources/icons/?style=baseline) library using the jsDelivr CDN. This library has three variations: outline (default), round (`*_round`), and sharp (`*_sharp`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Apache 2.0 License](https://github.com/google/material-design-icons/blob/master/LICENSE).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('material', {
    resolver: name => {
      const match = name.match(/^(.*?)(_(round|sharp))?$/);
      return `https://cdn.jsdelivr.net/npm/@material-icons/svg@1.0.33/svg/${match[1]}/${match[3] || 'outline'}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="material" name="notifications"></wa-icon>
  <wa-icon library="material" name="email"></wa-icon>
  <wa-icon library="material" name="delete"></wa-icon>
  <wa-icon library="material" name="volume_up"></wa-icon>
  <wa-icon library="material" name="settings"></wa-icon>
  <wa-icon library="material" name="shopping_basket"></wa-icon>
  <br />
  <wa-icon library="material" name="notifications_round"></wa-icon>
  <wa-icon library="material" name="email_round"></wa-icon>
  <wa-icon library="material" name="delete_round"></wa-icon>
  <wa-icon library="material" name="volume_up_round"></wa-icon>
  <wa-icon library="material" name="settings_round"></wa-icon>
  <wa-icon library="material" name="shopping_basket_round"></wa-icon>
  <br />
  <wa-icon library="material" name="notifications_sharp"></wa-icon>
  <wa-icon library="material" name="email_sharp"></wa-icon>
  <wa-icon library="material" name="delete_sharp"></wa-icon>
  <wa-icon library="material" name="volume_up_sharp"></wa-icon>
  <wa-icon library="material" name="settings_sharp"></wa-icon>
  <wa-icon library="material" name="shopping_basket_sharp"></wa-icon>
</div>
```

### Remix Icon

This will register the [Remix Icon](https://remixicon.com/) library using the jsDelivr CDN. This library groups icons by categories, so the name must include the category and icon separated by a slash, as well as the `-line` or `-fill` suffix as needed. A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Apache 2.0 License](https://github.com/Remix-Design/RemixIcon/blob/master/License).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('remixicon', {
    resolver: name => {
      const match = name.match(/^(.*?)\/(.*?)?$/);
      match[1] = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      return `https://cdn.jsdelivr.net/npm/remixicon@4.9.1/icons/${match[1]}/${match[2]}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="remixicon" name="business/cloud-line"></wa-icon>
  <wa-icon library="remixicon" name="design/brush-line"></wa-icon>
  <wa-icon library="remixicon" name="business/pie-chart-line"></wa-icon>
  <wa-icon library="remixicon" name="development/bug-line"></wa-icon>
  <wa-icon library="remixicon" name="media/image-line"></wa-icon>
  <wa-icon library="remixicon" name="system/alert-line"></wa-icon>
  <br />
  <wa-icon library="remixicon" name="business/cloud-fill"></wa-icon>
  <wa-icon library="remixicon" name="design/brush-fill"></wa-icon>
  <wa-icon library="remixicon" name="business/pie-chart-fill"></wa-icon>
  <wa-icon library="remixicon" name="development/bug-fill"></wa-icon>
  <wa-icon library="remixicon" name="media/image-fill"></wa-icon>
  <wa-icon library="remixicon" name="system/alert-fill"></wa-icon>
</div>
```

### Tabler Icons

This will register the [Tabler Icons](https://tabler-icons.io/) library using the jsDelivr CDN. This library features over 1,950 open source icons.

Icons in this library are licensed under the [MIT License](https://github.com/tabler/tabler-icons/blob/master/LICENSE).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('tabler', {
    resolver: name => `https://cdn.jsdelivr.net/npm/@tabler/icons@2.47.0/icons/${name}.svg`,
    mutator: svg => {
      svg.style.fill = 'none';
      svg.setAttribute('stroke', 'currentColor');
    },
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="tabler" name="alert-triangle"></wa-icon>
  <wa-icon library="tabler" name="arrow-back"></wa-icon>
  <wa-icon library="tabler" name="at"></wa-icon>
  <wa-icon library="tabler" name="ball-baseball"></wa-icon>
  <wa-icon library="tabler" name="cake"></wa-icon>
  <wa-icon library="tabler" name="files"></wa-icon>
  <br />
  <wa-icon library="tabler" name="keyboard"></wa-icon>
  <wa-icon library="tabler" name="moon"></wa-icon>
  <wa-icon library="tabler" name="pig"></wa-icon>
  <wa-icon library="tabler" name="printer"></wa-icon>
  <wa-icon library="tabler" name="ship"></wa-icon>
  <wa-icon library="tabler" name="toilet-paper"></wa-icon>
</div>
```

### Unicons

This will register the [Unicons](https://iconscout.com/unicons) library using the jsDelivr CDN. This library has two variations: line (default) and solid (`*-s`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Apache 2.0 License](https://github.com/Iconscout/unicons/blob/master/LICENSE). Some of the icons that appear on the Unicons website, particularly many of the solid variations, require a license and are therefore not available in the CDN.

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('unicons', {
    resolver: name => {
      const match = name.match(/^(.*?)(-s)?$/);
      return `https://cdn.jsdelivr.net/npm/@iconscout/unicons@4.2.0/svg/${match[2] === '-s' ? 'solid' : 'line'}/${
        match[1]
      }.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="unicons" name="clock"></wa-icon>
  <wa-icon library="unicons" name="graph-bar"></wa-icon>
  <wa-icon library="unicons" name="padlock"></wa-icon>
  <wa-icon library="unicons" name="polygon"></wa-icon>
  <wa-icon library="unicons" name="rocket"></wa-icon>
  <wa-icon library="unicons" name="star"></wa-icon>
  <br />
  <wa-icon library="unicons" name="clock-s"></wa-icon>
  <wa-icon library="unicons" name="graph-bar-s"></wa-icon>
  <wa-icon library="unicons" name="padlock-s"></wa-icon>
  <wa-icon library="unicons" name="polygon-s"></wa-icon>
  <wa-icon library="unicons" name="rocket-s"></wa-icon>
  <wa-icon library="unicons" name="star-s"></wa-icon>
</div>
```

## Accessibility Considerations

Web Awesome hides an unlabeled `<wa-icon>` from assistive devices, so an icon is presentational unless you give it a name. The two things to get right are labeling icons that carry meaning and respecting users who prefer less motion.

### Labeling Icons

Give an icon a `label` when it carries meaning on its own — when it's the only content of a control, or conveys status. Omit it when nearby text already says the same; unlabeled icons are hidden from assistive devices.

<table>
  <thead>
    <tr>
      <th>Scenario</th>
      <th>Label?</th>
      <th>In Context</th>
      <th>Why</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Icon-only control</td>
      <td>Yes</td>
      <td style="white-space: nowrap;">
        <wa-button appearance="outlined" size="s"><wa-icon name="gear" label="Settings"></wa-icon></wa-button>
      </td>
      <td><small>The icon is the button's only content, so the <code>label</code> gives it an accessible name.</small></td>
    </tr>
    <tr>
      <td>Status icon</td>
      <td>Yes</td>
      <td style="white-space: nowrap;">
        <wa-badge variant="success"><wa-icon name="circle-check" label="Paid"></wa-icon> Invoice #1042</wa-badge>
      </td>
      <td><small>The icon conveys status the nearby text doesn't.</small></td>
    </tr>
    <tr>
      <td>Icon beside its own text</td>
      <td>No</td>
      <td style="white-space: nowrap;">
        <wa-button appearance="outlined" size="s">
          <wa-icon slot="start" name="arrow-up-from-bracket"></wa-icon> Share
        </wa-button>
      </td>
      <td><small>The visible “Share” text already names the action; a label would be announced twice.</small></td>
    </tr>
    <tr>
      <td>Decorative</td>
      <td>No</td>
      <td style="white-space: nowrap;">
        <wa-callout variant="brand" size="s" style="padding: 0.5em 0.75em;">
          <wa-icon slot="icon" name="circle-info"></wa-icon>
          Check your inbox
        </wa-callout>
      </td>
      <td><small>It only decorates text that already carries the meaning.</small></td>
    </tr>
  </tbody>
</table>

Set the `label` attribute to the text a screen reader should announce:

```html {.example}
<wa-icon name="circle-check" label="Task complete" style="font-size: 2em;"></wa-icon>
<wa-icon name="triangle-exclamation" label="Warning" style="font-size: 2em;"></wa-icon>
<wa-icon name="trash" label="Delete" style="font-size: 2em;"></wa-icon>
<wa-icon name="bell" label="Notifications" style="font-size: 2em;"></wa-icon>
```

### Reduced Motion

All [icon animations](#animating) honor the user's `prefers-reduced-motion` setting — when it's set to `reduce`, Web Awesome disables them automatically so motion never becomes a barrier. See [{{ site.siblings.fontAwesome.name }}'s animation accessibility notes](https://docs.fontawesome.com/web/style/animate/#accessibility) for more.
