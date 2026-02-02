import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { WaIntersectEvent } from '../../events/intersect.js';
import { clamp } from '../../internal/math.js';
import { parseSpaceDelimitedTokens } from '../../internal/parse.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './intersection-observer.styles.js';

/**
 * @summary Tracks immediate child elements and fires events as they move in and out of view.
 * @documentation https://webawesome.com/docs/components/intersection-observer
 * @status stable
 * @since 2.0
 *
 * @slot - Elements to track. Only immediate children of the host are monitored.
 *
 * @event {{ entry: IntersectionObserverEntry }} wa-intersect - Fired when a tracked element begins or ceases intersecting.
 */
@customElement('wa-intersection-observer')
export default class WaIntersectionObserver extends WebAwesomeElement {
  static css = styles;

  private intersectionObserver: IntersectionObserver | null = null;
  private observedElements = new Map<Element, boolean>();

  /** Element ID to define the viewport boundaries for tracked targets. */
  @property() root: string | null = null;

  /** Offset space around the root boundary. Accepts values like CSS margin syntax. */
  @property({ attribute: 'root-margin' }) rootMargin = '0px';

  /** One or more space-separated values representing visibility percentages that trigger the observer callback. */
  @property() threshold = '0';

  /**
   * CSS class applied to elements during intersection. Automatically removed when elements leave
   * the viewport, enabling pure CSS styling based on visibility state.
   */
  @property({ attribute: 'intersect-class' }) intersectClass = '';

  /** If enabled, observation ceases after initial intersection. */
  @property({ type: Boolean, reflect: true }) once = false;

  /** Deactivates the intersection observer functionality. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();

    if (!this.disabled) {
      this.updateComplete.then(() => {
        this.startObserver();
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopObserver();
  }

  private handleSlotChange() {
    if (!this.disabled) {
      this.startObserver();
    }
  }

  /** Converts threshold property string into numeric array. */
  private parseThreshold(): number[] {
    const tokens = parseSpaceDelimitedTokens(this.threshold);
    return tokens.map((token: string) => {
      const num = parseFloat(token);
      return isNaN(num) ? 0 : clamp(num, 0, 1);
    });
  }

  /** Locates and returns the root element using the specified ID. */
  private resolveRoot(): Element | null {
    if (!this.root) return null;

    try {
      const doc = this.getRootNode() as Document | ShadowRoot;
      const target = doc.getElementById(this.root);

      if (!target) {
        console.warn(`Root element with ID "${this.root}" could not be found.`, this);
      }

      return target;
    } catch {
      console.warn(`Invalid selector for root: "${this.root}"`, this);
      return null;
    }
  }

  /** Initializes or reinitializes the intersection observer instance. */
  private startObserver() {
    this.stopObserver();

    // Skip setup if functionality is disabled
    if (this.disabled) return;

    // Convert threshold string to numeric values
    const threshold = this.parseThreshold();

    // Locate the root boundary element
    const rootElement = this.resolveRoot();

    // Set up unified observer for all child elements
    this.intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const wasIntersecting = this.observedElements.get(entry.target) ?? false;
          const isIntersecting = entry.isIntersecting;

          // Record current intersection state
          this.observedElements.set(entry.target, isIntersecting);

          // Toggle intersection class based on visibility
          if (this.intersectClass) {
            if (isIntersecting) {
              entry.target.classList.add(this.intersectClass);
            } else {
              entry.target.classList.remove(this.intersectClass);
            }
          }

          // Emit the intersection event
          const changeEvent = new WaIntersectEvent({ entry });
          this.dispatchEvent(changeEvent);

          if (isIntersecting && !wasIntersecting) {
            // When once mode is active, cease tracking after first intersection
            if (this.once) {
              this.intersectionObserver?.unobserve(entry.target);
              this.observedElements.delete(entry.target);
            }
          }
        });
      },
      {
        root: rootElement,
        rootMargin: this.rootMargin,
        threshold,
      },
    );

    // Begin tracking all immediate child elements
    const slot = this.shadowRoot!.querySelector('slot');
    if (slot !== null) {
      const elements = slot.assignedElements({ flatten: true });
      elements.forEach(element => {
        this.intersectionObserver?.observe(element);
        // Set initial non-intersecting state
        this.observedElements.set(element, false);
      });
    }
  }

  /** Halts the intersection observer and cleans up. */
  private stopObserver() {
    // Clear intersection classes from all tracked elements before stopping
    if (this.intersectClass) {
      this.observedElements.forEach((_, element) => {
        element.classList.remove(this.intersectClass);
      });
    }

    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    this.observedElements.clear();
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    if (this.disabled) {
      this.stopObserver();
    } else {
      this.startObserver();
    }
  }

  @watch('root', { waitUntilFirstUpdate: true })
  @watch('rootMargin', { waitUntilFirstUpdate: true })
  @watch('threshold', { waitUntilFirstUpdate: true })
  handleOptionsChange() {
    this.startObserver();
  }

  render() {
    return html` <slot @slotchange=${this.handleSlotChange}></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-intersection-observer': WaIntersectionObserver;
  }
}
