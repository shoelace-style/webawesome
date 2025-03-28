const sidebar = (globalThis.sidebar = {});

sidebar.palettes = {
  render() {
    if (this.saved.length === 0) {
      return;
    }

    for (let palette of this.saved) {
      sidebar.palette.render(palette);
    }

    sidebar.updateCurrent();
  },

  saved: [],

  /**
   * Update saved palettes from local storage
   */
  fromLocalStorage() {
    // Replace contents of array without breaking references
    let saved = localStorage.savedPalettes ? JSON.parse(localStorage.savedPalettes) : [];
    this.saved.splice(0, this.saved.length, ...saved);
  },

  /**
   * Write palettes to local storage
   */
  toLocalStorage() {
    if (this.saved.length > 0) {
      localStorage.savedPalettes = JSON.stringify(this.saved);
    } else {
      delete localStorage.savedPalettes;
    }
  },
};

sidebar.palettes.fromLocalStorage();

// Palettes were updated in another tab
addEventListener('storage', () => sidebar.palettes.fromLocalStorage());

sidebar.palette = {
  getUid() {
    let savedPalettes = sidebar.palettes.saved;
    let uids = new Set(savedPalettes.map(p => p.uid));

    if (savedPalettes.length === 0) {
      return 1;
    }

    // Find first available number
    for (let i = 1; i <= savedPalettes.length + 1; i++) {
      if (!uids.has(i)) {
        return i;
      }
    }
  },

  equals(p1, p2) {
    if (!p1 || !p2) {
      return false;
    }

    return p1.id === p2.id && p1.uid === p2.uid;
  },

  delete(palette) {
    let savedPalettes = sidebar.palettes.saved;
    let count = savedPalettes.length;

    if (count === 0 || !palette.uid) {
      // No stored palettes or this palette has not been saved
      return;
    }

    // TODO improve UX of this
    if (!confirm(`Are you sure you want to delete palette “${palette.title}”?`)) {
      return;
    }

    for (let index; (index = savedPalettes.findIndex(p => p.uid === palette.uid)) > -1; ) {
      savedPalettes.splice(index, 1);
    }

    if (savedPalettes.length === count) {
      // Nothing was removed
      return;
    }

    // Update UI
    let pathname = `/docs/palettes/${palette.id}/`;
    let url = pathname + palette.search;
    let uls = new Set();

    for (let a of document.querySelectorAll(`#sidebar a[href="${url}"]`)) {
      let li = a.closest('li');
      let ul = li.closest('ul');
      uls.add(ul);
      li.remove();
    }

    // Remove empty lists
    for (let ul of uls) {
      if (!ul.children.length) {
        ul.remove();
      }
    }

    sidebar.updateCurrent();

    sidebar.palettes.toLocalStorage();

    if (globalThis.paletteApp?.saved?.uid === palette.uid) {
      // We deleted the currently active palette
      paletteApp.postDelete();
    }
  },

  render(palette) {
    // Find existing <a>
    let { title, id, search, uid } = palette;

    for (let a of document.querySelectorAll(`#sidebar a[href^="/docs/palettes/${id}/"][data-uid="${uid}"]`)) {
      // Palette already in sidebar, just update it
      a.textContent = palette.title;
      a.href = `/docs/palettes/${id}/${search}`;
      return;
    }

    let pathname = `/docs/palettes/${id}/`;
    let url = pathname + search;
    let parentA = document.querySelector(`a[href="${pathname}"]`);
    let parentLi = parentA?.closest('li');
    let a;

    if (parentLi) {
      a = Object.assign(document.createElement('a'), { href: url, textContent: title });
      a.dataset.uid = uid;
      let badges = [...parentLi.querySelectorAll('wa-badge')].map(badge => badge.cloneNode(true));
      let ul = parentLi.querySelector('ul') ?? parentLi.appendChild(document.createElement('ul'));
      let li = document.createElement('li');
      let deleteButton = Object.assign(document.createElement('wa-icon-button'), {
        name: 'trash',
        label: 'Delete',
        className: 'delete',
      });

      deleteButton.addEventListener('click', () => {
        let palette = { id, uid, title: a.textContent, search: a.search };
        sidebar.palette.delete(palette);
      });

      li.append(a, ' ', ...badges, deleteButton);
      ul.appendChild(li);
    }
  },

  /**
   * Save a palette, either by updating its existing entry or creating a new one
   * @param {object} palette
   */
  save(palette) {
    if (!palette.uid) {
      // First time saving
      palette.uid = this.getUid();
    }

    let savedPalettes = sidebar.palettes.saved;
    let existingIndex = palette.uid ? sidebar.palettes.saved.findIndex(p => p.uid === palette.uid) : -1;
    let newIndex = existingIndex > -1 ? existingIndex : savedPalettes.length;

    let [oldValues] = sidebar.palettes.saved.splice(newIndex, 1, palette);

    this.render(palette, oldValues);
    sidebar.updateCurrent();
    sidebar.palettes.toLocalStorage();

    return palette;
  },
};

sidebar.updateCurrent = function () {
  // Find the sidebar link with the longest shared prefix with the current URL
  let pathParts = location.pathname.split('/').filter(Boolean);
  let prefixes = [];

  if (pathParts.length === 1) {
    // If at /docs/ we just use that, otherwise we want at least two parts (/docs/xxx/)
    prefixes.push('/' + pathParts[0] + '/');
  } else {
    for (let i = 2; i <= pathParts.length; i++) {
      prefixes.push('/' + pathParts.slice(0, i).join('/') + '/');
    }
  }

  // Last prefix includes the search too (if any)
  if (location.search) {
    let params = new URLSearchParams(location.search);
    params.sort();
    prefixes.push(prefixes.at(-1) + location.search);
  }

  // We want to start from the longest prefix
  prefixes.reverse();
  let candidates;
  let matchingPrefix;

  for (let prefix of prefixes) {
    candidates = document.querySelectorAll(`#sidebar a[href^="${prefix}"]`);

    if (candidates.length > 0) {
      matchingPrefix = prefix;
      break;
    }
  }

  if (!matchingPrefix) {
    // Abort mission
    return;
  }

  if (matchingPrefix === pathParts.at(-1)) {
    // Full path matches, check search
    if (location.search) {
      candidates = [...candidates];

      let searchParams = new URLSearchParams(location.search);

      if (searchParams.has('uid')) {
        // Only consider candidates with the same uid
        candidates = candidates.filter(a => {
          let params = new URLSearchParams(a.search);
          return params.get('uid') === searchParams.get('uid');
        });
      } else {
        // Sort candidates based on how many params they have in common, in descending order
        candidates = candidates.sort((a, b) => {
          return countSharedSearchParams(searchParams, b.search) - countSharedSearchParams(searchParams, a.search);
        });
      }
    }
  }

  if (candidates.length > 0) {
    for (let current of document.querySelectorAll('#sidebar a.current')) {
      current.classList.remove('current');
    }

    candidates[0].classList.add('current');
  }
};

sidebar.render = function () {
  this.palettes.render();
};

sidebar.render();
window.addEventListener('turbo:render', () => sidebar.render());

function countSharedSearchParams(searchParams, search) {
  if (!search || search === '?') {
    return 0;
  }

  let params = new URLSearchParams(search);
  return [...searchParams.keys()].filter(k => params.get(k) === searchParams.get(k)).length;
}
