import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import styles from './layout.styles.js';
import WaButton from '../button/button.component.js';
import WaDrawer from '../drawer/drawer.component.js';
import WaVisuallyHidden from '../visually-hidden/visually-hidden.component.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup, PropertyValueMap } from 'lit';

/**
 * @summary
 * @documentation https://shoelace.style/components/layout
 * @status experimental
 * @since 3.0
 *
 * @slot - The default slot. This is generally where your main content will go.
 * @slot banner - A banner to display above the header. Will collapse if the content size is 0px.
 * @slot header - A header to display at the top of the page or below a banner. Will collapse if the content size is 0px.
 * @slot sub-header - A sub-header to display below the `header`. Generally this is where breadcrumbs would go.
 * @slot menu - The left hand side of the page. If you slot an element in here, you will override the default "navigation" slot and will be handling navigation on your own. This also will not disable the fallback behavior of the navigation button. This is a sticky element.
 * @slot navigation-header - The header for a navigation area. On mobile this will be the header for `<wa-drawer>`
 * @slot navigation - The main content to display in the navigation area.
 * @slot navigation-footer - The footer for a navigation area. On mobile this will be the footer for `<wa-drawer>`
 * @slot main-header - Header to display inline above the main content
 * @slot main-footer - Footer to display inline below the main content
 * @slot aside - Content to be shown on the right side of the page. Generally this may be table of contents, ads, etc. This is sticky.
 * @slot skip-links - If you would like to override the `Skip to main` button and add additional "Skip to X", they can be inserted here.
 * @slot nav-button - For overriding the default `<wa-icon-button>` displayed as the fallback on mobile viewports
 * @slot footer - The content to display in the footer. This is always displayed underneath the viewport so will always make the page "scrollable".
 *
 * @csspart base - The component's base wrapper.
 * @csspart banner - The banner to show above header
 * @csspart header - The header, usually for top level navigation / branding.
 * @csspart sub-header - Shown below the header, usually intended for things like breadcrumbs and other page level navigation.
 * @csspart body - The wrapper around menu, main, and aside
 * @csspart menu - The left hand side of the page. Generally intended for navigation.
 * @csspart main-header - The header above main-content.
 * @csspart main-content - The main content
 * @csspart main-footer - The footer below main content.
 * @csspart aside - The right hand side of the page. Used for things like table of contents, ads, etc.
 * @csspart skip-links - Wrapper around skip-link
 * @csspart skip-link - The "skip to main content" link
 * @csspart nav-button - The default mobile `<sl-icon-button>` displayed on mobile viewports.
 * @csspart footer - The footer of the page. This is always below the initial viewport size.
 * @csspart dialog-wrapper - A wrapper around elements such as dialogs or other modal-like elements.
 *
 * @cssproperty [--menu-width=auto] - used for the grid for the menu width
 * @cssproperty [--main-width=1fr] - used for the grid for the main width
 * @cssproperty [--aside-width=auto] - Used for the grid for the aside width
 * @cssproperty [--banner-height=0px] - This gets auto-calculated when the layout connects. If you know the height of your banner, you can optionally set this to the proper value to prevent shifting.
 * @cssproperty [--header-height=0px] - This gets auto-calculated when the layout connects. If you know the height of your header, you can optionally set this to the proper value to prevent shifting.
 * @cssproperty [--sub-header-height=0px] - This gets auto-calculated when the layout connects. If you know the height of your sub-header, you can optionally set this to the proper value to prevent shifting.
 */
export default class WaLayout extends WebAwesomeElement {
  static styles: CSSResultGroup = styles;
  static dependencies = {
    'wa-button': WaButton,
    'wa-visually-hidden': WaVisuallyHidden,
    'wa-drawer': WaDrawer
  };

  /**
   * This maps to the "id" of the element placed in the default slot of the layout component.
   * This is used to generate the "Skip to main content" button.
   */
  @property({ attribute: 'main-id' }) mainId: string = '';

  /**
   * The view is a reflection of the "mobileBreakpoint", when the layout is larger than the mobileBreakpoint (768px by default)
   *   it is considered to be a "desktop" view. The view is merely a way to distinguish when to show / hide the navigation.
   */
  @property({ attribute: 'view', reflect: true }) view: 'mobile' | 'desktop' = 'mobile';

  /**
   * Hides the default navigation button fallback allowing you to create your own mobile navigation experience.
   */
  @property({ attribute: 'hide-nav-button', reflect: true, type: Boolean }) hideNavButton = false;

  /**
   * At what "px" to hide the "menu" slot and collapse into a hamburger button
   */
  @property({ attribute: 'mobile-breakpoint' }) mobileBreakpoint = 768;

  /**
   * Where to place the navigation when in the mobile viewport.
   */
  @property({ attribute: 'navigation-placement', reflect: true }) navigationPlacement: 'start' | 'end' = 'start';

  layoutResizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.borderBoxSize[0];
        const layoutWidth = contentBoxSize.inlineSize;

