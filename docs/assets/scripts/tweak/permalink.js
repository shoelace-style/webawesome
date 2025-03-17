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

  #mappings = new WeakMap();

  mapObject(obj, mapping = {}) {
    this.#mappings.set(obj, mapping);
  }

  readFrom(obj) {
    let mapping = this.#mappings.get(obj) ?? {};
    let { keyFrom = IDENTITY, valueFrom = IDENTITY } = mapping;

    for (let key in obj) {
      let value = obj[key];
      let mappedValue = valueFrom(value);
      let mappedKey = keyFrom(key);
      this.set(mappedKey, mappedValue);
    }
  }

  writeTo(obj) {
    let mapping = this.#mappings.get(obj) ?? {};
    let { keyTo = IDENTITY, valueTo = IDENTITY, canExtend = false } = mapping;

    for (let [key, value] of this) {
      let mappedKey = keyTo(key);
      let mappedValue = valueTo(value);

      if (canExtend || mappedKey in obj) {
        obj[mappedKey] = mappedValue;
      }
    }
  }

  set(key, value, defaultValue) {
    let oldValue = this.get(key);

    if (!value || value == defaultValue) {
      super.delete(key);

      if (oldValue) {
        this.changed = true;
      }
    } else {
      super.set(key, value);

      if (String(value) !== String(oldValue)) {
        this.changed = true;
      }
    }

    this.sort();
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
