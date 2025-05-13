import { deepEach, deepGet, deepSet } from './util/deep.js';

export default class Permalink extends URLSearchParams {
  /** Params changed since last URL I/O */
  changed = false;

  constructor(params) {
    super(location.search);
    this.params = params;
  }

  toJSON() {
    return Object.fromEntries(this.entries());
  }

  /**
   * Set multiple values from an object. Nested values will be joined with a hyphen.
   * @param {object} values - The object containing the values to set.
   * @param {object} defaults - The object containing the default values.
   *
   */
  setAll(values, defaults) {
    deepEach(values, (value, key, parent, path) => {
      let fullPath = [...path, key];
      let param = fullPath.join('-');
      let defaultValue = deepGet(defaults, fullPath);

      if (typeof value === 'object') {
        // We'll handle this when we descend into it
        return;
      }

      if (!value || value === defaultValue) {
        // Remove the param from the URL
        this.delete(param);
        return;
      }

      this.set(param, value);
    });
  }

  getAll(...args) {
    if (args.length > 0) {
      return super.getAll(...args);
    }

    // Get all values as a nested object
    // Assumes that hyphens always mean nesting
    let obj = {};

    for (let [key, value] of this.entries()) {
      let path = key.split('-');
      deepSet(obj, path, value);
    }

    return obj;
  }

  delete(key, value) {
    let hadValue = this.has(key);
    super.delete(key, value);

    if (hadValue) {
      this.changed = true;
    }
  }

  set(key, value, defaultValue) {
    if (equals(value, defaultValue) || equals(value, '')) {
      value = null;
    }

    value ??= null; // undefined -> null

    let oldValue = Array.isArray(value) ? this.getAll(key) : this.get(key);
    let changed = !equals(value, oldValue);

    if (!changed) {
      // Nothing to do here
      return;
    }

    if (Array.isArray(value)) {
      super.delete(key);
      value = value.slice();

      for (let v of value) {
        if (v || v === 0) {
          if (typeof v === 'object') {
            super.append(key, JSON.stringify(v));
          } else {
            super.append(key, v);
          }
        }
      }
    } else if (value === null) {
      super.delete(key);
    } else {
      super.set(key, value);
    }

    this.sort();
    this.changed ||= changed;
  }

  /**
   * Update page URL if it has changed since last time
   */
  updateLocation() {
    if (this.changed) {
      // If there’s already a search, replace it.
      // We don’t want to clog the user’s history while they iterate
      let search = this.toString();
      let historyAction = location.search && search ? 'replaceState' : 'pushState';
      history[historyAction](null, '', `?${search}`);
      this.changed = false;
    }
  }
}

function equals(value, oldValue) {
  if (Array.isArray(value) || Array.isArray(oldValue)) {
    value = toArray(value);
    oldValue = toArray(oldValue);

    if (value.length !== oldValue.length) {
      return false;
    }

    return value.every((v, i) => equals(v, oldValue[i]));
  }

  // (value ?? oldValue ?? true) returns true if they're both empty (null or undefined)
  [value, oldValue] = [value, oldValue].map(v => (!v && v !== false && v !== 0 ? null : v));
  return value === oldValue || String(value) === String(oldValue);
}

/**
 * Convert a value to an array. `undefined` and `null` values are converted to an empty array.
 * @param {*} value - The value to convert.
 * @returns {any[]} The converted array.
 */
function toArray(value) {
  value ??= [];

  if (Array.isArray(value)) {
    return value;
  }

  // Don't convert "foo" into ["f", "o", "o"]
  if (typeof value !== 'string' && typeof value[Symbol.iterator] === 'function') {
    return Array.from(value);
  }

  return [value];
}
