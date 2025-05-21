---
meta:
title: Themer
layout: page
hasOutline: false
---

<script>
  // Add stylesheet to set themed headers
  const themeHeadersLink = document.createElement("link");
  themeHeadersLink.type="text/css";
  themeHeadersLink.rel="stylesheet";
  themeHeadersLink.href="/assets/styles/theme-headers.css";
  document.getElementsByTagName("head")[0].appendChild(themeHeadersLink);
</script>

<style>
  /* turn off eleventy header anchors */
  .anchor-heading a {
    display: none;
  }

  /* hide Web Awesome docs nav */
  main {
    margin-left: var(--knobs-width);
  }

  #menu-toggle,
  #sidebar {
    display: none;
  }

  /* themer control knobs styles */
  [hidden] {
    display: none !important;
  }

  :root {
    --docs-content-padding: 20px;
    --docs-content-vertical-spacing: 20px;
    --knobs-width: 300px;
    --knobs-padding: 1.5em;
  }

  :root,
  #knobs {
    scrollbar-color: var(--wa-color-neutral-border-normal) var(--wa-color-surface-raised);
  }

  /* #region Lock theme styles */
  #knobs,
  #knobs :host,
  #knobs :host *,
  #color-mode-selector,
  #icon-chooser {
    --wa-color-surface-border: color-mix(in oklab, var(--wa-color-text-normal), transparent 90%);

    --wa-color-shadow: rgb(0 0 0 / 0.1);

    --wa-color-neutral-fill-loud: color-mix(in oklab, var(--wa-color-surface-default), var(--wa-color-text-normal) 75%);
    --wa-color-neutral-fill-quiet: color-mix(in oklab, var(--wa-color-surface-default), var(--wa-color-text-normal) 10%);
    --wa-color-neutral-fill-normal: color-mix(in oklab, var(--wa-color-surface-default), var(--wa-color-text-normal) 20%);
    --wa-color-neutral-border-quiet: color-mix(in oklab, var(--wa-color-text-normal), var(--wa-color-surface-default) 90%);
    --wa-color-neutral-border-normal: color-mix(in oklab, var(--wa-color-text-normal), var(--wa-color-surface-default) 70%);
    --wa-color-neutral-on-loud: color-mix(in oklab, var(--wa-color-surface-default) 90%, var(--wa-color-text-normal));
    --wa-color-neutral-on-normal: color-mix(in oklab, var(--wa-color-surface-raised) 10%, var(--wa-color-text-normal));
    --wa-color-neutral-on-quiet: var(--wa-color-neutral-fill-loud);

    --wa-color-brand-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-brand-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-brand-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-brand-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-brand-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-brand-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-brand-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-brand-on-quiet: var(--wa-color-neutral-on-quiet);

    --wa-font-family-heading: Inconsolata, monospace;
    --wa-font-family-body: Inconsolata, monospace;
    --wa-font-family-code: Inconsolata, monospace;
    --wa-font-family-longform: 'Lora', serif;

    --wa-font-weight-light: 300;
    --wa-font-weight-normal: 400;
    --wa-font-weight-semibold: 600;
    --wa-font-weight-bold: 800;

    --wa-font-weight-heading: var(--wa-font-weight-bold);
    --wa-font-weight-body: var(--wa-font-weight-normal);
    --wa-font-weight-action: var(--wa-font-weight-semibold);

    --wa-font-size-root: 16px;
    --wa-font-size-2xs: 1rem * 0.6875;
    --wa-font-size-xs: 1rem * 0.75;
    --wa-font-size-s: 1rem * 0.875;
    --wa-font-size-m: 1rem * 1;
    --wa-font-size-l: 1rem * 1.25;
    --wa-font-size-xl: 1rem * 1.625;
    --wa-font-size-2xl: 1rem * 2;
    --wa-font-size-3xl: 1rem * 2.5625;
    --wa-font-size-4xl: 1rem * 3.25;

    --wa-line-height-condensed: 1.25;
    --wa-line-height-normal: 1.6;
    --wa-line-height-expanded: 2;

    --wa-space-scale: 1;
    --wa-space-3xs: calc(var(--wa-space-scale) * 1rem * 0.125);
    --wa-space-2xs: calc(var(--wa-space-scale) * 1rem * 0.25);
    --wa-space-xs: calc(var(--wa-space-scale) * 1rem * 0.5);
    --wa-space-s: calc(var(--wa-space-scale) * 1rem * 0.75);
    --wa-space-m: calc(var(--wa-space-scale) * 1rem * 1);
    --wa-space-l: calc(var(--wa-space-scale) * 1rem * 1.25);
    --wa-space-xl: calc(var(--wa-space-scale) * 1rem * 1.5);
    --wa-space-2xl: calc(var(--wa-space-scale) * 1rem * 2);
    --wa-space-3xl: calc(var(--wa-space-scale) * 1rem * 3);

    --wa-border-style: solid;

    --wa-border-width-scale: 0.0625;
    --wa-border-width-s: calc(var(--wa-border-width-scale) * 1rem * 1);
    --wa-border-width-m: calc(var(--wa-border-width-scale) * 1rem * 2);
    --wa-border-width-l: calc(var(--wa-border-width-scale) * 1rem * 3);

    --wa-form-control-border-style: var(--wa-border-style);
    --wa-form-control-border-width: var(--wa-border-width-s);

    --wa-panel-border-style: var(--wa-border-style);
    --wa-panel-border-width: var(--wa-border-width-s);

    --wa-border-radius-scale: 0.375;
    --wa-border-radius-s: calc(var(--wa-border-radius-scale) * 1rem * 0.75);
    --wa-border-radius-m: calc(var(--wa-border-radius-scale) * 1rem * 1);
    --wa-border-radius-l: calc(var(--wa-border-radius-scale) * 1rem * 2);

    --wa-shadow-blur-scale: 0.125;
    --wa-shadow-blur-xs: calc(var(--wa-shadow-blur-scale) * 0.75rem);
    --wa-shadow-blur-s: calc(var(--wa-shadow-blur-scale) * 1rem);
    --wa-shadow-blur-m: calc(var(--wa-shadow-blur-scale) * 1.5rem);
    --wa-shadow-blur-l: calc(var(--wa-shadow-blur-scale) * 2rem);

    --wa-shadow-offset-y-scale: 0.1;
    --wa-shadow-offset-y-xs: calc(var(--wa-shadow-offset-y-scale) * 0.75rem);
    --wa-shadow-offset-y-s: calc(var(--wa-shadow-offset-y-scale) * 1rem);
    --wa-shadow-offset-y-m: calc(var(--wa-shadow-offset-y-scale) * 1.5rem);
    --wa-shadow-offset-y-l: calc(var(--wa-shadow-offset-y-scale) * 2rem);

    --wa-shadow-offset-x-scale: 0;
    --wa-shadow-offset-x-xs: calc(var(--wa-shadow-offset-x-scale) * 0.75rem);
    --wa-shadow-offset-x-s: calc(var(--wa-shadow-offset-x-scale) * 1rem);
    --wa-shadow-offset-x-m: calc(var(--wa-shadow-offset-x-scale) * 1.5rem);
    --wa-shadow-offset-x-l: calc(var(--wa-shadow-offset-x-scale) * 2rem);

    --wa-shadow-xs: inset var(--wa-shadow-offset-x-xs) var(--wa-shadow-offset-y-xs) var(--wa-shadow-blur-xs)
      calc(var(--wa-shadow-offset-x-xs) * -1) var(--wa-color-shadow);
    --wa-shadow-s: var(--wa-shadow-offset-x-s) var(--wa-shadow-offset-y-s) var(--wa-shadow-blur-s)
      calc(var(--wa-shadow-offset-x-s) * -1) var(--wa-color-shadow);
    --wa-shadow-m: var(--wa-shadow-offset-x-m) var(--wa-shadow-offset-y-m) var(--wa-shadow-blur-m)
      calc(var(--wa-shadow-offset-x-m) * -1) var(--wa-color-shadow);
    --wa-shadow-l: var(--wa-shadow-offset-x-l) var(--wa-shadow-offset-y-l) var(--wa-shadow-blur-l)
      calc(var(--wa-shadow-offset-x-l) * -1) var(--wa-color-shadow);

    --wa-form-control-background-color: var(--wa-color-surface-default);

    --wa-form-control-border-radius: var(--wa-border-radius-m);

    --wa-form-control-activated-color: var(--wa-color-brand-fill-loud);
    --wa-form-control-border-color: var(--wa-color-neutral-border-normal);

    --wa-form-control-label-color: var(--wa-color-text-normal);
    --wa-form-control-label-font-weight: var(--wa-font-weight-normal);
    --wa-form-control-label-line-height: var(--wa-line-height-normal);

    --wa-form-control-value-color: var(--wa-color-text-normal);
    --wa-form-control-value-font-weight: var(--wa-font-weight-body);
    --wa-form-control-value-line-height: var(--wa-line-height-condensed);

    --wa-form-control-placeholder-color: color-mix(in oklab, var(--wa-color-text-normal), transparent);

    --wa-form-control-required-content: '*';
    --wa-form-control-required-content-color: inherit;
    --wa-form-control-required-content-offset: -0.1em;

    --wa-panel-border-radius: var(--wa-border-radius-l);

    font-family: var(--wa-font-family-code);
    font-size: 1rem;
    font-weight: var(--wa-font-weight-normal);
    line-height: var(--wa-line-height-normal);

    & wa-button,
    & wa-input,
    & wa-radio,
    & wa-radio-button,
    & wa-select {
      --box-shadow: none;
    }
  }
  /* #endregion Lock theme styles */

  #knobs {
    position: fixed;
    z-index: 10;
    background: var(--wa-color-surface-default);
    border-inline-end: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    width: var(--knobs-width);
    overflow: auto;
    margin-inline: auto;

    height: 100%;
    top: 0;
    left: 0;
    scrollbar-width: thin;

    & .header {
      padding: var(--knobs-padding);

      & > * + * {
        margin-block-start: var(--knobs-padding);
      }
    }
    & wa-details {
      --border-width: var(--wa-panel-border-width) 0;
      --border-radius: 0;
      --padding: var(--knobs-padding);
      margin-block-start: calc(var(--wa-border-width-s) * -1);
      position: relative;

      &::part(summary) {
        font-weight: var(--wa-font-weight-semibold);
      }
      &::part(summary-icon) {
        rotate: 0deg;
      }
      &[open]::part(summary-icon) {
        rotate: 180deg;
      }

      &::part(content) {
        margin-block-start: calc(var(--padding) * -1);
      }

      & * {
        box-sizing: border-box;
      }

      & > *:not(wa-icon) + *:not(wa-icon) {
        margin-block-start: var(--knobs-padding);
      }

      &[summary="Typography"] fieldset {
        border: unset;
        margin-inline: 0;
        padding: 0;
        padding-block-end: 0;

        & legend {
          color: var(--wa-form-control-label-color);
          font-weight: var(--wa-form-control-label-font-weight);
          line-height: var(--wa-form-control-label-line-height);
          margin-bottom: var(--wa-space-3xs);
          padding-inline: 0;
        }

        & wa-select {
          flex: 1 1 auto;
          max-width: 100%;
        }

        & wa-input {
          max-width: 100%;
          min-width: 10ch;
        }
      }

      &[summary="Typography"] wa-select::part(listbox) {
        width: calc(var(--knobs-width) - var(--knobs-padding) * 2 - var(--wa-border-width-s));
      }
    }
  }

  #knobs wa-select + wa-input {
    margin-inline-start: var(--wa-space-3xs);
  }


  #knobs wa-radio-group[name="color"] wa-radio {
    border: 0.0625em solid var(--wa-color-neutral-border-quiet);
    border-radius: var(--wa-border-radius-l);
    box-shadow: inset 0 0 0 0 transparent;
    padding: 1em;
    transition: box-shadow var(--wa-transition-normal) var(--wa-transition-easing);

    &[aria-checked="true"] {
      border-color: transparent;
      box-shadow: inset 0 0 0 0.125em var(--wa-form-control-activated-color);
    }

    & + * {
      margin-block-start: 0.5em;
    }

    &::part(label) {
      margin-inline-start: 1em;
    }

    & span {
      display: inline-block;
      block-size: 1em;
      inline-size: 1em;
      margin-block-start: 0.5em;
      margin-inline-end: 0.125em;

      &:first-of-type {
        border-radius: 0.25em 0 0 0.25em;
      }

      &:last-of-type {
        border-radius: 0 0.25em 0.25em 0;
      }
    }
  }

  #knobs wa-radio-group[name="brand-color"] wa-radio {
    display: inline-block;
    border: 0.125em solid transparent;
    border-radius: var(--wa-border-radius-circle);
    block-size: 2.375em;
    inline-size: 2.375em;
    padding: 0.0625em;

    &[aria-checked="true"] {
      border: 0.125em solid var(--wa-form-control-activated-color);
    }

    &::part(base) {
      font-size: inherit;
    }

    &::part(control) {
      display: none;
    }

    &::part(label) {
      margin-inline-start: 0;
    }

    & span {
      display: inline-block;
      block-size: 2em;
      inline-size: 2em;
      border-radius: var(--wa-border-radius-circle);
    }
  }

  /* set up themer preview area */
  .content {
    max-width: 1320px;
    gap: 0;
  }


  /* file uploader styles */
  .file-uploader {
    position: relative;
    border: var(--wa-form-control-border-width) dashed var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    background: var(--wa-form-control-background-color);
    cursor: pointer;
    font-weight: var(--wa-font-weight-action);
    height: calc(var(--wa-form-control-height) + var(--wa-border-width-s) * 2);
    line-height: var(--wa-form-control-height);
    text-align: center;
  }

  .file-uploader:is(:hover) {
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  /** Visually hidden */
  .hidden-label::part(form-control-label) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }

  .file-uploader:is(:focus-within) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  #file-uploader-description {
    display: block;
    line-height: var(--wa-line-height-condensed);
    color: var(--wa-color-text-quiet);
    margin-top: var(--wa-space-2xs);
  }

  /* project logo icon select styles */
  wa-radio-group[name="project-logo-selector"]::part(button-group) {
    width: 100%;
  }

  wa-radio-group[name="project-logo-selector"] wa-radio-button,
  wa-radio-group[name="project-logo-selector"] wa-button {
    flex: 1 1 auto;
  }

  wa-radio-group[name="project-logo-selector"] wa-radio-button:last-of-type::part(button) {
    border-radius: 0 var(--wa-border-radius-m) var(--wa-border-radius-m) 0;
  }

  wa-radio-group[name="project-logo-selector"] wa-tooltip {
    --max-width: calc(var(--knobs-width) - var(--knobs-padding) * 2);
    text-align: center;
  }

  #icon-chooser-trigger {
    --button-group-separator-border: none;
    --text-color: var(--wa-color-neutral-on-quiet);
    --text-color-hover: color-mix(in oklab, var(--wa-color-neutral-on-quiet), var(--wa-color-mix-hover));
    --text-color-active: var(--text-color-hover);
  }

  #icon-chooser::part(dialog) {
    width: 100%;
    height: 80%;
    max-width: 700px;
  }

  wa-input[name="icon-search"] {
    position: sticky;
    top: 0;
  }

  .icon-search {
    border: solid 1px var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    padding: var(--wa-space-m);
  }

  .icon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-template-rows: repeat(auto-fill, 84px);
    gap: 1rem;
    overflow: auto;
    padding: .5rem;
    margin: -.5rem;
  }

  .icon-list[data-variant="regular"] wa-button:not([data-variant="regular"]),
  .icon-list[data-variant="solid"] wa-button:not([data-variant="solid"]) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    #icon-chooser::part(dialog) {
      width: 100%;
      max-height: 80%;
      max-width: 90vw;
    }

    .icon-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .icon-list wa-button {
    font-size: 1.75rem;
  }

  .icon-list wa-button::part(base) {
    justify-content: center;
    align-items: center;
    min-height: 80px;
  }

  .icon-list[data-type="outline"] .icon-list-item[data-name$="-fill"] {
    display: none;
  }

  .icon-list[data-type="filled"] .icon-list-item:not([data-name$="-fill"]) {
    display: none;
  }

