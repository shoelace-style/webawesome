---
title: Lightbox
layout: component
category: Media
hasAnatomy: false
synonyms:
  - image viewer
  - photo viewer
  - gallery
  - image zoom
  - media viewer
use-cases:
  - photo gallery
  - product images
  - image zoom
  - portfolio
  - video gallery
---

```html {.example}
<wa-lightbox class="wa-grid lightbox-overview" label="Landscape photos">
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    caption="Sunlight breaking over the mountains. Photo by Adam Kool on Unsplash."
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    caption="A river winding through an evergreen forest. Photo by Luca Bravo on Unsplash."
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    caption="Sunset over a lavender field. Photo by Leonard Cotte on Unsplash."
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=1600&h=1067&fit=crop&q=80"
    caption="Evening light across a field of grass. Photo by Sapan Patel on Unsplash."
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=480&h=320&fit=crop&q=60"
      alt="A field of grass with the sun setting in the background"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-overview {
    --min-column-size: 8rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>
```

Wrap each thumbnail in a [`<wa-lightbox-item>`](/docs/components/lightbox-item) and set the item's `src` attribute
to the full-size image. Click a thumbnail to open the lightbox at that item. Swipe or use the arrow keys to move
between items, click or pinch to zoom, and pull up or down or press [[Escape]] to close. On touch screens, tap the
image to hide the controls and tap again to bring them back.

Use the `label` attribute to describe the lightbox's contents to assistive devices.

The lightbox itself is a plain block element, so you can lay out the thumbnails any way you like.

:::info
<strong>Each thumbnail is a link to its full-size image.</strong><br />
Items still work before the component loads, and you can open one in a new tab like any other link.
:::

## Examples

### Caption

Use the `caption` attribute to show text with an item in the lightbox. The caption fades out while the image is zoomed
in.

```html {.example}
<wa-lightbox class="wa-grid lightbox-caption" label="Landscape photos">
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
    caption="Sunlight breaking over the mountains. Photo by Adam Kool on Unsplash."
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
    caption="A river winding through an evergreen forest. Photo by Luca Bravo on Unsplash."
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
    caption="Sunset over a lavender field. Photo by Leonard Cotte on Unsplash."
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-caption {
    --min-column-size: 8rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>
```

### Thumbnails

Add the `with-thumbnails` attribute to show a strip of thumbnails for jumping between items.

```html {.example}
<wa-lightbox class="wa-grid lightbox-thumbnails" label="Landscape photos" with-thumbnails>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=480&h=320&fit=crop&q=60"
      alt="A field of grass with the sun setting in the background"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=480&h=320&fit=crop&q=60"
      alt="A scenic view of a mountain with clouds rolling in"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-thumbnails {
    --min-column-size: 8rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>
```

### Loop

By default, the lightbox stops at the first and last items. Add the `loop` attribute to wrap around when navigating
past them with the buttons or the keyboard.

```html {.example}
<wa-lightbox class="wa-grid lightbox-loop" label="Landscape photos" loop>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-loop {
    --min-column-size: 8rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>
```

### Hiding Controls

Use these attributes to remove controls you don't need. This example hides the counter and turns off zooming.

| Attribute            | Behavior                                                                    |
| -------------------- | --------------------------------------------------------------------------- |
| `without-counter`    | Hides the "3 of 12" counter.                                                |
| `without-zoom`       | Turns off zooming and removes the zoom button.                              |
| `without-navigation` | Hides the previous and next buttons. Swiping and the arrow keys still work. |

```html {.example}
<wa-lightbox class="wa-grid lightbox-controls" label="Landscape photos" without-counter without-zoom>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-controls {
    --min-column-size: 8rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>
```

:::warning
<strong>Keep a way to navigate without swiping.</strong><br />
The previous and next buttons are hidden on touch screens, and everywhere when `without-navigation` is set. Add
`with-thumbnails` so people who can't swipe can still tap their way between items.
:::

### Image Dimensions

Set the `width` and `height` attributes to the full-size image's dimensions in pixels. The lightbox sizes the slide
from them before the image loads, so the opening animation is exact. They also set how far the image can be
zoomed. Without them, the lightbox uses the thumbnail's proportions until the image loads.

These square thumbnails open into a tall photo, a wide one, and a standard one.

