import {bigram} from 'n-gram'

/**
 * Get the edit-distance according to Dice between two values.
 *
 * @param {string|string[]} value
 * @param {string|string[]} alternative
 * @returns {number}
 */
export function diceCoefficient(value, alternative) {
  /** @type {string} */
  var value_
  /** @type {string} */
  var alt
  /** @type {string[]} */
  var left
  /** @type {string[]} */
  var right

  if (Array.isArray(value)) {
    left = value.map((valueBigram) => String(valueBigram).toLowerCase())
  } else {
    value_ = String(value).toLowerCase()
    left = value_.length === 1 ? [value_] : bigram(value_)
  }

  if (Array.isArray(alternative)) {
    right = alternative.map((altBigram) => String(altBigram).toLowerCase())
  } else {
    alt = String(alternative).toLowerCase()
    right = alt.length === 1 ? [alt] : bigram(alt)
  }

  var index = -1
  var intersections = 0
  /** @type {string} */
  var leftPair
  /** @type {string} */
  var rightPair
  /** @type {number} */
  var offset

  while (++index < left.length) {
    leftPair = left[index]
    offset = -1

    while (++offset < right.length) {
      rightPair = right[offset]

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
