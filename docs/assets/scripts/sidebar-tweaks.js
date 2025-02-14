function renderPalettes() {
  if (!localStorage.savedPalettes) {
    return;
  }

  let savedPalettes = JSON.parse(localStorage.savedPalettes);

  for (let palette of savedPalettes) {
    renderPalette(palette);
  }

  updateCurrent();
}

function isPaletteEqual(p1, p2) {
  if (!p1 || !p2) {
    return false;
  }

  return p1.id === p2.id && (p1.title === p2.title || p1.search === p2.search);
}

function deletePalette(palette) {
  if (!localStorage.savedPalettes) {
    return;
  }

  let savedPalettes = JSON.parse(localStorage.savedPalettes);
  let count = savedPalettes.length;
  savedPalettes = savedPalettes.filter(p => !isPaletteEqual(palette, p));

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

  updateCurrent();

  if (savedPalettes.length) {
    localStorage.savedPalettes = JSON.stringify(savedPalettes);
  } else {
    delete localStorage.savedPalettes;
  }

  if (isPaletteEqual(globalThis.paletteApp?.saved, palette)) {
    paletteApp.saved = null;
  }
}

function updateCurrent() {
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
}

function getSavedPalette(palette, savedPalettes = JSON.parse(localStorage.savedPalettes ?? '[]')) {
  return savedPalettes.find(p => isPaletteEqual(p, palette));
}

function renderPalette(palette, oldValues) {
  // Find existing a
  let { title, id, search } = palette;
  let paletteToCheck = oldValues ?? palette;

  for (let a of document.querySelectorAll(`#sidebar a[href^="/docs/palettes/${id}/"]`)) {
    if (isPaletteEqual(paletteToCheck, { id, title: a.textContent, search: a.search })) {
      // Palette already in sidebar, just update it
      a.textContent = palette.title;
      a.href = `/docs/palettes/${id}/${search}`;
      return;
    }
  }

  let pathname = `/docs/palettes/${id}/`;
  let url = pathname + search;
  let parentA = document.querySelector(`a[href="${pathname}"]`);
  let parentLi = parentA?.closest('li');
  let a;

  if (parentLi) {
    a = Object.assign(document.createElement('a'), { href: url, textContent: title });
    let badges = [...parentLi.querySelectorAll('wa-badge')].map(badge => badge.cloneNode(true));
    let ul = parentLi.querySelector('ul') ?? parentLi.appendChild(document.createElement('ul'));
    let li = document.createElement('li');
    let deleteButton = Object.assign(document.createElement('wa-icon-button'), {
      name: 'trash',
      label: 'Delete',
      className: 'delete',
    });

    deleteButton.addEventListener('click', () => {
      // TODO improve UX of this
      if (confirm(`Are you sure you want to delete palette “${title}”?`)) {
        let palette = { id, title: a.textContent, search: a.search };
        deletePalette(palette);
      }
    });

    li.append(a, ' ', ...badges, deleteButton);
    ul.appendChild(li);
  }
}

function savePalette(palette, saved) {
  let savedPalettes = localStorage.savedPalettes ? JSON.parse(localStorage.savedPalettes) : [];
  let existing = getSavedPalette(saved ?? palette, savedPalettes);
  let oldValues;

  if (existing) {
    // Rename
    oldValues = { ...existing };
    Object.assign(existing, palette);
  } else {
    savedPalettes.push(palette);
  }

  renderPalette(palette, oldValues);
  updateCurrent();

  localStorage.savedPalettes = JSON.stringify(savedPalettes);
}

function render() {
  renderPalettes();
}

globalThis.sidebar = { render, renderPalettes, deletePalette, savePalette, getSavedPalette, isPaletteEqual };

render();
window.addEventListener('turbo:render', render);
