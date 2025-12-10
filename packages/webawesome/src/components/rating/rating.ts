import { html } from 'lit';
import { customElement, eventOptions, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { WaHoverEvent } from '../../events/hover.js';
import { clamp } from '../../internal/math.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import sizeStyles from '../../styles/component/size.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import styles from './rating.styles.js';

/**
 * @summary Ratings give users a way to quickly view and provide feedback.
 * @documentation https://webawesome.com/docs/components/rating
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @event change - Emitted when the rating's value changes.
 * @event {{ phase: 'start' | 'move' | 'end', value: number }} wa-hover - Emitted when the user hovers over a value. The
 *  `phase` property indicates when hovering starts, moves to a new value, or ends. The `value` property tells what the
 *  rating's value would be if the user were to commit to the hovered value.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --symbol-color - The inactive color for symbols.
 * @cssproperty --symbol-color-active - The active color for symbols.
 * @cssproperty --symbol-spacing - The spacing to use around symbols.
 */
@customElement('wa-rating')
export default class WaRating extends WebAwesomeElement {
  static css = [sizeStyles, styles];

  private readonly localize = new LocalizeController(this);

  @query('.rating') rating: HTMLElement;

  @state() private hoverValue = 0;
  @state() private isHovering = false;

  /** A label that describes the rating to assistive devices. */
  @property() label = '';

  /** The current rating. */
  @property({ type: Number }) value = 0;

  /** The highest rating to show. */
  @property({ type: Number }) max = 5;

  /**
   * The precision at which the rating will increase and decrease. For example, to allow half-star ratings, set this
   * attribute to `0.5`.
   */
  @property({ type: Number }) precision = 1;

  /** Makes the rating readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Disables the rating. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * A function that customizes the symbol to be rendered. The first and only argument is the rating's current value.
   * The function should return a string containing trusted HTML of the symbol to render at the specified value. Works
   * well with `<wa-icon>` elements.
   */
  @property() getSymbol: (value: number, isSelected: boolean) => string = (_value, isSelected) => {
    return isSelected
      ? '<wa-icon name="star" library="system" variant="solid"></wa-icon>'
      : '<wa-icon name="star" library="system" variant="regular"></wa-icon>';
  };

  /** The component's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  private getValueFromMousePosition(event: MouseEvent) {
    return this.getValueFromXCoordinate(event.clientX);
  }

  private getValueFromTouchPosition(event: TouchEvent) {
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }

  private getValueFromXCoordinate(coordinate: number) {
    const isRtl = this.localize.dir() === 'rtl';
    const { left, right, width } = this.rating.getBoundingClientRect();
    const value = isRtl
      ? this.roundToPrecision(((right - coordinate) / width) * this.max, this.precision)
      : this.roundToPrecision(((coordinate - left) / width) * this.max, this.precision);

    return clamp(value, 0, this.max);
  }

  private handleClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    this.setValue(this.getValueFromMousePosition(event));
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });
  }

  private setValue(newValue: number) {
    if (this.disabled || this.readonly) {
      return;
    }

    this.value = newValue === this.value ? 0 : newValue;
    this.isHovering = false;
  }

  private handleKeyDown(event: KeyboardEvent) {
    const isLtr = this.matches(':dir(ltr)');
    const isRtl = this.localize.dir() === 'rtl';
    const oldValue = this.value;

    if (this.disabled || this.readonly) {
      return;
    }

    if (event.key === 'ArrowDown' || (isLtr && event.key === 'ArrowLeft') || (isRtl && event.key === 'ArrowRight')) {
      const decrement = event.shiftKey ? 1 : this.precision;
      this.value = Math.max(0, this.value - decrement);
      event.preventDefault();
    }

    if (event.key === 'ArrowUp' || (isLtr && event.key === 'ArrowRight') || (isRtl && event.key === 'ArrowLeft')) {
      const increment = event.shiftKey ? 1 : this.precision;
      this.value = Math.min(this.max, this.value + increment);
      event.preventDefault();
    }

    if (event.key === 'Home') {
      this.value = 0;
      event.preventDefault();
    }

    if (event.key === 'End') {
      this.value = this.max;
      event.preventDefault();
    }

    if (this.value !== oldValue) {
      this.updateComplete.then(() => {
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      });
    }
  }

  private handleMouseEnter(event: MouseEvent) {
    this.isHovering = true;
    this.hoverValue = this.getValueFromMousePosition(event);
  }

  private handleMouseMove(event: MouseEvent) {
    this.hoverValue = this.getValueFromMousePosition(event);
  }

  private handleMouseLeave() {
    this.isHovering = false;
  }

  private handleTouchStart(event: TouchEvent) {
    this.isHovering = true;
    this.hoverValue = this.getValueFromTouchPosition(event);

    // Prevent scrolling when touch is initiated
    event.preventDefault();
  }

  @eventOptions({ passive: true })
  private handleTouchMove(event: TouchEvent) {
    this.hoverValue = this.getValueFromTouchPosition(event);
  }

  private handleTouchEnd(event: TouchEvent) {
    this.isHovering = false;
    this.setValue(this.hoverValue);
    this.updateComplete.then(() => {
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });

    // Prevent click on mobile devices
    event.preventDefault();
  }

  private roundToPrecision(numberToRound: number, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }

  @watch('hoverValue')
  handleHoverValueChange() {
    this.dispatchEvent(
      new WaHoverEvent({
        phase: 'move',
        value: this.hoverValue,
      }),
    );
  }

  @watch('isHovering')
  handleIsHoveringChange() {
    this.dispatchEvent(
      new WaHoverEvent({
        phase: this.isHovering ? 'start' : 'end',
        value: this.hoverValue,
      }),
    );
  }

  /** Sets focus on the rating. */
  focus(options?: FocusOptions) {
    this.rating.focus(options);
  }

  /** Removes focus from the rating. */
  blur() {
    this.rating.blur();
  }

  render() {
    const isRtl = this.hasUpdated ? this.localize.dir() === 'rtl' : this.dir;
    const counter = Array.from(Array(this.max).keys());
    let displayValue = 0;

    if (this.disabled || this.readonly) {
      displayValue = this.value;
    } else {
      displayValue = this.isHovering ? this.hoverValue : this.value;
    }

    return html`
      <div
        part="base"
        class=${classMap({
          rating: true,
          'rating-readonly': this.readonly,
          'rating-disabled': this.disabled,
        })}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-readonly=${this.readonly ? 'true' : 'false'}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled || this.readonly ? '-1' : '0'}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="symbols">
          ${counter.map(index => {
            const isSelected = displayValue >= index + 1;

            if (displayValue > index && displayValue < index + 1) {
              // Users can click the current value to clear the rating. When this happens, we set this.isHovering to
              // false to prevent the hover state from confusing them as they move the mouse out of the control. This
              // extra mouseenter will reinstate it if they happen to mouse over an adjacent symbol.
              return html`
                <span
                  class=${classMap({
                    symbol: true,
                    'partial-symbol-container': true,
                    'symbol-hover': this.isHovering && Math.ceil(displayValue) === index + 1,
                  })}
                  role="presentation"
                >
                  <div
                    style=${styleMap({
                      clipPath: isRtl
                        ? `inset(0 ${(displayValue - index) * 100}% 0 0)`
                        : `inset(0 0 0 ${(displayValue - index) * 100}%)`,
                    })}
                  >
                    ${unsafeHTML(this.getSymbol(index + 1, false))}
                  </div>
                  <div
                    class="partial-filled"
                    style=${styleMap({
                      clipPath: isRtl
                        ? `inset(0 0 0 ${100 - (displayValue - index) * 100}%)`
                        : `inset(0 ${100 - (displayValue - index) * 100}% 0 0)`,
                    })}
                  >
                    ${unsafeHTML(this.getSymbol(index + 1, true))}
                  </div>
                </span>
              `;
            }

            return html`
              <span
                class=${classMap({
                  symbol: true,
                  'symbol-hover': this.isHovering && Math.ceil(displayValue) === index + 1,
                  'symbol-active': displayValue >= index + 1,
                })}
                role="presentation"
              >
                ${unsafeHTML(this.getSymbol(index + 1, isSelected))}
              </span>
            `;
          })}
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-rating': WaRating;
  }
}
