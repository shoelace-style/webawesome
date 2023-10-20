/**
 * @param {number} min
 * @param {number} curr
 * @param {number} max
 */
export function clamp (min, curr, max) {
  if (curr < min) return min
  if (curr > max) return max

  return curr
}