</style>

<!-- Knobs -->
<form id="knobs">
  <div class="header">
    <div style="width: 2em; height: auto; margin: auto;">
      <a href="/">{% include 'logo-simple.njk' %}</a>
    </div>
    <wa-select name="theme" label="Pick a theme to start!" value="default">
      <wa-option value="default">Default</wa-option>
      <wa-option value="awesome">Awesome</wa-option>
      <wa-option value="premium">Premium</wa-option>
      <wa-option value="playful">Playful</wa-option>
      <wa-option value="brutalist">Brutalist</wa-option>
      <wa-option value="tailspin">Tailspin</wa-option>
      <wa-option value="glossy">Glossy</wa-option>
      <wa-option value="active">Active</wa-option>
      <wa-option value="shoelace">Shoelace</wa-option>
    </wa-select>
  </div>
  <wa-details summary="Branding">
    <wa-icon name="plus" library="fa-classic-regular" slot="expand-icon"></wa-icon>
    <wa-icon name="minus" library="fa-classic-regular" slot="collapse-icon"></wa-icon>
    <wa-input name="project-name" value="" placeholder="Project name" label="What are you working on?"></wa-input>
    <div>
      <label class="file-uploader wa-visually-hidden-force" style="display: block;" aria-describedby="file-uploader-description">
        <input name="project-logo" type="file" accept="image/*">
        Add logo
      </label>
      <small id="file-uploader-description">Give us an SVG of the iconic part of your logo, and we’ll give you favicons, app icons, and branded navigation.</small>
    </div>
    <div>
      <wa-radio-group label="Need a logo?" name="project-logo-selector" value="shapes">
        <wa-radio-button value="shapes"><wa-icon name="shapes"></wa-icon></wa-radio-button>
        <wa-radio-button value="meteor"><wa-icon name="meteor"></wa-icon></wa-radio-button>
        <wa-radio-button value="cat-space"><wa-icon name="cat-space"></wa-icon></wa-radio-button>
        <wa-radio-button value="puzzle-piece"><wa-icon name="puzzle-piece"></wa-icon></wa-radio-button>
          <wa-button value="[choose]" appearance="plain" id="icon-chooser-trigger" class="logo-chooser">
            <wa-tooltip for="icon-chooser-trigger" distance="-3" hoist>Browse Icons</wa-tooltip>
            <wa-icon name="ellipsis" library="fa-classic-regular"></wa-icon>
            <span class="wa-visually-hidden">Browse icons</span>
          </wa-button>
          <small slot="hint" style="display: inline-block; line-height: var(--wa-line-height-condensed);">It's dangerous to go alone. Take these!</small>
      </wa-radio-group>
    </div>
  </wa-details>
  <wa-details summary="Color">
    <wa-icon name="plus" library="fa-classic-regular" slot="expand-icon"></wa-icon>
    <wa-icon name="minus" library="fa-classic-regular" slot="collapse-icon"></wa-icon>
    <wa-radio-group name="color" label="Color palette" value="standard">
      <wa-radio value="standard">
        Standard<br>
        <span style="background-color: #545868;"></span><span style="background-color: #ef6982;"></span><span style="background-color: #fcc041;"></span><span style="background-color: #98bb4a;"></span><span style="background-color: #00ae5f;"></span><span style="background-color: #259af4;"></span><span style="background-color: #8f8aea;"></span><span style="background-color: #c07ad6;"></span>
      </wa-radio>
      <wa-radio value="shoelace">
        Shoelace<br>
        <span style="background-color: #4f5967;"></span><span style="background-color: #ee6c6c;"></span><span style="background-color: #fbc129;"></span><span style="background-color: #7dc115;"></span><span style="background-color: #38a961;"></span><span style="background-color: #0d9ee0;"></span><span style="background-color: #818cf7;"></span><span style="background-color: #b976f9;"></span>
      </wa-radio>
      <wa-radio value="bright">
        Bright<br>
        <span style="background-color: #4a5877;"></span><span style="background-color: #ff5c5c;"></span><span style="background-color: #eec637;"></span><span style="background-color: #7dc11d;"></span><span style="background-color: #35aa4a;"></span><span style="background-color: #349bf1;"></span><span style="background-color: #9f81f9;"></span><span style="background-color: #cd70e3;"></span>
      </wa-radio>
      <wa-radio value="elegant">
        Elegant<br>
        <span style="background-color: #5d5568;"></span><span style="background-color: #e3727d;"></span><span style="background-color: #dac992;"></span><span style="background-color: #a6b48b;"></span><span style="background-color: #5fa288;"></span><span style="background-color: #559bd2;"></span><span style="background-color: #8d8ed7;"></span><span style="background-color: #b781c9;"></span>
      </wa-radio>
      <wa-radio value="natural">
        Natural<br>
        <span style="background-color: #5c594f;"></span><span style="background-color: #c98373;"></span><span style="background-color: #dac6a4;"></span><span style="background-color: #8a9b68;"></span><span style="background-color: #779e7f;"></span><span style="background-color: #8196b8;"></span><span style="background-color: #9490bd;"></span><span style="background-color: #a48cb6;"></span>
      </wa-radio>
      <wa-radio value="rudimentary">
        Rudimentary<br>
        <span style="background-color: #585858;"></span><span style="background-color: #f16b5e;"></span><span style="background-color: #ffbd31;"></span><span style="background-color: #7ec200;"></span><span style="background-color: #00ac4a;"></span><span style="background-color: #0099ff;"></span><span style="background-color: #9b81ff;"></span><span style="background-color: #c76ff2;"></span>
      </wa-radio>
      <wa-radio value="anodized">
        Anodized<br>
        <span style="background-color: #435c6f;"></span><span style="background-color: #d1806b;"></span><span style="background-color: #eac46c;"></span><span style="background-color: #95bc54;"></span><span style="background-color: #00aa66;"></span><span style="background-color: #5593fe;"></span><span style="background-color: #a280fa;"></span><span style="background-color: #d56ae2;"></span>
      </wa-radio>
    </wa-radio-group>
    <wa-radio-group name="brand-color" label="Brand color" value="">
      <wa-radio value="rose"><span style="background-color:var(--wa-color-rose-60);"></span></wa-radio>
      <wa-radio value="red"><span style="background-color:var(--wa-color-red-60);"></span></wa-radio>
      <wa-radio value="yellow"><span style="background-color:var(--wa-color-yellow-60);"></span></wa-radio>
      <wa-radio value="lime"><span style="background-color:var(--wa-color-lime-60);"></span></wa-radio>
      <wa-radio value="green"><span style="background-color:var(--wa-color-green-60);"></span></wa-radio>
      <wa-radio value="cyan"><span style="background-color:var(--wa-color-cyan-60);"></span></wa-radio>
      <wa-radio value="blue"><span style="background-color:var(--wa-color-blue-60);"></span></wa-radio>
      <wa-radio value="indigo"><span style="background-color:var(--wa-color-indigo-60);"></span></wa-radio>
      <wa-radio value="purple"><span style="background-color:var(--wa-color-purple-60);"></span></wa-radio>
      <wa-radio value="gray"><span style="background-color:var(--wa-color-gray-60);"></span></wa-radio>
    </wa-radio-group>
  </wa-details>
  <wa-details summary="Typography">
    <wa-icon name="plus" library="fa-classic-regular" slot="expand-icon"></wa-icon>
    <wa-icon name="minus" library="fa-classic-regular" slot="collapse-icon"></wa-icon>
    <fieldset>
      <legend aria-hidden="true">Headings</legend>
      <div style="display: flex;">
        <wa-select class="hidden-label" name="font-family-heading" value="default" label="Font family" hoist>
          <wa-option value="default">* Default</wa-option>
          <wa-option value="assistant">Assistant</wa-option>
          <wa-option value="inter">Inter</wa-option>
          <wa-option value="lora">Lora</wa-option>
          <wa-option value="noto-sans">Noto Sans</wa-option>
          <wa-option value="noto-sans-display">Noto Sans Display</wa-option>
          <wa-option value="noto-sans-mono">Noto Sans Mono</wa-option>
          <wa-option value="noto-serif">Noto Serif</wa-option>
          <wa-option value="open-sans">Open Sans</wa-option>
          <wa-option value="playfair">Playfair</wa-option>
          <wa-option value="playfair-display">Playfair Display</wa-option>
          <wa-option value="quicksand">Quicksand</wa-option>
          <wa-option value="roboto-flex">Roboto Flex</wa-option>
          <wa-option value="roboto-mono">Roboto Mono</wa-option>
          <wa-option value="roboto-serif">Roboto Serif</wa-option>
          <wa-option value="roboto-slab">Roboto Slab</wa-option>
        </wa-select>
        <wa-input class="hidden-label" name="font-weight-heading" value="" label="Font weight" type="number" step="50" max="900" min="50">
        </wa-input>
      </div>
    </fieldset>
    <fieldset>
      <legend aria-hidden="true">Body text</legend>
      <div style="display: flex;">
        <wa-select class="hidden-label" name="font-family-body" value="default" label="Font family" hoist>
          <wa-option value="default">* Default</wa-option>
          <wa-option value="assistant">Assistant</wa-option>
          <wa-option value="inter">Inter</wa-option>
          <wa-option value="lora">Lora</wa-option>
          <wa-option value="noto-sans">Noto Sans</wa-option>
          <wa-option value="noto-sans-mono">Noto Sans Mono</wa-option>
          <wa-option value="noto-serif">Noto Serif</wa-option>
          <wa-option value="open-sans">Open Sans</wa-option>
          <wa-option value="playfair">Playfair</wa-option>
          <wa-option value="quicksand">Quicksand</wa-option>
          <wa-option value="roboto-flex">Roboto Flex</wa-option>
          <wa-option value="roboto-mono">Roboto Mono</wa-option>
          <wa-option value="roboto-serif">Roboto Serif</wa-option>
          <wa-option value="roboto-slab">Roboto Slab</wa-option>
        </wa-select>
        <wa-input class="hidden-label" name="font-weight-body" value="" type="number" step="50" max="900" min="50" label="Font weight">
        </wa-input>
      </div>
    </fieldset>
  </wa-details>
  <wa-details summary="Icons">
    <wa-icon name="plus" library="fa-classic-regular" slot="expand-icon"></wa-icon>
    <wa-icon name="minus" library="fa-classic-regular" slot="collapse-icon"></wa-icon>
    <wa-select name="icon-family" label="Icon family" value="fa-classic" hoist>
      <wa-option value="fa-classic">Font Awesome Classic</wa-option>
      <wa-option value="fa-sharp">Font Awesome Sharp</wa-option>
      <wa-option value="custom" hidden>* Custom</wa-option>
    </wa-select>
    <wa-radio-group name="icon-style" label="Icon style" value="solid">
      <wa-radio value="solid">Solid <wa-badge hidden>PRO</wa-badge></wa-radio>
      <wa-radio value="regular">Regular <wa-badge>PRO</wa-badge></wa-radio>
      <wa-radio value="light">Light <wa-badge>PRO</wa-badge></wa-radio>
      <wa-radio value="thin">Thin <wa-badge>PRO</wa-badge></wa-radio>
      <wa-radio value="duotone">Duotone <wa-badge>PRO</wa-badge></wa-radio>
    </wa-radio-group>
  </wa-details>
  <wa-details summary="Look and feel">
    <wa-icon name="plus" library="fa-classic-regular" slot="expand-icon"></wa-icon>
    <wa-icon name="minus" library="fa-classic-regular" slot="collapse-icon"></wa-icon>
    <wa-select name="border-style" label="Border style" value="solid" hoist>
      <wa-option value="solid">Solid</wa-option>
      <wa-option value="dashed">Dashed</wa-option>
      <wa-option value="dotted">Dotted</wa-option>
      <wa-option value="double">Double</wa-option>
    </wa-select>
    <wa-slider name="border-width" label="Border width" min="1" max="5" value="1" step="1" tooltip="none"></wa-slider>
    <wa-slider name="spacing" label="Spacing" min=".5" max="1.5" value="1" step="0.125" tooltip="none"></wa-slider>
    <wa-slider name="corners" label="Corners" min="0" max="1.5" value=".25" step=".125" tooltip="none"></wa-slider>
    <wa-slider name="depth" label="Depth" min="0" max="4" value="0" step="1" tooltip="none"></wa-slider>
  </wa-details>
