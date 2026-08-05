---
title: Random Content, On Purpose
description: Places where a little controlled variety makes the whole thing feel alive.
layout: page
---

Web Awesome's [Random Content Component](/docs/components/random-content) wraps a set of options and shows one at random. One element, and your greeting says something different every morning. Your empty state offers a fresh suggestion every visit. Your loading screen says something new each time.

Drop `<wa-random-content>` into your UI for content that can change without changing what it means. Welcome messages, encouragement, small celebrations. But make sure the status lines, buttons, real data stay put.

Here are some live examples to help inspire you to do something random.

## Greetings

Your app says "Welcome back" every time. Five versions with their own flavor would all mean the same thing but add some freshness, so this is a natural spot for `<wa-random-content>`.

Bonus points for grouping them by time of day or how long someone's been away. Pick the right group on the server, and let the component pick the line.

```html {.example}
<div class="wa-stack">
  <wa-card>
    <div class="wa-cluster">
      <wa-icon class="rc-greet-wave wa-font-size-xl" name="hand" label="Waving hand" animation="wag"></wa-icon>
      <div class="wa-stack wa-gap-0">
        <strong class="wa-heading-s">
          <wa-random-content id="rc-greet" animation="fade">
            <span>Welcome back, Agent Mulder.</span>
            <span>Good to see you, Agent Mulder.</span>
            <span>Up early, Agent Mulder.</span>
            <span>There you are, Agent Mulder.</span>
            <span>You just missed <abbr title="Cigarette Smoking Man">CSM</abbr>, Agent Mulder</span>
          </wa-random-content>
        </strong>
        <span class="wa-body-s wa-color-text-quiet">3 unexplained cases are waiting on your review</span>
      </div>
    </div>
  </wa-card>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button id="rc-greet-btn" appearance="filled">Sign In Again</wa-button>
  </div>
</div>

<style>
  /* Emoji-hand yellow, drawn from the yellow scale so it tracks the theme. */
  .rc-greet-wave {
    transform-origin: 70% 80%;

    color: var(--wa-color-yellow-70);
    --animation-duration: 1.6s;
  }
</style>

<script>
  document.getElementById('rc-greet-btn').addEventListener('click', () => {
    document.getElementById('rc-greet').randomize();
  });
</script>
```

Notice the greeting rotates but the task count below it ("3 unexplained cases") stays fixed. That pattern comes up in most of these examples.

## Empty States

First impressions matter. A new user lands on an empty project list and has no idea where to start. A rotating suggestion can spark an idea and make that first step feel less scary.

In this example, we keep the action buttons stable though. If someone hits back and the suggestion they saw is gone, that's disorienting. Rotate the inspiration, not the navigation.

```html {.example}
<div class="wa-stack">
  <wa-card appearance="filled" class="rc-empty-card">
    <div class="wa-stack wa-align-items-center wa-gap-xl">
      <div class="wa-stack wa-align-items-center">
        <wa-icon
          class="rc-empty-ghost wa-font-size-3xl wa-color-text-quiet"
          name="ghost"
          animation="float"
          label="No projects"
        ></wa-icon>

        <span class="wa-caption-s wa-color-text-quiet">Currently a Project Ghost Town</span>
      </div>

      <div class="wa-heading-l">
        <wa-random-content id="rc-empty" animation="fade-up">
          <span>Track your team's expenses.</span>
          <span>Plan a launch.</span>
          <span>Make a customer list.</span>
          <span>Map out next quarter.</span>
          <span>Just doodle.</span>
        </wa-random-content>
      </div>

      <div class="wa-cluster">
        <wa-button appearance="accent">
          <wa-icon slot="start" name="plus"></wa-icon>
          New Project
        </wa-button>
        <wa-button appearance="outlined">
          <wa-icon slot="start" name="file-import"></wa-icon>
          Import File
        </wa-button>
      </div>
    </div>
  </wa-card>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button id="rc-empty-btn" appearance="filled">Show Another</wa-button>
  </div>
</div>

<style>
  .rc-empty-card {
    max-inline-size: 30rem;
    box-shadow: none;

    --spacing: var(--wa-space-2xl);
  }

  /* The ghost and its caption recede; the rotating line is the loudest thing here. */
  .rc-empty-ghost {
    opacity: 0.4;
    --animation-duration: 3s;
  }
</style>

<script>
  document.getElementById('rc-empty-btn').addEventListener('click', () => {
    document.getElementById('rc-empty').randomize();
  });
</script>
```

