export class WaMutationEvent extends Event {
  readonly detail: WaMutationEventDetail;

  constructor(detail: WaMutationEventDetail) {
    super('wa-mutation', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaMutationEventDetail {
  mutationList: MutationRecord[];
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-mutation': WaMutationEvent;
  }
}
