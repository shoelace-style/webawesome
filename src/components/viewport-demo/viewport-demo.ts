import '../icon-button/icon-button.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import { getComputedStyle } from '../../internal/computedStyle.js';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './viewport-demo.styles.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';

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
  static styles: CSSResultGroup = [componentStyles, styles];

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
  private iframeHOffset: number = 0;

  @state()
  private availableWidth = 0;

  @state()
  private contentWindow: Window | null;

  @state()
  private needsInternalZoom: boolean | undefined;

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
    if (this.viewportElement) {
      this.resizeObserver ??= new ResizeObserver(() => this.handleResize());
      this.updateComplete.then(() => this.resizeObserver.observe(this));
    }
  }

  private unobserveResize() {
    this.resizeObserver?.unobserve(this);
  }

  // Called when this.iframe.contentWindow changes
  private handleIframeLoad() {
    if (this.iframe.contentWindow) {
      this.contentWindow = this.iframe.contentWindow;
      this.updateCS();
      this.updateZoom();

      this.handleViewportResize();
      this.contentWindow.addEventListener('resize', () => this.handleViewportResize());

      if (this.needsInternalZoom === undefined) {
        this.updateComplete.then(() => {
          const innerWidth = this.contentWindow?.innerWidth || 0;
          const availableWidth = Math.round(this.availableWidth);
          const ratio = availableWidth / innerWidth;

          if (Math.abs(ratio - this.computedZoom) > 0.01) {
            // The actual iframe content is not zoomed. This is a known Safari bug.
            // We need to zoom the iframe content manually.
            this.needsInternalZoom = true;
          }
        });
      }
    }
  }

  private updateCS() {
    // This is only needed for isolated demos
    if (this.viewport && globalThis.window) {
      if (this.iframe) {
        this.iframeHOffset = getHorizontalOffsets(getComputedStyle(this.iframe));
      }

      const width = this.viewportElement.clientWidth;
      this.availableWidth = width - this.iframeHOffset;
    }
  }

  /** Gets called when the host gets resized */
  private handleResize() {
    // This is only needed for isolated demos
    if (this.viewport && globalThis.window) {
      this.updateCS();
      this.updateZoom();
    }
  }

  /** Zoom in by one step */
  public zoomIn() {
    this.zoomLevel++;
    this.updateZoom();
  }

  /** Zoom out by one step */
  public zoomOut() {
    this.zoomLevel--;
    this.updateZoom();
  }

  private updateZoom() {
    const usesDefaultZoom = this.zoom === this.defaultZoom && !this.hasAttribute('zoom');

    if (isViewportDimensions(this.viewport)) {
      if (!this.availableWidth) {
        this.updateCS();
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

    if (
      this.contentWindow &&
      ['computedZoom', 'needsInternalZoom', 'contentWindow'].some(p => changedProperties.has(p))
    ) {
      if (changedProperties.has('computedZoom')) {
        this.viewportElement.style.setProperty('--zoom', this.computedZoom + '');
      }

      if (this.needsInternalZoom) {
        const innerWidth = this.contentWindow?.innerWidth || 0;
        const availableWidth = Math.round(this.availableWidth);
        const ratio = availableWidth / innerWidth;

        if (Math.abs(ratio - this.computedZoom) > 0.01) {
          // The actual iframe content is not zoomed. This is a known Safari bug.
          // We need to zoom the iframe content manually.
          this.iframe.contentDocument!.documentElement.style.setProperty('zoom', this.computedZoom + '');
        }
      }
    }
  }

  render() {
    const width = this.innerWidth || (isViewportDimensions(this.viewport) ? this.viewport.width : 0);
    const height = this.innerHeight || (isViewportDimensions(this.viewport) ? this.viewport.height : 0);
    const dimensions = width && height ? html`<span class="dimensions">${width} × ${height}</span>` : '';

    const viewportStyle: Record<string, string | number> = {
      '--zoom': this.computedZoom
    };
    if (isViewportDimensions(this.viewport)) {
      viewportStyle['--viewport-width-px'] = this.viewport.width;

      if (this.viewport.height) {
        viewportStyle['--viewport-height-px'] = this.viewport.height;
      }
    }

    return html`
      <div
        id="viewport"
        part="frame"
        style=${styleMap(viewportStyle)}
        class=${classMap({ 'needs-internal-zoom': this.needsInternalZoom! })}
      >
        <span part="controls">
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

/**
 * Get the horizontal padding and border widths of an element
 */
function getHorizontalOffsets(cs: CSSStyleDeclaration | null): number {
  if (!cs) {
    return 0;
  }

  return (
    getNumber(cs.paddingLeft) +
    getNumber(cs.paddingRight) +
    getNumber(cs.borderLeftWidth) +
    getNumber(cs.borderRightWidth)
  );
}
