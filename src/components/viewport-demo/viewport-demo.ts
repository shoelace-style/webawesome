// import { classMap } from 'lit/directives/class-map.js';
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
 * @slot - The iframe (usually an `<iframe>` element).
 *
 * @cssproperty --viewport-initial-aspect-ratio - The initial aspect ratio of the viewport, when the `viewport` attribute is used. Defaults to `16 / 9`.
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
  private iframe: HTMLIFrameElement;

  @state()
  private innerWidth: number = 0;

  @state()
  private innerHeight: number = 0;

  @state()
  private hostHOffset: number = 0;

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
    // We only observe resizes when the viewport attribute is set
    if (this.viewportElement) {
      this.resizeObserver ??= new ResizeObserver(() => this.handleResize());
      this.updateComplete.then(() => this.resizeObserver.observe(this));
    }
  }

  private unobserveResize() {
    this.resizeObserver?.unobserve(this);
  }

  handleIframeLoad() {
    this.contentWindow = this.iframe.contentWindow;
    if (this.contentWindow) {
      this.handleViewportResize();
      this.contentWindow?.addEventListener('resize', e => this.handleViewportResize(e));
    }
  }

  private updateCS() {
    // This is only needed for isolated demos
    if (this.viewport && globalThis.window) {
      if (this.viewportElement) {
        this.viewportHOffset = getHorizontalOffsets(getComputedStyle(this.viewportElement));
      }

      this.hostHOffset = getHorizontalOffsets(getComputedStyle(this));

      const width = this.getBoundingClientRect().width;
      this.availableWidth = width - this.hostHOffset - this.viewportHOffset;
    }
  }

  /** Gets called when the host gets resized */
  private handleResize() {
    // This is only needed for isolated demos
    if (this.viewport && globalThis.window) {
      this.updateCS();
      this.updateZoomLevel();
    }
  }

  private updateZoomLevel() {
    if (this.hasAttribute('zoom')) {
      // Zoom attribute takes precedence
      this.zoom = parseFloat(this.getAttribute('zoom') || '1');
    } else if (isViewportDimensions(this.viewport)) {
      if (!this.availableWidth) {
        this.updateCS();
      }

      // Zoom level = available width / virtual width
      this.zoom = this.availableWidth / this.viewport.width;
      this.updateComplete.then(() => this.handleViewportResize());
    } else {
      this.zoom = 1;
    }
  }

  private handleViewportResize(e?: Event) {
    const win: Window | null = e ? (e.target as Window) : this.contentWindow;

    if (win?.innerWidth) {
      this.innerWidth = win.innerWidth;
      this.innerHeight = win.innerHeight;
    }
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
      '--zoom': this.zoom
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
            <span class="zoom-level"> ${Math.round(this.zoom * 100)}%</span>
            <wa-icon-button name="square-plus" variant="regular" @click=${() => this.zoomIn()}>+</wa-icon-button>
          </span>
        </span>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }

  public zoomIn() {
    let zoom = this.zoom;
    zoom = Number(zoom.toPrecision(2));
    zoom += 0.1;
    this.zoom = zoom;
  }

  public zoomOut() {
    let zoom = this.zoom;
    zoom = Number(zoom.toPrecision(2));
    zoom -= 0.1;
    this.zoom = zoom;
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
