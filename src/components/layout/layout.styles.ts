import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: block;
    box-sizing: border-box;
    height: 100%;

    --menu-width: auto;
    --main-width: 1fr;
    --aside-width: auto;

    --banner-height: 0px;
    --header-height: 0px;
    --sub-header-height: 0px;
  }

  :host([disable-sticky~="banner"]) [part~="banner"],
  :host([disable-sticky~="header"]) [part~="header"],
  :host([disable-sticky~="sub-header"]) [part~="sub-header"],
  :host([disable-sticky~="aside"]) [part~="aside"],
  :host([disable-sticky~="menu"]) [part~="menu"] {
    position: static;
    overflow: unset;
  }

  :host([disable-sticky~="aside"]) [part~="aside"],
  :host([disable-sticky~="menu"]) [part~="menu"] {
    height: auto;
    max-height: auto;
  }

  [part~='base'] {
    min-height: 100%;
    display: grid;
    grid-template-rows: repeat(3, minmax(0, auto)) minmax(0, 1fr) minmax(0, auto);
    grid-template-columns: 100%;
    width: 100%;
    grid-template-areas:
      'banner'
      'header'
      'sub-header'
      'body'
      'footer';
  }

  /* Grid areas */
  [part~='banner'] {
    grid-area: banner;
  }

  [part~='header'] {
    grid-area: header;
  }

  [part~='sub-header'] {
    grid-area: sub-header;
  }

  [part~='menu'] {
    grid-area: menu;
  }

  [part~='body'] {
    grid-area: body;
  }

  [part~='main'] {
    grid-area: main;
  }

  [part~='aside'] {
    grid-area: aside;
  }

  [part~='footer'] {
    grid-area: footer;
  }

  /* Z-indexes */
  [part~='banner'],
  [part~='header'],
  [part~='sub-header'] {
    position: sticky;
    z-index: 5;
  }

  [part~='banner'] {
    top: 0px;
  }

  [part~='header'] {
    top: var(--banner-height);
  }

  [part~='sub-header'] {
    top: calc(var(--header-height) + var(--banner-height));
  }

  [part~='body'] {
    display: grid;
    height: 100%;
    align-items: flex-start;
    grid-template-columns: minmax(0, var(--menu-width)) minmax(0, var(--main-width)) minmax(0, var(--aside-width));
    grid-template-rows: minmax(0, 1fr);
    grid-template-areas: 'menu main aside';
  }

  [part~='main'] {
    display: grid;
    min-height: 100%;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
    grid-template-areas:
      'main-header'
      'main-content'
      'main-footer';
  }

  [part~='main-header'] {
    grid-area: main-header;
  }

  [part~='main-content'] {
    grid-area: main-content;
  }

  [part~='main-footer'] {
    grid-area: main-footer;
  }

  .skip-links {
    position: absolute;
    z-index: 6;
    padding: 0.25rem;

    /* This looks silly, but without this our skip links get flagged by a11y checkers. */
    background-color: var(--wa-color-neutral-0);
  }

  [part~='menu'],
  [part~='aside'] {
    position: sticky;
    top: calc(var(--banner-height) + var(--header-height) + var(--sub-header-height));
    z-index: 4;
    height: calc(100dvh - var(--header-height) - var(--banner-height) - var(--sub-header-height));
    max-height: calc(100dvh - var(--header-height) - var(--banner-height) - var(--sub-header-height));
    overflow: auto;
  }

  [part~='navigation'] {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
  }
`;
