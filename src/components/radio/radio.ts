import type { PropertyValues } from 'lit';
import { html, isServer } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { HasSlotController } from '../../internal/slot.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-form-associated-element.js';
import formControlStyles from '../../styles/component/form-control.css';
import sizeStyles from '../../styles/utilities/size.css';
import '../icon/icon.js';
import styles from './radio.css';

/**
 * @summary Radios allow the user to select a single option from a group.
 * @documentation https://backers.webawesome.com/docs/components/radio
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot - The radio's label.
 * @slot hint - Text that describes how to use the checkbox. Alternatively, you can use the `hint` attribute.
 *
 * @event blur - Emitted when the control loses focus.
 * @event focus - Emitted when the control gains focus.
 *
 * @csspart control - The circular container that wraps the radio's checked state.
 * @csspart checked-icon - The checked icon.
 * @csspart label - The container that wraps the radio's label.
 * @csspart hint - The hint's wrapper.
 *
 * @cssproperty --background-color - The radio's background color.
 * @cssproperty --background-color-checked - The radio's background color when checked.
 * @cssproperty --border-color - The color of the radio's borders.
 * @cssproperty --border-color-checked - The color of the radio's borders when checked.
 * @cssproperty --border-style - The style of the radio's borders.
 * @cssproperty --border-width - The width of the radio's borders. Expects a single value.
 * @cssproperty --box-shadow - The shadow effects around the edges of the radio.
 * @cssproperty --checked-icon-color - The color of the radio's checked icon.
 * @cssproperty --checked-icon-scale - The size of the checked icon relative to the radio.
 * @cssproperty --toggle-size - The size of the radio.
 *
 * @cssstate checked - Applied when the control is checked.
 * @cssstate disabled - Applied when the control is disabled.
 */
@customElement('wa-radio')
export default class WaRadio extends WebAwesomeFormAssociatedElement {
  static shadowStyle = [formControlStyles, sizeStyles, styles];

  @state() checked = false;

  /**
   * The string pointing to a form's id.
   */
  @property({ reflect: true }) form: string | null = null;

  /** The radio's value. When selected, the radio group will receive this value. */
  @property({ reflect: true }) value: string;

  /** The radio's value. When selected, the radio group will receive this value. */
  @property({ reflect: true }) appearance: 'default' | 'button' = 'default';

  /**
   * The radio's size. When used inside a radio group, the size will be determined by the radio group's size so this
   * attribute can typically be omitted.
   */
  @property({ reflect: true, initial: 'medium' }) size: 'small' | 'medium' | 'large' | 'inherit' = 'inherit';

  /** Disables the radio. */
  @property({ type: Boolean }) disabled = false;

  /** The radio's hint. If you need to display HTML, use the `hint` slot instead. */
  @property() hint = '';

  private readonly hasSlotController = new HasSlotController(this, 'hint');

  constructor() {
    super();
    if (!isServer) {
      this.addEventListener('click', this.handleClick);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.setInitialAttributes();
  }

  private setInitialAttributes() {
    this.setAttribute('role', 'radio');
    this.tabIndex = 0;
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('checked')) {
      this.toggleCustomState('checked', this.checked);
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
      this.tabIndex = this.checked ? 0 : -1;
    }

    if (changedProperties.has('disabled')) {
      this.toggleCustomState('disabled', this.disabled);
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    }
  }

  /**
   * @override
   */
  setValue(): void {
    // We override `setValue` because we don't want to set form values from here. We want to do that in "RadioGroup" itself.
  }

  private handleClick = () => {
    if (!this.disabled) {
      this.checked = true;
    }
  };

  render() {
    const hasHintSlot = isServer ? true : this.hasSlotController.test('hint');
    const hasHint = this.hint ? true : !!hasHintSlot;

    return html`
      <span part="control" class="control">
        ${this.checked
          ? html`
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" part="checked-icon" class="checked-icon">
                <circle cx="8" cy="8" r="8" />
              </svg>
            `
          : ''}
      </span>

      <slot part="label" class="label"></slot>

      <slot
        name="hint"
        aria-hidden=${hasHint ? 'false' : 'true'}
        class="${classMap({ 'has-slotted': hasHint })}"
        id="hint"
        part="hint"
        >${this.hint}</slot
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-radio': WaRadio;
  }
}
