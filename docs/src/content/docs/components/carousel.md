---
title: Carousel
description: Carousels display an arbitrary number of content slides along a horizontal or vertical axis.
layout: ../../../layouts/ComponentLayout.astro
---

```html:preview
<wa-carousel pagination navigation mouse-dragging loop>
  <wa-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </wa-carousel-item>
</wa-carousel>
```

```jsx:react
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <>
    <WaCarousel pagination mouse-dragging>
      <WaCarouselItem>
        <img
          alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
          src="/assets/examples/carousel/mountains.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
          src="/assets/examples/carousel/waterfall.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
          src="/assets/examples/carousel/sunset.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
          src="/assets/examples/carousel/field.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
          src="/assets/examples/carousel/valley.jpg"
        />
      </WaCarouselItem>
    </WaCarousel>
  </>
);
```

## Examples

### Pagination

Use the `pagination` attribute to show the total number of slides and the current slide as a set of interactive dots.

```html:preview
<wa-carousel pagination>
  <wa-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </wa-carousel-item>
</wa-carousel>
```

```jsx:react
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <WaCarousel pagination>
    <WaCarouselItem>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
        src="/assets/examples/carousel/field.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
        src="/assets/examples/carousel/valley.jpg"
      />
    </WaCarouselItem>
  </WaCarousel>
);
```

### Navigation

Use the `navigation` attribute to show previous and next buttons.

```html:preview
<wa-carousel navigation>
  <wa-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </wa-carousel-item>
</wa-carousel>
```

```jsx:react
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <WaCarousel navigation>
    <WaCarouselItem>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
        src="/assets/examples/carousel/field.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
        src="/assets/examples/carousel/valley.jpg"
      />
    </WaCarouselItem>
  </WaCarousel>
);
```

### Looping

By default, the carousel will not advanced beyond the first and last slides. You can change this behavior and force the carousel to "wrap" with the `loop` attribute.

```html:preview
<wa-carousel loop navigation pagination>
  <wa-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </wa-carousel-item>
</wa-carousel>
```

```jsx:react
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <WaCarousel loop navigation pagination>
    <WaCarouselItem>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
        src="/assets/examples/carousel/field.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
        src="/assets/examples/carousel/valley.jpg"
      />
    </WaCarouselItem>
  </WaCarousel>
);
```

### Autoplay

The carousel will automatically advance when the `autoplay` attribute is used. To change how long a slide is shown before advancing, set `autoplay-interval` to the desired number of milliseconds. For best results, use the `loop` attribute when autoplay is enabled. Note that autoplay will pause while the user interacts with the carousel.

```html:preview
<wa-carousel autoplay loop pagination>
  <wa-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </wa-carousel-item>
</wa-carousel>
```

```jsx:react
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <WaCarousel autoplay loop pagination>
    <WaCarouselItem>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
        src="/assets/examples/carousel/field.jpg"
      />
    </WaCarouselItem>
    <WaCarouselItem>
      <img
        alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
        src="/assets/examples/carousel/valley.jpg"
      />
    </WaCarouselItem>
  </WaCarousel>
);
```

### Mouse Dragging

The carousel uses [scroll snap](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap) to position slides at various snap positions. This allows users to scroll through the slides very naturally, especially on touch devices. Unfortunately, desktop users won't be able to click and drag with a mouse, which can feel unnatural. Adding the `mouse-dragging` attribute can help with this.

This example is best demonstrated using a mouse. Try clicking and dragging the slide to move it. Then toggle the switch and try again.

```html:preview
<div class="mouse-dragging">
  <wa-carousel pagination>
    <wa-carousel-item>
      <img
        alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
        src="/assets/examples/carousel/mountains.jpg"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
        src="/assets/examples/carousel/waterfall.jpg"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
        src="/assets/examples/carousel/sunset.jpg"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
        src="/assets/examples/carousel/field.jpg"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
        src="/assets/examples/carousel/valley.jpg"
      />
    </wa-carousel-item>
  </wa-carousel>

  <wa-divider></wa-divider>

  <wa-switch>Enable mouse dragging</wa-switch>
</div>

<script>
  const container = document.querySelector('.mouse-dragging');
  const carousel = container.querySelector('wa-carousel');
  const toggle = container.querySelector('wa-switch');

  toggle.addEventListener('wa-change', () => {
    carousel.toggleAttribute('mouse-dragging', toggle.checked);
  });
</script>
```

