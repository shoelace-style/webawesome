import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { WaCopyEvent } from '../../events/copy.js';
import { WaErrorEvent } from '../../events/error.js';
import { animateWithClass } from '../../internal/animate.js';
import { HasSlotController } from '../../internal/slot.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import hostStyles from '../../styles/component/host.styles.js';
import visuallyHidden from '../../styles/component/visually-hidden.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import styles from './copy-button.styles.js';

/**
 * @summary Copy buttons copy text to the clipboard when the user activates them. They provide built-in success and
 *  error feedback so users know the copy worked.
 * @documentation https://webawesome.com/docs/components/copy
 * @status stable
 * @since 2.7
 *
 * @dependency wa-icon
 *
 * @event wa-copy - Emitted when the data has been copied.
 * @event wa-error - Emitted when the data could not be copied.
 *
 * @slot - The trigger element. By default, a copy icon button is rendered so this is optional. If desired, you can slot
 *  in a custom element such as `<wa-button>` or `<button>`.
 * @slot copy-icon - The icon to show in the default copy state. Works best with `<wa-icon>`.
 * @slot success-icon - The icon to show when the content is copied. Works best with `<wa-icon>`.
 * @slot error-icon - The icon to show when a copy error occurs. Works best with `<wa-icon>`.
 *
 * @cssstate success - Applied when the copy operation succeeds.
 * @cssstate error - Applied when the copy operation fails.
 *
 * @csspart button - The internal `<button>` element.
 * @csspart copy-icon - The container that holds the copy icon.
 * @csspart success-icon - The container that holds the success icon.
 * @csspart error-icon - The container that holds the error icon.
 * @csspart feedback - The popup that displays the success or error label after a copy attempt.
 */
@customElement('wa-copy-button')
export default class WaCopyButton extends WebAwesomeElement {
  static css = [hostStyles, visuallyHidden, styles];

  private readonly hasSlotController = new HasSlotController(this, '[default]');
  private readonly localize = new LocalizeController(this);

  @query('slot[name="copy-icon"]') copyIcon: HTMLSlotElement;
  @query('slot[name="success-icon"]') successIcon: HTMLSlotElement;
  @query('slot[name="error-icon"]') errorIcon: HTMLSlotElement;
  @query('.feedback') feedback: HTMLDivElement;

  @state() isCopying = false;
  @state() status: 'rest' | 'success' | 'error' = 'rest';
  @state() showFeedback = false;

  private get currentLabel() {
    if (this.status === 'success') {
      return this.successLabel || this.localize.term('copied');
    }

    if (this.status === 'error') {
      return this.errorLabel || this.localize.term('error');
    }

    return this.copyLabel || this.localize.term('copy');
  }

  /** The text value to copy. */
  @property() value = '';

  /**
   * An id that references an element in the same document from which data will be copied. If both this and `value` are
   * present, this value will take precedence. By default, the target element's `textContent` will be copied. To copy an
   * attribute, append the attribute name wrapped in square brackets, e.g. `from="el[value]"`. To copy a property,
   * append a dot and the property name, e.g. `from="el.value"`.
   */
  @property() from = '';

  /** Disables the copy button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** A custom label to use as an accessible name and show in the feedback popup. */
  @property({ attribute: 'copy-label' }) copyLabel = '';

  /** A custom label to show in the feedback popup after copying. */
  @property({ attribute: 'success-label' }) successLabel = '';

  /** A custom label to show in the feedback popup when a copy error occurs. */
  @property({ attribute: 'error-label' }) errorLabel = '';

  /** The length of time to show feedback before restoring the default trigger. */
  @property({ attribute: 'feedback-duration', type: Number }) feedbackDuration = 1000;

  /** The preferred placement of the feedback popup. */
  @property({ attribute: 'feedback-placement', reflect: true }) feedbackPlacement: 'top' | 'right' | 'bottom' | 'left' =
    'top';

  @watch('status')
  handleStatusChange() {
    this.customStates.set('success', this.status === 'success');
    this.customStates.set('error', this.status === 'error');
  }

