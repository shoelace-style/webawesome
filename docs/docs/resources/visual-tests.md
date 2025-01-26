---
title: Visual Tests
description: TODO
layout: page
wide: true
---

<style>
  tbody .wa-grid {
    --min-column-size: 5ch;
  }
  tbody tr th:first-of-type {
    width: 20ch;
  }
  tbody th {
    vertical-align: middle;
  }
  tbody tr:hover {
    background-color: color-mix(in oklch, var(--wa-color-fill-quiet), transparent 60%)
  }
</style>

<wa-tab-group>
  <wa-tab panel="appearance">Appearance</wa-tab>
  <wa-tab panel="alignment">Alignment</wa-tab>
  <wa-tab panel="groups">Groups</wa-tab>
  <wa-tab panel="native">Native Styles</wa-tab>
  <wa-tab panel="size">Size</wa-tab>

<wa-tab-panel name="appearance">

## Appearance

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
        <wa-badge variant="brand" appearance="accent outlined">Brand</wa-badge>
        <wa-badge variant="neutral" appearance="accent outlined">Neutral</wa-badge>
        <wa-badge variant="success" appearance="accent outlined">Success</wa-badge>
        <wa-badge variant="warning" appearance="accent outlined">Warning</wa-badge>
        <wa-badge variant="danger" appearance="accent outlined">Danger</wa-badge>
      </td>
      <td>
        <wa-badge variant="brand" class="wa-accent wa-outlined">Brand</wa-badge>
        <wa-badge variant="neutral" class="wa-accent wa-outlined">Neutral</wa-badge>
        <wa-badge variant="success" class="wa-accent wa-outlined">Success</wa-badge>
        <wa-badge variant="warning" class="wa-accent wa-outlined">Warning</wa-badge>
        <wa-badge variant="danger" class="wa-accent wa-outlined">Danger</wa-badge>
      </td>
    </tr>
    <tr>
      <th><code>accent</code></th>
      <td>
        <wa-badge variant="brand" appearance="accent">Brand</wa-badge>
        <wa-badge variant="neutral" appearance="accent">Neutral</wa-badge>
        <wa-badge variant="success" appearance="accent">Success</wa-badge>
        <wa-badge variant="warning" appearance="accent">Warning</wa-badge>
        <wa-badge variant="danger" appearance="accent">Danger</wa-badge>
      </td>
      <td>
        <wa-badge variant="brand" class="wa-accent">Brand</wa-badge>
        <wa-badge variant="neutral" class="wa-accent">Neutral</wa-badge>
        <wa-badge variant="success" class="wa-accent">Success</wa-badge>
        <wa-badge variant="warning" class="wa-accent">Warning</wa-badge>
        <wa-badge variant="danger" class="wa-accent">Danger</wa-badge>
      </td>
    </tr>
    <tr>
      <th><code>filled</code> + <code>outlined</code></th>
      <td>
        <wa-badge variant="brand" appearance="filled outlined">Brand</wa-badge>
        <wa-badge variant="neutral" appearance="filled outlined">Neutral</wa-badge>
        <wa-badge variant="success" appearance="filled outlined">Success</wa-badge>
        <wa-badge variant="warning" appearance="filled outlined">Warning</wa-badge>
        <wa-badge variant="danger" appearance="filled outlined">Danger</wa-badge>
      </td>
      <td>
        <wa-badge variant="brand" class="wa-filled wa-outlined">Brand</wa-badge>
        <wa-badge variant="neutral" class="wa-filled wa-outlined">Neutral</wa-badge>
        <wa-badge variant="success" class="wa-filled wa-outlined">Success</wa-badge>
        <wa-badge variant="warning" class="wa-filled wa-outlined">Warning</wa-badge>
        <wa-badge variant="danger" class="wa-filled wa-outlined">Danger</wa-badge>
      </td>
    </tr>
    <tr>
      <th><code>filled</code></th>
      <td>
        <wa-badge variant="brand" appearance="filled">Brand</wa-badge>
        <wa-badge variant="neutral" appearance="filled">Neutral</wa-badge>
        <wa-badge variant="success" appearance="filled">Success</wa-badge>
        <wa-badge variant="warning" appearance="filled">Warning</wa-badge>
        <wa-badge variant="danger" appearance="filled">Danger</wa-badge>
      </td>
      <td>
        <wa-badge variant="brand" class="wa-filled">Brand</wa-badge>
        <wa-badge variant="neutral" class="wa-filled">Neutral</wa-badge>
        <wa-badge variant="success" class="wa-filled">Success</wa-badge>
        <wa-badge variant="warning" class="wa-filled">Warning</wa-badge>
        <wa-badge variant="danger" class="wa-filled">Danger</wa-badge>
      </td>
    </tr>
    <tr>
      <th><code>outlined</code></th>
      <td>
        <wa-badge variant="brand" appearance="outlined">Brand</wa-badge>
        <wa-badge variant="neutral" appearance="outlined">Neutral</wa-badge>
        <wa-badge variant="success" appearance="outlined">Success</wa-badge>
        <wa-badge variant="warning" appearance="outlined">Warning</wa-badge>
        <wa-badge variant="danger" appearance="outlined">Danger</wa-badge>
      </td>
      <td>
        <wa-badge variant="brand" class="wa-outlined">Brand</wa-badge>
        <wa-badge variant="neutral" class="wa-outlined">Neutral</wa-badge>
        <wa-badge variant="success" class="wa-outlined">Success</wa-badge>
        <wa-badge variant="warning" class="wa-outlined">Warning</wa-badge>
        <wa-badge variant="danger" class="wa-outlined">Danger</wa-badge>
      </td>
    </tr>
    <tr>
      <th><code>plain</code></th>
      <td>
        <wa-badge variant="brand" appearance="plain">Brand</wa-badge>
        <wa-badge variant="neutral" appearance="plain">Neutral</wa-badge>
        <wa-badge variant="success" appearance="plain">Success</wa-badge>
        <wa-badge variant="warning" appearance="plain">Warning</wa-badge>
        <wa-badge variant="danger" appearance="plain">Danger</wa-badge>
      </td>
      <td>
        <wa-badge variant="brand" class="wa-plain">Brand</wa-badge>
        <wa-badge variant="neutral" class="wa-plain">Neutral</wa-badge>
        <wa-badge variant="success" class="wa-plain">Success</wa-badge>
        <wa-badge variant="warning" class="wa-plain">Warning</wa-badge>
        <wa-badge variant="danger" class="wa-plain">Danger</wa-badge>
      </td>
    </tr>
  </tbody>
