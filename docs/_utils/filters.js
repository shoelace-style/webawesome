import { parse } from 'path';

export function stripExtension(string) {
  return parse(string).name;
}

export function stripPrefix(content) {
  return content.replace(/^wa-/, '');
}

// Trims whitespace and pipes from the start and end of a string. Useful for CEM types, which can be pipe-delimited.
// With Prettier 3, this means a leading pipe will exist be present when the line wraps.
export function trimPipes(content) {
  return typeof content === 'string' ? content.replace(/^(\s|\|)/g, '').replace(/(\s|\|)$/g, '') : content;
}

export function keys(obj) {
  return Object.keys(obj);
}

export function log(firstArg, ...rest) {
  console.log(firstArg, ...rest);
  return firstArg;
}

function getCollection(name) {
  // From https://github.com/11ty/eleventy/blob/d3d24ccddb804e6e14773501d8c4e07e2c4b9c2b/src/Filters/GetLocaleCollectionItem.js#L39-L43
  return this.collections?.[name] || this.ctx?.collections?.[name] || this.context?.environments?.collections?.[name];
}

export function getCollectionItemFromUrl(url, collection) {
  collection ??= getCollection.call(this, 'all') || [];
  return collection.find(item => item.url === url);
}

export function getTitleFromUrl(url, collection) {
  const item = getCollectionItemFromUrl.call(this, url, collection);
  return item?.data.title || '';
}

export function split(text, separator) {
  return (text + '').split(separator).filter(Boolean);
}

export function breadcrumbs(url, { withCurrent = false } = {}) {
  const parts = split(url, '/');
  const ret = [];

  while (parts.length) {
    let partialUrl = '/' + parts.join('/') + '/';
    let item = getCollectionItemFromUrl.call(this, partialUrl);

    if (item && (partialUrl !== url || withCurrent)) {
      let title = item.data.title;
      if (title) {
        ret.unshift({ url: partialUrl, title });
      }
    }

    parts.pop();

    if (item?.data.parent) {
      let parentURL = item.data.parent;
      if (!item.data.parent.startsWith('/')) {
        // Parent is in the same directory
        parts.push(item.data.parent);
        parentURL = '/' + parts.join('/') + '/';
      }

      let parentBreadcrumbs = breadcrumbs.call(this, parentURL, { withCurrent: true });
      return [...parentBreadcrumbs, ...ret];
    }
  }
  return ret;
}

export function isArray(value) {
  return Array.isArray(value);
}

export function toArray(value) {
  return isArray(value) ? value : [value];
}

export function deepValue(obj, key) {
  key = Array.isArray(key) ? key : key.split('.');
  return key.reduce((subObj, property) => subObj?.[property], obj);
}

function isNumeric(value) {
  return typeof value === 'number' || (typeof value === 'string' && !isNaN(value));
}

function isEmpty(value) {
  return value === null || value === undefined || value === '';
}

function compare(a, b) {
  let isEmptyA = isEmpty(a);
  let isEmptyB = isEmpty(b);

  if (isEmptyA) {
    if (isEmptyB) {
      return 0;
    } else {
      return 1;
    }
  } else if (isEmptyB) {
    return -1;
  }

  // Both strings, and at least one non-numeric
  if (isNumeric(a) || isNumeric(b)) {
    return a - b;
  }

  return (a + '').localeCompare(b);
}

/** Sort an array of objects by one or more of their properties */
export function sort(arr, by = { 'data.order': 1, 'data.title': '' }) {
  let keys = Array.isArray(by) ? by : Object.keys(by);

  return arr.sort((a, b) => {
    let aValues = keys.map(key => deepValue(a, key) ?? by[key]);
    let bValues = keys.map(key => deepValue(b, key) ?? by[key]);

    for (let i = 0; i < aValues.length; i++) {
      let aVal = aValues[i];
      let bVal = bValues[i];
      let result = compare(aVal, bVal);

      // They are not equal in terms of comparison OR we're at the last key
      if (result !== 0 || i === aValues.length - 1) {
        return result;
      }
    }
  });
}

/**
 * Group an 11ty collection (or any array of objects with a `data.tags` property) by certain tags.
 * @param {object[]} collection
 * @param { Object<string, string> | (string | Object<string, string>)[]} [tags] The tags to group by. If not provided/empty, defaults to grouping by all tags.
 * @returns { Object.<string, object[]> } An object with keys for each tag, and an array of items for each tag.
 */
export function groupByTags(collection, tags) {
  if (!tags) {
    // Default to grouping by union of all tags
    tags = Array.from(new Set(collection.flatMap(item => item.data.tags)));
  } else if (Array.isArray(tags)) {
    // May contain objects of one-off tag -> label mappings
    tags = tags.map(tag => (typeof tag === 'object' ? Object.keys(tag)[0] : tag));
  } else if (typeof tags === 'object') {
    // tags is an object of tags to labels, so we just want the keys
    tags = Object.keys(tags);
  }

  let ret = Object.fromEntries(tags.map(tag => [tag, []]));
  ret.other = [];

  for (let item of collection) {
    let categorized = false;

    for (let tag of tags) {
      if (item.data.tags.includes(tag)) {
        ret[tag].push(item);
        categorized = true;
      }
    }

    if (!categorized) {
      ret.other.push(item);
    }
  }

  // Remove empty categories
  for (let category in ret) {
    if (ret[category].length === 0) {
      delete ret[category];
    }
  }

  return ret;
}

export function getCategoryTitle(category, categories) {
  let title;
  if (Array.isArray(categories)) {
    // Find relevant entry
    // [{id: "Title"}, id2, ...]
    title = categories.find(entry => typeof entry === 'object' && entry?.[category])?.[category];
  } else if (typeof categories === 'object') {
    // {id: "Title", id2: "Title 2", ...}
    title = categories[category];
  }

  if (title) {
    return title;
  }

  // Capitalized
  return category.charAt(0).toUpperCase() + category.slice(1);
}

const IDENTITY = x => x;

/**
 * Helper to print out one or more HTML attributes, especially conditional ones.
 * Usage in 11ty:
 * - Single attribute: `<foo{{ value | attr(name) }}>`
 * - Multiple attributes: `<foo{{ { name1: value1, name2: value2 } | attr }}>`
 *
 * @overload
 * @param {any} value - The attribute value If falsey, the attribute is not printed. If `true` the attribute is printed without a value.
 * @param {string} name - The name of the attribute
 *
 * @overload
 * @param {Object<string, any>} obj - Map of attribute names to values
 *
 * @returns {string} The attribute string. No `| safe` is needed.
 */
export function attr(value, name) {
  const safe = this?.env.filters.safe ?? IDENTITY;

  if (arguments.length === 1 && value && typeof value === 'object') {
    // Called with a single object argument of names to values
    let ret = Object.entries(obj)
      .map(([name, value]) => attr(value, name))
      .join('');
    return safe(ret);
  }

  if (!value) {
    // false, "", null, undefined
    return '';
  }

  let ret = ' ' + name + (value === true ? '' : `="${value}"`);

  return safe(ret);
}
