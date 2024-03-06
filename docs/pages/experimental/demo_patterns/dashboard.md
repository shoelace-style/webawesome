---
meta:
  title: Dashboard
  description: TODO
toc: false
---

<style>
  :root {
    --docs-content-max-width: 80rem;
  }
  html {
    background-color: var(--wa-color-surface-lowered);
  }

  .anchor-heading a {
    display: none;
  }

  #menu-toggle,
  #sidebar {
    display: none;
  }
  main {
    padding: initial;
    margin: var(--wa-space-xl);
  }
  .preview-container {
    container: preview / inline-size;
  }

  /* strata - support table */
  .support-table {
    font-size: var(--wa-font-size-s);
  }

  .support-table th {
    padding: var(--wa-space-l);
  }

  .support-table td {
    padding: var(--wa-space-m) var(--wa-space-l);
  }

  .support-table .desc {
    max-width: 30ch;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .support-table .excerpt {
    color: var(--wa-color-text-quiet);
  }

  .support-table wa-avatar {
    --size: var(--wa-font-size-2xl);
  }

  .support-table wa-card > * {
    border-radius: calc(var(--border-radius) - var(--border-width));
  }

  .wa\:card-title {
    font-size: var(--wa-font-size-l);
    margin-block-end: 0;
  }

  .wa\:statistic {
    & .wa\:card-title {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
    }

    & .wa\:value {
      font-size: var(--wa-font-size-2xl);
      font-weight: var(--wa-font-weight-heavy);
      line-height: var(--wa-font-line-height-compact);

      & + wa-badge > wa-icon {
        opacity: 0.6;
      }
    }
  }

  wa-card#glitches::part(body) {
    padding-block-end: 0;
  }

  wa-card.wa\:statistic::part(base) {
    justify-content: center;
  }

  .wa\:box-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--wa-color-brand-spot);
    color: var(--wa-color-brand-text-on-spot);
    border-radius: var(--wa-corners-s);
    width: 2.5em;
    height: 2.5em;
    font-size: var(--wa-font-size-l);
  }

  .wa\:contact {
    font-size: var(--wa-font-size-s);
  }

  wa-card::part(base) {
    height: 100%;
  }

  wa-checkbox[checked] {
    --wa-form-controls-value-color: var(--wa-color-text-quiet);
  }

  caption {
    color: var(--wa-color-text-normal);
    text-align: left;
    margin: var(--wa-space-xl) var(--wa-space-xl) var(--wa-space-l) var(--wa-space-xl);

    & h2 {
      margin: 0;
    }
  }

  figure {
    margin: 0;
    margin-inline: calc(var(--padding) * -1);
  }
  .sparkline { 
    height: 1em;
    transition: all .5s ease;
  }

  .sparkline .index { 
    position: relative;
    float: left; 
    width: 1%; 
    height: 6.25em; 
  }

  .sparkline .index .count { 
    display: block; 
    position: absolute; 
    bottom: 0; 
    left: 0; 
    width: 100%; 
    height: 0; 
    background: var(--wa-color-brand-spot);
    font: 0/0 a;
    text-shadow: none;
    color: transparent;
  }
  figcaption {
    display: block;
  }
</style>

<!-- cSpell:dictionaries lorem-ipsum -->

