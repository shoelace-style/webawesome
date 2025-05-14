const my = (globalThis.my = new EventTarget());
export default my;

class PersistedArray extends Array {
  constructor(key) {
    super();
    this.key = key;

    if (this.key) {
      this.fromLocalStorage();
    }

    // Items were updated in another tab
    addEventListener('storage', event => {
      if (event.key === this.key || !event.key) {
        this.fromLocalStorage();
      }
    });
  }

  /**
   * Update data from local storage
   */
  fromLocalStorage() {
    // First, empty the array
    this.splice(0, this.length);

    // Then, fill it with the data from local storage
    let saved = localStorage[this.key] ? JSON.parse(localStorage[this.key]) : null;

    if (saved) {
      this.push(...saved);
    }
  }

  /**
   * Write data to local storage
   */
  toLocalStorage() {
    if (this.length > 0) {
      localStorage[this.key] = JSON.stringify(this);
    } else {
      delete localStorage[this.key];
    }
  }
}

class SavedEntities extends EventTarget {
  constructor({ key, type, url }) {
    super();
    this.key = key;
    this.type = type;
    this.url = url ?? type + 's';
    this.saved = new PersistedArray(key);

    let all = this;
    this.entityPrototype = {
      type: this.type,
      baseUrl: this.baseUrl,

      get url() {
        return all.getURL(this);
      },

      get parentUrl() {
        return all.getParentURL(this);
      },

      delete() {
        all.delete(this);
      },
    };
  }

  getUid() {
    if (this.saved.length === 0) {
      return 1;
    }

    let uids = new Set(this.saved.map(p => p.uid));

    // Find first available number
    for (let i = 1; i <= this.saved.length + 1; i++) {
      if (!uids.has(i)) {
        return i;
      }
    }
  }

  get baseUrl() {
    return `/docs/${this.url}/`;
  }

  getURL(entity) {
    return this.getParentURL(entity) + entity.search;
  }

  getParentURL(entity) {
    return this.baseUrl + entity.id + '/';
  }

  getObject(entity) {
    let ret = Object.create(this.entityPrototype, Object.getOwnPropertyDescriptors(entity));
    // debugger;
    return ret;
  }

  /**
   * Save an entity, either by updating its existing entry or creating a new one
   * @param {object} entity
   */
  save(entity) {
    if (!entity.uid) {
      // First time saving
      entity.uid = this.getUid();
    }

    let savedPalettes = this.saved;
    let existingIndex = entity.uid ? this.saved.findIndex(p => p.uid === entity.uid) : -1;
    let newIndex = existingIndex > -1 ? existingIndex : savedPalettes.length;

    this.saved.splice(newIndex, 1, entity);

    this.saved.toLocalStorage();

    this.dispatchEvent(new CustomEvent('save', { detail: this.getObject(entity) }));

    return entity;
  }

  delete(entity) {
    let count = this.saved.length;

    if (count === 0 || !entity?.uid) {
      // No stored entities or this entity has not been saved
      return;
    }

    // TODO improve UX of this
    if (!confirm(`Are you sure you want to delete ${this.type} “${entity.title}”?`)) {
      return;
    }

    for (let index; (index = this.saved.findIndex(p => p.uid === entity.uid)) > -1; ) {
      this.saved.splice(index, 1);
    }

    if (this.saved.length === count) {
      // Nothing was removed
      return;
    }

    this.saved.toLocalStorage();

    this.dispatchEvent(new CustomEvent('delete', { detail: this.getObject(entity) }));
  }

  dispatchEvent(event) {
    super.dispatchEvent(event);
    my.dispatchEvent(event);
  }
}

my.palettes = new SavedEntities({
  key: 'savedPalettes',
  type: 'palette',
});

my.themes = new SavedEntities({
  key: 'savedThemes',
  type: 'theme',
});
