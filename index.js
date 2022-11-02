import {bigram} from 'n-gram'

/**
 * Get the difference according to Sørensen–Dice.
 *
 * > 👉 **Note**: you can pass bigrams (from [`n-gram`][n-gram]) too, which will
 * > improve performance when you are comparing the same values multiple times.
 *
 * @param {string|Array<string>} value
 *   Primary value.
 * @param {string|Array<string>} other
 *   Other value.
 * @returns {number}
 *   Difference.
 *
 *   The result is normalized to a number between `0` (completely different)
 *   and `1` (exactly the same).
 */
export function diceCoefficient(value, other) {
  const left = toPairs(value)
  const right = toPairs(other)
  let index = -1
  let intersections = 0

  while (++index < left.length) {
    const leftPair = left[index]
    let offset = -1

    while (++offset < right.length) {
      const rightPair = right[offset]

      if (leftPair === rightPair) {
        intersections++

        // Make sure this pair never matches again.
        right[offset] = ''
        break
      }
    }
  }

  return (2 * intersections) / (left.length + right.length)
}

/**
 * @param {string|Array<string>} value
 * @returns {Array<string>}
 */
function toPairs(value) {
  if (Array.isArray(value)) {
    return value.map((bigram) => normalize(bigram))
  }

  const normal = normalize(value)
  return normal.length === 1 ? [normal] : bigram(normal)
}

/**
 * @param {string} value
 * @returns {string}
 */
function normalize(value) {
  return String(value).toLowerCase()
}
