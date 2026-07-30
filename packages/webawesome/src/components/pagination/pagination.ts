import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { WaBeforePageChangeEvent } from '../../events/before-page-change.js';
import { WaPageChangeEvent } from '../../events/page-change.js';
import { getDeepestActiveElement } from '../../internal/active-elements.js';
import { announce } from '../../internal/live-announcer.js';
import { clamp } from '../../internal/math.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import styles from './pagination.styles.js';

/** A single page entry in a pagination range. */
interface PaginationPageItem {
  type: 'page';
  /** The 1-based page number. */
  value: number;
}

/** An ellipsis entry, representing one or more collapsed pages. */
interface PaginationEllipsisItem {
  type: 'ellipsis';
  /** Which boundary this ellipsis collapses: `start` sits before the window, `end` sits after it. */
  position: 'start' | 'end';
}

type PaginationRangeItem = PaginationPageItem | PaginationEllipsisItem;

interface PaginationRangeOptions {
  /** The currently active page (1-based). */
  page: number;
  /** The total number of pages. */
  totalPages: number;
  /** The number of pages to show on each side of the current page. */
  siblingCount: number;
  /** The number of pages to always show at the start and end. */
  boundaryCount: number;
}

/** Produces an inclusive array of integers from `start` to `end`. */
function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return length > 0 ? Array.from({ length }, (_, i) => start + i) : [];
}

/**
 * Computes the items to render in a pagination control, collapsing long runs of pages into ellipses. A fixed number of
 * pages are pinned at each boundary and a window of siblings surrounds the current page.
 *
 * The total number of items (page numbers plus ellipses) stays **constant** across every page, so the control keeps a
 * consistent width as the user navigates. When the current page is near a boundary there's no ellipsis on that side, so
 * the freed slot is given to an extra page number instead of shrinking the control.
 */
function getPaginationRange(options: PaginationRangeOptions): PaginationRangeItem[] {
  const totalPages = Math.max(1, Math.trunc(options.totalPages));
  const page = Math.min(Math.max(1, Math.trunc(options.page)), totalPages);
  const siblingCount = Math.max(0, Math.trunc(options.siblingCount));
  const boundaryCount = Math.max(0, Math.trunc(options.boundaryCount));

  // The constant number of items to show: both boundary groups, the sibling window on each side of the current page,
  // the current page itself, and one slot for each of the two potential ellipses. If every page fits, show them all.
  const totalSlots = siblingCount * 2 + boundaryCount * 2 + 3;

  if (totalSlots >= totalPages) {
    return range(1, totalPages).map(value => ({ type: 'page', value }));
  }

  const firstMiddle = boundaryCount + 1; // first page after the start boundary
  const lastMiddle = totalPages - boundaryCount; // last page before the end boundary

  // The window of page numbers around the current page, clamped so it never overlaps the boundaries. When it bumps into
  // a boundary, shift the overflow to the opposite side rather than truncating it.
  let windowStart = page - siblingCount;
  let windowEnd = page + siblingCount;

  if (windowStart < firstMiddle) {
    windowEnd += firstMiddle - windowStart;
    windowStart = firstMiddle;
  }
  if (windowEnd > lastMiddle) {
    windowStart -= windowEnd - lastMiddle;
    windowEnd = lastMiddle;
  }
  windowStart = Math.max(windowStart, firstMiddle);
  windowEnd = Math.min(windowEnd, lastMiddle);

  // An ellipsis is only needed when there's a real gap between a boundary and the window. Each ellipsis we *don't* need
  // frees a slot, which we give back to the window so the total item count stays constant.
  let freedSlots = (windowStart > firstMiddle ? 0 : 1) + (windowEnd < lastMiddle ? 0 : 1);
  while (freedSlots > 0) {
    if (windowEnd < lastMiddle) {
      windowEnd++;
    } else if (windowStart > firstMiddle) {
      windowStart--;
    } else {
      break;
    }
    freedSlots--;
  }

  const showStartEllipsis = windowStart > firstMiddle;
  const showEndEllipsis = windowEnd < lastMiddle;

  const items: PaginationRangeItem[] = [];
  range(1, boundaryCount).forEach(value => items.push({ type: 'page', value }));
  if (showStartEllipsis) items.push({ type: 'ellipsis', position: 'start' });
  range(windowStart, windowEnd).forEach(value => items.push({ type: 'page', value }));
  if (showEndEllipsis) items.push({ type: 'ellipsis', position: 'end' });
  range(totalPages - boundaryCount + 1, totalPages).forEach(value => items.push({ type: 'page', value }));

  return items;
}

