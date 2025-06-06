import { html, isServer } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { uniqueId } from '../../internal/math.js';
import { HasSlotController } from '../../internal/slot.js';
import { RequiredValidator } from '../../internal/validators/required-validator.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-form-associated-element.js';
import formControlStyles from '../../styles/component/form-control.css';
import sizeStyles from '../../styles/utilities/size.css';
import '../radio/radio.js';
import type WaRadio from '../radio/radio.js';
import styles from './radio-group.css';

/**
 * @summary Radio groups are used to group multiple [radios](/docs/components/radio) so they function as a single form control.
 * @documentation https://backers.webawesome.com/docs/components/radio-group
 * @status stable
 * @since 2.0
 *
 * @dependency wa-radio
 *
 * @slot - The default slot where `<wa-radio>` elements are placed.
 * @slot label - The radio group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot hint - Text that describes how to use the radio group. Alternatively, you can use the `hint` attribute.
 *
 * @event change - Emitted when the radio group's selected value changes.
 * @event input - Emitted when the radio group receives user input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart radios - The wrapper than surrounds radio items, styled as a flex container by default.
 * @csspart hint - The hint's wrapper.
 */
@customElement('wa-radio-group')
export default class WaRadioGroup extends WebAwesomeFormAssociatedElement {
  static css = [sizeStyles, formControlStyles, styles];

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

  @state() hasRadioButtons = false;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  /**
   * The radio group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot
   * instead.
   */
  @property() label = '';

  /** The radio groups's hint. If you need to display HTML, use the `hint` slot instead. */
  @property({ attribute: 'hint' }) hint = '';

  /** The name of the radio group, submitted as a name/value pair with form data. */
  @property({ reflect: true }) name: string | null = null;

  /** The orientation in which to show radio items. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';

  private _value: string | null = null;

  get value() {
    if (this.valueHasChanged) {
      return this._value;
    }

    return this._value ?? this.defaultValue;
  }

  /** The current value of the radio group, submitted as a name/value pair with form data. */
  @state()
  set value(val: string | number | null) {
    if (typeof val === 'number') val = String(val);
    this.valueHasChanged = true;
    this._value = val;
  }

  /** The default value of the form control. Primarily used for resetting the form control. */
  @property({ attribute: 'value', reflect: true }) defaultValue: string | null = this.getAttribute('value') || null;

  /** The radio group's size. This size will be applied to all child radios and radio buttons, except when explicitly overridden. */
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

  /**
   * We use the first available radio as the validationTarget similar to native HTML that shows the validation popup on
   * the first radio element.
   */
  get validationTarget() {
    if (isServer) return undefined;

    const radio = this.querySelector<WaRadio>(':is(wa-radio):not([disabled])');
    if (!radio) return undefined;

    return radio;
  }

  formResetCallback(...args: Parameters<WebAwesomeFormAssociatedElement['formResetCallback']>) {
    this.value = this.defaultValue;

    super.formResetCallback(...args);

    this.syncRadioElements();
  }

  private handleRadioClick = (e: Event) => {
    const clickedRadio = (e.target as HTMLElement).closest<WaRadio>('wa-radio');

    if (!clickedRadio || clickedRadio.disabled) {
      return;
    }

    const oldValue = this.value;
    this.value = clickedRadio.value;
    clickedRadio.checked = true;

    const radios = this.getAllRadios();
    for (const radio of radios) {
      if (clickedRadio === radio) {
        continue;
      }

      radio.checked = false;
      radio.setAttribute('tabindex', '-1');
    }

    if (this.value !== oldValue) {
      this.dispatchEvent(new InputEvent('input'));
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  };

  private getAllRadios() {
    return [...this.querySelectorAll<WaRadio>('wa-radio')];
  }

  private handleLabelClick() {
    this.focus();
  }

  private async syncRadioElements() {
    const radios = this.getAllRadios();
    let hasRadioButtons = false;

    // Add data attributes to support styling
    radios.forEach((radio, index) => {
      if (radio.appearance === 'button') hasRadioButtons = true;
      radio.setAttribute('size', this.size);
      radio.toggleAttribute('data-wa-radio-horizontal', this.orientation !== 'vertical');
      radio.toggleAttribute('data-wa-radio-vertical', this.orientation === 'vertical');
      radio.toggleAttribute('data-wa-radio-first', index === 0);
      radio.toggleAttribute('data-wa-radio-inner', index !== 0 && index !== radios.length - 1);
      radio.toggleAttribute('data-wa-radio-last', index === radios.length - 1);
    });

    // If at least one radio button exists, we assume it's a radio button group
    this.hasRadioButtons = hasRadioButtons;

    await Promise.all(
      radios.map(async radio => {
        await radio.updateComplete;

        if (!radio.disabled && radio.value === this.value) {
          radio.checked = true;
        } else {
          radio.checked = false;
        }
      }),
    );

    if (radios.length > 0 && !radios.some(radio => radio.checked)) {
      radios[0].setAttribute('tabindex', '0');
    }
  }

  @watch('value')
  handleValueChange() {
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

    const hasRadioButtons = radios.some(radio => radio.tagName.toLowerCase() === 'wa-radio-button');

    this.getAllRadios().forEach(radio => {
      radio.checked = false;

      if (!hasRadioButtons) {
        radio.setAttribute('tabindex', '-1');
      }
    });

    this.value = radios[index].value;
    radios[index].checked = true;

    if (!hasRadioButtons) {
      radios[index].setAttribute('tabindex', '0');
      radios[index].focus();
    } else {
      radios[index].shadowRoot!.querySelector('button')!.focus();
    }

    if (this.value !== oldValue) {
      this.dispatchEvent(new InputEvent('input'));
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
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
          'form-control-radio-group': true,
          'form-control-has-label': hasLabel,
          'has-radio-buttons': this.hasRadioButtons,
        })}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="hint"
        aria-errormessage="error-message"
        aria-orientation=${this.orientation}
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

        <slot part="form-control-input" @slotchange=${this.syncRadioElements}></slot>

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