</table>

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
        <wa-button variant="brand" appearance="accent outlined">Brand</wa-button>
        <wa-button variant="neutral" appearance="accent outlined">Neutral</wa-button>
        <wa-button variant="success" appearance="accent outlined">Success</wa-button>
        <wa-button variant="warning" appearance="accent outlined">Warning</wa-button>
        <wa-button variant="danger" appearance="accent outlined">Danger</wa-button>
      </td>
      <td>
        <wa-button variant="brand" class="wa-accent wa-outlined">Brand</wa-button>
        <wa-button variant="neutral" class="wa-accent wa-outlined">Neutral</wa-button>
        <wa-button variant="success" class="wa-accent wa-outlined">Success</wa-button>
        <wa-button variant="warning" class="wa-accent wa-outlined">Warning</wa-button>
        <wa-button variant="danger" class="wa-accent wa-outlined">Danger</wa-button>
      </td>
    </tr>
    <tr>
      <th><code>accent</code></th>
      <td>
        <wa-button variant="brand" appearance="accent">Brand</wa-button>
        <wa-button variant="neutral" appearance="accent">Neutral</wa-button>
        <wa-button variant="success" appearance="accent">Success</wa-button>
        <wa-button variant="warning" appearance="accent">Warning</wa-button>
        <wa-button variant="danger" appearance="accent">Danger</wa-button>
      </td>
      <td>
        <wa-button variant="brand" class="wa-accent">Brand</wa-button>
        <wa-button variant="neutral" class="wa-accent">Neutral</wa-button>
        <wa-button variant="success" class="wa-accent">Success</wa-button>
        <wa-button variant="warning" class="wa-accent">Warning</wa-button>
        <wa-button variant="danger" class="wa-accent">Danger</wa-button>
      </td>
    </tr>
    <tr>
      <th><code>filled</code> + <code>outlined</code></th>
      <td>
        <wa-button variant="brand" appearance="filled outlined">Brand</wa-button>
        <wa-button variant="neutral" appearance="filled outlined">Neutral</wa-button>
        <wa-button variant="success" appearance="filled outlined">Success</wa-button>
        <wa-button variant="warning" appearance="filled outlined">Warning</wa-button>
        <wa-button variant="danger" appearance="filled outlined">Danger</wa-button>
      </td>
      <td>
        <wa-button variant="brand" class="wa-filled wa-outlined">Brand</wa-button>
        <wa-button variant="neutral" class="wa-filled wa-outlined">Neutral</wa-button>
        <wa-button variant="success" class="wa-filled wa-outlined">Success</wa-button>
        <wa-button variant="warning" class="wa-filled wa-outlined">Warning</wa-button>
        <wa-button variant="danger" class="wa-filled wa-outlined">Danger</wa-button>
      </td>
    </tr>
    <tr>
      <th><code>filled</code></th>
      <td>
        <wa-button variant="brand" appearance="filled">Brand</wa-button>
        <wa-button variant="neutral" appearance="filled">Neutral</wa-button>
        <wa-button variant="success" appearance="filled">Success</wa-button>
        <wa-button variant="warning" appearance="filled">Warning</wa-button>
        <wa-button variant="danger" appearance="filled">Danger</wa-button>
      </td>
      <td>
        <wa-button variant="brand" class="wa-filled">Brand</wa-button>
        <wa-button variant="neutral" class="wa-filled">Neutral</wa-button>
        <wa-button variant="success" class="wa-filled">Success</wa-button>
        <wa-button variant="warning" class="wa-filled">Warning</wa-button>
        <wa-button variant="danger" class="wa-filled">Danger</wa-button>
      </td>
    </tr>
    <tr>
      <th><code>outlined</code></th>
      <td>
        <wa-button variant="brand" appearance="outlined">Brand</wa-button>
        <wa-button variant="neutral" appearance="outlined">Neutral</wa-button>
        <wa-button variant="success" appearance="outlined">Success</wa-button>
        <wa-button variant="warning" appearance="outlined">Warning</wa-button>
        <wa-button variant="danger" appearance="outlined">Danger</wa-button>
      </td>
      <td>
        <wa-button variant="brand" class="wa-outlined">Brand</wa-button>
        <wa-button variant="neutral" class="wa-outlined">Neutral</wa-button>
        <wa-button variant="success" class="wa-outlined">Success</wa-button>
        <wa-button variant="warning" class="wa-outlined">Warning</wa-button>
        <wa-button variant="danger" class="wa-outlined">Danger</wa-button>
      </td>
    </tr>
    <tr>
      <th><code>plain</code></th>
      <td>
        <wa-button variant="brand" appearance="plain">Brand</wa-button>
        <wa-button variant="neutral" appearance="plain">Neutral</wa-button>
        <wa-button variant="success" appearance="plain">Success</wa-button>
        <wa-button variant="warning" appearance="plain">Warning</wa-button>
        <wa-button variant="danger" appearance="plain">Danger</wa-button>
      </td>
      <td>
        <wa-button variant="brand" class="wa-plain">Brand</wa-button>
        <wa-button variant="neutral" class="wa-plain">Neutral</wa-button>
        <wa-button variant="success" class="wa-plain">Success</wa-button>
        <wa-button variant="warning" class="wa-plain">Warning</wa-button>
        <wa-button variant="danger" class="wa-plain">Danger</wa-button>
      </td>
    </tr>
  </tbody>
