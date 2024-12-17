import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import appearanceStyles from '../../styles/utilities/appearance.css';
import variantStyles from '../../styles/utilities/variants.css';
import styles from './badge.css';

/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @documentation https://backers.webawesome.com/docs/components/badge
 * @status stable
 * @since 2.0
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --background-color - The badge's background color.
 * @cssproperty --border-color - The color of the badge's border.
 * @cssproperty --border-radius - The radius of the badge's corners.
 * @cssproperty --border-style - The style of the badge's border.
 * @cssproperty --border-width - The width of the badge's border.
 * @cssproperty --text-color - The color of the badge's content.
 */
@customElement('wa-badge')
export default class WaBadge extends WebAwesomeElement {
  static shadowStyle = [variantStyles, appearanceStyles, styles];

  /** The badge's theme variant. */
  @property({ reflect: true }) variant: 'brand' | 'success' | 'neutral' | 'warning' | 'danger' = 'brand';

  /** The badge's visual appearance. */
  @property({ reflect: true }) appearance: 'filled' | 'tinted' | 'outlined' = 'filled';

  /** Draws a pill-style badge with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the badge pulsate to draw attention. */
  @property({ type: Boolean, reflect: true }) pulse = false;

  render() {
    return html` <slot part="base" role="status"></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-badge': WaBadge;
  }
}