/**
 * @summary Pagination splits long lists of content into pages, letting users navigate between them.
 * @documentation https://webawesome.com/docs/components/pagination
 * @status experimental
 * @since 3.11
 *
 * @dependency wa-icon
 *
 * @event wa-before-page-change - Emitted when the page is about to change but before it does. Canceling this event with
 *  `event.preventDefault()` prevents the page from changing.
 * @event wa-page-change - Emitted after the page changes.
 *
 * @slot previous-icon - An icon to use in lieu of the default previous icon.
 * @slot next-icon - An icon to use in lieu of the default next icon.
 * @slot first-icon - An icon to use in lieu of the default first icon.
 * @slot last-icon - An icon to use in lieu of the default last icon.
 *
 * @csspart base - Deprecated. Use the `pagination` part instead.
 * @csspart pagination - The component's outer wrapper, a `<nav>` element.
 * @csspart button - Every button or link, including page numbers and navigation controls.
 * @csspart previous-button - The previous button.
 * @csspart next-button - The next button.
 * @csspart first-button - The first button.
 * @csspart last-button - The last button.
 * @csspart pages - The list that wraps the page number items.
 * @csspart page - A page number button or link.
 * @csspart page-current - The current page number button or link.
 * @csspart ellipsis - An ellipsis for collapsed pages. Acts as a button that jumps several pages toward that side.
 * @csspart summary - The summary of items on the current page, shown with the `with-summary` attribute.
 * @csspart label - The "1 of 5" label shown between the navigation buttons in the `compact` layout.
 *
 * @cssstate disabled - Applied when the pagination is disabled.
 */
@customElement('wa-pagination')
export default class WaPagination extends WebAwesomeElement {
  static css = styles;

  /** How many pages an ellipsis skips when clicked. Matches the common convention (e.g. Ant Design). */
  private static readonly jumpDistance = 5;

  private readonly localize = new LocalizeController(this);

  /** The total number of items to paginate. */
  @property({ type: Number }) total = 0;

  /** The number of items shown per page. */
  @property({ attribute: 'page-size', type: Number }) pageSize = 10;

  /** The current page, starting at 1. */
  @property({ type: Number, reflect: true }) page = 1;

  /** The number of pages to show on each side of the current page. */
  @property({ attribute: 'sibling-count', type: Number }) siblingCount = 2;

  /** The number of pages to always show at the start and end. */
  @property({ attribute: 'boundary-count', type: Number }) boundaryCount = 1;

  /** Hides the previous and next buttons. */
  @property({ attribute: 'without-nav', type: Boolean }) withoutNav = false;

  /** Shows buttons that jump to the first and last pages. */
  @property({ attribute: 'with-edges', type: Boolean }) withEdges = false;

  /** Shows a summary of the items on the current page, e.g. "1–10 of 237". */
  @property({ attribute: 'with-summary', type: Boolean }) withSummary = false;

  /**
   * The pagination's layout. The default `standard` format shows the full page list with ellipses; `compact` collapses
   * it into a short "1 of 5" label flanked by the previous and next buttons, useful in tight spaces like toolbars and
   * cards.
   */
  @property({ reflect: true }) format: 'standard' | 'compact' = 'standard';

  /**
   * A URL template used to render page items as links instead of buttons. When set, items render as `<a>` elements for
   * SSR, SEO, and no-JS support. Provide a string with `{page}` as a placeholder for the page number, e.g.
   * `/products?page={page}`. In JavaScript, you can also assign a function that receives the page number and returns
   * the URL, e.g. `el.hrefTemplate = page => \`/products?page=${page}\``.
   */
  @property({ attribute: 'href-template' }) hrefTemplate: string | ((page: number) => string) = '';

  /** Renders nothing when there's only one page. */
  @property({ attribute: 'hide-single-page', type: Boolean }) hideSinglePage = false;

  /**
   * A label that describes the pagination to assistive devices. This won't be shown on the screen, but it will be
   * announced by screen readers. Especially useful when more than one pagination control exists on the same page.
   */
  @property() label = '';

  /** The pagination's visual appearance. */
  @property({ reflect: true }) appearance: 'outlined' | 'filled' | 'plain' = 'outlined';

  /** Disables the pagination. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Tracks whether the most recent page change came from an in-component activation, so we can restore focus. */
  @state() private shouldRestoreFocus = false;

  /** The total number of pages, derived from `total` and `pageSize`. */
  get totalPages() {
    if (this.pageSize <= 0) return 1;
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.customStates.set('disabled', this.disabled);
  }

  @watch('page')
  @watch('total')
  @watch('pageSize')
  handlePageBoundsChange() {
    // Keep `page` within bounds whenever the inputs change.
    const clamped = clamp(Math.trunc(this.page) || 1, 1, this.totalPages);
    if (clamped !== this.page) {
      this.page = clamped;
    }
  }