```jsx:react
import { useState } from 'react';
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <>
      <WaCarousel navigation mouseDragging={isEnabled}>
        <WaCarouselItem>
          <img
            alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
            src="/assets/examples/carousel/mountains.jpg"
          />
        </WaCarouselItem>
        <WaCarouselItem>
          <img
            alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
            src="/assets/examples/carousel/waterfall.jpg"
          />
        </WaCarouselItem>
        <WaCarouselItem>
          <img
            alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
            src="/assets/examples/carousel/sunset.jpg"
          />
        </WaCarouselItem>
        <WaCarouselItem>
          <img
            alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
            src="/assets/examples/carousel/field.jpg"
          />
        </WaCarouselItem>
        <WaCarouselItem>
          <img
            alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
            src="/assets/examples/carousel/valley.jpg"
          />
        </WaCarouselItem>
      </WaCarousel>

      <WaDivider></WaDivider>

      <WaSwitch checked={isEnabled} onWaInput={() => setIsEnabled(!isEnabled)}>
        Enable mouse dragging
      </WaSwitch>
    </>
  );
};
```

### Multiple Slides Per View

The `slides-per-page` attribute makes it possible to display multiple slides at a time. You can also use the `slides-per-move` attribute to advance more than once slide at a time, if desired.

```html:preview
<wa-carousel navigation pagination slides-per-page="2" slides-per-move="2">
  <wa-carousel-item style="background: red;">Slide 1</wa-carousel-item>
  <wa-carousel-item style="background: orange;">Slide 2</wa-carousel-item>
  <wa-carousel-item style="background: yellow;">Slide 3</wa-carousel-item>
  <wa-carousel-item style="background: green;">Slide 4</wa-carousel-item>
  <wa-carousel-item style="background: blue;">Slide 5</wa-carousel-item>
  <wa-carousel-item style="background: purple;">Slide 6</wa-carousel-item>
</wa-carousel>
```

```jsx:react
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const App = () => (
  <WaCarousel navigation pagination slidesPerPage={2} slidesPerMove={2}>
    <WaCarouselItem style={{ background: 'red' }}>Slide 1</WaCarouselItem>
    <WaCarouselItem style={{ background: 'orange' }}>Slide 2</WaCarouselItem>
    <WaCarouselItem style={{ background: 'yellow' }}>Slide 3</WaCarouselItem>
    <WaCarouselItem style={{ background: 'green' }}>Slide 4</WaCarouselItem>
    <WaCarouselItem style={{ background: 'blue' }}>Slide 5</WaCarouselItem>
    <WaCarouselItem style={{ background: 'purple' }}>Slide 6</WaCarouselItem>
  </WaCarousel>
);
```

### Adding and Removing Slides

The content of the carousel can be changed by adding or removing carousel items. The carousel will update itself automatically.

```html:preview
<wa-carousel class="dynamic-carousel" pagination navigation>
  <wa-carousel-item style="background: red">Slide 1</wa-carousel-item>
  <wa-carousel-item style="background: orange">Slide 2</wa-carousel-item>
  <wa-carousel-item style="background: yellow">Slide 3</wa-carousel-item>
</wa-carousel>

<div class="carousel-options">
  <wa-button id="dynamic-add">Add slide</wa-button>
  <wa-button id="dynamic-remove">Remove slide</wa-button>
</div>

<style>
  .dynamic-carousel {
    --aspect-ratio: 3 / 2;
  }

  .dynamic-carousel ~ .carousel-options {
    display: flex;
    justify-content: center;
    gap: var(--wa-space-xs);
    margin-top: var(--wa-space-l);
  }

  .dynamic-carousel wa-carousel-item {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-2xl);
  }
</style>

<script>
  (() => {
    const dynamicCarousel = document.querySelector('.dynamic-carousel');
    const dynamicAdd = document.querySelector('#dynamic-add');
    const dynamicRemove = document.querySelector('#dynamic-remove');
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    let colorIndex = 2;

    const addSlide = () => {
      const slide = document.createElement('wa-carousel-item');
      const color = colors[++colorIndex % colors.length];
      slide.innerText = `Slide ${dynamicCarousel.children.length + 1}`;
      slide.style.setProperty('background', color);
      dynamicCarousel.appendChild(slide);
      dynamicRemove.disabled = false;
    };

    const removeSlide = () => {
      const slide = dynamicCarousel.children[dynamicCarousel.children.length - 1];
      const numSlides = dynamicCarousel.querySelectorAll('wa-carousel-item').length;

      if (numSlides > 1) {
        slide.remove();
        colorIndex--;
      }

      dynamicRemove.disabled = numSlides - 1 <= 1;
    };

    dynamicAdd.addEventListener('click', addSlide);
    dynamicRemove.addEventListener('click', removeSlide);
  })();
</script>
```

