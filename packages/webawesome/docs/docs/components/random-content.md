---
title: Random Content
layout: component
category: Layout
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
<wa-button onclick="document.getElementById('tip').randomize()">Next tip</wa-button>
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
