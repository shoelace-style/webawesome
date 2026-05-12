/** Replaces top-level bullets in `.changelog-group-*` blocks with category icons. */
const ICON_BY_CATEGORY = {
  added: 'plus',
  fixed: 'wrench',
  changed: 'broom-wide',
  deprecated: 'clock',
  removed: 'xmark',
  breaking: 'triangle-exclamation',
};

export function changelogListIconsTransformer() {
  return function (doc) {
    Object.entries(ICON_BY_CATEGORY).forEach(([category, iconName]) => {
      doc.querySelectorAll(`.changelog-group-${category}`).forEach(group => {
        // First `<ul>` in document order is the outer list (nested ULs live inside an `<li>`).
        const ul = group.querySelector('ul');
        if (!ul) return;

        ul.childNodes
          .filter(node => node.tagName === 'LI')
          .forEach(li => {
            li.insertAdjacentHTML(
              'afterbegin',
              `<wa-icon name="${iconName}" class="changelog-bullet de-emphasize" variant="regular" aria-hidden="true"></wa-icon>`,
            );
          });
      });
    });
  };
}
