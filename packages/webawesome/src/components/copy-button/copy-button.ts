import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { WaCopyEvent } from '../../events/copy.js';
import { WaErrorEvent } from '../../events/error.js';
import { animateWithClass } from '../../internal/animate.js';
import { uniqueId } from '../../internal/math.js';
import { HasSlotController } from '../../internal/slot.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import hostStyles from '../../styles/component/host.styles.js';
import visuallyHidden from '../../styles/component/visually-hidden.styles.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import '../tooltip/tooltip.js';
import type WaTooltip from '../tooltip/tooltip.js';
import styles from './copy-button.styles.js';

const INTERNAL_TOOLTIP_SLOT = 'wa-internal-tooltip';
const ASSIGNED_ID_PROP = '__waCopyButtonAssignedId';

/**
 * @summary Copy buttons copy text to the clipboard when the user activates them. They provide built-in success and
 *  error feedback so users know the copy worked.
 * @documentation https://webawesome.com/docs/components/copy
 * @status stable
 * @since 3.6
 *
 * @dependency wa-icon
 * @dependency wa-tooltip
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
 * @csspart feedback - The internal `<wa-tooltip>` element.
 */
@customElement('wa-copy-button')
export default class WaCopyButton extends WebAwesomeElement {
  static css = [hostStyles, visuallyHidden, styles];

  private readonly hasSlotController = new HasSlotController(this, '[default]');
  private readonly localize = new LocalizeController(this);

  @query('slot[name="copy-icon"]') copyIcon: HTMLSlotElement;
  @query('slot[name="success-icon"]') successIcon: HTMLSlotElement;
  @query('slot[name="error-icon"]') errorIcon: HTMLSlotElement;
  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('wa-tooltip[part="feedback"]') shadowTooltip: WaTooltip;

  @state() isCopying = false;
  @state() status: 'rest' | 'success' | 'error' = 'rest';
  @state() hasCustomTrigger = false;
  @state() liveAnnouncement = '';

  private customTriggerEl: HTMLElement | null = null;
  private lightTooltip: WaTooltip | null = null;
  private feedbackTimeout: number | null = null;

  private get activeTooltip(): WaTooltip | null {
    return this.lightTooltip ?? this.shadowTooltip ?? null;
  }

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

  /** A custom label to use as the accessible name and tooltip text in the default copy state. */
  @property({ attribute: 'copy-label' }) copyLabel = '';

  /** A custom label to show in the tooltip after copying. */
  @property({ attribute: 'success-label' }) successLabel = '';

  /** A custom label to show in the tooltip when a copy error occurs. */
  @property({ attribute: 'error-label' }) errorLabel = '';

  /** The length of time to show feedback before restoring the default trigger. */
  @property({ attribute: 'feedback-duration', type: Number }) feedbackDuration = 1000;

  /** The preferred placement of the tooltip. */
  @property({ attribute: 'tooltip-placement', reflect: true }) tooltipPlacement: 'top' | 'right' | 'bottom' | 'left' =
    'top';

  /**
   * Controls the built-in tooltip. `full` (default) shows the tooltip on hover and focus and during copy feedback.
   * `copy` keeps the tooltip silent on hover/focus and only shows it briefly to confirm a successful or failed copy.
   * `none` disables the tooltip entirely. Applies to both the default and custom triggers.
   */
  @property({ reflect: true }) tooltip: 'full' | 'copy' | 'none' = 'full';

  firstUpdated() {
    this.handleDefaultSlotChange();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeLightTooltip();
  }

  @watch('status')
  handleStatusChange() {
    this.customStates.set('success', this.status === 'success');
    this.customStates.set('error', this.status === 'error');
    this.syncTooltipText();

    // Announce success/error to screen readers via live region
    if (this.status === 'success' || this.status === 'error') {
      this.liveAnnouncement = this.currentLabel;
    } else {
      this.liveAnnouncement = '';
    }
  }

  @watch(['copyLabel', 'successLabel', 'errorLabel'])
  handleLabelChange() {
    this.syncTooltipText();
  }

  @watch(['tooltipPlacement', 'disabled'], { waitUntilFirstUpdate: true })
  handleTooltipOptionsChange() {
    if (this.lightTooltip) {
      this.lightTooltip.placement = this.tooltipPlacement;
      this.lightTooltip.disabled = this.disabled;
    }
  }

  @watch('tooltip', { waitUntilFirstUpdate: true })
  handleTooltipModeChange(oldValue?: 'full' | 'copy' | 'none') {
    if (this.tooltip === 'none') {
      this.removeLightTooltip();
    } else if (oldValue === 'none') {
      // Re-create the light tooltip if a custom trigger is present
      this.handleDefaultSlotChange();
    } else if (this.lightTooltip) {
      // Switching between 'full' and 'copy' — just update the trigger
      this.lightTooltip.setAttribute('trigger', this.tooltip === 'copy' ? 'manual' : 'hover focus');
    }
  }

