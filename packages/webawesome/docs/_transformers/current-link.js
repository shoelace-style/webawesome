import { parse } from 'node-html-parser';

function normalize(pathname) {
  pathname = pathname.trim();

  // Must start with a slash
  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`;
  }

  // Must not end in a slash
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Convert /index.html to /
  if (pathname.endsWith('/index.html')) {
    pathname = pathname.slice(0, -10);
  }

  return pathname;
}

/**
 * Eleventy plugin to decorate current links with a custom class.
 */
export function currentLinkTransformer(options = {}) {
  options = {
    container: 'body',
    className: 'current',
    ...options,
  };

  return function (doc) {
    const container = doc.querySelector(options.container);

    if (!container) {
      return;
    }

    // Compare the href attribute to 11ty's page URL
    container.querySelectorAll('a[href]').forEach(a => {
      if (normalize(a.getAttribute('href')) === normalize(this.page.url)) {
        a.classList.add(options.className);
      }
    });
  };
}
