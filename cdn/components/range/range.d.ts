import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Ranges allow the user to select a single value within a given range using a slider.
 * @documentation https://backers.webawesome.com/docs/components/range
 * @status stable
 * @since 2.0
 *
 * @slot label - The range's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-blur - Emitted when the control loses focus.
 * @event wa-change - Emitted when an alteration to the control's value is committed by the user.
 * @event wa-focus - Emitted when the control gains focus.
 * @event wa-input - Emitted when the control receives input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The range's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input - The internal `<input>` element.
 * @csspart tooltip - The range's tooltip.
 *
 * @cssproperty --thumb-color - The color of the thumb.
 * @cssproperty --thumb-gap - The visual gap between the edges of the thumb and the track.
 * @cssproperty --thumb-shadow - The shadow effects around the edges of the thumb.
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the thumb.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive - The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 * @cssproperty --track-active-offset - The point of origin of the active track.
 */
export default class WaRange extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    static get validators(): import("../../internal/webawesome-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    private readonly hasSlotController;
    private readonly localize;
    private resizeObserver;
    input: HTMLInputElement;
    output: HTMLOutputElement | null;
    private hasFocus;
    private hasTooltip;
    title: string;
    /** The name of the range, submitted as a name/value pair with form data. */
    name: string;
    /** The current value of the range, submitted as a name/value pair with form data. */
    value: number;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultValue: number;
    /** The range's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /** The range's help text. If you need to display HTML, use the help-text slot instead. */
    helpText: string;
    /** Disables the range. */
    disabled: boolean;
    /** The minimum acceptable value of the range. */
    min: number;
    /** The maximum acceptable value of the range. */
    max: number;
    /** The interval at which the range will increase and decrease. */
    step: number;
    /** The preferred placement of the range's tooltip. */
    tooltip: 'top' | 'bottom' | 'none';
    /**
     * A function used to format the tooltip's value. The range's value is passed as the first and only argument. The
     * function should return a string to display in the tooltip.
     */
    tooltipFormatter: (value: number) => string;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: null | string;
    /**
     * Used for SSR to render slotted labels. If true, will render slotted label content on first paint.
     */
    withLabel: boolean;
    /**
     * Used for SSR to render slotted labels. If true, will render slotted help-text content on first paint.
     */
    withHelpText: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleChange;
    private handleInput;
    private handleBlur;
    private handleFocus;
    private handleThumbDragStart;
    private handleThumbDragEnd;
    private syncProgress;
    private syncTooltip;
    handleValueChange(): void;
    syncRange(): void;
    /** Sets focus on the range. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the range. */
    blur(): void;
    /** Increments the value of the range by the value of the step attribute. */
    stepUp(): void;
    /** Decrements the value of the range by the value of the step attribute. */
    stepDown(): void;
    formResetCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-range': WaRange;
    }
}
