import { property, state } from 'lit/decorators.js';
import { html } from 'lit';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './nav-item.styles.js';
import type { CSSResultGroup } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @summary Short summary of the component's intended use.
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
 */
export default class WaNavItem extends WebAwesomeElement {
  static styles: CSSResultGroup = styles;

  /** maps to the underlying `<a>`'s href */
  @property() href = '';

  /** maps to aria-current="page" */
  @property({ type: Boolean }) active: boolean = false

  /** Tells the browser where to open the link. Only used when `href` is present. */
  @property() target: '_blank' | '_parent' | '_self' | '_top';

  /**
   * When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the
   * default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a
   * specific tab/window, this will prevent that from working correctly. You can remove or change the default value by
   * setting the attribute to an empty string or a value of your choice, respectively.
   */
  @property() rel = 'noreferrer noopener';

  /** Tells the browser to download the linked file as this filename. Only used when `href` is present. */
  @property() download?: string;

  @state() hasFocus: boolean = false

  private handleBlur() {
    this.hasFocus = false;
    this.emit('wa-blur');
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('wa-focus');
  }

  render() {
    return html`
      <div
        class="base"
        role="listitem"
        aria-current=${this.active ? "page" : "false"}
      >
        <a
          class=${classMap({
            "control": true,
            "control--active": this.active
          })}
          part="control"
          href=${ifDefined(this.href)}
          target=${ifDefined(this.target)}
          download=${ifDefined(this.download)}
          rel=${ifDefined(this.rel)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        >
          <slot name="prefix"></slot>
          <slot></slot>
          <slot name="suffix"></slot>
        </a>
      </div>
    `;
  }
}