```html {.example}
<wa-lightbox class="wa-grid lightbox-dimensions" label="Landscape photos">
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=1067&h=1600&fit=crop&q=80"
    caption="Evening light across a field of grass. Photo by Sapan Patel on Unsplash."
    width="1067"
    height="1600"
  >
    <img
      src="https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=320&h=480&fit=crop&q=60"
      alt="A field of grass with the sun setting in the background"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&h=900&fit=crop&q=80"
    caption="Clouds rolling in over the mountains. Photo by V2osk on Unsplash."
    width="1600"
    height="900"
  >
    <img
      src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=480&h=270&fit=crop&q=60"
      alt="A scenic view of a mountain with clouds rolling in"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    caption="Sunset over a lavender field. Photo by Leonard Cotte on Unsplash."
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-dimensions {
    --min-column-size: 8rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>
```

:::info
<strong>Crop thumbnails with CSS, not in the file.</strong><br />
The opening animation is smoothest when the thumbnail file has the same proportions as the full-size image. Use
`object-fit: cover` to show it at a different shape.
:::

### Responsive Images

Use the `srcset` attribute to offer the full-size image at more than one resolution. The lightbox picks a source for the
size it's displayed at, and a sharper one when the image is zoomed in. Set the `sizes` attribute to override this.

```html
<wa-lightbox-item src="photo-1600.jpg" srcset="photo-1600.jpg 1600w, photo-3200.jpg 3200w" width="3200" height="2134">
  <img src="photo-thumbnail.jpg" alt="..." />
</wa-lightbox-item>
```

### Video

Set an item's `type` attribute to `video` to play a video in the lightbox. The thumbnail gets a play button and is used
as the video's poster. Videos pause when you move to another item or close the lightbox, and they can't be zoomed.

```html {.example}
<wa-lightbox class="wa-grid lightbox-video" label="Photos and videos">
  <wa-lightbox-item
    type="video"
    src="https://uploads.webawesome.com/dog-with-glasses.mp4"
    caption="A dog wearing glasses"
    width="3840"
    height="2160"
  >
    <img src="/assets/images/dog-with-glasses.jpg" alt="A dog wearing glasses" />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-video {
    --min-column-size: 8rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>
```

### Custom Content

Put anything other than an image or a native video in a `<template>` inside the item. That covers other components,
video players, and embeds. The lightbox copies the template's content into the slide when it's needed, so nothing in it
loads until then. Set the `width` and `height` attributes to give the slide its proportions. Custom
content can't be zoomed.

This example shows a [comparison](/docs/components/comparison) in the first slide.

```html {.example}
<wa-lightbox class="wa-grid lightbox-content" label="Photos">
  <wa-lightbox-item width="1200" height="800" caption="Drag the divider to compare">
    <img
      src="https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=480&h=320&q=60"
      alt="Kittens in a basket looking around"
    />
    <template>
      <wa-comparison>
        <img
          slot="before"
          src="https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&h=800&q=80&sat=-100&bri=-5"
          alt="Grayscale version of kittens in a basket looking around"
        />
        <img
          slot="after"
          src="https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&h=800&q=80"
          alt="Color version of kittens in a basket looking around"
        />
      </wa-comparison>
    </template>
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-content {
    --min-column-size: 8rem;

    wa-lightbox-item > img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }

    wa-comparison img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
```

A video player works the same way. Set the `type` attribute to `video` to add the play button to its thumbnail.

<wa-callout class="pro wa-brand-orange">
  <wa-icon slot="icon" name="crown" family="duotone" variant="regular" class="duotone-illustrated"></wa-icon>
  The <a href="/docs/components/video"><code>&lt;wa-video&gt;</code></a> component requires
  <a href="/pro">Web Awesome Pro</a>.
</wa-callout>

```html
<wa-lightbox-item type="video" width="1920" height="1080">
  <img src="poster.jpg" alt="..." />
  <template>
    <wa-video poster="poster.jpg">
      <source src="video.mp4" type="video/mp4" />
    </wa-video>
  </template>
</wa-lightbox-item>
```

### Single Image

A lightbox with one item works as an image zoom. The counter, navigation buttons, and thumbnails are hidden when
there's nothing to navigate.

Use a large, detailed image so there's something to see up close. Open this one and zoom in on the lavender.

