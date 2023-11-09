---
meta:
  title: Icon
  description: Icons are symbols that can be used to represent various options within an application.
layout: component
---

Web Awesome comes bundled with over 1,500 icons courtesy of the [Bootstrap Icons](https://icons.getbootstrap.com/) project. These icons are part of the `default` icon library. If you prefer, you can register [custom icon libraries](#icon-libraries) as well.

:::tip
Depending on how you're loading Web Awesome, you may need to copy icon assets and/or [set the base path](/getting-started/installation/#setting-the-base-path) so Web Awesome knows where to load them from. Otherwise, icons may not appear and you'll see 404 Not Found errors in the dev console.
:::

## Default Icons

All available icons in the `default` icon library are shown below. Click or tap on any icon to copy its name, then you can use it in your HTML like this.

```html
<wa-icon name="icon-name-here"></wa-icon>
```

<div class="icon-search">
  <div class="icon-search-controls">
    <wa-input placeholder="Search Icons" clearable>
      <wa-icon slot="prefix" name="search"></wa-icon>
    </wa-input>
    <wa-select value="outline">
      <wa-option value="outline">Outlined</wa-option>
      <wa-option value="fill">Filled</wa-option>
      <wa-option value="all">All icons</wa-option>
    </wa-select>
  </div>
  <div class="icon-list"></div>
  <input type="text" class="icon-copy-input" aria-hidden="true" tabindex="-1">
</div>

## Examples

### Colors

Icons inherit their color from the current text color. Thus, you can set the `color` property on the `<wa-icon>` element or an ancestor to change the color.

```html:preview
<div style="color: #4a90e2;">
  <wa-icon name="exclamation-triangle"></wa-icon>
  <wa-icon name="archive"></wa-icon>
  <wa-icon name="battery-charging"></wa-icon>
  <wa-icon name="bell"></wa-icon>
</div>
<div style="color: #9013fe;">
  <wa-icon name="clock"></wa-icon>
  <wa-icon name="cloud"></wa-icon>
  <wa-icon name="download"></wa-icon>
  <wa-icon name="file-earmark"></wa-icon>
</div>
<div style="color: #417505;">
  <wa-icon name="flag"></wa-icon>
  <wa-icon name="heart"></wa-icon>
  <wa-icon name="image"></wa-icon>
  <wa-icon name="lightning"></wa-icon>
</div>
<div style="color: #f5a623;">
  <wa-icon name="mic"></wa-icon>
  <wa-icon name="search"></wa-icon>
  <wa-icon name="star"></wa-icon>
  <wa-icon name="trash"></wa-icon>
</div>
```

{% raw %}

```jsx:react
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <>
    <div style={{ color: '#4a90e2' }}>
      <WaIcon name="exclamation-triangle"></WaIcon>
      <WaIcon name="archive"></WaIcon>
      <WaIcon name="battery-charging"></WaIcon>
      <WaIcon name="bell"></WaIcon>
    </div>
    <div style={{ color: '#9013fe' }}>
      <WaIcon name="clock"></WaIcon>
      <WaIcon name="cloud"></WaIcon>
      <WaIcon name="download"></WaIcon>
      <WaIcon name="file-earmark"></WaIcon>
    </div>
    <div style={{ color: '#417505' }}>
      <WaIcon name="flag"></WaIcon>
      <WaIcon name="heart"></WaIcon>
      <WaIcon name="image"></WaIcon>
      <WaIcon name="lightning"></WaIcon>
    </div>
    <div style={{ color: '#f5a623' }}>
      <WaIcon name="mic"></WaIcon>
      <WaIcon name="search"></WaIcon>
      <WaIcon name="star"></WaIcon>
      <WaIcon name="trash"></WaIcon>
    </div>
  </>
);
```

{% endraw %}

### Sizing

Icons are sized relative to the current font size. To change their size, set the `font-size` property on the icon itself or on a parent element as shown below.

```html:preview
<div style="font-size: 32px;">
  <wa-icon name="exclamation-triangle"></wa-icon>
  <wa-icon name="archive"></wa-icon>
  <wa-icon name="battery-charging"></wa-icon>
  <wa-icon name="bell"></wa-icon>
  <wa-icon name="clock"></wa-icon>
  <wa-icon name="cloud"></wa-icon>
  <wa-icon name="download"></wa-icon>
  <wa-icon name="file-earmark"></wa-icon>
  <wa-icon name="flag"></wa-icon>
  <wa-icon name="heart"></wa-icon>
  <wa-icon name="image"></wa-icon>
  <wa-icon name="lightning"></wa-icon>
  <wa-icon name="mic"></wa-icon>
  <wa-icon name="search"></wa-icon>
  <wa-icon name="star"></wa-icon>
  <wa-icon name="trash"></wa-icon>
</div>
```

{% raw %}

```jsx:react
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <div style={{ fontSize: '32px' }}>
    <WaIcon name="exclamation-triangle" />
    <WaIcon name="archive" />
    <WaIcon name="battery-charging" />
    <WaIcon name="bell" />
    <WaIcon name="clock" />
    <WaIcon name="cloud" />
    <WaIcon name="download" />
    <WaIcon name="file-earmark" />
    <WaIcon name="flag" />
    <WaIcon name="heart" />
    <WaIcon name="image" />
    <WaIcon name="lightning" />
    <WaIcon name="mic" />
    <WaIcon name="search" />
    <WaIcon name="star" />
    <WaIcon name="trash" />
  </div>
);
```

{% endraw %}

### Labels

For non-decorative icons, use the `label` attribute to announce it to assistive devices.

```html:preview
<wa-icon name="star-fill" label="Add to favorites"></wa-icon>
```

```jsx:react
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => <WaIcon name="star-fill" label="Add to favorites" />;
```

### Custom Icons

Custom icons can be loaded individually with the `src` attribute. Only SVGs on a local or CORS-enabled endpoint are supported. If you're using more than one custom icon, it might make sense to register a [custom icon library](#icon-libraries).

```html:preview
<wa-icon src="https://shoelace.style/assets/images/shoe.svg" style="font-size: 8rem;"></wa-icon>
```

{% raw %}

```jsx:react
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => <WaIcon src="https://shoelace.style/assets/images/shoe.svg" style={{ fontSize: '8rem' }}></WaIcon>;
```

{% endraw %}

## Icon Libraries

You can register additional icons to use with the `<wa-icon>` component through icon libraries. Icon files can exist locally or on a CORS-enabled endpoint (e.g. a CDN). There is no limit to how many icon libraries you can register and there is no cost associated with registering them, as individual icons are only requested when they're used.

Web Awesome ships with two built-in icon libraries, `default` and `system`. The [default icon library](#customizing-the-default-library) contains all of the icons in the Bootstrap Icons project. The [system icon library](#customizing-the-system-library) contains only a small subset of icons that are used internally by Web Awesome components.

To register an additional icon library, use the `registerIconLibrary()` function that's exported from `utilities/icon-library.js`. At a minimum, you must provide a name and a resolver function. The resolver function translates an icon name to a URL where the corresponding SVG file exists. Refer to the examples below to better understand how it works.

If necessary, a mutator function can be used to mutate the SVG element before rendering. This is necessary for some libraries due to the many possible ways SVGs are crafted. For example, icons should ideally inherit the current text color via `currentColor`, so you may need to apply `fill="currentColor` or `stroke="currentColor"` to the SVG element using this function.

Here's an example that registers an icon library located in the `/assets/icons` directory.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('my-icons', {
    resolver: name => `/assets/icons/${name}.svg`,
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

The following examples demonstrate how to register a number of popular, open source icon libraries via CDN. Feel free to adapt the code as you see fit to use your own origin or naming conventions.

### Boxicons

This will register the [Boxicons](https://boxicons.com/) library using the jsDelivr CDN. This library has three variations: regular (`bx-*`), solid (`bxs-*`), and logos (`bxl-*`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Creative Commons 4.0 License](https://github.com/atisawd/boxicons#license).

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('boxicons', {
    resolver: name => {
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

```html:preview
<div style="font-size: 24px;">
  <wa-icon library="lucide" name="feather"></wa-icon>
  <wa-icon library="lucide" name="pie-chart"></wa-icon>
  <wa-icon library="lucide" name="settings"></wa-icon>
  <wa-icon library="lucide" name="map-pin"></wa-icon>
  <wa-icon library="lucide" name="printer"></wa-icon>
  <wa-icon library="lucide" name="shopping-cart"></wa-icon>
</div>

<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('lucide', {
    resolver: name => `https://cdn.jsdelivr.net/npm/lucide-static@0.16.29/icons/${name}.svg`
  });
</script>
```

### Font Awesome

This will register the [Font Awesome Free](https://fontawesome.com/) library using the jsDelivr CDN. This library has three variations: regular (`far-*`), solid (`fas-*`), and brands (`fab-*`). A mutator function is required to set the SVG's `fill` to `currentColor`.

Icons in this library are licensed under the [Font Awesome Free License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt). Some of the icons that appear on the Font Awesome website require a license and are therefore not available in the CDN.

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('fa', {
    resolver: name => {
      const filename = name.replace(/^fa[rbs]-/, '');
      let folder = 'regular';
      if (name.substring(0, 4) === 'fas-') folder = 'solid';
      if (name.substring(0, 4) === 'fab-') folder = 'brands';
      return `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.1/svgs/${folder}/${filename}.svg`;
    },
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="fa" name="far-bell"></wa-icon>
  <wa-icon library="fa" name="far-comment"></wa-icon>
  <wa-icon library="fa" name="far-hand-point-right"></wa-icon>
  <wa-icon library="fa" name="far-hdd"></wa-icon>
  <wa-icon library="fa" name="far-heart"></wa-icon>
  <wa-icon library="fa" name="far-star"></wa-icon>
  <br />
  <wa-icon library="fa" name="fas-archive"></wa-icon>
  <wa-icon library="fa" name="fas-book"></wa-icon>
  <wa-icon library="fa" name="fas-chess-knight"></wa-icon>
  <wa-icon library="fa" name="fas-dice"></wa-icon>
  <wa-icon library="fa" name="fas-pizza-slice"></wa-icon>
  <wa-icon library="fa" name="fas-scroll"></wa-icon>
  <br />
  <wa-icon library="fa" name="fab-apple"></wa-icon>
  <wa-icon library="fa" name="fab-chrome"></wa-icon>
  <wa-icon library="fa" name="fab-edge"></wa-icon>
  <wa-icon library="fa" name="fab-firefox"></wa-icon>
  <wa-icon library="fa" name="fab-opera"></wa-icon>
  <wa-icon library="fa" name="fab-microsoft"></wa-icon>
</div>
```

### Heroicons

This will register the [Heroicons](https://heroicons.com/) library using the jsDelivr CDN.

Icons in this library are licensed under the [MIT License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE).

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('heroicons', {
    resolver: name => `https://cdn.jsdelivr.net/npm/heroicons@2.0.1/24/outline/${name}.svg`
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

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('iconoir', {
    resolver: name => `https://cdn.jsdelivr.net/gh/lucaburgio/iconoir@latest/icons/${name}.svg`
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

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('ionicons', {
    resolver: name => `https://cdn.jsdelivr.net/npm/ionicons@5.1.2/dist/ionicons/svg/${name}.svg`,
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

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('jam', {
    resolver: name => `https://cdn.jsdelivr.net/npm/jam-icons@2.0.0/svg/${name}.svg`,
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

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('material', {
    resolver: name => {
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

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('remixicon', {
    resolver: name => {
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

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('tabler', {
    resolver: name => `https://cdn.jsdelivr.net/npm/@tabler/icons@1.68.0/icons/${name}.svg`
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

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('unicons', {
    resolver: name => {
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

### Customizing the Default Library

The default icon library contains over 1,300 icons courtesy of the [Bootstrap Icons](https://icons.getbootstrap.com/) project. These are the icons that display when you use `<wa-icon>` without the `library` attribute. If you prefer to have these icons resolve elsewhere or to a different icon library, register an icon library using the `default` name and a custom resolver.

This example will load the same set of icons from the jsDelivr CDN instead of your local assets folder.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('default', {
    resolver: name => `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.0.0/icons/${name}.svg`
  });
</script>
```

#### Customize the default library to use SVG sprites

To improve performance you can use a SVG sprites to avoid multiple trips for each SVG. The browser will load the sprite sheet once and then you reference the particular SVG within the sprite sheet using hash selector.

As always, make sure to benchmark these changes. When using HTTP/2, it may in fact be more bandwidth-friendly to use multiple small requests instead of 1 large sprite sheet.

:::danger
When using sprite sheets, the `wa-load` and `wa-error` events will not fire.
:::

:::danger
For security reasons, browsers may apply the same-origin policy on `<use>` elements located in the `<wa-icon>` shadow DOM and may refuse to load a cross-origin URL. There is currently no defined way to set a cross-origin policy for `<use>` elements. For this reason, sprite sheets should only be used if you're self-hosting them.
:::

```html:preview
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('sprite', {
    resolver: name => `/assets/images/sprite.svg#${name}`,
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
    spriteSheet: true
  });
</script>

<div style="font-size: 24px;">
  <wa-icon library="sprite" name="clock"></wa-icon>
  <wa-icon library="sprite" name="speedometer"></wa-icon>
</div>
```

### Customizing the System Library

The system library contains only the icons used internally by Web Awesome components. Unlike the default icon library, the system library does not rely on physical assets. Instead, its icons are hard-coded as data URIs into the resolver to ensure their availability.

If you want to change the icons Web Awesome uses internally, you can register an icon library using the `system` name and a custom resolver. If you choose to do this, it's your responsibility to provide all of the icons that are required by components. You can reference `src/components/library.system.ts` for a complete list of system icons used by Web Awesome.

```html
<script type="module">
  import { registerIconLibrary } from '/dist/utilities/icon-library.js';

  registerIconLibrary('system', {
    resolver: name => `/path/to/custom/icons/${name}.svg`
  });
</script>
```

<!-- Supporting scripts and styles for the search utility -->
<script>
  function wrapWithTooltip(item) {
    const tooltip = document.createElement('wa-tooltip');
    tooltip.content = item.getAttribute('data-name');

    // Close open tooltips
    document.querySelectorAll('.icon-list wa-tooltip[open]').forEach(tooltip => tooltip.hide());

    // Wrap it with a tooltip and trick it into showing up
    item.parentNode.insertBefore(tooltip, item);
    tooltip.appendChild(item);
    requestAnimationFrame(() => tooltip.dispatchEvent(new MouseEvent('mouseover')));
  }

  fetch('/dist/assets/icons/icons.json')
    .then(res => res.json())
    .then(icons => {
      const container = document.querySelector('.icon-search');
      const input = container.querySelector('wa-input');
      const select = container.querySelector('wa-select');
      const copyInput = container.querySelector('.icon-copy-input');
      const loader = container.querySelector('.icon-loader');
      const list = container.querySelector('.icon-list');
      const queue = [];
      let inputTimeout;

      // Generate icons
      icons.map(i => {
        const item = document.createElement('div');
        item.classList.add('icon-list-item');
        item.setAttribute('data-name', i.name);
        item.setAttribute('data-terms', [i.name, i.title, ...(i.tags || []), ...(i.categories || [])].join(' '));
        item.innerHTML = `
          <svg width="1em" height="1em" fill="currentColor">
            <use href="/assets/images/sprite.svg#${i.name}"></use>
          </svg>
        `;
        list.appendChild(item);

        // Wrap it with a tooltip the first time the mouse lands on it. We do this instead of baking them into the DOM
        // to improve this page's performance. See: https://github.com/shoelace-style/shoelace/issues/1122
        item.addEventListener('mouseover', () => wrapWithTooltip(item), { once: true });

        // Copy on click
        item.addEventListener('click', () => {
          const tooltip = item.closest('wa-tooltip');
          copyInput.value = i.name;
          copyInput.select();
          document.execCommand('copy');

          if (tooltip) {
            tooltip.content = 'Copied!';
            setTimeout(() => tooltip.content = i.name, 1000);
          }
        });
      });

      // Filter as the user types
      input.addEventListener('wa-input', () => {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => {
          [...list.querySelectorAll('.icon-list-item')].map(item => {
            const filter = input.value.toLowerCase();
            if (filter === '') {
              item.hidden = false;
            } else {
              const terms = item.getAttribute('data-terms').toLowerCase();
              item.hidden = terms.indexOf(filter) < 0;
            }
          });
        }, 250);
      });

      // Sort by type and remember preference
      const iconType = sessionStorage.getItem('wa-icon:type') || 'outline';
      select.value = iconType;
      list.setAttribute('data-type', select.value);
      select.addEventListener('wa-change', () => {
        list.setAttribute('data-type', select.value);
        sessionStorage.setItem('wa-icon:type', select.value);
      });
    });
</script>

<style>
  .icon-search {
    border: solid 1px var(--wa-color-surface-border);
    border-radius: var(--wa-corners-s);
    padding: var(--wa-space-m);
  }

  .icon-search [hidden] {
    display: none;
  }

  .icon-search-controls {
    display: flex;
  }

  .icon-search-controls wa-input {
    flex: 1 1 auto;
  }

  .icon-search-controls wa-select {
    width: 10rem;
    flex: 0 0 auto;
    margin-left: 1rem;
  }

  .icon-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30vh;
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    position: relative;
    margin-top: 1rem;
  }

  .icon-loader[hidden],
  .icon-list[hidden] {
    display: none;
  }

  .icon-list-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--wa-corners-s);
    font-size: 24px;
    width: 2em;
    height: 2em;
    margin: 0 auto;
    cursor: copy;
    transition: var(--wa-transition-fast) all;
  }

  .icon-list-item:hover {
    background-color: var(--wa-color-brand-fill-subtle);
    color: var(--wa-color-brand-text-on-fill);
  }

  .icon-list[data-type="outline"] .icon-list-item[data-name$="-fill"] {
    display: none;
  }

  .icon-list[data-type="fill"] .icon-list-item:not([data-name$="-fill"]) {
    display: none;
  }

  .icon-copy-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 1000px) {
    .icon-list {
      grid-template-columns: repeat(8, 1fr);
    }

    .icon-list-item {
      font-size: 20px;
    }

    .icon-search-controls {
      display: block;
    }

    .icon-search-controls wa-select {
      width: auto;
      margin: 1rem 0 0 0;
    }
  }

  @media screen and (max-width: 500px) {
    .icon-list {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
