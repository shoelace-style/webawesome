---
title: Random Content
layout: component
category: Helpers
synonyms:
  - rotate
  - shuffle
  - variety
  - rotator
use-cases:
  - rotating testimonials
  - tip of the day
  - featured content
---

Randomly picks and displays one or more of its slotted children, hiding the rest. Use it to rotate testimonials, surface featured content, show a tip of the day, or add variety to an otherwise static page.

```html {.example}
<div>
  <wa-random-content id="rc-overview">
    <wa-callout variant="brand">
      <wa-icon slot="icon" name="paperclip-vertical"></wa-icon>
      <strong>It looks like you're writing a letter!</strong><br />
      Want a hand with the formatting?
    </wa-callout>
    <wa-callout variant="brand">
      <wa-icon slot="icon" name="paperclip-vertical"></wa-icon>
      <strong>It looks like you're building a web app!</strong><br />
      I can recommend a few components.
    </wa-callout>
    <wa-callout variant="brand">
      <wa-icon slot="icon" name="paperclip-vertical"></wa-icon>
      <strong>It looks like you're stuck.</strong><br />
      Have you tried turning it off and on again?
    </wa-callout>
    <wa-callout variant="brand">
      <wa-icon slot="icon" name="paperclip-vertical"></wa-icon>
      <strong>It looks like you're shipping on a Friday.</strong><br />
      Bold move. I respect it.
    </wa-callout>
  </wa-random-content>

  <wa-divider></wa-divider>

  <wa-button appearance="filled" onclick="document.getElementById('rc-overview').randomize()">Shuffle</wa-button>
</div>
```

## Examples

### Providing Content

Slot virtually any HTML — text, badges, cards, images, or other components — as long as each item is a **direct child**. Nested elements and bare text nodes are ignored. The host renders [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents), so it stays invisible to layout.

```html {.example}
<div>
  <wa-random-content id="rc-providing">
    <p>Plain text works fine.</p>
    <wa-badge variant="brand">So do components</wa-badge>
    <wa-card>Even rich cards with their own content.</wa-card>
  </wa-random-content>

  <wa-divider></wa-divider>

  <wa-button appearance="filled" onclick="document.getElementById('rc-providing').randomize()">Shuffle</wa-button>
</div>
```

### Setting the Number of Items

Set `items` to show more than one child at a time. The value is clamped to the number of available children.

```html {.example}
<div class="rc-items-demo">
  <wa-random-content id="rc-items" items="2">
    <wa-badge variant="brand">New</wa-badge>
    <wa-badge variant="success">Sale</wa-badge>
    <wa-badge variant="warning">Low stock</wa-badge>
    <wa-badge variant="neutral">Popular</wa-badge>
    <wa-badge variant="danger">Last chance</wa-badge>
  </wa-random-content>

  <wa-divider></wa-divider>

  <div class="wa-cluster" style="align-items: flex-end">
    <wa-select id="rc-items-count" label="Items" value="2" style="width: 8rem">
      <wa-option value="1">1</wa-option>
      <wa-option value="2">2</wa-option>
      <wa-option value="3">3</wa-option>
      <wa-option value="4">4</wa-option>
    </wa-select>
    <wa-button appearance="filled" onclick="document.getElementById('rc-items').randomize()">Shuffle</wa-button>
  </div>
</div>

<script>
  document.getElementById('rc-items-count').addEventListener('change', event => {
    document.getElementById('rc-items').items = Number(event.target.value);
  });
</script>
```

### Changing the Mode

The `mode` attribute controls how the next selection is chosen. Switch modes and shuffle a few times to feel the difference — the recent picks are listed underneath.

| Mode                                                                                                                                                                                     | Behavior                                                                        | Best for                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------- |
| <span class="wa-cluster wa-flex-nowrap wa-gap-3xs">`unique` <wa-badge appearance="outlined" variant="neutral" pill style="font-size: var(--wa-font-size-2xs);">default</wa-badge></span> | Never repeats the previous selection.                                           | Tip rotators and timed loops.      |
| `random`                                                                                                                                                                                 | Picks at complete random, so the same item can appear twice in a row.           | A one-time shuffle on load.        |
| `sequence`                                                                                                                                                                               | Steps through children in DOM order, wrapping at the end (advances by `items`). | Stepping through content in order. |

