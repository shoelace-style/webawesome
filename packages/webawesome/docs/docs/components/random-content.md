---
title: Random Content
layout: component
category: Helpers
---

Randomly selects and displays one or more of its slotted children. Transparent to layout by default (`display: contents`), so it composes naturally in both block and inline contexts.

```html {.example}
<wa-random-content id="initial" class="wa-grid" items="1" mode="unique" animation="fade-right" style="--animation-easing: ease-in-out; --animation-duration: 500ms">
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img
        src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Jeff Hanks</span>
      <span>Product Designer</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-button appearance="plain" size="s">
        <wa-icon name="bluesky" family="brands" label="link to Blusky profile"></wa-icon>
      </wa-button>
      <wa-button appearance="plain" size="s">
        <wa-icon name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon>
      </wa-button>
    </div>
  </article>
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img
        src="https://images.unsplash.com/photo-1674044494331-8db2ecf18d46?q=80&w=3019&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Allen Bryant</span>
      <span>Staff Engineer</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-button appearance="plain" size="s">
        <wa-icon name="bluesky" family="brands" label="link to Blusky profile"></wa-icon>
      </wa-button>
      <wa-button appearance="plain" size="s">
        <wa-icon name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon>
      </wa-button>
    </div>
  </article>
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img
        src="https://images.unsplash.com/photo-1645288059073-af3e9eb62a29?q=80&w=2936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Mariah Greene</span>
      <span>DevOps</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-button appearance="plain" size="s">
        <wa-icon name="bluesky" family="brands" label="link to Blusky profile"></wa-icon>
      </wa-button>
      <wa-button appearance="plain" size="s">
        <wa-icon name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon>
      </wa-button>
    </div>
  </article>
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img
        src="https://images.unsplash.com/photo-1613428800237-c86372070fab?q=80&w=3017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Beverly Winslow</span>
      <span>Design Systems Lead</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-button appearance="plain" size="s">
        <wa-icon name="bluesky" family="brands" label="link to Blusky profile"></wa-icon>
      </wa-button>
      <wa-button appearance="plain" size="s">
        <wa-icon name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon>
      </wa-button>
    </div>
  </article>
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img
        src="https://images.unsplash.com/photo-1614807547811-4174d3582092?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Eric Masterson</span>
      <span>Copy Writer</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-button appearance="plain" size="s">
        <wa-icon name="bluesky" family="brands" label="link to Blusky profile"></wa-icon>
      </wa-button>
      <wa-button appearance="plain" size="s">
        <wa-icon name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon>
      </wa-button>
    </div>
  </article>
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img
        src="https://images.unsplash.com/photo-1559188286-a173792c8340?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Stephen Coffee</span>
      <span>Visual Designer</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-button appearance="plain" size="s">
        <wa-icon name="bluesky" family="brands" label="link to Blusky profile"></wa-icon>
      </wa-button>
      <wa-button appearance="plain" size="s">
        <wa-icon name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon>
      </wa-button>
    </div>
  </article>
</wa-random-content>

<wa-button size="s" style="margin-top:var(--wa-space-m)" onclick="document.getElementById('initial').randomize()" appearance="filled">Randomize</wa-button>
```
## Examples

### Multiple items

Use the `items` attribute to show more than one child at a time.

```html {.example}
<wa-random-content items="2">
  <wa-badge variant="brand">New</wa-badge>
  <wa-badge variant="success">Sale</wa-badge>
  <wa-badge variant="warning">Low stock</wa-badge>
  <wa-badge>Beta</wa-badge>
</wa-random-content>
```

### Sequence mode

`mode="sequence"` advances through children in DOM order. Each call to `randomize()` moves the cursor forward by `items` positions, wrapping at the end.

```html {.example}
<wa-random-content id="slides" mode="sequence">
  <img src="https://picsum.photos/seed/a/400/200" alt="Slide 1" style="display:block;width:100%;border-radius:var(--wa-border-radius-m)" />
  <img src="https://picsum.photos/seed/b/400/200" alt="Slide 2" style="display:block;width:100%;border-radius:var(--wa-border-radius-m)" />
  <img src="https://picsum.photos/seed/c/400/200" alt="Slide 3" style="display:block;width:100%;border-radius:var(--wa-border-radius-m)" />
</wa-random-content>

<wa-button size="s" style="margin-top:var(--wa-space-m)" onclick="document.getElementById('slides').randomize()" appearance="filled">Next</wa-button>
```

### Unique mode

`mode="unique"` excludes the previously shown children from the candidate pool, so you never see the same item twice in a row. When the pool runs out, history resets and all children become eligible again.

