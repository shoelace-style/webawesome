import { customElement, property } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './divider.styles.js';

/**
 * @summary Dividers are used to visually separate or group elements.
 * @documentation https://webawesome.com/docs/components/divider
 * @status stable
 * @since 2.0
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 */
@customElement('wa-divider')
export default class WaDivider extends WebAwesomeElement {
  static css = styles;

  /** Sets the divider's orientation. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
  }

  @watch('orientation')
  handleVerticalChange() {
    this.setAttribute('aria-orientation', this.orientation);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-divider': WaDivider;
  }
}
