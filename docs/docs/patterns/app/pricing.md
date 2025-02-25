---
title: Pricing
description: TODO
parent: app
tags: app
---

```html{.example}
<div class="pricing">
  <wa-card with-footer class="plan">
    <div class="card-body">
      <div class="plan-title">Basic Plan</div>
      <span class="plan-price">
        <span style="font-size: xxx-large; font-weight: 800;letter-spacing: -2.5px;">$10</span>
        <span style="margin-left: 0.5rem;">
          <p style="margin-bottom: 0;">per user</p>
          <p style="margin-bottom: 0;">per month</p>
        </span>
      </span>
      <p>Basic features for up to 10 users.</p>
      <wa-button style="width: 100%; margin-bottom: 1rem;">Get Started</wa-button>
      <wa-button style="width: 100%; margin-bottom: 1rem;" appearance="outlined">Talk to sales</wa-button>
    </div>
      <div slot="footer" class="features">
        <span class="list-title">Features</span>
        <p style="margin-bottom: var(--wa-space-s);">Everything in our free plans plus...</p>
        <ul>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Access to basic features
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic Reporting and analytics
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Up to 10 individual users
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            20GB Individual data each user
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic chat and email support
          </li>
        </ul>
      </div>
  </wa-card>
  <wa-card with-footer class="plan">
    <div class="card-body">
      <div class="plan-title" style="display: flex; justify-content: space-between;">Business Plan <wa-badge variant="success" pill>Most Popular</wa-badge></div>
      <span class="plan-price">
        <span style="font-size: xxx-large; font-weight: 800;"letter-spacing: -2.5px;>$20</span>
        <span style="margin-left: 0.5rem;">
          <p style="margin-bottom: 0;">per user</p>
          <p style="margin-bottom: 0;">per month</p>
        </span>
      </span>
      <p>Growing teams up to 20 users.</p>
      <wa-button style="width: 100%; margin-bottom: 1rem;">Get Started</wa-button>
      <wa-button style="width: 100%; margin-bottom: 1rem;" appearance="outlined">Talk to sales</wa-button>
    </div>
      <div slot="footer" class="features">
        <span class="list-title">Features</span>
        <p style="margin-bottom: var(--wa-space-s);">Everything in Basic plus...</p>
        <ul>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            200+ integrations
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic Reporting and analytics
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Up to 10 individual users
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            20GB Individual data each user
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic chat and email support
          </li>
        </ul>
      </div>
  </wa-card>
  <wa-card with-footer class="plan">
    <div class="card-body">
      <div class="plan-title">Basic Plan</div>
      <span class="plan-price">
        <span style="font-size: xxx-large; font-weight: 800;"letter-spacing: -2.5px;>$40</span>
        <span style="margin-left: 0.5rem;">
          <p style="margin-bottom: 0;">per user</p>
          <p style="margin-bottom: 0;">per month</p>
        </span>
      </span>
      <p>Basic features for up to 10 users.</p>
      <wa-button style="width: 100%; margin-bottom: 1rem;">Get Started</wa-button>
      <wa-button style="width: 100%; margin-bottom: 1rem;" appearance="outlined">Talk to sales</wa-button>
    </div>
      <div slot="footer" class="features">
        <span class="list-title">Features</span>
        <p style="margin-bottom: var(--wa-space-s);">Everything in our free plans plus...</p>
        <ul>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Access to basic features
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic Reporting and analytics
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Up to 10 individual users
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            20GB Individual data each user
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic chat and email support
          </li>
        </ul>
      </div>
  </wa-card>
</div>
<style>
.pricing {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  .plan {
  }
  .plan-title {
    font-weight: 600;
  }
  .plan-price {
    display: flex;
    align-items: center;
  }
  .features {
    .list-title {
      text-transform: uppercase;
      font-weight: 600;
    }
    ul {
      list-style: none;
      margin-left: 0;
      li {
        margin-bottom: .5rem;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
```

### With templates

### With recommendations grid