## Success Confirmations

Right after someone finishes a task is one of those moments they feel accomplished. Most apps throw a "Saved successfully" and move on. A rotating celebration makes that moment feel more personal and less like a machine.

Try a rotating celebration above the status message. The celebration can be playful because it's not carrying any real information.

```html {.example}
<div class="wa-stack">
  <wa-callout variant="success">
    <wa-icon class="wa-font-size-xl" slot="icon" name="vest"></wa-icon>
    <wa-random-content id="rc-success">
      <strong>Great Scott!</strong>
      <strong>Hydration elimination!</strong>
      <strong>Nice!</strong>
      <strong>Done and done!</strong>
      <strong>Water gone!</strong>
    </wa-random-content>
    Your jacket is now dry.
  </wa-callout>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button id="rc-success-again" appearance="filled">Show Another</wa-button>
  </div>
</div>

<script>
  document.getElementById('rc-success-again').addEventListener('click', () => {
    document.getElementById('rc-success').randomize();
  });
</script>
```

## Loading Messages

Long-running tasks need to communicate progress, which is also a great place to show some personality.

```html {.example}
<div class="wa-stack">
  <wa-card class="rc-load-panel">
    <div class="wa-cluster">
      <wa-spinner class="wa-font-size-2xl"></wa-spinner>
      <div class="wa-stack wa-gap-0">
        <strong>Generating your report</strong>
        <span class="wa-body-s wa-color-text-quiet" aria-hidden="true">
          <wa-random-content id="rc-load" animation="fade" autoplay autoplay-interval="2200">
            <span>Crunching the numbers…</span>
            <span>Reticulating splines…</span>
            <span>Asking the database nicely…</span>
            <span>Polishing the corners…</span>
            <span>Almost there…</span>
          </wa-random-content>
        </span>
        <span class="wa-visually-hidden" role="status">Generating your report. This may take a moment.</span>
      </div>
    </div>
  </wa-card>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button id="rc-load-toggle" appearance="filled">Pause</wa-button>
  </div>
</div>

<style>
  .rc-load-panel {
    max-inline-size: 26rem;
  }
</style>

<script>
  {
    const rotator = document.getElementById('rc-load');
    const toggle = document.getElementById('rc-load-toggle');

    toggle.addEventListener('click', () => {
      rotator.autoplay = !rotator.autoplay;
      toggle.textContent = rotator.autoplay ? 'Pause' : 'Play';
    });
  }
</script>
```

Make sure screen readers get the real status ("Generating your report") and not the rotating jokes. This example uses `aria-hidden` on the fun messages and a separate status element for assistive technology. Screen readers hear "Generating your report. This may take a moment." once. Everyone else gets the jokes.

## Rotating Artwork

Anywhere you have a single decorative image (a sign-up page, a 404, the hero at the top of a long read), try rotating it through a small set. Same page, different look each visit.

In this example, each image carries a color name that also styles the card border and the sign-up button. One attribute change and the whole panel follows.

