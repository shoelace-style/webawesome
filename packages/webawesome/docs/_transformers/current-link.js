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
  const isSectionLink = (href.endsWith('/') && href !== '/') || el.getAttribute('data-match') === 'section';
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
    exclusiveGroups: ['.subheader-links'],
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

    // Keep only the most specific match per group. Every match is a prefix of the same pageUrl,
    // so the longest href is the deepest — e.g. a component page lights "Components", not "/docs".
    const depth = el => normalize(el.getAttribute('href') || '').length;
    for (const selector of options.exclusiveGroups) {
      container.querySelectorAll(selector).forEach(group => {
        const marked = [...group.querySelectorAll('.' + options.className)];
        if (marked.length < 2) {
          return;
        }
        const maxDepth = Math.max(...marked.map(depth));
        marked.forEach(el => {
          if (depth(el) < maxDepth) {
            el.classList.remove(options.className);
          }
        });
      });
    }
  };
}
