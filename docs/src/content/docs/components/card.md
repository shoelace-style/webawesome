---
title: Card
description: Cards can be used to group related subjects in a container.
layout: ../../../layouts/ComponentLayout.astro
---

```html:preview
<wa-card class="card-overview">
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

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaCard from '@shoelace-style/shoelace/dist/react/card';
import WaRating from '@shoelace-style/shoelace/dist/react/rating';

const css = `
  .card-overview {
    max-width: 300px;
  }

  .card-overview small {
    color: var(--wa-color-text-quiet);
  }

  .card-overview [slot="footer"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const App = () => (
  <>
    <WaCard className="card-overview">
      <img
        slot="image"
        src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
        alt="A kitten sits patiently between a terracotta pot and decorative grasses."
      />
      <strong>Mittens</strong>
      <br />
      This kitten is as cute as he is playful. Bring him home today!
      <br />
      <small>6 weeks old</small>
      <div slot="footer">
        <WaButton variant="brand" pill>
          More Info
        </WaButton>
        <WaRating></WaRating>
      </div>
    </WaCard>

    <style>{css}</style>
  </>
);
```

## Examples

### Basic Card

Basic cards aren't very exciting, but they can display any content you want them to.

```html:preview
<wa-card class="card-basic">
  This is just a basic card. No image, no header, and no footer. Just your content.
</wa-card>

<style>
  .card-basic {
    max-width: 300px;
  }
</style>
```

```jsx:react
import WaCard from '@shoelace-style/shoelace/dist/react/card';

const css = `
  .card-basic {
    max-width: 300px;
  }
`;

const App = () => (
  <>
    <WaCard className="card-basic">
      This is just a basic card. No image, no header, and no footer. Just your content.
    </WaCard>

    <style>{css}</style>
  </>
);
```

### Card with Header

Headers can be used to display titles and more.

```html:preview
<wa-card class="card-header">
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

```jsx:react
import WaCard from '@shoelace-style/shoelace/dist/react/card';
import WaIconButton from '@shoelace-style/shoelace/dist/react/icon-button';

const css = `
  .card-header {
    max-width: 300px;
  }

  .card-header [slot="header"] {
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
`;

const App = () => (
  <>
    <WaCard className="card-header">
      <div slot="header">
        Header Title
        <WaIconButton name="gear" variant="solid"></WaIconButton>
      </div>
      This card has a header. You can put all sorts of things in it!
    </WaCard>

    <style>{css}</style>
  </>
);
```

### Card with Footer

Footers can be used to display actions, summaries, or other relevant content.

```html:preview
<wa-card class="card-footer">
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

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaCard from '@shoelace-style/shoelace/dist/react/card';
import WaRating from '@shoelace-style/shoelace/dist/react/rating';

const css = `
  .card-footer {
    max-width: 300px;
  }

  .card-footer [slot="footer"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const App = () => (
  <>
    <WaCard className="card-footer">
      This card has a footer. You can put all sorts of things in it!
      <div slot="footer">
        <WaRating></WaRating>
        <WaButton slot="footer" variant="brand">
          Preview
        </WaButton>
      </div>
    </WaCard>

    <style>{css}</style>
  </>
);
```

### Images

Cards accept an `image` slot. The image is displayed atop the card and stretches to fit.

```html:preview
<wa-card class="card-image">
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

```jsx:react
import WaCard from '@shoelace-style/shoelace/dist/react/card';

const css = `
  .card-image {
    max-width: 300px;
  }
`;

const App = () => (
  <>
    <WaCard className="card-image">
      <img
        slot="image"
        src="https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
        alt="A kitten walks towards camera on top of pallet."
      />
      This is a kitten, but not just any kitten. This kitten likes walking along pallets.
    </WaCard>

    <style>{css}</style>
  </>
);
```
