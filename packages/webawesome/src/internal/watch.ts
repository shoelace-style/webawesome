import { notEqual, type LitElement } from 'lit';

type UpdateHandler = (prev?: unknown, next?: unknown) => void;

type NonUndefined<A> = A extends undefined ? never : A;

type UpdateHandlerFunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends UpdateHandler ? K : never;
}[keyof T];

interface WatchOptions {
  /**
   * If true, will only start watching after the initial update/render
   */
  waitUntilFirstUpdate?: boolean;
}

/** A decorated method and the properties it watches, each paired with its `waitUntilFirstUpdate` option. */
interface Watcher {
  handler: PropertyKey;
  properties: [PropertyKey, boolean][];
}

type WatchedElement = Record<PropertyKey, unknown> & { hasUpdated: boolean };

const watchersKey = Symbol('watchers');

// Lit folds changes made during update() into the current update without scheduling another one, so a handler that
// changes a watched property has to be caught here. Keep passing over the watchers until none has an unseen change.
function runWatchers(element: WatchedElement, watchers: Watcher[], changedProps: Map<PropertyKey, unknown>) {
  // The value each watcher last handled for each property.
  const seen = new Map(watchers.map(watcher => [watcher, new Map<PropertyKey, unknown>()]));

  // ponytail: fixed pass cap so handlers that keep changing each other can't hang the page.
  for (let pass = 0; pass < 10; pass++) {
    let ranHandler = false;

    for (const watcher of watchers) {
      const lastSeen = seen.get(watcher)!;

      for (const [property, waitUntilFirstUpdate] of watcher.properties) {
        if (!changedProps.has(property)) continue;

        const oldValue = lastSeen.has(property) ? lastSeen.get(property) : changedProps.get(property);
        const newValue = element[property];
        if (!notEqual(newValue, oldValue)) continue;

        lastSeen.set(property, newValue);
        if (waitUntilFirstUpdate && !element.hasUpdated) continue;

        const valuesBefore = watcher.properties.map(([key]) => element[key]);
        (element[watcher.handler] as UpdateHandler)(oldValue, newValue);
        ranHandler = true;

        // A handler doesn't run again for changes it made to its own properties.
        watcher.properties.forEach(([key], index) => {
          if (notEqual(element[key], valuesBefore[index])) {
            lastSeen.set(key, element[key]);
          }
        });
      }
    }

    if (!ranHandler) return;
  }
}

/**
 * Runs when observed properties change, e.g. @property or @state, but before the component updates. To wait for an
 * update to complete after a change occurs, use `await this.updateComplete` in the handler. To start watching after the
 * initial update/render, use `{ waitUntilFirstUpdate: true }` or `this.hasUpdated` in the handler.
 *
 * Handlers see changes that other handlers make during the same update, regardless of declaration order.
 *
 * Usage:
 *
 * @watch('propName')
 * handlePropChange(oldValue, newValue) {
 *   ...
 * }
 */
export function watch(propertyName: string | string[], options?: WatchOptions) {
  const waitUntilFirstUpdate = options?.waitUntilFirstUpdate ?? false;
  const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];

  return <ElemClass extends LitElement>(proto: ElemClass, decoratedFnName: UpdateHandlerFunctionKeys<ElemClass>) => {
    const target = proto as unknown as {
      [watchersKey]?: Watcher[];
      update(changedProps: Map<PropertyKey, unknown>): void;
    };

    // Only the first watched class in a prototype chain wraps update(). The wrapper reads the instance's list.
    if (!target[watchersKey]) {
      const { update } = target;
      target.update = function (this: WatchedElement, changedProps) {
        runWatchers(this, this[watchersKey] as Watcher[], changedProps);
        update.call(this, changedProps);
      };
    }

    // Each class gets its own list, starting with a copy of its parent's.
    if (!Object.prototype.hasOwnProperty.call(target, watchersKey)) {
      target[watchersKey] = (target[watchersKey] ?? []).map(watcher => ({
        ...watcher,
        properties: [...watcher.properties],
      }));
    }

    // Later declarations go first, matching the order from when each decorator wrapped update() around the last.
    const watchers = target[watchersKey]!;
    let watcher = watchers.find(existing => existing.handler === decoratedFnName);
    if (!watcher) {
      watcher = { handler: decoratedFnName, properties: [] };
      watchers.unshift(watcher);
    }
    watcher.properties.unshift(
      ...watchedProperties.map((name): [PropertyKey, boolean] => [name, waitUntilFirstUpdate]),
    );
  };
}
