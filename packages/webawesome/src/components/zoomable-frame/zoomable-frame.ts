import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { parseSpaceDelimitedTokens } from '../../internal/parse.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import styles from './zoomable-frame.styles.js';

/**
 * @summary Zoomable frames render iframe content with zoom and interaction controls.
 * @documentation https://webawesome.com/docs/components/zoomable-frame
 * @status stable
 * @since 3.0
 *
 * @dependency wa-icon
 *
 * @slot zoom-in-icon - The slot that contains the zoom in icon.
 * @slot zoom-out-icon - The slot that contains the zoom out icon.
 *
 * @event load - Emitted when the internal iframe when it finishes loading.
 * @event error - Emitted from the internal iframe when it fails to load.
 *
 * @csspart iframe - The internal `<iframe>` element.
 * @csspart controls - The container that surrounds zoom control buttons.
 * @csspart zoom-in-button - The zoom in button.
 * @csspart zoom-out-button - The zoom out button.
 */
@customElement('wa-zoomable-frame')
export default class WaZoomableFrame extends WebAwesomeElement {
  static css = styles;

  private readonly localize = new LocalizeController(this);
  private availableZoomLevels: number[] = [];

  @query('#iframe') iframe: HTMLIFrameElement;

  /** The URL of the content to display. */
  @property() src: string;

  /** Inline HTML to display. */
  @property() srcdoc: string;

  /** Allows fullscreen mode. */
  @property({ type: Boolean }) allowfullscreen = false;

  /** Controls iframe loading behavior. */
  @property() loading: 'eager' | 'lazy' = 'eager';

  /** Controls referrer information. */
  @property() referrerpolicy: string;

  /** Security restrictions for the iframe. */
  @property() sandbox: string;

  /** The current zoom of the frame, e.g. 0 = 0% and 1 = 100%. */
  @property({ type: Number, reflect: true }) zoom = 1;

  /**
   * The zoom levels to step through when using zoom controls. This does not restrict programmatic changes to the zoom.
   */
  @property({ attribute: 'zoom-levels' }) zoomLevels = '25% 50% 75% 100% 125% 150% 175% 200%';

  /** Removes the zoom controls. */
  @property({ type: Boolean, attribute: 'without-controls', reflect: true }) withoutControls = false;

  /** Disables interaction when present. */
  @property({ type: Boolean, attribute: 'without-interaction', reflect: true }) withoutInteraction = false;

  /** Returns the internal iframe's `window` object. (Readonly property) */
  public get contentWindow(): Window | null {
    return this.iframe?.contentWindow || null;
  }

  /** Returns the internal iframe's `document` object. (Readonly property) */
  public get contentDocument(): Document | null {
    return this.iframe?.contentDocument || null;
  }

  private parseZoomLevels(zoomLevelsString: string): number[] {
    const tokens = parseSpaceDelimitedTokens(zoomLevelsString);
    const levels: number[] = [];

    for (const token of tokens) {
      let value: number;

      if (token.endsWith('%')) {
        // Parse percentage and convert to 0-1 scale
        const percentage = parseFloat(token.slice(0, -1));
        if (!isNaN(percentage)) {
          value = Math.max(0, percentage / 100); // Min 0, no max
        } else {
          continue; // Skip invalid values
        }
      } else {
        // Parse as number (0-1 scale)
        value = parseFloat(token);
        if (!isNaN(value)) {
          value = Math.max(0, value); // Min 0, no max
        } else {
          continue; // Skip invalid values
        }
      }

      levels.push(value);
    }

    // Sort levels and remove duplicates
    return [...new Set(levels)].sort((a, b) => a - b);
  }

  private getCurrentZoomIndex(): number {
    if (this.availableZoomLevels.length === 0) return -1;

    // Find the closest zoom level index
    let closestIndex = 0;
    let closestDiff = Math.abs(this.availableZoomLevels[0] - this.zoom);

    for (let i = 1; i < this.availableZoomLevels.length; i++) {
      const diff = Math.abs(this.availableZoomLevels[i] - this.zoom);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIndex = i;
      }
    }

