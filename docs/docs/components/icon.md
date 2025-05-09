---
title: Icon
description: Icons are symbols that can be used to represent various options within an application.
tags: [imagery, apps, popular]
icon: icon
---

Web Awesome comes bundled with over 2,000 free icons courtesy of [Font Awesome](https://fontawesome.com/). These icons are part of the `default` icon library. Font Awesome Pro users can unlock additional icon families. Or, if you prefer, you can register your own [custom icon library](#icon-library).

:::info
Not sure which icon to use? [Find the perfect icon over at Font Awesome!](https://fontawesome.com/search?o=r&m=free&f=brands%2Cclassic)
:::

## Examples

### Families & Variants

The default icon library is Font Awesome Free, which comes with two icon families: `classic` and `brands`. Use the `family` attribute to set the icon family.

Many Font Awesome Pro icon families have variants such as `thin`, `light`, `regular`, and `solid`. Font Awesome Pro users can [provide their kit code](/docs/#using-font-awesome-kit-codes) to unlock additional families, including `sharp`, `duotone`, and `sharp-duotone`. For these icon families, use the `variant` attribute to set the variant.

```html {.example}
  <wa-icon family="brands" name="font-awesome"></wa-icon>
  <wa-icon family="brands" name="web-awesome"></wa-icon>
  <wa-icon family="classic" variant="light" name="sparkles"></wa-icon>
  <wa-icon family="sharp" variant="solid" name="fire"></wa-icon>
  <wa-icon family="duotone" variant="regular" name="cake-slice"></wa-icon>
```

### Setting defaults via CSS

You can use certain CSS custom properties to set icon defaults, not just on the icon itself, but any ancestor.
This can be useful when you want certain parameters to vary based on context, e.g. icons inside callouts or all icons for a given theme.

:::warning
These CSS properties are intended to set **defaults**, and thus only make a difference when the corresponding attributes are not set.
In future versions of Web Awesome, we may change this behavior to allow CSS properties to override attributes if `!important` is used.
:::

For example, here is how you can use CSS custom properties to set a default icon for each type of callout:

```html {.example}
<wa-callout>
  <!-- Look ma, no attributes! -->
  <wa-icon slot="icon"></wa-icon>
  This is a normal callout.
</wa-callout>

<wa-callout variant="danger">
  <wa-icon slot="icon" name="dumpster-fire" variant="solid"></wa-icon>
  This is a callout with an explicit icon, which overrides these defaults.
</wa-callout>

<wa-callout variant="warning">
  <!-- Look ma, no attributes! -->
  <wa-icon slot="icon"></wa-icon>
  Here be dragons.
</wa-callout>

<wa-callout variant="danger">
  <!-- Look ma, no attributes! -->
  <wa-icon slot="icon"></wa-icon>
  Here be more dragons.
</wa-callout>

<wa-callout variant="success">
  <!-- Look ma, no attributes! -->
  <wa-icon slot="icon"></wa-icon>
  Success!
</wa-callout>

<style>
wa-callout {
  --wa-icon-variant: regular;
  --wa-icon-name: info-circle;

  &[variant="warning"] {
    --wa-icon-name: triangle-exclamation;
  }

  &[variant="danger"] {
    --wa-icon-name: circle-exclamation;
  }

  &[variant="success"] {
    --wa-icon-name: circle-check;
  }
}
</style>
```

You can even set icons dynamically, as a response to user interaction or media queries.
For example, here's how we can change the icon on hover:

```html {.example}
<wa-button class="github" href="https://github.com/webawesome/webawesome"><wa-icon slot="prefix" fixed-width></wa-icon> GitHub Repo</wa-button>
<style>
.github {
  --wa-icon-name: github;
  --wa-icon-family: brands;

  &:hover {
    --wa-icon-name: arrow-up-right-from-square;
    --wa-icon-family: classic;
  }
}
</style>
```

### Colors

Icons inherit their color from the current text color. Thus, you can set the `color` property on the `<wa-icon>` element or an ancestor to change the color.

```html {.example}
<div style="color: #4a90e2;">
  <wa-icon name="exclamation-triangle"></wa-icon>
  <wa-icon name="archive"></wa-icon>
  <wa-icon name="battery-three-quarters"></wa-icon>
  <wa-icon name="bell"></wa-icon>
</div>
<div style="color: #9013fe;">
  <wa-icon name="clock"></wa-icon>
  <wa-icon name="cloud"></wa-icon>
  <wa-icon name="download"></wa-icon>
  <wa-icon name="file"></wa-icon>
</div>
<div style="color: #417505;">
  <wa-icon name="flag"></wa-icon>
  <wa-icon name="heart"></wa-icon>
  <wa-icon name="image"></wa-icon>
  <wa-icon name="bolt-lightning"></wa-icon>
</div>
<div style="color: #f5a623;">
  <wa-icon name="microphone"></wa-icon>
  <wa-icon name="search"></wa-icon>
  <wa-icon name="star"></wa-icon>
  <wa-icon name="trash"></wa-icon>
</div>
```

### Sizing

Icons are sized relative to the current font size. To change their size, set the `font-size` property on the icon itself or on a parent element as shown below.

```html {.example}
<div style="font-size: 32px;">
  <wa-icon name="bell"></wa-icon>
  <wa-icon name="heart"></wa-icon>
  <wa-icon name="image"></wa-icon>
  <wa-icon name="microphone"></wa-icon>
  <wa-icon name="search"></wa-icon>
  <wa-icon name="star"></wa-icon>
</div>
```

### Fixed Width Icons

By default, icons have a 1em height and a variable width. Use the `fixed-width` attribute to render the host element in a 1em by 1em box.

```html {.example}
<wa-icon fixed-width name="cloud"></wa-icon>
<wa-icon fixed-width name="user"></wa-icon>
<wa-icon fixed-width name="truck"></wa-icon>
<wa-icon fixed-width name="file"></wa-icon>
<wa-icon fixed-width name="skating"></wa-icon>
<wa-icon fixed-width name="snowplow"></wa-icon>
```

### Labels

For non-decorative icons, use the `label` attribute to announce it to assistive devices.

```html {.example}
<wa-icon name="star" label="Add to favorites"></wa-icon>
```

### Custom Icons

Custom icons can be loaded individually with the `src` attribute. Only SVGs on a local or CORS-enabled endpoint are supported. If you're using more than one custom icon, it might make sense to register a [custom icon library](#icon-libraries).

```html {.example}
<wa-icon src="https://shoelace.style/assets/images/shoe.svg" style="font-size: 4rem;"></wa-icon>
```

## Icon Libraries

You can register additional icons to use with the `<wa-icon>` component through icon libraries. Icon files can exist locally or on a CORS-enabled endpoint (e.g. a CDN). There is no limit to how many icon libraries you can register and there is no cost associated with registering them, as individual icons are only requested when they're used.

Web Awesome ships with one built-in icon library: `default`.
The [default icon library](#customizing-the-default-library) is provided courtesy of [Font Awesome](https://fontawesome.com/).

To register an additional icon library, use the `registerIconLibrary()` function that's exported from `dist/webawesome.js`. At a minimum, you must provide a name and a resolver function. The resolver function translates an icon name to a URL where the corresponding SVG file exists. Refer to the examples below to better understand how it works.

If necessary, a mutator function can be used to mutate the SVG element before rendering. This is necessary for some libraries due to the many possible ways SVGs are crafted. For example, icons should ideally inherit the current text color via `currentColor`, so you may need to apply `fill="currentColor` or `stroke="currentColor"` to the SVG element using this function.

Here's an example that registers an icon library located in the `/assets/icons` directory.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary({
    name: 'my-icons',
    getUrl: (name, family, variant) => `/assets/icons/${name}.svg`,
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>
```

To display an icon, set the `library` and `name` attributes of an `<wa-icon>` element.

```html
<!-- This will show the icon located at /assets/icons/smile.svg -->
<wa-icon library="my-icons" name="smile"></wa-icon>
```

If an icon is used before registration occurs, it will be empty initially but shown when registered.

### Customizing the Default Icon Library

The default icon library contains over 2,000 icons courtesy of [Font Awesome](https://fontawesome.com/).
These are the icons that display when you use `<wa-icon>` without the `library` attribute.
If you prefer to have these icons resolve to a different icon library, simply register it using the `default` name:

For example, this will change the default icon library to use [Bootstrap Icons](https://icons.getbootstrap.com/) loaded from the jsDelivr CDN.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary('default', {
    name: 'default',
    getUrl: (name, family) => {
      const suffix = family === 'filled' ? '-fill' : '';
      return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/${name}${suffix}.svg`
    }
  });
</script>
```

You can also register an existing library as the default:


```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  let myIcons = registerIconLibrary({
    name: 'my-icons',
    getUrl: (name, family, variant) => `/assets/icons/${name}.svg`,
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });

  // Alias of my-icons to default
  registerIconLibrary('default', myIcons);
</script>
```

This allows you to have multiple libraries that co-exist, only one of which is the default.

### Customizing system icons

Web Awesome components use a number of icons internally.
For example, the checkmark icon in `<wa-checkbox>` or the chevron used in `<wa-details>`.
These icons have a `system:` prefix in their name, e.g. `system:check` or `system:chevron-down`.

To specify how these map to your icon library, you can define a `system()` function that maps Web Awesome’s system icons to your library’s icons.
The `system()` function receives the icon name, family and variant as arguments and returns an object with the new `name`, `family`, and `variant`.
For example, here is how to define system icon mappings for the Bootstrap Icons library:

```js
import { registerIconLibrary } from '/dist/webawesome.js';

let system = {
  filled: ['circle', 'pause', 'play', 'star', 'user'],
  nameMap: {
    'check': 'check-lg',
    'circle': 'circle',
    'circle-xmark': 'x-circle',
    'eye-dropper': 'eyedropper',
    'eye': 'eye',
    'eye-slash': 'eye-slash',
    'grip-vertical': 'grip-vertical',
    'indeterminate': 'dash-lg',
    'minus': 'dash-lg',
    'pause': 'pause',
    'play': 'play',
    'user': 'person',
    'xmark': 'x-lg',
  }
};

registerIconLibrary({
  name: 'bootstrap-icons',
  system(name, family) {
    return {
      // Transform names where different
      name: system.nameMap[name] || name,

      // Default to non-filled as many of system's "solid" icons are not filled in Bootstrap Icons
      family: system.filled.includes(name) ? 'filled' : ''
    };
  },
  getUrl: (name, family) => {
    const suffix = family === 'filled' ? '-fill' : '';
    return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/${name}${suffix}.svg`
  }
});
```

You can also specify a `library` key to resolve a system icon through a different library, e.g. WA’s default icon library.
For example, the code above will try to resolve any system icons through your library and only fall back to WA's default library if they fail to load.
This maximizes the odds that icons from your library are used, but can also be unpredictable.
To resolve any system icon you have not vetted via the Web Awesome default library, you can use the `library` key:

```js
let system = {
  filled: ['circle', 'pause', 'play', 'star', 'user'],
  nameMap: {
    'chevron-down': 'chevron-down',
    'chevron-left': 'chevron-left',
    'chevron-right': 'chevron-right',
    'check': 'check-lg',
    'circle': 'circle',
    'eye-dropper': 'eyedropper',
    'grip-vertical': 'grip-vertical',
    'indeterminate': 'dash-lg',
    'pause': 'pause',
    'play': 'play',
    'circle-xmark': 'x-circle',
    'grip-vertical': 'grip-vertical',
    'eye-slash': 'eye-slash',
    'eye': 'eye',
    'user': 'person',
    'xmark': 'x-lg',
  }
};

registerIconLibrary({
  name: 'bootstrap-icons',
  system(name, family) {
    if (!system.nameMap[name]) {
      // If the icon is not known, use the default library
      return { library: 'wa', name, family, variant };
    }

    return {
      name: system.nameMap[name],
      family: system.filled.includes(name) ? 'filled' : ''
    };
  },
  getUrl: (name, family) => {
    const suffix = family === 'filled' ? '-fill' : '';
    return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/${name}${suffix}.svg`
  }
});
```

#### Index of All System Icons { #system-icons-index }

These are all system icons used currently by Web Awesome components (`system:` prefix omitted for readability):

| Name | Variant | Icon |
| --- | --- | --- |
{%- for icon in systemIcons %}
| `{{ icon.name }}` | `{{ icon.variant }}` | <wa-icon library="wa" name="system:{{ icon.name }}" family="classic" variant="{{ icon.variant }}"></wa-icon> |
{%- endfor %}

### Inlined icons { #inlined }

Inlined icons are SVG icons that are loaded directly from code rather than from HTTP requests, making them load faster in your application.
Inlining critical icons improves performance by eliminating HTTP requests, reducing load times, and ensuring they are immediately available.
As an example, all of [Web Awesome’s default system icons](#system-icons-index) are inlined, and we strongly advise you inline the corresponding icons in your custom icon libraries as well.

#### How to Use Inlined Icons

The `inlined` property allows you to provide icon SVG markup directly in your code.
This creates a mapping of `(name, family, variant)` to SVG markup.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary({
    name: 'default',
    getUrl: name => `/path/to/custom/icons/${name}.svg`,
    inlined: {
      check: '<svg xmlns="http://www.w3.org/2000/svg">...</svg>',
    }
  });
</script>
```

The structure of the `inlined` property is as follows:
- For simple libraries (no families or variants): `{ name: svg }`
- For libraries with families (no variants): `{ family: { name: svg } }`
- For complex libraries (with both family and variant): `{ family: { variant: { name: svg } } }`

#### Adding More Inlined Icons

To add additional icons to an existing library, use the `inline()` method:

```js
import { getIconLibrary } from '/dist/webawesome.js';

let defaultLibrary = getIconLibrary('default');
defaultLibrary.inline({
  classic: { // family
    regular: { // variant
      'circle-info': '<svg xmlns="http://www.w3.org/2000/svg">...</svg>',
      'triangle-exclamation': '<svg xmlns="http://www.w3.org/2000/svg">...</svg>'
      // ...
    }
  }
});
```

#### Best Practice

When using custom icon libraries with Web Awesome components, always inline system icons to ensure optimal performance.

### Customize icon markup, for SVG sprites and more

By default, icon markup is produced by fetching the URL returned by the `getUrl()` function.
You can provide a `getMarkup()` function to customize this.

A common use case for that is SVG sprites, often used to improve performance by avoiding multiple trips for each SVG.
The browser will load the sprite sheet once and then you reference the particular SVG within the sprite sheet using its id:

```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary({
    name: 'sprite',
    getUrl: name => `/assets/images/sprite.svg#${name}`,
    getMarkup: url => `<svg fill="currentColor"><use href="${url}"></use></svg>`
  });