```html {.example}
<wa-lightbox class="lightbox-single" label="Lavender field photo">
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=3600&h=2400&fit=crop&q=80"
    caption="Sunset over a lavender field. Photo by Leonard Cotte on Unsplash."
    width="3600"
    height="2400"
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-single img {
    width: 100%;
    max-width: 24rem;
    aspect-ratio: 3 / 2;
    border-radius: var(--wa-border-radius-m);
    object-fit: cover;
  }
</style>
```

### Images in an Article

A lightbox can wrap any content, and its items don't need to be next to each other or direct children. Wrap an
article in a lightbox and each image in an item, and every image in the article opens in the same lightbox. Text,
links, and everything else in between work as usual.

```html {.example}
<wa-lightbox class="lightbox-article" label="Photos from the valley">
  <article>
    <p>
      We set out early, while the valley floor was still in shadow and the cliffs were only starting to catch the light.
    </p>

    <figure>
      <wa-lightbox-item
        src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
        width="1600"
        height="1067"
        caption="First light on the cliffs"
      >
        <img
          src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
          alt="The sun shines on the mountains and trees"
        />
      </wa-lightbox-item>
      <figcaption>First light on the cliffs</figcaption>
    </figure>

    <p>
      By midday the trail had dropped down to the river, where the water was clear enough to count the stones on the
      bottom. The <a href="https://unsplash.com/">photos</a> don't do it justice.
    </p>

    <figure>
      <wa-lightbox-item
        src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
        width="1600"
        height="1067"
        caption="The river below the trail"
      >
        <img
          src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
          alt="A river winding through an evergreen forest"
        />
      </wa-lightbox-item>
      <figcaption>The river below the trail</figcaption>
    </figure>
  </article>
</wa-lightbox>

<style>
  .lightbox-article {
    max-width: 32rem;

    figure {
      margin: var(--wa-space-l) 0;
    }

    img {
      width: 100%;
      border-radius: var(--wa-border-radius-m);
    }

    figcaption {
      margin-block-start: var(--wa-space-xs);
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
    }
  }
</style>
```

### Items Without Thumbnails

An item with nothing slotted in isn't shown on the page, but it still appears in the lightbox. Use this to show one
image on the page and the rest in the lightbox. Set the `thumbnail` attribute to give the item an image
for the thumbnail strip and a placeholder while it loads. Set the `alt` attribute too, since there's no thumbnail to
take it from.

