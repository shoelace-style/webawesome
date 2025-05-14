const IDENTITY = x => x;

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
