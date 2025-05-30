/**
 * Eleventy plugin to replace arbitrary text in the page's HTML.
 *
 * @param replacement - The terms to replace and what to replace them with. This must be an object (or an array of
 * objects) containing a `replace` key that's a string or RegExp and a `replaceWith` key that's a string.
 */
export function replaceTextPlugin(replacements = []) {
  replacements = Array.isArray(replacements) ? replacements : [replacements];

  return function (eleventyConfig) {
    eleventyConfig.addTransform('replace-text', function (content) {
      replacements.forEach(replacement => {
        content = content.replace(replacement.replace, replacement.replaceWith);
      });

      return content;
    });
  };
}
