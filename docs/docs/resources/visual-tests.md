---
title: Visual Tests
description: TODO
layout: page
wide: true
---

<style>
  p {
    max-width: 90ch;
  }
  tbody {
    & .wa-grid {
      --min-column-size: 5ch;
    }
    & tr th:first-of-type {
      width: 20ch;
    }
    & th {
      vertical-align: middle;
    }
    & tr:hover {
      background-color: color-mix(in oklch, var(--wa-color-fill-quiet), transparent 60%)
    }
  }
  wa-divider {
    --width: var(--wa-border-width-m);
    --spacing: var(--wa-space-3xl);
  }
  /* .test-failure {
    &::before {
      content: '\f071';
      color: red;
      font-family: 'Font Awesome 6 Duotone';
      font-size: 1.5rem;
      margin-inline: 0.5rem;
    }
  } */
</style>

With so many ways to build with and use Web Awesome components, visual tests help ensure consistency and prevent broken styles from leaking into production.

These tests can come in handy when creating or customizing your own theme. Look through each test case to make sure that custom styles in your theme cover all of the attributes, utilities, and built-in styles Web Awesome offers.

<!-- Known test failures that affect the entire library, regardless of theme, are indicated by <wa-icon name="triangle-exclamation" family="duotone" style="color: red;"></wa-icon> and will be addressed in a future release. -->

<wa-tab-group>
  <wa-tab panel="appearance">Appearance</wa-tab>
  <wa-tab panel="alignment">Alignment</wa-tab>
  <wa-tab panel="color">Color</wa-tab>
  <wa-tab panel="harmony">Harmony</wa-tab>
  <wa-tab panel="native">Native Styles</wa-tab>
  <wa-tab panel="size">Size</wa-tab>

<wa-tab-panel name="appearance">

## Appearance

Appearance tests ensure that both the `appearance` attribute and `.wa-[appearance]` classes have identical results for components that support them. Developers should be able to use both of these interchangeably on components to get the intended look and feel.

### Badge

<table>
  <thead>
    <th></th>
    <th><code>appearance=""</code></th>
    <th><code>.wa-[appearance]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>accent</code> + <code>outlined</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" appearance="accent outlined">Brand</wa-badge>
          <wa-badge variant="neutral" appearance="accent outlined">Neutral</wa-badge>
          <wa-badge variant="success" appearance="accent outlined">Success</wa-badge>
          <wa-badge variant="warning" appearance="accent outlined">Warning</wa-badge>
          <wa-badge variant="danger" appearance="accent outlined">Danger</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" class="wa-accent wa-outlined">Brand</wa-badge>
          <wa-badge variant="neutral" class="wa-accent wa-outlined">Neutral</wa-badge>
          <wa-badge variant="success" class="wa-accent wa-outlined">Success</wa-badge>
          <wa-badge variant="warning" class="wa-accent wa-outlined">Warning</wa-badge>
          <wa-badge variant="danger" class="wa-accent wa-outlined">Danger</wa-badge>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>accent</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" appearance="accent">Brand</wa-badge>
          <wa-badge variant="neutral" appearance="accent">Neutral</wa-badge>
          <wa-badge variant="success" appearance="accent">Success</wa-badge>
          <wa-badge variant="warning" appearance="accent">Warning</wa-badge>
          <wa-badge variant="danger" appearance="accent">Danger</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" class="wa-accent">Brand</wa-badge>
          <wa-badge variant="neutral" class="wa-accent">Neutral</wa-badge>
          <wa-badge variant="success" class="wa-accent">Success</wa-badge>
          <wa-badge variant="warning" class="wa-accent">Warning</wa-badge>
          <wa-badge variant="danger" class="wa-accent">Danger</wa-badge>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>filled</code> + <code>outlined</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" appearance="filled outlined">Brand</wa-badge>
          <wa-badge variant="neutral" appearance="filled outlined">Neutral</wa-badge>
          <wa-badge variant="success" appearance="filled outlined">Success</wa-badge>
          <wa-badge variant="warning" appearance="filled outlined">Warning</wa-badge>
          <wa-badge variant="danger" appearance="filled outlined">Danger</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" class="wa-filled wa-outlined">Brand</wa-badge>
          <wa-badge variant="neutral" class="wa-filled wa-outlined">Neutral</wa-badge>
          <wa-badge variant="success" class="wa-filled wa-outlined">Success</wa-badge>
          <wa-badge variant="warning" class="wa-filled wa-outlined">Warning</wa-badge>
          <wa-badge variant="danger" class="wa-filled wa-outlined">Danger</wa-badge>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>filled</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" appearance="filled">Brand</wa-badge>
          <wa-badge variant="neutral" appearance="filled">Neutral</wa-badge>
          <wa-badge variant="success" appearance="filled">Success</wa-badge>
          <wa-badge variant="warning" appearance="filled">Warning</wa-badge>
          <wa-badge variant="danger" appearance="filled">Danger</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" class="wa-filled">Brand</wa-badge>
          <wa-badge variant="neutral" class="wa-filled">Neutral</wa-badge>
          <wa-badge variant="success" class="wa-filled">Success</wa-badge>
          <wa-badge variant="warning" class="wa-filled">Warning</wa-badge>
          <wa-badge variant="danger" class="wa-filled">Danger</wa-badge>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>outlined</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" appearance="outlined">Brand</wa-badge>
          <wa-badge variant="neutral" appearance="outlined">Neutral</wa-badge>
          <wa-badge variant="success" appearance="outlined">Success</wa-badge>
          <wa-badge variant="warning" appearance="outlined">Warning</wa-badge>
          <wa-badge variant="danger" appearance="outlined">Danger</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" class="wa-outlined">Brand</wa-badge>
          <wa-badge variant="neutral" class="wa-outlined">Neutral</wa-badge>
          <wa-badge variant="success" class="wa-outlined">Success</wa-badge>
          <wa-badge variant="warning" class="wa-outlined">Warning</wa-badge>
          <wa-badge variant="danger" class="wa-outlined">Danger</wa-badge>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>plain</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" appearance="plain">Brand</wa-badge>
          <wa-badge variant="neutral" appearance="plain">Neutral</wa-badge>
          <wa-badge variant="success" appearance="plain">Success</wa-badge>
          <wa-badge variant="warning" appearance="plain">Warning</wa-badge>
          <wa-badge variant="danger" appearance="plain">Danger</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" class="wa-plain">Brand</wa-badge>
          <wa-badge variant="neutral" class="wa-plain">Neutral</wa-badge>
          <wa-badge variant="success" class="wa-plain">Success</wa-badge>
          <wa-badge variant="warning" class="wa-plain">Warning</wa-badge>
          <wa-badge variant="danger" class="wa-plain">Danger</wa-badge>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Button

