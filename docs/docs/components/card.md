---
title: Card
description: Cards can be used to group related subjects in a container.
tags: [organization, layout]
icon: card
---

```html {.example}
<wa-card with-image with-footer class="card-overview">
  <img
    slot="image"
    src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  />

  <strong>Mittens</strong><br />
  This kitten is as cute as he is playful. Bring him home today!<br />
  <small>6 weeks old</small>

  <div slot="footer">
    <wa-button variant="brand" pill>More Info</wa-button>
    <wa-rating></wa-rating>
  </div>
</wa-card>

<style>
  .card-overview {
    max-width: 300px;
  }

  .card-overview small {
    color: var(--wa-color-text-quiet);
  }

  .card-overview [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
```

## Examples

### Basic Card

Basic cards aren't very exciting, but they can display any content you want them to.

```html {.example}
<wa-card class="card-basic">
  This is just a basic card. No image, no header, and no footer. Just your content.
</wa-card>

<style>
  .card-basic {
    max-width: 300px;
  }
</style>
```

### Card with Header

Headers can be used to display titles and more.
If using SSR, you need to also use the `with-header` attribute to add a header to the card (if not, it is added automatically).

```html {.example}
<wa-card with-header class="card-header">
  <div slot="header">
    Header Title
    <wa-icon-button name="gear" variant="solid" label="Settings"></wa-icon-button>
  </div>

  This card has a header. You can put all sorts of things in it!
</wa-card>

<style>
  .card-header {
    max-width: 300px;
  }

  .card-header [slot='header'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header wa-icon-button {
    font-size: var(--wa-font-size-m);
  }
</style>
```

### Card with Footer

Footers can be used to display actions, summaries, or other relevant content.
If using SSR, you need to also use the `with-footer` attribute to add a footer to the card (if not, it is added automatically).

```html {.example}
<wa-card with-footer class="card-footer">
  This card has a footer. You can put all sorts of things in it!

  <div slot="footer">
    <wa-rating></wa-rating>
    <wa-button variant="brand">Preview</wa-button>
  </div>
</wa-card>

<style>
  .card-footer {
    max-width: 300px;
  }

  .card-footer [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
```

### Images

Card images are displayed atop the card and will stretch to fit.
If using SSR, you need to also use the `with-image` attribute to add an image to the card (if not, it is added automatically).

```html {.example}
<wa-card with-image class="card-image">
  <img
    slot="image"
    src="https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
    alt="A kitten walks towards camera on top of pallet."
  />
  This is a kitten, but not just any kitten. This kitten likes walking along pallets.
</wa-card>

<style>
  .card-image {
    max-width: 300px;
  }
</style>
```

### Sizing

Use the `size` attribute to change a card's size.

```html {.example}
<div class="wa-stack">
<wa-card with-footer size="small">
  This is a small card.

  <footer slot="footer" class="wa-flank">
    <wa-button variant="brand" pill>More Info</wa-button>
    <wa-rating></wa-rating>
  </footer>
</wa-card>

<wa-card with-footer size="medium">
  This is a medium card (default).

  <footer slot="footer" class="wa-flank">
    <wa-button variant="brand" pill>More Info</wa-button>
    <wa-rating></wa-rating>
  </footer>
</wa-card>

<wa-card with-footer size="large">
  This is a large card.

  <footer slot="footer" class="wa-flank">
    <wa-button variant="brand" pill>More Info</wa-button>
    <wa-rating></wa-rating>
  </footer>
</wa-card>
</div>

```

<style>
</style>
