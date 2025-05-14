let url = new URL(location);
const pushedURL = false;

const matchers = {
  default(textContent, query) {
    return textContent.includes(query);
  },

  i(textContent, query) {
    return textContent.toLowerCase().includes(query.toLowerCase());
  },

  regexp(textContent, query) {
    query.lastIndex = 0;
    return query.test(textContent);
  },
};

matchers.iregexp = matchers.regexp; // i is baked into the query

function filterByName(value) {
  const previousFilter = url.searchParams.get('name') || '';
  url = new URL(location);

  if (value) {
    const isRegexp = name_search_regexp.checked;
    const i = !name_search_i.checked;
    const query = isRegexp ? new RegExp(value, 'gmsv' + (i ? 'i' : '')) : value;
    const matcherId = (i ? 'i' : '') + (isRegexp ? 'regexp' : '');
    const matcher = matchers[matcherId] ?? matchers.default;

    for (const th of document.querySelectorAll('table tbody th:first-child')) {
      const tr = th.parentNode;
      const matches = matcher(th.textContent, query);
      tr.toggleAttribute('hidden', !matches);
    }
    url.searchParams.set('name', value);

    if (matcherId) {
      url.searchParams.set('match', matcherId);
    } else {
      url.searchParams.delete('match');
    }
  } else {
    for (const tr of document.querySelectorAll('table tbody tr[hidden]')) {
      tr.removeAttribute('hidden');
    }
    url.searchParams.delete('name');
    url.searchParams.delete('match');
  }

  if (value !== previousFilter) {
    history[pushedURL ? 'replaceState' : 'pushState'](null, '', url);
  }

  // Update heading counts
  for (const h2 of document.querySelectorAll('h2:has(+ table)')) {
    const count = h2.querySelector('.count');
    if (!count) continue;
    const table = h2.nextElementSibling;
    const visibleRows = table.querySelectorAll('tbody tr:not([hidden])').length;
    count.textContent = visibleRows;
    const outlineLink = document.querySelector(`#outline-standard a[href="#${h2.id}"]`);
    if (outlineLink) {
      // Why not just = h2.textContent? To skip the "Jump to heading" link
      outlineLink.textContent = '';
      outlineLink.append(...[...h2.childNodes].slice(0, 3).map(n => n.cloneNode(true)));
    }
  }
}

if (name_search.value) {
  filterByName(name_search.value);
}

name_search_group.addEventListener('input', e => filterByName(name_search.value));
