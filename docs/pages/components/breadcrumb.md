---
meta:
  title: Breadcrumb
  description: Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.
layout: component
---

Breadcrumbs are usually placed before a page's main content with the current page shown last to indicate the user's position in the navigation.

```html:preview
<wa-breadcrumb>
  <wa-breadcrumb-item>Catalog</wa-breadcrumb-item>
  <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
  <wa-breadcrumb-item>Women's</wa-breadcrumb-item>
  <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
</wa-breadcrumb>
```

```jsx:react
import WaBreadcrumb from '@shoelace-style/shoelace/dist/react/breadcrumb';
import WaBreadcrumbItem from '@shoelace-style/shoelace/dist/react/breadcrumb-item';

const App = () => (
  <WaBreadcrumb>
    <WaBreadcrumbItem>Catalog</WaBreadcrumbItem>
    <WaBreadcrumbItem>Clothing</WaBreadcrumbItem>
    <WaBreadcrumbItem>Women's</WaBreadcrumbItem>
    <WaBreadcrumbItem>Shirts &amp; Tops</WaBreadcrumbItem>
  </WaBreadcrumb>
);
```

## Examples

### Breadcrumb Links

By default, breadcrumb items are rendered as buttons so you can use them to navigate single-page applications. In this case, you'll need to add event listeners to handle clicks.

For websites, you'll probably want to use links instead. You can make any breadcrumb item a link by applying an `href` attribute to it. Now, when the user activates it, they'll be taken to the corresponding page — no event listeners required.

```html:preview
<wa-breadcrumb>
  <wa-breadcrumb-item href="https://example.com/home">Homepage</wa-breadcrumb-item>

  <wa-breadcrumb-item href="https://example.com/home/services">Our Services</wa-breadcrumb-item>

  <wa-breadcrumb-item href="https://example.com/home/services/digital">Digital Media</wa-breadcrumb-item>

  <wa-breadcrumb-item href="https://example.com/home/services/digital/web-design">Web Design</wa-breadcrumb-item>
</wa-breadcrumb>
```

```jsx:react
import WaBreadcrumb from '@shoelace-style/shoelace/dist/react/breadcrumb';
import WaBreadcrumbItem from '@shoelace-style/shoelace/dist/react/breadcrumb-item';

const App = () => (
  <WaBreadcrumb>
    <WaBreadcrumbItem href="https://example.com/home">Homepage</WaBreadcrumbItem>

    <WaBreadcrumbItem href="https://example.com/home/services">Our Services</WaBreadcrumbItem>

    <WaBreadcrumbItem href="https://example.com/home/services/digital">Digital Media</WaBreadcrumbItem>

    <WaBreadcrumbItem href="https://example.com/home/services/digital/web-design">Web Design</WaBreadcrumbItem>
  </WaBreadcrumb>
);
```

### Custom Separators

Use the `separator` slot to change the separator that goes between breadcrumb items. Icons work well, but you can also use text or an image.

```html:preview
<wa-breadcrumb>
  <wa-icon slot="separator" name="angles-right" variant="solid"></wa-icon>
  <wa-breadcrumb-item>First</wa-breadcrumb-item>
  <wa-breadcrumb-item>Second</wa-breadcrumb-item>
  <wa-breadcrumb-item>Third</wa-breadcrumb-item>
</wa-breadcrumb>

<br />

<wa-breadcrumb>
  <wa-icon slot="separator" name="arrow-right" variant="solid"></wa-icon>
  <wa-breadcrumb-item>First</wa-breadcrumb-item>
  <wa-breadcrumb-item>Second</wa-breadcrumb-item>
  <wa-breadcrumb-item>Third</wa-breadcrumb-item>
</wa-breadcrumb>

<br />

<wa-breadcrumb>
  <span slot="separator">/</span>
  <wa-breadcrumb-item>First</wa-breadcrumb-item>
  <wa-breadcrumb-item>Second</wa-breadcrumb-item>
  <wa-breadcrumb-item>Third</wa-breadcrumb-item>
</wa-breadcrumb>
```

```jsx:react
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import WaBreadcrumb from '@shoelace-style/shoelace/dist/react/breadcrumb';
import WaBreadcrumbItem from '@shoelace-style/shoelace/dist/react/breadcrumb-item';

const App = () => (
  <>
    <WaBreadcrumb>
      <wa-icon slot="separator" name="angles-right" variant="solid" />
      <WaBreadcrumbItem>First</WaBreadcrumbItem>
      <WaBreadcrumbItem>Second</WaBreadcrumbItem>
      <WaBreadcrumbItem>Third</WaBreadcrumbItem>
    </WaBreadcrumb>

    <br />

    <WaBreadcrumb>
      <wa-icon slot="separator" name="arrow-right" variant="solid" />
      <WaBreadcrumbItem>First</WaBreadcrumbItem>
      <WaBreadcrumbItem>Second</WaBreadcrumbItem>
      <WaBreadcrumbItem>Third</WaBreadcrumbItem>
    </WaBreadcrumb>

    <br />

    <WaBreadcrumb>
      <span slot="separator">/</span>
      <WaBreadcrumbItem>First</WaBreadcrumbItem>
      <WaBreadcrumbItem>Second</WaBreadcrumbItem>
      <WaBreadcrumbItem>Third</WaBreadcrumbItem>
    </WaBreadcrumb>
  </>
);
```