This example shows a cover photo with a button that opens the rest. The button uses
[declarative opening](#opening-and-closing-declaratively).

```html {.example}
<wa-lightbox id="lightbox-hidden" class="lightbox-hidden" label="Landscape photos" with-thumbnails>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    thumbnail="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
    alt="A river winding through an evergreen forest"
    width="1600"
    height="1067"
  ></wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    thumbnail="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
    alt="The sun is setting over a lavender field"
    width="1600"
    height="1067"
  ></wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=1600&h=1067&fit=crop&q=80"
    thumbnail="https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=480&h=320&fit=crop&q=60"
    alt="A field of grass with the sun setting in the background"
    width="1600"
    height="1067"
  ></wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&h=1067&fit=crop&q=80"
    thumbnail="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=480&h=320&fit=crop&q=60"
    alt="A scenic view of a mountain with clouds rolling in"
    width="1600"
    height="1067"
  ></wa-lightbox-item>

  <wa-button size="small" class="view-all" data-lightbox="open lightbox-hidden">
    <wa-icon slot="start" name="images"></wa-icon>
    View all 5 photos
  </wa-button>
</wa-lightbox>

<style>
  .lightbox-hidden {
    position: relative;
    max-width: 24rem;

    img {
      width: 100%;
      aspect-ratio: 3 / 2;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }

    .view-all {
      position: absolute;
      inset-block-end: var(--wa-space-s);
      inset-inline-end: var(--wa-space-s);
    }
  }
</style>
```

### Customizing

Combine custom properties and CSS parts to give a lightbox its own look. This example frosts the page behind the
lightbox with the `--backdrop-color` and `--backdrop-filter` custom properties. The `--controls-color` and
`--controls-background` custom properties set the color of the controls, counter, and caption, and the background the
controls get when the media is behind them. CSS parts give the counter and the thumbnail strip the same
see-through fill and a thin edge, and set smaller, bolder type for the counter and caption.

Use `--show-duration` and `--hide-duration` to set the animation speed, and `--spacing`, `--slide-gap`, and
`--thumbnail-size` to adjust the layout.

```html {.example}
<wa-lightbox class="wa-grid lightbox-styled" label="Landscape photos" with-thumbnails loop>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
    caption="First light in the valley"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
    caption="Where the river slows down"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
    caption="Lavender at golden hour"
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
    caption="The last of the evening sun"
  >
    <img
      src="https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=480&h=320&fit=crop&q=60"
      alt="A field of grass with the sun setting in the background"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-styled {
    --min-column-size: 8rem;
    --backdrop-color: color-mix(in oklab, var(--wa-color-surface-default) 30%, transparent);
    --backdrop-filter: blur(40px) saturate(180%);
    --controls-color: var(--wa-color-text-normal);
    --controls-background: color-mix(in oklab, var(--wa-color-surface-raised) 70%, transparent);
    --media-border-radius: var(--wa-border-radius-l);
    --thumbnail-size: 3rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-l);
      object-fit: cover;
    }

    &::part(counter),
    &::part(thumbnails) {
      border: solid 1px color-mix(in oklab, var(--controls-color) 12%, transparent);
      background: var(--controls-background);
      backdrop-filter: blur(20px) saturate(180%);
    }

    &::part(counter) {
      padding: var(--wa-space-2xs) var(--wa-space-s);
      border-radius: var(--wa-border-radius-pill);
      font-size: var(--wa-font-size-s);
      font-variant-numeric: tabular-nums;
      font-weight: var(--wa-font-weight-semibold);
    }

    &::part(caption) {
      font-size: var(--wa-font-size-s);
      font-weight: var(--wa-font-weight-semibold);
      letter-spacing: -0.01em;
    }

    &::part(thumbnails) {
      padding: var(--wa-space-xs);
      border-radius: calc(var(--wa-border-radius-m) + var(--wa-space-xs));
    }

    &::part(thumbnail) {
      border-radius: var(--wa-border-radius-m);
    }
  }
</style>
```

### Opening & Closing Declaratively

Add `data-lightbox="open id"` to any button on the page to open a lightbox without JavaScript, where `id` is the
lightbox's ID. To open at a specific item, add the item's ID as well. Without one, the lightbox opens at the first item.

Add `data-lightbox="close"` to a button _inside_ a lightbox to close it.

```html {.example}
<wa-lightbox id="lightbox-declarative" class="wa-grid lightbox-declarative" label="Landscape photos">
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    id="lightbox-declarative-lavender"
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>

  <wa-button slot="actions" data-lightbox="close">Done</wa-button>
</wa-lightbox>

<div class="wa-cluster">
  <wa-button data-lightbox="open lightbox-declarative">View all photos</wa-button>
  <wa-button data-lightbox="open lightbox-declarative lightbox-declarative-lavender">View the lavender field</wa-button>
</div>

<style>
  .lightbox-declarative {
    --min-column-size: 8rem;
    margin-block-end: var(--wa-space-m);

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>
```

### Opening Programmatically

Set the `index` property to choose an item, then set the `open` property to `true` to show the lightbox. Set it to
`false` to close the lightbox. The `wa-item-change` event is emitted whenever the current item changes.

```html {.example}
<wa-lightbox class="wa-grid lightbox-programmatic" label="Landscape photos">
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-programmatic {
    --min-column-size: 8rem;
    margin-block-end: var(--wa-space-m);

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>

<div class="wa-cluster">
  <wa-button class="lightbox-programmatic-open">Open the last photo</wa-button>
  <span class="lightbox-programmatic-status"></span>
</div>

<script>
  const lightbox = document.querySelector('.lightbox-programmatic');
  const openButton = document.querySelector('.lightbox-programmatic-open');
  const status = document.querySelector('.lightbox-programmatic-status');

  openButton.addEventListener('click', () => {
    lightbox.index = lightbox.items.length - 1;
    lightbox.open = true;
  });

  lightbox.addEventListener('wa-item-change', event => {
    status.textContent = `Last viewed: photo ${event.detail.index + 1} of ${lightbox.items.length}`;
  });
</script>
```

### Toolbar Actions

The toolbar shows zoom and close buttons by default. Add your own [buttons](/docs/components/button) to the `actions`
slot. Buttons in the slot are styled to match the lightbox's controls. The
`currentItem` property gives you the item that's showing.

```html {.example}
<wa-lightbox class="wa-grid lightbox-actions" label="Landscape photos">
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=480&h=320&fit=crop&q=60"
      alt="The sun is setting over a lavender field"
    />
  </wa-lightbox-item>

  <wa-button slot="actions" class="open-original">
    <wa-icon name="arrow-up-right-from-square" label="Open original"></wa-icon>
  </wa-button>
</wa-lightbox>

<style>
  .lightbox-actions {
    --min-column-size: 8rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>

<script>
  const lightbox = document.querySelector('.lightbox-actions');
  const openOriginal = lightbox.querySelector('.open-original');

  openOriginal.addEventListener('click', () => {
    window.open(lightbox.currentItem.src, '_blank', 'noopener');
  });
</script>
```

The lightbox styles slotted buttons by setting design tokens on them. To change one, set the token yourself. This
gives a button the brand color while keeping its size and shape.

```css
wa-button[slot='actions'] {
  --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
  --wa-color-on-loud: var(--wa-color-brand-on-loud);
}
```

### Preventing the Lightbox from Closing

By default, the lightbox closes when the user clicks the close button or the backdrop, presses the [[Escape]] key, or
pulls the image up or down. To keep it open, you can cancel the `wa-hide` event.

Check `event.detail.source` to see which element asked to close. This example keeps the lightbox open unless the close
button is clicked.

:::warning
<strong>Always leave a way to close the lightbox.</strong><br />
It covers the whole screen, so a handler that cancels every request leaves people stuck with no way back to the page.
:::

```html {.example}
<wa-lightbox class="wa-grid lightbox-prevent" label="Landscape photos">
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=480&h=320&fit=crop&q=60"
      alt="The sun shines on the mountains and trees"
    />
  </wa-lightbox-item>
  <wa-lightbox-item
    src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=1067&fit=crop&q=80"
    width="1600"
    height="1067"
  >
    <img
      src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=480&h=320&fit=crop&q=60"
      alt="A river winding through an evergreen forest"
    />
  </wa-lightbox-item>
</wa-lightbox>

<style>
  .lightbox-prevent {
    --min-column-size: 8rem;

    img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: var(--wa-border-radius-m);
      object-fit: cover;
    }
  }
</style>

<script>
  const lightbox = document.querySelector('.lightbox-prevent');

  // Only close from the close button
  lightbox.addEventListener('wa-hide', event => {
    if (event.target === lightbox && !event.detail.source.part.contains('close-button')) {
      event.preventDefault();
    }
  });
</script>
```

## Accessibility Considerations

The lightbox handles most accessibility needs for you.

- **Focus.** Focus is kept inside the lightbox while it's open and returns to the current item's thumbnail when it
  closes. If that item has no thumbnail, focus returns to whatever opened the lightbox.
- **Announcements.** The current item's position, alternative text, and caption are announced as you move between
  items.
- **Zooming without gestures.** Clicking the image, double-tapping it, and the zoom button do everything that
  pinching does.
- **Reduced motion.** When the user prefers reduced motion, the lightbox opens and closes without animating and
  switches items without scrolling.

The lightbox can be used entirely from the keyboard.

| Key                | Action                                                             |
| ------------------ | ------------------------------------------------------------------ |
| [[←]] / [[→]]      | Show the previous or next item, or pan the image when it's zoomed. |
| [[↑]] / [[↓]]      | Pan the image when it's zoomed.                                    |
| [[Home]] / [[End]] | Show the first or last item.                                       |
| [[+]] / [[-]]      | Zoom in or out.                                                    |
| [[0]]              | Reset the zoom.                                                    |
| [[Escape]]         | Close the lightbox.                                                |

A few things are up to you.

- Give every thumbnail meaningful `alt` text. The lightbox reuses it for the full-size image unless you set the `alt`
  attribute on the item.
- Set the `label` attribute to describe what the lightbox contains.
- Captions are shown as plain text. Don't rely on them to carry information that isn't also in the alternative text.
