import '../button-group/button-group.js';
import '../radio/radio.js';
import { WebAwesomeFormAssociatedElement } from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
import type WaRadio from '../radio/radio.js';
import type WaRadioButton from '../radio-button/radio-button.js';
/**
 * @summary Radio groups are used to group multiple [radios](/docs/components/radio) or [radio buttons](/docs/components/radio-button) so they function as a single form control.
 * @documentation https://backers.webawesome.com/docs/components/radio-group
 * @status stable
 * @since 2.0
 *
 * @dependency wa-button-group
 *
 * @slot - The default slot where `<wa-radio>` or `<wa-radio-button>` elements are placed.
 * @slot label - The radio group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot help-text - Text that describes how to use the radio group. Alternatively, you can use the `help-text` attribute.
 *
 * @event wa-change - Emitted when the radio group's selected value changes.
 * @event wa-input - Emitted when the radio group receives user input.
 * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
export default class WaRadioGroup extends WebAwesomeFormAssociatedElement {
    static styles: CSSResultGroup;
    static get validators(): import("../../internal/webawesome-element.js").Validator<WebAwesomeFormAssociatedElement>[];
    private readonly hasSlotController;
    defaultSlot: HTMLSlotElement;
    private hasButtonGroup;
    /**
     * The radio group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot
     * instead.
     */
    label: string;
    /** The radio groups's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    /** The name of the radio group, submitted as a name/value pair with form data. */
    name: string | null;
    value: string;
    defaultValue: string;
    /** The radio group's size. This size will be applied to all child radios and radio buttons. */
    size: 'small' | 'medium' | 'large';
    /** Ensures a child radio is checked before allowing the containing form to submit. */
    required: boolean;
    /**
     * Used for SSR. if true, will show slotted label on initial render.
     */
    withLabel: boolean;
    /**
     * Used for SSR. if true, will show slotted help text on initial render.
     */
    withHelpText: boolean;
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    constructor();
    private handleRadioClick;
    private getAllRadios;
    private handleLabelClick;
    private syncRadioElements;
    /**
     * We use the first available radio as the validationTarget similar to native HTML that shows the validation popup on
     * the first radio element.
     */
    get validationTarget(): WaRadio | WaRadioButton | undefined;
    handleValueChange(): void;
    handleSizeChange(): void;
    formResetCallback(...args: Parameters<WebAwesomeFormAssociatedElement['formResetCallback']>): void;
    private handleKeyDown;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-radio-group': WaRadioGroup;
    }
}