</script>
```

As always, make sure to benchmark these changes. When using HTTP/2, it may in fact be more bandwidth-friendly to use multiple small requests instead of 1 large sprite sheet.

:::warning
When using sprite sheets, the `wa-load` and `wa-error` events will not fire.

For security reasons, browsers may apply the same-origin policy on `<use>` elements located in the `<wa-icon>` shadow DOM and may refuse to load a cross-origin URL. There is currently no defined way to set a cross-origin policy for `<use>` elements. For this reason, sprite sheets should only be used if you're self-hosting them.
:::

### Fallbacks

By default, if an icon fails to load, WA will retry using the WA default icon library, and if that also fails, a blank icon will be displayed.
You can provide a `fallback()` function to customize this behavior.
Some examples for common use cases follow.

If you never want icons outside your library to display:

```js
registerIconLibrary({
  name: 'my-icons',
  getUrl: (name, family, variant) => `/assets/icons/${name}.svg`,
  fallback: (name, family, variant) => {
    // Don't show anything if an icon is not found
    return null;
  }
});
```

If you want to display a certain designated "missing icon" icon:

```js
registerIconLibrary({
  name: 'my-icons',
  getUrl: (name, family, variant) => `/assets/icons/${name}.svg`,
  inlined: {
    // Make sure the missing icon never fails by inlining it:
    'missing-icon': '<svg xmlns="http://www.w3.org/2000/svg">...</svg>'
  }
  fallback: (name, family, variant) => {
    return {name: 'missing-icon'};
  }
});
```

If you want to retry with the default family and variant:

```js
registerIconLibrary({
  name: 'my-icons',
  getUrl: (name, family, variant) => `/assets/icons/${name}.svg`,
  fallback: (name, family, variant) => {
    if (family !== 'classic' || variant !== 'solid') {
      return { name, family: 'classic', variant: 'solid' };
    }
  }
});
```


## Icon Library Examples { #icon-libraries }

The following examples demonstrate how to register a number of popular, open source icon libraries via CDN. Feel free to adapt the code as you see fit to use your own origin or naming conventions.

### Bootstrap Icons

This will register the [Bootstrap Icons](https://icons.getbootstrap.com/) library using the jsDelivr CDN. This library has two families: `regular` and `filled`.

Icons in this library are licensed under the [MIT License](https://github.com/twbs/icons/blob/main/LICENSE).

```html
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  let system = {
    filled: ['circle', 'pause', 'play', 'star', 'user'],
    nameMap: {
      'chevron-down': 'chevron-down',
      'chevron-left': 'chevron-left',
      'chevron-right': 'chevron-right',
      'check': 'check-lg',
      'circle': 'circle',
      'eye-dropper': 'eyedropper',
      'grip-vertical': 'grip-vertical',
      'indeterminate': 'dash-lg',
      'pause': 'pause',
      'play': 'play',
      'circle-xmark': 'x-circle',
      'grip-vertical': 'grip-vertical',
      'eye-slash': 'eye-slash',
      'eye': 'eye',
      'user': 'person',
      'xmark': 'x-lg',
    }
  };

  registerIconLibrary({
    name: 'default',
    system(name, family) {
      if (!system.nameMap[name]) {
        // If the icon is not known, use the default library
        return { library: 'wa', name: name, family, variant };
      }

      return {
        name: system.nameMap[name],
        family: system.filled.includes(name) ? 'filled' : ''
      };
    },
    getUrl: (name, family) => {
      const suffix = family === 'filled' ? '-fill' : '';
      return `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/${name}${suffix}.svg`
    }
  });
