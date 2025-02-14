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

        if (!a) {
          let badges = [...parentLi.querySelectorAll('wa-badge')].map(badge => badge.cloneNode(true));
          let ul = parentLi.querySelector('ul') ?? parentLi.appendChild(document.createElement('ul'));
          let li = document.createElement('li');
          a = Object.assign(document.createElement('a'), { href: url, textContent: title });
          let deleteButton = Object.assign(document.createElement('wa-icon-button'), {
            name: 'trash',
            label: 'Delete',
            className: 'delete',
          });
          deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this palette?')) {
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
          globalThis.paletteApp = Object.assign({}, globalThis.paletteApp, { saved: true });
        }
      }
    }
  }
}

function deletePalette(palette) {
  if (!localStorage.savedPalettes) {
    return;
  }

  let savedPalettes = JSON.parse(localStorage.savedPalettes);
  let count = savedPalettes.length;
  savedPalettes = savedPalettes.filter(
    p => !(p.search === palette.search && p.id === palette.id && p.title === palette.title),
  );
  console.log(palette, savedPalettes, count);
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
}

function render() {
  renderPalettes();
}

globalThis.sidebar = { render, renderPalettes, deletePalette };

render();
window.addEventListener('turbo:render', render);