<table>
  <thead>
    <th></th>
    <th><code>appearance=""</code></th>
    <th><code>.wa-[appearance]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>accent</code> + <code>outlined</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" appearance="accent outlined">Brand</wa-button>
          <wa-button variant="neutral" appearance="accent outlined">Neutral</wa-button>
          <wa-button variant="success" appearance="accent outlined">Success</wa-button>
          <wa-button variant="warning" appearance="accent outlined">Warning</wa-button>
          <wa-button variant="danger" appearance="accent outlined">Danger</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" class="wa-accent wa-outlined">Brand</wa-button>
          <wa-button variant="neutral" class="wa-accent wa-outlined">Neutral</wa-button>
          <wa-button variant="success" class="wa-accent wa-outlined">Success</wa-button>
          <wa-button variant="warning" class="wa-accent wa-outlined">Warning</wa-button>
          <wa-button variant="danger" class="wa-accent wa-outlined">Danger</wa-button>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>accent</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" appearance="accent">Brand</wa-button>
          <wa-button variant="neutral" appearance="accent">Neutral</wa-button>
          <wa-button variant="success" appearance="accent">Success</wa-button>
          <wa-button variant="warning" appearance="accent">Warning</wa-button>
          <wa-button variant="danger" appearance="accent">Danger</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" class="wa-accent">Brand</wa-button>
          <wa-button variant="neutral" class="wa-accent">Neutral</wa-button>
          <wa-button variant="success" class="wa-accent">Success</wa-button>
          <wa-button variant="warning" class="wa-accent">Warning</wa-button>
          <wa-button variant="danger" class="wa-accent">Danger</wa-button>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>filled</code> + <code>outlined</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" appearance="filled outlined">Brand</wa-button>
          <wa-button variant="neutral" appearance="filled outlined">Neutral</wa-button>
          <wa-button variant="success" appearance="filled outlined">Success</wa-button>
          <wa-button variant="warning" appearance="filled outlined">Warning</wa-button>
          <wa-button variant="danger" appearance="filled outlined">Danger</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" class="wa-filled wa-outlined">Brand</wa-button>
          <wa-button variant="neutral" class="wa-filled wa-outlined">Neutral</wa-button>
          <wa-button variant="success" class="wa-filled wa-outlined">Success</wa-button>
          <wa-button variant="warning" class="wa-filled wa-outlined">Warning</wa-button>
          <wa-button variant="danger" class="wa-filled wa-outlined">Danger</wa-button>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>filled</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" appearance="filled">Brand</wa-button>
          <wa-button variant="neutral" appearance="filled">Neutral</wa-button>
          <wa-button variant="success" appearance="filled">Success</wa-button>
          <wa-button variant="warning" appearance="filled">Warning</wa-button>
          <wa-button variant="danger" appearance="filled">Danger</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" class="wa-filled">Brand</wa-button>
          <wa-button variant="neutral" class="wa-filled">Neutral</wa-button>
          <wa-button variant="success" class="wa-filled">Success</wa-button>
          <wa-button variant="warning" class="wa-filled">Warning</wa-button>
          <wa-button variant="danger" class="wa-filled">Danger</wa-button>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>outlined</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" appearance="outlined">Brand</wa-button>
          <wa-button variant="neutral" appearance="outlined">Neutral</wa-button>
          <wa-button variant="success" appearance="outlined">Success</wa-button>
          <wa-button variant="warning" appearance="outlined">Warning</wa-button>
          <wa-button variant="danger" appearance="outlined">Danger</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" class="wa-outlined">Brand</wa-button>
          <wa-button variant="neutral" class="wa-outlined">Neutral</wa-button>
          <wa-button variant="success" class="wa-outlined">Success</wa-button>
          <wa-button variant="warning" class="wa-outlined">Warning</wa-button>
          <wa-button variant="danger" class="wa-outlined">Danger</wa-button>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>plain</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" appearance="plain">Brand</wa-button>
          <wa-button variant="neutral" appearance="plain">Neutral</wa-button>
          <wa-button variant="success" appearance="plain">Success</wa-button>
          <wa-button variant="warning" appearance="plain">Warning</wa-button>
          <wa-button variant="danger" appearance="plain">Danger</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" class="wa-plain">Brand</wa-button>
          <wa-button variant="neutral" class="wa-plain">Neutral</wa-button>
          <wa-button variant="success" class="wa-plain">Success</wa-button>
          <wa-button variant="warning" class="wa-plain">Warning</wa-button>
          <wa-button variant="danger" class="wa-plain">Danger</wa-button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Callout

<table>
  <thead>
    <th></th>
    <th><code>appearance=""</code></th>
    <th><code>.wa-[appearance]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>accent</code> + <code>outlined</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" class="wa-accent wa-outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" class="wa-accent wa-outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" class="wa-accent wa-outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" class="wa-accent wa-outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" class="wa-accent wa-outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>accent</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" appearance="accent">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" appearance="accent">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" appearance="accent">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" appearance="accent">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" appearance="accent">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" class="wa-accent">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" class="wa-accent">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" class="wa-accent">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" class="wa-accent">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" class="wa-accent">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>filled</code> + <code>outlined</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" class="wa-filled wa-outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" class="wa-filled wa-outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" class="wa-filled wa-outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" class="wa-filled wa-outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" class="wa-filled wa-outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>filled</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" appearance="filled">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" appearance="filled">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" appearance="filled">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" appearance="filled">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" appearance="filled">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" class="wa-filled">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" class="wa-filled">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" class="wa-filled">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" class="wa-filled">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" class="wa-filled">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>outlined</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" appearance="outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" appearance="outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" appearance="outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" appearance="outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" appearance="outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" class="wa-outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" class="wa-outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" class="wa-outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" class="wa-outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" class="wa-outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>plain</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" appearance="plain">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" appearance="plain">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" appearance="plain">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" appearance="plain">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" appearance="plain">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" class="wa-plain">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Brand
          </wa-callout>
          <wa-callout variant="neutral" class="wa-plain">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Neutral
          </wa-callout>
          <wa-callout variant="success" class="wa-plain">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Success
          </wa-callout>
          <wa-callout variant="warning" class="wa-plain">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Warning
          </wa-callout>
          <wa-callout variant="danger" class="wa-plain">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Danger
          </wa-callout>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Tag

<table>
  <thead>
    <th></th>
    <th><code>appearance=""</code></th>
    <th><code>.wa-[appearance]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>accent</code> + <code>outlined</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" appearance="accent outlined">Brand</wa-tag>
          <wa-tag variant="neutral" appearance="accent outlined">Neutral</wa-tag>
          <wa-tag variant="success" appearance="accent outlined">Success</wa-tag>
          <wa-tag variant="warning" appearance="accent outlined">Warning</wa-tag>
          <wa-tag variant="danger" appearance="accent outlined">Danger</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" class="wa-accent wa-outlined">Brand</wa-tag>
          <wa-tag variant="neutral" class="wa-accent wa-outlined">Neutral</wa-tag>
          <wa-tag variant="success" class="wa-accent wa-outlined">Success</wa-tag>
          <wa-tag variant="warning" class="wa-accent wa-outlined">Warning</wa-tag>
          <wa-tag variant="danger" class="wa-accent wa-outlined">Danger</wa-tag>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>accent</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" appearance="accent">Brand</wa-tag>
          <wa-tag variant="neutral" appearance="accent">Neutral</wa-tag>
          <wa-tag variant="success" appearance="accent">Success</wa-tag>
          <wa-tag variant="warning" appearance="accent">Warning</wa-tag>
          <wa-tag variant="danger" appearance="accent">Danger</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" class="wa-accent">Brand</wa-tag>
          <wa-tag variant="neutral" class="wa-accent">Neutral</wa-tag>
          <wa-tag variant="success" class="wa-accent">Success</wa-tag>
          <wa-tag variant="warning" class="wa-accent">Warning</wa-tag>
          <wa-tag variant="danger" class="wa-accent">Danger</wa-tag>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>filled</code> + <code>outlined</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" appearance="filled outlined">Brand</wa-tag>
          <wa-tag variant="neutral" appearance="filled outlined">Neutral</wa-tag>
          <wa-tag variant="success" appearance="filled outlined">Success</wa-tag>
          <wa-tag variant="warning" appearance="filled outlined">Warning</wa-tag>
          <wa-tag variant="danger" appearance="filled outlined">Danger</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" class="wa-filled wa-outlined">Brand</wa-tag>
          <wa-tag variant="neutral" class="wa-filled wa-outlined">Neutral</wa-tag>
          <wa-tag variant="success" class="wa-filled wa-outlined">Success</wa-tag>
          <wa-tag variant="warning" class="wa-filled wa-outlined">Warning</wa-tag>
          <wa-tag variant="danger" class="wa-filled wa-outlined">Danger</wa-tag>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>filled</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" appearance="filled">Brand</wa-tag>
          <wa-tag variant="neutral" appearance="filled">Neutral</wa-tag>
          <wa-tag variant="success" appearance="filled">Success</wa-tag>
          <wa-tag variant="warning" appearance="filled">Warning</wa-tag>
          <wa-tag variant="danger" appearance="filled">Danger</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" class="wa-filled">Brand</wa-tag>
          <wa-tag variant="neutral" class="wa-filled">Neutral</wa-tag>
          <wa-tag variant="success" class="wa-filled">Success</wa-tag>
          <wa-tag variant="warning" class="wa-filled">Warning</wa-tag>
          <wa-tag variant="danger" class="wa-filled">Danger</wa-tag>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>outlined</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" appearance="outlined">Brand</wa-tag>
          <wa-tag variant="neutral" appearance="outlined">Neutral</wa-tag>
          <wa-tag variant="success" appearance="outlined">Success</wa-tag>
          <wa-tag variant="warning" appearance="outlined">Warning</wa-tag>
          <wa-tag variant="danger" appearance="outlined">Danger</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" class="wa-outlined">Brand</wa-tag>
          <wa-tag variant="neutral" class="wa-outlined">Neutral</wa-tag>
          <wa-tag variant="success" class="wa-outlined">Success</wa-tag>
          <wa-tag variant="warning" class="wa-outlined">Warning</wa-tag>
          <wa-tag variant="danger" class="wa-outlined">Danger</wa-tag>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>plain</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" appearance="plain">Brand</wa-tag>
          <wa-tag variant="neutral" appearance="plain">Neutral</wa-tag>
          <wa-tag variant="success" appearance="plain">Success</wa-tag>
          <wa-tag variant="warning" appearance="plain">Warning</wa-tag>
          <wa-tag variant="danger" appearance="plain">Danger</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" class="wa-plain">Brand</wa-tag>
          <wa-tag variant="neutral" class="wa-plain">Neutral</wa-tag>
          <wa-tag variant="success" class="wa-plain">Success</wa-tag>
          <wa-tag variant="warning" class="wa-plain">Warning</wa-tag>
          <wa-tag variant="danger" class="wa-plain">Danger</wa-tag>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Form Controls

