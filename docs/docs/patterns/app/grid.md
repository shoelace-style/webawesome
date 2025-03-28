---
title: Grid
description: TODO
---

```html {.example}
<div class="wa-grid" style="--min-column-size: 30ch;">
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-0">
        <span>
          <strong>John Carpenter</strong>
              <wa-badge pill>Admin</wa-badge>
        </span>
        <span>Master of Horror</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"label="Avatar of a gray tabby kitten looking down">
            </wa-avatar>
    </div>
    <div slot="footer" class="wa-grid" style="--min-column-size: 16ch;">
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="at"></wa-icon>Email</wa-button>
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="phone"></wa-icon>Phone</wa-button>
    </div>
  </wa-card>
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-0">
        <span>
          <strong>John Carpenter</strong>
              <wa-badge pill>Admin</wa-badge>
        </span>
        <span>Master of Horror</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"label="Avatar of a gray tabby kitten looking down">
            </wa-avatar>
    </div>
    <div slot="footer" class="wa-grid" style="--min-column-size: 16ch;">
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="at"></wa-icon>Email</wa-button>
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="phone"></wa-icon>Phone</wa-button>
    </div>
  </wa-card>
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-0">
        <span>
          <strong>John Carpenter</strong>
              <wa-badge pill>Admin</wa-badge>
        </span>
        <span>Master of Horror</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"label="Avatar of a gray tabby kitten looking down">
            </wa-avatar>
    </div>
    <div slot="footer" class="wa-grid" style="--min-column-size: 16ch;">
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="at"></wa-icon>Email</wa-button>
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="phone"></wa-icon>Phone</wa-button>
    </div>
  </wa-card>
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-0">
        <span>
          <strong>John Carpenter</strong>
              <wa-badge pill>Admin</wa-badge>
        </span>
        <span>Master of Horror</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"label="Avatar of a gray tabby kitten looking down">
            </wa-avatar>
    </div>
    <div slot="footer" class="wa-grid" style="--min-column-size: 16ch;">
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="at"></wa-icon>Email</wa-button>
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="phone"></wa-icon>Phone</wa-button>
    </div>
  </wa-card>
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-0">
        <span>
          <strong>John Carpenter</strong>
              <wa-badge pill>Admin</wa-badge>
        </span>
        <span>Master of Horror</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"label="Avatar of a gray tabby kitten looking down">
            </wa-avatar>
    </div>
    <div slot="footer" class="wa-grid" style="--min-column-size: 16ch;">
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="at"></wa-icon>Email</wa-button>
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="phone"></wa-icon>Phone</wa-button>
    </div>
  </wa-card>
  <wa-card with-footer>
    <div class="wa-flank:end">
      <div class="wa-stack wa-gap-0">
        <span>
          <strong>John Carpenter</strong>
              <wa-badge pill>Admin</wa-badge>
        </span>
        <span>Master of Horror</span>
      </div>
      <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"label="Avatar of a gray tabby kitten looking down">
            </wa-avatar>
    </div>
    <div slot="footer" class="wa-grid" style="--min-column-size: 16ch;">
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="at"></wa-icon>Email</wa-button>
      <wa-button appearance="outlined"><wa-icon slot="prefix" name="phone"></wa-icon>Phone</wa-button>
    </div>
  </wa-card>
</div>
```

```html{.example}
<div class="wa-grid">
  <wa-card>
    <div class="wa-flank">
      <div class="wa-callout wa-neutral">GA</div>
      <div class="wa-split">
        <div class="wa-gap-0 wa-stack">
          <span class="wa-heading-xs">Graph API</span>
          <span class="wa-caption-m">16 Members</span>
        </div>
        <wa-icon-button name="ellipsis-vertical" label="actions"></wa-icon-button>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <div class="wa-callout wa-success">GA</div>
      <div class="wa-split">
        <div class="wa-gap-0 wa-stack">
          <span class="wa-heading-xs">Graph API</span>
          <span class="wa-caption-m">16 Members</span>
        </div>
        <wa-icon-button name="ellipsis-vertical" label="actions"></wa-icon-button>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <div class="wa-callout wa-danger">GA</div>
      <div class="wa-split">
        <div class="wa-gap-0 wa-stack">
          <span class="wa-heading-xs">Graph API</span>
          <span class="wa-caption-m">16 Members</span>
        </div>
        <wa-icon-button name="ellipsis-vertical" label="actions"></wa-icon-button>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <div class="wa-callout wa-warning">GA</div>
      <div class="wa-split">
        <div class="wa-gap-0 wa-stack">
          <span class="wa-heading-xs">Graph API</span>
          <span class="wa-caption-m">16 Members</span>
        </div>
        <wa-icon-button name="ellipsis-vertical" label="actions"></wa-icon-button>
      </div>
    </div>
  </wa-card>
</div>
```