  private async handleCopy() {
    if (this.disabled || this.isCopying) {
      return;
    }
    this.isCopying = true;

    // Copy the value by default
    let valueToCopy = this.value;

    // If an element is specified, copy from that instead
    if (this.from) {
      const root = this.getRootNode() as ShadowRoot | Document;

      // Simple way to parse ids, properties, and attributes
      const isProperty = this.from.includes('.');
      const isAttribute = this.from.includes('[') && this.from.includes(']');
      let id = this.from;
      let field = '';

      if (isProperty) {
        // Split at the dot
        [id, field] = this.from.trim().split('.');
      } else if (isAttribute) {
        // Trim the ] and split at the [
        [id, field] = this.from.trim().replace(/\]$/, '').split('[');
      }

      // Locate the target element by id
      const target = 'getElementById' in root ? root.getElementById(id) : null;

      if (target) {
        if (isAttribute) {
          valueToCopy = target.getAttribute(field) || '';
        } else if (isProperty) {
          // @ts-expect-error - deal with it
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          valueToCopy = target[field] || '';
        } else {
          valueToCopy = target.textContent || '';
        }
      } else {
        // No target
        this.showStatus('error');
        this.dispatchEvent(new WaErrorEvent());
      }
    }

    // No value
    if (!valueToCopy) {
      this.showStatus('error');
      this.dispatchEvent(new WaErrorEvent());
    } else {
      try {
        await navigator.clipboard.writeText(valueToCopy);
        this.showStatus('success');
        this.dispatchEvent(new WaCopyEvent({ value: valueToCopy }));
      } catch (error) {
        // Rejected by browser
        this.showStatus('error');
        this.dispatchEvent(new WaErrorEvent());
      }
    }
  }

  private async showStatus(status: 'success' | 'error') {
    this.status = status;

    // Animate the icon swap when using the default trigger
    if (this.copyIcon) {
      const iconToShow = status === 'success' ? this.successIcon : this.errorIcon;

      await animateWithClass(this.copyIcon, 'hide');
      this.copyIcon.hidden = true;
      iconToShow.hidden = false;
      await animateWithClass(iconToShow, 'show');
    }

    // Show the feedback popup
    this.showFeedback = true;
    await this.updateComplete;
    if (this.feedback) {
      await animateWithClass(this.feedback, 'show');
    }

    // After a brief delay, restore the original state
    setTimeout(async () => {
      // Hide the feedback popup
      if (this.feedback) {
        await animateWithClass(this.feedback, 'hide');
      }
      this.showFeedback = false;

      if (this.copyIcon) {
        const iconToShow = status === 'success' ? this.successIcon : this.errorIcon;
        await animateWithClass(iconToShow, 'hide');
        iconToShow.hidden = true;
        this.copyIcon.hidden = false;
        await animateWithClass(this.copyIcon, 'show');
      }

      this.status = 'rest';
      this.isCopying = false;
    }, this.feedbackDuration);
  }

  render() {
    const hasCustomTrigger = this.hasSlotController.test('[default]');

    return html`
      <div class="copy-button__trigger" @click=${this.handleCopy}>
        <slot></slot>
        <button
          class="button"
          part="button"
          type="button"
          id="copy-button"
          aria-label=${this.currentLabel}
          ?disabled=${this.disabled}
          ?hidden=${hasCustomTrigger}
        >
          <slot part="copy-icon" name="copy-icon">
            <wa-icon library="system" name="copy" variant="regular"></wa-icon>
          </slot>
          <slot part="success-icon" name="success-icon" variant="solid" hidden>
            <wa-icon library="system" name="check"></wa-icon>
          </slot>
          <slot part="error-icon" name="error-icon" variant="solid" hidden>
            <wa-icon library="system" name="xmark"></wa-icon>
          </slot>
        </button>

        ${this.showFeedback
          ? html`
              <div
                class=${classMap({
                  feedback: true,
                  'feedback-success': this.status === 'success',
                  'feedback-error': this.status === 'error',
                })}
                part="feedback"
                role="status"
                aria-live="polite"
              >
                ${this.currentLabel}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-copy-button': WaCopyButton;
  }
}