</script>
```

### Boxicons

This will register the [Boxicons](https://boxicons.com/) library using the jsDelivr CDN. This library has three variations: regular (`bx-*`), solid (`bxs-*`), and logos (`bxl-*`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Creative Commons 4.0 License](https://github.com/atisawd/boxicons#license).

```html {.example}
<script type="module">
import { registerIconLibrary } from '/dist/webawesome.js';

registerIconLibrary({
    name: 'boxicons',
    getUrl: name => {
      let folder = 'regular';
      if (name.substring(0, 4) === 'bxs-') folder = 'solid';
      if (name.substring(0, 4) === 'bxl-') folder = 'logos';
      return `https://cdn.jsdelivr.net/npm/boxicons@2.0.5/svg/${folder}/${name}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
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
<div style="font-size: 24px;">
  <wa-icon library="lucide" name="feather"></wa-icon>
  <wa-icon library="lucide" name="pie-chart"></wa-icon>
  <wa-icon library="lucide" name="settings"></wa-icon>
  <wa-icon library="lucide" name="map-pin"></wa-icon>
  <wa-icon library="lucide" name="printer"></wa-icon>
  <wa-icon library="lucide" name="shopping-cart"></wa-icon>
</div>

<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary({
    name: 'lucide',
    getUrl: name => `https://cdn.jsdelivr.net/npm/lucide-static@0.16.29/icons/${name}.svg`
  });
</script>
```

### Heroicons

This will register the [Heroicons](https://heroicons.com/) library using the jsDelivr CDN.

Icons in this library are licensed under the [MIT License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE).

```html {.example}
<script type="module">
  import { registerIconLibrary } from '/dist/webawesome.js';

  registerIconLibrary({
    name: 'heroicons',
    getUrl: name => `https://cdn.jsdelivr.net/npm/heroicons@2.0.1/24/outline/${name}.svg`
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

  registerIconLibrary({
    name: 'iconoir',
    getUrl: name => `https://cdn.jsdelivr.net/gh/lucaburgio/iconoir@latest/icons/${name}.svg`
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="iconoir" name="check-circled-outline"></wa-icon>
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

  registerIconLibrary({
    name: 'ionicons',
    getUrl: name => `https://cdn.jsdelivr.net/npm/ionicons@5.1.2/dist/ionicons/svg/${name}.svg`,
    mutator: svg => {
      svg.setAttribute('fill', 'currentColor');
      svg.setAttribute('stroke', 'currentColor');
      [...svg.querySelectorAll('.ionicon-fill-none')].map(el => el.setAttribute('fill', 'none'));
      [...svg.querySelectorAll('.ionicon-stroke-width')].map(el => el.setAttribute('stroke-width', '32px'));
    }
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

  registerIconLibrary({
    name: 'jam',
    getUrl: name => `https://cdn.jsdelivr.net/npm/jam-icons@2.0.0/svg/${name}.svg`,
    mutator: svg => svg.setAttribute('fill', 'currentColor')
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

  registerIconLibrary({
    name: 'material',
    getUrl: name => {
      const match = name.match(/^(.*?)(_(round|sharp))?$/);
      return `https://cdn.jsdelivr.net/npm/@material-icons/svg@1.0.5/svg/${match[1]}/${match[3] || 'outline'}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
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

  registerIconLibrary({
    name: 'remixicon',
    getUrl: name => {
      const match = name.match(/^(.*?)\/(.*?)?$/);
      match[1] = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      return `https://cdn.jsdelivr.net/npm/remixicon@2.5.0/icons/${match[1]}/${match[2]}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
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

  registerIconLibrary({
    name: 'tabler',
    getUrl: name => `https://cdn.jsdelivr.net/npm/@tabler/icons@1.68.0/icons/${name}.svg`,
    mutator: svg => {
      svg.style.fill = 'none';
      svg.setAttribute('stroke', 'currentColor');
    }
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

  registerIconLibrary({
    name: 'unicons',
    getUrl: name => {
      const match = name.match(/^(.*?)(-s)?$/);
      return `https://cdn.jsdelivr.net/npm/@iconscout/unicons@3.0.3/svg/${match[2] === '-s' ? 'solid' : 'line'}/${
        match[1]
      }.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
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




