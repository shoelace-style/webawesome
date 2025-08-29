import { html, isServer, render } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { WaAfterHideEvent } from '../../events/after-hide.js';
import { WaAfterShowEvent } from '../../events/after-show.js';
import { WaHideEvent } from '../../events/hide.js';
import { WaShowEvent } from '../../events/show.js';
import { animateWithClass } from '../../internal/animate.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../button/button.js';
import type WaButton from '../button/button.js';
import '../callout/callout.js';
import type WaCallout from '../callout/callout.js';
import '../icon/icon.js';
import styles from './alert.css';

const toastStack = !isServer ? Object.assign(document.createElement('div'), { className: 'wa-toast-stack' }) : null;

/**
 * @summary Enhances a callout component with alert functionality like auto-hide, toast notifications, and animations.
 * @documentation https://webawesome.com/docs/components/alert
 * @status experimental
 * @since 3.0
 *
 * @dependency wa-button
 * @dependency wa-callout
 * @dependency wa-icon
 *
 * @slot - The alert's main content, expects a wa-callout component.
 *
 * @event wa-show - Emitted when the alert opens.
 * @event wa-after-show - Emitted after the alert opens and all animations are complete.
 * @event wa-hide - Emitted when the alert closes.
 * @event wa-after-hide - Emitted after the alert closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty [--show-duration=250ms] - The show duration to use when applying built-in animation classes.
 * @cssproperty [--hide-duration=250ms] - The hide duration to use when applying built-in animation classes.
 */
@customElement('wa-alert')
export default class WaAlert extends WebAwesomeElement {
  static css = styles;

  private autoHideTimeout?: ReturnType<typeof setTimeout>;
  private remainingTimeInterval?: ReturnType<typeof setInterval>;
  private countdownAnimation?: Animation;
  private readonly localize = new LocalizeController(this);

  @query('slot') defaultSlot: HTMLSlotElement;
  @query('[part~="base"]') base: HTMLElement;
  @query('.alert__countdown-elapsed') countdownElement?: HTMLElement;

  /**
   * Indicates whether the alert is open. You can toggle this attribute to show and hide the alert, or you can
   * use the `show()` and `hide()` methods, and this attribute will reflect the alert's open state.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Enables a close button that allows the user to dismiss the alert. */
  @property({ type: Boolean, reflect: true }) closable = false;

  /**
   * The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with
   * the alert before it closes (e.g., moves the mouse over it), the timer will restart. Defaults to `Infinity`, meaning
   * the alert will not close on its own.
   */
  @property({ type: Number }) duration: number = Number.POSITIVE_INFINITY;

  /**
   * Enables a countdown that indicates the remaining time the alert will be displayed.
   * Typically used to indicate the remaining time before a whole app refreshes.
   */
  @property({ type: Boolean, reflect: true }) countdown?: boolean = false;

  @state() private remainingTime = this.duration;

  firstUpdated() {
    this.base.hidden = !this.open;
  }

