import my from '/assets/scripts/my.js';

const sidebar = {
  addChild(a, parentA) {
    let parentLi = parentA.closest('li');
    let ul = parentLi.querySelector(':scope > ul');
    ul ??= parentLi.appendChild(document.createElement('ul'));
    let li = document.createElement('li');
    li.append(a);
    ul.appendChild(li);

    // If we are on the same page, update the current link
    let url = location.href.replace(/#.+$/, '');
    if (url.startsWith(a.href)) {
      // Remove existing current
      for (let current of document.querySelectorAll('#sidebar a.current')) {
        current.classList.remove('current');
      }

      a.classList.add('current');
    }

    return a;
  },

  removeLink(a) {
    if (!a || !a.isConnected) {
      // Link doesn't exist or is already removed
      return;
    }

    let li = a?.closest('li');
    let ul = li?.closest('ul');
    let parentA = ul?.closest('li')?.querySelector(':scope > a');

    li?.remove();
    if (ul?.children.length === 0) {
      ul.remove();
    }

    if (a.classList.contains('current')) {
      // If the deleted palette was the current one, the current one is now the parent
      parentA.classList.add('current');
    }
  },

  findEntity(entity) {
    return document.querySelector(`#sidebar a[href^="${entity.baseUrl}"][data-uid="${entity.uid}"]`);
  },

  renderEntity(entity) {
    let { url, parentUrl } = entity;

    // Find parent
    let parentA = document.querySelector(`#sidebar a[href="${parentUrl}"]`);
    let parentLi = parentA?.closest('li');

    if (!parentLi) {
      throw new Error(`Cannot find parent url ${parentUrl}`);
    }

    // Find existing
    let a = this.findEntity(entity);
    let alreadyExisted = !!a;

    a ??= document.createElement('a');

    a.textContent = entity.title;
    a.href = url;

    if (!alreadyExisted) {
      a.dataset.uid = entity.uid;

      a = sidebar.addChild(a, parentA);

      // This is mainly to port Pro badges
      let badges = Array.from(parentLi.querySelectorAll('wa-badge'), badge => badge.cloneNode(true));
      let append = [...badges];

      if (entity.delete) {
        let deleteButton = Object.assign(document.createElement('wa-icon-button'), {
          name: 'trash',
          label: 'Delete',
          className: 'delete',
        });
        deleteButton.addEventListener('click', () => entity.delete());
        append.push(deleteButton);
      }

      if (append.length > 0) {
        a.closest('li').append(' ', ...append);
      }
    }
  },

  render() {
    for (let type in my) {
      let controller = my[type];

      if (!controller.saved) {
        continue;
      }

      for (let entity of controller.saved) {
        let object = controller.getObject(entity);
        this.renderEntity(object);
      }
    }
  },
};

globalThis.sidebar = sidebar;

// Update sidebar when my saved stuff changes
my.addEventListener('delete', e => sidebar.removeLink(sidebar.findEntity(e.detail)));
my.addEventListener('save', e => sidebar.renderEntity(e.detail));

sidebar.render();
window.addEventListener('turbo:render', () => sidebar.render());
