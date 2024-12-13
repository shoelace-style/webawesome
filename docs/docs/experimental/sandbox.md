---
title: Theming Sandbox
description: TODO
layout: page
---

## Card

```html {.example}
<wa-card with-image with-footer class="card-overview">
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

## Alerts

```html {.example}
<wa-callout variant="brand">
  <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
  <strong>This is super informative</strong><br />
  You can tell by how pretty the alert is.
</wa-callout>
<br />
<wa-callout variant="success">
  <wa-icon slot="icon" name="circle-check" variant="regular"></wa-icon>
  <strong>Your changes have been saved</strong><br />
  You can safely exit the app now.
</wa-callout>
<br />
<wa-callout variant="neutral">
  <wa-icon slot="icon" name="gear" variant="regular"></wa-icon>
  <strong>Your settings have been updated</strong><br />
  Settings will take affect on next login.
</wa-callout>
<br />
<wa-callout variant="warning">
  <wa-icon slot="icon" name="triangle-exclamation" variant="regular"></wa-icon>
  <strong>Your session has ended</strong><br />
  Please login again to continue.
</wa-callout>
<br />
<wa-callout variant="danger">
  <wa-icon slot="icon" name="circle-exclamation" variant="regular"></wa-icon>
  <strong>Your account has been deleted</strong><br />
  We're very sorry to see you go!
</wa-callout>
```

## Badges and Tags

```html {.example}
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

## Buttons

```html {.example}
<wa-button variant="brand">Brand</wa-button>
<wa-button variant="success">Success</wa-button>
<wa-button variant="neutral">Neutral</wa-button>
<wa-button variant="warning">Warning</wa-button>
<wa-button variant="danger">Danger</wa-button>
<br /><br />
<wa-button variant="brand" appearance="outlined">Brand</wa-button>
<wa-button variant="success" appearance="outlined">Success</wa-button>
<wa-button variant="neutral" appearance="outlined">Neutral</wa-button>
<wa-button variant="warning" appearance="outlined">Warning</wa-button>
<wa-button variant="danger" appearance="outlined">Danger</wa-button>
<br /><br />
<wa-button appearance="text">Text</wa-button>
<br /><br />
<wa-radio-group label="Radio button group" name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
```

## Form controls

```html {.example}
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
<wa-range label="Range" hint="Here's a bit of handy content." min="0" max="100"></wa-range>
<br /><br />
<wa-input label="Label" hint="Super helpful and/or contextual content" placeholder="Placeholder"></wa-input>
<br />
<wa-select label="Select" multiple value="option-1 option-2">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-select>
```

## Progress

```html {.example}
<wa-progress-ring value="25" style="--indicator-width: 4px;"></wa-progress-ring>
<wa-progress-bar value="60"></wa-progress-bar>
<wa-spinner></wa-spinner>
```

## Shadows

```html {.example}
<style>
  div.shadow {
    border: var(--wa-border-width-s) solid var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-s);
    display: inline-block;
    height: 4rem;
    margin-right: 2rem;
    width: 4rem;
  }
  </style>
<div class="shadow" style="box-shadow: var(--wa-shadow-xs);"></div>
<div class="shadow" style="box-shadow: var(--wa-shadow-s);"></div>
<div class="shadow" style="box-shadow: var(--wa-shadow-m);"></div>
<div class="shadow" style="box-shadow: var(--wa-shadow-l);"></div>
```

## Tests

```html {.example}
<style>
  div.test-cases > * + * {
    margin-top: 1rem;
  }
  div.alignment {
    background: linear-gradient(to bottom, lightblue, lightblue 1px, transparent 1px, transparent), linear-gradient(to top, lightblue, lightblue 1px, transparent 1px, transparent);
    position: relative;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  div.alignment::after {
    content: '';
    position: absolute;
    top: calc(50% - 0.5px);
    width: 100%;
    height: 1px;
    background-color: red;
  }
</style>
<div class="test-cases">
  <div class="alignment">
    <wa-switch size="small">OCBS</wa-switch>
    <wa-checkbox size="small">OCBS</wa-checkbox>
    <wa-radio value="1" size="small">OCBS</wa-radio>
  </div>
  <div class="alignment">
    <wa-switch>OCBS</wa-switch>
    <wa-checkbox>OCBS</wa-checkbox>
    <wa-radio value="1">OCBS</wa-radio>
  </div>
  <div class="alignment">
    <wa-switch size="large">OCBS</wa-switch>
    <wa-checkbox size="large">OCBS</wa-checkbox>
    <wa-radio value="1" size="large">OCBS</wa-radio>
  </div>
  <div class="alignment">
    <wa-input size="small"></wa-input>
    <wa-select size="small" value="ocbs" multiple>
      <wa-option value="ocbs">OCBS</wa-option>
    </wa-select>
    <wa-color-picker size="small"></wa-color-picker>
    <wa-button size="small">OCBS</wa-button>
  </div>
  <div class="alignment">
    <wa-input size="medium"></wa-input>
    <wa-select size="medium" value="ocbs" multiple>
      <wa-option value="ocbs">OCBS</wa-option>
    </wa-select>
    <wa-color-picker size="medium"></wa-color-picker>
    <wa-button size="medium">OCBS</wa-button>
  </div>
  <div class="alignment">
    <wa-input size="large"></wa-input>
    <wa-select size="large" value="ocbs" multiple>
      <wa-option value="ocbs">OCBS</wa-option>
    </wa-select>
    <wa-color-picker size="large"></wa-color-picker>
    <wa-button size="large">OCBS</wa-button>
  </div>
  <div class="alignment">
    <wa-badge>OCBS</wa-badge>
    <wa-avatar></wa-avatar>
    <wa-rating></wa-rating>
    <wa-range></wa-range>
    <wa-icon-button name="gear" label="Settings"></wa-icon-button>
    <wa-progress-bar value="50" style="width: 8rem;"></wa-progress-bar>
    <wa-spinner></wa-spinner>
  </div>
  <div class="alignment">
    <wa-input label="AaBbCc" hint="Lorem ipsum dolor"></wa-input>
    <wa-select label="AaBbCc" value="ocbs" multiple hint="Lorem ipsum dolor">
      <wa-option value="ocbs">OCBS</wa-option>
    </wa-select>
    <wa-color-picker label="AaBbCc" hint="Lorem ipsum dolor"></wa-color-picker>
  </div>
</div>
```