</form>

<wa-dialog id="icon-chooser" label="Browse Icons">
  <div style="display: grid; grid-template-rows: minmax(0, auto) minmax(0, 1fr); height: 100%; gap: 1rem;">
    <div style="display: flex; gap: 1.25rem;">
      <wa-input name="icon-search" autofocus placeholder="Search Icons" clearable style="flex: 1 1 auto;">
        <wa-icon slot="prefix" name="magnifying-glass"></wa-icon>
      </wa-input>
      <wa-select name="icon-variant" value="solid" style="flex: 0 1 auto;">
        <wa-option value="solid">Solid</wa-option>
        <wa-option value="regular">Regular</wa-option>
      </wa-select>
    </div>
    <div class="icon-list" data-variant="solid"></div>
  </div>
</wa-dialog>

<div id="color-mode-selector">
  <wa-radio-group class="hidden-label" label="Color mode" name="color-mode" value="light">
    <wa-radio-button value="light">
      <wa-icon name="sun" library="fa-classic-regular"></wa-icon>
    </wa-radio-button>
    <wa-radio-button value="dark">
      <wa-icon name="moon" library="fa-classic-regular"></wa-icon>
    </wa-radio-button>
  </wa-radio-group>
</div>

<style>
  #color-mode-selector {
    position: fixed;
    top: calc(var(--docs-content-padding) / 2);
    right: calc(var(--docs-content-padding) / 2);
    z-index: 10;

    & wa-radio-group {
      &::part(button-group) {
        background: var(--wa-color-surface-raised);
        border-radius: var(--wa-border-radius-pill);
        box-shadow: 0 0.25em 0.25em -0.25em rgb(0 0 0 / 0.8);
        padding: 4px;
      }
      & wa-radio-button {
        &::part(button) {
          border: none;
          border-radius: var(--wa-border-radius-circle);
        }
        &::part(button--checked) {
          background: var(--wa-color-brand-fill-loud);
        }
      }
    }
  }
</style>