### Prefixes

Use the `prefix` slot to add content before any breadcrumb item.

```html:preview
<wa-breadcrumb>
  <wa-breadcrumb-item>
    <wa-icon slot="prefix" name="house" variant="solid"></wa-icon>
    Home
  </wa-breadcrumb-item>
  <wa-breadcrumb-item>Articles</wa-breadcrumb-item>
  <wa-breadcrumb-item>Traveling</wa-breadcrumb-item>
</wa-breadcrumb>
```

```jsx:react
import WaBreadcrumb from '@shoelace-style/shoelace/dist/react/breadcrumb';
import WaBreadcrumbItem from '@shoelace-style/shoelace/dist/react/breadcrumb-item';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <WaBreadcrumb>
    <WaBreadcrumbItem>
      <WaIcon slot="prefix" name="house" variant="solid" />
      Home
    </WaBreadcrumbItem>
    <WaBreadcrumbItem>Articles</WaBreadcrumbItem>
    <WaBreadcrumbItem>Traveling</WaBreadcrumbItem>
  </WaBreadcrumb>
);
```

### Suffixes

Use the `suffix` slot to add content after any breadcrumb item.

```html:preview
<wa-breadcrumb>
  <wa-breadcrumb-item>Documents</wa-breadcrumb-item>
  <wa-breadcrumb-item>Policies</wa-breadcrumb-item>
  <wa-breadcrumb-item>
    Security
    <wa-icon slot="suffix" name="shield" variant="solid"></wa-icon>
  </wa-breadcrumb-item>
</wa-breadcrumb>
```

```jsx:react
import WaBreadcrumb from '@shoelace-style/shoelace/dist/react/breadcrumb';
import WaBreadcrumbItem from '@shoelace-style/shoelace/dist/react/breadcrumb-item';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <WaBreadcrumb>
    <WaBreadcrumbItem>Documents</WaBreadcrumbItem>
    <WaBreadcrumbItem>Policies</WaBreadcrumbItem>
    <WaBreadcrumbItem>
      Security
      <WaIcon slot="suffix" name="shield" variant="solid"></WaIcon>
    </WaBreadcrumbItem>
  </WaBreadcrumb>
);
```

### With Dropdowns

Dropdown menus can be placed in a prefix or suffix slot to provide additional options.

```html:preview
<wa-breadcrumb>
  <wa-breadcrumb-item>Homepage</wa-breadcrumb-item>
  <wa-breadcrumb-item>Our Services</wa-breadcrumb-item>
  <wa-breadcrumb-item>Digital Media</wa-breadcrumb-item>
  <wa-breadcrumb-item>
    Web Design
    <wa-dropdown slot="suffix">
      <wa-button slot="trigger" size="small" pill>
        <wa-icon label="More options" name="ellipsis" variant="solid"></wa-icon>
      </wa-button>
      <wa-menu>
        <wa-menu-item type="checkbox" checked>Web Design</wa-menu-item>
        <wa-menu-item type="checkbox">Web Development</wa-menu-item>
        <wa-menu-item type="checkbox">Marketing</wa-menu-item>
      </wa-menu>
    </wa-dropdown>
  </wa-breadcrumb-item>
</wa-breadcrumb>
```

```jsx:react
import {
  WaBreadcrumb,
  WaBreadcrumbItem,
  WaButton,
  WaDropdown,
  WaIcon,
  WaMenu,
  WaMenuItem
} from '@shoelace-style/shoelace/dist/react';

const App = () => (
  <WaBreadcrumb>
    <WaBreadcrumbItem>Homepage</WaBreadcrumbItem>
    <WaBreadcrumbItem>Our Services</WaBreadcrumbItem>
    <WaBreadcrumbItem>Digital Media</WaBreadcrumbItem>
    <WaBreadcrumbItem>
      Web Design
      <WaDropdown slot="suffix">
        <WaButton slot="trigger" size="small" pill>
          <WaIcon label="More options" name="ellipsis"></WaIcon>
        </WaButton>
        <WaMenu>
          <WaMenuItem type="checkbox" checked>
            Web Design
          </WaMenuItem>
          <WaMenuItem type="checkbox">Web Development</WaMenuItem>
          <WaMenuItem type="checkbox">Marketing</WaMenuItem>
        </WaMenu>
      </WaDropdown>
    </WaBreadcrumbItem>
  </WaBreadcrumb>
);
```
