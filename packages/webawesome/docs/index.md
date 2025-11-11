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
  .icon-heading {
    > wa-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      block-size: 2em;
      inline-size: 2em;
      background-color: var(--wa-color-neutral-fill-loud);
      color: var(--wa-color-neutral-on-loud);
      border-radius: 0.25rem;
      padding: 0.5em;

      &.brand-orange {
        background-color: var(--wa-brand-orange);
        color: white;
      }
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
  wa-button.tile::part(label) {
    width: 100%;
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
      {%- raw -%}
        {% if currentUser.hasPro %}
          <span class="wa-font-size-l" style="text-align: center; width: 100%;">Thanks for being a Web Awesome Pro subscriber!</span>
        {% else %}
          <div class="wa-stack wa-gap-xs">
            <h3 class="wa-heading-m">Get More with Web Awesome Pro!</h3>
            <p>Unlock Pro-only themes, components, patterns, and great services like the Theme Builder.</p>
          </div>
          <wa-button class="wa-dark" size="small" href="/purchase">
            <wa-icon slot="start" name="rocket-launch"></wa-icon>
            Purchase Pro
          </wa-button>
        {% endif %}
      {% endraw %}
    </div>
  </div>
</div>

<div class="home-wrapper">
  <wa-button href="/docs/" appearance="outlined" class="tile">
    <div class="wa-stack">
      <div class="wa-split">
        <div class="wa-cluster icon-heading">
          <wa-icon name="pen-ruler" class="brand-orange"></wa-icon>
          <h3>Get started</h3>
        </div>
        <wa-icon name="arrow-right"></wa-icon>
      </div>
      <p>Check out our installation guide to start building with Web Awesome.</p>
    </div>
  </wa-button>
  <wa-divider></wa-divider>
  <div class="summary">
    <h2 class="brand-font">What's <span class="emphasis">Web</span> Awesome?</h2>
    <p>Web Awesome is the biggest open-source library of meticulously designed, highly customizable, and framework-agnostic UI components.</p>
    <div class="grid">
      <div class="wa-stack">
        <div class="wa-cluster icon-heading">
          <wa-icon name="code" class="brand-orange"></wa-icon>
          <h3>Entirely native</h3>
        </div>
        <p>Built on web standards to last for years to come. No excess tooling. No third-party bloat.</p>
      </div>
      <div class="wa-stack">
        <div class="wa-cluster icon-heading">
          <wa-icon name="palette" class="brand-orange"></wa-icon>
          <h3>Fully customizable</h3>
        </div>
        <p>Show off your own style with components that consistently adapt to your theme.</p>
      </div>
      <div class="wa-stack">
        <div class="wa-cluster icon-heading">
          <wa-icon name="wheelchair-move" class="brand-orange"></wa-icon>
          <h3>Accessibility forward</h3>
        </div>
        <p>Build a website that everyone can use. Designed to be inclusive and usable by everyone.</p>
      </div>
      <div class="wa-stack">
        <div class="wa-cluster icon-heading">
          <wa-icon name="handshake-simple" class="brand-orange"></wa-icon>
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
      <wa-button href="https://github.com/shoelace-style/webawesome" rel="noopener noreferrer" target="_blank" appearance="filled" class="tile">
        <div class="wa-stack">
          <div class="wa-split">
            <div class="wa-cluster icon-heading">
              <wa-icon family="brands" name="github"></wa-icon>
              <h3>GitHub</h3>
            </div>
            <wa-icon name="arrow-up-right"></wa-icon>
          </div>
          <p>Get involved by opening issues, contributing to discussions, or creating PRs.</p>
        </div>
      </wa-button>
      <wa-button href="https://discord.gg/mg8f26C" rel="noopener noreferrer" target="_blank" appearance="filled" class="tile">
        <div class="wa-stack">
          <div class="wa-split">
            <div class="wa-cluster icon-heading">
              <wa-icon family="brands" name="discord"></wa-icon>
              <h3>Discord</h3>
            </div>
            <wa-icon name="arrow-up-right"></wa-icon>
          </div>
          <p>Share your work, ask questions, and explore ideas with other Web Awesome builders.</p>
        </div>
      </wa-button>
      <wa-button href="mailto:hello@webawesome.com" appearance="filled" class="tile">
        <div class="wa-split">
          <div class="wa-cluster icon-heading">
            <wa-icon name="envelope-open"></wa-icon>
            <h3 class="wa-cluster wa-gap-xs">
              <span>hello@webawesome.com</span>
              <wa-icon name="hand-wave" variant="regular"></wa-icon>
            </h3>
          </div>
          <wa-icon name="arrow-up-right"></wa-icon>
        </div>
      </wa-button>
    </div>
  </div>

<wa-divider></wa-divider>

  <div class="wa-stack wa-gap-xl">
    <h2 class="wa-cluster brand-font">
      <wa-icon name="hashtag" style="color: var(--wa-brand-orange);"></wa-icon>
      <span>Stay in the know</span>
    </h2>
    <div class="wa-grid" style="--min-column-size: 30ch;">
      <wa-button href="https://bsky.app/profile/webawesome.com" rel="noopener noreferrer" target="_blank" appearance="filled" class="tile">
        <div class="wa-split">
          <div class="wa-cluster icon-heading">
            <wa-icon family="brands" name="bluesky"></wa-icon>
            <h3>Bluesky</h3>
          </div>
          <wa-icon name="arrow-up-right"></wa-icon>
        </div>
      </wa-button>
      <wa-button href="https://mastodon.social/@webawesome" rel="noopener noreferrer" target="_blank" appearance="filled" class="tile">
        <div class="wa-split">
          <div class="wa-cluster icon-heading">
            <wa-icon family="brands" name="mastodon"></wa-icon>
            <h3>Mastodon</h3>
          </div>
          <wa-icon name="arrow-up-right"></wa-icon>
        </div>
      </wa-button>
      <wa-button href="https://x.com/webawesomer" rel="noopener noreferrer" target="_blank" appearance="filled" class="tile">
        <div class="wa-split">
          <div class="wa-cluster icon-heading">
            <wa-icon family="brands" name="x-twitter"></wa-icon>
            <h3>Twitter (X)</h3>
          </div>
          <wa-icon name="arrow-up-right"></wa-icon>
        </div>
      </wa-button>
      <wa-button href="https://www.threads.com/@web.awesome" rel="noopener noreferrer" target="_blank" appearance="filled" class="tile">
        <div class="wa-split">
          <div class="wa-cluster icon-heading">
            <wa-icon family="brands" name="threads"></wa-icon>
            <h3>Threads</h3>
          </div>
          <wa-icon name="arrow-up-right"></wa-icon>
        </div>
      </wa-button>
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
          <wa-button appearance="filled" pill href="https://www.11ty.dev/">11ty</wa-button>
          <wa-button appearance="filled" pill href="https://lit.dev/">Lit</wa-button>
          <wa-button appearance="filled" pill href="https://github.com/open-wc/custom-elements-manifest">Custom Elements Manifest</wa-button>
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
