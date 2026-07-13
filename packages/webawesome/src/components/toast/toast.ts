import { animate, prefersReducedMotion } from '../../internal/animate.js';
import { uniqueId } from '../../internal/math.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { html, isServer } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import '../toast-item/toast-item.js';
import type WaToastItem from '../toast-item/toast-item.js';
import styles from './toast.styles.js';

export interface ToastIconOptions {
  /** The name of the icon to draw. */
  name: string;
  /** The name of a registered custom icon library. */
  library?: string;
  /** The family of icons to choose from (e.g., 'classic', 'brands', 'duotone', 'sharp', 'sharp-duotone'). */
  family?: string;
  /** The icon variant (e.g., 'thin', 'light', 'regular', 'solid'). */
  variant?: string;
}

// One shared container per page hosts all toast announcements
let sharedLiveRegionContainer: HTMLDivElement | null = null;
let sharedLiveRegionRefCount = 0;

function mountSharedLiveRegions() {
  sharedLiveRegionRefCount += 1;
  if (sharedLiveRegionContainer || typeof document === 'undefined') return;

  const container = document.createElement('div');
  container.id = uniqueId('wa-toast-live-region-');
  container.setAttribute('data-wa-toast-live-region', '');
  container.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip-path: inset(50%);
    pointer-events: none;
    top: 0;
    left: 0;
  `;

  document.body.append(container);
  sharedLiveRegionContainer = container;
}

function unmountSharedLiveRegions() {
  sharedLiveRegionRefCount = Math.max(0, sharedLiveRegionRefCount - 1);
  if (sharedLiveRegionRefCount > 0) return;

  sharedLiveRegionContainer?.remove();
  sharedLiveRegionContainer = null;
}

function announceViaSharedLiveRegion(text: string, variant: ToastCreateOptions['variant']) {
  if (typeof document === 'undefined') return;
  const container = sharedLiveRegionContainer;
  if (!container) return;

  const trimmed = text.trim();
  if (!trimmed) return;

  // Mount an empty live-region, inject the text, then remove the node after a second. This seems to be more reliable
  // for screen readers and is a similar pattern to what other libraries such as Radix use.
  const announcer = document.createElement('div');
  announcer.setAttribute('role', variant === 'danger' ? 'alert' : 'status');
  announcer.setAttribute('aria-live', variant === 'danger' ? 'assertive' : 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  container.append(announcer);

  // Double rAF. The first frame gets the empty announcer into the a11y tree. The second frame injects the text.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      announcer.textContent = trimmed;
    });
  });

  // Clean up the announcer node after the screen reader has time to read it
  setTimeout(() => announcer.remove(), 1000);
}

export interface ToastCreateOptions {
  /**
   * Set to true to process the message as HTML instead of plain text. Make sure you trust the content, otherwise your
   * app may become vulnerable to XSS exploits!
   */
  allowHtml?: boolean;
  /**
   * The length of time in milliseconds to show the notification before removing it. Set to 0 to keep the notification
   * open until the user dismisses it.
   */
  duration?: number;
  /**
   * An optional icon to display at the start of the toast item. Can be a string (icon name) or an object with
   * additional icon options like library, family, and variant.
   */
  icon?: string | ToastIconOptions;
  /** The toast item's variant. */
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
  /** The toast item's size. */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'small' | 'medium' | 'large';
}

/**
 * @summary Toasts display brief, non-blocking notifications that appear temporarily above the page content.
 * @documentation https://webawesome.com/docs/components/toast
 * @status stable
 * @since 3.3
 *
 * @dependency wa-toast-item
 *
 * @slot - Place `<wa-toast-item>` elements here to show them as notifications.
 *
 * @csspart stack - The container that holds the toast items.
 *
 * @cssproperty [--gap=var(--wa-space-s)] - The gap between stacked toast items.
 * @cssproperty [--width=28rem] - The width of the toast stack.
 *
 * @cssstate visible - Applied when the toast stack has one or more visible toast items.
 */
@customElement('wa-toast')
export default class WaToast extends WebAwesomeElement {
  static css = styles;

  private activatedToastItems = new WeakSet<WaToastItem>();
  private positionCache = new Map<Element, DOMRect>();

  @query('.stack') stack: HTMLElement;

  /** The placement of the toast stack on the screen. */
  @property({ reflect: true }) placement:
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end' = 'top-end';

  connectedCallback() {
    super.connectedCallback();

    // SSR guard: browser APIs are not available during server-side rendering
    if (!isServer) {
      this.popover = 'manual';
      mountSharedLiveRegions();
      document.addEventListener('keydown', this.handleDocumentKeyDown);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener?.('keydown', this.handleDocumentKeyDown);
    unmountSharedLiveRegions();
  }

  private handleDocumentKeyDown = async (event: KeyboardEvent) => {
    // Give other keydown listeners a chance to respond first
    await new Promise(resolve => setTimeout(resolve));

    // Dismiss the most recent toast item when Escape is pressed
    if (event.key === 'Escape' && !event.defaultPrevented) {
      const toastItems = this.getToastItems();
      if (toastItems.length > 0) {
        event.preventDefault();
        const mostRecent = toastItems[toastItems.length - 1];
        mostRecent?.hide();
      }
    }
  };

  private handleSlotChange() {
    const toastItems = this.getToastItems();
    const newItems: WaToastItem[] = [];

    // Find any toast items that haven't been activated yet
    toastItems.forEach(toastItem => {
      if (!this.activatedToastItems.has(toastItem)) {
        newItems.push(toastItem);
      }
    });

    if (newItems.length > 0) {
      // Capture positions before activating new items for FLIP animation
      this.capturePositions();

      newItems.forEach(toastItem => {
        this.activatedToastItems.add(toastItem);
        this.showStack();
        toastItem.startTimer();
        this.announceToastItem(toastItem);
      });

      // Animate existing items to new positions
      requestAnimationFrame(() => this.animatePositions());
    }
  }

  private announceToastItem(toastItem: WaToastItem) {
    announceViaSharedLiveRegion(toastItem.textContent ?? '', toastItem.variant);
  }

  private handleAfterHide = async (event: Event) => {
    const toastItem = event.target as WaToastItem;

    // Remove the toast item from the DOM after it's hidden
    if (toastItem.parentElement === this) {
      // Capture positions BEFORE removing the item for FLIP animation
      this.capturePositions();

      toastItem.remove();

      // Animate remaining items to their new positions
      await this.animatePositions();
    }

    // Hide the stack if there are no more toast items
    if (this.getToastItems().length === 0) {
      this.hideStack();
    }
  };

  private getToastItems(): WaToastItem[] {
    return [...this.querySelectorAll<WaToastItem>(':scope > wa-toast-item')];
  }

  /** Captures the current position of all toast items for FLIP animation. */
  private capturePositions() {
    this.positionCache.clear();
    for (const item of this.getToastItems()) {
      this.positionCache.set(item, item.getBoundingClientRect());
    }
  }

  /** Animates toast items from their cached positions to their new positions using FLIP. */
  private async animatePositions() {
    if (prefersReducedMotion()) {
      this.positionCache.clear();
      return;
    }

    const animations: Promise<unknown>[] = [];

    for (const item of this.getToastItems()) {
      const oldRect = this.positionCache.get(item);
      if (!oldRect) continue; // New item, skip FLIP (it has its own enter animation)

      const newRect = item.getBoundingClientRect();
      const deltaY = oldRect.top - newRect.top;

      if (Math.abs(deltaY) > 1) {
        // Only animate meaningful movements
        const animation = animate(item, [{ transform: `translateY(${deltaY}px)` }, { transform: 'translateY(0)' }], {
          duration: 200,
          easing: 'cubic-bezier(0.2, 0, 0, 1)', // Material Design standard easing
        });
        animations.push(animation);
      }
    }

    this.positionCache.clear();
    await Promise.all(animations);
  }

  private showStack() {
    if (!this.matches(':popover-open')) {
      this.showPopover();
      this.customStates.set('visible', true);
    }
  }

  private hideStack() {
    if (this.matches(':popover-open')) {
      this.hidePopover();
      this.customStates.set('visible', false);
    }
  }

  /**
   * Creates a toast notification programmatically and adds it to the stack. Returns a reference to the created toast
   * item element.
   */
  async create(message: string, options?: ToastCreateOptions): Promise<WaToastItem> {
    const opts: ToastCreateOptions = {
      allowHtml: false,
      duration: 5000,
      variant: 'neutral',
      size: 'm',
      ...options,
    };

    const toastItem = document.createElement('wa-toast-item') as WaToastItem;
    toastItem.variant = opts.variant!;
    toastItem.size = opts.size!;
    toastItem.duration = opts.duration!;

    // Set the message content
    if (opts.allowHtml) {
      toastItem.innerHTML = message;
    } else {
      toastItem.textContent = message;
    }

    // Add an icon if provided
    if (opts.icon) {
      const icon = document.createElement('wa-icon');
      icon.setAttribute('slot', 'icon');

      if (typeof opts.icon === 'string') {
        icon.setAttribute('name', opts.icon);
      } else {
        icon.setAttribute('name', opts.icon.name);
        if (opts.icon.library) {
          icon.setAttribute('library', opts.icon.library);
        }
        if (opts.icon.family) {
          icon.setAttribute('family', opts.icon.family);
        }
        if (opts.icon.variant) {
          icon.setAttribute('variant', opts.icon.variant);
        }
      }

      toastItem.prepend(icon);
    }

    // Track this toast item so slotchange doesn't double-activate it
    this.activatedToastItems.add(toastItem);

    // Capture positions BEFORE adding the item for FLIP animation
    this.capturePositions();

    // Show the stack and add the toast item
    this.showStack();
    this.prepend(toastItem);

    // Wait for the element to be connected
    await toastItem.updateComplete;

    // Animate existing items to new positions (in parallel with new item's show animation)
    this.animatePositions();

    toastItem.startTimer();

    this.announceToastItem(toastItem);

    return toastItem;
  }

  render() {
    return html`
      <div part="stack" class="stack" @wa-after-hide=${this.handleAfterHide}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-toast': WaToast;
  }
}
