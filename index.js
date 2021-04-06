import {bigram} from 'n-gram'

// Get the edit-distance according to Dice between two values.
export function diceCoefficient(value, alternative) {
  var value_ = String(value).toLowerCase()
  var alt = String(alternative).toLowerCase()
  var left = value_.length === 1 ? [value_] : bigram(value_)
  var right = alt.length === 1 ? [alt] : bigram(alt)
  var index = -1
  var intersections = 0
  var leftPair
  var rightPair
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
