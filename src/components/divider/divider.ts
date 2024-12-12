import { customElement, property } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import styles from './divider.css';
import WebAwesomeElement from '../../internal/webawesome-element.js';

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
  static shadowStyle = styles;

  /** Draws the divider in a vertical orientation. */
  @property({ type: Boolean, reflect: true }) vertical = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
  }

  @watch('vertical')
  handleVerticalChange() {
    this.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-divider': WaDivider;
  }
}