```html {.example}
<div class="wa-stack">
  <wa-card class="rc-art-panel" data-hue="blue">
    <div class="wa-grid wa-gap-0 rc-art-body">
      <div class="wa-split:column wa-align-items-stretch rc-art-form">
        <strong class="wa-heading-l rc-art-title">Join the Camera Club!</strong>

        <div class="wa-stack wa-gap-m rc-art-fields">
          <wa-input label="Email" type="email" autocomplete="off"> </wa-input>

          <wa-input label="Password" type="password" autocomplete="off"> </wa-input>

          <wa-button id="rc-art-signup" variant="brand" appearance="filled">Sign Up!</wa-button>
        </div>
      </div>

      <wa-random-content id="rc-art" class="rc-art-stage" mode="sequence" animation="fade">
        <div class="rc-art-plate" data-hue="blue">
          <img
            src="https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=900&amp;q=80"
            alt="Members on a night shoot"
            loading="eager"
          />
        </div>
        <div class="rc-art-plate" data-hue="purple">
          <img
            src="https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=900&amp;q=80"
            alt="A club darkroom mid-session"
            loading="lazy"
          />
        </div>
        <div class="rc-art-plate" data-hue="red">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&amp;q=80"
            alt="Contact sheets drying on the line"
            loading="lazy"
          />
        </div>
      </wa-random-content>
    </div>
  </wa-card>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button id="rc-art-btn" appearance="filled">Next Cover</wa-button>
  </div>
</div>

<style>
  .rc-art-panel {
    max-inline-size: 42rem;
    /* The cover is full bleed, so the card contributes its frame and nothing else. */
    --spacing: 0;
    /* isolation keeps the cover's blend mode inside the card's rounded clip. */
    isolation: isolate;
    overflow: hidden;
  }

  /* wa-grid already resolves to one column when the card gets narrow, so the
     two-up layout needs a column floor and nothing else. */
  .rc-art-body {
    min-block-size: 22rem;

    --min-column-size: 14rem;
  }

  .rc-art-panel[data-hue='blue'],
  .rc-art-plate[data-hue='blue'] {
    --rc-tint: var(--wa-color-blue-50);
    --rc-deep: var(--wa-color-blue-30);
    --rc-on: var(--wa-color-blue-95);
  }

  .rc-art-panel[data-hue='purple'],
  .rc-art-plate[data-hue='purple'] {
    --rc-tint: var(--wa-color-purple-50);
    --rc-deep: var(--wa-color-purple-30);
    --rc-on: var(--wa-color-purple-95);
  }

  .rc-art-panel[data-hue='red'],
  .rc-art-plate[data-hue='red'] {
    --rc-tint: var(--wa-color-red-50);
    --rc-deep: var(--wa-color-red-30);
    --rc-on: var(--wa-color-red-95);
  }

  /* Retargeting the brand tokens lets the stock brand button follow the cover.
     Accent buttons read -loud, filled buttons read -normal. */
  .rc-art-panel {
    --wa-color-brand-fill-loud: var(--rc-tint);
    --wa-color-brand-on-loud: var(--rc-on);
    --wa-color-brand-fill-normal: var(--rc-tint);
    --wa-color-brand-on-normal: var(--rc-on);
  }

  .rc-art-title {
    color: var(--wa-color-brand-fill-loud);
  }

  .rc-art-form {
    /* min-inline-size lets the column shrink below the inputs' intrinsic width. */
    min-inline-size: 0;
    padding: var(--wa-space-xl);
    background-color: var(--wa-color-surface-raised);
  }

  /* In a column flex container the cross axis is horizontal, so children stretch to
     the flex LINE, which wa-input's intrinsic width can push wider than the form.
     Clamping to the form's content box forces the input to shrink instead. */
  .rc-art-form > *,
  .rc-art-fields > * {
    max-inline-size: 100%;
    min-inline-size: 0;
  }

  /* The form is the only in-flow content in the row, so it alone sets the height.
     The cover is painted into that box and never contributes its own size. */
  .rc-art-stage {
    display: block;
    position: relative;
  }

  /* Full bleed: the cover fills its column edge to edge and matches the form's height. */
  .rc-art-plate {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background-color: var(--rc-deep);
  }

  .rc-art-plate img {
    display: block;
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    /* Flush against the form: the surrounding stylesheet rounds images by default. */
    border-radius: 0;
    object-fit: cover;
    filter: grayscale(1) contrast(1.08);
  }

  /* Darkroom wash: a soft mesh in the cover's hue, blended over the grayscale plate. */
  .rc-art-plate::after {
    content: '';
    position: absolute;
    inset: 0;
    mix-blend-mode: color;
    opacity: 0.85;
    background-color: var(--rc-tint);
    background-image:
      radial-gradient(at 20% 18%, color-mix(in oklab, var(--rc-tint), white 30%) 0%, transparent 55%),
      radial-gradient(at 78% 30%, var(--rc-deep) 0%, transparent 50%),
      radial-gradient(at 60% 88%, color-mix(in oklab, var(--rc-deep), black 20%) 0%, transparent 60%);
  }
</style>

<script>
  {
    const stage = document.getElementById('rc-art');
    const panel = document.querySelector('.rc-art-panel');

    // The cover names its hue; the panel border and the sign-up button follow it.
    stage.addEventListener('wa-content-change', event => {
      const hue = event.detail.items[0]?.dataset.hue;
      if (hue) panel.dataset.hue = hue;
    });

    document.getElementById('rc-art-btn').addEventListener('click', () => stage.randomize());
  }
</script>
```

