import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type _QrCreator from 'qr-creator';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './qr-code.styles.js';

let QrCreator: _QrCreator.default;

/**
 * @summary Generates a [QR code](https://www.qrcode.com/) and renders it using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).
 * @documentation https://webawesome.com/docs/components/qr-code
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('wa-qr-code')
export default class WaQrCode extends WebAwesomeElement {
  static css = styles;

  @query('canvas') canvas: HTMLElement;

  /** The QR code's value. */
  @property() value = '';

  /** The label for assistive devices to announce. If unspecified, the value will be used instead. */
  @property() label = '';

  /** The size of the QR code, in pixels. */
  @property({ type: Number }) size = 128;

  /** The fill color. This can be any valid CSS color, but not a CSS custom property. */
  @property() fill = 'black';

  /** The background color. This can be any valid CSS color or `transparent`. It cannot be a CSS custom property. */
  @property() background = 'white';

  /** The edge radius of each module. Must be between 0 and 0.5. */
  @property({ type: Number }) radius = 0;

  /** The level of error correction to use. [Learn more](https://www.qrcode.com/en/about/error_correction.html) */
  @property({ attribute: 'error-correction' }) errorCorrection: 'L' | 'M' | 'Q' | 'H' = 'H';

  /**
   * The size of the quiet zone, a border around the QR code that helps with scanning. This should be at least 4
   * modules wide (the default), but you can set it to any non-negative number. Set to 0 to remove the quiet zone.
   */
  @property({ type: Number }) margin = 4;

  /**
   * Whether or not the qr-code generated.
   */
  // @ts-expect-error Don't know why it marks it as unused.
  @state() private generated = false;

  firstUpdated(changedProperties: PropertyValues<this>) {
    super.firstUpdated(changedProperties);
    this.generate();
  }

  @watch(['background', 'errorCorrection', 'fill', 'margin', 'radius', 'size', 'value'])
  generate() {
    const totalSize = this.size + this.margin * 2;
    this.style.setProperty('--size', `${this.size}px`);
    this.style.setProperty('width', `${totalSize}px`);
    this.style.setProperty('height', `${totalSize}px`);

    if (!this.canvas) {
      return;
    }

    // We lazy load because the QR generator will cause the server to crash, but we want to reduce layout shift.
    if (!QrCreator) {
      import('qr-creator').then(mod => {
        QrCreator = mod.default;
        this.generate();
      });
      return;
    }

    (QrCreator as unknown as typeof _QrCreator.default).render(
      {
        text: this.value,
        radius: this.radius,
        ecLevel: this.errorCorrection,
        fill: this.fill,
        background: this.background,
        // We draw the canvas larger and scale its container down to avoid blurring on high-density displays
        size: this.size * 2,
      },
      this.canvas,
    );

    this.generated = true;
  }

  render() {
    return html`
      <div
        part="base"
        class="qr-code__base"
        style=${styleMap({
          padding: `${this.margin}px`,
          backgroundColor: this.background
        })}
      >
        <canvas
          class="qr-code"
          role="img"
          aria-label=${this.label?.length > 0 ? this.label : this.value}
        ></canvas>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-qr-code': WaQrCode;
  }
}
