import { themeConfig, themeParams } from '/assets/data/index.js';
import my from '/assets/scripts/my.js';
import { documentTheme, theme } from '/docs/themes/preview/preview.js';

let urlParams = new URLSearchParams(location.search);

if (urlParams.has('uid') && my.themes.saved.length > 0) {
  let savedTheme = my.themes.saved.find(p => p.uid === Number(urlParams.get('uid')));

  // Update title
  document.title = savedTheme.title;
  for (let title of document.querySelectorAll('.title')) {
    title.innerHTML = savedTheme.title;
  }
}

for (let editLink of document.querySelectorAll('.edit-link')) {
  editLink.href = '../edit/?' + urlParams;
  editLink.addEventListener('click', e => {
    editLink.href = '../edit/?' + urlParams;
  });
}

theme.addEventListener('change', e => {
  let tweaks = [];

  for (let aspect of themeParams) {
    if (theme[aspect] && theme[aspect] !== documentTheme[aspect]) {
      let config = themeConfig[aspect];
      let override = theme[aspect];
      let { docs, icon } = config;
      let docsURL = docs ? docs + override + '/' : '';
      let title = override.replace(/^[a-z]/g, c => c.toUpperCase());

      if (docsURL) {
        title = `<a href="${docsURL}">${title}</a>`;
      }

      tweaks.push(`<wa-icon name="${icon}" variant="regular"></wa-icon> ${title}`);
    }
  }

  let isRemixed = tweaks.length > 0;
  document.documentElement.classList.toggle('is-remixed', isRemixed);

  if (isRemixed) {
    for (let p of document.querySelectorAll('#theme-status')) {
      let proBadge = p.querySelector('.pro');
      if (!proBadge) {
        p.insertAdjacentHTML('beforeend', '<wa-badge class="pro">PRO</wa-badge>');
      }
    }

    for (let p of mix_and_match) {
      if (tweaks.length) {
        p.innerHTML =
          `<strong><wa-icon name="arrows-rotate"></wa-icon> Remixed</strong> ` +
          tweaks
            .map(
              msg => `<wa-badge appearance=outlined>
          ${msg}</wa-badge>`,
            )
            .join(' ');
      } else {
        p.innerHTML = '';
      }
    }
  }
});
