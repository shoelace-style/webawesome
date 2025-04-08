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

## Cards with Footer Actions & Large Image

```html {.example}
<div class="wa-grid" style="--min-column-size: 29ch;">
  <wa-card with-footer>
    <div class="wa-stack wa-align-items-center wa-gap-xs">
      <div class="wa-frame wa-border-radius-circle">
        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
         </div>
        <h2 class="wa-heading-m">Scott Summers</h2>
        <p class="wa-caption-l">DevOps</p>
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
    <div class="wa-stack wa-align-items-center wa-gap-xs">
      <div class="wa-frame wa-border-radius-circle">
        <img src="https://images.unsplash.com/photo-1559188286-a173792c8340?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
         </div>
        <h2 class="wa-heading-m">Kaitlin Moore</h2>
        <p class="wa-caption-l">Systems Engineer</p>
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
    <div class="wa-stack wa-align-items-center wa-gap-xs">
      <div class="wa-frame wa-border-radius-circle">
        <img src="https://images.unsplash.com/photo-1613428800237-c86372070fab?q=80&w=3017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
         </div>
        <h2 class="wa-heading-m">Nessa Riley</h2>
        <p class="wa-caption-l">Cloud Engineer</p>
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
    <div class="wa-stack wa-align-items-center wa-gap-xs">
      <div class="wa-frame wa-border-radius-circle">
        <img src="https://images.unsplash.com/photo-1645288059073-af3e9eb62a29?q=80&w=2936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
         </div>
        <h2 class="wa-heading-m">Veronica Staley</h2>
        <p class="wa-caption-l">Machine Learning Engineer</p>
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
## with Images
```html {.example}
<div class="wa-grid">
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Jeff Hanks</span>
      <span>Product Designer</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-icon-button name="bluesky" family="brands" label="link to Blusky profile"></wa-icon-button>
      <wa-icon-button name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon-button>
    </div>
  </article>
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1674044494331-8db2ecf18d46?q=80&w=3019&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Allen Bryant</span>
      <span>Staff Engineer</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-icon-button name="bluesky" family="brands" label="link to Blusky profile"></wa-icon-button>
      <wa-icon-button name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon-button>
    </div>
  </article>
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1645288059073-af3e9eb62a29?q=80&w=2936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Mariah Greene</span>
      <span>DevOps</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-icon-button name="bluesky" family="brands" label="link to Blusky profile"></wa-icon-button>
      <wa-icon-button name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon-button>
    </div>
  </article>
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1613428800237-c86372070fab?q=80&w=3017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Beverly Winslow</span>
      <span>Design Systems Lead</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-icon-button name="bluesky" family="brands" label="link to Blusky profile"></wa-icon-button>
      <wa-icon-button name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon-button>
    </div>
  </article>
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1614807547811-4174d3582092?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Eric Masterson</span>
      <span>Copy Writer</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-icon-button name="bluesky" family="brands" label="link to Blusky profile"></wa-icon-button>
      <wa-icon-button name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon-button>
    </div>
  </article>
  <article class="wa-stack">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1559188286-a173792c8340?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
    <div class="wa-stack wa-gap-3xs">
      <span>Stephen Coffee</span>
      <span>Visual Designer</span>
    </div>
    <div class="wa-cluster wa-gap-3xs">
      <wa-icon-button name="bluesky" family="brands" label="link to Blusky profile"></wa-icon-button>
      <wa-icon-button name="dribbble" family="brands" label="link to Dribbble profile"></wa-icon-button>
    </div>
  </article>
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
## Kanban
```html {.example}
<div>
  <h2>Project #487</h2>
  <div class="wa-grid wa-gap-2xl">
    <div class="wa-stack">
      <div class="wa-cluster wa-gap-s"><span>Draft</span>  <wa-badge appearance="filled outlined" variant="neutral">1</wa-badge></div>

       
     
          <wa-card>
            <div class="wa-flank:end">
              <div class="wa-stack wa-gap-2xs">
                <div class="wa-cluster wa-gap-2xs">
                  <span class="wa-heading-s">Unit Testing</span>
                  <wa-dropdown>
                    <wa-icon-button id="task-action-4" slot="trigger" name="ellipsis" label="More actions"></wa-icon-button>
                    <wa-menu>
                      <wa-menu-item>Copy link</wa-menu-item>
                      <wa-menu-item>Rename</wa-menu-item>
                      <wa-menu-item>Move to trash</wa-menu-item>
                    </wa-menu>
                  </wa-dropdown>
                  <wa-tooltip for="task-action-4">More actions</wa-tooltip>
                </div>
                <div class="wa-cluster wa-gap-2xs">
                <wa-badge appearance="outlined" pill>DevOps</wa-badge>  <wa-badge variant="neutral" appearance="outlined" pill>Priority: Low</wa-badge>
                </div>
              </div>
              <wa-avatar image="https://images.unsplash.com/photo-1559188286-a173792c8340?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  label="profile image"></wa-avatar>
            </div>
          </wa-card>
      <wa-button appearance="plain">
        <wa-icon name="plus"></wa-icon>
        Add Task
        </wa-button>
      
    </div>

    <div class="wa-stack">
      <div class="wa-cluster wa-gap-s"><span>In Progress</span>  <wa-badge appearance="filled outlined" variant="neutral">2</wa-badge></div>
      
          <wa-card>
            <div class="wa-flank:end">
              <div class="wa-stack wa-gap-2xs">
                <div class="wa-cluster wa-gap-2xs">
                  <span class="wa-heading-s">UX Audit</span>
                  <wa-dropdown>
                    <wa-icon-button id="task-action-2" slot="trigger" name="ellipsis" label="More actions"></wa-icon-button>
                    <wa-menu>
                      <wa-menu-item>Copy link</wa-menu-item>
                      <wa-menu-item>Rename</wa-menu-item>
                      <wa-menu-item>Move to trash</wa-menu-item>
                    </wa-menu>
                  </wa-dropdown>
                  <wa-tooltip for="task-action-2">More actions</wa-tooltip>
                </div>
                <div class="wa-cluster wa-gap-2xs">
                <wa-badge appearance="outlined" pill>Design</wa-badge>  <wa-badge variant="warning" appearance="outlined" pill>Priority: Medium</wa-badge>
                </div>
              </div>
              <wa-avatar image="https://images.unsplash.com/photo-1613428800237-c86372070fab?q=80&w=3017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  label="profile image"></wa-avatar>
            </div>
          </wa-card>
          <wa-card>
            <div class="wa-flank:end">
              <div class="wa-stack wa-gap-2xs">
                <div class="wa-cluster wa-gap-2xs">
                  <span class="wa-heading-s">Visual Testing</span>
                  <wa-dropdown>
                    <wa-icon-button id="task-action-3" slot="trigger" name="ellipsis" label="More actions"></wa-icon-button>
                    <wa-menu>
                      <wa-menu-item>Copy link</wa-menu-item>
                      <wa-menu-item>Rename</wa-menu-item>
                      <wa-menu-item>Move to trash</wa-menu-item>
                    </wa-menu>
                  </wa-dropdown>
                  <wa-tooltip for="task-action-3">More actions</wa-tooltip>
                </div>
                <div class="wa-cluster wa-gap-2xs">
                <wa-badge appearance="outlined" pill>Design</wa-badge>  <wa-badge variant="danger" appearance="outlined" pill>Priority: High</wa-badge>
                </div>
              </div>
              <wa-avatar image="https://images.unsplash.com/photo-1614807547811-4174d3582092?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="profile image"></wa-avatar>
            </div>
          </wa-card>
      <wa-button appearance="plain">
        <wa-icon name="plus"></wa-icon>
        Add Task
        </wa-button>
      
    </div>

    <div class="wa-stack">
      <div class="wa-cluster wa-gap-s"><span>Ready for Review</span>  <wa-badge appearance="filled outlined" variant="neutral">1</wa-badge></div>
          <wa-card>
            <div class="wa-flank:end">
              <div class="wa-stack wa-gap-2xs">
                <div class="wa-cluster wa-gap-2xs">
                  <span class="wa-heading-s">Deploy Bug Fixes</span>
                  <wa-dropdown>
                    <wa-icon-button id="task-action-1" slot="trigger" name="ellipsis" label="More actions"></wa-icon-button>
                    <wa-menu>
                      <wa-menu-item>Copy link</wa-menu-item>
                      <wa-menu-item>Rename</wa-menu-item>
                      <wa-menu-item>Move to trash</wa-menu-item>
                    </wa-menu>
                  </wa-dropdown>
                  <wa-tooltip for="task-action-1">More actions</wa-tooltip>
                </div>
                <div class="wa-cluster wa-gap-2xs">
                  <wa-badge appearance="outlined" pill>Development</wa-badge>  <wa-badge variant="warning" appearance="outlined" pill>Priority: Medium</wa-badge>
                </div>
              </div>
              <wa-avatar initials="KK" label="Avatar with initials: KK"></wa-avatar>
            </div>
          </wa-card>
     
        
      <wa-button appearance="plain">
        <wa-icon name="plus"></wa-icon>
        Add Task
        </wa-button>
      
    </div>


  
  </div>
</div>
```

