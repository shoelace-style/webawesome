type Property = keyof any;
export type EachCallback = (value: any, key: Property, parent: object, path: Property[]) => any;

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

/**
 * Iterate over a deep array, recursively for plain objects
 * @param obj The object to iterate over. Can be an array or a plain object, or even a primitive value.
 * @param callback. value is === parent[key]
 * @param parentObj The parent object of the current value Mainly used internally to facilitate recursion.
 * @param key The key of the current value. Mainly used internally to facilitate recursion.
 * @param path Any existing path (not including the key). Mainly used internally to facilitate recursion.
 */
export function deepEach(obj: any, callback: EachCallback, parentObj?: object, key?: Property, path: Property[] = []) {
  if (key !== undefined) {
    let ret = callback(obj, key, parentObj!, path);

    if (ret !== undefined) {
      if (ret === false) {
        // Do not descend further
        return;
      }

      // Overwrite value
      // @ts-expect-error
      parentObj[key] = ret;
      obj = ret;
    }
  }

  let newPath = key !== undefined ? [...path, key] : path;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      deepEach(obj[i], callback, obj, i, newPath);
    }
  } else if (isPlainObject(obj)) {
    for (let key in obj) {
      deepEach(obj[key], callback, obj, key, newPath);
    }
  }
}

export type DeepEntriesOptions = {
  filter?: EachCallback;
  transformPath?: (path: Property[]) => Property[];
};

/**
 * Like Object.entries, but for deeply nested objects.
 * For shallow objects the output is the same as Object.entries.
 * @param obj The object to iterate over.
 * @param options.filter - If this returns false, the entry is not added to the result.
 * @param options.transformPath - Transform the path, e.g. to serialize it to a single key.
 * @returns Array of arrays. In each array the last value is the value, and all values before that are the keys.
 */
export function deepEntries(obj: any, options: DeepEntriesOptions = {}): any[][] {
  let { filter, transformPath } = options;
  let entries: any[][] = [];

  deepEach(obj, (value, key, parent, path) => {
    let included = filter?.(value, key, parent, path) ?? true;

    if (included) {
      let fullPath = [...path, key];
      path = transformPath?.(fullPath) ?? fullPath;
      entries.push([...fullPath, value]);
    }
  });

  return entries;
}
