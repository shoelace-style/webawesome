---
title: Grid List
description: 'Improve browsing and selection by organizing data in a structured grid layout.'
---

## Cards with Footer Actions

```html {.example}
<div class="wa-grid" style="--min-column-size: 30ch;">
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-xs">
        <div class="wa-cluster wa-gap-xs">
          <h3 class="wa-heading-s">Barklia Woofington</h3 class="wa-heading-s">
          <wa-badge pill>Admin</wa-badge>
        </div>
        <span class="wa-caption-m">Canine Executive Officer</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1593270379182-fe1b1f6d67e5?q=80&w=2175&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Avatar of black and white Border Collie"></wa-avatar>
    </div>
    <div slot="footer" class="wa-grid wa-gap-xs" style="--min-column-size: 10ch;">
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="at"></wa-icon>
        Email
      </wa-button>
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="phone"></wa-icon>
        Phone
      </wa-button>
    </div>
  </wa-card>
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-xs">
        <div class="wa-cluster wa-gap-xs">
          <h3 class="wa-heading-s">Maggie Pawsworth</h3 class="wa-heading-s">
          <wa-badge pill>Admin</wa-badge>
        </div>
        <span class="wa-caption-m">Canine Fetch Officer</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1514479425649-0981aca9fe41?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Avatar of black collie mix"></wa-avatar>
    </div>
    <div slot="footer" class="wa-grid wa-gap-xs" style="--min-column-size: 10ch;">
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="at"></wa-icon>
        Email
      </wa-button>
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="phone"></wa-icon>
        Phone
      </wa-button>
    </div>
  </wa-card>
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-xs">
        <h3 class="wa-heading-s">Rex Tailwag</h3 class="wa-heading-s">
        <span class="wa-caption-m">Head of Security</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1610968755695-d7fcb5fd4b92?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Avatar of black and tan German Shepherd"></wa-avatar>
    </div>
    <div slot="footer" class="wa-grid wa-gap-xs" style="--min-column-size: 10ch;">
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="at"></wa-icon>
        Email
      </wa-button>
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="phone"></wa-icon>
        Phone
      </wa-button>
    </div>
  </wa-card>
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-xs">
        <h3 class="wa-heading-s">Luna Sniffington</h3 class="wa-heading-s">
        <span class="wa-caption-m">Hound Relations</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1526440847959-4e38e7f00b04?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Avatar of black and tan Yorkshire Terrier"></wa-avatar>
    </div>
    <div slot="footer" class="wa-grid wa-gap-xs" style="--min-column-size: 10ch;">
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="at"></wa-icon>
        Email
      </wa-button>
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="phone"></wa-icon>
        Phone
      </wa-button>
    </div>
  </wa-card>
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-xs">
        <h3 class="wa-heading-s">Charlie Drooler</h3 class="wa-heading-s">
        <span class="wa-caption-m">Head of Sales</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1554692844-6627ca340264?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Avatar of tan and white corgi"></wa-avatar>
    </div>
    <div slot="footer" class="wa-grid wa-gap-xs" style="--min-column-size: 10ch;">
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="at"></wa-icon>
        Email
      </wa-button>
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="phone"></wa-icon>
        Phone
      </wa-button>
    </div>
  </wa-card>
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-xs">
        <h3 class="wa-heading-s">Daisy Zoomley</h3 class="wa-heading-s">
        <span class="wa-caption-m">IT Support</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1544378062-0b74cc8b4713?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="Avatar of gray Weimaraner"></wa-avatar>
    </div>
    <div slot="footer" class="wa-grid wa-gap-xs" style="--min-column-size: 10ch;">
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="at"></wa-icon>
        Email
      </wa-button>
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="phone"></wa-icon>
        Phone
      </wa-button>
    </div>
  </wa-card>
</div>
```

## Linked Cards with Options Menu

