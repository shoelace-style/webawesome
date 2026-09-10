import type WaStep from '../components/step/step.js';

export class WaAfterStepChangeEvent extends Event {
  readonly detail: WaAfterStepChangeEventDetail;

  constructor(detail: WaAfterStepChangeEventDetail) {
    super('wa-after-step-change', { bubbles: true, cancelable: false, composed: true });
    this.detail = detail;
  }
}

interface WaAfterStepChangeEventDetail {
  /** The step that's now active. */
  step: WaStep;
  /** The step that was active before, or `null` if none was. */
  previousStep: WaStep | null;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-after-step-change': WaAfterStepChangeEvent;
  }
}
