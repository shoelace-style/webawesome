---
title: Sample Documentation Page
description: A sample page for a documentation website using Web Awesome's page component.
layout: blank
eleventyExcludeFromCollections: true
---

<style>
  wa-page {
    --menu-width: 15rem;
    --aside-width: 15rem;
  }

  wa-page[view='mobile'] {
    --menu-width: auto;
    --aside-width: auto;
  }
  wa-page[view='mobile'] [slot='aside'] {
    display: none;
  }
  wa-page[view='mobile'] #brand-name {
    display: none;
  }
  wa-page[view='mobile'] #search {
    display: none;
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
  wa-page[view='desktop'] [slot*='navigation'] {
    border-inline-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  [slot*='navigation'] a {
    --wa-color-text-link: var(--wa-color-text-normal);
  }
  [slot='navigation-footer'] {
    border-block-start: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
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
      <span id="brand-name" class="wa-heading-s">Audubon Worldwide</span>
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
    <wa-input id="search" placeholder="Search" size="small" style="max-inline-size: 12rem;">
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
    <a href="#" class="wa-flank" style="--flank-size: 1.25em;">
      <wa-icon name="camera"></wa-icon>
      <span>Photo Gallery</span>
    </a>
    <a href="#" class="wa-flank" style="--flank-size: 1.25em;">
      <wa-icon name="map-location-dot"></wa-icon>
      <span>Interactive Range Map</span>
    </a>
  </nav>
  <header slot="main-header">
    <div class="wa-flank:end wa-border-radius-l wa-dark" style="background-color: var(--wa-color-surface-lowered); --content-percentage: 35%; padding: var(--wa-space-m);">
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
      <div class="wa-frame" style="wa-border-radius-l max-inline-size: 40ch;">
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
  <aside slot="aside">
    <h2 class="wa-heading-m">Discover More Birds</h2>
    <wa-card>
      <div slot="image" class="wa-frame">
        <img src="https://images.unsplash.com/photo-1635254859323-65b78408dcca?q=20" alt="" />
      </div>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-heading-s">Long-eared Owl</span>
        <span class="wa-caption-s" lang="la"><em>Asio otus</em></span>
      </div>
    </wa-card>
    <wa-card>
      <div slot="image" class="wa-frame">
        <img src="https://images.unsplash.com/photo-1661350356618-f5915c7b6a3c?q=20" alt="" />
      </div>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-heading-s">Northen Hawk Owl</span>
        <span class="wa-caption-s" lang="la"><em>Surnia ulula</em></span>
      </div>
    </wa-card>
    <wa-card>
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