<!-- Icon chooser -->
<script type="module">
  const icons = [
    // Solid
    { name: 'asterisk', variant: 'solid' },
    { name: 'atom', variant: 'solid' },
    { name: 'bed', variant: 'solid' },
    { name: 'bread-slice', variant: 'solid' },
    { name: 'bolt', variant: 'solid' },
    { name: 'car', variant: 'solid' },
    { name: 'carrot', variant: 'solid' },
    { name: 'cat', variant: 'solid' },
    { name: 'cheese', variant: 'solid' },
    { name: 'circle', variant: 'solid' },
    { name: 'diamond', variant: 'solid' },
    { name: 'dog', variant: 'solid' },
    { name: 'eye', variant: 'solid' },
    { name: 'feather', variant: 'solid' },
    { name: 'fish', variant: 'solid' },
    { name: 'frog', variant: 'solid' },
    { name: 'gauge-simple', variant: 'solid' },
    { name: 'guitar', variant: 'solid' },
    { name: 'hat-cowboy', variant: 'solid' },
    { name: 'hat-wizard', variant: 'solid' },
    { name: 'heart', variant: 'solid' },
    { name: 'helicopter', variant: 'solid' },
    { name: 'house', variant: 'solid' },
    { name: 'ice-cream', variant: 'solid' },
    { name: 'igloo', variant: 'solid' },
    { name: 'mask', variant: 'solid' },
    { name: 'message', variant: 'solid' },
    { name: 'paw', variant: 'solid' },
    { name: 'pencil', variant: 'solid' },
    { name: 'phone', variant: 'solid' },
    { name: 'plane', variant: 'solid' },
    { name: 'poop', variant: 'solid' },
    { name: 'sack-dollar', variant: 'solid' },
    { name: 'sailboat', variant: 'solid' },
    { name: 'shoe-prints', variant: 'solid' },
    { name: 'sink', variant: 'solid' },
    { name: 'snowflake', variant: 'solid' },
    { name: 'snowman', variant: 'solid' },
    { name: 'square', variant: 'solid' },
    { name: 'stairs', variant: 'solid' },
    { name: 'stamp', variant: 'solid' },
    { name: 'tape', variant: 'solid' },
    { name: 'truck', variant: 'solid' },
    { name: 'umbrella', variant: 'solid' },
    { name: 'user', variant: 'solid' },
    // Regular
    { name: 'bell', variant: 'regular' },
    { name: 'bookmark', variant: 'regular' },
    { name: 'circle', variant: 'regular' },
    { name: 'clock', variant: 'regular' },
    { name: 'envelope', variant: 'regular' },
    { name: 'face-smile', variant: 'regular' },
    { name: 'flag', variant: 'regular' },
    { name: 'gem', variant: 'regular' },
    { name: 'hand', variant: 'regular' },
    { name: 'handshake', variant: 'regular' },
    { name: 'heart', variant: 'regular' },
    { name: 'hourglass', variant: 'regular' },
    { name: 'image', variant: 'regular' },
    { name: 'keyboard', variant: 'regular' },
    { name: 'lemon', variant: 'regular' },
    { name: 'life-ring', variant: 'regular' },
    { name: 'lightbulb', variant: 'regular' },
    { name: 'map', variant: 'regular' },
    { name: 'moon', variant: 'regular' },
    { name: 'newspaper', variant: 'regular' },
    { name: 'snowflake', variant: 'regular' },
    { name: 'square', variant: 'regular' },
    { name: 'star', variant: 'regular' },
    { name: 'sun', variant: 'regular' },
    { name: 'trash-can', variant: 'regular' },
  ];
  const chooser = document.querySelector('#icon-chooser');
  const variantInput = document.querySelector('[name="icon-variant"]');
  const input = chooser.querySelector("[name='icon-search']");
  const iconList = chooser.querySelector('.icon-list');
  const queue = [];
  let inputTimeout;

  variantInput.addEventListener('change', () => {
    iconList.dataset.variant = variantInput.value;
  });

  icons.forEach(icon => {
    const button = document.createElement('wa-button');
    button.style.margin = "2px"
    button.classList.add("icon-list-item")
    button.setAttribute("outline", "")
    button.setAttribute('data-name', icon.name);
    button.setAttribute('data-variant', icon.variant);
    button.setAttribute('data-terms', [icon.name, ...(icon.tags || []), ...(icon.categories || [])].join(' '));
    button.innerHTML = `
      <wa-icon name="${icon.name}" label="${icon.name}" variant="${icon.variant}"></wa-icon>
    `;

    iconList.append(button);
  });

  // Filter as the user types
  input.addEventListener('input', () => {
    clearTimeout(inputTimeout);
    inputTimeout = setTimeout(() => {
      [...iconList.children].map(item => {
        const filter = input.value.toLowerCase();
        if (filter === '') {
          item.removeAttribute("hidden");
        } else {
          const terms = item.getAttribute('data-terms').toLowerCase();
          if (terms.indexOf(filter) < 0) {
            item.setAttribute("hidden", "")
          } else {
            item.removeAttribute("hidden")
          }
        }
      });
    }, 250);
  });

  document.querySelector("#icon-chooser-trigger").addEventListener("click", () => {
    document.querySelector("#icon-chooser").open = true
  })
</script>

