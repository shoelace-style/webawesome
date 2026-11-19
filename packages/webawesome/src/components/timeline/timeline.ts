import { html, isServer, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import '../timeline-item/timeline-item.js';
import type WaTimelineItem from '../timeline-item/timeline-item.js';
import styles from './timeline.styles.js';

/**
 * @summary Timelines lay out a chronological list of events, such as an order history, activity feed, or changelog.
 * @documentation https://webawesome.com/docs/components/timeline
 * @status experimental
 * @since 3.16
 *
 * @dependency wa-timeline-item
 *
 * @slot - One or more `<wa-timeline-item>` elements.
 *
 * @csspart timeline - The ordered list that lays out the items.
 *
 * @cssproperty [--gap=var(--wa-space-l)] - The space between items. Connectors are sized from this value, so set it
 *  here instead of setting `gap` on the `timeline` part. Use a length such as `0px`, not a bare `0`, to remove it.
 * @cssproperty --marker-size - The size of each item's marker. Usually set here so every item matches. When unset,
 *  a marker is `1em`, or `2em` when its item has an icon.
 * @cssproperty [--connector-color=var(--wa-color-neutral-fill-normal)] - The color of the connector line.
 * @cssproperty [--connector-width=var(--wa-border-width-m)] - The thickness of the connector line, in either
 *  orientation.
 * @cssproperty [--connector-gap=0.35em] - The gap between a marker's edge and the connector line. Use a length such
 *  as `0px`, not a bare `0`, to remove it.
 *
 * @ssr - During SSR, `<wa-timeline>` can't reach its items, so each item renders with the default start placement and
 *  start alignment until it hydrates. The list itself follows `orientation` and `marker-placement` right away, so a
 *  horizontal or alternating timeline doesn't lay out correctly until then. A server-rendered alternating timeline also
 *  starts out alternating and only stacks after it hydrates, if it's too narrow.
 */
@customElement('wa-timeline')
export default class WaTimeline extends WebAwesomeElement {
  static css = [styles];

  private resizeObserver?: ResizeObserver;

  @state() private isAlternateTooNarrow = false;

  /** The timeline's layout direction. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';

  /**
   * Which side of each item's content the marker sits on. `start` puts the marker before the content and `end` puts
   * it after. `alternate` switches sides on every other item, so the rail runs down the middle. An alternating timeline
   * narrower than 30em lays every item out like `start` until it has room. Only applies when `orientation` is
   * `vertical`.
   */
  @property({ attribute: 'marker-placement', reflect: true }) markerPlacement: 'start' | 'end' | 'alternate' = 'start';

  /**
   * Where the marker sits along its item. `start` lines it up with the first line of text. `center` centers it on the
   * item's full height and runs the connector behind it as one line, which suits cards. Only applies when
   * `orientation` is `vertical`.
   */
  @property({ attribute: 'marker-alignment', reflect: true }) markerAlignment: 'start' | 'center' = 'start';

  /** A label that describes the timeline to assistive devices. Especially useful when more than one is on the page. */
  @property() label = '';

  connectedCallback() {
    super.connectedCallback();

    // SSR guard: the items can't be reached during server-side rendering.
    if (isServer) return;

    this.updateComplete.then(() => {
      if (this.isConnected) this.syncItems();
    });

    this.resizeObserver = new ResizeObserver(entries => {
      // Stacking changes the timeline's height, so apply it on the next frame to keep the observer from reporting an
      // undelivered-notifications loop.
      requestAnimationFrame(() => {
        for (const entry of entries) {
          this.updateStacking(entry.borderBoxSize[0].inlineSize);
        }
      });
    });
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  private handleSlotChange() {
    this.syncItems();
  }

  private getAllItems() {
    return [...this.children].filter(el => el.localName === 'wa-timeline-item') as WaTimelineItem[];
  }

  /**
   * Decides whether an alternating timeline stacks at the given width. Below 30em, the columns on either side of
   * the rail get too narrow to read.
   */
  private updateStacking(width: number) {
    if (this.markerPlacement !== 'alternate' || !this.isLaidOutVertically()) {
      this.isAlternateTooNarrow = false;
      return;
    }

    const fontSize = parseFloat(getComputedStyle(this).fontSize);
    this.isAlternateTooNarrow = width < fontSize * 30;
  }

  private isLaidOutVertically() {
    return this.orientation !== 'horizontal';
  }

  private isAlternating() {
    return this.isLaidOutVertically() && this.markerPlacement === 'alternate' && !this.isAlternateTooNarrow;
  }

  /** Hands each item its layout as `data-wa-timeline-*` attributes. */
  private syncItems() {
    const items = this.getAllItems();

    // Measure now rather than waiting for the observer, so a narrow timeline never draws one frame alternating.
    // offsetWidth ignores transforms, so a dialog scaling in doesn't make the timeline read as narrow.
    this.updateStacking(this.offsetWidth);

    const isVertical = this.isLaidOutVertically();
    const isAlternating = this.isAlternating();

    items.forEach((item, index) => {
      let placement = '';
      if (isVertical && this.markerPlacement === 'end') placement = 'end';
      if (isAlternating) placement = index % 2 === 0 ? 'alternate-start' : 'alternate-end';

      item.toggleAttribute('data-wa-timeline-horizontal', !isVertical);
      item.toggleAttribute('data-wa-timeline-center', isVertical && this.markerAlignment === 'center');
      if (placement) {
        item.setAttribute('data-wa-timeline-placement', placement);
      } else {
        item.removeAttribute('data-wa-timeline-placement');
      }
    });
  }

  @watch(['orientation', 'markerPlacement', 'markerAlignment', 'isAlternateTooNarrow'], { waitUntilFirstUpdate: true })
  handleLayoutChange() {
    this.syncItems();
  }

  render() {
    const isVertical = this.isLaidOutVertically();

    return html`
      <ol
        part="timeline"
        class=${classMap({
          timeline: true,
          row: !isVertical,
          end: isVertical && this.markerPlacement === 'end',
          alternating: this.isAlternating(),
        })}
        role="list"
        aria-label=${this.label || nothing}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </ol>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-timeline': WaTimeline;
  }
}
