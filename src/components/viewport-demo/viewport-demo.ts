import '../icon-button/icon-button.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { getComputedStyle } from '../../internal/computedStyle.js';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { watch } from '../../internal/watch.js';
import styles from './viewport-demo.css';
import WebAwesomeElement from '../../internal/webawesome-element.js';

export interface ViewportDimensions {
  width: number;
  height?: number;
}

export function isViewportDimensions(
  viewport: boolean | ViewportDimensions | undefined
): viewport is ViewportDimensions {
  return Boolean(viewport) && typeof viewport === 'object' && 'width' in viewport;
}

export const viewportPropertyConverter = {
  fromAttribute(value: string | null) {
    if (value === null) {
      return false;
    }
    if (value === '') {
      return true;
    }

    const [width, height] = value.trim().split(/\s*x\s*/);
    const ret: ViewportDimensions = { width: parseFloat(width) };
    if (height) {
      ret.height = parseFloat(height);
    }
    return ret;
  },
  toAttribute(value: boolean | ViewportDimensions) {
    if (value === false) {
      return null;
    }
    if (value === true) {
      return '';
    }
    return `${value.width} x ${value.height}`;
  }
};

/**
 * @summary Viewport demos can be used to display an iframe as a resizable, zoomable preview.
 * @documentation https://backers.webawesome.com/docs/components/viewport-demo
 * @status experimental
 * @since 3.0
 *
 * @dependency wa-icon-button
 *
 * @slot - The iframe (usually an `<iframe>` element).
 *
 * @csspart frame - The visible frame around the viewport.
 *
 * @cssproperty --viewport-initial-aspect-ratio - The initial aspect ratio of the viewport, when the `viewport` attribute is used. Defaults to `16 / 9`.
 * @cssproperty --viewport-bezel-width - The width of the bezel around the viewport. Defaults to `0.25em`.
 * @cssproperty --viewport-background-color - The background color of the viewport. Defaults to `var(--wa-color-surface-default, canvas)`.
 * @cssproperty --viewport-resize - The resize behavior of the viewport. Defaults to `both`.
 * @cssproperty --viewport-min-width - The minimum width of the viewport. Defaults to `2em`.
 * @cssproperty --viewport-max-width - The maximum width of the viewport. Defaults to `100%`. Anything over 100% will be clipped.
 * @cssproperty --viewport-padding - The padding of the viewport. Defaults to `var(--wa-space-2xl, 2rem)`.
 *
 */
@customElement('wa-viewport-demo')
export default class WaViewportDemo extends WebAwesomeElement {
  static shadowStyle = styles;

  @query('[part~=frame]')
  private viewportElement: HTMLElement;

  /** Renders in an iframe */
  @property({
    reflect: true,
    converter: {
      fromAttribute(value: string | null) {
        if (value === null) {
          return false;
        }
        if (value === '') {
          return true;
        }

        const [width, height] = value.trim().split(/\s*x\s*/);
        const ret: ViewportDimensions = { width: parseFloat(width) };
        if (height) {
          ret.height = parseFloat(height);
        }
        return ret;
      },
      toAttribute(value: boolean | ViewportDimensions) {
        if (value === false) {
          return null;
        }
        if (value === true) {
          return '';
        }
        return `${value.width} x ${value.height}`;
      }
    }
  })
  viewport?: boolean | ViewportDimensions;

  @state()
  initialAspectRatio = 16 / 9;

  @property()
  zoom: number = 1;

  @state()
  public defaultZoom: number = 1;

  /** Number of steps zoomed in/out */
  @state()
  private zoomLevel: number = 0;

  /** Actual final applied zoom */
  @state()
  public computedZoom: number = 1;

  @state()
  private iframe: HTMLIFrameElement;

  @state()
  private innerWidth: number = 0;

  @state()
  private innerHeight: number = 0;

  @state()
  private offsetInline: number = 0;

  @state()
  private availableWidth = 0;

  @state()
  private contentWindow: Window | null;

  @state()
  private iframeManualWidth: number | undefined;

  @state()
  private iframeManualHeight: number | undefined;

