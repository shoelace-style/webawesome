---
title: Random Content
layout: component
category: Helpers
---

Randomly selects and displays one or more of its slotted children. Transparent to layout by default (`display: contents`), so it composes naturally in both block and inline contexts.

```html {.example}
<wa-random-content>
  <p>Good morning!</p>
  <p>Welcome back.</p>
  <p>What are you building today?</p>
</wa-random-content>
```

## Multiple items

Use the `items` attribute to show more than one child at a time.

```html {.example}
<wa-random-content items="2">
  <wa-badge variant="brand">New</wa-badge>
  <wa-badge variant="success">Sale</wa-badge>
  <wa-badge variant="warning">Low stock</wa-badge>
  <wa-badge>Beta</wa-badge>
</wa-random-content>
```

## Sequence mode

`mode="sequence"` advances through children in DOM order. Each call to `randomize()` moves the cursor forward by `items` positions, wrapping at the end.

```html {.example}
<wa-random-content id="slides" mode="sequence">
  <img src="https://picsum.photos/seed/a/400/200" alt="Slide 1" style="display:block;width:100%;border-radius:var(--wa-border-radius-m)" />
  <img src="https://picsum.photos/seed/b/400/200" alt="Slide 2" style="display:block;width:100%;border-radius:var(--wa-border-radius-m)" />
  <img src="https://picsum.photos/seed/c/400/200" alt="Slide 3" style="display:block;width:100%;border-radius:var(--wa-border-radius-m)" />
</wa-random-content>
<wa-button style="margin-top:var(--wa-space-m)" onclick="document.getElementById('slides').randomize()">Next</wa-button>
```

## Unique mode

`mode="unique"` excludes the previously shown children from the candidate pool, so you never see the same item twice in a row. When the pool runs out, history resets and all children become eligible again.

```html {.example}
<wa-random-content id="tip" mode="unique">
  <p><strong>Tip:</strong> Use keyboard shortcuts to navigate faster.</p>
  <p><strong>Tip:</strong> Dark mode is available in Settings.</p>
  <p><strong>Tip:</strong> You can drag to reorder items.</p>
  <p><strong>Tip:</strong> Hover over any icon to see its name.</p>
</wa-random-content>
<wa-button onclick="document.getElementById('tip').randomize()" style="margin-top:var(--wa-space-m);">Next tip</wa-button>
```

## Animations

Use the `animation` attribute to add an entrance transition when new content is shown. The duration, easing, and translation distance are customizable with CSS custom properties.

**Fade**

```html {.example}
<wa-random-content id="anim-fade" animation="fade">
  <p>Good morning!</p>
  <p>Welcome back.</p>
  <p>What are you building today?</p>
</wa-random-content>
<wa-button onclick="document.getElementById('anim-fade').randomize()" style="margin-top:var(--wa-space-m)">Next</wa-button>
```

**Fade up**

```html {.example}
<wa-random-content id="anim-up" animation="fade-up">
  <p>Good morning!</p>
  <p>Welcome back.</p>
  <p>What are you building today?</p>
</wa-random-content>
<wa-button onclick="document.getElementById('anim-up').randomize()" style="margin-top:var(--wa-space-m)">Next</wa-button>
```

**Fade down**

```html {.example}
<wa-random-content id="anim-down" animation="fade-down">
  <p>Good morning!</p>
  <p>Welcome back.</p>
  <p>What are you building today?</p>
</wa-random-content>
<wa-button onclick="document.getElementById('anim-down').randomize()" style="margin-top:var(--wa-space-m)">Next</wa-button>
```

## Auto-play

Use `setInterval` to call `randomize()` on a timer for rotating content. Add `animation="fade"` for a smooth entrance transition. The duration defaults to `300ms` and can be overridden with `--animation-duration`.

```html {.example}
<p style="margin-bottom: 0;"><wa-icon name="stars" family="sharp-duotone" variant="regular"></wa-icon> Did you know? <wa-random-content id="auto" mode="unique" animation="fade" style="--animation-easing: ease-in-out; --animation-duration: 500ms">
   <span>Octopuses have three hearts.</span>
   <span>Honey never spoils.</span>
   <span>A group of flamingos is called a flamboyance.</span>
   <span>Bananas are technically berries.</span>
   <span>Cheetahs meow.</span>
   <span>Almost every species of whale has lice.</span>
</wa-random-content>
</p>
<script>
  setInterval(() => document.getElementById('auto').randomize(), 3000);
</script>
```

## Inline usage

Because the host renders `display: contents`, the component is transparent to layout and works naturally inside inline contexts.

```html {.example}
<p>
  Have a
  <wa-random-content>
    <span>wonderful</span>
    <span>fantastic</span>
    <span>great</span>
  </wa-random-content>
  day!
</p>
```

## Imperative control

Call `randomize()` on the element at any time to trigger a new selection programmatically.

```html {.example}
<wa-random-content id="rc">
  <wa-badge variant="brand">One</wa-badge>
  <wa-badge variant="success">Two</wa-badge>
  <wa-badge variant="warning">Three</wa-badge>
</wa-random-content>

<wa-button onclick="document.getElementById('rc').randomize()" style="margin-left:var(--wa-space-s)">Randomize</wa-button>
```