```html {.example}
<div class="rc-modes-demo">
  <wa-random-content id="rc-modes" mode="unique">
    <wa-tag variant="brand">A</wa-tag>
    <wa-tag variant="success">B</wa-tag>
    <wa-tag variant="warning">C</wa-tag>
    <wa-tag variant="danger">D</wa-tag>
  </wa-random-content>

  <wa-divider></wa-divider>

  <div class="wa-cluster" style="align-items: flex-end">
    <wa-select id="rc-modes-mode" label="Mode" value="unique" style="width: 10rem">
      <wa-option value="unique">unique</wa-option>
      <wa-option value="random">random</wa-option>
      <wa-option value="sequence">sequence</wa-option>
    </wa-select>
    <wa-button appearance="filled" onclick="document.getElementById('rc-modes').randomize()">Shuffle</wa-button>
  </div>

  <small style="display: block; margin-block-start: var(--wa-space-s)">
    Recent picks: <span id="rc-modes-history"></span>
  </small>
</div>

<script>
  const rcModes = document.getElementById('rc-modes');
  const rcModesHistory = document.getElementById('rc-modes-history');

  document.getElementById('rc-modes-mode').addEventListener('change', event => {
    rcModes.mode = event.target.value;
  });

  rcModes.addEventListener('wa-content-change', event => {
    const labels = event.detail.items.map(item => item.textContent.trim()).join('');
    const picks = (rcModesHistory.textContent + ' ' + labels).trim().split(/\s+/).slice(-16);
    rcModesHistory.textContent = picks.join(' ');
  });
</script>
```

### Animating New Content

Use the `animation` attribute to play an entrance transition when new content is shown.

```html {.example}
<div class="rc-animation-demo">
  <wa-random-content id="rc-animation" animation="fade-up">
    <p>Good morning!</p>
    <p>Welcome back.</p>
    <p>What are you building today?</p>
  </wa-random-content>

  <wa-divider></wa-divider>

  <div class="wa-cluster" style="align-items: flex-end">
    <wa-select id="rc-animation-select" label="Animation" value="fade-up" style="width: 10rem">
      <wa-option value="none">none</wa-option>
      <wa-option value="fade">fade</wa-option>
      <wa-option value="fade-up">fade-up</wa-option>
      <wa-option value="fade-down">fade-down</wa-option>
      <wa-option value="fade-left">fade-left</wa-option>
      <wa-option value="fade-right">fade-right</wa-option>
    </wa-select>
    <wa-button appearance="filled" onclick="document.getElementById('rc-animation').randomize()">Next</wa-button>
  </div>
</div>

<script>
  document.getElementById('rc-animation-select').addEventListener('change', event => {
    document.getElementById('rc-animation').animation = event.target.value;
  });
</script>
```

Directional animations (`fade-up`, `fade-down`, `fade-left`, `fade-right`) rely on CSS `transform`, which has no effect on `display: inline` elements. The component promotes inline children to `inline-block` while a directional animation plays, so they work inline without extra markup.

