import { html } from 'lit';
import componentStyles from '../../styles/component.styles.js';
import styles from './visually-hidden.styles.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary The visually hidden utility makes content accessible to assistive devices without displaying it on the screen.
 * @documentation https://shoelace.style/components/visually-hidden
 * @status stable
 * @since 2.0
 *
 * @slot - The content to be visually hidden.
 */
export default class WaVisuallyHidden extends WebAwesomeElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  render() {
    return html` <slot></slot> `;
  }
}
