---
title: Leaderboard
description: 'Engage and motivate users by highlighting top performers, scores, and achievements.'
---

## Simple

```html {.example}
<div class="wa-stack">
  <h3>Daily Crossword</h3>
  <div class="wa-grid">
    <wa-callout variant="warning" appearance="filled">
      <wa-icon slot="icon" name="timer"></wa-icon>
      <div class="wa-stack wa-gap-xs">
        <span class="wa-heading-l">11h 54m 52s</span>
        <span class="wa-caption-m">until play ends</span>
      </div>
    </wa-callout>
    <wa-callout variant="neutral" appearance="filled">
      <wa-icon slot="icon" name="user-group"></wa-icon>
      <div class="wa-stack wa-gap-xs">
        <span class="wa-heading-l">304</span>
        <span class="wa-caption-m">players on this leaderboard</span>
      </div>
    </wa-callout>
  </div>
  <wa-card>
    <div class="wa-stack">
      <ol class="wa-stack">
        <li class="wa-flank">
          <div class="wa-cluster">
            <wa-icon name="1" fixed-width></wa-icon>
            <wa-avatar>
              <wa-icon slot="icon" name="hat-wizard"></wa-icon>
            </wa-avatar>
          </div>
          <div class="wa-split wa-gap-xs">
            <span>wordwiz</span>
            <small class="wa-caption-l">00:01:41</small>
          </div>
        </li>
        <wa-divider></wa-divider>
        <li class="wa-flank">
          <div class="wa-cluster">
            <wa-icon name="2" fixed-width></wa-icon>
            <wa-avatar initials="A"></wa-avatar>
          </div>
          <div class="wa-split wa-gap-xs">
            <span>acrossNdown</span>
            <small class="wa-caption-l">00:01:58</small>
          </div>
        </li>
        <wa-divider></wa-divider>
        <li class="wa-flank">
          <div class="wa-cluster">
            <wa-icon name="3" fixed-width></wa-icon>
            <wa-avatar initials="X"></wa-avatar>
          </div>
          <div class="wa-split wa-gap-xs">
            <span>XwordChamp</span>
            <small class="wa-caption-l">00:02:14</small>
          </div>
        </li>
        <wa-divider></wa-divider>
        <li class="wa-flank">
          <div class="wa-cluster">
            <wa-icon name="4" fixed-width></wa-icon>
            <wa-avatar>
              <wa-icon slot="icon" name="chess-knight"></wa-icon>
            </wa-avatar>
          </div>
          <div class="wa-split wa-gap-xs">
            <span>puzzlepoet</span>
            <small class="wa-caption-l">00:02:16</small>
          </div>
        </li>
        <wa-divider></wa-divider>
        <li class="wa-flank">
          <div class="wa-cluster">
            <wa-icon name="5" fixed-width></wa-icon>
            <wa-avatar initials="R"></wa-avatar>
          </div>
          <div class="wa-split wa-gap-xs">
            <span>RiddleMeThis</span>
            <small class="wa-caption-l">00:02:34</small>
          </div>
        </li>
      </ol>
    </div>
    <div slot="footer">
      <a href="" class="wa-cluster wa-gap-xs wa-caption-m">
        <span>View all standings</span>
        <wa-icon name="arrow-right"></wa-icon>
      </a>
    </div>
  </wa-card>
</div>
```

## Two Column

