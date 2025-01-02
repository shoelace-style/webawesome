---
title: Sample Media App Page
description: A sample page for a media app using Web Awesome's page component.
layout: blank
eleventyExcludeFromCollections: true
---

<wa-page class="wa-theme-default-dark">
  <header slot="header">
    <div class="wa-cluster">
      <wa-icon-button name="bars" label="Menu" data-toggle-nav></wa-icon-button>
      <wa-icon name="record-vinyl" family="duotone"></wa-icon>
      <span class="wa-heading-m">radiogaga</span>
    </div>
    <wa-input placeholder="Search" style="max-inline-size: 100%;">
      <wa-icon slot="prefix" name="magnifying-glass" ></wa-icon>
    </wa-input>
    <div class="wa-cluster">
      <wa-button appearance="outlined">Log In</wa-button>
      <wa-button>Sign Up</wa-button>
    </div>
  </header>
  <div slot="navigation-header" class="wa-split">
    <h2 class="wa-heading-s">For You</h2>
    <wa-icon-button id="settings" name="gear" label="Settings"></wa-icon-button>
  </div>
  <nav slot="navigation">
    <h3 class="wa-heading-xs">Discover</h3>
    <ul class="wa-stack wa-gap-0">
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="house"></wa-icon>
          <span>Home</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="sparkles"></wa-icon>
          <span>New</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="tower-broadcast"></wa-icon>
          <span>Stations</span>
        </a>
      </li>
    </ul>
    <h3 class="wa-heading-xs">Library</h3>
    <ul class="wa-stack wa-gap-0">
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="heart"></wa-icon>
          <span>Favorites</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="list-music"></wa-icon>
          <span>Playlists</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="microphone-stand"></wa-icon>
          <span>Artists</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="grid-2"></wa-icon>
          <span>Albums</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="podcast"></wa-icon>
          <span>Podcasts</span>
        </a>
      </li>
    </ul>
    <h3 class="wa-heading-xs">Recently Played</h3>
    <ul id="recent" class="wa-stack wa-gap-0">
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="cassette-tape" style="background: var(--wa-color-red-90); color: var(--wa-color-red-60);"></wa-icon>
          <span>Lo-Fi Station</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="face-awesome" style="background: var(--wa-color-blue-30); color: var(--wa-color-yellow-90);"></wa-icon>
          <span>Podcast Awesome</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="seedling" style="background: var(--wa-color-green-70); color: var(--wa-color-green-90);"></wa-icon>
          <div class="wa-stack wa-gap-0">
            <span>Seasons</span>
            <span class="wa-caption-s">Blister Soul</span>
          </div>
        </a>
      </li>
    </ul>
  </nav>
  <div slot="main-header">
    <wa-icon-button id="back" name="chevron-left" label="Back"></wa-icon-button>
    <wa-tooltip for="back" placement="bottom" distance="2">Back</wa-tooltip>
    <div class="wa-cluster">
      <wa-icon-button id="favorite" name="heart" variant="regular" label="Favorite"></wa-icon-button>
      <wa-tooltip for="favorite" placement="bottom" distance="2">Favorite</wa-tooltip>
      <wa-icon-button id="options" name="ellipsis" label="Options"></wa-icon-button>
      <wa-tooltip for="options" placement="bottom" distance="2">Options</wa-tooltip>
    </div>
  </div>
  <main>
    <div class="wa-stack wa-gap-3xl">
      <div class="wa-flank wa-gap-3xl" style="--flank-size: 35%; --content-percentage: 55%;">
        <div class="wa-frame wa-border-radius-l" style="max-inline-size: 40ch;">
          <img src="https://images.unsplash.com/photo-1732430579016-8d5e5ebd3c99?q=20" alt="Home for the Holidays album artwork" />
        </div>
        <div class="wa-split:column wa-align-items-start">
          <div class="wa-stack" style="margin-block: auto;">
            <h1 class="wa-heading-3xl">Home for the Holidays</h1>
            <a href="#" class="wa-heading-m">The Shire Choir</a>
            <div class="wa-cluster wa-caption-m wa-gap-2xs">
              <span>Holiday</span>
              <span>&bull;</span>
              <span>2024</span>
              <span>&bull;</span>
              <span>12 songs, 41 minutes 9 seconds</span>
            </div>
          </div>
          <div id="play-controls" class="wa-split wa-gap-xl">
            <div class="wa-cluster wa-gap-xl">
              <wa-icon-button name="play" label="Play"></wa-icon-button>
              <wa-icon-button name="shuffle" label="Shuffle"></wa-icon-button>
            </div>
            <wa-icon-button name="plus" label="Add to Library"></wa-icon-button>
          </div>
        </div>
      </div>
      <ol class="wa-stack wa-gap-0">
        <li class="wa-split">
          <span class="wa-flank">
            <wa-icon name="1"></wa-icon>
            <span>Fa-La-La-Fellowship</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">3:27</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <wa-icon name="2"></wa-icon>
            <span>Sleigh Ride</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">2:36</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <wa-icon name="3"></wa-icon>
            <span>All I Want For Christmas Is Stew</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">2:51</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <wa-icon name="4"></wa-icon>
            <span>Rockin' Around the Christmas Ent</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">3:05</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <wa-icon name="5"></wa-icon>
            <span>Merry, Did You Know?</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">1:56</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <wa-icon name="6"></wa-icon>
            <span>Run Run Shadowfax</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">3:32</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <wa-icon name="7"></wa-icon>
            <span>You're a Mean One, Mr. Grima</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">2:46</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <wa-icon name="8"></wa-icon>
            <span>O Come, All Ye Faithful</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">3:27</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <wa-icon name="9"></wa-icon>
            <span>Do You Hear What I Hear</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">2:13</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <span class="wa-cluster wa-gap-3xs">
              <wa-icon name="1"></wa-icon>
              <wa-icon name="0"></wa-icon>
            </span>
            <span>Carol of the Horns</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">2:55</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <span class="wa-cluster wa-gap-3xs">
              <wa-icon name="1"></wa-icon>
              <wa-icon name="1"></wa-icon>
            </span>
            <span>Silent Night</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">3:10</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
        <li class="wa-split">
          <span class="wa-flank">
            <span class="wa-cluster wa-gap-3xs">
              <wa-icon name="1"></wa-icon>
              <wa-icon name="2"></wa-icon>
            </span>
            <span>Wizard Wonderland</span>
          </span>
          <span class="wa-cluster">
            <span class="wa-caption-m">3:22</span>
            <wa-icon-button name="ellipsis" label="Song Options"></wa-icon-button>
          </span>
        </li>
      </ol>
    </div>
  </main>
  <div slot="main-footer" class="wa-grid wa-gap-xl">
    <h2 class="wa-heading-2xl">More You Might Like</h2>
    <div class="wa-stack wa-gap-xs">
      <div class="wa-frame wa-border-radius-m">
        <img src="https://images.unsplash.com/photo-1675219119611-40323b738563?q=20" alt="" />
      </div>
      <span class="wa-heading-s">Festival of Lights</span>
      <span class="wa-caption-s">Station</span>
    </div>
    <div class="wa-stack wa-gap-xs">
      <div class="wa-frame wa-border-radius-m">
        <img src="https://images.unsplash.com/photo-1481930916222-5ec4696fc0f2?q=20" alt="" />
      </div>
      <span class="wa-heading-s">Holiday Cheer</span>
      <span class="wa-caption-s">Essential Playlist</span>
    </div>
    <div class="wa-stack wa-gap-xs">
      <div class="wa-frame wa-border-radius-m">
        <img src="https://images.unsplash.com/photo-1667514627762-521b1c815a89?q=20" alt="" />
      </div>
      <span class="wa-heading-s">Nursery Rhymes from the Shire</span>
      <span class="wa-caption-s">The Shire Choir</span>
    </div>
  </div>
