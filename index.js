import {bigram} from 'n-gram'

/**
 * Get the edit-distance according to Dice between two values.
 *
 * @param {string|Array<string>} value
 * @param {string|Array<string>} other
 * @returns {number}
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