  private resizeObserver: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this.handleViewportChange();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unobserveResize();
  }

  private observeResize() {
    this.resizeObserver ??= new ResizeObserver(records => this.handleResize(records));
    this.resizeObserver.observe(this);

    this.updateComplete.then(() => {
      if (this.iframe) {
        this.resizeObserver.observe(this.iframe);
      }
    });
  }

  private unobserveResize() {
    this.resizeObserver?.unobserve(this);
    this.resizeObserver?.unobserve(this.iframe);
  }

  // Called when this.iframe.contentWindow changes
  private handleIframeLoad() {
    if (this.iframe.contentWindow) {
      this.contentWindow = this.iframe.contentWindow;
      this.updateZoom();

      this.handleViewportResize();
      this.contentWindow.addEventListener('resize', () => this.handleViewportResize());
    }
  }

  private updateAvailableWidth() {
    // This is only needed for isolated demos
    if (this.viewport && globalThis.window && this.iframe) {
      const offsets = {
        host: getHorizontalOffsets(getComputedStyle(this)),
        frame: getHorizontalOffsets(getComputedStyle(this.viewportElement)),
        iframe: getHorizontalOffsets(getComputedStyle(this.iframe))
      };

      this.offsetInline = offsets.host.inner + offsets.frame.all + offsets.iframe.all;
      this.availableWidth = this.clientWidth - this.offsetInline;
    }
  }

  /** Called when the user resizes the iframe */
  private handleIframeResize() {
    const { width, height } = this.iframe.style;

    this.iframeManualWidth = (width && getNumber(width)) || undefined;
    this.iframeManualHeight = (height && getNumber(height)) || undefined;
  }

  /** Gets called when the host gets resized */
  private handleResize(records: ResizeObserverEntry[]) {
    // This is only needed for isolated demos
    for (const record of records) {
      if (record.target === this) {
        if (this.viewport && globalThis.window) {
          this.updateAvailableWidth();
        }
      } else if (record.target === this.iframe) {
        this.handleIframeResize();
      }
    }
  }

  /** Zoom in by one step */
  public zoomIn() {
    this.zoomLevel++;
  }

  /** Zoom out by one step */
  public zoomOut() {
    this.zoomLevel--;
  }

  private updateZoom() {
    const usesDefaultZoom = this.zoom === this.defaultZoom && !this.hasAttribute('zoom');

    if (isViewportDimensions(this.viewport)) {
      if (!this.availableWidth) {
        this.updateAvailableWidth();
      }

      // Zoom level = available width / virtual width
      if (!this.availableWidth) {
        // Abort mission
        return;
      }

      this.defaultZoom = this.availableWidth / this.viewport.width;
      this.updateComplete.then(() => this.handleViewportResize());
    } else {
      this.defaultZoom = 1;
    }

    if (usesDefaultZoom) {
      this.zoom = this.defaultZoom;
    }

    if (this.zoomLevel === 0) {
      this.computedZoom = this.zoom;
    } else {
      const zoom = Number(this.zoom.toPrecision(2));
      this.computedZoom = zoom + 0.1 * this.zoomLevel;
    }
  }

  private handleViewportResize() {
    this.innerWidth = this.iframe.clientWidth;
    this.innerHeight = this.iframe.clientHeight;
  }

  @watch('viewport')
  handleViewportChange() {
    if (this.viewport) {
      if (isViewportDimensions(this.viewport)) {
        this.initialAspectRatio = this.viewport.height ? this.viewport.width / this.viewport.height : 16 / 9;
      }
      this.observeResize();
    } else {
      this.unobserveResize();
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('iframe')) {
      this.observeResize();
    }

    if (['zoomLevel', 'availableWidth', 'viewport'].some(p => changedProperties.has(p))) {
      this.updateZoom();
    }

    if (changedProperties.has('computedZoom')) {
      if (this.iframeManualWidth !== undefined || this.iframeManualHeight !== undefined) {
        // These inline styles have been created based on the previous zoom level
        // We need to convert them manually and reapply them
        this.unobserveResize(); // pause the observer

        const previousZoom = changedProperties.get('computedZoom') as number;

        if (this.iframeManualWidth !== undefined) {
          const width = (this.iframeManualWidth * previousZoom) / this.computedZoom;
          this.iframe.style.width = width + 'px';
          this.iframeManualWidth = width;
        }

        if (this.iframeManualHeight !== undefined) {
          const height = (this.iframeManualHeight * previousZoom) / this.computedZoom;
          this.iframe.style.height = height + 'px';
          this.iframeManualHeight = height;
        }

        this.observeResize();
      }
    }
  }

  render() {
    const width = this.innerWidth || (isViewportDimensions(this.viewport) ? this.viewport.width : 0);
    const height = this.innerHeight || (isViewportDimensions(this.viewport) ? this.viewport.height : 0);
    const dimensions = width && height ? html`<span class="dimensions">${width} × ${height}</span>` : '';

    const viewportStyle: Record<string, string | number> = {
      '--zoom': this.computedZoom,
      '--offset-inline': this.offsetInline + 'px'
    };
    const resized = Boolean(this.iframeManualWidth || this.iframeManualHeight);
    const viewportClasses = {
      'resized-width': Boolean(this.iframeManualWidth),
      'resized-height': Boolean(this.iframeManualHeight),
      resized
    };

    if (this.iframeManualWidth) {
      viewportStyle['--iframe-manual-width-px'] = this.iframeManualWidth;
    }
    if (this.iframeManualHeight) {
      viewportStyle['--iframe-manual-height-px'] = this.iframeManualHeight;
    }

    if (isViewportDimensions(this.viewport)) {
      viewportStyle['--viewport-width-px'] = this.viewport.width;

      if (this.viewport.height) {
        viewportStyle['--viewport-height-px'] = this.viewport.height;
      }
    }

    return html`
      <div id="viewport" part="frame" style=${styleMap(viewportStyle)} class=${classMap(viewportClasses)}>
        <span part="controls">
          ${resized
            ? html`<wa-icon-button
                name="arrow-rotate-left"
                variant="regular"
                label="Revert resizing"
                @click=${() => this.iframe.removeAttribute('style')}
                part="undo button"
                >-</wa-icon-button
              >`
            : ''}
          ${dimensions}
          <span class="zoom">
            <wa-icon-button
              name="square-minus"
              variant="regular"
              label="Zoom out"
              @click=${() => this.zoomOut()}
              part="zoom-out button"
              >-</wa-icon-button
            >
            <span class="zoom-level">
              <wa-icon name="magnifying-glass-plus"></wa-icon>
              ${Math.round(this.computedZoom * 100)}%
            </span>
            <wa-icon-button
              name="square-plus"
              variant="regular"
              label="Zoom in"
              @click=${() => this.zoomIn()}
              part="zoom-in button"
              >+</wa-icon-button
            >
          </span>
        </span>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }

  private handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;

    this.iframe = slot.assignedElements()[0] as HTMLIFrameElement;

    if (this.iframe) {
      this.handleIframeLoad();
      this.iframe.addEventListener('load', () => this.handleIframeLoad());
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-viewport-demo': WaViewportDemo;
  }
}

// Private helpers

/**
 * Parse a string into a number, or return 0 if it's not a number
 */
function getNumber(value: string | number): number {
  return (typeof value === 'string' ? parseFloat(value) : value) || 0;
}

interface HorizontalOffsets {
  padding: number;
  border: number;
  margin: number;
  inner: number;
  all: number;
}

const noOffsets: HorizontalOffsets = { padding: 0, border: 0, margin: 0, inner: 0, all: 0 };

/**
 * Get the horizontal padding and border widths of an element
 */
function getHorizontalOffsets(cs: CSSStyleDeclaration | null): HorizontalOffsets {
  if (!cs) {
    return noOffsets;
  }

  const padding = getNumber(cs.paddingLeft) + getNumber(cs.paddingRight);
  const border = getNumber(cs.borderLeftWidth) + getNumber(cs.borderRightWidth);
  const margin = getNumber(cs.marginLeft) + getNumber(cs.marginRight);
  const inner = padding + border;
  const all = inner + margin;

  return { padding, border, margin, inner, all };
}
