import '../popup/popup.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
import type WaMenu from '../menu/menu.js';
import type WaPopup from '../popup/popup.js';
/**
 * @summary Dropdowns expose additional content that "drops down" in a panel.
 * @documentation https://backers.webawesome.com/docs/components/dropdown
 * @status stable
 * @since 2.0
 *
 * @dependency wa-popup
 *
 * @slot - The dropdown's main content.
 * @slot trigger - The dropdown's trigger, usually a `<wa-button>` element.
 *
 * @event wa-show - Emitted when the dropdown opens.
 * @event wa-after-show - Emitted after the dropdown opens and all animations are complete.
 * @event wa-hide - Emitted when the dropdown closes.
 * @event wa-after-hide - Emitted after the dropdown closes and all animations are complete.
 *
 * @cssproperty --box-shadow - The shadow effects around the dropdown's edges.
 *
 * @csspart base - The component's base wrapper, a `<wa-popup>` element.
 * @csspart base__popup - The popup's exported `popup` part. Use this to target the tooltip's popup container.
 * @csspart trigger - The container that wraps the trigger.
 * @csspart panel - The panel that gets shown when the dropdown is open.
 */
export default class WaDropdown extends WebAwesomeElement {
    static styles: CSSResultGroup;
    popup: WaPopup;
    trigger: HTMLSlotElement;
    panel: HTMLSlotElement;
    private closeWatcher;
    /**
     * Indicates whether or not the dropdown is open. You can toggle this attribute to show and hide the dropdown, or you
     * can use the `show()` and `hide()` methods and this attribute will reflect the dropdown's open state.
     */
    open: boolean;
    /**
     * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
     * inside of the viewport.
     */
    placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
    /** Disables the dropdown so the panel will not open. */
    disabled: boolean;
    /**
     * By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for
     * dropdowns that allow for multiple interactions.
     */
    stayOpenOnSelect: boolean;
    /**
     * The dropdown will close when the user interacts outside of this element (e.g. clicking). Useful for composing other
     * components that use a dropdown internally.
     */
    containingElement?: HTMLElement;
    /** The distance in pixels from which to offset the panel away from its trigger. */
    distance: number;
    /** The distance in pixels from which to offset the panel along its trigger. */
    skidding: number;
    /**
     * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
     */
    hoist: boolean;
    /**
     * Syncs the popup width or height to that of the trigger element.
     */
    sync: 'width' | 'height' | 'both' | undefined;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    focusOnTrigger(): void;
    getMenu(): WaMenu | undefined;
    private handleKeyDown;
    private handleDocumentKeyDown;
    private handleDocumentMouseDown;
    private handlePanelSelect;
    handleTriggerClick(): void;
    handleTriggerKeyDown(event: KeyboardEvent): Promise<void>;
    handleTriggerKeyUp(event: KeyboardEvent): void;
    handleTriggerSlotChange(): void;
    updateAccessibleTrigger(): void;
    /** Shows the dropdown panel. */
    show(): Promise<void>;
    /** Hides the dropdown panel */
    hide(): Promise<void>;
    /**
     * Instructs the dropdown menu to reposition. Useful when the position or size of the trigger changes when the menu
     * is activated.
     */
    reposition(): void;
    addOpenListeners(): void;
    removeOpenListeners(): void;
    handleOpenChange(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-dropdown': WaDropdown;
    }
}
