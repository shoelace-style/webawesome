/**
 * Recursively clones plain objects and arrays, passing everything else (functions, class instances, DOM nodes, dates,
 * maps, sets, etc.) through by reference. Unlike `structuredClone`, this won't throw on non-serializable values, which
 * makes it useful for defensively copying config objects that may contain callbacks (e.g. Chart.js configs).
 *
 * Only the spine of plain objects and arrays is duplicated. Non-plain values are shared, not copied, so mutating one
 * through the clone also mutates the original. Circular references are handled. For JSON-safe data, use
 * `structuredClone` instead.
 */
export function deepClone<T>(value: T, seen = new WeakMap<object, unknown>()): T {
  // Primitives and functions are returned as-is. Functions are intentionally passed through by reference.
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Guard against circular references.
  if (seen.has(value as object)) {
    return seen.get(value as object) as T;
  }

  if (Array.isArray(value)) {
    const result: unknown[] = [];
    seen.set(value as object, result);
    for (const item of value) {
      result.push(deepClone(item, seen));
    }
    return result as T;
  }

  // Only clone plain objects. Class instances, Dates, Maps, DOM nodes, etc. are passed through by reference so we
  // don't accidentally strip their prototype or break their internal state.
  if (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null) {
    const result: Record<string, unknown> = {};
    seen.set(value as object, result);
    for (const key of Object.keys(value as Record<string, unknown>)) {
      result[key] = deepClone((value as Record<string, unknown>)[key], seen);
    }
    return result as T;
  }

  return value;
}

export default deepClone;

/**
 * Returns `true` if the value is a plain object — i.e. an object literal whose prototype is `Object.prototype`. Arrays,
 * `null`, class instances, `Date`, `Map`, DOM nodes, etc. all return `false`. Useful for deciding whether a value can be
 * safely recursed into and merged key-by-key.
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/**
 * Recursively merges `target` into a clone of `src`, returning a new object. Where both sides hold a plain object at the
 * same key, the two are merged recursively; otherwise `target`'s value overrides `src`'s. Arrays and non-plain values
 * (functions, class instances, etc.) are not merged element-by-element — `target` replaces `src` wholesale at that key.
 *
 * `src` is never mutated (it is cloned via {@link deepClone}, so functions and other non-serializable values it
 * contains are preserved by reference). `target`'s values are assigned by reference, so do not mutate the result's
 * nested objects if you need `target` to stay pristine.
 */
export function deepMerge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  src: T,
  target: U,
): T & U {
  const result = deepClone(src) as any;

  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const targetValue = target[key];
      const srcValue = result[key];

      // If both values are plain objects, merge them recursively
      if (isPlainObject(targetValue) && isPlainObject(srcValue)) {
        result[key] = deepMerge(srcValue, targetValue);
      } else {
        // Otherwise, target overrides src
        result[key] = targetValue;
      }
    }
  }

  return result;
}
