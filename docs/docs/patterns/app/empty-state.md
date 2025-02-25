---
title: Empty State
description: TODO
parent: app
tags: app
---

## Simple

```html{.example}
  <div class="empty-state simple">
    <wa-icon name="folders" style="font-size: 64px;"></wa-icon>
    <h4>No Project</h4>
    <p>Get started by one.</p>
    <wa-button variant="brand">
  <wa-icon slot="prefix" name="plus" variant="solid"></wa-icon>
  New Project
</wa-button>
  </div>
  <style>
    .empty-state {
      &.simple {
        display: flex;
        flex-direction: column;
        align-items: center;
      }


    }
  </style>
```

## With dashed border

```html{.example}
  <a href="#" class="empty-state dashed">
    <div class="border">
    <wa-icon name="database" style="font-size: 64px; margin: var(--wa-flow-spacing) 0 calc(var(--wa-flow-spacing)/ 2);"></wa-icon>
    <h4>No DBs</h4>
    <p>Get started by creating a database.</p>

</div>
  </a>
  <style>
    .empty-state {
      text-decoration: none;


      &.dashed .border {
        margin: 0 auto;
    width: 600px;
          display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px dashed var(--wa-color-neutral-fill-highlight);
        padding: 1rem;
        border-radius: 20px;
      }
    }
  </style>
```
### With starting points

```html{.example}
<wa-card with-header with-footer>
  <div slot="header">
    <h4>Projects</h4>
    <p>You haven’t created a project yet. Get started by selecting a template or start from an empty project.</p>
  </div>
  <ul role="list" class="starting-point">
    <li>
      <div class="img" style="--img-bg: #5A86E6;"><wa-icon name="poo-storm" style="color: white; font-size: 28px;"></wa-icon></div>
      <div class="info">
        <strong>
          <span style="margin-right: 0.5rem;">Create a List</span> <wa-icon name="arrow-right"></wa-icon>
          </strong>
        <p style="margin:0;">Another to-do system you’ll try but eventually give up on.</p>
      </div>
    </li>
    <li>
      <div class="img" style="--img-bg: #E65ABA;"><wa-icon name="user-bounty-hunter" style="color: white; font-size: 28px;"></wa-icon></div>
      <div class="info">
        <strong><span style="margin-right: 0.5rem;">Create a Gallery</span> <wa-icon name="arrow-right"></wa-icon></strong>
        <p style="margin:0;">Another to-do system you’ll try but eventually give up on.</p>
      </div>
    </li>
    <li>
      <div class="img" style="--img-bg: #E6A15A;"><wa-icon name="skull-crossbones" style="color: white; font-size: 28px;"></wa-icon></div>
      <div class="info">
        <strong><span style="margin-right: 0.5rem;">Create a Spreadsheet</span> <wa-icon name="arrow-right"></wa-icon></strong>
        <p style="margin:0;">Another to-do system you’ll try but eventually give up on.</p>
      </div>
    </li>
    <li>
      <div class="img" style="--img-bg: #5AA2E6;"><wa-icon name="face-awesome" style="color: white; font-size: 28px;"></wa-icon></div>
      <div class="info">
        <strong><span style="margin-right: 0.5rem;">Create a Timeline</span> <wa-icon name="arrow-right"></wa-icon></strong>
        <p style="margin:0;">Another to-do system you’ll try but eventually give up on.</p>
      </div>
    </li>
    <li>
      <div class="img" style="--img-bg: #7AE6AE;"><wa-icon name="planet-ringed" style="color: white; font-size: 28px;"></wa-icon></div>
      <div class="info">
        <strong><span style="margin-right: 0.5rem;">Create a Calendar</span> <wa-icon name="arrow-right"></wa-icon></strong>
        <p style="margin:0;">Another to-do system you’ll try but eventually give up on.</p>
      </div>
    </li>
  </ul>
  <div slot="footer">
    <a href="#">Or start from an empty project →</a>
  </div>
</wa-card>
<style>
  .starting-point {
    list-style-type: none;

    li {
      display: flex;
      margin-bottom: 1rem;
    }
  }
  .img {
    --img-bg: #eee;
    background: var(--img-bg);
        width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    border-radius: 0.5rem;
  }

  .info {
        display: flex;
    flex-direction: column;
    justify-content: center;

    strong {
      display: flex;
      align-items: center;
    }
  }
</style>
```