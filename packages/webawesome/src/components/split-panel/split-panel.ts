import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { WaRepositionEvent } from '../../events/reposition.js';
import { drag } from '../../internal/drag.js';
import { clamp } from '../../internal/math.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import styles from './split-panel.styles.js';

/**
 * @summary Split panels display two adjacent panels, allowing the user to reposition them.
 * @documentation https://webawesome.com/docs/components/split-panel
 * @status stable
 * @since 2.0
 *
 * @event wa-reposition - Emitted when the divider's position changes.
 *
 * @slot start - Content to place in the start panel.
 * @slot end - Content to place in the end panel.
 * @slot divider - The divider. Useful for slotting in a custom icon that renders as a handle.
 *
 * @csspart start - The start panel.
 * @csspart end - The end panel.
 * @csspart panel - Targets both the start and end panels.
 * @csspart divider - The divider that separates the start and end panels.
 *
 * @cssproperty [--divider-width=4px] - The width of the visible divider.
 * @cssproperty [--divider-hit-area=12px] - The invisible region around the divider where dragging can occur. This is
 *  usually wider than the divider to facilitate easier dragging.
 * @cssproperty [--min=0] - The minimum allowed size of the primary panel.
 * @cssproperty [--max=100%] - The maximum allowed size of the primary panel.
 */
@customElement('wa-split-panel')
export default class WaSplitPanel extends WebAwesomeElement {
  static css = styles;

  private cachedPositionInPixels: number;
  private isCollapsed = false;
  private readonly localize = new LocalizeController(this);
  private positionBeforeCollapsing = 0;
  private resizeObserver: ResizeObserver;
  private size: number;

  @query('.divider') divider: HTMLElement;

  /**
   * The current position of the divider from the primary panel's edge as a percentage 0-100. Defaults to 50% of the
   * container's initial size.
   */
  @property({ type: Number, reflect: true }) position = 50;

  /** The current position of the divider from the primary panel's edge in pixels. */
  @property({ attribute: 'position-in-pixels', type: Number }) positionInPixels: number;

  /** Sets the split panel's orientation. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Disables resizing. Note that the position may still change as a result of resizing the host element. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * If no primary panel is designated, both panels will resize proportionally when the host element is resized. If a
   * primary panel is designated, it will maintain its size and the other panel will grow or shrink as needed when the
   * host element is resized.
   */
  @property() primary?: 'start' | 'end';

  /**
   * One or more space-separated values at which the divider should snap. Values can be in pixels or percentages, e.g.
   * `"100px 50%"`.
   */
  @property() snap?: string;

  /** How close the divider must be to a snap point until snapping occurs. */
  @property({ type: Number, attribute: 'snap-threshold' }) snapThreshold = 12;

  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(entries => this.handleResize(entries));
    this.updateComplete.then(() => this.resizeObserver.observe(this));

