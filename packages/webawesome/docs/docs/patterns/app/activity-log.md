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
  <wa-divider orientation="vertical" style="margin-left: 1rem"></wa-divider>
  <article class="wa-flank" style="flex-wrap: nowrap">
    <wa-avatar style="--size: 2rem">
      <wa-icon slot="icon" name="seedling"></wa-icon>
    </wa-avatar>
    <div class="wa-flank:end wa-gap-xs">
      <span>Germinated in <strong>nutrient-rich soil</strong></span>
      <wa-format-date date="2025-05-29" month="short" day="numeric"></wa-format-date>
    </div>
  </article>
  <wa-divider orientation="vertical" style="margin-left: 1rem"></wa-divider>
  <article class="wa-flank" style="flex-wrap: nowrap">
    <wa-avatar style="--size: 2rem">
      <wa-icon slot="icon" name="tree-deciduous"></wa-icon>
    </wa-avatar>
    <div class="wa-flank:end wa-gap-xs">
      <span>Matured by <strong>water</strong> and <strong>sunlight</strong></span>
      <wa-format-date date="2025-09-15" month="short" day="numeric"></wa-format-date>
    </div>
  </article>
  <wa-divider orientation="vertical" style="margin-left: 1rem"></wa-divider>
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
  <h3 class="wa-heading-m">Monthly Activity</h3>
  <div class="wa-stack">
    <wa-details>
      <span class="wa-heading-m" slot="summary"> February </span>
      <div class="wa-stack">
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-l)" name="envelope" fixed-width></wa-icon>
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
          <wa-icon style="font-size: var(--wa-font-size-l)" name="phone" fixed-width></wa-icon>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-s">Spoke with the Pope</span>
              <div class="wa-cluster wa-gap-2xs"><a href="#">Artur Fleck</a><span>for 1 hour</span></div>
            </div>
            <wa-format-date date="2025-02-23" month="short" day="numeric" class="wa-caption-m"></wa-format-date>
          </div>
        </article>
      </div>
    </wa-details>
    <wa-details>
      <span class="wa-heading-m" slot="summary"> March </span>
      <div class="wa-stack">
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-l)" name="video" fixed-width></wa-icon>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-s">Zoom Call with Northeast office</span>
              <div class="wa-cluster wa-gap-2xs"><a href="#">Axel Foley</a><span>for 47 minutes</span></div>
            </div>
            <wa-format-date date="2025-03-15" month="short" day="numeric" class="wa-caption-m"></wa-format-date>
          </div>
        </article>
        <wa-divider></wa-divider>
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-l)" name="calendar" fixed-width></wa-icon>
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
      <span class="wa-heading-m" slot="summary"> April </span>
      <div class="wa-stack">
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-l)" family="brands" name="intercom" fixed-width></wa-icon>
          <div class="wa-split">
            <div class="wa-stack wa-gap-0">
              <span class="wa-heading-s">Got new lead</span>
              <div class="wa-cluster wa-gap-2xs"><a href="#">Jack Carter</a><span>on Intercom switchboard</span></div>
            </div>
            <wa-format-date date="2025-04-18" month="short" day="numeric" class="wa-caption-m"></wa-format-date>
          </div>
        </article>
        <wa-divider></wa-divider>
        <article class="wa-flank">
          <wa-icon style="font-size: var(--wa-font-size-l)" name="list-check" fixed-width></wa-icon>
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

## Card Separated

