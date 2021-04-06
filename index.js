'use strict'

var bigrams = require('n-gram').bigram

module.exports = diceCoefficient

// Get the edit-distance according to Dice between two values.
function diceCoefficient(value, alternative) {
  var value_ = String(value).toLowerCase()
  var alt = String(alternative).toLowerCase()
  var left = value_.length === 1 ? [value_] : bigrams(value_)
  var right = alt.length === 1 ? [alt] : bigrams(alt)
  var leftLength = left.length
  var rightLength = right.length
  var index = -1
  var intersections = 0
  var leftPair
  var rightPair
  var offset

  while (++index < leftLength) {
    leftPair = left[index]
    offset = -1

    while (++offset < rightLength) {
      rightPair = right[offset]

      if (leftPair === rightPair) {
        intersections++

        // Make sure this pair never matches again.
        right[offset] = ''
        break
      }
    }
  }

  return (2 * intersections) / (leftLength + rightLength)
}
