import { parse } from 'node-html-parser';

/**
 * Eleventy plugin to add remove elements with <div data-alpha="remove"> from the alpha build.
 */
export function removeDataAlphaElements(options = {}) {
  options = {
    isAlpha: false,
    ...options
  };

  return function (eleventyConfig) {
    eleventyConfig.addTransform('remove-data-alpha-elements', content => {
      const doc = parse(content, { blockTextElements: { code: true } });

      if (options.isAlpha) {
        doc.querySelectorAll('[data-alpha="remove"]').forEach(el => el.remove());
      }

      return doc.toString();
    });
  };
}