<table>
  <thead>
    <th></th>
    <th><code>appearance=""</code></th>
    <th><code>.wa-[appearance]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>outlined</code></th>
      <td>
        <div class="wa-stack">
          <wa-input appearance="outlined" placeholder="Input"></wa-input>
          <wa-select appearance="outlined" placeholder="Select">
            <wa-option value="1">Option</wa-option>
          </wa-select>
          <wa-textarea appearance="outlined" placeholder="Textarea"></wa-textarea>
        </div>
      </td>
      <td>
        <div class="wa-stack">
          <wa-input class="wa-outlined" placeholder="Input"></wa-input>
          <wa-select class="wa-outlined" placeholder="Select">
            <wa-option value="1">Option</wa-option>
          </wa-select>
          <wa-textarea class="wa-outlined" placeholder="Textarea"></wa-textarea>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>filled</code></th>
      <td>
        <div class="wa-stack">
          <wa-input appearance="filled" placeholder="Input"></wa-input>
          <wa-select appearance="filled" placeholder="Select">
            <wa-option value="1">Option</wa-option>
          </wa-select>
          <wa-textarea appearance="filled" placeholder="Textarea"></wa-textarea>
        </div>
      </td>
      <td>
        <div class="wa-stack">
          <wa-input class="wa-filled" placeholder="Input"></wa-input>
          <wa-select class="wa-filled" placeholder="Select">
            <wa-option value="1">Option</wa-option>
          </wa-select>
          <wa-textarea class="wa-filled" placeholder="Textarea"></wa-textarea>
        </div>
      </td>
    </tr>
  </tbody>
</table>

</wa-tab-panel>

<wa-tab-panel name="alignment">

## Alignment

Alignment tests reveal the top boundary, vertical center, and bottom boundary of components. These help to evaluate how well components align with one another when arranged horizontally.

```html {.example}
<style>
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
<div class="wa-stack">
  <div class="alignment">
    <wa-switch size="small">Switch</wa-switch>
    <wa-checkbox size="small">Checkbox</wa-checkbox>
    <wa-radio value="1" size="small">Radio</wa-radio>
  </div>
  <div class="alignment">
    <wa-switch>Switch</wa-switch>
    <wa-checkbox>Checkbox</wa-checkbox>
    <wa-radio value="1">Radio</wa-radio>
  </div>
  <div class="alignment">
    <wa-switch size="large">Switch</wa-switch>
    <wa-checkbox size="large">Checkbox</wa-checkbox>
    <wa-radio value="1" size="large">Radio</wa-radio>
  </div>
  <div class="alignment">
    <wa-input size="small"></wa-input>
    <wa-select size="small" value="1" multiple>
      <wa-option value="1">Option</wa-option>
    </wa-select>
    <wa-color-picker size="small"></wa-color-picker>
    <wa-button size="small">Button</wa-button>
  </div>
  <div class="alignment">
    <wa-input size="medium"></wa-input>
    <wa-select size="medium" value="1" multiple>
      <wa-option value="1">Option</wa-option>
    </wa-select>
    <wa-color-picker size="medium"></wa-color-picker>
    <wa-button size="medium">Button</wa-button>
  </div>
  <div class="alignment">
    <wa-input size="large"></wa-input>
    <wa-select size="large" value="1" multiple>
      <wa-option value="1">Option</wa-option>
    </wa-select>
    <wa-color-picker size="large"></wa-color-picker>
    <wa-button size="large">Button</wa-button>
  </div>
  <div class="alignment">
    <wa-badge>Badge</wa-badge>
    <wa-avatar></wa-avatar>
    <wa-rating></wa-rating>
    <wa-slider></wa-slider>
    <wa-icon-button name="gear" label="Settings"></wa-icon-button>
    <wa-progress-bar value="50" style="width: 8rem;"></wa-progress-bar>
    <wa-spinner></wa-spinner>
  </div>
  <div class="alignment">
    <wa-input label="Input" hint="Hint"></wa-input>
    <wa-select label="Select" value="1" multiple hint="Hint">
      <wa-option value="1">Option</wa-option>
    </wa-select>
    <wa-color-picker label="Color" hint="Hint"></wa-color-picker>
  </div>
</div>
```
  
</wa-tab-panel>

<wa-tab-panel name="color">

## Color

Color tests ensure that both the `variant` attribute and `.wa-[variant]` classes have identical results for components that support them. Developers should be able to use both of these interchangeably to give the component the intended semantic color.

### Badge

<table>
  <thead>
    <th></th>
    <th><code>variant=""</code></th>
    <th><code>.wa-[variant]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>brand</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="brand" appearance="accent outlined">A+O</wa-badge>
          <wa-badge variant="brand" appearance="accent">Accent</wa-badge>
          <wa-badge variant="brand" appearance="filled outlined">F+O</wa-badge>
          <wa-badge variant="brand" appearance="filled">Filled</wa-badge>
          <wa-badge variant="brand" appearance="outlined">Outlined</wa-badge>
          <wa-badge variant="brand" appearance="plain">Plain</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge class="wa-brand" appearance="accent outlined">A+O</wa-badge>
          <wa-badge class="wa-brand" appearance="accent">Accent</wa-badge>
          <wa-badge class="wa-brand" appearance="filled outlined">F+O</wa-badge>
          <wa-badge class="wa-brand" appearance="filled">Filled</wa-badge>
          <wa-badge class="wa-brand" appearance="outlined">Outlined</wa-badge>
          <wa-badge class="wa-brand" appearance="plain">Plain</wa-badge>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>neutral</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="neutral" appearance="accent outlined">A+O</wa-badge>
          <wa-badge variant="neutral" appearance="accent">Accent</wa-badge>
          <wa-badge variant="neutral" appearance="filled outlined">F+O</wa-badge>
          <wa-badge variant="neutral" appearance="filled">Filled</wa-badge>
          <wa-badge variant="neutral" appearance="outlined">Outlined</wa-badge>
          <wa-badge variant="neutral" appearance="plain">Plain</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge class="wa-neutral" appearance="accent outlined">A+O</wa-badge>
          <wa-badge class="wa-neutral" appearance="accent">Accent</wa-badge>
          <wa-badge class="wa-neutral" appearance="filled outlined">F+O</wa-badge>
          <wa-badge class="wa-neutral" appearance="filled">Filled</wa-badge>
          <wa-badge class="wa-neutral" appearance="outlined">Outlined</wa-badge>
          <wa-badge class="wa-neutral" appearance="plain">Plain</wa-badge>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>success</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="success" appearance="accent outlined">A+O</wa-badge>
          <wa-badge variant="success" appearance="accent">Accent</wa-badge>
          <wa-badge variant="success" appearance="filled outlined">F+O</wa-badge>
          <wa-badge variant="success" appearance="filled">Filled</wa-badge>
          <wa-badge variant="success" appearance="outlined">Outlined</wa-badge>
          <wa-badge variant="success" appearance="plain">Plain</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge class="wa-success" appearance="accent outlined">A+O</wa-badge>
          <wa-badge class="wa-success" appearance="accent">Accent</wa-badge>
          <wa-badge class="wa-success" appearance="filled outlined">F+O</wa-badge>
          <wa-badge class="wa-success" appearance="filled">Filled</wa-badge>
          <wa-badge class="wa-success" appearance="outlined">Outlined</wa-badge>
          <wa-badge class="wa-success" appearance="plain">Plain</wa-badge>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>warning</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="warning" appearance="accent outlined">A+O</wa-badge>
          <wa-badge variant="warning" appearance="accent">Accent</wa-badge>
          <wa-badge variant="warning" appearance="filled outlined">F+O</wa-badge>
          <wa-badge variant="warning" appearance="filled">Filled</wa-badge>
          <wa-badge variant="warning" appearance="outlined">Outlined</wa-badge>
          <wa-badge variant="warning" appearance="plain">Plain</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge class="wa-warning" appearance="accent outlined">A+O</wa-badge>
          <wa-badge class="wa-warning" appearance="accent">Accent</wa-badge>
          <wa-badge class="wa-warning" appearance="filled outlined">F+O</wa-badge>
          <wa-badge class="wa-warning" appearance="filled">Filled</wa-badge>
          <wa-badge class="wa-warning" appearance="outlined">Outlined</wa-badge>
          <wa-badge class="wa-warning" appearance="plain">Plain</wa-badge>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>danger</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge variant="danger" appearance="accent outlined">A+O</wa-badge>
          <wa-badge variant="danger" appearance="accent">Accent</wa-badge>
          <wa-badge variant="danger" appearance="filled outlined">F+O</wa-badge>
          <wa-badge variant="danger" appearance="filled">Filled</wa-badge>
          <wa-badge variant="danger" appearance="outlined">Outlined</wa-badge>
          <wa-badge variant="danger" appearance="plain">Plain</wa-badge>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-badge class="wa-danger" appearance="accent outlined">A+O</wa-badge>
          <wa-badge class="wa-danger" appearance="accent">Accent</wa-badge>
          <wa-badge class="wa-danger" appearance="filled outlined">F+O</wa-badge>
          <wa-badge class="wa-danger" appearance="filled">Filled</wa-badge>
          <wa-badge class="wa-danger" appearance="outlined">Outlined</wa-badge>
          <wa-badge class="wa-danger" appearance="plain">Plain</wa-badge>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Button

