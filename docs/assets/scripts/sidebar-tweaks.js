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

        if (parentA.classList.contains('current') && location.search === search) {
          // We are currently viewing this page
          parentA.classList.remove('current');
          a.classList.add('current');
          globalThis.paletteApp = Object.assign({}, globalThis.paletteApp, { saved: palette });
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

function savePalette(palette, saved) {
  let savedPalettes = localStorage.savedPalettes ? JSON.parse(localStorage.savedPalettes) : [];
  let existing = savedPalettes.find(p => propertiesEqual(saved ?? palette, p, ['search', 'id']));

  if (existing) {
    // Rename
    Object.assign(existing, palette);
  } else {
    savedPalettes.push(palette);
  }

  localStorage.savedPalettes = JSON.stringify(savedPalettes);

  renderPalettes();
}

function render() {
  renderPalettes();
}

globalThis.sidebar = { render, renderPalettes, deletePalette, savePalette };

render();
window.addEventListener('turbo:render', render);