    this.detectSize();
    this.cachedPositionInPixels = this.percentageToPixels(this.position);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.unobserve(this);
  }

  private detectSize() {
    const { width, height } = this.getBoundingClientRect();
    this.size = this.orientation === 'vertical' ? height : width;
  }

  private percentageToPixels(value: number) {
    return this.size * (value / 100);
  }

  private pixelsToPercentage(value: number) {
    return (value / this.size) * 100;
  }

  private handleDrag(event: PointerEvent) {
    const isRtl = this.hasUpdated ? this.localize.dir() === 'rtl' : this.dir === 'rtl';

    if (this.disabled) {
      return;
    }

    // Prevent text selection when dragging
    if (event.cancelable) {
      event.preventDefault();
    }

    drag(this, {
      onMove: (x, y) => {
        let newPositionInPixels = this.orientation === 'vertical' ? y : x;

        // Flip for end panels
        if (this.primary === 'end') {
          newPositionInPixels = this.size - newPositionInPixels;
        }

        // Check snap points
        if (this.snap) {
          const snaps = this.snap.split(' ');

          snaps.forEach(value => {
            let snapPoint: number;

            if (value.endsWith('%')) {
              snapPoint = this.size * (parseFloat(value) / 100);
            } else {
              snapPoint = parseFloat(value);
            }

            if (isRtl && this.orientation === 'horizontal') {
              snapPoint = this.size - snapPoint;
            }

            if (
              newPositionInPixels >= snapPoint - this.snapThreshold &&
              newPositionInPixels <= snapPoint + this.snapThreshold
            ) {
              newPositionInPixels = snapPoint;
            }
          });
        }

        this.position = clamp(this.pixelsToPercentage(newPositionInPixels), 0, 100);
      },
      initialEvent: event,
    });
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Enter'].includes(event.key)) {
      let newPosition = this.position;
      const incr = (event.shiftKey ? 10 : 1) * (this.primary === 'end' ? -1 : 1);

      event.preventDefault();

      if (
        (event.key === 'ArrowLeft' && this.orientation === 'horizontal') ||
        (event.key === 'ArrowUp' && this.orientation === 'vertical')
      ) {
        newPosition -= incr;
      }

      if (
        (event.key === 'ArrowRight' && this.orientation === 'horizontal') ||
        (event.key === 'ArrowDown' && this.orientation === 'vertical')
      ) {
        newPosition += incr;
      }

      if (event.key === 'Home') {
        newPosition = this.primary === 'end' ? 100 : 0;
      }

      if (event.key === 'End') {
        newPosition = this.primary === 'end' ? 0 : 100;
      }

      // Collapse/expand the primary panel when enter is pressed
      if (event.key === 'Enter') {
        if (this.isCollapsed) {
          newPosition = this.positionBeforeCollapsing;
          this.isCollapsed = false;
        } else {
          const positionBeforeCollapsing = this.position;

          newPosition = 0;

          // Wait for position to update before setting the collapsed state
          requestAnimationFrame(() => {
            this.isCollapsed = true;
            this.positionBeforeCollapsing = positionBeforeCollapsing;
          });
        }
      }

      this.position = clamp(newPosition, 0, 100);
    }
  }

  private handleResize(entries: ResizeObserverEntry[]) {
    const { width, height } = entries[0].contentRect;
    this.size = this.orientation === 'vertical' ? height : width;

    // There's some weird logic that gets `this.cachedPositionInPixels = NaN` or `this.position === Infinity` when
    // a split-panel goes from `display: none;` to showing.
    if (isNaN(this.cachedPositionInPixels) || this.position === Infinity) {
      this.cachedPositionInPixels = Number(this.getAttribute('position-in-pixels'));
      this.positionInPixels = Number(this.getAttribute('position-in-pixels'));
      this.position = this.pixelsToPercentage(this.positionInPixels);
    }

    // Resize when a primary panel is set
    if (this.primary) {
      this.position = this.pixelsToPercentage(this.cachedPositionInPixels);
    }
  }

  @watch('position')
  handlePositionChange() {
    this.cachedPositionInPixels = this.percentageToPixels(this.position);
    this.positionInPixels = this.percentageToPixels(this.position);
    this.isCollapsed = false;
    this.positionBeforeCollapsing = 0;
    this.dispatchEvent(new WaRepositionEvent());
  }

  @watch('positionInPixels')
  handlePositionInPixelsChange() {
    this.position = this.pixelsToPercentage(this.positionInPixels);
  }

  @watch('vertical')
  handleVerticalChange() {
    this.detectSize();
  }

  render() {
    const gridTemplate = this.orientation === 'vertical' ? 'gridTemplateRows' : 'gridTemplateColumns';
    const gridTemplateAlt = this.orientation === 'vertical' ? 'gridTemplateColumns' : 'gridTemplateRows';
    const isRtl = this.hasUpdated ? this.localize.dir() === 'rtl' : this.dir === 'rtl';
    const primary = `
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `;
    const secondary = 'auto';

    // @TODO: Create an actual fix for this. [Konnor]
    if (!this.style) {
      // @ts-expect-error `this.style` doesn't exist on the server.
      this.style = {};
    }

    if (this.primary === 'end') {
      if (isRtl && this.orientation === 'horizontal') {
        this.style[gridTemplate] = `${primary} var(--divider-width) ${secondary}`;
      } else {
        this.style[gridTemplate] = `${secondary} var(--divider-width) ${primary}`;
      }
    } else {
      if (isRtl && this.orientation === 'horizontal') {
        this.style[gridTemplate] = `${secondary} var(--divider-width) ${primary}`;
      } else {
        this.style[gridTemplate] = `${primary} var(--divider-width) ${secondary}`;
      }
    }

    // Unset the alt grid template property
    this.style[gridTemplateAlt] = '';

    return html`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${ifDefined(this.disabled ? undefined : '0')}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term('resize')}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-split-panel': WaSplitPanel;
  }
}