<table>
  <thead>
    <th></th>
    <th><code>variant=""</code></th>
    <th><code>.wa-[variant]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>brand</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="brand" appearance="accent outlined">A+O</wa-button>
          <wa-button variant="brand" appearance="accent">Accent</wa-button>
          <wa-button variant="brand" appearance="filled outlined">F+O</wa-button>
          <wa-button variant="brand" appearance="filled">Filled</wa-button>
          <wa-button variant="brand" appearance="outlined">Outlined</wa-button>
          <wa-button variant="brand" appearance="plain">Plain</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button class="wa-brand" appearance="accent outlined">A+O</wa-button>
          <wa-button class="wa-brand" appearance="accent">Accent</wa-button>
          <wa-button class="wa-brand" appearance="filled outlined">F+O</wa-button>
          <wa-button class="wa-brand" appearance="filled">Filled</wa-button>
          <wa-button class="wa-brand" appearance="outlined">Outlined</wa-button>
          <wa-button class="wa-brand" appearance="plain">Plain</wa-button>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>neutral</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="neutral" appearance="accent outlined">A+O</wa-button>
          <wa-button variant="neutral" appearance="accent">Accent</wa-button>
          <wa-button variant="neutral" appearance="filled outlined">F+O</wa-button>
          <wa-button variant="neutral" appearance="filled">Filled</wa-button>
          <wa-button variant="neutral" appearance="outlined">Outlined</wa-button>
          <wa-button variant="neutral" appearance="plain">Plain</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button class="wa-neutral" appearance="accent outlined">A+O</wa-button>
          <wa-button class="wa-neutral" appearance="accent">Accent</wa-button>
          <wa-button class="wa-neutral" appearance="filled outlined">F+O</wa-button>
          <wa-button class="wa-neutral" appearance="filled">Filled</wa-button>
          <wa-button class="wa-neutral" appearance="outlined">Outlined</wa-button>
          <wa-button class="wa-neutral" appearance="plain">Plain</wa-button>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>success</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="success" appearance="accent outlined">A+O</wa-button>
          <wa-button variant="success" appearance="accent">Accent</wa-button>
          <wa-button variant="success" appearance="filled outlined">F+O</wa-button>
          <wa-button variant="success" appearance="filled">Filled</wa-button>
          <wa-button variant="success" appearance="outlined">Outlined</wa-button>
          <wa-button variant="success" appearance="plain">Plain</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button class="wa-success" appearance="accent outlined">A+O</wa-button>
          <wa-button class="wa-success" appearance="accent">Accent</wa-button>
          <wa-button class="wa-success" appearance="filled outlined">F+O</wa-button>
          <wa-button class="wa-success" appearance="filled">Filled</wa-button>
          <wa-button class="wa-success" appearance="outlined">Outlined</wa-button>
          <wa-button class="wa-success" appearance="plain">Plain</wa-button>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>warning</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="warning" appearance="accent outlined">A+O</wa-button>
          <wa-button variant="warning" appearance="accent">Accent</wa-button>
          <wa-button variant="warning" appearance="filled outlined">F+O</wa-button>
          <wa-button variant="warning" appearance="filled">Filled</wa-button>
          <wa-button variant="warning" appearance="outlined">Outlined</wa-button>
          <wa-button variant="warning" appearance="plain">Plain</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button class="wa-warning" appearance="accent outlined">A+O</wa-button>
          <wa-button class="wa-warning" appearance="accent">Accent</wa-button>
          <wa-button class="wa-warning" appearance="filled outlined">F+O</wa-button>
          <wa-button class="wa-warning" appearance="filled">Filled</wa-button>
          <wa-button class="wa-warning" appearance="outlined">Outlined</wa-button>
          <wa-button class="wa-warning" appearance="plain">Plain</wa-button>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>danger</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button variant="danger" appearance="accent outlined">A+O</wa-button>
          <wa-button variant="danger" appearance="accent">Accent</wa-button>
          <wa-button variant="danger" appearance="filled outlined">F+O</wa-button>
          <wa-button variant="danger" appearance="filled">Filled</wa-button>
          <wa-button variant="danger" appearance="outlined">Outlined</wa-button>
          <wa-button variant="danger" appearance="plain">Plain</wa-button>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-button class="wa-danger" appearance="accent outlined">A+O</wa-button>
          <wa-button class="wa-danger" appearance="accent">Accent</wa-button>
          <wa-button class="wa-danger" appearance="filled outlined">F+O</wa-button>
          <wa-button class="wa-danger" appearance="filled">Filled</wa-button>
          <wa-button class="wa-danger" appearance="outlined">Outlined</wa-button>
          <wa-button class="wa-danger" appearance="plain">Plain</wa-button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Callout