<script type="module">
  const container = document.getElementById('knobs');
  const previewContainer = document.querySelector('.preview-container');
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const colorStylesheet = document.getElementById('color-stylesheet');
  const knobsSections = container.querySelectorAll('wa-details');
  const logoSelector = document.querySelector('[name="project-logo-selector"]');
  const colorSelect = container.querySelector('[name="color"]');
  const brandColor = container.querySelector('[name="brand-color"]');
  const presetLogoOptions = logoSelector.querySelectorAll('wa-radio-button');
  const depthSlider = container.querySelector('[name="depth"]');
  const fontWeightHeading = container.querySelector('[name="font-weight-heading"]');
  const fontWeightBody = container.querySelector('[name="font-weight-body"]');
  const fontFamilyHeading = container.querySelector('[name="font-family-heading"]');
  const fontFamilyBody = container.querySelector('[name="font-family-body"]');
  const iconFamily = container.querySelector('[name="icon-family"]');
  const iconStyle = container.querySelector('[name="icon-style"]');
  const spacing = container.querySelector("[name='spacing']");
  const corners = container.querySelector("[name='corners']");
  const borderStyle = container.querySelector('[name="border-style"]');
  const borderWidth = container.querySelector('[name="border-width"]');
  const themeSelect = container.querySelector('[name="theme"]');
  const colorModeSelect = document.querySelector('[name="color-mode"]');

  function resetColorPaletteValue() {
    let colorPalette;

    switch(themeSelect.value) {
      case 'shoelace':
      case 'tailspin':
        colorPalette = 'shoelace';
        break;
      case 'awesome':
        colorPalette = 'bright';
        break;
      case 'playful':
      case 'active':
        colorPalette = 'rudimentary';
        break;
      case 'glossy':
        colorPalette = 'elegant';
        break;
      case 'premium':
        colorPalette = 'anodized';
        break;
      case 'default':
      case 'brutalist':
      default:
        colorPalette = 'standard';
    }
    colorStylesheet.href = `/dist/styles/color/${colorPalette}.css`;
    colorSelect.value = colorPalette;
  }

  function resetHeadingFontWeightValue() {
    document.documentElement.style.removeProperty('--wa-font-weight-heading')
    fontWeightHeading.value = getComputedStyle(previewContainer).getPropertyValue('--wa-font-weight-heading')
  }

  function resetHeadingFontFamilyValue() {
    document.documentElement.style.removeProperty('--wa-font-family-heading')
    fontFamilyHeading.value = "default"
  }

  function resetBodyFontWeightValue() {
    document.documentElement.style.removeProperty('--wa-font-weight-body')
    fontWeightBody.value = getComputedStyle(previewContainer).getPropertyValue('--wa-font-weight-body')
  }

  function resetBodyFontFamilyValue() {
    document.documentElement.style.removeProperty('--wa-font-family-body')
    fontFamilyBody.value = "default"
  }

  function resetBorderWidthValue() {
    document.documentElement.style.removeProperty('--wa-border-width-scale')
    borderWidth.value = getComputedStyle(previewContainer).getPropertyValue("--wa-border-width-scale")
  }

  function resetBorderStyleValue() {
    document.documentElement.style.removeProperty('--wa-border-style')
    borderStyle.value = getComputedStyle(previewContainer).getPropertyValue("--wa-border-style")
  }

  function resetSpacingValue() {
    document.documentElement.style.removeProperty('--wa-space-scale')
    spacing.value = getComputedStyle(previewContainer).getPropertyValue("--wa-space-scale")
  }

  function resetCornersValue() {
    document.documentElement.style.removeProperty('--wa-border-radius-scale')
    corners.value = getComputedStyle(previewContainer).getPropertyValue("--wa-border-radius-scale")
  }



  // Depth slider and settings
  const depthNames = {
    0: "depth/0_flat.css",
    1: "depth/1_semiflat.css",
    2: "depth/2_chunky.css",
    3: "depth/3_punchy.css",
    4: "depth/4_glossy.css",
  }

  function resetDepthValue() {
    const themeSheet = [...document.styleSheets].find((sheet) => sheet.ownerNode?.id === "theme-stylesheet")

    const importRules = []
    let depth = null
    const matchRegex = /depth_(\d+)_.*\.css$/;

      // Find all import rules in the stylesheet, then find one that matches the naming convention.
      [...themeSheet.cssRules].forEach((rule) => {
        if (rule instanceof CSSImportRule) {
          const match = rule.href.match(matchRegex)
          if (match) {
            depth = Number(match[1])
          }
        }
      })

    if (depth != null) {
      depthSlider.value = depth
    }
  }

  // Some depth stylesheets have additional CSS Properties. Let's delete them and make sure we get fresh stylesheets.
  function deleteDepthFromBaseStylesheet() {
    const themeSheet = [...document.styleSheets].find((sheet) => sheet.ownerNode?.id === "theme-stylesheet")

    const importRules = []
    let depth = null
    let ruleIndex = null
    const matchRegex = /depth_(\d+)_.*\.css$/

      ;[...themeSheet.cssRules].forEach((rule, index) => {
        if (rule instanceof CSSImportRule) {
          const match = rule.href.match(matchRegex)
          if (match) {
            ruleIndex = index
            depth = Number(match[1])
          }
        }
      })

    if (ruleIndex != null && depth != null) {
      themeSheet.deleteRule(ruleIndex)
    }
  }

  depthSlider.addEventListener("wa-input", (e) => {
    const depth = e.target.value

    if (depth == null) return

    // Load depth stylesheet
    const depthName = depthNames[depth]

    const depthStylesheet = Object.assign(document.createElement("link"), {
      // This media: "print" allows us to lazy load the stylesheet then hot swap it on load.
      id: "depth-stylesheet",
      media: "print",
      rel: "stylesheet",
      type: "text/css",
      href: `/dist/styles/themes/${depthName}`,
    })

    // This prevents the typical flash and reflow you see if you replace the old stylesheet
    // with the new stylesheet, before the new stylesheet has loaded
    depthStylesheet.addEventListener("load", (e) => {
      // Removing the media attribute causes styles to apply to the page
      depthStylesheet.removeAttribute("media")
      setTimeout(() => {
        deleteDepthFromBaseStylesheet()
        const oldDepthStylesheet = document.querySelectorAll("#depth-stylesheet").forEach((element, index) => {
          if (index === 0) {
            return
          }

          element.remove()
        })
      })
    })

    document.head.prepend(depthStylesheet)

  })

  resetDepthValue()

  // Set imagery by theme
  function setImagery() {
    let assetFolder;

    switch(themeSelect.value) {
      case 'premium':
      case 'tailspin':
      case 'playful':
      case 'brutalist':
      case 'shoelace':
      case 'awesome':
      case 'glossy':
      case 'active':
        assetFolder = themeSelect.value;
        break;
      default:
        assetFolder = 'default';
    }

    document.querySelector('#product-1').setAttribute('src', `/assets/images/themer/${assetFolder}/morpheus.jpg`);
    document.querySelector('#product-2').setAttribute('src', `/assets/images/themer/${assetFolder}/seraph.jpg`);
    document.querySelector('#product-3').setAttribute('src', `/assets/images/themer/${assetFolder}/keymaker.jpg`);
    document.querySelector('#blog_feature').setAttribute('src', `/assets/images/themer/${assetFolder}/blog_feature.jpg`);
    document.querySelector('#carousel-1').setAttribute('src', `/assets/images/themer/${assetFolder}/carousel-1.jpg`);
    document.querySelector('#carousel-2').setAttribute('src', `/assets/images/themer/${assetFolder}/carousel-2.jpg`);
    document.querySelector('#carousel-3').setAttribute('src', `/assets/images/themer/${assetFolder}/carousel-3.jpg`);
    document.querySelector('#product_thumb-1').setAttribute('src', `/assets/images/themer/${assetFolder}/morpheus.jpg`);
    document.querySelector('#product_thumb-2').setAttribute('src', `/assets/images/themer/${assetFolder}/seraph.jpg`);
    document.querySelector('#product_thumb-3').setAttribute('src', `/assets/images/themer/${assetFolder}/keymaker.jpg`);
  }

  // Light & Dark Mode
  function setColorMode() {
    const el = document.documentElement;
    const theme = themeSelect.value;
    const colorMode = colorModeSelect.value;

    for (let i = el.classList.length - 1; i >= 0; i--) {
      const className = el.classList[i];
      if (className.startsWith('wa-theme-')) {
        el.classList.remove(className);
      }
    }
    el.classList.add(`wa-theme-${theme}-${colorMode}`);
  }

  colorModeSelect.addEventListener('change', setColorMode);

  // Theme Switcher
  themeSelect.addEventListener('change', event => {
    const theme = event.target.value
    const newStylesheet = Object.assign(document.createElement("link"), {
      // This media: "print" allows us to lazy load the stylesheet then hot swap it on load.
      id: "theme-stylesheet",
      media: "print",
      rel: "stylesheet",
      type: "text/css",
      href: `/dist/styles/themes/${theme}.css`,
    })

    // This prevents the typical flash and reflow you see if you replace the old stylesheet
    // with the new stylesheet, before the new stylesheet has loaded
    newStylesheet.addEventListener("load", (e) => {
      // Removing the media attribute causes styles to apply to the page
      newStylesheet.removeAttribute("media")
      setTimeout(() => {
        document.querySelectorAll("#theme-stylesheet").forEach((el, index) => {
          if (index === 0) return

          // 100 seems to provide the "smoothest" transition
          setTimeout(() => {
            el.remove();

            resetColorPaletteValue()
            resetBodyFontWeightValue()
            resetBodyFontFamilyValue()
            resetHeadingFontWeightValue()
            resetHeadingFontFamilyValue()
            resetDepthValue()
            resetSpacingValue()
            resetBorderWidthValue()
            resetBorderStyleValue()
            resetCornersValue()
            setColorMode();
            setImagery();
          }, 100)
        })
      })
    })

    document.head.prepend(newStylesheet);
  });

  // Color Palette
  colorSelect.addEventListener('change', event => {
    const colorPalette = event.target.value;

    colorStylesheet.href = `/dist/styles/themes/color/${colorPalette}.css`;
  });

  // Brand Color
  brandColor.addEventListener('change', event => {
    const documentStyles = document.documentElement.style
    documentStyles.setProperty('--wa-color-primary-95', `var(--wa-color-${event.target.value}-95)`);
    documentStyles.setProperty('--wa-color-primary-90', `var(--wa-color-${event.target.value}-90)`);
    documentStyles.setProperty('--wa-color-primary-80', `var(--wa-color-${event.target.value}-80)`);
    documentStyles.setProperty('--wa-color-primary-70', `var(--wa-color-${event.target.value}-70)`);
    documentStyles.setProperty('--wa-color-primary-60', `var(--wa-color-${event.target.value}-60)`);
    documentStyles.setProperty('--wa-color-primary-50', `var(--wa-color-${event.target.value}-50)`);
    documentStyles.setProperty('--wa-color-primary-40', `var(--wa-color-${event.target.value}-40)`);
    documentStyles.setProperty('--wa-color-primary-30', `var(--wa-color-${event.target.value}-30)`);
    documentStyles.setProperty('--wa-color-primary-20', `var(--wa-color-${event.target.value}-20)`);
    documentStyles.setProperty('--wa-color-primary-10', `var(--wa-color-${event.target.value}-10)`);
    documentStyles.setProperty('--wa-color-primary-05', `var(--wa-color-${event.target.value}-05)`);
  })

  // User provided project logo
  container.querySelector('[name="project-logo"]').addEventListener('change', event => {
    const file = event.target.files[0]
    const isSvg = file.type.startsWith("image/svg")

    let img

    if (isSvg) {
      img = document.createElement("wa-icon")
    } else {
      img = document.createElement("img")
    }

    const src = URL.createObjectURL(file);
    img.setAttribute("src", src)

    img.id = "project-logo"
    img.setAttribute("height", "36")
    img.setAttribute("width", "36")

    previewContainer.querySelector("#project-logo").replaceWith(img);
    logoSelector.value = "";

    // Clean up to prevent memory leaks
    img.addEventListener("load", () => {
      URL.revokeObjectURL(src)
    })

    img.addEventListener("wa-load", () => {
      URL.revokeObjectURL(src)
    })
  })

  // Pre-selected logos
  document.querySelector('.icon-list').addEventListener('click', event => {
    const button = event.target.closest("wa-button")

    if (!button) return

    const iconName = button.dataset.name
    const iconVariant = button.dataset.variant;

    if (!iconName) return

    // Undo selected
    event.currentTarget.querySelectorAll(".icon-list-item").forEach((el) => {
      el.setAttribute("aria-selected", "false")
      el.setAttribute("variant", "neutral")
      el.setAttribute("outline", "")
    })

    // Set selected
    button.setAttribute("aria-selected", "true")
    button.setAttribute("variant", "brand")
    button.removeAttribute("outline")

    const projectLogo = previewContainer.querySelector("#project-logo");
    const element = document.createElement("wa-icon")
    element.name = iconName
    element.variant = iconVariant;
    element.id = "project-logo"

    // Depending on how we plan to store the logos, we can also do <img src="" height="36" width="36">
    projectLogo.replaceWith(element);
    logoSelector.value = "";
    event.currentTarget.closest("wa-dialog").open = false;
  })

  // Pre-generated logos
  logoSelector.addEventListener('change', event => {
    const value = event.currentTarget.value

    const projectLogo = previewContainer.querySelector("#project-logo");

    let element

    element = document.createElement("wa-icon")
    element.name = value

    element.id = "project-logo"

    // Depending on how we plan to store the logos, we can also do <img src="" height="36" width="36">
    projectLogo.replaceWith(element)
  })

  // Set pre-generated logos by theme
  function setLogoIcons() {
    let presetLogoIcons;

    switch(themeSelect.value) {
      case 'awesome':
        presetLogoIcons = ['cupcake', 'camera-retro', 'rocket-launch', 'cookie-bite'];
        break;
      case 'premium':
        presetLogoIcons = ['sunglasses', 'crown', 'car', 'shirt'];
        break;
      case 'playful':
        presetLogoIcons = ['face-smile-solid', 'palette', 'crown', 'star'];
        break;
      case 'brutalist':
        presetLogoIcons = ['leaf', 'mug-hot', 'book-open', 'landmark'];
        break;
      case 'tailspin':
        presetLogoIcons = ['wind', 'feather', 'lemon', 'wind-turbine'];
        break;
      case 'glossy':
        presetLogoIcons = ['raindrops', 'citrus-slice', 'lighthouse', 'kiwi-bird'];
        break;
      case 'active':
        presetLogoIcons = ['bicycle', 'bolt', 'pickleball', 'joystick'];
        break;
      case 'classic':
        presetLogoIcons = ['backpack', 'gamepad-modern', 'boombox', 'bug'];
        break;
      default:
        presetLogoIcons = ['shapes', 'meteor', 'cat-space', 'puzzle-piece'];
    }

    presetLogoOptions.forEach((option, index) => {
      const logo = presetLogoIcons[index] ?? 'question';
      option.setAttribute('value', logo);
      option.querySelector('wa-icon').setAttribute('name', logo);
    })
  }

  themeSelect.addEventListener('change', setLogoIcons);

  // Project Name
  container.querySelector('[name="project-name"]').addEventListener('input', event => {
    previewContainer.querySelector("#project-name").innerText = event.target.value || event.target.getAttribute("placeholder")
  })

  // Heading font weight
  resetHeadingFontWeightValue()
  fontWeightHeading.addEventListener('input', event => {
    document.documentElement.style.setProperty('--wa-font-weight-heading', event.target.value);
  });

  // Heading text
  fontFamilyHeading.addEventListener('change', event => {
    let fontFamily;
    switch (event.target.value) {
      case 'assistant':
        fontFamily = `'Assistant', sans-serif`;
        break;
      case 'inter':
        fontFamily = `'inter', sans-serif`;
        break;
      case 'lora':
        fontFamily = `'Lora', serif`;
        break;
      case 'mulish':
        fontFamily = `'Mulish', sans-serif`;
        break;
      case 'noto-sans':
        fontFamily = `'Noto Sans', sans-serif`;
        break;
      case 'noto-sans-display':
        fontFamily = `'Noto Sans Display', sans-serif`;
        break;
      case 'noto-sans-mono':
        fontFamily = `'Noto Sans Mono', monospace`;
        break;
      case 'noto-serif':
        fontFamily = `'Noto Serif', serif`;
        break;
      case 'open-sans':
        fontFamily = `'Open Sans', sans-serif`;
        break;
      case 'playfair':
        fontFamily = `'Playfair', serif`;
        break;
      case 'playfair-display':
        fontFamily = `'Playfair Display', serif`;
        break;
      case 'quicksand':
        fontFamily = `'Quicksand', sans-serif`;
        break;
      case 'roboto-flex':
        fontFamily = `'Roboto Flex', sans-serif`;
        break;
      case 'roboto-mono':
        fontFamily = `'Roboto Mono', monospace`;
        break;
      case 'roboto-serif':
        fontFamily = `'Roboto Serif', serif`;
        break;
      case 'roboto-slab':
        fontFamily = `'Roboto Slab', serif`;
        break;
      default:
        fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
    }
    document.documentElement.style.setProperty('--wa-font-family-heading', fontFamily);
  })

  // Body text
  fontFamilyBody.addEventListener('change', event => {
    let fontFamily;
    switch (event.target.value) {
      case 'assistant':
        fontFamily = `'Assistant', sans-serif`;
        break;
      case 'inter':
        fontFamily = `'inter', sans-serif`;
        break;
      case 'lora':
        fontFamily = `'Lora', serif`;
        break;
      case 'mulish':
        fontFamily = `'Mulish', sans-serif`;
        break;
      case 'noto-sans':
        fontFamily = `'Noto Sans', sans-serif`;
        break;
      case 'noto-sans-mono':
        fontFamily = `'Noto Sans Mono', monospace`;
        break;
      case 'noto-serif':
        fontFamily = `'Noto Serif', serif`;
        break;
      case 'open-sans':
        fontFamily = `'Open Sans', sans-serif`;
        break;
      case 'playfair':
        fontFamily = `'Playfair', serif`;
        break;
      case 'quicksand':
        fontFamily = `'Quicksand', sans-serif`;
        break;
      case 'roboto-flex':
        fontFamily = `'Roboto Flex', sans-serif`;
        break;
      case 'roboto-mono':
        fontFamily = `'Roboto Mono', monospace`;
        break;
      case 'roboto-serif':
        fontFamily = `'Roboto Serif', serif`;
        break;
      case 'roboto-slab':
        fontFamily = `'Roboto Slab', serif`;
        break;
      default:
        fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
    }
    document.documentElement.style.setProperty('--wa-font-family-body', fontFamily);
  });

  // Body font weight
  resetBodyFontWeightValue()
  fontWeightBody.addEventListener('input', event => {
    document.documentElement.style.setProperty('--wa-font-weight-body', event.target.value);
  });

  // Icons
  import { registerIconLibrary } from '/dist/webawesome.js';

  // Ensure regular icons are always available for the knobs
  registerIconLibrary('fa-classic-regular', {
    resolver: name => `https://ka-f.fontawesome.com/releases/v6.5.1/svgs/regular/${name}.svg`
  });

  function solidifyRatingStars() {
    const ratings = document.querySelectorAll('wa-rating');
    ratings.forEach(rating => rating.getSymbol = () => '<wa-icon name="star" library="always-solid"></wa-icon>');
  }

  function showIconStyleOptions() {
    function hide(elem) {
      elem.setAttribute('hidden', true);
    }
    function show(elem) {
      elem.removeAttribute('hidden');
    }
    switch(iconFamily.value) {
      case 'fa-classic':
        show(iconStyle);
        show(iconStyle.querySelector('[value="duotone"]'));
        hide(iconStyle.querySelector('[value="solid"] > wa-badge'));
        break;
      case 'fa-sharp':
        show(iconStyle);
        hide(iconStyle.querySelector('[value="duotone"]'));
        show(iconStyle.querySelector('[value="solid"] > wa-badge'));
        break;
      default:
        hide(iconStyle);
    }
  }

  function setPreferredIcons() {
    switch(themeSelect.value) {
      case 'awesome':
        iconFamily.value = 'fa-classic';
        iconStyle.value = 'solid';
        useFaIcons();
        break;
      case 'premium':
        iconFamily.value = 'custom';
        registerIconLibrary('default', {
          resolver: name => `/assets/icons/chunk/${name}.svg`,
          mutator: svg => {[...svg.querySelectorAll('[fill="black"]')].map(el => el.setAttribute('fill', 'currentColor'));}
        });
        registerIconLibrary('system', {
          resolver: name => `/assets/icons/chunk/${name}.svg`,
          mutator: svg => {[...svg.querySelectorAll('[fill="black"]')].map(el => el.setAttribute('fill', 'currentColor'));}
        });
        break;
      case 'playful':
        iconFamily.value = 'custom';
        registerIconLibrary('default', {
          resolver: name => `/assets/icons/jelly/${name}.svg`,
          mutator: svg => {[...svg.querySelectorAll('[fill="black"]')].map(el => el.setAttribute('fill', 'currentColor'));}
        });
        registerIconLibrary('system', {
          resolver: name => `/assets/icons/jelly/${name}.svg`,
          mutator: svg => {[...svg.querySelectorAll('[fill="black"]')].map(el => el.setAttribute('fill', 'currentColor'));}
        });
        break;
      case 'brutalist':
        iconFamily.value = 'custom';
        registerIconLibrary('default', {
          resolver: name => `/assets/icons/utility/${name}.svg`,
          mutator: svg => {
            [...svg.querySelectorAll('[fill="black"]')].map(el => el.setAttribute('fill', 'currentColor'));
            [...svg.querySelectorAll('[stroke="black"]')].map(el => el.setAttribute('stroke', 'currentColor'));
          }
        });
        registerIconLibrary('system', {
          resolver: name => `/assets/icons/utility/${name}.svg`,
          mutator: svg => {
            [...svg.querySelectorAll('[fill="black"]')].map(el => el.setAttribute('fill', 'currentColor'));
            [...svg.querySelectorAll('[stroke="black"]')].map(el => el.setAttribute('stroke', 'currentColor'));
          }
        });
        break;
      case 'tailspin':
        iconFamily.value = 'fa-classic';
        iconStyle.value = 'solid';
        useFaIcons();
        break;
      case 'shoelace':
        iconFamily.value = 'custom';
        registerIconLibrary('default', {
          resolver: name => `/assets/icons/bootstrap/${name}.svg`,
        });
        registerIconLibrary('system', {
          resolver: name => `/assets/icons/bootstrap/${name}.svg`,
        });
        break;
      default:
        iconFamily.value = 'fa-classic';
        iconStyle.value = 'solid';
        useFaIcons();
    }
  }

  function useFaIcons() {
    let iconLibrary;
    if(iconFamily.value === 'fa-sharp') {
      switch(iconStyle.value) {
        case 'solid':
          iconLibrary = 'sharp-solid';
          break;
        case 'regular':
          iconLibrary = 'sharp-regular';
          break;
        case 'light':
          iconLibrary = 'sharp-light';
          break;
        case 'thin':
          iconLibrary = 'sharp-thin';
          break;
        default:
          iconLibrary = 'sharp-solid';
      }
      // Ensures sharp-solid variations are available for ratings, etc.
      registerIconLibrary('always-solid', {
        resolver: name => `https://ka-f.fontawesome.com/releases/v6.5.1/svgs/sharp-solid/${name}.svg`
      });
      solidifyRatingStars();
    }
    else {
      switch(iconStyle.value) {
        case 'solid':
          iconLibrary = 'solid';
          break;
        case 'regular':
          iconLibrary = 'regular';
          break;
        case 'light':
          iconLibrary = 'light';
          break;
        case 'thin':
          iconLibrary = 'thin';
          break;
        case 'duotone':
          iconLibrary = 'duotone';
          break;
        default:
          iconLibrary = 'solid';
      }
      // Ensures solid variations are available for radios, ratings, etc.
      registerIconLibrary('always-solid', {
        resolver: name => `https://ka-f.fontawesome.com/releases/v6.5.1/svgs/solid/${name}.svg`
      });
      solidifyRatingStars();
    }
    registerIconLibrary('default', {
      resolver: name => `https://ka-f.fontawesome.com/releases/v6.5.1/svgs/${iconLibrary}/${name}.svg`
    });
    registerIconLibrary('system', {
      resolver: name => `https://ka-f.fontawesome.com/releases/v6.5.1/svgs/${iconLibrary}/${name}.svg`
    });
  };

  function syncLogoIcon() {
    if (logoSelector.value) {
      logoSelector.value = logoSelector.querySelector('[checked]').value;
      document.querySelector('#project-logo').setAttribute('name', `${logoSelector.querySelector('[checked]').value}`);
    } else {
      return;
    }
  }

  // Swaps icons to the preferred set for the selected theme
  themeSelect.addEventListener('change', event => {
    setPreferredIcons();
    showIconStyleOptions();
    syncLogoIcon();

    const iconChooserTrigger = document.getElementById('icon-chooser-trigger');
    const iconChooserTriggerTooltip = document.querySelector('[name="project-logo-selector"] wa-tooltip');

    if (iconFamily.value === 'custom') {
      iconChooserTrigger.setAttribute('disabled', 'true');
      iconChooserTriggerTooltip.textContent = 'Choose a Font Awesome icon family to browse more icons';
    }
    else {
      iconChooserTrigger.removeAttribute('disabled');
      iconChooserTriggerTooltip.textContent = 'Browse icons'
    }
  });

  // Changes available Icon Styles and swaps icons based on the selected Icon Family
  iconFamily.addEventListener('change', event => {
    useFaIcons();
    showIconStyleOptions();
  });

  // Swaps icons based on the selected Icon Style
  iconStyle.addEventListener('change', useFaIcons);


  // Corners
  container.querySelector('[name="corners"]').addEventListener('input', event => {
    document.documentElement.style.setProperty('--wa-border-radius-scale', `${event.target.value}`);
  });

  // Border width
  container.querySelector('[name="border-width"]').addEventListener('input', event => {
    document.documentElement.style.setProperty('--wa-border-width-scale', `${event.target.value / 16}`);
  });

  // Border style
  borderStyle.addEventListener('input', event => {
    document.documentElement.style.setProperty('--wa-border-style', event.target.value);
  });

  // Spacing style
  spacing.addEventListener('input', event => {
    document.documentElement.style.setProperty('--wa-space-scale', `${event.target.value}`);
  });

  // Form validation
  // Mostly useful for the number ranges. Very simple validation on blurs.
  function reportValidity(event) {
    const element = event.target
    if (typeof element?.reportValidity === "function") {
      const isValid = element.reportValidity()

      element.classList.toggle("wa-invalid", !isValid)
    }
  }

  knobs.querySelectorAll("*").forEach((el) => el.addEventListener("blur", reportValidity))
  knobs.querySelectorAll("*").forEach((el) => el.addEventListener("wa-blur", reportValidity))
