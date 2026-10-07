---
title: Timeline
layout: component
category: Layout
synonyms:
  - activity feed
  - history
  - event log
use-cases:
  - order history
  - activity feed
  - changelog
  - audit log
  - release history
---

```html {.example .anatomy}
<wa-timeline>
  <wa-timeline-item>
    <span class="wa-heading-m">Order placed</span>
    <p>We received your order and will begin processing it shortly.</p>
  </wa-timeline-item>
  <wa-timeline-item>
    <span class="wa-heading-m">Order shipped</span>
    <p>Your package left the warehouse and is on its way.</p>
  </wa-timeline-item>
  <wa-timeline-item>
    <span class="wa-heading-m">Out for delivery</span>
    <p>Your package is on the truck and should arrive today.</p>
  </wa-timeline-item>
</wa-timeline>
```

Each entry is a [`<wa-timeline-item>`](/docs/components/timeline-item). To track progress through a linear, gated process instead of a record, use [`<wa-stepper>`](/docs/components/stepper).

## Examples

### Opposite Content

Add content to an item's `opposite` slot to show it on the other side of the rail from the main content, such as a date from [`<wa-format-date>`](/docs/components/format-date) or [`<wa-relative-time>`](/docs/components/relative-time).

```html {.example}
<wa-timeline>
  <wa-timeline-item>
    <wa-format-date
      slot="opposite"
      date="1969-07-16T13:32:00Z"
      month="short"
      day="numeric"
      hour="numeric"
      minute="numeric"
    ></wa-format-date>
    <span class="wa-heading-m">Launch</span>
    <p>Saturn V lifts off from Kennedy Space Center.</p>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-format-date
      slot="opposite"
      date="1969-07-16T16:22:00Z"
      month="short"
      day="numeric"
      hour="numeric"
      minute="numeric"
    ></wa-format-date>
    <span class="wa-heading-m">Translunar injection</span>
    <p>The third stage fires again and Apollo 11 leaves Earth orbit.</p>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-format-date
      slot="opposite"
      date="1969-07-20T20:17:00Z"
      month="short"
      day="numeric"
      hour="numeric"
      minute="numeric"
    ></wa-format-date>
    <span class="wa-heading-m">Lunar landing</span>
    <p>Eagle touches down in the Sea of Tranquility.</p>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-format-date
      slot="opposite"
      date="1969-07-21T02:56:00Z"
      month="short"
      day="numeric"
      hour="numeric"
      minute="numeric"
    ></wa-format-date>
    <span class="wa-heading-m">First step</span>
    <p>One small step.</p>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-format-date
      slot="opposite"
      date="1969-07-24T16:50:00Z"
      month="short"
      day="numeric"
      hour="numeric"
      minute="numeric"
    ></wa-format-date>
    <span class="wa-heading-m">Splashdown</span>
    <p>Columbia lands in the Pacific, southwest of Hawaii.</p>
  </wa-timeline-item>
</wa-timeline>
```

:::info
<strong>Rendering on the server? Add the `with-opposite` attribute.</strong><br />
The opposite column is shown once the component hydrates; `with-opposite` lays it out in the server-rendered markup.
:::

### Custom Icon

Use the `icon` slot on an item to replace its default marker with another element. The marker keeps its variant styling, so an icon is colored the same way the marker would be.

```html {.example}
<wa-timeline style="--marker-size: 2em;">
  <wa-timeline-item variant="warning">
    <wa-icon slot="icon" name="hat-wizard"></wa-icon>
    <span class="wa-heading-m">The call</span>
    <p>A stranger arrives with a map and a warning.</p>
  </wa-timeline-item>
  <wa-timeline-item variant="danger">
    <wa-icon slot="icon" name="dragon"></wa-icon>
    <span class="wa-heading-m">The ordeal</span>
    <p>The mountain is not as empty as promised.</p>
  </wa-timeline-item>
  <wa-timeline-item variant="success">
    <wa-icon slot="icon" name="crown"></wa-icon>
    <span class="wa-heading-m">The return</span>
    <p>Home again, with a story nobody believes.</p>
  </wa-timeline-item>
</wa-timeline>
```

