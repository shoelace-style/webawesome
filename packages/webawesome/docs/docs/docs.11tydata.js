/**
 * Global data for all pages
 */
import { sort } from '../_utils/filters.js';

export default {
  eleventyComputed: {
    /**
     * Default parent slug. Can be overridden by explicitly setting parent in the data.
     * It can be either the URL slug of a page in the same directory or a parent directory.
     * @returns {string | undefined}
     */
    parent(data) {
      let { parent, page } = data;

      if (parent) {
        return parent;
      }

      return page.url.split('/').filter(Boolean).at(-2);
    },

    /**
     * URL of parent page
     * @returns {string | undefined}
     */
    parentUrl(data) {
      let { parent, page } = data;
      return getParentUrl(page.url, parent);
    },

    /**
     * Collection item of parent page
     * @returns {object | undefined} Parent page item
     */
    parentItem(data) {
      let { parentUrl } = data;
      return data.collections.all.find(item => item.url === parentUrl);
    },

    /**
     * Child pages of current page
     * @returns {object[]} Array of child pages
     */
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

/**
 * Resolve a parent slug against a page URL
 * @param {string} url - The URL of the page
 * @param {string} parent - The slug of the parent page
 * @returns {string} The resolved URL of the parent page
 */
function getParentUrl(url, parent) {
  if (!parent) {
    return undefined;
  }

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
    // If the current page starts with a slash, make sure the parent does too
    // This is pretty much always the case with 11ty page URLs
    ret = '/' + ret;
  }

  if (!retParts.at(-1)?.includes('.') && !ret.endsWith('/')) {
    // If no extension, make sure to end with a slash
    ret += '/';
  }

  if (ret === '/docs/') {
    // We don't want anyone's parent to be "Installation"!
    ret = '/';
  }

  return ret;
}
