---
title: App
description: TODO
---

TODO Page Description

## Examples

### Action Plan

```html {.example}
<wa-card>
  <h3>Manage subscription</h3>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptatibus corrupti atque repudiandae nam.</p>
  <wa-button>Change Plan</wa-button>
</wa-card>
```

### Feeds

```html {.example}
<div class="activity-feed">
  <div class="activity-group">
    <span class="connector"></span>
    <div class="activity">
      <wa-icon name="user-circle" class="fa-fw"></wa-icon>
      <p>Kicked ass and <strong>chewed bubblegum</strong></p>
      <span style="margin-left: auto"><em>Oct. 31st</em></span>
    </div>
  </div>
  <div class="activity-group">
    <span class="connector"></span>
    <div class="activity">
      <wa-icon name="thumbs-up" style="color: blue" class="fa-fw"></wa-icon>
      <p>Kicked ass and <strong>chewed bubblegum</strong></p>
      <span style="margin-left: auto"><em>Oct. 31st</em></span>
    </div>
  </div>
  <div class="activity-group">
    <span class="connector"></span>
    <div class="activity">
      <wa-icon name="crown" class="fa-fw"></wa-icon>
      <p>Kicked ass and <strong>chewed bubblegum</strong></p>
      <span style="margin-left: auto"><em>Oct. 31st</em></span>
    </div>
  </div>
  <div class="activity-group">
    <span class="connector"></span>
    <div class="activity">
      <wa-icon name="turtle" style="color: green" class="fa-fw"></wa-icon>
      <p>Kicked ass and <strong>chewed bubblegum</strong></p>
      <span style="margin-left: auto"><em>Oct. 31st</em></span>
    </div>
  </div>

</div>

<style>
  :root {
    --border-color: var(--wa-color-surface-border);
  }
  .activity-feed {
    wa-icon {
      margin-right: 1rem;
      font-size: 32px;
    }
    .fa-fw {
      text-align: center;
      width: 1.25em;
    }
    .activity {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .activity-group:not(:first-child) {
          margin-top: .5rem;
    }
    .activity-group {
      position: relative;
    }

    .connector {
      position: absolute;
    background-color: var(--border-color);
    height: 25%;
    width: 0.125rem;
    margin-left: -1px;
    top: 2.5rem;
    left: 1rem;
    }

    .activity-group:last-of-type .connector {
      display: none;
    }
  }
</style>
```

### Grid

