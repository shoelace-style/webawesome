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

function markCurrent(el, pageUrl, className) {
  const href = el.getAttribute('href');
  if (href == null || href === '' || href.startsWith('#')) {
    return;
  }
  const normalizedHref = normalize(href);
  const normalizedPageUrl = normalize(pageUrl);
  const isSectionLink = href.endsWith('/') && href !== '/';
  const isExactMatch = normalizedHref === normalizedPageUrl;
  const isChildOfSection = isSectionLink && normalizedPageUrl.startsWith(normalizedHref + '/');
  if (isExactMatch || isChildOfSection) {
    el.classList.add(className);
  }
}

/**
 * Eleventy plugin to decorate current links with a custom class.
 * Matches `<a href>` and `<wa-button href>` (e.g. subheader nav).
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

    const pageUrl = this.page.url;

    container.querySelectorAll('a[href]').forEach(a => {
      markCurrent(a, pageUrl, options.className);
    });

    container.querySelectorAll('wa-button[href]').forEach(btn => {
      markCurrent(btn, pageUrl, options.className);
    });
  };
}
