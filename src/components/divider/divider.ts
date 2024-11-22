import { customElement, property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './divider.styles.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup, PropertyValues } from 'lit';

/**
 * @summary Dividers are used to visually separate or group elements.
 * @documentation https://backers.webawesome.com/docs/components/divider
 * @status stable
 * @since 2.0
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 */
@customElement('wa-divider')
export default class WaDivider extends WebAwesomeElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  /** Draws the divider in a vertical orientation. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-divider': WaDivider;
  }
}