  /** Resolves the URL for a given page when `hrefTemplate` is set, supporting both the string and function forms. */
  private getHref(page: number): string | undefined {
    if (!this.hrefTemplate) return undefined;
    if (typeof this.hrefTemplate === 'function') return this.hrefTemplate(page);
    return this.hrefTemplate.split('{page}').join(String(page));
  }

  /**
   * Requests a change to the given page. Emits a cancelable `wa-before-page-change`; if not canceled, updates `page`,
   * restores focus to the new current page, emits `wa-page-change`, and announces the change.
   */
  private async requestPage(page: number, restoreFocus: boolean) {
    const target = clamp(page, 1, this.totalPages);
    if (this.disabled || target === this.page) return;

    const beforeEvent = new WaBeforePageChangeEvent({ page: target, pageSize: this.pageSize });
    this.dispatchEvent(beforeEvent);
    if (beforeEvent.defaultPrevented) return;

    this.shouldRestoreFocus = restoreFocus;
    this.page = target;

    await this.updateComplete;

    this.dispatchEvent(new WaPageChangeEvent({ page: this.page, pageSize: this.pageSize }));
    this.announcePage();
  }

  /** Moves focus to the current page item after an in-component activation, so focus never falls back to the body. */
  private restoreFocusToCurrentPage() {
    const current = this.shadowRoot?.querySelector<HTMLElement>('[part~="page-current"]');
    const active = getDeepestActiveElement();

    // Only steal focus if focus was inside this component (i.e. a button we just re-rendered) and the current page item
    // exists and is focusable.
    if (current && active && this.shadowRoot?.contains(active)) {
      current.focus();
    }
  }

  /** Announces the current page to assistive technology via the shared light-DOM live region. */
  private announcePage() {
    announce(this.localize.term('pageXOfY', this.page, this.totalPages), 'polite');
  }

  updated() {
    if (this.shouldRestoreFocus) {
      this.shouldRestoreFocus = false;
      this.restoreFocusToCurrentPage();
    }
  }

  /** Renders a navigation control (first/previous/next/last). */
  private renderNavButton(options: {
    part: string;
    targetPage: number;
    enabled: boolean;
    label: string;
    icon: string;
    slotName: string;
  }) {
    const { part, targetPage, enabled, label, icon, slotName } = options;
    const isDisabled = this.disabled || !enabled;
    const href = this.getHref(targetPage);

    // Link mode: render an anchor, but drop the href at boundaries so it isn't a styled-only disabled link.
    if (href !== undefined) {
      return html`
        <li role="listitem">
          <a
            part="button ${part}"
            class="button nav-button"
            href=${ifDefined(isDisabled ? undefined : href)}
            aria-label=${label}
            aria-disabled=${isDisabled ? 'true' : 'false'}
          >
            <slot name=${slotName}><wa-icon library="system" name=${icon}></wa-icon></slot>
          </a>
        </li>
      `;
    }

    return html`
      <li role="listitem">
        <button
          part="button ${part}"
          class="button nav-button"
          type="button"
          aria-label=${label}
          aria-disabled=${isDisabled ? 'true' : 'false'}
          @click=${isDisabled ? null : () => this.requestPage(targetPage, true)}
        >
          <slot name=${slotName}><wa-icon library="system" name=${icon}></wa-icon></slot>
        </button>
      </li>
    `;
  }

  /** Renders a single numbered page item. The visible number is the accessible name — no redundant aria-label. */
  private renderPage(page: number) {
    const isCurrent = page === this.page;
    const href = this.getHref(page);
    const label = this.localize.number(page);
    const part = `button page${isCurrent ? ' page-current' : ''}`;

    if (href !== undefined) {
      return html`
        <li role="listitem">
          <a
            part=${part}
            class=${classMap({ button: true, page: true, current: isCurrent })}
            href=${ifDefined(isCurrent || this.disabled ? undefined : href)}
            aria-current=${ifDefined(isCurrent ? 'page' : undefined)}
            aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
            >${label}</a
          >
        </li>
      `;
    }

    return html`
      <li role="listitem">
        <button
          part=${part}
          class=${classMap({ button: true, page: true, current: isCurrent })}
          type="button"
          aria-current=${ifDefined(isCurrent ? 'page' : undefined)}
          aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
          @click=${this.disabled || isCurrent ? null : () => this.requestPage(page, true)}
        >
          ${label}
        </button>
      </li>
    `;
  }

