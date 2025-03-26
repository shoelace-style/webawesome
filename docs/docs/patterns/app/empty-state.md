---
title: Empty State
description: TODO
---
## Examples

### Simple
```html{.example}
 <div class="wa-stack wa-align-items-center">
  <wa-icon name="folder" style="font-size: 60px;"></wa-icon>
  <span class="wa-heading-s">No Projects</span>
  <p class="wa-caption-m">Get started by creating a new project.</p>
  <wa-button>
    <wa-icon slot="prefix" name="plus"></wa-icon>
    New Project
  </wa-button>
</div>
```

### With border

```html{.example}
  <a href="#" class="wa-align-items-center wa-callout wa-neutral wa-outlined wa-stack" style="max-width: 480px; margin: 0 auto; text-decoration: none;">
    <wa-icon name="database" style="font-size: 64px;"></wa-icon>
    <div class="wa-stack wa-align-items-center wa-gap-2xs">
      <p class="wa-heading-m">No DBs</p>
      <p>Get started by creating a database.</p>
    </div>
  </a>
```
### With starting points

```html{.example}
<wa-card with-header with-footer style="max-width: 720px; margin: 0 auto;">
  <div slot="header" class="wa-stack wa-gap-xs">
    <h2 class="wa-heading-m">Projects</h2>
    <p class="wa-caption-m">You haven’t created a project yet. Get started by selecting a template or start from an empty project.</p>
  </div>
  <div class="wa-grid" style="--min-column-size: 30ch;">
    <a href="#" class="wa-flank" style="text-decoration: none;">
      <wa-icon name="bars" class="wa-callout wa-neutral wa-outlined" style="font-size: 16px;"></wa-icon>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a List <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Another to-do system you’ll try but eventually give up on.
        </p>
      </div>
    </a>
    <a href="#" class="wa-flank" style="text-decoration: none;">
      <wa-icon name="image" class="wa-callout wa-neutral wa-outlined" style="font-size: 16px;"></wa-icon>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a Gallery <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Great for mood boards and inspiration.
        </p>
      </div>
    </a>
    <a href="#"class="wa-flank" style="text-decoration: none;">
      <wa-icon name="table-cells" class="wa-callout wa-neutral wa-outlined" style="font-size: 16px;"></wa-icon>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a Spreadsheet <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Helps keep up with the numbers.
        </p>
      </div>
    </a>
    <a href="#" class="wa-flank" style="text-decoration: none;">
      <wa-icon name="calendar" class="wa-callout wa-neutral wa-outlined" style="font-size: 16px;"></wa-icon>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a Calendar <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Stay on top of your deadlines, or don’t — it’s up to you.
        </p>
      </div>
    </a>
    <a href="#" class="wa-flank" style="text-decoration: none;">
      <wa-icon name="table-columns" class="wa-callout wa-neutral wa-outlined" style="font-size: 16px;"></wa-icon>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-align-items-center wa-cluster wa-gap-xs wa-heading-s">
          Create a Board <wa-icon name="arrow-right"></wa-icon>
        </span>
        <p class="wa-caption-m">
          Track tasks in different stages of your project.
        </p>
      </div>
    </a>
    <a href="#" class="wa-flank" style="text-decoration: none;">
      <wa-icon name="clock" class="wa-callout wa-neutral wa-outlined" style="font-size: 16px;"></wa-icon>
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
    <a href="#">Or start from an empty project →</a>
  </div>
</wa-card>
```
