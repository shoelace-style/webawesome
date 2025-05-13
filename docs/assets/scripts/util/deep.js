/**
 * @typedef { string | number | Symbol } Property
 * @typedef { (value: any, key: Property, parent: object, path: Property[]) => any } EachCallback
 */

export function isPlainObject(obj) {
  return isObject(obj, 'Object');
}

export function isObject(obj, type) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  let proto = Object.getPrototypeOf(obj);
  return proto.constructor?.name === type;
}

export function deepMerge(target, source, options = {}) {
  let {
    emptyValues = [undefined],
    containers = ['Object', 'EventTarget'],
    isContainer = value => containers.some(type => isObject(value, type)),
  } = options;

  if (isContainer(target) && isContainer(source)) {
    for (let key in source) {
      if (key in target && isContainer(target[key]) && isContainer(source[key])) {
        target[key] = deepMerge(target[key], source[key], options);
      } else if (!emptyValues.includes(source[key])) {
        target[key] = source[key];
      }
    }

    return target;
  }

  return target ?? source;
}

/**
 * Iterate over a deep array, recursively for plain objects
 * @param { any } obj The object to iterate over. Can be an array or a plain object, or even a primitive value.
 * @param { EachCallback } callback. value is === parent[key]
 * @param { object } [parentObj] The parent object of the current value Mainly used internally to facilitate recursion.
 * @param { Property } [key] The key of the current value. Mainly used internally to facilitate recursion.
 * @param { Property[] } [path] Any existing path (not including the key). Mainly used internally to facilitate recursion.
 */
export function deepEach(obj, callback, parentObj, key, path = []) {
  if (key !== undefined) {
    let ret = callback(obj, key, parentObj, path);

    if (ret !== undefined) {
      if (ret === false) {
        // Do not descend further
        return;
      }

      // Overwrite value
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

/**
 * Get a value from a deeply nested object
 * @param {*} obj
 * @param {PropertyPath} path
 * @returns
 */
export function deepGet(obj, path) {
  if (path.length === 0) {
    return obj;
  }

  let ret = obj;

  for (let key of path) {
    if (ret === undefined) {
      return undefined;
    }

    ret = ret[key];
  }

  return ret;
}

/**
 * Set a value in a deep object, creating object literals as needed
 * @param { * } obj
 * @param { Property[] } path
 * @param { any } value
 */
export function deepSet(obj, path, value) {
  if (path.length === 0) {
    return;
  }

  let key = path.pop();

  let ret = path.reduce((acc, property) => {
    if (acc[property] === undefined) {
      acc[property] = {};
    }

    return acc[property];
  }, obj);

  ret[key] = value;
}

export function deepClone(obj) {
  if (!obj) {
    return obj;
  }

  let ret = obj;

  if (Array.isArray(obj)) {
    ret = obj.map(item => deepClone(item));
  } else if (isPlainObject(obj)) {
    ret = { ...obj };

    for (let key in obj) {
      ret[key] = deepClone(obj[key]);
    }
  }

  return ret;
}

/**
 * Like Object.entries, but for deeply nested objects.
 * For shallow objects the output is the same as Object.entries.
 * @param {*} obj
 * @param { object } options
 * @param { EachCallback } each - If this returns false, the entry is not added to the result and the recursion is stopped.
 * @param { EachCallback } filter - If this returns false, the entry is not added to the result.
 * @param { EachCallback } descend - If this returns false, recursion is stopped.
 * @returns {any[][]}
 */
export function deepEntries(obj, options = {}) {
  let { each, filter, descend } = options;
  let entries = [];

  deepEach(obj, (value, key, parent, path) => {
    let ret = each?.(value, key, parent, path);

    if (ret !== false) {
      let included = filter?.(value, key, parent, path) ?? true;

      if (included) {
        entries.push([...path, key, value]);
      }

      let descendRet = descend?.(value, key, parent, path);
      if (descendRet === false) {
        return false; // Stop recursion
      }
    }

    return ret;
  });

  return entries;
}