<table>
  <thead>
    <th></th>
    <th><code>variant=""</code></th>
    <th><code>.wa-[variant]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>brand</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="brand" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            A+O
          </wa-callout>
          <wa-callout variant="brand" appearance="accent">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Accent
          </wa-callout>
          <wa-callout variant="brand" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            F+O
          </wa-callout>
          <wa-callout variant="brand" appearance="filled">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Filled
          </wa-callout>
          <wa-callout variant="brand" appearance="outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Outlined
          </wa-callout>
          <wa-callout variant="brand" appearance="plain">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Plain
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout class="wa-brand" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            A+O
          </wa-callout>
          <wa-callout class="wa-brand" appearance="accent">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Accent
          </wa-callout>
          <wa-callout class="wa-brand" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            F+O
          </wa-callout>
          <wa-callout class="wa-brand" appearance="filled">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Filled
          </wa-callout>
          <wa-callout class="wa-brand" appearance="outlined">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Outlined
          </wa-callout>
          <wa-callout class="wa-brand" appearance="plain">
            <wa-icon slot="icon" name="circle-star"></wa-icon>
            Plain
          </wa-callout>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>neutral</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="neutral" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            A+O
          </wa-callout>
          <wa-callout variant="neutral" appearance="accent">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Accent
          </wa-callout>
          <wa-callout variant="neutral" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            F+O
          </wa-callout>
          <wa-callout variant="neutral" appearance="filled">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Filled
          </wa-callout>
          <wa-callout variant="neutral" appearance="outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Outlined
          </wa-callout>
          <wa-callout variant="neutral" appearance="plain">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Plain
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout class="wa-neutral" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            A+O
          </wa-callout>
          <wa-callout class="wa-neutral" appearance="accent">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Accent
          </wa-callout>
          <wa-callout class="wa-neutral" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            F+O
          </wa-callout>
          <wa-callout class="wa-neutral" appearance="filled">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Filled
          </wa-callout>
          <wa-callout class="wa-neutral" appearance="outlined">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Outlined
          </wa-callout>
          <wa-callout class="wa-neutral" appearance="plain">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Plain
          </wa-callout>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>success</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="success" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            A+O
          </wa-callout>
          <wa-callout variant="success" appearance="accent">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Accent
          </wa-callout>
          <wa-callout variant="success" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            F+O
          </wa-callout>
          <wa-callout variant="success" appearance="filled">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Filled
          </wa-callout>
          <wa-callout variant="success" appearance="outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Outlined
          </wa-callout>
          <wa-callout variant="success" appearance="plain">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Plain
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout class="wa-success" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            A+O
          </wa-callout>
          <wa-callout class="wa-success" appearance="accent">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Accent
          </wa-callout>
          <wa-callout class="wa-success" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            F+O
          </wa-callout>
          <wa-callout class="wa-success" appearance="filled">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Filled
          </wa-callout>
          <wa-callout class="wa-success" appearance="outlined">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Outlined
          </wa-callout>
          <wa-callout class="wa-success" appearance="plain">
            <wa-icon slot="icon" name="circle-check"></wa-icon>
            Plain
          </wa-callout>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>warning</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="warning" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            A+O
          </wa-callout>
          <wa-callout variant="warning" appearance="accent">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Accent
          </wa-callout>
          <wa-callout variant="warning" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            F+O
          </wa-callout>
          <wa-callout variant="warning" appearance="filled">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Filled
          </wa-callout>
          <wa-callout variant="warning" appearance="outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Outlined
          </wa-callout>
          <wa-callout variant="warning" appearance="plain">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Plain
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout class="wa-warning" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            A+O
          </wa-callout>
          <wa-callout class="wa-warning" appearance="accent">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Accent
          </wa-callout>
          <wa-callout class="wa-warning" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            F+O
          </wa-callout>
          <wa-callout class="wa-warning" appearance="filled">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Filled
          </wa-callout>
          <wa-callout class="wa-warning" appearance="outlined">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Outlined
          </wa-callout>
          <wa-callout class="wa-warning" appearance="plain">
            <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
            Plain
          </wa-callout>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>danger</code></th>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout variant="danger" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            A+O
          </wa-callout>
          <wa-callout variant="danger" appearance="accent">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Accent
          </wa-callout>
          <wa-callout variant="danger" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            F+O
          </wa-callout>
          <wa-callout variant="danger" appearance="filled">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Filled
          </wa-callout>
          <wa-callout variant="danger" appearance="outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Outlined
          </wa-callout>
          <wa-callout variant="danger" appearance="plain">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Plain
          </wa-callout>
        </div>
      </td>
      <td>
        <div class="wa-grid wa-gap-2xs">
          <wa-callout class="wa-danger" appearance="accent outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            A+O
          </wa-callout>
          <wa-callout class="wa-danger" appearance="accent">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Accent
          </wa-callout>
          <wa-callout class="wa-danger" appearance="filled outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            F+O
          </wa-callout>
          <wa-callout class="wa-danger" appearance="filled">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Filled
          </wa-callout>
          <wa-callout class="wa-danger" appearance="outlined">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Outlined
          </wa-callout>
          <wa-callout class="wa-danger" appearance="plain">
            <wa-icon slot="icon" name="circle-xmark"></wa-icon>
            Plain
          </wa-callout>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### <span>Icon</span>

<table>
  <thead>
    <th></th>
    <th><code>variant=""</code></th>
    <th><code>.wa-[variant]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>brand</code></th>
      <td>
        <wa-icon variant="brand" name="circle-star"></wa-icon>
        <wa-icon-button variant="brand" name="circle-star"></wa-icon-button>
      </td>
      <td>
        <wa-icon class="wa-brand" name="circle-star"></wa-icon>
        <wa-icon-button class="wa-brand" name="circle-star"></wa-icon-button>
      </td>
    </tr>
    <tr>
      <th><code>neutral</code></th>
      <td>
        <wa-icon variant="neutral" name="circle-info"></wa-icon>
        <wa-icon-button variant="neutral" name="circle-info"></wa-icon-button>
      </td>
      <td>
        <wa-icon class="wa-neutral" name="circle-info"></wa-icon>
        <wa-icon-button class="wa-neutral" name="circle-info"></wa-icon-button>
      </td>
    </tr>
    <tr>
      <th><code>success</code></th>
      <td>
        <wa-icon variant="success" name="circle-check"></wa-icon>
        <wa-icon-button variant="success" name="circle-check"></wa-icon-button>
      </td>
      <td>
        <wa-icon class="wa-success" name="circle-check"></wa-icon>
        <wa-icon-button class="wa-success" name="circle-check"></wa-icon-button>
      </td>
    </tr>
    <tr>
      <th><code>warning</code></th>
      <td>
        <wa-icon variant="warning" name="circle-exclamation"></wa-icon>
        <wa-icon-button variant="warning" name="circle-exclamation"></wa-icon-button>
      </td>
      <td>
        <wa-icon class="wa-warning" name="circle-exclamation"></wa-icon>
        <wa-icon-button class="wa-warning" name="circle-exclamation"></wa-icon-button>
      </td>
    </tr>
    <tr>
      <th><code>danger</code></th>
      <td>
        <wa-icon variant="danger" name="circle-xmark"></wa-icon>
        <wa-icon-button variant="danger" name="circle-xmark"></wa-icon-button>
      </td>
      <td>
        <wa-icon class="wa-danger" name="circle-xmark"></wa-icon>
        <wa-icon-button class="wa-danger" name="circle-xmark"></wa-icon-button>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Tag

<table>
  <thead>
    <th></th>
    <th><code>variant=""</code></th>
    <th><code>.wa-[variant]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>brand</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="brand" appearance="accent outlined">A+O</wa-tag>
          <wa-tag variant="brand" appearance="accent">Accent</wa-tag>
          <wa-tag variant="brand" appearance="filled outlined">F+O</wa-tag>
          <wa-tag variant="brand" appearance="filled">Filled</wa-tag>
          <wa-tag variant="brand" appearance="outlined">Outlined</wa-tag>
          <wa-tag variant="brand" appearance="plain">Plain</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag class="wa-brand" appearance="accent outlined">A+O</wa-tag>
          <wa-tag class="wa-brand" appearance="accent">Accent</wa-tag>
          <wa-tag class="wa-brand" appearance="filled outlined">F+O</wa-tag>
          <wa-tag class="wa-brand" appearance="filled">Filled</wa-tag>
          <wa-tag class="wa-brand" appearance="outlined">Outlined</wa-tag>
          <wa-tag class="wa-brand" appearance="plain">Plain</wa-tag>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>neutral</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="neutral" appearance="accent outlined">A+O</wa-tag>
          <wa-tag variant="neutral" appearance="accent">Accent</wa-tag>
          <wa-tag variant="neutral" appearance="filled outlined">F+O</wa-tag>
          <wa-tag variant="neutral" appearance="filled">Filled</wa-tag>
          <wa-tag variant="neutral" appearance="outlined">Outlined</wa-tag>
          <wa-tag variant="neutral" appearance="plain">Plain</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag class="wa-neutral" appearance="accent outlined">A+O</wa-tag>
          <wa-tag class="wa-neutral" appearance="accent">Accent</wa-tag>
          <wa-tag class="wa-neutral" appearance="filled outlined">F+O</wa-tag>
          <wa-tag class="wa-neutral" appearance="filled">Filled</wa-tag>
          <wa-tag class="wa-neutral" appearance="outlined">Outlined</wa-tag>
          <wa-tag class="wa-neutral" appearance="plain">Plain</wa-tag>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>success</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="success" appearance="accent outlined">A+O</wa-tag>
          <wa-tag variant="success" appearance="accent">Accent</wa-tag>
          <wa-tag variant="success" appearance="filled outlined">F+O</wa-tag>
          <wa-tag variant="success" appearance="filled">Filled</wa-tag>
          <wa-tag variant="success" appearance="outlined">Outlined</wa-tag>
          <wa-tag variant="success" appearance="plain">Plain</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag class="wa-success" appearance="accent outlined">A+O</wa-tag>
          <wa-tag class="wa-success" appearance="accent">Accent</wa-tag>
          <wa-tag class="wa-success" appearance="filled outlined">F+O</wa-tag>
          <wa-tag class="wa-success" appearance="filled">Filled</wa-tag>
          <wa-tag class="wa-success" appearance="outlined">Outlined</wa-tag>
          <wa-tag class="wa-success" appearance="plain">Plain</wa-tag>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>warning</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="warning" appearance="accent outlined">A+O</wa-tag>
          <wa-tag variant="warning" appearance="accent">Accent</wa-tag>
          <wa-tag variant="warning" appearance="filled outlined">F+O</wa-tag>
          <wa-tag variant="warning" appearance="filled">Filled</wa-tag>
          <wa-tag variant="warning" appearance="outlined">Outlined</wa-tag>
          <wa-tag variant="warning" appearance="plain">Plain</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag class="wa-warning" appearance="accent outlined">A+O</wa-tag>
          <wa-tag class="wa-warning" appearance="accent">Accent</wa-tag>
          <wa-tag class="wa-warning" appearance="filled outlined">F+O</wa-tag>
          <wa-tag class="wa-warning" appearance="filled">Filled</wa-tag>
          <wa-tag class="wa-warning" appearance="outlined">Outlined</wa-tag>
          <wa-tag class="wa-warning" appearance="plain">Plain</wa-tag>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>danger</code></th>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag variant="danger" appearance="accent outlined">A+O</wa-tag>
          <wa-tag variant="danger" appearance="accent">Accent</wa-tag>
          <wa-tag variant="danger" appearance="filled outlined">F+O</wa-tag>
          <wa-tag variant="danger" appearance="filled">Filled</wa-tag>
          <wa-tag variant="danger" appearance="outlined">Outlined</wa-tag>
          <wa-tag variant="danger" appearance="plain">Plain</wa-tag>
        </div>
      </td>
      <td>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag class="wa-danger" appearance="accent outlined">A+O</wa-tag>
          <wa-tag class="wa-danger" appearance="accent">Accent</wa-tag>
          <wa-tag class="wa-danger" appearance="filled outlined">F+O</wa-tag>
          <wa-tag class="wa-danger" appearance="filled">Filled</wa-tag>
          <wa-tag class="wa-danger" appearance="outlined">Outlined</wa-tag>
          <wa-tag class="wa-danger" appearance="plain">Plain</wa-tag>
        </div>
      </td>
    </tr>
  </tbody>