```html {.example}
<div class="wa-stack">
  <h3>Collective Activity for Yesterday</h3>
  <div class="wa-grid">
    <wa-callout variant="neutral" appearance="filled">
      <wa-icon slot="icon" name="book"></wa-icon>
      <div class="wa-stack wa-gap-0">
        <h4 class="wa-heading-xs">Items Studied</h4>
        <div class="wa-heading-2xl">482,813</div>
      </div>
    </wa-callout>
    <wa-callout variant="brand" appearance="filled">
      <wa-icon slot="icon" name="diploma"></wa-icon>
      <div class="wa-stack wa-gap-0">
        <h4 class="wa-heading-xs">Items Mastered</h4>
        <div class="wa-heading-2xl">67,106</div>
      </div>
    </wa-callout>
    <wa-callout variant="success" appearance="filled">
      <wa-icon slot="icon" name="wand-sparkles"></wa-icon>
      <div class="wa-stack wa-gap-0">
        <h4 class="wa-heading-xs">Items Created</h4>
        <div class="wa-heading-2xl">2,080</div>
      </div>
    </wa-callout>
  </div>
  <div class="wa-grid">
    <wa-card>
      <div slot="header" class="wa-flank wa-gap-xl">
        <wa-icon name="graduation-cap" class="wa-heading-xl"></wa-icon>
        <span class="wa-gap-2xs wa-stack">
          <h4>Study Leaders</h4>
          <span class="wa-caption-m">Items mastered in the last 7 days</span>
        </span>
      </div>
      <div class="wa-stack">
        <ol class="wa-stack">
          <li class="wa-flank">
            <div class="wa-cluster">
              <wa-icon name="1" fixed-width></wa-icon>
              <wa-avatar image="https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=3418&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" shape="rounded"></wa-avatar>
            </div>
            <div class="wa-split wa-gap-xs">
              <span>mitsuwo</span>
              <small class="wa-caption-l">2,753</small>
            </div>
          </li>
          <wa-divider></wa-divider>
          <li class="wa-flank">
            <div class="wa-cluster">
              <wa-icon name="2" fixed-width></wa-icon>
              <wa-avatar image="https://images.unsplash.com/photo-1639628735078-ed2f038a193e?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" shape="rounded"></wa-avatar>
            </div>
            <div class="wa-split wa-gap-xs">
              <span>knowledgeninja</span>
              <small class="wa-caption-l">2,298</small>
            </div>
          </li>
          <wa-divider></wa-divider>
          <li class="wa-flank">
            <div class="wa-cluster">
              <wa-icon name="3" fixed-width></wa-icon>
              <wa-avatar image="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" shape="rounded"></wa-avatar>
            </div>
            <div class="wa-split wa-gap-xs">
              <span>NxtLvl</span>
              <small class="wa-caption-l">2,008</small>
            </div>
          </li>
          <wa-divider></wa-divider>
          <li class="wa-flank">
            <div class="wa-cluster">
              <wa-icon name="4" fixed-width></wa-icon>
              <wa-avatar image="https://images.unsplash.com/photo-1630549316063-7ae02749d2cc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" shape="rounded"></wa-avatar>
            </div>
            <div class="wa-split wa-gap-xs">
              <span>brainiac</span>
              <small class="wa-caption-l">1,954</small>
            </div>
          </li>
          <wa-divider></wa-divider>
          <li class="wa-flank">
            <div class="wa-cluster">
              <wa-icon name="5" fixed-width></wa-icon>
              <wa-avatar image="https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" shape="rounded"></wa-avatar>
            </div>
            <div class="wa-split wa-gap-xs">
              <span>eduexplorer</span>
              <small class="wa-caption-l">1,897</small>
            </div>
          </li>
        </ol>
      </div>
    </wa-card>
    <wa-card>
      <div slot="header" class="wa-flank wa-gap-xl">
        <wa-icon name="hat-wizard" class="wa-heading-xl"></wa-icon>
        <span class="wa-gap-2xs wa-stack">
          <h4>Creation Leaders</h4>
          <span class="wa-caption-m">Items created in the last 7 days</span>
        </span>
      </div>
      <div class="wa-stack">
        <ol class="wa-stack">
          <li class="wa-flank">
            <div class="wa-cluster">
              <wa-icon name="1" fixed-width></wa-icon>
              <wa-avatar image="https://images.unsplash.com/photo-1630549316063-7ae02749d2cc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" shape="rounded"></wa-avatar>
            </div>
            <div class="wa-split wa-gap-xs">
              <span>brainiac</span>
              <small class="wa-caption-l">134</small>
            </div>
          </li>
          <wa-divider></wa-divider>
          <li class="wa-flank">
            <div class="wa-cluster">
              <wa-icon name="2" fixed-width></wa-icon>
              <wa-avatar image="https://images.unsplash.com/photo-1546776230-bb86256870ce?q=80&w=3368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" shape="rounded"></wa-avatar>
            </div>
            <div class="wa-split wa-gap-xs">
              <span>LessonLegend</span>
              <small class="wa-caption-l">115</small>
            </div>
          </li>
          <wa-divider></wa-divider>
          <li class="wa-flank">
            <div class="wa-cluster">
              <wa-icon name="3" fixed-width></wa-icon>
              <wa-avatar image="https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=3418&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" shape="rounded"></wa-avatar>
            </div>
            <div class="wa-split wa-gap-xs">
              <span>mitsuwo</span>
              <small class="wa-caption-l">98</small>
            </div>
          </li>
          <wa-divider></wa-divider>
          <li class="wa-flank">
            <div class="wa-cluster">
              <wa-icon name="4" fixed-width></wa-icon>
              <wa-avatar image="https://images.unsplash.com/photo-1586374579358-9d19d632b6df?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" shape="rounded"></wa-avatar>
            </div>
            <div class="wa-split wa-gap-xs">
              <span>wiswiz</span>
              <small class="wa-caption-l">79</small>
            </div>
          </li>
          <wa-divider></wa-divider>
          <li class="wa-flank">
            <div class="wa-cluster">
              <wa-icon name="5" fixed-width></wa-icon>
              <wa-avatar image="https://images.unsplash.com/photo-1639628735078-ed2f038a193e?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" shape="rounded"></wa-avatar>
            </div>
            <div class="wa-split wa-gap-xs">
              <span>knowledgeninja</span>
              <small class="wa-caption-l">77</small>
            </div>
          </li>
        </ol>
      </div>
    </wa-card>
  </div>
</div>
```