```jsx:react
import { useState } from 'react';
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const css = `
  .dynamic-carousel {
    --aspect-ratio: 3 / 2;
  }

  .dynamic-carousel ~ .carousel-options {
    display: flex;
    justify-content: center;
    margin-top: var(--wa-space-l);
  }

  .dynamic-carousel wa-carousel-item {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: var(--wa-font-size-2xl);
  }
`;

const App = () => {
  const [slides, setSlides] = useState(['#204ed8', '#be133d', '#6e28d9']);
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

  const addSlide = () => {
    setSlides([...slides, getRandomColor()]);
  };

  const removeSlide = () => {
    setSlides(slides.slice(0, -1));
  };

  return (
    <>
      <WaCarousel className="dynamic-carousel" pagination navigation>
        {slides.map((color, i) => (
          <WaCarouselItem style={{ background: colors[i % colors.length }}>
            Slide {i}
          </WaCarouselItem>
        ))}
      </WaCarousel>

      <div className="carousel-options">
        <WaButton onClick={addSlide}>Add slide</WaButton>
        <WaButton onClick={removeSlide}>Remove slide</WaButton>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Vertical Scrolling

Setting the `orientation` attribute to `vertical` will render the carousel in a vertical layout. If the content of your slides vary in height, you will need to set amn explicit `height` or `max-height` on the carousel using CSS.

```html:preview
<wa-carousel class="vertical" pagination orientation="vertical">
  <wa-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </wa-carousel-item>
</wa-carousel>
<style>
  .vertical {
    max-height: 400px;
  }

  .vertical::part(base) {
    grid-template-areas: 'slides slides pagination';
  }

  .vertical::part(pagination) {
    flex-direction: column;
  }

  .vertical::part(navigation) {
    transform: rotate(90deg);
    display: flex;
  }
</style>
```

```jsx:react
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';

const css = `
  .vertical {
    max-height: 400px;
  }

  .vertical::part(base) {
    grid-template-areas: 'slides slides pagination';
  }

  .vertical::part(pagination) {
    flex-direction: column;
  }

  .vertical::part(navigation) {
    transform: rotate(90deg);
    display: flex;
  }
`;

const App = () => (
  <>
    <WaCarousel className="vertical" loop pagination orientation="vertical">
      <WaCarouselItem>
        <img
          alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
          src="/assets/examples/carousel/mountains.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
          src="/assets/examples/carousel/waterfall.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
          src="/assets/examples/carousel/sunset.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
          src="/assets/examples/carousel/field.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
          src="/assets/examples/carousel/valley.jpg"
        />
      </WaCarouselItem>
    </WaCarousel>
    <style>{css}</style>
  </>
);
```

### Aspect Ratio

Use the `--aspect-ratio` custom property to customize the size of the carousel's viewport from the default value of 16/9.

```html:preview
<wa-carousel class="aspect-ratio" navigation pagination style="--aspect-ratio: 3/2;">
  <wa-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </wa-carousel-item>
</wa-carousel>

<wa-divider></wa-divider>

<wa-select label="Aspect ratio" name="aspect" value="3/2">
  <wa-option value="1/1">1/1</wa-option>
  <wa-option value="3/2">3/2</wa-option>
  <wa-option value="16/9">16/9</wa-option>
</wa-select>

<script>
  (() => {
    const carousel = document.querySelector('wa-carousel.aspect-ratio');
    const aspectRatio = document.querySelector('wa-select[name="aspect"]');

    aspectRatio.addEventListener('wa-change', () => {
      carousel.style.setProperty('--aspect-ratio', aspectRatio.value);
    });
  })();