```html {.example}
  <div>
    <ul class="grid-list">
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>John Carpenter</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
            </div>
          <div>
            <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"label="Avatar of a gray tabby kitten looking down">
            </wa-avatar>
          </div>
          </div>
          <div class="contact-info">
            <div>
              <wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon>
              Email
            </div>
            <div>
              <wa-icon name="phone" style="color: var(--wa-color-brand-spot);">
              </wa-icon>
              Phone
            </div>
          </div>
        </wa-card>
      </li>
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>Tobe Hooper</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
            </div>
          <div>
            <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar>
            </div>
          </div>
          <div class="contact-info">
            <div><wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon> Email</div>
            <div><wa-icon name="phone" style="color: var(--wa-color-brand-spot);"></wa-icon> Phone</div>
          </div>
        </wa-card>
      </li>
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>George A. Romero</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
              </div>
          <div><wa-avatar
  image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  label="Avatar of a gray tabby kitten looking down"
></wa-avatar>
</div>
          </div>
          <div class="contact-info">
            <div><wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon> Email</div>
            <div><wa-icon name="phone" style="color: var(--wa-color-brand-spot);"></wa-icon> Phone</div>
          </div>
        </wa-card>
      </li>
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>Alfred Hitchcock</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
              </div>
          <div>
            <wa-avatar
  image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  label="Avatar of a gray tabby kitten looking down"
></wa-avatar>
</div>
          </div>

          <div class="contact-info">
            <div><wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon> Email</div>
            <div><wa-icon name="phone" style="color: var(--wa-color-brand-spot);"></wa-icon> Phone</div>
          </div>
        </wa-card>
      </li>
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>Sam Raimi</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
            </div>
            <div>
              <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar>
            </div>
          </div>
          <div class="contact-info">
            <div><wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon> Email</div>
            <div><wa-icon name="phone" style="color: var(--wa-color-brand-spot);"></wa-icon> Phone</div>
          </div>
        </wa-card>
      </li>
      <li>
        <wa-card>
          <div class="card-top">
            <div>
              <strong>Wes Craven</strong>
              <wa-badge pill>Admin</wa-badge>
              <p>Master of Horror</p>
            </div>
          <div>
            <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar>
            </div>
          </div>
          <div class="contact-info">
            <div><wa-icon name="envelope" style="color: var(--wa-color-brand-spot);"></wa-icon> Email</div>
            <div><wa-icon name="phone" style="color: var(--wa-color-brand-spot);"></wa-icon> Phone</div>
          </div>
        </wa-card>
      </li>
    </ul>
  </div>
  <style>
    .grid-list {
      wa-card {
        display: flex;
        flex-direction: column;
      }
      wa-card::part(body) {
        padding: 0;
      }

      .card-top {
        padding: var(--wa-space-xl);
        border-bottom: 1px solid var(--wa-color-surface-border);
        display: flex;
        justify-content: space-between;
      }

      .contact-info {
        div {
          width: 50%;
          padding: var(--wa-space-xl);
          display: flex;
          align-items: center;
          wa-icon {
            margin-right: .5rem;
          }
        }

        div:first-of-type {
          border-right: .25px solid var(--wa-color-surface-border);
        }
        div:last-of-type {
          border-left: .25px solid var(--wa-color-surface-border);
        }
        display: flex;
      }
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
      list-style-type: none;
      margin: 0;
    }
  </style>
```

## Pagination

### Simple Pagination

```html {.example}
  <wa-card with-footer style="width: 100%;" class="simple-pagination">
    <div></div>
    <div slot="footer" class="footer">
      Showing 1 to 10 of 50 Results
      <span>
        <wa-button><wa-icon slot="prefix" name="gear" variant="solid"></wa-icon> Prev</wa-button>
        <wa-button>Next <wa-icon slot="suffix" name="gear" variant="solid"></wa-icon></wa-button>
      </span>
    </div>
  </wa-card>
  <style>
    .simple-pagination {
      .footer {
            display: flex;
    justify-content: space-between;
    align-items: center;
      }
    }
  </style>
```
### Multi Page

```html {.example}
<wa-card with-footer style="width: 100%;" class="simple-pagination">
    <div></div>
    <div slot="footer" class="footer">
      Showing 1 to 10 of 50 Results
      <span>
       <wa-button-group label="Alignment">
  <wa-button size="small"><wa-icon name="exclamation-triangle"></wa-icon></wa-button>
  <wa-button size="small">1</wa-button>
  <wa-button size="small">2</wa-button>
  <wa-button size="small">...</wa-button>
  <wa-button size="small">9</wa-button>
  <wa-button size="small">10</wa-button>
  <wa-button size="small"><wa-icon name="exclamation-triangle"></wa-icon></wa-button>
</wa-button-group>
      </span>
    </div>
  </wa-card>
  <style>
    .simple-pagination {
      .footer {
            display: flex;
    justify-content: space-between;
    align-items: center;
      }
    }
  </style>
```

## Comment Box

```html{.example}
<form class="comment-box">
<wa-card with-footer>
  <wa-textarea resize="auto"></wa-textarea>
  <div slot="footer" class="comment-footer">
    <wa-button variant="text">
  <wa-icon slot="prefix" name="paperclip" variant="solid"></wa-icon>
  Attach a file
</wa-button><wa-button>Comment</wa-button>
  </div>
</wa-card>
</form>
<style>
  .comment-box {
    wa-card {
      width: 100%;
    }


    div.comment-footer {
      display: flex;
      justify-content: space-between;

    }
  }
</style>
```

