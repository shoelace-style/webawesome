import SlVisuallyHidden from "../visually-hidden/visually-hidden.component.js"
import { property, query } from 'lit/decorators.js';
import { html } from 'lit';
import ShoelaceElement from '../../internal/shoelace-element.js';
import styles from './layout.styles.js';
import type { CSSResultGroup, PropertyValueMap } from 'lit';
import { when } from "lit/directives/when.js";
import SlDrawer from "../drawer/drawer.component.js";
import SlButton from "../button/button.component.js";

/**
 * @summary Short summary of the component's intended use.
 * @documentation https://shoelace.style/components/layout
 * @status experimental
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 * @cssproperty --example - An example CSS custom property.
 */
export default class SlLayout extends ShoelaceElement {
  static styles: CSSResultGroup = styles;
  static dependencies = {
    'sl-button': SlButton,
    'sl-visually-hidden': SlVisuallyHidden,
    'sl-drawer': SlDrawer
  }

  @property({ attribute: "main-id" }) mainId: string = ""
  @property({ attribute: "view", reflect: true }) view: "mobile" | "desktop" = "mobile"
  @property({ attribute: "hide-nav-button", reflect: true, type: Boolean }) hideNavButton = false

  @property({ attribute: "mobile-breakpoint" }) mobileBreakpoint = 768
  @property({ attribute: "navigation-placement" }) navigationPlacement: "start" | "end" = "start"

  layoutResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.borderBoxSize[0];
        const layoutWidth = contentBoxSize.inlineSize

        const oldView = this.view

        if (layoutWidth >= this.mobileBreakpoint) {
          this.view = "desktop"
        } else {
          this.view = "mobile"
        }

        this.requestUpdate("view", oldView)

        this.style.setProperty(`--layout-width`, `${layoutWidth}px`)
      }
    }
  });

  protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has("view")) {
      this.hideNavigation()
    }
    super.update(changedProperties)
  }

  headerResizeObserver = this.slotResizeObserver("header");
  subHeaderResizeObserver = this.slotResizeObserver("sub-header");
  bannerResizeObserver = this.slotResizeObserver("banner");
  footerResizeObserver = this.slotResizeObserver("footer");

  slotResizeObserver (slot: string) {
    return new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = entry.borderBoxSize[0];
          this.style.setProperty(`--${slot}-height`, `${contentBoxSize.blockSize}px`)
        }
      }
    })
  }

  @query("[part~='header']") header: HTMLElement
  @query("[part~='sub-header']") subHeader: HTMLElement
  @query("[part~='footer']") footer: HTMLElement
  @query("[part~='banner']") banner: HTMLElement
  @query("[part~='navigation-drawer']") navigationDrawer: SlDrawer

  connectedCallback () {
    super.connectedCallback()

    this.layoutResizeObserver.observe(this)

    setTimeout(() => {
      this.headerResizeObserver.observe(this.header)
      this.subHeaderResizeObserver.observe(this.subHeader)
      this.bannerResizeObserver.observe(this.banner)
      this.footerResizeObserver.observe(this.footer)
    })
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.layoutResizeObserver.unobserve(this)
    this.headerResizeObserver.unobserve(this.header)
    this.subHeaderResizeObserver.unobserve(this.subHeader)
    this.footerResizeObserver.unobserve(this.footer)
    this.bannerResizeObserver.unobserve(this.banner)
  }

  showNavigation () {
    this.navigationDrawer?.show()
  }

  hideNavigation () {
    this.navigationDrawer?.hide()
  }

  toggleNavigation () {
    if (this.navigationDrawer) {
      this.navigationDrawer.open = !this.navigationDrawer.open
    }
  }

  render () {
    return html`
      <sl-visually-hidden class="skip-links" part="skip-links">
        <slot name="skip-links">
          ${when(this.mainId, () => html`
            <sl-button variant="primary" href=${`#${this.mainId}`} part="skip-link" class="skip-link">
              Skip to main
            </sl-button>
          `)}
        </slot>
      </sl-visually-hidden>

      <div class="base" part="base">
        <div class="banner" part="banner">
          <slot name="banner"></slot>
        </div>

        <div class="header" part="header">
          <slot name="nav-button">
            <sl-icon-button
              name="list"
              variant="text"
              size="large"
              part="nav-button"
              @click=${this.showNavigation}
              part="icon-button"
            >
            </sl-icon-button>
          </slot>
          <slot name="header"></slot>
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
              <nav name="navigation" class="navigation" part="navigation">
                <slot name=${this.view === "desktop" ? "navigation-header" : "___"}></slot>
                <slot name=${this.view === "desktop" ? "navigation" : "____"}></slot>
                <slot name=${this.view === "desktop" ? "navigation-footer" : "___"}></slot>
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

      <sl-drawer placement=${this.navigationPlacement} part="navigation-drawer" class="navigation-drawer">
        <slot slot="label" name=${this.view === "mobile" ? "navigation-header" : "___"}></slot>
        <slot name=${this.view === "mobile" ? "navigation" : "____"}></slot>
        <slot slot="footer" name=${this.view === "mobile" ? "navigation-footer" : "___"}></slot>
      </sl-drawer>

      <div part="dialog" class="dialog">
        <slot name="dialog"></slot>
      </div>

    `
  }
}
