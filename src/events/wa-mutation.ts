export type WaMutationEvent = CustomEvent<{ mutationList: MutationRecord[] }>;

declare global {
  interface GlobalEventHandlersEventMap {
    'wa-mutation': WaMutationEvent;
  }
}
