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
  <small class="wa-caption-m">6 weeks old</small>

  <div slot="footer" class="wa-split">
    <wa-button variant="brand" pill>More Info</wa-button>
    <wa-rating label="Rating"></wa-rating>
  </div>
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
  <div slot="header" class="wa-split">
    Header Title
    <wa-button appearance="plain">
      <wa-icon name="gear" variant="solid" label="Settings"></wa-icon>
    </wa-button>
  </div>

  This card has a header. You can put all sorts of things in it!
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

  <div slot="footer" class="wa-split">
    <wa-rating></wa-rating>
    <wa-button variant="brand">Preview</wa-button>
  </div>
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
    <img
      slot="media"
      src="https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
      alt="A kitten walks towards camera on top of pallet."
    />
    This is a kitten, but not just any kitten. This kitten likes walking along pallets.
  </wa-card>
  <wa-card class="card-media">
    <video slot="media" controls>
      <source src="https://uploads.webawesome.com/dog-with-glasses.mp4" />
      <p>Your browser doesn't support HTML video</p>
    </video>
    This is a kitten, but not just any kitten. This kitten likes walking along pallets.
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
  {% for appearance in ['outlined filled', 'plain', 'filled', 'accent'] -%}
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