```html {.example}
<div class="wa-stack" style="max-width: 45ch; margin: 0 auto;">
  <div class="wa-stack">
    <wa-card>
      <div class="wa-flank">
        <wa-avatar
          image="https://images.unsplash.com/photo-1559188286-a173792c8340?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          label="profile image"
        ></wa-avatar>
        <div class="wa-stack wa-gap-0">
          <div class="wa-split">
            <span class="wa-heading-s">Isaiah Hamilton</span>
            <wa-relative-time class="wa-caption-s" date="2025-01-15T09:17:00-04:00"></wa-relative-time>
          </div>
          <p>Who's on first?</p>
          <a href="#" class="wa-cluster wa-gap-2xs">
            <wa-icon name="reply" family="sharp" variant="regular"></wa-icon>
            <span>Reply</span>
          </a>
        </div>
      </div>
    </wa-card>
    <div class="wa-flank wa-gap-xl">
      <wa-divider orientation="vertical" style="height: auto; align-self: stretch"></wa-divider>
      <ul class="wa-stack">
        <li class="wa-stack wa-gap-2xs">
          <wa-card>
            <div class="wa-flank">
              <wa-avatar
                image="https://images.unsplash.com/photo-1645288059073-af3e9eb62a29?q=80&w=2936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                label="profile image"
              ></wa-avatar>
              <div class="wa-stack wa-gap-0">
                <div class="wa-split">
                  <span class="wa-heading-s">Melvin Hurst</span>
                  <wa-relative-time class="wa-caption-s" date="2025-02-15T09:17:00-04:00"></wa-relative-time>
                </div>
                <p>What's on second?</p>
                <a href="#" class="wa-cluster wa-gap-2xs">
                  <wa-icon name="reply" family="sharp" variant="regular"></wa-icon>
                  <span>Reply</span>
                </a>
              </div>
            </div>
          </wa-card>
        </li>
        <li class="wa-stack wa-gap-2xs">
          <wa-card>
            <div class="wa-flank wa-align-items-start">
              <wa-avatar
                image="https://images.unsplash.com/photo-1674044494331-8db2ecf18d46?q=80&w=3019&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                label="profile image"
              ></wa-avatar>
              <div class="wa-stack wa-gap-xs">
                <div class="wa-split">
                  <span class="wa-heading-s">Vanessa Wright</span>
                </div>
                <wa-textarea size="small" aria-label="Add Your Comment"></wa-textarea>
              </div>
            </div>
          </wa-card>
        </li>
      </ul>
    </div>
  </div>
</div>
```

## Divider Separated

```html {.example}
<wa-card style="max-width: 54ch; margin: 0 auto;">
  <div slot="header" class="wa-split">
    <div>
      <span>Notifications</span>
      <wa-badge appearance="filled" variant="success" pill>2</wa-badge>
    </div>
    <wa-icon name="close"></wa-icon>
  </div>
  <div class="wa-stack">
    <article>
      <div class="wa-flank wa-align-items-start">
        <wa-avatar
          image="https://images.unsplash.com/photo-1614807547811-4174d3582092?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          label="profile image"
        ></wa-avatar>
        <div class="wa-stack wa-gap-2xs">
          <div class="wa-split">
            <span><strong>Happy</strong> commented in <a href="#">Reporting Dashboard</a></span>
            <wa-icon name="circle" style="color: var(--wa-color-green);"></wa-icon>
          </div>
          <div class="wa-split">
            <span class="wa-caption-m">Friday 3:12PM</span>
            <wa-relative-time class="wa-caption-m" date="2025-02-15T09:17:00-04:00"></wa-relative-time>
          </div>
          <wa-callout variant="neutral">
            Really love this approach. I think this is the best solution for the sync issue.
          </wa-callout>
        </div>
      </div>
      <wa-divider></wa-divider>
    </article>
    <article>
      <div class="wa-flank wa-align-items-start">
        <wa-avatar
          image="https://images.unsplash.com/photo-1613428800237-c86372070fab?q=80&w=3017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          label="profile image"
        ></wa-avatar>
        <div class="wa-stack wa-gap-2xs">
          <div class="wa-split">
            <span><strong>Charlotte</strong> followed you</span>
            <wa-icon name="circle" style="color: var(--wa-color-green);"></wa-icon>
          </div>
          <div class="wa-split">
            <span class="wa-caption-m">Friday 3:04PM</span>
            <wa-relative-time class="wa-caption-m" date="2025-02-15T09:17:00-04:00"></wa-relative-time>
          </div>
        </div>
      </div>
      <wa-divider></wa-divider>
    </article>
    <article>
      <div class="wa-flank wa-align-items-start">
        <wa-avatar
          image="https://images.unsplash.com/photo-1645288059073-af3e9eb62a29?q=80&w=2936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          label="Profile image"
        ></wa-avatar>
        <div class="wa-stack wa-gap-2xs">
          <div class="wa-split">
            <span><strong>Tavitian</strong> invited you to <a href="#">Homepage Redesign</a></span>
          </div>
          <div class="wa-split">
            <span class="wa-caption-m">Friday 2:22PM</span>
            <wa-relative-time class="wa-caption-m" date="2025-02-15T09:17:00-04:00"></wa-relative-time>
          </div>
          <div class="wa-cluster wa-gap-xs">
            <wa-button appearance="outlined" size="small">Decline</wa-button>
            <wa-button variant="brand" size="small">Accept</wa-button>
          </div>
        </div>
      </div>
      <wa-divider></wa-divider>
    </article>
  </div>
</wa-card>
```
