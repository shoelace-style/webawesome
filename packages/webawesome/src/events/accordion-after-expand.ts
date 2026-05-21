import type WaAccordionItem from '../components/accordion-item/accordion-item.js';

export class WaAccordionAfterExpandEvent extends Event {
  readonly detail: { item: WaAccordionItem };

  constructor(detail: { item: WaAccordionItem }) {
    super('wa-after-expand', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

