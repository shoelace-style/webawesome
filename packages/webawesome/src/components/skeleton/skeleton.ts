import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './skeleton.styles.js';

/**
 * @summary Skeletons are used to provide a visual representation of where content will eventually be drawn.
 * @documentation https://webawesome.com/docs/components/skeleton
 * @status stable
 * @since 2.0
 *
 * @csspart indicator - The skeleton's indicator which is responsible for its color and animation.
 *
 * @cssproperty --color - The color of the skeleton.
 * @cssproperty --sheen-color - The sheen color when the skeleton is in its loading state.
 */
@customElement('wa-skeleton')
export default class WaSkeleton extends WebAwesomeElement {
  static css = styles;

  /** Determines which effect the skeleton will use. */
  @property({ reflect: true }) effect: 'pulse' | 'sheen' | 'none' = 'none';

  render() {
    return html` <div part="indicator" class="indicator"></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-skeleton': WaSkeleton;
  }
}