</table>

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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <div class="wa-grid wa-gap-xs">
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
        <wa-tag variant="brand" appearance="accent outlined">Brand</wa-tag>
        <wa-tag variant="neutral" appearance="accent outlined">Neutral</wa-tag>
        <wa-tag variant="success" appearance="accent outlined">Success</wa-tag>
        <wa-tag variant="warning" appearance="accent outlined">Warning</wa-tag>
        <wa-tag variant="danger" appearance="accent outlined">Danger</wa-tag>
      </td>
      <td>
        <wa-tag variant="brand" class="wa-accent wa-outlined">Brand</wa-tag>
        <wa-tag variant="neutral" class="wa-accent wa-outlined">Neutral</wa-tag>
        <wa-tag variant="success" class="wa-accent wa-outlined">Success</wa-tag>
        <wa-tag variant="warning" class="wa-accent wa-outlined">Warning</wa-tag>
        <wa-tag variant="danger" class="wa-accent wa-outlined">Danger</wa-tag>
      </td>
    </tr>
    <tr>
      <th><code>accent</code></th>
      <td>
        <wa-tag variant="brand" appearance="accent">Brand</wa-tag>
        <wa-tag variant="neutral" appearance="accent">Neutral</wa-tag>
        <wa-tag variant="success" appearance="accent">Success</wa-tag>
        <wa-tag variant="warning" appearance="accent">Warning</wa-tag>
        <wa-tag variant="danger" appearance="accent">Danger</wa-tag>
      </td>
      <td>
        <wa-tag variant="brand" class="wa-accent">Brand</wa-tag>
        <wa-tag variant="neutral" class="wa-accent">Neutral</wa-tag>
        <wa-tag variant="success" class="wa-accent">Success</wa-tag>
        <wa-tag variant="warning" class="wa-accent">Warning</wa-tag>
        <wa-tag variant="danger" class="wa-accent">Danger</wa-tag>
      </td>
    </tr>
    <tr>
      <th><code>filled</code> + <code>outlined</code></th>
      <td>
        <wa-tag variant="brand" appearance="filled outlined">Brand</wa-tag>
        <wa-tag variant="neutral" appearance="filled outlined">Neutral</wa-tag>
        <wa-tag variant="success" appearance="filled outlined">Success</wa-tag>
        <wa-tag variant="warning" appearance="filled outlined">Warning</wa-tag>
        <wa-tag variant="danger" appearance="filled outlined">Danger</wa-tag>
      </td>
      <td>
        <wa-tag variant="brand" class="wa-filled wa-outlined">Brand</wa-tag>
        <wa-tag variant="neutral" class="wa-filled wa-outlined">Neutral</wa-tag>
        <wa-tag variant="success" class="wa-filled wa-outlined">Success</wa-tag>
        <wa-tag variant="warning" class="wa-filled wa-outlined">Warning</wa-tag>
        <wa-tag variant="danger" class="wa-filled wa-outlined">Danger</wa-tag>
      </td>
    </tr>
    <tr>
      <th><code>filled</code></th>
      <td>
        <wa-tag variant="brand" appearance="filled">Brand</wa-tag>
        <wa-tag variant="neutral" appearance="filled">Neutral</wa-tag>
        <wa-tag variant="success" appearance="filled">Success</wa-tag>
        <wa-tag variant="warning" appearance="filled">Warning</wa-tag>
        <wa-tag variant="danger" appearance="filled">Danger</wa-tag>
      </td>
      <td>
        <wa-tag variant="brand" class="wa-filled">Brand</wa-tag>
        <wa-tag variant="neutral" class="wa-filled">Neutral</wa-tag>
        <wa-tag variant="success" class="wa-filled">Success</wa-tag>
        <wa-tag variant="warning" class="wa-filled">Warning</wa-tag>
        <wa-tag variant="danger" class="wa-filled">Danger</wa-tag>
      </td>
    </tr>
    <tr>
      <th><code>outlined</code></th>
      <td>
        <wa-tag variant="brand" appearance="outlined">Brand</wa-tag>
        <wa-tag variant="neutral" appearance="outlined">Neutral</wa-tag>
        <wa-tag variant="success" appearance="outlined">Success</wa-tag>
        <wa-tag variant="warning" appearance="outlined">Warning</wa-tag>
        <wa-tag variant="danger" appearance="outlined">Danger</wa-tag>
      </td>
      <td>
        <wa-tag variant="brand" class="wa-outlined">Brand</wa-tag>
        <wa-tag variant="neutral" class="wa-outlined">Neutral</wa-tag>
        <wa-tag variant="success" class="wa-outlined">Success</wa-tag>
        <wa-tag variant="warning" class="wa-outlined">Warning</wa-tag>
        <wa-tag variant="danger" class="wa-outlined">Danger</wa-tag>
      </td>
    </tr>
    <tr>
      <th><code>plain</code></th>
      <td>
        <wa-tag variant="brand" appearance="plain">Brand</wa-tag>
        <wa-tag variant="neutral" appearance="plain">Neutral</wa-tag>
        <wa-tag variant="success" appearance="plain">Success</wa-tag>
        <wa-tag variant="warning" appearance="plain">Warning</wa-tag>
        <wa-tag variant="danger" appearance="plain">Danger</wa-tag>
      </td>
      <td>
        <wa-tag variant="brand" class="wa-plain">Brand</wa-tag>
        <wa-tag variant="neutral" class="wa-plain">Neutral</wa-tag>
        <wa-tag variant="success" class="wa-plain">Success</wa-tag>
        <wa-tag variant="warning" class="wa-plain">Warning</wa-tag>
        <wa-tag variant="danger" class="wa-plain">Danger</wa-tag>
      </td>
    </tr>
  </tbody>
