import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup, PropertyValues } from 'lit';
/**
 * @summary Generates a [QR code](https://www.qrcode.com/) and renders it using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).
 * @documentation https://backers.webawesome.com/docs/components/qr-code
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 */
export default class WaQrCode extends WebAwesomeElement {
    static styles: CSSResultGroup;
    canvas: HTMLElement;
    /** The QR code's value. */
    value: string;
    /** The label for assistive devices to announce. If unspecified, the value will be used instead. */
    label: string;
    /** The size of the QR code, in pixels. */
    size: number;
    /** The fill color. This can be any valid CSS color, but not a CSS custom property. */
    fill: string;
    /** The background color. This can be any valid CSS color or `transparent`. It cannot be a CSS custom property. */
    background: string;
    /** The edge radius of each module. Must be between 0 and 0.5. */
    radius: number;
    /** The level of error correction to use. [Learn more](https://www.qrcode.com/en/about/error_correction.html) */
    errorCorrection: 'L' | 'M' | 'Q' | 'H';
    /**
     * Whether or not the qr-code generated.
     */
    private generated;
    firstUpdated(changedProperties: PropertyValues<this>): void;
    generate(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-qr-code': WaQrCode;
    }
}
