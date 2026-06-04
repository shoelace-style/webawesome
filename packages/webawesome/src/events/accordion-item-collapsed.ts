export class WaAccordionItemCollapsedEvent extends Event {
  constructor() {
    super('wa-accordion-item-collapsed', { bubbles: false, cancelable: false, composed: false });
  }
}
