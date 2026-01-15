import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { WaAfterHideEvent } from '../../events/after-hide.js';
import { WaAfterShowEvent } from '../../events/after-show.js';
import { WaHideEvent } from '../../events/hide.js';
import { WaShowEvent } from '../../events/show.js';
import { animateWithClass } from '../../internal/animate.js';
import { waitForEvent } from '../../internal/event.js';
import { uniqueId } from '../../internal/math.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import WaPopup from '../popup/popup.js';
import styles from './popover.styles.js';

const openPopovers = new Set<WaPopover>();

/**
 * @summary Popovers display contextual content and interactive elements in a floating panel.
 * @documentation https://webawesome.com/docs/components/popover
 * @status stable
 * @since 3.0
 *
 * @dependency wa-popup
 *
 * @slot - The popover's content. Interactive elements such as buttons and links are supported.
 *
 * @event wa-show - Emitted when the popover begins to show. Canceling this event will stop the popover from showing.
 * @event wa-after-show - Emitted after the popover has shown and all animations are complete.
 * @event wa-hide - Emitted when the popover begins to hide. Canceling this event will stop the popover from hiding.
 * @event wa-after-hide - Emitted after the popover has hidden and all animations are complete.
 *
 * @csspart dialog - The native dialog element that contains the popover content.
 * @csspart body - The popover's body where its content is rendered.
 * @csspart popup - The internal `<wa-popup>` element that positions the popover.
 * @csspart popup__popup - The popup's exported `popup` part. Use this to target the popover's popup container.
 * @csspart popup__arrow - The popup's exported `arrow` part. Use this to target the popover's arrow.
 *
 * @cssproperty [--arrow-size=0.375rem] - The size of the tiny arrow that points to the popover (set to zero to remove).
 * @cssproperty [--max-width=25rem] - The maximum width of the popover's body content.
 * @cssproperty [--show-duration=100ms] - The speed of the show animation.
 * @cssproperty [--hide-duration=100ms] - The speed of the hide animation.
 *
 * @cssstate open - Applied when the popover is open.
 */
@customElement('wa-popover')
export default class WaPopover extends WebAwesomeElement {
  static css = styles;
  static dependencies = { 'wa-popup': WaPopup };

  @query('dialog') dialog: HTMLDialogElement;
  @query('.body') body: HTMLElement;
  @query('wa-popup') popup: WaPopup;

  @state() anchor: null | Element = null;

  /**
   * The preferred placement of the popover. Note that the actual placement may vary as needed to keep the popover
   * inside of the viewport.
   */
  @property() placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end' = 'top';

  /** Shows or hides the popover. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** The distance in pixels from which to offset the popover away from its target. */
  @property({ type: Number }) distance = 8;

  /** The distance in pixels from which to offset the popover along its target. */
  @property({ type: Number }) skidding = 0;

  /** The ID of the popover's anchor element. This must be an interactive/focusable element such as a button. */
  @property() for: string | null = null;

  /** Removes the arrow from the popover. */
  @property({ attribute: 'without-arrow', type: Boolean, reflect: true }) withoutArrow = false;

  private eventController = new AbortController();

  connectedCallback() {
    super.connectedCallback();

    // If the user doesn't give us an id, generate one.
    if (!this.id) {
      this.id = uniqueId('wa-popover-');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Cleanup events in case the popover is removed while open
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    this.eventController.abort();
  }

  firstUpdated() {
    // If the popover is visible on init, update its position
    if (this.open) {
      this.dialog.show();
      this.popup.active = true;
      this.popup.reposition();
    }
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('open')) {
      this.customStates.set('open', this.open);
    }
  }

  private handleAnchorClick = () => {
    // Clicks on the anchor should toggle the popover
    this.open = !this.open;
  };