## Description List

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

## FAQ/Details (WIP)

```html{.example}
<div>
  <dl>
    <div>
    <dt>Beast of Bodmin</dt>
    <dd>A large feline inhabiting Bodmin Moor.</dd>
    </div>
  </dl>
</div>
```

## Pricing Tiers (WIP)

```html{.example}
```

## Empty States

### Simple

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

### With dashed border

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

## Data Display

### With icon

```html{.example}
<div class="data-display">
  <h3>Last Week</h3>
  <div class="with-icon">
    <dl>
      <wa-card with-footer>
        <dt>
          <div class="icon-bg" style="--icon-bg: #9b31ee">
            <wa-icon style="color: white; font-size: 16px;"  name="users"></wa-icon>
          </div>
          <p class="stat-title">Total Subscribers</p>
        </dt>
        <dd>
          <span class="stat">71,897</span>
          <span style="color: green;"><wa-icon fixed-width name="arrow-up"></wa-icon> 122</span>
        </dd>
        <div slot="footer">
          <a href="#">View all</a>
        </div>
      </wa-card>
     <wa-card with-footer>
        <dt>
          <div class="icon-bg" style="--icon-bg: #62e5cf">
            <wa-icon style="color: white; font-size: 16px;"  name="users"></wa-icon>
          </div>
          <p class="stat-title">Total Subscribers</p>
        </dt>
        <dd>
          <span class="stat">71,897</span>
          <span style="color: green;"><wa-icon fixed-width name="arrow-up"></wa-icon> 122</span>
        </dd>
        <div slot="footer">
          <a href="#">View all</a>
        </div>
      </wa-card>
    </dl>


  </div>

</div>
<style>
  .with-icon {
    dl {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 0;

      wa-card::part(body) {

      }

      wa-card::part(footer) {
        background: #fafafa;
        border-bottom-left-radius: var(--wa-panel-border-radius);
        border-bottom-right-radius: var(--wa-panel-border-radius);
        padding: 1rem;
      }

      wa-card dt .icon-bg {
        --icon-bg: #eee;
        background: var(--icon-bg);
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
        border-radius: 0.5rem;
        position: absolute;
      }

      wa-card dt .stat-title {
    margin-left: 4rem;
    margin-bottom: 0;
  }

      wa-card dd {
                    margin-left: 4rem;
                    margin-bottom: 0;
        .stat {
    font-size: x-large;
    font-weight: 600;
    line-height: .5rem;
  }
      }
    }
  }
  </style>
```

### With shared borders
```html{.example}
<wa-card class="with-shared-borders">
  <dl>
    <div style="--img-bg: transparent; padding: .67rem;">
      <dt>Total Subscribers</dt>
      <dd style="margin: 0;">
        <div class="stat" style="--img-bg: transparent; border: none;">
          71,897
          <span class="from-stat">from 70,946</span>
        </div>
        <div>
          <wa-tag size="medium" variant="success" pill>
            <wa-icon name="arrow-up" style="margin-right: .25rem;"></wa-icon> 12%
          </wa-tag>
        </div>
      </dd>
    </div>
    <div style="--img-bg: transparent; padding: .67rem;">
      <dt>Total Subscribers</dt>
      <dd style="margin: 0;">
        <div class="stat" style="--img-bg: transparent; border: none;">
          71,897
          <span class="from-stat">from 70,946</span>
        </div>
        <div>
          <wa-tag size="medium" variant="success" pill>
            <wa-icon name="arrow-up" style="margin-right: .25rem;"></wa-icon> 12%
          </wa-tag>
        </div>
      </dd>
    </div>

  </dl>
</wa-card>
<style>
  .with-shared-borders {
    width: 100%;
    dl {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      margin: 0;

      dt {
        color: #8991A6;
        font-size: 14px;
      }


      div {
        border-right-style: solid;
        border-right-width: 1px;
        border-right-color: var(--wa-color-surface-border);

        dd {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        dd .stat {
          font-size: x-large;
          font-weight: 600;
          line-height: .5rem;
          color: #6741D9;
        }

        dd .stat .from-stat {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: #8991A6;
        }
      }

      div:last-of-type {
        border: none;
      }
    }


  }

   wa-card.with-shared-borders::part(body) {
        padding: 0;
      }

  wa-card.shared-borders::part(body) {

  --spacing: 0;
}
</style>
```

