import { animateWithClass } from '../../internal/animate.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html } from 'lit';
import { uniqueId } from '../../internal/math.js';
import { WaAfterHideEvent } from '../../events/after-hide.js';
import { WaAfterShowEvent } from '../../events/after-show.js';
import { WaHideEvent } from '../../events/hide.js';
import { waitForEvent } from '../../internal/event.js';
import { WaShowEvent } from '../../events/show.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './tooltip.styles.js';
import WaPopup from '../popup/popup.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Tooltips display additional information based on a specific action.
 * @documentation https://backers.webawesome.com/docs/components/tooltip
 * @status stable
 * @since 2.0
 *
 * @dependency wa-popup
 *
 * @slot - The tooltip's default slot where any content should live. Interactive content should be avoided.
 *
 * @event wa-show - Emitted when the tooltip begins to show.
 * @event wa-after-show - Emitted after the tooltip has shown and all animations are complete.
 * @event wa-hide - Emitted when the tooltip begins to hide.
 * @event wa-after-hide - Emitted after the tooltip has hidden and all animations are complete.
 *
 * @csspart base - The component's base wrapper, an `<wa-popup>` element.
 * @csspart base__popup - The popup's exported `popup` part. Use this to target the tooltip's popup container.
 * @csspart base__arrow - The popup's exported `arrow` part. Use this to target the tooltip's arrow.
 * @csspart body - The tooltip's body where its content is rendered.
 *
 * @cssproperty --background-color - The tooltip's background color.
 * @cssproperty --border-radius - The radius of the tooltip's corners.
 * @cssproperty --content-color - The color of the tooltip's content.
 * @cssproperty --max-width - The maximum width of the tooltip before its content will wrap.
 * @cssproperty --padding - The padding within the tooltip.
 * @cssproperty --hide-delay - The amount of time to wait before hiding the tooltip when hovering.
 * @cssproperty --show-delay - The amount of time to wait before showing the tooltip when hovering.
 */
@customElement('wa-tooltip')
export default class WaTooltip extends WebAwesomeElement {
  static styles: CSSResultGroup = [componentStyles, styles];
  static dependencies = { 'wa-popup': WaPopup };

  private hoverTimeout: number;
  private closeWatcher: CloseWatcher | null;

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('.tooltip__body') body: HTMLElement;
  @query('wa-popup') popup: WaPopup;

  /**
   * The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip
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

  /** Disables the tooltip so it won't show when triggered. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The distance in pixels from which to offset the tooltip away from its target. */
  @property({ type: Number }) distance = 8;

  /** Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** The distance in pixels from which to offset the tooltip along its target. */
  @property({ type: Number }) skidding = 0;

  /** The amount of time to wait before showing the tooltip when the user mouses in. */
  @property({ attribute: 'show-delay', type: Number }) showDelay = 150;

  /** The amount of time to wait before hiding the tooltip when the user mouses out.. */
  @property({ attribute: 'hide-delay', type: Number }) hideDelay = 0;

  /**
   * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
   * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
   * programmatically.
   */
  @property() trigger = 'hover focus';

  /**
   * Enable this option to prevent the tooltip from being clipped when the component is placed inside a container with
   * `overflow: auto|hidden|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all,
   * scenarios.
   */
  @property({ type: Boolean }) hoist = false;

  @property() for: null | string = null;

  @state() anchor: null | Element = null;

  private eventController = new AbortController();

  connectedCallback() {
    super.connectedCallback();

    // If the user doesn't give us an id, generate one.
    if (!this.id) {
      this.id = uniqueId('wa-tooltip-');
    }
  }

  disconnectedCallback() {
    // Cleanup this event in case the tooltip is removed while open
    this.closeWatcher?.destroy();
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    this.eventController.abort();

    if (this.anchor) {
      const label = this.anchor.getAttribute('aria-labelledby') || '';
      this.anchor.setAttribute('aria-labelledby', label.replace(this.id, ''));
    }
  }

  firstUpdated() {
    this.body.hidden = !this.open;

    // If the tooltip is visible on init, update its position
    if (this.open) {
      this.popup.active = true;
      this.popup.reposition();
    }
  }

  private handleBlur = () => {
    if (this.hasTrigger('focus')) {
      this.hide();
    }
  };