Two practical notes: setting `mode="sequence"` makes sure the first image always appears on initial load, which avoids a visual flash when the page first renders. Also, images that aren't currently visible will still download unless you add `loading="lazy"` to them. That means a brief blank the first time each one appears, but it saves bandwidth.

## Logo Spotlight

Every marketing site has a customer logo strip. You have more logos than the row can hold, so someone picks a permanent six, and those six collect every impression the page will ever serve. The rest may as well not have signed.

Random Component allows you to draw a specific count from the full set (e.g `items="6"`), and `autoplay` swaps them every few seconds. No brands gets crowded off the row, every logo gets airtime across a visit, and the headline keeps doing the real work. The number is the proof. The logos are texture.

```html {.example}
<div class="wa-stack rc-logos">
  <div class="wa-stack wa-align-items-center wa-gap-l">
    <span class="wa-heading-l wa-text-center">Trusted by 30,000+ companies, including…</span>

    <wa-random-content
      id="rc-logos"
      class="wa-grid wa-gap-s wa-justify-content-center rc-logos-row"
      items="6"
      animation="fade"
      autoplay
      autoplay-interval="5000"
      aria-hidden="true"
    >
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="github"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="slack"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="spotify"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="figma"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="stripe"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="shopify"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="dropbox"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="discord"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="twitch"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="linkedin"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="x-twitter"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="google"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="apple"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="amazon"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="docker"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="gitlab"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="reddit"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="youtube"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="npm"></wa-icon
      ></wa-card>
      <wa-card appearance="plain" class="wa-text-center wa-font-size-3xl wa-color-text-quiet rc-logo"
        ><wa-icon family="brands" name="wordpress"></wa-icon
      ></wa-card>
    </wa-random-content>

    <span class="wa-visually-hidden"
      >Trusted by 30,000+ companies, including GitHub, Slack, Spotify, Figma, Stripe, Shopify, Dropbox, Discord, Twitch,
      LinkedIn, X, Google, Apple, Amazon, Docker, GitLab, Reddit, YouTube, npm, and WordPress.</span
    >
  </div>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button id="rc-logos-toggle" appearance="filled">Pause</wa-button>
  </div>
</div>

<style>
  /* Six across on one line. The step-downs are divisors of six, so the set never
     leaves a ragged row when it does have to stack. */
  .rc-logos {
    container-type: inline-size;
  }

  .rc-logos-row {
    --animation-duration: 900ms;

    grid-template-columns: repeat(6, auto);
  }

  @container (width < 34rem) {
    .rc-logos-row {
      grid-template-columns: repeat(3, auto);
    }
  }

  @container (width < 22rem) {
    .rc-logos-row {
      grid-template-columns: repeat(2, auto);
    }
  }

  .rc-logo {
    inline-size: 4.5rem;
  }
</style>

<script>
  {
    const rotator = document.getElementById('rc-logos');
    const toggle = document.getElementById('rc-logos-toggle');

    toggle.addEventListener('click', () => {
      rotator.autoplay = !rotator.autoplay;
      toggle.textContent = rotator.autoplay ? 'Pause' : 'Play';
    });
  }
</script>
```

For screen readers, the rotating logos are hidden and the full client list is provided as text so assistive technology gets every name at once.

## Read Next

The same approach works for content. Show a handful of articles from a larger pool at the bottom of each post. Every visit surfaces a different set, and the page feels actively curated.

If your CMS already recommends posts by tag or popularity, that's probably smarter than random. But random beats a hand-picked list that went stale months ago.