</script>
```

```jsx:react
import { useState } from 'react';
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaSelect from '@shoelace-style/shoelace/dist/react/select';
import WaOption from '@shoelace-style/shoelace/dist/react/option';

const App = () => {
  const [aspectRatio, setAspectRatio] = useState('3/2');

  return (
    <>
      <WaCarousel className="aspect-ratio" navigation pagination style={{ '--aspect-ratio': aspectRatio }}>
        <WaCarouselItem>
          <img
            alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
            src="/assets/examples/carousel/mountains.jpg"
          />
        </WaCarouselItem>
        <WaCarouselItem>
          <img
            alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
            src="/assets/examples/carousel/waterfall.jpg"
          />
        </WaCarouselItem>
        <WaCarouselItem>
          <img
            alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
            src="/assets/examples/carousel/sunset.jpg"
          />
        </WaCarouselItem>
        <WaCarouselItem>
          <img
            alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
            src="/assets/examples/carousel/field.jpg"
          />
        </WaCarouselItem>
        <WaCarouselItem>
          <img
            alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
            src="/assets/examples/carousel/valley.jpg"
          />
        </WaCarouselItem>
      </WaCarousel>

      <WaDivider />

      <WaSelect
        label="Aspect ratio"
        name="aspect"
        value={aspectRatio}
        onWaChange={event => setAspectRatio(event.target.value)}
      >
        <WaOption value="1 / 1">1 / 1</WaOption>
        <WaOption value="3 / 2">3 / 2</WaOption>
        <WaOption value="16 / 9">16 / 9</WaOption>
      </WaSelect>

      <style>{css}</style>
    </>
  );
};
```

### Scroll Hint

Use the `--scroll-hint` custom property to add inline padding in horizontal carousels and block padding in vertical carousels. This will make the closest slides slightly visible, hinting that there are more items in the carousel.

```html:preview
<wa-carousel class="scroll-hint" pagination style="--scroll-hint: 10%;">
  <wa-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </wa-carousel-item>
</wa-carousel>
```

```jsx:react
import { useState } from 'react';
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaRange from '@shoelace-style/shoelace/dist/react/range';

const App = () => (
  <>
    <WaCarousel className="scroll-hint" pagination style={{ '--scroll-hint': '10%' }}>
      <WaCarouselItem>
        <img
          alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
          src="/assets/examples/carousel/mountains.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
          src="/assets/examples/carousel/waterfall.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
          src="/assets/examples/carousel/sunset.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
          src="/assets/examples/carousel/field.jpg"
        />
      </WaCarouselItem>
      <WaCarouselItem>
        <img
          alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
          src="/assets/examples/carousel/valley.jpg"
        />
      </WaCarouselItem>
    </WaCarousel>
  </>
);
```

### Gallery Example

The carousel has a robust API that makes it possible to extend and customize. This example syncs the active slide with a set of thumbnails, effectively creating a gallery-style carousel.

```html:preview
<wa-carousel class="carousel-thumbnails" navigation loop>
  <wa-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/mountains.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/waterfall.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/sunset.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/field.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/valley.jpg"
    />
  </wa-carousel-item>
</wa-carousel>

<div class="thumbnails">
  <div class="thumbnails__scroller">
    <img alt="Thumbnail by 1" class="thumbnails__image active" src="/assets/examples/carousel/mountains.jpg" />
    <img alt="Thumbnail by 2" class="thumbnails__image" src="/assets/examples/carousel/waterfall.jpg" />
    <img alt="Thumbnail by 3" class="thumbnails__image" src="/assets/examples/carousel/sunset.jpg" />
    <img alt="Thumbnail by 4" class="thumbnails__image" src="/assets/examples/carousel/field.jpg" />
    <img alt="Thumbnail by 5" class="thumbnails__image" src="/assets/examples/carousel/valley.jpg" />
  </div>
</div>

<style>
  .carousel-thumbnails {
    --slide-aspect-ratio: 3 / 2;
  }

  .thumbnails {
    display: flex;
    justify-content: center;
  }

  .thumbnails__scroller {
    display: flex;
    gap: var(--wa-space-s);
    overflow-x: auto;
    scrollbar-width: none;
    scroll-behavior: smooth;
    scroll-padding: var(--wa-space-s);
  }

  .thumbnails__scroller::-webkit-scrollbar {
    display: none;
  }

  .thumbnails__image {
    width: 64px;
    height: 64px;
    object-fit: cover;

    opacity: 0.3;
    will-change: opacity;
    transition: 250ms opacity;

    cursor: pointer;
  }

  .thumbnails__image.active {
    opacity: 1;
  }
