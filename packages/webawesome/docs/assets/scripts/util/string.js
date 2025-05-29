/**
 * Make the first letter of a string uppercase
 * @param {*} str
 * @returns
 */
export function capitalize(str) {
  str += '';
  return str[0]?.toUpperCase() + str.slice(1);
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

/**
 * Convert a string to camel case.
 * @param {string} str - The string to convert.
 * @returns {string} The camel case string.
 */
export function camelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter?.toUpperCase());
}

/**
 * Convert a string to kebab case.
 * @param {string} str - The string to convert.
 * @returns {string} The kebab case string.
 */
export function kebabCase(str) {
  return str.replace(/([A-Z])/g, '-$1')?.toLowerCase();
}
