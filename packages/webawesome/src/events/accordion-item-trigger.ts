import type WaAccordionItem from '../components/accordion-item/accordion-item.js';

export class WaAccordionItemTriggerEvent extends Event {
  readonly detail: { item: WaAccordionItem };

  constructor(detail: { item: WaAccordionItem }) {
    super('wa-accordion-item-trigger', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}