<div class="preview-container wa:arrange:flex:align-start:nowrap">
  <div class="wa:block-flow:l" style="display: flex; flex-direction: column; align-items: center;">
    <wa-icon-button name="crown" href="/" style="color: var(--wa-color-brand-spot);"></wa-icon-button>
    <wa-divider style="width: 100%;"></wa-divider>
    <wa-icon-button name="home"></wa-icon-button>
    <wa-icon-button name="calendar"></wa-icon-button>
    <wa-icon-button name="envelope"></wa-icon-button>
    <wa-icon-button name="chart-simple"></wa-icon-button>
    <wa-icon-button name="archive"></wa-icon-button>
    <wa-divider style="width: 100%;"></wa-divider>
    <wa-icon-button name="gear"></wa-icon-button>
    <wa-icon-button name="right-from-bracket"></wa-icon-button>
  </div>
  <div class="wa:fill_space wa:block-flow:l">
    <div class="wa:arrange:aside-end:gap-l">
      <div class="wa:arrange:size-m:gap-l">
        <wa-card class="wa:block-flow:l wa:statistic">
          <div class="wa:arrange:flex:align-start:gap-m:nowrap">
            <span class="wa:box-icon">
              <wa-icon name="globe"></wa-icon>
            </span>
            <div>
              <h2 class="wa:fill_space wa:card-title">
                Population (Zion)
              </h2>
              <div class="wa:arrange:flex:gap-s">
                <span class="wa:value">251,999</span>
                <wa-badge variant="danger">-3%&nbsp;<wa-icon name="arrow-trend-down"></wa-icon></wa-badge>
              </div>
            </div>
          </div>
        </wa-card>
        <wa-card class="wa:block-flow:l wa:statistic">
          <div class="wa:arrange:flex:align-start:gap-m:nowrap">
            <span class="wa:box-icon">
              <wa-icon name="brain-circuit"></wa-icon>
            </span>
            <div>
              <h2 class="wa:fill_space wa:card-title">
                Minds Freed
              </h2>
              <div class="wa:arrange:flex:gap-s">
                <span class="wa:value">0.36%</span>
                <wa-badge variant="success">+0.02%&nbsp;<wa-icon name="arrow-trend-up"></wa-icon></wa-badge>
              </div>
            </div>
          </div>
        </wa-card>
        <wa-card class="wa:block-flow:l wa:statistic">
          <div class="wa:arrange:flex:align-start:gap-m:nowrap">
            <span class="wa:box-icon">
              <wa-icon name="robot"></wa-icon>
            </span>
            <div>
              <h2 class="wa:fill_space wa:card-title">
                Agents Discovered
              </h2>
              <div class="wa:arrange:flex:gap-s">
                <span class="wa:value">3</span>
                <wa-badge variant="neutral">&plusmn;0%&nbsp;<wa-icon name="wave-triangle"></wa-icon></wa-badge>
              </div>
            </div>
          </div>
        </wa-card>
        <wa-card class="wa:block-flow:l wa:statistic">
          <div class="wa:arrange:flex:align-start:gap-m:nowrap">
            <span class="wa:box-icon">
              <wa-icon name="spaghetti-monster-flying"></wa-icon>
            </span>
            <div>
              <h2 class="wa:fill_space wa:card-title">
                Sentinels Controlled
              </h2>
              <div class="wa:arrange:flex:gap-s">
                <span class="wa:value">208</span>
                <wa-badge variant="success">+1%&nbsp;<wa-icon name="arrow-trend-up"></wa-icon></wa-badge>
              </div>
            </div>
          </div>
        </wa-card>
      </div>
      <wa-card>
        <div class="wa:block-flow:l">
          <div class="wa:arrange:flex:gap-xl">
            <h2 class="wa:card-title">Daily Tasks</h2>
            <wa-progress-bar value="40" class="wa:fill_space" style="--height: 0.5em;"></wa-progress-bar>
          </div>
          <div class="wa:block-flow:s">
            <wa-checkbox style="display:block;">Let go fear, doubt, and disbelief</wa-checkbox>
            <wa-checkbox style="display:block;">Walk through the door</wa-checkbox>
            <wa-checkbox style="display:block;">Train with Morpheus</wa-checkbox>
          </div>
        </div>
        <div slot="footer">
          <a href="#">View completed tasks</a>
        </div>
      </wa-card>
    </div>
    <section class="strata support-table">
      <wa-card style="--padding: 0; width: 100%;">
      <table style="margin-bottom: 0;">
        <caption>
          <h2 class="wa:card-title">Conversations</h2>
        </caption>
        <thead>
          <tr>
            <th><wa-checkbox size="large" style="padding-left: var(--wa-space-s)"><wa-visually-hidden>Check all</wa-visually-hidden></wa-checkbox></th>
            <th>Customer</th>
            <th>Conversation</th>
            <th>Assigned To</th>
            <th style="text-align: center;">Status</th>
            <th><wa-visually-hidden>Actions</wa-visually-hidden></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><wa-checkbox size="large" style="padding-left: var(--wa-space-s)"><wa-visually-hidden>Completed</wa-visually-hidden></wa-checkbox></td>
            <td>Keanu Reeves</td>
            <td class="desc"><span style="font-weight: bold">Am I dead?</span><br><span class="excerpt">Okey dokey... free my mind. Right, no problem, free my mind, free my mind, no problem, right...</span></td>
            <td><wa-avatar  image="/assets/images/kitchen-sink/avatar-chad.jpg"  label="Chad" style="margin-right: var(--wa-space-xs)"></wa-avatar>  Chad Stahelski</td>
            <td style="text-align: center;"><wa-tag variant="warning" size="small">Pending</wa-tag></td>
            <td>
              <wa-dropdown>
                <wa-button slot="trigger" caret size="small">Action</wa-button>
                <wa-menu>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="check" variant="regular"></wa-icon>
                    Resolved
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="clock" variant="regular"></wa-icon>
                    Pending
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="arrow-rotate-left" variant="regular"></wa-icon>
                    Re-open
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="xmark" variant="regular"></wa-icon>
                    Delete
                  </wa-menu-item>
                </wa-menu>
              </wa-dropdown>
            </td>
          </tr>
          <tr>
            <td><wa-checkbox size="large" style="padding-left: var(--wa-space-s)"><wa-visually-hidden>Completed</wa-visually-hidden></wa-checkbox></td>
            <td>Lawrence Fishburne</td>
            <td class="desc"><span style="font-weight: bold">We have a rule</span><br><span class="excerpt">We never free a mind once it's reached a certain age. It's dangerous, the mind has trouble letting go.</span></td>
            <td><wa-avatar image="/assets/images/kitchen-sink/avatar-char.jpg"  label="Char" style="margin-right: var(--wa-space-xs)"></wa-avatar>  Char McCoy</td>
            <td style="text-align: center;"><wa-tag variant="success" size="small">Resolved</wa-tag></td>
            <td>
              <wa-dropdown>
                <wa-button slot="trigger" caret size="small">Action</wa-button>
                <wa-menu>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="check" variant="regular"></wa-icon>
                    Resolved
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="clock" variant="regular"></wa-icon>
                    Pending
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="arrow-rotate-left" variant="regular"></wa-icon>
                    Re-open
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="xmark" variant="regular"></wa-icon>
                    Delete
                  </wa-menu-item>
                </wa-menu>
              </wa-dropdown>
            </td>
          </tr>
          <tr>
            <td><wa-checkbox size="large" style="padding-left: var(--wa-space-s)" checked><wa-visually-hidden>Completed</wa-visually-hidden></wa-checkbox></td>
            <td>Carrie-Ann Moss</td>
            <td class="desc"><span style="font-weight: bold">Was it the same cat?</span><br><span class="excerpt">A déjà vu is usually a glitch in the Matrix. It happens when they change something.</span></td>
            <td><wa-avatar initials="DE" label="Avatar with initials: DE" style="margin-right: var(--wa-space-xs)"></wa-avatar>  Debbie Evans</td>
            <td style="text-align: center;"><wa-tag variant="warning" size="small">Pending</wa-tag></td>
            <td>
              <wa-dropdown>
                <wa-button slot="trigger" caret size="small">Action</wa-button>
                <wa-menu>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="check" variant="regular"></wa-icon>
                    Resolved
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="clock" variant="regular"></wa-icon>
                    Pending
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="arrow-rotate-left" variant="regular"></wa-icon>
                    Re-open
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="xmark" variant="regular"></wa-icon>
                    Delete
                  </wa-menu-item>
                </wa-menu>
              </wa-dropdown>
            </td>
          </tr>
          <tr>
            <td><wa-checkbox size="large" style="padding-left: var(--wa-space-s)"><wa-visually-hidden>Completed</wa-visually-hidden></wa-checkbox></td>
            <td>Joe Pantoliano</td>
            <td class="desc"><span style="font-weight: bold">Ignorance is bliss</span><br><span class="excerpt">Why oh why didn't I take the blue pill?</span></td>
            <td></td>
            <td style="text-align: center;"><wa-tag variant="danger" size="small">Bounced</wa-tag></td>
            <td>
              <wa-dropdown>
                <wa-button slot="trigger" caret size="small">Action</wa-button>
                <wa-menu>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="check" variant="regular"></wa-icon>
                    Resolved
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="clock" variant="regular"></wa-icon>
                    Pending
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="arrow-rotate-left" variant="regular"></wa-icon>
                    Re-open
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="xmark" variant="regular"></wa-icon>
                    Delete
                  </wa-menu-item>
                </wa-menu>
              </wa-dropdown>
            </td>
          </tr>
          <tr>
            <td><wa-checkbox size="large" style="padding-left: var(--wa-space-s)"><wa-visually-hidden>Completed</wa-visually-hidden></wa-checkbox></td>
            <td>Hugo Weaving</td>
            <td class="desc"><span style="font-weight: bold">I'd like to share a revelation</span><br><span class="excerpt">I need the codes, I have to get inside Zion and you have to tell me how.</span></td>
            <td><wa-avatar  image="/assets/images/kitchen-sink/avatar-dara.jpg"  label="Dara" style="margin-right: var(--wa-space-xs)"></wa-avatar> Dara Prescott</td>
            <td style="text-align: center;"><wa-tag variant="neutral" size="small">Expired</wa-tag></td>
            <td>
              <wa-dropdown>
                <wa-button slot="trigger" caret size="small">Action</wa-button>
                <wa-menu>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="check" variant="regular"></wa-icon>
                    Resolved
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="clock" variant="regular"></wa-icon>
                    Pending
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="arrow-rotate-left" variant="regular"></wa-icon>
                    Re-open
                  </wa-menu-item>
                  <wa-menu-item>
                    <wa-icon slot="prefix" name="xmark" variant="regular"></wa-icon>
                    Delete
                  </wa-menu-item>
                </wa-menu>
              </wa-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
      </wa-card>
    </section>
    <div class="wa:arrange:gap-l">
      <wa-card id="glitches">
        <div class="wa:block-flow:l">
          <div class="wa:arrange:flex:justify-space_between">
            <h2 class="wa:card-title">Glitches</h2>
            <small style="color: var(--wa-color-text-quiet);">March 31, 1999</small>
          </div>
          <figure>
            <span class="sparkline">
              <span class="index"><span class="count" style="height: 27%;">(60,</span> </span>
              <span class="index"><span class="count" style="height: 92%;">220,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 80%;">180,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 71%;">160,</span> </span>
              <span class="index"><span class="count" style="height: 78%;">175,</span> </span>
              <span class="index"><span class="count" style="height: 21%;">225,</span> </span>
              <span class="index"><span class="count" style="height: 78%;">175,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 12%;">180,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 21%;">220,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 56%;">220,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 80%;">180,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 71%;">160,</span> </span>
              <span class="index"><span class="count" style="height: 69%;">175,</span> </span>
              <span class="index"><span class="count" style="height: 99%;">225,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">175,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 80%;">180,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 27%;">(60,</span> </span>
              <span class="index"><span class="count" style="height: 77%;">220,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 80%;">180,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 71%;">160,</span> </span>
              <span class="index"><span class="count" style="height: 38%;">175,</span> </span>
              <span class="index"><span class="count" style="height: 85%;">225,</span> </span>
              <span class="index"><span class="count" style="height: 78%;">175,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 80%;">180,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 92%;">220,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 92%;">220,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
              <span class="index"><span class="count" style="height: 46%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 80%;">180,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 71%;">160,</span> </span>
              <span class="index"><span class="count" style="height: 60%;">175,</span> </span>
              <span class="index"><span class="count" style="height: 100%;">225,</span> </span>
              <span class="index"><span class="count" style="height: 78%;">175,</span> </span>
              <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 60%;">180,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 27%;">(60,</span> </span>
              <span class="index"><span class="count" style="height: 8%;">220,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
              <span class="index"><span class="count" style="height: 56%;">125)</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 27%;">(60,</span> </span>
              <span class="index"><span class="count" style="height: 56%;">220,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 27%;">(60,</span> </span>
              <span class="index"><span class="count" style="height: 78%;">220,</span> </span>
              <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
              <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
              <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
              <span class="index"><span class="count" style="height: 27%;">(60,</span> </span>
              <span class="index"><span class="count" style="height: 25%;">220,</span> </span>
              <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
            </span>
          </figure>
        </div>
        <div slot="footer">
          <a href="#">View all data</a>
        </div>
      </wa-card>
      <wa-card>
        <div class="wa:block-flow:l">
          <h2 class="wa:card-title">Recent Contacts</h2>
          <div class="wa:arrange:gap-l" style="--wa-grid-size: 20ch;">
            <wa-card style="--padding: var(--wa-space-s);">
              <div class="wa:arrange:flex:gap-s">
                <wa-avatar label="User avatar">
                  <wa-icon slot="icon" name="user-secret"></wa-icon>
                </wa-avatar>
                <div class="wa:contact">
                  <div class="wa:arrange:flex:gap-s">
                    <strong>Trinity</strong>
                  </div>
                  <small><em>Nebuchadnezzar</em></small>
                </div>
              </div>
            </wa-card>
            <wa-card style="--padding: var(--wa-space-s);">
              <div class="wa:arrange:flex:gap-s">
                <wa-avatar label="User avatar">
                  <wa-icon slot="icon" name="user-tie"></wa-icon>
                </wa-avatar>
                <div class="wa:contact">
                  <div class="wa:arrange:flex:gap-s">
                    <strong>Mr. Rhineheart</strong>
                  </div>
                  <small><em>MetaCortex</em></small>
                </div>
              </div>
            </wa-card>
          </div>
        </div>
        <div slot="footer">
          <a href="#">View all contacts</a>
        </div>
      </wa-card>
    </div>
  </div>
</div>
