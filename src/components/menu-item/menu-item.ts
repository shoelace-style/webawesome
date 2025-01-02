import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { getTextContent } from '../../internal/slot.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../icon/icon.js';
import '../popup/popup.js';
import '../spinner/spinner.js';
import styles from './menu-item.css';
import { SubmenuController } from './submenu-controller.js';

/**
 * @summary Menu items provide options for the user to pick from in a menu.
 * @documentation https://backers.webawesome.com/docs/components/menu-item
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon
 * @dependency wa-popup
 *
 * @slot - The menu item's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 * @slot submenu - Used to denote a nested menu.
 *
 * @csspart base - The component's base wrapper.
 * @csspart checked-icon - The checked icon, which is only visible when the menu item is checked.
 * @csspart prefix - The prefix container.
 * @csspart label - The menu item label.
 * @csspart suffix - The suffix container.
 * @csspart spinner - The spinner that shows when the menu item is in the loading state.
 * @csspart spinner__base - The spinner's base part.
 * @csspart submenu-icon - The submenu icon, visible only when the menu item has a submenu (not yet implemented).
 *
 * @cssproperty --background-color-hover - The menu item's background color on hover.
 * @cssproperty --text-color-hover - The label color on hover.
 * @cssproperty [--submenu-offset=-2px] - The distance submenus shift to overlap the parent menu.
 */
@customElement('wa-menu-item')
export default class WaMenuItem extends WebAwesomeElement {
  static shadowStyle = styles;

  private cachedTextLabel: string;
  private readonly localize = new LocalizeController(this);

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;
  @query('.menu-item') menuItem: HTMLElement;

  /** The type of menu item to render. To use `checked`, this value must be set to `checkbox`. */
  @property() type: 'normal' | 'checkbox' = 'normal';

  /** Draws the item in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** A unique value to store in the menu item. This can be used as a way to identify menu items when selected. */
  @property() value = '';

  /** Draws the menu item in a loading state. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** Draws the menu item in a disabled state, preventing selection. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Used for SSR purposes. If true, will render a ">" caret icon for showing that it has a submenu, but will be non-interactive.
   */
  @property({ attribute: 'with-submenu', type: Boolean }) withSubmenu = false;

  private submenuController: SubmenuController = new SubmenuController(this);

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleHostClick);
    this.addEventListener('mouseover', this.handleMouseOver);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleHostClick);
    this.removeEventListener('mouseover', this.handleMouseOver);
  }

  protected firstUpdated(changedProperties: PropertyValues<this>): void {
    // Kick it so that it renders the "submenu" properly.
    if (this.isSubmenu()) {
      this.requestUpdate();
    }

    super.firstUpdated(changedProperties);
  }

  private handleDefaultSlotChange() {
    const textLabel = this.getTextLabel();

    // Ignore the first time the label is set
    if (typeof this.cachedTextLabel === 'undefined') {
      this.cachedTextLabel = textLabel;
      return;
    }

    // When the label changes, emit a slotchange event so parent controls see it
    if (textLabel !== this.cachedTextLabel) {
      this.cachedTextLabel = textLabel;
      /** @internal - prevent the CEM from recording this event */
      this.dispatchEvent(new Event('slotchange', { bubbles: true, composed: false, cancelable: false }));
    }
  }

  private handleHostClick = (event: MouseEvent) => {
    // Prevent the click event from being emitted when the button is disabled or loading
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  private handleMouseOver = (event: MouseEvent) => {
    this.focus();
    event.stopPropagation();
  };

  @watch('checked')
  handleCheckedChange() {
    // For proper accessibility, users have to use type="checkbox" to use the checked attribute
    if (this.checked && this.type !== 'checkbox') {
      this.checked = false;
      return;
    }

    // Only checkbox types can receive the aria-checked attribute
    if (this.type === 'checkbox') {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    } else {
      this.removeAttribute('aria-checked');
    }
  }

  @watch('disabled')
  handleDisabledChange() {
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  @watch('type')
  handleTypeChange() {
    if (this.type === 'checkbox') {
      this.setAttribute('role', 'menuitemcheckbox');
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    } else {
      this.setAttribute('role', 'menuitem');
      this.removeAttribute('aria-checked');
    }
  }

  /** Returns a text label based on the contents of the menu item's default slot. */
  getTextLabel() {
    return getTextContent(this.defaultSlot);
  }

  isSubmenu() {
    return this.hasUpdated ? this.querySelector(`:scope > [slot="submenu"]`) !== null : this.withSubmenu;
  }

  render() {
    const isRtl = this.hasUpdated ? this.localize.dir() === 'rtl' : this.dir === 'rtl';
    const isSubmenuExpanded = this.submenuController.isExpanded();

    return html`
      <div
        id="anchor"
        part="base"
        class=${classMap({
          'menu-item': true,
          'menu-item--checked': this.checked,
          'menu-item--loading': this.loading,
          'menu-item--has-submenu': this.isSubmenu(),
          'menu-item--submenu-expanded': isSubmenuExpanded,
        })}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${isSubmenuExpanded ? true : false}"
      >
        <span part="checked-icon" class="check">
          <wa-icon name="check" library="system" variant="solid" aria-hidden="true"></wa-icon>
        </span>

        <slot name="prefix" part="prefix" class="prefix"></slot>

        <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="suffix"></slot>

        <span part="submenu-icon" class="chevron">
          <wa-icon
            name=${isRtl ? 'chevron-left' : 'chevron-right'}
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>
        </span>

        ${this.submenuController.renderSubmenu()} ${this.loading ? html`<wa-spinner part="spinner"></wa-spinner>` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-menu-item': WaMenuItem;
  }
}
