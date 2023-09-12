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
  /** This seems trivial, but by assigning to a string first, THEN using innerHTML after iterating over every replacement, we reduce the calculations of JSDOM. At the time of writing benchmarks show a reduction from 9seconds to 3 seconds by doing so. */
  let html = content.body.innerHTML;

  replacements.forEach(replacement => {
    html = html.replaceAll(replacement.pattern, replacement.replacement);
  });

  content.body.innerHTML = html;
};