  private handleBodyClick = (event: PointerEvent) => {
    const target = event.target as HTMLElement;
    const button = target.closest('[data-popover="close"]');

    // Watch for [data-popover="close"] clicks
    if (button) {
      event.stopPropagation();
      this.open = false;
    }
  };

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    // Hide the popover when escape is pressed
    if (event.key === 'Escape') {
      event.preventDefault();
      this.open = false;
      if (this.anchor && typeof (this.anchor as any).focus === 'function') {
        (this.anchor as any).focus();
      }
    }
  };

  private handleDocumentClick = (event: PointerEvent) => {
    const target = event.target as HTMLElement;

    // Ignore clicks on the anchor so it will be closed by the anchor's click handler
    if (this.anchor && event.composedPath().includes(this.anchor)) {
      return;
    }

    // Detect when clicks occur outside the popover
    if (target.closest('wa-popover') !== this) {
      this.open = false;
    }
  };

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

      // Close other popovers that are open
      openPopovers.forEach(popover => (popover.open = false));

      document.addEventListener('keydown', this.handleDocumentKeyDown, { signal: this.eventController.signal });
      document.addEventListener('click', this.handleDocumentClick, { signal: this.eventController.signal });

      // Show the dialog non-modally
      this.dialog.show();
      this.popup.active = true;
      openPopovers.add(this);

      // Autofocus the first element with the autofocus attribute
      requestAnimationFrame(() => {
        const elementToFocus = this.querySelector<HTMLElement>('[autofocus]');
        if (elementToFocus && typeof elementToFocus.focus === 'function') {
          elementToFocus.focus();
        } else {
          // Fall back to setting focus on the dialog
          this.dialog.focus();
        }
      });

      await animateWithClass(this.popup.popup, 'show-with-scale');
      this.popup.reposition();

      this.dispatchEvent(new WaAfterShowEvent());
    } else {
      // Hide
      const waHideEvent = new WaHideEvent();
      this.dispatchEvent(waHideEvent);
      if (waHideEvent.defaultPrevented) {
        this.open = true;
        return;
      }

      document.removeEventListener('keydown', this.handleDocumentKeyDown);
      document.removeEventListener('click', this.handleDocumentClick);

      openPopovers.delete(this);

      await animateWithClass(this.popup.popup, 'hide-with-scale');
      this.popup.active = false;
      this.dialog.close();

      this.dispatchEvent(new WaAfterHideEvent());
    }
  }

  @watch('for')
  handleForChange() {
    const rootNode = this.getRootNode() as Document | ShadowRoot | null;

    if (!rootNode) {
      return;
    }

    const newAnchor = this.for ? rootNode.getElementById(this.for) : null;
    const oldAnchor = this.anchor;

    if (newAnchor === oldAnchor) {
      return;
    }

    const { signal } = this.eventController;

    if (newAnchor) {
      newAnchor.addEventListener('click', this.handleAnchorClick, { signal });
    }

    if (oldAnchor) {
      oldAnchor.removeEventListener('click', this.handleAnchorClick);
    }

    this.anchor = newAnchor;

    if (this.for && !newAnchor) {
      console.warn(
        `A popover was assigned to an element with an ID of "${this.for}" but the element could not be found.`,
        this,
      );
    }
  }

  @watch(['distance', 'placement', 'skidding'])
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }

  /** Shows the popover. */
  async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'wa-after-show');
  }

  /** Hides the popover. */
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'wa-after-hide');
  }

  render() {
    return html`
      <dialog part="dialog" class="dialog">
        <wa-popup
          part="popup"
          exportparts="
            popup:popup__popup,
            arrow:popup__arrow
          "
          class=${classMap({
            popover: true,
            'popover-open': this.open,
          })}
          placement=${this.placement}
          distance=${this.distance}
          skidding=${this.skidding}
          flip
          shift
          ?arrow=${!this.withoutArrow}
          .anchor=${this.anchor}
        >
          <div part="body" class="body" @click=${this.handleBodyClick}>
            <slot></slot>
          </div>
        </wa-popup>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-popover': WaPopover;
  }
}
