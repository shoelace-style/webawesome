import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './sample-component.css';

/**
 * SAMPLE COMPONENT
 *
 * @summary A simple slider component that displays the current value.
 * @documentation https://webawesome.com/docs/components/sample-component
 * @status experimental
 * @since 3.0
 *
 * @tag wa-sample-component
 *
 * @csspart base - The component's root container.
 *
 * @prop {number} value - The current value of the slider.
 * @prop {number} min - The minimum value selectable.
 * @prop {number} max - The maximum value selectable.
 *
 * @example
 * ```html
 * <wa-sample-component value="75" min="0" max="150"></wa-sample-component>
 * ```
 */
@customElement('wa-sample-component')
export default class WaSampleComponent extends WebAwesomeElement {
  static css = styles;

  @property({ type: Number }) value = 50;

  @property({ type: Number }) min = 0;

  @property({ type: Number }) max = 100;

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = Number(input.value);
  }

  render() {
    return html`
      <div part="base">
        <input
          type="range"
          .value=${String(this.value)}
          .min=${String(this.min)}
          .max=${String(this.max)}
          @input=${this.handleInput}
        />
        <span>${this.value}</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-sample-component': WaSampleComponent;
  }
}
