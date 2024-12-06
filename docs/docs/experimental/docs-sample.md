---
title: Sample Page
description: TODO
layout: blank
---

<style>
  wa-page {
    /* max-width: 140ch; */
    margin-inline: auto;
    --menu-width: 30ch;
    --aside-width: 30ch;
  }
  [slot='banner'] {  
    --wa-color-text-link: var(--wa-color-neutral-on-loud);
    background-color: var(--wa-color-neutral-fill-loud);
  }
  [slot='header'] {
    border-block-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  [slot='subheader'] {
    background-color: var(--wa-color-surface-lowered);
    border-block-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  [slot='navigation-header'] {
    border-block-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  [slot*='navigation'] {
    border-inline-end: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  [slot='navigation-footer'] {
    border-block-start: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-surface-border);
  }
  [slot='main-header'] {
  }
  main {
  }
  [slot='main-footer'] {
  }
  [slot='aside'] {
  }
  [slot='footer'] {
    background-color: var(--wa-color-surface-lowered);
  }
</style>

<wa-page>
  <div slot="banner" class="wa-body-s">
    <a href="#" class="wa-cluster wa-gap-xs">
      <wa-icon name="gift"></wa-icon>
      <span>Give a Hoot for the Holidays: Donate now and double your impact.</span>
    </div>
  </div>
  <header slot="header" class="wa-split">
    <div class="wa-cluster">
      <wa-icon name="feather-pointed" style="color: var(--wa-color-brand-fill-loud); font-size: 1.5em;"></wa-icon>
      <span class="wa-heading-s">Audubon Worldwide</span>
      <a href="#">Our Work</a>
      <a href="#">About Us</a>
      <a href="#">Discover</a>
      <a href="#">Get Involved</a>
    </div>
    <div class="wa-cluster">
      <wa-button size="small" appearance="outlined">Find Your Local Audubon</wa-button>
      <wa-button size="small">Donate</wa-button>
    </div>
  </header>
  <nav slot="subheader">
    <wa-breadcrumb style="font-size: var(--wa-font-size-s);">
      <wa-breadcrumb-item>Field Guides</wa-breadcrumb-item>
      <wa-breadcrumb-item>Owls</wa-breadcrumb-item>
      <wa-breadcrumb-item>Great Horned Owl</wa-breadcrumb-item>
    </wa-breadcrumb>
    <wa-input placeholder="Search" size="small">
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
    <a href="#behavior">Photo Gallery</a>
    <a href="#conservation">Interactive Range Map</a>
  </nav>
  <header slot="main-header">
    <div class="wa-flank:end wa-border-radius-m wa-theme-default-dark" style="background-color: var(--wa-color-surface-lowered); --content-percentage: 35%; padding: var(--wa-space-m);">
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
      <div class="wa-frame" style="border-radius: var(--wa-border-radius-m); max-inline-size: 40ch;">
        <img src="https://images.unsplash.com/photo-1544648720-132573cb590d?q=20" />
      </div>
    </div>
  </header>
  <main>
    <h2 id="identification">Identification</h2>
    <p>Found almost throughout North America and much of South America is this big owl. Aggressive and powerful in its hunting (sometimes known by nicknames such as 'tiger owl'), it takes prey as varied as rabbits, hawks, snakes, and even skunks, and will even attack porcupines, often with fatal results for both prey and predator. Great Horned Owls begin nesting very early in the north, and their deep hoots may be heard rolling across the forest on mid-winter nights.</p>
    <h2 id="range">Range and Habitat</h2>
    <p>Found almost throughout North America and much of South America is this big owl. Aggressive and powerful in its hunting (sometimes known by nicknames such as 'tiger owl'), it takes prey as varied as rabbits, hawks, snakes, and even skunks, and will even attack porcupines, often with fatal results for both prey and predator. Great Horned Owls begin nesting very early in the north, and their deep hoots may be heard rolling across the forest on mid-winter nights.</p>
    <h2 id="behavior">Behavior</h2>
    <p>Found almost throughout North America and much of South America is this big owl. Aggressive and powerful in its hunting (sometimes known by nicknames such as 'tiger owl'), it takes prey as varied as rabbits, hawks, snakes, and even skunks, and will even attack porcupines, often with fatal results for both prey and predator. Great Horned Owls begin nesting very early in the north, and their deep hoots may be heard rolling across the forest on mid-winter nights.</p>
    <h2 id="conservation">Conservation</h2>
    <p>Found almost throughout North America and much of South America is this big owl. Aggressive and powerful in its hunting (sometimes known by nicknames such as 'tiger owl'), it takes prey as varied as rabbits, hawks, snakes, and even skunks, and will even attack porcupines, often with fatal results for both prey and predator. Great Horned Owls begin nesting very early in the north, and their deep hoots may be heard rolling across the forest on mid-winter nights.</p>
  </main>
  <footer slot="main-footer">
    <h2 class="wa-heading-m">Sources</h2>
    <ul class="wa-caption-m">
      <li><cite><a href="https://www.audubon.org/field-guide/bird/great-horned-owl" target="_blank" rel="noopener">Great Horned Owl</a></cite>, National Audubon Society. Retrieved 5 December 2024.</li>
      <li><cite><a href="https://www.allaboutbirds.org/guide/Great_Horned_Owl/" target="_blank" rel="noopener">Great Horned Owl</a></cite>, All About Birds by CornellLab. Retrieved 5 December 2024.</li>
      <li>Armistead, G. L. (2015). <cite>Field guide to birds of Pennsylvania</cite>. Scott & Nix, Inc.</li>
    </ul>
  </footer>
  <aside slot="aside">
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
        <img src="https://images.unsplash.com/photo-1660307777355-f08bced145d3?q=20" alt="" />
      </div>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-heading-s">Golden Eagle</span>
        <span class="wa-caption-s" lang="la"><em>Aquila chrysaetos</em></span>
      </div>
    </wa-card>
  </aside>
  <footer slot="footer">
    <div class="wa-cluster">
      <wa-icon name="feather-pointed" style="font-size: 1.5em;"></wa-icon>
      <span class="wa-heading-s">Audubon Worldwide</span>
    </div>
    <div class="wa-stack">
      <h3 class="wa-heading-s">Our Work</h3>
      <a href="#">Habitat Restoration</a>
      <a href="#">Migration Science</a>
      <a href="#">Advocacy</a>
    </div>
    <div class="wa-stack">
      <h3 class="wa-heading-s">About Us</h3>
      <a href="#">Our History</a>
      <a href="#">Leadership</a>
      <a href="#">Fiscal Reports</a>
    </div>
    <div class="wa-stack">
      <h3 class="wa-heading-s">Discover</h3>
      <a href="#">Field Guides</a>
      <a href="#">Photo Search</a>
      <a href="#">Gear and Resources</a>
    </div>
    <div class="wa-stack">
      <h3 class="wa-heading-s">Get Involved</h3>
      <a href="#">Adopt a Bird</a>
      <a href="#">Your Local Audubon</a>
      <a href="#">Youth Audubon Camps</a>
    </div>
  </footer>
</wa-page>