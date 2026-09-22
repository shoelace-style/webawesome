import type WaStep from '../components/step/step.js';

export class WaStepChangeEvent extends Event {
  readonly detail: WaStepChangeEventDetail;

  constructor(detail: WaStepChangeEventDetail) {
    super('wa-step-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaStepChangeEventDetail {
  /** The step that's now active. */
  step: WaStep;
  /** The step that was active before, or `null` if none was. */
  previousStep: WaStep | null;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-step-change': WaStepChangeEvent;
  }
}