```html {.example}
<div class="wa-stack">
  <h3 class="wa-heading-l">More Articles Like This One</h3>

  <wa-random-content id="rc-next" class="wa-grid wa-gap-s rc-next-grid" items="4">
    <a class="wa-stack wa-gap-2xs wa-link-plain rc-next-card" href="#">
      <span class="wa-caption-2xs wa-font-weight-bold wa-text-uppercase rc-next-kicker">Craft</span>
      <span class="wa-font-weight-semibold rc-next-title">Nobody Has Ever Clicked Your Hamburger Menu</span>
      <span class="wa-caption-xs">6 min read &middot; 2 days ago</span>
    </a>
    <a class="wa-stack wa-gap-2xs wa-link-plain rc-next-card" href="#">
      <span class="wa-caption-2xs wa-font-weight-bold wa-text-uppercase rc-next-kicker">Type</span>
      <span class="wa-font-weight-semibold rc-next-title">Line Height Is the Whole Ballgame</span>
      <span class="wa-caption-xs">4 min read &middot; 1 week ago</span>
    </a>
    <a class="wa-stack wa-gap-2xs wa-link-plain rc-next-card" href="#">
      <span class="wa-caption-2xs wa-font-weight-bold wa-text-uppercase rc-next-kicker">Color</span>
      <span class="wa-font-weight-semibold rc-next-title">Seventeen Shades of Blue, One Design System</span>
      <span class="wa-caption-xs">8 min read &middot; 3 weeks ago</span>
    </a>
    <a class="wa-stack wa-gap-2xs wa-link-plain rc-next-card" href="#">
      <span class="wa-caption-2xs wa-font-weight-bold wa-text-uppercase rc-next-kicker">Build</span>
      <span class="wa-font-weight-semibold rc-next-title">I Named It wrapper-2 and Now I Live Here</span>
      <span class="wa-caption-xs">5 min read &middot; 4 days ago</span>
    </a>
    <a class="wa-stack wa-gap-2xs wa-link-plain rc-next-card" href="#">
      <span class="wa-caption-2xs wa-font-weight-bold wa-text-uppercase rc-next-kicker">Craft</span>
      <span class="wa-font-weight-semibold rc-next-title">The Modal That Ate Our Conversion Rate</span>
      <span class="wa-caption-xs">7 min read &middot; 2 weeks ago</span>
    </a>
    <a class="wa-stack wa-gap-2xs wa-link-plain rc-next-card" href="#">
      <span class="wa-caption-2xs wa-font-weight-bold wa-text-uppercase rc-next-kicker">Color</span>
      <span class="wa-font-weight-semibold rc-next-title">We Shipped Dark Mode and Now Everything Is Gray</span>
      <span class="wa-caption-xs">6 min read &middot; 5 days ago</span>
    </a>
    <a class="wa-stack wa-gap-2xs wa-link-plain rc-next-card" href="#">
      <span class="wa-caption-2xs wa-font-weight-bold wa-text-uppercase rc-next-kicker">Craft</span>
      <span class="wa-font-weight-semibold rc-next-title">Your Loading Spinner Is a Confession</span>
      <span class="wa-caption-xs">3 min read &middot; 1 month ago</span>
    </a>
    <a class="wa-stack wa-gap-2xs wa-link-plain rc-next-card" href="#">
      <span class="wa-caption-2xs wa-font-weight-bold wa-text-uppercase rc-next-kicker">Build</span>
      <span class="wa-font-weight-semibold rc-next-title">Everyone Hates the Carousel Except the Client</span>
      <span class="wa-caption-xs">9 min read &middot; 6 days ago</span>
    </a>
    <a class="wa-stack wa-gap-2xs wa-link-plain rc-next-card" href="#">
      <span class="wa-caption-2xs wa-font-weight-bold wa-text-uppercase rc-next-kicker">Type</span>
      <span class="wa-font-weight-semibold rc-next-title">We Tested Button Copy for Nine Months</span>
      <span class="wa-caption-xs">5 min read &middot; 3 weeks ago</span>
    </a>
  </wa-random-content>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button id="rc-next-btn" appearance="filled">Reload Article</wa-button>
  </div>
</div>

<style>
  /* wa-grid drops to one column on its own once a track can't hold 16rem, so the
     demo needs no container query to stay readable in a resizable preview. */
  .rc-next-grid {
    --min-column-size: 16rem;
  }

  .rc-next-card {
    padding: var(--wa-space-m);
    border: var(--wa-border-width-s) solid var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
  }

  .rc-next-card:hover {
    border-color: var(--wa-color-brand-border-loud);
  }

  .rc-next-kicker {
    letter-spacing: 0.08em;
    color: var(--wa-color-brand-fill-loud);
  }

  .rc-next-title {
    line-height: var(--wa-line-height-condensed);
  }
</style>

<script>
  document.getElementById('rc-next-btn').addEventListener('click', () => {
    document.getElementById('rc-next').randomize();
  });
</script>
```

