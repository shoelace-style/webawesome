---
title: Breadcrumb
description: Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.
layout: component
category: Navigation
---

Breadcrumbs are usually placed before a page's main content with the current page shown last to indicate the user's position in the navigation.

```html {.example}
<wa-breadcrumb>
  <wa-breadcrumb-item>Catalog</wa-breadcrumb-item>
  <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
  <wa-breadcrumb-item>Women's</wa-breadcrumb-item>
  <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
</wa-breadcrumb>
```

## Examples

### Breadcrumb Links

By default, breadcrumb items are rendered as buttons so you can use them to navigate single-page applications. In this case, you'll need to add event listeners to handle clicks.

For websites, you'll probably want to use links instead. You can make any breadcrumb item a link by applying an `href` attribute to it. Now, when the user activates it, they'll be taken to the corresponding page — no event listeners required.

```html {.example}
<wa-breadcrumb>
  <wa-breadcrumb-item href="https://example.com/home">Homepage</wa-breadcrumb-item>

  <wa-breadcrumb-item href="https://example.com/home/services">Our Services</wa-breadcrumb-item>

  <wa-breadcrumb-item href="https://example.com/home/services/digital">Digital Media</wa-breadcrumb-item>

  <wa-breadcrumb-item href="https://example.com/home/services/digital/web-design">Web Design</wa-breadcrumb-item>
</wa-breadcrumb>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like `<wa-icon>` next to any breadcrumb item.

```html {.example}
<wa-breadcrumb>
  <wa-breadcrumb-item>
    <wa-icon slot="start" name="house"></wa-icon>
    Home
  </wa-breadcrumb-item>
  <wa-breadcrumb-item>Articles</wa-breadcrumb-item>
  <wa-breadcrumb-item>
    <wa-icon slot="end" name="tree-palm"></wa-icon>
    Traveling
  </wa-breadcrumb-item>
</wa-breadcrumb>
```

### Custom Separators

Use the `separator` slot to change the separator that goes between breadcrumb items. Icons work well, but you can also use text or an image.

```html {.example}
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

### Custom Colors

Breadcrumb labels match the color set on `<wa-breadcrumb-item>`. Content in the `start`, `end`, and `separator` slots can be styled using CSS parts.

```html {.example}
<style>
  .redcrumbs wa-breadcrumb-item {
    color: firebrick;
  }
  .redcrumbs wa-breadcrumb-item:last-of-type {
    color: crimson;
  }
  .redcrumbs wa-breadcrumb-item::part(separator) {
    color: pink;
  }
  .redcrumbs wa-breadcrumb-item::part(start),
  .redcrumbs wa-breadcrumb-item::part(end) {
    color: currentColor;
  }
</style>
<wa-breadcrumb class="redcrumbs">
  <wa-breadcrumb-item>
    <wa-icon slot="start" name="house" variant="solid"></wa-icon>
    Home
  </wa-breadcrumb-item>
  <wa-breadcrumb-item>Articles</wa-breadcrumb-item>
  <wa-breadcrumb-item>Traveling</wa-breadcrumb-item>
</wa-breadcrumb>
```

### With Dropdowns

Dropdown menus can be placed in the default slot to provide additional options.

```html {.example}
<wa-breadcrumb>
  <wa-breadcrumb-item>Homepage</wa-breadcrumb-item>
  <wa-breadcrumb-item>
    <wa-dropdown>
      <wa-button slot="trigger" size="small" appearance="filled" pill>
        <wa-icon label="More options" name="ellipsis" variant="solid"></wa-icon>
      </wa-button>
      <wa-dropdown-item type="checkbox" checked>Web Design</wa-dropdown-item>
      <wa-dropdown-item type="checkbox">Web Development</wa-dropdown-item>
      <wa-dropdown-item type="checkbox">Marketing</wa-dropdown-item>
    </wa-dropdown>
  </wa-breadcrumb-item>
  <wa-breadcrumb-item>Our Services</wa-breadcrumb-item>
  <wa-breadcrumb-item>Digital Media</wa-breadcrumb-item>
</wa-breadcrumb>
```

Alternatively, you can place dropdown menus in a `start` or `end` slot.

```html {.example}
<wa-breadcrumb>
  <wa-breadcrumb-item>Homepage</wa-breadcrumb-item>
  <wa-breadcrumb-item>Our Services</wa-breadcrumb-item>
  <wa-breadcrumb-item>Digital Media</wa-breadcrumb-item>
  <wa-breadcrumb-item>
    Web Design
    <wa-dropdown slot="end">
      <wa-button slot="trigger" size="small" appearance="filled" pill>
        <wa-icon label="More options" name="ellipsis" variant="solid"></wa-icon>
      </wa-button>
      <wa-dropdown-item type="checkbox" checked>Web Design</wa-dropdown-item>
      <wa-dropdown-item type="checkbox">Web Development</wa-dropdown-item>
      <wa-dropdown-item type="checkbox">Marketing</wa-dropdown-item>
    </wa-dropdown>
  </wa-breadcrumb-item>
</wa-breadcrumb>
```
