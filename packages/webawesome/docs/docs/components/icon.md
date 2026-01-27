---
title: Icon
description: Icons are symbols that can be used to represent various options within an application.
layout: component
category: Imagery
---

Web Awesome comes bundled with over 2,000 free icons courtesy of [Font Awesome](https://fontawesome.com/). These icons are part of the `default` icon library. Font Awesome Pro users can unlock additional icon families. Or, if you prefer, you can register your own [custom icon library](#icon-library).

```html {.example}
<wa-icon name="face-awesome" variant="light" label="Awesome" style="font-size: 2em;"></wa-icon>
```

:::info
Not sure which icon to use? [Find the perfect icon over at Font Awesome!](https://fontawesome.com/search?o=r&m=free&f=brands%2Cclassic)
:::

## Examples

### Families & Variants

The default icon library is Font Awesome Free, which comes with two icon families: `classic` and `brands`. Use the `family` attribute to set the icon family.

Many Font Awesome Pro icon families have variants such as `thin`, `light`, `regular`, and `solid`. Font Awesome Pro users can [provide their kit code](/docs/#using-font-awesome-kit-codes) to unlock additional premium icon families, including `sharp`, `duotone`, `sharp-duotone`, and additional Pro+ icon packs.

For supportive icon families, use the `variant` attribute to set the variant.

```html {.example}
<div class="wa-stack wa-gap-xl">
  <div class="wa-flank" style="--flank-size: 12ch;">
    <span>Classic</span>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon name="eyedropper"></wa-icon>
      <wa-icon variant="regular" name="grip-vertical"></wa-icon>
      <wa-icon variant="light" name="play"></wa-icon>
      <wa-icon variant="thin" name="star"></wa-icon>
    </div>
  </div>
  <div class="wa-flank" style="--flank-size: 12ch;">
    <span>Duotone</span>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="duotone" name="eyedropper"></wa-icon>
      <wa-icon family="duotone" variant="regular" name="grip-vertical"></wa-icon>
      <wa-icon family="duotone" variant="light" name="play"></wa-icon>
      <wa-icon family="duotone" variant="thin" name="star"></wa-icon>
    </div>
  </div>
  <div class="wa-flank" style="--flank-size: 12ch;">
    <span>Sharp</span>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="sharp" name="eyedropper"></wa-icon>
      <wa-icon family="sharp" variant="regular" name="grip-vertical"></wa-icon>
      <wa-icon family="sharp" variant="light" name="play"></wa-icon>
      <wa-icon family="sharp" variant="thin" name="star"></wa-icon>
    </div>
  </div>
  <div class="wa-flank" style="--flank-size: 12ch;">
    <span>Sharp Duotone</span>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="sharp-duotone" name="eyedropper"></wa-icon>
      <wa-icon family="sharp-duotone" variant="regular" name="grip-vertical"></wa-icon>
      <wa-icon family="sharp-duotone" variant="light" name="play"></wa-icon>
      <wa-icon family="sharp-duotone" variant="thin" name="star"></wa-icon>
    </div>
  </div>
  <div class="wa-flank" style="--flank-size: 12ch;">
    <span>Brands</span>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="brands" name="font-awesome"></wa-icon>
      <wa-icon family="brands" name="web-awesome"></wa-icon>
      <wa-icon family="brands" name="github"></wa-icon>
      <wa-icon family="brands" name="discord"></wa-icon>
    </div>
  </div>
</div>
```

### Labels

For non-decorative icons, use the `label` attribute to announce it to assistive devices.

```html {.example}
<wa-icon name="star" label="Favorite" style="font-size: 1.5em;"></wa-icon>
```

### Sizing

Icons are sized relative to the current font size. To change their size, set the `font-size` property on the icon itself or on a parent element as shown below.

```html {.example}
<div class="wa-cluster" style="font-size: 44px;">
  <wa-icon name="bell"></wa-icon>
  <wa-icon name="heart"></wa-icon>
  <wa-icon name="image"></wa-icon>
  <wa-icon name="microphone"></wa-icon>
  <wa-icon name="search"></wa-icon>
  <wa-icon name="star"></wa-icon>
</div>
```

### Auto Width

By default, icons have a `1em` height and a fixed `1.25em` width. Use the `auto-width` attribute to allow the icon to use its natural variable width.

```html {.example}
Without auto-width<br />
<div style="font-size: 1.5em; color: #193154;">
  <wa-icon family="solid" name="exclamation" style="background: lightsalmon;"></wa-icon>
  <wa-icon family="solid" name="circle-check" style="background: lightsalmon;"></wa-icon>
  <wa-icon family="solid" name="input-numeric" style="background: lightsalmon;"></wa-icon>
  <wa-icon family="solid" name="ruler-vertical" style="background: lightsalmon;"></wa-icon>
  <wa-icon family="solid" name="ruler-horizontal" style="background: lightsalmon;"></wa-icon>
  <wa-icon family="solid" name="airplay" style="background: lightsalmon;"></wa-icon>
</div>

<br />

With auto-width<br />
<div style="font-size: 1.5em; color: #193154;">
  <wa-icon auto-width family="solid" name="exclamation" style="background: lightsalmon;"></wa-icon>
  <wa-icon auto-width family="solid" name="circle-check" style="background: lightsalmon;"></wa-icon>
  <wa-icon auto-width family="solid" name="input-numeric" style="background: lightsalmon;"></wa-icon>
  <wa-icon auto-width family="solid" name="ruler-vertical" style="background: lightsalmon;"></wa-icon>
  <wa-icon auto-width family="solid" name="ruler-horizontal" style="background: lightsalmon;"></wa-icon>
  <wa-icon auto-width family="solid" name="airplay" style="background: lightsalmon;"></wa-icon>
</div>
```

### Rotating & Flipping

Web Awesome supports [Font Awesome's rotation and flip utilities](https://docs.fontawesome.com/web/style/rotate/) for adjusting icon orientation. To rotate or flip icons, use the `rotate` and `flip` attributes when you reference an icon.

```html {.example}
<wa-icon name="snowboarding" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" rotate="90" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" rotate="180" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" rotate="270" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" flip="x" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" flip="y" label="Snowboarding" style="font-size: 2em;"></wa-icon>
<wa-icon name="snowboarding" flip="both" label="Snowboarding" style="font-size: 2em;"></wa-icon>
```

### Animating

Web Awesome supports [Font Awesome's animation utilities](https://docs.fontawesome.com/web/style/animate/) for adding visual interest to icons. To select different types of animations, use the `animation` attribute when you reference an icon.

#### Beat

Use the `beat` animation to scale an icon up or down. This is useful for grabbing attention or for use with health/heart-centric icons.

```html {.example}
<wa-icon name="circle-plus" animation="beat" label="Beating Circle Plus" style="font-size: 2em;"></wa-icon>
<wa-icon name="heart" animation="beat" label="Beating Heart" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="heart"
  animation="beat"
  label="Beating Heart"
  style="font-size: 2em; --animation-duration: 0.5s;"
></wa-icon>
<wa-icon
  name="heart"
  animation="beat"
  label="Beating Heart"
  style="font-size: 2em; --animation-duration: 2s;"
></wa-icon>
<wa-icon name="heart" animation="beat" label="Beating Heart" style="font-size: 2em; --beat-scale: 2;"></wa-icon>
```

#### Fade

Use the `fade` animation to fade an icon in and out visually to grab attention in a subtle (or not so subtle) way.

```html {.example}
<wa-icon name="triangle-exclamation" animation="fade" label="Fading Warning" style="font-size: 2em;"></wa-icon>
<wa-icon name="skull-crossbones" animation="fade" label="Fading Danger" style="font-size: 2em;"></wa-icon>
<wa-icon name="desktop-arrow-down" animation="fade" label="Fading Download" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="i-cursor"
  animation="fade"
  label="Fading Cursor"
  style="font-size: 2em; --animation-duration: 2s; --fade-opacity: 0.6;"
></wa-icon>
```

#### Beat-Fade

Use the `beat-fade` animation to grab attention by visually scaling and pulsing an icon in and out.

```html {.example}
<wa-icon
  name="triangle-person-digging"
  animation="beat-fade"
  label="Beat-Fading Construction"
  style="font-size: 2em;"
></wa-icon>
<wa-icon name="square-exclamation" animation="beat-fade" label="Beat-Fading Alert" style="font-size: 2em;"></wa-icon>
<wa-icon
  name="poo-bolt"
  animation="beat-fade"
  label="Beat-Fading Lightning"
  style="font-size: 2em; --beat-fade-opacity: 0.1;--beat-fade-scale: 1.25"
></wa-icon>
<wa-icon
  name="circle-info"
  animation="beat-fade"
  label="Beat-Fading Info"
  style="font-size: 2em; --beat-fade-opacity: 0.67;--beat-fade-scale: 1.075"
></wa-icon>
```

#### Bounce

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

#### Flip

Use the `flip` animation to rotate an icon in 3D space. By default, flip rotates an icon about the Y axis 180 degrees. Flipping is helpful for transitions, processing states, or for using physical objects that one flips in the real world.

```html {.example}
<wa-icon name="compact-disc" animation="flip" label="Flipping Compact Disc" style="font-size: 2em;"></wa-icon>
<wa-icon name="camera-rotate" animation="flip" label="Flipping Camera Rotate" style="font-size: 2em;"></wa-icon>
<wa-icon name="cassette-tape" animation="flip" label="Flipping Cassette Tape" style="font-size: 2em;"></wa-icon>
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

#### Shake

Use the `shake` animation to grab attention or note that something is not allowed by shaking an icon back and forth.

```html {.example}
<wa-icon name="bell" animation="shake" label="Shaking Bell" style="font-size: 2em;"></wa-icon>
<wa-icon name="lock" animation="shake" label="Shaking Lock" style="font-size: 2em;"></wa-icon>
<wa-icon name="stopwatch" animation="shake" label="Shaking Stopwatch" style="font-size: 2em;"></wa-icon>
<wa-icon name="bomb" animation="shake" label="Shaking Bomb" style="font-size: 2em;"></wa-icon>
```

#### Spin

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
```

:::info
All [icon animations respect](https://docs.fontawesome.com/web/style/animate/#accessibility) `prefers-reduced-motion` and are automatically disabled when set to `reduce`.
:::

### Colors

Icons inherit their color from the current text color. Thus, you can set the `color` property on the `<wa-icon>` element or an ancestor to change the color.

```html {.example}
<div class="wa-cluster" style="font-size: 1.5em;">
  <wa-icon name="strawberry" style="color: salmon;"></wa-icon>
  <wa-icon name="crab" style="color: coral;"></wa-icon>
  <wa-icon name="sun" style="color: gold;"></wa-icon>
  <wa-icon name="leaf" style="color: mediumseagreen;"></wa-icon>
  <wa-icon name="cloud-showers-heavy" style="color: steelblue;"></wa-icon>
  <wa-icon name="cat-space" style="color: mediumpurple;"></wa-icon>
</div>
```

### Duotone

Font Awesome's [Duotone icons](https://docs.fontawesome.com/web/style/duotone) change with the `color` property as well, but you can customize the primary and secondary colors independently using the `--primary-color` and `--secondary-color` custom properties. To change the opacity of either, use `--primary-opacity` and `--secondary-opacity`.

Note that these custom properties will not inherit and _must be applied directly to the icon_.

```html {.example}
<div class="wa-stack">
  <div class="wa-cluster" style="font-size: 1.5em;">
    <wa-icon
      family="duotone"
      name="crow"
      style="--primary-color: dodgerblue; --secondary-color: gold; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      name="campfire"
      style="--primary-color: sienna; --secondary-color: red; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      name="birthday-cake"
      style="--primary-color: pink; --secondary-color: palevioletred; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      name="ear"
      style="--primary-color: sandybrown; --secondary-color: bisque; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      name="corn"
      style="--primary-color: mediumseagreen; --secondary-color: gold; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      name="cookie-bite"
      style="--primary-color: saddlebrown; --secondary-color: burlywood; --secondary-opacity: 1.0;"
    ></wa-icon>
  </div>

  <div class="wa-cluster" style="font-size: 1.5em;">
    <wa-icon
      family="duotone"
      variant="regular"
      name="crow"
      style="--primary-color: dodgerblue; --secondary-color: gold; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="regular"
      name="campfire"
      style="--primary-color: sienna; --secondary-color: red; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="regular"
      name="birthday-cake"
      style="--primary-color: pink; --secondary-color: palevioletred; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="regular"
      name="ear"
      style="--primary-color: sandybrown; --secondary-color: bisque; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="regular"
      name="corn"
      style="--primary-color: mediumseagreen; --secondary-color: gold; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="regular"
      name="cookie-bite"
      style="--primary-color: saddlebrown; --secondary-color: burlywood; --secondary-opacity: 1.0;"
    ></wa-icon>
  </div>

  <div class="wa-cluster" style="font-size: 1.5em;">
    <wa-icon
      family="duotone"
      variant="light"
      name="crow"
      style="--primary-color: dodgerblue; --secondary-color: gold; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="light"
      name="campfire"
      style="--primary-color: sienna; --secondary-color: red; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="light"
      name="birthday-cake"
      style="--primary-color: pink; --secondary-color: palevioletred; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="light"
      name="ear"
      style="--primary-color: sandybrown; --secondary-color: bisque; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="light"
      name="corn"
      style="--primary-color: mediumseagreen; --secondary-color: gold; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="light"
      name="cookie-bite"
      style="--primary-color: saddlebrown; --secondary-color: burlywood; --secondary-opacity: 1.0;"
    ></wa-icon>
  </div>

  <div class="wa-cluster" style="font-size: 1.5em;">
    <wa-icon
      family="duotone"
      variant="thin"
      name="crow"
      style="--primary-color: dodgerblue; --secondary-color: gold; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="thin"
      name="campfire"
      style="--primary-color: sienna; --secondary-color: red; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="thin"
      name="birthday-cake"
      style="--primary-color: pink; --secondary-color: palevioletred; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="thin"
      name="ear"
      style="--primary-color: sandybrown; --secondary-color: bisque; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="thin"
      name="corn"
      style="--primary-color: mediumseagreen; --secondary-color: gold; --secondary-opacity: 1.0;"
    ></wa-icon>
    <wa-icon
      family="duotone"
      variant="thin"
      name="cookie-bite"
      style="--primary-color: saddlebrown; --secondary-color: burlywood; --secondary-opacity: 1.0;"
    ></wa-icon>
  </div>
</div>
```

:::info
Duotone icons can be unlocked by [providing a valid Font Awesome kit code](/docs/#using-font-awesome-kit-codes).
:::

### Swap Duotone Opacity

For duotone icons, you can swap the primary and secondary opacity values using the `swap-opacity` attribute. This is useful when you want to emphasize the secondary layer of the icon.

```html {.example}
Normal duotone<br />
<div class="wa-cluster" style="font-size: 1.5em;">
  <wa-icon family="duotone" name="home"></wa-icon>
  <wa-icon family="duotone" name="user"></wa-icon>
  <wa-icon family="duotone" name="envelope"></wa-icon>
  <wa-icon family="duotone" name="calendar"></wa-icon>
</div>

<br />

Swapped duotone<br />
<div class="wa-cluster" style="font-size: 1.5em;">
  <wa-icon family="duotone" name="home" swap-opacity></wa-icon>
  <wa-icon family="duotone" name="user" swap-opacity></wa-icon>
  <wa-icon family="duotone" name="envelope" swap-opacity></wa-icon>
  <wa-icon family="duotone" name="calendar" swap-opacity></wa-icon>
</div>
```

### Font Awesome Pro+

If you're a [Font Awesome Pro+ customer](https://fontawesome.com/), you have access to even more premium icons! Just set the appropriate `family`, `variant`, and `name` on the icon.

```html {.example}
<div class="wa-stack wa-gap-xl">
  <div class="wa-flank" style="--flank-size: 10ch;">
    <a href="https://fontawesome.com/icons/packs/notdog" target="_blank">Notdog</a>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="notdog" variant="solid" name="house"></wa-icon>
      <wa-icon
        family="notdog"
        variant="duo-solid"
        name="house"
        style="--secondary-color: skyblue; --secondary-opacity: 0.8;"
      ></wa-icon>
    </div>
  </div>

  <div class="wa-flank" style="--flank-size: 10ch;">
    <a href="https://fontawesome.com/icons/packs/chisel" target="_blank">Chisel</a>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="chisel" variant="regular" name="house"></wa-icon>
    </div>
  </div>

  <div class="wa-flank" style="--flank-size: 10ch;">
    <a href="https://fontawesome.com/icons/packs/etch" target="_blank">Etch</a>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="etch" variant="solid" name="house"></wa-icon>
    </div>
  </div>

  <div class="wa-flank" style="--flank-size: 10ch;">
    <a href="https://fontawesome.com/icons/packs/jelly" target="_blank">Jelly</a>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="jelly" variant="regular" name="house"></wa-icon>
      <wa-icon
        family="jelly"
        variant="duo-regular"
        name="house"
        style="--secondary-color: skyblue; --secondary-opacity: 0.8;"
      ></wa-icon>
      <wa-icon family="jelly" variant="fill-regular" name="house"></wa-icon>
    </div>
  </div>

  <div class="wa-flank" style="--flank-size: 10ch;">
    <a href="https://fontawesome.com/icons/packs/slab" target="_blank">Slab</a>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="slab" variant="regular" name="house"></wa-icon>
      <wa-icon family="slab" variant="press-regular" name="house"></wa-icon>
    </div>
  </div>

  <div class="wa-flank" style="--flank-size: 10ch;">
    <a href="https://fontawesome.com/icons/packs/thumbprint" target="_blank">Thumbprint</a>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon
        family="thumbprint"
        variant="light"
        name="house"
        style="--secondary-color: skyblue; --secondary-opacity: 0.8;"
      ></wa-icon>
    </div>
  </div>

  <div class="wa-flank" style="--flank-size: 10ch;">
    <a href="https://fontawesome.com/icons/packs/utility" target="_blank">Utility</a>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="utility" variant="semibold" name="house"></wa-icon>
      <wa-icon
        family="utility-duo"
        variant="semibold"
        name="house"
        style="--secondary-color: skyblue; --secondary-opacity: 0.8;"
      ></wa-icon>
      <wa-icon family="utility-fill" variant="semibold" name="house"></wa-icon>
    </div>
  </div>

  <div class="wa-flank" style="--flank-size: 10ch;">
    <a href="https://fontawesome.com/icons/packs/whiteboard" target="_blank">Whiteboard</a>
    <div class="wa-cluster" style="font-size: 1.5em;">
      <wa-icon family="whiteboard" variant="semibold" name="house"></wa-icon>
    </div>
  </div>
</div>
```

:::info
Pro+ icons can be unlocked by [providing a valid Font Awesome kit code](/docs/#using-font-awesome-kit-codes).
:::

### Custom Icons

Custom icons can be loaded individually with the `src` attribute. Only SVGs on a local or CORS-enabled endpoint are supported. If you're using more than one custom icon, it might make sense to register a [custom icon library](#icon-libraries).

```html {.example}
<wa-icon src="https://shoelace.style/assets/images/shoe.svg" style="font-size: 4rem;"></wa-icon>
```

## Icon Libraries

You can register additional icons to use with the `<wa-icon>` component through icon libraries. Icon files can exist locally or on a CORS-enabled endpoint (e.g. a CDN). There is no limit to how many icon libraries you can register and there is no cost associated with registering them, as individual icons are only requested when they're used.

Web Awesome ships with two built-in icon libraries, `default` and `system`. The [default icon library](#customizing-the-default-library) is provided courtesy of [Font Awesome](https://fontawesome.com/). The [system icon library](#customizing-the-system-library) contains only a small subset of icons that are used internally by Web Awesome components.

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
      return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/${name}${suffix}.svg`;
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
      return `https://cdn.jsdelivr.net/npm/boxicons@2.0.5/svg/${folder}/${name}.svg`;
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
    resolver: name => `https://cdn.jsdelivr.net/npm/lucide-static@0.16.29/icons/${name}.svg`,
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
    resolver: name => `https://cdn.jsdelivr.net/npm/heroicons@2.0.1/24/outline/${name}.svg`,
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
    resolver: name => `https://cdn.jsdelivr.net/npm/ionicons@5.1.2/dist/ionicons/svg/${name}.svg`,
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
      return `https://cdn.jsdelivr.net/npm/@material-icons/svg@1.0.5/svg/${match[1]}/${match[3] || 'outline'}.svg`;
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
      return `https://cdn.jsdelivr.net/npm/remixicon@2.5.0/icons/${match[1]}/${match[2]}.svg`;
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
    resolver: name => `https://cdn.jsdelivr.net/npm/@tabler/icons@1.68.0/icons/${name}.svg`,
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
      return `https://cdn.jsdelivr.net/npm/@iconscout/unicons@3.0.3/svg/${match[2] === '-s' ? 'solid' : 'line'}/${
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

### Customizing the Default Library

The default icon library contains over 2,000 icons courtesy of [Font Awesome](https://fontawesome.com/). These are the icons that display when you use `<wa-icon>` without the `library` attribute. If you prefer to have these icons resolve elsewhere or to a different icon library, register an icon library using the `default` name and a custom resolver.

For example, this will change the default icon library to use [Bootstrap Icons](https://icons.getbootstrap.com/) loaded from the jsDelivr CDN.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('default', {
    resolver: (name, family) => {
      const suffix = family === 'filled' ? '-fill' : '';
      return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/${name}${suffix}.svg`;
    },
  });
</script>
```

#### Customize the default library to use SVG sprites

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

### Customizing the System Library

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
