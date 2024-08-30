import '../icon/icon.js';
import '../tooltip/tooltip.js';
import '../visually-hidden/visually-hidden.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
import type WaTooltip from '../tooltip/tooltip.js';
/**
 * @summary Copies text data to the clipboard when the user clicks the trigger.
 * @documentation https://backers.webawesome.com/docs/components/copy
 * @status experimental
 * @since 2.7
 *
 * @dependency wa-icon
 * @dependency wa-tooltip
 *
 * @event wa-copy - Emitted when the data has been copied.
 * @event wa-error - Emitted when the data could not be copied.
 *
 * @slot copy-icon - The icon to show in the default copy state. Works best with `<wa-icon>`.
 * @slot success-icon - The icon to show when the content is copied. Works best with `<wa-icon>`.
 * @slot error-icon - The icon to show when a copy error occurs. Works best with `<wa-icon>`.
 *
 * @csspart button - The internal `<button>` element.
 * @csspart copy-icon - The container that holds the copy icon.
 * @csspart success-icon - The container that holds the success icon.
 * @csspart error-icon - The container that holds the error icon.
 * @csspart tooltip__base - The tooltip's exported `base` part.
 * @csspart tooltip__base__popup - The tooltip's exported `popup` part.
 * @csspart tooltip__base__arrow - The tooltip's exported `arrow` part.
 * @csspart tooltip__body - The tooltip's exported `body` part.
 *
 * @cssproperty --background-color - The color of the button's background.
 * @cssproperty --background-color-hover - The color of the button's background on hover.
 * @cssproperty --success-color - The color to use for success feedback.
 * @cssproperty --error-color - The color to use for error feedback.
 */
export default class WaCopyButton extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private readonly localize;
    copyIcon: HTMLSlotElement;
    successIcon: HTMLSlotElement;
    errorIcon: HTMLSlotElement;
    tooltip: WaTooltip;
    isCopying: boolean;
    status: 'rest' | 'success' | 'error';
    private get currentLabel();
    /** The text value to copy. */
    value: string;
    /**
     * An id that references an element in the same document from which data will be copied. If both this and `value` are
     * present, this value will take precedence. By default, the target element's `textContent` will be copied. To copy an
     * attribute, append the attribute name wrapped in square brackets, e.g. `from="el[value]"`. To copy a property,
     * append a dot and the property name, e.g. `from="el.value"`.
     */
    from: string;
    /** Disables the copy button. */
    disabled: boolean;
    /** A custom label to show in the tooltip. */
    copyLabel: string;
    /** A custom label to show in the tooltip after copying. */
    successLabel: string;
    /** A custom label to show in the tooltip when a copy error occurs. */
    errorLabel: string;
    /** The length of time to show feedback before restoring the default trigger. */
    feedbackDuration: number;
    /** The preferred placement of the tooltip. */
    tooltipPlacement: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Enable this option to prevent the tooltip from being clipped when the component is placed inside a container with
     * `overflow: auto|hidden|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all,
     * scenarios.
     */
    hoist: boolean;
    private handleCopy;
    private showStatus;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-copy-button': WaCopyButton;
    }
}
