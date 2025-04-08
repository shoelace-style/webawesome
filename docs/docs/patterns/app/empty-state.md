---
title: Empty State
description: 'Guide users with helpful prompts and visuals when no content is available.'
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

## With Interactive Placeholder

```html {.example}
<a href="" class="wa-stack wa-align-items-center wa-placeholder wa-link-plain" style="max-width: 60ch; margin: auto">
  <wa-icon name="ufo-beam" class="wa-caption-l" family="sharp" style="font-size: var(--wa-font-size-3xl)"></wa-icon>
  <p class="wa-heading-m">No Custom Icons</p>
  <p style="text-align: center">Add your own icon or logo to get started.</p>
</a>
```

## With Templates

```html {.example}
<wa-card with-header with-footer style="max-width: 70ch; margin: auto">
  <div slot="header" class="wa-stack wa-gap-xs">
    <h2 class="wa-heading-m">Projects</h2>
  </div>
  <div class="wa-stack wa-gap-xl">
    <p class="wa-caption-m">You haven’t created a project yet. Get started by selecting a template or start with a blank canvas.</p>
    <div class="wa-grid wa-gap-xl" style="--min-column-size: 30ch;">
      <a href="" class="wa-flank wa-align-items-start wa-link-plain">
        <wa-avatar shape="rounded" style="--background-color: var(--wa-color-yellow-90);color: var(--wa-color-yellow-40);">
          <wa-icon slot="icon" name="note-sticky"></wa-icon>
        </wa-avatar>
        <div class="wa-stack wa-gap-2xs">
          <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
            Create a Quick Note <wa-icon name="arrow-right"></wa-icon>
          </span>
          <p class="wa-caption-m">
            Jot down any idea. Will it make sense later? Who knows.
          </p>
        </div>
      </a>
      <a href="" class="wa-flank wa-align-items-start wa-link-plain">
        <wa-avatar shape="rounded" style="--background-color: var(--wa-color-red-90);color: var(--wa-color-red-40);">
          <wa-icon slot="icon" name="list-check"></wa-icon>
        </wa-avatar>
        <div class="wa-stack wa-gap-2xs">
          <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
            Create a Checklist <wa-icon name="arrow-right"></wa-icon>
          </span>
          <p class="wa-caption-m">
            The ultimate tool for looking busy.
          </p>
        </div>
      </a>
      <a href=""class="wa-flank wa-align-items-start wa-link-plain">
        <wa-avatar shape="rounded" style="--background-color: var(--wa-color-purple-90);color: var(--wa-color-purple-40);">
          <wa-icon slot="icon" name="table-cells"></wa-icon>
        </wa-avatar>
        <div class="wa-stack wa-gap-2xs">
          <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
            Create a Spreadsheet <wa-icon name="arrow-right"></wa-icon>
          </span>
          <p class="wa-caption-m">
            Endless rows and columns of tiny, soul-crushing numbers.
          </p>
        </div>
      </a>
      <a href="" class="wa-flank wa-align-items-start wa-link-plain">
        <wa-avatar shape="rounded" style="--background-color: var(--wa-color-orange-90);color: var(--wa-color-orange-40);">
          <wa-icon slot="icon" name="presentation-screen"></wa-icon>
        </wa-avatar>
        <div class="wa-stack wa-gap-2xs">
          <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
            Create a Slideshow <wa-icon name="arrow-right"></wa-icon>
          </span>
          <p class="wa-caption-m">
            Dramatic transitions make everything seem more official.
          </p>
        </div>
      </a>
      <a href="" class="wa-flank wa-align-items-start wa-link-plain">
        <wa-avatar shape="rounded" style="--background-color: var(--wa-color-green-90);color: var(--wa-color-green-40);">
          <wa-icon slot="icon" name="pen-field"></wa-icon>
        </wa-avatar>
        <div class="wa-stack wa-gap-2xs">
          <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
            Create a Form <wa-icon name="arrow-right"></wa-icon>
          </span>
          <p class="wa-caption-m">
            Collect the deepest personal details and darkest secrets.
          </p>
        </div>
      </a>
      <a href="" class="wa-flank wa-align-items-start wa-link-plain">
        <wa-avatar shape="rounded" style="--background-color: var(--wa-color-blue-90);color: var(--wa-color-blue-40);">
          <wa-icon slot="icon" name="image"></wa-icon>
        </wa-avatar>
        <div class="wa-stack wa-gap-2xs">
          <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
            Create a Photo Album <wa-icon name="arrow-right"></wa-icon>
          </span>
          <p class="wa-caption-m">
            Curate your best memories or most basic food pictures.
          </p>
        </div>
      </a>
    </div>
  </div>
  <div slot="footer">
    <a href="" class="wa-cluster wa-gap-xs">
      <span>Or start with a blank canvas</span>
      <wa-icon name="arrow-right"></wa-icon>
    </a>
  </div>
</wa-card>
```
## Add people 
```html {.example}
<wa-card style="max-width: 60ch; margin: 0 auto;">
  <div class="wa-stack wa-gap-xs">
    <h3 class="wa-heading-m">Add team members</h3>
    <p>This project is awful lonely. Invite some team members to liven up the joint.</p>
    <div class="wa-flank:end wa-gap-xs">
      <wa-input></wa-input><wa-button>Invite</wa-button>
    </div>
    <div class="wa-stack">
      <em class="wa-caption-l">Team members previously added to projects</em>
      <wa-divider></wa-divider>
      <section>
        <div class="wa-flank">
          <wa-avatar image="https://images.unsplash.com/photo-1614807547811-4174d3582092?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="profile image"></wa-avatar>
        <div class="wa-split">
          <div class="wa-stack wa-gap-0">
            <span class="wa-heading-s">Earl Upton</span>
            <span class="wa-caption-m">DevOps</span>
          </div>
          <wa-button appearance="plain">
            <wa-icon name="user-plus" slot="prefix"></wa-icon>  
            Invite
          </wa-button>
        </div>
        </div>
        <wa-divider></wa-divider>
      </section>
      <section>
        <div class="wa-flank">
          <wa-avatar image="https://images.unsplash.com/photo-1613428800237-c86372070fab?q=80&w=3017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" lable="profile image"></wa-avatar>
        <div class="wa-split">
          <div class="wa-stack wa-gap-0">
            <span class="wa-heading-s">Steamboat Willie</span>
            <span class="wa-caption-m">Captain</span>
          </div>
          <wa-button appearance="plain">
            <wa-icon name="user-plus" slot="prefix"></wa-icon>  
            Invite
          </wa-button>
        </div>
        </div>
        <wa-divider></wa-divider>
      </section>
      <section>
        <div class="wa-flank">
          <wa-avatar image="https://images.unsplash.com/photo-1678582967399-bf558533f5eb?q=80&w=3029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="profile image"></wa-avatar>
        <div class="wa-split">
          <div class="wa-stack wa-gap-0">
            <span class="wa-heading-s">Melissa Eckers</span>
            <span class="wa-caption-m">Cloud Engineer</span>
          </div>
          <wa-button appearance="plain">
            <wa-icon name="user-plus" slot="prefix"></wa-icon>  
            Invite
          </wa-button>
        </div>
        </div>
        <wa-divider></wa-divider>
      </section><section>
        <div class="wa-flank">
          <wa-avatar image="https://images.unsplash.com/photo-1559188286-a173792c8340?q=80&w=2906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="profile image"></wa-avatar>
        <div class="wa-split">
          <div class="wa-stack wa-gap-0">
            <span class="wa-heading-s">Devin Shears</span>
            <span class="wa-caption-m">UX Writer</span>
          </div>
          <wa-button appearance="plain">
            <wa-icon name="user-plus" slot="prefix"></wa-icon>  
            Invite
          </wa-button>
        </div>
        </div>
        <wa-divider></wa-divider>
      </section>
    </div>
  </div>
</wa-card>
```