</script>

<style>
  /* Themer layout and cross-theme styles */

  html {
    background: var(--wa-color-surface-default);
    background-attachment: fixed;
    background-image: radial-gradient(var(--wa-color-surface-lowered) 1.5px, transparent 0);
    background-size: 28px 28px;
    background-position: -19px -19px;
    min-height: 100vh;
  }

  /* page layout */
  .content {
    max-width: none;
    margin: 0;
  }

  .preview-container {
    background: var(--wa-color-surface-lowered);
    container-type: inline-size;
    padding: 0;
    max-inline-size: 1400px;
    margin-inline: auto;
    border: var(--wa-border-width-s) var(--wa-color-neutral-border-quiet) var(--wa-border-style);
    overflow: clip;
  }

  .overlap {
    position: relative;
    color: var(--wa-color-text-normal);
    z-index: 1;
  }

  .grid-12-col {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--wa-space-m);
  }

  /* general and utility */
  .strata {
    padding: var(--wa-space-3xl) 7%;
  }

  pre wa-copy-button {
    display: none;
  }

  wa-input::part(input) {
    width: 100%;
  }

  .square-frame,
  .landscape-frame {
    flex: 1 1 auto;
    overflow: hidden;

    &:not(wa-card *) {
      border-radius: calc(var(--wa-border-radius-l) - var(--wa-panel-border-width));
    }

    & > img {
      block-size: 100%;
      inline-size: 100%;
      object-fit: cover;
    }
  }

  .square-frame {
    aspect-ratio: 1 / 1;
  }

  .landscape-frame {
    aspect-ratio: 16 / 9;
  }

  /* strata - hero/header */
  .project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .project-header .title {
    grid-column-end: col-end;
  }

  .project-header wa-icon-button {
    color: inherit;
    font-size: var(--wa-font-size-l);

    &:not(:last-of-type) {
      margin-right: var(--wa-space-m);
    }
  }

  /* strata product cards */

  .products wa-card {
    height: 100%;
  }

  .products wa-card::part(body) {
    flex-grow: 1;
  }

  .product-card {
    grid-column: span 12;
    position: relative;
  }

  .product-card {
    max-width: 45ch;
    margin: 0 auto;
  }

  .product-card .title-rating {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    margin-bottom: var(--wa-flow-spacing);
  }

  .product-card .title {
    margin: 0;
  }

  .product-card p:last-of-type {
    margin-bottom: 0;
  }

  /* strata - blog post */

  .blog .column-post-header {
    grid-column: span 12;
    position: relative;
  }

  .blog .post-body {
    grid-column: span 12;
  }

  .blog .post-header {
    position: sticky;
    top: 1rem;
  }

  .blog .post-title {
    margin-top: 0;
    line-height: 1.2;
  }

  .blog .authors {
    margin: var(--wa-space-2xl) 0;
  }

  .blog .authors a {
    display: flex;
    align-items: center;
    gap: var(--wa-space-s);
  }


  /* strata - message composer */

  .message-composer .card-header [slot='header'] {
    display: flex;
    align-items: center;
  }

  .message-composer .card-footer [slot='footer'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .message-composer wa-card p {
    margin-bottom: 0;
  }

  .message-composer .card-footer [slot='footer'] .tools {
    display: flex;
    align-items: center;
  }

  .message-composer .grouped-buttons:not(:first-of-type) {
    padding-inline-start: var(--wa-space-m);
  }

  .message-composer .grouped-buttons:not(:last-of-type) {
    padding-inline-end: var(--wa-space-m);
    border-right: var(--wa-border-width-s) var(--wa-border-style) var(--wa-color-neutral-border-quiet);
  }

  .message-composer wa-card::part(header) {
    border-start-start-radius: calc(var(--border-radius) - var(--border-width));
    border-start-end-radius: calc(var(--border-radius) - var(--border-width));
  }

  .message-composer wa-card::part(footer) {
    border-end-start-radius: calc(var(--border-radius) - var(--border-width));
    border-end-end-radius: calc(var(--border-radius) - var(--border-width));
  }

  /* strata - product detail */

  .product-detail .product-detail-images {
    grid-column: span 12;
  }

  .product-detail .product-detail-info {
    grid-column: span 12;
  }

  .product-detail wa-carousel {
    max-width: 350px;
    margin: 0 auto;
  }

  .product-detail .title-rating {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5rem;
  }

  .product-detail .price {
    font-size: var(--wa-font-size-xl);
  }

  .product-detail .price-discounted {
    text-decoration: line-through;
    color: var(--wa-color-text-quiet);
    margin-inline-end: var(--wa-space-m);
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

  /* strata - Checkout Form */
  .checkout-form .payment {
    grid-column: span 12;
    order: 2;
  }

  .checkout-form .order {
    grid-column: span 12;
  }

  .checkout-form .payment wa-input,
  .checkout-form .payment wa-switch {
    margin-bottom: var(--wa-space-l);
  }

  .checkout-form .order-item {
    display: grid;
    gap: var(--wa-space-xl);
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--wa-space-xl);
  }

  .order-item .square-frame {
    grid-column: span 2;
  }

  .order-item .name {
    grid-column: span 5;
  }

  .order-item .finish {
    display: block;
  }

  .order-item wa-input {
    grid-column: span 3;
    margin: 0;
  }

  .order-item .price {
    grid-column: span 2;
  }


  /* responsive */
  @container preview (min-width: 1040px) {
    .product-card {
        grid-column: span 4;
    }

    .blog .column-post-header {
      grid-column: 1 / 5;
    }

    .blog .post-body {
      grid-column: 5 / 13;
    }

    .product-detail .product-detail-images {
      grid-column: 1 / 6;
    }

    .product-detail .product-detail-info {
      grid-column: 7 / 13;
    }

    .checkout-form .payment {
      grid-column: 1 / 6;
      order: 1;
    }

    .checkout-form .order {
      grid-column: 7 / 13;
      order: 2;
    }
  }
</style>

<!-- Themer Preview -->
<div class="preview-container">
  <section class="overlap">
    <div class="hero-background"></div>
    <header class="strata project-header">
      <h1 style="display: flex; align-items: center; margin: 0;">
        <wa-icon id="project-logo" name="shapes"></wa-icon>
        <span id="project-name" style="margin-inline-start: var(--wa-space-l);">Project Name</span>
      </h1>
      <div>
        <wa-icon-button name="magnifying-glass" label="Search"></wa-icon-button>
        <wa-icon-button name="user" label="Account"></wa-icon-button>
        <wa-icon-button name="bag-shopping" label="Your Basket"></wa-icon-button>
      </div>
    </header>
    <section class="strata hero">
      <div class="title">
        <h1 class="hero-title">What you know you can't explain, but you feel it.</h1>
        <wa-button variant="brand" class="hero-cta">
          <wa-icon slot="prefix" name="arrow-down"></wa-icon>
          Free Your Mind
        </wa-button>
      </div>
    </section>
    <section class="strata products grid-12-col">
      <wa-card class="card-image product-card">
        <wa-badge variant="brand" class="badge-stock">New</wa-badge>
        <div slot="media" class="landscape-frame">
          <img id="product-1" src="/assets/images/themer/default/morpheus.jpg" alt="" />
        </div>
        <div class="title-rating">
          <h2 class="title">Morpheus</h2>
          <wa-rating label="Rating" value="4" readonly></wa-rating>
        </div>
        <div class="description">
          <p>I see it in your eyes. You have the look of a man who accepts what he sees because he is expecting to wake up. Ironically, that's not far from the truth.</p>
        </div>
        <div slot="footer">
          <wa-button size="small">
            <wa-icon slot="prefix" name="plus" variant="regular"></wa-icon>
            Add to Cart
          </wa-button>
          <wa-button size="small" appearance="outline">
            <wa-icon slot="prefix" name="bookmark" variant="regular"></wa-icon>
            Save
          </wa-button>
        </div>
      </wa-card>
      <wa-card class="card-image product-card">
        <wa-badge variant="warning" class="badge-stock">Low Stock</wa-badge>
        <div slot="media" class="landscape-frame">
          <img id="product-2" src="/assets/images/themer/default/seraph.jpg" alt="" />
        </div>
        <div class="title-rating">
          <h2 class="title">Seraph</h2>
          <wa-rating label="Rating" value="5" readonly></wa-rating>
        </div>
        <div class="description">
          <p>The Oracle has many enemies, I had to be sure. You do not truly know someone until you fight them.</p>
        </div>
        <div slot="footer">
          <wa-button size="small">
            <wa-icon slot="prefix" name="plus" variant="regular"></wa-icon>
            Add to Cart
          </wa-button>
          <wa-button size="small" appearance="outline">
            <wa-icon slot="prefix" name="bookmark" variant="regular"></wa-icon>
            Save
          </wa-button>
        </div>
      </wa-card>
      <wa-card class="card-image product-card">
        <div slot="media" class="landscape-frame">
          <img id="product-3" src="/assets/images/themer/default/keymaker.jpg" alt="" />
        </div>
        <div class="title-rating">
          <h2 class="title">Keymaker</h2>
          <wa-rating label="Rating" value="3" readonly></wa-rating>
        </div>
        <div class="description">
          <p>Only the One can open the door. And only during that window can that door be opened.</p>
        </div>
        <div slot="footer">
          <wa-button size="small">
            <wa-icon slot="prefix" name="plus" variant="regular"></wa-icon>
            Add to Cart
          </wa-button>
          <wa-button size="small" appearance="outline">
            <wa-icon slot="prefix" name="bookmark" variant="regular"></wa-icon>
            Save
          </wa-button>
        </div>
      </wa-card>
    </section>
    <section class="strata blog grid-12-col">
      <div class="column-post-header">
        <div class="post-header">
          <h1 class="post-title">Simulacra &amp; Simulation</h1>
          <div class="post-meta">
            <div class="authors">
              <a href="">
                <wa-avatar image="/assets/images/themer/avatar-baudrillard.jpg" label="Jean Baudrillard" shape="rounded"> </wa-avatar>
                Jean Baudrillard
              </a>
            </div>
            <div class="categories">
              <a href=""><wa-tag size="small" variant="neutral">Action</wa-tag></a>
              <a href=""><wa-tag size="small" variant="success">Dystopia</wa-tag></a>
              <a href=""><wa-tag size="small" variant="warning">Sci-fi</wa-tag></a>
            </div>
          </div>
        </div>
      </div>
      <div class="post-body">
        <p>At an abandoned hotel, a police squad corners Trinity, who overpowers them with superhuman abilities. She flees, pursued by the police and a group of suited Agents capable of similar superhuman feats. She answers a ringing public telephone and vanishes.</p>
        <p>Fishburne stated that once he read the script, he did not understand why other people found it confusing. However, he doubted if the movie would ever be made, because it was "so smart." The Wachowskis instructed Fishburne to base his performance on the character Morpheus in Neil Gaiman's <a href=""><i>Sandman</i></a> comics.</p>
        <h2>The New Biology of Machines</h2>
        <p>The method used for creating these effects involved a technically expanded version of an old art photography technique known as time-slice photography, in which an array of cameras are placed around an object and triggered simultaneously. Each camera captures a still picture, contributing one frame to the video sequence, which creates the effect of "virtual camera movement"; the illusion of a viewpoint moving around an object that appears frozen in time.</p>
        <div class="landscape-frame" style="margin: 0 0 1rem 0;" >
          <img id="blog_feature" src="/assets/images/themer/default/blog_feature.jpg" alt="blog post example image" />
        </div>
        <p>For the "real world," the actors' hair was less styled, their clothing had more textile content, and the cinematographers used longer lenses to soften the backgrounds and emphasize the actors.</p>
<pre class="codeblock">
<code class="language-css">:host,
.wa-theme-purple-power {
  /* ... */
}</code></pre>

<h3>Ontological Shock</h3>
<p>The allegory is related to Plato's theory of Forms, which holds that the true essence of an object is not what we perceive with our senses, but rather its quality, and that most people perceive only the shadow of the object and are thus limited to false perception.</p>
<pre class="codeblock">
<code class="language-html">&lt;html class="wa-dark"&gt;
  &lt;head&gt;
    &lt;link rel="stylesheet" href="path/to/webawesome/dist/styles/themes/dark.css" /&gt;
  &lt;/head&gt;
  &lt;body&gt;
    ...
  &lt;/body&gt;
&lt;/html&gt;</code>
</pre>
        <wa-callout>
          <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
          Adam Sternbergh credits The Matrix with reinventing and setting the template for modern superhero blockbusters, and inspiring the superhero renaissance in the early 21st century.
        </wa-callout>
      </div>
    </section>
    <section class="strata message-composer">
      <wa-card class="card-header card-footer">
        <div slot="header">
          <div class="grouped-buttons">
            <wa-icon-button id="bold" name="bold" label="Bold"></wa-icon-button>
            <wa-tooltip for="bold">Bold</wa-tooltip>
            <wa-icon-button id="italic" name="italic" label="Italic"></wa-icon-button>
            <wa-tooltip for="italic">Italic</wa-tooltip>
            <wa-icon-button id="strikethrough" name="strikethrough" label="strikethrough"></wa-icon-button>
            <wa-tooltip for="strikethrough">Strikethrough</wa-tooltip>
          </div>
          <div class="grouped-buttons">
            <wa-icon-button id="link" name="link" label="Link"></wa-icon-button>
            <wa-tooltip for="link">Link</wa-tooltip>
          </div>
          <div class="grouped-buttons">
            <wa-icon-button id="list" name="list" label="Unordered List"></wa-icon-button>
            <wa-tooltip for="list">Unordered List</wa-tooltip>
            <wa-icon-button id="list-ol" name="list-ol" label="Ordered List"></wa-icon-button>
            <wa-tooltip for="list-ol">Ordered List</wa-tooltip>
          </div>
          <div class="grouped-buttons">
            <wa-icon-button id="block-quote" name="block-quote" label="Block Quote"></wa-icon-button>
            <wa-tooltip for="block-quote">Block Quote</wa-tooltip>
          </div>
          <div class="grouped-buttons">
            <wa-icon-button id="code" name="code" label="Code"></wa-icon-button>
            <wa-tooltip for="code">Code</wa-tooltip>
            <wa-icon-button id="inline-code" name="terminal" label="Inline Code"></wa-icon-button>
            <wa-tooltip for="inline-code">Inline Code</wa-tooltip>
          </div>
        </div>
        <div>
          <p>You can see it when you look out your window or when you turn on your television. You can feel it when you go to work... when you go to church... when you pay your taxes.</p>
        </div>
        <div slot="footer">
          <div class="tools">
            <div class="grouped-buttons">
              <wa-icon-button id="add-file" name="circle-plus" label="Add File"></wa-icon-button>
              <wa-tooltip for="add-file">Add File</wa-tooltip>
              <wa-icon-button id="formatting" name="font-case" label="Open Formatting"></wa-icon-button>
              <wa-tooltip for="formatting">Formatting</wa-tooltip>
              <wa-icon-button id="emojis" name="face-smile" label="Emoji"></wa-icon-button>
              <wa-tooltip for="emojis">Emojis</wa-tooltip>
              <wa-icon-button id="mention" name="at" label="Mention"></wa-icon-button>
              <wa-tooltip for="mention">Mention</wa-tooltip>
            </div>
            <div class="grouped-buttons">
              <wa-icon-button id="record-video" name="video" label="Video"></wa-icon-button>
              <wa-tooltip for="record-video">Record Video</wa-tooltip>
              <wa-icon-button id="record-audio" name="microphone" label="Microphone"></wa-icon-button>
              <wa-tooltip for="record-audio">Record Audio Clip</wa-tooltip>
            </div>
            <div class="grouped-buttons">
              <wa-icon-button id="add-magic" name="sparkles" label="Magic"></wa-icon-button>
              <wa-tooltip for="add-magic">Add Magic</wa-tooltip>
            </div>
          </div>
          <div class="send">
            <wa-button variant="brand" size="small">
              <wa-icon slot="prefix" name="paper-plane-top" variant="solid" label="Add File"></wa-icon>
              Send
            </wa-button>
          </div>
        </div>
      </wa-card>
    </section>
    <section class="strata product-detail grid-12-col">
      <div class="product-detail-images">
        <wa-carousel pagination style="--aspect-ratio: 3/4;">
          <wa-carousel-item>
            <img id="carousel-1" alt="See it for yourself" src="/assets/images/themer/default/carousel-1.jpg" />
          </wa-carousel-item>
          <wa-carousel-item>
            <img id="carousel-2" alt="Look through the code" src="/assets/images/themer/default/carousel-2.jpg" />
          </wa-carousel-item>
          <wa-carousel-item>
            <img id="carousel-3" alt="Free your mind" src="/assets/images/themer/default/carousel-3.jpg" />
          </wa-carousel-item>
        </wa-carousel>
      </div>
      <div class="product-detail-info">
        <div class="title-rating">
          <h1 class="title">The Oracle</h1>
          <wa-rating label="Rating" value="4" readonly></wa-rating>
        </div>
        <div class="price">
          <span class="price-discounted">$120</span>
          <span>$65</span>
        </div>
        <div style="margin: var(--wa-space-3xl) 0">
          <p>It is a pickle, no doubt about it. Bad news is there's no way you can really know if I'm here to help you or not, so it's really up to you. Just have to make up your own damn mind to either accept what I'm going to tell you, or reject it. Candy?</p>
          <p>We're all here to do what we're all here to do. I'm interested in one thing, Neo, the future. And believe me, I know: the only way to get there is together.</p>
        </div>
        <wa-callout variant="warning">
          <wa-icon slot="icon" name="clock" variant="regular"></wa-icon>
          This item will soon be discontinued
        </wa-callout>
        <div>
          <div style="margin: var(--wa-space-3xl) 0">
            <wa-radio-group label="Choose a finish" name="finish" value="Matte" class="product-finish">
              <wa-radio-button value="Matte">Matte</wa-radio-button>
              <wa-radio-button value="Glossy">Glossy</wa-radio-button>
              <wa-radio-button value="Pebbled" disabled>Pebbled</wa-radio-button>
              <wa-radio-button value="Holo">Holo</wa-radio-button>
            </wa-radio-group>
          </div>
          <div style="display: flex; align-items: end; gap: 1rem;">
            <wa-input type="number" label="How many?"></wa-input>
            <wa-button variant="brand">
              <wa-icon slot="prefix" name="bag-shopping" variant="solid" label="Add to Basket"></wa-icon>
              Add to Basket
            </wa-button>
            <wa-button variant="neutral">
              <wa-icon slot="prefix" name="bookmark" variant="regular"></wa-icon>
              Save
            </wa-button>
          </div>
        </div>
      </div>
    </section>
    <section class="strata support-table">
      <wa-card style="--padding: 0; width: 100%;">
      <table style="margin-bottom: 0;">
        <thead>
          <tr>
            <th><wa-checkbox size="large" style="padding-left: var(--wa-space-s)"><span class="wa-visually-hidden">Check all</span></wa-checkbox></th>
            <th>Customer</th>
            <th>Conversation</th>
            <th>Assigned To</th>
            <th style="text-align: center;">Status</th>
            <th><span class="wa-visually-hidden">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><wa-checkbox size="large" style="padding-left: var(--wa-space-s)"><span class="wa-visually-hidden">Completed</span></wa-checkbox></td>
            <td>Keanu Reeves</td>
            <td class="desc"><span style="font-weight: bold">Am I dead?</span><br><span class="excerpt">Okey dokey... free my mind. Right, no problem, free my mind, free my mind, no problem, right...</span></td>
            <td><wa-avatar  image="/assets/images/themer/avatar-chad.jpg"  label="Chad" style="margin-right: var(--wa-space-xs)"></wa-avatar>  Chad Stahelski</td>
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
            <td><wa-checkbox size="large" style="padding-left: var(--wa-space-s)"><span class="wa-visually-hidden">Completed</span></wa-checkbox></td>
            <td>Lawrence Fishburne</td>
            <td class="desc"><span style="font-weight: bold">We have a rule</span><br><span class="excerpt">We never free a mind once it's reached a certain age. It's dangerous, the mind has trouble letting go.</span></td>
            <td><wa-avatar image="/assets/images/themer/avatar-char.jpg"  label="Char" style="margin-right: var(--wa-space-xs)"></wa-avatar>  Char McCoy</td>
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
            <td><wa-checkbox size="large" style="padding-left: var(--wa-space-s)" checked><span class="wa-visually-hidden">Completed</span></wa-checkbox></td>
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
            <td><wa-checkbox size="large" style="padding-left: var(--wa-space-s)"><span class="wa-visually-hidden">Completed</span></wa-checkbox></td>
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
            <td><wa-checkbox size="large" style="padding-left: var(--wa-space-s)"><span class="wa-visually-hidden">Completed</span></wa-checkbox></td>
            <td>Hugo Weaving</td>
            <td class="desc"><span style="font-weight: bold">I'd like to share a revelation</span><br><span class="excerpt">I need the codes, I have to get inside Zion and you have to tell me how.</span></td>
            <td><wa-avatar  image="/assets/images/themer/avatar-dara.jpg"  label="Dara" style="margin-right: var(--wa-space-xs)"></wa-avatar> Dara Prescott</td>
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
    <section class="strata checkout-form grid-12-col">
        <div class="payment">
          <h2 style="margin-bottom: var(--wa-space-3xl);">Payment</h2>
          <form>
            <wa-input type="email" placeholder="ex. tanderson@metacortex.com" label="Email">
              <wa-icon name="envelope" variant="regular" slot="prefix"></wa-icon>
            </wa-input>
            <wa-input placeholder="1234 1234 1234 1234" label="Card Number">
              <wa-icon name="credit-card" variant="regular" slot="prefix"></wa-icon>
            </wa-input>
            <div style="display: flex; gap: 1rem;">
              <wa-input placeholder="MM / YY" label="Expiration">
                <wa-icon name="calendar" variant="regular" slot="prefix"></wa-icon>
              </wa-input>
              <wa-input placeholder="CVC" label="CVC">
                <wa-icon name="lock" variant="regular" slot="prefix"></wa-icon>
              </wa-input>
            </div>
            <wa-input placeholder="Thomas Anderson" label="Cardholder Name">
              <wa-icon name="user" variant="regular" slot="prefix"></wa-icon>
            </wa-input>
            <div style="display: flex; gap: 1rem;">
              <wa-select label="Country" value="USA">
              <wa-icon slot="prefix" name="globe" variant="regular"></wa-icon>
                <wa-option value="USA">United States</wa-option>
                <wa-option value="CAN">Canada</wa-option>
              </wa-select>
              <wa-input placeholder="12345" label="Zip">
                <wa-icon name="location-dot" variant="regular" slot="prefix"></wa-icon>
              </wa-input>
            </div>
            <wa-switch checked style="margin: var(--wa-space-2xl) 0 var(--wa-space-3xl) 0;">Sign me up for more offers from this store</wa-switch>
            <wa-button variant="brand" style="width: 100%;">Pay Now</wa-button>
          </form>
        </div>
        <div class="order">
          <h2 style="margin-bottom: var(--wa-space-3xl);">Order Summary</h2>
          <div class="order-item grid-12-col">
            <div class="square-frame">
              <img id="product_thumb-1" src="/assets/images/themer/default/morpheus.jpg" alt="Morpheus" />
            </div>
            <span class="name">
              <b>Morpheus</b>
            </span>
            <wa-input type="number" value="1"></wa-input>
            <span class="price">$120.00</span>
          </div>
          <div class="order-item grid-12-col">
            <div class="square-frame">
              <img id="product_thumb-2" src="/assets/images/themer/default/seraph.jpg" alt="Seraph" />
            </div>
            <span class="name">
              <b>Seraph</b>
              <span class="finish">Filled</span>
            </span>
            <wa-input type="number" value="2"></wa-input>
            <span class="price">$180.00</span>
          </div>
          <div class="order-item grid-12-col">
            <div class="square-frame">
              <img id="product_thumb-3" src="/assets/images/themer/default/keymaker.jpg" alt="Keymaker II" />
            </div>
            <span class="name">
              <b>Keymaker</b>
              <span class="finish">Glossy</span>
            </span>
            <wa-input type="number" value="1"></wa-input>
            <span class="price">$50.00</span>
          </div>
          <div style="display: flex; gap: var(--wa-space-m); margin: var(--wa-space-3xl) 0;">
            <wa-input placeholder="Discount code or gift card" style="flex: 1 1 auto;"></wa-input>
            <wa-button variant="neutral">Apply</wa-button>
          </div>
          <div class="totals">
            <div style="display: flex; justify-content: space-between; margin-bottom: var(--wa-space-xs);">
              <div>Subtotal</div>
              <div><b>$530.00</b></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: var(--wa-space-xs);">
              <div>Shipping</div>
              <div>$8.00</div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: var(--wa-space-xs);">
              <div><b>Total</b></div>
              <div><b>$538.00</b></div>
            </div>
          </div>
        </div>
    </section>

  </section>
</div>