</table>

</wa-tab-panel>

<wa-tab-panel name="harmony">

## Harmony

Harmony tests show how related components look together. These can help validate design choices or reveal where design intervention is needed to get a consistent, harmonious look and feel.

### Form Controls

```html {.example}
<form class="wa-stack">
  <wa-input label="Input" placeholder="Placeholder"></wa-input>
  <wa-select label="Select" value="option-1">
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
    <wa-option value="option-3">Option 3</wa-option>
  </wa-select>
  <wa-textarea label="Textarea" placeholder="Placeholder"></wa-textarea>
  <wa-radio-group label="Radio group" name="a" value="1">
    <wa-radio value="1">Option 1</wa-radio>
    <wa-radio value="2">Option 2</wa-radio>
    <wa-radio value="3">Option 3</wa-radio>
  </wa-radio-group>
  <wa-checkbox>Checkbox</wa-checkbox>
  <wa-switch>Switch</wa-switch>
  <wa-slider label="Range"></wa-slider>
  <wa-button>Button</wa-button>
</form>
```

### Progress
```html {.example}
<div class="wa-stack">
  <wa-progress-bar value="50" max="100"></wa-progress-bar>
  <wa-progress-ring value="50" max="100"></wa-progress-ring>
  <wa-spinner></wa-spinner>
</div>
```

</wa-tab-panel>

<wa-tab-panel name="native">

## Native Styles

Native styles tests ensure that supported native elements and component utilities look the same as their Web Awesome component counterparts. Native elements and component utilities may also support the same [appearance](/docs/utilities/appearance/), [color](/docs/utilities/color/), and [size](/docs/utilities/size/) utilities as components.

