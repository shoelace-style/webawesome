import type { PropertyValues } from 'lit';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HasSlotController } from '../../internal/slot.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './divider.styles.js';

/**
 * @summary Dividers visually separate or group adjacent elements with a horizontal or vertical line. Use them to
 *  establish rhythm and hierarchy within menus, toolbars, and layouts.
 * @documentation https://webawesome.com/docs/components/divider
 * @status stable
 * @since 2.0
 *
 * @slot - An optional label to show in the center of the divider.
 *
 * @csspart label - The container that wraps the divider's label.
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 * @cssproperty --label-spacing - The amount of space between the label and the divider's lines.
 * @cssproperty --label-offset - The length of the line between the divider's edge and a label placed at the `start` or
 *  `end`.
 *
 * @ssr - If you slot in a label, set the `with-label` attribute, otherwise the label won't be centered in the divider
 *  until the component hydrates on the client. This works around the lack of a `:has-slotted` CSS pseudo-class.
 */
@customElement('wa-divider')
export default class WaDivider extends WebAwesomeElement {
  static css = styles;

  private readonly hasSlotController = new HasSlotController(this, '[default]');

  /** Sets the divider's orientation. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Only required for SSR. Set to `true` if you're slotting in a label so the server-rendered markup includes the
   * label's layout before the component hydrates on the client.
   */
  @property({ attribute: 'with-label', type: Boolean, reflect: true }) withLabel = false;

  /** Where the label sits along the divider. */
  @property({ attribute: 'label-placement', reflect: true }) labelPlacement: 'start' | 'center' | 'end' = 'center';

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    this.withLabel = this.hasSlotController.test('[default]', 'withLabel');
    super.willUpdate(changedProperties);
  }

  @watch('orientation')
  handleVerticalChange() {
    this.setAttribute('aria-orientation', this.orientation);
  }

  private handleSlotChange() {
    // A separator's children are presentational, so the label is exposed as the accessible name instead. An aria-label
    // attribute set by the author still takes precedence.
    if (this.internals) {
      this.internals.ariaLabel = this.textContent?.trim() || null;
    }
  }

  render() {
    return html`<slot part="label" class="label" @slotchange=${this.handleSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-divider': WaDivider;
  }
}
