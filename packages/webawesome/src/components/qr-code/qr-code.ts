import { QrCreator } from '@konnorr/qr-creator';
import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './qr-code.styles.js';

/**
 * @summary QR codes encode a URL or other short text into a scannable image, rendered client-side using the Canvas API.
 *  Use them to share links, contact info, or Wi-Fi credentials that visitors can scan with a phone.
 * @documentation https://webawesome.com/docs/components/qr-code
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('wa-qr-code')
export default class WaQrCode extends WebAwesomeElement {
  static css = styles;

  @query('canvas') canvas: HTMLCanvasElement;

  /** The QR code's value. */
  @property() value = '';

  /** The label for assistive devices to announce. If unspecified, the value will be used instead. */
  @property() label = '';

  /** The size of the QR code, in pixels. */
  @property({ type: Number }) size = 128;

  /**
   * The fill color. This can be any valid CSS color, but not a CSS custom property.
   * @deprecated Use the `color` CSS property instead.
   */
  @property() fill = '';

  /**
   * The background color. This can be any valid CSS color or `transparent`. It cannot be a CSS custom property.
   * @deprecated Use the `background` or `background-color` CSS property on the host element instead.
   */
  @property() background = '';

  /** The edge radius of each module. Must be between 0 and 0.5. */
  @property({ type: Number }) radius = 0;

  /** The level of error correction to use. [Learn more](https://www.qrcode.com/en/about/error_correction.html) */
  @property({ attribute: 'error-correction' }) errorCorrection: 'L' | 'M' | 'Q' | 'H' = 'H';

  @property() image: string | null = null;
  @property({ attribute: 'image-background' }) imageBackground: string | null = null;
  @property({ attribute: 'image-coverage', type: Number }) imageCoverage: number | null = null;
  @property({ attribute: 'image-padding', type: Number }) imagePadding: number | null = null;

  private computedStyle: ReturnType<typeof getComputedStyle> | null = null;

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);
    this.generate();
  }

  generate() {
    if (!this.hasUpdated) {
      return;
    }

    this.canvas.style.maxWidth = `${this.size}px`;
    this.canvas.style.maxHeight = `${this.size}px`;

    this.computedStyle ||= getComputedStyle(this);
    const computedStyle = this.computedStyle;

    const span = this.shadowRoot?.querySelector('span');

    if (span) {
      // @ts-expect-error
      this.spanComputedStyle ||= getComputedStyle(span);
    }

    QrCreator.render(
      {
        text: this.value,
        radius: this.radius,
        ecLevel: this.errorCorrection,
        // Use the deprecated `fill` attribute if set, otherwise use the current text color
        fill: this.fill || computedStyle.color,
        // Use the deprecated `background` attribute if set, otherwise use transparent (the host has the bg color now)
        background: this.background || null,
        // We draw the canvas larger and scale its container down to avoid blurring on high-density displays
        size: this.size * 2,
        image: this.image,
        imageEcCover: this.imageCoverage,
        imagePadding: this.imagePadding,
        imageBackground: this.imageBackground || this.background,
        // @ts-expect-error
        cornerFill: this.spanComputedStyle?.color,
      },
      this.canvas,
    );
  }

  render() {
    return html`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${this.label?.length > 0 ? this.label : this.value}
        @transitionend=${(event: TransitionEvent) => {
          if (event.propertyName === 'color') {
            this.generate();
          }
        }}
      >
        <span style="color: var(--corner-color);"></span>
      </canvas>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-qr-code': WaQrCode;
  }
}
