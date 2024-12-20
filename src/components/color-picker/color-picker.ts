import { TinyColor } from '@ctrl/tinycolor';
import type { PropertyValues } from 'lit';
import { html, isServer } from 'lit';
import { customElement, eventOptions, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { WaBlurEvent } from '../../events/blur.js';
import { WaChangeEvent } from '../../events/change.js';
import { WaFocusEvent } from '../../events/focus.js';
import { WaInputEvent } from '../../events/input.js';
import { WaInvalidEvent } from '../../events/invalid.js';
import { drag } from '../../internal/drag.js';
import { clamp } from '../../internal/math.js';
import { HasSlotController } from '../../internal/slot.js';
import { RequiredValidator } from '../../internal/validators/required-validator.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import formControlStyles from '../../styles/shadow/form-control.css';
import sizeStyles from '../../styles/utilities/size.css';
import visuallyHidden from '../../styles/utilities/visually-hidden.css';
import { LocalizeController } from '../../utilities/localize.js';
import '../button-group/button-group.js';
import '../button/button.js';
import '../dropdown/dropdown.js';
import type WaDropdown from '../dropdown/dropdown.js';
import '../icon/icon.js';
import '../input/input.js';
import type WaInput from '../input/input.js';
import styles from './color-picker.css';

interface EyeDropperConstructor {
  new (): EyeDropperInterface;
}

interface EyeDropperInterface {
  open: () => Promise<{ sRGBHex: string }>;
}

declare const EyeDropper: EyeDropperConstructor;

/**
 * @summary Color pickers allow the user to select a color.
 * @documentation https://backers.webawesome.com/docs/components/color-picker
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button
 * @dependency wa-button-group
 * @dependency wa-dropdown
 * @dependency wa-input
 * @dependency wa-visually-hidden
 *
 * @slot label - The color picker's form label. Alternatively, you can use the `label` attribute.
 * @slot hint - The color picker's form hint. Alternatively, you can use the `hint` attribute.
 *
 * @event wa-blur - Emitted when the color picker loses focus.
 * @event wa-change - Emitted when the color picker's value changes.
 * @event wa-focus - Emitted when the color picker receives focus.
 * @event wa-input - Emitted when the color picker receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart trigger - The color picker's dropdown trigger.
 * @csspart swatches - The container that holds the swatches.
 * @csspart swatch - Each individual swatch.
 * @csspart grid - The color grid.
 * @csspart grid-handle - The color grid's handle.
 * @csspart slider - Hue and opacity sliders.
 * @csspart slider-handle - Hue and opacity slider handles.
 * @csspart hue-slider - The hue slider.
 * @csspart hue-slider-handle - The hue slider's handle.
 * @csspart opacity-slider - The opacity slider.
 * @csspart opacity-slider-handle - The opacity slider's handle.
 * @csspart preview - The preview color.
 * @csspart input - The text input.
 * @csspart eye-dropper-button - The eye dropper button.
 * @csspart eye-dropper-button__base - The eye dropper button's exported `button` part.
 * @csspart eye-dropper-button__prefix - The eye dropper button's exported `prefix` part.
 * @csspart eye-dropper-button__label - The eye dropper button's exported `label` part.
 * @csspart eye-dropper-button__suffix - The eye dropper button's exported `suffix` part.
 * @csspart eye-dropper-button__caret - The eye dropper button's exported `caret` part.
 * @csspart format-button - The format button.
 * @csspart format-button__base - The format button's exported `button` part.
 * @csspart format-button__prefix - The format button's exported `prefix` part.
 * @csspart format-button__label - The format button's exported `label` part.
 * @csspart format-button__suffix - The format button's exported `suffix` part.
 * @csspart format-button__caret - The format button's exported `caret` part.
 *
 * @cssproperty --background-color - The color picker's background color.
 * @cssproperty --border-color - The color of the color picker's borders.
 * @cssproperty --border-radius - The radius of the color picker's corners.
 * @cssproperty --border-style - The style of the color picker's borders.
 * @cssproperty --border-width - The width of the color picker's borders.
 * @cssproperty --grid-width - The width of the color grid.
 * @cssproperty --grid-height - The height of the color grid.
 * @cssproperty --grid-handle-size - The size of the color grid's handle.
 * @cssproperty --preview-size - The size of the preview color.
 * @cssproperty --preview-border-radius - The corners of the preview color.
 * @cssproperty --slider-height - The height of the hue and alpha sliders.
 * @cssproperty --slider-handle-size - The diameter of the slider's handle.
 * @cssproperty --spacing - The amount of space around and between the color picker's controls.
 * @cssproperty --swatch-border-radius - The corners of each predefined color swatch.
 * @cssproperty --swatch-size - The size of each predefined color swatch.
 * @cssproperty --trigger-border-radius - The corners of the color picker's dropdown trigger.
 */
@customElement('wa-color-picker')
export default class WaColorPicker extends WebAwesomeFormAssociatedElement {
  static shadowStyle = [visuallyHidden, sizeStyles, formControlStyles, styles];

  static shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };

  static get validators() {
    const validators = isServer ? [] : [RequiredValidator()];
    return [...super.validators, ...validators];
  }

  private readonly hasSlotController = new HasSlotController(this, 'hint', 'label');

  private isSafeValue = false;
  private readonly localize = new LocalizeController(this);

  @query('[part~="base"]') base: HTMLElement;
  @query('[part~="input"]') input: WaInput;
  @query('[part~="form-control-label"]') triggerLabel: HTMLElement;
  @query('[part~="form-control-input"]') triggerButton: HTMLButtonElement;

  // @TODO: This is a hacky way to show the "Please fill out this field", do we want the old behavior where it opens the dropdown?
  //   or is the new behavior okay?
  get validationTarget() {
    // This puts the popup on the element only if the color picker is expanded.
    if (this.dropdown?.open) {
      return this.input;
    }

    // This puts popup on the color picker itself without needing to expand it to show the input.
    // This is necessary because form submissions expect the "anchor" to be currently shown.
    return this.trigger;
  }

  @query('.color-dropdown') dropdown: WaDropdown;
  @query('[part~="preview"]') previewButton: HTMLButtonElement;
  @query('[part~="trigger"]') trigger: HTMLButtonElement;

  @state() private hasFocus = false;
  @state() private isDraggingGridHandle = false;
  @state() private isEmpty = true;
  @state() private inputValue = '';
  @state() private hue = 0;
  @state() private saturation = 100;
  @state() private brightness = 100;
  @state() private alpha = 100;

  private _value: string | null = null;

  /** The current value of the input, submitted as a name/value pair with form data. */
  get value() {
    if (this.valueHasChanged) {
      return this._value;
    }

    return this._value ?? this.defaultValue;
  }

  /**
   * The current value of the color picker. The value's format will vary based the `format` attribute. To get the value
   * in a specific format, use the `getFormattedValue()` method. The value is submitted as a name/value pair with form
   * data.
   */

  @state() set value(val: string | null) {
    if (this._value === val) {
      return;
    }

    this.valueHasChanged = true;
    this._value = val;
  }

  /** The default value of the form control. Primarily used for resetting the form control. */
  @property({ attribute: 'value', reflect: true }) defaultValue: string | null = this.getAttribute('value') || null;

  @property({ attribute: 'with-label', reflect: true, type: Boolean }) withLabel = false;
  @property({ attribute: 'with-hint', reflect: true, type: Boolean }) withHint = false;

  @state() private hasEyeDropper: boolean = false;

  /**
   * The color picker's label. This will not be displayed, but it will be announced by assistive devices. If you need to
   * display HTML, you can use the `label` slot` instead.
   */
  @property() label = '';

  /**
   * The color picker's hint. If you need to display HTML, use the `hint` slot instead.
   */
  @property({ attribute: 'hint' }) hint = '';

  /**
   * The format to use. If opacity is enabled, these will translate to HEXA, RGBA, HSLA, and HSVA respectively. The color
   * picker will accept user input in any format (including CSS color names) and convert it to the desired format.
   */
  @property() format: 'hex' | 'rgb' | 'hsl' | 'hsv' = 'hex';

  /** Determines the size of the color picker's trigger */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Removes the button that lets users toggle between format.   */
  @property({ attribute: 'no-format-toggle', type: Boolean }) noFormatToggle = false;

  /** The name of the form control, submitted as a name/value pair with form data. */
  @property({ reflect: true }) name: string | null = null;

  /** Disables the color picker. */
  @property({ type: Boolean }) disabled = false;

  /**
   * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
   * `overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
   */
  @property({ type: Boolean }) hoist = false;

  /** Shows the opacity slider. Enabling this will cause the formatted value to be HEXA, RGBA, or HSLA. */
  @property({ type: Boolean }) opacity = false;

  /** By default, values are lowercase. With this attribute, values will be uppercase instead. */
  @property({ type: Boolean }) uppercase = false;

  /**
   * One or more predefined color swatches to display as presets in the color picker. Can include any format the color
   * picker can parse, including HEX(A), RGB(A), HSL(A), HSV(A), and CSS color names. Each color must be separated by a
   * semicolon (`;`). Alternatively, you can pass an array of color values to this property using JavaScript.
   */
  @property() swatches: string | string[] = '';

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = null;

  /** Makes the color picker a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  constructor() {
    super();

    if (!isServer) {
      this.addEventListener('focusin', this.handleFocusIn);
      this.addEventListener('focusout', this.handleFocusOut);
    }
  }

  private handleCopy() {
    this.input.select();
    document.execCommand('copy');
    this.previewButton.focus();

    // Show copied animation
    this.previewButton.classList.add('preview-color--copied');
    this.previewButton.addEventListener('animationend', () => {
      this.previewButton.classList.remove('preview-color--copied');
    });
  }

  private handleFocusIn = () => {
    this.hasFocus = true;
    this.dispatchEvent(new WaFocusEvent());
  };

  private handleFocusOut = () => {
    this.hasFocus = false;
    this.dispatchEvent(new WaBlurEvent());
  };

  private handleFormatToggle() {
    const formats = ['hex', 'rgb', 'hsl', 'hsv'];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex] as 'hex' | 'rgb' | 'hsl' | 'hsv';
    this.setColor(this.value || '');
    this.dispatchEvent(new WaChangeEvent());
    this.dispatchEvent(new WaInputEvent());
  }

  private handleAlphaDrag(event: PointerEvent) {
    const container = this.shadowRoot!.querySelector<HTMLElement>('.slider.alpha')!;
    const handle = container.querySelector<HTMLElement>('.slider-handle')!;
    const { width } = container.getBoundingClientRect();
    let initialValue = this.value;
    let currentValue = this.value;

    handle.focus();
    event.preventDefault();

    drag(container, {
      onMove: x => {
        this.alpha = clamp((x / width) * 100, 0, 100);
        this.syncValues();

        if (this.value !== currentValue) {
          currentValue = this.value;
          this.dispatchEvent(new WaInputEvent());
        }
      },
      onStop: () => {
        if (this.value !== initialValue) {
          initialValue = this.value;
          this.dispatchEvent(new WaChangeEvent());
        }
      },
      initialEvent: event,
    });
  }

  private handleHueDrag(event: PointerEvent) {
    const container = this.shadowRoot!.querySelector<HTMLElement>('.slider.hue')!;
    const handle = container.querySelector<HTMLElement>('.slider-handle')!;
    const { width } = container.getBoundingClientRect();
    let initialValue = this.value;
    let currentValue = this.value;

    handle.focus();
    event.preventDefault();

    drag(container, {
      onMove: x => {
        this.hue = clamp((x / width) * 360, 0, 360);
        this.syncValues();

        if (this.value !== currentValue) {
          currentValue = this.value;
          this.dispatchEvent(new WaInputEvent());
        }
      },
      onStop: () => {
        if (this.value !== initialValue) {
          initialValue = this.value;
          this.dispatchEvent(new WaChangeEvent());
        }
      },
      initialEvent: event,
    });
  }

  private handleGridDrag(event: PointerEvent) {
    const grid = this.shadowRoot!.querySelector<HTMLElement>('.grid')!;
    const handle = grid.querySelector<HTMLElement>('.grid-handle')!;
    const { width, height } = grid.getBoundingClientRect();
    let initialValue = this.value;
    let currentValue = this.value;

    handle.focus();
    event.preventDefault();

    this.isDraggingGridHandle = true;

    drag(grid, {
      onMove: (x, y) => {
        this.saturation = clamp((x / width) * 100, 0, 100);
        this.brightness = clamp(100 - (y / height) * 100, 0, 100);
        this.syncValues();

        if (this.value !== currentValue) {
          currentValue = this.value;
          this.dispatchEvent(new WaInputEvent());
        }
      },
      onStop: () => {
        this.isDraggingGridHandle = false;
        if (this.value !== initialValue) {
          initialValue = this.value;
          this.dispatchEvent(new WaChangeEvent());
        }
      },
      initialEvent: event,
    });
  }

  private handleAlphaKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.alpha = clamp(this.alpha - increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.alpha = clamp(this.alpha + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.alpha = 0;
      this.syncValues();
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.alpha = 100;
      this.syncValues();
    }

    if (this.value !== oldValue) {
      this.dispatchEvent(new WaChangeEvent());
      this.dispatchEvent(new WaInputEvent());
    }
  }

  private handleHueKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hue = clamp(this.hue - increment, 0, 360);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.hue = clamp(this.hue + increment, 0, 360);
      this.syncValues();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.hue = 0;
      this.syncValues();
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.hue = 360;
      this.syncValues();
    }

    if (this.value !== oldValue) {
      this.dispatchEvent(new WaChangeEvent());
      this.dispatchEvent(new WaInputEvent());
    }
  }

  private handleGridKeyDown(event: KeyboardEvent) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.saturation = clamp(this.saturation - increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.saturation = clamp(this.saturation + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.brightness = clamp(this.brightness + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.brightness = clamp(this.brightness - increment, 0, 100);
      this.syncValues();
    }

    if (this.value !== oldValue) {
      this.dispatchEvent(new WaChangeEvent());
      this.dispatchEvent(new WaInputEvent());
    }
  }

  private handleInputChange(event: WaChangeEvent) {
    const target = event.target as HTMLInputElement;
    const oldValue = this.value;

    // Prevent the `<wa-input>` element's `wa-change` event from bubbling up
    event.stopPropagation();

    if (this.input.value) {
      this.setColor(target.value);
      target.value = this.value || '';
    } else {
      this.value = '';
    }

    if (this.value !== oldValue) {
      this.dispatchEvent(new WaChangeEvent());
      this.dispatchEvent(new WaInputEvent());
    }
  }

  private handleInputInput(event: WaInputEvent) {
    this.updateValidity();

    // Prevent the `<wa-input>` element's `wa-input` event from bubbling up
    event.stopPropagation();
  }

  private handleInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const oldValue = this.value;

      if (this.input.value) {
        this.setColor(this.input.value);
        this.input.value = this.value;

        if (this.value !== oldValue) {
          this.dispatchEvent(new WaChangeEvent());
          this.dispatchEvent(new WaInputEvent());
        }

        setTimeout(() => this.input.select());
      } else {
        this.hue = 0;
      }
    }
  }

  @eventOptions({ passive: false })
  private handleTouchMove(event: TouchEvent) {
    event.preventDefault();
  }

  private parseColor(colorString: string) {
    const color = new TinyColor(colorString);
    if (!color.isValid) {
      return null;
    }

    const hslColor = color.toHsl();
    // Adjust saturation and lightness from 0-1 to 0-100
    const hsl = {
      h: hslColor.h,
      s: hslColor.s * 100,
      l: hslColor.l * 100,
      a: hslColor.a,
    };

    const rgb = color.toRgb();

    const hex = color.toHexString();
    const hexa = color.toHex8String();

    const hsvColor = color.toHsv();
    // Adjust saturation and value from 0-1 to 0-100
    const hsv = {
      h: hsvColor.h,
      s: hsvColor.s * 100,
      v: hsvColor.v * 100,
      a: hsvColor.a,
    };

    return {
      hsl: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        string: this.setLetterCase(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`),
      },
      hsla: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        string: this.setLetterCase(
          `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${hsl.a.toFixed(2).toString()})`,
        ),
      },
      hsv: {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v,
        string: this.setLetterCase(`hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)`),
      },
      hsva: {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v,
        a: hsv.a,
        string: this.setLetterCase(
          `hsva(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%, ${hsv.a.toFixed(2).toString()})`,
        ),
      },
      rgb: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        string: this.setLetterCase(`rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`),
      },
      rgba: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: rgb.a,
        string: this.setLetterCase(
          `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${rgb.a.toFixed(2).toString()})`,
        ),
      },
      hex: this.setLetterCase(hex),
      hexa: this.setLetterCase(hexa),
    };
  }

  private setColor(colorString: string) {
    const newColor = this.parseColor(colorString);

    if (newColor === null) {
      return false;
    }

    this.hue = newColor.hsva.h;
    this.saturation = newColor.hsva.s;
    this.brightness = newColor.hsva.v;
    this.alpha = this.opacity ? newColor.hsva.a * 100 : 100;

    this.syncValues();

    return true;
  }

  private setLetterCase(string: string) {
    if (typeof string !== 'string') {
      return '';
    }
    return this.uppercase ? string.toUpperCase() : string.toLowerCase();
  }

  private async syncValues() {
    const currentColor = this.parseColor(
      `hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha / 100})`,
    );

    if (currentColor === null) {
      return;
    }

    // Update the value
    if (this.format === 'hsl') {
      this.inputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
    } else if (this.format === 'rgb') {
      this.inputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
    } else if (this.format === 'hsv') {
      this.inputValue = this.opacity ? currentColor.hsva.string : currentColor.hsv.string;
    } else {
      this.inputValue = this.opacity ? currentColor.hexa : currentColor.hex;
    }

    // Setting this.value will trigger the watcher which parses the new value. We want to bypass that behavior because
    // we've already parsed the color here and conversion/rounding can lead to values changing slightly. When this
    // happens, dragging the grid handle becomes jumpy. After the next update, the usual behavior is restored.
    this.isSafeValue = true;
    this.value = this.inputValue;

    await this.updateComplete;
    this.isSafeValue = false;
  }

  private handleAfterHide() {
    this.previewButton.classList.remove('preview-color--copied');
    // Update validity so we get a new anchor.
    this.updateValidity();
  }

  private handleAfterShow() {
    // Update validity so we get a new anchor.
    this.updateValidity();
  }

  private handleEyeDropper() {
    if (!this.hasEyeDropper) {
      return;
    }

    const eyeDropper = new EyeDropper();

    eyeDropper
      .open()
      .then(colorSelectionResult => {
        const oldValue = this.value;

        this.setColor(colorSelectionResult.sRGBHex);

        if (this.value !== oldValue) {
          this.dispatchEvent(new WaChangeEvent());
          this.dispatchEvent(new WaInputEvent());
        }
      })
      .catch(() => {
        // The user canceled, do nothing
      });
  }

  private selectSwatch(color: string) {
    const oldValue = this.value;

    if (!this.disabled) {
      this.setColor(color);

      if (this.value !== oldValue) {
        this.dispatchEvent(new WaChangeEvent());
        this.dispatchEvent(new WaInputEvent());
      }
    }
  }

  /** Generates a hex string from HSV values. Hue must be 0-360. All other arguments must be 0-100. */
  getHexString(hue: number, saturation: number, brightness: number, alpha = 100) {
    const color = new TinyColor(`hsva(${hue}, ${saturation}%, ${brightness}%, ${alpha / 100})`);
    if (!color.isValid) {
      return '';
    }

    return color.toHex8String();
  }

  // Prevents nested components from leaking events
  private stopNestedEventPropagation(event: CustomEvent) {
    event.stopImmediatePropagation();
  }

  @watch('format', { waitUntilFirstUpdate: true })
  handleFormatChange() {
    this.syncValues();
  }

  @watch('opacity')
  handleOpacityChange() {
    this.alpha = 100;
  }

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    // Its kind of bizarre, but this is required to get SSR to play nicely.
    if (changedProperties.has('value')) {
      this.handleValueChange(changedProperties.get('value') || '', this.value || '');
    }
  }

  @watch('value')
  handleValueChange(oldValue: string | undefined, newValue: string) {
    this.isEmpty = !newValue;

    if (!newValue) {
      this.hue = 0;
      this.saturation = 0;
      this.brightness = 100;
      this.alpha = 100;
    }

    if (!this.isSafeValue) {
      const newColor = this.parseColor(newValue);

      if (newColor !== null) {
        this.inputValue = this.value || '';
        this.hue = newColor.hsva.h;
        this.saturation = newColor.hsva.s;
        this.brightness = newColor.hsva.v;
        this.alpha = newColor.hsva.a * 100;
        this.syncValues();
      } else {
        this.inputValue = oldValue ?? '';
      }
    }

    this.requestUpdate();
  }

  /** Sets focus on the color picker. */
  focus(options?: FocusOptions) {
    this.trigger.focus(options);
  }

  /** Removes focus from the color picker. */
  blur() {
    const elementToBlur = this.trigger;

    if (this.hasFocus) {
      // We don't know which element in the color picker has focus, so we'll move it to the trigger or base (inline) and
      // blur that instead. This results in document.activeElement becoming the `<body>`. This doesn't cause another
      // focus event because we're using focusin and something inside the color picker already has focus.
      elementToBlur.focus({ preventScroll: true });
      elementToBlur.blur();
    }

    if (this.dropdown?.open) {
      this.dropdown.hide();
    }
  }

  /** Returns the current value as a string in the specified format. */
  getFormattedValue(format: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva' = 'hex') {
    const currentColor = this.parseColor(
      `hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha / 100})`,
    );

    if (currentColor === null) {
      return '';
    }

    switch (format) {
      case 'hex':
        return currentColor.hex;
      case 'hexa':
        return currentColor.hexa;
      case 'rgb':
        return currentColor.rgb.string;
      case 'rgba':
        return currentColor.rgba.string;
      case 'hsl':
        return currentColor.hsl.string;
      case 'hsla':
        return currentColor.hsla.string;
      case 'hsv':
        return currentColor.hsv.string;
      case 'hsva':
        return currentColor.hsva.string;
      default:
        return '';
    }
  }

  private reportValidityAfterShow = () => {
    // Remove the event so we dont emit "wa-invalid" twice
    this.removeEventListener('invalid', this.emitInvalid);

    this.reportValidity();

    this.addEventListener('invalid', this.emitInvalid);
  };

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    // This won't get called when a form is submitted. This is only for manual calls.
    if (!this.validity.valid && !this.dropdown.open) {
      // Show the dropdown so the browser can focus on it
      this.addEventListener('wa-after-show', this.reportValidityAfterShow, { once: true });
      this.dropdown.show();

      if (!this.disabled) {
        // By standards we have to emit a `wa-invalid` event here synchronously.
        this.dispatchEvent(new WaInvalidEvent());
      }

      return false;
    }

    return super.reportValidity();
  }

  formResetCallback() {
    this.value = this.defaultValue;

    super.formResetCallback();
  }

  firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);

    this.hasEyeDropper = 'EyeDropper' in window;
  }

  render() {
    const hasLabelSlot = !this.hasUpdated ? this.withLabel : this.withLabel || this.hasSlotController.test('label');
    const hasHintSlot = !this.hasUpdated ? this.withHint : this.withHint || this.hasSlotController.test('hint');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;

    const gridHandleX = this.saturation;
    const gridHandleY = 100 - this.brightness;
    const swatches = Array.isArray(this.swatches)
      ? this.swatches // allow arrays for legacy purposes
      : this.swatches.split(';').filter(color => color.trim() !== '');

    const colorPicker = html`
      <div
        part="base"
        class=${classMap({
          'color-picker': true,
        })}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        tabindex="-1"
      >
        <div
          part="grid"
          class="grid"
          style=${styleMap({ backgroundColor: this.getHexString(this.hue, 100, 100) })}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${classMap({
              'grid-handle': true,
              'grid-handle--dragging': this.isDraggingGridHandle,
            })}
            style=${styleMap({
              top: `${gridHandleY}%`,
              left: `${gridHandleX}%`,
              backgroundColor: this.getHexString(this.hue, this.saturation, this.brightness, this.alpha),
            })}
            role="application"
            aria-label="HSV"
            tabindex=${ifDefined(this.disabled ? undefined : '0')}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="controls">
          <div class="sliders">
            <div
              part="slider hue-slider"
              class="hue slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="slider-handle"
                style=${styleMap({
                  left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`,
                  backgroundColor: this.getHexString(this.hue, 100, 100),
                })}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${ifDefined(this.disabled ? undefined : '0')}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity
              ? html`
                  <div
                    part="slider opacity-slider"
                    class="alpha slider transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="alpha-gradient"
                      style=${styleMap({
                        backgroundImage: `linear-gradient(
                          to right,
                          ${this.getHexString(this.hue, this.saturation, this.brightness, 0)} 0%,
                          ${this.getHexString(this.hue, this.saturation, this.brightness, 100)} 100%
                        )`,
                      })}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="slider-handle"
                      style=${styleMap({
                        left: `${this.alpha}%`,
                        backgroundColor: this.getHexString(this.hue, this.saturation, this.brightness, this.alpha),
                      })}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${ifDefined(this.disabled ? undefined : '0')}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `
              : ''}
          </div>

          <button
            type="button"
            part="preview"
            class="preview transparent-bg"
            aria-label=${this.localize.term('copy')}
            style=${styleMap({
              '--preview-color': this.getHexString(this.hue, this.saturation, this.brightness, this.alpha),
            })}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="user-input" aria-live="polite">
          <wa-input
            part="input"
            type="text"
            name=${this.name}
            size="small"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty ? '' : this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term('currentValue')}
            @keydown=${this.handleInputKeyDown}
            @wa-change=${this.handleInputChange}
            @wa-input=${this.handleInputInput}
            @wa-blur=${this.stopNestedEventPropagation}
            @wa-focus=${this.stopNestedEventPropagation}
          ></wa-input>

          <wa-button-group>
            ${!this.noFormatToggle
              ? html`
                  <wa-button
                    part="format-button"
                    size="small"
                    aria-label=${this.localize.term('toggleColorFormat')}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @wa-blur=${this.stopNestedEventPropagation}
                    @wa-focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </wa-button>
                `
              : ''}
            ${this.hasEyeDropper
              ? html`
                  <wa-button
                    part="eye-dropper-button"
                    size="small"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @wa-blur=${this.stopNestedEventPropagation}
                    @wa-focus=${this.stopNestedEventPropagation}
                  >
                    <wa-icon
                      library="system"
                      name="eye-dropper"
                      variant="solid"
                      label=${this.localize.term('selectAColorFromTheScreen')}
                    ></wa-icon>
                  </wa-button>
                `
              : ''}
          </wa-button-group>
        </div>

        ${swatches.length > 0
          ? html`
              <div part="swatches" class="swatches">
                ${swatches.map(swatch => {
                  const parsedColor = this.parseColor(swatch);

                  // If we can't parse it, skip it
                  if (!parsedColor) {
                    return '';
                  }

                  return html`
                    <div
                      part="swatch"
                      class="swatch transparent-bg"
                      tabindex=${ifDefined(this.disabled ? undefined : '0')}
                      role="button"
                      aria-label=${swatch}
                      @click=${() => this.selectSwatch(swatch)}
                      @keydown=${(event: KeyboardEvent) =>
                        !this.disabled && event.key === 'Enter' && this.setColor(parsedColor.hexa)}
                    >
                      <div class="swatch-color" style=${styleMap({ backgroundColor: parsedColor.hexa })}></div>
                    </div>
                  `;
                })}
              </div>
            `
          : ''}
      </div>
    `;

    // Render as a dropdown
    return html`
      <wa-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        .containingElement=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @wa-after-show=${this.handleAfterShow}
        @wa-after-hide=${this.handleAfterHide}
      >
        <div
          class=${classMap({
            container: true,
            'form-control': true,
            'form-control--has-label': hasLabel,
          })}
          part="trigger-container form-control"
          slot="trigger"
          @click=${(e: Event) => {
            const composedPath = e.composedPath();
            const triggerButton = this.triggerButton;
            const triggerLabel = this.triggerLabel;
            const buttonOrLabelClicked = composedPath.find(el => el === triggerButton || el === triggerLabel);

            if (buttonOrLabelClicked) {
              return;
            }

            // Stop clicks from bubbling on anything except the button and the label. This is a hacky work around i may come to regret, but this "fixes" the issue of `<wa-dropdown>` expecting all children in the "trigger slot" to open the trigger. [Konnor]
            e.stopImmediatePropagation();
            e.stopPropagation();

            if (this.dropdown.open) {
              this.dropdown.hide();
            }
          }}
        >
          <div part="form-control-label" class="label" id="form-control-label">
            <slot name="label">${this.label}</slot>
          </div>

          <button
            id="trigger"
            part="trigger form-control-input"
            class=${classMap({
              trigger: true,
              'trigger--empty': this.isEmpty,
              'transparent-bg': true,
              'form-control-input': true,
            })}
            style=${styleMap({
              color: this.getHexString(this.hue, this.saturation, this.brightness, this.alpha),
            })}
            type="button"
            aria-labelledby="form-control-label"
            aria-describedby="hint"
            .disabled=${this.disabled}
          ></button>

          <slot
            name="hint"
            part="hint"
            class=${classMap({
              'has-slotted': hasHint,
            })}
            >${this.hint}</slot
          >
        </div>
        ${colorPicker}
      </wa-dropdown>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-color-picker': WaColorPicker;
  }
}