Tune the duration, easing, and travel distance with the `--animation-duration`, `--animation-easing`, and `--animation-translate` custom properties. Animations are skipped automatically when the user [prefers reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

### Autoplay

Add the `autoplay` attribute to rotate content on a timer, and set the cadence with `autoplay-interval` (milliseconds). It pauses while the pointer is over the component or focus is inside it, and resumes when the user moves away. It respects reduced motion, too: content still rotates, but the entrance animation is skipped. Each new item is announced to screen readers using its text, so give icon-only content an accessible label (for example `<wa-icon label="…">`).

```html {.example}
<div class="rc-autoplay-demo">
  <dl>
    <dt>Did you know?</dt>
    <wa-random-content id="rc-autoplay" mode="unique" animation="fade-up" autoplay autoplay-interval="3000">
      <dd><wa-icon name="octopus"></wa-icon> Octopuses have three hearts.</dd>
      <dd><wa-icon name="bee"></wa-icon> Honey never spoils.</dd>
      <dd><wa-icon name="feather"></wa-icon> A group of flamingos is called a flamboyance.</dd>
      <dd><wa-icon name="banana"></wa-icon> Bananas are botanically berries.</dd>
      <dd><wa-icon name="cat"></wa-icon> Cheetahs meow rather than roar.</dd>
    </wa-random-content>
  </dl>

  <wa-divider></wa-divider>

  <wa-button id="rc-autoplay-toggle" appearance="filled">Pause</wa-button>
</div>

<style>
  .rc-autoplay-demo dl {
    margin: 0;
  }
  .rc-autoplay-demo dt {
    font-weight: var(--wa-font-weight-semibold);
    margin-block-end: var(--wa-space-2xs);
  }
  .rc-autoplay-demo dd {
    margin-inline-start: 0;
  }
  .rc-autoplay-demo dd wa-icon {
    margin-inline-end: var(--wa-space-2xs);
    color: var(--wa-color-brand-fill-loud);
  }
</style>

<script>
  const rcAutoplay = document.getElementById('rc-autoplay');
  const rcAutoplayToggle = document.getElementById('rc-autoplay-toggle');

  rcAutoplayToggle.addEventListener('click', () => {
    rcAutoplay.autoplay = !rcAutoplay.autoplay;
    rcAutoplayToggle.textContent = rcAutoplay.autoplay ? 'Pause' : 'Play';
  });
</script>
```

:::warning
<strong>If you turn on `autoplay`, give people a way to pause it.</strong><br />
The built-in hover and focus pausing doesn't help someone using a keyboard when the rotating content isn't focusable, so add a visible pause button like the one above.
:::

### Styling the Container

The host is `display: contents` by default, so it adds no box of its own. To lay several shown items out as a row or grid, give the host its own `display` — that overrides the transparent default. Here it shows three of six people at random in a flex row.

```html {.example}
<div>
  <wa-random-content id="rc-layout" items="3" style="display: flex; gap: var(--wa-space-m); flex-wrap: wrap">
    <wa-avatar label="Jordan Hayes" initials="JH"></wa-avatar>
    <wa-avatar label="Mara Goldberg" initials="MG"></wa-avatar>
    <wa-avatar label="Beck Watts" initials="BW"></wa-avatar>
    <wa-avatar label="Avi Lin" initials="AL"></wa-avatar>
    <wa-avatar label="Rae Park" initials="RP"></wa-avatar>
    <wa-avatar label="Sam Cho" initials="SC"></wa-avatar>
  </wa-random-content>

  <wa-divider></wa-divider>

  <wa-button appearance="filled" onclick="document.getElementById('rc-layout').randomize()">Shuffle</wa-button>
</div>
```

Because the host is transparent, the component also works inline within a sentence.

```html {.example}
<div>
  <p>
    Have a
    <wa-random-content id="rc-inline">
      <span>wonderful</span>
      <span>fantastic</span>
      <span>marvelous</span>
      <span>splendid</span>
    </wa-random-content>
    day!
  </p>

  <wa-divider></wa-divider>

  <wa-button appearance="filled" onclick="document.getElementById('rc-inline').randomize()">Shuffle</wa-button>
</div>
```

Unselected children are hidden with the `hidden` attribute, so you can target whatever is currently shown with `:not([hidden])`:

```css
wa-random-content > :not([hidden]) {
  outline: var(--wa-border-width-s) solid var(--wa-color-brand-fill-loud);
}
```

### Reacting to Changes

The component emits a `wa-content-change` event whenever the displayed selection changes — on first render, on `randomize()`, and on each autoplay tick. `event.detail.items` is the array of elements now shown.

```javascript
const rc = document.querySelector('wa-random-content');

rc.addEventListener('wa-content-change', event => {
  console.log('Now showing:', event.detail.items);
});
```

### Server-Side Rendering

Until the component upgrades on the client, every child is visible, which can flash on first paint. Add the [`wa-cloak`](/docs/utilities/fouce) class to hide content until Web Awesome is ready. Because the first selection is random, server- and client-rendered output can also differ; for a stable first paint, use `mode="sequence"`, which always starts at the first child.

### Using a Framework

The component selects from its slotted children by toggling the `hidden` attribute on them directly. Treat that content as static — if a framework owns and re-renders the children, its reconciliation can overwrite the hidden state. Render a fixed set of children, then drive the component imperatively: call `randomize()` through a ref and listen for `wa-content-change`.
