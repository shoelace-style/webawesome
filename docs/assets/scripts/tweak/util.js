export function normalizeAngles(angles) {
  // First, normalize
  angles = angles.map(h => ((h % 360) + 360) % 360);

  // Remove top and bottom 25% and find average
  let averageHue =
    angles
      .toSorted((a, b) => a - b)
      .slice(angles.length / 4, -angles.length / 4)
      .reduce((a, b) => a + b, 0) / angles.length;

  for (let i = 0; i < angles.length; i++) {
    let h = angles[i];
    let prevHue = angles[i - 1];
    let delta = h - prevHue;

    if (Math.abs(delta) > 180) {
      let equivalent = [h + 360, h - 360];
      // Offset hue to minimize difference in the direction that brings it closer to the average
      let delta = h - averageHue;

      if (Math.abs(equivalent[0] - prevHue) <= Math.abs(equivalent[1] - prevHue)) {
        angles[i] = equivalent[0];
      } else {
        angles[i] = equivalent[1];
      }
    }
  }

  return angles;
}

export function subtractAngles(θ1, θ2) {
  let [a, b] = normalizeAngles([θ1, θ2]);
  return a - b;
}

export function isPlainObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  let proto = Object.getPrototypeOf(o);
  return proto.constructor?.name === 'Object';
}

export function deepMerge(target, source, options = {}) {
  let { emptyValues = [undefined] } = options;

  if (Array.isArray(source)) {
    for (let s of source) {
      deepMerge(target, s, options);
    }
    return target;
  }

  if (isPlainObject(target) && isPlainObject(source)) {
    for (let key in source) {
      if (key in target && isPlainObject(target[key]) && isPlainObject(source[key])) {
        target[key] = deepMerge(target[key], source[key], options);
      } else if (!(key in target) || emptyValues.includes(source[key])) {
        target[key] = source[key];
      }
    }
  }

  return target;
}

/**
 * Iterate over a deep array, recursively for plain objects
 * @param { any } obj The object to iterate over. Can be an array or a plain object, or even a primitive value.
 * @param { (value: any, key: string | number, parent: any, path: (string | number)[]) => void } callback. value is === parent[key]
 * @param { object } [parentObj] The parent object of the current value Mainly used internally to facilitate recursion.
 * @param { string | number | Symbol } [key] The key of the current value. Mainly used internally to facilitate recursion.
 * @param { (string | number | Symbol)[] } [path] Any existing path (not including the key). Mainly used internally to facilitate recursion.
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
