/**
 * Picks a random element from an array.
 * @param {any[]} arr
 */
export function sample(arr) {
  if (!Array.isArray(arr)) {
    return arr;
  }

  if (arr.length < 2) {
    return arr[0];
  }

  let index = Math.floor(Math.random() * arr.length);

  return arr[index];
}
