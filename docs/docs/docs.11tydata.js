/**
 * Global data for all pages
 */
import { sort } from '../_utils/filters.js';

export default {
  eleventyComputed: {
    // Default parent. Can be overridden by explicitly setting parent in the data.
    // parent can refer to either an ancestor page in the URL or another page in the same directory
    parent(data) {
      let { parent, page } = data;

      if (parent) {
        return parent;
      }

      return page.url.split('/').filter(Boolean).at(-2);
    },

    parentUrl(data) {
      let { parent, page } = data;
      return getParentUrl(page.url, parent);
    },

    parentItem(data) {
      let { parentUrl } = data;
      return data.collections.all.find(item => item.url === parentUrl);
    },

    children(data) {
      let { collections, page, parentOf } = data;

      if (parentOf) {
        return collections[parentOf];
      }

      let collection = collections.all ?? [];
      let url = page.url;

      let ret = collection.filter(item => {
        return item.data.parentUrl === url;
      });

      sort(ret);

      return ret;
    },
  },
};

function getParentUrl(url, parent) {
  let parts = url.split('/').filter(Boolean);
  let ancestorIndex = parts.findLastIndex(part => part === parent);
  let retParts = parts.slice();

  if (ancestorIndex > -1) {
    // parent is an ancestor
    retParts.splice(ancestorIndex + 1);
  } else {
    // parent is a sibling in the same directory
    retParts.splice(-1, 1, parent);
  }

  let ret = retParts.join('/');

  if (url.startsWith('/')) {
    ret = '/' + ret;
  }

  if (!retParts.at(-1).includes('.') && !ret.endsWith('/')) {
    // If no extension, make sure to end with a slash
    ret += '/';
  }

  if (ret === '/docs/') {
    ret = '/';
  }

  return ret;
}
