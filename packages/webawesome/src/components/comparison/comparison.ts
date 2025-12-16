import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { drag } from '../../internal/drag.js';
import { clamp } from '../../internal/math.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import styles from './comparison.styles.js';

/**
 * @summary Compare visual differences between similar content with a sliding panel.
 * @documentation https://webawesome.com/docs/components/comparison
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot before - The before content, often an `<img>` or `<svg>` element.
 * @slot after - The after content, often an `<img>` or `<svg>` element.
 * @slot handle - The icon used inside the handle.
 *
 * @event change - Emitted when the position changes.
 *
 * @csspart base - The container that wraps the before and after content.
 * @csspart before - The container that wraps the before content.
 * @csspart after - The container that wraps the after content.
 * @csspart divider - The divider that separates the before and after content.
 * @csspart handle - The handle that the user drags to expose the after content.
 *
 * @cssproperty --divider-width - The width of the dividing line.
 * @cssproperty --handle-size - The size of the compare handle.
 *
 * @cssstate dragging - Applied when the comparison is being dragged.
 */
@customElement('wa-comparison')
export default class WaComparison extends WebAwesomeElement {
  static css = styles;

  private readonly localize = new LocalizeController(this);

  @query('.handle') handle: HTMLElement;

  /** The position of the divider as a percentage. */
  @property({ type: Number, reflect: true }) position = 50;

  private handleDrag(event: PointerEvent) {
    const { width } = this.getBoundingClientRect();
    const isRtl = this.localize.dir() === 'rtl';

    event.preventDefault();

    drag(this, {
      onMove: x => {
        this.customStates.set('dragging', true);
        this.position = parseFloat(clamp((x / width) * 100, 0, 100).toFixed(2));
        if (isRtl) this.position = 100 - this.position;
      },
      onStop: () => {
        this.customStates.set('dragging', false);
      },
      initialEvent: event,
    });
  }

  private handleKeyDown(event: KeyboardEvent) {
    const isLtr = this.matches(':dir(ltr)');
    const isRtl = this.localize.dir() === 'rtl';

    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      const incr = event.shiftKey ? 10 : 1;
      let newPosition = this.position;

      event.preventDefault();

      if ((isLtr && event.key === 'ArrowLeft') || (isRtl && event.key === 'ArrowRight')) {
        newPosition -= incr;
      }
      if ((isLtr && event.key === 'ArrowRight') || (isRtl && event.key === 'ArrowLeft')) {
        newPosition += incr;
      }
      if (event.key === 'Home') {
        newPosition = 0;
      }
      if (event.key === 'End') {
        newPosition = 100;
      }
      newPosition = clamp(newPosition, 0, 100);

      this.position = newPosition;
    }
  }

  @watch('position', { waitUntilFirstUpdate: true })
  handlePositionChange() {
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  render() {
    const isRtl = this.hasUpdated ? this.localize.dir() === 'rtl' : this.dir === 'rtl';

    return html`
      <div id="comparison" class="image" part="base">
        <div part="before" class="before">
          <slot name="before"></slot>
        </div>

        <div
          part="after"
          class="after"
          style=${styleMap({
            clipPath: isRtl ? `inset(0 0 0 ${100 - this.position}%)` : `inset(0 ${100 - this.position}% 0 0)`,
          })}
        >
          <slot name="after"></slot>
        </div>
      </div>

      <div
        part="divider"
        class="divider"
        style=${styleMap({
          left: isRtl ? `${100 - this.position}%` : `${this.position}%`,
        })}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <div
          part="handle"
          class="handle"
          role="scrollbar"
          aria-valuenow=${this.position}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-controls="comparison"
          tabindex="0"
        >
          <slot name="handle">
            <wa-icon library="system" name="grip-vertical" variant="solid"></wa-icon>
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-comparison': WaComparison;
  }
}
