import type WaAccordionItem from '../components/accordion-item/accordion-item.js';

export class WaAccordionExpandEvent extends Event {
  readonly detail: { item: WaAccordionItem };

  constructor(detail: { item: WaAccordionItem }) {
    super('wa-expand', { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}
