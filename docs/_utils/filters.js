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

export function breadcrumbs(url, { withCurrent = false } = {}) {
  const parts = url.split('/').filter(Boolean);
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
