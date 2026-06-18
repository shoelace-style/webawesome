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
 */
@customElement('wa-accordion')
export default class WaAccordion extends WebAwesomeElement {
  static css = styles;

  @query('slot') private defaultSlot: HTMLSlotElement;

  /**
   * Controls how items can be expanded. `multiple` (the default) allows any number of items to be open at
   * once. `single` allows only one item to be open at a time; opening a new item collapses the previously
   * open one, and clicking an open item does not collapse it. `single-collapsible` is the same as `single`
   * except that clicking the open item collapses it, so zero open items is a valid state.
   */
  @property({ reflect: true }) mode: 'single' | 'single-collapsible' | 'multiple' = 'multiple';

  /** The location of the expand/collapse icon in child items. */
  @property({ attribute: 'icon-placement', reflect: true }) iconPlacement: 'start' | 'end' = 'end';

  /** The heading level for child item triggers (1–6), or "none" to omit the heading wrapper. Defaults to 3. */
  @property({ attribute: 'heading-level', reflect: true }) headingLevel = '3';

  /** The accordion's visual appearance. */
  @property({ reflect: true }) appearance: 'filled' | 'outlined' | 'filled-outlined' | 'plain' = 'outlined';

  private getAllItems(): WaAccordionItem[] {
    return this.defaultSlot
      .assignedElements({ flatten: true })
      .filter((el): el is WaAccordionItem => el.tagName.toLowerCase() === 'wa-accordion-item');
  }

  private getFocusableItems(): WaAccordionItem[] {
    return this.getAllItems().filter(item => !item.disabled);
  }

  private ownsItem(item: WaAccordionItem): boolean {
    return item.closest('wa-accordion') === this;
  }

  private initRovingTabIndex() {
    this.getFocusableItems().forEach((item, index) => {
      item.isTabbable = index === 0;
    });
  }

  private handleSlotChange() {
    if (this.didSSR) {
      const promises: Promise<boolean>[] = [];

      this.getAllItems().forEach(item => {
        if (item.didSSR && !item.hasUpdated) {
          promises.push(item.updateComplete);
        }
      });

      // need to watch for hydration of these children to finish before we write to them.
      if (promises.length > 0) {
        Promise.allSettled(promises).then(() => {
          this.handleSlotChange();
        });
        return;
      }
    }

    this.syncIconPlacement();
    this.syncHeadingLevel();
    this.syncAppearance();
    this.initRovingTabIndex();
  }

  private handleFocusIn(event: FocusEvent) {
    const items = this.getFocusableItems();
    const path = event.composedPath();
    const closestItem = path.find(
      (el): el is WaAccordionItem => el instanceof Element && el.tagName.toLowerCase() === 'wa-accordion-item',
    );
    if (!closestItem || !this.ownsItem(closestItem)) return;
    const focusedItem = items.find(item => item === closestItem);
    if (!focusedItem) return;
    items.forEach(item => (item.isTabbable = item === focusedItem));
  }

  private handleKeyDown(event: KeyboardEvent) {
    const items = this.getFocusableItems();
    if (!items.length) return;

    const path = event.composedPath();
    const closestItem = path.find(
      (el): el is WaAccordionItem => el instanceof Element && el.tagName.toLowerCase() === 'wa-accordion-item',
    );
    if (!closestItem || !this.ownsItem(closestItem)) return;

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

  @watch('appearance', { waitUntilFirstUpdate: true })
  syncAppearance() {
    this.getAllItems().forEach(item => (item.appearance = this.appearance));
  }

  private async handleItemTrigger(event: CustomEvent<{ item: WaAccordionItem }>) {
    const { item } = event.detail;
    if (!this.ownsItem(item)) return;
    event.stopPropagation();
    if (item.disabled) return;

    if (item.expanded) {
      if (this.mode === 'single') return;
      const waCollapse = new WaAccordionCollapseEvent({ item });
      this.dispatchEvent(waCollapse);
      if (waCollapse.defaultPrevented) return;
      await item.collapse();
      this.dispatchEvent(new WaAccordionAfterCollapseEvent({ item }));
    } else {
      if (this.mode === 'single' || this.mode === 'single-collapsible') {
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

  /** Expands all accordion items. No-op when `mode` is `single` or `single-collapsible`. */
  expandAll() {
    if (this.mode === 'single' || this.mode === 'single-collapsible') return;
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
      <slot
        @slotchange=${this.handleSlotChange}
        @wa-accordion-item-trigger=${this.handleItemTrigger}
        @focusin=${this.handleFocusIn}
        @keydown=${this.handleKeyDown}
      ></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-accordion': WaAccordion;
  }
}
