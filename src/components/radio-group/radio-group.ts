import '../button-group/button-group.js';
import '../radio/radio.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { RequiredValidator } from '../../internal/validators/required-validator.js';
import { uniqueId } from '../../internal/math.js';
import { WaChangeEvent } from '../../events/change.js';
import { WaInputEvent } from '../../events/input.js';
import { watch } from '../../internal/watch.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import styles from './radio-group.styles.js';
import type { CSSResultGroup } from 'lit';
import type WaRadio from '../radio/radio.js';
import type WaRadioButton from '../radio-button/radio-button.js';

/**
 * @summary Radio groups are used to group multiple [radios](/components/radio) or [radio buttons](/components/radio-button) so they function as a single form control.
 * @documentation https://shoelace.style/components/radio-group
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button-group
 *
 * @slot - The default slot where `<wa-radio>` or `<wa-radio-button>` elements are placed.
 * @slot label - The radio group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot help-text - Text that describes how to use the radio group. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-change - Emitted when the radio group's selected value changes.
 * @event wa-input - Emitted when the radio group receives user input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
@customElement('wa-radio-group')
export default class WaRadioGroup extends WebAwesomeFormAssociatedElement {
  static styles: CSSResultGroup = [componentStyles, formControlStyles, styles];

  static get validators() {
    return [
      ...super.validators,
      RequiredValidator({
        validationElement: Object.assign(document.createElement('input'), {
          required: true,
          type: 'radio',
          // we need an id that's guaranteed to be unique; users will never see this
          name: uniqueId('__wa-radio')
        })
      })
    ];
  }

  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  @state() private hasButtonGroup = false;

  /**
   * The radio group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot
   * instead.
   */
  @property() label = '';

  /** The radio groups's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /** The name of the radio group, submitted as a name/value pair with form data. */
  @property({ reflect: true }) name: string | null = null;

  @property({ attribute: false }) value = '';
  @property({ attribute: 'value', reflect: true }) defaultValue = '';

  /** The radio group's size. This size will be applied to all child radios and radio buttons. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Ensures a child radio is checked before allowing the containing form to submit. */
  @property({ type: Boolean, reflect: true }) required = false;

  //
  // We need this because if we don't have it, FormValidation yells at us that it's "not focusable".
  //   If we use `this.tabIndex = -1` we can't focus the radio inside.
  //
  static shadowRootOptions = { ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true };

  constructor() {
    super();

    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('click', this.handleRadioClick);
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
        radio.tabIndex = -1;
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
    const radios = this.getAllRadios();
    const checked = radios.find(radio => radio.checked);
    const radioToFocus = checked || radios[0];

    // Move focus to the checked radio (or the first one if none are checked) when clicking the label
    if (radioToFocus) {
      radioToFocus.focus();
    }
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
      })
    );

    this.hasButtonGroup = radios.some(radio => radio.tagName.toLowerCase() === 'wa-radio-button');

    if (radios.length > 0 && !radios.some(radio => radio.checked)) {
      if (this.hasButtonGroup) {
        const buttonRadio = radios[0].shadowRoot?.querySelector('button');

        if (buttonRadio) {
          buttonRadio.tabIndex = 0;
        }
      } else {
        radios[0].tabIndex = 0;
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
    return this.querySelector<WaRadio | WaRadioButton>(':is(wa-radio, wa-radio-button):not([disabled])') || undefined;
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
        radio.tabIndex = -1;
      }
    });

    this.value = radios[index].value;
    radios[index].checked = true;

    if (!hasButtonGroup) {
      radios[index].tabIndex = 0;
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

  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const defaultSlot = html` <slot @slotchange=${this.syncRadioElements}></slot> `;

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
          'form-control--has-help-text': hasHelpText
        })}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${hasLabel ? 'false' : 'true'}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          ${this.hasButtonGroup
            ? html`
                <wa-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${defaultSlot}
                </wa-button-group>
              `
            : defaultSlot}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-radio-group': WaRadioGroup;
  }
}