  private handleDefaultSlotChange = () => {
    const assigned = this.defaultSlot?.assignedElements({ flatten: true }) ?? [];
    const trigger = assigned.find((el): el is HTMLElement => el instanceof HTMLElement) ?? null;

    // If the trigger changed, clean up any id we previously assigned to the old one
    if (trigger !== this.customTriggerEl) {
      this.releaseAssignedId(this.customTriggerEl);
      this.customTriggerEl = trigger;
    }

    this.hasCustomTrigger = trigger !== null;

    if (trigger && this.tooltip !== 'none') {
      if (!trigger.id) {
        trigger.id = uniqueId('wa-copy-button-trigger-');
        (trigger as HTMLElement & { [ASSIGNED_ID_PROP]?: boolean })[ASSIGNED_ID_PROP] = true;
      }
      this.ensureLightTooltip();
    } else {
      this.removeLightTooltip();
    }
  };

  private releaseAssignedId(el: HTMLElement | null) {
    if (el && (el as HTMLElement & { [ASSIGNED_ID_PROP]?: boolean })[ASSIGNED_ID_PROP]) {
      el.removeAttribute('id');
      delete (el as HTMLElement & { [ASSIGNED_ID_PROP]?: boolean })[ASSIGNED_ID_PROP];
    }
  }

  private ensureLightTooltip() {
    if (!this.customTriggerEl) {
      return;
    }

    const triggerValue = this.tooltip === 'copy' ? 'manual' : 'hover focus';

    if (!this.lightTooltip) {
      const tooltip = document.createElement('wa-tooltip') as WaTooltip;
      tooltip.setAttribute('slot', INTERNAL_TOOLTIP_SLOT);
      tooltip.setAttribute('part', 'feedback');
      tooltip.setAttribute('trigger', triggerValue);
      tooltip.dataset.copyButtonTooltip = '';
      tooltip.setAttribute('for', this.customTriggerEl.id);
      tooltip.placement = this.tooltipPlacement;
      tooltip.disabled = this.disabled;
      tooltip.textContent = this.currentLabel;
      this.appendChild(tooltip);
      this.lightTooltip = tooltip;
    } else {
      this.lightTooltip.setAttribute('for', this.customTriggerEl.id);
      this.lightTooltip.setAttribute('trigger', triggerValue);
      this.lightTooltip.placement = this.tooltipPlacement;
      this.lightTooltip.disabled = this.disabled;
      this.lightTooltip.textContent = this.currentLabel;
    }
  }

  private removeLightTooltip() {
    if (this.lightTooltip) {
      this.releaseAssignedId(this.customTriggerEl);
      this.lightTooltip.remove();
      this.lightTooltip = null;
    }
  }

  private syncTooltipText() {
    if (this.lightTooltip) {
      this.lightTooltip.textContent = this.currentLabel;
    }
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

    // Show the tooltip with the new label (works whether or not it's already open via hover/focus).
    // Skipped entirely when the tooltip is disabled.
    await this.updateComplete;
    const tooltip = this.tooltip === 'none' ? null : this.activeTooltip;
    let earlyClose: Promise<void> | null = null;
    if (tooltip) {
      tooltip.show();

      // If the user closes the tooltip themselves (e.g. by mousing away), cancel our pending hide
      // so it can't fire on top of a future hover-driven show.
      earlyClose = new Promise<void>(resolve => {
        tooltip.addEventListener(
          'wa-after-hide',
          () => {
            if (this.feedbackTimeout !== null) {
              clearTimeout(this.feedbackTimeout);
              this.feedbackTimeout = null;
            }
            resolve();
          },
          { once: true },
        );
      });

      this.feedbackTimeout = window.setTimeout(async () => {
        this.feedbackTimeout = null;
        await tooltip.hide();
      }, this.feedbackDuration);
    }

    // Wait until the tooltip is fully hidden (or the cleanup duration elapses, whichever comes
    // last) before flipping the status back. This prevents the label from changing to "Copy" while
    // the tooltip's hide animation is still running.
    setTimeout(async () => {
      if (earlyClose) {
        await earlyClose;
      }

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
    const showTooltip = !hasCustomTrigger && this.tooltip !== 'none';
    const triggerValue = this.tooltip === 'copy' ? 'manual' : 'hover focus';

    return html`
      <div class="copy-button__trigger" @click=${this.handleCopy}>
        <slot @slotchange=${this.handleDefaultSlotChange}></slot>
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

        ${showTooltip
          ? html`
              <wa-tooltip
                part="feedback"
                for="copy-button"
                placement=${this.tooltipPlacement}
                trigger=${triggerValue}
                class=${classMap({
                  'copy-button-tooltip': true,
                  'copy-button-tooltip-success': this.status === 'success',
                  'copy-button-tooltip-error': this.status === 'error',
                })}
                ?disabled=${this.disabled}
                >${this.currentLabel}</wa-tooltip
              >
            `
          : ''}
        <slot name="${INTERNAL_TOOLTIP_SLOT}"></slot>
        <div class="wa-visually-hidden" role="status" aria-live="polite">${this.liveAnnouncement}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-copy-button': WaCopyButton;
  }
}
