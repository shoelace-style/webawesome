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

  saved: localStorage.savedPalettes ? JSON.parse(localStorage.savedPalettes) : [],

  save(saved = this.saved) {
    this.saved = saved ?? [];

    if (saved.length > 0) {
      localStorage.savedPalettes = JSON.stringify(saved);
    } else {
      delete localStorage.savedPalettes;
    }
  },
};

sidebar.palette = {
  getUid() {
    let savedPalettes = sidebar.palettes.saved;
    let uids = new Set(savedPalettes.map(p => p.uid));

    if (savedPalettes.length === 0) {
      return 1;
    }

    // Find first available number
    for (let i = 1; i < savedPalettes.length + 1; i++) {
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
    if (count === 0) {
      return;
    }

    // TODO improve UX of this
    if (!confirm(`Are you sure you want to delete palette “${palette.title}”?`)) {
      return;
    }

    savedPalettes = savedPalettes.filter(p => !sidebar.palette.equals(palette, p));

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

    sidebar.palettes.save(savedPalettes);

    if (sidebar.palette.equals(globalThis.paletteApp?.saved, palette)) {
      paletteApp.saved = null;
    }
  },

  getSaved(palette, savedPalettes = sidebar.palettes.saved) {
    return savedPalettes.find(p => sidebar.palette.equals(p, palette));
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

  save(palette, saved) {
    let savedPalettes = sidebar.palettes.saved;
    let existing = this.getSaved(saved ?? palette, savedPalettes);
    let oldValues;

    if (existing) {
      // Rename
      oldValues = { ...existing };
      Object.assign(existing, palette);
    } else {
      savedPalettes.push(palette);
    }

    this.render(palette, oldValues);
    sidebar.updateCurrent();

    sidebar.palettes.save(savedPalettes);
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

  for (let prefix of prefixes) {
    let a = document.querySelector(`#sidebar a[href^="${prefix}"]`);

    if (a) {
      for (let current of document.querySelectorAll('#sidebar a.current')) {
        current.classList.remove('current');
      }
      a.classList.add('current');
      break;
    }
  }
};

sidebar.render = function () {
  this.palettes.render();
};

sidebar.render();
window.addEventListener('turbo:render', () => sidebar.render());
