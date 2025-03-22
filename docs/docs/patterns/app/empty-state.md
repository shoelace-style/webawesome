---
title: Empty State
description: TODO
parent: app
tags: app
---

## Simple
```html {.example}
<div class="wa-stack wa-align-items-center">
  <wa-icon name="backpack" class="wa-caption-l" style="font-size: var(--wa-font-size-3xl)"></wa-icon>
  <span class="wa-heading-m">No Kits</span>
  <p class="wa-caption-l">Manage all of your project's icons in a kit.</p>
  <wa-button>
    <wa-icon slot="prefix" name="plus"></wa-icon>
    Add Kit
  </wa-button>
</div>
```

## With Border

```html {.example}
<a href="" class="wa-stack wa-align-items-center wa-placeholder wa-link-plain" style="max-width: 60ch; margin: auto">
  <wa-icon name="ufo-beam" class="wa-caption-l" style="font-size: var(--wa-font-size-3xl)"></wa-icon>
  <p class="wa-heading-m">No Custom Icons</p>
  <p>Add your own icon or logo to get started.</p>
</a>
```

## With starting points

```html {.example}
<wa-card with-header with-footer style="max-width: 720px; margin: 0 auto;">
  <div slot="header" class="wa-stack wa-gap-xs">
    <h2 class="wa-heading-m">Projects</h2>
    <p class="wa-caption-m">You haven’t created a project yet. Get started by selecting a template or start from an empty project.</p>
  </div>
  <div class="wa-grid" style="--min-column-size: 30ch;">
    <a href="" class="wa-flank wa-link-plain">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="bars"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a List <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Another to-do system you’ll try but eventually give up on.
        </p>
      </div>
    </a>
    <a href="" class="wa-flank wa-link-plain">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="image"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a Gallery <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Great for mood boards and inspiration.
        </p>
      </div>
    </a>
    <a href=""class="wa-flank wa-link-plain">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="table-cells"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a Spreadsheet <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Helps keep up with the numbers.
        </p>
      </div>
    </a>
    <a href="" class="wa-flank wa-link-plain">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="calendar"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a Calendar <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Stay on top of your deadlines, or don’t — it’s up to you.
        </p>
      </div>
    </a>
    <a href="" class="wa-flank wa-link-plain">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="table-columns"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a Board <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Track tasks in different stages of your project.
        </p>
      </div>
    </a>
    <a href="" class="wa-flank wa-link-plain">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="clock"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a Timeline <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Get a birds-eye-view of your procrastination.
        </p>
      </div>
    </a>
  </div>
  <div slot="footer">
    <a href="">Or start from an empty project →</a>
  </div>
</wa-card>
```