---
title: Page
description: Pages offer an easy way to scaffold entire page layouts using minimal markup.
tags: [organization, layout]
isPro: true
order: 0
# icon: page
---

The page component is designed to power full webpages. It is flexible enough to handle most modern designs and includes a simple mechanism for handling desktop and mobile navigation.

## Layout Anatomy

This image depicts a page's anatomy, including the default positions of each section. The labels represent the [named slots](#slots) you can use to populate them.

Most slots are optional. Slots that have no content will not be shown, allowing you to opt-in to just the sections you actually need.

{% include "page-demo.njk" %}

<!-- ![Screenshot of Layout Anatomy showing various slots](/assets/images/layout-anatomy.svg) -->

## Using `wa-page`

:::info
If you're not familiar with how slots work in HTML, you might want to [learn more about slots](/docs/usage/#slots) before using this component.
:::

A number of sections are available as part of the page component, most of which are optional. Content is populated by [slotting elements](/docs/usage/#slots) into various locations.

This component _does not_ implement any [content sectioning](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning) or "semantic elements" internally (such as `<main>`, `<header>`, `<footer>`, etc.). Instead, we recommended that you slot in content sectioning elements wherever you feel they're appropriate.

When using `<wa-page>`, make sure to zero out all paddings and margins on `<html>` and `<body>`, otherwise you may see unexpected gaps. We highly recommend adding the following styles when using `<wa-page>`:

```css
html,
body {
  min-height: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
```

::info
If you use [native styles](/docs/native/), this is already taken care of.
:::

## Examples

:::warning
Open demos in a new tab to examine their behavior in different window sizes.
The previews below use simulated zooming which, depending on your browser, may not be accurate.
:::

### Documentation

A sample documentation page using [all available slots](#slots).
The navigation menu collapses into a drawer at a custom `mobile-breakpoint` of 920px.
It can be opened using a button with `[data-toggle-nav]` that appears in the `subheader` slot. The `aside` slot is also hidden below 920px.

```html {.example viewport="1600"}
<wa-page mobile-breakpoint="920">
  <div slot="banner" class="wa-body-s">
    <a href="#" class="wa-cluster wa-align-items-baseline wa-gap-xs" style="flex-wrap: nowrap;">
      <wa-icon name="gift"></wa-icon>
      <span>Give a Hoot for the Holidays: Donate now and double your impact.</span>
    </a>
  </div>
  <header slot="header" class="wa-split">
    <div class="wa-cluster">
      <wa-icon name="feather-pointed" style="color: var(--wa-color-brand-fill-loud); font-size: 1.5em;"></wa-icon>
      <span id="brand-name" class="wa-heading-s wa-desktop-only">Audubon Worldwide</span>
      <a href="#">Our Work</a>
      <a href="#">About Us</a>
      <a href="#">Discover</a>
      <a href="#">Get Involved</a>
    </div>
    <div class="wa-cluster wa-gap-xs">
      <wa-button size="small" variant="brand" appearance="outlined">Find Your Local Audubon</wa-button>
      <wa-button size="small" variant="brand">Donate</wa-button>
    </div>
  </header>
  <nav slot="subheader">
    <div class="wa-cluster" style="flex-wrap: nowrap;">
      <wa-icon-button data-toggle-nav name="bars" label="Menu"></wa-icon-button>
      <wa-breadcrumb style="font-size: var(--wa-font-size-s);">
        <wa-breadcrumb-item>Field Guides</wa-breadcrumb-item>
        <wa-breadcrumb-item>Owls</wa-breadcrumb-item>
        <wa-breadcrumb-item>Great Horned Owl</wa-breadcrumb-item>
      </wa-breadcrumb>
    </div>
    <wa-input id="search" class="wa-desktop-only" placeholder="Search" size="small" style="max-inline-size: 12rem;">
      <wa-icon slot="prefix" name="magnifying-glass"></wa-icon>
    </wa-input>
  </nav>
  <nav slot="navigation-header">
    <div class="wa-flank">
      <wa-avatar image="https://images.unsplash.com/photo-1544648720-132573cb590d?q=20" label=""></wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-heading-s">Great Horned Owl</span>
        <span class="wa-caption-s" lang="la"><em>Bubo virginianus</em></span>
      </div>
    </div>
  </nav>
  <nav slot="navigation">
    <a href="#identification">Identification</a>
    <a href="#range">Range and Habitat</a>
    <a href="#behavior">Behavior</a>
    <a href="#conservation">Conservation</a>
  </nav>
  <nav slot="navigation-footer">
    <a href="#" class="wa-flank">
      <wa-icon name="camera"></wa-icon>
      <span>Photo Gallery</span>
    </a>
    <a href="#" class="wa-flank">
      <wa-icon name="map-location-dot"></wa-icon>
      <span>Interactive Range Map</span>
    </a>
  </nav>
  <header slot="main-header">
    <div class="wa-flank:end wa-border-radius-l wa-theme-default-dark" style="background-color: var(--wa-color-surface-lowered); --content-percentage: 35%; padding: var(--wa-space-m);">
      <div class="wa-stack" style="margin: var(--wa-space-2xl);">
        <h1>Great Horned Owl</h1>
        <wa-divider></wa-divider>
        <div class="wa-cluster wa-gap-xs">
          <wa-tag size="small">Owls</wa-tag>
          <wa-tag size="small">Birds of Prey</wa-tag>
          <wa-tag size="small">Pleistocene Birds</wa-tag>
        </div>
        <div class="wa-flank">
          <wa-icon name="ruler"></wa-icon>
          <span class="wa-caption-m">L 21.5" | WS 48.5"</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="earth-americas"></wa-icon>
          <span class="wa-caption-m">North America (Widespread), Central America (Limited), South America (Limited)</span>
        </div>
        <div class="wa-flank">
          <wa-icon name="shield-heart"></wa-icon>
          <span class="wa-caption-m">Least Concern</span>
        </div>
      </div>
      <div class="wa-frame" style="border-radius: var(--wa-border-radius-l); max-inline-size: 40ch;">
        <img src="https://images.unsplash.com/photo-1544648720-132573cb590d?q=20" />
      </div>
    </div>
  </header>
  <main class="wa-body-l">
    <h2 id="identification">Identification</h2>
    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Eget habitant scelerisque lectus ultrices nascetur aliquet sapien primis. Cursus sapien fusce semper nulla elit sociosqu lectus per sem. Sem ad porttitor dictum nisl pharetra tortor convallis. Sit molestie hendrerit porta dictum tortor posuere euismod magna. Mauris suspendisse pharetra finibus; eleifend etiam ridiculus.</p>
    <h2 id="range">Range and Habitat</h2>
    <p>Diam sed ipsum pretium porttitor class cubilia elementum. Blandit felis ligula habitant ultricies vulputate rutrum lacus commodo pulvinar. Nostra semper placerat lectus in dis eu. Sagittis ipsum placerat rhoncus lacus id eget. Erat pharetra aptent enim, augue accumsan ultricies inceptos habitasse. Senectus id maximus parturient tellus; fermentum posuere vulputate luctus. Ac tempus dapibus vehicula ligula ullamcorper sit duis.</p>
    <h2 id="behavior">Behavior</h2>
    <p>Erat vitae luctus arcu taciti malesuada pretium arcu justo primis. Cubilia vitae maecenas congue velit id netus arcu. Dictum vel pellentesque taciti fermentum risus consectetur amet. Faucibus commodo habitasse sem maximus praesent purus, dignissim tristique porta. Platea magna justo ipsum ut metus ac facilisi. Imperdiet laoreet pharetra maximus lacus tortor suscipit. Nam quisque iaculis orci porttitor pellentesque rhoncus. Molestie sagittis tincidunt quisque nisi non urna conubia.</p>
    <h2 id="conservation">Conservation</h2>
    <p>Nullam magna quam quisque eu varius integer. Inceptos donec facilisi risus himenaeos semper mollis habitasse. Vehicula lacus vivamus euismod pharetra mollis dictum. Ante ex tortor elementum eleifend habitasse orci aliquam. Fames erat senectus fames etiam dapibus cursus.</p>
  </main>
  <footer slot="main-footer">
    <section>
      <h2 class="wa-heading-m">Sources</h2>
      <ul class="wa-body-s">
        <li><cite><a href="https://www.audubon.org/field-guide/bird/great-horned-owl" target="_blank" rel="noopener">Great Horned Owl</a></cite>, National Audubon Society. Retrieved 5 December 2024.</li>
        <li><cite><a href="https://www.allaboutbirds.org/guide/Great_Horned_Owl/" target="_blank" rel="noopener">Great Horned Owl</a></cite>, All About Birds by CornellLab. Retrieved 5 December 2024.</li>
        <li>Armistead, G. L. (2015). <cite>Field guide to birds of Pennsylvania</cite>. Scott & Nix, Inc.</li>
      </ul>
    </section>
  </footer>
  <aside slot="aside" class="wa-desktop-only">
    <h2 class="wa-heading-m">Discover More Birds</h2>
    <wa-card with-image>
      <div slot="image" class="wa-frame">
        <img src="https://images.unsplash.com/photo-1635254859323-65b78408dcca?q=20" alt="" />
      </div>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-heading-s">Long-eared Owl</span>
        <span class="wa-caption-s" lang="la"><em>Asio otus</em></span>
      </div>
    </wa-card>
    <wa-card with-image>
      <div slot="image" class="wa-frame">
        <img src="https://images.unsplash.com/photo-1661350356618-f5915c7b6a3c?q=20" alt="" />
      </div>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-heading-s">Northen Hawk Owl</span>
        <span class="wa-caption-s" lang="la"><em>Surnia ulula</em></span>
      </div>
    </wa-card>
    <wa-card with-image>
      <div slot="image" class="wa-frame">
        <img src="https://images.unsplash.com/photo-1660307777355-f08bced145d3?q=20" alt="" />
      </div>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-heading-s">Golden Eagle</span>
        <span class="wa-caption-s" lang="la"><em>Aquila chrysaetos</em></span>
      </div>
    </wa-card>
  </aside>
  <footer slot="footer" class="wa-grid wa-gap-xl">
    <div class="wa-cluster" style="flex-wrap: nowrap;">
      <wa-icon name="feather-pointed" style="font-size: 1.5em;"></wa-icon>
      <span class="wa-heading-s">Audubon Worldwide</span>
    </div>
    <div class="wa-stack">
      <h3 class="wa-heading-xs">Our Work</h3>
      <a href="#">Habitat Restoration</a>
      <a href="#">Migration Science</a>
      <a href="#">Advocacy</a>
    </div>
    <div class="wa-stack">
      <h3 class="wa-heading-xs">About Us</h3>
      <a href="#">Our History</a>
      <a href="#">Leadership</a>
      <a href="#">Fiscal Reports</a>
    </div>
    <div class="wa-stack">
      <h3 class="wa-heading-xs">Discover</h3>
      <a href="#">Field Guides</a>
      <a href="#">Photo Search</a>
      <a href="#">Gear and Resources</a>
    </div>
    <div class="wa-stack">
      <h3 class="wa-heading-xs">Get Involved</h3>
      <a href="#">Adopt a Bird</a>
      <a href="#">Your Local Audubon</a>
      <a href="#">Youth Audubon Camps</a>
    </div>
  </footer>
</wa-page>

<style>
  wa-page {
    --menu-width: 15rem;
    --aside-width: 15rem;
  }
  wa-page[view='desktop'] {
    [slot*='navigation'] {
      border-inline-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
    }
  }
  wa-page[view='mobile'] {
    --menu-width: auto;
    --aside-width: auto;
  }

  [slot='banner'] {
    --wa-color-text-link: var(--wa-color-neutral-on-loud);
    background-color: var(--wa-color-neutral-fill-loud);
  }
  [slot='header'] {
    --wa-link-decoration-default: none;
    border-block-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  [slot*='header'] a {
    font-weight: var(--wa-font-weight-action);
  }
  [slot='subheader'] {
    background-color: var(--wa-color-surface-lowered);
    border-block-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  [slot='navigation-header'] {
    border-block-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }

  [slot*='navigation'] a {
    --wa-color-text-link: var(--wa-color-text-normal);
  }
  [slot='navigation-footer'] {
    border-block-start: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);

    .wa-flank {
      --flank-size: 1.25em;
    }
  }
  [slot='main-header'],
  main,
  [slot='main-footer'] {
    max-inline-size: 60rem;
    margin-inline: auto;
  }
  [slot='main-footer'] {
    border-block-start: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  [slot='footer'] {
    --wa-color-text-link: var(--wa-color-text-quiet);
    background-color: var(--wa-color-surface-lowered);
    font-size: var(--wa-font-size-s);
  }
</style>

<script>
  const sectionAnchors = document.querySelectorAll("[slot*='navigation'] a[href*='#']");
  sectionAnchors.forEach((sectionAnchor) => sectionAnchor.setAttribute("data-drawer", "close"));
</script>
```

### Media

A sample media app page using `header`, `navigation-header`, `main-header`, and `main-footer` along with the default slot. The navigation menu collapses into a drawer at the default `mobile-breakpoint` and can be opened using a button with `[data-toggle-nav]` that appears in the `header` slot.

```html {.example viewport="1600"}
<wa-page class="wa-theme-default-dark">
  <header slot="header">
    <div class="wa-cluster">
      <wa-icon-button name="bars" label="Menu" data-toggle-nav></wa-icon-button>
      <wa-icon name="record-vinyl"></wa-icon>
      <span class="wa-heading-m">radiogaga</span>
    </div>
    <wa-input id="search-header" placeholder="Search" class="wa-desktop-only" style="max-inline-size: 100%;">
      <wa-icon slot="prefix" name="magnifying-glass" ></wa-icon>
    </wa-input>
    <div class="wa-cluster">
      <wa-button appearance="outlined">Log In</wa-button>
      <wa-button>Sign Up</wa-button>
    </div>
  </header>
  <div slot="navigation-header" class="wa-split">
    <wa-input id="search-nav-drawer" placeholder="Search" style="max-inline-size: 100%;" class="wa-mobile-only">
      <wa-icon slot="prefix" name="magnifying-glass" ></wa-icon>
    </wa-input>
    <div class="wa-split">
      <h2 class="wa-heading-s">For You</h2>
      <wa-icon-button id="settings" name="gear" label="Settings"></wa-icon-button>
    </div>
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
          <wa-icon name="star"></wa-icon>
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
          <wa-icon name="bars-staggered"></wa-icon>
          <span>Playlists</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="microphone-lines"></wa-icon>
          <span>Artists</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="layer-group"></wa-icon>
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
          <wa-icon name="radio" style="background: var(--wa-color-red-90); color: var(--wa-color-red-60);"></wa-icon>
          <span>Lo-Fi Station</span>
        </a>
      </li>
      <li>
        <a href="#" class="wa-flank">
          <wa-icon name="font-awesome" style="background: var(--wa-color-blue-30); color: var(--wa-color-yellow-90);"></wa-icon>
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
      <div class="wa-flank wa-gap-3xl" style="--content-percentage: 40%;">
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
  <div slot="main-footer" class="wa-grid wa-gap-xl wa-align-items-center">
    <h2 class="wa-heading-2xl">More You Might Like</h2>
    <div class="wa-stack wa-gap-xs">
      <div class="wa-frame wa-border-radius-l">
        <img src="https://images.unsplash.com/photo-1675219119611-40323b738563?q=20" alt="" />
      </div>
      <span class="wa-heading-s">Festival of Lights</span>
      <span class="wa-caption-s">Station</span>
    </div>
    <div class="wa-stack wa-gap-xs">
      <div class="wa-frame wa-border-radius-l">
        <img src="https://images.unsplash.com/photo-1481930916222-5ec4696fc0f2?q=20" alt="" />
      </div>
      <span class="wa-heading-s">Holiday Cheer</span>
      <span class="wa-caption-s">Essential Playlist</span>
    </div>
    <div class="wa-stack wa-gap-xs">
      <div class="wa-frame wa-border-radius-l">
        <img src="https://images.unsplash.com/photo-1667514627762-521b1c815a89?q=20" alt="" />
      </div>
      <span class="wa-heading-s">Nursery Rhymes from the Shire</span>
      <span class="wa-caption-s">The Shire Choir</span>
    </div>
  </div>
</wa-page>

<style>
  wa-page {
    --menu-width: 30ch;
    --wa-tooltip-arrow-size: 0;
    background-color: var(--wa-color-surface-lowered);
  }

  wa-page[view='mobile'] {
    --menu-width: auto;

    [slot*='main'], main {
      padding: var(--wa-space-xl);
    }
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
    padding-block-end: 0 !important;
    padding-block-start: var(--wa-space-3xl);
  }
  [slot='navigation'] {
    a {
      --wa-color-text-link: var(--wa-color-text-normal);
      --wa-link-decoration-default: none;
      --wa-link-decoration-hover: none;
      --flank-size: 2rem;
      font-weight: var(--wa-font-weight-action);
      gap: 0.5rem;
    }
    ul {
      list-style: none;
      margin: 0;

      a {
        border-radius: var(--wa-border-radius-m);
        padding: var(--wa-space-xs);

        &:hover {
          background-color: color-mix(in oklab, var(--wa-color-surface-default), var(--wa-color-brand-fill-quiet));
        }
      }
    }
    wa-icon {
      align-items: center;
      aspect-ratio: 1;
      color: var(--wa-color-brand-fill-loud);
      display: flex;
      height: var(--flank-size);
      justify-content: center;
    }
    #recent wa-icon {
      border-radius: var(--wa-border-radius-s);
    }
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

    &:hover {
      background-color: color-mix(in oklab, var(--wa-color-surface-default), var(--wa-color-brand-fill-quiet));
    }

    &:not(:first-child) {
      border-block-start: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
    }

    .wa-flank {
      --flank-size: 2rem;
    }
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
    padding: 0.5em 0.45em 0.5em 0.55em;
  }
  [slot='main-footer'].wa-grid > * {
    max-inline-size: 30ch;
  }
</style>

<script>
  const sectionAnchors = document.querySelectorAll("[slot*='navigation'] a[href*='#']");
  sectionAnchors.forEach((sectionAnchor) => sectionAnchor.setAttribute("data-drawer", "close"));
</script>
```


## Customization

### Sticky Sections

The following sections of a page are "sticky" by default, meaning they remain in position as the user scrolls.

- `banner`
- `header`
- `sub-header`
- `menu` (`navigation` itself is not sticky, but its parent `menu` is)
- `aside`

This is often desirable, but you can change this behavior using the `disable-sticky` attribute. Use a space-delimited list of names to tell the page which sections should not be sticky.

```html
<wa-page disable-sticky="header aside"> ... </wa-page>
```

### Skip To Content

The layout provides a "skip to content" link that's visually hidden until the user tabs into it. You don't have to do anything to configure this, unless you want to change the text displayed in the link. In that case, you can slot in your own text using the `skip-to-content` slot.

This example localizes the "skip to content" link for German users.

```html
<wa-page>
  ...
  <span slot="skip-to-content">Zum Inhalt springen</span>
  ...
</wa-page>
```

### Responsiveness

A page isn't very opinionated when it comes to responsive behaviors, but there are tools in place to help make responsiveness easy.

#### Default Slot Styles

Each slot is a [flex container](https://developer.mozilla.org/en-US/docs/Glossary/Flex_Container) and specifies some flex properties so that your content is reasonably responsive by default.

The following slots specify `justify-content: space-between` and `flex-wrap: wrap` to evenly distribute child elements horizontally and allow them to wrap when space is limited:
- `header`
- `subheader`
- `main-header`
- `main-footer`
- `footer`

The following slots specify `flex-direction: column` to arrange child elements vertically:
- `navigation-header`
- `navigation` (or `menu`)
- `navigation-footer`
- `aside`

And the `banner` slot specifies `justify-content: center` to horizontally center its child elements.

You can override the default display and flex properties for each slot with your own CSS.

#### Responsive Navigation

When you use the `navigation` slot, your slotted content automatically collapses into a drawer on smaller screens.
The breakpoint at which this occurs is `768px` by default, but you can change it using the `mobile-breakpoint` attribute,
which takes either a number or a [CSS length](https://developer.mozilla.org/en-US/docs/Web/CSS/length).

```html
<wa-page mobile-breakpoint="600"> ... </wa-page>
```
```html {.example viewport}
<wa-page mobile-breakpoint="50ch">
  <div slot=navigation>Nav</div>
  <header slot=header>
    <div style="width: 50ch; background: gold">I’m 50ch wide</div>
  </header>
</wa-page>
<style>
html,
body {
  min-height: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
```

By default, a "hamburger" button appears in the `header` slot to toggle the navigation menu on smaller screens.
You can customize what this looks like by slotting your own button in the `toggle-navigation` slot,
or place the `data-toggle-nav` attribute on any button on your page (This _does not_ have to be a Web Awesome element.).
The default button not be shown when using either of these methods — if you want to use multiple navigation toggles on your page, simply add the `data-toggle-nav` attribute to multiple elements.

```html
<wa-page mobile-breakpoint="600">
  ...
  <wa-button data-toggle-nav>Menu</wa-button>
  ...
</wa-page>
```

Alternatively, you can apply `nav-state="open"` and `nav-state="closed"` to the layout component to show and hide the navigation, respectively.

```html
<wa-page nav-state="open"> ... </wa-page>
```

`<wa-page>` is given the attribute `view="mobile"` or `view="desktop"` when the viewport narrower or wider than the `mobile-breakpoint` value, respectively. You can leverage these attributes to change styles depending on the size of the viewport.
This is especially useful to hide your `data-toggle-nav` button when the viewport is wider:
```css
wa-page[view='desktop'] [data-toggle-nav] {
  display: none;
}
```

::info
If you use [native styles](/docs/native/), this is already taken care for you, and the `data-toggle-nav` button is already hidden on wider screens.
:::

#### Custom Widths

You specify widths for some slots on your page with [CSS custom properties](#css-custom-properties) for `--menu-width`, `--main-width`, and `--aside-width`.

If you specify `--menu-width` to apply a specific width to your `navigation` slot, space will still be reserved on the page even below the `mobile-breakpoint`. To collapse this space on smaller screens, add the following code to your styles:
```css
wa-page[view='mobile'] {
  --menu-width: auto;
}
```

You can use a similar approach for `--aside-width` to hide the `aside` slot on smaller screens. Be sure to also specify `display: none` for the slot:
```css
wa-page[view='mobile'] {
  --aside-width: auto;

   [slot='aside'] {
    display: none;
  }
}
```

### Spacing

A page specifies default `padding` within each slot and a `gap` between the slot's direct children. You can drop elements into any slot, and reasonable spacing is already applied for you.

You can override the default spacing for each slot with your own CSS. In this example, we're setting custom `gap` and `padding` for the `footer` slot:
```css
[slot="footer"] {
  gap: var(--wa-space-xl);
  padding: var(--wa-space-xl);
}
```

## Utility classes

[Native styles](/docs/native/) define a few useful defaults for `<wa-page>`, as well as
two utility classes you can use for common responsive design tasks:
- `.wa-mobile-only` hides an element on the desktop view
- `.wa-desktop-only` hides an element on the mobile view


If you don’t want to use [native styles](/docs/native/), you can include this stylesheet in your project to use these:

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/components/page.css' %}" />
```
