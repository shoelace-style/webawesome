---
title: Description List
description: TODO
parent: app
tags: app
---

```html{.example}
<div>
  <div>
    <h3>Client Information</h3>
    <p>Personal details</p>
  </div>
  <dl class="ds">
    <div class="dl-item">
    <dt>Beast of Bodmin</dt>
    <dd>A large feline inhabiting Bodmin Moor.</dd>
    </div>
    <div class="dl-item">
    <dt>Beast of Bodmin</dt>
    <dd>A large feline inhabiting Bodmin Moor.</dd>
    </div>
    <div class="dl-item">
    <dt>Beast of Bodmin</dt>
    <dd>A large feline inhabiting Bodmin Moor.</dd>
    </div>
    <div class="dl-item">
    <dt>Beast of Bodmin</dt>
    <dd>A large feline inhabiting Bodmin Moor.</dd>
    </div>
  </dl>
</div>
<style>
  dl.ds {
    div {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      padding: 1.5rem 0.75rem;
    }
    div:nth-child(odd) {
      background: var(--wa-color-surface-lowered);
    }
    dd {
      grid-column: span 2/ span 2;
      margin: 0;
    }

  }
</style>
```