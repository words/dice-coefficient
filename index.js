'use strict';

/**
 * Get bigrams from a value.
 *
 * @param {*} value - The value to stringify and convert into bigrams.
 * @return {Array.<string>} bigrams
 */

function getPairs(value) {
    value = String(value).toLowerCase();

    var iterator = -1,
        length = value.length - 1,
        pairs = [];

    while (++iterator < length) {
        pairs[iterator] = value.substring(iterator, iterator + 2);
    }

    return pairs;
}

/**
 * Get the edit-distance according to Dice between two values.
 *
 * @param {*} value - First value.
 * @param {*} alternative - Second value.
 * @return {number} Edit distance.
 */

function diceCoefficient(value, alternative) {
    var pairs,
        alternativePairs,
        intersections,
        iterator,
        alternativeLength,
        alternativeIterator,
        alternativePair,
        pair;

    pairs = getPairs(value);
    alternativePairs = getPairs(alternative);
    intersections = 0;
    iterator = -1;
    alternativeLength = alternativePairs.length;

    while (pair = pairs[++iterator]) {
        alternativeIterator = -1;

        while (++alternativeIterator < alternativeLength) {
            alternativePair = alternativePairs[alternativeIterator];

            if (pair === alternativePair) {
                intersections++;

                /**
                 * Make sure this pair never matches again
                 */

                alternativePairs[alternativeIterator] = '';
                break;
            }
        }
    }

    return 2 * intersections / (pairs.length + alternativeLength);
}

/**
 * Expose `diceCoefficient`.
 */

module.exports = diceCoefficient;