  /**
   * Renders an ellipsis for a run of collapsed pages. Clicking it jumps a fixed number of pages toward that side, so a
   * `start` ellipsis jumps backward and an `end` ellipsis jumps forward. `data-ellipsis` lets the styles collapse a
   * second ellipsis when space is tight.
   */
  private renderEllipsis(position: 'start' | 'end', index: number) {
    const jump = WaPagination.jumpDistance;
    const isStart = position === 'start';
    const targetPage = clamp(isStart ? this.page - jump : this.page + jump, 1, this.totalPages);
    const label = this.localize.term(isStart ? 'jumpBackwardX' : 'jumpForwardX', jump);
    const href = this.getHref(targetPage);

    const content = html`
      <wa-icon class="ellipsis-default" library="system" name="ellipsis" label=${label}></wa-icon>
    `;

    if (href !== undefined) {
      return html`
        <li role="listitem">
          <a
            part="ellipsis"
            class="button ellipsis"
            data-ellipsis=${index}
            href=${ifDefined(this.disabled ? undefined : href)}
            aria-label=${label}
            aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
          >
            ${content}
          </a>
        </li>
      `;
    }

    return html`
      <li role="listitem">
        <button
          part="ellipsis"
          class="button ellipsis"
          data-ellipsis=${index}
          type="button"
          aria-label=${label}
          aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
          @click=${this.disabled ? null : () => this.requestPage(targetPage, true)}
        >
          ${content}
        </button>
      </li>
    `;
  }

  render() {
    const totalPages = this.totalPages;

    if (this.hideSinglePage && totalPages <= 1) {
      return html``;
    }

    const isRtl = this.localize.dir() === 'rtl';
    const onFirstPage = this.page <= 1;
    const onLastPage = this.page >= totalPages;

    // Compact layout: just previous/next flanking a short "1 of 5" label. The page list, ellipses, and edge buttons
    // don't apply here.
    if (this.format === 'compact') {
      return html`
        <div class="container">
          ${this.renderSummary()}
          <nav part="base pagination" class="pagination" aria-label=${this.label || this.localize.term('pagination')}>
            <ul part="pages" class="pages" role="list">
              ${this.renderNavButton({
                part: 'previous-button',
                targetPage: this.page - 1,
                enabled: !onFirstPage,
                label: this.localize.term('previousPage'),
                icon: isRtl ? 'chevron-right' : 'chevron-left',
                slotName: 'previous-icon',
              })}
              <li role="listitem">
                <span part="label" class="label" aria-current="page">
                  ${this.localize.term('compactPageXOfY', this.page, totalPages)}
                </span>
              </li>
              ${this.renderNavButton({
                part: 'next-button',
                targetPage: this.page + 1,
                enabled: !onLastPage,
                label: this.localize.term('nextPage'),
                icon: isRtl ? 'chevron-left' : 'chevron-right',
                slotName: 'next-icon',
              })}
            </ul>
          </nav>
        </div>
      `;
    }

    const items = getPaginationRange({
      page: this.page,
      totalPages,
      siblingCount: this.siblingCount,
      boundaryCount: this.boundaryCount,
    });

    let ellipsisCount = 0;

    return html`
      <div class="container">
        ${this.renderSummary()}
        <nav part="base pagination" class="pagination" aria-label=${this.label || this.localize.term('pagination')}>
          <ul part="pages" class="pages" role="list">
            ${this.withEdges
              ? this.renderNavButton({
                  part: 'first-button',
                  targetPage: 1,
                  enabled: !onFirstPage,
                  label: this.localize.term('firstPage'),
                  icon: isRtl ? 'angles-right' : 'angles-left',
                  slotName: 'first-icon',
                })
              : ''}
            ${this.withoutNav
              ? ''
              : this.renderNavButton({
                  part: 'previous-button',
                  targetPage: this.page - 1,
                  enabled: !onFirstPage,
                  label: this.localize.term('previousPage'),
                  icon: isRtl ? 'chevron-right' : 'chevron-left',
                  slotName: 'previous-icon',
                })}
            ${items.map(item => {
              if (item.type === 'ellipsis') {
                ellipsisCount++;
                return this.renderEllipsis(item.position, ellipsisCount);
              }
              return this.renderPage(item.value);
            })}
            ${this.withoutNav
              ? ''
              : this.renderNavButton({
                  part: 'next-button',
                  targetPage: this.page + 1,
                  enabled: !onLastPage,
                  label: this.localize.term('nextPage'),
                  icon: isRtl ? 'chevron-left' : 'chevron-right',
                  slotName: 'next-icon',
                })}
            ${this.withEdges
              ? this.renderNavButton({
                  part: 'last-button',
                  targetPage: totalPages,
                  enabled: !onLastPage,
                  label: this.localize.term('lastPage'),
                  icon: isRtl ? 'angles-left' : 'angles-right',
                  slotName: 'last-icon',
                })
              : ''}
          </ul>
        </nav>
      </div>
    `;
  }

  /** Renders the optional "1–10 of 237" summary. */
  private renderSummary() {
    if (!this.withSummary) return '';
    const start = this.total === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
    const end = Math.min(this.page * this.pageSize, this.total);
    return html`
      <span part="summary" class="summary"> ${this.localize.term('showingXtoYofZ', start, end, this.total)} </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-pagination': WaPagination;
  }
}