## Leaderboard (Very rough WIP)
```html{.example}
<div class="leaderboard">
  <h3 style="grid-column: 1/-1">Collective Activity for Yesterday</h3>

    <wa-card class="activity-card" style="--wa-color-surface-default: tomato; --wa-color-text-normal: white; grid-column: 1/5;">
      <span>
        <wa-icon name="book"></wa-icon>
        Items Studied
      </span>
      <div class="leaderboard-number">482,813</div>
    </wa-card>
    <wa-card class="activity-card" style="--wa-color-surface-default: cadetblue; --wa-color-text-normal: white; grid-column: 5/9">
      <span>
        <wa-icon name="user-ninja"></wa-icon>
        Items Mastered
      </span>
      <div class="leaderboard-number">97,303</div>
    </wa-card>
    <wa-card class="activity-card" style="--wa-color-surface-default: rebeccapurple; --wa-color-text-normal: white; grid-column: 9/-1">
      <span>
        <wa-icon name="user-ninja"></wa-icon>
        Items Mastered
      </span>
      <div class="leaderboard-number">97,303</div>
    </wa-card>

  <wa-card class="card-header" with-header style="grid-column: 2/12">
    <div slot="header">
      <div class="leaderboard-badge">
        <wa-icon name="trophy"></wa-icon>
      </div>
      <span>
        <h4 style="--wa-space-xl: 0;">Study Leaders</h4>
        items mastered last 7 days
      </span>
    </div>
    <ol class="leaderboard-list">
      <li>
        <div>
        <span>
          <h5 style="--wa-space-xl: 0">Title</h5>
          <span style="font-size: x-large;font-weight: 700;">4,500</span>
        </span>
        </div>
      </li>
      <li>
        <div>

        <span>
          <h5 style="--wa-space-xl: 0">Title</h5>
          <span style="font-size: x-large;font-weight: 700;">4,500</span>
        </span>
        </div>
      </li>
      <li>
        <div>
        <span>
          <h5 style="--wa-space-xl: 0">Title</h5>
          <span style="font-size: x-large;font-weight: 700;">4,500</span>
        </span>
        </div>
      </li>
      <li>
        <div>
        <span>
          <h5 style="--wa-space-xl: 0">Title</h5>
          <span style="font-size: x-large;font-weight: 700;">4,500</span>
        </span>
        </div>
      </li>
    </ol>
  </wa-card>

</div>
<style>
  img.leaderboard-image {
    width: 50px
  }
  .leaderboard {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
  }

  .leaderboard-list {
    li {
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--wa-color-surface-border);
    }
    li div {
      display: flex;
    }
  }
  .activity-card {

  }

  .leaderboard .card-header [slot='header'] {
   display: flex;
  }

  .leaderboard-number {
    font-size: xx-large;
    font-weight: 600;
  }

  .leaderboard-badge {
       background: green;
    color: white;
    padding: 1rem;
    border-radius: var(--wa-panel-border-radius);
    margin-right: .75rem;
  }
</style>
```

