---
title: Web Awesome
description: Build better with Web Awesome, the open source library of web components from Font Awesome.
layout: page
---

<style>
  .title,
  .anchor-heading a,
  #outline-expandable {
    display: none;
  }
  wa-page > main {
    --content-width: 56rem;
    --content-padding-inline: 2rem;
    --content-flow-spacing: 4rem;
    max-width: 100%;
    padding: 0 !important;
    & p, h1, h2, h3, h4, h5, h6 {
      margin: 0;
    }
  }

  /** this technically relies on insertion order. */
  @media screen and (max-width: 768px) {
    wa-page > main {
      --content-flow-spacing: 3rem !important;
    }
  }

  .brand-font {
    font-family: cera-round-pro;
  }
  .emphasis {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: var(--wa-brand-orange);
      border-radius: var(--wa-border-radius-pill);
      width: 100%;
      height: 0.1em;
    }
  }
  .hero-background {
    background-color: var(--wa-brand-orange);
    background-image: linear-gradient(color-mix(in oklab, var(--wa-brand-orange), orangered 40%) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--wa-brand-orange), orangered 40%) 1px, transparent 1px);
    background-size: 2rem 2rem;
    color: white;
    padding: calc(var(--content-flow-spacing) * 1.875) 0 var(--content-flow-spacing) 0;
  }
  .hero-content {
    max-width: var(--content-width);
    margin-inline: auto;
    padding-inline: var(--content-padding-inline);
    & > * + * {
      margin-block-start: 2rem;
    }
    & h1 {
      font-size: clamp(2.5625rem, 13vw, 3.25rem);
    }
    & .emphasis::after {
      background-color: var(--wa-brand-grey);
    }
    & .wa-crown svg {
      width: 4rem;
      & path {
        fill: white;
      }
    }
  }
  .hero-cta {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    background-color: var(--wa-brand-grey);
    border-radius: 0.75rem;
    font-size: 0.875rem;
    padding: 1.5rem;
    & > *:first-child {
      flex: 1 1 67%;
    }
    & wa-button {
      &::part(base) {
        border-color: black;
        border-width: 0.125rem;
        box-shadow: 0 0.25rem 0 0 black;
        flex: 1 1 auto;
        height: 2.5rem;
      }
      &:active:not([disabled])::part(base) {
        box-shadow: 0 0 0 0 transparent;
        transform: translateY(0.25rem);
      }
    }
  }
  .home-wrapper {
    max-width: var(--content-width);
    margin-block: var(--content-flow-spacing);
    margin-inline: auto;
    padding-inline: var(--content-padding-inline);
  }
  .home-wrapper > * + * {
    margin-block-start: var(--content-flow-spacing);
  }
  .summary {
    background-color: var(--wa-brand-grey);
    border-radius: 1.125rem;
    color: white;
    padding: var(--content-flow-spacing);
    & > * + * {
      margin-block-start: 2rem;
    }
    & .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(30ch, 100%), 1fr));
      gap: 2rem;
      & h3 {
        font-size: 1rem;
      }
      & p {
        font-size: 0.875rem;
      }
    }
  }
  .split-block {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(30ch, 100%), 1fr));
    column-gap: 4rem;
    row-gap: 2rem;
    align-items: center;
    & > * > * + * {
      margin-block-start: 1rem;
    }
  }
  .link-panel {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-radius: 0.75rem;
    padding: 1.25rem;
    & h3 {
      font-size: 1rem;
    }
    & .icon-heading wa-icon {
      background-color: var(--wa-color-neutral-fill-loud);
      color: var(--wa-color-neutral-on-loud);
    }
    & p {
      font-size: 0.875rem;
    }
  }
  .icon-heading {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-block-end: 1rem;
    & wa-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--wa-brand-orange);
      color: white;
      border-radius: 0.25rem;
      aspect-ratio: 1;
      padding: 0.5em;
    }
    & h3 {
      font-size: 1rem;
    }
  }
  footer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 0.875rem;
    & .wa-crown svg {
      width: 2rem;
    }
    & .tagline {
      font-size: 1rem;
    }
    & .attribution {
      align-self: flex-start;
      & .button-list {
        display: flex;
        flex-wrap: wrap;
        flex: 1 1 auto;
        gap: 0.5rem;
      }
      & wa-button::part(base) {
        height: 1.5rem;
        font-size: 0.75rem;
      }
    }
  }
  .beta-notice {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    & > * {
      flex-basis: calc(((30ch * 2 + 1rem) - 100%) * 999);
    }
    & > * {
      flex-grow: 2;
    }
    & > * + * {
      flex-grow: 1;
    }
    & wa-callout,
    & wa-button::part(base) {
      height: 100%;
      width: 100%;
    }
  }
  wa-button.tile::part(base) {
    border-color: var(--wa-color-surface-border);
    border-radius: 0.75rem;
    color: var(--wa-color-text-normal);
    height: 100%;
    line-height: var(--wa-line-height-normal);
    padding: 1.25rem;
    text-align: left;
    white-space: wrap;
  }
  wa-button.tile::part(end) {
    display: none;
  }
  wa-button.tile {
    width: 100%;
    height: 100%;
    & h3 {
      font-size: 1rem;
    }
    & .icon-heading + wa-icon {
      color: var(--wa-color-text-quiet);
    }
    & p {
      font-size: 0.875rem;
      font-weight: var(--wa-font-weight-normal);
    }
    &::part(label) {
      flex-direction: column;
    }
  }
  wa-callout {
    --spacing: 1.25rem;
    height: 100%;

    & .icon-heading wa-icon {
      background-color: var(--wa-color-brand-fill-normal);
      color: var(--wa-color-brand-on-normal);
    }

    & p {
      font-size: 0.875rem;
    }
  }