### Variant

Set the `variant` attribute on an item to color its marker and the connector after it with a semantic color. The default is `neutral`. The color is cosmetic and never changes the marker's content, like `variant` on a badge or callout.

```html {.example}
<wa-timeline>
  <wa-timeline-item variant="neutral">
    <span class="wa-heading-m">Neutral</span>
  </wa-timeline-item>
  <wa-timeline-item variant="brand">
    <span class="wa-heading-m">Brand</span>
  </wa-timeline-item>
  <wa-timeline-item variant="success">
    <span class="wa-heading-m">Success</span>
  </wa-timeline-item>
  <wa-timeline-item variant="warning">
    <span class="wa-heading-m">Warning</span>
  </wa-timeline-item>
  <wa-timeline-item variant="danger">
    <span class="wa-heading-m">Danger</span>
  </wa-timeline-item>
</wa-timeline>
```

To flag an entry that failed or needs attention, pair the variant with an icon in the [icon slot](#custom-icon) and state the reason in the content, so the meaning doesn't depend on color alone.

```html {.example}
<wa-timeline>
  <wa-timeline-item variant="success">
    <wa-icon slot="icon" name="check"></wa-icon>
    <span class="wa-heading-m">Build passed</span>
  </wa-timeline-item>
  <wa-timeline-item variant="success">
    <wa-icon slot="icon" name="check"></wa-icon>
    <span class="wa-heading-m">Tests passed</span>
  </wa-timeline-item>
  <wa-timeline-item variant="danger">
    <wa-icon slot="icon" name="xmark"></wa-icon>
    <span class="wa-heading-m">Deploy failed</span>
    <p>Health check timed out after 30 seconds.</p>
  </wa-timeline-item>
</wa-timeline>
```

### Size

A timeline is sized relative to the current font size, like a badge. Set `font-size` on the timeline (or parent element) to change it. Everything scales together.

```html {.example}
<div class="wa-stack wa-gap-l">
  <wa-timeline style="font-size: var(--wa-font-size-xs);">
    <wa-timeline-item>Extra Small</wa-timeline-item>
    <wa-timeline-item>Shipped</wa-timeline-item>
  </wa-timeline>
  <wa-timeline style="font-size: var(--wa-font-size-s);">
    <wa-timeline-item>Small</wa-timeline-item>
    <wa-timeline-item>Shipped</wa-timeline-item>
  </wa-timeline>
  <wa-timeline style="font-size: var(--wa-font-size-m);">
    <wa-timeline-item>Medium</wa-timeline-item>
    <wa-timeline-item>Shipped</wa-timeline-item>
  </wa-timeline>
  <wa-timeline style="font-size: var(--wa-font-size-l);">
    <wa-timeline-item>Large</wa-timeline-item>
    <wa-timeline-item>Shipped</wa-timeline-item>
  </wa-timeline>
  <wa-timeline style="font-size: var(--wa-font-size-xl);">
    <wa-timeline-item>Extra Large</wa-timeline-item>
    <wa-timeline-item>Shipped</wa-timeline-item>
  </wa-timeline>
</div>
```

### Orientation

Set the `orientation` attribute to `horizontal` to lay items out in a row instead of a column. Wrap the timeline in a [`<wa-scroller>`](/docs/components/scroller) and give each item a minimum width, and it scrolls sideways.

```html {.example}
<wa-scroller>
  <wa-timeline class="timeline-space-race" orientation="horizontal" style="--marker-size: 3em;">
    <wa-timeline-item>
      <wa-avatar slot="icon" label="Sputnik 1">
        <wa-icon slot="icon" name="satellite-dish"></wa-icon>
      </wa-avatar>
      <wa-format-date slot="opposite" date="1957-10-04" year="numeric"></wa-format-date>
      <span class="wa-heading-m">Sputnik 1</span>
      <p>First artificial satellite.</p>
    </wa-timeline-item>
    <wa-timeline-item>
      <wa-avatar slot="icon" label="Vostok 1">
        <wa-icon slot="icon" name="user-astronaut"></wa-icon>
      </wa-avatar>
      <wa-format-date slot="opposite" date="1961-04-12" year="numeric"></wa-format-date>
      <span class="wa-heading-m">Vostok 1</span>
      <p>First human in orbit.</p>
    </wa-timeline-item>
    <wa-timeline-item>
      <wa-avatar slot="icon" label="Apollo 11">
        <wa-icon slot="icon" name="moon"></wa-icon>
      </wa-avatar>
      <wa-format-date slot="opposite" date="1969-07-20" year="numeric"></wa-format-date>
      <span class="wa-heading-m">Apollo 11</span>
      <p>First crewed lunar landing.</p>
    </wa-timeline-item>
    <wa-timeline-item>
      <wa-avatar slot="icon" label="Columbia">
        <wa-icon slot="icon" name="satellite"></wa-icon>
      </wa-avatar>
      <wa-format-date slot="opposite" date="1981-04-12" year="numeric"></wa-format-date>
      <span class="wa-heading-m">Columbia</span>
      <p>First reusable orbiter flies.</p>
    </wa-timeline-item>
    <wa-timeline-item>
      <wa-avatar slot="icon" label="Zarya">
        <wa-icon slot="icon" name="shuttle-space-vertical"></wa-icon>
      </wa-avatar>
      <wa-format-date slot="opposite" date="1998-11-20" year="numeric"></wa-format-date>
      <span class="wa-heading-m">Zarya</span>
      <p>First ISS module.</p>
    </wa-timeline-item>
  </wa-timeline>
</wa-scroller>

<style>
  .timeline-space-race wa-timeline-item {
    min-inline-size: 6rem;
  }
</style>
```

### Marker Placement

Set the `marker-placement` attribute to `end` to move every item to the end of the parent.

```html {.example}
<wa-timeline marker-placement="end" class="marker-placement">
  <wa-timeline-item>
    <wa-format-date slot="opposite" date="2026-03-02" month="short" day="numeric"></wa-format-date>
    <span class="wa-heading-m">Draft written</span>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-format-date slot="opposite" date="2026-03-09" month="short" day="numeric"></wa-format-date>
    <span class="wa-heading-m">Edits returned</span>
  </wa-timeline-item>
  <wa-timeline-item variant="success">
    <wa-format-date slot="opposite" date="2026-03-16" month="short" day="numeric"></wa-format-date>
    <span class="wa-heading-m">Published</span>
  </wa-timeline-item>
</wa-timeline>

<style>
 .marker-placement wa-timeline-item {
    text-align: right;
  }
</style>
```

Set it to `alternate` to flip each item to the opposite side of its sibling, which suits a wide, centered timeline.

```html {.example}
<wa-timeline marker-placement="alternate">
  <wa-timeline-item variant="success">
    <wa-badge slot="opposite" appearance="outlined" variant="success" pill>Shipped</wa-badge>
    <span class="wa-heading-m">Bulk actions in the data grid</span>
    <p>Select rows across pages and act on them all at once.</p>
  </wa-timeline-item>
  <wa-timeline-item variant="brand">
    <wa-badge slot="opposite" appearance="outlined" variant="brand" pill>In progress</wa-badge>
    <span class="wa-heading-m">Real-time collaboration</span>
    <p>See where teammates are editing as they type.</p>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-badge slot="opposite" appearance="outlined" pill>Planned</wa-badge>
    <span class="wa-heading-m">Offline mode</span>
    <p>Keep working on a flight; sync once you land.</p>
  </wa-timeline-item>
</wa-timeline>
```

### Marker Alignment

By default, each marker sits at the top of its item, in line with the first line of text. Set the `marker-alignment` attribute to `center` to center the marker on the item's full height instead. Marker alignment only applies to vertical timelines.

```html {.example}
<wa-timeline marker-alignment="center" style="--marker-size: 2em;">
  <wa-timeline-item variant="success">
    <wa-icon slot="icon" name="campground"></wa-icon>
    <wa-card>
      <div slot="media" class="wa-frame:landscape">
        <img
          src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=640&h=360&q=60"
          alt=""
        />
      </div>
      <span class="wa-heading-m">Base camp</span>
      <p>Three days of acclimatizing, card games, and weather reports.</p>
    </wa-card>
  </wa-timeline-item>
  <wa-timeline-item variant="success">
    <wa-icon slot="icon" name="mountain"></wa-icon>
    <wa-card>
      <div slot="media" class="wa-frame:landscape">
        <img
          src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=640&h=360&q=60"
          alt=""
        />
      </div>
      <span class="wa-heading-m">Summit push</span>
      <p>Left at 2 AM by headlamp. Reached the top as the sun came up.</p>
    </wa-card>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-icon slot="icon" name="person-hiking"></wa-icon>
    <wa-card>
      <div slot="media" class="wa-frame:landscape">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=640&h=360&q=60"
          alt=""
        />
      </div>
      <span class="wa-heading-m">Descent</span>
      <p>Knees complaining, spirits high. Back to the trailhead by dusk.</p>
    </wa-card>
  </wa-timeline-item>
</wa-timeline>
```

### Providing Content

The default slot accepts any content, not only a title and a line of text.

```html {.example}
<wa-timeline class="timeline-activity">
  <wa-timeline-item>
    <wa-avatar
      slot="icon"
      image="https://images.unsplash.com/photo-1490150028299-bf57d78394e0?auto=format&fit=crop&w=96&h=96&q=60"
      label="Jamie Kim"
    ></wa-avatar>
    <wa-format-date
      slot="opposite"
      date="2026-09-14T09:12:00"
      month="short"
      day="numeric"
      hour="numeric"
      minute="numeric"
    ></wa-format-date>
    <div class="wa-stack wa-gap-xs">
      <div class="wa-cluster wa-gap-2xs">
        <span class="wa-heading-m">Jamie Kim</span>
        opened the pull request
        <wa-badge appearance="outlined" pill>#2905</wa-badge>
      </div>
      <p>Adds the timeline component and its docs.</p>
      <div class="wa-cluster">
        <wa-button size="small" appearance="outlined">View Changes</wa-button>
      </div>
    </div>
  </wa-timeline-item>
  <wa-timeline-item variant="warning">
    <wa-avatar
      slot="icon"
      image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=96&h=96&q=60"
      label="Riley Park"
    ></wa-avatar>
    <wa-format-date
      slot="opposite"
      date="2026-09-14T11:03:00"
      month="short"
      day="numeric"
      hour="numeric"
      minute="numeric"
    ></wa-format-date>
    <div class="wa-stack wa-gap-xs">
      <div class="wa-cluster wa-gap-2xs">
        <span class="wa-heading-m">Riley Park</span>
        requested changes
        <wa-badge variant="warning" appearance="outlined" pill>Changes requested</wa-badge>
      </div>
      <p>Can we add a test for an empty <code>opposite</code> slot before merging this?</p>
    </div>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-avatar
      slot="icon"
      image="https://images.unsplash.com/photo-1490150028299-bf57d78394e0?auto=format&fit=crop&w=96&h=96&q=60"
      label="Jamie Kim"
    ></wa-avatar>
    <wa-format-date
      slot="opposite"
      date="2026-09-15T08:20:00"
      month="short"
      day="numeric"
      hour="numeric"
      minute="numeric"
    ></wa-format-date>
    <div class="wa-stack wa-gap-xs">
      <div class="wa-cluster wa-gap-2xs">
        <span class="wa-heading-m">Jamie Kim</span>
        pushed 2 commits
      </div>
      <ul class="wa-body-s">
        <li><code>a1f3c9e</code> Test the empty opposite slot</li>
        <li><code>7b2d410</code> Tidy the docs examples</li>
      </ul>
    </div>
  </wa-timeline-item>
  <wa-timeline-item variant="success">
    <wa-avatar
      slot="icon"
      image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=96&h=96&q=60"
      label="Riley Park"
    ></wa-avatar>
    <wa-format-date
      slot="opposite"
      date="2026-09-15T08:47:00"
      month="short"
      day="numeric"
      hour="numeric"
      minute="numeric"
    ></wa-format-date>
    <div class="wa-stack wa-gap-xs">
      <div class="wa-cluster wa-gap-2xs">
        <span class="wa-heading-m">Riley Park</span>
        approved these changes
        <wa-badge variant="success" appearance="outlined" pill>Approved</wa-badge>
      </div>
      <p>Looks great. The reverse order handling is a nice touch.</p>
    </div>
  </wa-timeline-item>
  <wa-timeline-item variant="brand">
    <wa-icon slot="icon" name="code-merge"></wa-icon>
    <wa-format-date
      slot="opposite"
      date="2026-09-15T09:02:00"
      month="short"
      day="numeric"
      hour="numeric"
      minute="numeric"
    ></wa-format-date>
    <div class="wa-cluster wa-gap-2xs">
      <span class="wa-heading-m">Merged</span>
      into <code>next</code>
    </div>
  </wa-timeline-item>
</wa-timeline>

<style>
  .timeline-activity {
    --marker-size: 2.5em;
  }

  .timeline-activity wa-avatar {
    --size: 2.5em;
  }

  .timeline-activity ul {
    margin: 0;
    padding-inline-start: 1.25em;
  }
</style>
```

### Adding Entries

Append a `<wa-timeline-item>` to add an entry.

```html {.example}
<div class="wa-stack">
  <wa-timeline id="timeline-live">
    <wa-timeline-item>
      <wa-badge slot="opposite" appearance="outlined" pill>0–0</wa-badge>
      <span class="wa-heading-m">Kickoff</span>
      <p>Rovers get us under way, playing left to right.</p>
    </wa-timeline-item>
  </wa-timeline>

  <wa-divider></wa-divider>

  <wa-button id="timeline-live-advance" appearance="filled">Add Play</wa-button>
</div>

<script>
  const timelineLive = document.getElementById('timeline-live');
  const timelineLiveButton = document.getElementById('timeline-live-advance');
  const timelineLivePlays = [
    {
      score: '1–0',
      variant: 'success',
      label: 'Goal, Rovers',
      body: 'A low cross from the left, tapped in at the far post.',
    },
    {
      score: '1–0',
      variant: 'warning',
      label: 'Yellow card',
      body: 'A late tackle in midfield. The referee has a word.',
    },
    {
      score: '1–1',
      variant: 'brand',
      label: 'Goal, City',
      body: 'A free kick curled over the wall and into the corner.',
    },
    { score: '1–1', variant: 'neutral', label: 'Full time', body: 'Honors even. Both sides will take the point.' },
  ];

  timelineLiveButton.addEventListener('click', () => {
    const next = timelineLivePlays.shift();
    if (!next) return;

    const item = document.createElement('wa-timeline-item');
    item.variant = next.variant;
    item.innerHTML = `<wa-badge slot="opposite" appearance="outlined" pill>${next.score}</wa-badge><span class="wa-heading-m">${next.label}</span><p>${next.body}</p>`;
    timelineLive.append(item);

    if (timelineLivePlays.length === 0) timelineLiveButton.disabled = true;
  });
</script>
```

:::info
<strong>With `marker-placement="alternate"`, append rather than prepend.</strong><br />
Sides are assigned in document order, so prepending an entry moves every existing entry to the other side. Add `reverse` if new entries should show at the top.
:::

### Reverse

Add the `reverse` attribute to show the last item first. Reading and focus order follow the visual order, and entries added with `append()` land at the top.

```html {.example}
<wa-timeline reverse>
  <wa-timeline-item>
    <wa-badge slot="opposite" appearance="outlined" pill>0–0</wa-badge>
    <span class="wa-heading-m">Kickoff</span>
    <p>Rovers get us under way, playing left to right.</p>
  </wa-timeline-item>
  <wa-timeline-item variant="success">
    <wa-badge slot="opposite" appearance="outlined" pill>1–0</wa-badge>
    <span class="wa-heading-m">Goal, Rovers</span>
    <p>A low cross from the left, tapped in at the far post.</p>
  </wa-timeline-item>
  <wa-timeline-item variant="warning">
    <wa-badge slot="opposite" appearance="outlined" pill>1–0</wa-badge>
    <span class="wa-heading-m">Yellow card</span>
    <p>A late tackle in midfield. The referee has a word.</p>
  </wa-timeline-item>
  <wa-timeline-item variant="brand">
    <wa-badge slot="opposite" appearance="outlined" pill>1–1</wa-badge>
    <span class="wa-heading-m">Goal, City</span>
    <p>A free kick curled over the wall and into the corner.</p>
  </wa-timeline-item>
  <wa-timeline-item variant="neutral">
    <wa-badge slot="opposite" appearance="outlined" pill>1–1</wa-badge>
    <span class="wa-heading-m">Full time</span>
    <p>Honors even. Both sides will take the point.</p>
  </wa-timeline-item>
</wa-timeline>
```

:::info
<strong>Rendering on the server? Put the newest item first in the markup.</strong><br />
The server can't see the items to reorder them, so a reversed timeline shows document order until it hydrates.
:::

### Customizing

Use the exported [CSS parts](#css-parts) and [custom properties](#css-custom-properties) to restyle the timeline. Each item can also set the `--marker-size` and `--connector-width` custom properties for itself.

```html {.example}
<wa-timeline
  class="timeline-mittens"
  marker-placement="alternate"
  style="--marker-size: 0.75em; --connector-width: 0.15em;"
>
  <wa-timeline-item style="--marker-size: 1.5em; --connector-width: 0.25em;">
    <wa-format-date slot="opposite" date="2025-06-14" month="long" year="numeric"></wa-format-date>
    <div class="wa-flank:end wa-gap-s">
      <div>
        <span class="wa-heading-m">Adopted</span>
        <p>Eight weeks old and already in charge.</p>
      </div>
      <div class="wa-frame wa-border-radius-m">
        <img
          src="https://images.unsplash.com/photo-1547191783-94d5f8f6d8b1?auto=format&fit=crop&w=160&h=160&q=60"
          alt=""
        />
      </div>
    </div>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-format-date slot="opposite" date="2025-07-02" month="long" year="numeric"></wa-format-date>
    <div class="wa-flank wa-gap-s">
      <div class="wa-frame wa-border-radius-m">
        <img
          src="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=160&h=160&q=60"
          alt=""
        />
      </div>
      <div>
        <span class="wa-heading-m">First vet visit</span>
        <p>A clean bill of health.</p>
      </div>
    </div>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-format-date slot="opposite" date="2025-09-08" month="long" year="numeric"></wa-format-date>
    <div class="wa-flank:end wa-gap-s">
      <div>
        <span class="wa-heading-m">Learned the word "dinner"</span>
        <p>Responds to it from three rooms away.</p>
      </div>
      <div class="wa-frame wa-border-radius-m">
        <img
          src="https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&w=160&h=160&q=60"
          alt=""
        />
      </div>
    </div>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-format-date slot="opposite" date="2025-11-19" month="long" year="numeric"></wa-format-date>
    <div class="wa-flank wa-gap-s">
      <div class="wa-frame wa-border-radius-m">
        <img
          src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?auto=format&fit=crop&w=160&h=160&q=60"
          alt=""
        />
      </div>
      <div>
        <span class="wa-heading-m">Claimed the window sill</span>
        <p>The sunny end is hers now. Negotiations are closed.</p>
      </div>
    </div>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-format-date slot="opposite" date="2026-06-14" month="long" year="numeric"></wa-format-date>
    <div class="wa-flank:end wa-gap-s">
      <div>
        <span class="wa-heading-m">Turned one</span>
        <p>Celebrated with a new basket and two friends.</p>
      </div>
      <div class="wa-frame wa-border-radius-m">
        <img
          src="https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?auto=format&fit=crop&w=160&h=160&q=60"
          alt=""
        />
      </div>
    </div>
  </wa-timeline-item>
</wa-timeline>

<style>
  .timeline-mittens .wa-frame {
    inline-size: 4rem;
    flex: none;
  }
</style>
```

Here the connector and markers become one rule with diamond stops. The `--connector-gap` custom property is set to `0px` so the line runs straight into each marker, `--connector-color` fades it back, and the `marker` part is rotated into a diamond that matches. The latest release takes the `brand` variant so it stands out, and version numbers sit in the `opposite` slot as [`<wa-badge>`](/docs/components/badge)s. Note that `--connector-gap` needs a length such as `0px`; a bare `0` isn't valid inside the connector's `calc()` positioning.

```html {.example}
<wa-timeline class="release-timeline">
  <wa-timeline-item>
    <wa-badge slot="opposite" appearance="outlined" pill>v3.13</wa-badge>
    <span class="wa-heading-m">Added the tag input component</span>
    <p>Collects a list of short values, such as keywords or email addresses.</p>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-badge slot="opposite" appearance="outlined" pill>v3.14</wa-badge>
    <span class="wa-heading-m">Added the stepper component</span>
    <p>Guides users through a process one step at a time.</p>
  </wa-timeline-item>
  <wa-timeline-item variant="brand">
    <wa-badge slot="opposite" appearance="outlined" variant="brand" pill>v3.15</wa-badge>
    <span class="wa-heading-m">Added the timeline component</span>
    <p>Lays out a chronological list of events, like this one.</p>
  </wa-timeline-item>
</wa-timeline>

<style>
  .release-timeline {
    --marker-size: 0.875em;
    --gap: var(--wa-space-l);
    --connector-gap: 0px;
    --connector-color: var(--wa-color-neutral-fill-quiet);
  }

  .release-timeline wa-timeline-item::part(marker) {
    rotate: 45deg;
    border-radius: var(--wa-border-radius-s);
    background-color: var(--wa-color-neutral-fill-loud);
  }

  .release-timeline wa-timeline-item[variant='brand']::part(marker) {
    background-color: var(--wa-color-brand-fill-loud);
  }
</style>
```

## Accessibility Considerations

- **Structure.** The timeline renders an ordered list, and each `<wa-timeline-item>` carries `role="listitem"`.
- **Keyboard.** Nothing in the timeline takes focus. Items are records, not controls, so the timeline never intercepts clicks or adds keyboard handling. If an entry needs to link somewhere or trigger an action, put a real `<a>` or `<wa-button>` in its content.
- **Reading order.** With `reverse`, items are reordered through named slots rather than CSS, so screen readers and the Tab key follow the same order that's on screen.
- **Added entries aren't announced.** Appending a `<wa-timeline-item>` updates the list silently; there's no live region. If an update needs to be announced, do it from your own live region rather than relying on the timeline.
- **Color and meaning.** The `variant` attribute is cosmetic. It changes color, which doesn't carry meaning on its own, so state the reason in the item's visible content rather than relying on color alone.
- **Custom icons.** When the `icon` slot holds an icon that's the only indicator of an item's meaning (e.g. a checkmark for "completed" with no other label), give it an accessible name with [`<wa-icon label="...">`](/docs/components/icon). A marker that only repeats what the item's own content already says can stay decorative.
