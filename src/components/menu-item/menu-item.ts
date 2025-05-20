import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import getText from '../../internal/get-text.js';
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
 * @slot checked-icon - The icon used to indicate that this menu item is checked. Usually a `<wa-icon>`.
 * @slot submenu-icon - The icon used to indicate that this menu item has a submenu. Usually a `<wa-icon>`.
 *
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
 *
 * @cssstate has-submenu - Applied when the menu item has a submenu.
 * @cssstate submenu-expanded - Applied when the menu item has a submenu and it is expanded.
 */
@customElement('wa-menu-item')
export default class WaMenuItem extends WebAwesomeElement {
  static shadowStyle = styles;

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

  _label: string = '';
  /**
   * The option’s plain text label.
   * Usually automatically generated, but can be useful to provide manually for cases involving complex content.
   */
  @property()
  set label(value) {
    const oldValue = this._label;
    this._label = value || '';

    if (this._label !== oldValue) {
      this.requestUpdate('label', oldValue);
    }
  }

  get label(): string {
    if (this._label) {
      return this._label;
    }

    if (!this.defaultLabel) {
      this.updateDefaultLabel();
    }

    return this.defaultLabel;
  }

  /** The default label, generated from the element contents. Will be equal to `label` in most cases. */
  @state() defaultLabel = '';

  /**
   * Used for SSR purposes. If true, will render a ">" caret icon for showing that it has a submenu, but will be non-interactive.
   */
  @property({ attribute: 'with-submenu', type: Boolean }) withSubmenu = false;

  private submenuController: SubmenuController = new SubmenuController(this);

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleHostClick);
    this.addEventListener('mouseover', this.handleMouseOver);
    this.updateDefaultLabel();
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
    let labelChanged = this.updateDefaultLabel();

    // When the label changes, emit a slotchange event so parent controls see it
    if (labelChanged) {
      /** @internal - prevent the CEM from recording this event */
      this.dispatchEvent(new Event('slotchange', { bubbles: true, composed: false, cancelable: false }));
    }

    this.toggleCustomState('has-submenu', this.isSubmenu());
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

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('checked')) {
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

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    }

    if (changedProperties.has('type')) {
      if (this.type === 'checkbox') {
        this.setAttribute('role', 'menuitemcheckbox');
        this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
      } else {
        this.setAttribute('role', 'menuitem');
        this.removeAttribute('aria-checked');
      }
    }
  }

  private updateDefaultLabel() {
    let oldValue = this.defaultLabel;
    this.defaultLabel = getText(this).trim();
    let changed = this.defaultLabel !== oldValue;

    if (!this._label && changed) {
      // Uses default label, and it has changed
      this.requestUpdate('label', oldValue);
    }

    return changed;
  }

  /** Does this element have a submenu? */
  private isSubmenu() {
    return this.hasUpdated ? this.querySelector(`:scope > [slot="submenu"]`) !== null : this.withSubmenu;
  }

  render() {
    const isRtl = this.hasUpdated ? this.localize.dir() === 'rtl' : this.dir === 'rtl';
    const isSubmenuExpanded = this.submenuController.isExpanded();
    this.toggleCustomState('submenu-expanded', isSubmenuExpanded);

    this.internals.ariaHasPopup = this.isSubmenu() + '';
    this.internals.ariaExpanded = isSubmenuExpanded + '';

    return html`
      <slot name="checked-icon" part="checked-icon" class="check">
        <wa-icon name="check" library="system" variant="solid" aria-hidden="true"></wa-icon>
      </slot>

      <slot name="prefix" part="prefix" class="prefix"></slot>

      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>

      <slot name="suffix" part="suffix" class="suffix"></slot>

      <slot name="submenu-icon" part="submenu-icon" class="chevron">
        <wa-icon
          name=${isRtl ? 'chevron-left' : 'chevron-right'}
          library="system"
          variant="solid"
          aria-hidden="true"
        ></wa-icon>
      </slot>

      ${this.submenuController.renderSubmenu()} ${this.loading ? html`<wa-spinner part="spinner"></wa-spinner>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-menu-item': WaMenuItem;
  }
}
