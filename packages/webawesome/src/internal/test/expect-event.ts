import { expect } from '@open-wc/testing';

/**
 * Verifies that the specified events fire on an element during an action.
 *
 * Usage:
 *   await expectEvent(el, ['input', 'wa-input'], () => clickOnElement(el));
 *   const events = await expectEvent(el, 'wa-change', () => el.click());
 *
 * Options:
 *   - timeout: max ms to wait for events (default 1000)
 *   - count: expected number of times each event fires (default 1)
 */
export async function expectEvent(
  el: Element,
  events: string | string[],
  action: () => void | Promise<void>,
  options: { timeout?: number; count?: number } = {},
): Promise<Event[]> {
  const eventNames = Array.isArray(events) ? events : [events];
  const { timeout = 1000, count = 1 } = options;

  const collected: Map<string, Event[]> = new Map();
  const listeners: Array<[string, EventListener]> = [];

  for (const name of eventNames) {
    collected.set(name, []);
    const handler = (event: Event) => {
      collected.get(name)!.push(event);
    };
    listeners.push([name, handler]);
    el.addEventListener(name, handler);
  }

  try {
    await action();

    // Wait for events to arrive (they may be async / microtask-deferred)
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const allReceived = eventNames.every(name => collected.get(name)!.length >= count);
      if (allReceived) break;
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Assert each event fired the expected number of times
    for (const name of eventNames) {
      const received = collected.get(name)!;
      expect(received.length).to.equal(count, `Expected event "${name}" to fire ${count} time(s), but it fired ${received.length} time(s)`);
    }

    // Return all captured events in order for further assertions
    const allEvents: Event[] = [];
    for (const name of eventNames) {
      allEvents.push(...collected.get(name)!);
    }
    return allEvents;
  } finally {
    for (const [name, handler] of listeners) {
      el.removeEventListener(name, handler);
    }
  }
}
