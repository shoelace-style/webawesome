import { html } from 'lit';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './nav-group.styles.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Short summary of the component's intended use.
 * @documentation https://shoelace.style/components/nav-group
 * @status experimental
 * @since 3.0
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 */
export default class WaNavGroup extends WebAwesomeElement {
  static styles: CSSResultGroup = styles;

  render() {
  return html`<div class="base" part="base" role="list">
    <slot></slot>
  </div>`;
  }
}
