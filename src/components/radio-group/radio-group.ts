import { html, isServer } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { WaChangeEvent } from '../../events/change.js';
import { WaInputEvent } from '../../events/input.js';
import { uniqueId } from '../../internal/math.js';
import { HasSlotController } from '../../internal/slot.js';
import { RequiredValidator } from '../../internal/validators/required-validator.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-formassociated-element.js';
import formControlStyles from '../../styles/shadow/form-control.css';
import buttonGroupStyles from '../../styles/utilities/button-group.css';
import sizeStyles from '../../styles/utilities/size.css';
import type WaRadioButton from '../radio-button/radio-button.js';
import '../radio/radio.js';
import type WaRadio from '../radio/radio.js';
import styles from './radio-group.css';

/**
 * @summary Radio groups are used to group multiple [radios](/docs/components/radio) or [radio buttons](/docs/components/radio-button) so they function as a single form control.
 * @documentation https://backers.webawesome.com/docs/components/radio-group
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button-group
 *
 * @slot - The default slot where `<wa-radio>` or `<wa-radio-button>` elements are placed.
 * @slot label - The radio group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot hint - Text that describes how to use the radio group. Alternatively, you can use the `hint` attribute.
 *
 * @event wa-change - Emitted when the radio group's selected value changes.
 * @event wa-input - Emitted when the radio group receives user input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart hint - The hint's wrapper.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
@customElement('wa-radio-group')
export default class WaRadioGroup extends WebAwesomeFormAssociatedElement {
  static shadowStyle = [sizeStyles, buttonGroupStyles, formControlStyles, styles];

  static get validators() {
    const validators = isServer
      ? []
      : [
          RequiredValidator({
            validationElement: Object.assign(document.createElement('input'), {
              required: true,
              type: 'radio',
              // we need an id that's guaranteed to be unique; users will never see this
              name: uniqueId('__wa-radio'),
            }),
          }),
        ];
    return [...super.validators, ...validators];
  }

  private readonly hasSlotController = new HasSlotController(this, 'hint', 'label');

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  @state() private hasButtonGroup = false;

  /**
   * The radio group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot
   * instead.
   */
  @property() label = '';

  /** The radio groups's hint. If you need to display HTML, use the `hint` slot instead. */
  @property({ attribute: 'hint' }) hint = '';

  /** The name of the radio group, submitted as a name/value pair with form data. */
  @property({ reflect: true }) name: string | null = null;

  private _value: string | null = null;

  get value() {
    if (this.valueHasChanged) {
      return this._value;
    }

    return this._value ?? this.defaultValue;
  }

  /** The current value of the radio group, submitted as a name/value pair with form data. */
  @state()
  set value(val: string | null) {
    if (this._value === val) {
      return;
    }

    this.valueHasChanged = true;
    this._value = val;
  }

  /** The default value of the form control. Primarily used for resetting the form control. */
  @property({ attribute: 'value', reflect: true }) defaultValue: string | null = this.getAttribute('value') || null;

  /** The radio group's size. This size will be applied to all child radios and radio buttons. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Ensures a child radio is checked before allowing the containing form to submit. */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Used for SSR. if true, will show slotted label on initial render.
   */
  @property({ type: Boolean, attribute: 'with-label' }) withLabel = false;

  /**
   * Used for SSR. if true, will show slotted hint on initial render.
   */
  @property({ type: Boolean, attribute: 'with-hint' }) withHint = false;

  //
  // We need this because if we don't have it, FormValidation yells at us that it's "not focusable".
  //   If we use `this.tabIndex = -1` we can't focus the radio inside.
  //
  static shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };

  constructor() {
    super();

    if (!isServer) {
      this.addEventListener('keydown', this.handleKeyDown);
      this.addEventListener('click', this.handleRadioClick);
    }
  }

  private handleRadioClick = (e: Event) => {
    const clickedRadio = (e.target as HTMLElement).closest<WaRadio | WaRadioButton>('wa-radio, wa-radio-button');

    if (!clickedRadio || clickedRadio.disabled) {
      return;
    }

    const oldValue = this.value;
    this.value = clickedRadio.value;
    clickedRadio.checked = true;

    const radios = this.getAllRadios();
    const hasButtonGroup = radios.some(radio => radio.tagName.toLowerCase() === 'wa-radio-button');
    for (const radio of radios) {
      if (clickedRadio === radio) {
        continue;
      }

      radio.checked = false;

      if (!hasButtonGroup) {
        radio.setAttribute('tabindex', '-1');
      }
    }

    if (this.value !== oldValue) {
      this.dispatchEvent(new WaChangeEvent());
      this.dispatchEvent(new WaInputEvent());
    }
  };

  private getAllRadios() {
    return [...this.querySelectorAll<WaRadio | WaRadioButton>('wa-radio, wa-radio-button')];
  }

  private handleLabelClick() {
    this.focus();
  }

  private async syncRadioElements() {
    const radios = this.getAllRadios();

    await Promise.all(
      // Sync the checked state and size
      radios.map(async radio => {
        await radio.updateComplete;
        radio.size = this.size;

        if (!radio.disabled && radio.value === this.value) {
          radio.checked = true;
        } else {
          radio.checked = false;
        }
      }),
    );

    this.hasButtonGroup = radios.some(radio => radio.tagName.toLowerCase() === 'wa-radio-button');

    if (radios.length > 0 && !radios.some(radio => radio.checked)) {
      if (this.hasButtonGroup) {
        const buttonRadio = radios[0].shadowRoot?.querySelector('button');

        if (buttonRadio) {
          buttonRadio.setAttribute('tabindex', '0');
        }
      } else {
        radios[0].setAttribute('tabindex', '0');
      }
    }

    if (this.hasButtonGroup) {
      const buttonGroup = this.shadowRoot?.querySelector('wa-button-group');

      if (buttonGroup) {
        buttonGroup.disableRole = true;
      }
    }
  }

  /**
   * We use the first available radio as the validationTarget similar to native HTML that shows the validation popup on
   * the first radio element.
   */
  get validationTarget() {
    return isServer
      ? undefined
      : this.querySelector<WaRadio | WaRadioButton>(':is(wa-radio, wa-radio-button):not([disabled])') || undefined;
  }

  @watch('value')
  handleValueChange() {
    this.syncRadioElements();
  }

  @watch('size', { waitUntilFirstUpdate: true })
  handleSizeChange() {
    this.syncRadioElements();
  }

  formResetCallback(...args: Parameters<WebAwesomeFormAssociatedElement['formResetCallback']>) {
    this.value = this.defaultValue;

    super.formResetCallback(...args);

    this.syncRadioElements();
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
      return;
    }

    const radios = this.getAllRadios().filter(radio => !radio.disabled);

    if (radios.length <= 0) {
      return;
    }

    event.preventDefault();

    const oldValue = this.value;

    const checkedRadio = radios.find(radio => radio.checked) ?? radios[0];
    const incr = event.key === ' ' ? 0 : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 1;
    let index = radios.indexOf(checkedRadio) + incr;

    if (!index) index = 0;

    if (index < 0) {
      index = radios.length - 1;
    }

    if (index > radios.length - 1) {
      index = 0;
    }

    const hasButtonGroup = radios.some(radio => radio.tagName.toLowerCase() === 'wa-radio-button');

    this.getAllRadios().forEach(radio => {
      radio.checked = false;

      if (!hasButtonGroup) {
        radio.setAttribute('tabindex', '-1');
      }
    });

    this.value = radios[index].value;
    radios[index].checked = true;

    if (!hasButtonGroup) {
      radios[index].setAttribute('tabindex', '0');
      radios[index].focus();
    } else {
      radios[index].shadowRoot!.querySelector('button')!.focus();
    }

    if (this.value !== oldValue) {
      this.dispatchEvent(new WaChangeEvent());
      this.dispatchEvent(new WaInputEvent());
    }

    event.preventDefault();
  }

  /** Sets focus on the radio group. */
  public focus(options?: FocusOptions) {
    const radios = this.getAllRadios();
    const checked = radios.find(radio => radio.checked);
    const firstEnabledRadio = radios.find(radio => !radio.disabled);
    const radioToFocus = checked || firstEnabledRadio;

    // Call focus for the checked radio. If no radio is checked, focus the first one that isn't disabled.
    if (radioToFocus) {
      radioToFocus.focus(options);
    }
  }

  render() {
    const hasLabelSlot = this.hasUpdated ? this.hasSlotController.test('label') : this.withLabel;
    const hasHintSlot = this.hasUpdated ? this.hasSlotController.test('hint') : this.withHint;
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;

    return html`
      <fieldset
        part="form-control"
        class=${classMap({
          'form-control': true,
          'form-control--small': this.size === 'small',
          'form-control--medium': this.size === 'medium',
          'form-control--large': this.size === 'large',
          'form-control--radio-group': true,
          'form-control--has-label': hasLabel,
        })}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="label"
          aria-hidden=${hasLabel ? 'false' : 'true'}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <slot
          part="form-control-input"
          class=${classMap({ 'wa-button-group': this.hasButtonGroup })}
          @slotchange=${this.syncRadioElements}
        ></slot>

        <slot
          name="hint"
          part="hint"
          class=${classMap({
            'has-slotted': hasHint,
          })}
          aria-hidden=${hasHint ? 'false' : 'true'}
          >${this.hint}</slot
        >
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-radio-group': WaRadioGroup;
  }
}
