---
title: Pricing
description: 'Help users make informed purchasing decisions with clear, structured pricing.'
isPro: true
---

## Three Tiers

```html{.example}
<div class="wa-grid">
  <wa-card>
    <div class="wa-stack">
      <div class="wa-cluster wa-heading-l">
        <wa-icon name="apple-core"></wa-icon>
        <h3>Lite</h3>
      </div>
      <span class="wa-flank wa-align-items-baseline wa-gap-2xs">
        <span class="wa-heading-2xl">$60</span>
        <span class="wa-caption-l">per year</span>
      </span>
      <p class="wa-caption-l">An online-only plan for web-based projects.</p>
      <wa-button variant="brand" appearance="outlined">Get Lite</wa-button>
    </div>
    <div slot="footer" class="wa-stack">
      <h4 class="wa-heading-s">What You Get</h4>
      <div class="wa-stack">
        <div class="wa-flank">
          <wa-icon name="user" fixed-width></wa-icon>
          <span class="wa-caption-m">1 user</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="suitcase" fixed-width></wa-icon>
          <span class="wa-caption-m">2 custom kits</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="chart-simple" fixed-width></wa-icon>
          <span class="wa-caption-m">Up to 100k pageviews</span>
        </div>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-stack">
      <div class="wa-split">
        <div class="wa-cluster wa-heading-l">
          <wa-icon name="apple-whole"></wa-icon>
          <h3>Pro</h3>
        </div>
        <wa-badge>Most Popular</wa-badge>
      </div>
      <span class="wa-flank wa-align-items-baseline wa-gap-2xs">
        <span class="wa-heading-2xl">$120</span>
        <span class="wa-caption-l">per year</span>
      </span>
      <p class="wa-caption-l">A great all-around plan for online or desktop use.</p>
      <wa-button variant="brand">Get Pro</wa-button>
    </div>
    <div slot="footer" class="wa-stack">
      <h4 class="wa-heading-s">What You Get</h4>
      <div class="wa-stack">
        <div class="wa-flank">
          <wa-icon name="user" fixed-width></wa-icon>
          <span class="wa-caption-m">5 users</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="suitcase" fixed-width></wa-icon>
          <span class="wa-caption-m">20 custom kits</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="chart-simple" fixed-width></wa-icon>
          <span class="wa-caption-m">Up to 1M pageviews</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="arrow-down-to-line" fixed-width></wa-icon>
          <span class="wa-caption-m">Kit downloads</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="cloud-plus" fixed-width></wa-icon>
          <span class="wa-caption-m">Cloud hosting</span>
        </div>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-stack">
      <div class="wa-cluster wa-heading-l">
        <wa-icon name="crate-apple"></wa-icon>
        <h3>Max</h3>
      </div>
      <span class="wa-flank wa-align-items-baseline wa-gap-2xs">
        <span class="wa-heading-2xl">$600</span>
        <span class="wa-caption-l">per year</span>
      </span>
      <p class="wa-caption-l">Our biggest plan with more of everything.</p>
      <wa-button variant="brand" appearance="outlined">Get Max</wa-button>
    </div>
    <div slot="footer" class="wa-stack">
      <h4 class="wa-heading-s">What You Get</h4>
      <div class="wa-stack">
        <div class="wa-flank">
          <wa-icon name="user" fixed-width></wa-icon>
          <span class="wa-caption-m">50 users</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="suitcase" fixed-width></wa-icon>
          <span class="wa-caption-m">Unlimited custom kits</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="chart-simple" fixed-width></wa-icon>
          <span class="wa-caption-m">Up to 10M pageviews</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="arrow-down-to-line" fixed-width></wa-icon>
          <span class="wa-caption-m">Kit downloads</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="cloud-plus" fixed-width></wa-icon>
          <span class="wa-caption-m">Cloud hosting</span>
        </div>
      </div>
    </div>
  </wa-card>
</div>
```

## Single Tier

```html {.example}
<wa-card>
  <div class="wa-grid">
    <div class="wa-stack">
      <h3 class="wa-heading-l">Lifetime Membership</h3>
      <p>Learn at your own pace with expert-led content, exclusive resources, and a community of like-minded learners.</p>
      <wa-divider></wa-divider>
      <h4 class="wa-heading-s">Membership Includes:</h4>
      <div class="wa-grid">
        <div class="wa-flank wa-gap-xs">
          <wa-icon name="check"></wa-icon>
          <span class="wa-caption-m">Private forum access</span>
        </div>
        <div class="wa-flank wa-gap-xs">
          <wa-icon name="check"></wa-icon>
          <span class="wa-caption-m">Priority admission to events</span>
        </div>
        <div class="wa-flank wa-gap-xs">
          <wa-icon name="check"></wa-icon>
          <span class="wa-caption-m">Yearly skill assessment</span>
        </div>
        <div class="wa-flank wa-gap-xs">
          <wa-icon name="check"></wa-icon>
          <span class="wa-caption-m">Members-only swag</span>
        </div>
      </div>
    </div>
    <wa-callout variant="neutral" appearance="filled">
      <div class="wa-stack wa-align-items-center" style="justify-content: center">
        <h4 class="wa-heading-s">Pay Once, Own it Forever</h4>
        <div class="wa-cluster wa-align-items-baseline wa-gap-2xs">
          <span class="wa-heading-3xl">$459</span>
          <span>USD</span>
        </div>
        <wa-button variant="brand" style="width: 100%">Get Access</wa-button>
        <small class="wa-caption-m">30-day money back guarantee</small>
      </div>
    </wa-callout>
  </div>
</wa-card>
```