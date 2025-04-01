---
title: Activity Log
description: 'Track and organize recent user actions or events.'
---

## Simple

```html {.example}
<div class="wa-stack" style="max-width: 60ch; margin: auto">
  <article class="wa-flank:end wa-align-items-baseline" style="--flank-size: 10ch">
    <div class="wa-grid">
      <div class="wa-cluster">
        <wa-icon name="french-fries" fixed-width></wa-icon>
        <span>Fast food</span>
      </div>
      <wa-relative-time sync></wa-relative-time>
    </div>
    <wa-tag variant="danger">- $5.00</wa-tag>
  </article>
  <wa-divider></wa-divider>
  <article class="wa-flank:end wa-align-items-baseline" style="--flank-size: 10ch">
    <div class="wa-grid">
      <div class="wa-cluster">
        <wa-icon name="piggy-bank" fixed-width></wa-icon>
        <span>Refund</span>
      </div>
      <wa-relative-time date="2025-03-26T09:00:00-04:00"></wa-relative-time>
    </div>
    <wa-tag variant="success">+ $48.99</wa-tag>
  </article>
  <wa-divider></wa-divider>
  <article class="wa-flank:end wa-align-items-baseline" style="--flank-size: 10ch">
    <div class="wa-grid">
      <div class="wa-cluster">
        <wa-icon name="carrot" fixed-width></wa-icon>
        <span>Groceries</span>
      </div>
      <wa-relative-time date="2025-03-24T09:00:00-04:00"></wa-relative-time>
    </div>
    <wa-tag variant="danger">- $115.37</wa-tag>
  </article>
  <wa-divider></wa-divider>
  <article class="wa-flank:end wa-align-items-baseline" style="--flank-size: 10ch">
    <div class="wa-grid">
      <div class="wa-cluster">
        <wa-icon name="shirt" fixed-width></wa-icon>
        <span>Clothing</span>
      </div>
      <wa-relative-time date="2025-03-15T09:00:00-04:00"></wa-relative-time>
    </div>
    <wa-tag variant="danger">- $220.99</wa-tag>
  </article>
</div>
```

## Timeline with Icons

```html {.example}
<div class="wa-stack wa-gap-3xs" style="max-width: 60ch; margin: auto">
  <article class="wa-flank" style="flex-wrap: nowrap">
    <wa-avatar style="--size: 2rem">
      <wa-icon slot="icon" name="acorn"></wa-icon>
    </wa-avatar>
    <div class="wa-flank:end wa-gap-xs">
      <span>Buried by <strong>squirrel</strong></span>
      <wa-format-date date="2025-04-01" month="short" day="numeric"></wa-format-date>
    </div>
  </article>
  <wa-divider vertical style="height: 1em; margin-left: 1rem"></wa-divider>
  <article class="wa-flank" style="flex-wrap: nowrap">
    <wa-avatar style="--size: 2rem">
      <wa-icon slot="icon" name="seedling"></wa-icon>
    </wa-avatar>
    <div class="wa-flank:end wa-gap-xs">
      <span>Germinated in <strong>nutrient-rich soil</strong></span>
      <wa-format-date date="2025-05-29" month="short" day="numeric"></wa-format-date>
    </div>
  </article>
  <wa-divider vertical style="height: 1em; margin-left: 1rem"></wa-divider>
  <article class="wa-flank" style="flex-wrap: nowrap">
    <wa-avatar style="--size: 2rem">
      <wa-icon slot="icon" name="tree-deciduous"></wa-icon>
    </wa-avatar>
    <div class="wa-flank:end wa-gap-xs">
      <span>Matured by <strong>water</strong> and <strong>sunlight</strong></span>
      <wa-format-date date="2025-09-15" month="short" day="numeric"></wa-format-date>
    </div>
  </article>
  <wa-divider vertical style="height: 1em; margin-left: 1rem"></wa-divider>
  <article class="wa-flank" style="flex-wrap: nowrap">
    <wa-avatar style="--size: 2rem">
      <wa-icon slot="icon" name="crate-apple"></wa-icon>
    </wa-avatar>
    <div class="wa-flank:end wa-gap-xs">
      <span>Fruit harvested by <strong>you</strong></span>
      <wa-format-date date="2025-10-18" month="short" day="numeric"></wa-format-date>
    </div>
  </article>
</div>
```

## With Expandable Details

```html {.example}
<wa-card style="max-width: 70ch; margin: auto">
  <h3 class="wa-heading-l">Monthly Activity</h3>
  <div class="wa-stack">
    <wa-details>
      <span class="wa-heading-m" slot="summary">
        February
      </span>
      <div class="wa-stack">
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-xl)" name="envelope" fixed-width></wa-icon>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-s">Email blasts</span>
              <div class="wa-cluster wa-gap-2xs">
                <a href="#">Nick Burkhart</a><span>sent to</span><a href="#">likely customers</a>
              </div>
            </div>
            <wa-format-date date="2025-02-28" month="short" day="numeric" class="wa-caption-m"></wa-format-date>
          </div>
        </article>
        <wa-divider></wa-divider>
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-xl)" name="phone" fixed-width></wa-icon>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-s">Spoke with the Pope</span>
              <div class="wa-cluster wa-gap-2xs">
                <a href="#">Artur Fleck</a><span>for 1 hour</span>
              </div>
            </div>
            <wa-format-date date="2025-02-23" month="short" day="numeric" class="wa-caption-m"></wa-format-date>
          </div>
        </article>
      </div>
    </wa-details>
    <wa-details>
      <span class="wa-heading-m" slot="summary">
        March
      </span>
      <div class="wa-stack">
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-xl)" name="video" fixed-width></wa-icon>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-s">Zoom Call with Northeast office</span>
              <div class="wa-cluster wa-gap-2xs">
                <a href="#">Axel Foley</a><span>for 47 minutes</span>
              </div>
            </div>
            <wa-format-date date="2025-03-15" month="short" day="numeric" class="wa-caption-m"></wa-format-date>
          </div>
        </article>
        <wa-divider></wa-divider>
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-xl)" name="calendar" fixed-width></wa-icon>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-s">Scheduled birthday party</span>
              <div class="wa-cluster wa-gap-2xs">
                <a href="#">John Blaze</a><span>in</span><a href="#">Social Events</a>
              </div>
            </div>
            <wa-format-date date="2025-03-03" month="short" day="numeric" class="wa-caption-m"></wa-format-date>
          </div>
        </article>
      </div>
    </wa-details>
    <wa-details>
      <span class="wa-heading-m" slot="summary">
        April
      </span>
      <div class="wa-stack">
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-xl)" family="brands" name="intercom" fixed-width></wa-icon>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-s">Got new lead</span>
              <div class="wa-cluster wa-gap-2xs">
                <a href="#">Jack Carter</a><span>on Intercom switchboard</span>
              </div>
            </div>
            <wa-format-date date="2025-04-18" month="short" day="numeric" class="wa-caption-m"></wa-format-date>
          </div>
        </article>
        <wa-divider></wa-divider>
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-xl)" name="list-check" fixed-width></wa-icon>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-s">Completed Todo</span>
              <div class="wa-cluster wa-gap-2xs">
                <a href="#">Huey Freeman</a><span>marked complete on</span><a href="#">Daily Tasks</a>
              </div>
            </div>
            <wa-format-date date="2025-04-02" month="short" day="numeric" class="wa-caption-m"></wa-format-date>
          </div>
        </article>
      </div>
    </wa-details>
  </div>
</wa-card>
```