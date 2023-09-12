/**
 * @typedef {object} Replacement
 * @property {string | RegExp} pattern
 * @property {string} replacement
 */

/**
 * @typedef {Array<Replacement>} Replacements
 */

/**
 * @param {Document} content
 * @param {Replacements} replacements
 */
module.exports = function (content, replacements) {
  let html = content.body.innerHTML;
  replacements.forEach(replacement => {
    html = html.replaceAll(replacement.pattern, replacement.replacement);
  });

  content.body.innerHTML = html;
};
