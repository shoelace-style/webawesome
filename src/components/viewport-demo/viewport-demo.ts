import '../icon-button/icon-button.js';
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
 * @cssproperty --viewport-initial-aspect-ratio - The initial aspect ratio of the viewport, when the `viewport` attribute is used. Defaults to `16 / 9`.
 * @cssproperty --viewport-bezel-width - The width of the bezel around the viewport. Defaults to `0.25em`.
 * @cssproperty --viewport-background - The background color of the viewport. Defaults to `var(--wa-color-surface-default, canvas)`.
 * @cssproperty --viewport-resize - The resize behavior of the viewport. Defaults to `both`.
 * @cssproperty --viewport-min-width - The minimum width of the viewport. Defaults to `2em`.
 * @cssproperty --viewport-max-width - The maximum width of the viewport. Defaults to `100%`. Anything over 100% will be clipped.
 * @cssproperty --viewport-padding - The padding of the viewport. Defaults to `var(--wa-space-2xl, 2rem)`.
 *
 */
@customElement('wa-viewport-demo')
export default class WaViewportDemo extends WebAwesomeElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  @query('#viewport')
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
  private hostHOffset: number = 0;

  @state()
  private iframeHOffset: number = 0;

  @state()
  private viewportHOffset: number = 0;

  @state()
  private availableWidth = 0;

  @state()
  private contentWindow: Window | null;

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
    this.contentWindow = this.iframe.contentWindow;
    if (this.contentWindow) {
      this.updateCS();
      this.updateZoom();

      this.handleViewportResize();
      this.contentWindow.addEventListener('resize', () => this.handleViewportResize());
      this.updateComplete.then(() => {
        const innerWidth = this.contentWindow?.innerWidth || 0;
        const availableWidth = Math.round(this.availableWidth);
        const ratio = availableWidth / innerWidth;

        if (Math.abs(ratio - this.computedZoom) > 0.01) {
          // The actual iframe content is not zoomed. This is a known Safari bug.
          // We need to zoom the iframe content manually.
          this.iframe.contentDocument!.documentElement.style.setProperty('zoom', this.computedZoom + '');
        }
      });
    }
  }

  private updateCS() {
    // This is only needed for isolated demos
    if (this.viewport && globalThis.window) {
      if (this.iframe) {
        this.iframeHOffset = getHorizontalOffsets(getComputedStyle(this.iframe));
      }

      if (this.viewportElement) {
        this.viewportHOffset = getHorizontalOffsets(getComputedStyle(this.viewportElement));
      }

      this.hostHOffset = getHorizontalOffsets(getComputedStyle(this));

      const width = this.getBoundingClientRect().width;
      this.availableWidth = width - this.hostHOffset - this.viewportHOffset - this.iframeHOffset;
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
      <div id="viewport" part="viewport" style=${styleMap(viewportStyle)}>
        <span part="controls">
          ${dimensions}
          <span class="zoom">
            <wa-icon-button name="square-minus" variant="regular" @click=${() => this.zoomOut()}>-</wa-icon-button>
            <span class="zoom-level"> ${Math.round(this.computedZoom * 100)}%</span>
            <wa-icon-button name="square-plus" variant="regular" @click=${() => this.zoomIn()}>+</wa-icon-button>
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
      this.contentWindow = this.iframe.contentWindow;
      if (this.contentWindow) {
        this.handleIframeLoad();
      }
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
