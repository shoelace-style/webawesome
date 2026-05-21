import type WaAccordionItem from '../components/accordion-item/accordion-item.js';

export class WaAccordionCollapseEvent extends Event {
  readonly detail: { item: WaAccordionItem };

  constructor(detail: { item: WaAccordionItem }) {
    super('wa-collapse', { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

