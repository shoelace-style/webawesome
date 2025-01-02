import { html, isServer } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { toLength, toPx } from '../../internal/css-values.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import visuallyHidden from '../../styles/utilities/visually-hidden.css';
import styles from './page.css';
import mobileStyles from './page.mobile.styles.js';

import '../button/button.js';
import '../drawer/drawer.js';
import '../icon/icon.js';

import type { PropertyValues } from 'lit';
import type WaDrawer from '../drawer/drawer.js';

if (typeof ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class {
    // eslint-disable-next-line
    constructor(..._args: ConstructorParameters<typeof ResizeObserver>) {}
    // eslint-disable-next-line
    observe(..._args: Parameters<ResizeObserver['observe']>) {}
    // eslint-disable-next-line
    unobserve(..._args: Parameters<ResizeObserver['unobserve']>) {}
    // eslint-disable-next-line
    disconnect(..._args: Parameters<ResizeObserver['disconnect']>) {}
  };
}

/**
 * @summary Pages offer an easy way to scaffold entire page layouts using minimal markup.
 * @documentation https://backers.webawesome.com/docs/components/page
 * @status experimental
 * @since 3.0
 *
 * @slot - The page's main content.
 * @slot banner - The banner that gets display above the header. The banner will not be shown if no content is provided.
 * @slot header - The header to display at the top of the page. If a banner is present, the header will appear below the banner. The header will not be shown if there is no content.
 * @slot subheader - A subheader to display below the `header`. This is a good place to put things like breadcrumbs.
 * @slot menu - The left side of the page. If you slot an element in here, you will override the default `navigation` slot and will be handling navigation on your own. This also will not disable the fallback behavior of the navigation button. This section "sticks" to the top as the page scrolls.
 * @slot navigation-header - The header for a navigation area. On mobile this will be the header for `<wa-drawer>`.
 * @slot navigation - The main content to display in the navigation area. This is displayed on the left side of the page, if `menu` is not used. This section "sticks" to the top as the page scrolls.
 * @slot navigation-footer - The footer for a navigation area. On mobile this will be the footer for `<wa-drawer>`.
 * @slot navigation-toggle - Use this slot to slot in your own button + icon for toggling the navigation drawer. By default it is a `<wa-button>` + a 3 bars `<wa-icon>`
 * @slot navigation-toggle-icon - Use this to slot in your own icon for toggling the navigation drawer. By default it is 3 bars `<wa-icon>`.
 * @slot main-header - Header to display inline above the main content.
 * @slot main-footer - Footer to display inline below the main content.
 * @slot aside - Content to be shown on the right side of the page. Typically contains a table of contents, ads, etc. This section "sticks" to the top as the page scrolls.
 * @slot skip-to-content - The "skip to content" slot. You can override this If you would like to override the `Skip to content` button and add additional "Skip to X", they can be inserted here.
 * @slot footer - The content to display in the footer. This is always displayed underneath the viewport so will always make the page "scrollable".
 *
 * @csspart base - The component's base wrapper.
 * @csspart banner - The banner to show above header.
 * @csspart header - The header, usually for top level navigation / branding.
 * @csspart subheader - Shown below the header, usually intended for things like breadcrumbs and other page level navigation.
 * @csspart body - The wrapper around menu, main, and aside.
 * @csspart menu - The left hand side of the page. Generally intended for navigation.
 * @csspart navigation - The `<nav>` that wraps the navigation slots on desktop viewports.
 * @csspart navigation-header - The header for a navigation area. On mobile this will be the header for `<wa-drawer>`.
 * @csspart navigation-footer - The footer for a navigation area. On mobile this will be the footer for `<wa-drawer>`.
 * @csspart navigation-toggle - The default `<wa-button>` that will toggle the `<wa-drawer>` for mobile viewports.
 * @csspart navigation-toggle-icon - The default `<wa-icon>` displayed inside of the navigation-toggle button.
 * @csspart main-header - The header above main content.
 * @csspart main-content - The main content.
 * @csspart main-footer - The footer below main content.
 * @csspart aside - The right hand side of the page. Used for things like table of contents, ads, etc.
 * @csspart skip-links - Wrapper around skip-link
 * @csspart skip-link - The "skip to main content" link
 * @csspart footer - The footer of the page. This is always below the initial viewport size.
 * @csspart dialog-wrapper - A wrapper around elements such as dialogs or other modal-like elements.
 *
 * @cssproperty [--menu-width=auto] - The width of the page's "menu" section.
 * @cssproperty [--main-width=1fr] - The width of the page's "main" section.
 * @cssproperty [--aside-width=auto] - The wide of the page's "aside" section.
 * @cssproperty [--banner-height=0px] - The height of the banner. This gets calculated when the page initializes. If the height is known, you can set it here to prevent shifting when the page loads.
 * @cssproperty [--header-height=0px] - The height of the header. This gets calculated when the page initializes. If the height is known, you can set it here to prevent shifting when the page loads.
 * @cssproperty [--subheader-height=0px] - The height of the subheader. This gets calculated when the page initializes. If the height is known, you can set it here to prevent shifting when the page loads.
 */