</style>

<div class="hero-background">
  <div class="hero-content">
    <div class="wa-crown">
      {% include "logo-simple.njk" %}
    </div>
    <h1 class="brand-font">Make something <span class="emphasis">awesome</span> with open-source web components</h1>
    <div class="hero-cta">
      <span><em>Psst!</em> You can pre-order Web Awesome Pro at a low, guaranteed-for-life price &mdash; but not for long. Get in while the gettin’s good.</span>
      <wa-button class="wa-dark" size="small" href="https://www.kickstarter.com/projects/fontawesome/web-awesome">
        <wa-icon slot="start" name="person-running"></wa-icon>
        Pre-order WA Pro
      </wa-button>
    </div>
  </div>
</div>

<div class="home-wrapper">
  <div class="beta-notice">
    <div>
      <wa-callout variant="brand">
        <div class="icon-heading">
          <wa-icon name="sparkles" variant="regular" fixed-width></wa-icon>
          <h3>Rise and shine, backers!</h3>
        </div>
        <p>Dig in to your exclusive Web Awesome Beta access. This beta is battle-tested and built to last, but if you see something, say something. Please <a href="https://github.com/shoelace-style/webawesome/issues">report bugs</a> or <a href="https://github.com/shoelace-style/webawesome/discussions">ask for help</a>!</p>
      </wa-callout>
    </div>
    <div>
      <wa-button href="/docs/" appearance="outlined" class="tile">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-block-end: 1rem;">
          <div class="icon-heading" style="margin-block-end: 0;">
            <wa-icon name="pen-ruler" fixed-width></wa-icon>
            <h3>Get started</h3>
          </div>
          <wa-icon name="arrow-right" fixed-width></wa-icon>
        </div>
        <p>Check out our installation guide to start building with Web Awesome.</p>
      </wa-button>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="summary">
    <h2 class="brand-font">What's <span class="emphasis">Web</span> Awesome?</h2>
    <p>Web Awesome is the biggest open-source library of meticulously designed, highly customizable, and framework-agnostic UI components.</p>
    <div class="grid">
      <div>
        <div class="icon-heading">
          <wa-icon name="code" fixed-width></wa-icon>
          <h3>Entirely native</h3>
        </div>
        <p>Built on web standards to last for years to come. No excess tooling. No third-party bloat.</p>
      </div>
      <div>
        <div class="icon-heading">
          <wa-icon name="palette" fixed-width></wa-icon>
          <h3>Fully customizable</h3>
        </div>
        <p>Show off your own style with components that consistently adapt to your theme.</p>
      </div>
      <div>
        <div class="icon-heading">
          <wa-icon name="wheelchair-move" fixed-width></wa-icon>
          <h3>Accessibility forward</h3>
        </div>
        <p>Build a website that everyone can use. Designed to be inclusive and usable by everyone.</p>
      </div>
      <div>
        <div class="icon-heading">
          <wa-icon name="handshake-simple" fixed-width></wa-icon>
          <h3>Proudly open source</h3>
        </div>
        <p>Use Web Awesome Free however you like. Always free, always open source.</p>
      </div>
    </div>
  </div>

  <div class="split-block">
    <div>
      <h2 class="brand-font"><span class="emphasis">You</span> put the awesome in Web Awesome</h2>
      <p>Web Awesome started as an open-source project fueled by contributions from an engaged community of developers, and we want to keep it that way. The core of Web Awesome is — and always will be — free and open source.</p>
      <p>Whether you’re a developer, designer, or budding tech nerd, we want you a part of the conversation.</p>
    </div>
    <div>
      <div class="link-panel">
        <div class="icon-heading">
          <wa-icon name="envelope-open" fixed-width></wa-icon>
          <h3>Get in touch</h3>
        </div>
        <p>Have a question? Want to share your feedback? Just stopping by to say 'hi'? Email us at <a href="mailto:hello@webawesome.com">hello@webawesome.com</a>.</p>
      </div>
      <div class="link-panel">
        <div class="icon-heading">
          <wa-icon name="hashtag" fixed-width></wa-icon>
          <h3>Follow us</h3>
        </div>
        <p>Keep up with Web Awesome through updates, announcements, and polls. Find us on <a href="https://bsky.app/profile/webawesome.com">Bluesky</a>, <a href="https://x.com/webawesomer">Twitter (X)</a>, and <a href="https://www.threads.com/@web.awesome">Threads</a>.</p>
      </div>
    </div>
  </div>

  <wa-divider></wa-divider>

  <footer>
    <div class="wa-crown">
      {% include "logo-simple.njk" %}
    </div>
    <div class="split-block">
      <div>
        <strong class="brand-font tagline">Let's Make Something Awesome</strong>
        <p>Web Awesome is the design system platform and open source library of web components from your fellow nerds at <a href="https://www.fontawesome.com/">Font Awesome</a>.</p>
      </div>
      <div class="attribution">
        <span>Special thanks</span>
        <div class="button-list">
          <wa-button appearance="filled" pill href="https://lit.dev/">Lit</wa-button>
          <wa-button appearance="filled" pill href="https://github.com/open-wc/custom-elements-manifest">Custom Elements Manifest</wa-button>
          <wa-button appearance="filled" pill href="https://www.11ty.dev/">11ty</wa-button>
          <wa-button appearance="filled" pill href="https://floating-ui.com/">Floating UI</wa-button>
          <wa-button appearance="filled" pill href="https://animate.style/">animate.css</wa-button>
          <wa-button appearance="filled" pill href="https://lunrjs.com/">Lunr</wa-button>
        </div>
      </div>
    </div>
    <div>
      &copy; Fonticons, Inc.
    </div>
  </footer>
</div>