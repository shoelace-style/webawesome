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
  if (!url) {
    return null;
  }
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

export function ancestors(url, { withCurrent = false, withRoot = false } = {}) {
  let ret = [];
  let currentUrl = url;
  let currentItem = getCollectionItemFromUrl.call(this, url);

  if (!currentItem) {
    // Might have eleventyExcludeFromCollections, jump to parent
    let parentUrl = this.ctx.parentUrl;
    if (parentUrl) {
      url = parentUrl;
    }
  }

  for (let item; (item = getCollectionItemFromUrl.call(this, url)); url = item.data.parentUrl) {
    ret.unshift(item);
  }

  if (!withRoot && ret[0]?.page.url === '/') {
    // Remove root
    ret.shift();
  }

  if (!withCurrent && ret.at(-1)?.page.url === currentUrl) {
    // Remove current page
    ret.pop();
  }

  return ret;
}

export function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isList(value) {
  return Array.isArray(value) || value instanceof Set;
}

/** Get an Array or Set */
export function toList(value) {
  return isList(value) ? value : [value];
}

/**
 * Convert any value to something that can be iterated over with a for key, value loop.
 * Arrays and sets will be converted to a Map of value -> undefined
 */
export function dict(value) {
  if (value instanceof Map || isObject(value)) {
    return value;
  }

  let list = toList(value);
  return new Map([...list].map(item => [item, undefined]));
}

export function deepValue(obj, key) {
  key = Array.isArray(key) ? key : key.split('.');
  return key.reduce((subObj, property) => subObj?.[property], obj);
}

export function number(value, options) {
  if (typeof value !== 'number' && isNaN(value)) {
    return value;
  }

  let lang = options?.lang ?? 'en';
  if (options?.lang) {
    delete options.lang;
  }

  if (!options || Object.keys(options).length === 0) {
    options = { maximumSignificantDigits: 3 };
  }

  return Number(value).toLocaleString(lang, options);
}

export function isNumeric(value) {
  return typeof value === 'number' || (typeof value === 'string' && !isNaN(value));
}

export function isString(value) {
  return typeof value === 'string';
}

export function isEmpty(value) {
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
 * @param { Object<string, string> | string[]} [options] Options object or array of tags to group by.
 * @param {string[] | true} [options.tags] Tags to group by. If true, groups by all tags.
 *                            If not provided/empty, defaults to grouping by page hierarchy, with any pages with more than 1 children becoming groups.
 * @param {string[]} [options.groups] The groups to use if only a subset or a specific order is desired. Defaults to `options.tags`.
 * @param {string[]} [options.titles] Any title overrides for groups.
 * @param {string | false} [options.other="Other"] The title to use for the "Other" group. If `false`, the "Other" group is removed..
 * @returns { Object.<string, object[]> } An object of group ids to arrays of page objects.
 */
export function groupPages(collection, options = {}, page) {
  if (!collection) {
    console.error(`Empty collection passed to groupPages() to group by ${JSON.stringify(options)}`);
  }

  if (Array.isArray(options)) {
    options = { tags: options };
  }

  let { tags, groups, titles = {}, other = 'Other' } = options;

  if (groups === undefined && Array.isArray(tags)) {
    groups = tags;
  }

  let grouping;

  if (tags) {
    grouping = {
      isGroup: item => undefined,
      getCandidateGroups: item => item.data.tags,
      getGroupMeta: group => ({}),
    };
  } else {
    grouping = {
      isGroup: item => (item.data.children.length >= 2 ? item.page.url : undefined),
      getCandidateGroups: item => {
        let parentUrl = item.data.parentUrl;
        if (page?.url === parentUrl) {
          return [];
        }
        return [parentUrl];
      },
      getGroupMeta: group => {
        let item = byUrl[group] || getCollectionItemFromUrl.call(this, group);
        return {
          title: item?.data.title,
          url: group,
          item,
        };
      },
      sortGroups: groups => sort(groups.map(url => byUrl[url]).filter(Boolean)).map(item => item.page.url),
    };
  }

  let byUrl = {};
  let byParentUrl = {};

  for (let item of collection) {
    let url = item.page.url;
    let parentUrl = item.data.parentUrl;

    byUrl[url] = item;

    if (parentUrl) {
      byParentUrl[parentUrl] ??= [];
      byParentUrl[parentUrl].push(item);
    }
  }

  let urlToGroups = {};

  for (let item of collection) {
    let url = item.page.url;
    let parentUrl = item.data.parentUrl;

    if (grouping.isGroup(item)) {
      continue;
    }

    let parentItem = byUrl[parentUrl];
    if (parentItem && !grouping.isGroup(parentItem)) {
      // Their parent is also here and is not a group
      continue;
    }

    let candidateGroups = grouping.getCandidateGroups(item);

    if (groups) {
      candidateGroups = candidateGroups.filter(group => groups.includes(group));
    }

    urlToGroups[url] ??= [];

    for (let group of candidateGroups) {
      urlToGroups[url].push(group);
    }
  }

  let ret = {};

  for (let url in urlToGroups) {
    let groups = urlToGroups[url];
    let item = byUrl[url];

    if (groups.length === 0) {
      // Not filtered out but also not categorized
      groups = ['other'];
    }

    for (let group of groups) {
      ret[group] ??= [];
      ret[group].push(item);

      if (!ret[group].meta) {
        if (group === 'other') {
          ret[group].meta = { title: other };
        } else {
          ret[group].meta = grouping.getGroupMeta(group);
          ret[group].meta.title = titles[group] ?? ret[group].meta.title ?? capitalize(group);
        }
      }
    }
  }

  if (other === false) {
    delete ret.other;
  }

  // Sort
  let sortedGroups = groups ?? grouping.sortGroups?.(Object.keys(ret));

  if (sortedGroups) {
    ret = sortObject(ret, sortedGroups);
  } else {
    // At least make sure other is last
    if (ret.other) {
      let otherGroup = ret.other;
      delete ret.other;
      ret.other = otherGroup;
    }
  }

  Object.defineProperty(ret, 'meta', {
    value: {
      groupCount: Object.keys(ret).length,
    },
    enumerable: false,
  });

  return ret;
}

/**
 * Sort an object by its keys
 * @param {*} obj
 * @param {function | string[]} order
 */
function sortObject(obj, order) {
  let ret = {};
  let sortedKeys = Array.isArray(order) ? order : Object.keys(obj).sort(order);

  for (let key of sortedKeys) {
    if (key in obj) {
      ret[key] = obj[key];
    }
  }

  // Add any keys that weren't in the order
  for (let key in obj) {
    if (!(key in ret)) {
      ret[key] = obj[key];
    }
  }

  return ret;
}

function capitalize(str) {
  str += '';
  return str.charAt(0).toUpperCase() + str.slice(1);
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

/**
 * Format an object as JSON, with formatting & indentation (unlike the default `dump` filter)
 * @param {*} value
 * @returns {string}
 */
export function json(value) {
  return JSON.stringify(value, null, 2);
}
