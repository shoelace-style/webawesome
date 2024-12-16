import { html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './button-group.css';

/**
 * @summary Button groups can be used to group related buttons into sections.
 * @documentation https://backers.webawesome.com/docs/components/button-group
 * @status stable
 * @since 2.0
 *
 * @slot - One or more `<wa-button>` elements to display in the button group.
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('wa-button-group')
export default class WaButtonGroup extends WebAwesomeElement {
  static shadowStyle = styles;

  @query('slot') defaultSlot: HTMLSlotElement;

  /** @internal */
  @state() disableRole = false;

  /**
   * A label to use for the button group. This won't be displayed on the screen, but it will be announced by assistive
   * devices when interacting with the control and is strongly recommended.
   */
  @property() label = '';

  /** The button group's orientation. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
      this.updateClassNames();
    }
  }

  private handleFocus(event: Event) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.add('wa-button-group__button--focus');
  }

  private handleBlur(event: Event) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.remove('wa-button-group__button--focus');
  }

  private handleMouseOver(event: Event) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.add('wa-button-group__button--hover');
  }

  private handleMouseOut(event: Event) {
    const button = findButton(event.target as HTMLElement);
    button?.classList.remove('wa-button-group__button--hover');
  }

  private handleSlotChange() {
    this.updateClassNames();
  }

  private updateClassNames() {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })] as HTMLElement[];

    slottedElements.forEach(el => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);

      if (button) {
        button.classList.add('wa-button-group__button');
        button.classList.toggle('wa-button-group-horizontal', this.orientation === 'horizontal');
        button.classList.toggle('wa-button-group-vertical', this.orientation === 'vertical');
        button.classList.toggle('wa-button-group__button--first', index === 0);
        button.classList.toggle('wa-button-group__button--inner', index > 0 && index < slottedElements.length - 1);
        button.classList.toggle('wa-button-group__button--last', index === slottedElements.length - 1);
        button.classList.toggle('wa-button-group__button--radio', button.tagName.toLowerCase() === 'wa-radio-button');
      }
    });
  }

  render() {
    // eslint-disable-next-line lit-a11y/mouse-events-have-key-events
    return html`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole ? 'presentation' : 'group'}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

function findButton(el: HTMLElement) {
  const selector = 'wa-button, wa-radio-button';

  // The button could be the target element or a child of it (e.g. a dropdown or tooltip anchor)
  return el.closest(selector) ?? el.querySelector(selector);
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-button-group': WaButtonGroup;
  }
}