  private restartAutoHide() {
    this.handleCountdownChange();
    clearTimeout(this.autoHideTimeout);
    clearInterval(this.remainingTimeInterval);
    if (this.open && this.duration < Number.POSITIVE_INFINITY) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
      this.remainingTime = this.duration;
      this.remainingTimeInterval = setInterval(() => {
        this.remainingTime -= 100;
      }, 100);
    }
  }

  private pauseAutoHide() {
    this.countdownAnimation?.pause();
    clearTimeout(this.autoHideTimeout);
    clearInterval(this.remainingTimeInterval);
  }

  private resumeAutoHide() {
    if (this.duration < Number.POSITIVE_INFINITY) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.remainingTime);
      this.remainingTimeInterval = setInterval(() => {
        this.remainingTime -= 100;
      }, 100);
      this.countdownAnimation?.play();
    }
  }

  private handleCountdownChange() {
    if (this.open && this.duration < Number.POSITIVE_INFINITY && this.countdown) {
      const { countdownElement } = this;
      const start = '100%';
      const end = '0';
      this.countdownAnimation = countdownElement?.animate([{ width: start }, { width: end }], {
        duration: this.duration,
        easing: 'linear',
      });
    }
  }

  private handleAlertClick(event: KeyboardEvent) {
    const target: HTMLDialogElement = event.target as HTMLDialogElement;
    const button = target.closest('[data-alert="close"]');
    if (button) {
      event.stopPropagation();
      (button as WaButton).blur();
      this.hide();
    }
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      const waShowEvent = new WaShowEvent();
      this.dispatchEvent(waShowEvent);
      if (waShowEvent.defaultPrevented) {
        this.open = false;
        return;
      }

      if (this.duration < Number.POSITIVE_INFINITY) {
        this.restartAutoHide();
      }
      this.base.hidden = false;

      await animateWithClass(this.base, 'show-with-scale');
      this.dispatchEvent(new WaAfterShowEvent());
    } else {
      // Hide
      const waHideEvent = new WaHideEvent();
      this.dispatchEvent(waHideEvent);
      if (waHideEvent.defaultPrevented) {
        this.open = false;
        return;
      }

      this.countdownAnimation?.cancel();
      clearTimeout(this.autoHideTimeout);
      clearInterval(this.remainingTimeInterval);

      await animateWithClass(this.base, 'hide-with-scale');
      this.base.hidden = true;

      this.dispatchEvent(new WaAfterHideEvent());
    }
  }

  @watch('duration')
  handleDurationChange() {
    this.restartAutoHide();
  }

  /** Shows the alert. */
  async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'wa-after-show');
  }

  /** Hides the alert */
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'wa-after-hide');
  }

  /**
   * Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
   * dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
   * calling this method again. The returned promise will be resolved after the alert is hidden.
   */
  async toast() {
    if (isServer || !toastStack) {
      throw new Error('Toast notifications are not supported in SSR.');
    }

    return new Promise<void>(resolve => {
      this.handleCountdownChange();
      if (toastStack.parentElement === null) {
        document.body.append(toastStack);
      }

      this.setAttribute('toast', '');
      toastStack.appendChild(this);

      // Wait for the toast stack to render
      requestAnimationFrame(() => {
        // force a reflow for the initial transition
        this.clientWidth;
        this.show();
      });

      this.addEventListener(
        'wa-after-hide',
        () => {
          toastStack.removeChild(this);
          this.removeAttribute('toast');
          resolve();

          // Remove the toast stack from the DOM when there are no more alerts
          if (toastStack.querySelector('wa-alert') === null) {
            toastStack.remove();
          }
        },
        { once: true },
      );
    });
  }

  private handleSlotChange() {
    const items = [...this.defaultSlot.assignedElements({ flatten: true })].filter(
      item => item.tagName.toLowerCase() === 'wa-callout',
    ) as WaCallout[];

    // Assert that there is only one callout
    if (items.length > 1) {
      throw new Error('An alert can only contain one callout');
    }

    // Add a close button to callout if closable and no data-alert="close" button exists
    const callout = items[0];
    if (callout && this.closable) {
      const closeButton = callout.querySelector('[data-alert="close"]');
      if (!closeButton) {
        const button = document.createElement('wa-button');
        button.setAttribute('data-alert', 'close');
        button.setAttribute('slot', 'action');
        button.setAttribute('appearance', 'plain');
        button.setAttribute('variant', callout.variant);
        button.setAttribute('part', 'close-button');
        button.setAttribute('exportparts', 'base:close-button__base');
        render(html`<wa-icon name="xmark" variant="solid" label=${this.localize.term('close')} library="system"></wa-icon>`, button);
        callout.appendChild(button);
      }
    }

    // Set the countdown color
    if (callout && this.countdownElement) {
      const variant = callout.getAttribute('variant');
      if (variant) {
        this.countdownElement.style.backgroundColor = getComputedStyle(callout).getPropertyValue(
          `--wa-color-${variant}-border-loud`,
        );
      }
    }
  }

  render() {
    return html`
      <div
        part="base"
        class="alert"
        role="alert"
        aria-hidden=${this.open ? 'false' : 'true'}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
        @click=${this.handleAlertClick}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown
          ? html`
              <div class="alert__countdown">
                <div class="alert__countdown-elapsed"></div>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-alert': WaAlert;
  }
}
