import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import styles from './spinner.css';

/**
 * @summary Spinners are used to show the progress of an indeterminate operation.
 * @documentation https://webawesome.com/docs/components/spinner
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 * @csspart track - The spinner's track.
 * @csspart indicator - The spinner's indicator.
 *
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The color of the spinner's indicator.
 * @cssproperty --speed - The time it takes for the spinner to complete one animation cycle.
 */
@customElement('wa-spinner')
export default class WaSpinner extends WebAwesomeElement {
  static css = styles;

  private readonly localize = new LocalizeController(this);

  render() {
    return html`
      <div part="base" role="progressbar" aria-label=${this.localize.term('loading')}>
        <div class="track" part="track"></div>
        <div class="indicator" part="indicator"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-spinner': WaSpinner;
  }
}
