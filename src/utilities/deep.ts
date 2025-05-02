export function isPlainObject(obj: any) {
  return isObject(obj, 'Object');
}

export function isObject(obj: any, type: string) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  let proto = Object.getPrototypeOf(obj);
  return proto.constructor?.name === type;
}

type Property = keyof any;
export type EachCallback<T = any> = (value: any, path: Property[], parent?: object) => T;
export type EachOptions = {
  filter?: EachCallback<boolean>;
  descend?: EachCallback<boolean>;
};

/**
 * Iterate over a deep object or array recursively
 *
 * @param obj The object to iterate over. Can be a plain object,or array, or even a primitive value.
 * @param callback. The callback to execute for each value. Will not be called on circular references.
 *                  Returning `false` will stop the iteration and a non-undefined value will overwrite the value.
 */
export function deepEach(obj: any, callback: EachCallback, options: EachOptions = {}): any {
  // Used to track circular references
  // WeakSet is used to avoid memory leaks
  let visited = new WeakSet();

  return _deepEach(
    obj,
    (value, path, parent) => {
      if (value && typeof value === 'object') {
        if (visited.has(value)) {
          // Abort mission
          return false;
        }

        visited.add(value);
      }

      return callback(value, path, parent);
    },
    options,
  );
}

/**
 * Private recursive function to support `deepEach()`.
 * @param value Same as {@link deepEach}
 * @param callback Same as {@link deepEach}
 * @param path The path to `value` from the root object as an array of keys.
 * @param parent The parent object of the current value. `value === parent[path.at(-1)]`
 */
function _deepEach(value: any, callback: EachCallback, options: EachOptions, path: Property[] = [], parent?: object) {
  if (path.length > 0) {
    let included = options.filter?.(value, path, parent) ?? true;

    if (included) {
      let ret = callback(value, path, parent!);

      if (ret !== undefined) {
        // Overwrite value
        let key = path.at(-1);
        // @ts-expect-error TS doesn't know that if path.length > 0, parent is an object
        value = parent[key] = ret;
      }
    }
  }

  let isArray = Array.isArray(value);
  let isObject = !isArray && isPlainObject(value);
  let isContainer = isArray || isObject;

  if (isContainer) {
    let descend = options.descend?.(value, path, parent) ?? true;

    if (!descend) {
      // Do not descend further
      return;
    }

    if (isArray) {
      for (let i = 0; i < value.length; i++) {
        _deepEach(value[i], callback, options, [...path, i], value);
      }
    } else if (isObject) {
      for (let key in value) {
        _deepEach(value[key], callback, options, [...path, key], value);
      }
    }
  }
}

export type DeepEntriesOptions = {
  filter?: EachCallback;
};

/**
 * Like Object.entries, but for deeply nested objects.
 * For shallow objects the output is the same as Object.entries.
 * Circular references will not be included.
 * @param obj The object to iterate over.
 * @param options.filter - If this returns false, the entry is not added to the result.
 * @param options.transformPath - Transform the path, e.g. to serialize it to a single key or reduce levels.
 * @returns Array of arrays. In each item, the last value is the value, and all values before that are the keys.
 *          So for an object with N levels, the result will be an array of arrays with N+1 items each.
 */
export function deepEntries(obj: any, options: DeepEntriesOptions = {}): any[][] {
  let { filter } = options;
  let entries: any[][] = [];

  deepEach(obj, (value, path, parent) => {
    let included = filter?.(value, path, parent) ?? true;

    if (included) {
      entries.push([...path, value]);
    }
  });

  return entries;
}

export type FlattenOptions = {
  getKey?: (path: Property[], value?: any) => Property;
};

/**
 * Convert a potentially deeply nested object to a flat object.
 * Circular references will not be included.
 * @param obj
 * @param options.getKey - A function to transform the path to a key. The default is to join the path with '.'.
 */
export function flatten<T = unknown>(
  obj: Record<keyof any, unknown>,
  options: FlattenOptions = {},
): Record<keyof any, T> {
  let { getKey = path => path.join('.') } = options;

  if (!obj || typeof obj !== 'object') {
    return {} as Record<keyof any, T>;
  }

  let entries = deepEntries(obj).map(pathAndValue => {
    if (pathAndValue.length < 2) {
      return null;
    }

    let value = pathAndValue.pop() as T;
    let path = pathAndValue as Property[];
    let key = getKey(path, value);
    return [key, value];
  }) as [string, T][];

  return Object.fromEntries(entries.filter(Boolean)) as Record<keyof any, T>;
}
