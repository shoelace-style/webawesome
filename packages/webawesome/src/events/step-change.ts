import type WaStep from '../components/step/step.js';

export class WaStepChangeEvent extends Event {
  readonly detail: WaStepChangeEventDetail;

  constructor(detail: WaStepChangeEventDetail) {
    super('wa-step-change', { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

interface WaStepChangeEventDetail {
  /** The step that will become active if the event isn't canceled. */
  step: WaStep;
  /** The step that's currently active, or `null` if none is. */
  previousStep: WaStep | null;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-step-change': WaStepChangeEvent;
  }
}