## Grids

So far each example uses a single `<wa-random-content>`. But you can also use several at once.

An asset library waiting on thumbnails is a wall of identical placeholders. Give each tile its own `<wa-random-content>` and they start to look like individual items instead of one tile repeated forty times. Since each tile picks independently, two neighbors might land on the same option.

```html {.example}
<div class="wa-stack">
  <!-- No entrance animation on these tiles: wa-icon's own animation sets
       animation-iteration-count: infinite on the same element, so the rotator's fade
       would never fire animationend and would loop forever. -->
  <div class="wa-grid wa-gap-s rc-grid-cells">
    <div class="wa-frame wa-font-size-xl wa-color-text-quiet rc-grid-cell">
      <div class="wa-stack wa-align-items-center wa-gap-s">
        <wa-random-content>
          <wa-icon name="file-image" label="Image" animation="fade"></wa-icon>
          <wa-icon name="file-video" label="Video" animation="fade"></wa-icon>
          <wa-icon name="file-audio" label="Audio" animation="fade"></wa-icon>
          <wa-icon name="file-lines" label="Document" animation="fade"></wa-icon>
          <wa-icon name="file-zipper" label="Archive" animation="fade"></wa-icon>
          <wa-icon name="file-code" label="Code" animation="fade"></wa-icon>
        </wa-random-content>
        <span class="wa-caption-xs">
          <wa-random-content>
            <span>Processing…</span>
            <span>Uploading…</span>
            <span>Correcting…</span>
            <span>Optimizing…</span>
          </wa-random-content>
        </span>
      </div>
    </div>
    <div class="wa-frame wa-font-size-xl wa-color-text-quiet rc-grid-cell">
      <div class="wa-stack wa-align-items-center wa-gap-s">
        <wa-random-content>
          <wa-icon name="file-image" label="Image" animation="fade"></wa-icon>
          <wa-icon name="file-video" label="Video" animation="fade"></wa-icon>
          <wa-icon name="file-audio" label="Audio" animation="fade"></wa-icon>
          <wa-icon name="file-lines" label="Document" animation="fade"></wa-icon>
          <wa-icon name="file-zipper" label="Archive" animation="fade"></wa-icon>
          <wa-icon name="file-code" label="Code" animation="fade"></wa-icon>
        </wa-random-content>
        <span class="wa-caption-xs">
          <wa-random-content>
            <span>Processing…</span>
            <span>Uploading…</span>
            <span>Correcting…</span>
            <span>Optimizing…</span>
          </wa-random-content>
        </span>
      </div>
    </div>
    <div class="wa-frame wa-font-size-xl wa-color-text-quiet rc-grid-cell">
      <div class="wa-stack wa-align-items-center wa-gap-s">
        <wa-random-content>
          <wa-icon name="file-image" label="Image" animation="fade"></wa-icon>
          <wa-icon name="file-video" label="Video" animation="fade"></wa-icon>
          <wa-icon name="file-audio" label="Audio" animation="fade"></wa-icon>
          <wa-icon name="file-lines" label="Document" animation="fade"></wa-icon>
          <wa-icon name="file-zipper" label="Archive" animation="fade"></wa-icon>
          <wa-icon name="file-code" label="Code" animation="fade"></wa-icon>
        </wa-random-content>
        <span class="wa-caption-xs">
          <wa-random-content>
            <span>Processing…</span>
            <span>Uploading…</span>
            <span>Correcting…</span>
            <span>Optimizing…</span>
          </wa-random-content>
        </span>
      </div>
    </div>
    <div class="wa-frame wa-font-size-xl wa-color-text-quiet rc-grid-cell">
      <div class="wa-stack wa-align-items-center wa-gap-s">
        <wa-random-content>
          <wa-icon name="file-image" label="Image" animation="fade"></wa-icon>
          <wa-icon name="file-video" label="Video" animation="fade"></wa-icon>
          <wa-icon name="file-audio" label="Audio" animation="fade"></wa-icon>
          <wa-icon name="file-lines" label="Document" animation="fade"></wa-icon>
          <wa-icon name="file-zipper" label="Archive" animation="fade"></wa-icon>
          <wa-icon name="file-code" label="Code" animation="fade"></wa-icon>
        </wa-random-content>
        <span class="wa-caption-xs">
          <wa-random-content>
            <span>Processing…</span>
            <span>Uploading…</span>
            <span>Correcting…</span>
            <span>Optimizing…</span>
          </wa-random-content>
        </span>
      </div>
    </div>
    <div class="wa-frame wa-font-size-xl wa-color-text-quiet rc-grid-cell">
      <div class="wa-stack wa-align-items-center wa-gap-s">
        <wa-random-content>
          <wa-icon name="file-image" label="Image" animation="fade"></wa-icon>
          <wa-icon name="file-video" label="Video" animation="fade"></wa-icon>
          <wa-icon name="file-audio" label="Audio" animation="fade"></wa-icon>
          <wa-icon name="file-lines" label="Document" animation="fade"></wa-icon>
          <wa-icon name="file-zipper" label="Archive" animation="fade"></wa-icon>
          <wa-icon name="file-code" label="Code" animation="fade"></wa-icon>
        </wa-random-content>
        <span class="wa-caption-xs">
          <wa-random-content>
            <span>Processing…</span>
            <span>Uploading…</span>
            <span>Correcting…</span>
            <span>Optimizing…</span>
          </wa-random-content>
        </span>
      </div>
    </div>
    <div class="wa-frame wa-font-size-xl wa-color-text-quiet rc-grid-cell">
      <div class="wa-stack wa-align-items-center wa-gap-s">
        <wa-random-content>
          <wa-icon name="file-image" label="Image" animation="fade"></wa-icon>
          <wa-icon name="file-video" label="Video" animation="fade"></wa-icon>
          <wa-icon name="file-audio" label="Audio" animation="fade"></wa-icon>
          <wa-icon name="file-lines" label="Document" animation="fade"></wa-icon>
          <wa-icon name="file-zipper" label="Archive" animation="fade"></wa-icon>
          <wa-icon name="file-code" label="Code" animation="fade"></wa-icon>
        </wa-random-content>
        <span class="wa-caption-xs">
          <wa-random-content>
            <span>Processing…</span>
            <span>Uploading…</span>
            <span>Correcting…</span>
            <span>Optimizing…</span>
          </wa-random-content>
        </span>
      </div>
    </div>
  </div>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button id="rc-grid-btn" appearance="filled">Reload Library</wa-button>
  </div>
</div>

<style>
  /* Capping the track count at three keeps six tiles in full rows: the grid can only
     ever resolve to 1, 2, or 3 columns, and six divides all of them. */
  .rc-grid-cells {
    --min-column-size: 8rem;

    max-inline-size: 26rem;
  }

  /* wa-color-text-quiet on the cell matches what [class*='wa-caption'] applies to
     the label, so the icon and its caption resolve to one token. */
  .rc-grid-cell {
    border: var(--wa-border-width-s) dashed var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
  }
</style>

<script>
  document.getElementById('rc-grid-btn').addEventListener('click', () => {
    document.querySelectorAll('.rc-grid-cell wa-random-content').forEach(cell => cell.randomize());
  });
</script>
```

