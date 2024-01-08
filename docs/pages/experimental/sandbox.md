---
meta:
  title: Theming Sandbox
  description: TODO
---

# Theming Sandbox

#### Card

```html:preview
<wa-card class="card-overview">
  <img
    slot="image"
    src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  />

  <strong>Mittens</strong><br />
  This kitten is as cute as he is playful. Bring him home today!<br />
  <small>6 weeks old</small>

  <div slot="footer">
    <wa-button variant="brand" pill>More Info</wa-button>
    <wa-rating></wa-rating>
  </div>
</wa-card>

<style>
  .card-overview {
    max-width: 300px;
  }

  .card-overview small {
    color: var(--wa-color-text-quiet);
  }

  .card-overview [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
```

#### Alerts

```html:preview
<wa-alert variant="brand" open>
  <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
  <strong>This is super informative</strong><br />
  You can tell by how pretty the alert is.
</wa-alert>
<br />
<wa-alert variant="success" open>
  <wa-icon slot="icon" name="circle-check" variant="regular"></wa-icon>
  <strong>Your changes have been saved</strong><br />
  You can safely exit the app now.
</wa-alert>
<br />
<wa-alert variant="neutral" open>
  <wa-icon slot="icon" name="gear" variant="regular"></wa-icon>
  <strong>Your settings have been updated</strong><br />
  Settings will take affect on next login.
</wa-alert>
<br />
<wa-alert variant="warning" open>
  <wa-icon slot="icon" name="triangle-exclamation" variant="regular"></wa-icon>
  <strong>Your session has ended</strong><br />
  Please login again to continue.
</wa-alert>
<br />
<wa-alert variant="danger" open>
  <wa-icon slot="icon" name="circle-exclamation" variant="regular"></wa-icon>
  <strong>Your account has been deleted</strong><br />
  We're very sorry to see you go!
</wa-alert>
```

#### Badges and Tags

```html:preview
<wa-badge variant="brand">Brand</wa-badge>
<wa-badge variant="success">Success</wa-badge>
<wa-badge variant="neutral">Neutral</wa-badge>
<wa-badge variant="warning">Warning</wa-badge>
<wa-badge variant="danger">Danger</wa-badge>
<br />
<wa-tag variant="brand">Brand</wa-tag>
<wa-tag variant="success">Success</wa-tag>
<wa-tag variant="neutral">Neutral</wa-tag>
<wa-tag variant="warning">Warning</wa-tag>
<wa-tag variant="danger">Danger</wa-tag>
```

#### Buttons

```html:preview
<wa-button variant="brand">Brand</wa-button>
<wa-button variant="success">Success</wa-button>
<wa-button variant="neutral">Neutral</wa-button>
<wa-button variant="warning">Warning</wa-button>
<wa-button variant="danger">Danger</wa-button>
<br /><br />
<wa-button variant="brand" outline>Brand</wa-button>
<wa-button variant="success" outline>Success</wa-button>
<wa-button variant="neutral" outline>Neutral</wa-button>
<wa-button variant="warning" outline>Warning</wa-button>
<wa-button variant="danger" outline>Danger</wa-button>
<br /><br />
<wa-button variant="text">Brand</wa-button>
```

#### Form controls

```html:preview
<wa-checkbox>Unchecked</wa-checkbox>
<br />
<wa-checkbox checked>Checked</wa-checkbox>
<br /><br />
<wa-radio-group label="Radio" name="a" value="1">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
<br />
<wa-switch>Switch off</wa-switch>
<br />
<wa-switch checked>Switch on</wa-switch>
<br /><br />
<wa-input label="Label" help-text="Super helpful and/or contextual content" placeholder="Placeholder"></wa-input>
<br />
<wa-select label="Select">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-select>
```

#### Progress

```html:preview
<wa-progress-ring value="25" style="--indicator-width: 4px;"></wa-progress-ring>
<wa-progress-bar value="60"></wa-progress-bar>
<wa-spinner></wa-spinner>
```

#### Shadows

```html:preview
<style>
  div.shadow {
    border: 1px solid var(--wa-color-surface-border);
    border-radius: var(--wa-corners-s);
    display: inline-block;
    height: 4rem;
    margin-right: 2rem;
    width: 4rem;
  }
  </style>
<div class="shadow" style="box-shadow: var(--wa-shadow-inset);"></div>
<div class="shadow" style="box-shadow: var(--wa-shadow-level-1);"></div>
<div class="shadow" style="box-shadow: var(--wa-shadow-level-2);"></div>
<div class="shadow" style="box-shadow: var(--wa-shadow-level-3);"></div>
```
