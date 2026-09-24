import type WaStep from '../components/step/step.js';

export class WaBeforeStepChangeEvent extends Event {
  readonly detail: WaBeforeStepChangeEventDetail;

  constructor(detail: WaBeforeStepChangeEventDetail) {
    super('wa-before-step-change', { bubbles: true, cancelable: true, composed: true });
    this.detail = detail;
  }
}

interface WaBeforeStepChangeEventDetail {
  /** The name of the step that will become active if the event isn't canceled. */
  name: string;
  /** The name of the step that's currently active, or `null` if none is. */
  previousName: string | null;
  /** The step that will become active if the event isn't canceled. */
  step: WaStep;
  /** The step that's currently active, or `null` if none is. */
  previousStep: WaStep | null;
}

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-before-step-change': WaBeforeStepChangeEvent;
  }
}
