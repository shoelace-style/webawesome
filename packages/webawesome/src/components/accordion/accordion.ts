import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { WaAccordionAfterCollapseEvent } from '../../events/accordion-after-collapse.js';
import { WaAccordionAfterExpandEvent } from '../../events/accordion-after-expand.js';
import { WaAccordionCollapseEvent } from '../../events/accordion-collapse.js';
import { WaAccordionExpandEvent } from '../../events/accordion-expand.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import '../accordion-item/accordion-item.js';
import type WaAccordionItem from '../accordion-item/accordion-item.js';
import styles from './accordion.styles.js';

/**
 * @summary Accordions are a vertically stacked set of interactive headings that each contain a title, representing a section of content.
 * @documentation https://webawesome.com/docs/components/accordion
 * @status experimental
 * @since 3.7
 *
 * @dependency wa-accordion-item
 *
 * @slot - One or more `<wa-accordion-item>` elements.
 *
 * @event {{ item: WaAccordionItem }} wa-expand - Emitted before an item expands. Cancelable.
 * @event {{ item: WaAccordionItem }} wa-after-expand - Emitted after an item finishes expanding.
 * @event {{ item: WaAccordionItem }} wa-collapse - Emitted before an item collapses. Cancelable.
 * @event {{ item: WaAccordionItem }} wa-after-collapse - Emitted after an item finishes collapsing.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty [--border] - The border applied to the accordion's outer frame and item dividers.
 * @cssproperty [--radius] - The border radius of the outer frame.
 */
@customElement('wa-accordion')
export default class WaAccordion extends WebAwesomeElement {
  static css = styles;

  @query('slot') private defaultSlot: HTMLSlotElement;

  /** Restricts expansion to one panel at a time. */
  @property({ type: Boolean, reflect: true }) exclusive = false;

  /** The location of the expand/collapse icon in child items. */
  @property({ attribute: 'icon-placement', reflect: true }) iconPlacement: 'start' | 'end' = 'end';

  /** The heading level for child item triggers (1–6), or "none" to omit the heading wrapper. Defaults to 3. */
  @property({ attribute: 'heading-level', reflect: true }) headingLevel = '3';

  private getAllItems(): WaAccordionItem[] {
    return this.defaultSlot
      .assignedElements({ flatten: true })
      .filter((el): el is WaAccordionItem => el.tagName.toLowerCase() === 'wa-accordion-item');
  }

  private getFocusableItems(): WaAccordionItem[] {
    return this.getAllItems().filter(item => !item.disabled);
  }

  private initRovingTabIndex() {
    this.getFocusableItems().forEach((item, index) => {
      item.isTabbable = index === 0;
    });
  }

  private handleSlotChange() {
    this.syncIconPlacement();
    this.syncHeadingLevel();
    this.initRovingTabIndex();
  }

  private handleFocusIn(event: FocusEvent) {
    const items = this.getFocusableItems();
    const path = event.composedPath();
    const focusedItem = items.find(item => path.includes(item));
    if (!focusedItem) return;
    items.forEach(item => (item.isTabbable = item === focusedItem));
  }

  private handleKeyDown(event: KeyboardEvent) {
    const items = this.getFocusableItems();
    if (!items.length) return;

    const path = event.composedPath();
    if (!items.some(item => path.includes(item))) return;

    const currentIndex = items.findIndex(item => item.isTabbable);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    items.forEach((item, index) => (item.isTabbable = index === nextIndex));
    items[nextIndex].focus();
  }

  @watch('iconPlacement', { waitUntilFirstUpdate: true })
  syncIconPlacement() {
    this.getAllItems().forEach(item => (item.iconPlacement = this.iconPlacement));
  }

  @watch('headingLevel', { waitUntilFirstUpdate: true })
  syncHeadingLevel() {
    this.getAllItems().forEach(item => (item.headingLevel = this.headingLevel));
  }

  private async handleItemTrigger(event: CustomEvent<{ item: WaAccordionItem }>) {
    const { item } = event.detail;
    if (item.disabled) return;

    if (item.expanded) {
      const waCollapse = new WaAccordionCollapseEvent({ item });
      this.dispatchEvent(waCollapse);
      if (waCollapse.defaultPrevented) return;
      await item.collapse();
      this.dispatchEvent(new WaAccordionAfterCollapseEvent({ item }));
    } else {
      if (this.exclusive) {
        this.getAllItems()
          .filter(i => i !== item && i.expanded)
          .forEach(i => i.collapse());
      }
      const waExpand = new WaAccordionExpandEvent({ item });
      this.dispatchEvent(waExpand);
      if (waExpand.defaultPrevented) return;
      await item.expand();
      this.dispatchEvent(new WaAccordionAfterExpandEvent({ item }));
    }
  }

  /** Expands all accordion items. No-op when `exclusive` is set. */
  expandAll() {
    if (this.exclusive) return;
    this.getAllItems()
      .filter(item => !item.disabled && !item.expanded)
      .forEach(item => item.expand());
  }

  /** Collapses all accordion items. */
  collapseAll() {
    this.getAllItems()
      .filter(item => item.expanded)
      .forEach(item => item.collapse());
  }

  render() {
    return html`
      <div part="base" @wa-accordion-item-trigger=${this.handleItemTrigger} @focusin=${this.handleFocusIn} @keydown=${this.handleKeyDown}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-accordion': WaAccordion;
  }
}