</wa-page>

<style>
  wa-page {
    --menu-width: 18rem;
    --wa-tooltip-arrow-size: 0;
    background-color: var(--wa-color-surface-lowered);
  }

  wa-page[view='mobile'] {
    --menu-width: auto;
  }
  wa-page,
  [slot='header'],
  wa-page[view='desktop'] [slot*='navigation'] {
    background-color: var(--wa-color-surface-lowered);
  }
  wa-page[view='mobile'] [slot*='navigation'] {
    padding: 0;
  }
  wa-page::part(base) {
    background-color: var(--wa-color-surface-lowered);
  }
  [slot='header'] {
    background: linear-gradient(to bottom, var(--wa-color-surface-raised), var(--wa-color-surface-lowered));
  }
  [slot='navigation-header'],
  [slot='main-header'] {
    padding-block-end: 0;
  }
  [slot='navigation'] a {
    --wa-color-text-link: var(--wa-color-text-normal);
    --wa-link-decoration-default: none;
    --wa-link-decoration-hover: none;
    --flank-size: 2rem;
    font-weight: var(--wa-font-weight-action);
    gap: 0.5rem;
  }
  [slot='navigation'] ul {
    list-style: none;
    margin: 0;
  }
  [slot='navigation'] ul a {
    border-radius: var(--wa-border-radius-s);
    padding: var(--wa-space-xs);
  }
  [slot='navigation'] ul a:hover,
  main ol li:hover {
    background-color: color-mix(in oklab, var(--wa-color-surface-default), var(--wa-color-brand-fill-quiet));
  }
  [slot='navigation'] wa-icon {
    align-items: center;
    aspect-ratio: 1;
    color: var(--wa-color-brand-fill-loud);
    display: flex;
    height: var(--flank-size);
    justify-content: center;
  }
  [slot='navigation'] #recent wa-icon {
    border-radius: var(--wa-border-radius-xs);
  }
  [slot='main-header'] {
    border-block-start: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
    border-inline: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-l) var(--wa-border-radius-l) 0 0
  }
  main,
  [slot*='main'] {
    margin-inline: var(--wa-space-m);
  }
  main ol li {
    padding: var(--wa-space-m);
  }
  main ol li .wa-flank {
    --flank-size: 2rem;
  }
  main ol li:not(:first-child) {
    border-block-start: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  main,
  [slot='main-footer'] {
    border-inline: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  main,
  [slot='main-header'] {
    background-color: var(--wa-color-surface-raised);
  }
  #play-controls wa-icon-button::part(base) {
    border: var(--wa-border-width-l) var(--wa-border-style) currentColor;
    border-radius: var(--wa-border-radius-circle);
    font-size: 1.5rem;
  }
  #play-controls wa-icon-button[name="play"]::part(base) {
    background-color: var(--wa-color-brand-fill-loud);
    border: none;
    color: var(--wa-color-brand-on-loud);
    font-size: 3rem;
    padding: 1.5rem;
  }
</style>