</table>

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
    <wa-slider></wa-slider>
    <wa-icon-button name="gear" label="Settings"></wa-icon-button>
    <wa-progress-bar value="50" style="width: 8rem;"></wa-progress-bar>
    <wa-spinner></wa-spinner>
  </div>
  <div class="alignment">
    <wa-input label="AaBbCc" hint="Ipsum"></wa-input>
    <wa-select label="AaBbCc" value="ocbs" multiple hint="Ipsum">
      <wa-option value="ocbs">OCBS</wa-option>
    </wa-select>
    <wa-color-picker label="AaBbCc" hint="Ipsum"></wa-color-picker>
  </div>
</div>
```
  
</wa-tab-panel>

<wa-tab-panel name="size">

## Size

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
        <wa-checkbox size="small">Checkbox</wa-checkbox>
      </td>
      <td>
        <wa-checkbox class="wa-size-s">Checkbox</wa-checkbox>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-checkbox size="medium">Checkbox</wa-checkbox>
      </td>
      <td>
        <wa-checkbox class="wa-size-m">Checkbox</wa-checkbox>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-checkbox size="large">Checkbox</wa-checkbox>
      </td>
      <td>
        <wa-checkbox class="wa-size-l">Checkbox</wa-checkbox>
      </td>
    </tr>
  </tbody>
</table>

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
        <wa-color-picker size="small" label="Color Picker"></wa-color-picker>
      </td>
      <td>
        <wa-color-picker class="wa-size-s" label="Color Picker"></wa-color-picker>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-color-picker size="medium" label="Color Picker"></wa-color-picker>
      </td>
      <td>
        <wa-color-picker class="wa-size-m" label="Color Picker"></wa-color-picker>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-color-picker size="large" label="Color Picker"></wa-color-picker>
      </td>
      <td>
        <wa-color-picker class="wa-size-l" label="Color Picker"></wa-color-picker>
      </td>
    </tr>
  </tbody>
</table>

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
        <div class="wa-stack">
          <wa-radio size="small">Radio</wa-radio>
          <wa-radio-group label="Radio Group" size="small">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
        </div>
      </td>
      <td>
        <div class="wa-stack">
          <wa-radio class="wa-size-s">Radio</wa-radio>
          <wa-radio-group label="Radio Group" class="wa-size-s">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <div class="wa-stack">
          <wa-radio size="medium">Radio</wa-radio>
          <wa-radio-group label="Radio Group" size="medium">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
        </div>
      </td>
      <td>
        <div class="wa-stack">
          <wa-radio class="wa-size-m">Radio</wa-radio>
          <wa-radio-group label="Radio Group" class="wa-size-m">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <div class="wa-stack">
          <wa-radio size="large">Radio</wa-radio>
          <wa-radio-group label="Radio Group" size="large">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
        </div>
      </td>
      <td>
        <div class="wa-stack">
          <wa-radio class="wa-size-l">Radio</wa-radio>
          <wa-radio-group label="Radio Group" class="wa-size-l">
            <wa-radio value="1">Radio 1</wa-radio><br>
            <wa-radio value="2">Radio 2</wa-radio>
          </wa-radio-group>
        </div>
      </td>
    </tr>
  </tbody>
</table>

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
        <div class="wa-cluster">
          <wa-radio-button size="small">Radio Button</wa-radio-button>
          <wa-radio-group size="small">
            <wa-radio-button value="1">Radio</wa-radio-button>
            <wa-radio-button value="2">Group</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
      <td>
        <div class="wa-cluster">
          <wa-radio-button class="wa-size-s">Radio Button</wa-radio-button>
          <wa-radio-group class="wa-size-s">
            <wa-radio-button value="1">Radio</wa-radio-button>
            <wa-radio-button value="2">Group</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <div class="wa-cluster">
          <wa-radio-button size="medium">Radio Button</wa-radio-button>
          <wa-radio-group size="medium">
            <wa-radio-button value="1">Radio</wa-radio-button>
            <wa-radio-button value="2">Group</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
      <td>
        <div class="wa-cluster">
          <wa-radio-button class="wa-size-m">Radio Button</wa-radio-button>
          <wa-radio-group class="wa-size-m">
            <wa-radio-button value="1">Radio</wa-radio-button>
            <wa-radio-button value="2">Group</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <div class="wa-cluster">
          <wa-radio-button size="large">Radio Button</wa-radio-button>
          <wa-radio-group size="large">
            <wa-radio-button value="1">Radio</wa-radio-button>
            <wa-radio-button value="2">Group</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
      <td>
        <div class="wa-cluster">
          <wa-radio-button class="wa-size-l">Radio Button</wa-radio-button>
          <wa-radio-group class="wa-size-l">
            <wa-radio-button value="1">Radio</wa-radio-button>
            <wa-radio-button value="2">Group</wa-radio-button>
          </wa-radio-group>
        </div>
      </td>
    </tr>
  </tbody>
</table>

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
        <wa-switch size="small">Switch</wa-switch>
      </td>
      <td>
        <wa-switch class="wa-size-s">Switch</wa-switch>
      </td>
    </tr>
    <tr>
      <th><code>medium</code>/<code>m</code></th>
      <td>
        <wa-switch size="medium">Switch</wa-switch>
      </td>
      <td>
        <wa-switch class="wa-size-m">Switch</wa-switch>
      </td>
    </tr>
    <tr>
      <th><code>large</code>/<code>l</code></th>
      <td>
        <wa-switch size="large">Switch</wa-switch>
      </td>
      <td>
        <wa-switch class="wa-size-l">Switch</wa-switch>
      </td>
    </tr>
  </tbody>
</table>

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