```html {.example}
<wa-random-content id="tip" mode="unique">
  <p><strong>Tip:</strong> Use keyboard shortcuts to navigate faster.</p>
  <p><strong>Tip:</strong> Dark mode is available in Settings.</p>
  <p><strong>Tip:</strong> You can drag to reorder items.</p>
  <p><strong>Tip:</strong> Hover over any icon to see its name.</p>
</wa-random-content>

<wa-button size="s" onclick="document.getElementById('tip').randomize()" style="margin-top:var(--wa-space-m);" appearance="filled">Next tip</wa-button>
```

### Animations

Use the `animation` attribute to add an entrance transition when new content is shown.

```html {.example}
<wa-random-content id="anim-demo" animation="fade">
  <p>Good morning!</p>
  <p>Welcome back.</p>
  <p>What are you building today?</p>
</wa-random-content>

<div style="display:flex;gap:var(--wa-space-s);align-items:center;margin-top:var(--wa-space-m)">
  <wa-button size="s" onclick="document.getElementById('anim-demo').randomize()" appearance="filled">Next</wa-button>
  <wa-select id="anim-select" size="s" value="fade" style="min-width:9rem">
    <wa-option value="none">None</wa-option>
    <wa-option value="fade">Fade</wa-option>
    <wa-option value="fade-up">Fade up</wa-option>
    <wa-option value="fade-down">Fade down</wa-option>
    <wa-option value="fade-left">Fade left</wa-option>
    <wa-option value="fade-right">Fade right</wa-option>
  </wa-select>
</div>

<script>
  document.getElementById('anim-select').addEventListener('change', e => {
    document.getElementById('anim-demo').animation = e.target.value;
  });
</script>
```

Directional animations (`fade-up`, `fade-down`, `fade-left`, `fade-right`) rely on CSS `transform`, which has no effect on `display: inline` elements. The component automatically promotes inline elements to `display: inline-block` when a directional animation is active, so they work in inline contexts without any extra markup.

The duration, easing, and translate distance are customizable with CSS custom properties. Here's a slow, bouncy fade-up:

```html {.example}
<wa-random-content id="anim-custom" animation="fade-up" style="--animation-duration: 700ms; --animation-easing: cubic-bezier(0.34, 1.56, 0.64, 1); --animation-translate: 1.5em">
  <p>Good morning!</p>
  <p>Welcome back.</p>
  <p>What are you building today?</p>
</wa-random-content>

<wa-button size="s" onclick="document.getElementById('anim-custom').randomize()" style="margin-top:var(--wa-space-m)" appearance="filled">Next</wa-button>
```

### Auto-play

Set `interval` to a duration in milliseconds to rotate content automatically. Combine it with any `animation` value for a smooth entrance transition. The animation duration defaults to `300ms` and can be overridden with `--animation-duration`.

```html {.example}
<p style="margin-bottom: 0;">
  <wa-icon name="stars" family="sharp-duotone" variant="regular"></wa-icon>
  Did you know? <wa-random-content mode="unique" animation="fade-up" interval="3000" style="--animation-easing: ease-in-out; --animation-duration: 500ms">
    <span>Octopuses have three hearts.</span>
    <span>Honey never spoils.</span>
    <span>A group of flamingos is called a flamboyance.</span>
    <span>Bananas are technically berries.</span>
    <span>Cheetahs meow.</span>
    <span>Almost every species of whale has lice.</span>
  </wa-random-content>
</p>
```

### Inline usage

Because the host renders `display: contents`, the component is transparent to layout and works naturally inside inline contexts.

```html {.example}
<p>
  Have a
  <wa-random-content id="inline">
    <span>wonderful</span>
    <span>fantastic</span>
    <span>great</span>
  </wa-random-content>
  day!
</p>

<wa-button size="s" onclick="document.getElementById('inline').randomize()" appearance="filled">Randomize</wa-button>
```

### Imperative control

Call `randomize()` on the element at any time to trigger a new selection programmatically.

```html {.example}
<wa-random-content id="rc">
  <wa-badge>
  <wa-icon slot="start" name="earth-americas"></wa-icon>
  Earth
</wa-badge>
<wa-badge>
  <wa-icon slot="start" name="fire"></wa-icon>
  Fire
</wa-badge>
<wa-badge>
  <wa-icon slot="start" name="wind"></wa-icon>
  Wind
</wa-badge>
<wa-badge>
  <wa-icon slot="start" name="water"></wa-icon>
  Water
</wa-badge>
<wa-badge>
  <wa-icon slot="start" name="heart"></wa-icon>
  Heart
</wa-badge>

</wa-random-content>
<br />
<wa-button size="s" onclick="document.getElementById('rc').randomize()" style="margin-top:var(--wa-space-m)" appearance="filled">Randomize</wa-button>
```
