/**
 * @param {Record<string, unknown>} obj
 * @returns {Record<string, boolean>}
 */
export function stringMap (obj, spacer = " ") {
  let strings = []

  for (const [key, val] of Object.entries(obj)) {
    if (Boolean(val)) {
      strings.push(key)
    }
  }

  /**
   * @type {Record<string, boolean>}
   */
  // @ts-expect-error
  return strings.join(spacer)
}
