import { parse } from 'node-html-parser';

/**
 * Eleventy plugin to add copy buttons to code blocks.
 */
export function copyCodePlugin(eleventyConfig, options = {}) {
  options = {
    container: 'body',
    ...options,
  };

  let codeCount = 0;
  eleventyConfig.addTransform('copy-code', content => {
    const doc = parse(content, { blockTextElements: { code: true } });
    const container = doc.querySelector(options.container);

    if (!container) {
      return content;
    }

    // Look for code blocks
    container.querySelectorAll('pre > code').forEach(code => {
      const pre = code.closest('pre');
      let preId = pre.getAttribute('id') || `code-block-${++codeCount}`;
      let codeId = code.getAttribute('id') || `${preId}-inner`;

      if (!code.getAttribute('id')) {
        code.setAttribute('id', codeId);
      }
      if (!pre.getAttribute('id')) {
        pre.setAttribute('id', preId);
      }

      // Add a copy button
      pre.innerHTML += `<wa-icon-button href="#${preId}" class="block-link-icon" name="link"></wa-icon-button>
        <wa-copy-button from="${codeId}" class="copy-button"></wa-copy-button>`;
    });

    return doc.toString();
  });
}
