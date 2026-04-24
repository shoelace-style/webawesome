import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type WaButton from '../button/button.js';
import styles from './button-group.styles.js';

/**
 * @summary Button groups combine related buttons into a single visual unit. Use them for toolbars, segmented controls,
 *  or any set of actions that belong together.
 * @documentation https://webawesome.com/docs/components/button-group
 * @status stable
 * @since 2.0
 *
 * @slot - One or more `<wa-button>` elements to display in the button group.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('wa-button-group')
export default class WaButtonGroup extends WebAwesomeElement {
  static css = [styles];

  @query('slot') defaultSlot: HTMLSlotElement;

  @state() disableRole = false;
  @state() hasOutlined = false;

  /**
   * A label to use for the button group. This won't be displayed on the screen, but it will be announced by assistive
   * devices when interacting with the control and is strongly recommended.
   */
  @property() label = '';

  /** The button group's orientation. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
    }
  }

  private handleFocus(event: Event) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.add('button-focus');
  }

  private handleBlur(event: Event) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.remove('button-focus');
  }

  private handleMouseOver(event: Event) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.add('button-hover');
  }

  private handleMouseOut(event: Event) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.remove('button-hover');
  }

  render() {
    return html`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole ? 'presentation' : 'group'}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      ></slot>
    `;
  }
}

function findButton(el: HTMLElement) {
  const selector = 'wa-button, wa-radio-button';

  // The button could be the target element or a child of it (e.g. a dropdown or tooltip anchor)
  return (el.closest(selector) ?? el.querySelector(selector)) as WaButton;
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-button-group': WaButtonGroup;
  }
}