### Button

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-button&gt;</code></th>
    <th><code>&lt;button&gt;</code></th>
    <th><code>.wa-button</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-button>Button</wa-button>
      </td>
      <td>
        <button>Button</button>
      </td>
      <td>
        <div class="wa-button">Button</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-brand</code></th>
      <td>
        <wa-button class="wa-brand">Brand</wa-button>
      </td>
      <td>
        <button class="wa-brand">Brand</button>
      </td>
      <td>
        <div class="wa-button wa-brand">Brand</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-neutral</code></th>
      <td>
        <wa-button class="wa-neutral">Neutral</wa-button>
      </td>
      <td>
        <button class="wa-neutral">Neutral</button>
      </td>
      <td>
        <div class="wa-button wa-neutral">Neutral</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-success</code></th>
      <td>
        <wa-button class="wa-success">Success</wa-button>
      </td>
      <td>
        <button class="wa-success">Success</button>
      </td>
      <td>
        <div class="wa-button wa-success">Success</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-warning</code></th>
      <td>
        <wa-button class="wa-warning">Warning</wa-button>
      </td>
      <td>
        <button class="wa-warning">Warning</button>
      </td>
      <td>
        <div class="wa-button wa-warning">Warning</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-danger</code></th>
      <td>
        <wa-button class="wa-danger">Danger</wa-button>
      </td>
      <td>
        <button class="wa-danger">Danger</button>
      </td>
      <td>
        <div class="wa-button wa-danger">Danger</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-accent</code></th>
      <td>
        <wa-button class="wa-accent">Accent</wa-button>
      </td>
      <td>
        <button class="wa-accent">Accent</button>
      </td>
      <td>
        <div class="wa-button wa-accent">Accent</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-filled</code></th>
      <td>
        <wa-button class="wa-filled">Filled</wa-button>
      </td>
      <td>
        <button class="wa-filled">Filled</button>
      </td>
      <td>
        <div class="wa-button wa-filled">Filled</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-outlined</code></th>
      <td>
        <wa-button class="wa-outlined">Outlined</wa-button>
      </td>
      <td>
        <button class="wa-outlined">Outlined</button>
      </td>
      <td>
        <div class="wa-button wa-outlined">Outlined</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-plain</code></th>
      <td>
        <wa-button class="wa-plain">Plain</wa-button>
      </td>
      <td>
        <button class="wa-plain">Plain</button>
      </td>
      <td>
        <div class="wa-button wa-plain">Plain</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-s</code></th>
      <td>
        <wa-button class="wa-size-s">Small</wa-button>
      </td>
      <td>
        <button class="wa-size-s">Small</button>
      </td>
      <td>
        <div class="wa-button wa-size-s">Small</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-m</code></th>
      <td>
        <wa-button class="wa-size-m">Medium</wa-button>
      </td>
      <td>
        <button class="wa-size-m">Medium</button>
      </td>
      <td>
        <div class="wa-button wa-size-m">Medium</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-l</code></th>
      <td>
        <wa-button class="wa-size-l">Large</wa-button>
      </td>
      <td>
        <button class="wa-size-l">Large</button>
      </td>
      <td>
        <div class="wa-button wa-size-l">Large</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-pill</code></th>
      <td>
        <wa-button class="wa-pill">Pill</wa-button>
      </td>
      <td>
        <button class="wa-pill">Pill</button>
      </td>
      <td>
        <div class="wa-button wa-pill">Pill</div>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Callout

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-callout&gt;</code></th>
    <th><code>.wa-callout</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-callout>Callout</wa-callout>
      </td>
      <td>
        <div class="wa-callout">Callout</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-brand</code></th>
      <td>
        <wa-callout class="wa-brand">Brand</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-brand">Brand</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-neutral</code></th>
      <td>
        <wa-callout class="wa-neutral">Neutral</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-neutral">Neutral</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-success</code></th>
      <td>
        <wa-callout class="wa-success">Success</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-success">Success</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-warning</code></th>
      <td>
        <wa-callout class="wa-warning">Warning</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-warning">Warning</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-danger</code></th>
      <td>
        <wa-callout class="wa-danger">Danger</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-danger">Danger</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-accent</code></th>
      <td>
        <wa-callout class="wa-accent">Accent</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-accent">Accent</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-filled</code></th>
      <td>
        <wa-callout class="wa-filled">Filled</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-filled">Filled</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-outlined</code></th>
      <td>
        <wa-callout class="wa-outlined">Outlined</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-outlined">Outlined</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-plain</code></th>
      <td>
        <wa-callout class="wa-plain">Plain</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-plain">Plain</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-s</code></th>
      <td>
        <wa-callout class="wa-size-s">Small</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-size-s">Small</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-m</code></th>
      <td>
        <wa-callout class="wa-size-m">Medium</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-size-m">Medium</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-l</code></th>
      <td>
        <wa-callout class="wa-size-l">Large</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-size-l">Large</div>
      </td>
    </tr>
    <tr>
      <th><code>.wa-pill</code></th>
      <td>
        <wa-callout class="wa-pill">Pill</wa-callout>
      </td>
      <td>
        <div class="wa-callout wa-pill">Pill</div>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Checkbox

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-checkbox&gt;</code></th>
    <th><code>&lt;input type="checkbox"&gt;</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-checkbox>Checkbox</wa-checkbox>
      </td>
      <td>
        <label><input type="checkbox"></input> Checkbox</label>
      </td>
    </tr>
    <tr>
      <th><code>checked</code></th>
      <td>
        <wa-checkbox checked>Checkbox</wa-checkbox>
      </td>
      <td>
        <label><input type="checkbox" checked></input> Checkbox</label>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Color Picker

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-color-picker&gt;</code></th>
    <th><code>&lt;input type="color"&gt;</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-color-picker label="Color Picker" value="#ffa07a"></wa-color-picker>
      </td>
      <td>
        <label>Color Picker <input type="color" value="#ffa07a"></input></label>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Details

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-details&gt;</code></th>
    <th><code>&lt;details&gt;</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-details summary="Summary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </wa-details>
      </td>
      <td>
        <details>
          <summary>Summary</summary>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </details>
      </td>
    </tr>
    <tr>
      <th><code>dir="rtl"</code></th>
      <td>
        <wa-details summary="تبديلني" lang="ar" dir="rtl">
          استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن
        </wa-details>
      </td>
      <td>
        <details lang="ar" dir="rtl">
          <summary>تبديلني</summary>
          <p>استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن</p>
        </details>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Input

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-input&gt;</code></th>
    <th><code>&lt;input&gt;</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-input label="Input" placeholder="Placeholder"></wa-input>
      </td>
      <td>
        <label>Input <input type="text" placeholder="Placeholder"></input></label>
      </td>
    </tr>
    <tr>
      <th><code>type="password"</code></th>
      <td>
        <wa-input label="Input (password)" type="password"></wa-input>
      </td>
      <td>
        <label>Input (password) <input type="password"></input></label>
      </td>
    </tr>
    <tr>
      <th><code>type="date"</code></th>
      <td>
        <wa-input label="Input (date)" type="date"></wa-input>
      </td>
      <td>
        <label>Input (date) <input type="date"></input></label>
      </td>
    </tr>
    <tr>
      <th><code>type="time"</code></th>
      <td>
        <wa-input label="Input (time)" type="time"></wa-input>
      </td>
      <td>
        <label>Input (time) <input type="time"></input></label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-filled</code></th>
      <td>
        <wa-input label="Input (filled)" placeholder="Placeholder" class="wa-filled"></wa-input>
      </td>
      <td>
        <label>Input (filled) <input type="text" placeholder="Placeholder" class="wa-filled"></input></label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-s</code></th>
      <td>
        <wa-input label="Input (small)" placeholder="Placeholder" class="wa-size-s"></wa-input>
      </td>
      <td>
        <label class="wa-size-s">Input (small) <input type="text" placeholder="Placeholder"></input></label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-m</code></th>
      <td>
        <wa-input label="Input (medium)" placeholder="Placeholder" class="wa-size-m"></wa-input>
      </td>
      <td>
        <label class="wa-size-m">Input (medium) <input type="text" placeholder="Placeholder"></input></label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-l</code></th>
      <td>
        <wa-input label="Input (large)" placeholder="Placeholder" class="wa-size-l"></wa-input>
      </td>
      <td>
        <label class="wa-size-l">Input (large) <input type="text" placeholder="Placeholder"></input></label>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Progress Bar

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-progress-bar&gt;</code></th>
    <th><code>&lt;progress&gt;</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-progress-bar value="50" max="100"></wa-progress-bar>
      </td>
      <td>
        <progress value="50" max="100"></progress>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Radio

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-radio&gt;</code></th>
    <th><code>&lt;input type="radio"&gt;</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-radio>Radio</wa-radio>
      </td>
      <td>
        <label><input type="radio"></input> Radio</label>
      </td>
    </tr>
    <tr>
      <th><code>checked</code></th>
      <td>
        <wa-radio-group value="1">
          <wa-radio value="1">Radio</wa-radio>
        </wa-radio-group>
      </td>
      <td>
        <label><input type="radio" checked></input> Radio</label>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Select

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-select&gt;</code></th>
    <th><code>&lt;select&gt;</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-select label="Select" value="1">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
      <td>
        <label>Select 
          <select value="1">
            <option value="1">Option</option>
          </select>
        </label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-filled</code></th>
      <td>
        <wa-select label="Select (filled)" value="1" class="wa-filled">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
      <td>
        <label class="wa-filled">Select (filled) 
          <select value="1">
            <option value="1">Option</option>
          </select>
        </label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-s</code></th>
      <td>
        <wa-select label="Select (small)" value="1" class="wa-size-s">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
      <td>
        <label class="wa-size-s">Select (small) 
          <select value="1">
            <option value="1">Option</option>
          </select>
        </label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-m</code></th>
      <td>
        <wa-select label="Select (medium)" value="1" class="wa-size-m">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
      <td>
        <label class="wa-size-m">Select (medium) 
          <select value="1">
            <option value="1">Option</option>
          </select>
        </label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-l</code></th>
      <td>
        <wa-select label="Select (large)" value="1" class="wa-size-l">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
      <td>
        <label class="wa-size-l">Select (large) 
          <select value="1">
            <option value="1">Option</option>
          </select>
        </label>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Slider

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-slider&gt;</code></th>
    <th><code>&lt;input type="range"&gt;</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-slider label="Slider"></wa-slider>
      </td>
      <td>
        <label>Slider <input type="range"></input></label>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Textarea

<table>
  <thead>
    <th></th>
    <th><code>&lt;wa-textarea&gt;</code></th>
    <th><code>&lt;textarea&gt;</code></th>
  </thead>
  <tbody>
    <tr>
      <th><em>default</em></th>
      <td>
        <wa-textarea label="Textarea" placeholder="Placeholder"></wa-textarea>
      </td>
      <td>
        <label>Textarea <textarea placeholder="Placeholder"></textarea></label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-filled</code></th>
      <td>
        <wa-textarea label="Textarea (filled)" placeholder="Placeholder" class="wa-filled"></wa-textarea>
      </td>
      <td>
        <label>Textarea (filled) <textarea placeholder="Placeholder" class="wa-filled"></textarea></label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-s</code></th>
      <td>
        <wa-textarea label="Textarea (small)" placeholder="Placeholder" class="wa-size-s"></wa-textarea>
      </td>
      <td>
        <label class="wa-size-s">Textarea (small) <textarea placeholder="Placeholder"></textarea></label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-m</code></th>
      <td>
        <wa-textarea label="Textarea (medium)" placeholder="Placeholder" class="wa-size-m"></wa-textarea>
      </td>
      <td>
        <label class="wa-size-m">Textarea (medium) <textarea placeholder="Placeholder"></textarea></label>
      </td>
    </tr>
    <tr>
      <th><code>.wa-size-l</code></th>
      <td>
        <wa-textarea label="Textarea (large)" placeholder="Placeholder" class="wa-size-l"></wa-textarea>
      </td>
      <td>
        <label class="wa-size-l">Textarea (large) <textarea placeholder="Placeholder"></textarea></label>
      </td>
    </tr>
  </tbody>
</table>

</wa-tab-panel>

<wa-tab-panel name="size">

## Size

Size tests ensure that both the `size` attribute and `.wa-size-[s|m|l]` classes have identical results for components that support them. Developers should be able to use both of these interchangeably on components to get the intended size.

