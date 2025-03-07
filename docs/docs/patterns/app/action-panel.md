---
title: Action Panel
description: 'These patterns help add user actions to dashboards'
parent: app
tags: app
---

## Simple
```html {.example}
<wa-card style="max-width: 960px; margin: 0 auto;">
  <div class="wa-align-items-start wa-stack wa-gap-xs">
    <h3>Manage subscription</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatibus corrupti atque repudiandae nam.</p>
    <wa-button>Change Plan</wa-button>
  </div>
</wa-card>
```
## with right flank

```html {.example}
<wa-card style="max-width: 960px; margin: 0 auto;">
  <div class="wa-flank:end">
    <div>
      <h3>Manage subscription</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatibus corrupti atque repudiandae nam.</p>
    </div>
    <wa-button>Change Plan</wa-button>
  </div>
</wa-card>
```
## with switch
```html {.example}
<wa-card style="max-width: 960px; margin: 0 auto;">
  <div class="wa-flank:end">
    <div>
      <h3>Manage subscription</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatibus corrupti atque repudiandae nam.</p>
    </div>
    <wa-switch size="large"></wa-switch>
  </div>
</wa-card>
```