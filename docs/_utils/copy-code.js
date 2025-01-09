import { parse } from 'node-html-parser';

/**
 * Eleventy plugin to add copy buttons to code blocks.
 */
export function copyCodePlugin(options = {}) {
  options = {
    container: 'body',
    ...options,
  };

  return function (eleventyConfig) {
    eleventyConfig.addTransform('copy-code', content => {
      const doc = parse(content, { blockTextElements: { code: true } });
      const container = doc.querySelector(options.container);

      if (!container) {
        return content;
      }

      // Look for code blocks
      container.querySelectorAll('pre > code').forEach(code => {
        const pre = code.closest('pre');

        // Add a copy button (we set the copy data at runtime to reduce page bloat)
        pre.innerHTML = `<wa-copy-button class="copy-button" hoist></wa-copy-button>` + pre.innerHTML;
      });

      return doc.toString();
    });
  };
}