With a large pool that looks like coincidence. With a small pool it looks like a bug, so size your options accordingly.

## Name Generator

All of the examples above randomize automatically. The user never asked for it. `<wa-random-content>` gets more interesting when **the randomness is the feature itself.**

Naming things is tough and is often an optional thing folks skip when onboarding. A generate button gives people a starting point instead of a blank input.

```html {.example}
<div class="wa-split rc-namer">
  <wa-input
    id="rc-namer-input"
    label="Assign a Project Codename"
    hint="Awaiting codename, Grand Moff."
    placeholder="e.g. Orbital Weapons Platform"
  ></wa-input>

  <wa-button-group label="Program Designation">
    <wa-button id="rc-namer-use" variant="brand" appearance="filled">
      <span class="wa-visually-hidden">Use&nbsp;</span>
      <wa-random-content id="rc-namer-pool">
        <span>Project Stardust</span>
        <span>Operation Cinder</span>
        <span>Project Necromancer</span>
        <span>Project Harvester</span>
        <span>The Contingency</span>
        <span>The Death Star</span>
      </wa-random-content>
    </wa-button>

    <wa-button id="rc-namer-roll" variant="brand" appearance="filled">
      <wa-icon name="arrows-rotate" label="Generate a different designation"></wa-icon>
    </wa-button>
  </wa-button-group>
</div>

<style>
  /* The field takes the slack; the actions sit flush right on the same line.
     An auto margin holds them right even when wa-split wraps on narrow widths. */
  #rc-namer-input {
    flex: 1;
    min-inline-size: 0;
  }

  .rc-namer wa-button-group {
    margin-inline-start: auto;
  }
</style>

<script>
  {
    const pool = document.getElementById('rc-namer-pool');
    const input = document.getElementById('rc-namer-input');

    document.getElementById('rc-namer-roll').addEventListener('click', () => pool.randomize());
    document.getElementById('rc-namer-use').addEventListener('click', () => {
      input.value = pool.querySelector(':scope > :not([hidden])').textContent.trim();
    });
  }
</script>
```