@customElement('wa-page')
export default class WaPage extends WebAwesomeElement {
  static shadowStyle = [visuallyHidden, styles];

  private headerResizeObserver = this.slotResizeObserver('header');
  private subheaderResizeObserver = this.slotResizeObserver('subheader');
  private bannerResizeObserver = this.slotResizeObserver('banner');
  private footerResizeObserver = this.slotResizeObserver('footer');

  private slotResizeObserver(slot: string) {
    return new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = entry.borderBoxSize[0];
          this.style.setProperty(`--${slot}-height`, `${contentBoxSize.blockSize}px`);
        }
      }
    });
  }

  private handleNavigationToggle = (e: Event) => {
    // Don't toggle the nav when we're in desktop mode
    if (this.view === 'desktop') {
      // Just in case, try to hide the navigation.
      this.hideNavigation();
      return;
    }

    const path = e.composedPath();

    const navigationToggleSlot = this.navigationToggleSlot;

    if (
      path.find((el: Element) => {
        return (
          el.hasAttribute?.('data-toggle-nav') ||
          el.assignedSlot === navigationToggleSlot ||
          el === navigationToggleSlot
        );
      })
    ) {
      e.preventDefault();
      this.toggleNavigation();
    }
  };

  @query("[part~='header']") header: HTMLElement;
  @query("[part~='subheader']") subheader: HTMLElement;
  @query("[part~='footer']") footer: HTMLElement;
  @query("[part~='banner']") banner: HTMLElement;
  @query("[part~='drawer']") navigationDrawer: WaDrawer;
  @query("slot[name~='navigation-toggle']") navigationToggleSlot: HTMLSlotElement;

  /**
   * The view is a reflection of the "mobileBreakpoint", when the page is larger than the `mobile-breakpoint` (768px by
   * default), it is considered to be a "desktop" view. The view is merely a way to distinguish when to show/hide the
   * navigation. You can use additional media queries to make other adjustments to content as necessary.
   * The default is "desktop" because the "mobile navigation drawer" isn't accessible via SSR due to drawer requiring JS.
   */
  @property({ attribute: 'view', reflect: true }) view: 'mobile' | 'desktop' = 'desktop';

  /**
   * Whether or not the navigation drawer is open. Note, the navigation drawer is only "open" on mobile views.
   */
  @property({ attribute: 'nav-open', reflect: true, type: Boolean }) navOpen = false;

  /**
   * At what page width to hide the "navigation" slot and collapse into a hamburger button.
   * Accepts both numbers (interpreted as px) and CSS lengths (e.g. `50em`), which are resolved based on the root element.
   */
  @property({ attribute: 'mobile-breakpoint', type: String })
  mobileBreakpoint = '768px';

  /**
   * Where to place the navigation when in the mobile viewport.
   */
  @property({ attribute: 'navigation-placement', reflect: true }) navigationPlacement: 'start' | 'end' = 'start';

  /**
   * Determines whether or not to hide the default hamburger button.
   * This will automatically flip to "true" if you add an element with `data-toggle-nav` anywhere in the element light DOM.
   * Generally this will be set for you and you don't need to do anything, unless you're using SSR, in which case you should set this manually for initial page loads.
   */
  @property({ attribute: 'disable-navigation-toggle', reflect: true, type: Boolean }) disableNavigationToggle: boolean =
    false;

  pageResizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.borderBoxSize[0];
        const pageWidth = contentBoxSize.inlineSize;

        const oldView = this.view;

        if (pageWidth >= toPx(this.mobileBreakpoint)) {
          this.view = 'desktop';
        } else {
          this.view = 'mobile';
        }

        this.requestUpdate('view', oldView);
      }
    }
  });

  protected update(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('view')) {
      this.hideNavigation();
    }
    super.update(changedProperties);
  }

  constructor() {
    super();

    if (!isServer) {
      this.addEventListener('click', this.handleNavigationToggle);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.pageResizeObserver.observe(this);

    const navQuery = ":not([slot='toggle-navigation']) [data-toggle-nav]";

    // check once on initial connect
    // eslint-disable-next-line
    this.disableNavigationToggle = Boolean(this.querySelector(navQuery));

    setTimeout(() => {
      this.headerResizeObserver.observe(this.header);
      this.subheaderResizeObserver.observe(this.subheader);
      this.bannerResizeObserver.observe(this.banner);
      this.footerResizeObserver.observe(this.footer);

      // Check again when the element updates
      // eslint-disable-next-line
      this.disableNavigationToggle = Boolean(this.querySelector(navQuery));
    });
  }

  firstUpdated() {
    // If the user provides a #main-content id, it should be present in the default slot and the "skip to
    // content" link will point to it. If not, we'll prepend an empty element for them so things just work.
    if (!document.getElementById('main-content')) {
      const div = document.createElement('div');
      div.id = 'main-content';
      div.slot = 'skip-to-content-target';
      this.prepend(div);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.pageResizeObserver.unobserve(this);
    this.headerResizeObserver.unobserve(this.header);
    this.subheaderResizeObserver.unobserve(this.subheader);
    this.footerResizeObserver.unobserve(this.footer);
    this.bannerResizeObserver.unobserve(this.banner);
  }

  /**
   * Shows the mobile navigation drawer
   */
  showNavigation() {
    this.navOpen = true;
  }

  /**
   * Hides the mobile navigation drawer
   */
  hideNavigation() {
    this.navOpen = false;
  }

  /**
   * Toggles the mobile navigation drawer
   */
  toggleNavigation() {
    this.navOpen = !this.navOpen;
  }

  render() {
    return html`
      <a href="#main-content" part="skip-to-content" class="wa-visually-hidden">
        <slot name="skip-to-content">Skip to content</slot>
      </a>

      <!-- unsafeHTML needed for SSR until this is solved: https://github.com/lit/lit/issues/4696 -->
      ${unsafeHTML(`
        <style id="mobile-styles">
          ${mobileStyles(toLength(this.mobileBreakpoint))}
        </style>
      `)}

      <div class="base" part="base">
        <div class="banner" part="banner">
          <slot name="banner"></slot>
        </div>
        <div class="header" part="header">
          <slot name="navigation-toggle">
            <wa-button part="navigation-toggle" size="small" appearance="plain" variant="neutral">
              <slot name="navigation-toggle-icon">
                <wa-icon name="bars" part="navigation-toggle-icon" label="Toggle navigation drawer"></wa-icon>
              </slot>
            </wa-button>
          </slot>
          <slot name="header"></slot>
        </div>
        <div class="subheader" part="subheader">
          <slot name="subheader"></slot>
        </div>
        <div class="body" part="body">
          <div class="menu" part="menu">
            <slot name="menu">
              <nav name="navigation" class="navigation" part="navigation navigation-desktop">
                <!-- Add fallback divs so that CSS grid works properly. -->
                <slot name="desktop-navigation-header">
                  <slot name=${this.view === 'desktop' ? 'navigation-header' : '___'}><div></div></slot>
                </slot>
                <slot name="desktop-navigation">
                  <slot name=${this.view === 'desktop' ? 'navigation' : '____'}><div></div></slot>
                </slot>
                <slot name="desktop-navigation-footer">
                  <slot name=${this.view === 'desktop' ? 'navigation-footer' : '___'}><div></div></slot>
                </slot>
              </nav>
            </slot>
          </div>
          <div class="main" part="main">
            <div class="main-header" part="main-header">
              <slot name="main-header"></slot>
            </div>
            <div class="main-content" part="main-content">
              <slot name="skip-to-content-target"></slot>
              <slot></slot>
            </div>
            <div class="main-footer" part="main-footer">
              <slot name="main-footer"></slot>
            </div>
          </div>
          <div class="aside" part="aside">
            <slot name="aside"></slot>
          </div>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <wa-drawer
        part="drawer"
        placement=${this.navigationPlacement}
        light-dismiss
        ?open=${live(this.navOpen)}
        @wa-after-show=${() => (this.navOpen = this.navigationDrawer.open)}
        @wa-after-hide=${() => (this.navOpen = this.navigationDrawer.open)}
        exportparts="
          dialog:drawer__dialog,
          overlay:drawer__overlay,
          panel:drawer__panel,
          header:drawer__header,
          header-actions:drawer__header-actions,
          title:drawer__title,
          close-button:drawer__close-button,
          close-button__base:drawer__close-button__base,
          body:drawer__body,
          footer:drawer__footer
        "
        class="navigation-drawer"
        with-header
        with-footer
      >
        <slot slot="label" part="navigation-header" name="mobile-navigation-header">
          <slot name=${this.view === 'mobile' ? 'navigation-header' : '___'}></slot>
        </slot>
        <slot name="mobile-navigation">
          <slot name=${this.view === 'mobile' ? 'navigation' : '____'}></slot>
        </slot>

        <slot name="mobile-navigation-footer">
          <slot
            part="navigation-footer"
            slot="footer"
            name=${this.view === 'mobile' ? 'navigation-footer' : '___'}
          ></slot>
        </slot>
      </wa-drawer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-page': WaPage;
  }
}