## Pricing
```html{.example}
<div class="pricing">
  <wa-card with-footer class="plan">
    <div class="card-body">
      <div class="plan-title">Basic Plan</div>
      <span class="plan-price">
        <span style="font-size: xxx-large; font-weight: 800;letter-spacing: -2.5px;">$10</span>
        <span style="margin-left: 0.5rem;">
          <p style="margin-bottom: 0;">per user</p>
          <p style="margin-bottom: 0;">per month</p>
        </span>
      </span>
      <p>Basic features for up to 10 users.</p>
      <wa-button style="width: 100%; margin-bottom: 1rem;">Get Started</wa-button>
      <wa-button style="width: 100%; margin-bottom: 1rem;" appearance="outlined">Talk to sales</wa-button>
    </div>
      <div slot="footer" class="features">
        <span class="list-title">Features</span>
        <p style="margin-bottom: var(--wa-space-s);">Everything in our free plans plus...</p>
        <ul>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Access to basic features
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic Reporting and analytics
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Up to 10 individual users
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            20GB Individual data each user
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic chat and email support
          </li>
        </ul>
      </div>
  </wa-card>
  <wa-card with-footer class="plan">
    <div class="card-body">
      <div class="plan-title" style="display: flex; justify-content: space-between;">Business Plan <wa-badge variant="success" pill>Most Popular</wa-badge></div>
      <span class="plan-price">
        <span style="font-size: xxx-large; font-weight: 800;"letter-spacing: -2.5px;>$20</span>
        <span style="margin-left: 0.5rem;">
          <p style="margin-bottom: 0;">per user</p>
          <p style="margin-bottom: 0;">per month</p>
        </span>
      </span>
      <p>Growing teams up to 20 users.</p>
      <wa-button style="width: 100%; margin-bottom: 1rem;">Get Started</wa-button>
      <wa-button style="width: 100%; margin-bottom: 1rem;" appearance="outlined">Talk to sales</wa-button>
    </div>
      <div slot="footer" class="features">
        <span class="list-title">Features</span>
        <p style="margin-bottom: var(--wa-space-s);">Everything in Basic plus...</p>
        <ul>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            200+ integrations
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic Reporting and analytics
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Up to 10 individual users
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            20GB Individual data each user
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic chat and email support
          </li>
        </ul>
      </div>
  </wa-card>
  <wa-card with-footer class="plan">
    <div class="card-body">
      <div class="plan-title">Basic Plan</div>
      <span class="plan-price">
        <span style="font-size: xxx-large; font-weight: 800;"letter-spacing: -2.5px;>$40</span>
        <span style="margin-left: 0.5rem;">
          <p style="margin-bottom: 0;">per user</p>
          <p style="margin-bottom: 0;">per month</p>
        </span>
      </span>
      <p>Basic features for up to 10 users.</p>
      <wa-button style="width: 100%; margin-bottom: 1rem;">Get Started</wa-button>
      <wa-button style="width: 100%; margin-bottom: 1rem;" appearance="outlined">Talk to sales</wa-button>
    </div>
      <div slot="footer" class="features">
        <span class="list-title">Features</span>
        <p style="margin-bottom: var(--wa-space-s);">Everything in our free plans plus...</p>
        <ul>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Access to basic features
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic Reporting and analytics
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Up to 10 individual users
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            20GB Individual data each user
          </li>
          <li>
            <wa-icon name="circle-check" style="color: #63e6be; margin-right: .25rem;"></wa-icon>
            Basic chat and email support
          </li>
        </ul>
      </div>
  </wa-card>
</div>
<style>
.pricing {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  .plan {
  }
  .plan-title {
    font-weight: 600;
  }
  .plan-price {
    display: flex;
    align-items: center;
  }
  .features {
    .list-title {
      text-transform: uppercase;
      font-weight: 600;
    }
    ul {
      list-style: none;
      margin-left: 0;
      li {
        margin-bottom: .5rem;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
```
```html{.example}
  <div>
    <wa-card>
      <div class="card-body">
        <wa-details summary="Toggle Me">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</wa-details>

      </div>
    </wa-card>
  </div>
```
### With templates

### With recommendations grid
