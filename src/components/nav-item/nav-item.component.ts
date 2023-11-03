import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LocalizeController } from '@shoelace-style/localize';
import { property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import styles from './nav-item.styles.js';
import WaDetails from '../details/details.component.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary A nav item is intended to be used in a navigation area such as within a nav element in a sidebar or inside of a drawer. A nav item is meant to drive page navigations.
 * @documentation https://shoelace.style/components/nav-item
 * @status experimental
 * @since 3.0
 *
 * @event wa-focus - Emitted on focus.
 * @event wa-blur - Emitted on blur.
 *
 * @slot - The link's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 */
export default class WaNavItem extends WebAwesomeElement {
  static styles: CSSResultGroup = styles;

  static dependencies = {
    'wa-details': WaDetails
  };

  private readonly localize = new LocalizeController(this);

  /** maps to the underlying `<a>`'s href */
  @property({ reflect: true }) href = '';

  /** maps to aria-current="<current>". Generally this value will either be "page", "true", or "false" */
  @property({ reflect: true }) current: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' = 'false';

  /** Tells the browser where to open the link. Only used when `href` is present. */
  @property({ reflect: true }) target: '_blank' | '_parent' | '_self' | '_top';

  /**
   * When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the
   * default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a
   * specific tab/window, this will prevent that from working correctly. You can remove or change the default value by
   * setting the attribute to an empty string or a value of your choice, respectively.
   */
  @property({ reflect: true }) rel = 'noreferrer noopener';

  /** Tells the browser to download the linked file as this filename. Only used when `href` is present. */
  @property({ reflect: true }) download?: string;

  /**
   * The text to display in the summary of the `<wa-details>` element when the nav item is expandable.
   */
  @property({ reflect: true }) label = '';

  /**
   * If true, will add a `<wa-details>` element into the shadowRoot that you can slot `<wa-nav-items>` into.
   */
  @property({ reflect: true, type: Boolean }) expandable: boolean = false;

  @state() hasFocus: boolean = false;

  private handleBlur() {
    this.hasFocus = false;
    this.emit('wa-blur');
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('wa-focus');
  }

  render() {
    const isRtl = this.localize.dir() === 'rtl';
    return html`
      <div class="base" part="base" role="listitem" aria-current=${this.expandable ? 'false' : this.current}>
        ${when(
          this.expandable,
          () => html`
            <wa-details
              class="details"
              part="details"
              exportparts="
                  base:details__base,
                  header:details__header,
                  header:control,
                  summary:details__summary,
                  summary-icon:details__summary-icon,
                  content:details__content
                "
            >
              <div slot="summary" part="label">
                <slot name="label">${this.label}</slot>
              </div>

              <slot slot="expand-icon" name="expand-icon">
                <wa-icon library="system" name=${isRtl ? 'chevron-left' : 'chevron-right'}></wa-icon>
              </slot>
              <slot slot="collapse-icon" name="collapse-icon">
                <wa-icon library="system" name=${isRtl ? 'chevron-left' : 'chevron-right'}></wa-icon>
              </slot>

              <div class="nav-items" part="nav-items" aria-labelledby="heading" role="list">
                <slot></slot>
              </div>
            </wa-details>
          `,
          () => html`
            <a
              class="control"
              part="control"
              href=${ifDefined(this.href)}
              target=${ifDefined(this.target)}
              download=${ifDefined(this.download)}
              rel=${ifDefined(this.rel)}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
            >
              <slot part="prefix" name="prefix"></slot>
              <div class="content" part="content"><slot></slot></div>
              <slot part="suffix" name="suffix"></slot>
            </a>
          `
        )}
      </div>
    `;
  }
}