</style>

<script>
  {
    const carousel = document.querySelector('.carousel-thumbnails');
    const scroller = document.querySelector('.thumbnails__scroller');
    const thumbnails = document.querySelectorAll('.thumbnails__image');

    scroller.addEventListener('click', e => {
      const target = e.target;

      if (target.matches('.thumbnails__image')) {
        const index = [...thumbnails].indexOf(target);
        carousel.goToSlide(index);
      }
    });

    carousel.addEventListener('wa-slide-change', e => {
      const slideIndex = e.detail.index;

      [...thumbnails].forEach((thumb, i) => {
        thumb.classList.toggle('active', i === slideIndex);
        if (i === slideIndex) {
          thumb.scrollIntoView({
            block: 'nearest'
          });
        }
      });
    });
  }
</script>
```

```jsx:react
import { useRef } from 'react';
import WaCarousel from '@shoelace-style/shoelace/dist/react/carousel';
import WaCarouselItem from '@shoelace-style/shoelace/dist/react/carousel-item';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaRange from '@shoelace-style/shoelace/dist/react/range';

const css = `
  .carousel-thumbnails {
    --slide-aspect-ratio: 3 / 2;
  }

  .thumbnails {
    display: flex;
    justify-content: center;
  }

  .thumbnails__scroller {
    display: flex;
    gap: var(--wa-space-s);
    overflow-x: auto;
    scrollbar-width: none;
    scroll-behavior: smooth;
    scroll-padding: var(--wa-space-s);
  }

  .thumbnails__scroller::-webkit-scrollbar {
    display: none;
  }

  .thumbnails__image {
    width: 64px;
    height: 64px;
    object-fit: cover;

    opacity: 0.3;
    will-change: opacity;
    transition: 250ms opacity;

    cursor: pointer;
  }

  .thumbnails__image.active {
    opacity: 1;
  }
`;

const images = [
  {
    src: '/assets/examples/carousel/mountains.jpg',
    alt: 'The sun shines on the mountains and trees (by Adam Kool on Unsplash'
  },
  {
    src: '/assets/examples/carousel/waterfall.jpg',
    alt: 'A waterfall in the middle of a forest (by Thomas Kelly on Unsplash'
  },
  {
    src: '/assets/examples/carousel/sunset.jpg',
    alt: 'The sun is setting over a lavender field (by Leonard Cotte on Unsplash'
  },
  {
    src: '/assets/examples/carousel/field.jpg',
    alt: 'A field of grass with the sun setting in the background (by Sapan Patel on Unsplash'
  },
  {
    src: '/assets/examples/carousel/valley.jpg',
    alt: 'A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash'
  }
];

const App = () => {
  const carouselRef = useRef();
  const thumbnailsRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const thumbnails = Array.from(thumbnailsRef.current.querySelectorAll('.thumbnails__image'));

    thumbnails[currentSlide]..scrollIntoView({
      block: 'nearest'
    });
  }, [currentSlide]);

  const handleThumbnailClick = (index) => {
    carouselRef.current.goToSlide(index);
  }

  const handleSlideChange = (event) => {
    const slideIndex = e.detail.index;
    setCurrentSlide(slideIndex);
  }

  return (
    <>
      <WaCarousel className="carousel-thumbnails" navigation loop onWaSlideChange={handleSlideChange}>
        {images.map({ src, alt }) => (
          <WaCarouselItem>
            <img
              alt={alt}
              src={src}
            />
          </WaCarouselItem>
        )}
      </WaCarousel>

      <div class="thumbnails">
        <div class="thumbnails__scroller">
          {images.map({ src, alt }, i) => (
            <img
              alt={`Thumbnail by ${i + 1}`}
              className={`thumbnails__image ${i === currentSlide ? 'active' : ''}`}
              onCLick={() => handleThumbnailClick(i)}
              src={src}
            />
          )}
        </div>
      </div>
      <style>{css}</style>
    </>
  );
};
```
