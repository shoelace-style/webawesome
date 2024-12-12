import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { html } from 'lit';
import styles from './badge.css';
import WebAwesomeElement from '../../internal/webawesome-element.js';

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
 * @cssproperty --content-color - The color of the badge's content.
 */
@customElement('wa-badge')
export default class WaBadge extends WebAwesomeElement {
  static shadowStyle = styles;

  /** The badge's theme variant. */
  @property({ reflect: true }) variant: 'brand' | 'success' | 'neutral' | 'warning' | 'danger' = 'brand';

  /** Draws a pill-style badge with rounded edges. */
  @property({ type: Boolean, reflect: true }) pill = false;

  /** Makes the badge pulsate to draw attention. */
  @property({ type: Boolean, reflect: true }) pulse = false;

  render() {
    return html`
      <span
        part="base"
        class=${classMap({
          badge: true,
          'badge--brand': this.variant === 'brand',
          'badge--success': this.variant === 'success',
          'badge--neutral': this.variant === 'neutral',
          'badge--warning': this.variant === 'warning',
          'badge--danger': this.variant === 'danger',
          'badge--pill': this.pill,
          'badge--pulse': this.pulse
        })}
        role="status"
      >
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-badge': WaBadge;
  }
}
