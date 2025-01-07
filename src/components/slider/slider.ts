import { html } from 'lit';
import { customElement, eventOptions, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { WaBlurEvent } from '../../events/blur.js';
import { WaChangeEvent } from '../../events/change.js';
import { WaFocusEvent } from '../../events/focus.js';
import { WaInputEvent } from '../../events/input.js';
import { HasSlotController } from '../../internal/slot.js';
import { MirrorValidator } from '../../internal/validators/mirror-validator.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-formassociated-element.js';
import sliderStyles from '../../styles/native/slider.css';
import formControlStyles from '../../styles/shadow/form-control.css';
import { LocalizeController } from '../../utilities/localize.js';
import styles from './slider.css';

/**
 * @summary Ranges allow the user to select a single value within a given range using a slider.
 * @documentation https://backers.webawesome.com/docs/components/range
 * @status stable
 * @since 2.0
 *
 * @slot label - The slider label. Alternatively, you can use the `label` attribute.
 * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-change - Emitted when an alteration to the control's value is committed by the user.
 * @event wa-focus - Emitted when the control gains focus.
 * @event wa-input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The input's label.
 * @csspart form-control-input - The input's wrapper.
 * @csspart hint - The hint's wrapper.
 * @csspart base - The internal `<input>` element.
 * @csspart tooltip - The slider tooltip.
 *
 * @cssproperty --thumb-color - The color of the thumb.
 * @cssproperty --thumb-gap - The visual gap between the edges of the thumb and the track.
 * @cssproperty --thumb-shadow - The shadow effects around the edges of the thumb.
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the thumb.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive - The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 * @cssproperty --track-active-offset - The point of origin of the active track.
 */
@customElement('wa-slider')
export default class WaSlider extends WebAwesomeFormAssociatedElement {
  static shadowStyle = [formControlStyles, sliderStyles, styles];

  static get validators() {
    return [...super.validators, MirrorValidator()];
  }

  private readonly hasSlotController = new HasSlotController(this, 'hint', 'label');
  private readonly localize = new LocalizeController(this);
  private resizeObserver: ResizeObserver;

  @query('.control') input: HTMLInputElement;
  @query('.tooltip') output: HTMLOutputElement | null;

  @state() private hasTooltip = false;
  @property() title = ''; // make reactive to pass through

  /** The name of the slider, submitted as a name/value pair with form data. */
  @property() name: string = '';

  /** The default value of the form control. Primarily used for resetting the form control. */
  @property({ type: Number, attribute: 'value', reflect: true }) defaultValue: number =
    Number(this.getAttribute('value')) || 0;

  private _value: number | null = null;

  /** The current value of the slider, submitted as a name/value pair with form data. */
  get value(): number {
    if (this.valueHasChanged) {
      return this._value || 0;
    }

    return this._value ?? (this.defaultValue || 0);
  }

  @state()
  set value(val: number | null) {
    if (this._value === val) {
      return;
    }

    this.valueHasChanged = true;
    this._value = val;
  }

  /** The slider label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /** The slider hint. If you need to display HTML, use the hint slot instead. */
  @property({ attribute: 'hint' }) hint = '';

  /** Disables the slider. */
  @property({ type: Boolean }) disabled = false;

  /** The minimum acceptable value of the slider. */
  @property({ type: Number }) min = 0;

  /** The maximum acceptable value of the slider. */
  @property({ type: Number }) max = 100;

  /** The interval at which the slider will increase and decrease. */
  @property({ type: Number }) step = 1;

  /** The preferred placement of the slider tooltip. */
  @property() tooltip: 'top' | 'bottom' | 'none' = 'top';

  /**
   * A function used to format the tooltip's value. The slider value is passed as the first and only argument. The
   * function should return a string to display in the tooltip.
   */
  @property({ attribute: false }) tooltipFormatter: (value: number) => string = (value: number) => value.toString();

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form: string | null = null;

  /**
   * Used for SSR to render slotted labels. If true, will render slotted label content on first paint.
   */
  @property({ attribute: 'with-label', reflect: true, type: Boolean }) withLabel = false;

  /**
   * Used for SSR to render slotted labels. If true, will render slotted hint content on first paint.
   */
  @property({ attribute: 'with-hint', reflect: true, type: Boolean }) withHint = false;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.syncRange());

    if (this.value < this.min) {
      this.value = this.min;
    }
    if (this.value > this.max) {
      this.value = this.max;
    }

    this.updateComplete.then(() => {
      this.syncRange();
      this.resizeObserver.observe(this.input);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.unobserve(this.input);
  }

  private handleChange() {
    this.dispatchEvent(new WaChangeEvent());
  }

  private handleInput() {
    this.value = parseFloat(this.input.value);
    this.dispatchEvent(new WaInputEvent());
    this.syncRange();
  }

  private handleBlur() {
    this.hasTooltip = false;
    this.dispatchEvent(new WaBlurEvent());
  }

  private handleFocus() {
    this.hasTooltip = true;
    this.dispatchEvent(new WaFocusEvent());
  }

  @eventOptions({ passive: true })
  private handleThumbDragStart() {
    this.hasTooltip = true;
  }

  private handleThumbDragEnd() {
    this.hasTooltip = false;
  }

  private syncProgress(percent: number) {
    this.input.style.setProperty('--percent', `${percent * 100}%`);
  }

  private syncTooltip(percent: number) {
    if (this.output !== null) {
      const inputWidth = this.input.offsetWidth;
      const tooltipWidth = this.output.offsetWidth;
      const thumbSize = getComputedStyle(this.input).getPropertyValue('--thumb-size');
      const isRtl = this.localize.dir() === 'rtl';
      const percentAsWidth = inputWidth * percent;

      // The calculations are used to "guess" where the thumb is located. Since we're using the native range control
      // under the hood, we don't have access to the thumb's true coordinates. These measurements can be a pixel or two
      // off depending on the size of the control, thumb, and tooltip dimensions.
      if (isRtl) {
        const x = `${inputWidth - percentAsWidth}px + ${percent} * ${thumbSize}`;
        this.output.style.translate = `calc((${x} - ${tooltipWidth / 2}px - ${thumbSize} / 2))`;
      } else {
        const x = `${percentAsWidth}px - ${percent} * ${thumbSize}`;
        this.output.style.translate = `calc(${x} - ${tooltipWidth / 2}px + ${thumbSize} / 2)`;
      }
    }
  }

  @watch('value', { waitUntilFirstUpdate: true })
  handleValueChange() {
    // The value may have constraints, so we set the native control's value and sync it back to ensure it adhere's to
    // min, max, and step properly
    this.input.value = this.value.toString();
    this.value = parseFloat(this.input.value);
    this.updateValidity();

    this.syncRange();
  }

  @watch('hasTooltip', { waitUntilFirstUpdate: true })
  syncRange() {
    const percent = Math.max(0, (this.value - this.min) / (this.max - this.min));

    this.syncProgress(percent);

    if (this.tooltip !== 'none') {
      // Ensure updates are drawn before we sync the tooltip
      this.updateComplete.then(() => this.syncTooltip(percent));
    }
  }

  /** Sets focus on the slider. */
  focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the slider. */
  blur() {
    this.input.blur();
  }

  /** Increments the value of the slider by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== Number(this.input.value)) {
      this.value = Number(this.input.value);
    }
  }

  /** Decrements the value of the slider by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== Number(this.input.value)) {
      this.value = Number(this.input.value);
    }
  }

  formResetCallback() {
    this.value = this.defaultValue;

    super.formResetCallback();
  }

  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test('label') : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test('hint') : this.withHint;
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;

    // NOTE - always bind value after min/max, otherwise it will be clamped
    return html`
      ${hasLabel
        ? html`<label part="form-control-label" class="label" for="input">
            <slot name="label">${this.label}</slot>
          </label>`
        : ''}

      <div part="form-control-input">
        <input
          part="base"
          id="input"
          class="control"
          title=${this.title /* An empty title prevents browser validation tooltips from appearing on hover */}
          type="range"
          name=${ifDefined(this.name)}
          ?disabled=${this.disabled}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step)}
          .value=${live(this.value.toString())}
          aria-describedby="hint"
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          @mousedown=${this.handleThumbDragStart}
          @mouseup=${this.handleThumbDragEnd}
          @touchstart=${this.handleThumbDragStart}
          @touchend=${this.handleThumbDragEnd}
        />
        ${this.tooltip !== 'none' && !this.disabled
          ? html`
              <output part="tooltip" class="${classMap({ tooltip: true, visible: this.hasTooltip })}">
                ${typeof this.tooltipFormatter === 'function' ? this.tooltipFormatter(this.value) : this.value}
              </output>
            `
          : ''}
      </div>

      <slot
        name="hint"
        part="hint"
        class=${classMap({
          'has-slotted': hasHint,
        })}
        aria-hidden=${hasHint ? 'false' : 'true'}
        >${this.hint}</slot
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-slider': WaSlider;
  }
}
