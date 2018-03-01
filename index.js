'use strict';

var bigrams = require('n-gram').bigram;

module.exports = diceCoefficient;

/* Get the edit-distance according to Dice between two values. */
function diceCoefficient(value, alternative) {
  var left = bigrams(String(value).toLowerCase()).sort();
  var right = bigrams(String(alternative).toLowerCase()).sort();
  var rightLength = right.length;
  var length = left.length;
  var index = -1;
  var intersections = 0;
  var rightPair;
  var leftPair;
  var offset;
  var rightIndex = 0;

  while (++index < length) {
    leftPair = left[index];
    offset = rightIndex - 1;

    while (++offset < rightLength) {
      rightPair = right[offset];

      if (leftPair === rightPair) {
        intersections++;
        rightIndex = offset + 1;
        break;
      } else if (leftPair < rightPair) {
        rightIndex = offset;
        break;
      }
    }
  }

  return 2 * intersections / (left.length + rightLength);
}