    return closestIndex;
  }

  private isZoomInDisabled(): boolean {
    if (this.availableZoomLevels.length === 0) return false;
    const currentIndex = this.getCurrentZoomIndex();
    return currentIndex >= this.availableZoomLevels.length - 1;
  }

  private isZoomOutDisabled(): boolean {
    if (this.availableZoomLevels.length === 0) return false;
    const currentIndex = this.getCurrentZoomIndex();
    return currentIndex <= 0;
  }

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('zoom')) {
      this.style.setProperty('--zoom', `${this.zoom}`);
    }

    if (changedProperties.has('zoomLevels')) {
      this.availableZoomLevels = this.parseZoomLevels(this.zoomLevels);

      // If current zoom is not in the available levels, snap to the closest one
      if (this.availableZoomLevels.length > 0) {
        const currentIndex = this.getCurrentZoomIndex();
        if (Math.abs(this.availableZoomLevels[currentIndex] - this.zoom) > 0.001) {
          this.zoom = this.availableZoomLevels[currentIndex];
        }
      }
    }
  }

  /** Zooms in to the next available zoom level. */
  public zoomIn() {
    if (this.availableZoomLevels.length === 0) {
      // Fallback to original behavior if no zoom levels defined
      this.zoom = Math.min(this.zoom + 0.05, 2);
      return;
    }

    const currentIndex = this.getCurrentZoomIndex();
    if (currentIndex < this.availableZoomLevels.length - 1) {
      this.zoom = this.availableZoomLevels[currentIndex + 1];
    }
  }

  /** Zooms out to the previous available zoom level. */
  public zoomOut() {
    if (this.availableZoomLevels.length === 0) {
      // Fallback to original behavior if no zoom levels defined
      this.zoom = Math.max(this.zoom - 0.05, 0);
      return;
    }

    const currentIndex = this.getCurrentZoomIndex();
    if (currentIndex > 0) {
      this.zoom = this.availableZoomLevels[currentIndex - 1];
    }
  }

  private handleLoad() {
    this.dispatchEvent(new Event('load', { bubbles: false, cancelable: false, composed: true }));
  }

  private handleError() {
    this.dispatchEvent(new Event('error', { bubbles: false, cancelable: false, composed: true }));
  }

  render() {
    return html`
      <div id="frame-container">
        <iframe
          id="iframe"
          part="iframe"
          ?inert=${this.withoutInteraction}
          ?allowfullscreen=${this.allowfullscreen}
          loading=${this.loading}
          referrerpolicy=${this.referrerpolicy}
          sandbox=${ifDefined((this.sandbox as any) ?? undefined)}
          src=${ifDefined(this.src ?? undefined)}
          srcdoc=${ifDefined(this.srcdoc ?? undefined)}
          @load=${this.handleLoad}
          @error=${this.handleError}
        ></iframe>
      </div>

      ${!this.withoutControls
        ? html`
            <div id="controls" part="controls">
              <button
                part="zoom-out-button"
                aria-label=${this.localize.term('zoomOut')}
                @click=${this.zoomOut}
                ?disabled=${this.isZoomOutDisabled()}
              >
                <slot name="zoom-out-icon">
                  <wa-icon name="minus" label="Zoom out"></wa-icon>
                </slot>
              </button>
              <span>${this.localize.number(this.zoom, { style: 'percent', maximumFractionDigits: 1 })}</span>
              <button
                part="zoom-in-button"
                aria-label=${this.localize.term('zoomIn')}
                @click=${this.zoomIn}
                ?disabled=${this.isZoomInDisabled()}
              >
                <slot name="zoom-in-icon">
                  <wa-icon name="plus" label="Zoom in"></wa-icon>
                </slot>
              </button>
            </div>
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-zoomable-frame': WaZoomableFrame;
  }
}
