import '../icon-button/icon-button.js';
import { animateWithClass } from '../../internal/animate.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import { html, isServer } from 'lit';
import { LocalizeController } from '../../utilities/localize.js';
import { lockBodyScrolling, unlockBodyScrolling } from '../../internal/scroll.js';
import { WaAfterHideEvent } from '../../events/after-hide.js';
import { WaAfterShowEvent } from '../../events/after-show.js';
import { WaHideEvent } from '../../events/hide.js';
import { WaShowEvent } from '../../events/show.js';
import { watch } from '../../internal/watch.js';
import styles from './drawer.css';
import WebAwesomeElement from '../../internal/webawesome-element.js';

/**
 * @summary Drawers slide in from a container to expose additional options and information.
 * @documentation https://backers.webawesome.com/docs/components/drawer
 * @status stable
 * @since 2.0
 *
 * @dependency wa-icon-button
 *
 * @slot - The drawer's main content.
 * @slot label - The drawer's label. Alternatively, you can use the `label` attribute.
 * @slot header-actions - Optional actions to add to the header. Works best with `<wa-icon-button>`.
 * @slot footer - The drawer's footer, usually one or more buttons representing various options.
 *
 * @event wa-show - Emitted when the drawer opens.
 * @event wa-after-show - Emitted after the drawer opens and all animations are complete.
 * @event wa-hide - Emitted when the drawer closes.
 * @event wa-after-hide - Emitted after the drawer closes and all animations are complete.
 * @event {{ source: Element }} wa-hide - Emitted when the drawer is requesting to close. Calling
 *  `event.preventDefault()` will prevent the dialog from closing. You can inspect `event.detail.source` to see which
 *  element caused the dialog to close. If the source is the dialog element itself, the user has pressed [[Escape]] or
 *  the dialog has been closed programmatically. Avoid using this unless closing the dialog will result in destructive
 *  behavior such as data loss.
 *
 * @csspart header - The drawer's header. This element wraps the title and header actions.
 * @csspart header-actions - Optional actions to add to the header. Works best with `<wa-icon-button>`.
 * @csspart title - The drawer's title.
 * @csspart close-button - The close button, a `<wa-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 * @csspart body - The drawer's body.
 * @csspart footer - The drawer's footer.
 *
 * @cssproperty --background-color - The drawer's background color.
 * @cssproperty --box-shadow - The shadow effects around the edges of the drawer.
 * @cssproperty --spacing - The amount of space around and between the drawer's content.
 * @cssproperty --size - The preferred size of the drawer. This will be applied to the drawer's width or height
 *   depending on its `placement`. Note that the drawer will shrink to accommodate smaller screens.
 * @cssproperty [--show-duration=200ms] - The animation duration when showing the drawer.
 * @cssproperty [--hide-duration=200ms] - The animation duration when hiding the drawer.
 *
 * @property modal - Exposes the internal modal utility that controls focus trapping. To temporarily disable focus
 *   trapping and allow third-party modals spawned from an active Shoelace modal, call `modal.activateExternal()` when
 *   the third-party modal opens. Upon closing, call `modal.deactivateExternal()` to restore Shoelace's focus trapping.
 */
@customElement('wa-drawer')
export default class WaDrawer extends WebAwesomeElement {
  static shadowStyle = styles;

  private readonly localize = new LocalizeController(this);
  private originalTrigger: HTMLElement | null;
  private closeWatcher: CloseWatcher | null;

  @query('.drawer') drawer: HTMLDialogElement;

  /**
   * Indicates whether or not the drawer is open. You can toggle this attribute to show and hide the drawer, or you can
   * use the `show()` and `hide()` methods and this attribute will reflect the drawer's open state.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * The drawer's label as displayed in the header. You should always include a relevant label, as it is required for
   * proper accessibility. If you need to display HTML, use the `label` slot instead.
   */
  @property({ reflect: true }) label = '';

  /** The direction from which the drawer will open. */
  @property({ reflect: true }) placement: 'top' | 'end' | 'bottom' | 'start' = 'end';

  /** Renders the drawer with a header. */
  @property({ attribute: 'with-header', type: Boolean, reflect: true }) withHeader = false;

  /** Renders the drawer with a footer. */
  @property({ attribute: 'with-footer', type: Boolean, reflect: true }) withFooter = false;

  /** When enabled, the drawer will be closed when the user clicks outside of it. */
  @property({ attribute: 'light-dismiss', type: Boolean }) lightDismiss = true;