### Button

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <wa-button size="small">Button</wa-button>
      </td>
      <td>
        <wa-button class="wa-size-s">Button</wa-button>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-button size="medium">Button</wa-button>
      </td>
      <td>
        <wa-button class="wa-size-m">Button</wa-button>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-button size="large">Button</wa-button>
      </td>
      <td>
        <wa-button class="wa-size-l">Button</wa-button>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Callout

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <wa-callout size="small">
          <wa-icon slot="icon" name="circle-star"></wa-icon>
          Callout
        </wa-callout>
      </td>
      <td>
        <wa-callout class="wa-size-s">
          <wa-icon slot="icon" name="circle-star"></wa-icon>
          Callout
        </wa-callout>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-callout size="medium">
          <wa-icon slot="icon" name="circle-star"></wa-icon>
          Callout
        </wa-callout>
      </td>
      <td>
        <wa-callout class="wa-size-m">
          <wa-icon slot="icon" name="circle-star"></wa-icon>
          Callout
        </wa-callout>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-callout size="large">
          <wa-icon slot="icon" name="circle-star"></wa-icon>
          Callout
        </wa-callout>
      </td>
      <td>
        <wa-callout class="wa-size-l">
          <wa-icon slot="icon" name="circle-star"></wa-icon>
          Callout
        </wa-callout>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Checkbox

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <wa-checkbox hint="Hint" size="small">Checkbox</wa-checkbox>
      </td>
      <td>
        <wa-checkbox hint="Hint" class="wa-size-s">Checkbox</wa-checkbox>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-checkbox hint="Hint" size="medium">Checkbox</wa-checkbox>
      </td>
      <td>
        <wa-checkbox hint="Hint" class="wa-size-m">Checkbox</wa-checkbox>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-checkbox hint="Hint" size="large">Checkbox</wa-checkbox>
      </td>
      <td>
        <wa-checkbox hint="Hint" class="wa-size-l">Checkbox</wa-checkbox>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Color Picker

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <wa-color-picker size="small" label="Color Picker" hint="Hint"></wa-color-picker>
      </td>
      <td>
        <wa-color-picker class="wa-size-s" label="Color Picker" hint="Hint"></wa-color-picker>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-color-picker size="medium" label="Color Picker" hint="Hint"></wa-color-picker>
      </td>
      <td>
        <wa-color-picker class="wa-size-m" label="Color Picker" hint="Hint"></wa-color-picker>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-color-picker size="large" label="Color Picker" hint="Hint"></wa-color-picker>
      </td>
      <td>
        <wa-color-picker class="wa-size-l" label="Color Picker" hint="Hint"></wa-color-picker>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Input

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <wa-input size="small" label="Input" placeholder="Placeholder" hint="Hint"></wa-input>
      </td>
      <td>
        <wa-input class="wa-size-s" label="Input" placeholder="Placeholder" hint="Hint"></wa-input>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-input size="medium" label="Input" placeholder="Placeholder" hint="Hint"></wa-input>
      </td>
      <td>
        <wa-input class="wa-size-m" label="Input" placeholder="Placeholder" hint="Hint"></wa-input>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-input size="large" label="Input" placeholder="Placeholder" hint="Hint"></wa-input>
      </td>
      <td>
        <wa-input class="wa-size-l" label="Input" placeholder="Placeholder" hint="Hint"></wa-input>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Radio

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <wa-radio size="small">Radio</wa-radio>
      </td>
      <td>
        <wa-radio class="wa-size-s">Radio</wa-radio>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-radio size="medium">Radio</wa-radio>
      </td>
      <td>
        <wa-radio class="wa-size-m">Radio</wa-radio>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-radio size="large">Radio</wa-radio>
      </td>
      <td>
        <wa-radio class="wa-size-l">Radio</wa-radio>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Radio Button

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <wa-radio-group>
          <wa-radio-button size="small" value="1">Radio</wa-radio-button>
          <wa-radio-button size="small" value="2">Button</wa-radio-button>
        </wa-radio-group>
      </td>
      <td>
        <wa-radio-group>
          <wa-radio-button class="wa-size-s" value="1">Radio</wa-radio-button>
          <wa-radio-button class="wa-size-s" value="2">Button</wa-radio-button>
        </wa-radio-group>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-radio-group>
          <wa-radio-button size="medium" value="1">Radio</wa-radio-button>
          <wa-radio-button size="medium" value="2">Button</wa-radio-button>
        </wa-radio-group>
      </td>
      <td>
        <wa-radio-group>
          <wa-radio-button class="wa-size-m" value="1">Radio</wa-radio-button>
          <wa-radio-button class="wa-size-m" value="2">Button</wa-radio-button>
        </wa-radio-group>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-radio-group>
          <wa-radio-button size="large" value="1">Radio</wa-radio-button>
          <wa-radio-button size="large" value="2">Button</wa-radio-button>
        </wa-radio-group>
      </td>
      <td>
        <wa-radio-group>
          <wa-radio-button class="wa-size-l" value="1">Radio</wa-radio-button>
          <wa-radio-button class="wa-size-l" value="2">Button</wa-radio-button>
        </wa-radio-group>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Radio Group

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <div class="wa-stack">
          <wa-radio-group label="Radio Group" hint="Hint" size="small">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
          <wa-radio-group label="Radio Button Group" hint="Hint" size="small">
            <wa-radio-button value="1">Radio 1</wa-radio-button>
            <wa-radio-button value="2">Radio 2</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
      <td>
        <div class="wa-stack">
          <wa-radio-group label="Radio Group" hint="Hint" class="wa-size-s">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
          <wa-radio-group label="Radio Button Group" hint="Hint" class="wa-size-s">
            <wa-radio-button value="1">Radio 1</wa-radio-button>
            <wa-radio-button value="2">Radio 2</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <div class="wa-stack">
          <wa-radio-group label="Radio Group" hint="Hint" size="medium">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
          <wa-radio-group label="Radio Button Group" hint="Hint" size="medium">
            <wa-radio-button value="1">Radio 1</wa-radio-button>
            <wa-radio-button value="2">Radio 2</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
      <td>
        <div class="wa-stack">
          <wa-radio-group label="Radio Group" hint="Hint" class="wa-size-m">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
          <wa-radio-group label="Radio Button Group" hint="Hint" class="wa-size-m">
            <wa-radio-button value="1">Radio 1</wa-radio-button>
            <wa-radio-button value="2">Radio 2</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <div class="wa-stack">
          <wa-radio-group label="Radio Group" hint="Hint" size="large">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
          <wa-radio-group label="Radio Button Group" hint="Hint" size="large">
            <wa-radio-button value="1">Radio 1</wa-radio-button>
            <wa-radio-button value="2">Radio 2</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
      <td>
        <div class="wa-stack">
          <wa-radio-group label="Radio Group" hint="Hint" class="wa-size-l">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
          <wa-radio-group label="Radio Button Group" hint="Hint" class="wa-size-l">
            <wa-radio-button value="1">Radio 1</wa-radio-button>
            <wa-radio-button value="2">Radio 2</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Select

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <wa-select size="small" label="Select" placeholder="Placeholder" hint="Hint">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
      <td>
        <wa-select class="wa-size-s" label="Select" placeholder="Placeholder" hint="Hint">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-select size="medium" label="Select" placeholder="Placeholder" hint="Hint">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
      <td>
        <wa-select class="wa-size-m" label="Select" placeholder="Placeholder" hint="Hint">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-select size="large" label="Select" placeholder="Placeholder" hint="Hint">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
      <td>
        <wa-select class="wa-size-l" label="Select" placeholder="Placeholder" hint="Hint">
          <wa-option value="1">Option</wa-option>
        </wa-select>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Switch

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <wa-switch hint="Hint" size="small">Switch</wa-switch>
      </td>
      <td>
        <wa-switch hint="Hint" class="wa-size-s">Switch</wa-switch>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-switch hint="Hint" size="medium">Switch</wa-switch>
      </td>
      <td>
        <wa-switch hint="Hint" class="wa-size-m">Switch</wa-switch>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-switch hint="Hint" size="large">Switch</wa-switch>
      </td>
      <td>
        <wa-switch hint="Hint" class="wa-size-l">Switch</wa-switch>
      </td>
    </tr>
  </tbody>
</table>
<wa-divider></wa-divider>

### Textarea

<table>
  <thead>
    <th></th>
    <th><code>size=""</code></th>
    <th><code>.wa-size-[s|m|l]</code></th>
  </thead>
  <tbody>
    <tr>
      <th><code>small</code>/<code>s</code></th>
      <td>
        <wa-textarea size="small" label="Textarea" placeholder="Placeholder" hint="Hint"></wa-textarea>
      </td>
      <td>
        <wa-textarea class="wa-size-s" label="Textarea" placeholder="Placeholder" hint="Hint"></wa-textarea>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-textarea size="medium" label="Textarea" placeholder="Placeholder" hint="Hint"></wa-textarea>
      </td>
      <td>
        <wa-textarea class="wa-size-m" label="Textarea" placeholder="Placeholder" hint="Hint"></wa-textarea>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-textarea size="large" label="Textarea" placeholder="Placeholder" hint="Hint"></wa-textarea>
      </td>
      <td>
        <wa-textarea class="wa-size-l" label="Textarea" placeholder="Placeholder" hint="Hint"></wa-textarea>
      </td>
    </tr>
  </tbody>
</table>

</wa-tab-panel>

</wa-tab-group>