import Component from '../../components/mutation-observer/mutation-observer.js';
import { type EventName } from '@lit/react';
import type { WaMutationEvent } from '../../events/events.js';
export type { WaMutationEvent } from '../../events/events.js';
/**
 * @summary The Mutation Observer component offers a thin, declarative interface to the [`MutationObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
 * @documentation https://backers.webawesome.com/docs/components/mutation-observer
 * @status stable
 * @since 2.0
 *
 * @event {{ mutationList: MutationRecord[] }} wa-mutation - Emitted when a mutation occurs.
 *
 * @slot - The content to watch for mutations.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaMutation: EventName<WaMutationEvent>;
}>;
export default reactWrapper;
