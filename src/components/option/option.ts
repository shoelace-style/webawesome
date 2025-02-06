import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import getText from '../../internal/get-text.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import styles from './option.css';

/**
 * @summary Options define the selectable items within various form controls such as [select](/docs/components/select).
 * @documentation https://backers.webawesome.com/docs/components/option
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 *
 * @slot - The option's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 *
 * @cssproperty --background-color-current - The current option's background color.
 * @cssproperty --background-color-hover - The options's background color on hover.
 * @cssproperty --text-color-current - The current option's label color.
 * @cssproperty --text-color-hover - The label color on hover.
 *
 * @csspart checked-icon - The checked icon, a `<wa-icon>` element.
 * @csspart label - The option's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 *
 * @cssstate current - The user has keyed into the option, but hasn't selected it yet (shows a highlight)
 * @cssstate selected - The option is selected and has aria-selected="true"
 * @cssstate hover - Like `:hover` but works while dragging in Safari
 */
@customElement('wa-option')
export default class WaOption extends WebAwesomeElement {
  static shadowStyle = styles;

  // @ts-expect-error - Controller is currently unused
  private readonly localize = new LocalizeController(this);
  private isInitialized = false;

  @query('.label') defaultSlot: HTMLSlotElement;

  // Set via the parent select
  @state() current = false;

  @state() selected = false;

  /**
   * The option's value. When selected, the containing form control will receive this value. The value must be unique
   * from other options in the same group. Values may not contain spaces, as spaces are used as delimiters when listing
   * multiple values.
   */
  @property({ reflect: true }) value = '';

  /** Draws the option in a disabled state, preventing selection. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  _label: string = '';
  /**
   * The option’s plain text label.
   * Usually automatically generated, but can be useful to provide manually for cases involving complex content.
   */
  @property()
  set label(value) {
    const oldValue = this._label;
    this._label = value || '';

    if (this._label !== oldValue) {
      this.requestUpdate('label', oldValue);
    }
  }

  get label(): string {
    if (this._label) {
      return this._label;
    }

    if (!this.defaultLabel) {
      this.updateDefaultLabel();
    }

    return this.defaultLabel;
  }

  /** The default label, generated from the element contents. Will be equal to `label` in most cases. */
  @state() defaultLabel = '';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'option');
    this.setAttribute('aria-selected', 'false');

    this.addEventListener('mouseenter', this.handleHover);
    this.addEventListener('mouseleave', this.handleHover);
    this.updateDefaultLabel();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener('mouseenter', this.handleHover);
    this.removeEventListener('mouseleave', this.handleHover);
  }

  private handleDefaultSlotChange() {
    this.updateDefaultLabel();

    if (this.isInitialized) {
      // When the label changes, tell the controller to update
      customElements.whenDefined('wa-select').then(() => {
        const controller = this.closest('wa-select');
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });
    } else {
      this.isInitialized = true;
    }
  }

  private handleHover = (event: Event) => {
    // We need this because Safari doesn't honor :hover styles while dragging
    // Testcase: https://codepen.io/leaverou/pen/VYZOOjy
    if (event.type === 'mouseenter') {
      this.toggleCustomState('hover', true);
    } else if (event.type === 'mouseleave') {
      this.toggleCustomState('hover', false);
    }
  };

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    }

    if (changedProperties.has('selected')) {
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
      this.toggleCustomState('selected', this.selected);
    }

    if (changedProperties.has('value')) {
      // Ensure the value is a string. This ensures the next line doesn't error and allows framework users to pass numbers
      // instead of requiring them to cast the value to a string.
      if (typeof this.value !== 'string') {
        this.value = String(this.value);
      }

      if (this.value.includes(' ')) {
        // eslint-disable-next-line no-console
        console.error(`Option values cannot include a space. All spaces have been replaced with underscores.`, this);
        this.value = this.value.replace(/ /g, '_');
      }
    }

    if (changedProperties.has('current')) {
      this.toggleCustomState('current', this.current);
    }
  }

  private updateDefaultLabel() {
    let oldValue = this.defaultLabel;
    this.defaultLabel = getText(this).trim();
    let changed = this.defaultLabel !== oldValue;

    if (!this._label && changed) {
      // Uses default label, and it has changed
      this.requestUpdate('label', oldValue);
    }

    return changed;
  }

  render() {
    return html`
      <wa-icon
        part="checked-icon"
        class="check"
        name="check"
        library="system"
        variant="solid"
        aria-hidden="true"
      ></wa-icon>
      <slot part="prefix" name="prefix" class="prefix"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="suffix" name="suffix" class="suffix"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-option': WaOption;
  }
}
