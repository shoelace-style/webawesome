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

  wa-card h2 {
    font-size: var(--wa-font-size-l);
  }

  wa-card::part(base) {
    height: 100%;
  }

  wa-checkbox[checked] {
    --wa-form-controls-value-color: var(--wa-color-text-quiet);
  }

figure {
  margin: 0;
  margin-inline-start: calc(var(--padding) * -1);
}
.sparkline { 
  height: 1em;
  margin: 0 0.5em;
  transition: all .5s ease;
}

.sparkline .index { 
  position: relative;
  float: left; 
  width: 0.5em; 
  height: 5em; 
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

<div class="preview-container wa:arrange:flex:align-start">
  <div class="wa:block-flow:l" style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; height:calc(100vh - var(--docs-content-padding) * 2);">
    <div class="wa:block-flow:l" style="display: flex; flex-direction: column;">
      <wa-icon-button name="shapes" style="color: var(--wa-color-brand-spot);"></wa-icon-button>
      <wa-divider style="width: 100%;"></wa-divider>
      <wa-icon-button name="home"></wa-icon-button>
      <wa-icon-button name="calendar"></wa-icon-button>
      <wa-icon-button name="envelope"></wa-icon-button>
      <wa-icon-button name="chart-simple"></wa-icon-button>
      <wa-icon-button name="archive"></wa-icon-button>
    </div>
    <div class="wa:block-flow:l" style="display: flex; flex-direction: column;">
      <wa-divider style="width: 100%;"></wa-divider>
      <wa-icon-button name="gear"></wa-icon-button>
      <wa-icon-button name="right-from-bracket"></wa-icon-button>
    </div>
  </div>
  <div class="wa:fill_space wa:block-flow:l">
    <div class="wa:arrange:aside-end:gap-l">
      <wa-card>
        <h2>Glitch Tracker</h2>
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
            <span class="index"><span class="count" style="height: 100%;">225,</span> </span>
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
            <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
            <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
            <span class="index"><span class="count" style="height: 80%;">180,</span> </span>
            <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
            <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
            <span class="index"><span class="count" style="height: 71%;">160,</span> </span>
            <span class="index"><span class="count" style="height: 78%;">175,</span> </span>
            <span class="index"><span class="count" style="height: 100%;">225,</span> </span>
            <span class="index"><span class="count" style="height: 78%;">175,</span> </span>
            <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
            <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
            <span class="index"><span class="count" style="height: 80%;">180,</span> </span>
            <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
            <span class="index"><span class="count" style="height: 53%;">120,</span> </span>
            <span class="index"><span class="count" style="height: 27%;">(60,</span> </span>
            <span class="index"><span class="count" style="height: 92%;">220,</span> </span>
            <span class="index"><span class="count" style="height: 62%;">140,</span> </span>
            <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
            <span class="index"><span class="count" style="height: 49%;">110,</span> </span>
            <span class="index"><span class="count" style="height: 40%;">90,</span> </span>
            <span class="index"><span class="count" style="height: 35%;">80,</span> </span>
            <span class="index"><span class="count" style="height: 56%;">125)</span> </span>
          </span>
        </figure>
        <div slot="footer">
          <a href="#">View more</a>
        </div>
      </wa-card>
      <wa-card>
        <div class="wa:block-flow:l">
          <div class="wa:arrange:flex">
            <h2>Daily Tasks</h2>
            <wa-progress-bar value="40" class="wa:fill_space" style="--height: 0.5em;"></wa-progress-bar>
          </div>
          <wa-checkbox style="display:block;">Lorem ipsum dolor sit amet</wa-checkbox>
          <wa-checkbox style="display:block;">Lorem ipsum dolor sit amet</wa-checkbox>
          <wa-checkbox style="display:block;">Lorem ipsum dolor sit amet</wa-checkbox>
          <wa-checkbox style="display:block;" checked>Lorem ipsum dolor sit amet</wa-checkbox>
        </div>
        <div slot="footer">
          <a href="#">View 3 more tasks</a>
        </div>
      </wa-card>
    </div>
    <section class="strata support-table">
      <wa-card style="--padding: 0; width: 100%;">
      <table style="margin-bottom: 0;">
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
  </div>
</div>
