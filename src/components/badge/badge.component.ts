import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './badge.styles.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @documentation https://shoelace.style/components/badge
 * @status stable
 * @since 2.0
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --background - The badge's background styles.
 * @cssproperty --border-color - The color of the badge's border.
 * @cssproperty --border-radius - The radius of the badge's corners.
 * @cssproperty --border-style - The style of the badge's border.
 * @cssproperty --border-width - The width of the badge's border.
 * @cssproperty --content-color - The color of the badge's content.
 */
export default class WaBadge extends WebAwesomeElement {
  static styles: CSSResultGroup = styles;

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