  firstUpdated() {
    if (isServer) {
      return;
    }
    if (this.open) {
      this.addOpenListeners();
      this.drawer.showModal();
      lockBodyScrolling(this);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
    this.removeOpenListeners();
  }

  private async requestClose(source: Element) {
    // Hide
    const waHideEvent = new WaHideEvent({ source });
    this.dispatchEvent(waHideEvent);

    if (waHideEvent.defaultPrevented) {
      this.open = true;
      animateWithClass(this.drawer, 'pulse');
      return;
    }

    this.removeOpenListeners();

    await animateWithClass(this.drawer, 'hide');

    this.open = false;
    this.drawer.close();
    unlockBodyScrolling(this);

    // Restore focus to the original trigger
    const trigger = this.originalTrigger;
    if (typeof trigger?.focus === 'function') {
      setTimeout(() => trigger.focus());
    }

    this.dispatchEvent(new WaAfterHideEvent());
  }

  private addOpenListeners() {
    if ('CloseWatcher' in window) {
      this.closeWatcher?.destroy();
      this.closeWatcher = new CloseWatcher();
      this.closeWatcher.onclose = () => {
        this.requestClose(this.drawer);
      };
    } else {
      this.closeWatcher?.destroy();
      document.addEventListener('keydown', this.handleDocumentKeyDown);
    }
  }

  private removeOpenListeners() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  private handleDialogCancel(event: Event) {
    event.preventDefault();

    if (!this.drawer.classList.contains('hide')) {
      this.requestClose(this.drawer);
    }
  }

  private handleDialogClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const button = target.closest('[data-drawer="close"]');

    // Close when a button with [data-drawer="close"] is clicked
    if (button) {
      event.stopPropagation();
      this.requestClose(button);
    }
  }

  private async handleDialogPointerDown(event: PointerEvent) {
    // Detect when the backdrop is clicked
    if (event.target === this.drawer) {
      if (this.lightDismiss) {
        this.requestClose(this.drawer);
      } else {
        await animateWithClass(this.drawer, 'pulse');
      }
    }
  }

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      event.preventDefault();
      event.stopPropagation();
      this.requestClose(this.drawer);
    }
  };

  @watch('open', { waitUntilFirstUpdate: true })
  handleOpenChange() {
    // Open or close the drawer
    if (this.open && !this.drawer.open) {
      this.show();
    } else if (this.drawer.open) {
      this.open = true;
      this.requestClose(this.drawer);
    }
  }

  /** Shows the drawer. */
  private async show() {
    // Show
    const waShowEvent = new WaShowEvent();
    this.dispatchEvent(waShowEvent);
    if (waShowEvent.defaultPrevented) {
      this.open = false;
      return;
    }

    // Show
    this.addOpenListeners();
    this.originalTrigger = document.activeElement as HTMLElement;
    this.open = true;
    this.drawer.showModal();

    lockBodyScrolling(this);

    // Set focus on autocomplete if it exists
    requestAnimationFrame(() => {
      const elementToFocus = this.querySelector<HTMLButtonElement>('[autofocus]');
      if (elementToFocus && typeof elementToFocus.focus === 'function') {
        elementToFocus.focus();
      }
    });

    await animateWithClass(this.drawer, 'show');

    this.dispatchEvent(new WaAfterShowEvent());
  }

  render() {
    return html`
      <dialog
        part="dialog"
        class=${classMap({
          drawer: true,
          'drawer--open': this.open,
          'drawer--top': this.placement === 'top',
          'drawer--end': this.placement === 'end',
          'drawer--bottom': this.placement === 'bottom',
          'drawer--start': this.placement === 'start',
          'drawer--rtl': this.localize.dir() === 'rtl',
          'drawer--with-header': this.withHeader,
          'drawer--with-footer': this.withFooter
        })}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${this.withHeader
          ? html`
              <header part="header" class="drawer__header">
                <h2 part="title" class="drawer__title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(65279)} </slot>
                </h2>
                <div part="header-actions" class="drawer__header-actions">
                  <slot name="header-actions"></slot>
                  <wa-icon-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="drawer__close"
                    name="xmark"
                    label=${this.localize.term('close')}
                    library="system"
                    variant="solid"
                    @click="${(event: PointerEvent) => this.requestClose(event.target as Element)}"
                  ></wa-icon-button>
                </div>
              </header>
            `
          : ''}

        <div part="body" class="drawer__body"><slot></slot></div>

        ${this.withFooter
          ? html`
              <footer part="footer" class="drawer__footer">
                <slot name="footer"></slot>
              </footer>
            `
          : ''}
      </dialog>
    `;
  }
}

if (!isServer) {
  // Ugly, but it fixes light dismiss in Safari: https://bugs.webkit.org/show_bug.cgi?id=267688
  document.body.addEventListener('pointerdown', () => {
    /* empty */
  });
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-drawer': WaDrawer;
  }
}