```html{.example}
<div class="wa-grid" style="--min-column-size: 25ch">
  <wa-card>
    <div class="wa-flank:end">
      <a href="" class="wa-flank wa-link-plain">
        <wa-avatar shape="rounded" style="--background-color: var(--wa-color-yellow-80); --text-color: var(--wa-color-yellow-40)">
          <wa-icon slot="icon" name="pancakes"></wa-icon>
        </wa-avatar>
        <div class="wa-gap-2xs wa-stack">
          <span class="wa-heading-s">Breakfast</span>
          <span class="wa-caption-m">28 Items</span>
        </div>
      </a>
      <wa-dropdown>
        <wa-icon-button id="more-actions-1" slot="trigger" name="ellipsis-vertical" label="More actions"></wa-icon-button>
        <wa-menu>
          <wa-menu-item>Copy link</wa-menu-item>
          <wa-menu-item>Rename</wa-menu-item>
          <wa-menu-item>Move to trash</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
      <wa-tooltip for="more-actions-1">More actions</wa-tooltip>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank:end">
      <a href="" class="wa-flank wa-link-plain">
        <wa-avatar shape="rounded" style="--background-color: var(--wa-color-orange-80); --text-color: var(--wa-color-orange-40)">
          <wa-icon slot="icon" name="burger-cheese"></wa-icon>
        </wa-avatar>
        <div class="wa-gap-2xs wa-stack">
          <span class="wa-heading-s">Lunch + Dinner</span>
          <span class="wa-caption-m">40 Items</span>
        </div>
      </a>
      <wa-dropdown>
        <wa-icon-button id="more-actions-2" slot="trigger" name="ellipsis-vertical" label="More actions"></wa-icon-button>
        <wa-menu>
          <wa-menu-item>Copy link</wa-menu-item>
          <wa-menu-item>Rename</wa-menu-item>
          <wa-menu-item>Move to trash</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
      <wa-tooltip for="more-actions-2">More actions</wa-tooltip>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank:end">
      <a href="" class="wa-flank wa-link-plain">
        <wa-avatar shape="rounded" style="--background-color: var(--wa-color-indigo-80); --text-color: var(--wa-color-indigo-40)">
          <wa-icon slot="icon" name="martini-glass-citrus"></wa-icon>
        </wa-avatar>
        <div class="wa-gap-2xs wa-stack">
          <span class="wa-heading-s">Beverages</span>
          <span class="wa-caption-m">19 Items</span>
        </div>
      </a>
      <wa-dropdown>
        <wa-icon-button id="more-actions-3" slot="trigger" name="ellipsis-vertical" label="More actions"></wa-icon-button>
        <wa-menu>
          <wa-menu-item>Copy link</wa-menu-item>
          <wa-menu-item>Rename</wa-menu-item>
          <wa-menu-item>Move to trash</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
      <wa-tooltip for="more-actions-3">More actions</wa-tooltip>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank:end">
      <a href="" class="wa-flank wa-link-plain">
        <wa-avatar shape="rounded" style="--background-color: var(--wa-color-pink-80); --text-color: var(--wa-color-pink-40)">
          <wa-icon slot="icon" name="cake-slice"></wa-icon>
        </wa-avatar>
        <div class="wa-gap-2xs wa-stack">
          <span class="wa-heading-s">Dessert</span>
          <span class="wa-caption-m">11 Items</span>
        </div>
      </a>
      <wa-dropdown>
        <wa-icon-button id="more-actions-4" slot="trigger" name="ellipsis-vertical" label="More actions"></wa-icon-button>
        <wa-menu>
          <wa-menu-item>Copy link</wa-menu-item>
          <wa-menu-item>Rename</wa-menu-item>
          <wa-menu-item>Move to trash</wa-menu-item>
        </wa-menu>
      </wa-dropdown>
      <wa-tooltip for="more-actions-4">More actions</wa-tooltip>
    </div>
  </wa-card>
</div>
```

