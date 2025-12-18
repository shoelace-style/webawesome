import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { clamp } from '../../internal/math.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import styles from './progress-bar.styles.js';

/**
 * @summary Progress bars are used to show the status of an ongoing operation.
 * @documentation https://webawesome.com/docs/components/progress-bar
 * @status stable
 * @since 2.0
 *
 * @slot - A label to show inside the progress indicator.
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The progress bar's indicator.
 * @csspart label - The progress bar's label.
 *
 * @cssproperty [--track-height=1rem] - The color of the track.
 * @cssproperty [--track-color=var(--wa-color-neutral-fill-normal)] - The color of the track.
 * @cssproperty [--indicator-color=var(--wa-color-brand-fill-loud)] - The color of the indicator.
 */
@customElement('wa-progress-bar')
export default class WaProgressBar extends WebAwesomeElement {
  static css = styles;
  private readonly localize = new LocalizeController(this);

  /** The current progress as a percentage, 0 to 100. */
  @property({ type: Number, reflect: true }) value = 0;

  /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  /** A custom label for assistive devices. */
  @property() label = '';

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('value')) {
      // Wait a cycle before setting it so Safari animates it.
      // https://github.com/shoelace-style/webawesome/issues/356
      requestAnimationFrame(() => {
        this.style.setProperty('--percentage', `${clamp(this.value, 0, 100)}%`);
      });
    }
  }

  render() {
    return html`
      <div
        part="base"
        class="progress-bar"
        role="progressbar"
        title=${ifDefined(this.title)}
        aria-label=${this.label.length > 0 ? this.label : this.localize.term('progress')}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate ? '0' : this.value}
      >
        <div part="indicator" class="indicator">
          ${!this.indeterminate ? html` <slot part="label" class="label"></slot> ` : ''}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-progress-bar': WaProgressBar;
  }
}
