// @ts-check
/**
 * @template {(...args: any[]) => any} T
 * @param {T} callback
 * @param {number} wait
 */
export function debounce (callback, wait = 0) {
  /**
   * @type {number | null}
   */
  let timeoutId = null;

  /**
   * @param {any[]} args
   */
  return (...args) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
