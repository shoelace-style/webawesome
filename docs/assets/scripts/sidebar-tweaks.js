function renderPalettes() {
  if (localStorage.savedPalettes) {
    let savedPalettes = JSON.parse(localStorage.savedPalettes);

    for (let palette of savedPalettes) {
      let { title, id, search } = palette;
      let pathname = `/docs/palettes/${id}/`;
      let url = pathname + search;
      let parentA = document.querySelector(`a[href="${pathname}"]`);
      let parentLi = parentA?.closest('li');

      if (parentLi) {
        let a = parentLi.querySelector(`a[href="${url}"]`);

        if (a) {
          if (a.textContent !== title) {
            // Renamed
            a.textContent = title;
          }
        } else {
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
            if (confirm(`Are you sure you want to delete palette “${title}”?`)) {
              // TODO improve UX of this
              deletePalette(palette);
            }
          });

          li.append(a, ' ', ...badges, deleteButton);
          ul.appendChild(li);
        }

        if (parentA.classList.contains('current')) {
          // We are currently viewing this page
          if (location.search === search) {
            parentA.classList.remove('current');
            a.classList.add('current');

            if (!globalThis.paletteApp) {
              globalThis.paletteApp = {};
            }

            globalThis.paletteApp.saved = palette;
          }
        }
      }
    }
  }
}

function propertiesEqual(obj1, obj2, properties) {
  if (!obj1 || !obj2) {
    return false;
  }
  properties ??= Object.keys(obj1);
  return properties.every(prop => obj1[prop] === obj2[prop]);
}

function deletePalette(palette) {
  if (!localStorage.savedPalettes) {
    return;
  }

  let savedPalettes = JSON.parse(localStorage.savedPalettes);
  let count = savedPalettes.length;
  savedPalettes = savedPalettes.filter(p => !propertiesEqual(palette, p));

  if (savedPalettes.length === count) {
    // Nothing was removed
    return;
  }

  // Update UI
  let pathname = `/docs/palettes/${palette.id}/`;
  let url = pathname + palette.search;
  let uls = new Set();

  for (let a of document.querySelectorAll(`a[href="${url}"]`)) {
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

  localStorage.savedPalettes = JSON.stringify(savedPalettes);

  if (propertiesEqual(globalThis.paletteApp?.saved, palette)) {
    paletteApp.saved = null;
  }
}

function getSavedPalette(palette, savedPalettes = JSON.parse(localStorage.savedPalettes ?? '[]')) {
  return savedPalettes.find(p => p.id === palette.id && (p.title === palette.title || p.search === palette.search));
}

function savePalette(palette, saved) {
  let savedPalettes = localStorage.savedPalettes ? JSON.parse(localStorage.savedPalettes) : [];
  let existing = getSavedPalette(saved ?? palette, savedPalettes);

  if (existing) {
    // Rename
    let a = document.querySelector(`a[href="/docs/palettes/${existing.id}/${existing.search}"]`);

    Object.assign(existing, palette);

    if (a) {
      a.textContent = palette.title;
      a.href = `/docs/palettes/${palette.id}/${palette.search}`;
    }
  } else {
    savedPalettes.push(palette);
  }

  localStorage.savedPalettes = JSON.stringify(savedPalettes);
}

function render() {
  console.trace('Rendering sidebar');

  renderPalettes();
}

globalThis.sidebar = { render, renderPalettes, deletePalette, savePalette, getSavedPalette };

render();
window.addEventListener('turbo:render', render);