Notice that the randomizer lives inside one stable button. The name is always visible, and the button stays in place as the content changes.

**One thing to watch:** if the rotating content contains interactive elements (buttons, links), shuffling can move focus unexpectedly. Keep the shuffle control outside the rotating area, and avoid auto-rotating when interactive elements are involved.

## Surprise Me

Every example so far rolls a single `<wa-random-content>` and shows one option out of N.

Point several of them at the same button and they stop being alternatives and start being ingredients that pair well for a "Surprise me" button.

Random Content gives you pool small enough to write and edit by hand, and an output space nobody is going to see the bottom of.

```html {.example}
<div class="wa-stack">
  <wa-card id="rc-roll" class="wa-text-center rc-roll-card">
    <div class="wa-stack wa-gap-xs wa-align-items-center">
      <wa-icon name="dice-d20" class="wa-font-size-xl rc-roll-die"></wa-icon>

      <span class="wa-heading-l">
        <wa-random-content animation="fade-up">
          <span>Barbarian</span>
          <span>Bard</span>
          <span>Necromancer</span>
          <span>Paladin</span>
          <span>Druid</span>
          <span>Warlock</span>
        </wa-random-content>
      </span>

      <div class="wa-stack wa-gap-2xs wa-align-items-center wa-body-s wa-color-text-quiet rc-roll-detail">
        <span>
          carrying
          <wa-random-content>
            <span>a warhammer</span>
            <span>a ceremonial sword</span>
            <span>a borrowed wand</span>
            <span>a broom, technically</span>
            <span>a cursed gemstone</span>
            <span>a scroll nobody read</span>
          </wa-random-content>
        </span>

        <span>
          who
          <wa-random-content>
            <span>can't resist a bet</span>
            <span>is afraid of the dark</span>
            <span>always tells the truth</span>
            <span>never reads the room</span>
            <span>owes money in three towns</span>
            <span>narrates their own fights</span>
          </wa-random-content>
        </span>
      </div>
    </div>
  </wa-card>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button id="rc-roll-btn" variant="brand" appearance="filled">
      <wa-icon slot="start" name="shuffle"></wa-icon>
      Surprise Me
    </wa-button>
  </div>
</div>

<style>
  .rc-roll-card {
    max-inline-size: 20rem;

    --animation-duration: 500ms;
    --animation-easing: cubic-bezier(0.16, 1, 0.3, 1);
    --animation-translate: 0.35em;
  }

  .rc-roll-die {
    color: var(--wa-color-brand-fill-loud);
  }

  /* The name announces itself by moving. The details hold still and mark the rolled
     words with a dashed rule instead — a blank waiting to be filled, which is what
     they are. */
  .rc-roll-detail wa-random-content > * {
    text-decoration: underline dashed var(--wa-color-brand-border-normal);
    text-decoration-thickness: var(--wa-border-width-s);
    text-underline-offset: 0.3em;
  }
</style>

<script>
  {
    const pools = document.querySelectorAll('#rc-roll wa-random-content');
    document.getElementById('rc-roll-btn').addEventListener('click', () => pools.forEach(pool => pool.randomize()));
  }
</script>
```

## Plan Some Random!

`<wa-random-content>` ships with Web Awesome Core. Check out the [full component docs](/docs/components/random-content) for all the attributes, events, and modes — then try dropping one into your next project. 

A greeting, an empty state, a loading message. Start small and see how it feels to be purposefully random!
