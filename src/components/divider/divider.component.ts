import { property } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './divider.styles.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Dividers are used to visually separate or group elements.
 * @documentation https://shoelace.style/components/divider
 * @status stable
 * @since 2.0
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 */
export default class WaDivider extends WebAwesomeElement {
  static styles: CSSResultGroup = [componentStyles, styles];

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
