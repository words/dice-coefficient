'use strict';

var bigrams = require('n-gram').bigram;

module.exports = diceCoefficient;

/* Get the edit-distance according to Dice between two values. */
function diceCoefficient(value, alternative) {
  var left = value.length === 1 ? [String(value).toLowerCase()] : bigrams(String(value).toLowerCase());
  var right = alternative.length === 1 ? [String(alternative).toLowerCase()] : bigrams(String(alternative).toLowerCase());
  var rightLength = right.length;
  var length = left.length;
  var index = -1;
  var intersections = 0;
  var rightPair;
  var leftPair;
  var offset;

  while (++index < length) {
    leftPair = left[index];
    offset = -1;

    while (++offset < rightLength) {
      rightPair = right[offset];

      if (leftPair === rightPair) {
        intersections++;

        /* Make sure this pair never matches again */
        right[offset] = '';
        break;
      }
    }
  }

  return 2 * intersections / (left.length + rightLength);
}
