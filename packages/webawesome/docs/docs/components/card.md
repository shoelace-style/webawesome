---
title: Card
description: Cards can be used to group related subjects in a container.
layout: component
category: Organization
---

```html {.example}
<wa-card class="card-overview">
  <img
    slot="media"
    src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  />

  <strong>Mittens</strong><br />
  This kitten is as cute as he is playful. Bring him home today!<br />
  <small class="wa-caption-s">6 weeks old</small>

  <wa-button slot="footer" variant="brand" pill>More Info</wa-button>
  <wa-rating slot="footer-actions" label="Rating"></wa-rating>
</wa-card>

<style>
  .card-overview {
    width: 300px;
  }
</style>
```

## Examples

### Basic Card

Basic cards aren't very exciting, but they can display any content you want them to.

```html {.example}
<wa-card class="card-basic">
  This is just a basic card. No media, no header, and no footer. Just your content.
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
<wa-card class="card-header">
  <h3 slot="header">Header Title</h3>
  This card has a header. You can put all sorts of things in it!
  <wa-button appearance="plain" slot="header-actions">
    <wa-icon name="gear" variant="solid" label="Settings"></wa-icon>
  </wa-button>
</wa-card>

<style>
  .card-header {
    max-width: 300px;
  }

  .card-header h3 {
    margin: 0;
  }
</style>
```

### Card with Footer

Footers can be used to display actions, summaries, or other relevant content.
If using SSR, you need to also use the `with-footer` attribute to add a footer to the card (if not, it is added automatically).

```html {.example}
<wa-card class="card-footer">
  This card has a footer. You can put all sorts of things in it!

  <wa-rating slot="footer"></wa-rating>

  <wa-button slot="footer-actions" variant="brand">Preview</wa-button>
</wa-card>

<style>
  .card-footer {
    max-width: 300px;
  }
</style>
```

### Media

Card media is displayed atop the card and will stretch to fit.
If using SSR, you need to also use the `with-media` attribute to add a media section to the card (if not, it is added automatically).

```html {.example}
<div class="wa-grid">
  <wa-card class="card-media">
    <div slot="media" class="wa-frame:landscape">
      <img
        src="https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
        alt="A kitten walks towards camera on top of pallet."
      />
    </div>
    This card has an image of a kitten walking along a pallet. 
  </wa-card>
  <wa-card class="card-media">
    <video slot="media" controls>
      <source src="https://uploads.webawesome.com/dog-with-glasses.mp4" />
      <p>Your browser doesn't support HTML video</p>
    </video>
    This card has a video of a dog wearing shades.
  </wa-card>
</div>

<style>
  .card-media {
    max-width: 300px;
  }
</style>
```

### Appearance

Use the `appearance` attribute to change the card's visual appearance.

```html {.example}
<div class="wa-grid">
  <wa-card>
    <img
      slot="media"
      src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
      alt="A kitten sits patiently between a terracotta pot and decorative grasses."
    />
    Outlined (default)
  </wa-card>
  {% for appearance in ['filled-outlined', 'plain', 'filled', 'accent'] -%}
  <wa-card appearance="{{ appearance }}">
    <img
      slot="media"
      src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
      alt="A kitten sits patiently between a terracotta pot and decorative grasses."
    />
    {{ appearance | capitalize }}
  </wa-card>
  {%- endfor %}
</div>
```

### Orientation

Set the `orientation` attribute to `horizontal` to create a card with a horizontal, side-by-side layout. Make sure to set a width or maximum width for the media slot. Horizontal cards do not currently contain the header and footer slots.

:::info
The `actions` slot is only available for the horizontal orientation
:::

```html {.example}
<div class="wa-grid">
  <wa-card orientation="horizontal" class="horizontal-card">
    <img
      slot="media"
      src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
      alt="A kitten sits patiently between a terracotta pot and decorative grasses."
    />
    This card has a horizontal orientation with media, body, and actions arranged side-by-side.
    <wa-button slot="actions" variant="neutral" appearance="plain"
      ><wa-icon name="ellipsis" label="actions"></wa-icon
    ></wa-button>
  </wa-card>
</div>

<style>
  .horizontal-card {
    img[slot='media'] {
      max-width: 300px;
    }
  }
</style>
```