  private handleClick = () => {
    if (this.hasTrigger('click')) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }
  };

  private handleFocus = () => {
    if (this.hasTrigger('focus')) {
      this.show();
    }
  };

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    // Pressing escape when a tooltip is open should dismiss it
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.hide();
    }
  };

  private handleMouseOver = () => {
    if (this.hasTrigger('hover')) {
      clearTimeout(this.hoverTimeout);

      this.hoverTimeout = window.setTimeout(() => this.show(), this.showDelay);
    }
  };

  private handleMouseOut = () => {
    if (this.hasTrigger('hover')) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => this.hide(), this.hideDelay);
    }
  };

  private hasTrigger(triggerType: string) {
    const triggers = this.trigger.split(' ');
    return triggers.includes(triggerType);
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      if (this.disabled) {
        return;
      }

      // Show
      const waShowEvent = new WaShowEvent();
      this.dispatchEvent(waShowEvent);
      if (waShowEvent.defaultPrevented) {
        this.open = false;
        return;
      }

      if ('CloseWatcher' in window) {
        this.closeWatcher?.destroy();
        this.closeWatcher = new CloseWatcher();
        this.closeWatcher.onclose = () => {
          this.hide();
        };
      } else {
        document.addEventListener('keydown', this.handleDocumentKeyDown, { signal: this.eventController.signal });
      }

      this.body.hidden = false;
      this.popup.active = true;
      await animateWithClass(this.popup.popup, 'show-with-scale');
      this.popup.reposition();

      this.dispatchEvent(new WaAfterShowEvent());
    } else {
      // Hide
      const waHideEvent = new WaHideEvent();
      this.dispatchEvent(waHideEvent);
      if (waHideEvent.defaultPrevented) {
        this.open = false;
        return;
      }

      this.closeWatcher?.destroy();
      document.removeEventListener('keydown', this.handleDocumentKeyDown);

      await animateWithClass(this.popup.popup, 'hide-with-scale');
      this.popup.active = false;
      this.body.hidden = true;

      this.dispatchEvent(new WaAfterHideEvent());
    }
  }

  @watch('for')
  handleForChange() {
    const rootNode = this.getRootNode() as Document | ShadowRoot | null;

    if (!rootNode) {
      return;
    }

    const newAnchor = this.for ? rootNode.querySelector(`#${this.for}`) : null;
    const oldAnchor = this.anchor;

    if (newAnchor === oldAnchor) {
      return;
    }

    const { signal } = this.eventController;

    // "\\b" is a space boundary, used for making sure we dont add the tooltip to aria-labelledby twice.
    const labelRegex = new RegExp(`\\b${this.id}\\b`);

    if (newAnchor) {
      /**
       * We use `aria-labelledby` because it seems to have the most consistent screenreader experience.
       * Particularly for our "special" focusable elements like `<wa-button>`, `<wa-input>` etc.
       * aria-describedby usually in some screenreaders is required to be on the actually focusable element,
       * whereas with `aria-labelledby` it'll still read on first focus. The APG does and WAI-ARIA does recommend aria-describedby
       * so perhaps once we have cross-root aria, we can revisit this decision.
       */
      const currentLabel = newAnchor.getAttribute('aria-labelledby') || '';
      if (!currentLabel.match(labelRegex)) {
        newAnchor.setAttribute('aria-labelledby', currentLabel + ' ' + this.id);
      }

      newAnchor.addEventListener('blur', this.handleBlur, { capture: true, signal });
      newAnchor.addEventListener('focus', this.handleFocus, { capture: true, signal });
      newAnchor.addEventListener('click', this.handleClick, { signal });
      newAnchor.addEventListener('mouseover', this.handleMouseOver, { signal });
      newAnchor.addEventListener('mouseout', this.handleMouseOut, { signal });
    }

    if (oldAnchor) {
      const label = oldAnchor.getAttribute('aria-labelledby') || '';
      oldAnchor.setAttribute('aria-labelledby', label.replace(labelRegex, ''));
      oldAnchor.removeEventListener('blur', this.handleBlur, { capture: true });
      oldAnchor.removeEventListener('focus', this.handleFocus, { capture: true });
      oldAnchor.removeEventListener('click', this.handleClick);
      oldAnchor.removeEventListener('mouseover', this.handleMouseOver);
      oldAnchor.removeEventListener('mouseout', this.handleMouseOut);
    }

    this.anchor = newAnchor;
  }

  @watch(['distance', 'hoist', 'placement', 'skidding'])
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }

  @watch('disabled')
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }

  /** Shows the tooltip. */
  async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'wa-after-show');
  }

  /** Hides the tooltip */
  async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'wa-after-hide');
  }

  render() {
    return html`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${classMap({
          tooltip: true,
          'tooltip--open': this.open
        })}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist ? 'fixed' : 'absolute'}
        flip
        shift
        arrow
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="tooltip__body">
          <slot></slot>
        </div>
      </wa-popup>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-tooltip': WaTooltip;
  }
}
