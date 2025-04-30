/**
 * Make the first letter of a string uppercase
 * @param {*} str
 * @returns
 */
export function capitalize(str) {
  str += '';
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Convert a readable string to a slug.
 * @param {*} str - Input string. If argument is not a string, it will be stringified.
 * @returns {string} - The slugified string
 */
export function slugify(str) {
  return (str + '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Convert accented letters to ASCII
    .replace(/[^\w\s-]/g, '') // Remove remaining non-ASCII characters
    .trim()
    .replace(/\s+/g, '-') // Convert whitespace to hyphens
    .toLowerCase();
}
