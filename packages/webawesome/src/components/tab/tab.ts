import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './tab.styles.js';

let id = 0;

/**
 * @summary Tabs are used inside [tab groups](/docs/components/tab-group) to represent and activate [tab panels](/docs/components/tab-panel).
 * @documentation https://webawesome.com/docs/components/tab
 * @status stable
 * @since 2.0
 *
 * @slot - The tab's label.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('wa-tab')
export default class WaTab extends WebAwesomeElement {
  static css = styles;

  private readonly attrId = ++id;
  private readonly componentId = `wa-tab-${this.attrId}`;

  @query('.tab') tab: HTMLElement;

  /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
  @property({ reflect: true }) panel = '';

  /** @internal Draws the tab in an active state. */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Disables the tab and prevents selection. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * @internal
   * Need to wrap in a `@property()` otherwise NextJS blows up.
   */
  @property({ type: Number, reflect: true }) tabIndex = 0;

  connectedCallback() {
    // Auto-slot into nav slot
    this.slot ||= 'nav';

    super.connectedCallback();
    this.setAttribute('role', 'tab');
  }

  @watch('active')
  handleActiveChange() {
    this.setAttribute('aria-selected', this.active ? 'true' : 'false');
  }

  @watch('disabled')
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');

    if (this.disabled && !this.active) {
      this.tabIndex = -1;
    } else {
      this.tabIndex = 0;
    }
  }

  render() {
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
    this.id = this.id?.length > 0 ? this.id : this.componentId;

    return html`
      <div
        part="base"
        class=${classMap({
          tab: true,
          'tab-active': this.active,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-tab': WaTab;
  }
}