        const oldView = this.view;

        if (layoutWidth >= this.mobileBreakpoint) {
          this.view = 'desktop';
        } else {
          this.view = 'mobile';
        }

        this.requestUpdate('view', oldView);

        this.style.setProperty(`--layout-width`, `${layoutWidth}px`);
      }
    }
  });

  protected update(changedProperties: PropertyValueMap<this> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('view')) {
      this.hideNavigation();
    }
    super.update(changedProperties);
  }

  headerResizeObserver = this.slotResizeObserver('header');
  subHeaderResizeObserver = this.slotResizeObserver('sub-header');
  bannerResizeObserver = this.slotResizeObserver('banner');
  footerResizeObserver = this.slotResizeObserver('footer');

  slotResizeObserver(slot: string) {
    return new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = entry.borderBoxSize[0];
          this.style.setProperty(`--${slot}-height`, `${contentBoxSize.blockSize}px`);
        }
      }
    });
  }

  @query("[part~='header']") header: HTMLElement;
  @query("[part~='sub-header']") subHeader: HTMLElement;
  @query("[part~='footer']") footer: HTMLElement;
  @query("[part~='banner']") banner: HTMLElement;
  @query("[part~='navigation-drawer']") navigationDrawer: WaDrawer;

  connectedCallback() {
    super.connectedCallback();

    this.layoutResizeObserver.observe(this);

    setTimeout(() => {
      this.headerResizeObserver.observe(this.header);
      this.subHeaderResizeObserver.observe(this.subHeader);
      this.bannerResizeObserver.observe(this.banner);
      this.footerResizeObserver.observe(this.footer);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.layoutResizeObserver.unobserve(this);
    this.headerResizeObserver.unobserve(this.header);
    this.subHeaderResizeObserver.unobserve(this.subHeader);
    this.footerResizeObserver.unobserve(this.footer);
    this.bannerResizeObserver.unobserve(this.banner);
  }

  /**
   * Shows the mobile navigation drawer
   */
  showNavigation() {
    this.navigationDrawer?.show();
  }

  /**
   * Hides the mobile navigation drawer
   */
  hideNavigation() {
    this.navigationDrawer?.hide();
  }

  /**
   * Toggles the mobile navigation drawer
   */
  toggleNavigation() {
    if (this.navigationDrawer) {
      this.navigationDrawer.open = !this.navigationDrawer.open;
    }
  }

  private renderNavButton() {
    return html`
      <slot name="nav-button">
        <wa-icon-button name="list" variant="text" size="large" @click=${this.showNavigation} part="nav-button">
        </wa-icon-button>
      </slot>
    `;
  }

  render() {
    return html`
      <wa-visually-hidden class="skip-links" part="skip-links">
        <slot name="skip-links">
          ${when(
            this.mainId,
            () => html`
              <wa-button variant="brand" href=${`#${this.mainId}`} part="skip-link" class="skip-link">
                Skip to main
              </wa-button>
            `
          )}
        </slot>
      </wa-visually-hidden>

      <div class="base" part="base">
        <div class="banner" part="banner">
          <slot name="banner"></slot>
        </div>

        <div class="header" part="header">
          ${when(this.navigationPlacement === 'start', () => this.renderNavButton())}

          <slot name="header"></slot>

          ${when(this.navigationPlacement === 'end', () => this.renderNavButton())}
        </div>

        <div class="sub-header" part="sub-header">
          <slot name="sub-header"></slot>
        </div>

        <div class="body" part="body">
          <div class="menu" part="menu">
            <slot name="menu">
              <!--
                We generally expect there to be a <nav> here so we wrap it. If a user wants to override it, they
                can provide a <div slot="menu"> to circumvent our prebuilt <nav>
              -->
              <nav name="navigation" class="navigation" part="navigation navigation-desktop">
                <slot name=${this.view === 'desktop' ? 'navigation-header' : '___'}></slot>
                <slot name=${this.view === 'desktop' ? 'navigation' : '____'}></slot>
                <slot name=${this.view === 'desktop' ? 'navigation-footer' : '___'}></slot>
              </nav>
            </slot>
          </div>

          <div class="main" part="main">
            <div class="main-header" part="main-header">
              <slot name="main-header"></slot>
            </div>

            <div class="main-content" part="main-content"><slot></slot></div>

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

      <wa-drawer placement=${this.navigationPlacement} part="navigation-drawer" class="navigation-drawer">
        <slot slot="label" name=${this.view === 'mobile' ? 'navigation-header' : '___'}></slot>
        <slot name=${this.view === 'mobile' ? 'navigation' : '____'}></slot>
        <slot slot="footer" name=${this.view === 'mobile' ? 'navigation-footer' : '___'}></slot>
      </wa-drawer>

      <div part="dialog-wrapper" class="dialog-wrapper">
        <slot name="dialog"></slot>
      </div>
    `;
  }
}
