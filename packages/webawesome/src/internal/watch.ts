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

type WatchedElement = Record<PropertyKey, unknown> & { hasUpdated: boolean; localName: string };

const watchersKey = Symbol('watchers');
const maxPasses = 10;

// The property names passed to requestUpdate() while one of an element's handlers runs.
const propertiesSetByHandler = new WeakMap<object, Set<PropertyKey>>();
const warnedTags = new Set<string>();

function getOrCreate<K, V>(map: Map<K, V>, key: K, create: () => V) {
  if (!map.has(key)) map.set(key, create());
  return map.get(key)!;
}

// Lit folds changes made during update() into the current update without scheduling another one, so a handler that
// sets a watched property has to be caught here. Keep passing over the watchers until none has an unhandled set.
function runWatchers(element: WatchedElement, watchers: Watcher[], changedProps: Map<PropertyKey, unknown>) {
  // The value each watcher last handled, per property. Both maps are created only once a handler runs.
  let handled: Map<Watcher, Map<PropertyKey, unknown>> | undefined;
  // Watched properties that another handler set after this watcher last handled them.
  let unhandledSets: Map<Watcher, Set<PropertyKey>> | undefined;

  for (let pass = 0; pass < maxPasses; pass++) {
    for (const watcher of watchers) {
      for (const [property, waitUntilFirstUpdate] of watcher.properties) {
        // The first pass looks at every changed property. Later passes only look at sets made by other handlers.
        // Getters aren't reread to find changes, since some return a new array on every read.
        const lastHandled = handled?.get(watcher);
        const wasSet = unhandledSets?.get(watcher)?.delete(property) ?? false;
        const isFirstLook = pass === 0 && !lastHandled?.has(property);
        if (!changedProps.has(property) || !(wasSet || isFirstLook)) continue;

        const startValue = changedProps.get(property);
        const lastValue = lastHandled?.has(property) ? lastHandled.get(property) : startValue;
        const newValue = element[property];

        // A value set back to where it started this update counts as no change.
        if (!notEqual(newValue, lastValue) || !notEqual(newValue, startValue)) continue;
        if (waitUntilFirstUpdate && !element.hasUpdated) continue;

        handled ??= new Map();
        unhandledSets ??= new Map();
        getOrCreate(handled, watcher, () => new Map()).set(property, newValue);

        const propertiesSet = new Set<PropertyKey>();
        propertiesSetByHandler.set(element, propertiesSet);
        try {
          (element[watcher.handler] as UpdateHandler)(lastValue, newValue);
        } finally {
          propertiesSetByHandler.delete(element);
        }

        for (const name of propertiesSet) {
          for (const other of watchers) {
            if (!other.properties.some(([key]) => key === name)) continue;

            if (other === watcher) {
              // A handler doesn't run again for a property it set itself.
              handled.get(watcher)!.set(name, element[name]);
              unhandledSets.get(watcher)?.delete(name);
            } else {
              getOrCreate(unhandledSets, other, () => new Set()).add(name);
            }
          }
        }
      }
    }

    let hasUnhandledSets = false;
    unhandledSets?.forEach(properties => (hasUnhandledSets ||= properties.size > 0));
    if (!hasUnhandledSets) return;
  }

  if (!warnedTags.has(element.localName)) {
    warnedTags.add(element.localName);
    console.warn(
      `[${element.localName}] @watch handlers kept setting each other's properties, so they stopped after ` +
        `${maxPasses} passes. Make sure the handlers don't set properties back and forth.`,
    );
  }
}

/**
 * Runs when observed properties change, e.g. @property or @state, but before the component updates. To wait for an
 * update to complete after a change occurs, use `await this.updateComplete` in the handler. To start watching after the
 * initial update/render, use `{ waitUntilFirstUpdate: true }` or `this.hasUpdated` in the handler.
 *
 * Handlers see properties that other handlers set during the same update, regardless of declaration order. A handler
 * doesn't run again for a property it sets itself, or for one another handler sets back to its value at the start of
 * the update. Reruns follow named `requestUpdate(name)` calls, so an unnamed `requestUpdate()` doesn't trigger one.
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
      requestUpdate(name?: PropertyKey, ...rest: unknown[]): void;
    };

    // Only the first watched class in a prototype chain wraps update() and requestUpdate(). The update() wrapper reads
    // the instance's list. Lit's property setters call requestUpdate(name), which is how handler sets are recorded.
    if (!target[watchersKey]) {
      const { update, requestUpdate } = target;
      target.update = function (this: WatchedElement, changedProps) {
        runWatchers(this, this[watchersKey] as Watcher[], changedProps);
        update.call(this, changedProps);
      };
      target.requestUpdate = function (this: object, name?: PropertyKey, ...rest: unknown[]) {
        if (name !== undefined) propertiesSetByHandler.get(this)?.add(name);
        return requestUpdate.call(this, name, ...rest);
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
